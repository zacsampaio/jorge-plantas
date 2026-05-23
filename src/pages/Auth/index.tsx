import { useState } from "react";
import { Tabs } from "../../components/ui/Tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import {
  AuthSubtitle,
  AuthTitle,
} from "../../layouts/AuthLayout/styled";

export function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      <AuthTitle>
        {activeTab === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
      </AuthTitle>
      <AuthSubtitle>
        {activeTab === "login"
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
