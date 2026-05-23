import { getSupabaseConfigDevHint } from "../../lib/supabase/config";
import { Banner, BannerTitle } from "./styled";

export function SupabaseConfigBanner() {
  const hint = getSupabaseConfigDevHint();
  if (!hint) return null;

  return (
    <Banner role="alert">
      <BannerTitle>Supabase não configurado</BannerTitle>
      <p>{hint}</p>
      <p>
        Preencha o arquivo <strong>.env</strong> na raiz do projeto (não o{" "}
        <strong>.env.example</strong>). Depois pare o servidor e rode{" "}
        <strong>npm run dev</strong> de novo.
      </p>
      <p>
        O site precisa de <code>VITE_SUPABASE_URL</code> e{" "}
        <code>VITE_SUPABASE_ANON_KEY</code>. A{" "}
        <code>SUPABASE_SERVICE_ROLE_KEY</code> é só para o script de upload de
        imagens.
      </p>
    </Banner>
  );
}
