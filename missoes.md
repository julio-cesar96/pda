# 🔄 Sala de aula invertida: as 4 missões da Aula 4

**Módulo 2 · Aula 4: Rotas e controladores + Conectando com o banco de dados**

Na próxima aula, **quem explica são vocês**. A turma foi dividida em **4 grupos**, e cada grupo recebeu **uma missão**: estudar um assunto em casa (até **30 minutos**) e apresentar uma **mini-aula de até 5 minutos** para a turma. Depois de cada mini-aula, o professor complementa em 1 ou 2 minutos.

Por que assim? Porque no mercado ninguém espera "a aula" para aprender uma ferramenta nova. Você lê a documentação, roda um exemplo, quebra, conserta e explica para o time. **Explicar é o jeito mais rápido de descobrir o que você ainda não entendeu.**

> **Regra de ouro (a mesma de sempre):** um passo, roda, confere. Rode o kit **antes** de ler tudo. Errar em casa é o objetivo: é o erro que vira a melhor parte da mini-aula.

---

## 📑 Sumário

1. [Como funciona](#-como-funciona)
2. [Os combinados (High Agency na prática)](#-os-combinados-high-agency-na-prática)
3. [Como dividir o trabalho no grupo](#-como-dividir-o-trabalho-no-grupo)
4. [Missão 1: express.Router e controllers](#-missão-1-expressrouter-e-controllers)
5. [Missão 2: o CRUD](#-missão-2-o-crud)
6. [Missão 3: middleware de log e variáveis de ambiente](#-missão-3-middleware-de-log-e-variáveis-de-ambiente)
7. [Missão 4: Sequelize](#-missão-4-sequelize)
8. [Avaliação leve (sem nota)](#-avaliação-leve-sem-nota)

---

## 🧭 Como funciona

| Quando | O que acontece |
|---|---|
| **Hoje** | Cada grupo recebe a sua missão (veja a lista dos grupos no canal da turma) |
| **Nos primeiros 5 minutos** | O **primeiro passo físico**: alguém do grupo roda o kit (`npm install` e `npm run dev`) |
| **Até a véspera da aula** | Cada grupo manda no canal da turma **um print do kit rodando** (o terminal do servidor + um `curl`) |
| **No dia da aula** | As mini-aulas acontecem **na ordem das missões** (1, 2, 3, 4), cada uma no começo do bloco do assunto |

**A mini-aula tem até 5 minutos e segue um roteiro de 4 partes**, igual para todos os grupos:

| Tempo | Parte | O que mostrar |
|---|---|---|
| 0:00 a 1:00 | **Analogia** | Uma comparação com algo do dia a dia (o roteiro de cada missão sugere uma; vocês podem trocar por uma melhor) |
| 1:00 a 2:30 | **Demonstração ao vivo** | O kit rodando, com pelo menos um `curl` no terminal |
| 2:30 a 3:30 | **O erro** | Um erro provocado de propósito, com a **mensagem real** na tela, e o que ela quer dizer |
| 3:30 a 5:00 | **Mercado + pergunta** | "Quem usa isso no mercado, e para quê?" e **uma pergunta para a turma** |

### Os kits

Cada missão tem um **kit**: um projeto pequeno que já funciona. Ele está em [`kits/`](kits/). Para rodar:

```bash
cd kits/missao-1
npm install
npm run dev
```

Num **segundo terminal**, teste com o `curl` (no Windows, `curl.exe`). Só um servidor por porta: antes de rodar outro kit, desligue o anterior com `Ctrl + C`.

Se o `npm install` ou o `npm run dev` der erro, **leia a mensagem até o fim** e tente uma correção. Se não resolver em 15 minutos, mande o print do erro no canal da turma: isso também conta como primeiro passo.

---

## 🧭 Os combinados (High Agency na prática)

- **Bias to Action:** o primeiro passo do grupo cabe em **5 minutos**: rodar o kit e mandar "rodou" (ou o print do erro) no grupo de vocês. Ninguém precisa entender tudo antes de rodar.
- **Clear Thinking:** toda mini-aula responde, com um exemplo concreto: **"quem usa isso no mercado, e para quê?"** Não vale "é importante para as empresas": digam **qual** pessoa, **qual** tela, **qual** problema.
- **Discordância Positiva:** depois de cada mini-aula, **o grupo seguinte** faz **uma pergunta** ou propõe **uma melhoria**, com um argumento (o Grupo 1 pergunta para o Grupo 4). O grupo que apresentou pode **discordar** da melhoria e se defender com lógica. E vale discordar do próprio material: se vocês acharem que a analogia do roteiro é ruim, troquem e expliquem por quê.

---

## 👥 Como dividir o trabalho no grupo

Uma sugestão, para ninguém ficar sem papel. Em grupos de 3, a pessoa da **ponte com o mercado** junta o papel com a **pilota do kit**.

| Papel | No estudo em casa | Na mini-aula |
|---|---|---|
| **Pilota do kit** | Roda o kit, faz a tarefa "mudar uma coisa" e manda o print no canal | Faz a demonstração ao vivo (o `curl`) |
| **Contadora** | Lê o trecho do README e os links, e prepara a analogia | Explica o conceito com a analogia (1 min) |
| **Caçadora de erros** | Provoca o erro de propósito, copia a mensagem e descobre o que ela quer dizer | Mostra e explica o erro |
| **Ponte com o mercado** | Responde "quem usa e para quê", prepara a pergunta para a turma e marca o tempo do ensaio | Fecha com o mercado e faz a pergunta |

**Ensaiem uma vez**, com cronômetro. Se passou de 5 minutos, cortem: **clareza antes de completude**.

---

## 🧩 Missão 1: express.Router e controllers

### ❓ A pergunta-gatilho

> "O `index.js` da loja tem **40 rotas**, e **3 devs** estão mexendo nele na mesma semana: uma faz os cupons, outro os pedidos, outra os relatórios. **O que dá errado?** E como organizar para não dar?"

### 📚 Material de estudo (até 30 min)

- **No README da aula:** a seção [1. Rotas e controladores](../README.md#1-rotas-e-controladores-cada-praça-no-seu-lugar).
- **Documentação oficial:** [Roteamento no Express](https://expressjs.com/pt-br/guide/routing.html), só a parte do `express.Router` (no fim da página).

### 🧰 O kit: [`kits/missao-1`](kits/missao-1/)

O kit tem **dois jeitos** de fazer o mesmo servidor:

| Arquivo | O que é | Como rodar |
|---|---|---|
| `antes-tudo-junto.js` | ❌ O jeito da Aula 3: todas as rotas num arquivo só | `npm run antes` |
| `index.js` + `routes/` + `controllers/` | ✅ O jeito novo: cada recurso nos seus arquivos | `npm run dev` |

### 🛠️ A tarefa do grupo

1. **Fazer funcionar:** rode `npm run dev` e teste `curl http://localhost:3000/produtos` e `curl http://localhost:3000/vendedores`. Depois desligue, rode `npm run antes` e teste de novo.
   > Resultado esperado: **as mesmas respostas** nos dois jeitos.
   > ```
   > [{"id":1,"nome":"Mouse","preco":120},{"id":2,"nome":"Teclado","preco":350},{"id":3,"nome":"Livro de JavaScript","preco":80}]
   > [{"id":1,"nomeLoja":"TechBahia"},{"id":2,"nomeLoja":"Livraria Sol"}]
   > ```
2. **Mudar uma coisa:** no jeito novo, crie `GET /categorias`, com as categorias `eletronicos`, `livros` e `casa`. Você vai precisar de **dois arquivos novos** e de **duas linhas** no `index.js`.
   > Resultado esperado: `curl http://localhost:3000/categorias` mostra as 3 categorias, e os arquivos de produtos e vendedores **não mudaram**.
3. **Provocar um erro:** no `index.js`, tire o `.js` do final de `'./routes/produtos.js'` e salve.
   > Resultado esperado (o começo da mensagem):
   > ```
   > Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../missao-1/routes/produtos' imported from .../missao-1/index.js
   > Did you mean to import "./routes/produtos.js"?
   > ```

### 🎤 O roteiro da mini-aula

| Parte | Sugestão |
|---|---|
| **Analogia** | O restaurante: o cardápio tem **seções** (o arquivo de rotas) e a cozinha tem **praças**, cada uma com o seu **cozinheiro** (o controller). O salão (`index.js`) só encaminha o pedido para a praça certa |
| **Demonstração** | Abram o `antes-tudo-junto.js` e o `index.js` lado a lado. Mostrem que o `curl` dá a mesma resposta nos dois. Depois mostrem a rota `/categorias` que vocês criaram, e que **não precisaram abrir** os arquivos de produtos |
| **O erro** | O `ERR_MODULE_NOT_FOUND` sem o `.js`. Mostrem que **o próprio Node sugere a correção** na segunda linha |
| **Mercado + pergunta** | Quem usa essa organização, e para quê? Pergunta sugerida para a turma: *"Se a pessoa dos cupons errar uma vírgula em `routes/cupons.js`, a vitrine de produtos continua funcionando?"* (testem antes, para saber a resposta!) |

### ✅ Antes de apresentar

- [ ] O kit roda nos dois jeitos, e o print foi mandado no canal até a véspera.
- [ ] A rota `/categorias` funciona, e sabemos dizer **quais arquivos** criamos.
- [ ] Sabemos explicar o que faz o `app.use('/produtos', rotasProdutos)`.
- [ ] Sabemos explicar por que o `listar` vai **sem parênteses** em `rotasProdutos.get('/', listar)`.
- [ ] Temos a resposta para "quem usa isso no mercado, e para quê?", com um exemplo concreto.
- [ ] Ensaiamos com cronômetro: coube em 5 minutos.

---

## 🧩 Missão 2: o CRUD

### ❓ A pergunta-gatilho

> "O painel do vendedor do MercadoÁgil precisa **cadastrar** um produto, **mudar o preço** e **tirar do ar**. Hoje a API só sabe **mostrar** (`GET`). Como o painel **pede** cada uma dessas coisas? E como ele **fica sabendo** se deu certo?"

### 📚 Material de estudo (até 30 min)

- **No README da aula:** a seção [2. O CRUD](../README.md#2-o-crud-criar-ler-alterar-e-apagar) e o quadro [Pedidos com corpo](../README.md#pedidos-com-corpo-post-e-put-o-corpo-vai-num-arquivo).
- **Documentação oficial:** [Métodos de requisição HTTP (MDN)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods) e [Códigos de status HTTP (MDN)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status). Leiam só `GET`, `POST`, `PUT`, `DELETE` e os status `200`, `201`, `204` e `404`.

### 🧰 O kit: [`kits/missao-2`](kits/missao-2/)

A API de produtos com as **5 rotas** do CRUD, os dados na memória e dois arquivos de corpo: `produto.json` e `produto-editado.json`.

> **Atenção:** o Nodemon reinicia quando um `.json` da pasta é criado ou salvo, e aí os produtos criados somem. Crie os arquivos **antes** de ligar o servidor.

### 🛠️ A tarefa do grupo

1. **Fazer funcionar:** com o servidor ligado, rode os 5 pedidos, nesta ordem, com o `-i` (olhe a **primeira linha**, o status):

```bash
curl -i http://localhost:3000/produtos/2
curl -i -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d "@produto.json"
curl -i -X PUT http://localhost:3000/produtos/4 -H "Content-Type: application/json" -d "@produto-editado.json"
curl -i -X DELETE http://localhost:3000/produtos/4
curl -i http://localhost:3000/produtos/4
```

   > Resultado esperado (primeira e última linha de cada um):
   > ```
   > HTTP/1.1 200 OK
   > {"id":2,"nome":"Teclado","preco":350}
   > HTTP/1.1 201 Created
   > {"id":4,"nome":"Monitor","preco":1600}
   > HTTP/1.1 200 OK
   > {"id":4,"nome":"Monitor 24 polegadas","preco":1500}
   > HTTP/1.1 204 No Content
   > HTTP/1.1 404 Not Found
   > {"erros":["Produto não encontrado"]}
   > ```
2. **Mudar uma coisa:** faça o `DELETE` responder `200` com o produto apagado, em vez de `204` sem nada. Testem as duas versões e **decidam qual é melhor, com um argumento** (pensem em quem usa a resposta). Depois voltem para a versão de que gostaram mais.
3. **Provocar dois erros:**
   - Comentem a linha `app.use(express.json());` no `index.js`, salvem e rodem o `POST`.
     > Resultado esperado: `HTTP/1.1 500 Internal Server Error`, e no terminal do servidor:
     > ```
     > TypeError: Cannot destructure property 'nome' of 'req.body' as it is undefined.
     > ```
   - Consertem e rodem `curl -i -X POST http://localhost:3000/produtos/1 -H "Content-Type: application/json" -d "@produto.json"`.
     > Resultado esperado: `HTTP/1.1 404 Not Found` e, no meio do HTML, `<pre>Cannot POST /produtos/1</pre>`.

### 🎤 O roteiro da mini-aula

| Parte | Sugestão |
|---|---|
| **Analogia** | O balcão de uma loja: o **caminho** diz **qual** produto ("o Teclado, o número 2"), o **método** diz **o que fazer** com ele (ver, cadastrar, trocar, tirar do ar), o **corpo** é a **ficha preenchida** que você entrega no balcão, e o **status** é o carimbo que volta ("feito", "criado", "não temos") |
| **Demonstração** | Os 5 `curl` da tarefa 1, com o `-i`. Apontem o **status** na primeira linha de cada um |
| **O erro** | O `500` sem o `express.json()`: a ficha chegou, mas **ninguém abriu o envelope**. Bônus: o mesmo erro aparece se esquecer o `-H "Content-Type: application/json"` |
| **Mercado + pergunta** | Quem usa cada verbo, e para quê? Pergunta sugerida: *"Por que o `POST` vai em `/produtos`, sem id, e o `PUT` vai em `/produtos/4`, com id?"* |

### ✅ Antes de apresentar

- [ ] Os 5 pedidos dão os status esperados, e o print foi mandado no canal até a véspera.
- [ ] Sabemos explicar o que são `req.params.id` e `req.body`, e **por que** existe o `Number(...)`.
- [ ] Decidimos entre `204` e `200` no `DELETE`, com um argumento.
- [ ] Sabemos explicar a diferença entre `201`, `204` e `404`.
- [ ] Temos a resposta para "quem usa isso no mercado, e para quê?".
- [ ] Ensaiamos com cronômetro: coube em 5 minutos.

---

## 🧩 Missão 3: middleware de log e variáveis de ambiente

### ❓ A pergunta-gatilho

> "Um cliente reclamou: 'a minha compra deu erro ontem às 14h'. Como o time descobre **que pedidos chegaram** na API? E outra: a senha do banco está escrita no `index.js`, e o projeto está no GitHub. **O que pode acontecer?**"

### 📚 Material de estudo (até 30 min)

- **No README da aula:** a seção [3. Middleware de log e variáveis de ambiente](../README.md#3-middleware-de-log-e-variáveis-de-ambiente).
- **Documentação oficial:** [Escrevendo middlewares (Express)](https://expressjs.com/pt-br/guide/writing-middleware.html) e o [README do dotenv](https://github.com/motdotla/dotenv#readme) (em inglês; leiam só a parte "Usage", com a ajuda do tradutor se precisar).

### 🧰 O kit: [`kits/missao-3`](kits/missao-3/)

A API de produtos com uma **recepcionista** (`middlewares/registrarPedido.js`) e o **dotenv**. O kit traz o `.env.example`, mas **não** traz o `.env`: ele nunca vai para o GitHub.

### 🛠️ A tarefa do grupo

1. **Fazer funcionar:** rode `npm run dev` e faça um `curl http://localhost:3000/produtos`. Olhe o **terminal do servidor**.
   > Resultado esperado no terminal do servidor:
   > ```
   > Porta lida do .env: undefined
   > Servidor do MercadoÁgil rodando em http://localhost:3000
   > 📝 GET /produtos
   > ```
   > O `undefined` está **certo**: o `.env` ainda não existe, e o `|| 3000` entrou em ação.
2. **Mudar uma coisa:** copie o `.env.example` para um arquivo novo chamado `.env` (sem o `.example`). Ele já diz `PORT=3001`. Reinicie o servidor e teste `curl http://localhost:3001/produtos`.
   > Resultado esperado no terminal do servidor:
   > ```
   > Porta lida do .env: 3001
   > Servidor do MercadoÁgil rodando em http://localhost:3001
   > 📝 GET /produtos
   > ```
   > Mudou o `.env` com o servidor ligado e nada aconteceu? **O Nodemon não vigia o `.env`**: digite `rs` + `Enter` no terminal do servidor.
3. **Provocar um erro:** no `middlewares/registrarPedido.js`, comente a linha `next();`, salve e rode:

```bash
curl -i --max-time 3 http://localhost:3001/produtos
```

   > Resultado esperado (os milissegundos mudam um pouco):
   > ```
   > curl: (28) Operation timed out after 3002 milliseconds with 0 bytes received
   > ```
   > E o terminal do servidor mostra `📝 GET /produtos`: o pedido **chegou**, mas nunca passou da recepção.
4. **Bônus (se tiverem clonado o repositório):** rode `git status` na pasta do kit. O `.env` aparece? Por quê?

### 🎤 O roteiro da mini-aula

| Parte | Sugestão |
|---|---|
| **Analogia** | A **recepcionista** do restaurante anota cada pedido no caderno e diz "pode passar" (`next`). O `.env` é o **cofre**: as senhas ficam lá, e o código só sabe o **nome** de cada uma (`process.env.PORT`) |
| **Demonstração** | Um `curl` e o log aparecendo no terminal do servidor. Depois, o mesmo servidor ligando em `3001` só porque o `.env` mudou, sem mexer no código |
| **O erro** | O pedido que **nunca responde** sem o `next()`. Mostrem que **o servidor não mostra erro nenhum**: por isso esse problema é tão difícil de achar |
| **Mercado + pergunta** | Quem usa logs e `.env`, e para quê? Pergunta sugerida: *"Uma colega subiu o `.env` para o GitHub e apagou no commit seguinte. Está resolvido?"* |

### ✅ Antes de apresentar

- [ ] O kit roda em `3000` sem `.env` e em `3001` com `.env`, e o print foi mandado no canal até a véspera.
- [ ] Sabemos explicar os **três** ingredientes do middleware: `req`, `res` e `next`.
- [ ] Sabemos explicar por que o `import 'dotenv/config';` é a **primeira** linha do `index.js`.
- [ ] Sabemos a diferença entre o `.env` (fica no computador) e o `.env.example` (vai para o GitHub).
- [ ] Temos a resposta para "quem usa isso no mercado, e para quê?".
- [ ] Ensaiamos com cronômetro: coube em 5 minutos.

---

## 🧩 Missão 4: Sequelize

### ❓ A pergunta-gatilho

> "O MercadoÁgil reiniciou o servidor às 3h da manhã para uma atualização. Às 8h, os vendedores reclamaram: **todos os produtos cadastrados ontem sumiram**. Por quê? E como fazer o dado **sobreviver** a um reinício?"

### 📚 Material de estudo (até 30 min)

- **No README da aula:** a seção [4. Sequelize](../README.md#4-sequelize-os-produtos-vão-para-o-banco).
- **Documentação oficial:** [Model Basics (Sequelize)](https://sequelize.org/docs/v6/core-concepts/model-basics/) (em inglês; leiam só até "Model synchronization") e [função async (MDN)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function).

### 🧰 O kit: [`kits/missao-4`](kits/missao-4/)

A API de produtos guardando tudo num banco **SQLite** (um arquivo chamado `mercadoagil.sqlite`, que aparece sozinho na pasta) com o **Sequelize**. O `npm install` deste kit baixa o `sqlite3`: pode demorar um pouco mais.

### 🛠️ A tarefa do grupo

1. **Fazer funcionar e provar:** com o servidor ligado, cadastre o Monitor. Depois **reinicie** o servidor (`Ctrl + C` e `npm run dev`) e liste.

```bash
curl -i -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d "@produto.json"
curl http://localhost:3000/produtos
```

   > Resultado esperado (o `POST`, e a lista **depois** do reinício):
   > ```
   > HTTP/1.1 201 Created
   > {"id":1,"nome":"Monitor","preco":1600}
   > [{"id":1,"nome":"Monitor","preco":1600}]
   > ```
   > Se o `id` não for `1`, é porque o banco já tinha produtos: apague o `mercadoagil.sqlite` com o servidor desligado e comece de novo.
2. **Mudar uma coisa:** no `config/db.js`, troque `logging: false` por `logging: console.log`. Apague o `mercadoagil.sqlite`, ligue o servidor e faça um `POST`. Olhe o terminal do servidor: é o **SQL** que o Sequelize escreveu por vocês.
   > Resultado esperado (entre outras linhas):
   > ```
   > Executing (default): CREATE TABLE IF NOT EXISTS `produto` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `nome` VARCHAR(255) NOT NULL, `preco` INTEGER NOT NULL);
   > Executing (default): INSERT INTO `produto` (`id`,`nome`,`preco`) VALUES (NULL,$1,$2);
   > ```
3. **Provocar um erro:** com o servidor desligado, apague o `mercadoagil.sqlite`, comente a linha `await sequelize.sync();` no `index.js` e ligue. Faça `curl -i http://localhost:3000/produtos`.
   > Resultado esperado: `HTTP/1.1 500 Internal Server Error`. No terminal do servidor, a pilha de erro **começa só com `Error`**. Leiam até achar:
   > ```
   > parent: [Error: SQLITE_ERROR: no such table: produto] {
   > ```
4. **Bônus (o erro que leva às migrations):** com o `sync` de volta e um produto já cadastrado, acrescentem no model o campo `estoque: { type: DataTypes.INTEGER, defaultValue: 0 },`, salvem e listem os produtos. Que erro aparece? Por que o `sync()` não resolveu?

### 🎤 O roteiro da mini-aula

| Parte | Sugestão |
|---|---|
| **Analogia** | A memória é uma **lousa** (desligou, apagou); o banco é um **caderno** (fica guardado). E o ORM é um **tradutor**: você fala JavaScript (`Produto.findAll()`), ele fala SQL com o banco (`SELECT ... FROM produto`) |
| **Demonstração** | O `POST`, o reinício **ao vivo** e o Monitor continuando lá. Se der tempo, o SQL aparecendo com o `logging: console.log` |
| **O erro** | O `no such table: produto` sem o `sync`. Mostrem que a mensagem útil **não está na primeira linha** |
| **Mercado + pergunta** | Quem usa ORM, e para quê? Pergunta sugerida: *"No projeto final, o banco vai ser o PostgreSQL. Quais arquivos do kit vocês acham que precisam mudar?"* (Dica: só a conexão.) |

### ✅ Antes de apresentar

- [ ] O Monitor continua lá depois do reinício, e o print foi mandado no canal até a véspera.
- [ ] Sabemos explicar o que é um **model** e o que o `sync()` faz.
- [ ] Sabemos explicar, com uma frase, o que fazem o `async` e o `await`.
- [ ] Sabemos ligar o model à tabela `produto` do DER das Aulas 1 e 2.
- [ ] Temos a resposta para "quem usa isso no mercado, e para quê?".
- [ ] Ensaiamos com cronômetro: coube em 5 minutos.

---

## 📊 Avaliação leve (sem nota)

Esta rubrica **não vale nota**. Ela serve para **duas** coisas: o grupo se **autoavaliar** logo depois da mini-aula, e **o grupo seguinte** dar um retorno rápido (o mesmo que faz a pergunta). Marquem uma coluna por linha.

| Critério | Faltou algo | Tudo OK | Majestoso |
|---|---|---|---|
| **Clareza** | A explicação ficou presa no código; a turma não conseguiu repetir a ideia | A analogia explicou o conceito, e a turma conseguiu repetir com as próprias palavras | A analogia foi além da do roteiro (vocês criaram ou melhoraram), e o grupo ligou o conceito ao das outras missões |
| **Demonstração** | O kit não rodou na hora, e o grupo não tinha um plano B (o print, um vídeo) | O `curl` rodou ao vivo, e o erro provocado apareceu com a mensagem real | Além do kit, o grupo mostrou a mudança que fez e explicou o erro **lendo a mensagem** em voz alta |
| **Mercado (Clear Thinking)** | "É importante para as empresas", sem exemplo | Disse **quem** usa e **para quê**, com um exemplo concreto | Trouxe um exemplo de um app que a turma usa, ou um problema real que esse conceito evita |
| **Colaboração e Discordância Positiva** | Uma pessoa falou tudo, ou a pergunta do grupo seguinte ficou sem resposta | Todas as pessoas tiveram uma parte, e o grupo respondeu à pergunta com um argumento | O grupo discordou de algo (do roteiro, do professor ou do outro grupo) com lógica, ou aceitou uma melhoria explicando por quê |

**Depois da aula, cada grupo escreve no canal da turma uma frase:** "onde travamos no estudo, e o que tentamos". É o material da retrospectiva.