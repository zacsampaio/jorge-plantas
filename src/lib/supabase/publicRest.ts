import { getSupabaseConfig } from "./config";

function requireConfig() {
  const config = getSupabaseConfig();
  if (!config) {
    throw new Error("Supabase não configurado. Verifique o arquivo .env.");
  }
  return config;
}

function buildHeaders(options?: { prefer?: string; range?: { from: number; to: number } }) {
  const config = requireConfig();
  const headers: Record<string, string> = {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.anonKey}`,
    Accept: "application/json",
  };

  if (options?.prefer) {
    headers.Prefer = options.prefer;
  }

  if (options?.range) {
    headers.Range = `${options.range.from}-${options.range.to}`;
  }

  return headers;
}

function parseTotalFromContentRange(header: string | null): number | null {
  if (!header) return null;
  const match = header.match(/\/(\d+|\*)$/);
  if (!match || match[1] === "*") return null;
  return Number.parseInt(match[1], 10);
}

/** Leitura pública via REST — sempre usa a chave anon, ignora sessão/JWT do usuário */
export async function publicRestGet<T>(
  pathWithQuery: string,
  options?: { prefer?: string; range?: { from: number; to: number } }
): Promise<{ data: T; total: number | null; error: string | null }> {
  const config = requireConfig();
  const url = `${config.url.replace(/\/$/, "")}/rest/v1/${pathWithQuery}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders(options),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    return {
      data: [] as T,
      total: null,
      error: body?.message ?? `Erro HTTP ${response.status} ao buscar dados.`,
    };
  }

  const data = (await response.json()) as T;
  const total = parseTotalFromContentRange(response.headers.get("content-range"));

  return { data, total, error: null };
}
