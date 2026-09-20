import { useCallback, useEffect, useState } from "react";
import { Alert } from "../../../components/ui/Alert";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Skeleton } from "../../../components/ui/Skeleton";
import { Tabs } from "../../../components/ui/Tabs";
import { AdminHeader, AdminTitle } from "../../../layouts/AdminLayout/styled";
import {
  buildPeriodRange,
  buildPreviousPeriodRange,
  EMPTY_SUMMARY,
  fetchNewCustomers,
  fetchOrdersByStatus,
  fetchSalesByDay,
  fetchSalesSummary,
  fetchTopProducts,
  percentChange,
  type DayPoint,
  type SalesSummary,
  type StatusSlice,
  type TopProduct,
} from "../../../services/admin/metricsService";
import { formatCurrency, ORDER_STATUS_LABELS } from "../../../utils/format";
import type { OrderStatus } from "../../../types/order";
import { RevenueChart } from "./RevenueChart";
import {
  BarFill,
  BarHeader,
  BarItem,
  BarList,
  BarTrack,
  Card,
  CardHeader,
  CardTitle,
  DashboardStack,
  DataTable,
  DeltaRow,
  DeltaTag,
  FilterRow,
  KpiCard,
  KpiGrid,
  KpiLabel,
  KpiValue,
  Legend,
  LegendItem,
  PeriodHint,
  SERIES_BALCAO,
  SERIES_ONLINE,
  SERIES_TREND,
  StackSegment,
  StackTrack,
  Swatch,
  TableScroll,
  TableToggle,
  TwoColumn,
} from "./styled";

const PERIODS = [
  { id: "7", label: "7 dias" },
  { id: "30", label: "30 dias" },
  { id: "90", label: "90 dias" },
];

function formatPercent(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(1).replace(".", ",")}%`;
}

function formatRangeLabel(days: number): string {
  const { dateFrom, dateTo } = buildPeriodRange(days);
  const br = (iso: string) => iso.split("-").reverse().slice(0, 2).join("/");
  return `${br(dateFrom)} a ${br(dateTo)}`;
}

interface DeltaProps {
  current: number;
  previous: number;
}

/** Comparação com a janela anterior do mesmo tamanho. */
function Delta({ current, previous }: DeltaProps) {
  const change = percentChange(current, previous);

  if (change === null) {
    return (
      <DeltaRow>
        <DeltaTag $tone="flat">—</DeltaTag>
        sem base no período anterior
      </DeltaRow>
    );
  }

  const tone = change > 0 ? "up" : change < 0 ? "down" : "flat";

  return (
    <DeltaRow>
      <DeltaTag $tone={tone}>
        {tone === "up" ? "▲" : tone === "down" ? "▼" : "■"}{" "}
        {formatPercent(change)}
      </DeltaTag>
      vs. período anterior
    </DeltaRow>
  );
}

export function AdminDashboardPage() {
  const [period, setPeriod] = useState("30");
  const [summary, setSummary] = useState<SalesSummary>(EMPTY_SUMMARY);
  const [previous, setPrevious] = useState<SalesSummary>(EMPTY_SUMMARY);
  const [points, setPoints] = useState<DayPoint[]>([]);
  const [statuses, setStatuses] = useState<StatusSlice[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [newCustomers, setNewCustomers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);

  const load = useCallback(async (days: number) => {
    setIsLoading(true);
    setError(null);

    const [current, prior, daily, byStatus, products, customers] =
      await Promise.all([
        fetchSalesSummary(days),
        fetchSalesSummary(days, buildPreviousPeriodRange(days)),
        fetchSalesByDay(days),
        fetchOrdersByStatus(days),
        fetchTopProducts(days),
        fetchNewCustomers(days),
      ]);

    setSummary(current.summary);
    setPrevious(prior.summary);
    setPoints(daily.points);
    setStatuses(byStatus.slices);
    setTopProducts(products.products);
    setNewCustomers(customers.count);

    setError(
      current.error ??
        daily.error ??
        byStatus.error ??
        products.error ??
        customers.error
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void load(Number(period));
  }, [load, period]);

  const days = Number(period);
  const hasSales = summary.orderCount > 0;
  const channelTotal = summary.revenueOnline + summary.revenueBalcao;
  const onlineShare = channelTotal > 0 ? (summary.revenueOnline / channelTotal) * 100 : 0;
  const balcaoShare = channelTotal > 0 ? (summary.revenueBalcao / channelTotal) * 100 : 0;
  const maxQuantity = topProducts.reduce(
    (max, product) => Math.max(max, product.totalQuantity),
    0
  );
  const totalStatusOrders = statuses.reduce(
    (acc, slice) => acc + slice.orderCount,
    0
  );

  return (
    <>
      <AdminHeader>
        <AdminTitle>Visão geral</AdminTitle>
      </AdminHeader>

      <DashboardStack>
        <FilterRow>
          <Tabs
            tabs={PERIODS}
            activeTab={period}
            onChange={setPeriod}
            ariaLabel="Período das métricas"
          />
          <PeriodHint>{formatRangeLabel(days)}</PeriodHint>
        </FilterRow>

        {error && <Alert variant="error">{error}</Alert>}

        {isLoading && <Skeleton lines={5} height="5rem" />}

        {!isLoading && !error && (
          <>
            <KpiGrid>
              <KpiCard>
                <KpiLabel>Faturamento</KpiLabel>
                <KpiValue $hero>{formatCurrency(summary.revenue)}</KpiValue>
                <Delta current={summary.revenue} previous={previous.revenue} />
              </KpiCard>

              <KpiCard>
                <KpiLabel>Pedidos</KpiLabel>
                <KpiValue>{summary.orderCount}</KpiValue>
                <Delta
                  current={summary.orderCount}
                  previous={previous.orderCount}
                />
              </KpiCard>

              <KpiCard>
                <KpiLabel>Ticket médio</KpiLabel>
                <KpiValue>{formatCurrency(summary.averageTicket)}</KpiValue>
                <Delta
                  current={summary.averageTicket}
                  previous={previous.averageTicket}
                />
              </KpiCard>

              <KpiCard>
                <KpiLabel>Clientes novos</KpiLabel>
                <KpiValue>{newCustomers}</KpiValue>
                <DeltaRow>contas criadas no período</DeltaRow>
              </KpiCard>
            </KpiGrid>

            <Card>
              <CardHeader>
                <CardTitle>Faturamento por dia</CardTitle>
                <TableToggle
                  type="button"
                  onClick={() => setShowTable((current) => !current)}
                >
                  {showTable ? "Ver gráfico" : "Ver tabela"}
                </TableToggle>
              </CardHeader>

              {!hasSales ? (
                <EmptyState
                  title="Nenhuma venda no período"
                  description="Registre uma venda de balcão ou aguarde pedidos pelo site."
                />
              ) : showTable ? (
                <TableScroll>
                  <DataTable>
                    <thead>
                      <tr>
                        <th>Dia</th>
                        <th>Pedidos</th>
                        <th>Faturamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {points
                        .filter((point) => point.orderCount > 0)
                        .map((point) => (
                          <tr key={point.day}>
                            <td>
                              {point.day.split("-").reverse().join("/")}
                            </td>
                            <td>{point.orderCount}</td>
                            <td>{formatCurrency(point.revenue)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </DataTable>
                </TableScroll>
              ) : (
                <RevenueChart points={points} />
              )}
            </Card>

            <TwoColumn>
              <Card>
                <CardTitle>Site x Balcão</CardTitle>

                {channelTotal === 0 ? (
                  <EmptyState
                    title="Sem faturamento no período"
                    description="A divisão por canal aparece assim que houver vendas."
                  />
                ) : (
                  <>
                    <StackTrack
                      role="img"
                      aria-label={`Site ${onlineShare.toFixed(0)}%, balcão ${balcaoShare.toFixed(0)}%`}
                    >
                      <StackSegment
                        $percent={onlineShare}
                        $color={SERIES_ONLINE}
                      />
                      <StackSegment
                        $percent={balcaoShare}
                        $color={SERIES_BALCAO}
                      />
                    </StackTrack>

                    <Legend>
                      <LegendItem>
                        <Swatch $color={SERIES_ONLINE} />
                        Site
                        <span>{onlineShare.toFixed(0)}%</span>
                        <strong>{formatCurrency(summary.revenueOnline)}</strong>
                      </LegendItem>
                      <LegendItem>
                        <Swatch $color={SERIES_BALCAO} />
                        Balcão
                        <span>{balcaoShare.toFixed(0)}%</span>
                        <strong>{formatCurrency(summary.revenueBalcao)}</strong>
                      </LegendItem>
                    </Legend>
                  </>
                )}
              </Card>

              <Card>
                <CardTitle>Situação dos pedidos</CardTitle>

                {statuses.length === 0 ? (
                  <EmptyState
                    title="Nenhum pedido no período"
                    description="Inclui cancelados, para você ver o que foi perdido."
                  />
                ) : (
                  <BarList>
                    {statuses.map((slice) => (
                      <BarItem
                        key={slice.status}
                        title={`${slice.orderCount} pedido(s) · ${formatCurrency(slice.totalValue)}`}
                      >
                        <BarHeader>
                          <strong>
                            {ORDER_STATUS_LABELS[slice.status as OrderStatus] ??
                              slice.status}
                          </strong>
                          <span>
                            {slice.orderCount} ·{" "}
                            {formatCurrency(slice.totalValue)}
                          </span>
                        </BarHeader>
                        <BarTrack>
                          <BarFill
                            $percent={
                              totalStatusOrders > 0
                                ? (slice.orderCount / totalStatusOrders) * 100
                                : 0
                            }
                            $color={
                              slice.status === "cancelled"
                                ? SERIES_BALCAO
                                : SERIES_ONLINE
                            }
                          />
                        </BarTrack>
                      </BarItem>
                    ))}
                  </BarList>
                )}
              </Card>
            </TwoColumn>

            <Card>
              <CardTitle>Mais vendidos</CardTitle>

              {topProducts.length === 0 ? (
                <EmptyState
                  title="Nenhuma venda no período"
                  description="O ranking aparece assim que houver pedidos."
                />
              ) : (
                <BarList>
                  {topProducts.map((product) => (
                    <BarItem
                      key={product.productName}
                      title={`${product.totalQuantity} unidade(s) · ${formatCurrency(product.totalRevenue)}`}
                    >
                      <BarHeader>
                        <strong>{product.productName}</strong>
                        <span>
                          {product.totalQuantity} un ·{" "}
                          {formatCurrency(product.totalRevenue)}
                        </span>
                      </BarHeader>
                      <BarTrack>
                        <BarFill
                          $percent={
                            maxQuantity > 0
                              ? (product.totalQuantity / maxQuantity) * 100
                              : 0
                          }
                          $color={SERIES_TREND}
                        />
                      </BarTrack>
                    </BarItem>
                  ))}
                </BarList>
              )}
            </Card>
          </>
        )}
      </DashboardStack>
    </>
  );
}
