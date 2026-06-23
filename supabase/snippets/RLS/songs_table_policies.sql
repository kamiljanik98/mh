alter table public.songs enable row level security;

create policy "Songs are public" on public.songs
  for select using (true);

create policy "User can insert own songs" on public.songs
  for insert with check (auth.uid() = uploaded_by);

create policy "User can delete own songs" on public.songs
  for delete using (auth.uid() = uploaded_by);