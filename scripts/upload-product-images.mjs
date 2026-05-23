/**
 * Envia imagens locais para o bucket Supabase "products" e sincroniza image_path.
 *
 * Uso:
 *   npm run upload:images
 *
 * Requisitos (.env):
 *   VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (ou SUPABASE_SECRET_KEY — nunca commitar)
 *
 * Imagens em: public/assets/plants/{Nome do Produto}.jpg
 */

import { createClient } from "@supabase/supabase-js";
import ws from "ws";
import { readFile, readdir } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const BUCKET = "products";
const PLANTS_DIR = join(root, "public", "assets", "plants");

const MIME_BY_EXT = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

async function loadEnv() {
  try {
    const text = await readFile(join(root, ".env"), "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = stripQuotes(trimmed.slice(eq + 1).trim());
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env opcional se variáveis já estiverem no ambiente
  }
}

function resolveServiceKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    null
  );
}

function isServiceKey(key) {
  return (
    key.startsWith("eyJ") ||
    key.startsWith("sb_secret_") ||
    key.startsWith("sbp_") // alias ocasional em docs
  );
}

function sanitizeStorageFileName(fileName) {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s.\-()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildStoragePath(productId, fileName) {
  return `${productId}/${sanitizeStorageFileName(fileName)}`;
}

function resolveContentType(fileName) {
  return MIME_BY_EXT[extname(fileName).toLowerCase()] ?? "image/jpeg";
}

await loadEnv();

const url = process.env.VITE_SUPABASE_URL?.trim();
const serviceKey = resolveServiceKey();

if (!url) {
  console.error("❌ Defina VITE_SUPABASE_URL no .env");
  process.exit(1);
}

if (!serviceKey) {
  console.error(
    "❌ Defina SUPABASE_SERVICE_ROLE_KEY (ou SUPABASE_SECRET_KEY) no .env.\n" +
      "   Dashboard Supabase → Settings → API → secret / service_role.\n" +
      "   Nunca use essa chave no front-end — só neste script local."
  );
  process.exit(1);
}

if (!isServiceKey(serviceKey)) {
  console.error(
    "❌ A chave informada parece ser publishable/anon, não secret/service_role.\n" +
      "   Upload no Storage exige a chave secreta do projeto."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  realtime: { transport: ws },
});

console.log("📦 Listando produtos...");
const { data: products, error: listError } = await supabase
  .from("products")
  .select("id, name, image_path")
  .order("id");

if (listError) {
  console.error("❌ Erro ao listar produtos:", listError.message);
  process.exit(1);
}

if (!products?.length) {
  console.error("❌ Nenhum produto encontrado na tabela products.");
  process.exit(1);
}

let files;
try {
  files = await readdir(PLANTS_DIR);
} catch {
  console.error(`❌ Pasta não encontrada: ${PLANTS_DIR}`);
  process.exit(1);
}

const imageFiles = files.filter((file) =>
  /\.(jpe?g|png|webp)$/i.test(file)
);

console.log(`🌿 ${products.length} produtos | ${imageFiles.length} imagens locais\n`);

let uploaded = 0;
let skipped = 0;
let failed = 0;

for (const product of products) {
  const localName = `${product.name}.jpg`;

  if (!imageFiles.includes(localName)) {
    console.warn(`⚠  [${product.id}] Sem arquivo local: ${localName}`);
    skipped += 1;
    continue;
  }

  const storagePath = buildStoragePath(product.id, localName);
  const filePath = join(PLANTS_DIR, localName);
  const buffer = await readFile(filePath);
  const contentType = resolveContentType(localName);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      upsert: true,
      contentType,
      cacheControl: "3600",
    });

  if (uploadError) {
    console.error(`✗  [${product.id}] ${storagePath}: ${uploadError.message}`);
    failed += 1;
    continue;
  }

  if (product.image_path !== storagePath) {
    const { error: updateError } = await supabase
      .from("products")
      .update({ image_path: storagePath, updated_at: new Date().toISOString() })
      .eq("id", product.id);

    if (updateError) {
      console.warn(
        `⚠  [${product.id}] Upload ok, mas falhou ao salvar image_path: ${updateError.message}`
      );
    }
  }

  console.log(`✓  [${product.id}] ${product.name} → ${storagePath}`);
  uploaded += 1;
}

console.log("\n---");
console.log(`✅ Enviados: ${uploaded}`);
console.log(`⚠  Ignorados (sem arquivo): ${skipped}`);
console.log(`❌ Falhas: ${failed}`);

if (failed > 0) process.exit(1);
