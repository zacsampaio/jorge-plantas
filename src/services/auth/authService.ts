import { supabaseAuthService } from "./supabaseAuthService";
import type { IAuthService } from "./types";

export const authService: IAuthService = supabaseAuthService;
