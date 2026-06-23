create table public.songs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  uploaded_by uuid references public.profiles(id) on delete cascade not null,
  path text not null,
  image_path text,
  bpm integer,
  scale text,
  genre text,
  tags text[],
  created_at timestamp with time zone default now() not null
);