alter table public.stems enable row level security;

create policy "Stems are public" on public.stems
  for select using (true);

create policy "User can insert own stems" on public.stems
  for insert with check (
    auth.uid() = (
      select uploaded_by from public.songs where id = song_id
    )
  );

create policy "User can delete own stems" on public.stems
  for delete using (
    auth.uid() = (
      select uploaded_by from public.songs where id = song_id
    )
  );