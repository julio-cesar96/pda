# 🧑‍🏫 Plano do professor: Criando uma Biblioteca e Validando Dados 🛠️

**Turma T8 · Módulo M1 · Aula 3** · Material só para o professor.

> **Temas:** estruturando uma aplicação Node.js com recursos de ES6+ · validação de dados com Zod · paralelos com tipagem estática.
>
> **Fio condutor:** preparar a turma para o **TypeScript**. Ao longo de toda a aula aparecem "sementes" (🌱) que plantam as ideias de *tipo* e *tipagem estática*, e o Bloco 4 as colhe.
>
> **Duração:** 2 h no total, dentro dos tetos de **60 min** de conteúdo técnico, **45 min** de exercício e **15 min** de fechamento.

---

## 📑 Sumário

1. [Objetivos de aprendizagem](#1-objetivos-de-aprendizagem)
2. [Caso de uso](#2-caso-de-uso)
3. [Pré-requisitos: o que a turma já viu](#3-pré-requisitos-o-que-a-turma-já-viu)
4. [Roteiro por minuto](#4-roteiro-por-minuto)
5. [Antes da aula](#5-antes-da-aula)
6. [Blocos de explicação](#6-blocos-de-explicação-60-min)
7. [Exercício em dupla](#7-exercício-em-dupla-45-min)
8. [Fechamento](#8-fechamento-15-min)
9. [Resumo dos diagramas](#9-resumo-dos-diagramas)
10. [Erros comuns](#10-erros-comuns)
11. [Critérios de observação (High Agency)](#11-critérios-de-observação-high-agency)

---

## 1. Objetivos de aprendizagem

Ao fim da aula, o aluno consegue:

1. **Dividir** um projeto Node.js em arquivos, usando `export` e `import`.
2. **Montar** uma pequena biblioteca, com uma porta de entrada (`index.js`) que reexporta o que os outros arquivos oferecem.
3. **Escrever** um schema com o Zod e **validar** dados com `safeParse`.
4. **Ler** o resultado (`success`, `data` e `error.issues`) e mostrar a mensagem certa para quem errou.
5. **Explicar**, com as próprias palavras, a diferença entre tipagem estática (conferir o código antes de rodar) e validação em tempo de execução (conferir o dado quando chega).
6. **Reconhecer**, num trecho simples de TypeScript, os mesmos conceitos que já usaram no Zod (`number`, `string`, ficha, opcional, lista, `Omit`). Isso prepara a turma para a hora em que **escreverem** TypeScript.

## 2. Caso de uso

O app da LojaÁgil envia o pedido para o servidor. Esse dado **vem de fora**: de um formulário, de um celular, de outra empresa. Ele pode chegar errado: preço como texto (`'abc'`), email sem `@`, carrinho vazio. Se o servidor confiar sem conferir, o cliente é cobrado errado ou o sistema quebra.

A solução do dia: **uma biblioteca de validação** que fica na porta do sistema e só deixa entrar o que está certo, e que qualquer parte do projeto pode usar.

**Ponte para o TypeScript.** Validar dado e declarar tipo respondem à mesma pergunta: *"como este dado deveria ser?"*. Se a turma sai da aula entendendo que um schema do Zod e um `type` do TypeScript **descrevem a mesma ficha**, e que um confere o dado na chegada e o outro confere o código antes de rodar, o TypeScript deixa de ser um assunto novo e vira uma continuação.

Na Aula 2 eles aprenderam a **mexer** nos dados (destructuring, spread, rest). Hoje aprendem a **conferir** os dados antes de mexer.

## 3. Pré-requisitos: o que a turma já viu

| Já viram (Aula 2 e revisão) | Ensinado **hoje**, dentro da aula | **Não aparece** |
|---|---|---|
| Objetos, arrays, arrays de objetos | `export` e `import` (módulos ES) | Arrow functions |
| Destructuring, valor padrão, spread, rest | `package.json` e `npm install` | Loops (`for`, `while`) |
| Funções com `function` e parâmetros | `return` (a função **devolve** um valor) | `map`, `filter`, `reduce` |
| `console.log`, `node arquivo.js` | Texto com `${}` (template literal) | `async` / `await` |
| Erro como pista (tabela de erros) | `typeof` | Classes |
| | Zod: `z.object`, `safeParse`, regras | TypeScript **escrito** (só lido) |
| | `if` / `else` (só no Bloco 3) | |

> ⚠️ **Duas suposições para você confirmar.** Nos materiais da Aula 2, as funções só faziam `console.log` (nenhuma usava `return`) e nenhum código usava `if`. Por isso o plano **ensina `return` no Bloco 1** e **apresenta o `if` no Bloco 3** em 2 minutos. Se a turma já domina os dois, só relembre e ganhe tempo.
>
> ⚠️ **Gancho pendente da Aula 2.** O desafio extra da revisão terminava com "como somar qualquer quantidade de itens? Anotem a ideia, ela é o ponto de partida da próxima aula". Hoje o tema é outro. Sugestão no [fechamento](#8-fechamento-15-min): retomar a pergunta e avisar que ela segue guardada para uma aula futura.

**Versões testadas:** Node.js 22 e **Zod 4.6.5** (`npm install zod`). As mensagens padrão do Zod em inglês (`Invalid input: expected number, received string`) são as dessa versão.

## 4. Roteiro por minuto

| Min | Atividade | O que o professor faz | Material |
|---|---|---|---|
| 0 a 5 | **Abertura**: o pedido chega de fora | Conta o caso, desenha o porteiro (🎨 1) | Excalidraw |
| 5 a 18 | **Bloco 1**: organizando em arquivos | Live coding de `package.json`, `formatar.js` e `app.js` (🎨 2) | Terminal + editor |
| 18 a 32 | **Bloco 2**: Zod, o porteiro dos dados | Mostra o problema (`NaN`), instala o Zod, escreve o primeiro schema | Terminal + editor |
| 32 a 46 | **Bloco 3**: montando a biblioteca | Regras, mensagens, `omit`, `validarPedido` e `index.js` | Terminal + editor |
| 46 a 60 | **Bloco 4**: paralelos com tipagem estática (ponte para o TypeScript) | `typeof`, função tipada, tabela de paralelos (🎨 3), TypeScript só para ler | Excalidraw + tabela |
| 60 a 105 | **Exercício em dupla**: cadastro de produtos | Conduz, circula, faz perguntas sem dar a resposta | README, passos 1 a 8 |
| 105 a 110 | Fechamento 1: correção ao vivo | Uma dupla mostra o resultado | Terminal |
| 110 a 115 | Fechamento 2: retrospectiva | "Onde travei, o que tentei, o que funcionou" | Quadro |
| 115 a 118 | Fechamento 3: conexão | Volta ao "E daí?" e ao gancho | — |
| 118 a 120 | Fechamento 4: próximo passo | Libera o GABARITO e os exercícios de casa | GitHub |

**Conta de tempo:** conteúdo técnico 5 + 13 + 14 + 14 + 14 = **60 min** · exercício **45 min** · fechamento **15 min** = **120 min**.

## 5. Antes da aula

- [ ] Node.js instalado e **internet funcionando** nos computadores (o `npm install zod` precisa dela). Plano B: leve a pasta `lojagil-validacao` pronta, com `node_modules`, num pen drive.
- [ ] Abra o Excalidraw com **3 quadros em branco** (ver [resumo dos diagramas](#9-resumo-dos-diagramas)) e o seu kit de ficha, seta e funil.
- [ ] Rode **uma vez** todo o código do Bloco 1 ao 3 na sua máquina, na ordem. O live coding vai ser o mesmo.
- [ ] Deixe o `README.md` do aluno aberto, para projetar o exercício.
- [ ] **Não** publique o `GABARITO.md` antes do fechamento.

---

## 6. Blocos de explicação (60 min)

### 🎬 Abertura (5 min): o pedido chega de fora

**Objetivo:** mostrar o problema que a aula resolve, antes de qualquer código.

**O porquê:** o dado que chega de fora é como um visitante na porta de uma festa. Alguém precisa conferir **antes** de deixar entrar.

**Fale assim:** "Na aula passada o pedido da Ana já chegava bonitinho. Na vida real, ele chega de um formulário que qualquer pessoa preencheu. O que acontece se o preço vier como `abc`?"

### 🎨 Para desenhar no Excalidraw: o porteiro dos dados
**Quando:** abertura, minutos 2 a 4  ·  **Tempo de desenho:** até 2 min

**Ordem do desenho:**
1. Caixa "app / formulário" à esquerda (⚪)
2. Ficha de dentro dela com `preco: 'abc'` (🔴)
3. Caixa "schema (as regras)" no meio, o **porteiro** (🟡)
4. Seta do porteiro para "sistema: carrinho, pagamento" com uma ficha certa (🟢)
5. Seta que **volta** do porteiro, com a frase "O preço precisa ser um número" (🔴)

**Esboço do layout:**
```
 MUNDO DE FORA                PORTEIRO (Zod)               SISTEMA
 ┌──────────────────┐        ┌──────────────┐        ┌────────────────┐
 │ app / formulário │ ─────▶ │   schema     │ ─ ✔ ─▶ │ carrinho,      │
 │ preco: 'abc' 🔴  │        │ (as regras)🟡│  (🟢)  │ pagamento...   │
 └──────────────────┘        └──────┬───────┘        └────────────────┘
                                    │ ✖ (🔴)
                                    ▼
                    "O preço precisa ser um número"
```

**Pergunta para a turma antes de revelar:** "Se o porteiro deixar o `'abc'` passar, quem é prejudicado no fim da fila?"
**Frase para fechar o desenho:** "Quem valida na porta protege o cliente e o sistema."

**O que observar:** alunos que já citam exemplos reais (formulário de cadastro, CPF inválido). Isso é Clear Thinking: pensar em quem usa.

---

### Bloco 1 · Organizando o projeto em arquivos (13 min)

**Objetivo:** dividir o código em arquivos e usar o que está em outro arquivo com `export` e `import`.

**O porquê:** um arquivo gigante é uma gaveta única bagunçada. Uma biblioteca é uma **caixa de ferramentas com gavetas**: cada arquivo guarda uma coisa e só sai da gaveta o que tem a etiqueta `export`.

**Problema primeiro (1 min).** Tudo num arquivo só vira conflito de nomes, e eles já conhecem esse erro:

```js
const nome = 'Ana';
const nome = 'Bruno';
```

```
SyntaxError: Identifier 'nome' has already been declared
```

**Passo a passo do live coding:**

1. No terminal, crie o projeto. O `npm init -y` cria o `package.json`, que é a **ficha do projeto** (um objeto, igual aos que eles já sabem ler):

```bash
mkdir lojagil-validacao
cd lojagil-validacao
npm init -y
```

2. Abra o `package.json` e adicione a linha `"type": "module"`. Ela avisa o Node de que vamos usar `import` e `export`. Fica assim:

```json
{
  "name": "lojagil-validacao",
  "version": "1.0.0",
  "type": "module"
}
```

> O `npm init -y` gera mais campos do que esses (`main`, `scripts`, `license`...). Pode deixar. O importante é a linha `"type": "module"`.

3. Crie a pasta `src` e o arquivo `src/formatar.js`. Aqui entram **dois conceitos novos**: `return` (a função **devolve** o resultado para quem chamou) e o texto com `${}` (crase e cifrão: "texto com buracos").

```js
// Tudo que vem com "export" pode ser usado por outros arquivos
export function formatarPreco(preco) {
  return `R$ ${preco}`;
}

export const nomeDaLoja = 'LojaÁgil';
```

4. Crie o `app.js`, que **importa** só o que precisa:

```js
import { formatarPreco, nomeDaLoja } from './src/formatar.js';

console.log(nomeDaLoja);
console.log(formatarPreco(350));
```

5. Rode `node app.js`:

```
LojaÁgil
R$ 350
```

**Resultado esperado:** as duas linhas acima.

### 🎨 Para desenhar no Excalidraw: arquivos como gavetas
**Quando:** passo 4, depois de rodar  ·  **Tempo de desenho:** até 2 min

**Ordem do desenho:**
1. Caixa `src/formatar.js` com duas "gavetas" dentro: `formatarPreco` e `nomeDaLoja` (🔵)
2. Caixa `app.js` à direita (🔵)
3. Duas setas rotuladas `export` → `import`, saindo das gavetas para o `app.js` (🟢)
4. Uma terceira gaveta **trancada** (🔒), sem `export`, que não tem seta (🔴)

**Esboço do layout:**
```
 src/formatar.js (🔵)                     app.js (🔵)
 ┌────────────────────────────┐          ┌───────────────────────────┐
 │ export formatarPreco   ────┼─ export ▶│ import { formatarPreco }  │ (🟢)
 │ export nomeDaLoja      ────┼─────────▶│ import { nomeDaLoja }     │
 │ 🔒 (sem export: fica aqui) │          └───────────────────────────┘
 └────────────────────────────┘                          (🔴 a gaveta trancada)
```

**Pergunta para a turma antes de revelar:** "O que acontece se `app.js` tentar pegar a gaveta trancada?"
**Frase para fechar o desenho:** "Só sai do arquivo o que tem `export`. Quem precisa, usa `import`."

**🌱 Semente do TypeScript (20 segundos):** olhe a `formatarPreco(preco)`. Nada diz que o `preco` precisa ser um número. Diga: "guardem essa dúvida, no Bloco 4 a gente promete isso direto no código".

**💬 E daí?** Em empresa, várias pessoas mexem no mesmo projeto. Cada uma em seu arquivo, sem pisar nos nomes das outras. É assim que um código grande continua organizado.

**✅ Checkpoint:** "Se eu tirar o `export` de `nomeDaLoja`, o que aparece no terminal?"

<details>
<summary>💡 Resposta</summary>

```
SyntaxError: The requested module './src/formatar.js' does not provide an export named 'nomeDaLoja'
```

O arquivo de origem não oferece essa gaveta. A solução é voltar ao `formatar.js` e colocar `export`.

</details>

**O que observar:**
- Alunos esquecendo o `.js` no final do caminho do `import` (erro mais provável do bloco).
- Alunos confundindo `return` com `console.log`: o `console.log` **mostra**; o `return` **devolve**.

**Se atrasar:** corte o `nomeDaLoja` e fique só com `formatarPreco`.

---

### Bloco 2 · Zod, o porteiro dos dados (14 min)

**Objetivo:** escrever o primeiro schema e conferir um dado com `safeParse`.

**O porquê:** o **schema** é um **formulário com regras**: "o nome é texto, o preço é número". O `safeParse` é o porteiro que confere o dado contra essa lista e responde "pode entrar" ou "não pode, e o motivo é este".

**Problema primeiro (2 min):**

```js
const produtoDoApp = { nome: 'Teclado', preco: 'abc' };
console.log(produtoDoApp.preco * 2);
```

```
NaN
```

`NaN` quer dizer "não é um número". O sistema calculou e **não avisou ninguém**. Na loja, isso é um pedido com valor errado.

**Instalando (1 min):** na pasta do projeto, rode:

```bash
npm install zod
```

Aparece uma pasta `node_modules` e o `zod` entra no `package.json`. É a "caixa de ferramentas" de outra pessoa, que você traz para o seu projeto.

**Código (live coding, `bloco2.js`):**

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

**Resultado esperado no terminal:**

```
true
{ nome: 'Teclado', preco: 350 }
false
Invalid input: expected number, received string
true { nome: 'Mouse', preco: 120 }
```

**O que explicar linha a linha:**
- `z.object({ ... })` descreve a **ficha**: cada campo, com seu tipo.
- `safeParse(dado)` devolve **sempre** um objeto com `success` (`true` ou `false`), `data` (o dado, se deu certo) e `error` (o erro, se deu errado). **Eles já sabem tirar campos de objeto**: `const { success, data } = ...` é o destructuring da Aula 2.
- `error.issues` é um **array de objetos**: um objeto por problema. Eles também já sabem ler isso (`issues[0].message`).

**`parse` x `safeParse`:** o `parse` existe, mas **derruba o programa** quando o dado está errado. O `safeParse` devolve o resultado e **deixa você decidir** o que fazer. Hoje usamos o `safeParse`.

| | Se o dado está certo | Se o dado está errado |
|---|---|---|
| `parse` | devolve o dado | **lança um erro** e o programa para (`ZodError`) |
| `safeParse` | `{ success: true, data }` | `{ success: false, error }` e o programa continua |

**🌱 Semente do TypeScript (20 segundos):** o `z.object({ nome: z.string(), preco: z.number() })` **descreve o formato** de um produto. Diga: "existe uma forma de descrever esse mesmo formato no código, sem rodar nada. Fica para o Bloco 4".

**💬 E daí?** Antes, o erro aparecia só lá na frente (um `NaN` na tela do cliente). Agora aparece **na porta**, com uma mensagem que diz o que está errado.

**✅ Checkpoint:** "Quando `success` é `false`, o que vale `data`?"

<details>
<summary>💡 Resposta</summary>

`undefined`. Não existe dado válido para devolver. O que existe é o `error`.

</details>

**O que observar:**
- Alunos tentando ler `resultado.error` quando `success` é `true`: o `error` não existe (ver erros comuns).
- Quem pergunta "e se eu errar o nome do campo?": ótimo, é a pergunta certa. O Zod trata campo faltando como erro.

**Se atrasar:** pule a tabela `parse` x `safeParse` e só cite que o `parse` derruba o programa.

---

### Bloco 3 · Montando a biblioteca (14 min)

**Objetivo:** juntar módulos e Zod numa biblioteca pequena, com regras, mensagens claras e uma porta de entrada.

**O porquê:** uma biblioteca é uma **caixa de ferramentas organizada**: quem usa não precisa saber onde cada ferramenta está guardada. Quem usa só abre a caixa (`index.js`).

**Parte A · Regras e mensagens (6 min).** Crie `src/schemas.js`:

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

Explique **só o que é novo**:
- `.min(2, 'mensagem')`, `.positive('mensagem')`: **regras** com a mensagem que o cliente vai ler. Escreva em português claro.
- `z.email()`: já sabe o formato de um email.
- `z.array(schemaProduto).min(1, ...)`: uma **lista** em que cada item deve seguir o `schemaProduto`.
- `schemaCliente` dentro do `schemaPedido`: um molde **usando** outro molde, igual à ficha dentro da ficha da Aula 2.
- `.default('SEM CUPOM')`: se o campo não vier, vale o padrão (o valor padrão do destructuring, só que no Zod).
- `.omit({ cpf: true })`: cria um molde novo **sem** o `cpf`. Isso é o **rest** da Aula 2 (esconder o CPF), agora no schema.

**Parte B · A biblioteca (8 min).** Crie `src/validar.js`:

```js
import { schemaPedido } from './schemas.js';

export function validarPedido(dado) {
  return schemaPedido.safeParse(dado);
}
```

Aqui o `return` volta: a função **devolve** o resultado do `safeParse`. Agora crie o `index.js`, a **porta de entrada** que reexporta o que a biblioteca oferece:

```js
export { schemaCliente, schemaProduto, schemaPedido, schemaClienteSeguro } from './src/schemas.js';
export { validarPedido } from './src/validar.js';
```

Por fim, o `teste.js` usa a biblioteca **só pela porta de entrada**. Aqui entra o `if`: "se o pedido foi aceito, faça isto; senão, faça aquilo".

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

**Resultado esperado no terminal:**

```
Pedido aceito. Cupom: SEM CUPOM
Pedido recusado: O carrinho precisa ter pelo menos 1 item
{ nome: 'Ana Souza', email: 'ana@email.com', cidade: 'Salvador' }
```

**Quando tem mais de um erro** (`bloco3b.js`, mostre rápido): um pedido com email sem `@` **e** preço negativo gera **dois** itens em `issues`. O `path` diz **onde** está cada erro.

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

**🌱 Semente do TypeScript (20 segundos):** o `omit` do Zod tem um irmão no TypeScript chamado `Omit`. Diga: "vamos reencontrá-lo no Bloco 4".

**💬 E daí?** O CPF é um dado protegido pela LGPD. Com o `omit`, o molde **garante** que ele não sai, mesmo se alguém esquecer de tirar à mão. A biblioteca protege a pessoa que programa e o cliente.

**✅ Checkpoint:** "O `schemaClienteSeguro.parse(...)` não mostrou o `cpf`, e eu não escrevi nenhum rest. Por quê?"

<details>
<summary>💡 Resposta</summary>

O `omit` tira o `cpf` do **molde**, e o Zod devolve só os campos que estão no molde. É a mesma ideia do rest da Aula 2 (separar o que não deve aparecer), feita no schema.

</details>

**O que observar:**
- Alunos que pedem para "mostrar todos os erros": aproveite e mostre `issues.length`. Para mostrar todos, é preciso percorrer a lista, e isso fica para quando aprenderem loops.
- Quem tropeça no `if`: peça para ler em voz alta ("se deu certo... senão...").

**Se atrasar:** mostre o `.omit` só como demonstração de 2 minutos e deixe o `bloco3b.js` para o exercício.

---

### Bloco 4 · Paralelos com tipagem estática: a ponte para o TypeScript (14 min)

**Divisão do tempo:** problema 2 min · revisor `t1.ts` 2 min · função tipada 2 min · diagrama 2 min · tabelas de paralelos e "o que você vai reencontrar" 4 min · checkpoint 2 min = **14 min**. As sementes 🌱 dos blocos 1 a 3 (20 segundos cada) já estão contadas no tempo desses blocos.

**Objetivo:** entender o que é "tipo", por que o JavaScript não avisa quando o tipo muda, como o Zod e o TypeScript se parecem e **reconhecer** a cara de um código TypeScript (para não estranhar quando chegar a hora de escrevê-lo). **Colha as 3 sementes** (🌱) plantadas nos blocos anteriores.

**O porquê:** tipo é a **promessa** sobre o formato do dado ("isto é um número"). A **tipagem estática** é um revisor que lê o seu código **antes** de rodar e avisa "você prometeu número e escreveu texto". O Zod é o porteiro que confere o dado **na hora em que ele chega**.

**Problema primeiro (2 min):** o JavaScript descobre o tipo **quando roda** e deixa o campo mudar de tipo sem avisar.

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

**O revisor (TypeScript), só para ler (2 min).** O TypeScript é o JavaScript com tipos. **Não vamos escrever TS hoje**: o objetivo é só reconhecer o parecido. Este código **não** é para a turma rodar:

```ts
type Produto = { nome: string; preco: number; cupom?: string };

const teclado: Produto = { nome: 'Teclado', preco: 'abc' };
console.log(teclado.preco);
```

O revisor (`tsc`) acusa o erro **sem rodar o programa**:

```
t1.ts(3,45): error TS2322: Type 'string' is not assignable to type 'number'.
```

**A mesma função do Bloco 1, agora com tipos (2 min).** Volte à `formatarPreco`. No TypeScript, o `: number` depois do nome do parâmetro é a promessa "isto é um número", e o `: string` depois dos parênteses diz o que a função **devolve** (o `return` que aprenderam hoje). Responde à dúvida da semente do Bloco 1. Só para ler:

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

**O que você vai reencontrar no TypeScript** (projete e peça para a turma ligar cada linha ao que já viu hoje):

| No TypeScript você vai ver | O que significa | Você já viu hoje |
|---|---|---|
| `preco: number` | "o `preco` é um número" (anotação de tipo) | `z.number()` |
| `type Produto = { ... }` | descrever a ficha | `z.object({ ... })` |
| `: string` depois dos parênteses | tipo do que a função devolve | `return` |
| `Omit<Cliente, 'cpf'>` | a ficha sem o `cpf` | `.omit({ cpf: true })` |
| erro no editor antes de rodar | o revisor avisando | o `success: false` do Zod, só que mais cedo |

> **Curiosidade (opcional):** no Node 22 que usei nos testes, `node t1.ts` **executa** o arquivo e imprime `abc`, porque o Node só **apaga** os tipos e não confere. Quem confere é o `tsc` ou o editor. Isso reforça o ponto do bloco: os tipos **somem** quando o programa roda.

### 🎨 Para desenhar no Excalidraw: quando cada um confere
**Quando:** depois do `tsc`, minuto 8 do bloco  ·  **Tempo de desenho:** até 2 min

**Ordem do desenho:**
1. Linha do tempo com 3 caixas: "escrevo o código" → "rodo o programa" → "dado chega de fora" (⚪)
2. Marcador **TypeScript** sobre "escrevo o código", com "confere os tipos do **código**" (🔵)
3. Marcador **Zod** sobre "dado chega de fora", com "confere os dados de **verdade**" (🟢)
4. Uma ficha `preco: 'abc'` chegando no último ponto, com a frase "só aparece aqui" (🔴)

**Esboço do layout:**
```
 escrevo o código ──────────▶ rodo o programa ──────────▶ dado chega de fora
       │                                                          │
  🔵 TypeScript confere aqui                          🟢 Zod confere aqui
  (os tipos do CÓDIGO)                                (os dados de VERDADE)
                                                      🔴 preco: 'abc' só aparece aqui
```

**Pergunta para a turma antes de revelar:** "O revisor leu o código e achou tudo certo. O formulário mandou `'abc'` mesmo assim. Quem pega?"
**Frase para fechar o desenho:** "TypeScript confere o que eu **escrevi**. Zod confere o que **chegou**."

**Tabela de paralelos (projete e comente linha a linha, 3 min):**

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

**A ponte entre os dois (só se sobrar tempo):** o Zod consegue gerar o tipo do TypeScript a partir do schema, assim a regra é escrita **uma vez** só. Mostre como curiosidade; não precisa rodar:

```ts
import { z } from 'zod';

const schemaProduto = z.object({
  nome: z.string(),
  preco: z.number(),
  cupom: z.string().optional(),
});

type Produto = z.infer<typeof schemaProduto>;

const teclado: Produto = { nome: 'Teclado', preco: 'abc' };
```

**💬 E daí?** Quem entende a diferença entre "conferir o código" e "conferir o dado" sabe por que sistemas sérios usam **os dois**. Quando a turma chegar ao TypeScript, os conceitos já estarão na cabeça.

**✅ Checkpoint:** "O TypeScript já avisa no editor quando o tipo está errado. Então por que eu ainda preciso do Zod?"

<details>
<summary>💡 Resposta</summary>

Porque o dado que chega de fora (formulário, outro sistema) só existe **quando o programa roda**. O TypeScript enxerga o código, mas não enxerga o dado real, e os tipos somem depois que o programa começa a rodar. O Zod confere o dado de verdade.

</details>

**O que observar:**
- Alunos que ligam "tipo" a "o que eu prometo" (bom sinal).
- Quem tenta instalar o TypeScript: elogie a iniciativa (Bias to Action) e peça para guardar para uma aula futura.

**Se atrasar:** corte a ponte `z.infer` e, se ainda faltar, a tabela "o que você vai reencontrar". Não corte a função tipada: é ela que responde à dúvida da primeira semente.

---

## 7. Exercício em dupla (45 min)

O enunciado completo, com os 8 passos e os resultados esperados, está no **README do aluno** (seção "Exercício da aula: o cadastro de produtos da LojaÁgil"). **Projete o README** e deixe os alunos seguirem por ele.

**Estimativa:** 8 passos × cerca de 5 min = **40 min**, mais **5 min** de folga. O desafio extra é só para quem terminar antes.

**Como conduzir:**
1. **Min 60 a 63:** forme as duplas. Defina quem começa como pilota. Reforce: **troca de papel a cada passo**.
2. **Min 63 a 100:** circule. Responda **perguntas com perguntas** (use a coluna do [quadro de erros](#10-erros-comuns)).
3. **Min 100 a 105:** quem terminou faz o desafio extra; as outras duplas chegam ao menos ao passo 5.

**Pontos de atenção por passo:**

| Passo | O que acontece | Atenção |
|---|---|---|
| 1 | Cria o projeto e instala o Zod | É o passo que mais trava (internet, `type`). Resolva rápido para ninguém ficar para trás |
| 2 | `schemas.js` | Mensagens **idênticas** às do enunciado, senão o resultado esperado não bate |
| 3 | `validar.js` e `index.js` | O `index.js` só reexporta; não precisa de código novo |
| 4 e 5 | Testa o dado certo e o errado | `error.issues.length` vale `2` (nome e preço) |
| 6 | Adiciona `desconto` e `cor` | A **saída do passo 4 muda** (aparece `desconto: 0`). Avise: é o `default` funcionando |
| 7 | Lote com array | Lembrar de **acrescentar** `schemaLote` e `validarLote` ao `index.js` |
| 8 | `omit({ custo: true })` | Conectar com o rest da Aula 2 e a LGPD |
| Extra | Preço como texto `'90'` | Gancho para `z.coerce` e para a Discordância Positiva |

**Gabarito:** `GABARITO.md`, seção "Exercício da aula". Libere só no fechamento.

---

## 8. Fechamento (15 min)

| Min | Atividade | O que fazer |
|---|---|---|
| 105 a 110 | **Correção ao vivo** | Uma dupla compartilha a tela e roda `node teste.js`. A turma compara com o resultado esperado do passo 8 |
| 110 a 115 | **Retrospectiva** | Cada dupla diz: "onde travamos, o que tentamos, o que funcionou". Anote no quadro os erros que mais apareceram |
| 115 a 118 | **Conexão** | Volte ao desenho do porteiro. Pergunte: "Onde, num app que vocês usam, existe um porteiro assim?" (cadastro, pagamento, login). Retome o gancho da Aula 2 (somar qualquer quantidade de itens): "Continua guardado, ainda não temos a ferramenta". Abra também o gancho do **TypeScript**: "hoje vocês só **leram** tipos. Na etapa do TypeScript vão **escrever** os tipos que o Zod descreveu" |
| 118 a 120 | **Próximo passo** | Libere o `GABARITO.md` e peça os 4 exercícios de casa. Combine um passo físico: "antes de dormir, rodem o exercício 1" |

---

## 9. Resumo dos diagramas

| # | Diagrama | Bloco | Minuto | O que mostra |
|---|---|---|---|---|
| 1 | O porteiro dos dados | Abertura | 2 a 4 | O dado de fora passa por um schema antes de entrar no sistema |
| 2 | Arquivos como gavetas | Bloco 1 (min 5 a 18) | passo 4 | `export` abre a gaveta, `import` busca; sem `export`, a gaveta fica trancada |
| 3 | Quando cada um confere | Bloco 4 (min 46 a 60) | minuto 8 do bloco | TypeScript confere o código; Zod confere o dado de verdade |

Cores seguem o vocabulário padrão: 🔵 original · 🟢 certo/novo · 🔴 problema · 🟡 atenção · ⚪ contexto.

---

## 10. Erros comuns

As mensagens abaixo foram reproduzidas no Node 22, exceto a que está marcada como **não reproduzida aqui**.

| Mensagem | O que significa | Pergunta para o professor fazer (sem dar a resposta) |
|---|---|---|
| `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../src/formatar' imported from .../app.js` (e a dica `Did you mean to import "./src/formatar.js"?`) | O caminho do `import` está sem o `.js` | "O Node te deu uma dica no final da mensagem. O que ela está sugerindo?" |
| `SyntaxError: The requested module './src/formatar.js' does not provide an export named 'x'` | O nome importado não existe no arquivo de origem (esqueceu o `export` ou errou a letra) | "Esse nome está escrito do mesmo jeito lá no arquivo de origem? E está com `export`?" |
| `ReferenceError: require is not defined in ES module scope, you can use import instead` | Usou `require` num projeto que usa `import` | "A mensagem termina com uma sugestão. Qual?" |
| `Warning: MODULE_TYPELESS_PACKAGE_JSON` (o programa até roda) | Faltou `"type": "module"` no `package.json` | "Abra o `package.json`. O que a mensagem pede para você adicionar?" |
| `SyntaxError: Cannot use import statement outside a module` (aparece em versões mais antigas do Node; **não reproduzida aqui**) | Mesmo problema do aviso acima, em Node antigo | "Esse projeto avisou ao Node que usa módulos? Onde se avisa?" |
| `Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'zod' imported from .../a.js` | O Zod não foi instalado nessa pasta | "Em qual pasta você rodou o `npm install zod`? É a mesma pasta do arquivo?" |
| `TypeError: Cannot read properties of undefined (reading 'issues')` | Tentou ler `resultado.error` quando o dado estava certo (`error` não existe) | "Nesse teste, `success` é `true` ou `false`? O que existe dentro do resultado nesse caso?" |
| `ZodError: [` (programa para) | Usou `parse` com dado inválido, que derruba o programa | "Qual dos dois métodos devolve o resultado em vez de parar o programa?" |
| `undefined` ao ler `resultado.succes` | Erro de digitação no nome do campo | "Compare letra por letra com o que o Zod devolve." |
| `SyntaxError: Identifier 'nome' has already been declared` | A mesma variável foi criada duas vezes no arquivo | "Quantas vezes você usou `const nome` neste arquivo?" |

---

## 11. Critérios de observação (High Agency)

Não são notas. São comportamentos que o professor pode anotar durante a aula para dar feedback depois.

| Pilar | Como parece na prática |
|---|---|
| **Bias to Action** | A dupla roda o código **a cada passo**, em vez de escrever tudo e testar no fim. Quando dá erro, lê a mensagem e tenta uma correção **antes** de chamar |
| **Clear Thinking** | Antes de escrever uma regra, a dupla diz **quem** vai ler a mensagem de erro e o que essa pessoa precisa entender. A mensagem de erro é **para um cliente**, não para outro programador |
| **Discordância Positiva** | A navegadora propõe **outra forma** (ou uma regra a mais) e defende com **argumento**. Exemplo do exercício: "devemos aceitar o preço `'90'` como texto?" |

**Armadilhas para observar:** *Overwhelm Trap* (alunos que tentam fazer os 8 passos de uma vez; lembre "um passo, roda, confere") e *Rumination Trap* (alunos travados em "e se der erro?"; lembre que o erro é uma pista).
