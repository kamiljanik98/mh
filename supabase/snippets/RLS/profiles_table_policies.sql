alter table public.profiles enable row level security;

create policy "Profiles are public" on public.profiles
  for select using (true);

create policy "User can update own profile" on public.profiles
  for update using (auth.uid() = id);