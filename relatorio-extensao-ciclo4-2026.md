# Relatório de Atividades — Projeto de Extensão Jorge Plantas (Ciclo 4)

**Período:** janeiro/2026 a 23/05/2026  
**Carga horária total:** 40 horas  
**Disciplina:** Projeto de Extensão III — Análise e Desenvolvimento de Sistemas  

---

## 4. Atividades realizadas

O quarto ciclo do projeto de extensão foi focado na **integração com backend (Supabase)**, na **profissionalização do fluxo comercial** (autenticação, pedidos e painel administrativo) e na **correção de problemas de usabilidade e desempenho** identificados após o deploy do Ciclo 3. As atividades foram divididas em três etapas principais, abrangendo desde o alinhamento com o comerciante até a entrega de uma plataforma conectada a banco de dados em produção.

### 4.1. Revisão, Planejamento e Visita ao Campo

Esta etapa foi crucial para definir a evolução da plataforma de um site estático/catálogo local para uma **aplicação full-stack leve**, atendendo às necessidades reais do Sr. Jorge em gestão de produtos, clientes e pedidos.

**Materiais necessários:** Bloco de anotações, computador para demonstração, acesso ao painel Supabase, ferramentas de planejamento (board/Notion), `.env` de desenvolvimento.

#### 4.1.1. Visita e Análise do Feedback da Versão Anterior (Ciclo 3)

Revisão da versão publicada na Vercel com o Sr. Jorge. Foram identificados pontos de melhoria:

- Necessidade de **cadastro e login** para clientes recorrentes e área administrativa;
- Catálogo ainda **desconectado de um banco central** (dificuldade para atualizar preços, estoque e imagens);
- **Responsividade mobile** com margens excessivas e navegação pouco confortável em telas pequenas;
- Carrinho e checkout sem **proteção por autenticação**, dificultando rastreamento de pedidos;
- Imagens dos produtos ainda dependentes de arquivos locais em `public/assets`.

#### 4.1.2. Reunião de Alinhamento e Definição de Escopo (Ciclo 4)

Discussão e formalização das novas demandas, priorizando:

| Prioridade | Demanda |
|------------|---------|
| Alta | Integração Supabase (auth, perfis, produtos, pedidos) |
| Alta | Painel administrativo (produtos, pedidos, clientes) |
| Alta | Catálogo e home consumindo dados do banco |
| Média | Upload de imagens para Storage (`products`) |
| Média | Drawer lateral do carrinho + checkout protegido |
| Média | Mensagens de erro de login/cadastro em português |
| Contínua | Responsividade mobile e performance de carregamento |

#### 4.1.3. Definição e Planejamento Técnico

Elaboração do plano de desenvolvimento:

- Modelagem de tabelas: `profiles`, `products`, `orders`, `order_items`;
- Políticas RLS (Row Level Security) para leitura pública de produtos ativos e escrita restrita a admins;
- Arquitetura front-end: React 19 + TypeScript + Zustand (auth/catálogo) + Redux (carrinho);
- Estratégia de variáveis de ambiente (`VITE_*` na Vercel; `SERVICE_ROLE` apenas local);
- Roteamento protegido (`ProtectedRoute`) para `/checkout`, `/account/*` e `/admin/*`.

---

### 4.2. Atualização Tecnológica e Melhorias Implementadas

Fase de desenvolvimento dedicada à codificação, integração e refatoração da plataforma.

#### 4.2.1. Integração Supabase (Backend as a Service)

- Configuração do projeto Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`);
- Suporte a chaves **publishable** (`sb_publishable_...`) e anon legada (`eyJ...`);
- Migrations SQL: perfis, produtos, pedidos, políticas admin e bucket público `products`;
- Serviços de dados: `productDbService`, `orderDbService`, `profileService`, `supabaseAuthService`;
- Leitura pública de catálogo via **REST anon** (`publicRest.ts`), evitando falhas por sessão JWT corrompida no navegador;
- Script `npm run check:env` e banner de configuração ausente (`SupabaseConfigBanner`).

#### 4.2.2. Autenticação e Área do Cliente

- Login, cadastro e confirmação por e-mail (template HTML customizado);
- Mapeamento de erros amigáveis em português (`mapAuthError.ts`);
- Área logada: pedidos, detalhe do pedido e perfil;
- Checkout protegido: redirecionamento para `/auth?redirect=/checkout` com **carrinho preservado** no `localStorage`;
- Purga automática de sessões expiradas/inválidas no bootstrap da aplicação.

#### 4.2.3. Painel Administrativo

- Layout dedicado (`AdminLayout`) fora do layout público;
- CRUD de produtos com status (`active`/`inactive`) e upload de imagem;
- Listagem de pedidos com atualização de status;
- Listagem de clientes (perfis);
- Rotas protegidas por papel (`admin` vs `client`).

#### 4.2.4. Catálogo, Home e Imagens

- Página `/produtos` com paginação server-side via Supabase;
- Home (“Mais vendidos” e vitrines por categoria) consumindo **catálogo dinâmico** via hook `useProductsByIds` (reativo ao store);
- Componente `ProductImage` com fallback Storage → imagem local → placeholder;
- Script `npm run upload:images` para envio em lote das fotos ao bucket `products` (usa `SUPABASE_SERVICE_ROLE_KEY` **apenas local**);
- Seed inicial de 15 produtos ativos no banco.

#### 4.2.5. UX, Responsividade e Carrinho

- Tokens de layout (`pageGutter`, `pageShell`) e ajustes em Header, Footer e seções da Home;
- **CartDropdown** refatorado para **drawer lateral** (portal) com total, itens e botão de checkout;
- Sistema de notificações **Toast** para feedback de ações;
- Skeleton de carregamento nas seções da Home e página de produtos;
- ErrorBoundary no carrinho para evitar que falhas pontuais derrubem a página inteira.

#### 4.2.6. Performance e Correções de Estabilidade

- Remoção do bloqueio global “Carregando…” na inicialização;
- Bootstrap de auth em segundo plano (timeout de 2,5s, sem travar catálogo público);
- Correção de race condition: Home não atualizava ao receber produtos do Supabase (leitura síncrona sem subscription);
- Correção de imports de assets em `public/` (warnings Vite);
- Tratamento de JWT stale que retornava “0 produtos” no Chrome.

---

### 4.3. Testes, Validação e Entrega

#### 4.3.1. Testes Funcionais Integrados

- Validação de catálogo, filtros por categoria, paginação e imagens do Storage;
- Testes de fluxo: visitante → carrinho → login → checkout;
- Testes de cadastro (e-mail duplicado, chave inválida, confirmação por e-mail);
- Testes cross-browser (Chrome vs ambiente integrado do IDE);
- Verificação de variáveis na Vercel (somente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`).

#### 4.3.2. Apresentação e Feedback do Proprietário

- Demonstração do painel admin e do catálogo atualizado em tempo real;
- Validação da navegação mobile e do drawer do carrinho;
- Coleta de observações sobre textos, categorias e fluxo de pedido.

#### 4.3.3. Ajustes Finais, Deploy e Documentação

- Atualização do `.env.example` com instruções claras (PT);
- Build de produção (`npm run build`) validado;
- Deploy na Vercel com variáveis de ambiente configuradas;
- Documentação interna deste relatório e checklist de ambiente (`npm run check:env`).

---

## 5. Projeto: Website — Jorge Plantas (Ciclo 4)

O site Jorge Plantas evoluiu de uma SPA orientada a catálogo estático para uma **plataforma digital integrada**, capaz de autenticar usuários, persistir pedidos e permitir gestão administrativa. O objetivo principal do Ciclo 4 foi **conectar o front-end React à infraestrutura Supabase**, mantendo a identidade visual da marca e melhorando a experiência em dispositivos móveis.

### Stack tecnológica

| Tecnologia | Uso no Ciclo 4 |
|------------|----------------|
| **React 19 + TypeScript** | Interface e tipagem |
| **Vite** | Build e HMR |
| **Supabase** | Auth, PostgreSQL, Storage, RLS |
| **Redux Toolkit** | Carrinho, endereço, pagamento |
| **Zustand** | Auth, catálogo, toasts |
| **React Hook Form + Zod** | Formulários e validação |
| **Styled Components** | Estilização modular |
| **React Router DOM v7** | Rotas públicas, protegidas e admin |
| **Phosphor React** | Iconografia |

### Novas funcionalidades (Ciclo 4)

- **Backend Supabase:** perfis, produtos, pedidos e imagens no Storage;
- **Autenticação completa:** login, cadastro, confirmação por e-mail, área do cliente;
- **Painel administrativo:** gestão de produtos, pedidos e clientes;
- **Catálogo dinâmico:** `/produtos` e Home alimentados pelo banco;
- **Carrinho drawer + checkout autenticado;**
- **Responsividade mobile aprimorada;**
- **Mensagens de erro localizadas e banner de configuração;**
- **Scripts de operação:** `check:env`, `upload:images`.

O site permanece hospedado na **Vercel**, com variáveis `VITE_*` injetadas no build.

📌 **Acesse o site:** [jorge-plantas.vercel.app](https://jorge-plantas.vercel.app/)

---

## 6. Considerações Finais

O quarto ciclo representou a **maturidade técnica e operacional** da plataforma Jorge Plantas. Enquanto o Ciclo 3 consolidou paginação, institucional (“Sobre Nós”), footer e API de CEP, o Ciclo 4 entregou a **espinha dorsal de um e-commerce real**: dados centralizados, usuários identificados, pedidos rastreáveis e gestão administrativa.

As dificuldades encontradas — especialmente sessões JWT corrompidas no navegador, lentidão no bootstrap de auth e Home que não re-renderizava após fetch assíncrono — reforçaram aprendizados práticos de **engenharia de software em produção**: separar leituras públicas de rotas autenticadas, não bloquear a UI em operações de background e garantir que componentes React **subscrevam** ao estado global quando dependem de dados remotos.

A parceria com o Sr. Jorge continua a demonstrar o valor da extensão universitária: tecnologia aplicada a um negócio local, com entregas incrementais, feedback contínuo e impacto direto na operação da floricultura. A carga horária de **40 horas** reflete planejamento, desenvolvimento, testes, correções e documentação ao longo de cinco meses.

---

## Anexo 1 — Relatório de Horas Trabalhadas

**Período de atividade:** 15/01/2026 – 23/05/2026  

| Data | Atividade | Horas |
|------|-----------|-------|
| 15/01/2026 | Reunião de alinhamento (Ciclo 4): feedback da Vercel, escopo Supabase, auth, admin e catálogo dinâmico. | 3h |
| 29/01/2026 | Planejamento técnico: modelagem de tabelas, RLS, rotas protegidas e diagrama de arquitetura front/back. | 3h |
| 12/02/2026 | Setup Supabase: projeto, `.env`, migrations `001_profiles` e `002_products`, seed de produtos. | 4h |
| 26/02/2026 | Autenticação: `supabaseAuthService`, telas login/cadastro, `mapAuthError` em PT, template e-mail confirmação. | 4h |
| 12/03/2026 | Serviços de produtos e paginação server-side; página `/produtos` integrada ao banco; políticas RLS. | 5h |
| 26/03/2026 | Painel admin: layout, CRUD produtos, listagens de pedidos e clientes; migrations `003` e `004`. | 5h |
| 09/04/2026 | Storage: bucket `products`, `ProductImage` com fallback, script `upload:images` e sincronização `image_path`. | 4h |
| 23/04/2026 | UX mobile: layout responsivo, drawer do carrinho, checkout protegido, Toast e persistência do carrinho no login. | 4h |
| 07/05/2026 | Home dinâmica (`useProductsByIds`), área do cliente (pedidos/perfil), integração checkout → Supabase orders. | 3h |
| 15/05/2026 | Correções de estabilidade: `publicRest`, bootstrap auth não bloqueante, purge JWT stale, `check:env`, banner config. | 2h |
| 20/05/2026 | Testes integrados cross-browser, demo ao proprietário e ajustes de copy/UX reportados. | 2h |
| 23/05/2026 | Build final, deploy Vercel (env vars), documentação `.env.example` e elaboração deste relatório. | 1h |
| **Total** | | **40h** |

---

## Anexo 2 — Variáveis de ambiente (referência)

| Variável | Onde configurar | Finalidade |
|----------|-----------------|------------|
| `VITE_SUPABASE_URL` | Local + Vercel | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Local + Vercel | Chave pública (anon/publishable) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Somente local** | Script `upload:images` (nunca na Vercel) |

---

*Documento gerado com base nas implementações realizadas entre janeiro e maio de 2026 no repositório jorge-plantas.*
