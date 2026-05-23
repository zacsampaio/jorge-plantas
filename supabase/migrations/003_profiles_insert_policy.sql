-- Permite criar o próprio perfil se o trigger falhar (fallback no app)
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = id);
