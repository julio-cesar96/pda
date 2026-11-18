# ✅ Gabarito comentado

**Módulo 2 · Aula 3: Meu primeiro servidor Express**

Este arquivo tem o **código completo da aula** (Parte 2) e as respostas da **lista de exercícios para casa**. O gabarito do projeto de modelagem (Parte 1) está em [`gabarito-projeto.md`](gabarito-projeto.md) e sai depois do prazo de entrega dos trios.

> **Como usar o gabarito:** ele não serve para copiar. Serve para **comparar**. Primeiro tente sozinho(a). Depois confira o seu código com o daqui. Se o resultado do seu `curl` for igual ao esperado, **o seu código também está certo**, mesmo escrito de outro jeito.
>
> Se deu diferente, não apague tudo. Compare **linha por linha** e descubra onde está a diferença. Esse é o momento em que você mais aprende.

Tudo aqui foi testado com **Node.js 22**, **Express 5.3.0** e **Nodemon 3.1.14**.

---

## 📑 Sumário

- [✅ Gabarito comentado](#-gabarito-comentado)
  - [📑 Sumário](#-sumário)
  - [🚀 O servidor da aula: MercadoÁgil](#-o-servidor-da-aula-mercadoágil)
  - [Exercício 1: A bilheteria abriu 🟢](#exercício-1-a-bilheteria-abriu-)
  - [Exercício 2: A vitrine de eventos 🟡](#exercício-2-a-vitrine-de-eventos-)
  - [Exercício 3: O erro como pista 🟢](#exercício-3-o-erro-como-pista-)
  - [Exercício 4: A API da produtora 🔴](#exercício-4-a-api-da-produtora-)
  - [❓ Dúvidas que costumam aparecer](#-dúvidas-que-costumam-aparecer)

---

## 🚀 O servidor da aula: MercadoÁgil

O projeto completo está em [`livecoding/mercadoagil-api`](livecoding/mercadoagil-api/).

**`package.json`:**

```json
{
  "name": "mercadoagil-api",
  "version": "1.0.0",
  "description": "Primeiro servidor Express do MercadoÁgil (T8 · M2 · Aula 3)",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^5.3.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

**`index.js`:**

<!-- node:skip -->
```js
import express from 'express';

// Cria o servidor: a "cozinha" do MercadoÁgil
const app = express();

// Os dados ficam na memória por enquanto (o banco entra nas próximas aulas)
const produtos = [
  { id: 1, nome: 'Mouse', preco: 120 },
  { id: 2, nome: 'Teclado', preco: 350 },
  { id: 3, nome: 'Livro de JavaScript', preco: 80 },
];

const vendedores = [
  { id: 1, nomeLoja: 'TechBahia' },
  { id: 2, nomeLoja: 'Livraria Sol' },
];

// Rota: quando chegar um GET em "/", responde com um texto
app.get('/', (req, res) => {
  res.send('Bem-vindo à API do MercadoÁgil!');
});

// Rota: quando chegar um GET em "/produtos", responde com a lista em JSON
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Rota criada no Bloco 4, com o Nodemon ligado (sem reiniciar o servidor à mão)
app.get('/vendedores', (req, res) => {
  res.json(vendedores);
});

// Liga o servidor na porta 3000. Se a porta estiver ocupada, o "erro" conta o motivo
app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('Servidor do MercadoÁgil rodando em http://localhost:3000');
  }
});
```

**Para rodar:** `npm install` e depois `npm run dev`.

**Resultado dos testes:**

```bash
curl http://localhost:3000/
curl http://localhost:3000/produtos
curl http://localhost:3000/vendedores
```

```
Bem-vindo à API do MercadoÁgil!
[{"id":1,"nome":"Mouse","preco":120},{"id":2,"nome":"Teclado","preco":350},{"id":3,"nome":"Livro de JavaScript","preco":80}]
[{"id":1,"nomeLoja":"TechBahia"},{"id":2,"nomeLoja":"Livraria Sol"}]
```

**Por que as rotas ficam antes do `app.listen`?** Por organização: primeiro você escreve o cardápio, depois abre a porta. O Express aceita rotas registradas depois, mas o código fica mais fácil de ler com o `listen` sempre no fim.

---

## Exercício 1: A bilheteria abriu 🟢

```bash
mkdir casa1
cd casa1
npm init -y
# adicione "type": "module" no package.json
npm install express
```

<!-- node:skip -->
```js
import express from 'express';

const app = express();

// Passo 3: a porta de entrada
app.get('/', (req, res) => {
  res.send('Bem-vindo ao IngressoÁgil! Ingressos para a cultura da sua cidade.');
});

// Passo 2: liga o servidor e avisa no terminal
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
HTTP/1.1 200 OK
...
Bem-vindo ao IngressoÁgil! Ingressos para a cultura da sua cidade.
```

```
<pre>Cannot GET /eventos</pre>
```

**Por que funciona:** o `app.get('/')` coloca um item no cardápio. O pedido `GET /` encontra esse item e recebe `200` + o texto. O pedido `GET /eventos` **chega** ao servidor (ele está ligado), mas não existe no cardápio, por isso volta `404` com `Cannot GET /eventos`. Esse erro é o resultado **certo** do passo 4.

---

## Exercício 2: A vitrine de eventos 🟡

**`package.json`** (o bloco que importa):

```json
"type": "module",
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

<!-- node:skip -->
```js
import express from 'express';

const app = express();

const eventos = [
  { id: 1, nome: 'Slam das Minas', data: '2026-12-05', preco: 20 },
  { id: 2, nome: 'Batalha da Estação', data: '2026-12-12', preco: 15 },
  { id: 3, nome: 'Roda de Samba de Fim de Ano', data: '2026-12-20', preco: 30 },
];

// Passo 2: a lista inteira
app.get('/eventos', (req, res) => {
  res.json(eventos);
});

// Passo 3: só os de até R$ 20. O filter cria um array NOVO
app.get('/eventos/baratos', (req, res) => {
  const baratos = eventos.filter((evento) => evento.preco <= 20);
  res.json(baratos);
});

// Passo 4: um objeto com a quantidade
app.get('/eventos/quantidade', (req, res) => {
  res.json({ quantidade: eventos.length });
});

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui abrir a bilheteria:', erro.message);
  } else {
    console.log('Bilheteria do IngressoÁgil aberta em http://localhost:3000');
  }
});
```

**Resultado no terminal** (um `curl` por passo):

```
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30}]
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15}]
{"quantidade":3}
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30}]
```

**Por que funciona:**

- O **passo 5** é a prova de que o `filter` não estragou o original: ele devolve um array **novo**, e o `eventos` continua com 3. É a mesma ideia da cópia com spread do M1.
- O `res.json` aceita **qualquer** valor de JS: array (passos 2 e 3) ou objeto (passo 4).

**Outra forma que também está certa:** no passo 3, mandar o `filter` direto, sem variável: `res.json(eventos.filter((evento) => evento.preco <= 20));`.

**Discordância que vale ouvir:** "`/eventos/baratos` é um bom nome REST?" Funciona, mas o padrão do mercado para filtros é outro (`/eventos?precoMaximo=20`), que vamos ver quando a turma aprender a ler o que vem no `req`. Se você pensou nisso, ótimo sinal.

---

## Exercício 3: O erro como pista 🟢

Exemplo de comentário no topo do `index.js` (qualquer explicação com a mesma ideia vale):

<!-- node:skip -->
```js
// 1) Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express' imported from .../casa3/index.js
//    O package.json tem o Express na lista, mas a pasta node_modules não veio junto.
//    Conserto: npm install (ele lê a lista do package.json e instala tudo).
//
// 2) Não consegui abrir a bilheteria: listen EADDRINUSE: address already in use 0.0.0.0:3000
//    Já tinha um servidor atendendo na porta 3000. Só cabe um por porta.
//    Conserto: Ctrl + C no terminal do primeiro servidor (ou mudar a porta).
//
// 3) <pre>Cannot GET /evento</pre>
//    O servidor está ligado e respondeu 404: a rota /evento (singular) não existe.
//    Diferença para o exercício 1: lá a rota /eventos não existia ainda; aqui o caminho
//    está escrito errado. Nos dois casos o servidor está funcionando.
//    Conserto: usar o caminho certo (ou criar a rota, se ela deveria existir).
//
// 4) sh: 1: nodemon: not found
//    O script "dev" chama o Nodemon, mas ele não está instalado neste projeto.
//    Conserto: npm install -D nodemon
```

**Por que esse exercício importa:** os 4 erros têm uma coisa em comum: **a mensagem já diz o que aconteceu**. `Cannot find package`, `address already in use`, `Cannot GET`, `not found`. Quem lê a mensagem inteira antes de mexer no código resolve em segundos.

**Atenção à mensagem do passo 2:** ela só aparece porque o nosso `app.listen` tem o `if (erro)`. Sem ele, no Express 5, o segundo servidor mostraria a mensagem de "aberta" e **fecharia em silêncio**, sem atender ninguém. Um terminal que mente é pior que um terminal com erro.

---

## Exercício 4: A API da produtora 🔴

**`src/dados.js`:** igual ao do enunciado.

**`index.js`:**

<!-- node:skip -->
```js
// Clear Thinking: a rota /clientes é usada pelo painel da produtora, e a tela pode
// aparecer num telão, num print, num computador compartilhado do espaço cultural.
// Email e CPF são dados pessoais (LGPD): quem vê a lista não precisa deles para nada,
// e se vazarem, a Joana, o Caio e a Lia é que levam o golpe.
//
// Discordância Positiva: discordo de /pegarResumoDaProdutora. Quem diz a ação é o
// método (GET); o caminho é o substantivo. /resumo segue o padrão das outras rotas
// e qualquer pessoa do time adivinha o nome sem perguntar.
//
// O mapa:
// | Método | Caminho   | Quem usa                                    |
// | GET    | /espacos  | Painel da produtora, página "onde é"        |
// | GET    | /eventos  | App do cliente (vitrine) e painel           |
// | GET    | /clientes | Painel da produtora (sem email e sem CPF)   |
// | GET    | /resumo   | Painel da produtora (números do dia)        |

import express from 'express';
import { espacos, eventos, clientes, itensCompra } from './src/dados.js';

const app = express();

// Passo 2: GET /espacos
app.get('/espacos', (req, res) => {
  res.json(espacos);
});

// Passo 3: GET /eventos, cada evento com o NOME do espaço (o "JOIN" feito à mão)
app.get('/eventos', (req, res) => {
  const eventosComEspaco = eventos.map((evento) => {
    const espaco = espacos.find((e) => e.id === evento.espacoId);
    return { ...evento, espaco: espaco.nome };
  });
  res.json(eventosComEspaco);
});

// Passo 4: GET /clientes, só o que pode aparecer (rest tira email e cpf)
app.get('/clientes', (req, res) => {
  const clientesPublicos = clientes.map((cliente) => {
    const { email, cpf, ...publico } = cliente;
    return publico;
  });
  res.json(clientesPublicos);
});

// Passo 5: GET /resumo, os números que a produtora acompanha
app.get('/resumo', (req, res) => {
  const ingressosVendidos = itensCompra.reduce((soma, item) => soma + item.quantidade, 0);
  const faturamento = itensCompra.reduce((soma, item) => soma + item.quantidade * item.precoPago, 0);
  res.json({ eventos: eventos.length, ingressosVendidos, faturamento });
});

// Passo 1: liga o servidor
app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui abrir a bilheteria:', erro.message);
  } else {
    console.log('API da produtora rodando em http://localhost:3000');
  }
});
```

**Resultado no terminal:**

```
API da produtora rodando em http://localhost:3000
```

```
[{"id":1,"nome":"Galpão Arte Viva","endereco":"Rua das Flores, 100"},{"id":2,"nome":"Quadra do Samba","endereco":"Av. Central, 50"}]
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20,"espacoId":1,"espaco":"Galpão Arte Viva"},{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15,"espacoId":1,"espaco":"Galpão Arte Viva"},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30,"espacoId":2,"espaco":"Quadra do Samba"}]
[{"id":1,"nome":"Joana Reis"},{"id":2,"nome":"Caio Melo"},{"id":3,"nome":"Lia Santos"}]
{"eventos":3,"ingressosVendidos":7,"faturamento":160}
```

**Por que funciona, passo a passo:**

- **Passo 3:** o `map` passa por cada evento; o `find` acha o espaço com o mesmo id (é o `JOIN ... ON espaco.id = evento.espaco_id` da Aula 2, feito em JS); o spread cria uma **cópia** do evento com o campo `espaco`. O array `eventos` original não muda.
- **Passo 4:** o rest separa `email` e `cpf` e junta **o que sobrou** em `publico`. É o mesmo truque do CPF da Ana, no M1. Alguns editores mostram `email` e `cpf` "apagados" (variáveis não usadas): é esperado.
- **Passo 5:** conta à mão: ingressos = 2 + 1 + 1 + 2 + 1 = **7**; faturamento = 40 + 15 + 25 + 60 + 20 = **160**. É o mesmo total do projeto de modelagem (85 + 60 + 15), agora calculado em JS.

**Outra forma que também está certa:** o rest direto nos ingredientes da arrow function: `clientes.map(({ email, cpf, ...publico }) => publico)`.

---

## ❓ Dúvidas que costumam aparecer

**"O meu código está escrito diferente, mas o `curl` deu igual. Está errado?"**
Não. Se o status e o JSON são iguais aos esperados, está certo.

**"Mudei o código e nada mudou."**
O servidor só lê o arquivo quando liga. Reinicie (`Ctrl + C` e ligue de novo) ou use `npm run dev`.

**"Por que `localhost`? Outras pessoas conseguem acessar a minha API?"**
`localhost` quer dizer "este computador". Por enquanto, só você acessa. Colocar a API na internet (o deploy) é parte do projeto final do M2.

**"Para que serve o `req`, se a gente não usa?"**
É o pedido que chegou, com tudo o que o cliente mandou. Hoje as rotas só **mostram** dados, então não precisamos ler nada do pedido. Ele vai ser essencial quando o cliente começar a **enviar** dados (um pedido novo, por exemplo), nas próximas aulas.

**"Na internet os exemplos usam `const express = require('express')`."**
É o jeito antigo (CommonJS). Neste curso usamos `import`, porque o projeto tem `"type": "module"`. Se misturar, aparece `require is not defined in ES module scope`.

**"O `npm install -D nodemon` disse que tem vulnerabilidades. Instalei algo perigoso?"**
São avisos sobre bibliotecas que o Nodemon usa por dentro, e ele só roda no seu computador, durante o desenvolvimento. Não rode `npm audit fix --force`: ele troca a versão do Nodemon e pode quebrar o projeto.

---

**Conseguiu resolver tudo?** Agora tente **inventar o seu próprio exercício**: escolha um negócio do seu bairro (uma barbearia, uma lanchonete, uma loja de roupas), escreva os dados em arrays e crie 3 rotas `GET` com o mapa da API. Quem consegue criar o problema entende o conteúdo de verdade. 🚀