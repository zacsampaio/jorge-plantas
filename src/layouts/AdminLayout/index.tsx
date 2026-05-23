import { Outlet } from "react-router-dom";
import { Package, ShoppingBag, Users, Storefront } from "phosphor-react";
const logoImg = "/assets/logo-jorge-plantas.png";
import {
  AdminContent,
  AdminMain,
  AdminNavLink,
  AdminShell,
  AdminSidebar,
  SidebarBrand,
  SidebarFooter,
  SidebarNav,
} from "./styled";

export function AdminLayout() {
  return (
    <AdminShell>
      <AdminSidebar aria-label="Painel administrativo">
        <SidebarBrand to="/admin/products">
          <img src={logoImg} alt="" aria-hidden="true" />
          <span>Admin</span>
        </SidebarBrand>

        <SidebarNav>
          <AdminNavLink to="/admin/products">
            <Package size={20} weight="duotone" aria-hidden="true" />
            Produtos
          </AdminNavLink>
          <AdminNavLink to="/admin/orders">
            <ShoppingBag size={20} weight="duotone" aria-hidden="true" />
            Pedidos
          </AdminNavLink>
          <AdminNavLink to="/admin/customers">
            <Users size={20} weight="duotone" aria-hidden="true" />
            Clientes
          </AdminNavLink>
        </SidebarNav>

        <SidebarFooter>
          <AdminNavLink to="/">
            <Storefront size={20} weight="duotone" aria-hidden="true" />
            Voltar à loja
          </AdminNavLink>
        </SidebarFooter>
      </AdminSidebar>

      <AdminMain>
        <AdminContent>
          <Outlet />
        </AdminContent>
      </AdminMain>
    </AdminShell>
  );
}
