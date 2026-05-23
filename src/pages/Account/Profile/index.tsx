import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/ui/FormField";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useAuth } from "../../../hooks/useAuth";
import { useAuthStore } from "../../../stores/authStore";
import {
  profileSchema,
  type ProfileFormData,
} from "../../Auth/schemas/authSchemas";
import { PageSection, PageTitle } from "../../../layouts/AccountLayout/styled";
import { FormStack } from "../../../layouts/AuthLayout/styled";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function AccountProfilePage() {
  const { user, updateProfile } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setSubmitError(null);
    const success = await updateProfile(data);

    if (!success) {
      setSubmitError(
        useAuthStore.getState().error ?? "Não foi possível salvar o perfil."
      );
      return;
    }

    setSuccessMessage("Perfil atualizado com sucesso!");
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  if (!user) return null;

  return (
    <>
      <PageTitle>Meu Perfil</PageTitle>
      <PageSection>
        {submitError && <Alert variant="error">{submitError}</Alert>}
        {successMessage && (
          <Alert variant="success">{successMessage}</Alert>
        )}

        <FormStack
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ marginTop: successMessage ? "1rem" : 0 }}
        >
          <FormField
            label="Nome completo"
            autoComplete="name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <FormField
            label="Telefone"
            type="tel"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone", {
              onChange: (e) => {
                setValue("phone", formatPhone(e.target.value), {
                  shouldValidate: true,
                });
              },
            })}
          />

          <FormField
            label="E-mail"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Button type="submit" isLoading={isSubmitting}>
            Salvar alterações
          </Button>
        </FormStack>
      </PageSection>
    </>
  );
}
