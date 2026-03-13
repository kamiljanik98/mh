# music-hub

Platform for music producers — upload, browse, play and download tracks with stem support.

## Features

- Upload tracks with cover image and metadata (BPM, scale, genre, tags)
- Stream and download audio directly from Cloudflare R2
- Stem support — upload and access individual stem files per track
- Browse feed of all tracks across the platform
- Personal library — your uploaded tracks

## Planned

- Likes and favorites — save tracks to personal library
- Library — personal collection of uploaded and saved tracks
- Albums — group multiple tracks into a release
- Pricing — producer tiers with upload limits and storage quotas

## Stack

- **Next.js 14** — App Router, TypeScript
- **Supabase** — database, auth
- **Cloudflare R2** — file storage (audio, covers)
- **Zustand** — player state
- **Shadcn UI** — component library

## Architecture

- Supabase handles `profiles`, `songs`, `stems` tables and authentication
- Cloudflare R2 handles all file storage — bucket `songs` (private, presigned URLs) and `covers` (public)
- File paths stored as relative in DB — full URLs constructed at runtime via helpers in `lib/r2/storage.ts`

## Dev Setup

```bash
npm install
supabase start
cp .env.example .env.local
npm run dev
```

## Roadmap

- v0.1 — Initial Setup — infrastructure, database, R2
- v0.2 — Auth — PKCE, Discord, useUser hook
- v0.3 — Player — Zustand store, hooks, audio playback
- v0.4 — Upload — upload form, stems, R2 integration
- v0.5 — Search — filter by title, genre, scale, tags
