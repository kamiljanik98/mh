create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
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

  clean_nickname := lower(regexp_replace(raw_nickname, '[^a-zA-Z0-9_.-]', '', 'g'));
  clean_nickname := left(clean_nickname, 32);

  if clean_nickname is null or clean_nickname = '' then
    clean_nickname := 'user_' || replace(new.id::text, '-', '');
  end if;

  insert into public.profiles (id, email, nickname)
  values (new.id, new.email, clean_nickname);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();