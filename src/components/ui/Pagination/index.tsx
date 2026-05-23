import { useMemo } from "react";
import {
  NavArrowButton,
  PageButton,
  PaginationBar,
  PaginationControls,
} from "./styled";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function getVisiblePages(current: number, total: number): number[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  return [...pages]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);
}

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const visiblePages = useMemo(
    () => getVisiblePages(page, totalPages),
    [page, totalPages]
  );

  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <PaginationBar aria-label="Paginação">
      <span>
        Exibindo {from}–{to} de {total}
      </span>

      <PaginationControls>
        <NavArrowButton
          type="button"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Página anterior"
        >
          ‹
        </NavArrowButton>

        {visiblePages.map((pageNumber, index) => {
          const previous = visiblePages[index - 1];
          const showEllipsis = previous !== undefined && pageNumber - previous > 1;

          return (
            <span key={pageNumber} style={{ display: "contents" }}>
              {showEllipsis && <span aria-hidden="true">…</span>}
              <PageButton
                type="button"
                $active={pageNumber === page}
                disabled={disabled}
                onClick={() => onPageChange(pageNumber)}
                aria-label={`Página ${pageNumber}`}
                aria-current={pageNumber === page ? "page" : undefined}
              >
                {pageNumber}
              </PageButton>
            </span>
          );
        })}

        <NavArrowButton
          type="button"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Próxima página"
        >
          ›
        </NavArrowButton>
      </PaginationControls>
    </PaginationBar>
  );
}
