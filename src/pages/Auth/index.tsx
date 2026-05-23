import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs } from "../../components/ui/Tabs";
import { CHECKOUT_PATH } from "../../utils/authRedirect";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import {
  AuthSubtitle,
  AuthTitle,
} from "../../layouts/AuthLayout/styled";

export function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [searchParams] = useSearchParams();
  const returnToCheckout = useMemo(
    () => searchParams.get("redirect") === CHECKOUT_PATH,
    [searchParams]
  );

  return (
    <>
      <AuthTitle>
        {activeTab === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
      </AuthTitle>
      <AuthSubtitle>
        {returnToCheckout
          ? "Entre ou cadastre-se para finalizar sua compra. Os itens do carrinho foram mantidos."
          : activeTab === "login"
            ? "Entre para acompanhar seus pedidos"
            : "Cadastre-se para comprar com mais praticidade"}
      </AuthSubtitle>

      <Tabs
        tabs={[
          { id: "login", label: "Entrar" },
          { id: "register", label: "Cadastro" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        ariaLabel="Tipo de autenticação"
      />

      {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
    </>
  );
}
