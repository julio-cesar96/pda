# 🗂️ Rotas e controladores + 🗄️ Conectando com o banco de dados

**Módulo 2 · Aula 4 (Semana 12): a API do MercadoÁgil ganha organização, um CRUD completo e um banco de verdade**

Na Aula 3, o MercadoÁgil ganhou um servidor com rotas `GET` num `index.js` só. Hoje essa API cresce: vamos **separar as rotas por assunto**, deixar o cliente **criar, alterar e apagar** produtos, **anotar cada pedido** que chega, guardar as configurações num **cofre** (`.env`) e, por fim, **guardar os produtos num banco**, para que eles não sumam quando o servidor reinicia.

Hoje parte da aula é dada **por vocês**: quatro grupos estudaram uma missão em casa e explicam para a turma (veja [`sala-invertida/missoes.md`](sala-invertida/missoes.md)).

> **Regra de ouro (a mesma de sempre):** um passo, roda, confere. Escreva uma linha, salve, teste com o `curl`, olhe o resultado. Se der erro, leia a mensagem **até o fim**: ela é uma pista, não uma bronca.

---

## 📑 Sumário

1. [Como usar este material](#-como-usar-este-material)
2. [Vocabulário da aula](#-vocabulário-da-aula)
3. [O cenário: a API do MercadoÁgil cresceu](#-o-cenário-a-api-do-mercadoágil-cresceu)
4. [1. Rotas e controladores: cada praça no seu lugar](#1-rotas-e-controladores-cada-praça-no-seu-lugar)
5. [2. O CRUD: criar, ler, alterar e apagar](#2-o-crud-criar-ler-alterar-e-apagar)
6. [✂️ Ponto de corte](#️-ponto-de-corte)
7. [3. Middleware de log e variáveis de ambiente](#3-middleware-de-log-e-variáveis-de-ambiente)
8. [4. Sequelize: os produtos vão para o banco](#4-sequelize-os-produtos-vão-para-o-banco)
9. [Resumo e mapa da API](#-resumo-e-mapa-da-api)
10. [Exercício da aula: o VagaÁgil](#-exercício-da-aula-o-vagaágil)
11. [Lista de exercícios para casa](#-lista-de-exercícios-para-casa)
12. [Erros comuns e o que eles significam](#-erros-comuns-e-o-que-eles-significam)

---

## 💻 Como usar este material

1. Você precisa do **Node.js 22** (o mesmo de sempre) e de **internet** para o `npm install`.
2. O código pronto da aula está em [`livecoding/mercadoagil-api`](livecoding/mercadoagil-api/). Ele evolui o servidor da Aula 3. Para rodar:

```bash
cd livecoding/mercadoagil-api
npm install
npm run dev
```

3. Para testar, use o **curl** num **segundo terminal**. No **Windows (PowerShell)**, escreva sempre `curl.exe` em vez de `curl`.
4. **Digite o código** em vez de copiar e colar. Compare com o da pasta `livecoding` só para conferir.

### Pedidos com corpo (POST e PUT): o corpo vai num arquivo

Até agora, todo pedido era `GET`: só o endereço bastava. Hoje alguns pedidos **levam dados** (o produto novo, por exemplo). Esses dados vão num **arquivo `.json`** dentro da pasta do projeto, e o `curl` envia o arquivo:

```bash
curl -i -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d "@produto.json"
```

| Pedaço | O que significa |
|---|---|
| `-X POST` | O **método** do pedido (o verbo) |
| `-H "Content-Type: application/json"` | Uma **etiqueta** avisando: "o que vai no corpo é JSON" |
| `-d "@produto.json"` | O **corpo** do pedido: o `@` quer dizer "pegue o conteúdo **deste arquivo**" |

Por que num arquivo, e não escrito direto no comando? Porque o JSON tem aspas, e cada terminal (bash, PowerShell, Prompt de Comando) trata aspas de um jeito diferente. Com o arquivo, **o mesmo comando funciona em todo lugar**.

> **No Windows (PowerShell):** o comando é o mesmo, com `curl.exe` no lugar de `curl`. **Mantenha as aspas** em `"@produto.json"`: no PowerShell, o `@` sozinho tem outro significado. Crie os arquivos `.json` no **VS Code** (não com `echo` no terminal, que no PowerShell pode salvar o arquivo num formato que o servidor não entende).

> **Crie os arquivos `.json` ANTES de ligar o servidor.** O Nodemon também vigia arquivos `.json`: criar ou salvar um deles **reinicia o servidor**. Com os dados na memória, reiniciou = os produtos que você criou somem.

Este material foi testado com **Node.js 22**, **Express 5.3.0**, **Nodemon 3.1.14**, **dotenv 18.0.10**, **Sequelize 6.37.8** e **sqlite3 6.0.1**. As linhas `Date` e `ETag` das respostas mudam a cada teste: não precisam bater.

---

## 📖 Vocabulário da aula

| Palavra | Significado simples |
|---|---|
| Router (`express.Router()`) | Uma **seção do cardápio** (Produtos, Vendedores), num arquivo só dela |
| Controller | O **cozinheiro de cada praça**: recebe o pedido e prepara a resposta |
| CRUD | **C**riar, **R**ler (*read*), **U**pdate (alterar) e **D**eletar: as 4 coisas que se faz com um dado |
| `POST` | O método "**cria** um novo" |
| `PUT` | O método "**troca** os dados deste" |
| `DELETE` | O método "**apaga** este" |
| Parâmetro de rota (`/:id`) | Um **pedaço variável** do caminho: em `/produtos/2`, o `id` é `2` |
| `req.params` | Onde o Express guarda os parâmetros do caminho (`req.params.id`) |
| Corpo (`req.body`) | Os **dados que o cliente enviou** junto com o pedido (num POST ou PUT) |
| `express.json()` | O **leitor** que abre o JSON do corpo e guarda em `req.body` |
| Middleware | Uma **parada no caminho** do pedido, antes de chegar à rota (a **recepcionista**) |
| `next()` | O "**pode passar**" do middleware para a próxima parada |
| Variável de ambiente | Uma configuração que mora **fora do código** (porta, senha do banco) |
| `.env` | O **cofre** dessas configurações. **Nunca** vai para o GitHub |
| `.env.example` | O **modelo** do cofre, sem segredos. Esse vai para o GitHub |
| ORM | O **tradutor** entre JavaScript e SQL |
| Sequelize | O ORM que vamos usar (e que o projeto final exige) |
| Model | A **ficha-modelo** de uma tabela, escrita em JavaScript |
| `sync()` | "Sequelize, cria as tabelas que ainda não existem" |
| SQLite | Um banco que é **um arquivo** no seu computador. Não precisa instalar servidor |
| `async` / `await` | "Esta função **espera** o banco responder antes de seguir" |

---

## 🛒 O cenário: a API do MercadoÁgil cresceu

O app do MercadoÁgil já mostra a vitrine (`GET /produtos`). Agora o **painel do vendedor** precisa **cadastrar**, **alterar o preço** e **tirar do ar** produtos. Ao mesmo tempo, o time cresceu: três pessoas vão mexer na API na mesma semana.

Hoje vamos resolver quatro problemas, um por bloco:

| Problema | Solução de hoje |
|---|---|
| Três pessoas editando o mesmo `index.js` | **Rotas e controladores** em arquivos separados |
| O app só consegue **ver** produtos | O **CRUD** completo: `POST`, `PUT`, `DELETE` |
| Ninguém sabe que pedidos chegaram, e a configuração está escrita no código | **Middleware de log** e **`.env`** |
| Reiniciou o servidor, **os produtos novos somem** | **Sequelize** e um banco **SQLite** |

> **🎨 Em uma frase:** o pedido entra pela recepção (middleware), vai para a seção certa do cardápio (rota), o cozinheiro prepara (controller) e busca os ingredientes no estoque (model e banco).

---

## 1. Rotas e controladores: cada praça no seu lugar

> 🎤 **Este bloco começa com a mini-aula do Grupo 1.**

**Objetivo:** tirar as rotas do `index.js` e separá-las em **um arquivo de rotas por recurso**, com um **controller** para cada um.

**Por que usar?** Num restaurante grande, a cozinha tem **praças**: a de grelhados, a de massas, a de sobremesas. Cada **cozinheiro** cuida da sua praça, e o **cardápio** tem **seções**. Ninguém prepara massa na chapa do grelhado.

| No restaurante | Na API |
|---|---|
| Uma seção do cardápio ("Produtos") | Um **arquivo de rotas**: `routes/produtos.js` |
| O cozinheiro daquela praça | O **controller**: `controllers/produtosController.js` |
| O salão que encaminha cada pedido para a praça certa | O `index.js`, com `app.use('/produtos', ...)` |

### Primeiro, o problema

Na Aula 3, tudo ficou no `index.js`. Com 3 rotas, tudo bem. Mas a API do projeto final vai ter **mais de 20 rotas**. Imagine o `index.js` com 40 rotas e 3 pessoas mexendo nele ao mesmo tempo:

- cada pessoa precisa **rolar o arquivo inteiro** para achar a sua rota;
- duas pessoas editam o **mesmo arquivo** na mesma semana, e o Git mostra um **conflito** na hora de juntar o trabalho;
- quando algo quebra, a mensagem de erro aponta para a linha 347 de um arquivo enorme, e ninguém sabe **de quem** é aquela parte.

### A solução: as camadas

```
mercadoagil-api/
├── index.js                      ← o salão: liga o servidor e encaminha
├── routes/
│   ├── produtos.js               ← a seção "Produtos" do cardápio
│   └── vendedores.js             ← a seção "Vendedores"
└── controllers/
    ├── produtosController.js     ← o cozinheiro de produtos
    └── vendedoresController.js   ← o cozinheiro de vendedores
```

**O controller** guarda os dados (por enquanto, na memória) e as funções que respondem. Cada função tem o mesmo molde de sempre, `(req, res)`, só que agora com **nome** e **`export`** (lembra dos módulos do M1?):

<!-- node:skip -->
```js
// controllers/produtosController.js
// O "cozinheiro" da praça de produtos: recebe o pedido e prepara a resposta.
let produtos = [
  { id: 1, nome: 'Mouse', preco: 120 },
  { id: 2, nome: 'Teclado', preco: 350 },
  { id: 3, nome: 'Livro de JavaScript', preco: 80 },
];

// GET /produtos
export function listar(req, res) {
  res.json(produtos);
}
```

**O arquivo de rotas** só diz **qual caminho chama qual função**. Ele não sabe **como** a função faz o trabalho:

<!-- node:skip -->
```js
// routes/produtos.js
import express from 'express';
import { listar } from '../controllers/produtosController.js';

// A seção "Produtos" do cardápio. O caminho "/" aqui quer dizer "/produtos".
export const rotasProdutos = express.Router();

rotasProdutos.get('/', listar);
```

Repare: é `listar`, **sem parênteses**. Você está **entregando a receita** para o Express, que vai usá-la a cada pedido. Com parênteses, você executaria a função na hora, sem pedido nenhum.

**O `index.js`** fica curto. Ele liga cada seção do cardápio a um caminho:

<!-- node:skip -->
```js
import express from 'express';
import { rotasProdutos } from './routes/produtos.js';
import { rotasVendedores } from './routes/vendedores.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Bem-vindo à API do MercadoÁgil!');
});

// Cada seção do cardápio tem o seu arquivo de rotas
app.use('/produtos', rotasProdutos);
app.use('/vendedores', rotasVendedores);

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('Servidor do MercadoÁgil rodando em http://localhost:3000');
  }
});
```

`app.use('/produtos', rotasProdutos)` quer dizer: "todo pedido que começa com `/produtos`, mande para a seção de produtos". Lá dentro, o `'/'` vira `/produtos`, e o `'/:id'` (que vem no bloco 2) vira `/produtos/:id`.

O `vendedores.js` e o `vendedoresController.js` seguem **o mesmo molde**. Estão na pasta `livecoding`.

```bash
curl http://localhost:3000/produtos
```

```
[{"id":1,"nome":"Mouse","preco":120},{"id":2,"nome":"Teclado","preco":350},{"id":3,"nome":"Livro de JavaScript","preco":80}]
```

**A resposta é exatamente a mesma da Aula 3.** Para quem usa a API, nada mudou. Mudou só a organização por dentro. É isso que se chama **refatorar**.

### E se eu esquecer o `.js` no import?

<!-- node:skip -->
```js
import { rotasProdutos } from './routes/produtos';
```

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/.../mercadoagil-api/routes/produtos' imported from /.../mercadoagil-api/index.js
Did you mean to import "./routes/produtos.js"?
```

O Node até sugere a correção na segunda linha. Leia a mensagem até o fim.

> **🎨 Em uma frase:** o `index.js` encaminha, a rota escolhe o cozinheiro, o controller cozinha.

**💬 E daí?** Com as camadas separadas, a pessoa que cuida de cupons mexe em `routes/cupons.js` e `controllers/cuponsController.js`, e **nunca** encosta no arquivo de produtos. Menos conflito no Git, menos medo de quebrar o que funciona. É a estrutura que o **projeto final** pede (pastas `routes/` e `controllers/`), e a que você vai encontrar em quase toda API Node.js de empresa.

**✅ Checkpoint:** o time quer criar `GET /categorias`. Quais arquivos você cria, e qual linha muda no `index.js`?

<details>
<summary>💡 Ver resposta</summary>

Dois arquivos novos: `controllers/categoriasController.js` (com o array e a função `listar`) e `routes/categorias.js` (com o `express.Router()` e `rotasCategorias.get('/', listar)`). No `index.js`, entram duas linhas: o `import { rotasCategorias } from './routes/categorias.js';` e o `app.use('/categorias', rotasCategorias);`. Os arquivos de produtos e vendedores **não mudam**.

</details>

---

## 2. O CRUD: criar, ler, alterar e apagar

> 🎤 **Este bloco começa com a mini-aula do Grupo 2.**

**Objetivo:** completar o cardápio de produtos com os **5 pedidos** do CRUD e responder com o **status** certo em cada caso.

**Por que usar?** Até agora, o cliente só podia **olhar** o cardápio (`GET`). Mas o painel do vendedor precisa **cadastrar** um produto, **mudar o preço** e **tirar do ar**. Cada ação tem um **verbo** (o método). O **caminho** continua sendo o substantivo: `/produtos`.

| Quero... | Método | Caminho | Status quando dá certo |
|---|---|---|---|
| Ver todos | `GET` | `/produtos` | `200 OK` |
| Ver **um** | `GET` | `/produtos/:id` | `200 OK` (ou `404` se não existe) |
| **Criar** um novo | `POST` | `/produtos` | `201 Created` |
| **Trocar** os dados de um | `PUT` | `/produtos/:id` | `200 OK` (ou `404`) |
| **Apagar** um | `DELETE` | `/produtos/:id` | `204 No Content` (ou `404`) |

### 2.1 Buscar um produto: `req.params`

O `:id` no caminho é um **pedaço variável**. Em `/produtos/2`, o Express guarda o `2` em `req.params.id`.

<!-- node:skip -->
```js
// GET /produtos/:id
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }
  res.json(produto);
}
```

E no arquivo de rotas: `rotasProdutos.get('/:id', buscarPorId);`

```bash
curl -i http://localhost:3000/produtos/2
```

```
HTTP/1.1 200 OK
...
{"id":2,"nome":"Teclado","preco":350}
```

```bash
curl -i http://localhost:3000/produtos/99
```

```
HTTP/1.1 404 Not Found
...
{"erros":["Produto não encontrado"]}
```

Três detalhes importantes:

- **`Number(...)`:** tudo o que vem no caminho chega como **texto** (`'2'`). E `'2' === 2` é `false`. Sem o `Number`, **todo** id dá 404, mesmo os que existem.
- **`res.status(404)`:** escolhe o status antes de responder. Sem ele, o Express responde `200`.
- **`return`:** responde e **para por ali**. Sem ele, a função continuaria e tentaria responder duas vezes.

O formato `{ "erros": [...] }` é o mesmo que o **projeto final** pede para todo erro da API.

### 2.2 Criar um produto: `POST`, `express.json()` e `req.body`

#### Primeiro, o problema

<!-- node:skip -->
```js
// POST /produtos
export function criar(req, res) {
  const { nome, preco } = req.body;
  const novo = { id: proximoId, nome, preco };
  proximoId++;

  produtos.push(novo);
  res.status(201).json(novo);
}
```

O `proximoId` é um contador que fica no topo do controller, logo depois do array: `let proximoId = 4;`. No arquivo de rotas: `rotasProdutos.post('/', criar);`

Crie o arquivo `produto.json` na pasta do projeto (lembre: **antes** de ligar o servidor):

```json
{ "nome": "Monitor", "preco": 1600 }
```

E envie:

```bash
curl -i -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d "@produto.json"
```

```
HTTP/1.1 500 Internal Server Error
...
```

No terminal do servidor:

```
TypeError: Cannot destructure property 'nome' of 'req.body' as it is undefined.
    at criar (file:///.../mercadoagil-api/controllers/produtosController.js:28:11)
```

O `req.body` está **vazio** (`undefined`). O JSON chegou, mas **ninguém abriu o pacote**.

#### A solução: o leitor de JSON

No `index.js`, **antes** das rotas:

<!-- node:skip -->
```js
// Ensina o servidor a ler o JSON que chega no corpo do pedido (req.body)
app.use(express.json());
```

Teste de novo:

```
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-u6pfTCCGOp9yPu4SYbX80e4qmkM"
Date: Wed, 25 Nov 2026 21:52:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":4,"nome":"Monitor","preco":1600}
```

`201 Created` = "**criei**, e aqui está o que foi criado". O servidor devolve o produto **com o `id` novo**: o app precisa dele para mostrar ou alterar o produto depois.

> **Esqueceu o `-H "Content-Type: application/json"`?** Aparece **o mesmo** erro do `req.body`. Sem essa etiqueta, o `express.json()` não sabe que o corpo é JSON e não abre o pacote.

### 2.3 Alterar e apagar: `PUT` e `DELETE`

<!-- node:skip -->
```js
// PUT /produtos/:id
export function atualizar(req, res) {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }

  const { nome, preco } = req.body;
  produto.nome = nome;
  produto.preco = preco;
  res.json(produto);
}

// DELETE /produtos/:id
export function remover(req, res) {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }

  produtos = produtos.filter((p) => p.id !== id);
  res.status(204).send();
}
```

E no arquivo de rotas:

<!-- node:skip -->
```js
rotasProdutos.put('/:id', atualizar);
rotasProdutos.delete('/:id', remover);
```

- No `PUT`, o `find` devolve **a mesma ficha** que está no array (lembra do **apelido** da Aula 2 do M1?). Mudar `produto.preco` muda o produto **dentro da lista**. Aqui, o apelido é exatamente o que queremos.
- No `DELETE`, o `filter` cria uma lista **nova** sem o produto e a guarda de volta em `produtos`. Por isso o array é `let`, e não `const`.
- `204 No Content` = "**feito, e não tenho nada para mostrar**". A resposta vem **sem corpo**.

Crie o `produto-editado.json` (de novo: antes de ligar o servidor, ou aceite que ele reinicie):

```json
{ "nome": "Monitor 24 polegadas", "preco": 1500 }
```

Com o servidor ligado e o Monitor já criado (id 4):

```bash
curl -i -X PUT http://localhost:3000/produtos/4 -H "Content-Type: application/json" -d "@produto-editado.json"
```

```
HTTP/1.1 200 OK
...
{"id":4,"nome":"Monitor 24 polegadas","preco":1500}
```

```bash
curl -i -X DELETE http://localhost:3000/produtos/3
```

```
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Wed, 25 Nov 2026 21:52:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5

```

Apagar **de novo** o mesmo produto dá `404` com `{"erros":["Produto não encontrado"]}`: ele já não existe. E a lista agora mostra:

```bash
curl http://localhost:3000/produtos
```

```
[{"id":1,"nome":"Mouse","preco":120},{"id":2,"nome":"Teclado","preco":350},{"id":4,"nome":"Monitor 24 polegadas","preco":1500}]
```

### E se eu pedir um método que não está no cardápio?

```bash
curl -X POST http://localhost:3000/vendedores -H "Content-Type: application/json" -d "@produto.json"
```

```
<pre>Cannot POST /vendedores</pre>
```

É o mesmo `404` do `Cannot GET` da Aula 3: o caminho existe, mas **não para esse método**. Para o Express, uma rota é **método + caminho**.

### O arquivo de rotas completo

<!-- node:skip -->
```js
import express from 'express';
import { listar, buscarPorId, criar, atualizar, remover } from '../controllers/produtosController.js';

// A seção "Produtos" do cardápio. O caminho "/" aqui quer dizer "/produtos".
export const rotasProdutos = express.Router();

rotasProdutos.get('/', listar);
rotasProdutos.get('/:id', buscarPorId);
rotasProdutos.post('/', criar);
rotasProdutos.put('/:id', atualizar);
rotasProdutos.delete('/:id', remover);
```

Leia de cima para baixo: é o **cardápio da seção de produtos inteiro**, em 5 linhas. Quem chega no projeto entende a API sem abrir o controller.

### Um teste antes de seguir: reinicie o servidor

Com o servidor ligado pelo `npm run dev`, crie o Monitor (`POST`), confira que ele aparece na lista e **reinicie** o servidor (`Ctrl + C` e `npm run dev` de novo). Liste outra vez:

```
[{"id":1,"nome":"Mouse","preco":120},{"id":2,"nome":"Teclado","preco":350},{"id":3,"nome":"Livro de JavaScript","preco":80}]
```

**O Monitor sumiu.** Os dados moram na memória do programa: desligou, apagou. Guarde esse problema: o bloco 4 resolve.

> **🎨 Em uma frase:** o caminho diz **qual** produto, o método diz **o que fazer** com ele, o corpo leva **os dados**, e o status conta **como foi**.

**💬 E daí?** Com essas 5 rotas, o painel do vendedor funciona sem ninguém mexer no banco à mão. E o status certo importa: o app mostra "Produto cadastrado!" quando recebe `201` e "Esse produto não existe mais" quando recebe `404`. Um `200` para tudo deixaria o app **sem saber** o que aconteceu.

**✅ Checkpoint:** um colega quer usar `GET /apagarProduto/3` para apagar. Discorde **com um argumento**.

<details>
<summary>💡 Ver resposta</summary>

O verbo já existe: é o **método** `DELETE`. O certo é `DELETE /produtos/3`. Argumentos possíveis: (1) quem conhece REST adivinha `DELETE /produtos/3` sem ler documentação; (2) um `GET` **não deve mudar nada**: navegadores e ferramentas repetem `GET` sozinhos (ao recarregar uma página, por exemplo), e um `GET` que apaga pode apagar produtos sem ninguém querer.

</details>

---

## ✂️ Ponto de corte

Se a aula de hoje terminar aqui, os **blocos 3 e 4** continuam na **segunda-feira** (cerca de 48 minutos, com a retomada e os passos 9 a 11 do exercício VagaÁgil). O exercício de hoje (passos 1 a 8) precisa **só** do que vimos até aqui.

---

## 3. Middleware de log e variáveis de ambiente

> 🎤 **Este bloco começa com a mini-aula do Grupo 3.**

**Objetivo:** criar uma **parada** que anota todo pedido que chega, e tirar do código a configuração que muda de um computador para outro.

### 3.1 O middleware: a recepcionista

**Por que usar?** Num restaurante movimentado, a **recepcionista** anota cada pedido **antes** de passar para a cozinha. Se algo der errado, o caderno dela conta o que chegou e quando. E ela tem uma regra: depois de anotar, **sempre diz "pode passar"**. Se esquecer, o cliente fica parado na porta.

Um **middleware** é uma função com **três** ingredientes: o pedido (`req`), a resposta (`res`) e o "pode passar" (`next`).

<!-- node:skip -->
```js
// middlewares/registrarPedido.js
// A "recepcionista": anota cada pedido antes de passar para a cozinha.
export function registrarPedido(req, res, next) {
  console.log('📝', req.method, req.url);
  next(); // "pode passar": sem esta linha, o pedido fica parado na recepção
}
```

No `index.js`, **antes** das rotas:

<!-- node:skip -->
```js
import { registrarPedido } from './middlewares/registrarPedido.js';

// ...

app.use(express.json()); // lê o JSON do corpo do pedido e guarda em req.body
app.use(registrarPedido); // a recepcionista anota cada pedido
```

O `app.use(algo)` **sem caminho** quer dizer: "**todo** pedido passa por aqui". E repare: o `express.json()` que usamos no bloco 2 **também é um middleware**. Ele abre o pacote JSON e chama o `next()` sozinho.

Faça alguns pedidos e olhe o **terminal do servidor**:

```
Servidor do MercadoÁgil rodando em http://localhost:3000
📝 GET /produtos
📝 POST /produtos
📝 GET /produtos/1
📝 PUT /produtos/1
📝 DELETE /produtos/2
```

#### E se a recepcionista esquecer o `next()`?

Comente a linha do `next();`, salve e teste. O pedido **nunca responde**. Para não esperar para sempre, use `--max-time 3` (desiste depois de 3 segundos):

```bash
curl -i --max-time 3 http://localhost:3000/produtos
```

```
curl: (28) Operation timed out after 3002 milliseconds with 0 bytes received
```

O terminal do servidor mostra `📝 GET /produtos`: o pedido **chegou** e foi anotado, mas **ninguém mandou seguir**. Não aparece erro nenhum no servidor, o que torna esse problema difícil de achar. O número de milissegundos muda um pouco a cada teste.

### 3.2 O `.env`: o cofre das configurações

**Por que usar?** Hoje a porta `3000` está escrita no código. No projeto final, a **senha do banco** também estaria. Problemas:

- o código vai para o **GitHub**, e uma senha no GitHub é uma senha **pública** (existem robôs que vasculham o GitHub atrás de senhas o dia todo);
- no seu computador a porta é `3000`, mas no servidor de hospedagem (o Render, no projeto final) **ela é outra**, e quem escolhe é o Render.

A solução: as configurações moram num arquivo **`.env`**, o **cofre**, que **fica só no seu computador**. O código só sabe o **nome** de cada configuração.

**1. Instale o leitor do cofre:**

```bash
npm install dotenv
```

**2. Crie o `.env` na raiz do projeto:**

```
PORT=3000
DB_ARQUIVO=mercadoagil.sqlite
```

Uma linha por configuração: `NOME=valor`, sem espaços e sem aspas.

**3. Crie também o `.env.example`**, o **modelo** do cofre, sem segredos. Esse **vai** para o GitHub, para quem clonar o projeto saber quais configurações preencher:

```
# Copie este arquivo para ".env" e preencha os valores.
# O .env NUNCA vai para o GitHub (ele está no .gitignore). Este .env.example vai.

# Porta onde o servidor atende. Serviços de hospedagem (como o Render) definem a PORT sozinhos.
PORT=3000

# Arquivo do banco SQLite (é criado sozinho na primeira vez)
DB_ARQUIVO=mercadoagil.sqlite

# No projeto final (PostgreSQL), a conexão vem numa variável só, com usuário e SENHA:
# DATABASE_URL=postgres://usuario:senha@servidor:5432/banco
```

**4. Abra o cofre na PRIMEIRA linha do `index.js`** e use `process.env.NOME`:

<!-- node:skip -->
```js
import 'dotenv/config'; // 1º de tudo: abre o cofre (.env) e coloca os valores em process.env
import express from 'express';
// ... os outros imports

const app = express();
const porta = process.env.PORT || 3000;
```

O `||` quer dizer "**ou**": use o `PORT` do `.env`; se ele não existir, use `3000`. E no `app.listen`, troque o `3000` por `porta`:

<!-- node:skip -->
```js
app.listen(porta, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('Servidor do MercadoÁgil rodando em http://localhost:' + porta);
  }
});
```

#### Primeiro, o problema: sem abrir o cofre

Crie um arquivo `teste-env.js`, na raiz do projeto:

<!-- node:skip -->
```js
console.log('PORT:', process.env.PORT);
console.log('DB_ARQUIVO:', process.env.DB_ARQUIVO);
```

```bash
node teste-env.js
```

```
PORT: undefined
DB_ARQUIVO: undefined
```

O `.env` existe, mas **ninguém abriu o cofre**. Agora acrescente `import 'dotenv/config';` como **primeira linha** do `teste-env.js` e rode de novo:

```
PORT: 3000
DB_ARQUIVO: mercadoagil.sqlite
```

Pode apagar o `teste-env.js` depois.

> **⚠️ Duas pegadinhas:**
> - **O Nodemon não vigia o `.env`.** Mudou a porta no `.env`? Salve um `.js` qualquer ou digite `rs` + `Enter` no terminal do servidor para reiniciar.
> - **O `.env` não pode ir para o GitHub.** Confira com `git status`: se o `.env` aparecer na lista, falta a linha `.env` no `.gitignore`. Neste repositório, ela já está lá.

> **Por que o `dotenv`, e não o `node --env-file=.env`?** O Node 22 também sabe ler o `.env` sozinho, com a opção `--env-file`. Escolhemos o `dotenv` por dois motivos. Primeiro: o **projeto final** usa o `dotenv` (as ferramentas do Sequelize precisam dele). Segundo: num servidor de hospedagem **não existe arquivo `.env`** (as configurações ficam no painel do serviço), e o `node --env-file=.env` **para o servidor** com `node: .env: not found` quando o arquivo não existe. O `dotenv` simplesmente segue em frente.

> **🎨 Em uma frase:** todo pedido passa pela recepcionista antes da cozinha; as senhas ficam no cofre, nunca escritas no código.

**💬 E daí?** Num app de verdade, quando um cliente diz "deu erro na minha compra às 14h", o **log** é a primeira coisa que o time olha. E senha vazada no GitHub é um dos incidentes de segurança mais comuns do mercado: em minutos, alguém de fora pode apagar ou copiar o banco inteiro (com os CPFs que a LGPD manda proteger).

**✅ Checkpoint:** uma colega subiu o `.env` para o GitHub por engano e apagou no commit seguinte. Está resolvido?

<details>
<summary>💡 Ver resposta</summary>

**Não.** O Git guarda o **histórico**: o commit antigo, com o `.env`, continua lá, e qualquer pessoa consegue ver. O certo é **trocar as senhas** que vazaram (gerar senhas novas no banco) e conferir que o `.env` está no `.gitignore`. Vale a regra: senha que foi para o GitHub é senha **queimada**.

</details>

---

## 4. Sequelize: os produtos vão para o banco

> 🎤 **Este bloco começa com a mini-aula do Grupo 4.**

**Objetivo:** guardar os produtos num **banco de verdade** e provar que eles **continuam lá** depois que o servidor reinicia, **sem mexer no arquivo de rotas**.

**Por que usar?** No bloco 2 o Monitor sumiu quando o servidor reiniciou. Os dados moravam na **memória**, que é como uma **lousa**: desligou, apagou. O banco é o **caderno**: fica guardado num arquivo.

Mas o banco fala **SQL**, e o nosso servidor fala **JavaScript**. Para não escrever SQL à mão em cada rota, usamos um **ORM**: um **tradutor** entre os dois. Você escreve `Produto.findAll()`, e o tradutor escreve o `SELECT` que você aprendeu na Aula 2.

| Em JavaScript (Sequelize) | O SQL que ele escreve por você |
|---|---|
| `sequelize.sync()` | `CREATE TABLE IF NOT EXISTS produto (...)` |
| `Produto.findAll()` | `SELECT ... FROM produto` |
| `Produto.findByPk(1)` | `SELECT ... FROM produto WHERE id = 1` |
| `Produto.create({ nome, preco })` | `INSERT INTO produto ...` |
| `produto.update({ nome, preco })` | `UPDATE produto SET ...` |
| `produto.destroy()` | `DELETE FROM produto WHERE id = ...` |

O banco de hoje é o **SQLite**: o banco inteiro é **um arquivo** (`mercadoagil.sqlite`) na pasta do projeto. Não precisa instalar nem ligar um servidor de banco.

### 4.1 Instalar e conectar

```bash
npm install sequelize sqlite3
```

O `sequelize` é o tradutor. O `sqlite3` é o "motorista" que sabe abrir o arquivo do SQLite.

<!-- node:skip -->
```js
// config/db.js
import { Sequelize } from 'sequelize';

// A conexão com o banco. No SQLite, o banco é UM ARQUIVO no seu computador.
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_ARQUIVO || 'mercadoagil.sqlite',
  logging: false, // troque para console.log para ver o SQL que o Sequelize escreve
});
```

O nome do arquivo vem do **cofre** (`DB_ARQUIVO`, do bloco 3).

### 4.2 O model: a ficha-modelo da tabela

Lembra da tabela `produto` do DER do MercadoÁgil (Aula 2)? O **model** é essa tabela escrita em JavaScript:

<!-- node:skip -->
```js
// models/Produto.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// O model Produto espelha a tabela "produto" do DER do MercadoÁgil (Aulas 1 e 2).
// O "id" é criado sozinho: INTEGER, chave primária, que aumenta a cada novo produto.
export const Produto = sequelize.define(
  'Produto',
  {
    nome: { type: DataTypes.STRING, allowNull: false },
    preco: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'produto', timestamps: false },
);
```

| No model | No SQL da Aula 2 |
|---|---|
| `nome: { type: DataTypes.STRING, allowNull: false }` | `nome TEXT NOT NULL` |
| `preco: { type: DataTypes.INTEGER, allowNull: false }` | `preco INTEGER NOT NULL` |
| o `id` que o Sequelize cria sozinho | `id INTEGER PRIMARY KEY` |
| `tableName: 'produto'` | o nome da tabela |
| `timestamps: false` | "não crie as colunas de data de criação e alteração" |

Na Aula 2, a tabela `produto` também tinha `vendedor_id` e `categoria_id` (as chaves estrangeiras). Elas entram quando aprendermos a **ligar models** (os relacionamentos do Sequelize). Hoje o model tem só o que a nossa API usa.

### 4.3 Criar a tabela: o `sync`

No `index.js`, **antes** do `app.listen`:

<!-- node:skip -->
```js
import { sequelize } from './config/db.js';

// ... os middlewares e as rotas

// Cria as tabelas que ainda não existem no banco (a partir dos models)
await sequelize.sync();
```

Quer ver o tradutor trabalhando? Troque `logging: false` por `logging: console.log` no `config/db.js`, apague o arquivo `mercadoagil.sqlite` e reinicie. O terminal mostra o SQL de verdade:

```
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='produto';
Executing (default): CREATE TABLE IF NOT EXISTS `produto` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `nome` VARCHAR(255) NOT NULL, `preco` INTEGER NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`produto`)
```

O `CREATE TABLE` é quase o mesmo que você escreveu na Aula 2. Volte para `logging: false` depois: com ele ligado, cada pedido enche o terminal de SQL.

> **⚠️ No projeto final é diferente.** O `sync()` é ótimo para aprender, mas ele só **cria** tabelas que não existem: **nunca altera** uma tabela que já existe. Por isso, no projeto final, as tabelas são criadas por **migrations** (o histórico de mudanças do banco), e o `sync()` **não é permitido**. Vamos ver migrations nas próximas aulas.

### 4.4 `async` e `await`: o cozinheiro espera o forno

Buscar no banco **leva um tempinho** (é ler um arquivo, ou, no projeto final, ir até outro computador pela rede). O JavaScript não fica parado esperando: ele segue para a próxima linha. Para dizer "**espere o banco responder antes de seguir**", usamos duas palavras:

- **`await`** na frente do pedido ao banco: "espera o forno apitar";
- **`async`** na frente da função que tem um `await` dentro: "esta receita tem espera".

Lá no `index.js`, o `await sequelize.sync()` pode ficar solto no arquivo (fora de função) porque o projeto é `"type": "module"`.

### 4.5 O "E daí?" da aula: trocar o cozinheiro sem mexer no cardápio

Agora reescrevemos **só o controller**. Mesmos nomes de função, mesmos status, mesmas respostas, mas buscando no **banco**:

<!-- node:skip -->
```js
// controllers/produtosController.js
import { Produto } from '../models/Produto.js';

// O cozinheiro da praça de produtos, agora buscando no BANCO.
// O "await" espera o banco responder antes de seguir para a próxima linha.

// GET /produtos
export async function listar(req, res) {
  const produtos = await Produto.findAll();
  res.json(produtos);
}

// GET /produtos/:id
export async function buscarPorId(req, res) {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }
  res.json(produto);
}

// POST /produtos
export async function criar(req, res) {
  const { nome, preco } = req.body;
  const novo = await Produto.create({ nome, preco });
  res.status(201).json(novo);
}

// PUT /produtos/:id
export async function atualizar(req, res) {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }

  const { nome, preco } = req.body;
  await produto.update({ nome, preco });
  res.json(produto);
}

// DELETE /produtos/:id
export async function remover(req, res) {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }

  await produto.destroy();
  res.status(204).send();
}
```

Repare no que **sumiu**: o array `produtos`, o `proximoId` e o `Number(...)`. O banco cuida do id e entende o `'2'` do caminho.

E o arquivo `routes/produtos.js`? **Não mudou nenhuma letra.** O cardápio continua o mesmo; só trocamos o cozinheiro.

### 4.6 A prova: reinicie o servidor

Com o banco **vazio** (apague o `mercadoagil.sqlite` se ele já existir) e o servidor ligado:

```bash
curl http://localhost:3000/produtos
```

```
[]
```

O banco começa vazio: os 3 produtos do array eram da memória. Crie o Monitor:

```bash
curl -i -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d "@produto.json"
```

```
HTTP/1.1 201 Created
...
{"id":1,"nome":"Monitor","preco":1600}
```

Agora **reinicie** o servidor (`Ctrl + C` e `npm run dev`) e liste de novo:

```
[{"id":1,"nome":"Monitor","preco":1600}]
```

**O Monitor continua lá.** 🎉 Ele mora no arquivo `mercadoagil.sqlite`, que apareceu na pasta do projeto. (Esse arquivo também **não vai** para o GitHub: o `.gitignore` já ignora `*.sqlite`.)

| | Memória (bloco 2) | Banco (bloco 4) |
|---|---|---|
| Onde mora o dado | Num array, dentro do programa | No arquivo `mercadoagil.sqlite` |
| Reiniciou o servidor | **Sumiu** | **Continua lá** |
| Quem cria o id | O `proximoId` | O banco |
| Arquivo de rotas | `routes/produtos.js` | **O mesmo**, sem nenhuma mudança |

### E no projeto final, com PostgreSQL?

Muda **só a conexão** no `config/db.js` (e instala-se o `pg` no lugar do `sqlite3`). Os models, os controllers e as rotas continuam iguais:

<!-- node:skip -->
```js
export const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres', logging: false });
```

O `DATABASE_URL` mora no `.env`, porque ele tem a **senha** do banco. O passo a passo completo está na seção "Banco de Dados: como configurar" da rubrica do projeto final.

### Do DER às rotas (e ao model), em 3 perguntas

As mesmas 3 perguntas da revisão da Aula 3, agora com o que aprendemos hoje:

1. **A caixa do DER tem dados próprios e alguém quer ver a lista dela?** Então vira um **recurso**: um arquivo de rotas (`routes/produtos.js`), um controller e um **model** (`Produto`).
2. **Quais colunas viram campos do model?** As da tabela normalizada, com os mesmos tipos e o mesmo `NOT NULL` (`allowNull: false`).
3. **Quem usa cada rota, e para quê?** O `GET /produtos` é público (a vitrine). O `POST`, o `PUT` e o `DELETE` são do **vendedor**. No projeto final, quem garante isso é o login.

> **🎨 Em uma frase:** na memória, reiniciou, sumiu; no banco, reiniciou, continua lá. E para trocar um pelo outro, mudamos o cozinheiro, não o cardápio.

**💬 E daí?** Esse é o motivo de separar responsabilidades. Hoje trocamos memória por SQLite; no projeto final vocês vão trocar SQLite por PostgreSQL; numa empresa, um dia alguém troca o banco inteiro. Em todos os casos, **as rotas (o contrato com o app) não mudam**, e o time do app nem fica sabendo. Num marketplace, um pedido que some no reinício é dinheiro perdido e cliente bravo.

**✅ Checkpoint:** reiniciei o servidor e a lista de produtos voltou a mostrar Mouse, Teclado e Livro de JavaScript, sem o Monitor. O que provavelmente aconteceu?

<details>
<summary>💡 Ver resposta</summary>

O servidor ainda está usando o **controller antigo**, da memória: os 3 produtos fixos do array são a pista. Confira se o `controllers/produtosController.js` tem o `import { Produto } ...` e as funções com `await`, e se você salvou o arquivo.

</details>

---

## 🧠 Resumo e mapa da API

| Quero... | Uso |
|---|---|
| Separar as rotas por recurso | `export const rotasProdutos = express.Router();` em `routes/produtos.js` |
| Ligar a seção ao caminho | `app.use('/produtos', rotasProdutos);` |
| Tirar a lógica da rota | Funções com `export` no controller: `rotasProdutos.get('/', listar);` |
| Ler o id do caminho | `req.params.id` (texto! use `Number(...)` para comparar com número) |
| Ler os dados enviados | `app.use(express.json());` + `req.body` |
| Escolher o status | `res.status(201).json(...)`, `res.status(404).json(...)`, `res.status(204).send()` |
| Fazer algo em todo pedido | Um middleware `(req, res, next)` com `app.use(...)`, e **sempre** `next()` |
| Tirar configuração e senha do código | `.env` + `import 'dotenv/config';` + `process.env.NOME` |
| Guardar no banco | Sequelize: model + `sync()` + `findAll`, `findByPk`, `create`, `update`, `destroy` |
| Esperar o banco | `await` dentro de uma função `async` |
| Mandar um corpo pelo curl | `-H "Content-Type: application/json" -d "@arquivo.json"` |

| Status | Quer dizer | Quando usamos hoje |
|---|---|---|
| `200 OK` | Deu certo, aqui está | `GET` e `PUT` |
| `201 Created` | Criei, aqui está o que foi criado | `POST` |
| `204 No Content` | Feito, não tenho nada para mostrar | `DELETE` |
| `400 Bad Request` | O pedido veio com problema (o Express manda quando o JSON está quebrado) | Exercício de casa 2 |
| `404 Not Found` | Não achei (a rota ou o produto) | Id que não existe |
| `500 Internal Server Error` | A **cozinha** errou (o problema está no servidor) | Faltou o `express.json()`, faltou o `sync()` |

### O mapa da API do MercadoÁgil

| Método | Caminho | O que faz | Quem usa | Quando |
|---|---|---|---|---|
| `GET` | `/` | Boas-vindas | Qualquer pessoa | ✅ Aula 3 |
| `GET` | `/produtos` | Lista os produtos | O app (vitrine) | ✅ Aula 3 |
| `GET` | `/produtos/:id` | Mostra um produto | O app (página do produto) | ✅ Hoje |
| `POST` | `/produtos` | Cadastra um produto | O painel do vendedor | ✅ Hoje |
| `PUT` | `/produtos/:id` | Altera um produto | O painel do vendedor | ✅ Hoje |
| `DELETE` | `/produtos/:id` | Tira um produto do ar | O painel do vendedor | ✅ Hoje |
| `GET` | `/vendedores` e `/vendedores/:id` | Lista e mostra vendedores | O app (página da loja) | ✅ Hoje |
| vários | `/pedidos`, `/cupons`, `/auth`... | O resto do marketplace | ⏳ | Próximas aulas e projeto final |

---

## 👥 Exercício da aula: o VagaÁgil

**Tempo:** até 45 minutos (estimativa: 40 min). **Em dupla:** a **pilota** digita e a **navegadora** lê o enunciado, confere o resultado esperado e **propõe outra forma** quando discordar. **Troquem de papel a cada passo.**

### 🎯 O cenário

> O **VagaÁgil** é um mural de vagas de **estágio e júnior em TI** para quem está começando. O **RH das empresas** publica, altera e tira vagas do ar. As **pessoas candidatas** consultam as vagas abertas no app. Cada vaga tem **cargo**, **empresa** e **salário**.

Vocês vão criar a API do mural, já organizada em **rotas e controller**, com o CRUD completo **em memória**. A troca para o banco fica para os passos 9 a 11 (✂️ segunda-feira).

### 🧭 Como a dupla trabalha (High Agency na prática)

- **Bias to Action:** **um passo, roda, confere.** Escreva uma rota, salve, teste com o `curl`. Não escreva as 5 rotas para só depois testar.
- **Clear Thinking:** antes de cada rota, digam em voz alta: **"quem vai usar esse pedido: o RH ou a pessoa candidata? E o que ela precisa receber?"**
- **Discordância Positiva:** em pelo menos **2 passos**, a navegadora propõe **outra forma** (outro nome, outro status, outra mensagem de erro). A dupla testa ou discute as duas e decide **por argumento**, não por quem fala mais alto.

### 🪜 Os passos

Confiram o **resultado esperado** antes de seguir. Usem o `curl -i` quando o passo pedir o status.

**Passo 1 (5 min): O projeto e os arquivos de corpo.** Numa pasta **fora** da `livecoding`, um comando de cada vez:

```bash
mkdir vagaagil-api
cd vagaagil-api
npm init -y
npm install express
npm install -D nodemon
```

No `package.json`, acrescentem `"type": "module"` e troquem o bloco `"scripts"` por `"dev": "nodemon index.js"` e `"start": "node index.js"`. Criem as pastas `routes` e `controllers`. Criem também, **agora**, os dois arquivos de corpo que vão usar nos passos 5 e 6 (o Nodemon reinicia quando um `.json` é criado):

`vaga.json`:

```json
{ "cargo": "Estágio em Dados", "empresa": "Mercado Bom Preço", "salario": 2000 }
```

`vaga-editada.json`:

```json
{ "cargo": "Dev Júnior Node.js", "empresa": "LogiSul Transportes", "salario": 4500 }
```

> Resultado esperado: o `package.json` tem `"type": "module"`, os dois scripts, o Express em `dependencies` (`"^5.3.0"`) e o Nodemon em `devDependencies` (`"^3.1.14"`). A pasta tem `routes/`, `controllers/`, `vaga.json` e `vaga-editada.json`.

**Passo 2 (5 min): O cozinheiro.** Criem `controllers/vagasController.js` com estes dados e a função `listar`, **exportada**, que responde com a lista em JSON:

<!-- node:skip -->
```js
// As vagas ficam na memória (por enquanto)
let vagas = [
  { id: 1, cargo: 'Estágio em Front-end', empresa: 'Banco Horizonte', salario: 1800 },
  { id: 2, cargo: 'Dev Júnior Node.js', empresa: 'LogiSul Transportes', salario: 4200 },
  { id: 3, cargo: 'Suporte Técnico Júnior', empresa: 'Clínica Vida+', salario: 2600 },
];
let proximoId = 4;
```

> Resultado esperado: o arquivo existe, com o array, o `proximoId` e a função `export function listar(req, res) { ... }`. Ainda não dá para testar: falta o cardápio.

**Passo 3 (5 min): O cardápio e o salão.** Criem `routes/vagas.js` com um `express.Router()` exportado como `rotasVagas` e a rota `GET /` chamando o `listar`. Criem o `index.js`, que liga a seção em `/vagas` e o servidor na porta `3000`, com a mensagem `Mural do VagaÁgil no ar em http://localhost:3000` (e `Não consegui abrir o mural:` + a mensagem, se der erro). Liguem com `npm run dev` e testem `curl -i http://localhost:3000/vagas`.
> Resultado esperado (o começo e a última linha):
> ```
> HTTP/1.1 200 OK
> X-Powered-By: Express
> Content-Type: application/json; charset=utf-8
> ...
> [{"id":1,"cargo":"Estágio em Front-end","empresa":"Banco Horizonte","salario":1800},{"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4200},{"id":3,"cargo":"Suporte Técnico Júnior","empresa":"Clínica Vida+","salario":2600}]
> ```

**Passo 4 (5 min): Uma vaga só.** Criem `buscarPorId` no controller (com o `404` e a mensagem `Vaga não encontrada` no formato `{ erros: [...] }`) e a rota `GET /:id`. Testem `/vagas/2` e `/vagas/99`.
> Resultado esperado (primeira e última linha de cada `curl -i`):
> ```
> HTTP/1.1 200 OK
> {"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4200}
> HTTP/1.1 404 Not Found
> {"erros":["Vaga não encontrada"]}
> ```

**Passo 5 (6 min): O RH publica uma vaga.** Acrescentem o `app.use(express.json());` no `index.js` (antes das rotas), a função `criar` (que responde `201` com a vaga nova) e a rota `POST /`. Enviem o `vaga.json`:

```bash
curl -i -X POST http://localhost:3000/vagas -H "Content-Type: application/json" -d "@vaga.json"
```

> Resultado esperado:
> ```
> HTTP/1.1 201 Created
> ...
> {"id":4,"cargo":"Estágio em Dados","empresa":"Mercado Bom Preço","salario":2000}
> ```
> **Discordância Positiva:** a navegadora pergunta: "e se, no lugar do `proximoId`, a gente usasse `vagas.length + 1`?". A dupla pensa no que aconteceria **depois de apagar uma vaga** e decide com um argumento (anotem num comentário).

**Passo 6 (5 min): O salário subiu.** Criem `atualizar` (com o `404`) e a rota `PUT /:id`. Testem com o `vaga-editada.json` na vaga `2` e depois na vaga `99`.
> Resultado esperado:
> ```
> HTTP/1.1 200 OK
> {"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4500}
> HTTP/1.1 404 Not Found
> {"erros":["Vaga não encontrada"]}
> ```

**Passo 7 (5 min): A vaga foi preenchida.** Criem `remover` (com o `404`) e a rota `DELETE /:id`. Apaguem a vaga `3` e depois tentem apagar a vaga `3` **de novo**.
> Resultado esperado (primeira e última linha de cada `curl -i`):
> ```
> HTTP/1.1 204 No Content
> HTTP/1.1 404 Not Found
> {"erros":["Vaga não encontrada"]}
> ```
> No `204`, a resposta não tem corpo: **está certo**.

**Passo 8 (4 min): A conferência e o reinício.** Listem as vagas (sem o `-i`). Depois **salvem o `index.js`** sem mudar nada (o Nodemon reinicia) e listem de novo.
> Resultado esperado (antes e depois do reinício):
> ```
> [{"id":1,"cargo":"Estágio em Front-end","empresa":"Banco Horizonte","salario":1800},{"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4500},{"id":4,"cargo":"Estágio em Dados","empresa":"Mercado Bom Preço","salario":2000}]
> [{"id":1,"cargo":"Estágio em Front-end","empresa":"Banco Horizonte","salario":1800},{"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4200},{"id":3,"cargo":"Suporte Técnico Júnior","empresa":"Clínica Vida+","salario":2600}]
> ```
> Tudo o que o RH fez **sumiu** no reinício. É esse o problema que os passos 9 a 11 resolvem.

**🚀 Desafio extra (quebrar de propósito):** comentem a linha `app.use(express.json());`, salvem e enviem o `vaga.json` de novo com o `POST`.
1. Qual é o **status**? De quem é a culpa: do cliente ou da cozinha?
2. No terminal do servidor, achem a **linha do arquivo** onde o erro aconteceu.
3. Consertem e anotem, num comentário, **uma** ideia: em vez de `500`, que resposta o RH deveria receber se mandar uma vaga sem salário?
> Resultado esperado: `HTTP/1.1 500 Internal Server Error`, e no terminal do servidor:
> ```
> TypeError: Cannot destructure property 'cargo' of 'req.body' as it is undefined.
>     at criar (file:///.../vagaagil-api/controllers/vagasController.js:27:11)
> ```
> O número da linha depende do seu arquivo.

**Pergunta para responder em dupla** (num comentário no **topo** do `routes/vagas.js`): o RH pediu um "botão de apagar" no app. Por que o pedido certo é `DELETE /vagas/3`, e não `GET /apagarVaga/3`? Escrevam **uma frase pensando no time do app** e **uma pensando na pessoa candidata**.

### ✂️ Passos 9 a 11: a troca para o banco (segunda-feira ou em casa)

Estes passos usam o bloco 4. A regra de ouro deles: **o arquivo `routes/vagas.js` não pode mudar nenhuma letra.**

**Passo 9 (5 min): O banco.** Instalem `npm install sequelize sqlite3`. Criem o `config/db.js` com a conexão SQLite (arquivo `vagaagil.sqlite`) e o `models/Vaga.js`: `cargo` (texto), `empresa` (texto) e `salario` (inteiro), os três obrigatórios, com `tableName: 'vaga'` e `timestamps: false`. No `index.js`, importem o `sequelize` e acrescentem o `await sequelize.sync();` antes do `app.listen`.
> Resultado esperado: o servidor liga com a mesma mensagem de sempre, e o arquivo `vagaagil.sqlite` aparece na pasta.

**Passo 10 (6 min): O cozinheiro novo.** Reescrevam o `vagasController.js` com o model `Vaga` (`findAll`, `findByPk`, `create`, `update`, `destroy`), com `async`/`await`, mantendo os mesmos status e mensagens. Testem `GET /vagas`.
> Resultado esperado: `[]`. O banco começa vazio: as 3 vagas do array eram da memória.

**Passo 11 (4 min): A prova.** Publiquem a vaga do `vaga.json` (`POST`), **reiniciem** o servidor e listem.
> Resultado esperado (o `POST` e a lista depois do reinício):
> ```
> HTTP/1.1 201 Created
> {"id":1,"cargo":"Estágio em Dados","empresa":"Mercado Bom Preço","salario":2000}
> [{"id":1,"cargo":"Estágio em Dados","empresa":"Mercado Bom Preço","salario":2000}]
> ```

### 🐞 Se algo não bater

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| `Cannot GET /vagas` | Faltou o `app.use('/vagas', rotasVagas)`, ou o caminho está escrito diferente | Confira o `index.js` |
| `ERR_MODULE_NOT_FOUND ... Did you mean to import ".../vagas.js"?` | Faltou o `.js` no `import` | Acrescente o `.js` (o Node até sugere) |
| `does not provide an export named 'listar'` | Faltou o `export` na função, ou o nome está diferente | Confira o `export function listar` |
| Todo id dá `404`, até o `1` | Faltou o `Number(req.params.id)` | O id do caminho chega como texto |
| `Cannot destructure property 'cargo' of 'req.body' as it is undefined` | Faltou o `express.json()` **ou** o `-H "Content-Type: application/json"` | Confira os dois |
| `Cannot POST /vagas/4` | O `POST` vai em `/vagas`, sem id | O id quem cria é o servidor |
| `curl: option -d: error encountered when reading a file` | O `curl` não achou o `vaga.json` | Rode o `curl` **na pasta** do projeto e confira o nome do arquivo |
| A vaga que criei sumiu sem eu reiniciar | Você criou ou salvou um `.json` e o Nodemon reiniciou | Crie os `.json` antes de ligar o servidor |

### ✅ Antes de entregar

- [ ] As 5 rotas dão **exatamente** os resultados esperados dos passos 3 a 8?
- [ ] O `index.js` tem **só** o servidor, o `express.json()` e o `app.use('/vagas', ...)`? A lógica está no controller?
- [ ] A pasta entregue está **sem** a `node_modules`?
- [ ] O comentário com a **pergunta em dupla** está no topo do `routes/vagas.js`?
- [ ] A dupla trocou de papel a cada passo e decidiu **por argumento** em pelo menos 2 passos?
- [ ] Cada pessoa consegue explicar, **com as próprias palavras**, a diferença entre `201`, `204` e `404`?
- [ ] Anotamos **onde travamos e o que tentamos** (vale para a retrospectiva).

---

## 📝 Lista de exercícios para casa

Os 4 exercícios usam o **IngressoÁgil**, a plataforma de ingressos para eventos culturais da Aula 3. Cada exercício **continua o anterior**: copie a pasta do exercício anterior (**sem** a `node_modules`), renomeie e rode `npm install`.

**Um passo de cada vez:** escreva, salve, teste com o `curl`, confira. As dicas estão escondidas: clique em **"💡 Ver dicas"** só depois de tentar.

| Exercício | Tema | Dificuldade |
|---|---|---|
| 1. A bilheteria organizada | `express.Router`, controller, `req.params` e `404` | 🟢 Fácil |
| 2. O cadastro de eventos | `POST`, `PUT`, `DELETE`, `req.body` e o status `400` | 🟡 Médio |
| 3. A recepcionista e o cofre | Middleware de log, `.env` e 3 erros de propósito | 🟢 Fácil |
| 4. Os eventos que não somem | Tudo junto: Sequelize, SQLite, `.env` e a troca do controller | 🔴 Difícil |

---

### Exercício 1: A bilheteria organizada 🟢 Fácil

A API da bilheteria vai crescer, e a produtora quer começar já organizada: cada recurso no seu arquivo.

```js
const eventos = [
  { id: 1, nome: 'Slam das Minas', data: '2026-12-05', preco: 20 },
  { id: 2, nome: 'Batalha da Estação', data: '2026-12-12', preco: 15 },
  { id: 3, nome: 'Roda de Samba de Fim de Ano', data: '2026-12-20', preco: 30 },
];
```

**O que fazer:**

1. Crie o projeto `casa1` com Express, Nodemon, `"type": "module"` e os scripts `dev` e `start`.
2. Crie `controllers/eventosController.js` com o array acima e duas funções exportadas: `listar` e `buscarPorId` (que responde `404` com `{ erros: ['Evento não encontrado'] }` quando o evento não existe).
3. Crie `routes/eventos.js` com um `express.Router()` exportado como `rotasEventos`, com as rotas `GET /` e `GET /:id`.
4. Crie o `index.js`, que liga a seção em `/eventos` e o servidor na porta `3000`, com a mensagem `Bilheteria do IngressoÁgil aberta em http://localhost:3000`.
5. Ligue com `npm run dev` e teste `/eventos`, `/eventos/3` e `/eventos/10`.
6. Escreva um comentário no topo do `routes/eventos.js`: **por que vale a pena** criar um arquivo de rotas só para eventos, se hoje ele tem só 2 rotas? Pense em quem vai mexer nesse código daqui a 3 meses.

**Resultado esperado** (o terminal do servidor e os 3 testes; nos dois últimos, primeira e última linha do `curl -i`):

```
Bilheteria do IngressoÁgil aberta em http://localhost:3000
```

```
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30}]
HTTP/1.1 200 OK
{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30}
HTTP/1.1 404 Not Found
{"erros":["Evento não encontrado"]}
```

<details>
<summary>💡 Ver dicas</summary>

- Reveja a seção 1 deste material: o controller exporta funções, o arquivo de rotas importa essas funções, o `index.js` importa o router.
- No arquivo de rotas: `export const rotasEventos = express.Router();` e `rotasEventos.get('/', listar);` (o `listar` **sem parênteses**).
- No `index.js`: `app.use('/eventos', rotasEventos);`
- O id do caminho é texto: `const id = Number(req.params.id);`
- Todo `import` de arquivo seu precisa do `.js` no final: `'../controllers/eventosController.js'`.
- Se o `/eventos/3` deu `404`, confira o `Number(...)`.

</details>

---

### Exercício 2: O cadastro de eventos 🟡 Médio

A produtora quer cadastrar, alterar e cancelar eventos pelo painel. E reclamou: alguém cadastrou um evento **sem preço**, e o app mostrou "R$ undefined".

**O que fazer:**

1. Copie o `casa1` para `casa2` (sem a `node_modules`) e rode `npm install`. **Antes de ligar o servidor**, crie estes 3 arquivos na pasta:

`evento.json`:

```json
{ "nome": "Sarau da Quebrada", "data": "2027-01-10", "preco": 10 }
```

`evento-editado.json`:

```json
{ "nome": "Sarau da Quebrada", "data": "2027-01-17", "preco": 12 }
```

`evento-incompleto.json`:

```json
{ "nome": "Festival Hip-Hop na Praça" }
```

2. No `index.js`, acrescente o leitor de JSON.
3. No controller, crie `criar` (com `proximoId` começando em `4`) e a rota `POST /`. Envie o `evento.json`.
4. No `criar`, **antes** de criar o evento: se o `nome` **ou** o `preco` não vierem, responda `400` com `{ erros: ['Informe o nome e o preço do evento'] }`. Envie o `evento-incompleto.json`.
5. Crie `atualizar` (com `404`) e a rota `PUT /:id`. O Sarau foi **adiado**: envie o `evento-editado.json` para o evento `4`, e depois para o evento `10`.
6. Crie `remover` (com `404`) e a rota `DELETE /:id`. A Batalha da Estação foi **cancelada**: apague o evento `2` e liste os eventos.
7. **Conferência:** tente apagar o evento `2` de novo.

**Resultado esperado** (primeira e última linha de cada `curl -i`, menos a lista do passo 6, que é sem `-i`):

```
HTTP/1.1 201 Created
{"id":4,"nome":"Sarau da Quebrada","data":"2027-01-10","preco":10}
HTTP/1.1 400 Bad Request
{"erros":["Informe o nome e o preço do evento"]}
HTTP/1.1 200 OK
{"id":4,"nome":"Sarau da Quebrada","data":"2027-01-17","preco":12}
HTTP/1.1 404 Not Found
{"erros":["Evento não encontrado"]}
HTTP/1.1 204 No Content
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30},{"id":4,"nome":"Sarau da Quebrada","data":"2027-01-17","preco":12}]
HTTP/1.1 404 Not Found
{"erros":["Evento não encontrado"]}
```

<details>
<summary>💡 Ver dicas</summary>

- **Não tente fazer tudo de uma vez.** Uma rota, salva, testa.
- Reveja a seção 2: o `express.json()` vai **antes** do `app.use('/eventos', ...)`.
- Para o `DELETE` funcionar com `filter`, o array precisa ser `let`, não `const`.
- O `400`: `if (nome === undefined || preco === undefined) { return res.status(400).json({ ... }); }`. O `||` quer dizer "ou". O `return` faz a função parar ali.
- Por que `preco === undefined` e não `!preco`? Pense num evento **gratuito**, com `preco: 0`. Teste as duas formas!
- Se o evento 4 sumiu do nada, você criou ou salvou um `.json` com o servidor ligado: o Nodemon reiniciou.
- Se o `POST` deu `500` com `Cannot destructure property 'nome' of 'req.body'`, faltou o `express.json()` ou o `-H "Content-Type: application/json"`.

</details>

---

### Exercício 3: A recepcionista e o cofre 🟢 Fácil

A produtora quer saber **quais pedidos chegam** na bilheteria e vai hospedar a API num serviço que escolhe a porta sozinho. Neste exercício você também vai **provocar 3 erros de propósito**, para reconhecer cada um quando ele aparecer sem querer.

**O que fazer:**

1. Copie o `casa2` para `casa3` (sem a `node_modules`), rode `npm install` e depois `npm install dotenv`.
2. Crie `middlewares/registrarPedido.js` com uma recepcionista que mostra `🎟️`, o método e o caminho de cada pedido, e use no `index.js` com `app.use(...)`, **depois** do `express.json()` e **antes** das rotas.
3. Crie o `.env` com `PORT=3001` e o `.env.example` com o mesmo conteúdo e um comentário dizendo para copiar. No `index.js`, abra o cofre na **primeira linha**, crie `const porta = process.env.PORT || 3000;` e use `porta` no `app.listen` e na mensagem.
4. Ligue e teste `curl http://localhost:3001/eventos/1`.
5. **Erro 1:** teste `curl -X POST http://localhost:3001/eventos/1 -H "Content-Type: application/json" -d "@evento.json"`.
6. **Erro 2:** comente o `next();` da recepcionista, salve e teste `curl --max-time 3 http://localhost:3001/eventos`. Depois conserte.
7. **Erro 3:** comente a linha `import 'dotenv/config';`, salve e olhe a mensagem do servidor. Depois conserte.
8. Para cada erro, escreva num comentário no topo do `index.js`: **a mensagem** e, com suas palavras, **o que aconteceu**.

**Resultado esperado:**

No terminal do servidor (passos 3 e 4):

```
Bilheteria do IngressoÁgil aberta em http://localhost:3001
🎟️ GET /eventos/1
```

No `curl` do passo 4:

```
{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20}
```

A mensagem principal de cada erro (passos 5, 6 e 7):

```
<pre>Cannot POST /eventos/1</pre>
curl: (28) Operation timed out after 3002 milliseconds with 0 bytes received
Bilheteria do IngressoÁgil aberta em http://localhost:3000
```

No erro 2, os milissegundos mudam um pouco. No erro 3, repare: **a porta mudou para 3000**. O servidor não quebrou, mas não está mais lendo o cofre.

<details>
<summary>💡 Ver dicas</summary>

- Reveja a seção 3: o middleware tem **três** ingredientes `(req, res, next)` e termina com `next();`.
- Mostrar várias coisas no mesmo `console.log`: `console.log('🎟️', req.method, req.url);`
- O `.env` não tem aspas nem espaços: `PORT=3001`.
- Na mensagem do `listen`, junte o texto com o número: `'... http://localhost:' + porta`.
- Mudou o `.env` e nada aconteceu? O Nodemon **não vigia** o `.env`: digite `rs` + `Enter` no terminal do servidor.
- Erro 1: o `POST` cria eventos novos, então ele vai em `/eventos`, sem id. Qual método do cardápio aceita `/eventos/1`?
- Erro 3: de onde veio o `3000`, se o `.env` diz `3001`? Olhe o `||`.

</details>

---

### Exercício 4: Os eventos que não somem 🔴 Difícil

Toda vez que a API da bilheteria reinicia, os eventos cadastrados somem, e a produtora perde as vendas do dia. Este exercício junta tudo: você vai ligar a API a um **banco SQLite** com o Sequelize, **sem mudar nenhuma letra** do `routes/eventos.js`.

**O que fazer:**

1. Copie o `casa3` para `casa4` (sem a `node_modules`), rode `npm install` e depois `npm install sequelize sqlite3`. **Antes de ligar o servidor**, crie os arquivos `slam.json`, `batalha.json` e `samba.json`, cada um com um dos 3 eventos do Exercício 1 (**sem** o `id`), e copie o `evento-incompleto.json` do Exercício 2.
2. Acrescente no `.env` e no `.env.example` a linha `DB_ARQUIVO=ingressoagil.sqlite`.
3. Crie `config/db.js` com a conexão SQLite, usando o `DB_ARQUIVO` do cofre (e `'ingressoagil.sqlite'` se ele não existir).
4. Crie `models/Evento.js`: `nome` (texto), `data` (`DataTypes.DATEONLY`, só a data) e `preco` (inteiro), os três obrigatórios, com `tableName: 'evento'` e `timestamps: false`.
5. No `index.js`, acrescente o `await sequelize.sync();` antes do `app.listen`.
6. Reescreva o controller com o model `Evento` e `async`/`await`. **Mantenha o `400` do Exercício 2** e os mesmos `404`. Não mude o `routes/eventos.js`.
7. Ligue o servidor. Cadastre os 3 eventos (`POST` com os 3 arquivos), tente cadastrar o incompleto e cancele a Batalha da Estação (`DELETE /eventos/2`).
8. **A prova:** reinicie o servidor. Liste os eventos e busque o evento `2`.
9. **Pensando como pessoa de mercado**, escreva **três comentários** no topo do `index.js`:
   - **Clear Thinking:** **quem** perde, e **o quê**, se os ingressos vendidos de um evento somem quando o servidor reinicia?
   - **Discordância Positiva:** um colega diz: "Para que separar rota e controller? Era só escrever tudo no `index.js`". Responda com **um argumento** tirado do que você fez **neste** exercício.
   - **O cofre:** o que você colocaria no `.env` se o banco fosse o PostgreSQL do projeto final, e por que isso não pode ir para o GitHub?

**Resultado esperado:**

No terminal do servidor:

```
Bilheteria do IngressoÁgil aberta em http://localhost:3001
```

Os pedidos do passo 7 (primeira e última linha de cada `curl -i`):

```
HTTP/1.1 201 Created
{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20}
HTTP/1.1 201 Created
{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15}
HTTP/1.1 201 Created
{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30}
HTTP/1.1 400 Bad Request
{"erros":["Informe o nome e o preço do evento"]}
HTTP/1.1 204 No Content
```

Depois do reinício (passo 8, a lista sem `-i` e a busca com `-i`):

```
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30}]
HTTP/1.1 404 Not Found
{"erros":["Evento não encontrado"]}
```

O arquivo `ingressoagil.sqlite` aparece na pasta. Se você rodar o exercício de novo, apague esse arquivo antes, para os ids começarem do `1`.

<details>
<summary>💡 Ver dicas</summary>

- **Não tente fazer tudo de uma vez.** Primeiro o `config/db.js` e o `sync`: ligue o servidor e veja o `.sqlite` aparecer. Depois o model. Depois **uma** função do controller (o `listar`, que deve dar `[]`). Depois as outras.
- Reveja a seção 4. O `config/db.js` e o `models/Evento.js` seguem o mesmo molde do `Produto`.
- O `import 'dotenv/config';` precisa continuar sendo a **primeira linha** do `index.js`: o `config/db.js` lê o `DB_ARQUIVO` assim que é importado.
- Toda função do controller que usa o banco é `async`, e todo pedido ao banco tem `await` na frente.
- O `400` acontece **antes** do `Evento.create(...)`: se faltar dado, nem chega a ir ao banco.
- Para provar que o `routes/eventos.js` não mudou: compare com o do `casa3`. Tem que ser igual, linha por linha.
- Se der `Please install sqlite3 package manually`, faltou o `npm install sqlite3` **nesta pasta**.
- Se der `500` e, no terminal, `SQLITE_ERROR: no such table: evento`, faltou o `await sequelize.sync();` (ou ele está **depois** do `app.listen`).
- Se, depois do reinício, aparecerem os 3 eventos de sempre (inclusive a Batalha), o controller ainda é o da memória.

</details>

---

**🏁 Desafio bônus (opcional, 20 minutos):** pense num negócio que você conhece (a barbearia do bairro, a lanchonete, o brechó). Escolha **um recurso** (cortes, lanches, peças), escreva o **mapa das 5 rotas do CRUD** (método, caminho, status e quem usa cada uma) e crie a API em memória, com rotas e controller. Quem cria o problema entende o conteúdo de verdade.

---

## 🐞 Erros comuns e o que eles significam

Antes de pedir ajuda, leia a mensagem **inteira** e tente **pelo menos uma** correção.

### Rotas, controllers e o CRUD

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../routes/produtos' ... Did you mean to import "./routes/produtos.js"?` | Faltou o `.js` no `import` de um arquivo seu | Acrescente o `.js` |
| `SyntaxError: The requested module ... does not provide an export named 'rotasProdutos'` | Faltou o `export`, ou o nome no `import` está diferente | Compare os nomes letra por letra |
| `Cannot GET /produtos` com o servidor ligado | Faltou o `app.use('/produtos', rotasProdutos)` | Confira o `index.js` |
| `Cannot POST /produtos/1` (ou `Cannot PUT`, `Cannot DELETE`) | A rota existe, mas **não com esse método e esse caminho** | `POST` vai em `/produtos`; `PUT` e `DELETE` vão em `/produtos/:id` |
| Todo id dá `404`, até os que existem | Faltou o `Number(req.params.id)` (na memória) | O id do caminho chega como texto |
| `TypeError: Cannot destructure property 'nome' of 'req.body' as it is undefined.` (status `500`) | Faltou o `app.use(express.json())`, **ou** faltou o `-H "Content-Type: application/json"` no `curl` | Confira os dois |
| `400 Bad Request` e, no servidor, `SyntaxError: ... in JSON at position ...` | O arquivo `.json` tem um erro (vírgula sobrando, aspas simples) | Abra o `.json`: só aspas **duplas**, sem vírgula depois do último campo |
| `curl: option -d: error encountered when reading a file` | O `curl` não achou o arquivo do corpo | Rode o `curl` na pasta onde o `.json` está |
| O produto que criei sumiu, sem eu reiniciar | Você criou ou salvou um `.json` (ou um `.js`) e o Nodemon reiniciou | Crie os arquivos de corpo antes de ligar o servidor |
| Depois do `PUT`, o campo `preco` sumiu da resposta | O corpo do `PUT` veio sem o `preco` | O `PUT` troca **tudo**: mande todos os campos (ou trate com um `400`) |

### Middleware e `.env`

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| O `curl` fica parado, sem resposta; com `--max-time`: `curl: (28) Operation timed out` | Um middleware não chamou o `next()` | Confira se todo middleware termina com `next();` |
| `process.env.PORT` é `undefined` | O cofre não foi aberto: faltou o `import 'dotenv/config';` (ou o `.env` não existe, ou está em outra pasta) | Primeira linha do `index.js`; o `.env` fica na **raiz** do projeto |
| Mudei o `.env` e nada mudou | O Nodemon não vigia o `.env` | Digite `rs` + `Enter` no terminal do servidor |
| O `.env` aparece no `git status` | Ele não está no `.gitignore` | Acrescente `.env` no `.gitignore` **antes** do commit |
| `node: .env: not found` | Você usou `node --env-file=.env` e o arquivo não existe | Crie o `.env` a partir do `.env.example` |

### Sequelize e SQLite

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| `Error: Please install sqlite3 package manually` e `[nodemon] app crashed` | O `sqlite3` não está instalado **nesta pasta** | `npm install sqlite3` |
| `500` e, no terminal, uma pilha que começa só com `Error` e, mais abaixo, `SQLITE_ERROR: no such table: produto` | A tabela não existe: faltou o `await sequelize.sync();` | Acrescente o `sync` antes do `app.listen`. **Leia a mensagem até o fim** |
| `SequelizeValidationError: notNull Violation: Produto.nome cannot be null` (status `500`) | O corpo veio sem um campo obrigatório | Mande o campo, ou responda `400` antes de chamar o banco |
| `SQLITE_ERROR: no such column: estoque` | Você acrescentou um campo no model, mas a tabela já existia, e o `sync()` não altera tabelas | Para estudar: apague o `.sqlite` e reinicie. No projeto final: **migrations** |
| Reiniciei e os produtos novos sumiram, e os 3 de sempre voltaram | O controller ainda é o da memória | Confira o `import { Produto }` e o `await` no controller |
| A lista vem `[]` | O banco começa vazio (está certo!) ou você apagou o `.sqlite` | Cadastre com `POST` |
| No Windows, o `npm install sqlite3` mostra erros de `node-gyp` ou `Visual Studio` | Não baixou a versão pronta do `sqlite3` e ele tentou compilar | Confira se está no **Node 22** (`node -v`) e rode `npm install` de novo; se continuar, avise o professor |

---

**Lembre-se:** hoje a API do MercadoÁgil deixou de ser um protótipo. Ela tem um cardápio organizado, cria, altera e apaga dados, avisa o que chega, guarda as senhas no cofre e não esquece nada quando reinicia. É a base do **projeto final**. Bons estudos! 🚀
