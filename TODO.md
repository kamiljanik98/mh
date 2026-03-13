# TODO

> **Current focus:** v0.1 Initial Setup

---

## Now — v0.1 Initial Setup

**Shadcn UI & Styles**

- [ ] `npx shadcn@latest init`
- [ ] `npx shadcn@latest add button input card`
- [ ] Apply DM Sans font in `layout.tsx`
- [ ] Update `global.css`

**Supabase Local**

- [ ] `supabase start` — start local instance
- [ ] Open Supabase Studio — `http://localhost:54323`
- [ ] Paste SQL queries to create `profiles` table with policies
- [ ] Paste SQL queries to create `songs` table with policies
- [ ] Paste SQL queries to create `stems` table with policies
- [ ] `supabase gen types typescript --local > types/database.types.ts` — TS types for type-safe queries

**Supabase Client**

- [ ] `npm install @supabase/supabase-js @supabase/ssr`
- [ ] Set Supabase environment variables
- [ ] `lib/supabase/client.ts` — browser client
- [ ] `lib/supabase/server.ts` — server client (SSR)
- [ ] `lib/supabase/proxy.ts` — middleware proxy

**Cloudflare R2**

> File storage for audio stems, WAV/MP3 and cover images — zero egress fees

- [ ] Create Cloudflare account
- [ ] Create R2 bucket `songs` — audio files (MP3, WAV)
- [ ] Create R2 bucket `covers` — cover images
- [ ] Generate R2 API token with Read & Write permissions for both buckets
- [ ] Enable public access (`R2.dev subdomain`) on `covers` bucket
- [ ] `npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`
- [ ] Set R2 environment variables:
  - `R2_ACCOUNT_ID`
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_BUCKET_SONGS`
  - `R2_BUCKET_COVERS`
  - `NEXT_PUBLIC_R2_COVERS_URL`
- [ ] `lib/r2/client.ts` — S3-compatible R2 client with Cloudflare endpoint
- [ ] `app/test/page.tsx` — infrastructure check page (delete after verification)
- [ ] Verify Supabase and R2 connection at `http://localhost:3000/test`
- [ ] Delete `app/test/` after verification
- [ ] `docs/adr/ADR-001.md` — Cloudflare R2 over Supabase Storage

**Tests**

- [ ] Unit: all required env variables are defined and non-empty (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_SONGS`, `R2_BUCKET_COVERS`, `NEXT_PUBLIC_R2_COVERS_URL`)
- [ ] Integration: Supabase client connects — `songs`, `profiles`, `stems` tables return empty array (not an error)
- [ ] Integration: RLS on `songs` — unauthenticated client cannot insert a row
- [ ] Integration: RLS on `songs` — unauthenticated client can select rows (public read)
- [ ] Integration: RLS on `stems` — unauthenticated client cannot insert a row
- [ ] Integration: RLS on `profiles` — unauthenticated client cannot insert a row
- [ ] Integration: server Supabase client initializes without errors in a Next.js server context
- [ ] Integration: R2 client initializes with correct endpoint — `ListBuckets` returns `songs` and `covers`

---

## Next — v0.2 Auth

**Password Auth (PKCE)**

- [ ] `auth/confirm/route.ts` — PKCE token exchange endpoint — ref: https://supabase.com/docs/guides/auth/passwords?queryGroups=flow&flow=pkce
- [ ] Update signup confirmation email template in Supabase dashboard
- [ ] Enable email confirmation in `config.toml` for local Supabase

**Social Auth**

- [ ] `auth/callback/route.ts` — code exchange handler for social providers — ref: https://supabase.com/docs/guides/auth/social-login/auth-discord
- [ ] Discord provider configured
- [ ] Add Discord SVG icon to `public/icons/discord.svg`

**Auth Pages**

- [ ] `app/(pages)/auth/layout.tsx` — shared layout for all auth pages
- [ ] `app/(pages)/auth/login/page.tsx` — password based sign in form
- [ ] `app/(pages)/auth/register/page.tsx` — new account registration form
- [ ] `app/(pages)/auth/forgot-password/page.tsx` — password reset request form
- [ ] `app/(pages)/auth/update-password/page.tsx` — update password after email link redirect
- [ ] `app/(pages)/auth/auth-error-code/page.tsx` — auth error fallback page
- [ ] `app/(pages)/auth/auth-code-success/page.tsx` — shown after successful email confirmation

**Hooks** — `"use client"`, encapsulate form logic and Supabase auth calls

- [ ] `hooks/use-login.ts` — handles sign in with email/password via Supabase
- [ ] `hooks/use-register.ts` — handles sign up with email/password via Supabase
- [ ] `hooks/use-forgot-password.ts` — sends password reset email via Supabase
- [ ] `hooks/use-update-password.ts` — updates password after email link redirect
- [ ] `hooks/use-social-login.ts` — triggers OAuth flow for given provider via Supabase

**Components**

- [ ] `components/auth/social-button.tsx` — provider button with SVG icon, accepts `provider`, `onClick`, `disabled` — no hook, no `"use client"` (pure presentational)
- [ ] `components/ui/light-rays.tsx` — Magic UI light rays component for auth page backgrounds
- [ ] `components/ui/shine-border.tsx` — Magic UI shine border component for auth cards

**Mockups**

- [ ] `app/(pages)/dashboard/page.tsx` — basic layout with sign out button
- [ ] `app/(pages)/home/page.tsx` — hero section and navbar at `/`

**Known Issues to Fix**

- [ ] Restore auth in `app/api/upload/route.ts` — replace hardcoded `user.id` with `supabase.auth.getUser()`
- [ ] Confirmation link redirect loop after PKCE email confirmation — proxy likely doubling base URL
- [ ] `auth/login` and `auth/register` accessible after authentication — should redirect to dashboard

**Tests**

- [ ] Integration: user can register, confirm email and sign in
- [ ] Integration: `useForgotPassword` — sends reset email, returns success state
- [ ] Integration: `useUpdatePassword` — updates password with valid token from email link
- [ ] Integration: `useSocialLogin` — redirects to Discord OAuth flow
- [ ] Integration: signed in user is redirected away from `auth/login` and `auth/register`
- [ ] Integration: unauthenticated user accessing protected route is redirected to `auth/login`
- [ ] Integration: PKCE confirmation link resolves correctly without redirect loop

---

## Next — v0.3 Player

**Dev Setup**

> Skip auth dependency — work on player in isolation

- [ ] Disable RLS on `songs` table for development — `alter table public.songs disable row level security`
- [ ] Upload test audio file to R2 `songs` bucket manually via Cloudflare dashboard
- [ ] Insert matching record in `songs` table via Supabase Studio with correct `path`, `title`, `uploaded_by`
- [ ] Re-enable RLS after player is verified — `alter table public.songs enable row level security`

**R2**

- [ ] `lib/r2/storage.ts` — `getSongUrl` (presigned, 1h), `getCoverUrl` (public)

**Server Actions** — `"use server"`, called from hooks or server components

- [ ] `app/actions/songs.ts` — `fetchSongUrl(path)` — wraps `getSongUrl` from `lib/r2/storage`, bridge between client hooks and server-only R2

**Zustand Store**

- [ ] `npm install zustand`
- [ ] `hooks/use-player.ts` — Zustand store: `ids`, `activeId`, `songs`, `setId`, `setIds`, `setSongs`, `reset`

**Hooks** — `"use client"`, call server actions or Supabase directly

- [ ] `hooks/use-on-play.ts` — sets `activeId` and `ids` in player store, triggers playback
- [ ] `hooks/use-get-songs.ts` — calls Supabase directly, returns full song list, feeds into player store
- [ ] `hooks/use-get-song-by-id.ts` — calls Supabase directly, returns single song by id for active player instance
- [ ] `hooks/use-load-song-url.ts` — calls `fetchSongUrl` server action, returns presigned URL for `<audio src>`

**Player Components**

- [ ] `components/player/player-bar.tsx` — fixed bottom bar, renders track info, controls and volume
- [ ] `components/player/player-controls.tsx` — play/pause, prev, next buttons, uses `usePlayer`
- [ ] `components/player/player-track-info.tsx` — cover image, title, nickname of active song
- [ ] `components/player/player-volume.tsx` — volume slider
- [ ] Unit: `useOnPlay` — sets correct `activeId` and `ids` in player store on call
- [ ] Unit: `useGetSongById` — returns correct song for given id, returns null for unknown id
- [ ] Integration: `useGetSongs` — returns song list from Supabase matching inserted test record
- [ ] Integration: `fetchSongUrl` server action — returns valid presigned URL for test file in R2
- [ ] Integration: `useLoadSongUrl` — presigned URL resolves to accessible audio file

---

## Next — v0.4 Upload

**R2**

- [ ] `lib/r2/upload.ts` — `uploadSong`, `uploadCover`, `uploadStem`, `deleteFromR2`
- [ ] `lib/r2/storage.ts` — extend with `getStemUrl()` (presigned, 1h)
- [ ] `app/api/upload/route.ts` — upload endpoint with R2 rollback on DB error
- [ ] Write ADR-002 — R2 transaction safety and delete flow

**Upload Form**

> `useUser` not yet available — use `supabase.auth.getUser()` directly for now, refactor to `useUser` in v0.8

- [ ] `components/upload/upload-form.tsx` — song metadata fields (title, bpm, scale, genre, tags) + audio file + cover image
- [ ] `app/(pages)/upload/page.tsx` — upload page, requires authenticated user
- [ ] Mark upload route auth as `// TODO: refactor to useUser — v0.8`

**Tests**

- [ ] Integration: `uploadSong` — file appears in R2 `songs` bucket at expected path
- [ ] Integration: `uploadCover` — file appears in R2 `covers` bucket at expected path
- [ ] Integration: `uploadStem` — file appears in R2 `songs` bucket under stem path
- [ ] Integration: upload route inserts record in Supabase and files exist in R2
- [ ] Integration: upload route rolls back R2 files when Supabase insert fails

---

## Next — v0.5 Song Management

**R2**

- [ ] Implement delete song flow with R2 rollback (see INBOX: R2 Operations Plan) — removes audio, cover and all stems from R2 + Supabase record

**Song Operations**

- [ ] `app/actions/songs.ts` — `deleteSong(id)` server action — deletes Supabase record and all R2 files
- [ ] `app/actions/songs.ts` — `updateSong(id, data)` server action — patches metadata (title, bpm, scale, genre, tags)
- [ ] `app/actions/songs.ts` — `updateSongCover(id, file)` server action — replaces cover in R2 and updates `image_path` in DB
- [ ] `app/actions/stems.ts` — `addStem(songId, file, name)` server action — uploads stem to R2 and inserts `stems` record
- [ ] `app/actions/stems.ts` — `deleteStem(stemId)` server action — removes stem from R2 and deletes `stems` record

**Tests**

- [ ] Integration: `deleteSong` — removes Supabase record, audio, cover and all stems from R2
- [ ] Integration: `deleteSong` — logs orphaned paths if any R2 delete fails
- [ ] Integration: `updateSong` — updates metadata fields in Supabase, does not touch R2
- [ ] Integration: `updateSongCover` — old cover removed from R2, new cover uploaded, `image_path` updated in DB
- [ ] Integration: `addStem` — stem file uploaded to R2, record inserted in `stems` table
- [ ] Integration: `deleteStem` — stem file removed from R2, record deleted from `stems` table

---

## Next — v0.6 Feed

**Components**

- [ ] `app/(pages)/feed/page.tsx` — server component, fetches all songs with `profiles!uploaded_by(nickname)`
- [ ] `components/feed/feed-song-item.tsx` — song row with cover, title, nickname, metadata, play button
- [ ] `components/feed/feed-song-list.tsx` — renders list of `FeedSongItem`, passes `useOnPlay` for playback

**Integration with Player**

- [ ] Clicking play on `FeedSongItem` calls `useOnPlay` — loads song into Zustand player store
- [ ] Active song highlighted in feed while playing

**Tests**

- [ ] Integration: feed page renders all songs from Supabase
- [ ] Unit: `FeedSongItem` renders title, nickname, cover and play button
- [ ] Unit: clicking play on `FeedSongItem` calls `useOnPlay` with correct song id

---

## Next — v0.7 Search

**Server Actions** — `"use server"`, called from server components

- [ ] `app/actions/songs.ts` — extend with `getSongs(title?)` — if title: filters by `title`, `tags`, `genre`, `scale` via single `.or()` query; if no title: returns all songs ordered by `created_at` desc

**Components**

- [ ] `app/(pages)/search/page.tsx` — server component, calls `getSongs(title)` directly, reads `?title=` from `searchParams`, passes results to `SearchContent`
- [ ] `components/search/search-input.tsx` — client component, debounced input (500ms), pushes `?title=` to URL via `router.push`
- [ ] `components/search/search-content.tsx` — client component, renders song list, uses `useOnPlay` for playback

**Hooks** — `"use client"`

- [ ] `hooks/use-debounce.ts` — generic debounce hook, used by `SearchInput`

**Tests**

- [ ] Integration: `getSongs()` — returns all songs ordered by `created_at` desc
- [ ] Integration: `getSongs(title)` — returns songs matching title, genre, scale or tags
- [ ] Integration: `getSongs(title)` — returns empty array when no match
- [ ] Unit: `useDebounce` — returns debounced value after specified delay
- [ ] Unit: `SearchInput` — pushes correct `?title=` to URL after debounce

---

## Next — v0.8 Account

**useUser Hook**

> Decide on architecture before implementing

- [ ] Decide: is Context + Provider necessary, or is standalone hook sufficient?
- [ ] Implement `useUser` hook with `userDetails`
- [ ] Refactor `app/api/upload/route.ts` — replace `supabase.auth.getUser()` with `useUser`

**User Profile Button**

- [ ] Replace login/register buttons in navbar → user profile button (authenticated state)
- [ ] Profile button links to account settings page — create `(pages)/account/settings`

**Tests**

- [ ] Unit: `useUser` — returns correct user details for authenticated user
- [ ] Unit: `useUser` — returns null for unauthenticated user
- [ ] Integration: profile button renders correctly for authenticated user
- [ ] Integration: profile button renders login/register links for unauthenticated user

---

## Done
