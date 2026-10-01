# ✅ Gabarito comentado

**Aula: arrays de objetos com Destructuring, Spread e Rest**

Este arquivo tem as respostas do **exercício da aula** e da **lista de exercícios**.

> **Como usar o gabarito:** ele não serve para copiar. Serve para **comparar**. Primeiro tente resolver sozinho(a). Depois confira o seu código com o daqui. Se o seu resultado no terminal for igual ao esperado, **o seu código também está certo**, mesmo que seja escrito de outro jeito. Existe mais de um caminho para chegar na mesma resposta.
>
> Se o seu código deu um resultado diferente, não apague tudo. Compare **linha por linha** com o gabarito e descubra onde está a diferença. Esse é o momento em que você mais aprende.

---

## 📑 Sumário

- [✅ Gabarito comentado](#-gabarito-comentado)
  - [📑 Sumário](#-sumário)
  - [👥 Exercício da aula: o pedido da Ana](#-exercício-da-aula-o-pedido-da-ana)
  - [Exercício 1 — A ficha do headset 🟢](#exercício-1--a-ficha-do-headset-)
  - [Exercício 2 — A lista de desejos 🟡](#exercício-2--a-lista-de-desejos-)
  - [Exercício 3 — O perfil público 🟢](#exercício-3--o-perfil-público-)
  - [Exercício 4 — A nota do pedido do Bruno 🔴](#exercício-4--a-nota-do-pedido-do-bruno-)
  - [❓ Dúvidas que costumam aparecer](#-dúvidas-que-costumam-aparecer)

---

## 👥 Exercício da aula: o pedido da Ana

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

// Passo 1: destructuring de objeto.
// Os nomes entre chaves são IGUAIS aos nomes dos campos do pedido.
const { cliente, carrinho, pagamento } = pedido;
console.log(pagamento); // cartao

// Passo 2: valor padrão.
// Como "cupom" não existe no pedido, a variável recebe 'SEM CUPOM'.
const { cupom = 'SEM CUPOM' } = pedido;
console.log(cupom); // SEM CUPOM

// Passo 3: destructuring do objeto cliente (que tiramos no Passo 1).
const { nome, cidade } = cliente;
console.log(nome, cidade); // Ana Souza Salvador

// Passo 4: spread em array.
// Espalha os itens do carrinho numa lista NOVA e adiciona o monitor no fim.
const carrinhoFinal = [...carrinho, monitor];
console.log(carrinho.length, carrinhoFinal.length); // 2 3

// Passo 5: spread em objeto.
// Copia todos os campos do mouse e troca só o preço NA CÓPIA.
const mousePromocao = { ...carrinho[1], preco: 100 };
console.log(carrinho[1].preco, mousePromocao.preco); // 120 100

// Passo 6: rest em objeto.
// "cpf" fica separado; todo o resto vai para clienteSeguro.
const { cpf, ...clienteSeguro } = cliente;
console.log(clienteSeguro);
// { nome: 'Ana Souza', email: 'ana@email.com', cidade: 'Salvador' }

// Passo 7: destructuring de array (pela posição) + soma.
const [item1, item2, item3] = carrinhoFinal;
const total = item1.preco + item2.preco + item3.preco;
console.log('Total:', total); // Total: 2070

// Desafio extra: rest nos ingredientes da função...
function resumoDoPedido(nomeCliente, ...itens) {
  console.log('Cliente:', nomeCliente);
  console.log('Quantidade de itens:', itens.length);
  console.log('Primeiro item:', itens[0].nome);
  console.log('Último item:', itens[itens.length - 1].nome);
}

// ...e spread na chamada: os 3 itens do carrinhoFinal viram 3 valores separados.
resumoDoPedido(nome, ...carrinhoFinal);
```

**Resposta esperada para a pergunta em dupla** (qualquer resposta com a mesma ideia vale):

- **Carrinho original:** se a Ana desistir do monitor, a loja ainda sabe como era o carrinho antes, e o sistema consegue oferecer o botão "desfazer".
- **CPF:** é um dado pessoal protegido pela LGPD. Se aparecer onde não precisa, outras pessoas podem ver e usar indevidamente, e a loja pode ser punida.

---

## Exercício 1 — A ficha do headset 🟢

```js
const produto = {
  nome: 'Headset',
  preco: 250,
  marca: 'Sonora',
  estoque: 5,
};

// Item 1: destructuring de objeto.
// Pegamos só o que a página precisa: nome e preço.
const { nome, preco } = produto;
console.log(nome, preco); // Headset 250

// Item 2: valor padrão.
// "garantia" não existe no objeto, então a variável recebe '3 meses'.
const { garantia = '3 meses' } = produto;
console.log(garantia); // 3 meses
```

**Resultado no terminal:**

```
Headset 250
3 meses
```

**Por que funciona:** o destructuring procura no objeto um campo com o **mesmo nome** da variável. `nome` e `preco` existem, então vêm com os valores do objeto. `garantia` não existe, então o JavaScript usa o valor que está depois do `=`.

**Outra forma que também está certa:** tirar tudo na mesma linha.

```js
const { nome, preco, garantia = '3 meses' } = produto;
```

---

## Exercício 2 — A lista de desejos 🟡

```js
const listaDesejos = [
  { nome: 'Cadeira Gamer', preco: 900 },
  { nome: 'Mousepad', preco: 60 },
];

const listaDoAmigo = [
  { nome: 'Pen drive', preco: 40 },
];

// Item 1: spread em array.
// Cria uma lista NOVA com tudo da listaDesejos + a luminária no final.
const listaAtualizada = [...listaDesejos, { nome: 'Luminária', preco: 80 }];
console.log(listaDesejos.length, listaAtualizada.length); // 2 3

// Item 2: spread em objeto.
// Copia a cadeira (posição 0) e troca só o preço NA CÓPIA.
const cadeiraPromocao = { ...listaDesejos[0], preco: 750 };
console.log(listaDesejos[0].preco, cadeiraPromocao.preco); // 900 750

// Item 3: spread para juntar duas listas numa só.
const listaCompartilhada = [...listaAtualizada, ...listaDoAmigo];
console.log(listaCompartilhada.length); // 4

// Item 4: destructuring de array (COLCHETES, pela posição).
// O primeiro item é um objeto, então usamos .nome para mostrar só o nome.
const [primeiroDesejo] = listaCompartilhada;
console.log(primeiroDesejo.nome); // Cadeira Gamer
```

**Resultado no terminal:**

```
2 3
900 750
4
Cadeira Gamer
```

**Por que funciona:**

- No item 1, `[...listaDesejos, novoItem]` monta uma lista nova. A `listaDesejos` continua com 2 itens, e por isso o primeiro número é `2`.
- No item 2, se você tivesse escrito `const cadeiraPromocao = listaDesejos[0]` e depois mudado o preço, os **dois** mostrariam 750. Isso é o "apelido" que vimos na aula. O spread faz a cópia de verdade.
- No item 3, os três pontos aparecem duas vezes, uma para cada lista. A ordem dentro dos colchetes é a ordem da lista final.
- No item 4, como o primeiro item da lista é a cadeira (que veio da `listaDesejos`), o resultado é `Cadeira Gamer`.

---

## Exercício 3 — O perfil público 🟢

```js
const usuario = {
  nome: 'Carla Dias',
  email: 'carla@email.com',
  senha: 'minhasenha123',
  cpf: '111.222.333-44',
  cidade: 'Manaus',
};

// Item 1: rest em objeto.
// "senha" e "cpf" ficam separados; todo o resto vai para perfilPublico.
const { senha, cpf, ...perfilPublico } = usuario;

// Item 2: mostrar o resultado.
console.log(perfilPublico);
// { nome: 'Carla Dias', email: 'carla@email.com', cidade: 'Manaus' }

// Item 3: comentário (exemplo de resposta).
// Se a senha aparecesse no perfil público, qualquer pessoa que visse a
// avaliação poderia entrar na conta da Carla, ver as compras dela e até
// usar os dados dela. Além disso, a loja poderia ser punida pela LGPD.
```

**Resultado no terminal:**

```
{ nome: 'Carla Dias', email: 'carla@email.com', cidade: 'Manaus' }
```

**Por que funciona:** tudo o que você escreve **antes** do `...resto` é tirado separadamente. O `...perfilPublico` junta **o que sobrou**: `nome`, `email` e `cidade`. O objeto `usuario` original não muda: ele continua com todos os campos.

**Dúvida comum:** "eu nem uso `senha` e `cpf` depois, por que preciso dar nome a eles?" Porque é assim que o rest funciona: para separar um campo, o JavaScript precisa de um nome para ele. Alguns editores mostram essas variáveis "apagadas" ou com um aviso de "não usada". Isso é normal e esperado neste caso.

**Exemplo de resposta para o comentário (item 3):** qualquer resposta que fale de alguém conseguir acessar a conta ou usar os dados da pessoa está certa. Você também pode mencionar a LGPD.

---

## Exercício 4 — A nota do pedido do Bruno 🔴

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

// Item 1: destructuring, incluindo "frete" com valor padrão.
// Como "frete" não existe no pedido, ele recebe 'grátis'.
const { cliente, carrinho, pagamento, frete = 'grátis' } = pedidoBruno;

// Item 2: rest em objeto. Tira o cpf; o resto vai para clienteSeguro.
const { cpf, ...clienteSeguro } = cliente;

// Item 3: spread em array. Lista NOVA com o carrinho + o brinde no final.
const carrinhoComBrinde = [...carrinho, brinde];

// Item 4: função com rest.
// "dadosCliente" e "formaPagamento" recebem os dois primeiros valores.
// "...itens" junta TODO o resto numa lista.
function gerarNota(dadosCliente, formaPagamento, ...itens) {
  // destructuring de objeto: tira o nome do cliente
  const { nome } = dadosCliente;

  // destructuring de array: tira os três itens pela posição
  const [primeiro, segundo, terceiro] = itens;

  console.log('Cliente:', nome);
  console.log('Pagamento:', formaPagamento);
  console.log('Quantidade de itens:', itens.length);
  console.log('Último item:', itens[itens.length - 1].nome);
  console.log('Total:', primeiro.preco + segundo.preco + terceiro.preco);
}

// Item 5: spread na chamada.
// Os 3 itens do carrinhoComBrinde viram 3 valores separados.
gerarNota(clienteSeguro, pagamento, ...carrinhoComBrinde);

// Item 6: frete, fora da função.
console.log('Frete:', frete);

// Item 7: conferindo que nada foi estragado.
console.log(clienteSeguro, carrinho.length);
```

**Resultado no terminal:**

```
Cliente: Bruno Lima
Pagamento: pix
Quantidade de itens: 3
Último item: Adesivo
Total: 500
Frete: grátis
{ nome: 'Bruno Lima', email: 'bruno@email.com' } 2
```

**Por que funciona, passo a passo:**

- **Itens 1 a 3** são os mesmos truques dos exercícios anteriores. Se você travou aqui, volte ao exercício parecido: o 1 (destructuring e valor padrão), o 3 (rest) e o 2 (spread).
- **Item 4:** a função recebe 2 valores "fixos" e um grupo. O `...itens` só pode ficar **por último** nos ingredientes da função.
- **Item 5:** os três pontos na **chamada** fazem o contrário dos três pontos na **definição**. Na definição eles **juntam** (rest). Na chamada eles **espalham** (spread). Por isso, a função recebe `clienteSeguro`, `pagamento` e depois os três itens soltos, que o rest junta de volta numa lista.
- **Item 7:** o `carrinho` original continua com **2** itens, porque o brinde entrou numa lista **nova** (`carrinhoComBrinde`). É a prova de que o spread não estragou o original.

**Conta do total:** 200 (webcam) + 300 (microfone) + 0 (adesivo) = **500**.

**Dúvida comum: "por que a função recebe o `clienteSeguro` e não o `cliente`?"** Porque a nota aparece na tela. O cliente não pode ver o próprio CPF exposto ali, e ninguém que olhe a tela também. Por isso a função já recebe o objeto **sem** o CPF. É o mesmo cuidado com a LGPD da aula.

---

## ❓ Dúvidas que costumam aparecer

**"O meu código deu o mesmo resultado, mas está escrito diferente. Está errado?"**
Não. Se o resultado no terminal é igual ao esperado e você não estragou os dados originais, está certo. Programar é resolver o mesmo problema de vários jeitos.

**"Deu `undefined` em vez do valor que eu esperava."**
Quase sempre é o nome da variável diferente do nome do campo (inclusive maiúscula e minúscula), ou `{ }` e `[ ]` trocados. Reveja a tabela de erros comuns no `README.md`.

**"Deu `Identifier 'x' has already been declared`."**
Você criou duas variáveis com o mesmo nome **no mesmo arquivo**. Por isso, cada exercício vai num arquivo separado.

**"O original mudou junto com a cópia."**
Você fez algo como `const copia = original`. Isso cria um **apelido**, não uma cópia. Use `{ ...original }` para objetos e `[...original]` para listas.

**"Não entendi a diferença entre spread e rest."**
Os dois usam `...`. Se os três pontos estão **criando** algo novo (uma cópia, uma lista maior, os valores de uma chamada de função), é **spread**. Se estão **recebendo** o que sobrou (num destructuring ou nos ingredientes de uma função), é **rest**. Dica: espalhar e juntar são movimentos opostos.

---

**Conseguiu resolver tudo?** Ótimo! Agora tente **inventar o seu próprio exercício**: crie um objeto de outra loja (uma padaria, uma livraria, uma loja de roupas), com um array de produtos, e use destructuring, spread e rest nele. Quem consegue criar o problema entende o conteúdo de verdade. 🚀