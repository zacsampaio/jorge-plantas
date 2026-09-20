-- Ciclo 5 — métricas de venda para o dashboard administrativo.
--
-- A agregação fica no banco: trazer todos os pedidos do período para o
-- navegador e somar lá deixaria de funcionar conforme o volume crescesse.
-- Pedidos cancelados não entram em nenhuma métrica.

create or replace function public.get_sales_summary(
  date_from date,
  date_to   date
)
returns table (
  revenue         numeric,
  order_count     bigint,
  average_ticket  numeric,
  revenue_online  numeric,
  revenue_balcao  numeric
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'acesso negado';
  end if;

  return query
  select
    coalesce(sum(o.total), 0)::numeric                                    as revenue,
    count(*)::bigint                                                      as order_count,
    case
      when count(*) = 0 then 0::numeric
      else round(coalesce(sum(o.total), 0) / count(*), 2)
    end                                                                   as average_ticket,
    coalesce(sum(o.total) filter (where o.channel = 'online'), 0)::numeric as revenue_online,
    coalesce(sum(o.total) filter (where o.channel = 'balcao'), 0)::numeric as revenue_balcao
  from public.orders o
  where o.status <> 'cancelled'
    and o.created_at >= date_from
    and o.created_at < (date_to + 1);
end;
$$;

create or replace function public.get_top_products(
  date_from date,
  date_to   date
)
returns table (
  product_name   text,
  total_quantity bigint,
  total_revenue  numeric
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'acesso negado';
  end if;

  return query
  select
    i.product_name,
    sum(i.quantity)::bigint                      as total_quantity,
    sum(i.quantity * i.unit_price)::numeric      as total_revenue
  from public.order_items i
  join public.orders o on o.id = i.order_id
  where o.status <> 'cancelled'
    and o.created_at >= date_from
    and o.created_at < (date_to + 1)
  group by i.product_name
  order by total_quantity desc
  limit 5;
end;
$$;

-- Só quem está autenticado pode sequer tentar chamar; a guarda de admin
-- está dentro da função.
revoke execute on function public.get_sales_summary(date, date) from public, anon;
revoke execute on function public.get_top_products(date, date)  from public, anon;
grant  execute on function public.get_sales_summary(date, date) to authenticated;
grant  execute on function public.get_top_products(date, date)  to authenticated;
