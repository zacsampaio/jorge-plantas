import styled from "styled-components";

/**
 * Cores de dados validadas pelo script do guia de visualização contra o
 * fundo branco dos cartões: azul e laranja passam nos seis checks, inclusive
 * separação para daltonismo (ΔE 24,7). O verde da marca reprovou nesse teste
 * contra o laranja (ΔE 5,4), então ele fica restrito à série única do gráfico
 * de faturamento, onde não há par a distinguir.
 */
export const SERIES_ONLINE = "#2a78d6";
export const SERIES_BALCAO = "#eb6834";
export const SERIES_TREND = "#228B44";

export const DashboardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PeriodHint = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  color: ${(props) => props.theme["gray-600"]};
`;

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Card = styled.section`
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme["gray-300"]};
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const KpiCard = styled.div`
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme["gray-300"]};
  border-radius: 14px;
  padding: 1.125rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const KpiLabel = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  color: ${(props) => props.theme["gray-600"]};
`;

export const KpiValue = styled.strong<{ $hero?: boolean }>`
  font-family: "Baloo 2", sans-serif;
  font-size: ${(props) => (props.$hero ? "2.25rem" : "1.625rem")};
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme["gray-900"]};
  font-variant-numeric: tabular-nums;
`;

export const DeltaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  color: ${(props) => props.theme["gray-600"]};
`;

export const DeltaTag = styled.span<{ $tone: "up" | "down" | "flat" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 700;
  color: ${(props) => {
    if (props.$tone === "up") return "#1e7e4a";
    if (props.$tone === "down") return "#c0392b";
    return props.theme["gray-600"];
  }};
`;

export const CardTitle = styled.h2`
  font-family: "Baloo 2", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme["gray-800"]};
  margin: 0;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const TableToggle = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;
  color: ${(props) => props.theme["green-600"]};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${(props) => props.theme["gray-800"]};
  }
`;

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
`;

/* ---------- gráfico de linha ---------- */

export const ChartFrame = styled.div`
  position: relative;
  width: 100%;
  touch-action: none;
`;

export const ChartSvg = styled.svg`
  display: block;
  width: 100%;
  height: 260px;
  overflow: visible;

  .grid {
    stroke: ${(props) => props.theme["gray-300"]};
    stroke-width: 1;
  }

  .area {
    fill: ${SERIES_TREND};
    opacity: 0.1;
  }

  .line {
    fill: none;
    stroke: ${SERIES_TREND};
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  .crosshair-line {
    stroke: ${(props) => props.theme["gray-600"]};
    stroke-width: 1;
  }

  .marker {
    fill: ${SERIES_TREND};
    stroke: ${(props) => props.theme.white};
    stroke-width: 2;
  }
`;

export const Crosshair = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  color: ${(props) => props.theme["gray-600"]};
`;

export const Tooltip = styled.div`
  position: absolute;
  top: -0.25rem;
  transform: translateX(-50%);
  pointer-events: none;
  background: ${(props) => props.theme["gray-900"]};
  color: ${(props) => props.theme.white};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
`;

export const TooltipValue = styled.strong`
  font-family: "Baloo 2", sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const TooltipLabel = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.6875rem;
  opacity: 0.8;
`;

/* ---------- barra empilhada ---------- */

export const StackTrack = styled.div`
  display: flex;
  width: 100%;
  height: 2.25rem;
  border-radius: 6px;
  overflow: hidden;
  background: ${(props) => props.theme["gray-300"]};
  /* O respiro de 2px entre segmentos é a cor da superfície, não uma borda. */
  gap: 2px;
`;

export const StackSegment = styled.div<{ $percent: number; $color: string }>`
  width: ${(props) => props.$percent}%;
  background: ${(props) => props.$color};
  transition: width 0.2s ease;
`;

export const Legend = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-800"]};

  strong {
    margin-left: auto;
    font-variant-numeric: tabular-nums;
  }

  span {
    color: ${(props) => props.theme["gray-600"]};
    font-size: 0.8125rem;
    font-variant-numeric: tabular-nums;
  }
`;

export const Swatch = styled.span<{ $color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 3px;
  flex-shrink: 0;
  background: ${(props) => props.$color};
`;

/* ---------- barras horizontais ---------- */

export const BarList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

export const BarItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  cursor: default;

  &:hover > div:last-child > div {
    opacity: 0.85;
  }
`;

export const BarHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  color: ${(props) => props.theme["gray-800"]};

  span {
    color: ${(props) => props.theme["gray-600"]};
    font-size: 0.8125rem;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
`;

export const BarTrack = styled.div`
  width: 100%;
  height: 0.5rem;
  border-radius: 999px;
  background: ${(props) => props.theme["gray-300"]};
`;

export const BarFill = styled.div<{ $percent: number; $color: string }>`
  width: ${(props) => Math.max(props.$percent, 2)}%;
  height: 100%;
  /* Ponta arredondada só no fim da barra; a base fica reta na linha zero. */
  border-radius: 0 4px 4px 0;
  background: ${(props) => props.$color};
  transition: opacity 0.15s;
`;

/* ---------- tabela alternativa ---------- */

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Roboto", sans-serif;
  font-size: 0.8125rem;

  th,
  td {
    text-align: left;
    padding: 0.5rem 0.625rem;
    border-bottom: 1px solid ${(props) => props.theme["gray-300"]};
  }

  th {
    color: ${(props) => props.theme["gray-600"]};
    font-weight: 600;
  }

  td {
    color: ${(props) => props.theme["gray-800"]};
    font-variant-numeric: tabular-nums;
  }

  td:last-child,
  th:last-child {
    text-align: right;
  }
`;

export const TableScroll = styled.div`
  max-height: 16rem;
  overflow-y: auto;
`;
