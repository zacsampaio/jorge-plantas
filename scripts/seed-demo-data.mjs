/**
 * Popula o banco com contas e pedidos fictícios para testar o dashboard.
 *
 *   node scripts/seed-demo-data.mjs          cria os dados
 *   node scripts/seed-demo-data.mjs --clean  remove tudo que este script criou
 *
 * Todo registro criado aqui é marcado para poder ser apagado depois:
 *   - contas usam e-mails @demo.jorge-plantas.local
 *   - pedidos levam { "seed": "demo" } no campo address
 *
 * Usa SUPABASE_SERVICE_ROLE_KEY, que ignora RLS. Rodar só localmente.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env");

const EMAIL_DOMAIN = "demo.jorge-plantas.local";
const SEED_MARKER = "demo";
const USER_COUNT = 20;
const ORDER_COUNT = 20;

function parseEnv(content) {
  const values = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    values[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return values;
}

if (!existsSync(envPath)) {
  console.error("Arquivo .env não encontrado.");
  process.exit(1);
}

const env = parseEnv(readFileSync(envPath, "utf8"));
const URL = (env.VITE_SUPABASE_URL ?? "").replace(/\/$/, "");
const KEY = env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!URL || !KEY) {
  console.error("VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias.");
  process.exit(1);
}

const authHeaders = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
};

async function api(path, options = {}) {
  const response = await fetch(`${URL}${path}`, {
    ...options,
    headers: { ...authHeaders, ...(options.headers ?? {}) },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      `${options.method ?? "GET"} ${path} → ${response.status}: ${text.slice(0, 200)}`
    );
  }

  return body;
}

const FIRST_NAMES = [
  "Ana", "Bruno", "Carla", "Daniel", "Elaine", "Fábio", "Gabriela", "Heitor",
  "Isadora", "João", "Karina", "Lucas", "Marina", "Nelson", "Olívia",
  "Paulo", "Renata", "Sérgio", "Tatiana", "Vinícius",
];

const LAST_NAMES = [
  "Alves", "Barbosa", "Cavalcante", "Duarte", "Esteves", "Freitas", "Gomes",
  "Holanda", "Ibiapina", "Junqueira", "Lima", "Moreira", "Nogueira", "Oliveira",
  "Pinheiro", "Queiroz", "Rocha", "Santos", "Teixeira", "Vasconcelos",
];

const PAYMENT_METHODS = ["Dinheiro", "Cartão de Débito", "Cartão de Crédito", "Pix"];
const STATUSES = ["confirmed", "confirmed", "confirmed", "delivered", "delivered", "pending", "cancelled"];

function pick(list, index) {
  return list[index % list.length];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function emailForIndex(index) {
  return `cliente${String(index + 1).padStart(2, "0")}@${EMAIL_DOMAIN}`;
}

/** Data aleatória dentro dos últimos 90 dias, para os três períodos do dashboard terem dados. */
function randomDateWithinDays(days) {
  const now = Date.now();
  const offset = randomInt(0, days - 1) * 24 * 60 * 60 * 1000;
  const jitter = randomInt(0, 23) * 60 * 60 * 1000;
  return new Date(now - offset - jitter).toISOString();
}

async function listDemoUsers() {
  const found = [];
  for (let page = 1; page <= 10; page += 1) {
    const body = await api(`/auth/v1/admin/users?page=${page}&per_page=100`);
    const users = body?.users ?? [];
    if (users.length === 0) break;
    found.push(...users.filter((user) => user.email?.endsWith(`@${EMAIL_DOMAIN}`)));
    if (users.length < 100) break;
  }
  return found;
}

async function clean() {
  console.log("Removendo dados de demonstração…\n");

  const orders = await api(
    `/rest/v1/orders?select=id&address->>seed=eq.${SEED_MARKER}`
  );
  console.log(`Pedidos marcados encontrados: ${orders.length}`);

  if (orders.length > 0) {
    await api(`/rest/v1/orders?address->>seed=eq.${SEED_MARKER}`, {
      method: "DELETE",
    });
    console.log(`✓ ${orders.length} pedido(s) removido(s) (itens caem em cascata)`);
  }

  const users = await listDemoUsers();
  console.log(`Contas de demonstração encontradas: ${users.length}`);

  for (const user of users) {
    await api(`/auth/v1/admin/users/${user.id}`, { method: "DELETE" });
  }

  if (users.length > 0) {
    console.log(`✓ ${users.length} conta(s) removida(s) (perfis caem em cascata)`);
  }

  console.log("\nLimpeza concluída.");
}

async function seed() {
  console.log("Populando o banco com dados de demonstração…\n");

  const products = await api("/rest/v1/products?select=id,name,price&status=eq.active");
  if (products.length === 0) {
    console.error("Nenhum produto ativo no banco. Rode o seed de produtos antes.");
    process.exit(1);
  }
  console.log(`Produtos ativos disponíveis: ${products.length}`);

  // 1. Contas
  const existing = await listDemoUsers();
  const existingByEmail = new Map(existing.map((user) => [user.email, user]));
  const createdUsers = [];

  for (let index = 0; index < USER_COUNT; index += 1) {
    const email = emailForIndex(index);
    const fullName = `${pick(FIRST_NAMES, index)} ${pick(LAST_NAMES, index * 7 + 3)}`;

    if (existingByEmail.has(email)) {
      createdUsers.push({ id: existingByEmail.get(email).id, fullName });
      continue;
    }

    const user = await api("/auth/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password: `Demo@${randomInt(100000, 999999)}`,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          phone: `(85) 9${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
        },
      }),
    });

    createdUsers.push({ id: user.id, fullName });
  }

  console.log(`✓ ${createdUsers.length} conta(s) prontas`);

  // O perfil é criado pelo gatilho handle_new_user; damos um instante a ele
  // antes de referenciar os user_id nos pedidos.
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 2. Pedidos — metade pelo site (com conta), metade de balcão (sem conta)
  let created = 0;

  for (let index = 0; index < ORDER_COUNT; index += 1) {
    const isOnline = index % 2 === 0;
    const customer = createdUsers[index % createdUsers.length];

    const itemCount = randomInt(1, 3);
    const items = [];
    const usedProductIds = new Set();

    for (let i = 0; i < itemCount; i += 1) {
      const product = products[randomInt(0, products.length - 1)];
      if (usedProductIds.has(product.id)) continue;
      usedProductIds.add(product.id);

      items.push({
        product_id: product.id,
        product_name: product.name,
        quantity: randomInt(1, 3),
        unit_price: Number(product.price),
      });
    }

    const itemsTotal = items.reduce(
      (acc, item) => acc + item.unit_price * item.quantity,
      0
    );
    const deliveryFee = isOnline ? pick([20, 30, 40, 50], index) : 0;
    const createdAt = randomDateWithinDays(90);

    const [order] = await api("/rest/v1/orders", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        user_id: isOnline ? customer.id : null,
        channel: isOnline ? "online" : "balcao",
        customer_name: isOnline ? null : customer.fullName,
        customer_phone: isOnline ? null : `(85) 9${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
        status: pick(STATUSES, index * 3),
        total: Number((itemsTotal + deliveryFee).toFixed(2)),
        delivery_fee: deliveryFee,
        payment_method: pick(PAYMENT_METHODS, index),
        address: isOnline
          ? {
              seed: SEED_MARKER,
              zipCode: "60000-000",
              street: "Rua das Flores",
              number: String(randomInt(1, 999)),
              neighborhood: "Centro",
              city: "Fortaleza",
              state: "CE",
            }
          : { seed: SEED_MARKER },
        created_at: createdAt,
        updated_at: createdAt,
      }),
    });

    await api("/rest/v1/order_items", {
      method: "POST",
      body: JSON.stringify(items.map((item) => ({ ...item, order_id: order.id }))),
    });

    created += 1;
  }

  console.log(`✓ ${created} pedido(s) criados (metade site, metade balcão, espalhados em 90 dias)`);
  console.log("\nPara remover tudo depois: node scripts/seed-demo-data.mjs --clean");
}

try {
  if (process.argv.includes("--clean")) {
    await clean();
  } else {
    await seed();
  }
} catch (error) {
  console.error("\nFalhou:", error.message);
  process.exit(1);
}
