# 🔄 Aula de revisão: Destructuring, Spread e Rest

**Revisão da Aula 2: arrays de objetos (JavaScript / Node.js)**

Hoje não tem conteúdo novo. Vamos **reativar** o que você já viu, em 25 minutos, e depois **colocar a mão no código** num exercício em dupla.

> **Regra de ouro (a mesma de sempre):** escreva uma linha, rode, veja o resultado. Rodou, viu, entendeu.
>
> O material completo continua no `README.md` da Aula 2. Aqui está só o essencial.

---

## 📑 Sumário

- [🔄 Aula de revisão: Destructuring, Spread e Rest](#-aula-de-revisão-destructuring-spread-e-rest)
  - [📑 Sumário](#-sumário)
  - [⏱️ Roteiro dos 25 minutos](#️-roteiro-dos-25-minutos)
  - [🔥 Aquecimento (3 min)](#-aquecimento-3-min)
  - [Bloco 1 · Objetos, arrays e destructuring (6 min)](#bloco-1--objetos-arrays-e-destructuring-6-min)
  - [Bloco 2 · Spread e o bug do apelido (6 min)](#bloco-2--spread-e-o-bug-do-apelido-6-min)
  - [Bloco 3 · Rest e a diferença para o spread (8 min)](#bloco-3--rest-e-a-diferença-para-o-spread-8-min)
  - [👥 Exercício em dupla: o pedido da Dani](#-exercício-em-dupla-o-pedido-da-dani)
    - [🎯 O cenário](#-o-cenário)
    - [🧭 Como a dupla trabalha (High Agency na prática)](#-como-a-dupla-trabalha-high-agency-na-prática)
    - [📄 Os dados](#-os-dados)
    - [🪜 Os passos](#-os-passos)
    - [🚀 Desafio extra: quando o código quebra](#-desafio-extra-quando-o-código-quebra)
    - [🐞 Se aparecer erro](#-se-aparecer-erro)
    - [✅ Antes de entregar](#-antes-de-entregar)

---

## ⏱️ Roteiro dos 25 minutos

| Tempo | O que acontece |
|---|---|
| 0 a 3 min | Aquecimento: o que você lembra? |
| 3 a 9 min | Bloco 1: objetos, arrays e destructuring |
| 9 a 15 min | Bloco 2: spread e o bug do apelido |
| 15 a 23 min | Bloco 3: rest e spread x rest |
| 23 a 25 min | Fechamento e preparação para o exercício |

---

## 🔥 Aquecimento (3 min)

Sem olhar o material, responda em voz alta ou numa folha. Se não lembrar, tudo bem: **errar aqui é o objetivo**, porque mostra o que precisa ser revisto.

1. Um carrinho de compras é um **objeto** ou um **array**? E cada produto dentro dele?
2. Qual é a posição do **primeiro** item de uma lista?
3. Para que serve o `...` (três pontos)? E se eu disser que ele tem **dois** usos, você consegue chutar quais?

<details>
<summary>💡 Ver respostas</summary>

1. O carrinho é um **array** (lista). Cada produto é um **objeto** (ficha). Juntos: um **array de objetos**.
2. Posição **0**.
3. **Spread** (espalhar, para copiar) e **rest** (juntar o que sobrou).

</details>

---

## Bloco 1 · Objetos, arrays e destructuring (6 min)

**Objetivo:** ler dados de um pedido e tirar só o que precisamos.

**O porquê:** destructuring é tirar da mochila só a carteira e o celular, em vez de despejar tudo.

```js
const pedido = {
  cliente: { nome: 'Ana Souza', cpf: '123.456.789-00' },
  carrinho: [
    { nome: 'Teclado', preco: 350 },
    { nome: 'Mouse', preco: 120 },
  ],
  pagamento: 'pix',
};

// Para ler um campo: ponto. Para ler um item: posição (começa no 0)
console.log(pedido.carrinho[1].preco); // 120

// Destructuring de OBJETO: chaves, pelo NOME do campo
const { cliente, carrinho, pagamento } = pedido;
console.log(pagamento, carrinho.length); // pix 2

// Valor padrão: o campo não existe, então vale o que vem depois do =
const { cupom = 'SEM CUPOM' } = pedido;
console.log(cupom); // SEM CUPOM

// Destructuring de ARRAY: colchetes, pela POSIÇÃO
const [primeiroItem, segundoItem] = carrinho;
console.log(primeiroItem.nome, segundoItem.preco); // Teclado 120
```

**Resultado esperado no terminal:**

```
120
pix 2
SEM CUPOM
Teclado 120
```

| | Objeto | Array |
|---|---|---|
| Símbolo | `{ }` chaves | `[ ]` colchetes |
| Escolhe pelo... | **nome** do campo | **posição** na lista |

**💬 E daí?** Sem valor padrão, um pedido sem cupom mostraria `undefined` na tela do cliente. Parece pequeno, mas é o tipo de detalhe que faz o cliente desconfiar do app.

**✅ Checkpoint:** se eu escrever `const { pagamentos } = pedido;`, o que aparece no terminal? Por quê?

<details>
<summary>💡 Ver resposta</summary>

Aparece `undefined`. O nome entre chaves precisa ser **igual** ao nome do campo, e `pagamentos` (com "s") não existe no pedido.

</details>

---

## Bloco 2 · Spread e o bug do apelido (6 min)

**Objetivo:** copiar sem estragar o original.

**O porquê:** o spread é uma **fotocópia**: você copia a ficha inteira e corrige só o campo que muda na cópia. Já `const copia = original` não copia nada: cria um **apelido** para a mesma ficha.

Primeiro, **o problema**:

```js
const teclado = { nome: 'Teclado', preco: 350 };

const apelido = teclado; // parece cópia, mas é o mesmo objeto!
apelido.preco = 280;

console.log(teclado.preco); // 280 😱 o preço original mudou
```

Agora, **a solução**:

```js
const mouse = { nome: 'Mouse', preco: 120 };

// Spread em OBJETO: copia tudo e troca só o preço na cópia
const mousePromocao = { ...mouse, preco: 100 };
console.log(mouse.preco, mousePromocao.preco); // 120 100

// Spread em ARRAY: lista nova com tudo do carrinho + o monitor
const carrinho = [
  { nome: 'Teclado', preco: 350 },
  mouse,
];
const carrinhoNovo = [...carrinho, { nome: 'Monitor', preco: 1600 }];
console.log(carrinho.length, carrinhoNovo.length); // 2 3
```

**Resultado esperado no terminal** (o bloco do problema e o da solução ficam em arquivos separados):

```
280          <- arquivo do problema
120 100      <- arquivo da solução
2 3
```

**💬 E daí?** Se o sistema sobrescrever o preço original, a promoção acaba e o produto continua barato. A loja vende com prejuízo até alguém perceber.

**✅ Checkpoint:** quando a Ana remove um item do carrinho e o app mostra o botão "desfazer", o que o app precisa ter guardado?

<details>
<summary>💡 Ver resposta</summary>

A **versão anterior** do carrinho. Isso só é possível porque o spread criou uma lista **nova** em vez de mexer na original.

</details>

---

## Bloco 3 · Rest e a diferença para o spread (8 min)

**Objetivo:** separar um campo e juntar o resto, e saber distinguir `...` de spread e de rest.

**O porquê:** rest é "tira o que eu pedi e coloca **todo o resto** numa caixa". O uso mais importante: **esconder o CPF** antes de mostrar os dados do cliente (LGPD).

```js
const cliente = { nome: 'Ana Souza', email: 'ana@email.com', cpf: '123.456.789-00' };

// Rest em OBJETO: o cpf fica separado, o resto vai para clienteSeguro
const { cpf, ...clienteSeguro } = cliente;
console.log(clienteSeguro); // { nome: 'Ana Souza', email: 'ana@email.com' }

// Rest em ARRAY: o primeiro vai para uma variável, o resto vai junto numa lista
const carrinho = [
  { nome: 'Teclado', preco: 350 },
  { nome: 'Mouse', preco: 120 },
  { nome: 'Monitor', preco: 1600 },
];
const [principal, ...outros] = carrinho;
console.log(principal.nome, outros.length); // Teclado 2

// Rest em FUNÇÃO: aceita quantos itens vierem
function registrar(nomeCliente, ...itens) {
  console.log(nomeCliente, itens.length);
}

registrar('Ana', carrinho[0], carrinho[1]); // Ana 2
registrar('Ana', ...carrinho);              // Ana 3  (spread na chamada!)
```

**Resultado esperado no terminal:**

```
{ nome: 'Ana Souza', email: 'ana@email.com' }
Teclado 2
Ana 2
Ana 3
```

**Spread x Rest, de uma vez:**

| | Spread | Rest |
|---|---|---|
| O que faz | **Espalha** (abre a caixa) | **Junta** (fecha a caixa) |
| Onde aparece | Lado direito do `=` ou **na chamada** da função | Lado esquerdo do `=` ou **nos ingredientes** da função |
| Pergunta-chave | "Estou **criando** algo novo?" | "Estou **recebendo** o que sobrou?" |

**💬 E daí?** "Tira o CPF dessa resposta" é um dos pedidos mais comuns para quem começa a trabalhar como dev. Quem sabe fazer isso em 1 linha entrega mais rápido e protege o cliente.

**✅ Checkpoint (olhe só para este código e responda):**

```js
registrar('Ana', ...carrinho);
function registrar(nomeCliente, ...itens) { /* ... */ }
```

Os dois `...` fazem a mesma coisa? Qual é spread e qual é rest?

<details>
<summary>💡 Ver resposta</summary>

Não fazem a mesma coisa. O da **chamada** (`...carrinho`) é **spread**: espalha os itens soltos. O da **definição** (`...itens`) é **rest**: junta os itens de volta numa lista.

</details>

---

## 👥 Exercício em dupla: o pedido da Dani

**Tempo sugerido:** 30 minutos. **Como fazer:** uma pessoa é a **pilota** (digita) e a outra é a **navegadora** (lê o enunciado e confere o resultado). **Troquem de papel a cada passo.**

### 🎯 O cenário

A Dani Rocha fez um pedido na LojaÁgil e vai receber um **recibo na tela**. O time de segurança deixou uma regra clara: o recibo **nunca** pode mostrar o CPF dela. Seu trabalho é preparar os dados e gerar o recibo **sem estragar o pedido original**.

### 🧭 Como a dupla trabalha (High Agency na prática)

- **Bias to Action:** faça **um passo, rode, confira**. Não escreva o arquivo inteiro para só depois rodar.
- **Clear Thinking:** antes de cada passo, a dupla responde em voz alta: **"quem é o cliente aqui e o que ele precisa ver?"**
- **Discordância Positiva:** em pelo menos **2 passos**, a navegadora propõe **outra forma** de resolver (por exemplo: tirar os campos numa linha só ou em duas). A dupla testa as duas e escolhe a mais clara. Ganha quem tem o argumento melhor, **não** quem fala mais alto.

### 📄 Os dados

Crie o arquivo `exercicio-revisao.js` e copie:

```js
const pedidoDani = {
  cliente: {
    nome: 'Dani Rocha',
    email: 'dani@email.com',
    cpf: '555.666.777-88',
    cidade: 'Recife',
  },
  carrinho: [
    { nome: 'Fone', preco: 90 },
    { nome: 'Webcam', preco: 200 },
  ],
  pagamento: 'cartao',
};

const cabo = { nome: 'Cabo USB', preco: 30 };
```

### 🪜 Os passos

Rode o arquivo **depois de cada passo** e compare com o resultado esperado.

**Passo 1: Destructuring.** Tire `cliente`, `carrinho` e `pagamento` do `pedidoDani`. Na mesma linha, tire também `desconto`, com valor padrão `0`. Mostre `pagamento` e `desconto` no mesmo `console.log`.

> Resultado esperado: `cartao 0`

**Passo 2: Destructuring do cliente.** Do `cliente`, tire `nome` e `cidade`. Mostre os dois no mesmo `console.log`.

> Resultado esperado: `Dani Rocha Recife`

**Passo 3: Spread em array.** A Dani decidiu levar o cabo. Crie `carrinhoNovo` com tudo do `carrinho` e o `cabo` no final. Mostre o tamanho dos dois carrinhos.

> Resultado esperado: `2 3`

**Passo 4: Spread em objeto.** A webcam entrou em promoção por 150. Crie `webcamPromocao` como uma cópia da webcam (que está em `carrinho[1]`) com o preço novo. Mostre o preço da webcam original e o da promoção.

> Resultado esperado: `200 150`

**Passo 5: Rest em objeto.** Crie `clienteSeguro` com os dados da Dani **sem** o `cpf`. Mostre no terminal.

> Resultado esperado: `{ nome: 'Dani Rocha', email: 'dani@email.com', cidade: 'Recife' }`

**Passo 6: Rest em array.** Do `carrinhoNovo`, tire o primeiro item numa variável `primeiro` e junte o resto numa lista `demais`. Mostre o nome do primeiro item e quantos itens sobraram.

> Resultado esperado: `Fone 2`

**Passo 7: Função com rest + spread na chamada.** Crie a função `gerarRecibo` que recebe o nome da cliente e depois **quantos itens vierem** (use rest). Dentro dela:

- tire os três itens em variáveis (`item1`, `item2`, `item3`) com destructuring de array;
- mostre o nome da cliente, a quantidade de itens e o total (a soma dos três preços).

Chame a função passando o `nome` e os itens do `carrinhoNovo` **espalhados** (spread).

> Resultado esperado:
> ```
> Cliente: Dani Rocha
> Quantidade de itens: 3
> Total: 320
> ```

**Passo 8: Conferindo que nada foi estragado.** Mostre o tamanho do `carrinho` original e o campo `cpf` do `clienteSeguro`.

> Resultado esperado: `2 undefined`
>
> O `undefined` aqui é **a prova de que deu certo**: o CPF não está no `clienteSeguro`.

### 🚀 Desafio extra: quando o código quebra

Chame `gerarRecibo` com os itens do `carrinho` **original** (só 2 itens), em vez do `carrinhoNovo`:

```js
gerarRecibo(nome, ...carrinho);
```

1. O que acontece? Leia a mensagem de erro **inteira**, com calma.
2. Qual linha o erro aponta?
3. Por que a função, que usa rest para "aceitar quantos itens vierem", quebrou mesmo assim?
4. Conversem: como a função poderia somar os preços **qualquer que seja** a quantidade de itens? Vocês ainda não têm todas as ferramentas, e tudo bem. **Anotem a ideia de vocês**, ela é o ponto de partida da próxima aula.

### 🐞 Se aparecer erro

Erro é pista, não bronca. Antes de chamar o professor, a dupla faz **duas coisas**: lê a mensagem inteira e tenta uma correção. Depois, se continuar travada, chama.

| O que aparece | O que provavelmente aconteceu |
|---|---|
| `undefined` onde não devia | Nome da variável diferente do nome do campo (maiúscula conta!), ou `{ }` e `[ ]` trocados |
| `Identifier 'x' has already been declared` | A mesma variável foi criada duas vezes no arquivo |
| `Rest element must be last element` | O `...resto` não está por último |
| O original mudou junto com a cópia | Foi usado `const copia = original` em vez do spread |

### ✅ Antes de entregar

- [ ] Todos os resultados batem com o esperado?
- [ ] A dupla trocou de papel a cada passo?
- [ ] Alguém na dupla consegue explicar, **com as próprias palavras**, a diferença entre spread e rest?
- [ ] A dupla discordou de forma positiva em pelo menos 2 passos?