import { z } from "zod";
import {
  sanitizeEmail,
  sanitizePhone,
  sanitizeText,
} from "../../../utils/sanitize";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;

export const passwordSchema = z
  .string()
  .min(8, "Senha deve ter no mínimo 8 caracteres")
  .regex(PASSWORD_REGEX, {
    message:
      "Senha deve conter maiúscula, minúscula, número e caractere especial",
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .transform(sanitizeEmail)
    .pipe(z.string().email("E-mail inválido")),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Nome completo é obrigatório")
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres")
        .regex(
          /^[\p{L}\s'-]+$/u,
          "Nome contém caracteres inválidos"
        )
    ),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .transform(sanitizePhone)
    .pipe(
      z
        .string()
        .regex(
          /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
          "Telefone inválido. Use (XX) XXXXX-XXXX"
        )
    ),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .transform(sanitizeEmail)
    .pipe(z.string().email("E-mail inválido")),
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
  fullName: registerSchema.shape.fullName,
  phone: registerSchema.shape.phone,
  email: registerSchema.shape.email,
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .transform(sanitizeText)
    .pipe(z.string().min(2, "Nome deve ter no mínimo 2 caracteres")),
  description: z
    .string()
    .optional()
    .transform((val) => (val ? sanitizeText(val) : undefined)),
  price: z.coerce
    .number({ invalid_type_error: "Preço inválido" })
    .positive("Preço deve ser maior que zero"),
  tags: z.string().optional(),
  bestSeller: z.boolean().optional(),
  status: z.enum(["active", "inactive"]).optional().default("active"),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
