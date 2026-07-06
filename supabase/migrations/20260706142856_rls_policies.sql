alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
on public.profiles for select
to authenticated, anon
using (true);

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

grant select on public.profiles to authenticated, anon;
grant update on public.profiles to authenticated;

alter table public.songs enable row level security;

create policy "Songs are viewable by everyone"
on public.songs for select
to authenticated, anon
using (true);

create policy "Users can insert own songs"
on public.songs for insert
to authenticated
with check (auth.uid() = uploaded_by);

create policy "Users can update own songs"
on public.songs for update
to authenticated
using (auth.uid() = uploaded_by)
with check (auth.uid() = uploaded_by);

create policy "Users can delete own songs"
on public.songs for delete
to authenticated
using (auth.uid() = uploaded_by);

grant select on public.songs to authenticated, anon;
grant insert, update, delete on public.songs to authenticated;

alter table public.stems enable row level security;

create policy "Stems viewable by everyone"
on public.stems for select
to authenticated, anon
using (true);

create policy "Users can insert stems for own songs"
on public.stems for insert
to authenticated
with check (
  exists (
    select 1 from public.songs
    where songs.id = stems.song_id
    and songs.uploaded_by = auth.uid()
  )
);

create policy "Users can delete stems for own songs"
on public.stems for delete
to authenticated
using (
  exists (
    select 1 from public.songs
    where songs.id = stems.song_id
    and songs.uploaded_by = auth.uid()
  )
);

grant select on public.stems to authenticated, anon;
grant insert, delete on public.stems to authenticated;