# 🎟️ Projeto de modelagem + 🚀 Meu primeiro servidor Express

**Módulo 2 · Aula 3: do modelo de dados à primeira rota da API**

Esta aula tem duas partes. Na **Parte 1**, o seu trio fecha o bloco de Banco de Dados com um **projeto de modelagem** (DER, modelo normalizado e script SQL) e apresenta para a turma. Na **Parte 2**, você liga o seu **primeiro servidor Express** e cria a primeira rota da API do MercadoÁgil. No fim há uma lista com 4 exercícios para casa.

> **Regra de ouro (a mesma de sempre):** um passo, roda, confere. Escreva uma linha, rode, olhe o resultado. Se der erro, leia a mensagem com calma: ela é uma pista, não uma bronca.

---

## 📑 Sumário

1. [Como usar este material](#-como-usar-este-material)
2. [Vocabulário da aula](#-vocabulário-da-aula)
3. [Parte 1 · Projeto de modelagem: o IngressoÁgil](#-parte-1--projeto-de-modelagem-o-ingressoágil)
4. [Parte 2 · O cenário: o MercadoÁgil vai virar API](#-parte-2--o-cenário-o-mercadoágil-vai-virar-api)
5. [1. O que é uma API REST](#1-o-que-é-uma-api-rest)
6. [2. Preparando o projeto e ligando o servidor](#2-preparando-o-projeto-e-ligando-o-servidor)
7. [3. A primeira rota GET](#3-a-primeira-rota-get)
8. [4. Nodemon e o mapa da API](#4-nodemon-e-o-mapa-da-api)
9. [Resumo](#-resumo)
10. [Lista de exercícios para casa](#-lista-de-exercícios-para-casa)
11. [Erros comuns e o que eles significam](#-erros-comuns-e-o-que-eles-significam)

---

## 💻 Como usar este material

### Parte 1 (o projeto)

- **Desenho:** [Excalidraw](https://excalidraw.com), sem cadastro. Use o mesmo guia rápido e o **checklist de um bom DER** da [Aula 1](../aula-01/README.md#guia-rápido-do-excalidraw).
- **SQL:** o mesmo playground da Aula 2: [PGlite](https://pglite.dev) (principal) ou [Sqlime](https://sqlime.org) (se o PGlite não carregar).

### Parte 2 (o servidor)

1. Você precisa do **Node.js 22** (o mesmo do M1) e de **internet** para o `npm install`.
2. Abra o terminal na pasta do projeto. Para testar o servidor, use o **navegador** ou o **curl** num **segundo terminal**:

```bash
curl -i http://localhost:3000/produtos
```

> **No Windows (PowerShell),** escreva `curl.exe` em vez de `curl`. No PowerShell, `curl` sozinho é outro comando, que mostra a resposta de um jeito diferente.

3. **Digite o código** em vez de copiar e colar. O código pronto da aula está em [`livecoding/mercadoagil-api`](livecoding/mercadoagil-api/), para você comparar com o seu.
4. Para **desligar** o servidor, clique no terminal dele e aperte `Ctrl + C`.

Este material foi testado com **Node.js 22**, **Express 5.3** e **Nodemon 3.1**. O SQL foi conferido no **PostgreSQL 18** (PGlite) e no **SQLite**, e deu igual nos dois.

---

## 📖 Vocabulário da aula

| Palavra | Significado simples |
|---|---|
| Servidor | O programa que fica **ligado esperando pedidos** e responde a cada um (a **cozinha**) |
| Cliente | Quem **faz o pedido**: o navegador, o app do celular, o `curl` |
| Requisição | O **pedido** que o cliente envia ao servidor |
| Resposta | O que o servidor **devolve** (o **prato**) |
| API | O **cardápio** de pedidos que um sistema aceita, para outros programas usarem |
| Rota | **Um item do cardápio**: um método + um caminho (`GET /produtos`) |
| Método `GET` | O tipo de pedido "**me mostra**": buscar dados, sem mudar nada |
| URL | O **endereço** do pedido: `http://localhost:3000/produtos` |
| `localhost` | "**Este computador**": o servidor está rodando na sua máquina |
| Porta (`3000`) | O **número do balcão** onde o servidor atende |
| JSON | O **formato** em que os dados viajam (parece um objeto de JS) |
| Status (código) | O número que diz **como foi o pedido**: `200` = deu certo, `404` = não achei |
| REST | Um **jeito combinado** de organizar o cardápio: o caminho diz **o quê**, o método diz **o que fazer** |
| Express | A **biblioteca** que ajuda a criar o servidor e as rotas em Node.js |
| Nodemon | Um **ajudante** que reinicia o servidor sozinho quando você salva o arquivo |
| `npm install -D` | Instalar uma ferramenta **só para desenvolver** (não vai para o servidor de verdade) |
| Script do npm | Um **atalho** no `package.json`: `npm run dev` roda o comando que você escreveu lá |

---

## 🎟️ Parte 1 · Projeto de modelagem: o IngressoÁgil

**Formato:** trio, em sala separada (breakout room). **Tempo:** 30 minutos de trabalho + apresentação relâmpago de 2 minutos por trio.

### 🎯 O cenário

> O **IngressoÁgil** é uma plataforma que vende ingressos para eventos culturais independentes da cidade: slam, batalha de rima, roda de samba. Cada **evento** acontece em um **espaço cultural**, que tem nome e endereço; um espaço recebe vários eventos. Cada evento tem nome, data e o **preço atual** do ingresso. Os **clientes** (nome e email) fazem **compras** pelo app, e cada compra tem uma data. Em uma mesma compra o cliente pode levar **ingressos de vários eventos**, e de cada evento pode levar mais de um. O preço muda por **lote** (o 1º lote é mais barato), mas o cliente sempre paga o preço que estava valendo **no dia da compra**. Hoje a Roda de Samba custa **R$ 30**; o 1º lote saiu por **R$ 25**.

A produtora controla tudo nesta planilha:

| compra | data_compra | cliente | email | eventos | datas_evento | espaco | endereco_espaco | quantidades | precos_pagos |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-11-20 | Joana Reis | joana@email.com | Slam das Minas, Batalha da Estação | 2026-12-05, 2026-12-12 | Galpão Arte Viva | Rua das Flores, 100 | 2, 1 | 20, 15 |
| 2 | 2026-11-21 | Caio Melo | caio@email.com | Roda de Samba de Fim de Ano | 2026-12-20 | Quadra do Samba | Av. Central, 50 | 1 | 25 |
| 3 | 2026-11-25 | Joana Reis | joana@email.com | Roda de Samba de Fim de Ano | 2026-12-20 | Quadra do Samba | Av. Central, 50 | 2 | 30 |
| 4 | 2026-11-26 | Lia Santos | lia@email.com | Slam das Minas | 2026-12-05 | Galpão Arte Viva | Rua das Flores, 100 | 1 | 20 |

Preços atuais: **Slam das Minas R$ 20**, **Batalha da Estação R$ 15**, **Roda de Samba de Fim de Ano R$ 30**.

**O que o trio vai fazer:** transformar essa planilha num **banco de verdade**, usando tudo do bloco: método dos 5 passos, cardinalidade, 1FN/2FN/3FN, `CREATE TABLE`, `INSERT` e uma consulta com `JOIN` e `GROUP BY`.

### 📦 O que o trio entrega

| # | Entregável | Formato |
|---|---|---|
| 1 | **DER** | Imagem PNG exportada do Excalidraw (ou o link) |
| 2 | **Modelo normalizado** | `modelo-normalizado.md`, no mesmo esqueleto da Aula 1 (tabela, PK, FK) |
| 3 | **Script SQL** | `ingressoagil.sql` com os `CREATE TABLE`, os `INSERT` e a consulta de conferência |

**Entrega mínima na aula:** o DER e o modelo normalizado (é o que vocês apresentam).
**Entrega completa:** os 3 arquivos, no canal da turma, no prazo que o professor combinar.

### 🧭 Como o trio trabalha (High Agency na prática)

**Os papéis** (trocam **a cada passo**):

| Papel | O que faz |
|---|---|
| **Pilota** | Desenha ou digita |
| **Navegadora** | Lê o enunciado, confere o resultado esperado e **propõe outra forma** quando discordar |
| **Guardiã do tempo** | Avisa quando o tempo do passo acabou e anota as decisões para a apresentação |

- **Bias to Action:** um rascunho feio **agora** vale mais que um modelo perfeito no fim. Rodem o SQL **tabela por tabela**, não tudo de uma vez.
- **Clear Thinking:** antes de criar uma tabela ou um campo, respondam em voz alta: **"quem usa essa informação e para quê?"** (a produtora? o cliente? o espaço?).
- **Discordância Positiva:** em **pelo menos 2 decisões**, a navegadora propõe **outra forma de modelar**. O trio testa as duas e escolhe **por argumento**, não por quem fala mais alto. Uma dessas decisões vai para a apresentação.

### 🪜 Os passos

Confiram o **resultado esperado** antes de seguir. Os passos 4 e 5 acontecem **ao mesmo tempo**: uma pessoa desenha, as outras duas escrevem o SQL.

**Passo 1 (4 min): Grifar.** Leiam o cenário. Grifem os **substantivos** (candidatas a entidade) e os **verbos** (relacionamentos).
> Resultado esperado: **4 entidades** com dados próprios (espaço, evento, cliente, compra) e **3 relacionamentos** ("recebe", "faz", "inclui"). Nome, endereço, data, preço e email **não** são entidades: são campos. Uma das ligações é **N:N**: descubram qual.

**Passo 2 (5 min): 1ª forma normal.** Na planilha, as colunas `eventos`, `datas_evento`, `quantidades` e `precos_pagos` têm **listas dentro da célula**. Reescrevam a planilha com **uma linha por evento comprado**.
> Resultado esperado: **5 linhas** (a compra 1 vira 2 linhas). A chave passa a ser a dupla **(compra, evento)**.

**Passo 3 (5 min): 2ª e 3ª formas normais.** Com a chave (compra, evento), quais colunas dependem **só da compra**? Quais dependem **só do evento**? E alguma coluna depende de **outra coluna que não é a chave**? Separem em tabelas, deem um `id` a cada uma e escrevam o `modelo-normalizado.md`.
> Resultado esperado: **5 tabelas finais**, cada uma com PK. A tabela que liga compra e evento guarda a **quantidade** e o **preço pago** (o preço do dia, não o de hoje). O endereço **não** fica no evento, e o email **não** fica na compra.

**Passo 4 (13 min, em paralelo com o Passo 5): O DER no Excalidraw.** Uma pessoa desenha as 5 caixas, as linhas com verbo e `1`/`N`, as PKs e FKs. A tabela que resolve o N:N vai em **verde**.
> Resultado esperado: **5 caixas**, **4 linhas**, **nenhuma linha N:N direta**, e o DER passa no **checklist de um bom DER** da Aula 1.

**Passo 5 (13 min, em paralelo com o Passo 4): O script SQL.** As outras duas pessoas (pilota digita, navegadora dita os dados da planilha) escrevem o `ingressoagil.sql` e **rodam no PGlite uma tabela de cada vez**. Comecem por este esqueleto:

```sql
-- IngressoÁgil · Trio: <nome 1>, <nome 2>, <nome 3>

-- 1) Tabelas: crie primeiro as que NÃO têm chave estrangeira
CREATE TABLE espaco (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  endereco TEXT NOT NULL
);

-- ... as outras 4 tabelas (lembre do REFERENCES da Aula 2)

-- 2) Dados da planilha: insira primeiro quem é apontado pela FK
INSERT INTO espaco (id, nome, endereco) VALUES
  (1, 'Galpão Arte Viva', 'Rua das Flores, 100'),
  (2, 'Quadra do Samba', 'Av. Central, 50');

-- ... os outros INSERT
```

> Resultado esperado: o script roda **do começo ao fim sem erro** num playground recém-aberto, com **3 eventos**, **3 clientes**, **4 compras** e **5 linhas** na tabela que liga compra e evento. Confiram cada uma com `SELECT COUNT(*) FROM <tabela>;`.

**Passo 6 (3 min): A consulta de conferência.** Escrevam a consulta que responde à pergunta da produtora: **"quantos ingressos cada evento vendeu e quanto faturou?"** (faturamento = soma de `quantidade * preço pago`). Ordenem do maior faturamento para o menor.
> Resultado esperado (os nomes das colunas podem mudar; **os números não**):
> ```
>             nome             | ingressos | faturamento
> -----------------------------+-----------+-------------
>  Roda de Samba de Fim de Ano |         3 |          85
>  Slam das Minas              |         3 |          60
>  Batalha da Estação          |         1 |          15
> (3 linhas)
> ```
> Se a Roda de Samba deu **90**, o seu modelo está usando o **preço de hoje**, e não o preço pago no dia. Volte ao Passo 3.

**🚀 Desafio extra (se sobrar tempo ou em casa): a meia-entrada.** O mesmo evento agora tem **inteira** e **meia** (metade do preço). Na mesma compra, a Joana pode levar 1 inteira e 1 meia do Slam.
1. Onde essa informação fica no seu modelo? A chave da tabela que liga compra e evento continua a mesma?
2. **Discordância Positiva:** uma pessoa do trio defende "uma coluna `tipo` no item"; outra defende "uma tabela `TIPO_INGRESSO`". Defendam cada lado com **um argumento** e escolham.

**Pergunta para responder em trio** (num comentário no topo do `ingressoagil.sql`): a produtora pediu para guardar o **CPF de todo comprador**, "por via das dúvidas". O trio concorda? Escrevam **uma frase pensando na produtora** e **uma pensando na cliente**.

### 🎤 A apresentação relâmpago (2 min por trio)

1. **30 s:** mostrem o DER.
2. **60 s:** contem **uma decisão em que vocês discordaram**, as duas opções e o **argumento** que venceu.
3. **30 s:** o resultado da consulta de conferência (se já rodou) **ou** o que falta e o próximo passo.

Depois de cada apresentação, o **trio seguinte** faz **uma pergunta** ou propõe **uma melhoria** ao modelo, com argumento. É Discordância Positiva com outro time, como numa revisão de código de verdade.

### ✅ Checklist antes de entregar

- [ ] O DER passa no **checklist de um bom DER** (toda entidade tem PK, toda FK tem linha, nenhuma N:N direta, toda linha tem verbo e `1`/`N`).
- [ ] O `modelo-normalizado.md` tem as **5 tabelas**, com PK e FK.
- [ ] O `ingressoagil.sql` roda **do zero, sem erro**, num playground recém-aberto.
- [ ] A consulta de conferência dá **85, 60 e 15**.
- [ ] O comentário com a resposta sobre o CPF está no topo do script.
- [ ] Cada pessoa do trio consegue explicar, **com as próprias palavras**, por que o preço pago fica no item e não no evento.
- [ ] Anotamos **onde travamos e o que tentamos** (vale para a retrospectiva).

---

## 🚀 Parte 2 · O cenário: o MercadoÁgil vai virar API

O banco do MercadoÁgil está pronto (Aulas 1 e 2). Mas quem vai **usar** esses dados? O **app do celular**, o **site** e o **painel do vendedor**. Nenhum deles fala SQL, e nenhum deles deveria ter acesso direto ao banco.

Entre os clientes e o banco existe um programa no meio: o **servidor**. Ele recebe os pedidos, busca os dados e devolve uma resposta. O conjunto de pedidos que ele aceita é a **API**.

Hoje vamos ligar o primeiro servidor do MercadoÁgil e criar a primeira rota, a que mostra os produtos. É o começo do **projeto final do M2** (a API de Pedidos).

> **🎨 Em uma frase:** o cliente faz um pedido, o servidor responde. A API é o cardápio do que dá para pedir.

---

## 1. O que é uma API REST

**Por que usar?** Pense num **restaurante**. Você (o **cliente**) não entra na cozinha: você faz um **pedido** ao garçom, olhando o **cardápio**. A **cozinha** (o **servidor**) prepara e devolve o **prato** (a **resposta**). Se você pede algo que não está no cardápio, ouve: "isso a gente não tem".

| No restaurante | Na API |
|---|---|
| Cliente | Navegador, app, `curl` |
| Pedido | **Requisição**: método + endereço (`GET /produtos`) |
| Cardápio | As **rotas** que o servidor conhece |
| Cozinha | O **servidor** (Express) |
| Prato | A **resposta**: um **status** + os dados em **JSON** |
| "Isso a gente não tem" | Status **404** |

**REST** é um jeito combinado de escrever o cardápio, para todo mundo entender:

- o **caminho** diz **o quê** (o recurso, um substantivo no plural): `/produtos`, `/vendedores`;
- o **método** diz **o que fazer**: `GET` = **buscar** (me mostra). Os outros métodos (criar, alterar, apagar) ficam para as próximas aulas.

### Aonde vamos chegar hoje

No fim da aula, este pedido vai funcionar na sua máquina:

```bash
curl -i http://localhost:3000/produtos
```

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 124
ETag: W/"7c-7+DcpzEL7nUC1o46IzwF5tROYVg"
Date: Wed, 18 Nov 2026 16:08:47 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"nome":"Mouse","preco":120},{"id":2,"nome":"Teclado","preco":350},{"id":3,"nome":"Livro de JavaScript","preco":80}]
```

Olhe só **duas partes**:

1. **A primeira linha:** `200 OK` é o **status**. Deu certo.
2. **A última linha:** os **dados**, em JSON. É o array de produtos, igual a um array de objetos do JS.

As linhas do meio são **etiquetas** (cabeçalhos) que dizem, por exemplo, que o conteúdo é JSON. A `Date` e o `ETag` mudam a cada vez.

> **🎨 Em uma frase:** o cliente pede `GET /produtos`, o servidor procura no cardápio e devolve `200` + os dados (ou `404` se não tem).

**💬 E daí?** Um único servidor atende o app, o site e o painel do vendedor ao mesmo tempo, porque todos falam a mesma língua (HTTP + JSON). Construir APIs é o dia a dia de quem trabalha com **back-end**: é o que a vaga pede quando diz "Node.js e APIs REST".

**✅ Checkpoint:** na resposta acima, qual parte diz se o pedido deu certo? E qual parte o app do MercadoÁgil vai usar para montar a vitrine?

<details>
<summary>💡 Ver resposta</summary>

O **status**, na primeira linha (`200 OK`), diz se deu certo. O app usa o **corpo**, na última linha: o JSON com os produtos.

</details>

---

## 2. Preparando o projeto e ligando o servidor

**Por que usar?** Criar um servidor "na mão" com o Node puro dá muito trabalho. O **Express** é uma **biblioteca** (lembra do Zod?) que já traz a cozinha montada: você só escreve o cardápio.

### Criando o projeto

No terminal, um comando de cada vez:

```bash
mkdir mercadoagil-api
cd mercadoagil-api
npm init -y
```

Abra o `package.json` e **adicione a linha** `"type": "module"`, como no M1. Ela avisa o Node de que vamos usar `import`.

### Primeiro, o problema

Crie o arquivo `index.js` e escreva:

<!-- node:skip -->
```js
import express from 'express';

// Cria o servidor: a "cozinha" do MercadoÁgil
const app = express();
```

Rode com `node index.js`:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express' imported from /.../mercadoagil-api/index.js
```

O Node não achou o Express porque ele **ainda não está no projeto**. Lembra do `npm install zod`? É a mesma coisa:

```bash
npm install express
```

```
added 65 packages, and audited 66 packages in 880ms
...
found 0 vulnerabilities
```

Aparece a pasta `node_modules`, e o `package.json` ganha:

```json
"dependencies": {
  "express": "^5.3.0"
}
```

### Ligando o servidor

Complete o `index.js`:

<!-- node:skip -->
```js
import express from 'express';

// Cria o servidor: a "cozinha" do MercadoÁgil
const app = express();

// Liga o servidor na porta 3000. Se a porta estiver ocupada, o "erro" conta o motivo
app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('Servidor do MercadoÁgil rodando em http://localhost:3000');
  }
});
```

```bash
node index.js
```

```
Servidor do MercadoÁgil rodando em http://localhost:3000
```

Repare: o terminal **não volta**. O servidor ficou **ligado, esperando pedidos**. Para desligar, `Ctrl + C`.

> **Por que o `(erro) => { ... }`?** No Express 5, se a porta já estiver ocupada, o servidor **não liga**, mas também **não reclama sozinho**. O `if (erro)` é o jeito de ele contar o problema. Vamos provocar esse erro na seção 4.

### O cardápio está vazio

Com o servidor ligado, abra `http://localhost:3000` no navegador, ou num **segundo terminal**:

```bash
curl -i http://localhost:3000/
```

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 139
Date: Wed, 18 Nov 2026 16:04:44 GMT
Connection: keep-alive
Keep-Alive: timeout=5

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /</pre>
</body>
</html>
```

`Cannot GET /` quer dizer: "a cozinha está aberta, mas **não existe nada no cardápio** para `GET /`". O servidor **funciona**: falta a rota.

**💬 E daí?** Esse `404` é uma ótima notícia. Ele prova que o pedido **chegou** ao servidor e voltou. Se o servidor estivesse desligado, você veria outra coisa: `curl: (7) Failed to connect to localhost port 3000`. Saber a diferença entre "não achei a rota" e "não achei o servidor" economiza muito tempo de depuração.

**✅ Checkpoint:** o servidor responde `Cannot GET /`. Ele está quebrado?

<details>
<summary>💡 Ver resposta</summary>

Não. Ele está **ligado** e respondeu (status `404`). Só ainda não existe nenhuma rota no cardápio. Quebrado seria se ele nem respondesse.

</details>

---

## 3. A primeira rota GET

**Por que usar?** Uma **rota** é **um item do cardápio**. Ela diz: "quando chegar **este** pedido, **neste** caminho, faça **isto**".

### A anatomia de uma rota

<!-- node:skip -->
```js
app.get('/produtos', (req, res) => {
  res.json(produtos);
});
```

| Pedaço | O que significa |
|---|---|
| `app.get` | "Quando chegar um pedido **GET**..." |
| `'/produtos'` | "...**neste caminho**..." |
| `(req, res) => { ... }` | "...faça isto." Uma arrow function que o Express chama **a cada pedido** |
| `req` | A **requisição**: o pedido que chegou (hoje ainda não usamos) |
| `res` | A **resposta**: o prato que vamos devolver |
| `res.json(produtos)` | Devolve os dados **em JSON**, com status `200` |

### Rota 1: a porta de entrada (texto)

Adicione **antes** do `app.listen`:

<!-- node:skip -->
```js
// Rota: quando chegar um GET em "/", responde com um texto
app.get('/', (req, res) => {
  res.send('Bem-vindo à API do MercadoÁgil!');
});
```

**Reinicie o servidor** (`Ctrl + C` e `node index.js` de novo) e teste:

```bash
curl -i http://localhost:3000/
```

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 33
ETag: W/"21-lqCEbi62SpBYO0eZvkEKKAv303U"
Date: Wed, 18 Nov 2026 16:08:47 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Bem-vindo à API do MercadoÁgil!
```

O `404` virou `200`. 🎉

### Rota 2: a lista de produtos (JSON)

Os dados ainda ficam **na memória**, num array de objetos. A ligação com o banco das Aulas 1 e 2 vem nas próximas aulas.

<!-- node:skip -->
```js
// Os dados ficam na memória por enquanto (o banco entra nas próximas aulas)
const produtos = [
  { id: 1, nome: 'Mouse', preco: 120 },
  { id: 2, nome: 'Teclado', preco: 350 },
  { id: 3, nome: 'Livro de JavaScript', preco: 80 },
];

// Rota: quando chegar um GET em "/produtos", responde com a lista em JSON
app.get('/produtos', (req, res) => {
  res.json(produtos);
});
```

Reinicie e teste com `curl -i http://localhost:3000/produtos`. O resultado é o da seção 1: `200 OK` e os 3 produtos em JSON. No **navegador**, o mesmo endereço mostra o JSON na tela.

### E se eu errar o caminho?

```bash
curl http://localhost:3000/produto
```

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /produto</pre>
</body>
</html>
```

`/produto` (singular) **não é** `/produtos`. Para o servidor, cada letra conta, como nos nomes de variáveis.

| Quero responder... | Uso | O cliente recebe |
|---|---|---|
| Um texto | `res.send('...')` | `Content-Type: text/html` |
| Dados (objeto ou array) | `res.json(dados)` | `Content-Type: application/json` |

> **🎨 Em uma frase:** rota = método + caminho + o que fazer. O `res` é a resposta que você monta.

**💬 E daí?** A vitrine do app do MercadoÁgil acabou de ganhar uma fonte de dados. O time do app não precisa saber como os produtos são guardados: ele só precisa saber que `GET /produtos` devolve a lista. Esse "contrato" é o que deixa times diferentes trabalharem ao mesmo tempo.

**✅ Checkpoint:** o time do painel do vendedor quer a lista de vendedores. O que muda na rota de produtos para criar `GET /vendedores`?

<details>
<summary>💡 Ver resposta</summary>

Muda o **caminho** (`'/vendedores'`) e o **dado** que vai no `res.json` (um array `vendedores`). O resto (`app.get`, `(req, res) =>`) fica igual. Vamos criá-la na próxima seção.

</details>

---

## 4. Nodemon e o mapa da API

**Por que usar?** Até agora, toda mudança no código pedia `Ctrl + C` e `node index.js` de novo. Esquecer disso é um dos erros mais comuns de quem começa.

### Primeiro, o problema

Com o servidor ligado (`node index.js`), troque o texto da rota `/` para `'Olá! Esta é a API do MercadoÁgil.'` e **salve**. Teste:

```bash
curl http://localhost:3000/
```

```
Bem-vindo à API do MercadoÁgil!
```

O texto **não mudou**. O servidor continua rodando a versão **antiga** do arquivo, a que ele leu quando foi ligado.

### A solução: o Nodemon

O **Nodemon** fica de olho nos arquivos e **reinicia o servidor sozinho** quando você salva. Ele é uma ferramenta **só para desenvolver**, por isso o `-D`:

```bash
npm install -D nodemon
```

Ele entra em `devDependencies` no `package.json`. Agora crie dois **atalhos** (scripts) no `package.json`, trocando o bloco `"scripts"`:

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

Desligue o servidor antigo (`Ctrl + C`) e ligue pelo atalho:

```bash
npm run dev
```

```
> mercadoagil-api@1.0.0 dev
> nodemon index.js

[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Servidor do MercadoÁgil rodando em http://localhost:3000
```

Agora crie a rota dos vendedores **sem desligar nada**:

<!-- node:skip -->
```js
const vendedores = [
  { id: 1, nomeLoja: 'TechBahia' },
  { id: 2, nomeLoja: 'Livraria Sol' },
];

app.get('/vendedores', (req, res) => {
  res.json(vendedores);
});
```

Ao salvar, o terminal do servidor mostra:

```
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
Servidor do MercadoÁgil rodando em http://localhost:3000
```

E a rota nova já responde:

```bash
curl http://localhost:3000/vendedores
```

```
[{"id":1,"nomeLoja":"TechBahia"},{"id":2,"nomeLoja":"Livraria Sol"}]
```

> **E esse aviso de "vulnerabilities" no `npm install -D nodemon`?** Ao instalar, o npm mostrou `6 vulnerabilities (1 moderate, 5 high)`. São avisos sobre bibliotecas que o próprio Nodemon usa para vigiar os arquivos, e o Nodemon só roda **no seu computador**, durante o desenvolvimento. **Não** rode `npm audit fix --force`: ele troca a versão do Nodemon e pode quebrar o projeto.

### Dois servidores na mesma porta

Com o `npm run dev` ligado, abra **outro terminal** na mesma pasta e rode `npm start`:

```
Não consegui ligar o servidor: listen EADDRINUSE: address already in use 0.0.0.0:3000
```

`EADDRINUSE` = **o endereço já está em uso**: já tem um servidor atendendo no balcão 3000. Só cabe **um** servidor por porta. Feche um dos dois (`Ctrl + C`). O final da mensagem pode aparecer como `:::3000` no seu computador; quer dizer a mesma coisa.

### O mapa da API do MercadoÁgil

| Método | Caminho | O que faz | Quando |
|---|---|---|---|
| `GET` | `/` | Mensagem de boas-vindas | ✅ Hoje |
| `GET` | `/produtos` | Lista os produtos | ✅ Hoje |
| `GET` | `/vendedores` | Lista os vendedores | ✅ Hoje |
| outros métodos | `/pedidos`, `/produtos`... | Criar, alterar e apagar | ⏳ Próximas aulas |

As regras do REST que já dá para usar:

- **Substantivo, no plural:** `/produtos`, não `/pegarProdutos` (quem diz a ação é o **método**).
- **Letras minúsculas** e caminhos curtos.
- **O mesmo nome** do recurso em todo lugar (se é `/produtos`, não existe `/produto` nem `/listaDeProdutos`).

> **🎨 Em uma frase:** o caminho é o **substantivo** (o quê) e o método é o **verbo** (o que fazer).

**💬 E daí?** Num time, uma API bem nomeada é usada **sem precisar perguntar** a quem a escreveu. Uma API com `/pegarProdutos`, `/produto-lista` e `/listarTodosOsProdutos` gera mensagem no chat, reunião e bug.

**✅ Checkpoint:** a próxima rota é a das categorias. Qual caminho vocês escolheriam? Algum colega escolheu outro? Defenda o seu com **um argumento**.

<details>
<summary>💡 Ver resposta</summary>

`GET /categorias`: substantivo, no plural, minúsculo, igual ao padrão das outras. Um argumento: "quem já usa `/produtos` e `/vendedores` adivinha esse caminho sem ler documentação".

</details>

---

## 🧠 Resumo

| Quero... | Uso |
|---|---|
| Começar um projeto Node | `npm init -y` + `"type": "module"` no `package.json` |
| Trazer o Express | `npm install express` |
| Trazer o Nodemon (só para desenvolver) | `npm install -D nodemon` |
| Criar o servidor | `const app = express();` |
| Ligar o servidor | `app.listen(3000, (erro) => { ... })` |
| Criar uma rota de busca | `app.get('/caminho', (req, res) => { ... })` |
| Responder um texto | `res.send('...')` |
| Responder dados | `res.json(dados)` |
| Ligar com reinício automático | `npm run dev` (script `"dev": "nodemon index.js"`) |
| Testar uma rota | Navegador ou `curl -i http://localhost:3000/caminho` |
| Desligar o servidor | `Ctrl + C` no terminal dele |

| Status | Quer dizer |
|---|---|
| `200 OK` | Deu certo, aqui está |
| `404 Not Found` | O servidor respondeu, mas **não tem essa rota** |
| `curl: (7) Failed to connect` | Nem chegou: **o servidor está desligado** (ou em outra porta) |

---

## 📝 Lista de exercícios para casa

Os 4 exercícios usam os dados do **IngressoÁgil**, o cenário do projeto. Faça **depois de entregar o projeto do trio**. Cada exercício é um **projeto separado** (uma pasta para cada: `casa1`, `casa2`...). Lembre de `npm install` em cada pasta.

**Um passo de cada vez:** escreva, salve, teste com o `curl`, confira. As dicas estão escondidas: clique em **"💡 Ver dicas"** só depois de tentar.

> **Atenção:** só um servidor por porta. Antes de ligar o servidor de um exercício, desligue o do anterior (`Ctrl + C`).

| Exercício | Tema | Dificuldade |
|---|---|---|
| 1. A bilheteria abriu | Projeto, Express, `listen` e a primeira rota | 🟢 Fácil |
| 2. A vitrine de eventos | `res.json`, várias rotas, `filter` e Nodemon | 🟡 Médio |
| 3. O erro como pista | Provocar, ler e corrigir os 4 erros da aula | 🟢 Fácil |
| 4. A API da produtora | Tudo junto: módulos, `map`, `find`, rest, `reduce` e o mapa da API | 🔴 Difícil |

---

### Exercício 1: A bilheteria abriu 🟢 Fácil

O IngressoÁgil vai ter uma API. O primeiro passo é ligar o servidor e criar a porta de entrada.

**O que fazer:**

1. Crie a pasta `casa1`, rode `npm init -y`, adicione `"type": "module"` e instale o Express.
2. Crie o `index.js` com um servidor na porta `3000` que mostre `Bilheteria do IngressoÁgil aberta em http://localhost:3000` quando ligar. Rode com `node index.js`.
3. Crie a rota `GET /` que responde com o texto `Bem-vindo ao IngressoÁgil! Ingressos para a cultura da sua cidade.`. Reinicie e teste com `curl -i`. Olhe **só a primeira e a última linha**.
4. Teste `curl http://localhost:3000/eventos`. Essa rota ainda não existe: o resultado esperado é um erro, e **está certo**.

**Resultado esperado:**

No terminal do servidor (passo 2):

```
Bilheteria do IngressoÁgil aberta em http://localhost:3000
```

Primeira e última linha do `curl -i` (passo 3):

```
HTTP/1.1 200 OK
...
Bem-vindo ao IngressoÁgil! Ingressos para a cultura da sua cidade.
```

No passo 4, no meio do HTML:

```
<pre>Cannot GET /eventos</pre>
```

<details>
<summary>💡 Ver dicas</summary>

- Reveja a seção 2: criar o projeto, `npm install express`, `import express from 'express';` e `const app = express();`.
- A mensagem de "aberta" vai dentro do `app.listen(3000, (erro) => { ... })`, no `else`.
- A rota vai **antes** do `app.listen`: `app.get('/', (req, res) => { res.send('...'); });`
- Mudou o código? **Reinicie** o servidor. Sem Nodemon, ele não percebe sozinho.
- Se der `Cannot find package 'express'`, você esqueceu o `npm install express` **nesta pasta**.

</details>

---

### Exercício 2: A vitrine de eventos 🟡 Médio

O app do IngressoÁgil precisa mostrar os eventos, e a página de promoções quer só os mais baratos.

```js
const eventos = [
  { id: 1, nome: 'Slam das Minas', data: '2026-12-05', preco: 20 },
  { id: 2, nome: 'Batalha da Estação', data: '2026-12-12', preco: 15 },
  { id: 3, nome: 'Roda de Samba de Fim de Ano', data: '2026-12-20', preco: 30 },
];
```

**O que fazer:**

1. Crie o projeto `casa2` com Express e **Nodemon**, e os scripts `dev` e `start`. Ligue com `npm run dev` e **deixe ligado** até o fim.
2. Crie a rota `GET /eventos`, que responde com a lista em JSON. Teste.
3. Crie a rota `GET /eventos/baratos`, que responde **só com os eventos de até R$ 20**. Teste.
4. Crie a rota `GET /eventos/quantidade`, que responde com um objeto `{ quantidade: ... }` com o número de eventos. Teste.
5. **Conferência:** teste `GET /eventos` de novo. A lista original continua com os **3** eventos?

**Resultado esperado** (um `curl` por passo, sem o `-i`):

```
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30}]
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15}]
{"quantidade":3}
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20},{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30}]
```

<details>
<summary>💡 Ver dicas</summary>

- Reveja a seção 4: `npm install -D nodemon` e o bloco `"scripts"` com `"dev": "nodemon index.js"`.
- "Só os de até R$ 20" é um `filter` do M1: `eventos.filter((evento) => evento.preco <= 20)`. Guarde numa variável e mande no `res.json`.
- Para o passo 4, `res.json` aceita um objeto: `res.json({ quantidade: eventos.length });`
- O `filter` cria um array **novo**. Por isso, no passo 5, a lista original continua com 3. Se apareceram só 2, alguma linha está mudando o array `eventos`.
- O `curl` mostra o JSON sem pular linha no fim. Se o prompt do terminal aparecer **grudado** no final do JSON, é normal.

</details>

---

### Exercício 3: O erro como pista 🟢 Fácil

Ninguém decora mensagem de erro. Quem resolve rápido é quem **lê a mensagem**. Neste exercício você vai **provocar de propósito** os 4 erros mais comuns da aula, ler cada um e consertar.

Use uma cópia do projeto do **Exercício 1** (pasta `casa3`). Para cada item, provoque o erro, **copie a mensagem** num comentário no topo do `index.js`, escreva **com suas palavras** o que aconteceu e conserte.

**O que fazer:**

1. Copie só o `package.json` e o `index.js` do Exercício 1 para `casa3` (**sem** a pasta `node_modules`) e rode `node index.js`. Depois conserte.
2. Com o servidor ligado, abra outro terminal na mesma pasta e rode `node index.js` de novo. Depois conserte.
3. Teste `curl http://localhost:3000/evento` (no singular). Qual a diferença para o passo 4 do Exercício 1?
4. Adicione o script `"dev": "nodemon index.js"` no `package.json`, **sem instalar o Nodemon**, e rode `npm run dev`. Depois conserte.

**Resultado esperado** (a mensagem principal de cada passo):

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express' imported from .../casa3/index.js
Não consegui abrir a bilheteria: listen EADDRINUSE: address already in use 0.0.0.0:3000
<pre>Cannot GET /evento</pre>
sh: 1: nodemon: not found
```

O caminho no passo 1 e o final do passo 2 (`0.0.0.0:3000` ou `:::3000`) mudam de computador para computador. No passo 4, a frase muda com o sistema: no Mac aparece `sh: nodemon: command not found` e no Windows aparece uma mensagem dizendo que `nodemon` não é reconhecido como comando.

<details>
<summary>💡 Ver dicas</summary>

- Leia a mensagem **até o fim** antes de mexer no código. Ela quase sempre diz **o que** faltou.
- Passo 1: a pasta `node_modules` é onde as bibliotecas moram. O `package.json` só tem a **lista** do que instalar.
- Passo 2: quantos servidores podem atender no mesmo balcão?
- Passo 3: o servidor respondeu? Então ele está ligado. O que está diferente é o **caminho**.
- Passo 4: o atalho `npm run dev` chama um programa que precisa estar instalado no projeto.
- Os consertos estão na tabela de erros comuns, no fim deste material.

</details>

---

### Exercício 4: A API da produtora 🔴 Difícil

A produtora do IngressoÁgil quer uma API para o painel dela. Os dados já estão no formato do **modelo normalizado** (cada array é uma "tabela", ligada por id). Este exercício junta tudo: módulos ES, `map`, `find`, spread, rest e `reduce` do M1 com as rotas de hoje.

Crie o projeto `casa4` com Express e Nodemon e o arquivo `src/dados.js`:

```js
// Os dados do IngressoÁgil, no formato do modelo normalizado (cada array é uma "tabela")
export const espacos = [
  { id: 1, nome: 'Galpão Arte Viva', endereco: 'Rua das Flores, 100' },
  { id: 2, nome: 'Quadra do Samba', endereco: 'Av. Central, 50' },
];

export const eventos = [
  { id: 1, nome: 'Slam das Minas', data: '2026-12-05', preco: 20, espacoId: 1 },
  { id: 2, nome: 'Batalha da Estação', data: '2026-12-12', preco: 15, espacoId: 1 },
  { id: 3, nome: 'Roda de Samba de Fim de Ano', data: '2026-12-20', preco: 30, espacoId: 2 },
];

export const clientes = [
  { id: 1, nome: 'Joana Reis', email: 'joana@email.com', cpf: '111.222.333-44' },
  { id: 2, nome: 'Caio Melo', email: 'caio@email.com', cpf: '555.666.777-88' },
  { id: 3, nome: 'Lia Santos', email: 'lia@email.com', cpf: '999.000.111-22' },
];

export const itensCompra = [
  { compraId: 1, eventoId: 1, quantidade: 2, precoPago: 20 },
  { compraId: 1, eventoId: 2, quantidade: 1, precoPago: 15 },
  { compraId: 2, eventoId: 3, quantidade: 1, precoPago: 25 },
  { compraId: 3, eventoId: 3, quantidade: 2, precoPago: 30 },
  { compraId: 4, eventoId: 1, quantidade: 1, precoPago: 20 },
];
```

**O que fazer:**

1. No `index.js`, **importe** os 4 arrays do `src/dados.js`, crie o servidor e ligue com `npm run dev`. A mensagem deve ser `API da produtora rodando em http://localhost:3000`.
2. Crie `GET /espacos`, que responde com os espaços.
3. Crie `GET /eventos`, que responde com cada evento **mais o nome do espaço** num campo `espaco`. É o `JOIN` da Aula 2, feito à mão em JS.
4. Crie `GET /clientes`, que mostra **só o `id` e o `nome`** de cada cliente: **sem** `email` e **sem** `cpf`.
5. Crie `GET /resumo`, que responde com um objeto com o número de eventos, o total de **ingressos vendidos** e o **faturamento** (soma de `quantidade * precoPago`).
6. **Pensando como pessoa de mercado**, escreva **três comentários** no topo do `index.js`:
   - **Clear Thinking:** **quem** vai usar a rota `/clientes` e **por que** o email e o CPF não podem aparecer nela?
   - **Discordância Positiva:** um colega quer trocar `/resumo` por `/pegarResumoDaProdutora`. Concorde ou discorde com **um argumento** (lembre das regras do mapa da API).
   - **O mapa:** uma tabela com as 4 rotas (método, caminho, quem usa).

**Resultado esperado** (terminal do servidor e um `curl` por rota, na ordem dos passos):

```
API da produtora rodando em http://localhost:3000
```

```
[{"id":1,"nome":"Galpão Arte Viva","endereco":"Rua das Flores, 100"},{"id":2,"nome":"Quadra do Samba","endereco":"Av. Central, 50"}]
[{"id":1,"nome":"Slam das Minas","data":"2026-12-05","preco":20,"espacoId":1,"espaco":"Galpão Arte Viva"},{"id":2,"nome":"Batalha da Estação","data":"2026-12-12","preco":15,"espacoId":1,"espaco":"Galpão Arte Viva"},{"id":3,"nome":"Roda de Samba de Fim de Ano","data":"2026-12-20","preco":30,"espacoId":2,"espaco":"Quadra do Samba"}]
[{"id":1,"nome":"Joana Reis"},{"id":2,"nome":"Caio Melo"},{"id":3,"nome":"Lia Santos"}]
{"eventos":3,"ingressosVendidos":7,"faturamento":160}
```

<details>
<summary>💡 Ver dicas</summary>

- **Não tente fazer tudo de uma vez.** Faça uma rota, salve, teste com o `curl`. O Nodemon reinicia sozinho.
- **Passo 1:** `import { espacos, eventos, clientes, itensCompra } from './src/dados.js';` (com o `.js` no final, como no M1).
- **Passo 3:** use `map` nos eventos. Dentro dele, `find` o espaço com o mesmo id (`espacos.find((e) => e.id === evento.espacoId)`) e devolva uma **cópia** do evento com o campo novo: `{ ...evento, espaco: espaco.nome }`.
- **Passo 4:** é o rest da Aula 2 do M1: `const { email, cpf, ...publico } = cliente;` dentro de um `map`, devolvendo o `publico`.
- **Passo 5:** dois `reduce` nos `itensCompra`, começando do `0`. Confira à mão: são **7** ingressos e **160** reais (2×20 + 1×15 + 1×25 + 2×30 + 1×20).
- No objeto do resumo, se a variável tem o mesmo nome do campo, pode escrever só o nome: `{ eventos: eventos.length, ingressosVendidos, faturamento }`.
- Se a resposta de `/eventos` não tem o `espaco`, confira se o `map` tem `return` dentro das chaves `{ }`.
- Se der `does not provide an export named ...`, compare o nome no `import` com o nome no `export`, letra por letra.

</details>

---

## 🐞 Erros comuns e o que eles significam

Antes de pedir ajuda, leia a mensagem **inteira** e tente **pelo menos uma** correção.

### No projeto de modelagem (SQL, mensagens do PostgreSQL/PGlite)

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| `relation "espaco" already exists` | Rodou o `CREATE TABLE` duas vezes | Recarregue a página do playground e rode o script do começo |
| `relation "compra" does not exist` | Criou uma tabela com FK **antes** da tabela que ela aponta | Mude a ordem: crie primeiro as tabelas sem FK |
| `insert or update on table "evento" violates foreign key constraint "evento_espaco_id_fkey"` | Inseriu um evento apontando para um espaço que **ainda não existe** | Insira primeiro os espaços, depois os eventos |
| `duplicate key value violates unique constraint "espaco_pkey"` | Dois registros com o mesmo `id` | Confira os ids: cada um é único |
| `null value in column "endereco" of relation "espaco" violates not-null constraint` | Faltou um valor obrigatório no `INSERT` | Confira se a lista de colunas e a de valores têm o mesmo tamanho |
| `syntax error at or near "'Av. Central, 50'"` | Faltou a **vírgula** antes desse valor | Olhe o que vem **antes** do ponto que a mensagem aponta |
| A Roda de Samba fatura **90** em vez de 85 | A conta usou o **preço de hoje** do evento | Use o **preço pago**, guardado na tabela que liga compra e evento |

### No servidor Express

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| `Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express'` | O Express não está instalado **nesta pasta** | Rode `npm install express` na pasta do projeto |
| `Cannot GET /produto` (status `404`) | O servidor está ligado, mas **não existe essa rota** | Confira o caminho letra por letra (`/produtos`, no plural?) e se a rota está no código |
| `curl: (7) Failed to connect to localhost port 3000` | O servidor está **desligado** (ou em outra porta) | Ligue o servidor e confira a porta no `app.listen` |
| `listen EADDRINUSE: address already in use ...:3000` | Já tem **outro servidor** na porta 3000 | Feche o outro terminal com `Ctrl + C` (ou use outra porta) |
| Mudei o código, mas a resposta continua a antiga | O servidor não foi **reiniciado** | `Ctrl + C` e ligue de novo, ou use `npm run dev` (Nodemon) |
| `sh: 1: nodemon: not found` ou `nodemon: command not found` | O Nodemon não está instalado no projeto, ou você digitou `nodemon` direto no terminal | Rode `npm install -D nodemon` e ligue com `npm run dev` |
| `ReferenceError: require is not defined in ES module scope, you can use import instead` | Copiou um exemplo da internet com `require('express')` | Use `import express from 'express';` (o projeto usa `"type": "module"`) |
| `Warning: ... MODULE_TYPELESS_PACKAGE_JSON` | Faltou `"type": "module"` no `package.json` | Adicione a linha no `package.json` |
| `TypeError: res.jason is not a function` (status `500`) | Erro de digitação no método da resposta | É `res.json`, sem o "a" |
| No Windows, o `curl` mostra uma tabela estranha | No PowerShell, `curl` é outro comando | Use `curl.exe -i http://localhost:3000/...` ou teste no navegador |

---

**Lembre-se:** hoje vocês fizeram as duas pontas de um sistema de verdade. O **modelo** decide como os dados moram no banco; a **API** decide como eles chegam a quem precisa deles. No projeto final do M2, as duas pontas se encontram. Bons estudos! 🚀

**🏁 Desafio bônus (opcional, 15 minutos):** pense no app que você mais usa (delivery, música, transporte). Escreva o **mapa de 4 rotas `GET`** que esse app provavelmente tem (método, caminho e quem usa cada uma) e crie **uma** delas num servidor Express, com dados inventados. Quem cria o problema entende o conteúdo de verdade.