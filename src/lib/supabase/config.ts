export type SupabaseConfigIssue =
  | "missing"
  | "placeholder"
  | "invalid-url"
  | "invalid-key";

function readEnv(key: string): string | undefined {
  const value = import.meta.env[key];
  return typeof value === "string" ? value.trim() : undefined;
}

function resolveAnonKey(): string | undefined {
  return (
    readEnv("VITE_SUPABASE_ANON_KEY") ??
    readEnv("VITE_SUPABASE_PUBLISHABLE_KEY")
  );
}

/** Chave anon legada (JWT) ou publishable key nova do Supabase */
export function isValidSupabaseApiKey(key: string): boolean {
  return key.startsWith("eyJ") || key.startsWith("sb_publishable_");
}

export function isValidSupabaseUrl(url: string): boolean {
  if (!url.startsWith("https://")) return false;
  if (url.includes("your-project")) return false;
  return url.includes(".supabase.co");
}

export function getSupabaseConfigIssue(): SupabaseConfigIssue | null {
  const url = readEnv("VITE_SUPABASE_URL");
  const anonKey = resolveAnonKey();

  if (!url || !anonKey) return "missing";
  if (url.includes("your-project") || anonKey.includes("your-anon")) {
    return "placeholder";
  }
  if (!isValidSupabaseUrl(url)) return "invalid-url";
  if (!isValidSupabaseApiKey(anonKey)) return "invalid-key";

  return null;
}

export function getSupabaseConfig(): {
  url: string;
  anonKey: string;
} | null {
  const issue = getSupabaseConfigIssue();
  if (issue) return null;

  return {
    url: readEnv("VITE_SUPABASE_URL")!,
    anonKey: resolveAnonKey()!,
  };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

export function getSupabaseConfigDevHint(): string | null {
  const issue = getSupabaseConfigIssue();
  if (!issue) return null;

  switch (issue) {
    case "missing":
      return "Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (ou VITE_SUPABASE_PUBLISHABLE_KEY) no .env e reinicie o npm run dev.";
    case "placeholder":
      return "Substitua os valores de exemplo no .env pelas credenciais reais do projeto Supabase.";
    case "invalid-url":
      return "VITE_SUPABASE_URL deve ser https://seu-projeto.supabase.co";
    case "invalid-key":
      return "Use a chave anon (JWT eyJ...) ou publishable (sb_publishable_...) em VITE_SUPABASE_ANON_KEY.";
    default:
      return null;
  }
}
