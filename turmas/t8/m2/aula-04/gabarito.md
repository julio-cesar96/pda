# ✅ Gabarito comentado

**Módulo 2 · Aula 4: Rotas e controladores + Conectando com o banco de dados**

Este arquivo tem as respostas do **exercício da aula** (o VagaÁgil) e da **lista de exercícios para casa** (o IngressoÁgil).

> **Como usar o gabarito:** ele não serve para copiar. Serve para **comparar**. Primeiro tente resolver. Depois compare o seu código com o daqui. Se o resultado no `curl` for igual ao esperado (status e corpo), **o seu código também está certo**, mesmo que escrito de outro jeito.
>
> Se deu diferente, não apague tudo. Compare **arquivo por arquivo**, começando pelo que a mensagem de erro aponta. Esse é o momento em que você mais aprende.

As linhas `Date`, `ETag` e `Content-Length` das respostas foram omitidas (`...`): elas mudam a cada teste.

---

## 📑 Sumário

1. [Exercício da aula: o VagaÁgil](#-exercício-da-aula-o-vagaágil)
2. [Exercício 1: A bilheteria organizada 🟢](#exercício-1-a-bilheteria-organizada-)
3. [Exercício 2: O cadastro de eventos 🟡](#exercício-2-o-cadastro-de-eventos-)
4. [Exercício 3: A recepcionista e o cofre 🟢](#exercício-3-a-recepcionista-e-o-cofre-)
5. [Exercício 4: Os eventos que não somem 🔴](#exercício-4-os-eventos-que-não-somem-)
6. [Dúvidas que costumam aparecer](#-dúvidas-que-costumam-aparecer)

---

## 👥 Exercício da aula: o VagaÁgil

### Passos 1 a 8: a API em memória

**`package.json`** (o `npm init -y` cria outros campos, como `description` e `keywords`: pode deixar):

```json
{
  "name": "vagaagil-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "express": "^5.3.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

**`controllers/vagasController.js`** (o cozinheiro, com as 5 funções):

<!-- node:skip -->
```js
// O cozinheiro da praça de vagas. As vagas ficam na memória (por enquanto).
let vagas = [
  { id: 1, cargo: 'Estágio em Front-end', empresa: 'Banco Horizonte', salario: 1800 },
  { id: 2, cargo: 'Dev Júnior Node.js', empresa: 'LogiSul Transportes', salario: 4200 },
  { id: 3, cargo: 'Suporte Técnico Júnior', empresa: 'Clínica Vida+', salario: 2600 },
];
let proximoId = 4;

// GET /vagas
export function listar(req, res) {
  res.json(vagas);
}

// GET /vagas/:id
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const vaga = vagas.find((v) => v.id === id);

  if (!vaga) {
    return res.status(404).json({ erros: ['Vaga não encontrada'] });
  }
  res.json(vaga);
}

// POST /vagas
export function criar(req, res) {
  const { cargo, empresa, salario } = req.body;
  const nova = { id: proximoId, cargo, empresa, salario };
  proximoId++;

  vagas.push(nova);
  res.status(201).json(nova);
}

// PUT /vagas/:id
export function atualizar(req, res) {
  const id = Number(req.params.id);
  const vaga = vagas.find((v) => v.id === id);

  if (!vaga) {
    return res.status(404).json({ erros: ['Vaga não encontrada'] });
  }

  const { cargo, empresa, salario } = req.body;
  vaga.cargo = cargo;
  vaga.empresa = empresa;
  vaga.salario = salario;
  res.json(vaga);
}

// DELETE /vagas/:id
export function remover(req, res) {
  const id = Number(req.params.id);
  const vaga = vagas.find((v) => v.id === id);

  if (!vaga) {
    return res.status(404).json({ erros: ['Vaga não encontrada'] });
  }

  vagas = vagas.filter((v) => v.id !== id);
  res.status(204).send();
}
```

**`routes/vagas.js`** (o cardápio), já com a resposta da pergunta em dupla:

<!-- node:skip -->
```js
// Pergunta em dupla (exemplo de resposta):
// Time do app: com DELETE /vagas/3, o app adivinha o pedido sem ler documentação,
// porque segue o mesmo padrão de GET, POST e PUT em /vagas.
// Pessoa candidata: um GET não deve mudar nada; se um GET apagasse vagas, um
// recarregar de página ou um robô de busca poderia tirar vagas do ar sem ninguém querer.
import express from 'express';
import { listar, buscarPorId, criar, atualizar, remover } from '../controllers/vagasController.js';

// A seção "Vagas" do cardápio
export const rotasVagas = express.Router();

rotasVagas.get('/', listar);
rotasVagas.get('/:id', buscarPorId);
rotasVagas.post('/', criar);
rotasVagas.put('/:id', atualizar);
rotasVagas.delete('/:id', remover);
```

**`index.js`** (o salão):

<!-- node:skip -->
```js
import express from 'express';
import { rotasVagas } from './routes/vagas.js';

const app = express();

app.use(express.json());

app.use('/vagas', rotasVagas);

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui abrir o mural:', erro.message);
  } else {
    console.log('Mural do VagaÁgil no ar em http://localhost:3000');
  }
});
```

**Resultado no terminal do servidor:**

```
Mural do VagaÁgil no ar em http://localhost:3000
```

**Resultado dos `curl` (passos 3 a 8):**

```
# Passo 3: GET /vagas
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
...
[{"id":1,"cargo":"Estágio em Front-end","empresa":"Banco Horizonte","salario":1800},{"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4200},{"id":3,"cargo":"Suporte Técnico Júnior","empresa":"Clínica Vida+","salario":2600}]

# Passo 4: GET /vagas/2 e GET /vagas/99
HTTP/1.1 200 OK
{"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4200}
HTTP/1.1 404 Not Found
{"erros":["Vaga não encontrada"]}

# Passo 5: POST /vagas
HTTP/1.1 201 Created
{"id":4,"cargo":"Estágio em Dados","empresa":"Mercado Bom Preço","salario":2000}

# Passo 6: PUT /vagas/2 e PUT /vagas/99
HTTP/1.1 200 OK
{"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4500}
HTTP/1.1 404 Not Found
{"erros":["Vaga não encontrada"]}

# Passo 7: DELETE /vagas/3, duas vezes
HTTP/1.1 204 No Content
HTTP/1.1 404 Not Found
{"erros":["Vaga não encontrada"]}

# Passo 8: a lista, antes e depois do reinício
[{"id":1,"cargo":"Estágio em Front-end","empresa":"Banco Horizonte","salario":1800},{"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4500},{"id":4,"cargo":"Estágio em Dados","empresa":"Mercado Bom Preço","salario":2000}]
[{"id":1,"cargo":"Estágio em Front-end","empresa":"Banco Horizonte","salario":1800},{"id":2,"cargo":"Dev Júnior Node.js","empresa":"LogiSul Transportes","salario":4200},{"id":3,"cargo":"Suporte Técnico Júnior","empresa":"Clínica Vida+","salario":2600}]
```

**Por que funciona, passo a passo:**

- **Passos 2 e 3:** o controller **exporta** as funções; o arquivo de rotas **importa** e liga cada uma a um método + caminho; o `index.js` liga a seção inteira em `/vagas`. Dentro do router, `'/'` vira `/vagas` e `'/:id'` vira `/vagas/:id`.
- **Passo 4:** `req.params.id` chega como **texto** (`'2'`). O `Number(...)` transforma em número para o `===` do `find` funcionar. O `return` antes do `res.status(404)` faz a função parar ali.
- **Passo 5:** o `express.json()` abre o JSON do corpo e guarda em `req.body`. O `proximoId` garante um id que nunca se repete.
- **Passo 6:** o `find` devolve **a mesma ficha** que está no array (um "apelido", como na Aula 2 do M1). Mudar `vaga.salario` muda a vaga **dentro da lista**.
- **Passo 7:** o `filter` cria uma lista nova **sem** a vaga e guarda de volta em `vagas` (por isso o `let`). O `204` não tem corpo. Na segunda vez, a vaga já não existe: `404`.
- **Passo 8:** salvar o `index.js` fez o Nodemon reiniciar o programa, e a memória voltou ao array do começo. Por isso as mudanças do RH sumiram.

**Discordância Positiva do passo 5 (`vagas.length + 1`):** qualquer decisão com argumento vale. O argumento mais forte é contra o `length + 1`. Depois de apagar a vaga `3`, a lista tem 3 vagas (`1`, `2` e `4`), e `length + 1` daria `4` de novo: **duas vagas com o mesmo id**. O `PUT /vagas/4` alteraria só a primeira que o `find` achasse. O `proximoId` só cresce, então nunca repete.

**Desafio extra (quebrar de propósito):**

1. O status é `500 Internal Server Error`: a culpa é **da cozinha** (o servidor esqueceu de abrir o pacote JSON), e não do RH, que mandou tudo certo.
2. A linha aparece no fim da segunda linha do erro: `controllers/vagasController.js:27:11` (linha 27, coluna 11), que é a linha do `const { cargo, empresa, salario } = req.body;`.
3. Exemplo de ideia (qualquer uma com a mesma intenção vale): "se faltar o salário, responder `400` com `{ erros: ['Informe o salário da vaga'] }`, para o RH saber exatamente o que corrigir".

### ✂️ Passos 9 a 11: a troca para o banco

**`config/db.js`:**

<!-- node:skip -->
```js
import { Sequelize } from 'sequelize';

// O banco do VagaÁgil: um arquivo SQLite na pasta do projeto
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'vagaagil.sqlite',
  logging: false,
});
```

**`models/Vaga.js`:**

<!-- node:skip -->
```js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// O model Vaga vira a tabela "vaga" (o id é criado sozinho)
export const Vaga = sequelize.define(
  'Vaga',
  {
    cargo: { type: DataTypes.STRING, allowNull: false },
    empresa: { type: DataTypes.STRING, allowNull: false },
    salario: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'vaga', timestamps: false },
);
```

**`controllers/vagasController.js`** (reescrito):

<!-- node:skip -->
```js
import { Vaga } from '../models/Vaga.js';

// O mesmo cozinheiro, agora buscando no banco. As rotas não mudaram nada.

// GET /vagas
export async function listar(req, res) {
  const vagas = await Vaga.findAll();
  res.json(vagas);
}

// GET /vagas/:id
export async function buscarPorId(req, res) {
  const vaga = await Vaga.findByPk(req.params.id);

  if (!vaga) {
    return res.status(404).json({ erros: ['Vaga não encontrada'] });
  }
  res.json(vaga);
}

// POST /vagas
export async function criar(req, res) {
  const { cargo, empresa, salario } = req.body;
  const nova = await Vaga.create({ cargo, empresa, salario });
  res.status(201).json(nova);
}

// PUT /vagas/:id
export async function atualizar(req, res) {
  const vaga = await Vaga.findByPk(req.params.id);

  if (!vaga) {
    return res.status(404).json({ erros: ['Vaga não encontrada'] });
  }

  const { cargo, empresa, salario } = req.body;
  await vaga.update({ cargo, empresa, salario });
  res.json(vaga);
}

// DELETE /vagas/:id
export async function remover(req, res) {
  const vaga = await Vaga.findByPk(req.params.id);

  if (!vaga) {
    return res.status(404).json({ erros: ['Vaga não encontrada'] });
  }

  await vaga.destroy();
  res.status(204).send();
}
```

**`index.js`** (com o `sync`):

<!-- node:skip -->
```js
import express from 'express';
import { sequelize } from './config/db.js';
import { rotasVagas } from './routes/vagas.js';

const app = express();

app.use(express.json());

app.use('/vagas', rotasVagas);

// Cria a tabela "vaga" se ela ainda não existir
await sequelize.sync();

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui abrir o mural:', erro.message);
  } else {
    console.log('Mural do VagaÁgil no ar em http://localhost:3000');
  }
});
```

O `routes/vagas.js` é **exatamente o mesmo** dos passos 1 a 8.

**Resultado dos `curl`:**

```
# Passo 10: GET /vagas
[]

# Passo 11: POST /vagas e, depois de reiniciar, GET /vagas
HTTP/1.1 201 Created
{"id":1,"cargo":"Estágio em Dados","empresa":"Mercado Bom Preço","salario":2000}
[{"id":1,"cargo":"Estágio em Dados","empresa":"Mercado Bom Preço","salario":2000}]
```

**Por que funciona:** o `routes/vagas.js` só conhece os **nomes** das funções (`listar`, `criar`...). Como o controller novo exporta funções com os mesmos nomes, as rotas nem percebem a troca. A vaga agora mora no arquivo `vagaagil.sqlite`, que continua lá quando o programa reinicia.

---

## Exercício 1: A bilheteria organizada 🟢

**`controllers/eventosController.js`:**

<!-- node:skip -->
```js
// O cozinheiro da praça de eventos. Os eventos ficam na memória.
const eventos = [
  { id: 1, nome: 'Slam das Minas', data: '2026-12-05', preco: 20 },
  { id: 2, nome: 'Batalha da Estação', data: '2026-12-12', preco: 15 },
  { id: 3, nome: 'Roda de Samba de Fim de Ano', data: '2026-12-20', preco: 30 },
];

// GET /eventos
export function listar(req, res) {
  res.json(eventos);
}

// GET /eventos/:id
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const evento = eventos.find((e) => e.id === id);

  if (!evento) {
    return res.status(404).json({ erros: ['Evento não encontrado'] });
  }
  res.json(evento);
}
```

**`routes/eventos.js`**, com o comentário do item 6:

<!-- node:skip -->
```js
// Por que um arquivo só para eventos? (exemplo de resposta)
// Daqui a 3 meses a bilheteria vai ter rotas de clientes, compras e espaços.
// Com cada recurso no seu arquivo, quem mexer em compras não encosta nos eventos,
// acha tudo mais rápido e não quebra a vitrine sem querer.
import express from 'express';
import { listar, buscarPorId } from '../controllers/eventosController.js';

// A seção "Eventos" do cardápio do IngressoÁgil
export const rotasEventos = express.Router();

rotasEventos.get('/', listar);
rotasEventos.get('/:id', buscarPorId);
```

**`index.js`:**

<!-- node:skip -->
```js
import express from 'express';
import { rotasEventos } from './routes/eventos.js';

const app = express();

app.use('/eventos', rotasEventos);

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui abrir a bilheteria:', erro.message);
  } else {
    console.log('Bilheteria do IngressoÁgil aberta em http://localhost:3000');
  }
});
```

**Resultado no terminal:**

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

**Por que funciona:** o `index.js` encaminha tudo o que começa com `/eventos` para o `rotasEventos`; o router escolhe a função pelo resto do caminho; o controller responde. O `/eventos/10` passa pelo `find`, não acha nada, e o `if (!evento)` responde `404`.

**Outra forma que também está certa:** o array pode ser `let` desde já (no Exercício 2 ele vai precisar ser).

---

## Exercício 2: O cadastro de eventos 🟡

**`controllers/eventosController.js`:**

<!-- node:skip -->
```js
// O cozinheiro da praça de eventos. Os eventos ficam na memória.
let eventos = [
  { id: 1, nome: 'Slam das Minas', data: '2026-12-05', preco: 20 },
  { id: 2, nome: 'Batalha da Estação', data: '2026-12-12', preco: 15 },
  { id: 3, nome: 'Roda de Samba de Fim de Ano', data: '2026-12-20', preco: 30 },
];
let proximoId = 4;

// GET /eventos
export function listar(req, res) {
  res.json(eventos);
}

// GET /eventos/:id
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const evento = eventos.find((e) => e.id === id);

  if (!evento) {
    return res.status(404).json({ erros: ['Evento não encontrado'] });
  }
  res.json(evento);
}

// POST /eventos
export function criar(req, res) {
  const { nome, data, preco } = req.body;

  // 400: o pedido chegou, mas veio faltando informação
  if (nome === undefined || preco === undefined) {
    return res.status(400).json({ erros: ['Informe o nome e o preço do evento'] });
  }

  const novo = { id: proximoId, nome, data, preco };
  proximoId++;
  eventos.push(novo);
  res.status(201).json(novo);
}

// PUT /eventos/:id
export function atualizar(req, res) {
  const id = Number(req.params.id);
  const evento = eventos.find((e) => e.id === id);

  if (!evento) {
    return res.status(404).json({ erros: ['Evento não encontrado'] });
  }

  const { nome, data, preco } = req.body;
  evento.nome = nome;
  evento.data = data;
  evento.preco = preco;
  res.json(evento);
}

// DELETE /eventos/:id
export function remover(req, res) {
  const id = Number(req.params.id);
  const evento = eventos.find((e) => e.id === id);

  if (!evento) {
    return res.status(404).json({ erros: ['Evento não encontrado'] });
  }

  eventos = eventos.filter((e) => e.id !== id);
  res.status(204).send();
}
```

**`routes/eventos.js`:**

<!-- node:skip -->
```js
import express from 'express';
import { listar, buscarPorId, criar, atualizar, remover } from '../controllers/eventosController.js';

// A seção "Eventos" do cardápio do IngressoÁgil
export const rotasEventos = express.Router();

rotasEventos.get('/', listar);
rotasEventos.get('/:id', buscarPorId);
rotasEventos.post('/', criar);
rotasEventos.put('/:id', atualizar);
rotasEventos.delete('/:id', remover);
```

**`index.js`:**

<!-- node:skip -->
```js
import express from 'express';
import { rotasEventos } from './routes/eventos.js';

const app = express();

// Ensina o servidor a ler o JSON do corpo do pedido
app.use(express.json());

app.use('/eventos', rotasEventos);

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui abrir a bilheteria:', erro.message);
  } else {
    console.log('Bilheteria do IngressoÁgil aberta em http://localhost:3000');
  }
});
```

**Resultado no terminal:**

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

**Por que funciona:**

- O `400` é testado **antes** de criar: se faltar o nome **ou** (`||`) o preço, a função responde e para (`return`). O evento incompleto **nunca entra** na lista.
- `400` é culpa **do cliente** (mandou dado faltando); `500` seria culpa **da cozinha**. Com o `400` e uma mensagem clara, o painel da produtora mostra o que corrigir, em vez de "R$ undefined" na vitrine.
- **Por que `=== undefined` e não `!preco`?** Com `!preco`, um evento **gratuito** (`preco: 0`) seria recusado, porque `!0` é `true`. Com `=== undefined`, só é recusado quem **não mandou** o preço.

**Outra forma que também está certa:** responder um erro mais específico para cada campo (`'Informe o nome do evento'`, `'Informe o preço do evento'`), com dois `if`. É até melhor para quem usa o painel.

---

## Exercício 3: A recepcionista e o cofre 🟢

**`middlewares/registrarPedido.js`:**

<!-- node:skip -->
```js
// A recepcionista da bilheteria: anota cada pedido antes de passar para a cozinha
export function registrarPedido(req, res, next) {
  console.log('🎟️', req.method, req.url);
  next();
}
```

**`.env`** (e o `.env.example`, com um comentário no topo):

```
# Copie para .env e preencha
PORT=3001
```

**`index.js`**, com os comentários do item 8:

<!-- node:skip -->
```js
// Erro 1: "Cannot POST /eventos/1"
//   O POST cria um evento novo, então mora em /eventos, sem id. Em /eventos/1
//   o cardápio só tem GET, PUT e DELETE. Rota = método + caminho.
// Erro 2: "curl: (28) Operation timed out after 3002 milliseconds with 0 bytes received"
//   A recepcionista anotou o pedido, mas não disse "pode passar" (o next).
//   O pedido ficou parado na recepção e nunca chegou à cozinha.
// Erro 3: "Bilheteria do IngressoÁgil aberta em http://localhost:3000"
//   Sem o dotenv, ninguém abriu o cofre: process.env.PORT ficou undefined
//   e o || usou o 3000. Não aparece erro, mas a configuração foi ignorada.
import 'dotenv/config';
import express from 'express';
import { registrarPedido } from './middlewares/registrarPedido.js';
import { rotasEventos } from './routes/eventos.js';

const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());
app.use(registrarPedido);

app.use('/eventos', rotasEventos);

app.listen(porta, (erro) => {
  if (erro) {
    console.log('Não consegui abrir a bilheteria:', erro.message);
  } else {
    console.log('Bilheteria do IngressoÁgil aberta em http://localhost:' + porta);
  }
});
```

Os arquivos `routes/eventos.js` e `controllers/eventosController.js` são os do Exercício 2.

**Resultado no terminal:**

```
Bilheteria do IngressoÁgil aberta em http://localhost:3001
🎟️ GET /eventos/1
```

```
{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20}
```

```
<pre>Cannot POST /eventos/1</pre>
curl: (28) Operation timed out after 3002 milliseconds with 0 bytes received
Bilheteria do IngressoÁgil aberta em http://localhost:3000
```

**Por que funciona:**

- O `app.use(registrarPedido)` **sem caminho** coloca a recepcionista na frente de **todos** os pedidos. Ela fica **depois** do `express.json()` e **antes** das rotas, porque a ordem dos `app.use` é a ordem do caminho do pedido.
- O `import 'dotenv/config';` lê o `.env` e coloca cada linha em `process.env`. Por isso ele é a **primeira** linha: tudo o que vem depois já encontra o cofre aberto.
- O **erro 3** é o mais perigoso dos três: **não quebra nada**. Num servidor de verdade, isso pode significar a API ligada na porta errada, ou conectada ao banco errado, sem ninguém perceber.

---

## Exercício 4: Os eventos que não somem 🔴

**`.env`** (e o `.env.example`):

```
# Copie para .env e preencha
PORT=3001
DB_ARQUIVO=ingressoagil.sqlite
```

**`config/db.js`:**

<!-- node:skip -->
```js
import { Sequelize } from 'sequelize';

// O banco do IngressoÁgil: um arquivo SQLite, com o nome vindo do .env
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_ARQUIVO || 'ingressoagil.sqlite',
  logging: false,
});
```

**`models/Evento.js`:**

<!-- node:skip -->
```js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// O model Evento espelha a tabela "evento" do projeto de modelagem da Aula 3
export const Evento = sequelize.define(
  'Evento',
  {
    nome: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.DATEONLY, allowNull: false },
    preco: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'evento', timestamps: false },
);
```

**`controllers/eventosController.js`** (reescrito):

<!-- node:skip -->
```js
import { Evento } from '../models/Evento.js';

// O mesmo cozinheiro, agora buscando no banco. As rotas não mudaram.

// GET /eventos
export async function listar(req, res) {
  const eventos = await Evento.findAll();
  res.json(eventos);
}

// GET /eventos/:id
export async function buscarPorId(req, res) {
  const evento = await Evento.findByPk(req.params.id);

  if (!evento) {
    return res.status(404).json({ erros: ['Evento não encontrado'] });
  }
  res.json(evento);
}

// POST /eventos
export async function criar(req, res) {
  const { nome, data, preco } = req.body;

  if (nome === undefined || preco === undefined) {
    return res.status(400).json({ erros: ['Informe o nome e o preço do evento'] });
  }

  const novo = await Evento.create({ nome, data, preco });
  res.status(201).json(novo);
}

// PUT /eventos/:id
export async function atualizar(req, res) {
  const evento = await Evento.findByPk(req.params.id);

  if (!evento) {
    return res.status(404).json({ erros: ['Evento não encontrado'] });
  }

  const { nome, data, preco } = req.body;
  await evento.update({ nome, data, preco });
  res.json(evento);
}

// DELETE /eventos/:id
export async function remover(req, res) {
  const evento = await Evento.findByPk(req.params.id);

  if (!evento) {
    return res.status(404).json({ erros: ['Evento não encontrado'] });
  }

  await evento.destroy();
  res.status(204).send();
}
```

**`index.js`**, com os comentários do item 9 (exemplos de resposta; qualquer resposta com a mesma ideia vale):

<!-- node:skip -->
```js
// Clear Thinking: quem perde é a produtora (não sabe quais eventos tem nem o que
// vendeu), o público (comprou ingresso de um evento que "sumiu") e o espaço cultural
// (não sabe quanta gente esperar). Dado que some é dinheiro e confiança perdidos.
//
// Discordância Positiva: discordo. Neste exercício troquei a memória pelo banco
// mexendo SÓ no controller: o routes/eventos.js ficou igual, linha por linha.
// Com tudo no index.js, eu teria que mexer no arquivo inteiro e arriscar quebrar
// as rotas que já funcionavam.
//
// O cofre: no PostgreSQL, o .env teria a DATABASE_URL, com usuário e SENHA do banco.
// Se for para o GitHub, qualquer pessoa pode entrar no banco, copiar os dados do
// público (LGPD!) ou apagar tudo.
import 'dotenv/config';
import express from 'express';
import { sequelize } from './config/db.js';
import { registrarPedido } from './middlewares/registrarPedido.js';
import { rotasEventos } from './routes/eventos.js';

const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());
app.use(registrarPedido);

app.use('/eventos', rotasEventos);

// Cria a tabela "evento" se ela ainda não existir
await sequelize.sync();

app.listen(porta, (erro) => {
  if (erro) {
    console.log('Não consegui abrir a bilheteria:', erro.message);
  } else {
    console.log('Bilheteria do IngressoÁgil aberta em http://localhost:' + porta);
  }
});
```

O `routes/eventos.js` e o `middlewares/registrarPedido.js` são **exatamente** os do Exercício 3.

**Resultado no terminal:**

```
Bilheteria do IngressoÁgil aberta em http://localhost:3001
```

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

Depois do reinício:

```
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30}]
HTTP/1.1 404 Not Found
{"erros":["Evento não encontrado"]}
```

**Por que funciona, passo a passo:**

- **Passos 2 e 3:** o `config/db.js` lê o `DB_ARQUIVO` assim que é importado. Como o `import 'dotenv/config';` vem **antes** no `index.js`, o cofre já está aberto nessa hora.
- **Passo 4:** o model é a tabela `evento` do projeto de modelagem da Aula 3, em JavaScript. O `DATEONLY` guarda só a data (sem hora), e devolve no mesmo formato `'2026-12-05'`.
- **Passo 5:** o `sync()` cria a tabela `evento` se ela ainda não existe. Ele fica **antes** do `app.listen`: o servidor só abre a bilheteria com a tabela pronta.
- **Passo 6:** cada função virou `async`, e cada pedido ao banco tem `await`. O `findByPk` entende o `'2'` do caminho sozinho (por isso o `Number` sumiu). O `400` continua **antes** do `create`: dado incompleto nem chega ao banco.
- **Passo 8:** o reinício não apagou nada, porque os eventos moram no arquivo `ingressoagil.sqlite`. E a Batalha (id `2`) continua apagada: o `DELETE` também foi para o banco.

**Outra forma que também está certa:** `data` como `DataTypes.STRING`. Funciona igual aqui, mas o `DATEONLY` avisa a quem lê o model que aquele campo é uma **data**, como o `DATE` do SQL da Aula 3.

---

## ❓ Dúvidas que costumam aparecer

**"O meu código deu o mesmo resultado, mas está organizado diferente. Está errado?"**
Não. Se os status e os corpos batem com o esperado, e as rotas estão separadas do controller, está certo. Existe mais de um jeito de organizar.

**"Por que o `listar` vai sem parênteses no arquivo de rotas?"**
Porque você está **entregando a receita** para o Express usar a cada pedido. Com parênteses (`listar()`), você executaria a função **na hora**, sem pedido nenhum, e daria erro.

**"Qual a diferença entre `404` e `Cannot GET`?"**
Os dois são `404`. O `Cannot GET /caminho` é o Express dizendo que **a rota não existe**. O `{"erros":["... não encontrado"]}` é o **seu** controller dizendo que a rota existe, mas **aquele id** não.

**"Por que o `DELETE` não devolve nada?"**
Porque o `204` significa "feito, e não tenho nada para mostrar". O produto foi apagado: não há o que devolver. O `curl -i` mostra só a primeira linha e as etiquetas.

**"Quando eu uso `async` e `await`?"**
Sempre que a função pede algo ao **banco** (ou a outro serviço). Se esquecer o `await`, o `res.json` responde antes de o banco devolver os dados.

**"Posso usar o `sync()` no projeto final?"**
Não. Lá as tabelas são criadas por **migrations**, porque o `sync()` não altera tabelas que já existem (teste: acrescente um campo no model depois de criar a tabela e veja o `no such column`). O `sync()` serve para aprender e para protótipos.

**"Meu `.env` foi para o GitHub. E agora?"**
Troque **todas** as senhas que estavam nele e confira o `.gitignore`. Apagar o arquivo num commit novo não basta: o histórico continua mostrando o arquivo antigo.

---

**Conseguiu resolver tudo?** Ótimo! Agora tente o **desafio bônus** do README: escolha um negócio que você conhece e crie a API do CRUD dele, com rotas, controller e, se quiser, o banco. Quem cria o problema entende o conteúdo de verdade. 🚀
