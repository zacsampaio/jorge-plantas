# Projeto: Jorge Plantas

Este projeto foi desenvolvido como uma melhoria do projeto de inicial de Extensão da faculdade de Análise e Desenvolvimento de sistema, a ideia foi implementar tecnologias mais avançadas, conseguir de fato captar o endereço de entrega e enviar a solicitação para o whatsapp do responsável. 

Projeto inicial: https://github.com/zacsampaio/jln-floricultura

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Vite**: Ferramenta de build rápida e leve para projetos front-end.
- **Redux Toolkit**: Conjunto de ferramentas oficial para gerenciamento de estado no Redux, simplificando a configuração e o uso do Redux.
- **React Hook Form**: Biblioteca para gerenciamento de formulários em React, focada em performance e facilidade de uso.
- **Zod**: Biblioteca de validação de esquemas TypeScript-first, utilizada para validação de dados.
- **Styled Components**: Biblioteca para estilização de componentes em React utilizando CSS-in-JS.
- **React Router DOM**: Biblioteca para roteamento em aplicações React, permitindo navegação entre diferentes páginas.
- **Phosphor React**: Conjunto de ícones flexíveis para interfaces de usuário, integrados como componentes React.
- **Vite Plugin SVGR**: Plugin para importar arquivos SVG como componentes React.

## Funcionalidades da Aplicação

- **Catálogo de Cafés**: Exibição de uma lista de diferentes tipos de cafés disponíveis para compra.
- **Gerenciamento de Carrinho**: Adição e remoção de itens no carrinho de compras, com persistência dos dados utilizando Redux Toolkit e armazenamento no `localStorage`.
- **Formulário de Checkout**: Formulário para inserção de dados do cliente, validado com Zod e gerenciado com React Hook Form.
- **Navegação**: Roteamento entre páginas utilizando React Router DOM, permitindo navegação fluida entre o catálogo, checkout e confirmação de pedido.

## Aprendizados e Melhorias

Neste projeto, pude aprimorar:

- A utilização do Redux Toolkit para gerenciar o estado da aplicação de forma eficiente.
- A integração de React Hook Form com Zod para validação e manipulação de formulários.
- O uso de Styled Components para criar estilos dinâmicos e organizados.
- A implementação de navegação fluida com React Router DOM.
- O armazenamento e recuperação de informações no `localStorage` para manter a persistência dos dados do carrinho.

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/zacsampaio/coffeeDelivery.git
   ```
2. Navegue até a pasta do projeto e instale as dependências:
   ```bash
   cd coffeeDelivery && npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação no navegador através do endereço exibido no terminal.

---

Este projeto faz parte de um desafio de aprendizado e está em constante evolução! 😊☕
