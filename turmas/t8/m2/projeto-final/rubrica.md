# Projeto Final

### MercadoÁgil 2.0: API de Pedidos 🛒

**Módulo 2 · Banco de dados e APIs REST com Node.js**

---

## 📑 Sumário

- [Projeto Final](#projeto-final)
    - [MercadoÁgil 2.0: API de Pedidos 🛒](#mercadoágil-20-api-de-pedidos-)
  - [📑 Sumário](#-sumário)
  - [🎯 Descrição](#-descrição)
    - [O que muda do M1 para o M2](#o-que-muda-do-m1-para-o-m2)
    - [O que este projeto treina](#o-que-este-projeto-treina)
  - [🛒 O cenário: MercadoÁgil 2.0](#-o-cenário-mercadoágil-20)
  - [🧭 O projeto herdado](#-o-projeto-herdado)
    - [Como funciona](#como-funciona)
    - [Primeiros passos (antes de alterar qualquer coisa)](#primeiros-passos-antes-de-alterar-qualquer-coisa)
    - [O diagnóstico](#o-diagnóstico)
    - [Combinados](#combinados)
  - [📋 Requisitos](#-requisitos)
    - [Formato do Projeto: Trabalho em SQUAD](#formato-do-projeto-trabalho-em-squad)
    - [Requisitos Funcionais Mínimos](#requisitos-funcionais-mínimos)
      - [1. Modelagem do Banco de Dados](#1-modelagem-do-banco-de-dados)
      - [2. Regras de Negócio](#2-regras-de-negócio)
      - [3. Rotas da API](#3-rotas-da-api)
      - [4. Relatórios em SQL](#4-relatórios-em-sql)
      - [5. Segurança](#5-segurança)
      - [6. Deploy](#6-deploy)
    - [Requisitos Técnicos Obrigatórios](#requisitos-técnicos-obrigatórios)
    - [Estrutura de Pastas Sugerida](#estrutura-de-pastas-sugerida)
  - [🗄️ Banco de Dados: como configurar](#️-banco-de-dados-como-configurar)
      - [Passo a passo no computador de vocês](#passo-a-passo-no-computador-de-vocês)
      - [Pegadinhas que já pegaram muita gente](#pegadinhas-que-já-pegaram-muita-gente)
      - [Em produção (Render)](#em-produção-render)
  - [🎤 Apresentação](#-apresentação)
  - [🧰 Utilitários](#-utilitários)
    - [Extras opcionais](#extras-opcionais)
  - [📊 Rubrica](#-rubrica)
    - [Legenda](#legenda)
    - [Tabela de Avaliação](#tabela-de-avaliação)
  - [❌ Critérios Eliminatórios](#-critérios-eliminatórios)
  - [💡 Dicas para não travar](#-dicas-para-não-travar)
  - [📦 Entrega](#-entrega)

---

## 🎯 Descrição

Este é o **projeto final do Módulo 2**. No M1 vocês construíram o serviço de pedidos do MercadoÁgil, que rodava no terminal e guardava tudo na memória. Agora o serviço vira uma **API REST de verdade**: com banco de dados, regras de acesso, documentação e publicada na internet.

O projeto será desenvolvido em **SQUAD**, e tem uma diferença importante em relação ao M1: **vocês não vão usar o código de vocês**. Cada SQUAD recebe o repositório do M1 de **outro SQUAD** e precisa evoluí-lo. É assim que acontece no mercado: quase ninguém escreve só código novo, quase sempre a pessoa chega num projeto que já existe, escrito por gente que ela nunca viu, e precisa entender, corrigir e melhorar sem quebrar o que funciona.

O trabalho de vocês é diagnosticar o código recebido, modelar o banco, expor as rotas, proteger o acesso e colocar no ar.

### O que muda do M1 para o M2

| No M1 | No M2 |
| --- | --- |
| Menu no terminal | Rotas HTTP, testadas pelo Swagger |
| Dados na memória | PostgreSQL com Sequelize |
| Classes e resposta `{ ok, erros }` | Camada de serviço e status HTTP (200, 201, 400, 401, 403, 404, 409) |
| Validação com Zod nas classes | Zod como middleware nas rotas |
| Qualquer pessoa faz qualquer coisa | Login com JWT e papéis (cliente, vendedor, admin) |
| Roda só no seu computador | Deploy no Render |
| Código escrito por vocês | Código herdado de outro SQUAD |

### O que este projeto treina

| O que vimos no módulo | Onde aparece no projeto |
| --- | --- |
| Modelagem relacional, cardinalidade e formas normais | DER, tabelas, relacionamentos 1:1, 1:N e N:N |
| SQL na prática: joins e funções de agregação | Relatórios financeiros em SQL |
| Bancos relacionais, NoSQL e busca semântica | Documento de decisão sobre o banco |
| Servidor Express e APIs REST | Rotas, verbos HTTP e status codes |
| Rotas, controladores e variáveis de ambiente | Pastas por responsabilidade, `.env`, middleware de log |
| Sequelize: models, migrations e relacionamentos | Camada de dados do projeto |
| Camada de serviço, Zod e Swagger | Regras de negócio, validação das rotas e documentação |
| JWT, bcrypt, papéis, rate limiting e deploy | Login, permissões e API no Render |
| Git e GitHub no fluxo de versionamento | Fork, issues e commits pequenos sobre o código de outro SQUAD |

Além do código, o projeto treina a **Mentalidade High Agency**: **Clear Thinking** para quebrar uma API grande em rotas e regras pequenas, **Bias to Action** para rodar cada rota assim que ela existir, e **Disagreeability** para propor e defender, com argumentos, a melhor solução dentro do SQUAD.

> **E daí?** Num marketplace de verdade, se o servidor reinicia e os pedidos somem, a empresa perde dinheiro. Se qualquer pessoa consegue confirmar o pedido de outra, a empresa perde a confiança dos clientes. E se a senha de alguém vaza em texto puro, ela é punida pela LGPD. Cada regra deste projeto existe porque alguma empresa já passou por isso.

## 🛒 O cenário: MercadoÁgil 2.0

O terminal do M1 provou que as regras funcionam. Agora a equipe do MercadoÁgil quer lançar um **site e um aplicativo**, e os dois precisam conversar com o serviço de pedidos pela internet. Só que o serviço atual tem problemas sérios:

- os dados somem quando o programa fecha;
- não existe login: qualquer pessoa pode ver e mexer em tudo;
- os relatórios são calculados juntando tudo na memória, e isso não aguenta uma loja grande;
- ninguém de fora do time sabe quais rotas existem ou como usá-las;
- o serviço só roda no computador de quem o programou.

Para piorar, o time que escreveu o serviço no M1 foi alocado em outro projeto. O SQUAD de vocês **assume o código que ficou** e foi contratado para evoluí-lo e entregar a **API do MercadoÁgil 2.0**, que as equipes do site e do aplicativo vão consumir.

## 🧭 O projeto herdado

No mercado de trabalho, quase ninguém começa um projeto do zero. Normalmente a pessoa entra num time, recebe um repositório escrito por gente que ela nunca viu e precisa **entender, corrigir e evoluir** sem quebrar o que já funciona. Este projeto simula exatamente isso.

### Como funciona

- O professor define qual SQUAD recebe o repositório de qual SQUAD. Cada SQUAD recebe o projeto do **M1 de outro SQUAD**.
- O repositório de vocês é um **fork** do projeto recebido, e não uma cópia dos arquivos. O fork **preserva o histórico de commits**, e é ele que mostra a evolução do código. Nunca mexam no repositório original.
- O **README** de vocês mantém os créditos do SQUAD que escreveu o código original.

### Primeiros passos (antes de alterar qualquer coisa)

1. Clonem o fork, instalem e **rodem** o projeto.
2. Rodem o **pedido de exemplo** (o de R$ 193,00 do descritivo do M1) no código recebido. Se o resultado for diferente, é um bug herdado: anotem.
3. Escrevam o `docs/diagnostico.md`.

### O diagnóstico

O `docs/diagnostico.md` tem **uma página, no máximo**, com:

- o que o projeto faz e como está organizado;
- o que já funciona bem;
- os **problemas encontrados**: bugs, regras diferentes do enunciado do M1, validações que faltam, nomes confusos, código repetido;
- o que o SQUAD decidiu **manter, corrigir ou reescrever**, e por quê.

Recomendamos transformar cada problema encontrado numa **Issue** no GitHub do fork.

### Combinados

- **Reescrever** um arquivo ou uma parte do código é permitido, desde que o diagnóstico explique o motivo. **Começar do zero não vale**: o histórico precisa mostrar a evolução do código recebido.
- **Critiquem o código, nunca as pessoas.** Quem escreveu aquele código estava aprendendo, assim como vocês estão agora. Apontem o problema e proponham a solução.
- Se tiverem dúvida sobre uma decisão do código, podem fazer **perguntas objetivas ao SQUAD original**. A decisão final é sempre de vocês.
- Se o projeto recebido **não executar de jeito nenhum**, avisem o professor no primeiro dia e registrem isso no diagnóstico.

## 📋 Requisitos

### Formato do Projeto: Trabalho em SQUAD

O projeto final **deve ser realizado em SQUADs** (grupos), **diferentes dos do M1**. O objetivo é praticar a colaboração, o versionamento em equipe com Git e GitHub e a gestão de um projeto conjunto. O repositório do SQUAD é o **fork do projeto recebido** (veja a seção "O projeto herdado"), e **todos os membros devem realizar commits** nele.

### Requisitos Funcionais Mínimos

#### 1. Modelagem do Banco de Dados

Antes de escrever código, o SQUAD desenha o banco. O banco é **relacional** (PostgreSQL) e deve ter **pelo menos 6 tabelas**, escolhidas a partir da lista abaixo:

| Tabela | O que guarda | Relacionamentos esperados |
| --- | --- | --- |
| `usuarios` | E-mail, senha (cifrada) e papel (`cliente`, `vendedor` ou `admin`) | 1:1 com `clientes` ou `vendedores` |
| `clientes` | Nome, CPF e região de entrega | 1:N com `pedidos` |
| `vendedores` | Nome da loja e CNPJ | 1:N com `produtos` |
| `categorias` | Nome, alíquota e comissão | 1:N com `produtos` |
| `produtos` | Nome, preço e quantidade em estoque | N:N com `pedidos`, via `itens_pedido` |
| `pedidos` | Status, subtotal, descontos, frete e total | N:N com `cupons`, via `pedidos_cupons` |
| `itens_pedido` | Quantidade e **preço unitário no momento da compra** | Tabela intermediária |
| `cupons` | Código, tipo, valor, validade, valor mínimo e se é cumulativo | N:N com `pedidos` |

O modelo precisa ter, no mínimo, **um relacionamento 1:1, um 1:N e um N:N** (o N:N sempre com tabela intermediária).

Entreguem no `README.md`:

- o **DER** do banco, como imagem (Excalidraw, dbdiagram.io ou o que o SQUAD preferir), com chaves primárias, chaves estrangeiras e cardinalidades;
- um parágrafo explicando por que o modelo está **normalizado** (3FN): por que `categorias` é uma tabela e não um texto repetido em cada produto, e por que `itens_pedido` guarda o preço da hora da compra;
- o arquivo `docs/decisoes-banco.md`, com meia página comparando **banco relacional, NoSQL de documentos e busca semântica** para este sistema: por que o relacional é a melhor escolha aqui e em que parte do MercadoÁgil cada um dos outros dois faria sentido (por exemplo, avaliações de produtos ou busca por descrição).

#### 2. Regras de Negócio

As regras do M1 continuam valendo, agora na **camada de serviço**: as rotas e os controladores só recebem e respondem, e quem decide são os serviços. Abaixo está o resumo das regras. **O código herdado pode ter regras erradas ou faltando**: este resumo e o pedido de exemplo são a referência para conferir.

**Estoque: tudo ou nada**

- Ao confirmar, o pedido verifica **todos os itens de uma vez**. Se faltar qualquer item, **nada é confirmado e nada sai do estoque**, e a resposta lista **todos** os itens que faltaram.
- Pedido confirmado dá baixa no estoque. Pedido confirmado e depois cancelado **devolve** os itens.
- O pedido só aceita mudanças (itens e cupons) enquanto o status for `aberto`. Os status são `aberto`, `confirmado` e `cancelado`.

**Cupons** (do marketplace, valem para o pedido inteiro)

1. Tipos: `percentual`, `fixo` e `frete` (zera o frete).
2. Cupom **vencido** é recusado. O subtotal precisa atingir o **valor mínimo** do cupom.
3. No máximo **2 cupons** por pedido, sem repetir o mesmo. Cupom **não cumulativo** só pode ser usado sozinho.
4. Ordem de aplicação: primeiro os percentuais, depois os fixos, por último o de frete.
5. Teto: a soma dos descontos nunca passa de **30% do subtotal**, e o total nunca fica negativo.

**Frete, tributos e comissão**

O frete é **um só por pedido**: **taxa da região + R$ 1,50 por unidade**. Fica **grátis** quando o valor, já com os descontos, é de **R$ 300,00 ou mais**, ou quando o pedido usa um cupom `frete`.

| Região | Norte | Nordeste | Centro-Oeste | Sudeste | Sul |
| --- | --- | --- | --- | --- | --- |
| Taxa | R$ 35,00 | R$ 25,00 | R$ 30,00 | R$ 20,00 | R$ 22,00 |

Os **tributos aproximados** são só informativos: aparecem no pedido, mas **não somam no total**, e são calculados sobre os itens, antes dos descontos. A **comissão** do marketplace também é calculada sobre os itens antes dos descontos: cupom e frete são custo do marketplace e **não diminuem o repasse**.

| Categoria | `eletronicos` | `livros` | `alimentos` | `vestuario` | `casa` |
| --- | --- | --- | --- | --- | --- |
| Alíquota (fictícia) | 12% | 0% | 5% | 8% | 10% |
| Comissão (fictícia) | 8% | 15% | 10% | 12% | 10% |

**Repasse do vendedor = soma dos itens dele − comissão desses itens.** Só pedidos **confirmados** geram repasse.

**Pedido de exemplo (teste de aceite)**

A cliente mora no **Nordeste** e comprou 1 Mouse (eletrônicos, R$ 120,00, vendedor **TechBahia**) e 1 Livro de JavaScript (livros, R$ 80,00, vendedor **Livraria Sol**), com os cupons `BEMVINDO10` (10%) e `PDA15` (R$ 15,00 fixo).

```
Subtotal                              R$ 200,00
(-) BEMVINDO10: 10% de R$ 200,00    - R$  20,00
(-) PDA15: desconto fixo            - R$  15,00
(+) Frete: R$ 25,00 + 2 x R$ 1,50   + R$  28,00
TOTAL                                 R$ 193,00

Tributos aproximados: R$ 14,40

TechBahia     R$ 120,00 - comissão 8%  = R$ 110,40
Livraria Sol  R$  80,00 - comissão 15% = R$  68,00
Comissão total do marketplace: R$ 21,60
```

> Ao chamar `POST /pedidos/:id/confirmar` nesse pedido, a API **precisa responder com total de R$ 193,00**, e o relatório de repasse precisa mostrar R$ 110,40 e R$ 68,00. Se o resultado for diferente, tem alguma regra errada.

#### 3. Rotas da API

A API segue o padrão REST. As rotas abaixo são o **mínimo obrigatório**:

| Rota | Quem acessa | O que faz |
| --- | --- | --- |
| `POST /auth/registro` | Público | Cria um usuário `cliente` ou `vendedor` (nunca `admin`) |
| `POST /auth/login` | Público | Confere e-mail e senha e devolve o token JWT |
| `GET /produtos` e `GET /produtos/:id` | Público | Lista e busca produtos |
| `POST`, `PUT` e `DELETE /produtos` | Vendedor dono do produto | Cadastra, altera e exclui |
| `POST`, `GET` e `DELETE /cupons` | Admin | Gerencia os cupons |
| `POST /pedidos` | Cliente | Cria um pedido aberto com itens |
| `GET /pedidos` e `GET /pedidos/:id` | Cliente (só os dele) e admin (todos) | Lista e busca pedidos |
| `POST /pedidos/:id/cupons` | Cliente dono | Aplica um cupom |
| `POST /pedidos/:id/confirmar` e `/cancelar` | Cliente dono | Confirma ou cancela o pedido |
| `GET /relatorios/...` | Admin (o vendedor vê só o próprio repasse) | Relatórios financeiros |

Os status HTTP seguem esta tabela: **200** deu certo, **201** criou, **400** dado inválido, **401** sem login, **403** sem permissão, **404** não encontrou, **409** regra de negócio violada (estoque insuficiente, cupom vencido). Todo erro responde no mesmo formato, e **CPF e senha nunca aparecem em nenhuma resposta**:

```json
{ "erros": ["Estoque insuficiente: Mouse (pedido 3, disponível 1)"] }
```

O usuário `admin` é criado pelo **seeder**, nunca pelo registro público.

#### 4. Relatórios em SQL

Considerando **somente pedidos confirmados**, a API deve ter uma rota para cada relatório:

- **faturamento total, quantidade de pedidos e ticket médio** (`/relatorios/faturamento`);
- **faturamento por categoria**, sobre os itens antes dos descontos (`/relatorios/por-categoria`);
- **repasse por vendedor**: valor bruto, comissão e valor a repassar (`/relatorios/repasse`);
- **top 3 produtos mais vendidos**, por quantidade (`/relatorios/top-produtos`).

Os números saem de consultas SQL com `JOIN` e funções de agregação (`SUM`, `COUNT`, `GROUP BY`), feitas pelo Sequelize ou por `sequelize.query`. Guardem as consultas, comentadas, em `docs/queries.sql`.

#### 5. Segurança

- **Registro e login:** a senha é guardada **cifrada com bcrypt**, nunca em texto puro. O login devolve um **token JWT**.
- **Autenticação:** um middleware confere o token. Sem token válido, a resposta é **401**.
- **Autorização por papéis:** `cliente`, `vendedor` e `admin`, com as permissões da tabela de rotas. Cliente só acessa os **próprios** pedidos, e vendedor só altera os **próprios** produtos. Quando o usuário não tem permissão, a resposta é **403**.
- O `JWT_SECRET` e as credenciais do banco ficam no `.env`, **nunca** no GitHub.

#### 6. Deploy

A API deve estar **publicada no Render**, conectada a um **banco Postgres que guarda os dados** entre os deploys. O link vai no `README.md`.

### Requisitos Técnicos Obrigatórios

- **Linguagem:** JavaScript puro com Node.js e **Express**. O `package.json` mantém `"type": "module"`.
- **ORM:** **Sequelize**, com **models**, **migrations** e **seeders** (via `sequelize-cli`). As tabelas são criadas pelas migrations, **nunca** por `sync()`.
- **Banco:** PostgreSQL. Em desenvolvimento, o PGlite ou um Postgres instalado. Em produção, o Postgres do Render. Veja a seção "Banco de Dados: como configurar".
- **Organização:** o código é dividido em pastas por responsabilidade (rotas, controladores, serviços, models, schemas, middlewares). Veja a estrutura sugerida.
- **Validação:** schemas do **Zod** validam o corpo e os parâmetros das rotas, por meio de um **middleware reutilizável**. Dado inválido responde **400** com mensagem clara, e o servidor nunca cai por causa disso.
- **Documentação:** a API é documentada com **Swagger**, disponível em `/docs`.
- **Variáveis de ambiente:** o projeto lê a configuração do `.env` e traz um `.env.example` (sem valores secretos) no repositório.
- **Log:** um middleware registra cada requisição (método, rota e status).
- **Dados em arrays:** `map`, `filter`, `reduce`, destructuring, spread e rest continuam na lógica de negócio, como no M1 (por exemplo, o rest para tirar o `cpf` e a `senha` antes de responder).
- **Dados de exemplo:** os seeders criam 1 admin, 3 clientes, 3 vendedores, 8 produtos de 3 categorias diferentes e 3 cupons com validade futura.
- **Projeto herdado:** o repositório é um **fork** do projeto recebido, com o histórico original preservado, os créditos do SQUAD original no README e o arquivo `docs/diagnostico.md`.
- **Versionamento:** um único repositório no GitHub (o fork), com commits de todos os membros. O `.gitignore` ignora `node_modules`, `.env` e a pasta do banco local (`pgdata`).

### Estrutura de Pastas Sugerida

```
mercadoagil-api/
├── src/
│   ├── routes/        # um arquivo por recurso
│   ├── controllers/   # recebem a requisição e respondem
│   ├── services/      # regras de negócio (as classes do M1)
│   ├── models/        # models e relacionamentos do Sequelize
│   ├── schemas/       # schemas do Zod
│   ├── middlewares/   # log, autenticação, papéis, erros
│   ├── config/        # db.js e regras (frete, alíquotas...)
│   └── swagger/       # documentação da API
├── config/            # database.cjs (usado pelo sequelize-cli)
├── migrations/        # + package.json com "type": "commonjs"
├── seeders/           # + package.json com "type": "commonjs"
├── docs/              # diagnostico, DER, decisoes-banco, queries
├── .env.example
├── .sequelizerc
├── index.js
├── package.json
└── README.md
```

O código herdado pode estar organizado de outro jeito. Reorganizar é parte do trabalho, mas em **commits pequenos**, sempre com o sistema rodando.

## 🗄️ Banco de Dados: como configurar

O projeto usa **PostgreSQL**. Para não precisar instalar nada no computador, vocês podem usar o **PGlite**, um Postgres que roda dentro do Node e guarda os dados numa pasta local. Mas atenção: **o PGlite é só para desenvolvimento**. O disco gratuito do Render é apagado a cada deploy, restart ou quando o serviço fica parado, então **em produção** vocês usam um **Postgres do Render**.

#### Passo a passo no computador de vocês

**1. Instalar:**

```bash
npm i sequelize pg dotenv
npm i -D sequelize-cli @electric-sql/pglite @electric-sql/pglite-socket
```

**2. Criar o script que liga o banco**, no `package.json`:

```json
"scripts": { "db:start": "pglite-server --db=./pgdata --port=5544" }
```

O servidor **não cria pastas intermediárias**: use `./pgdata` ou crie a pasta antes. Rode `npm run db:start` em um terminal e **deixe aberto**.

**3. Criar o `.env`** (e um `.env.example` sem segredos):

```
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5544/postgres
DB_LOCAL=pglite
```

**4. Criar `config/database.cjs`**, usado pelo `sequelize-cli` e pela aplicação:

```js
// Usado pelo sequelize-cli E pela aplicação.
const usandoPGlite = process.env.DB_LOCAL === 'pglite';

const config = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  logging: false,
  // PGlite aceita só 1 conexão e não usa SSL
  pool: { max: usandoPGlite ? 1 : 5 },
  dialectOptions: usandoPGlite ? { ssl: false } : {},
};

module.exports = { development: config, production: config };
```

**5. Criar `.sequelizerc`**, na raiz, para o `sequelize-cli` achar tudo:

```js
require('dotenv').config();
const path = require('path');

module.exports = {
  config: path.resolve('config', 'database.cjs'),
  'migrations-path': path.resolve('migrations'),
  'seeders-path': path.resolve('seeders'),
  'models-path': path.resolve('src', 'models'),
};
```

**6. Criar `src/config/db.js`**, a conexão que a API usa:

```js
import 'dotenv/config';
import { Sequelize } from 'sequelize';
import config from '../../config/database.cjs';

const { use_env_variable, ...opcoes } = config.development;
export const sequelize = new Sequelize(process.env[use_env_variable], opcoes);
```

**7. Criar as tabelas e os dados de exemplo**, com o banco ligado:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

#### Pegadinhas que já pegaram muita gente

| O que aparece | O que fazer |
| --- | --- |
| `module is not defined in ES module scope` ao rodar uma migration | O projeto é `"type": "module"`, mas as migrations do `sequelize-cli` são CommonJS. Crie um `package.json` com `{ "type": "commonjs" }` **dentro** das pastas `migrations/` e `seeders/`. |
| `Connection terminated unexpectedly` | O pool do Sequelize está com mais de 1 conexão. Confira o `pool: { max: 1 }` do passo 4. |
| `ENOENT ... mkdir` ao ligar o banco | A pasta do `--db` não existe. Use `./pgdata`. |
| `ECONNREFUSED` na porta 5544 | O `npm run db:start` não está rodando. |

#### Em produção (Render)

Criem um **Postgres no painel do Render** e copiem a URL de conexão para a variável `DATABASE_URL` do serviço da API. **Não** coloquem `DB_LOCAL`. As migrations precisam rodar antes da API subir (por exemplo, no comando de início: `npx sequelize-cli db:migrate && node index.js`), e o `sequelize-cli` precisa estar em `dependencies`. Confiram na documentação do Render se a URL do banco exige SSL.

**Documentação completa:** PGlite Socket em https://pglite.dev/docs/pglite-socket e planos gratuitos do Render em https://render.com/docs/free.

## 🎤 Apresentação

- Desenvolvam uma apresentação em SQUAD sobre o projeto:
    - apresentem o **diagnóstico do projeto herdado**: o que encontraram, o que mantiveram, o que corrigiram e o que reescreveram, com o porquê;
    - apresentem o problema e a solução, mostrando o **DER** e explicando as decisões de modelagem;
    - mostrem a estrutura do código e as decisões de design;
    - demonstrem a **API publicada no Render**, pelo Swagger, com um fluxo completo: registro, login, criar o pedido de exemplo, aplicar os cupons, confirmar e consultar o repasse;
    - mostrem também uma **recusa de acesso (403)**, por exemplo um cliente tentando abrir um relatório;
    - **a apresentação é responsabilidade de todo o SQUAD, e todos os membros devem participar ativamente.**
- Publiquem a apresentação no **LinkedIn** (pode ser um post por membro, ou um post principal com todos marcados).
- O projeto finalizado deve ser entregue pelo **link do repositório do GitHub do SQUAD**.

## 🧰 Utilitários

- **Express:** `express.Router()`, `express.json()`, middlewares e tratamento de erros.
- **Sequelize:** `define`, `hasOne`, `hasMany`, `belongsTo`, `belongsToMany`, `findAll` com `include`, `group` e `sequelize.query`.
- **Zod:** `z.object`, `.refine()`, `safeParse` e `z.coerce`.
- **Segurança:** `bcrypt` para cifrar a senha, `jsonwebtoken` para o token e `express-rate-limit` para limitar requisições.
- **Swagger:** `swagger-jsdoc` e `swagger-ui-express`.
- **Git e GitHub:** fork, `git clone`, branches, commits pequenos e Issues.

### Extras opcionais

- 🔵 **Prisma:** reimplementar o módulo de produtos com Prisma (schema, migration e CRUD) em uma branch e comparar com o Sequelize no README. Usem `npx prisma@7`, porque na CLI 8 o comando `prisma dev` faz outra coisa. Para o banco local do Prisma, copiem `DATABASE_URL` e `SHADOW_DATABASE_URL` para o `.env`. Guia: https://www.prisma.io/docs/local-development/postgres
- 🔵 Confirmação do pedido dentro de uma **transação** (`sequelize.transaction`), garantindo o tudo ou nada no banco.
- 🔵 Paginação e filtros nas listagens.
- 🔵 Integração com uma API de IA (por exemplo, gerar a descrição de um produto).

---

## 📊 Rubrica

A rubrica é o arquivo utilizado para correção. Dentro dela estão todos os critérios de correção.

### Legenda

| Cor | Significado |
| --- | --- |
| 🔴 **Vermelho** | Critérios negativos. Os critérios **🔴 em negrito** são **eliminatórios e podem zerar a nota das demais tecnologias.** |
| 🟡 **Amarelo** | Critérios neutros (o esperado). |
| 🟢 **Verde** | Critérios positivos (excelência). |
| 🔵 **Azul** | Critérios extras e opcionais. |

### Tabela de Avaliação

| Tecnologia | 🔴 Faltou algo | 🟡 Tudo OK | 🟢 Majestoso |
| --- | --- | --- | --- |
| **Problematização** | • 🔴 **O SQUAD ignorou o cenário do MercadoÁgil 2.0 ou construiu um sistema diferente do pedido.** | • A API resolve os problemas do cenário: os dados **persistem**, o acesso é **protegido**, os relatórios saem do banco e a API está **documentada e publicada**. | • Resolve todos os problemas do cenário e o SQUAD **explica o impacto** de cada decisão para o marketplace, o vendedor e o cliente.<br>• 🔵 Identificou um problema real a mais e o resolveu (ex.: alerta de estoque baixo, histórico de pedidos por cliente). |
| **Evolução do Projeto Herdado** | • 🔴 **Não partiu do repositório recebido: começou do zero, sem o histórico do projeto herdado e sem diagnóstico.**<br>• Copiou os arquivos para um repositório novo e o histórico original se perdeu.<br>• Sem `docs/diagnostico.md`, ou ele só descreve o projeto sem apontar problemas.<br>• Sem créditos ao SQUAD original no README. | • O repositório é um **fork** do projeto recebido, com o histórico original preservado e os créditos no README.<br>• Rodou o **pedido de exemplo** no código recebido antes de alterar e registrou o que não bateu.<br>• `docs/diagnostico.md` explica o que o projeto faz, como está organizado, **os problemas encontrados** e o que foi mantido, corrigido ou reescrito, com justificativa.<br>• As alterações aparecem no histórico, e o que já funcionava continua funcionando. | • Cada problema encontrado virou uma **Issue** no GitHub, e os commits que o corrigem citam a issue.<br>• Refatorações em commits pequenos, sempre com o sistema rodando.<br>• Críticas ao código escritas de forma objetiva e respeitosa: apontam o problema e a solução, sem culpar pessoas.<br>• 🔵 Fez perguntas objetivas ao SQUAD original e registrou as respostas no diagnóstico. |
| **Modelagem de Dados** | • Sem DER, ou o DER não bate com o banco real.<br>• Tudo numa tabela só, ou dados repetidos em várias tabelas (ex.: o nome da categoria escrito em cada produto).<br>• Sem documento comparando os tipos de banco. | • DER no README com **6 ou mais tabelas**, chaves primárias e estrangeiras, e relacionamentos **1:1, 1:N e N:N** (o N:N com tabela intermediária).<br>• Um parágrafo justifica a normalização (3FN).<br>• `docs/decisoes-banco.md` compara relacional, NoSQL de documentos e busca semântica para este sistema. | • `itens_pedido` guarda o **preço da hora da compra** e a justificativa explica por quê.<br>• Discute o que é **guardado** e o que é **calculado** (ex.: o total do pedido) e por quê.<br>• Restrições no banco: e-mail único, valores não nulos, chaves estrangeiras corretas.<br>• 🔵 Esboça como seria uma parte do sistema em NoSQL de documentos (ex.: avaliações de produtos). |
| **Persistência (Sequelize)** | • 🔴 **Os dados ficam só em memória ou em arquivo, e não em um banco relacional com o Sequelize.**<br>• Tabelas criadas à mão ou por `sync()`, sem migrations.<br>• Models sem relacionamentos. | • Models para todas as tabelas, com relacionamentos (`hasMany`, `belongsTo`, `belongsToMany`).<br>• **Migrations** que criam o banco do zero e **seeders** com os dados de exemplo.<br>• Configuração do banco lida do `.env`, com `.env.example` no repositório. | • Dá para apagar o banco, rodar `db:migrate` e `db:seed:all` e a API volta a funcionar, sem passo escondido.<br>• Migrations pequenas e com `down` funcionando.<br>• 🔵 Confirmação do pedido em **transação** (`sequelize.transaction`).<br>• 🔵 Módulo de produtos reimplementado com **Prisma** em uma branch, com comparação no README. |
| **API REST e Organização** | • A API não responde às rotas mínimas.<br>• Rotas misturadas num arquivo só, com tudo dentro.<br>• Verbos e status HTTP trocados (ex.: tudo responde 200).<br>• O CPF ou a senha aparecem nas respostas. | • Express com `Router` por recurso e **controladores enxutos**, que só recebem e respondem.<br>• Verbos e status corretos (200, 201, 400, 401, 403, 404 e 409) e erros no formato padrão.<br>• Middleware de log de requisições.<br>• Código dividido em pastas por responsabilidade, com nomes descritivos e comentários nos pontos-chave.<br>• CPF e senha **nunca** aparecem nas respostas. | • Middleware único de tratamento de erros: nenhuma rota derruba o servidor.<br>• Rotas e nomes consistentes em toda a API.<br>• 🔵 Paginação e filtros nas listagens. |
| **Regras de Negócio** | • Regras escritas direto nas rotas ou nos controladores, sem camada de serviço.<br>• Confirma o pedido sem verificar o estoque, ou dá baixa só em parte dos itens.<br>• Cupons, frete ou comissão calculados diferente do descritivo.<br>• Aceitou as regras do código herdado sem conferir com o enunciado (ex.: o pedido de exemplo não bate). | • Regras de **estoque, cupons, frete, tributos e comissão** na camada de serviço, como no descritivo.<br>• Usa `map`, `filter`, `reduce`, destructuring, spread e rest na lógica.<br>• O pedido de exemplo dá **R$ 193,00** de total e **R$ 110,40** e **R$ 68,00** de repasse. | • Casos extremos tratados: pedido vazio, cupom repetido, cancelar pedido já cancelado, excluir produto que está num pedido aberto.<br>• Valores sempre com 2 casas decimais, sem erros como `14.399999`.<br>• As taxas (frete, alíquotas, comissões) ficam num só lugar, fáceis de mudar.<br>• 🔵 Integração com uma API de IA (ex.: gerar a descrição de um produto), com a chave no `.env`. |
| **Validação (Zod)** | • 🔴 **Não usa Zod: dados inválidos entram no sistema.**<br>• Um dado inválido derruba o servidor ou devolve erro 500. | • Schemas Zod validam o **corpo e os parâmetros** das rotas, por um **middleware reutilizável**.<br>• Dado inválido responde **400** com mensagem clara, no formato padrão.<br>• CPF e CNPJ com validação de formato e validade do cupom em data futura (`.refine()`). | • CPF e CNPJ validados com os **dígitos verificadores**.<br>• Mensagens em português e específicas para cada campo.<br>• Regras para a senha (tamanho mínimo, e-mail válido) no schema de registro. |
| **Consultas e Relatórios (SQL)** | • Relatórios calculados trazendo tudo para a memória e somando com `for`.<br>• Números errados, ou somando pedidos abertos e cancelados. | • Os 4 relatórios saem de consultas SQL com `JOIN` e `SUM`, `COUNT` e `GROUP BY`, só com pedidos **confirmados**.<br>• As consultas estão em `docs/queries.sql`. | • O **banco faz a conta**: a API não soma nada em JavaScript.<br>• Consultas comentadas, explicando cada `JOIN` e cada agrupamento.<br>• Vendedor vê apenas o próprio repasse.<br>• 🔵 Filtro por período ou por vendedor. |
| **Autenticação e Autorização** | • 🔴 **Senha guardada em texto puro, ou segredo (`JWT_SECRET`, senha do banco) enviado para o GitHub.**<br>• 🔴 **Rotas de pedido sem autenticação.**<br>• Todos os usuários têm as mesmas permissões. | • Registro e login com senha cifrada (**bcrypt**) e token **JWT**.<br>• Middleware de autenticação (401) e de papéis (403) com `cliente`, `vendedor` e `admin`.<br>• Cliente só acessa os próprios pedidos, e vendedor só altera os próprios produtos.<br>• O registro público não cria `admin`. | • **Rate limiting** nas rotas de login e registro.<br>• O token tem prazo de validade, e token inválido ou vencido recebe 401.<br>• 🔵 Refresh token ou rota de logout. |
| **Documentação (Swagger e README)** | • Sem Swagger, ou só com algumas rotas.<br>• README que não permite rodar o projeto. | • Swagger em `/docs` com **todas as rotas**, o corpo esperado e as respostas principais.<br>• README com como rodar (banco local, migrations e seed), variáveis do `.env.example`, o DER, o parágrafo de normalização e quem fez o quê. | • Swagger com **exemplos**, códigos de erro e o botão **Authorize** funcionando com o JWT.<br>• README com decisões do SQUAD, prints e o link da API publicada. |
| **Deploy** | • Sem deploy.<br>• Deploy usando banco em arquivo (SQLite ou PGlite) que perde os dados a cada deploy. | • API publicada no **Render**, conectada a um **Postgres** que guarda os dados.<br>• Migrations rodadas no ambiente publicado e link da API no README. | • As rotas protegidas funcionam em produção, com as variáveis de ambiente configuradas no Render.<br>• O README explica o passo a passo do deploy, para outro time repetir.<br>• 🔵 Seed de demonstração disponível no ambiente publicado. |
| **Versionamento** | • 🔴 **Repositório não foi utilizado ou possui um histórico de commits que não reflete um trabalho em equipe (ex.: um único commit por uma única pessoa).**<br>• `node_modules`, `.env` ou a pasta do banco local enviados para o GitHub. | • O projeto está em um repositório no GitHub (o fork do projeto recebido), com o histórico original e as alterações do SQUAD visíveis.<br>• **Todos os membros do SQUAD realizaram commits**, demonstrando colaboração.<br>• `.gitignore` configurado. | • Excelente histórico, com commits pequenos e mensagens claras (ex.: `feat: adiciona middleware de papéis`).<br>• 🔵 Branches por funcionalidade e Pull Requests revisados por outro membro. |
| **Colaboração no SQUAD** | • Uma ou duas pessoas fazem tudo enquanto o resto assiste.<br>• Bloqueios escondidos até a véspera da entrega. | • Tarefas divididas e visíveis (GitHub Projects, Trello ou similar).<br>• A leitura do código herdado é dividida: cada pessoa explica ao grupo a parte que estudou.<br>• Cada membro sabe explicar a parte que fez.<br>• Bloqueios comunicados cedo. | • O SQUAD tenta destravar sozinho antes de pedir ajuda (documentação, testes, conversa entre si).<br>• Decisões debatidas com argumentos e registradas no README. |
| **Apresentação** | • 🔴 **O SQUAD não apresentou.**<br>• 🔴 **Nenhum membro consegue explicar o código apresentado.**<br>• Não publicou no LinkedIn. | • Apresenta o diagnóstico do projeto herdado, o problema, o DER, a solução, a estrutura do código e a API publicada funcionando.<br>• Todos os membros participam.<br>• Post publicado no LinkedIn. | • Demonstração fluida do fluxo completo pelo Swagger, incluindo uma recusa 403.<br>• Contam um desafio que travou o time e como resolveram.<br>• 🔵 Post no LinkedIn com vídeo ou GIF da API funcionando. |

---

## ❌ Critérios Eliminatórios

Os critérios abaixo são **eliminatórios** e podem zerar a nota das demais tecnologias:

- ❌ **A API não sobe** ou fecha com erro durante o uso normal.
- ❌ **Os dados não ficam num banco relacional com o Sequelize**: só em memória ou em arquivo.
- ❌ **Não usa Zod** para validar os dados.
- ❌ **Senha em texto puro** ou **segredo no GitHub** (`JWT_SECRET`, senha do banco).
- ❌ **Rotas de pedido sem autenticação.**
- ❌ **Não partiu do repositório recebido**: começou do zero, sem o histórico nem o diagnóstico do projeto herdado.
- ❌ **Repositório não utilizado** ou histórico que não mostra trabalho em equipe.
- ❌ **O SQUAD não apresentou**, ou **nenhum membro consegue explicar o código**.
- ❌ **Ignorou o cenário do MercadoÁgil 2.0** ou construiu outro sistema.

---

## 💡 Dicas para não travar

- **Mostrem o DER ao professor antes de escrever código.** Um erro de modelagem custa caro depois, porque muda tabelas, migrations e rotas.
- **Uma rota por vez.** Criou, rodou no Swagger, viu o resultado. Só então passem para a próxima.
- **Leiam antes de mexer.** No primeiro dia, rodem o projeto herdado e o pedido de exemplo. Anotem tudo o que estranharem: isso vira o diagnóstico.
- **Preservem o que funciona.** As classes e as regras do projeto recebido viram a camada de serviço. Reescrevam só o que o diagnóstico justificar.
- **Planejem a última semana.** A aula de login, papéis e deploy acontece uma semana antes da entrega. Até lá, deixem pronto o que já foi ensinado (diagnóstico, DER, Sequelize, rotas, Zod e Swagger), para usar a última semana só na segurança e no deploy.
- **Usem o pedido de exemplo como teste** sempre que mexerem em cupom, frete, comissão ou relatório.
- **Testem o projeto do zero antes de entregar:** apaguem o banco, rodem `db:migrate` e `db:seed:all` e vejam se a API funciona. Quem clonar o repositório precisa conseguir rodar.
- **Não deixem o deploy para o último dia.** Publiquem uma API mínima cedo e vão atualizando.
- **Commit pequeno e frequente.** Um commit por funcionalidade que funciona.
- **Primeiro o obrigatório, depois os extras 🔵.**
- **Travou?** Leiam a mensagem de erro, procurem na documentação e conversem com o SQUAD. Se mesmo assim não sair, peçam ajuda mostrando o que já tentaram.

## 📦 Entrega

- **Link do repositório do GitHub do SQUAD** (o fork do projeto recebido), com o professor adicionado como colaborador.
- **Link da API publicada no Render** (e o do Swagger, em `/docs`).
- **Link do post no LinkedIn.**
- **Data de entrega:** 18/12/2026 (sexta-feira)

*Lembrem-se: ninguém aprende programação sem errar. O que diferencia um time é o que ele faz depois do erro.* 🚀