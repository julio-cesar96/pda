# ✅ Gabarito comentado: revisão

**Revisão da Aula 3 do Módulo 2: o primeiro servidor Express e do modelo à API**

Este arquivo tem as respostas do **exercício em dupla** (o RangoÁgil): o servidor da Parte A, o desafio extra, a pergunta em dupla e o mapa da API da Parte B.

> **Como usar o gabarito:** ele não serve para copiar. Serve para **comparar**. Primeiro tente resolver sozinho(a). Depois confira o seu código com o daqui. Se o **resultado** no terminal for igual ao esperado, **o seu código também está certo**, mesmo escrito de outro jeito.
>
> Se o seu resultado deu diferente, não apague tudo. Compare **linha por linha** com o gabarito e descubra onde está a diferença.

---

## 📑 Sumário

- [✅ Gabarito comentado: revisão](#-gabarito-comentado-revisão)
  - [📑 Sumário](#-sumário)
  - [👥 Parte A: o servidor](#-parte-a-o-servidor)
  - [Por que funciona, passo a passo](#por-que-funciona-passo-a-passo)
  - [🚀 Desafio extra: o res.jason](#-desafio-extra-o-resjason)
  - [💬 Pergunta em dupla](#-pergunta-em-dupla)
  - [🧩 Parte B: o mapa da API](#-parte-b-o-mapa-da-api)
    - [B1 e B2: o mapa](#b1-e-b2-o-mapa)
    - [B3: as duas decisões](#b3-as-duas-decisões)
  - [❓ Dúvidas que costumam aparecer](#-dúvidas-que-costumam-aparecer)

---

## 👥 Parte A: o servidor

**Os comandos (Passos 1 e 2):**

```bash
mkdir rangoagil-api
cd rangoagil-api
npm init -y
# acrescente "type": "module" no package.json
npm install express
npm install -D nodemon
# troque o bloco "scripts" pelo dev e pelo start
```

**`package.json`** (o que o `npm init -y` criou, com as três mudanças: `"type"`, `"scripts"` e as dependências):

```json
{
  "name": "rangoagil-api",
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

A posição da linha `"type": "module"` não importa. O que importa é ela existir.

**`index.js`** (o arquivo completo, depois do Passo 6):

<!-- node:skip -->
```js
// Pergunta em dupla (exemplo de resposta):
// Time do app: o mapa diz o caminho e o formato de cada resposta, então o app
// pode ser construído agora, sem esperar ninguém e sem abrir o nosso código.
// Cliente: com GET /restaurantes e GET /pratos, quem está com fome vê onde pedir
// e quanto vai pagar antes de fechar o pedido.

import express from 'express';

// Cria o servidor: a "cozinha" do RangoÁgil
const app = express();

// Os dados ficam na memória por enquanto (o banco entra nas próximas aulas).
// Cada array é uma "tabela" do DER do RangoÁgil.
const restaurantes = [
  { id: 1, nome: 'Cozinha da Dona Neide', bairro: 'Liberdade' },
  { id: 2, nome: 'Açaí do Porto', bairro: 'Ribeira' },
];

const pratos = [
  { id: 1, nome: 'Feijoada', preco: 35, restauranteId: 1 },
  { id: 2, nome: 'Moqueca de Peixe', preco: 48, restauranteId: 1 },
  { id: 3, nome: 'Açaí 500 ml', preco: 22, restauranteId: 2 },
];

// Rota 1: GET em "/" responde com um TEXTO (a porta de entrada)
app.get('/', (req, res) => {
  res.send('Bem-vindo ao RangoÁgil! A comida do bairro na sua porta.');
});

// Rota 2: GET em "/restaurantes" responde com DADOS (JSON)
app.get('/restaurantes', (req, res) => {
  res.json(restaurantes);
});

// Rota 3: GET em "/pratos" responde com DADOS (JSON)
app.get('/pratos', (req, res) => {
  res.json(pratos);
});

// Liga o servidor na porta 3000. Se a porta estiver ocupada, o "erro" conta o motivo
app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui abrir a cozinha:', erro.message);
  } else {
    console.log('Cozinha do RangoÁgil aberta em http://localhost:3000');
  }
});
```

**Resultado no terminal do servidor** (`npm run dev`):

```
> rangoagil-api@1.0.0 dev
> nodemon index.js

[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Cozinha do RangoÁgil aberta em http://localhost:3000
```

A cada vez que você salva o arquivo, aparecem mais três linhas:

```
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
Cozinha do RangoÁgil aberta em http://localhost:3000
```

**Resultado do `curl -i` em cada rota** (as linhas `Date` e `ETag` mudam a cada teste):

```bash
curl -i http://localhost:3000/
```

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 57
ETag: W/"39-KosghVwX/1tx6BmhY2x8F0te/ls"
Date: Mon, 23 Nov 2026 13:15:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Bem-vindo ao RangoÁgil! A comida do bairro na sua porta.
```

```bash
curl -i http://localhost:3000/restaurantes
```

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 115
ETag: W/"73-YgVi5wwhMP7Kv+1Zu1Vgcur5sck"
Date: Mon, 23 Nov 2026 13:15:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"nome":"Cozinha da Dona Neide","bairro":"Liberdade"},{"id":2,"nome":"Açaí do Porto","bairro":"Ribeira"}]
```

```bash
curl -i http://localhost:3000/pratos
```

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 182
ETag: W/"b6-HVJkJsL4oAqmN7aaDP4/Alx7Qh0"
Date: Mon, 23 Nov 2026 13:15:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"nome":"Feijoada","preco":35,"restauranteId":1},{"id":2,"nome":"Moqueca de Peixe","preco":48,"restauranteId":1},{"id":3,"nome":"Açaí 500 ml","preco":22,"restauranteId":2}]
```

**Passo 8 (a conferência, sem o `-i`):**

```
Bem-vindo ao RangoÁgil! A comida do bairro na sua porta.
[{"id":1,"nome":"Cozinha da Dona Neide","bairro":"Liberdade"},{"id":2,"nome":"Açaí do Porto","bairro":"Ribeira"}]
[{"id":1,"nome":"Feijoada","preco":35,"restauranteId":1},{"id":2,"nome":"Moqueca de Peixe","preco":48,"restauranteId":1},{"id":3,"nome":"Açaí 500 ml","preco":22,"restauranteId":2}]
```

E o caminho errado:

```bash
curl http://localhost:3000/prato
```

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /prato</pre>
</body>
</html>
```

---

## Por que funciona, passo a passo

- **Passo 1:** o `npm init -y` cria o `package.json`, a "ficha" do projeto. O `"type": "module"` avisa o Node de que usamos `import`. O `npm install express` baixa o Express para a `node_modules` e anota a dependência no `package.json`.
- **Passo 2:** o `-D` coloca o Nodemon em `devDependencies`: ele só serve **enquanto você programa**. Os scripts são **atalhos**: `npm run dev` roda `nodemon index.js`, e `npm start` roda `node index.js`.
- **Passo 3:** o `app.listen(3000, ...)` abre o "balcão" 3000. O `404 Cannot GET /` é a prova de que ele está **ligado**: ele respondeu, só não tem nada no cardápio. Se estivesse desligado, o `curl` mostraria `curl: (7) Failed to connect`.
- **Passo 4:** `app.get('/', ...)` cria o primeiro item do cardápio. O `res.send` responde **texto**, por isso a etiqueta é `Content-Type: text/html`.
- **Passos 5 e 6:** os arrays ficam **antes** das rotas, porque as rotas usam esses dados. O `res.json` transforma o array em JSON, e a etiqueta vira `Content-Type: application/json`. Repare que cada array é uma **tabela do DER**: `restauranteId` em `pratos` é a FK `restaurante_id`, escrita no jeito do JavaScript.
- **Passo 7:** só cabe **um** servidor por porta. Como o `listen` recebe o `(erro) => { ... }`, o Express 5 conta o problema em vez de ficar calado: `listen EADDRINUSE: address already in use 0.0.0.0:3000`.
- **Passo 8:** `/prato` (singular) e `/pratos` são caminhos **diferentes**. Para o servidor, cada letra conta.

**Outra forma que também está certa:**

- Escrever as rotas em outra ordem, ou os dados com outros nomes de variável (desde que o JSON saia igual).
- Usar `res.send(pratos)` em vez de `res.json(pratos)`: quando recebe um array ou objeto, o `res.send` também responde JSON (testamos: a etiqueta sai `application/json`). Mas o `res.json` **deixa claro** para quem lê o código que ali saem **dados**, e é o padrão da aula.
- Mensagens diferentes no `app.listen` (o importante é avisar que ligou e mostrar o erro se não ligar). Só o **resultado esperado** do Passo 7 muda junto.

---

## 🚀 Desafio extra: o res.jason

Com `res.jason(pratos)` na rota `/pratos`:

```bash
curl -i http://localhost:3000/pratos
```

```
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
...
```

No terminal do servidor (as primeiras linhas):

```
TypeError: res.jason is not a function
    at file:///.../rangoagil-api/index.js:37:7
```

**As respostas:**

1. **`500`**. O `404` quer dizer "**você** pediu algo que não existe". O `500` quer dizer "o pedido estava certo, mas **a cozinha errou**": a culpa é do código do servidor.
2. A linha está na segunda linha da mensagem: `index.js:37:7` (linha 37, coluna 7) no arquivo deste gabarito, que tem o comentário da pergunta em dupla no topo. No seu arquivo, o número pode ser outro. O `.../node_modules/router/...` que vem depois é o **caminho por dentro do Express**: dá para ignorar.
3. **Não caiu.** O Express pega o erro daquela rota e responde `500`, e as outras rotas continuam funcionando. `/restaurantes` responde normalmente.
4. Exemplo de ideia (qualquer ideia com o cliente no centro vale): "em vez de uma página de erro em inglês, o app mostra *'Não conseguimos carregar o cardápio agora. Tente de novo em instantes.'* e o time recebe um aviso para consertar". Responder erros de um jeito claro é assunto das próximas aulas.

---

## 💬 Pergunta em dupla

Qualquer resposta com a mesma ideia vale. Exemplo (é o comentário no topo do `index.js` acima):

- **Pensando no time do app:** o mapa diz **o caminho** e **o formato** de cada resposta. Com isso, o app pode ser construído **agora**, sem esperar ninguém e sem abrir o código do servidor. É o "contrato" do Bloco 2.
- **Pensando no cliente:** com `GET /restaurantes` e `GET /pratos`, quem está com fome vê **onde pedir** e **quanto vai pagar** antes de fechar o pedido.

---

## 🧩 Parte B: o mapa da API

### B1 e B2: o mapa

```markdown
# Mapa da API do RangoÁgil

| Tabela do DER | Método | Caminho | Quando | Quem usa e para quê |
|---|---|---|---|---|
| RESTAURANTE | GET | /restaurantes | ✅ Hoje | O cliente, no app: escolher onde pedir |
| PRATO | GET | /pratos | ✅ Hoje | O cliente: ver o cardápio e o preço. O restaurante: conferir o próprio cardápio |
| PEDIDO | GET | /pedidos | ⏳ Próximas aulas | O restaurante, no painel: saber o que preparar |
| CLIENTE | GET | /clientes 🟡 | ⏳ Próximas aulas | Só o suporte (uso interno): tem email e telefone |
| ITEM_PEDIDO | — | sem rota própria | ⏳ Próximas aulas | Os itens aparecem dentro do pedido |
```

**Por que funciona:**

- **Pergunta 1** ("tem dados próprios e alguém quer a lista?"): `RESTAURANTE`, `PRATO`, `PEDIDO` e `CLIENTE` viram **substantivos no plural, minúsculos e sem acento**.
- **Pergunta 2** ("é um encontro que só faz sentido dentro de outra caixa?"): o item não existe sem o pedido. Quem abre "o pedido 7" quer ver os itens **junto**. Por isso ele não ganha rota própria agora.
- **Pergunta 3** ("quem usa e para quê?"): `/clientes` é a única rota com **dado pessoal** (email e telefone), por isso o 🟡.

**Pontos de discussão (qualquer argumento vale, desde que seja um argumento):**

- **Quem usa `/pedidos`?** Além do restaurante, o **entregador** (para saber o que buscar) e o **cliente** (para acompanhar). Mas o cliente deveria ver **só os pedidos dele**, e não a lista de todos. Isso pede rotas com filtro e login, assunto das próximas aulas.
- **`/itens-pedido` com rota própria?** É defensável **no painel interno**, por exemplo para um relatório "quais pratos mais vendem". Se a dupla defendeu isso com o argumento de quem usa, está certo. Repare que o nome segue as regras: plural, minúsculo e com **hífen**, não `itens_pedido` nem `itensPedido`.
- **`/cardapio` em vez de `/pratos`** (a discussão do Passo 6): `/cardapio` é a palavra que o **cliente** usa, mas `/pratos` é o nome da **tabela** e é plural, como as outras rotas. Quem lê o DER adivinha `/pratos`. As duas escolhas são defensáveis; o importante é **uma** só, usada em todo lugar.

### B3: as duas decisões

**1. Liberar `GET /clientes` no app público?**

Exemplo de argumento de cada lado:

- **A favor (navegadora):** "Mostrar quem já pediu dá confiança a quem nunca comeu ali."
- **Contra (pilota):** "A lista tem **email e telefone** de todo mundo. Qualquer pessoa com o app teria esses dados, e a **LGPD** proíbe expor dado pessoal sem necessidade. A confiança pode vir de um número: *'120 pedidos este mês'*, sem expor ninguém."

A decisão mais forte é **não liberar**: a necessidade do colega (mostrar movimento) se resolve **sem** os dados pessoais. Mas a nota vai para o **argumento**, não para o lado escolhido.

**2. De onde vem o preço da tela "Meus pedidos"?**

De **`ITEM_PEDIDO.preco_pago`**. O `PRATO.preco` é o preço **de hoje**: se a Feijoada subir de 35 para 40, o histórico da cliente mudaria sozinho e mostraria um valor que ela **não pagou**. O `preco_pago` congela o preço **do dia do pedido**. É a mesma lição do IngressoÁgil: o **85** da Roda de Samba só saiu certo porque o preço pago morava no item.

---

## ❓ Dúvidas que costumam aparecer

**"O meu código está diferente do gabarito, mas o resultado é igual. Está errado?"**
Não. Se o `curl` mostra o mesmo resultado, está certo.

**"Deu `Cannot GET /` no Passo 3. Errei?"**
Não: é o resultado esperado. O servidor está **ligado** e respondeu `404`, porque o cardápio ainda está vazio. Errado seria `curl: (7) Failed to connect`.

**"Mudei o código, mas a resposta continua a antiga."**
O servidor foi ligado com `node index.js` (ou `npm start`). Sem o Nodemon, ele não percebe que o arquivo mudou. Use `npm run dev`.

**"Deu `EADDRINUSE` logo no Passo 3, sem eu abrir dois terminais."**
O servidor da **revisão** (MúsicaÁgil) provavelmente ainda está ligado em algum terminal. Ache esse terminal e aperte `Ctrl + C`.

**"Deu `sh: 1: nodemon: not found` no `npm run dev`."**
O Nodemon não foi instalado **nesta pasta**. Rode `npm install -D nodemon` dentro da `rangoagil-api`. Digitar `nodemon` direto no terminal também dá esse erro: use o atalho `npm run dev`.

**"Deu `Cannot find package 'express'`, mas eu instalei!"**
Você instalou em **outra pasta** (por exemplo, na da revisão). O Express precisa estar na `node_modules` **do projeto que você está rodando**. Confira com `ls` (ou `dir`, no Windows) se a `node_modules` está na `rangoagil-api`.

**"O prompt do terminal apareceu grudado no fim do JSON."**
É normal. O `curl` mostra a resposta sem pular linha no fim.

**"Por que entregar sem a `node_modules`?"**
Porque ela é **grande** e pode ser recriada a qualquer momento com `npm install`: o `package.json` guarda a lista do que instalar. É por isso que o `.gitignore` do repositório da turma já ignora a `node_modules`.

**"Por que o `ITEM_PEDIDO` não virou rota, se ele é uma tabela?"**
Porque o item só faz sentido **dentro** do pedido. Rota é para o que alguém quer ver **sozinho**. Quando aprendermos rotas mais completas, os itens vão aparecer junto do pedido. Se a dupla defendeu uma rota própria para um uso interno, com argumento, também vale.

---

**Conseguiu resolver tudo?** Ótimo! Agora pense no app que você mais usa e **desenhe o DER de 3 caixas** dele. Depois escreva o mapa de rotas `GET` a partir do desenho e crie **uma** delas num servidor Express. Quem consegue criar o problema entende o conteúdo de verdade. 🚀