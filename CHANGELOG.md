# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.1.0] - 2026-03-10

### Added

**UI Foundation**
- Initialized Shadcn UI component library
- Added core components: Button, Input, Card
<!-- - Configured DM Sans as primary font
- Update global styles with fonts and  -->

**Database Infrastructure**
- Configured Supabase local development environment
- Created `profiles` table with RLS policies
- Created `songs` table with RLS policies
- Generated TypeScript types for type-safe database queries

**Supabase Integration**
- Implemented browser client (`lib/supabase/client.ts`)
- Implemented server-side client with SSR support (`lib/supabase/server.ts`)
- Set up middleware proxy for authentication (`lib/supabase/proxy.ts`)

**Cloud Storage**
- Configured Cloudflare R2 for file storage (zero egress fees)
- Created `songs` bucket for audio files (MP3, WAV)
- Created `covers` bucket for cover images with public access
- Implemented S3-compatible R2 client (`lib/r2/client.ts`)
- Created upload handlers for audio and image files (`lib/r2/upload.ts`)
- Implemented storage utilities for retrieving file URLs (`lib/r2/storage.ts`)

**Developer Experience**
- Set up environment variables for Supabase and R2
- Created infrastructure verification page (removed post-testing)
- Verified end-to-end connectivity between Next.js, Supabase, and R2

---