-- Correções apontadas pelo Security Advisor do Supabase.
-- Aplicar no SQL Editor do painel ou via CLI.

-- 1. handle_new_user() é função de gatilho: roda sozinha quando um usuário
--    é criado em auth.users. Ninguém precisa chamá-la diretamente, e por ser
--    SECURITY DEFINER ela roda com privilégios elevados. Revogamos a execução
--    de todos os papéis do cliente. O gatilho continua funcionando porque
--    gatilhos executam com o dono da função, não com o papel do chamador.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- 2. is_admin() NÃO pode ter o execute revogado.
--    Ela é chamada de dentro das políticas RLS de products, orders,
--    order_items, profiles e storage.objects. No PostgreSQL, a expressão de
--    uma policy é avaliada com o papel de quem faz a consulta — sem EXECUTE
--    para authenticated, toda consulta dessas tabelas passa a falhar com
--    "permission denied for function is_admin".
--    O aviso do advisor é aceitável aqui: a função não recebe parâmetros e só
--    responde se QUEM CHAMA é admin, então não há informação a vazar nem
--    superfície de abuso. Mantida de propósito.

-- 3. Bucket products: a policy antiga dava SELECT em storage.objects para
--    qualquer visitante, o que permite LISTAR todos os arquivos do bucket.
--    As imagens do site não dependem dela: ProductImage usa getPublicUrl(),
--    que serve pelo CDN público sem consultar RLS. Restringimos a leitura
--    da tabela de objetos aos admins, que precisam dela para o upsert de
--    imagem no painel.
drop policy if exists "products_storage_public_read" on storage.objects;

drop policy if exists "products_storage_admin_read" on storage.objects;
create policy "products_storage_admin_read"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'products' and public.is_admin());
