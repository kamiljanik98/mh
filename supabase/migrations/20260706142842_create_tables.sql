create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  nickname text,
  avatar_url text,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.songs (
  id uuid primary key default gen_random_uuid(),
  uploaded_by uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  path text not null,
  image_path text,
  description text,
  genre text,
  scale text,
  bpm integer,
  tags text[],
  created_at timestamptz not null default now()
);

create table public.stems (
  id uuid primary key default gen_random_uuid(),
  song_id uuid not null references public.songs(id) on delete cascade,
  name text not null,
  path text not null,
  created_at timestamptz not null default now()
);