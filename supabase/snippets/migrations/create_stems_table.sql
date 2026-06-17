create table public.stems (
  id uuid default gen_random_uuid() primary key,
  song_id uuid references public.songs(id) on delete cascade not null,
  name text not null,
  path text not null,
  created_at timestamp with time zone default now() not null
);