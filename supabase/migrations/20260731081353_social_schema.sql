create type public.stem_category as enum (
  'vocals',
  'drums',
  'bass',
  'melody',
  'guitar',
  'synth',
  'fx',
  'other'
);

alter table public.stems drop column name;
alter table public.stems add column category public.stem_category not null;

alter table public.profiles add column bio text;

alter table public.profiles
  add constraint bio_max_length check (char_length(bio) <= 800);

create table public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id != following_id)
);

alter table public.follows enable row level security;

create policy "public read"
on public.follows for select
using (true);

create policy "insert own"
on public.follows for insert
with check (auth.uid() = follower_id);

create policy "delete own"
on public.follows for delete
using (auth.uid() = follower_id);

grant select on public.follows to authenticated, anon;
grant insert, delete on public.follows to authenticated;

create table public.likes (
  user_id uuid not null references auth.users(id) on delete cascade,
  song_id uuid not null references public.songs(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, song_id)
);

alter table public.likes enable row level security;

create policy "public read"
on public.likes for select
using (true);

create policy "insert own"
on public.likes for insert
with check (auth.uid() = user_id);

create policy "delete own"
on public.likes for delete
using (auth.uid() = user_id);

grant select on public.likes to authenticated, anon;
grant insert, delete on public.likes to authenticated;

grant select, insert, update, delete on public.profiles to service_role;
grant select, insert, update, delete on public.songs to service_role;
grant select, insert, update, delete on public.stems to service_role;
grant select, insert, update, delete on public.follows to service_role;
grant select, insert, update, delete on public.likes to service_role;
