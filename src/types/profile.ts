import type { UserRole } from "./auth";

export interface ProfileRow {
  id: string;
  full_name: string;
  phone: string | null;
  email: string;
  role: UserRole;
}

export interface ProfileUpdateInput {
  fullName: string;
  phone: string;
  email: string;
}
