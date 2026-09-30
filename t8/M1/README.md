# 🛒 Organizando dados de uma loja virtual

**Aula: arrays de objetos com Destructuring, Spread e Rest (JavaScript / Node.js)**

Neste material você vai encontrar tudo o que vimos em aula, o exercício que fizemos em dupla e uma lista com 4 exercícios para praticar.

> **Regra de ouro:** escreva uma linha, rode, veja o resultado. Rodou, viu, entendeu. Se der erro, leia a mensagem com calma: ela é uma pista, não uma bronca. Todo mundo que programa erra o tempo todo.

---

## 📑 Sumário

1. [Como usar este material](#-como-usar-este-material)
2. [Vocabulário da aula](#-vocabulário-da-aula)
3. [Objetos, arrays e arrays de objetos](#1-objetos-arrays-e-arrays-de-objetos)
4. [Destructuring: tirando informações](#2-destructuring-tirando-informações)
5. [Spread: fazendo cópias novas](#3-spread-fazendo-cópias-novas-sem-estragar-o-original)
6. [Rest: juntando o que sobrou](#4-rest-juntando-o-que-sobrou)
7. [Resumo: Spread x Rest](#-resumo-spread-x-rest)
8. [Exercício da aula: o pedido da Ana](#-exercício-da-aula-montando-o-pedido-da-ana)
9. [Lista de exercícios](#-lista-de-exercícios)
10. [Erros comuns e o que eles significam](#-erros-comuns-e-o-que-eles-significam)

---

## 💻 Como usar este material

1. Crie uma pasta no seu computador para esta aula.
2. Para cada exemplo ou exercício, crie **um arquivo novo** (por exemplo: `exemplo1.js`, `exercicio1.js`). Assim, uma variável de um exercício não atrapalha o outro.
3. **Digite o código em vez de copiar e colar.** Digitar ajuda a memorizar, e os erros de digitação ensinam a ler mensagens de erro.
4. Para rodar, abra o terminal na pasta e use:

```bash
node nome-do-arquivo.js
```

---

## 📖 Vocabulário da aula

| Palavra | Significado simples |
|---|---|
| Objeto `{ }` | Uma **ficha** com informações sobre uma coisa (um produto, um cliente) |
| Chave | O **nome do campo** na ficha (ex.: `preco`) |
| Valor | O que está **escrito no campo** (ex.: `350`) |
| Array `[ ]` | Uma **lista** de coisas, em ordem |
| Posição (índice) | O lugar do item na lista. **Começa no 0** |
| Destructuring | **Tirar** informações de dentro de um objeto ou array e guardar em variáveis |
| Spread `...` | **Espalhar** o conteúdo para fazer uma cópia nova |
| Rest `...` | **Juntar** o que sobrou em um grupo |

---

## O cenário: um pedido na LojaÁgil

Quando alguém compra pelo app de uma loja e aperta "Finalizar compra", o app envia para o servidor (um programa em Node.js) um pacote de informações parecido com este:

```js
const pedido = {
  cliente: {
    nome: 'Ana Souza',
    email: 'ana@email.com',
    cpf: '123.456.789-00',
  },
  carrinho: [
    { nome: 'Teclado', preco: 350 },
    { nome: 'Mouse', preco: 120 },
  ],
  pagamento: 'pix',
};
```

O servidor precisa **ler** o que veio no pedido, **atualizar** o carrinho sem perder a versão anterior e **esconder** os dados pessoais antes de mostrar na tela. É isso que vamos aprender.

---

## 1. Objetos, arrays e arrays de objetos

### Objeto: uma ficha de produto

```js
// Um objeto: uma ficha com chaves (nomes dos campos) e valores
const produto = {
  nome: 'Teclado',
  preco: 350,
  estoque: 10,
};

// Para ler um campo, usamos o ponto
console.log(produto.nome);  // Teclado
console.log(produto.preco); // 350
```

Os campos são separados por **vírgula**. Cada campo tem uma chave (`nome`) e um valor (`'Teclado'`).

### Array: uma lista

```js
// Um array: uma lista em ordem, entre colchetes
const categorias = ['Teclados', 'Mouses', 'Monitores'];

// Para ler um item, usamos a posição. A primeira posição é 0!
console.log(categorias[0]); // Teclados
console.log(categorias[2]); // Monitores

// .length diz quantos itens tem na lista
console.log(categorias.length); // 3
```

Pense numa fila: a primeira pessoa está na posição **0**, a segunda na posição **1**, e assim por diante. É estranho no começo, e todo mundo estranha.

### Array de objetos: o carrinho

```js
// Um carrinho é uma LISTA de FICHAS
const carrinho = [
  { nome: 'Teclado', preco: 350 },
  { nome: 'Mouse', preco: 120 },
];

// Primeiro escolho a posição, depois o campo
console.log(carrinho[0].nome);  // Teclado
console.log(carrinho[1].preco); // 120
```

---

## 2. Destructuring: tirando informações

**Por que usar?** Imagine uma mochila cheia. Quando você precisa só da carteira e do celular, você **tira** o que precisa. Destructuring é isso: você diz "deste objeto, eu quero estes campos", e o JavaScript cria uma variável para cada um. O código fica mais curto e mais fácil de ler.

### Sem e com destructuring

```js
const cliente = {
  nome: 'Ana Souza',
  email: 'ana@email.com',
  cpf: '123.456.789-00',
};

// ❌ Jeito longo: uma linha para cada campo
// const nome = cliente.nome;
// const email = cliente.email;

// ✅ Com destructuring: tudo em uma linha
const { nome, email } = cliente;

console.log(nome);  // Ana Souza
console.log(email); // ana@email.com
```

> ⚠️ **Atenção:** o nome dentro das chaves precisa ser **igual** ao nome do campo no objeto. Se você escrever `const { nomes } = cliente;`, vai aparecer `undefined`, que é o jeito do JavaScript dizer "não achei esse campo".

### Tirando as partes do pedido

```js
const pedido = {
  cliente: { nome: 'Ana Souza', email: 'ana@email.com' },
  carrinho: [
    { nome: 'Teclado', preco: 350 },
    { nome: 'Mouse', preco: 120 },
  ],
  pagamento: 'pix',
};

// Tira as três partes principais do pedido
const { cliente, carrinho, pagamento } = pedido;

console.log(pagamento);       // pix
console.log(carrinho.length); // 2
```

### Valor padrão: quando o campo não vem

```js
// O pedido não tem cupom. Se não vier, usamos 'SEM CUPOM'
const { cupom = 'SEM CUPOM' } = pedido;

console.log(cupom); // SEM CUPOM
```

Nem todo pedido tem cupom, nem todo cliente preenche o telefone. O valor padrão evita que o sistema mostre `undefined` para o cliente.

### Destructuring de array: a posição é que manda

```js
// Em arrays usamos COLCHETES, e o que importa é a ordem
const [primeiroItem, segundoItem] = carrinho;

console.log(primeiroItem);      // { nome: 'Teclado', preco: 350 }
console.log(segundoItem.preco); // 120
```

| | Objeto | Array |
|---|---|---|
| Símbolo | `{ }` chaves | `[ ]` colchetes |
| Como escolhe | Pelo **nome** do campo | Pela **posição** na lista |
| Exemplo | `const { nome } = cliente` | `const [primeiro] = carrinho` |

> 💬 **E daí?** O código de uma empresa é lido por muitas pessoas. Quando alguém vê `const { cliente, carrinho, pagamento } = pedido`, entende em um segundo o que aquele código usa. Código fácil de ler é código que dá menos defeito.

---

## 3. Spread: fazendo cópias novas sem estragar o original

**Por que usar?** Numa loja, o preço original de um produto é importante: ele volta a valer quando a promoção acaba. Se o programa **apagar** o preço original para colocar o promocional, essa informação se perde. O spread (`...`) funciona como uma **fotocópia**: você copia a ficha inteira e corrige só o campo que muda na cópia.

### Primeiro, o problema

```js
const produto = { nome: 'Teclado', preco: 350 };

// Parece que criamos uma cópia... mas não!
const promocao = produto;
promocao.preco = 280;

console.log(produto.preco); // 280 😱 o preço original mudou!
```

`produto` e `promocao` são dois **apelidos** para a **mesma** ficha. Se a Ana é chamada de "Aninha" em casa, mudar o cabelo da Aninha é mudar o cabelo da Ana.

### A solução: spread em objeto

```js
const teclado = { nome: 'Teclado', preco: 350 };

// "Copia tudo do teclado e troca o preço na cópia"
const tecladoPromocao = { ...teclado, preco: 280 };

console.log(teclado.preco);         // 350 ✅ original intacto
console.log(tecladoPromocao.preco); // 280
console.log(tecladoPromocao.nome);  // Teclado (veio da cópia)
```

Leia os três pontos como "**espalha aqui dentro** tudo o que tem no teclado". O campo que vem **depois** substitui o de antes.

### Spread em array: adicionar item ao carrinho

```js
const carrinho = [
  { nome: 'Teclado', preco: 350 },
  { nome: 'Mouse', preco: 120 },
];

// "Uma lista nova com tudo do carrinho + o monitor no final"
const carrinhoAtualizado = [...carrinho, { nome: 'Monitor', preco: 1600 }];

console.log(carrinho.length);           // 2 (original igual)
console.log(carrinhoAtualizado.length); // 3
```

Sabe quando o app pergunta "você removeu um item, deseja desfazer?"? Isso só é possível porque a versão anterior do carrinho foi guardada.

### Spread para juntar duas listas

```js
// A pessoa montou um carrinho no celular e outro no computador
const carrinhoCelular = [{ nome: 'Fone', preco: 90 }];
const carrinhoComputador = [{ nome: 'Webcam', preco: 200 }];

const carrinhoJunto = [...carrinhoCelular, ...carrinhoComputador];

console.log(carrinhoJunto.length); // 2
```

> 💬 **E daí?** Se o sistema estragar o preço original, a loja pode ficar vendendo com desconto por semanas sem perceber. Um erro de uma linha pode virar muito dinheiro perdido.

---

## 4. Rest: juntando o que sobrou

**Por que usar?** Às vezes você quer tirar **uma** informação e ficar com **todo o resto**. O caso mais importante: mostrar os dados de um cliente **sem o CPF**. O rest separa o que você quer tirar e junta o resto numa ficha nova.

### Rest em objeto: escondendo o CPF

```js
const cliente = {
  nome: 'Ana Souza',
  email: 'ana@email.com',
  cpf: '123.456.789-00',
};

// "Tira o cpf; todo o resto vai para clienteSeguro"
const { cpf, ...clienteSeguro } = cliente;

console.log(clienteSeguro); // { nome: 'Ana Souza', email: 'ana@email.com' }
```

A **LGPD** (Lei Geral de Proteção de Dados) obriga empresas a proteger dados pessoais como o CPF. Esse é um pedido muito comum para quem começa a trabalhar como dev: "tira o CPF dessa resposta".

### Rest em array: o primeiro e o resto

```js
const carrinho = [
  { nome: 'Teclado', preco: 350 },
  { nome: 'Mouse', preco: 120 },
  { nome: 'Monitor', preco: 1600 },
];

// O primeiro vai para uma variável; o resto vai junto numa lista
const [principal, ...outros] = carrinho;

console.log(principal.nome); // Teclado
console.log(outros.length);  // 2
```

### Rest em função: aceitar quantos produtos vierem

Uma **função** é uma **receita com nome**. Você escreve os passos uma vez e usa quantas vezes quiser. O que vai entre parênteses são os **ingredientes** que a receita recebe.

```js
// "nomeCliente" recebe o primeiro valor; "...produtos" junta TODO o resto numa lista
function registrarPedido(nomeCliente, ...produtos) {
  console.log('Cliente:', nomeCliente);
  console.log('Quantidade de produtos:', produtos.length);
  console.log('Produtos:', produtos);
}

// Podemos chamar com quantos produtos quisermos
registrarPedido('Ana', 'Teclado', 'Mouse', 'Monitor');
registrarPedido('Bruno', 'Cabo USB');
```

Resultado:

```
Cliente: Ana
Quantidade de produtos: 3
Produtos: [ 'Teclado', 'Mouse', 'Monitor' ]
Cliente: Bruno
Quantidade de produtos: 1
Produtos: [ 'Cabo USB' ]
```

Um pedido pode ter 1 ou 50 produtos. Com rest, a mesma função serve para todos os casos.

---

## 🧠 Resumo: Spread x Rest

Os dois usam os mesmos três pontos `...`, mas fazem trabalhos **opostos**:

| | Spread | Rest |
|---|---|---|
| O que faz | **Espalha** (abre a caixa e tira tudo) | **Junta** (coloca o que sobrou numa caixa) |
| Onde aparece | Do lado **direito** do `=`, ou ao chamar uma função | Do lado **esquerdo** do `=`, ou nos ingredientes da função |
| Exemplo | `const copia = { ...produto }` | `const { cpf, ...resto } = cliente` |

**Dica:** se os três pontos estão **criando** algo novo, é spread. Se estão **recebendo** o que sobrou, é rest.

| Quero... | Uso |
|---|---|
| **Tirar** dados de um pedido | Destructuring |
| Fazer uma **cópia** sem estragar o original | Spread |
| **Esconder** um campo (como o CPF) | Rest |

---

## 👥 Exercício da aula: montando o pedido da Ana

Faça em dupla: uma pessoa digita e a outra lê o enunciado e confere o resultado. **Troquem de papel a cada passo.**

Crie um arquivo `exercicio-aula.js` e copie os dados abaixo:

```js
const pedido = {
  cliente: {
    nome: 'Ana Souza',
    email: 'ana@email.com',
    cpf: '123.456.789-00',
    cidade: 'Salvador',
  },
  carrinho: [
    { nome: 'Teclado', preco: 350 },
    { nome: 'Mouse', preco: 120 },
  ],
  pagamento: 'cartao',
};

const monitor = { nome: 'Monitor', preco: 1600 };
```

Faça um passo de cada vez. **Rode o arquivo depois de cada passo** e confira se o resultado é igual ao esperado.

**Passo 1 — Destructuring.** Tire `cliente`, `carrinho` e `pagamento` de dentro do `pedido`. Mostre o `pagamento` no terminal.
> Resultado esperado: `cartao`

**Passo 2 — Destructuring com valor padrão.** Tire o campo `cupom` do `pedido`. Como ele não existe, use o valor padrão `'SEM CUPOM'`. Mostre no terminal.
> Resultado esperado: `SEM CUPOM`

**Passo 3 — Destructuring do cliente.** Do `cliente`, tire o `nome` e a `cidade`. Mostre os dois no mesmo `console.log`.
> Resultado esperado: `Ana Souza Salvador`

**Passo 4 — Spread em array.** A Ana decidiu levar o monitor. Crie `carrinhoFinal` com tudo do `carrinho` e o `monitor` no final. Mostre o tamanho dos dois carrinhos.
> Resultado esperado: `2 3`

**Passo 5 — Spread em objeto.** O mouse entrou em promoção por 100. Crie `mousePromocao` como uma cópia do mouse (que está em `carrinho[1]`) com o preço novo. Mostre o preço do mouse original e o da promoção.
> Resultado esperado: `120 100`

**Passo 6 — Rest em objeto.** O time de segurança pediu: os dados da cliente só podem aparecer na tela **sem o CPF**. Crie `clienteSeguro` sem o `cpf` e mostre no terminal.
> Resultado esperado: `{ nome: 'Ana Souza', email: 'ana@email.com', cidade: 'Salvador' }`

**Passo 7 — Destructuring de array + conta.** Do `carrinhoFinal`, tire os três itens em variáveis (`item1`, `item2`, `item3`). Some os preços dos três e mostre o total.
> Resultado esperado: `Total: 2070`

**🚀 Desafio extra:** crie uma função `resumoDoPedido` que recebe o nome da cliente e depois **quantos itens vierem** (use rest). A função deve mostrar o nome da cliente, quantos itens recebeu, o nome do primeiro item e o nome do último item. Chame a função passando o `nome` e os itens do `carrinhoFinal` **espalhados** (use spread na chamada).

> Resultado esperado:
> ```
> Cliente: Ana Souza
> Quantidade de itens: 3
> Primeiro item: Teclado
> Último item: Monitor
> ```

**Pergunta para responder em dupla** (num comentário no código, começando com `//`): por que foi importante não mudar o `carrinho` original no Passo 4 e tirar o CPF no Passo 6? Escrevam uma frase para cada, pensando na loja e na cliente.

---

## 📝 Lista de exercícios

Os exercícios alternam a dificuldade. Faça cada um em um **arquivo separado** (`exercicio1.js`, `exercicio2.js`...). Todos mostram o resultado esperado para você conferir sozinho(a).

As dicas estão escondidas: **clique em "💡 Ver dicas"** só depois de tentar. Tentar primeiro, mesmo errando, é o que faz você aprender de verdade.

| Exercício | Tema | Dificuldade |
|---|---|---|
| 1. A ficha do headset | Destructuring e valor padrão | 🟢 Fácil |
| 2. A lista de desejos | Spread em array e objeto + destructuring de array | 🟡 Médio |
| 3. O perfil público | Rest em objeto | 🟢 Fácil |
| 4. A nota do pedido do Bruno | Tudo junto: destructuring, spread, rest e função | 🔴 Difícil |

---

### Exercício 1 — A ficha do headset 🟢 Fácil

A LojaÁgil vai mostrar um headset na página inicial. A página precisa exibir o nome, o preço e o tempo de garantia do produto.

```js
const produto = {
  nome: 'Headset',
  preco: 250,
  marca: 'Sonora',
  estoque: 5,
};
```

**O que fazer:**

1. Usando destructuring, tire o `nome` e o `preco` do `produto` e mostre os dois no mesmo `console.log`.
2. Ainda com destructuring, tire o campo `garantia`. Ele não existe no objeto, então use o valor padrão `'3 meses'`. Mostre no terminal.

**Resultado esperado:**

```
Headset 250
3 meses
```

<details>
<summary>💡 Ver dicas</summary>

- Destructuring de objeto usa **chaves**: `const { campo1, campo2 } = objeto;`
- Os nomes dentro das chaves precisam ser **iguais** aos nomes dos campos do objeto.
- Você pode tirar vários campos e colocar o valor padrão na mesma linha, ou fazer em duas linhas separadas. As duas formas funcionam.
- O valor padrão é escrito com `=` dentro das chaves: `{ campo = 'valor padrão' }`.
- Para mostrar duas coisas no mesmo `console.log`, separe com vírgula: `console.log(a, b);`

</details>

---

### Exercício 2 — A lista de desejos 🟡 Médio

A LojaÁgil tem uma "lista de desejos", onde o cliente guarda produtos que quer comprar depois. A lista também pode ser compartilhada com amigos.

```js
const listaDesejos = [
  { nome: 'Cadeira Gamer', preco: 900 },
  { nome: 'Mousepad', preco: 60 },
];

const listaDoAmigo = [
  { nome: 'Pen drive', preco: 40 },
];
```

**O que fazer:**

1. O cliente adicionou uma luminária (`{ nome: 'Luminária', preco: 80 }`). Crie `listaAtualizada` com tudo da `listaDesejos` e a luminária no final, **sem mudar a lista original**. Mostre o tamanho das duas listas.
2. A cadeira gamer entrou em promoção por 750. Crie `cadeiraPromocao` como uma cópia da cadeira com o preço novo. Mostre o preço da cadeira original e o da promoção.
3. O cliente e o amigo decidiram juntar as listas. Crie `listaCompartilhada` juntando a `listaAtualizada` e a `listaDoAmigo`. Mostre quantos itens ela tem.
4. Usando destructuring de array, tire o primeiro item da `listaCompartilhada` e mostre o **nome** dele.

**Resultado esperado:**

```
2 3
900 750
4
Cadeira Gamer
```

<details>
<summary>💡 Ver dicas</summary>

- Para criar uma lista nova com tudo de outra lista e mais um item: `[...listaAntiga, novoItem]`.
- A cadeira está na **posição 0** da `listaDesejos`. Para copiar um objeto e trocar um campo: `{ ...objetoOriginal, campo: novoValor }`.
- Para juntar duas listas, espalhe as duas dentro de colchetes: `[...lista1, ...lista2]`.
- Destructuring de array usa **colchetes** e pega pela posição: `const [primeiro] = lista;`
- Lembre que o primeiro item é um **objeto**. Para mostrar só o nome, use `.nome`.
- Se o preço da cadeira original também mudou para 750, você criou um "apelido" em vez de uma cópia. Reveja o exemplo do teclado na seção de Spread.

</details>

---

### Exercício 3 — O perfil público 🟢 Fácil

Na LojaÁgil, qualquer pessoa pode ver o perfil de quem escreveu uma avaliação de produto. Mas o perfil público **não pode** mostrar a senha nem o CPF.

```js
const usuario = {
  nome: 'Carla Dias',
  email: 'carla@email.com',
  senha: 'minhasenha123',
  cpf: '111.222.333-44',
  cidade: 'Manaus',
};
```

**O que fazer:**

1. Usando rest, crie `perfilPublico` com todos os dados do usuário **menos** a `senha` e o `cpf`.
2. Mostre o `perfilPublico` no terminal.
3. Escreva um comentário no código (começando com `//`) explicando, com suas palavras, o que poderia acontecer se a senha aparecesse no perfil público.

**Resultado esperado:**

```
{ nome: 'Carla Dias', email: 'carla@email.com', cidade: 'Manaus' }
```

<details>
<summary>💡 Ver dicas</summary>

- Reveja o exemplo do CPF da Ana na seção de Rest. Aqui é a mesma ideia, mas tirando **dois** campos em vez de um.
- Você pode listar vários campos antes do rest, separados por vírgula: `const { campo1, campo2, ...resto } = objeto;`
- O `...resto` precisa ser **o último** dentro das chaves. Se colocar antes, o JavaScript vai reclamar.
- O nome depois dos três pontos é você quem escolhe. Aqui, use `perfilPublico`.

</details>

---

### Exercício 4 — A nota do pedido do Bruno 🔴 Difícil

Este exercício junta tudo o que vimos na aula. O Bruno fez um pedido e ganhou um brinde. Você vai montar a nota do pedido que aparece na tela de confirmação.

```js
const pedidoBruno = {
  cliente: {
    nome: 'Bruno Lima',
    email: 'bruno@email.com',
    cpf: '987.654.321-00',
  },
  carrinho: [
    { nome: 'Webcam', preco: 200 },
    { nome: 'Microfone', preco: 300 },
  ],
  pagamento: 'pix',
};

const brinde = { nome: 'Adesivo', preco: 0 };
```

**O que fazer:**

1. **Destructuring:** tire `cliente`, `carrinho` e `pagamento` do `pedidoBruno`. Na mesma linha, tire também `frete`, com valor padrão `'grátis'`.
2. **Rest:** crie `clienteSeguro`, sem o `cpf`.
3. **Spread:** crie `carrinhoComBrinde`, com tudo do `carrinho` e o `brinde` no final.
4. **Função com rest:** crie uma função `gerarNota` que recebe, nesta ordem:
   - os dados do cliente (um objeto);
   - a forma de pagamento;
   - e depois **quantos itens vierem** (use rest).

   Dentro da função:
   - tire o `nome` do objeto do cliente usando destructuring;
   - tire os três itens em variáveis usando destructuring de array;
   - mostre o nome do cliente, a forma de pagamento, a quantidade de itens, o nome do último item e o total (a soma dos preços dos três itens).
5. **Spread na chamada:** chame `gerarNota` passando `clienteSeguro`, `pagamento` e os itens do `carrinhoComBrinde` **espalhados**.
6. Fora da função, mostre o frete.
7. Por fim, mostre o `clienteSeguro` e o tamanho do `carrinho` original, para conferir que nada foi estragado.

**Resultado esperado:**

```
Cliente: Bruno Lima
Pagamento: pix
Quantidade de itens: 3
Último item: Adesivo
Total: 500
Frete: grátis
{ nome: 'Bruno Lima', email: 'bruno@email.com' } 2
```

<details>
<summary>💡 Ver dicas</summary>

- **Não tente fazer tudo de uma vez.** Faça um item, rode, confira. Depois passe para o próximo. Uma tarefa grande é só um monte de tarefas pequenas.
- **Item 1:** você pode misturar campos que existem com campos com valor padrão na mesma destructuring: `const { a, b, c = 'padrão' } = objeto;`
- **Item 2:** reveja o Exercício 3. É a mesma técnica.
- **Item 3:** reveja o Exercício 2. É a mesma técnica.
- **Item 4:** comece escrevendo só o "esqueleto" da função e um `console.log` dentro dela, para ver se ela é chamada:
  ```js
  function gerarNota(dadosCliente, formaPagamento, ...itens) {
    console.log('A função foi chamada!');
  }
  ```
  Depois vá substituindo pelos passos pedidos.
- **Item 4:** dentro da função, `itens` é uma lista. Então você pode usar `itens.length` e destructuring de array nela.
- **Item 4:** a última posição de uma lista é `lista.length - 1`. Então o último item é `itens[itens.length - 1]`.
- **Item 5:** para espalhar os itens na chamada, use os três pontos antes do nome da lista: `gerarNota(a, b, ...lista)`.
- **Item 7:** o `carrinho` original deve continuar com **2** itens. Se aparecer 3, algo mudou a lista original.
- Se aparecer o erro `Identifier 'nome' has already been declared`, você criou duas variáveis com o mesmo nome no arquivo. Confira se não tirou `nome` duas vezes fora da função.

</details>

---

## 🐞 Erros comuns e o que eles significam

Antes de pedir ajuda, leia a mensagem de erro e tente pelo menos uma correção. Ela quase sempre aponta a **linha** do problema.

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| `undefined` | O nome da variável não é igual ao nome do campo | Compare letra por letra. Maiúscula faz diferença: `Nome` é diferente de `nome` |
| `undefined` ao usar colchetes | Você usou `[ ]` num objeto ou `{ }` num array | Ficha (objeto) usa `{ }`. Lista (array) usa `[ ]` |
| `SyntaxError: Unexpected identifier` | Faltou uma vírgula entre campos ou entre itens | Olhe o fim da linha **anterior** à que o erro aponta |
| `SyntaxError: Unexpected token` | Faltou fechar uma chave `}` ou um colchete `]` | Confira se toda chave e colchete aberto foi fechado |
| `Identifier 'x' has already been declared` | Você criou a mesma variável duas vezes | Use outro nome ou outro arquivo |
| `Rest element must be last element` | O `...resto` não está no final | Coloque o `...resto` como último item dentro das chaves ou colchetes |
| O original mudou junto com a cópia | Você fez `const copia = original` | Use spread: `{ ...original }` ou `[...original]` |
| `ReferenceError: x is not defined` | Você usou uma variável que não existe (ou escreveu o nome errado) | Confira se a variável foi criada antes e se o nome está escrito igual |

---

**Lembre-se:** ninguém aprende programação sem errar. Cada mensagem de erro que você resolve sozinho(a) é um passo para ser a pessoa que resolve problemas no time. Bons estudos! 🚀