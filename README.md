# DropMail.me

Esse projeto busca conectar o frontend crioado na [API do DropMail.me](https://dropmail.me/api/#) e exibir os emails recebidos no endereço temporário.

## Frameworks/Linguagens e ferramentas usadas
- [React.js](https://react.dev/)
- [Vite.js](https://vitejs.dev/)
- [Chackra.ui](https://chakra-ui.com/)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Apollo](https://www.apollographql.com/) e [GraphQL](https://graphql.org/) para comunicação com a API 

Para nortear o desenvolvimento foi utilizado o [design do projeto](https://www.figma.com/file/s4n5laLJRTzSEhg3DW4aLX/Untitled?type=design&node-id=0%3A1&t=UOaUxJAXvVZhi75S-1) no Figma seguindo como base o exemplo dado nas instruções do desafio!

## Como instalar e configurar o projeto
- É necessário clonar o projeto desse repositório;
- Ao abrir, executar o comando `yarn` para instalar as dependências (Node Version18+);
- Após instalar com sucesso todas as depencências, basta executar `yarn dev` e o servidor web estará funcionando.

## Acessando o projeto pelo [Vercel](https://vercel.com/)
- Deve-se criar ou entrar em uma conta existente na plataforma;
- Acessar o projeto pelo link disponivel na aba de informações do repositório ou [clicando aqui](https://coodesh-challenge-fawn.vercel.app/).

## Observações
  Ao tentar efetuar a conexão com a API via HTTP ocorreu o erro de CORS que não pôde ser solucionado, ao verificar mais afundo foi descoberto que a configuração de CORS da api poderia estar incorreta.
  Para solucionar esse problema foi utilizado um proxy da API que serviu perfeitamente na situação. Segue aqui o link do repositório: [DropMail-Proxy](https://github.com/petterkraus/dropmail-proxy)

## Explicação do projeto
https://www.loom.com/share/d362fd7096214a9d924aea39bf0cc4e2

>This is a challenge by Coodesh
