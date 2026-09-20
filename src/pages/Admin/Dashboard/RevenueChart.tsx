import { useMemo, useRef, useState } from "react";
import type { DayPoint } from "../../../services/admin/metricsService";
import { formatCurrency } from "../../../utils/format";
import {
  ChartFrame,
  ChartSvg,
  Crosshair,
  Tooltip,
  TooltipLabel,
  TooltipValue,
} from "./styled";

/**
 * Faturamento por dia. Série única, então não leva legenda — o título do
 * painel já diz o que está plotado.
 *
 * Desenhado em SVG com viewBox e preserveAspectRatio="none": o traçado é
 * calculado num espaço fixo de 1000x260 e a caixa estica junto com a tela.
 * Por isso o texto fica em HTML, fora do SVG, e não deforma junto.
 */

const VIEW_W = 1000;
const VIEW_H = 260;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

interface RevenueChartProps {
  points: DayPoint[];
}

function formatDay(iso: string): string {
  const [, month, day] = iso.split("-");
  return `${day}/${month}`;
}

export function RevenueChart({ points }: RevenueChartProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const geometry = useMemo(() => {
    if (points.length === 0) return null;

    const maxRevenue = Math.max(...points.map((point) => point.revenue), 1);
    const usableHeight = VIEW_H - PAD_TOP - PAD_BOTTOM;
    const step = points.length > 1 ? VIEW_W / (points.length - 1) : 0;

    const coords = points.map((point, index) => ({
      x: points.length > 1 ? index * step : VIEW_W / 2,
      y: PAD_TOP + usableHeight * (1 - point.revenue / maxRevenue),
    }));

    const line = coords
      .map((coord, index) => `${index === 0 ? "M" : "L"}${coord.x},${coord.y}`)
      .join(" ");

    const baseline = VIEW_H - PAD_BOTTOM;
    const area = `${line} L${coords[coords.length - 1].x},${baseline} L${coords[0].x},${baseline} Z`;

    // Três linhas de grade, em números redondos.
    const gridValues = [0, maxRevenue / 2, maxRevenue];
    const grid = gridValues.map((value) => ({
      value,
      y: PAD_TOP + usableHeight * (1 - value / maxRevenue),
    }));

    return { coords, line, area, grid, maxRevenue, baseline };
  }, [points]);

  if (!geometry) return null;

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    if (!frame || points.length === 0) return;

    const rect = frame.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const index = Math.round(ratio * (points.length - 1));

    setActiveIndex(Math.min(Math.max(index, 0), points.length - 1));
  };

  const active = activeIndex === null ? null : points[activeIndex];
  const activeCoord = activeIndex === null ? null : geometry.coords[activeIndex];
  const activeRatio =
    activeCoord === null ? 0 : (activeCoord.x / VIEW_W) * 100;

  return (
    <ChartFrame
      ref={frameRef}
      onPointerMove={handlePointer}
      onPointerLeave={() => setActiveIndex(null)}
      role="img"
      aria-label={`Faturamento por dia, de ${formatDay(points[0].day)} a ${formatDay(points[points.length - 1].day)}`}
    >
      <ChartSvg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none">
        {geometry.grid.map((line) => (
          <line
            key={line.value}
            x1={0}
            x2={VIEW_W}
            y1={line.y}
            y2={line.y}
            className="grid"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <path d={geometry.area} className="area" />
        <path
          d={geometry.line}
          className="line"
          vectorEffect="non-scaling-stroke"
        />

        {activeCoord && (
          <>
            <line
              x1={activeCoord.x}
              x2={activeCoord.x}
              y1={PAD_TOP}
              y2={geometry.baseline}
              className="crosshair-line"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={activeCoord.x}
              cy={activeCoord.y}
              r={5}
              className="marker"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
      </ChartSvg>

      <Crosshair aria-hidden="true">
        <span>{formatDay(points[0].day)}</span>
        <span>{formatCurrency(geometry.maxRevenue)} no pico</span>
        <span>{formatDay(points[points.length - 1].day)}</span>
      </Crosshair>

      {active && (
        <Tooltip style={{ left: `${activeRatio}%` }} role="status">
          <TooltipValue>{formatCurrency(active.revenue)}</TooltipValue>
          <TooltipLabel>
            {formatDay(active.day)} · {active.orderCount}{" "}
            {active.orderCount === 1 ? "pedido" : "pedidos"}
          </TooltipLabel>
        </Tooltip>
      )}
    </ChartFrame>
  );
}
