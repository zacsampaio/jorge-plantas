import { useCallback } from "react";
import { WhatsappLogo } from "phosphor-react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Pagination } from "../../../components/ui/Pagination";
import { Skeleton } from "../../../components/ui/Skeleton";
import {
  AdminHeader,
  AdminTitle,
  Table,
  WhatsAppButton,
} from "../../../layouts/AdminLayout/styled";
import { PageSection } from "../../../layouts/AccountLayout/styled";
import { usePaginatedFetch } from "../../../hooks/usePaginatedFetch";
import { fetchCustomersPaginated } from "../../../services/admin/customerService";
import { DEFAULT_PAGE_SIZE } from "../../../types/pagination";
import { buildWhatsAppUrl } from "../../../utils/whatsapp";

export function AdminCustomersPage() {
  const fetchPage = useCallback(
    (page: number, pageSize: number) => fetchCustomersPaginated({ page, pageSize }),
    []
  );

  const {
    data: customers,
    total,
    totalPages,
    page,
    pageSize,
    setPage,
    isInitialLoading,
    isRefreshing,
  } = usePaginatedFetch({
    fetcher: fetchPage,
    pageSize: DEFAULT_PAGE_SIZE,
    waitForAuth: true,
  });

  return (
    <>
      <AdminHeader>
        <AdminTitle>Clientes</AdminTitle>
      </AdminHeader>

      <PageSection data-refreshing={isRefreshing ? "true" : undefined}>
        {isInitialLoading && <Skeleton lines={5} height="3rem" />}

        {!isInitialLoading && customers.length === 0 && (
          <EmptyState
            title="Nenhum cliente cadastrado"
            description="Os clientes que criarem conta aparecerão aqui."
          />
        )}

        {!isInitialLoading && customers.length > 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.fullName || "—"}</td>
                    <td>{customer.email || "—"}</td>
                    <td>{customer.phone || "—"}</td>
                    <td>
                      {customer.phone ? (
                        <WhatsAppButton
                          href={buildWhatsAppUrl(
                            customer.phone,
                            `Olá ${customer.fullName.split(" ")[0]}, tudo bem? Aqui é da Jorge Plantas.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsappLogo size={16} weight="fill" />
                          Conversar
                        </WhatsAppButton>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              onPageChange={setPage}
              disabled={isInitialLoading || isRefreshing}
            />
          </>
        )}
      </PageSection>
    </>
  );
}
