/**
 * Envia imagens locais para o bucket Supabase "products".
 *
 * Uso: node scripts/upload-product-images.mjs
 *
 * Coloque as imagens em: public/assets/plants/{Nome do Produto}.jpg
 */

import { createClient } from "@supabase/supabase-js";
import ws from "ws";
import { readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

async function loadEnv() {
  try {
    const text = await readFile(join(root, ".env"), "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      process.env[key] = value;
    }
  } catch {
    // .env opcional se variáveis já estiverem no ambiente
  }
}

await loadEnv();

const url = process.env.VITE_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error(
    "Defina VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (ou VITE_SUPABASE_ANON_KEY) no .env"
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
  realtime: { transport: ws },
});

const { data: products, error } = await supabase
  .from("products")
  .select("id, name, image_path");

if (error) {
  console.error("Erro ao listar produtos:", error.message);
  process.exit(1);
}

const plantsDir = join(root, "public", "assets", "plants");
let files = [];

try {
  files = await readdir(plantsDir);
} catch {
  console.error(`Pasta não encontrada: ${plantsDir}`);
  process.exit(1);
}

for (const product of products ?? []) {
  const localName = `${product.name}.jpg`;
  if (!files.includes(localName)) {
    console.warn(`⚠ Imagem ausente: ${localName}`);
    continue;
  }

  const path = product.image_path ?? `${product.id}/${localName}`;
  const buffer = await readFile(join(plantsDir, localName));

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(path, buffer, {
      upsert: true,
      contentType: "image/jpeg",
    });

  if (uploadError) {
    console.error(`✗ ${path}:`, uploadError.message);
  } else {
    console.log(`✓ ${path}`);
  }
}

console.log("Concluído.");
