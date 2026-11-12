# ✅ Gabarito comentado

**Aula 3: Criando uma Biblioteca e Validando Dados (módulos ES, Zod e tipagem estática)**

Este arquivo tem as respostas do **exercício da aula** e da **lista de exercícios para casa**.

> **Como usar o gabarito:** ele não serve para copiar. Serve para **comparar**. Primeiro tente resolver sozinho(a). Depois confira o seu código com o daqui. Se o seu resultado no terminal for igual ao esperado, **o seu código também está certo**, mesmo que seja escrito de outro jeito. Existe mais de um caminho para chegar na mesma resposta.
>
> Se o seu código deu um resultado diferente, não apague tudo. Compare **linha por linha** com o gabarito e descubra onde está a diferença. Esse é o momento em que você mais aprende.

---

## 📑 Sumário

- [✅ Gabarito comentado](#-gabarito-comentado)
  - [📑 Sumário](#-sumário)
  - [👥 Exercício da aula: o cadastro de produtos](#-exercício-da-aula-o-cadastro-de-produtos)
    - [🚀 Desafio extra: quando o dado vem como texto](#-desafio-extra-quando-o-dado-vem-como-texto)
  - [Exercício 1: A avaliação do produto 🟢](#exercício-1-a-avaliação-do-produto-)
  - [Exercício 2: O cupom em outro arquivo 🟡](#exercício-2-o-cupom-em-outro-arquivo-)
  - [Exercício 3: Do TypeScript para o Zod 🟢](#exercício-3-do-typescript-para-o-zod-)
  - [Exercício 4: A biblioteca de cadastro de usuários 🔴](#exercício-4-a-biblioteca-de-cadastro-de-usuários-)
  - [❓ Dúvidas que costumam aparecer](#-dúvidas-que-costumam-aparecer)

---

## 👥 Exercício da aula: o cadastro de produtos

Estrutura final da pasta `cadastro-produtos`:

```
cadastro-produtos/
├── package.json     ("type": "module" e o zod nas dependencies)
├── index.js
├── teste.js
└── src/
    ├── schemas.js
    └── validar.js
```

**`src/schemas.js`** (versão final, depois do Passo 8):

```js
import { z } from 'zod';

export const schemaProduto = z.object({
  nome: z.string().min(2, 'O nome precisa ter pelo menos 2 letras'),
  preco: z.number('O preço precisa ser um número').positive('O preço precisa ser maior que zero'),
  custo: z.number('O custo precisa ser um número').positive('O custo precisa ser maior que zero'),
  estoque: z.number('O estoque precisa ser um número').int('O estoque precisa ser inteiro').min(0, 'O estoque não pode ser negativo'),
  desconto: z.number().min(0, 'O desconto não pode ser negativo').max(50, 'O desconto máximo é 50').default(0),
  cor: z.string().optional(),
});

export const schemaLote = z.object({
  fornecedor: z.string().min(2, 'Informe o fornecedor'),
  produtos: z.array(schemaProduto).min(1, 'O lote precisa ter pelo menos 1 produto'),
});

export const schemaProdutoVitrine = schemaProduto.omit({ custo: true });
```

**`src/validar.js`** (versão final, depois do Passo 7):

```js
import { schemaProduto, schemaLote } from './schemas.js';

export function validarProduto(dado) {
  return schemaProduto.safeParse(dado);
}

export function validarLote(dado) {
  return schemaLote.safeParse(dado);
}
```

**`index.js`** (versão final):

```js
export { schemaProduto, schemaLote, schemaProdutoVitrine } from './src/schemas.js';
export { validarProduto, validarLote } from './src/validar.js';
```

**`teste.js`** (versão final):

```js
import { validarProduto, validarLote, schemaProdutoVitrine } from './index.js';

// Passo 4: produto válido
const fone = { nome: 'Fone', preco: 90, custo: 55, estoque: 15 };
const resultado = validarProduto(fone);
console.log(resultado.success);
console.log(resultado.data);

// Passo 5: produto inválido
const foneRuim = { nome: 'F', preco: -90, custo: 55, estoque: 15 };
const resultadoRuim = validarProduto(foneRuim);
console.log(resultadoRuim.success, resultadoRuim.error.issues.length);
console.log(resultadoRuim.error.issues[0].message);

// Passo 6: desconto alto (cópia do fone com spread)
const foneDescontoAlto = { ...fone, desconto: 80 };
const resultadoDesconto = validarProduto(foneDescontoAlto);
console.log(resultadoDesconto.success, resultadoDesconto.error.issues[0].message);

// Passo 7: lote
const webcam = { nome: 'Webcam', preco: 200, custo: 120, estoque: 6, cor: 'preta' };
const lote = { fornecedor: 'TechSul', produtos: [fone, webcam] };
console.log(validarLote(lote).success);
const loteVazio = validarLote({ fornecedor: 'TechSul', produtos: [] });
console.log(loteVazio.success, loteVazio.error.issues[0].message);
console.log(loteVazio.error.issues[0].path);

// Passo 8: vitrine (sem o custo)
console.log(schemaProdutoVitrine.parse(resultado.data));
```

**Resultado no terminal (`node teste.js`):**

```
true
{ nome: 'Fone', preco: 90, custo: 55, estoque: 15, desconto: 0 }
false 2
O nome precisa ter pelo menos 2 letras
false O desconto máximo é 50
true
false O lote precisa ter pelo menos 1 produto
[ 'produtos' ]
{ nome: 'Fone', preco: 90, estoque: 15, desconto: 0 }
```

**Por que funciona, passo a passo:**

- **Passo 1:** o `"type": "module"` é o que permite usar `import` e `export`. O `npm install zod` coloca o Zod nas `dependencies`.
- **Passo 2:** cada regra encadeia com a anterior (`.positive(...)`, `.int(...)`, `.min(...)`). O schema só **descreve**; por isso rodar `node src/schemas.js` não mostra nada.
- **Passo 3:** `validarProduto` usa `return` para **devolver** o resultado. O `index.js` só reexporta, sem código novo. Rodar `node index.js` também não mostra nada.
- **Passo 4:** com o dado certo, `success` é `true` e `data` tem o produto.
- **Passo 5:** o `nome` `'F'` (menos de 2 letras) e o `preco` `-90` (não é maior que zero) geram **2** erros. O primeiro da lista é o do `nome`, porque o `nome` vem primeiro no schema.
- **Passo 6:** o campo `desconto` tem `.default(0)`: se não vem, o Zod coloca `0`. Por isso a **saída do Passo 4 mudou** e agora tem `desconto: 0`. O `cor` é `.optional()`: se não vem, **não aparece** no `data` (nem como `undefined`). O `foneDescontoAlto` é uma **cópia com spread**, então o `fone` original não muda.
- **Passo 7:** `z.array(schemaProduto).min(1, ...)` valida cada item da lista **e** o tamanho mínimo. No lote vazio, o `path` do erro é `[ 'produtos' ]`.
- **Passo 8:** o `omit({ custo: true })` cria um molde sem o `custo`. Ao passar o produto por ele, o `custo` **não sai**. É o rest da Aula 2, no schema.

**Outra forma que também está certa:** tirar todas as regras de um campo na mesma linha, ou escrever o `schemaProdutoVitrine` direto, campo por campo, sem `omit`. Dá o mesmo resultado, mas é mais código para manter igual aos dois schemas.

### 🚀 Desafio extra: quando o dado vem como texto

```js
import { validarProduto } from './index.js';

const doFormulario = { nome: 'Fone', preco: '90', custo: 55, estoque: 15 };
const resultado = validarProduto(doFormulario);
console.log(resultado.success, resultado.error.issues[0].message);
```

**Resultado no terminal:**

```
false O preço precisa ser um número
```

1. **Por que recusou?** `'90'` é um **texto** (um `string`). O `z.number()` só aceita o tipo **número**. O formulário HTML manda tudo como texto, então esse erro é comum na vida real.
2. **Discordância Positiva (resposta aberta):** qualquer resposta com um argumento vale. **A favor de aceitar:** o vendedor digitou certo, só o formato mudou. Recusar atrapalha quem usa. **Contra:** aceitar converte sem o vendedor saber (e `'9,0'` ou `'abc'`?); é melhor o formulário mandar o tipo certo. O importante é **defender com motivo**.
3. **`z.coerce`:** converte o texto em número **antes** de validar.

```js
import { z } from 'zod';

// z.coerce.number() tenta converter o texto em número ANTES de validar
const schemaPreco = z.object({
  preco: z.coerce.number('O preço precisa ser um número').positive('O preço precisa ser maior que zero'),
});

console.log(schemaPreco.safeParse({ preco: '90' }).data);
console.log(schemaPreco.safeParse({ preco: 'abc' }).error.issues[0].message);
```

```
{ preco: 90 }
O preço precisa ser um número
```

**Resposta esperada para a pergunta em dupla** (qualquer resposta com a mesma ideia vale):

- **Para a loja:** o custo mostra a margem de lucro. Se o cliente ou um concorrente vê, a loja perde poder de negociar preço.
- **Para o cliente:** ele só precisa do preço e do estoque para decidir. Dado interno na vitrine é ruído, e pode gerar discussão ("por que a margem é tão alta?").

---

## Exercício 1: A avaliação do produto 🟢

```js
import { z } from 'zod';

const schemaAvaliacao = z.object({
  autor: z.string().min(2, 'O nome do autor precisa ter pelo menos 2 letras'),
  nota: z.number('A nota precisa ser um número').int('A nota precisa ser inteira').min(1, 'A nota mínima é 1').max(5, 'A nota máxima é 5'),
  comentario: z.string().optional(),
});

const avaliacao = { autor: 'Marina', nota: 5 };
const r1 = schemaAvaliacao.safeParse(avaliacao);
console.log(r1.success, r1.data);

const r2 = schemaAvaliacao.safeParse({ autor: 'Marina', nota: 7 });
console.log(r2.success, r2.error.issues[0].message);

const r3 = schemaAvaliacao.safeParse({ ...avaliacao, nota: 4, comentario: 'Chegou rápido' });
console.log(r3.data);

// Se a nota não tivesse regra de máximo, o cliente veria uma avaliação com nota 7 de 5, e a média da loja ficaria errada.
```

**Resultado no terminal:**

```
true { autor: 'Marina', nota: 5 }
false A nota máxima é 5
{ autor: 'Marina', nota: 4, comentario: 'Chegou rápido' }
```

**Por que funciona:**

- As regras da `nota` se **encadeiam**: primeiro tem que ser número, depois inteiro, depois entre 1 e 5.
- Com a nota `7`, a única regra quebrada é a do máximo, então a mensagem é `A nota máxima é 5`.
- O `comentario` tem `.optional()`: na primeira avaliação ele não vem e **não aparece** no `data`. Na cópia com spread ele vem e aparece.
- O spread `{ ...avaliacao, nota: 4, comentario: '...' }` cria uma **cópia nova**, sem mexer na `avaliacao` original.

**Exemplo de resposta para o comentário (item 5):** se a nota não tivesse máximo, entrariam avaliações como 7 de 5, e a **média** de notas do produto ficaria errada. O cliente tomaria decisão com um número falso.

---

## Exercício 2: O cupom em outro arquivo 🟡

**`src/cupom.js`:**

```js
import { z } from 'zod';

export const schemaCupom = z.object({
  codigo: z.string().min(4, 'O código precisa ter pelo menos 4 caracteres'),
  desconto: z.number().min(1, 'O desconto mínimo é 1').max(50, 'O desconto máximo é 50').default(10),
});

export function validarCupom(dado) {
  return schemaCupom.safeParse(dado);
}
```

**`casa2.js`:**

```js
import { validarCupom } from './src/cupom.js';

const r1 = validarCupom({ codigo: 'PDA10' });
console.log(r1.data);

const r2 = validarCupom({ codigo: 'PDA', desconto: 20 });
console.log(r2.success, r2.error.issues[0].message);

const base = { codigo: 'PDA15', desconto: 15 };
const cupomExagerado = { ...base, desconto: 60 };
const r3 = validarCupom(cupomExagerado);
console.log(r3.success, r3.error.issues[0].message, base.desconto);
```

**Resultado no terminal:**

```
{ codigo: 'PDA10', desconto: 10 }
false O código precisa ter pelo menos 4 caracteres
false O desconto máximo é 50 15
```

**Por que funciona:**

- O `schemaCupom` e a `validarCupom` têm `export`, então o `casa2.js` consegue importar a função. O caminho no `import` termina com **`.js`**.
- Sem `desconto` no dado, o `.default(10)` coloca `10` no `data`.
- `'PDA'` tem 3 caracteres, então quebra a regra de mínimo 4. É o **único** erro desse dado, porque o desconto `20` está dentro do limite.
- `cupomExagerado` é uma cópia com spread. Por isso o último valor continua `15`: a `base` **não foi alterada**. Se aparecer `60`, o código fez `const cupomExagerado = base` (apelido).

---

## Exercício 3: Do TypeScript para o Zod 🟢

```js
import { z } from 'zod';

// type Usuario = { nome: string; idade: number; ativo: boolean; apelido?: string }
const schemaUsuario = z.object({
  nome: z.string(),
  idade: z.number(),
  ativo: z.boolean(),
  apelido: z.string().optional(),
});

// type Endereco = { rua: string; numero: number; cidade: string }
const schemaEndereco = z.object({
  rua: z.string(),
  numero: z.number(),
  cidade: z.string(),
});

// type Tamanhos = string[]
const schemaTamanhos = z.array(z.string());

const usuario = { nome: 'Rafa', idade: 19, ativo: true };
console.log(schemaUsuario.safeParse(usuario).success);

const usuarioRuim = { ...usuario, idade: '19' };
const r = schemaUsuario.safeParse(usuarioRuim);
console.log(r.success, r.error.issues[0].message);

console.log(schemaEndereco.safeParse({ rua: 'Rua das Flores', numero: 120, cidade: 'Manaus' }).success);
console.log(schemaTamanhos.safeParse(['P', 'M', 'G']).success, schemaTamanhos.safeParse(['P', 10]).success);

// Se o cliente é brasileiro, a mensagem padrão (em inglês) não ajuda. Escrever a nossa em português, com o campo e a regra, faz o cliente entender o que corrigir.
```

**Resultado no terminal:**

```
true
false Invalid input: expected number, received string
true
true false
```

**Por que funciona:**

| TypeScript | Zod |
|---|---|
| `string` | `z.string()` |
| `number` | `z.number()` |
| `boolean` | `z.boolean()` |
| `apelido?: string` | `apelido: z.string().optional()` |
| `string[]` | `z.array(z.string())` |

- O `usuario` não tem `apelido`, e passa, porque o campo é opcional.
- Com `idade: '19'`, o Zod recusa: `'19'` é texto, e o schema pede número. A mensagem **vem em inglês** porque não escrevemos uma nossa.
- `['P', 'M', 'G']` é uma lista só de textos (`true`). `['P', 10]` tem um número no meio (`false`).

**Exemplo de resposta para a pergunta:** a mensagem em inglês não ajuda um cliente brasileiro. Escrever a nossa, dizendo **qual campo** e **qual regra**, faz a pessoa entender o que corrigir. Qualquer resposta que fale de clareza para quem lê vale.

---

## Exercício 4: A biblioteca de cadastro de usuários 🔴

**`casa4/src/schemas.js`:**

```js
import { z } from 'zod';

export const schemaEndereco = z.object({
  rua: z.string().min(2, 'Informe a rua'),
  numero: z.number('O número precisa ser um número').int('O número precisa ser inteiro').positive('O número precisa ser maior que zero'),
  cidade: z.string().min(2, 'Informe a cidade'),
});

export const schemaUsuario = z.object({
  nome: z.string().min(2, 'O nome precisa ter pelo menos 2 letras'),
  email: z.email('Email inválido'),
  senha: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres'),
  cpf: z.string().length(14, 'O CPF precisa ter 14 caracteres'),
  telefones: z.array(z.string()).min(1, 'Informe pelo menos 1 telefone'),
  endereco: schemaEndereco,
});

export const schemaPerfilPublico = schemaUsuario.omit({ senha: true, cpf: true });
```

**`casa4/src/validar.js`:**

```js
import { schemaUsuario, schemaPerfilPublico } from './schemas.js';

export function validarUsuario(dado) {
  return schemaUsuario.safeParse(dado);
}

export function gerarPerfilPublico(dado) {
  return schemaPerfilPublico.safeParse(dado);
}
```

**`casa4/index.js`:**

```js
export { schemaEndereco, schemaUsuario, schemaPerfilPublico } from './src/schemas.js';
export { validarUsuario, gerarPerfilPublico } from './src/validar.js';
```

**`casa4/teste.js`:**

```js
import { validarUsuario, gerarPerfilPublico } from './index.js';

const carla = {
  nome: 'Carla Dias',
  email: 'carla@email.com',
  senha: 'minhasenha123',
  cpf: '111.222.333-44',
  telefones: ['(92) 99999-1111'],
  endereco: { rua: 'Rua das Flores', numero: 120, cidade: 'Manaus' },
};

console.log(validarUsuario(carla).success);
console.log(gerarPerfilPublico(carla).data);

const carlaRuim = {
  ...carla,
  senha: '123',
  endereco: { ...carla.endereco, numero: -5 },
};
const rRuim = validarUsuario(carlaRuim);
console.log(rRuim.success, rRuim.error.issues.length);
console.log(rRuim.error.issues[0].path, rRuim.error.issues[0].message);
console.log(rRuim.error.issues[1].path, rRuim.error.issues[1].message);

const semTelefone = validarUsuario({ ...carla, telefones: [] });
console.log(semTelefone.success, semTelefone.error.issues[0].message);

// Tipagem estática: o schemaEndereco escrito como type do TypeScript seria
// type Endereco = { rua: string; numero: number; cidade: string };
// (o TypeScript confere o código; o Zod confere o dado que chega)

// Discordância Positiva: '12345678' passaria na regra de mínimo 8 caracteres, mas é fácil de adivinhar.
// Proposta: exigir também pelo menos um número e uma letra (com .regex), porque senhas muito previsíveis são as primeiras a serem invadidas.
```

**Resultado no terminal (`node teste.js`, dentro da pasta `casa4`):**

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

**Por que funciona, passo a passo:**

- O `schemaEndereco` vem **antes** do `schemaUsuario`, porque o segundo usa o primeiro (`endereco: schemaEndereco`).
- `schemaPerfilPublico` é o `schemaUsuario` **sem** `senha` e **sem** `cpf`. O Zod devolve só os campos do molde, então o `data` do perfil público não tem nenhum dos dois. É o **rest** do Exercício 3 da Aula 2 (a Carla), agora no schema.
- `carlaRuim` usa **spread dentro do spread**: o `endereco` também é copiado, só com o `numero` trocado. Os dois erros aparecem: senha curta e número do endereço negativo.
- O `path` do erro do endereço tem **dois itens** (`[ 'endereco', 'numero' ]`): é o caminho até o campo, de fora para dentro.
- Com `telefones: []`, a regra `.min(1, ...)` da lista é quebrada.
- O `teste.js` importa **só do `index.js`**. Quem usa a biblioteca não precisa saber que existem `src/schemas.js` e `src/validar.js`.
- Se o `data` do perfil público apareceu em várias linhas, é normal: o Node quebra objetos grandes.

**Exemplos de resposta para os comentários (item 6):**

- **Tipagem estática:** `type Endereco = { rua: string; numero: number; cidade: string };`. O TypeScript confere o código; o Zod confere o dado que chega.
- **Discordância Positiva:** qualquer regra a mais com um argumento vale. Exemplo: exigir pelo menos um número e uma letra, porque senhas previsíveis como `12345678` são as primeiras a serem invadidas. Outro exemplo: proibir a senha igual ao nome do usuário.

---

## ❓ Dúvidas que costumam aparecer

**"O meu código deu o mesmo resultado, mas está escrito diferente. Está errado?"**
Não. Se o resultado no terminal é igual ao esperado e você não estragou os dados originais, está certo.

**"Deu `Cannot find package 'zod'`."**
Você está rodando o arquivo fora da pasta onde o Zod foi instalado. Rode `npm install zod` na pasta do projeto e confira se o `package.json` tem o `zod` em `dependencies`.

**"Deu `does not provide an export named ...`."**
Ou faltou o `export` no arquivo de origem, ou o nome está escrito diferente nos dois arquivos. Compare letra por letra.

**"Deu `Cannot find module ... imported from ...`."**
Quase sempre é o `.js` faltando no final do caminho do `import`.

**"Deu `Cannot read properties of undefined (reading 'issues')`."**
Você leu `resultado.error` num dado que estava **certo**: nesse caso o `error` não existe. Olhe o `success` antes.

**"As mensagens saíram em inglês."**
Você não escreveu uma mensagem na regra. Coloque o texto no segundo parâmetro, como em `.min(2, 'O nome precisa ter pelo menos 2 letras')`. Para a regra de tipo, passe a mensagem direto no `z.number('...')`.

**"O resultado do Passo 4 mudou depois do Passo 6."**
É o esperado: o `desconto` tem valor padrão `0`, e agora ele aparece no `data`.

---

**Conseguiu resolver tudo?** Ótimo! Agora tente **inventar o seu próprio schema**: escolha um negócio que você conhece (uma barbearia, uma lanchonete, um salão), crie o schema do cadastro de um cliente ou de um serviço e valide um dado certo e um errado. Quem consegue criar o problema entende o conteúdo de verdade. 🚀
