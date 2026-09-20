# Recuperação de senha — configuração no Supabase

O código do fluxo já está no repositório. Estes passos são feitos no painel do
Supabase e **sem eles o link do e-mail não funciona**.

## 1. Redirect URLs (obrigatório)

`Authentication → URL Configuration → Redirect URLs`

Adicionar as duas entradas:

```
https://jorge-plantas.vercel.app/auth/nova-senha
http://localhost:5173/auth/nova-senha
```

O Supabase só redireciona para endereços dessa allowlist. Sem ela o link
falha; com ela aberta demais (por exemplo `https://jorge-plantas.vercel.app/**`)
o link de recuperação vira um vetor de redirecionamento aberto, em que um
atacante faz o e-mail legítimo apontar para uma página que ele controla.
Cadastrar o caminho exato.

## 2. Template do e-mail

`Authentication → Email Templates → Reset Password`

Colar o HTML de recuperação. O template usa `{{ .ConfirmationURL }}`, que o
Supabase substitui pelo link com o token.

## 3. Validade do link

`Authentication → Providers → Email → Email OTP Expiration`

Definir **1800 segundos (30 minutos)**. O padrão é 3600. O texto do e-mail já
informa 30 minutos, e a tela de link inválido também — se mudar o valor aqui,
mude nos dois textos.

## 4. Proteção contra senhas vazadas

`Authentication → Policies → Password Protection`

Ativar **Leaked password protection**. O Supabase passa a comparar a senha
escolhida contra a base do HaveIBeenPwned e recusa senhas que já apareceram em
vazamentos. Aparece hoje como aviso no Security Advisor.

Isso é o que falta para a regra de senha ficar completa: o front já exige 8
caracteres com maiúscula, minúscula, número e símbolo (`passwordSchema` em
`src/pages/Auth/schemas/authSchemas.ts`), mas uma senha forte no formato pode
ser uma senha já vazada.

## 5. Rate limit de e-mails

`Authentication → Rate Limits`

Conferir o limite de e-mails por hora. O formulário já impõe 60 segundos entre
pedidos no navegador, mas isso é conveniência de interface — a barreira real é
a do servidor, porque o cliente pode ser contornado.

---

## Como o fluxo se comporta

| Situação | O que acontece |
|---|---|
| E-mail cadastrado | Recebe o link; a tela diz "se existir uma conta…" |
| E-mail não cadastrado | Nada é enviado; a tela diz exatamente a mesma coisa |
| Link aberto | Cria sessão de recuperação, que só permite trocar a senha |
| Link expirado ou reusado | Tela de "link inválido" com botão para pedir outro |
| Senha trocada | Todas as sessões caem, em todos os dispositivos |

A mensagem idêntica para e-mail existente e inexistente é proposital: revelar a
diferença permitiria descobrir quais endereços têm conta no site.

## Teste manual

1. Login → "Esqueci minha senha" → informar e-mail cadastrado
2. Confirmar que a mensagem não revela se a conta existe
3. Conferir que o botão fica bloqueado por 60 segundos
4. Abrir o link do e-mail e verificar que o token some da barra de endereços
5. Tentar navegar para `/account/orders` antes de trocar — deve voltar para a
   tela de nova senha
6. Trocar a senha e confirmar que a sessão antiga em outro navegador caiu
7. Abrir o mesmo link de novo — deve mostrar "link inválido"
