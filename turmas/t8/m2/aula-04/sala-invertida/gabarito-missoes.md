# ✅ Gabarito das missões da sala invertida

**Módulo 2 · Aula 4: Rotas e controladores + Conectando com o banco de dados**

Este arquivo diz **o que cada mini-aula precisava mostrar**, as respostas das tarefas e das perguntas, e os erros que os grupos deviam encontrar. Ele é publicado **depois** das apresentações.

> **Como usar:** comparem com o que o grupo de vocês fez. Se vocês chegaram ao mesmo resultado por outro caminho, ou com outra analogia, **está certo**. Se o grupo discordou de algo daqui com um bom argumento, melhor ainda: tragam para a próxima aula.

---

## 📑 Sumário

1. [Missão 1: express.Router e controllers](#-missão-1-expressrouter-e-controllers)
2. [Missão 2: o CRUD](#-missão-2-o-crud)
3. [Missão 3: middleware de log e variáveis de ambiente](#-missão-3-middleware-de-log-e-variáveis-de-ambiente)
4. [Missão 4: Sequelize](#-missão-4-sequelize)
5. [Erros que os grupos costumam encontrar no estudo em casa](#-erros-que-os-grupos-costumam-encontrar-no-estudo-em-casa)

---

## 🧩 Missão 1: express.Router e controllers

### O que a mini-aula precisava mostrar

- O **problema**: um arquivo único com todas as rotas, editado por várias pessoas (conflito no Git, arquivo difícil de ler, ninguém sabe de quem é cada parte).
- As **três camadas**: o `index.js` encaminha, o arquivo de rotas escolhe a função, o controller responde.
- Que, **para quem usa a API, nada muda**: o `curl` dá a mesma resposta nos dois jeitos.

### A resposta da pergunta-gatilho

Com 40 rotas e 3 devs no mesmo arquivo: conflitos no Git toda vez que alguém junta o trabalho, medo de mexer na parte do outro, um arquivo enorme que ninguém consegue ler inteiro. A solução é **um arquivo de rotas e um controller por recurso**: cada dev fica dono dos seus arquivos.

### O resultado da tarefa 1 (igual nos dois jeitos)

```
[{"id":1,"nome":"Mouse","preco":120},{"id":2,"nome":"Teclado","preco":350},{"id":3,"nome":"Livro de JavaScript","preco":80}]
[{"id":1,"nomeLoja":"TechBahia"},{"id":2,"nomeLoja":"Livraria Sol"}]
```

### A tarefa "mudar uma coisa": `GET /categorias`

**`controllers/categoriasController.js`** (arquivo novo):

<!-- node:skip -->
```js
// O cozinheiro da praça de categorias
const categorias = [
  { id: 1, nome: 'eletronicos' },
  { id: 2, nome: 'livros' },
  { id: 3, nome: 'casa' },
];

// GET /categorias
export function listar(req, res) {
  res.json(categorias);
}
```

**`routes/categorias.js`** (arquivo novo):

<!-- node:skip -->
```js
import express from 'express';
import { listar } from '../controllers/categoriasController.js';

// A seção "Categorias" do cardápio
export const rotasCategorias = express.Router();

rotasCategorias.get('/', listar);
```

**No `index.js`**, duas linhas novas (uma com os outros `import`, outra com os outros `app.use`):

<!-- node:skip -->
```js
import { rotasCategorias } from './routes/categorias.js';
app.use('/categorias', rotasCategorias);
```

**Resultado:**

```
[{"id":1,"nome":"eletronicos"},{"id":2,"nome":"livros"},{"id":3,"nome":"casa"}]
```

### O erro esperado

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../missao-1/routes/produtos' imported from .../missao-1/index.js
Did you mean to import "./routes/produtos.js"?
```

Com `"type": "module"`, todo `import` de arquivo **seu** precisa do `.js`. O Node sugere a correção na segunda linha.

### A pergunta sugerida para a turma

*"Se a pessoa dos cupons errar uma vírgula em `routes/cupons.js`, a vitrine de produtos continua funcionando?"*

**Não.** É uma pegadinha boa. Um erro de sintaxe em **qualquer** arquivo importado impede o servidor **inteiro** de ligar. Testamos:

```
file:///.../routes/cupons.js:3
rotasCupons.get('/', (req, res) => { res.json([{ codigo: 'PDA15' }] })
                                                                  ^

SyntaxError: missing ) after argument list
```

O que a separação ganha é outra coisa: a mensagem aponta **direto** para o `routes/cupons.js`, linha 3, e todo mundo sabe **de quem** é aquele arquivo. Separar não deixa o código à prova de erro; deixa o erro **fácil de achar** e o trabalho fácil de dividir. Se o grupo respondeu "sim", é uma ótima chance de praticar a Discordância Positiva com o próprio material.

### Quem usa isso no mercado, e para quê?

Praticamente toda API Node.js de empresa. Exemplo: num app de delivery, um time cuida de `routes/pedidos.js`, outro de `routes/pagamentos.js`; cada time trabalha nos seus arquivos sem travar o outro. É a estrutura que o projeto final do M2 pede.

---

## 🧩 Missão 2: o CRUD

### O que a mini-aula precisava mostrar

- Os **4 verbos**: `GET` (ver), `POST` (criar), `PUT` (trocar), `DELETE` (apagar). O caminho é sempre o substantivo (`/produtos`).
- O **`:id`** no caminho e o `req.params.id` (que chega como **texto**, por isso o `Number`).
- O **corpo** (`req.body`), que só existe com o `express.json()`.
- Os **status**: `200`, `201`, `204` e `404`, apontados na primeira linha do `curl -i`.

### A resposta da pergunta-gatilho

| O painel quer... | Pede | E fica sabendo pelo status |
|---|---|---|
| Cadastrar | `POST /produtos` + o produto no corpo | `201 Created` (com o produto e o `id` novo) |
| Mudar o preço | `PUT /produtos/4` + os dados novos no corpo | `200 OK` (ou `404`, se o produto não existe) |
| Tirar do ar | `DELETE /produtos/4` | `204 No Content` (ou `404`) |

### Os resultados da tarefa 1

```
HTTP/1.1 200 OK
{"id":2,"nome":"Teclado","preco":350}
HTTP/1.1 201 Created
{"id":4,"nome":"Monitor","preco":1600}
HTTP/1.1 200 OK
{"id":4,"nome":"Monitor 24 polegadas","preco":1500}
HTTP/1.1 204 No Content
HTTP/1.1 404 Not Found
{"erros":["Produto não encontrado"]}
```

### A tarefa "mudar uma coisa": `204` ou `200` no `DELETE`?

A mudança é uma linha no `remover`: trocar `res.status(204).send();` por `res.json(produto);`. Apagando o produto `2`:

```
HTTP/1.1 200 OK
{"id":2,"nome":"Teclado","preco":350}
```

**As duas versões estão certas**: vale a decisão do grupo, **se tiver argumento**. Dois argumentos bons:

- **A favor do `204`:** o produto não existe mais; não há o que mostrar. A resposta é menor, e o padrão é muito usado (e é o que o mapa da API da aula usa).
- **A favor do `200` com o produto:** o painel pode mostrar "Você apagou o Teclado. Desfazer?", usando os dados que voltaram.

### Os erros esperados

```
HTTP/1.1 500 Internal Server Error
TypeError: Cannot destructure property 'nome' of 'req.body' as it is undefined.
```

Sem o `express.json()`, ninguém abre o envelope: o `req.body` fica `undefined`, e o destructuring do M1 quebra. É `500` porque a culpa é **do servidor**. O **mesmo** erro aparece quando o `curl` vai sem o `-H "Content-Type: application/json"`.

```
HTTP/1.1 404 Not Found
<pre>Cannot POST /produtos/1</pre>
```

Para o Express, uma rota é **método + caminho**. Em `/produtos/1` existem `GET`, `PUT` e `DELETE`, mas não `POST`.

### A pergunta sugerida para a turma

*"Por que o `POST` vai em `/produtos`, sem id, e o `PUT` vai em `/produtos/4`, com id?"* Porque, no `POST`, o produto **ainda não existe**: quem cria o id é o servidor. No `PUT`, o produto **já existe**, e o caminho diz qual deles alterar.

### Quem usa isso no mercado, e para quê?

Todo painel administrativo: o vendedor que cadastra produtos, o RH que publica vagas, a produtora que cria eventos. O app decide o que mostrar na tela **pelo status**: `201` vira "Cadastrado!", `404` vira "Esse produto não existe mais".

---

## 🧩 Missão 3: middleware de log e variáveis de ambiente

### O que a mini-aula precisava mostrar

- O middleware como uma **parada no caminho** de todo pedido, com `req`, `res` e `next`.
- O log aparecendo no terminal do servidor a cada `curl`.
- O que acontece **sem o `next()`**: o pedido fica parado, e o servidor não mostra erro.
- O `.env` como **cofre**: o código usa `process.env.PORT`, e o valor mora fora do código. O `.env` não vai para o GitHub; o `.env.example` vai.

### A resposta da pergunta-gatilho

- **Que pedidos chegaram?** Um **middleware de log** anota cada pedido (no projeto final, também o status e a hora). Com o log, o time procura os pedidos daquele cliente perto das 14h.
- **Senha no código, código no GitHub:** a senha fica **pública**. Robôs vasculham o GitHub atrás de senhas o dia inteiro, e em minutos alguém pode copiar ou apagar o banco (com dados pessoais dos clientes: problema de **LGPD**). A senha vai para o `.env`, que fica no `.gitignore`.

### Os resultados das tarefas

Sem `.env`:

```
Porta lida do .env: undefined
Servidor do MercadoÁgil rodando em http://localhost:3000
📝 GET /produtos
```

Com o `.env` (`PORT=3001`):

```
Porta lida do .env: 3001
Servidor do MercadoÁgil rodando em http://localhost:3001
📝 GET /produtos
```

### O erro esperado

```
curl: (28) Operation timed out after 3002 milliseconds with 0 bytes received
```

O terminal do servidor mostra `📝 GET /produtos` e **mais nada**: a recepcionista anotou, mas não disse "pode passar". Sem o `--max-time`, o `curl` ficaria esperando por muito tempo.

**Bônus do `git status`:** o `.env` **não aparece**, porque o `.gitignore` (o do kit e o do repositório) tem a linha `.env`. O `.env.example` aparece normalmente.

### A pergunta sugerida para a turma

*"Uma colega subiu o `.env` para o GitHub e apagou no commit seguinte. Está resolvido?"* **Não.** O histórico do Git guarda o commit antigo, com o arquivo. O certo é **trocar as senhas** que vazaram e conferir o `.gitignore`.

### Quem usa isso no mercado, e para quê?

- **Log:** o time de suporte e o de back-end, para investigar reclamações e erros ("o que chegou às 14h?"). Em empresas maiores, os logs vão para ferramentas que juntam os de todos os servidores.
- **`.env`:** todo projeto que roda em mais de um lugar (o computador da dev, o servidor de testes, o de produção). No Render, por exemplo, as variáveis ficam no painel do serviço, e o `PORT` é escolhido pelo próprio Render.

---

## 🧩 Missão 4: Sequelize

### O que a mini-aula precisava mostrar

- O problema: dado na **memória** some quando o servidor reinicia.
- O **ORM** como tradutor entre JavaScript e SQL.
- O **model** (a ficha-modelo da tabela) e o **`sync()`** (cria a tabela se ela não existir).
- A **prova**: o `POST`, o reinício e o dado continuando lá.

### A resposta da pergunta-gatilho

Os produtos estavam num **array na memória** do programa. Reiniciar o servidor apaga a memória, e o array volta a ser o do código. Para o dado sobreviver, ele precisa morar **fora do programa**: num **banco**. Com o Sequelize, os produtos vão para o arquivo `mercadoagil.sqlite` (e, no projeto final, para o PostgreSQL).

### Os resultados das tarefas

```
HTTP/1.1 201 Created
{"id":1,"nome":"Monitor","preco":1600}
[{"id":1,"nome":"Monitor","preco":1600}]
```

Com o `logging: console.log`, o SQL aparece no terminal. As linhas principais:

```
Executing (default): CREATE TABLE IF NOT EXISTS `produto` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `nome` VARCHAR(255) NOT NULL, `preco` INTEGER NOT NULL);
Executing (default): INSERT INTO `produto` (`id`,`nome`,`preco`) VALUES (NULL,$1,$2);
```

O `CREATE TABLE` é quase igual ao da tabela `produto` que a turma escreveu na Aula 2. O `$1` e o `$2` são os lugares onde o Sequelize encaixa o nome e o preço com segurança.

### O erro esperado

```
HTTP/1.1 500 Internal Server Error
```

E, no terminal do servidor, uma pilha que começa só com `Error` e, mais abaixo:

```
  name: 'SequelizeDatabaseError',
  parent: [Error: SQLITE_ERROR: no such table: produto] {
```

Sem o `sync()`, a tabela não existe. A lição extra: **a mensagem útil não está na primeira linha**. Quem lê só o começo não acha o problema.

### O bônus: `no such column: estoque`

```
parent: [Error: SQLITE_ERROR: no such column: estoque] {
```

O `sync()` só **cria** tabelas que não existem; ele **nunca altera** uma tabela que já existe. O model ganhou o `estoque`, mas a tabela no arquivo continuou sem essa coluna. Para estudar, dá para apagar o `.sqlite` (e perder os dados). Num sistema de verdade, isso não é uma opção: por isso existem as **migrations**, que o projeto final exige.

### A pergunta sugerida para a turma

*"No projeto final, o banco vai ser o PostgreSQL. Quais arquivos do kit precisam mudar?"* Só a **conexão** (`config/db.js`), e o pacote instalado (`pg` no lugar do `sqlite3`). O model, o controller e as rotas continuam iguais. É a vantagem do tradutor: ele sabe falar o SQL de vários bancos.

### Quem usa isso no mercado, e para quê?

Quase toda API que guarda dados usa um ORM ou algo parecido: o Sequelize, o Prisma (o extra do projeto final), o TypeORM. Exemplo: o app de um banco digital guarda cada transferência; se ela sumisse num reinício, o dinheiro "sumiria" junto.

---

## 🐞 Erros que os grupos costumam encontrar no estudo em casa

| O que aparece | O que aconteceu | Como resolver |
|---|---|---|
| `listen EADDRINUSE: address already in use ...:3000` | Outro kit (ou o servidor da Aula 3) ainda está ligado | `Ctrl + C` no outro terminal |
| `curl: (7) Failed to connect to localhost port 3001` (Missão 3) | O `.env` não foi lido: o servidor está na `3000` | Confira o nome do arquivo (`.env`, sem `.example`) e reinicie com `rs` |
| O `.env` foi criado, mas a porta não mudou | O Nodemon não vigia o `.env` | `rs` + `Enter` no terminal do servidor |
| No Windows, o arquivo virou `.env.txt` | O Bloco de Notas acrescentou `.txt` | Crie o arquivo no VS Code |
| O produto criado sumiu sem reiniciar (Missões 2 e 4) | Um `.json` foi criado ou salvo com o servidor ligado, e o Nodemon reiniciou | Na memória, crie os `.json` antes de ligar. No banco, o produto continua lá |
| `Please install sqlite3 package manually` (Missão 4) | O `npm install` foi interrompido ou deu erro no `sqlite3` | Rode `npm install` de novo e leia a mensagem até o fim |
| Erros de `node-gyp` ou `Visual Studio` no `npm install` (Missão 4, Windows) | O `sqlite3` não achou a versão pronta e tentou compilar | Confira o Node 22 (`node -v`); se continuar, o grupo apresenta pelo computador do professor |
