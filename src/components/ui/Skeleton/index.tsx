import { SkeletonBlock, SkeletonGroup } from "./styled";

interface SkeletonProps {
  lines?: number;
  height?: string;
}

export function Skeleton({ lines = 3, height = "1rem" }: SkeletonProps) {
  return (
    <SkeletonGroup aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBlock
          key={index}
          $height={height}
          $width={index === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </SkeletonGroup>
  );
}

export function OrderCardSkeleton() {
  return (
    <SkeletonGroup aria-label="Carregando pedidos">
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonBlock key={index} $height="5rem" />
      ))}
    </SkeletonGroup>
  );
}
