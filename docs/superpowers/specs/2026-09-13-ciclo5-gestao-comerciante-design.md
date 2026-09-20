# Ciclo 5 — Gestão para o comerciante (design)

**Data:** 13/09/2026
**Projeto:** Jorge Plantas — Projeto de Extensão
**Carga horária prevista:** 40h

## Problema

O Ciclo 4 entregou a integração com o Supabase: autenticação, catálogo dinâmico, pedidos e painel administrativo. A infraestrutura está em produção, mas a consulta ao banco em 13/09/2026 mostra o quadro real:

| Tabela | Registros |
|---|---|
| `orders` | 0 |
| `order_items` | 0 |
| `profiles` | 1 |
| `products` | 15 |

O Sr. Jorge vende todos os dias — mas no balcão e pelo WhatsApp, não pelo site. O sistema registra apenas o canal que ainda não é usado, e por isso não oferece nenhuma informação de gestão. Construir um painel de métricas sobre uma tabela vazia produziria telas em branco.

O Ciclo 5 resolve os dois lados do mesmo problema: primeiro dar ao comerciante um lugar para **registrar** a venda que ele já faz, depois transformar esse registro em **visão de gestão**.

## Escopo

Três entregas, nesta ordem de dependência:

1. Ajuste de modelo de dados que permita pedido sem cliente cadastrado;
2. Tela de registro manual de pedido no painel administrativo;
3. Dashboard com as métricas de venda do período.

### Fora de escopo

Pagamento online, controle de estoque e notificação de novo pedido. São demandas válidas, registradas para ciclos futuros, e não cabem nas 40h deste ciclo.

## 1. Modelo de dados

A tabela `orders`, criada na migration `004_orders_and_admin_profiles.sql`, exige `user_id not null` referenciando `profiles`. Uma venda de balcão não tem cliente cadastrado, então o registro manual é impossível sem alteração de schema.

**Migration `006_manual_orders.sql` e `007_sales_metrics.sql`:**

```sql
alter table public.orders alter column user_id drop not null;
alter table public.orders add column customer_name  text;
alter table public.orders add column customer_phone text;
alter table public.orders add column channel text not null default 'online'
  check (channel in ('online', 'balcao'));
```

### Efeito sobre as políticas RLS

Nenhuma política precisa mudar. `orders_select_own` usa `auth.uid() = user_id`; em SQL, uma comparação com `null` resulta em `null`, nunca em verdadeiro. Pedidos de balcão, que têm `user_id` nulo, ficam portanto invisíveis para qualquer cliente e acessíveis apenas pela política `orders_admin_all`, que já existe.

### Efeito sobre o código

- `CreateOrderInput` em `src/types/order.ts` passa a ter `userId?: string`, mais `customerName?`, `customerPhone?` e `channel`.
- `Order` ganha `channel` e `userId` opcional.
- `createOrderInDb` em `src/services/orders/orderDbService.ts` grava as colunas novas. O checkout público continua enviando `userId` e passa a enviar `channel: 'online'` explicitamente.
- `mapRowToOrder` prioriza `profiles.full_name` quando o pedido tem cliente cadastrado e cai para `customer_name` quando não tem.
- A venda de balcão não tem entrega. Como `delivery_fee` e `address` são `not null` no schema, `createOrderInDb` passa a aplicar os padrões da tabela quando o campo não vem preenchido: taxa zero e objeto vazio. O schema não muda por causa disso.

## 2. Registro manual de pedido

**Rota:** `/admin/orders/new`, dentro do bloco protegido por `allowedRoles={["admin"]}` em `src/Router.tsx`.

Componente `src/pages/Admin/OrderForm/`, seguindo o padrão já estabelecido por `src/pages/Admin/ProductForm/`: React Hook Form com resolver Zod, styled-components em `styled.ts`, feedback por Toast.

**Campos:**

| Campo | Regra |
|---|---|
| Nome do cliente | obrigatório, mínimo 3 caracteres |
| Telefone | opcional, formato brasileiro |
| Produtos | ao menos um item; seleção do catálogo ativo com quantidade |
| Forma de pagamento | obrigatório, mesmas opções do checkout |
| Status inicial | padrão `confirmed`, já que a venda presencial é fato consumado |

O total é calculado a partir dos itens e exibido em tempo real, sem campo editável — evita divergência entre o total gravado e a soma dos itens. O canal é fixado em `balcao`; o formulário existe justamente para esse caso.

**Listagem de pedidos** (`src/pages/Admin/Orders/index.tsx`): ganha o botão "Novo pedido" no `AdminHeader` e uma coluna de canal na tabela.

## 3. Dashboard

**Rota:** `/admin` passa a renderizar o dashboard. Hoje essa rota redireciona para `/admin/products`; o redirecionamento é removido.

### Métricas em SQL

As agregações ficam no banco, expostas por funções `security definer` com guarda de papel — o mesmo padrão de `public.is_admin()` já usado em `002_products.sql`. A alternativa, somar no cliente, exigiria trazer todos os pedidos do período para o navegador e deixaria de funcionar conforme o volume crescesse.

**`get_sales_summary(date_from date, date_to date)`** retorna uma linha:

| Coluna | Conteúdo |
|---|---|
| `revenue` | soma de `total` no período |
| `order_count` | número de pedidos |
| `average_ticket` | `revenue / order_count`, ou zero quando não há pedidos |
| `revenue_online` | soma de `total` com `channel = 'online'` |
| `revenue_balcao` | soma de `total` com `channel = 'balcao'` |

**`get_top_products(date_from date, date_to date)`** retorna até cinco linhas com `product_name`, `total_quantity` e `total_revenue`, ordenadas por quantidade decrescente, agregando `order_items` pelos pedidos do período.

Ambas ignoram pedidos com status `cancelled` e começam recusando a chamada quando `public.is_admin()` é falso.

### Tela

Componente `src/pages/Admin/Dashboard/`, consumindo as funções via `supabase.rpc()` por um serviço novo, `src/services/admin/metricsService.ts`.

- **Filtro de período:** 7, 30 ou 90 dias, via `Tabs` (componente já existente em `src/components/ui/Tabs/`), com 30 dias como padrão.
- **Cartões de KPI:** faturamento, pedidos, ticket médio e divisão online/balcão.
- **Top 5 produtos:** barras horizontais construídas com styled-components, largura proporcional à quantidade vendida. Sem biblioteca de gráfico — são cinco barras, e uma dependência nova custaria mais em bundle do que entregaria em clareza.
- **Estados:** `Skeleton` durante o carregamento e `EmptyState` quando o período não tem pedidos, reusando os componentes existentes.

Novo item na `SidebarNav` de `src/layouts/AdminLayout/index.tsx`, acima de Produtos.

## 4. Limpeza

`src/services/orders/orderMockService.ts` e `src/mocks/orders.ts` ficaram órfãos depois que o Ciclo 4 integrou os pedidos ao banco. São removidos neste ciclo.

## Validação

Testes manuais cobrindo:

- Registro de pedido de balcão e sua aparição na listagem com o canal correto;
- Invisibilidade do pedido de balcão na área do cliente (`/account/orders`) — verificação direta do efeito da RLS com `user_id` nulo;
- Cálculo das métricas conferido contra a soma manual dos pedidos do período;
- Dashboard em período sem vendas, exibindo o estado vazio em vez de erro;
- Acesso às funções RPC por usuário não-admin, que deve ser recusado.

Antes da entrega, o Sr. Jorge usa a tela de registro durante uma semana com as vendas reais da floricultura. Isso valida a usabilidade do formulário com o usuário final e popula o dashboard com os dados que sustentam o relatório do ciclo.

## Distribuição de horas

| Etapa | Horas |
|---|---|
| Reunião com o Sr. Jorge e planejamento técnico | 4h |
| Migration e ajuste do serviço de pedidos | 5h |
| Tela de registro manual de pedido | 12h |
| Funções SQL de métricas | 6h |
| Tela de dashboard | 9h |
| Testes, deploy e relatório | 4h |
| **Total** | **40h** |

## Critérios de conclusão

- O Sr. Jorge registra uma venda de balcão sem passar por cadastro de cliente;
- A venda registrada aparece no dashboard dentro do período correspondente;
- Nenhum cliente enxerga pedidos que não são seus;
- O dashboard distingue faturamento de site e de balcão;
- `npm run build` e `npm run lint` passam sem erro.
