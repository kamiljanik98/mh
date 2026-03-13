# INBOX

## Server Actions vs Hooks — Key Distinction

**Server Actions** — `"use server"`, run on the server, live in `app/actions/`

```
app/actions/songs.ts
  getSongs(title?)      → queries Supabase, called from search/page.tsx server component
  deleteSong(id)        → deletes from Supabase + R2, too sensitive for client
  updateSong(id, data)  → updates Supabase record
```

**Hooks** — `"use client"`, run in the browser, live in `hooks/`

```
hooks/use-player.ts        → Zustand store, manages activeId and song queue
hooks/use-on-play.ts       → updates player store on song click
hooks/use-get-songs.ts     → calls Supabase browser client directly
hooks/use-load-song-url.ts → calls Supabase browser client directly, returns public URL
hooks/use-login.ts         → calls Supabase auth browser client
```

**Rule of thumb:**

- Needs database or R2? → server action
- Needs React state or runs on user interaction? → hook

---

## Open Questions

- `useUser` hook — is Context + Provider actually needed or is the hook alone sufficient?
- How to best structure components and hooks in dashboard — check SoundCloud's approach for reference
- `FeedMediaItem` vs `LibraryMediaItem` — should they be two separate components or one with a prop variant?
- Where exactly should `useUser` be consumed — only settings/account or also navbar?

## Ideas to Explore

- Player module reference conversation: https://claude.ai/share/4a723b87-c157-42a1-95c1-db21bc08d0c4
- Look into how SoundCloud structures its media item components (feed vs profile/library view)
- Consider whether to use route `/library` or keep it inside dashboard layout

## Known Issues (move to bug fix task when ready)

- Auth rate limit errors from Supabase — investigate triggers and add handling
- RLS policy errors — document common causes and solutions
- `auth/login` and `auth/register` accessible after authentication — should redirect to dashboard

## R2 + Supabase Upload — Transaction Safety

> Relevant for v0.4 Upload — orphaned files accumulate in R2 when Supabase insert fails

**Problem:**
R2 upload and Supabase insert are two separate operations with no shared transaction.
If R2 upload succeeds but Supabase insert fails, the file stays in R2 with no database record.

**Solution: rollback R2 on Supabase error**

```ts
await Promise.all([uploadSong(), uploadCover()])

const { error } = await supabase.from("songs").insert(...)

if (error) {
  await Promise.all([
    deleteFromR2(BUCKET_SONGS, masterPath),
    deleteFromR2(BUCKET_COVERS, coverPath),
  ])
  throw new Error(error.message)
}
```

**Action:** Implement rollback in `app/api/upload/route.ts` at v0.4 Upload

## R2 Operations Plan — v0.3 and v0.4

**Implement at v0.3 Player:**

```
lib/r2/storage.ts
  getSongUrl()     → presigned URL for audio (expires 1h)
  getCoverUrl()    → public URL for cover image
```

**Implement at v0.4 Upload:**

```
lib/r2/upload.ts
  uploadSong()     → audio to bucket songs
  uploadCover()    → cover image to bucket covers
  uploadStem()     → stem file to bucket songs
  deleteFromR2()   → delete file by bucket + path (rollback)

lib/r2/storage.ts
  getStemUrl()     → presigned URL for stem download
```

**Delete song flow — implement at v0.5 Song Management:**

```
1. fetch all stem paths for song from Supabase
2. delete song from Supabase (cascade deletes stems rows)
3. delete audio from R2 bucket songs
4. delete cover from R2 bucket covers
5. delete each stem from R2 bucket songs
→ if any R2 delete fails: log orphaned path for manual cleanup
```

**Action:** Write ADR-002 — R2 transaction safety and delete flow before starting v0.4

## R2 + Client Hooks — Server Action Bridge Required

> Relevant for v0.3 Player — Zustand store is client-side, R2 methods are server-only

**Problem:**
`lib/r2/storage.ts` is `server-only` — cannot be called directly from client hooks or Zustand store.
Calling it client-side would leak AWS credentials into the client bundle.

**Required pattern:**

```
hook (client)
  → server action (app/actions/songs.ts)
    → lib/r2/storage.ts (server-only)
```

**Implementation:**

```ts
// app/actions/songs.ts
"use server";
import { getSongUrl } from "@/lib/r2/storage";
export async function fetchSongUrl(path: string): Promise<string> {
  return await getSongUrl(path);
}
```

```ts
// hooks/use-load-song-url.ts
"use client";
import { useState, useEffect } from "react";
import { fetchSongUrl } from "@/app/actions/songs";
import { Song } from "@/types";

const useLoadSongUrl = (song: Song | null) => {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!song) return;
    fetchSongUrl(song.path).then(setUrl);
  }, [song]);
  return url;
};
```

**Action:** Implement at start of v0.3 Player
