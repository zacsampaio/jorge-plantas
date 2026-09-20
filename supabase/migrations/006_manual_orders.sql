-- Ciclo 5 — venda de balcão registrada pelo painel.
--
-- A tabela orders exigia user_id, o que só funciona para pedido feito pelo
-- site por cliente cadastrado. A venda presencial não tem conta associada,
-- então user_id passa a ser opcional e o cliente é identificado por texto.

alter table public.orders alter column user_id drop not null;

alter table public.orders add column if not exists customer_name  text;
alter table public.orders add column if not exists customer_phone text;

alter table public.orders add column if not exists channel text not null
  default 'online';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'orders_channel_check'
  ) then
    alter table public.orders
      add constraint orders_channel_check
      check (channel in ('online', 'balcao'));
  end if;
end
$$;

-- Todo pedido precisa ser atribuível a alguém: ou a uma conta, ou a um nome.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'orders_customer_identified'
  ) then
    alter table public.orders
      add constraint orders_customer_identified
      check (user_id is not null or customer_name is not null);
  end if;
end
$$;

create index if not exists orders_channel_idx on public.orders (channel);

-- As políticas RLS existentes seguem corretas sem alteração:
-- orders_select_own compara auth.uid() = user_id, e comparação com null
-- resulta em null (nunca verdadeiro). Pedido de balcão, com user_id nulo,
-- fica invisível para clientes e acessível só por orders_admin_all.
