create or replace function public.handle_new_user()
returns trigger as $$
declare
  raw_nickname text;
  clean_nickname text;
begin
  raw_nickname := coalesce(
    new.raw_user_meta_data->>'nickname',
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'full_name',
    split_part(new.email, '@', 1)
  );

  clean_nickname := lower(left(regexp_replace(raw_nickname, '[^a-zA-Z0-9_.-]', '', 'g'), 32));

  if length(clean_nickname) < 3 then
    clean_nickname := 'user_' || left(new.id::text, 8);
  end if;

  insert into public.profiles (id, email, nickname)
  values (new.id, new.email, clean_nickname);

  return new;
end;
$$ language plpgsql security definer;