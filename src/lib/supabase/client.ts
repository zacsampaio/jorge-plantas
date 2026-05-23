import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";
import { setupSupabaseAuthListener } from "./authListener";

let supabaseClient: SupabaseClient | null = null;

export function resetSupabaseClient(): void {
  supabaseClient = null;
}

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;

  const config = getSupabaseConfig();
  if (!config) return null;

  supabaseClient = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  setupSupabaseAuthListener(supabaseClient);

  return supabaseClient;
}

export { getSupabaseConfig, isSupabaseConfigured } from "./config";
