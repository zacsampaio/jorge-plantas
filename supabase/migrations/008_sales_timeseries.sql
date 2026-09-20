-- Ciclo 5 — séries para os gráficos do dashboard.

-- Faturamento e pedidos por dia. Dias sem venda voltam com zero em vez de
-- sumirem: uma linha que pula os dias vazios mente sobre a continuidade.
create or replace function public.get_sales_by_day(
  date_from date,
  date_to   date
)
returns table (
  day          date,
  revenue      numeric,
  order_count  bigint
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
    serie.day::date,
    coalesce(sum(o.total), 0)::numeric as revenue,
    count(o.id)::bigint                as order_count
  from generate_series(date_from, date_to, interval '1 day') as serie(day)
  left join public.orders o
    on o.created_at >= serie.day
   and o.created_at <  serie.day + interval '1 day'
   and o.status <> 'cancelled'
  group by serie.day
  order by serie.day;
end;
$$;

-- Quantos pedidos em cada situação, para o comerciante ver o que está parado.
-- Aqui os cancelados entram: a informação é justamente quantos foram perdidos.
create or replace function public.get_orders_by_status(
  date_from date,
  date_to   date
)
returns table (
  status       text,
  order_count  bigint,
  total_value  numeric
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
    o.status::text,
    count(*)::bigint              as order_count,
    coalesce(sum(o.total), 0)::numeric as total_value
  from public.orders o
  where o.created_at >= date_from
    and o.created_at <  (date_to + 1)
  group by o.status
  order by count(*) desc;
end;
$$;

revoke execute on function public.get_sales_by_day(date, date)     from public, anon;
revoke execute on function public.get_orders_by_status(date, date)  from public, anon;
grant  execute on function public.get_sales_by_day(date, date)     to authenticated;
grant  execute on function public.get_orders_by_status(date, date)  to authenticated;
