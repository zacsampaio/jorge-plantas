import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");

function parseEnv(content) {
  const values = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    values[key] = value;
  }
  return values;
}

function status(label, value, validator) {
  if (!value) {
    console.log(`✗ ${label}: vazio`);
    return false;
  }
  if (validator && !validator(value)) {
    console.log(`✗ ${label}: valor inválido`);
    return false;
  }
  console.log(`✓ ${label}: ok (${value.slice(0, 18)}...)`);
  return true;
}

if (!existsSync(envPath)) {
  console.error("Arquivo .env não encontrado na raiz do projeto.");
  console.error("Copie .env.example para .env e preencha com as credenciais do Supabase.");
  process.exit(1);
}

const env = parseEnv(readFileSync(envPath, "utf8"));

console.log("Verificando .env para o site (npm run dev):\n");

const urlOk = status("VITE_SUPABASE_URL", env.VITE_SUPABASE_URL, (v) =>
  v.startsWith("https://") && v.includes(".supabase.co")
);

const anonKey =
  env.VITE_SUPABASE_ANON_KEY ?? env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

const keyOk = status("VITE_SUPABASE_ANON_KEY", anonKey, (v) =>
  v.startsWith("eyJ") || v.startsWith("sb_publishable_")
);

console.log("");
if (env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log("✓ SUPABASE_SERVICE_ROLE_KEY: ok (só scripts locais, não vai pro navegador)");
} else {
  console.log("○ SUPABASE_SERVICE_ROLE_KEY: opcional (necessária só para npm run upload:images)");
}

console.log("");

if (!urlOk || !keyOk) {
  console.error("Corrija o .env e reinicie: npm run dev");
  process.exit(1);
}

const testUrl = `${env.VITE_SUPABASE_URL.replace(/\/$/, "")}/rest/v1/products?select=id&status=eq.active&limit=1`;

try {
  const response = await fetch(testUrl, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
  });

  if (!response.ok) {
    console.error(`✗ API Supabase respondeu ${response.status}. Confira URL e chave no Dashboard.`);
    process.exit(1);
  }

  const rows = await response.json();
  console.log(`✓ API Supabase acessível (${Array.isArray(rows) ? rows.length : 0}+ produto(s) na amostra)`);
  console.log("\nSe o site ainda mostrar 0 produtos, faça Ctrl+Shift+R ou limpe localStorage (chaves sb-*).");
} catch (error) {
  console.error("✗ Não foi possível contactar o Supabase:", error.message);
  process.exit(1);
}
