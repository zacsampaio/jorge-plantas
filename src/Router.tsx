import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Produtos } from "./pages/Produtos";
import { Checkout } from "./pages/Checkout";
import { Confirmed } from "./pages/Confirmed/index";
import { SobreNos } from "./pages/SobreNos";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { AuthPage } from "./pages/Auth";
import { ForgotPasswordForm } from "./pages/Auth/ForgotPasswordForm";
import { ResetPasswordForm } from "./pages/Auth/ResetPasswordForm";
import { AccountLayout } from "./layouts/AccountLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AccountOrdersPage } from "./pages/Account/Orders";
import { OrderDetailPage } from "./pages/Account/OrderDetail";
import { AccountProfilePage } from "./pages/Account/Profile";
import { AdminProductsListPage } from "./pages/Admin/ProductsList";
import { ProductForm } from "./pages/Admin/ProductForm";
import { AdminOrdersPage } from "./pages/Admin/Orders";
import { AdminDashboardPage } from "./pages/Admin/Dashboard";
import { OrderForm } from "./pages/Admin/OrderForm";
import { AdminCustomersPage } from "./pages/Admin/Customers";

export function Router() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<AuthPage />} />
        <Route path="esqueci-senha" element={<ForgotPasswordForm />} />
        <Route path="nova-senha" element={<ResetPasswordForm />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsListPage />} />
          <Route path="products/new" element={<ProductForm mode="create" />} />
          <Route
            path="products/:id/edit"
            element={<ProductForm mode="edit" />}
          />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="orders/new" element={<OrderForm />} />
          <Route path="customers" element={<AdminCustomersPage />} />
        </Route>
      </Route>

      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/confirmed" element={<Confirmed />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route
          element={<ProtectedRoute allowedRoles={["client", "admin"]} />}
        >
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Navigate to="/account/orders" replace />} />
            <Route path="orders" element={<AccountOrdersPage />} />
            <Route path="orders/:orderId" element={<OrderDetailPage />} />
            <Route path="profile" element={<AccountProfilePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
