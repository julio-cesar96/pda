# 🏠 Exercícios para casa

**Destructuring, Spread e Rest com arrays de objetos (JavaScript / Node.js)**

São **3 exercícios**, do mais fácil ao mais difícil. Cada um tem passos pequenos e um resultado esperado para você conferir sozinho(a).

> **Regra de ouro:** escreva uma linha, rode, veja o resultado. Se der erro, leia a mensagem inteira: ela é uma pista, não uma bronca.

---

## 💻 Como fazer

1. Crie **um arquivo para cada exercício**: `casa1.js`, `casa2.js` e `casa3.js`. Assim, as variáveis de um não atrapalham o outro.
2. **Digite o código** em vez de copiar e colar.
3. Para rodar, abra o terminal na pasta e use:

```bash
node casa1.js
```

4. **Um passo de cada vez.** Faça o passo, rode, confira. Só depois vá para o próximo. Uma tarefa grande é só um monte de tarefas pequenas.
5. As dicas estão escondidas: clique em **"💡 Ver dicas"** só depois de tentar. Tentar primeiro, mesmo errando, é o que faz você aprender.

| Exercício | Tema | Dificuldade |
|---|---|---|
| 1. A ficha da mochila | Destructuring, valor padrão e array | 🟢 Fácil |
| 2. O carrinho da Lia | Spread em array e objeto + rest em array | 🟡 Médio |
| 3. O resumo do pedido da Sofia | Tudo junto: destructuring, spread, rest e função | 🔴 Difícil |

---

## Exercício 1 — A ficha da mochila 🟢 Fácil

A LojaÁgil vai mostrar uma mochila na página inicial. A página precisa do nome, do preço, do desconto e do frete.

```js
const produto = {
  nome: 'Mochila',
  preco: 180,
  cor: 'preta',
  estoque: 8,
};

const tamanhos = ['P', 'M', 'G'];
```

**O que fazer:**

1. Usando destructuring, tire `nome` e `preco` do `produto` e mostre os dois no mesmo `console.log`.
2. Ainda com destructuring, tire `desconto` (valor padrão `0`) e `frete` (valor padrão `'a calcular'`). Esses campos não existem no objeto. Mostre os dois no mesmo `console.log`.
3. Usando destructuring de array, tire os **dois primeiros** tamanhos da lista `tamanhos` em variáveis chamadas `menor` e `medio`. Mostre as duas no mesmo `console.log`.
4. Escreva um comentário (começando com `//`) respondendo: **o que o cliente veria na tela se o `desconto` não tivesse valor padrão?**

**Resultado esperado:**

```
Mochila 180
0 a calcular
P M
```

<details>
<summary>💡 Ver dicas</summary>

- Destructuring de objeto usa **chaves** e pega pelo **nome**: `const { campo1, campo2 } = objeto;`
- O valor padrão vai dentro das chaves, com `=`: `{ campo = 'valor' }`. Você pode misturar campos que existem com campos que têm valor padrão.
- Destructuring de array usa **colchetes** e pega pela **posição**: `const [primeiro, segundo] = lista;`
- Para mostrar duas coisas no mesmo `console.log`, separe com vírgula: `console.log(a, b);`
- Para o item 4, lembre do que aparece quando o JavaScript não acha um campo.

</details>

---

## Exercício 2 — O carrinho da Lia 🟡 Médio

A Lia está montando um carrinho na LojaÁgil. Ela vai adicionar produtos, aproveitar uma promoção e juntar o carrinho com o de uma amiga. Nada do carrinho original dela pode ser estragado.

```js
const carrinhoLia = [
  { nome: 'Camiseta', preco: 80 },
  { nome: 'Boné', preco: 50 },
];

const tenis = { nome: 'Tênis', preco: 300 };

const carrinhoDoAmigo = [
  { nome: 'Meia', preco: 15 },
];
```

**O que fazer:**

1. A Lia decidiu levar o tênis. Crie `carrinhoComTenis` com tudo do `carrinhoLia` e o `tenis` no final. Mostre o tamanho das duas listas.
2. O boné (que está em `carrinhoLia[1]`) entrou em promoção por 40. Crie `bonePromocao` como uma cópia do boné com o preço novo. Mostre o preço do boné original e o da promoção.
3. A Lia e a amiga decidiram juntar os carrinhos. Crie `carrinhoJunto` com tudo do `carrinhoComTenis` e tudo do `carrinhoDoAmigo`. Mostre quantos itens ele tem.
4. Do `carrinhoJunto`, tire o primeiro item numa variável `primeiro` e junte **todo o resto** numa lista `resto`. Mostre o nome do primeiro item e quantos itens sobraram.
5. Por fim, confira que o `carrinhoLia` original não foi estragado: mostre o tamanho dele e o preço do boné original.

**Resultado esperado:**

```
2 3
50 40
4
Camiseta 3
2 50
```

<details>
<summary>💡 Ver dicas</summary>

- **Item 1:** para uma lista nova com tudo de outra e mais um item: `[...listaAntiga, novoItem]`.
- **Item 2:** para copiar um objeto e trocar um campo: `{ ...objetoOriginal, campo: novoValor }`. O boné está na **posição 1** (a contagem começa no 0).
- **Item 3:** para juntar duas listas, espalhe as duas dentro de colchetes: `[...lista1, ...lista2]`.
- **Item 4:** o rest em array também usa três pontos, e fica **por último**: `const [primeiro, ...resto] = lista;`
- **Item 5:** se o preço do boné original aparecer como 40, você criou um "apelido" em vez de uma cópia. Reveja o exemplo do teclado no bloco de Spread da revisão.
- Se aparecer o erro `Rest element must be last element`, o `...resto` não está por último.

</details>

---

## Exercício 3 — O resumo do pedido da Sofia 🔴 Difícil

Este exercício junta tudo. A Sofia fez um pedido e ganhou um brinde. O tênis do pedido entrou em promoção por 250. Você vai montar o resumo que aparece na tela de confirmação, **sem mostrar o CPF nem o telefone dela**.

```js
const pedidoSofia = {
  cliente: {
    nome: 'Sofia Alves',
    email: 'sofia@email.com',
    cpf: '444.555.666-77',
    telefone: '(71) 99999-0000',
    cidade: 'Salvador',
  },
  carrinho: [
    { nome: 'Camiseta', preco: 80 },
    { nome: 'Tênis', preco: 300 },
    { nome: 'Boné', preco: 50 },
  ],
  pagamento: 'pix',
};

const brinde = { nome: 'Chaveiro', preco: 0 };
```

**O que fazer:**

1. **Destructuring:** tire `cliente`, `carrinho` e `pagamento` do `pedidoSofia`. Na mesma linha, tire também `cupom`, com valor padrão `'SEM CUPOM'`. Mostre `pagamento` e `cupom` no mesmo `console.log`.
2. **Rest:** crie `clienteSeguro`, com os dados da Sofia **sem** o `cpf` e **sem** o `telefone`. Mostre no terminal.
3. **Destructuring de array + spread:** do `carrinho`, tire os três itens em `camiseta`, `tenis` e `bone`. Crie `tenisPromocao` como uma cópia do tênis com o preço `250`. Depois crie `carrinhoFinal` com a camiseta, o `tenisPromocao`, o boné e o `brinde`, **nessa ordem**. Mostre o tamanho do `carrinho` original e o do `carrinhoFinal`.
4. **Função com rest:** crie `gerarResumo`, que recebe, nesta ordem:
   - os dados do cliente (um objeto);
   - a forma de pagamento;
   - o cupom;
   - e depois **quantos itens vierem** (use rest).

   Dentro da função:
   - tire o `nome` do objeto do cliente com destructuring;
   - tire os quatro itens em variáveis com destructuring de array;
   - mostre o nome do cliente, a forma de pagamento, o cupom, a quantidade de itens, o nome do último item e o total (a soma dos quatro preços).
5. **Spread na chamada:** chame `gerarResumo` passando `clienteSeguro`, `pagamento`, `cupom` e os itens do `carrinhoFinal` **espalhados**.
6. **Conferindo:** mostre o preço do tênis no `carrinho` **original** e o campo `cpf` do `clienteSeguro`.
7. **Pensando como pessoa de mercado:** escreva dois comentários (começando com `//`):
   - **Clear Thinking:** quem vai ler esse resumo na tela e por que o telefone também não deveria aparecer?
   - **Discordância Positiva:** a função recebe 7 valores soltos (cliente, pagamento, cupom e itens). Se você pudesse propor **uma melhoria** nessa forma de receber os dados, qual seria e por quê?

**Resultado esperado:**

```
pix SEM CUPOM
{ nome: 'Sofia Alves', email: 'sofia@email.com', cidade: 'Salvador' }
3 4
Cliente: Sofia Alves
Pagamento: pix
Cupom: SEM CUPOM
Quantidade de itens: 4
Último item: Chaveiro
Total: 380
300 undefined
```

<details>
<summary>💡 Ver dicas</summary>

- **Não tente fazer tudo de uma vez.** Faça um item, rode, confira. Depois passe para o próximo.
- **Item 1:** você pode misturar campos que existem com um campo de valor padrão na mesma linha: `const { a, b, c = 'padrão' } = objeto;`
- **Item 2:** é a mesma técnica do CPF da Ana, mas tirando **dois** campos antes do `...resto`.
- **Item 3:** destructuring de array usa colchetes e a ordem importa: `const [a, b, c] = lista;`. Para o `carrinhoFinal`, monte a lista escrevendo os quatro itens dentro de colchetes, separados por vírgula.
- **Item 4:** comece só com o "esqueleto" da função e um `console.log` dentro, para ver se ela é chamada:
  ```js
  function gerarResumo(dadosCliente, formaPagamento, cupomUsado, ...itens) {
    console.log('A função foi chamada!');
  }
  ```
  Depois vá substituindo pelos passos pedidos.
- **Item 4:** dentro da função, `itens` é uma lista. Use `itens.length` para a quantidade. A última posição de uma lista é `lista.length - 1`.
- **Item 5:** para espalhar os itens na chamada, use os três pontos antes do nome da lista: `gerarResumo(a, b, c, ...lista)`.
- **Item 6:** o preço do tênis original deve continuar `300`. Se aparecer `250`, algo mudou o objeto original.
- **Item 6:** o `undefined` no CPF é o resultado **certo**: significa que o CPF não está no `clienteSeguro`.
- Se aparecer `Identifier 'nome' has already been declared`, você criou duas variáveis com o mesmo nome no arquivo. Confira se não tirou `nome` duas vezes fora da função.

</details>

---

## 🐞 Erros comuns

Antes de pedir ajuda, leia a mensagem inteira e tente **pelo menos uma** correção.

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| `undefined` onde não devia | O nome da variável não é igual ao nome do campo | Compare letra por letra. Maiúscula faz diferença |
| `undefined` com colchetes | Você usou `[ ]` num objeto ou `{ }` num array | Ficha (objeto) usa `{ }`. Lista (array) usa `[ ]` |
| `Identifier 'x' has already been declared` | A mesma variável foi criada duas vezes | Use outro nome ou outro arquivo |
| `Rest element must be last element` | O `...resto` não está por último | Coloque o `...resto` como último item |
| `TypeError: Cannot read properties of undefined` | Você tentou ler um campo de algo que não existe | Confira se a variável existe e se o destructuring pegou o item certo |
| O original mudou junto com a cópia | Você fez `const copia = original` | Use spread: `{ ...original }` ou `[...original]` |

---

## ✅ Antes de entregar

- [ ] Os três exercícios mostram exatamente o resultado esperado?
- [ ] Você consegue explicar, **com as próprias palavras**, a diferença entre spread e rest?
- [ ] Você travou em algum passo? Anote **qual** e **o que tentou**. Isso vale ouro na próxima aula.

---

## 🚀 Desafio bônus (opcional, 15 minutos)

Invente o **seu próprio exercício**: escolha um negócio que você conhece (uma barbearia, uma lanchonete, um salão, uma loja de roupas), crie um objeto com um array de produtos ou serviços e use destructuring, spread e rest nele. Quem consegue criar o problema entende o conteúdo de verdade.