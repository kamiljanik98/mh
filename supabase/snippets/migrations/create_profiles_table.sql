create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  nickname text unique,
  avatar_url text,
  role text not null default 'user',
  email text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);