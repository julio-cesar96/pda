# 🛠️ Criando uma Biblioteca e Validando Dados

**Aula 3: módulos ES, validação com Zod e tipagem estática (JavaScript / Node.js)**

Neste material você vai encontrar tudo o que vimos em aula, o exercício que fazemos em dupla e uma lista com 4 exercícios para praticar em casa.

> **Fio condutor da aula:** este material prepara você para o **TypeScript**. Ao longo da aula aparecem dicas 🌱 ("sementes") sobre *tipos*, e na seção 4 elas se juntam.

> **Regra de ouro (a mesma de sempre):** escreva uma linha, rode, veja o resultado. Rodou, viu, entendeu. Se der erro, leia a mensagem com calma: ela é uma pista, não uma bronca.

---

## 📑 Sumário

1. [Como usar este material](#-como-usar-este-material)
2. [Vocabulário da aula](#-vocabulário-da-aula)
3. [O cenário: o pedido chega de fora](#o-cenário-o-pedido-chega-de-fora)
4. [1. Organizando o projeto em arquivos](#1-organizando-o-projeto-em-arquivos)
5. [2. Zod: o porteiro dos dados](#2-zod-o-porteiro-dos-dados)
6. [3. Montando a biblioteca](#3-montando-a-biblioteca)
7. [4. Tipagem estática: a ponte para o TypeScript](#4-tipagem-estática-a-ponte-para-o-typescript)
8. [Resumo](#-resumo)
9. [Exercício da aula: o cadastro de produtos](#-exercício-da-aula-o-cadastro-de-produtos-da-lojaágil)
10. [Lista de exercícios para casa](#-lista-de-exercícios-para-casa)
11. [Erros comuns e o que eles significam](#-erros-comuns-e-o-que-eles-significam)

---

## 💻 Como usar este material

1. Crie uma pasta para a aula. Dentro dela vamos criar **um projeto** (`lojagil-validacao`).
2. **Digite o código** em vez de copiar e colar. Digitar ajuda a memorizar e os erros de digitação ensinam a ler mensagens de erro.
3. Para rodar um arquivo, abra o terminal na pasta do projeto e use:

```bash
node nome-do-arquivo.js
```

4. Você precisa de **internet** para instalar o Zod (`npm install zod`). O projeto pronto, para comparar com o seu, está em [`t8/projetos/lojagil-validacao`](../../projetos/lojagil-validacao).
5. Este material foi testado com **Node.js 22** e **Zod 4**. As mensagens padrão do Zod em inglês, como `Invalid input: expected number, received string`, são dessa versão.

---

## 📖 Vocabulário da aula

| Palavra | Significado simples |
|---|---|
| Módulo | Um **arquivo** que guarda uma parte do código, como uma gaveta |
| `export` | A **etiqueta** que deixa algo sair do arquivo para ser usado em outro |
| `import` | **Buscar** em outro arquivo o que ele deixou sair |
| `return` | A função **devolve** um resultado para quem a chamou |
| `package.json` | A **ficha do projeto** (um objeto com o nome, a versão e as bibliotecas usadas) |
| `npm install` | **Trazer** uma biblioteca feita por outra pessoa para o seu projeto |
| Biblioteca | Uma **caixa de ferramentas** pronta para ser usada em vários projetos |
| Schema | Um **formulário com regras** que descreve como o dado deve ser |
| Validar | **Conferir** se o dado segue as regras do schema |
| Tipo | A **promessa** sobre o formato do dado ("isto é um número") |
| Tipagem estática | Conferir os tipos **antes de rodar** o programa (TypeScript) |
| Anotação de tipo | Escrever o tipo ao lado do nome, como `preco: number` (TypeScript) |

---

## O cenário: o pedido chega de fora

Na Aula 2 o pedido da Ana chegava certinho. Na vida real, o pedido chega de um **formulário que qualquer pessoa preencheu**, ou de outro sistema. Ele pode vir com o preço como texto (`'abc'`), um email sem `@`, um carrinho vazio.

Se o servidor confiar sem conferir, o cliente é cobrado errado ou o sistema quebra. A solução é um **porteiro**: algo que confere o dado **antes** de deixar entrar.

Hoje vamos criar esse porteiro como uma **biblioteca** que qualquer parte da LojaÁgil pode usar.

> **🎨 Em uma frase:** o dado de fora passa por um schema (o porteiro). Se está certo, entra no sistema. Se está errado, volta com uma mensagem dizendo o motivo.

---

## 1. Organizando o projeto em arquivos

**Por que usar?** Um arquivo gigante é uma gaveta única e bagunçada. Uma biblioteca é uma **caixa de ferramentas com gavetas**: cada arquivo guarda uma coisa. Só sai da gaveta o que tem a etiqueta `export`.

### Primeiro, o problema

Tudo num arquivo só vira conflito de nomes. Você já conhece este erro:

```js
const nome = 'Ana';
const nome = 'Bruno';
```

```
SyntaxError: Identifier 'nome' has already been declared
```

### Criando o projeto

```bash
mkdir lojagil-validacao
cd lojagil-validacao
npm init -y
```

O `npm init -y` cria o `package.json`, a **ficha do projeto**. Abra o arquivo e **adicione a linha** `"type": "module"`. Ela avisa o Node de que vamos usar `import` e `export`:

```json
{
  "name": "lojagil-validacao",
  "version": "1.0.0",
  "type": "module"
}
```

> O `npm init -y` cria mais campos do que esses. Pode deixar. O importante é ter a linha `"type": "module"`.

### Uma gaveta: `src/formatar.js`

Crie a pasta `src` e o arquivo `src/formatar.js`:

```js
// Tudo que vem com "export" pode ser usado por outros arquivos
export function formatarPreco(preco) {
  return `R$ ${preco}`;
}

export const nomeDaLoja = 'LojaÁgil';
```

Dois conceitos novos aqui:
- `return`: a função **devolve** o resultado para quem a chamou. O `console.log` **mostra** na tela; o `return` **entrega** o valor.
- Texto com `${}`: a crase `` ` `` abre um texto com buracos. O que está dentro de `${ }` é trocado pelo valor. Aqui, `R$ ${preco}` vira `R$ 350`.

### Usando a gaveta: `app.js`

```js
import { formatarPreco, nomeDaLoja } from './src/formatar.js';

console.log(nomeDaLoja);
console.log(formatarPreco(350));
```

Resultado esperado no terminal (`node app.js`):

```
LojaÁgil
R$ 350
```

> **🎨 Em uma frase:** só sai do arquivo o que tem `export`, e quem precisa usa `import`. Sem `export`, a gaveta fica trancada.

> **🌱 Pensando no TypeScript:** olhe a `formatarPreco(preco)`. Nada diz que o `preco` precisa ser um número. Guarde essa dúvida: na seção 4 vamos prometer isso direto no código.

**💬 E daí?** Em uma empresa, várias pessoas mexem no mesmo projeto. Cada uma trabalha em seu arquivo, sem pisar nos nomes das outras. É assim que um código grande continua organizado.

**✅ Checkpoint:** se eu tirar o `export` de `nomeDaLoja`, o que aparece no terminal?

<details>
<summary>💡 Ver resposta</summary>

```
SyntaxError: The requested module './src/formatar.js' does not provide an export named 'nomeDaLoja'
```

O arquivo de origem não oferece essa gaveta. Volte nele e coloque `export`.

</details>

---

## 2. Zod: o porteiro dos dados

**Por que usar?** O **schema** é um **formulário com regras** ("o nome é texto, o preço é número"). O `safeParse` é o porteiro que confere o dado contra essa lista e responde "pode entrar" ou "não pode, e o motivo é este".

### Primeiro, o problema

```js
const produtoDoApp = { nome: 'Teclado', preco: 'abc' };
console.log(produtoDoApp.preco * 2);
```

```
NaN
```

`NaN` quer dizer "não é um número". O sistema calculou e **não avisou ninguém**. Na loja, isso é um pedido com valor errado.

### Instalando o Zod

Na pasta do projeto:

```bash
npm install zod
```

Aparece uma pasta `node_modules` e o `zod` entra no seu `package.json`.

### O primeiro schema

Crie o arquivo `bloco2.js`:

```js
import { z } from 'zod';

const schemaProduto = z.object({
  nome: z.string(),
  preco: z.number(),
});

const bom = schemaProduto.safeParse({ nome: 'Teclado', preco: 350 });
console.log(bom.success);
console.log(bom.data);

const ruim = schemaProduto.safeParse({ nome: 'Teclado', preco: 'abc' });
console.log(ruim.success);
console.log(ruim.error.issues[0].message);

const { success, data } = schemaProduto.safeParse({ nome: 'Mouse', preco: 120 });
console.log(success, data);
```

Resultado esperado no terminal:

```
true
{ nome: 'Teclado', preco: 350 }
false
Invalid input: expected number, received string
true { nome: 'Mouse', preco: 120 }
```

O que cada parte faz:
- `z.object({ ... })` descreve a **ficha**: cada campo, com seu tipo.
- `safeParse(dado)` devolve **sempre** um objeto com `success` (`true` ou `false`), `data` (o dado, se deu certo) e `error` (o erro, se deu errado).
- `const { success, data } = ...` é o **destructuring** da Aula 2.
- `error.issues` é um **array de objetos**, um por problema. Você já sabe ler isso: `issues[0].message`.

| | Se o dado está certo | Se o dado está errado |
|---|---|---|
| `parse` | devolve o dado | **lança um erro** e o programa para (`ZodError`) |
| `safeParse` | `{ success: true, data }` | `{ success: false, error }` e o programa continua |

Hoje usamos o `safeParse`: ele devolve o resultado e **deixa você decidir** o que fazer.

> **🎨 Em uma frase:** o schema é o formulário com regras e o `safeParse` é o porteiro que responde "pode entrar" ou "não pode".

> **🌱 Pensando no TypeScript:** o `z.object({ nome: z.string(), preco: z.number() })` **descreve o formato** de um produto. Existe uma forma de descrever esse mesmo formato no código sem rodar nada. Fica para a seção 4.

**💬 E daí?** Antes, o erro só aparecia lá na frente, como um `NaN` na tela do cliente. Agora aparece **na porta**, com uma mensagem que diz o que está errado.

**✅ Checkpoint:** quando `success` é `false`, o que vale `data`?

<details>
<summary>💡 Ver resposta</summary>

`undefined`. Não existe dado válido para devolver. O que existe é o `error`.

</details>

---

## 3. Montando a biblioteca

**Por que usar?** Uma biblioteca é uma **caixa de ferramentas organizada**. Quem usa não precisa saber onde cada ferramenta está guardada: abre a caixa pela **porta de entrada** (`index.js`) e pega o que precisa.

### Regras e mensagens: `src/schemas.js`

```js
import { z } from 'zod';

export const schemaCliente = z.object({
  nome: z.string().min(2, 'O nome precisa ter pelo menos 2 letras'),
  email: z.email('Email inválido'),
  cpf: z.string().length(14, 'O CPF precisa ter 14 caracteres'),
  cidade: z.string(),
});

export const schemaProduto = z.object({
  nome: z.string(),
  preco: z.number('O preço precisa ser um número').positive('O preço precisa ser maior que zero'),
});

export const schemaPedido = z.object({
  cliente: schemaCliente,
  carrinho: z.array(schemaProduto).min(1, 'O carrinho precisa ter pelo menos 1 item'),
  pagamento: z.string(),
  cupom: z.string().default('SEM CUPOM'),
});

export const schemaClienteSeguro = schemaCliente.omit({ cpf: true });
```

O que há de novo:

| Trecho | O que faz |
|---|---|
| `.min(2, 'mensagem')`, `.positive('mensagem')` | **Regras** com a mensagem que o cliente vai ler. Escreva em português claro |
| `z.email()` | Já sabe o formato de um email |
| `z.array(schemaProduto).min(1, ...)` | Uma **lista** em que cada item segue o `schemaProduto`, com pelo menos 1 item |
| `cliente: schemaCliente` | Um molde **dentro** de outro, igual à ficha dentro da ficha da Aula 2 |
| `.default('SEM CUPOM')` | Se o campo não vier, vale o padrão (o valor padrão do destructuring, no Zod) |
| `.omit({ cpf: true })` | Cria um molde novo **sem** o `cpf`. É o **rest** da Aula 2 (esconder o CPF), agora no schema |

### A função da biblioteca: `src/validar.js`

```js
import { schemaPedido } from './schemas.js';

export function validarPedido(dado) {
  return schemaPedido.safeParse(dado);
}
```

A função usa `return` para **devolver** o resultado do `safeParse`.

### A porta de entrada: `index.js`

```js
export { schemaCliente, schemaProduto, schemaPedido, schemaClienteSeguro } from './src/schemas.js';
export { validarPedido } from './src/validar.js';
```

O `export { ... } from '...'` **reexporta**: pega o que está em outro arquivo e oferece por aqui. Quem usa a biblioteca só precisa conhecer o `index.js`.

### Usando a biblioteca: `teste.js`

Aqui aparece o **`if`**: "se o pedido foi aceito, faça isto; senão, faça aquilo".

```js
import { validarPedido, schemaClienteSeguro } from './index.js';

const pedido = {
  cliente: { nome: 'Ana Souza', email: 'ana@email.com', cpf: '123.456.789-00', cidade: 'Salvador' },
  carrinho: [
    { nome: 'Teclado', preco: 350 },
    { nome: 'Mouse', preco: 120 },
  ],
  pagamento: 'pix',
};

const resultado = validarPedido(pedido);

if (resultado.success) {
  console.log('Pedido aceito. Cupom:', resultado.data.cupom);
} else {
  console.log('Pedido recusado:', resultado.error.issues[0].message);
}

// Pedido com carrinho vazio, copiado com spread
const pedidoVazio = { ...pedido, carrinho: [] };
const resultadoVazio = validarPedido(pedidoVazio);

if (resultadoVazio.success) {
  console.log('Pedido aceito. Cupom:', resultadoVazio.data.cupom);
} else {
  console.log('Pedido recusado:', resultadoVazio.error.issues[0].message);
}

// Esconder o CPF
console.log(schemaClienteSeguro.parse(pedido.cliente));
```

Resultado esperado no terminal:

```
Pedido aceito. Cupom: SEM CUPOM
Pedido recusado: O carrinho precisa ter pelo menos 1 item
{ nome: 'Ana Souza', email: 'ana@email.com', cidade: 'Salvador' }
```

Note que `{ ...pedido, carrinho: [] }` é o **spread** da Aula 2: uma cópia do pedido com o carrinho trocado, sem estragar o original.

### Quando tem mais de um erro

```js
import { validarPedido } from './index.js';
const pedido = {
  cliente: { nome: 'Ana Souza', email: 'ana.email.com', cpf: '123.456.789-00', cidade: 'Salvador' },
  carrinho: [{ nome: 'Teclado', preco: -350 }],
  pagamento: 'pix',
};
const r = validarPedido(pedido);
console.log(r.error.issues.length);
console.log(r.error.issues[0].path, r.error.issues[0].message);
console.log(r.error.issues[1].path, r.error.issues[1].message);
```

```
2
[ 'cliente', 'email' ] Email inválido
[ 'carrinho', 0, 'preco' ] O preço precisa ser maior que zero
```

Um email sem `@` **e** um preço negativo geram **dois** itens em `issues`. O `path` diz **onde** está cada erro.

> **🎨 Em uma frase:** o `index.js` é a porta de entrada da caixa de ferramentas, e cada schema é uma regra que a caixa sabe conferir.

> **🌱 Pensando no TypeScript:** o `omit` do Zod tem um irmão no TypeScript chamado `Omit`. Vamos reencontrá-lo na seção 4.

**💬 E daí?** O CPF é um dado protegido pela LGPD. Com o `omit`, o molde **garante** que ele não sai, mesmo se alguém esquecer de tirar à mão. A biblioteca protege quem programa e o cliente.

**✅ Checkpoint:** o `schemaClienteSeguro.parse(...)` não mostrou o `cpf`, e eu não escrevi nenhum rest. Por quê?

<details>
<summary>💡 Ver resposta</summary>

O `omit` tira o `cpf` do **molde**, e o Zod devolve só os campos que estão no molde. É a mesma ideia do rest da Aula 2 (separar o que não deve aparecer), feita no schema.

</details>

---

## 4. Tipagem estática: a ponte para o TypeScript

**Por que usar?** **Tipo** é a **promessa** sobre o formato do dado ("isto é um número"). A **tipagem estática** é um revisor que lê o seu código **antes** de rodar e avisa "você prometeu número e escreveu texto". O Zod é o porteiro que confere o dado **na hora em que ele chega**.

### Primeiro, o problema

O JavaScript descobre o tipo **quando roda** e deixa o campo mudar de tipo sem avisar:

```js
const produto = { nome: 'Teclado', preco: 350 };
console.log(typeof produto.preco);

produto.preco = 'abc';
console.log(typeof produto.preco);
```

```
number
string
```

`typeof` mostra o tipo **naquele momento**. O JavaScript aceitou trocar `350` por `'abc'` sem reclamar.

### O revisor: TypeScript (só para ler)

O **TypeScript** é o JavaScript com tipos. **Hoje não vamos escrever TypeScript**: o objetivo é reconhecer o que é parecido. Este código é só para ler:

```ts
type Produto = { nome: string; preco: number; cupom?: string };

const teclado: Produto = { nome: 'Teclado', preco: 'abc' };
console.log(teclado.preco);
```

O revisor acusa o erro **sem rodar o programa**:

```
t1.ts(3,45): error TS2322: Type 'string' is not assignable to type 'number'.
```

### A mesma função, agora com tipos

Volte à `formatarPreco` da seção 1. No TypeScript, o `: number` depois do nome do parâmetro é a promessa "isto é um número", e o `: string` depois dos parênteses diz o que a função **devolve** (o `return` que você aprendeu hoje). Isso responde à dúvida da primeira 🌱. Só para ler:

```ts
function formatarPreco(preco: number): string {
  return `R$ ${preco}`;
}

console.log(formatarPreco(350));
console.log(formatarPreco('abc'));
```

O revisor acusa a chamada com `'abc'` **antes** de o programa rodar:

```
t4.ts(6,27): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

### Os paralelos

| Ideia | TypeScript (tipagem estática) | Zod (no JavaScript) |
|---|---|---|
| Texto | `string` | `z.string()` |
| Número | `number` | `z.number()` |
| Verdadeiro/falso | `boolean` | `z.boolean()` |
| Ficha | `{ nome: string; preco: number }` | `z.object({ nome: z.string(), preco: z.number() })` |
| Campo opcional | `cupom?: string` | `cupom: z.string().optional()` |
| Lista | `string[]` | `z.array(z.string())` |
| Tirar um campo | `Omit<Cliente, 'cpf'>` | `schemaCliente.omit({ cpf: true })` |
| **Quando confere** | **antes de rodar**, no editor | **quando roda**, com o dado real |
| **Depois de rodar** | os tipos **somem** | o schema **continua lá**, conferindo |

### O que você vai reencontrar no TypeScript

Quando chegar a hora de **escrever** TypeScript, você vai ver estas coisas. Todas já têm um parente que você usou hoje:

| No TypeScript você vai ver | O que significa | Você já viu hoje |
|---|---|---|
| `preco: number` | "o `preco` é um número" (anotação de tipo) | `z.number()` |
| `type Produto = { ... }` | descrever a ficha | `z.object({ ... })` |
| `: string` depois dos parênteses | tipo do que a função devolve | `return` |
| `Omit<Cliente, 'cpf'>` | a ficha sem o `cpf` | `.omit({ cpf: true })` |
| erro no editor antes de rodar | o revisor avisando | o `success: false` do Zod, só que mais cedo |

> **🎨 Em uma frase:** TypeScript confere o que eu **escrevi**. Zod confere o que **chegou**.

**💬 E daí?** Quem entende a diferença entre "conferir o código" e "conferir o dado" sabe por que sistemas sérios usam **os dois**. Quando você chegar ao TypeScript, esses conceitos já estarão na sua cabeça.

**✅ Checkpoint:** o TypeScript já avisa no editor quando o tipo está errado. Por que eu ainda preciso do Zod?

<details>
<summary>💡 Ver resposta</summary>

Porque o dado que chega de fora (formulário, outro sistema) só existe **quando o programa roda**. O TypeScript enxerga o código, mas não o dado real, e os tipos somem depois que o programa começa a rodar. O Zod confere o dado de verdade.

</details>

---

## 🧠 Resumo

| Quero... | Uso |
|---|---|
| Dividir o código em arquivos | `export` e `import` |
| Oferecer tudo por uma porta só | `index.js` com `export { ... } from '...'` |
| Descrever como o dado deve ser | Schema do Zod (`z.object`, `z.string`, `z.number`...) |
| Conferir um dado sem derrubar o programa | `schema.safeParse(dado)` |
| Saber onde e por que deu erro | `resultado.error.issues` (`message` e `path`) |
| Um valor padrão quando o campo não vem | `.default(valor)` |
| Esconder um campo (como o CPF) | `schema.omit({ campo: true })` |
| Entender "tipo" | Promessa sobre o formato do dado |
| Reconhecer um código TypeScript | `preco: number`, `type Produto = { ... }`, `Omit<...>` (parentes do que o Zod faz) |

---

## 👥 Exercício da aula: o cadastro de produtos da LojaÁgil

**Tempo:** até 45 minutos. Faça em dupla: uma pessoa é a **pilota** (digita) e a outra é a **navegadora** (lê o enunciado e confere o resultado). **Troquem de papel a cada passo.**

### 🎯 O cenário

Os vendedores da LojaÁgil vão cadastrar produtos pelo painel. O dado chega de um formulário e pode vir errado. O time pediu uma **biblioteca de validação**: ela confere o cadastro, devolve mensagens claras para o vendedor e **nunca deixa o custo (a margem de lucro da loja) aparecer na vitrine** para o cliente.

### 🧭 Como a dupla trabalha (High Agency na prática)

- **Bias to Action:** faça **um passo, rode, confira**. Não escreva tudo para só depois rodar.
- **Clear Thinking:** antes de escrever uma mensagem de erro, responda em voz alta: **"quem vai ler isso e o que essa pessoa precisa entender?"**
- **Discordância Positiva:** em pelo menos **2 passos**, a navegadora propõe **outra forma** ou **uma regra a mais**. A dupla testa e escolhe a melhor com argumento, **não** quem fala mais alto.

### 🪜 Os passos

Rode o arquivo **depois de cada passo** e compare com o resultado esperado.

**Passo 1: Criar o projeto.** Crie a pasta `cadastro-produtos`. Dentro dela, rode `npm init -y` e `npm install zod`. Adicione `"type": "module"` no `package.json`. Crie a pasta `src`.
> Resultado esperado: seu `package.json` tem a linha `"type": "module"` e o `zod` na lista de `dependencies`.

**Passo 2: O schema.** Crie `src/schemas.js` com o `schemaProduto` (**exportado**) e estes campos, com **estas mensagens exatamente**:

| Campo | Regra | Mensagem |
|---|---|---|
| `nome` | texto, mínimo 2 letras | `O nome precisa ter pelo menos 2 letras` |
| `preco` | número, maior que zero | `O preço precisa ser um número` (se não for número) e `O preço precisa ser maior que zero` |
| `custo` | número, maior que zero | `O custo precisa ser um número` e `O custo precisa ser maior que zero` |
| `estoque` | número inteiro, no mínimo 0 | `O estoque precisa ser um número`, `O estoque precisa ser inteiro` e `O estoque não pode ser negativo` |

> Resultado esperado: rodar `node src/schemas.js` **não mostra nada** (e não dá erro).

**Passo 3: A biblioteca.** Crie `src/validar.js` com a função `validarProduto(dado)`, que **devolve** o `safeParse` do `schemaProduto`. Depois crie o `index.js` na raiz, que **reexporta** o `schemaProduto` e a `validarProduto`.
> Resultado esperado: rodar `node index.js` **não mostra nada** (e não dá erro).

**Passo 4: Um produto válido.** Crie `teste.js`. Importe `validarProduto` **do `index.js`**. Valide este produto e mostre `success` e `data`:

```js
const fone = { nome: 'Fone', preco: 90, custo: 55, estoque: 15 };
```

> Resultado esperado:
> ```
> true
> { nome: 'Fone', preco: 90, custo: 55, estoque: 15 }
> ```

**Passo 5: Um produto com erro.** Valide este produto. Mostre o `success` e **quantos erros** (`issues.length`) no mesmo `console.log`. Depois mostre a **mensagem do primeiro erro**:

```js
const foneRuim = { nome: 'F', preco: -90, custo: 55, estoque: 15 };
```

> Resultado esperado:
> ```
> false 2
> O nome precisa ter pelo menos 2 letras
> ```

**Passo 6: Opcional e padrão.** Acrescente ao `schemaProduto`, **depois do `estoque`**, dois campos:
- `desconto`: número de 0 a 50, com valor padrão `0`. Mensagens: `O desconto não pode ser negativo` e `O desconto máximo é 50`.
- `cor`: texto **opcional**.

No `teste.js`, crie `foneDescontoAlto`, uma **cópia do `fone` com spread** e `desconto: 80`. Valide e mostre o `success` e a mensagem do primeiro erro.

> Resultado esperado ao rodar o `teste.js` inteiro: a **saída do Passo 4 mudou** (agora o `data` tem `desconto: 0`, é o padrão funcionando) e aparece uma linha nova:
> ```
> true
> { nome: 'Fone', preco: 90, custo: 55, estoque: 15, desconto: 0 }
> false 2
> O nome precisa ter pelo menos 2 letras
> false O desconto máximo é 50
> ```

**Passo 7: O lote.** Um fornecedor envia vários produtos de uma vez. No `schemas.js`, crie e exporte o `schemaLote`: um objeto com `fornecedor` (texto de pelo menos 2 letras, mensagem `Informe o fornecedor`) e `produtos` (**lista** de `schemaProduto`, com pelo menos 1 item, mensagem `O lote precisa ter pelo menos 1 produto`). Crie `validarLote` no `validar.js` e **acrescente os dois ao `index.js`**. No `teste.js`, valide estes dois lotes e mostre `success` do primeiro, e `success`, a mensagem e o `path` do primeiro erro do segundo:

```js
const webcam = { nome: 'Webcam', preco: 200, custo: 120, estoque: 6, cor: 'preta' };
const lote = { fornecedor: 'TechSul', produtos: [fone, webcam] };
const loteVazio = { fornecedor: 'TechSul', produtos: [] };
```

> Resultado esperado (linhas novas):
> ```
> true
> false O lote precisa ter pelo menos 1 produto
> [ 'produtos' ]
> ```

**Passo 8: A vitrine sem o custo.** No `schemas.js`, crie e exporte o `schemaProdutoVitrine`: o `schemaProduto` **sem o `custo`** (use `omit`). Acrescente ao `index.js`. No `teste.js`, passe o `data` do produto válido pelo `schemaProdutoVitrine.parse(...)` e mostre o resultado.

> Resultado esperado de **todo o `teste.js`**:
> ```
> true
> { nome: 'Fone', preco: 90, custo: 55, estoque: 15, desconto: 0 }
> false 2
> O nome precisa ter pelo menos 2 letras
> false O desconto máximo é 50
> true
> false O lote precisa ter pelo menos 1 produto
> [ 'produtos' ]
> { nome: 'Fone', preco: 90, estoque: 15, desconto: 0 }
> ```

**🚀 Desafio extra: quando o dado vem como texto.** Um formulário HTML manda tudo como texto. Valide este produto e mostre o `success` e a mensagem do primeiro erro:

```js
const doFormulario = { nome: 'Fone', preco: '90', custo: 55, estoque: 15 };
```

1. O que aparece? Por que o Zod recusou, se `'90'` "parece" um número?
2. **Discordância Positiva:** a loja deveria aceitar `'90'`? Defendam um lado com **um argumento**.
3. Pesquisem juntos: o Zod tem um jeito de **converter** texto em número antes de validar (procurem por `z.coerce`).

**Pergunta para responder em dupla** (num comentário no código, começando com `//`): por que o `custo` não pode aparecer na vitrine? Escrevam **uma frase pensando na loja** e **uma pensando no cliente**.

### ✅ Antes de entregar

- [ ] Todos os resultados batem com o esperado?
- [ ] A dupla trocou de papel a cada passo?
- [ ] Alguém na dupla consegue explicar, **com as próprias palavras**, a diferença entre o TypeScript e o Zod?
- [ ] A dupla discordou de forma positiva em pelo menos 2 passos?

---

## 📝 Lista de exercícios para casa

Faça cada um **sem dupla**, nesta ordem. Os exercícios 1 a 3 vão num arquivo cada (`casa1.js`, `casa2.js`, `casa3.js`), **dentro da pasta `lojagil-validacao`** (onde o Zod já está instalado). O exercício 4 tem uma pasta própria (`casa4`). **Um passo de cada vez**: faça, rode, confira.

As dicas estão escondidas: clique em **"💡 Ver dicas"** só depois de tentar.

| Exercício | Tema | Dificuldade |
|---|---|---|
| 1. A avaliação do produto | Primeiro schema, `safeParse` e campo opcional | 🟢 Fácil |
| 2. O cupom em outro arquivo | `export`/`import`, `default` e spread | 🟡 Médio |
| 3. Do TypeScript para o Zod | Paralelos com tipagem estática | 🟢 Fácil |
| 4. A biblioteca de cadastro de usuários | Tudo junto: módulos, schemas, `omit` e `index.js` | 🔴 Difícil |

---

### Exercício 1: A avaliação do produto 🟢 Fácil

Na LojaÁgil, os clientes avaliam os produtos com uma **nota de 1 a 5** e, se quiserem, um comentário. A nota **não pode** passar de 5.

**O que fazer** (arquivo `casa1.js`):

1. Importe o `z` do `'zod'` e crie o `schemaAvaliacao`:
   - `autor`: texto, mínimo 2 letras (`O nome do autor precisa ter pelo menos 2 letras`);
   - `nota`: número **inteiro**, de 1 a 5 (mensagens: `A nota precisa ser um número`, `A nota precisa ser inteira`, `A nota mínima é 1`, `A nota máxima é 5`);
   - `comentario`: texto **opcional**.
2. Valide `{ autor: 'Marina', nota: 5 }`. Mostre `success` e `data` no mesmo `console.log`.
3. Valide `{ autor: 'Marina', nota: 7 }`. Mostre `success` e a mensagem do primeiro erro.
4. Crie uma **cópia** da primeira avaliação (com spread) com `nota: 4` e `comentario: 'Chegou rápido'`. Valide e mostre só o `data`.
5. Escreva um comentário (`//`): o que aconteceria na loja se a nota não tivesse regra de máximo?

**Resultado esperado:**

```
true { autor: 'Marina', nota: 5 }
false A nota máxima é 5
{ autor: 'Marina', nota: 4, comentario: 'Chegou rápido' }
```

<details>
<summary>💡 Ver dicas</summary>

- O schema começa com `z.object({ ... })`, com um campo por linha.
- Regras se **encadeiam**: `z.number('mensagem').int('mensagem').min(1, 'mensagem').max(5, 'mensagem')`.
- Campo opcional: `z.string().optional()`.
- Para mostrar duas coisas no mesmo `console.log`, separe com vírgula.
- Para o item 4, lembre do exemplo do `mousePromocao` da Aula 2: `{ ...avaliacao, nota: 4 }`.
- Se der `Cannot find package 'zod'`, você está rodando fora da pasta onde o Zod foi instalado.

</details>

---

### Exercício 2: O cupom em outro arquivo 🟡 Médio

O time de marketing criou **cupons de desconto**. A regra do cupom precisa ficar em **um arquivo só**, e quem precisa dela faz `import`.

**O que fazer:**

1. Crie `src/cupom.js`. Nele, **exporte** o `schemaCupom`:
   - `codigo`: texto, mínimo 4 caracteres (`O código precisa ter pelo menos 4 caracteres`);
   - `desconto`: número de 1 a 50, com valor padrão `10` (`O desconto mínimo é 1` e `O desconto máximo é 50`).
2. No mesmo arquivo, **exporte** a função `validarCupom(dado)`, que **devolve** o `safeParse` do `schemaCupom`.
3. Crie `casa2.js` e **importe** a `validarCupom` do `src/cupom.js`.
4. Valide `{ codigo: 'PDA10' }` e mostre o `data`.
5. Valide `{ codigo: 'PDA', desconto: 20 }`. Mostre `success` e a mensagem do primeiro erro.
6. Crie `base = { codigo: 'PDA15', desconto: 15 }`. Crie `cupomExagerado` como **cópia** da `base` com `desconto: 60` (spread). Valide o `cupomExagerado`. Mostre `success`, a mensagem do primeiro erro e o `desconto` da `base`, tudo no mesmo `console.log`.

**Resultado esperado:**

```
{ codigo: 'PDA10', desconto: 10 }
false O código precisa ter pelo menos 4 caracteres
false O desconto máximo é 50 15
```

<details>
<summary>💡 Ver dicas</summary>

- Cada coisa que outro arquivo vai usar precisa de `export` na frente: `export const ...` e `export function ...`.
- O `import` usa chaves e o **caminho com `.js`**: `import { validarCupom } from './src/cupom.js';`
- Valor padrão no Zod: `.default(10)`.
- No item 4, o `desconto` aparece com o valor padrão, mesmo sem você ter mandado.
- No item 6, o último valor do `console.log` deve continuar `15`. Se aparecer `60`, você criou um apelido em vez de uma cópia.
- Se der `does not provide an export named ...`, confira se esqueceu o `export` ou se o nome está escrito igual nos dois arquivos.

</details>

---

### Exercício 3: Do TypeScript para o Zod 🟢 Fácil

Você vai **traduzir** três tipos do TypeScript para schemas do Zod. É só um exercício de reconhecer paralelos: o TypeScript abaixo é **só para ler**.

```ts
type Usuario = { nome: string; idade: number; ativo: boolean; apelido?: string };
type Endereco = { rua: string; numero: number; cidade: string };
type Tamanhos = string[];
```

**O que fazer** (arquivo `casa3.js`):

1. Crie o `schemaUsuario`, o `schemaEndereco` e o `schemaTamanhos`, equivalentes aos três tipos. **Sem mensagens personalizadas.**
2. Valide `{ nome: 'Rafa', idade: 19, ativo: true }` com o `schemaUsuario` e mostre o `success`.
3. Crie `usuarioRuim`, uma **cópia** do usuário com `idade: '19'` (texto). Valide e mostre `success` e a mensagem do primeiro erro.
4. Valide `{ rua: 'Rua das Flores', numero: 120, cidade: 'Manaus' }` com o `schemaEndereco` e mostre o `success`.
5. Valide `['P', 'M', 'G']` e depois `['P', 10]` com o `schemaTamanhos`. Mostre os dois `success` no mesmo `console.log`.

**Resultado esperado:**

```
true
false Invalid input: expected number, received string
true
true false
```

<details>
<summary>💡 Ver dicas</summary>

- Use a **tabela de paralelos** da seção 4: `string` vira `z.string()`, `number` vira `z.number()`, `boolean` vira `z.boolean()`.
- O `?` do TypeScript (campo opcional) vira `.optional()` no Zod.
- `string[]` vira `z.array(z.string())`.
- A mensagem do item 3 vem **em inglês**: é a mensagem padrão do Zod quando você não escreve uma. Guarde essa observação para a pergunta abaixo.
- Se o `success` do item 5 deu `true` nos dois, confira se o schema é `z.array(z.string())` e não `z.array(z.any())`.

</details>

**Pergunta para pensar** (num comentário): se o cliente é brasileiro, por que vale a pena escrever **a sua própria mensagem** em vez de usar a padrão?

---

### Exercício 4: A biblioteca de cadastro de usuários 🔴 Difícil

Este exercício junta tudo o que vimos. A LojaÁgil precisa de uma **biblioteca de cadastro de usuários** que valide os dados e gere um **perfil público** que **nunca** mostra a senha nem o CPF (lembra da Carla, da Aula 2?).

**Estrutura de pastas** (crie dentro da pasta `lojagil-validacao`):

```
casa4/
├── index.js
├── teste.js
└── src/
    ├── schemas.js
    └── validar.js
```

**O que fazer:**

1. **`src/schemas.js`:** exporte o `schemaEndereco` e o `schemaUsuario`.
   - `schemaEndereco`: `rua` (texto, mínimo 2, `Informe a rua`), `numero` (número, inteiro, maior que zero; mensagens `O número precisa ser um número`, `O número precisa ser inteiro` e `O número precisa ser maior que zero`), `cidade` (texto, mínimo 2, `Informe a cidade`).
   - `schemaUsuario`: `nome` (mínimo 2, `O nome precisa ter pelo menos 2 letras`), `email` (use `z.email`, `Email inválido`), `senha` (mínimo 8, `A senha precisa ter pelo menos 8 caracteres`), `cpf` (exatamente 14 caracteres, `O CPF precisa ter 14 caracteres`), `telefones` (**lista** de textos, com pelo menos 1, `Informe pelo menos 1 telefone`) e `endereco` (o `schemaEndereco`).
2. **Perfil público:** no mesmo arquivo, exporte o `schemaPerfilPublico`: o `schemaUsuario` **sem** `senha` e **sem** `cpf`.
3. **`src/validar.js`:** exporte `validarUsuario(dado)` e `gerarPerfilPublico(dado)`. Cada uma **devolve** o `safeParse` do schema certo.
4. **`index.js`:** **reexporte** os schemas e as duas funções.
5. **`teste.js`:** importe **só do `index.js`** e use este usuário:

```js
const carla = {
  nome: 'Carla Dias',
  email: 'carla@email.com',
  senha: 'minhasenha123',
  cpf: '111.222.333-44',
  telefones: ['(92) 99999-1111'],
  endereco: { rua: 'Rua das Flores', numero: 120, cidade: 'Manaus' },
};
```

   - Mostre o `success` da `validarUsuario(carla)`.
   - Mostre o `data` da `gerarPerfilPublico(carla)`.
   - Crie `carlaRuim`, uma **cópia** da Carla com `senha: '123'` e o `endereco` copiado com `numero: -5` (spread **dentro** do spread). Valide e mostre `success` e `issues.length`. Depois mostre `path` e `message` dos **dois** primeiros erros.
   - Valide uma cópia da Carla com `telefones: []`. Mostre `success` e a mensagem do primeiro erro.
6. **Pensando como pessoa de mercado:** escreva **dois comentários** no `teste.js`:
   - **Tipagem estática:** como ficaria o `schemaEndereco` escrito como `type` do TypeScript? (Escreva só o texto, num comentário.)
   - **Discordância Positiva:** a regra da senha é "mínimo 8 caracteres". A senha `12345678` passaria. Proponha **uma regra a mais** e defenda com um argumento.

**Resultado esperado** (rodando `node teste.js` dentro da pasta `casa4`):

```
true
{
  nome: 'Carla Dias',
  email: 'carla@email.com',
  telefones: [ '(92) 99999-1111' ],
  endereco: { rua: 'Rua das Flores', numero: 120, cidade: 'Manaus' }
}
false 2
[ 'senha' ] A senha precisa ter pelo menos 8 caracteres
[ 'endereco', 'numero' ] O número precisa ser maior que zero
false Informe pelo menos 1 telefone
```

<details>
<summary>💡 Ver dicas</summary>

- **Não tente fazer tudo de uma vez.** Faça o `schemaEndereco`, rode. Depois o `schemaUsuario`, rode. Uma tarefa grande é só um monte de tarefas pequenas.
- Crie o `schemaEndereco` **antes** do `schemaUsuario` no arquivo: o segundo usa o primeiro.
- Reveja o exemplo do `schemaClienteSeguro` na seção 3. Aqui você tira **dois** campos: `omit({ senha: true, cpf: true })`.
- Em `src/validar.js`, o `import` do schema precisa do `.js`: `import { schemaUsuario, schemaPerfilPublico } from './schemas.js';`
- O `index.js` usa `export { ... } from './src/schemas.js';` e `export { ... } from './src/validar.js';`
- No `teste.js`, o `import` é de `'./index.js'`.
- Cópia com spread dentro do spread: `{ ...carla, senha: '123', endereco: { ...carla.endereco, numero: -5 } }`.
- O `path` do erro do endereço tem **dois** itens (`[ 'endereco', 'numero' ]`): o caminho até o campo.
- O `data` do perfil público **não** tem `senha` nem `cpf`. Se tiver, o `omit` não está certo.
- Se o resultado do perfil público aparecer em várias linhas, é normal: o Node quebra objetos grandes.

</details>

---

## 🐞 Erros comuns e o que eles significam

Antes de pedir ajuda, leia a mensagem inteira e tente **pelo menos uma** correção. Ela quase sempre aponta o **arquivo** e a **linha**.

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../formatar' imported from ...` | O caminho do `import` está **sem o `.js`** | Escreva `'./src/formatar.js'`. O Node até sugere o caminho certo no fim da mensagem |
| `SyntaxError: The requested module '...' does not provide an export named 'x'` | O nome não existe no arquivo de origem: faltou `export` ou a letra está diferente | Confira o `export` e compare o nome letra por letra |
| `ReferenceError: require is not defined in ES module scope` | Você usou `require` num projeto que usa `import` | Troque por `import` |
| `Warning: MODULE_TYPELESS_PACKAGE_JSON` | Faltou `"type": "module"` no `package.json` | Adicione a linha no `package.json` |
| `Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'zod'` | O Zod não está instalado nessa pasta | Rode `npm install zod` **na pasta do projeto** |
| `TypeError: Cannot read properties of undefined (reading 'issues')` | Você leu `resultado.error` quando o dado estava certo (nesse caso `error` não existe) | Confira o `success` antes de ler o `error` |
| `ZodError: [` e o programa para | Você usou `parse` com dado inválido | Use `safeParse`, que devolve o resultado |
| `undefined` onde não devia | Erro de digitação no nome do campo (`succes` em vez de `success`) | Compare letra por letra |
| `SyntaxError: Identifier 'x' has already been declared` | A mesma variável foi criada duas vezes no arquivo | Use outro nome ou outro arquivo |

---

**Lembre-se:** ninguém aprende programação sem errar. Cada mensagem de erro que você resolve sozinho(a) é um passo para ser a pessoa que resolve problemas no time. Bons estudos! 🚀

**🏁 Desafio bônus (opcional, 15 minutos):** invente o **seu próprio schema**. Escolha um negócio que você conhece (uma barbearia, uma lanchonete, um salão), crie um schema para o cadastro de um cliente ou de um serviço e valide um dado certo e um errado. Quem cria o problema entende o conteúdo de verdade.
