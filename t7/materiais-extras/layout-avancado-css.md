# Layout Avançado e Padrões Estruturais em CSS

> **Objetivo:** Dominar margens, espaçamentos, centralização, sections reutilizáveis, decisões entre Flexbox/Grid e pseudo-classes avançadas.

---

## Sumário

1. [Margins e Paddings Avançados](#1-margins-e-paddings-avançados)
2. [Centralizando Elementos](#2-centralizando-elementos)
3. [Construindo Sections Reutilizáveis](#3-construindo-sections-reutilizáveis)
4. [Inline-block vs Flexbox vs Grid](#4-inline-block-vs-flexbox-vs-grid)
5. [Pseudo-classes Avançadas](#5-pseudo-classes-avançadas)
6. [Live Coding — Dashboard de Métricas](#6-live-coding--dashboard-de-métricas)
7. [Desafio Final](#7-desafio-final)

---

## 1. Margins e Paddings Avançados

### 1.1 Box Model e `box-sizing`

Por padrão (`content-box`), `width` define apenas a largura do conteúdo. Padding e border são **somados por fora**, o que pode quebrar layouts.

Com `box-sizing: border-box`, padding e border são **absorvidos para dentro** da largura definida — muito mais previsível.

```css
/* Reset global recomendado */
*, *::before, *::after {
  box-sizing: border-box;
}
```

| Propriedade | Efeito |
|---|---|
| `margin` | Espaço externo ao elemento (empurra outros) |
| `padding` | Espaço interno (entre borda e conteúdo) |

---

### 1.2 Margin Collapse

**Quando dois elementos block adjacentes se tocam verticalmente, suas margens não se somam — a maior vence.** Isso é o colapso de margem.

```html
<!-- As margens de 30px e 20px NÃO somam 50px — resultam em 30px -->
<div style="margin-bottom: 30px">Bloco A</div>
<div style="margin-top: 20px">Bloco B</div>
```

Também acontece entre **pai e primeiro/último filho** quando não há padding ou border separando-os.

**Como evitar o colapso:**

```css
/* Opção 1: Adicionar padding no pai */
.pai { padding-top: 1px; }

/* Opção 2: Adicionar border no pai */
.pai { border-top: 1px solid transparent; }

/* Opção 3: overflow no pai */
.pai { overflow: auto; }

/* Opção 4 (moderna e semântica): flow-root */
.pai { display: flow-root; }
```

---

### 1.3 Margens Automáticas

`margin: 0 auto` centraliza horizontalmente um elemento block **com largura definida**.

```css
.container {
  width: 800px;
  margin: 0 auto; /* centraliza na tela */
}
```

Dentro de um Flexbox, `margin-left: auto` empurra um elemento para o canto oposto — técnica poderosa para alinhar botões ou ícones:

```css
.navbar {
  display: flex;
  align-items: center;
}

.navbar__logo { /* fica à esquerda */ }

.navbar__cta {
  margin-left: auto; /* empurra para a direita */
}
```

---

### 1.4 Padding como Ferramenta Estrutural

Padding cria "respiro" interno consistente e **nunca colapsa**, ao contrário da margin. Use-o para criar espaçamento dentro de cards, sections e containers.

```css
.section {
  padding: 80px 24px; /* espaço vertical e proteção lateral */
}
```

Para responsividade, use `clamp()`:

```css
.section {
  padding: clamp(40px, 8vw, 100px) 24px;
}
```

---

### Exercício 1 — Margin Collapse

**Enunciado:** Crie dois blocos `div` empilhados verticalmente. O primeiro com `margin-bottom: 40px` e o segundo com `margin-top: 30px`. Observe o espaço entre eles. Em seguida, resolva o colapso de **duas formas diferentes**.

```html
<!-- HTML base -->
<div class="pai">
  <div class="bloco bloco-a">Bloco A</div>
  <div class="bloco bloco-b">Bloco B</div>
</div>
```

#### ✅ Gabarito

```css
/* Estilos base para observar o colapso */
.bloco {
  background: #e0e0e0;
  padding: 20px;
  text-align: center;
}

.bloco-a {
  margin-bottom: 40px; /* a maior margem vence: espaço = 40px, não 70px */
}

.bloco-b {
  margin-top: 30px;
}

/* ---- SOLUÇÃO 1: padding no pai ---- */
/*
  Adicionar padding-top e padding-bottom no .pai cria uma
  "barreira" que impede o colapso entre pai e filhos.
  Também podemos usar apenas overflow: auto para resolver
  o colapso entre elementos adjacentes.
*/
.pai {
  overflow: auto;
  /* Isso cria um novo Block Formatting Context (BFC),
     que impede que margens internas "vazem" para fora
     ou colapcem entre si. */
}

/* ---- SOLUÇÃO 2: display: flow-root ---- */
/*
  flow-root é a forma semântica moderna de criar um BFC
  sem efeitos colaterais como overflow: auto pode ter
  em alguns casos (ex: clipping de sombras).
*/
.pai {
  display: flow-root;
}
```

**Por que funciona?**
Ambas as soluções criam um **Block Formatting Context** (BFC). Dentro de um BFC, as margens dos filhos ficam contidas — elas não colapsam com elementos de fora do contexto.

---

### Exercício 2 — Botão com `margin-left: auto`

**Enunciado:** Crie uma navbar com logo à esquerda e um botão "Entrar" à direita, usando apenas `margin-left: auto`.

#### ✅ Gabarito

```html
<nav class="navbar">
  <span class="navbar__logo">MeuSite</span>
  <a class="navbar__cta" href="#">Entrar</a>
</nav>
```

```css
.navbar {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: #1a1a2e;
}

.navbar__logo {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  /* Fica à esquerda naturalmente (primeiro filho flex) */
}

.navbar__cta {
  margin-left: auto;
  /* margin-left: auto "consome" todo o espaço disponível
     à esquerda do elemento, empurrando-o para a extremidade
     direita do container flex. Nenhum justify-content necessário! */
  padding: 8px 20px;
  background: #e94560;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
```

**Dica:** Esse padrão é preferível a `justify-content: space-between` quando você quer controlar apenas **um** elemento, sem afetar os demais.

---

## 2. Centralizando Elementos

### 2.1 Centralização Horizontal Clássica

```css
.caixa {
  width: 600px;      /* largura obrigatória */
  margin: 0 auto;   /* margem automática divide o espaço restante igualmente */
}
```

⚠️ Não funciona em elementos `inline` ou quando não há largura definida.

---

### 2.2 Centralização com Flexbox

```css
.container {
  display: flex;
  justify-content: center; /* eixo principal (horizontal por padrão) */
  align-items: center;     /* eixo cruzado (vertical) */
  height: 100vh;           /* precisa de altura para centralizar verticalmente */
}
```

---

### 2.3 Centralização com Grid

```css
.container {
  display: grid;
  place-items: center; /* atalho para align-items + justify-items */
  height: 100vh;
}
```

`place-items: center` é a forma mais concisa de centralizar vertical e horizontalmente. Ideal para centralizar um único elemento.

---

### 2.4 Centralização Absoluta (Técnica Avançada)

```css
.pai {
  position: relative;
}

.filho {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*
    top/left: 50% posiciona o canto superior-esquerdo no centro.
    transform: translate(-50%, -50%) recua o elemento pela metade
    de sua própria largura e altura, centralizando-o de fato.
  */
}
```

**Quando evitar:** quando o elemento precisa participar do fluxo normal do documento, pois `position: absolute` o remove do fluxo.

---

### Exercício 3 — Card Centralizado

**Enunciado:** Crie um card de 320px × 200px centralizado **vertical e horizontalmente** na tela usando Flexbox.

#### ✅ Gabarito

```html
<div class="tela">
  <div class="card">
    <h2>Título</h2>
    <p>Conteúdo do card</p>
  </div>
</div>
```

```css
/* Reset básico */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.tela {
  display: flex;
  justify-content: center; /* centraliza no eixo horizontal */
  align-items: center;     /* centraliza no eixo vertical */
  min-height: 100vh;       /* ocupa a tela inteira */
  background: #f0f4f8;
}

.card {
  width: 320px;
  height: 200px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  /* O card em si também usa flex para organizar seu conteúdo interno */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}
```

**Por que `min-height` e não `height`?**
`min-height: 100vh` garante que o container ocupe no mínimo a tela inteira, mas ainda cresce se o conteúdo for maior — evitando overflow.

---

## 3. Construindo Sections Reutilizáveis

### 3.1 Estrutura Padrão de Section

Uma section bem estruturada segue uma hierarquia clara e usa nomenclatura BEM para facilitar manutenção:

```html
<section class="section section--light">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title">Título da Section</h2>
      <p class="section__subtitle">Subtítulo opcional</p>
    </div>
    <div class="section__content">
      <!-- conteúdo específico da section -->
    </div>
  </div>
</section>
```

---

### 3.2 Container Pattern

O container é o **coração do layout responsivo**. Ele centraliza o conteúdo e protege de encostar nas bordas da tela:

```css
.container {
  max-width: 1200px;  /* largura máxima do conteúdo */
  margin: 0 auto;     /* centraliza horizontalmente */
  padding: 0 24px;    /* proteção lateral em telas pequenas */
}
```

**Por que todo layout precisa de um container?**
Sem ele, o conteúdo se estende até as bordas da tela em monitores grandes, prejudicando a legibilidade. O container define a "coluna editorial" do layout.

---

### 3.3 Sections com Variações (Modificadores BEM)

```css
/* Base da section — compartilhado por todas */
.section {
  padding: 80px 0;
}

/* Modificadores de aparência */
.section--light {
  background: #ffffff;
  color: #1a1a1a;
}

.section--dark {
  background: #1a1a2e;
  color: #ffffff;
}

.section--accent {
  background: #e94560;
  color: #ffffff;
}

/* Componentes internos */
.section__header {
  text-align: center;
  margin-bottom: 48px;
}

.section__title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 12px;
}
```

---

### Exercício 4 — 3 Sections Reutilizáveis

**Enunciado:** Crie 3 sections usando a mesma base CSS. Diferencie-as apenas com classes modificadoras (`.section--light`, `.section--dark`, `.section--accent`). Cada uma deve ter título e um parágrafo de conteúdo.

#### ✅ Gabarito

```html
<!-- Section 1 -->
<section class="section section--light">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title">Sobre Nós</h2>
      <p class="section__subtitle">Conheça nossa história</p>
    </div>
    <div class="section__content">
      <p>Somos uma empresa focada em soluções digitais inovadoras.</p>
    </div>
  </div>
</section>

<!-- Section 2 -->
<section class="section section--dark">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title">Serviços</h2>
      <p class="section__subtitle">O que oferecemos</p>
    </div>
    <div class="section__content">
      <p>Design, desenvolvimento e consultoria em tecnologia.</p>
    </div>
  </div>
</section>

<!-- Section 3 -->
<section class="section section--accent">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title">Contato</h2>
      <p class="section__subtitle">Fale conosco</p>
    </div>
    <div class="section__content">
      <p>Estamos prontos para ajudar no seu próximo projeto.</p>
    </div>
  </div>
</section>
```

```css
/* Reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* Container — reutilizado em todas as sections */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Base da section */
.section {
  padding: 80px 0;
  /*
    Note que o padding está na .section, não no .container.
    Isso permite que backgrounds coloridos preencham a tela toda,
    enquanto o conteúdo fica contido pelo .container.
  */
}

/* Modificadores */
.section--light  { background: #f8f9fa; color: #212529; }
.section--dark   { background: #1a1a2e; color: #f8f9fa; }
.section--accent { background: #e94560; color: #ffffff; }

/* Componentes internos — iguais em todas as sections */
.section__header {
  text-align: center;
  margin-bottom: 40px;
}

.section__title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
  margin-bottom: 10px;
}

.section__subtitle {
  opacity: 0.75;
  font-size: 1rem;
}

.section__content {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.7;
}
```

**Ponto-chave:** O padding vertical fica na `.section`, enquanto o padding horizontal fica no `.container`. Isso garante que as cores de fundo se estendam de ponta a ponta, mas o texto nunca encoste nas bordas.

---

## 4. Inline-block vs Flexbox vs Grid

### 4.1 Inline-block

`display: inline-block` permite que elementos fiquem lado a lado como `inline`, mas aceitem `width` e `height` como `block`.

**Problema clássico:** o HTML cria espaços em branco entre elementos `inline-block`, gerando gaps indesejados.

```css
/* Solução antiga: font-size zero no pai */
.lista {
  font-size: 0;
}
.lista__item {
  display: inline-block;
  font-size: 1rem; /* restaura no filho */
}
```

Hoje, inline-block é considerado **legado** para layouts. Use Flexbox ou Grid.

---

### 4.2 Flexbox — Layout Unidimensional

Controla elementos em **uma direção** (linha ou coluna).

```css
.flex-container {
  display: flex;
  flex-direction: row;       /* padrão: linha */
  justify-content: space-between; /* distribuição no eixo principal */
  align-items: center;       /* alinhamento no eixo cruzado */
  gap: 16px;                 /* espaço entre itens (moderno, sem hacks) */
  flex-wrap: wrap;           /* quebra para próxima linha se necessário */
}

.flex-item {
  flex: 1;  /* cresce/encolhe proporcionalmente para ocupar espaço */
}
```

**Use para:** navbars, listas horizontais, grupos de botões, componentes lineares.

---

### 4.3 Grid — Layout Bidimensional

Controla elementos em **linhas e colunas simultaneamente**.

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas iguais */
  gap: 24px;
}

/* Grid responsivo sem media queries */
.grid-responsivo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  /*
    auto-fit: cria quantas colunas couberem
    minmax(280px, 1fr): cada coluna tem no mínimo 280px
    e ocupa o espaço disponível igualmente
  */
  gap: 24px;
}
```

**Use para:** cards, galerias, layouts de página, seções com múltiplas colunas.

---

### 4.4 Comparação Estratégica

| Tecnologia | Dimensão | Melhor uso | Evitar quando |
|---|---|---|---|
| **Inline-block** | 1D | Legado / casos isolados | Layout moderno |
| **Flexbox** | 1D | Componentes lineares, alinhamento | Layout 2D complexo |
| **Grid** | 2D | Layouts de página, cards | Alinhamento simples de 1 eixo |

> 💡 **Regra prática:** Se você está alinhando itens em **uma linha ou coluna** → Flexbox. Se está controlando **linhas E colunas** ao mesmo tempo → Grid. Os dois se complementam e frequentemente coexistem no mesmo projeto.

---

### Exercício 5 — 3 Colunas com Inline-block e o Problema do Espaço

**Enunciado:** Crie 3 colunas de largura igual com `inline-block`. Observe o espaço entre elas e resolva o problema.

#### ✅ Gabarito

```html
<div class="colunas">
  <div class="coluna">Coluna 1</div>
  <div class="coluna">Coluna 2</div>
  <div class="coluna">Coluna 3</div>
</div>
```

```css
/* Problema: as 3 colunas de 33.33% deveriam ocupar 100%,
   mas o espaço em branco do HTML cria um gap extra. */
.colunas {
  /* Solução: zerar o font-size no pai elimina o espaço
     em branco que o HTML gera entre tags inline */
  font-size: 0;
}

.coluna {
  display: inline-block;
  width: 33.33%;
  font-size: 1rem;   /* restaura o tamanho de fonte nos filhos */
  padding: 20px;
  background: #e0e0e0;
  border: 1px solid #ccc;
  vertical-align: top; /* alinha pelo topo, evita desalinhamento vertical */
}
```

**Por que esse problema existe?**
O navegador interpreta o espaço em branco (quebras de linha, espaços) entre tags `inline` e `inline-block` como um caractere de espaço (`~4px`). Isso "quebra" a matemática do layout.

**Hoje em dia**, use Flexbox:
```css
.colunas {
  display: flex;
  gap: 0; /* sem gambiarra! */
}
.coluna { flex: 1; }
```

---

## 5. Pseudo-classes Avançadas

### 5.1 Estados Interativos

```css
.botao:hover  { background: #c73652; }  /* mouse sobre o elemento */
.botao:active { transform: scale(0.97); } /* durante o clique */

/* :focus — elemento recebe foco (teclado ou mouse) */
.input:focus {
  outline: 2px solid #e94560;
  outline-offset: 2px;
}

/* :focus-visible — foco apenas via teclado (acessibilidade!) */
.botao:focus-visible {
  outline: 3px solid #e94560;
}

/* Remove outline para mouse, mantém para teclado */
.botao:focus:not(:focus-visible) {
  outline: none;
}
```

**Por que `:focus-visible` importa?**
Usuários de mouse geralmente não precisam do outline de foco (já sabem onde clicaram), mas usuários de teclado dependem dele para navegar. `:focus-visible` aplica o estilo apenas quando necessário.

---

### 5.2 Seletores Estruturais

```css
li:first-child  { font-weight: bold; }        /* primeiro filho */
li:last-child   { border-bottom: none; }      /* último filho */
li:nth-child(2) { color: red; }               /* filho específico */
li:nth-child(even)  { background: #f5f5f5; }  /* filhos pares */
li:nth-child(odd)   { background: #ffffff; }  /* filhos ímpares */
li:nth-child(3n)    { color: blue; }          /* a cada 3 filhos */

/* :nth-of-type() — conta apenas elementos do mesmo tipo */
p:nth-of-type(2) { font-size: 1.2rem; }
```

---

### 5.3 Pseudo-classes Relacionais Modernas

```css
/* :not() — seleciona tudo exceto */
.lista__item:not(:last-child) {
  border-bottom: 1px solid #eee;
  /* Adiciona borda em todos exceto no último — evita borda dupla! */
}

/* :is() — agrupa seletores (reduz repetição) */
:is(h1, h2, h3) { line-height: 1.2; }
/* Equivale a: h1, h2, h3 { line-height: 1.2; } */

/* :where() — igual ao :is(), mas com especificidade ZERO */
:where(h1, h2, h3) { line-height: 1.2; }
/* Útil em resets: fácil de sobrescrever em qualquer lugar */

/* :has() — "parent selector" (seleciona o pai com base no filho) */
.card:has(img) {
  padding-top: 0; /* card que contém imagem tem tratamento diferente */
}
```

---

### 5.4 Estados de Validação

```css
input:required { border-left: 3px solid orange; }
input:valid    { border-color: #28a745; }
input:invalid  { border-color: #dc3545; }
input:disabled { opacity: 0.5; cursor: not-allowed; }

/* Evita marcar como inválido antes do usuário interagir */
input:not(:placeholder-shown):invalid {
  border-color: #dc3545;
  /* só aplica o estilo de inválido se o campo não estiver
     com placeholder visível, ou seja, depois de o usuário digitar */
}
```

---

### Exercício 6 — Grid de Cards com nth-child

**Enunciado:** Crie um grid de 6 cards. Aplique um estilo diferente (background distinto) nos cards de posição **par**.

#### ✅ Gabarito

```html
<div class="grid-cards">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
</div>
```

```css
.grid-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 24px;
}

.card {
  padding: 32px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;

  /* Estilo padrão para todos os cards (ímpares) */
  background: #f8f9fa;
  color: #1a1a2e;
  border: 2px solid #dee2e6;
}

.card:nth-child(even) {
  /*
    :nth-child(even) é equivalente a :nth-child(2n)
    Seleciona: 2º, 4º, 6º, 8º... itens
  */
  background: #1a1a2e;
  color: #f8f9fa;
  border-color: #1a1a2e;
}
```

**Variações úteis de nth-child:**
```css
.card:nth-child(3n+1) { /* 1º, 4º, 7º... */ background: #ffd43b; }
.card:nth-child(3n+2) { /* 2º, 5º, 8º... */ background: #74c0fc; }
.card:nth-child(3n)   { /* 3º, 6º, 9º... */ background: #69db7c; }
/* Cria um padrão de 3 cores que se repete */
```

---

### Exercício 7 — Formulário com Feedback Visual Automático

**Enunciado:** Crie um formulário com um campo de email (obrigatório) e um campo de nome. Use apenas CSS para exibir feedback visual de válido/inválido.

#### ✅ Gabarito

```html
<form class="formulario">
  <div class="campo">
    <label for="nome">Nome</label>
    <input type="text" id="nome" placeholder="Seu nome" required minlength="3">
    <span class="campo__msg campo__msg--erro">Mínimo de 3 caracteres</span>
    <span class="campo__msg campo__msg--ok">Perfeito!</span>
  </div>

  <div class="campo">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="seu@email.com" required>
    <span class="campo__msg campo__msg--erro">Email inválido</span>
    <span class="campo__msg campo__msg--ok">Email válido!</span>
  </div>

  <button type="submit">Enviar</button>
</form>
```

```css
/* Reset e base */
*, *::before, *::after { box-sizing: border-box; }

.formulario {
  max-width: 400px;
  margin: 40px auto;
  padding: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: 600;
  font-size: .9rem;
  color: #495057;
}

input {
  padding: 10px 14px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color .2s, box-shadow .2s;
  outline: none;
}

/* Mensagens ficam escondidas por padrão */
.campo__msg {
  font-size: .8rem;
  display: none; /* escondida por padrão */
}

.campo__msg--erro { color: #dc3545; }
.campo__msg--ok   { color: #28a745; }

/* ---- Lógica de validação visual via CSS ---- */

/* Exibe borda verde e mensagem de sucesso quando válido
   e o usuário já interagiu (placeholder não visível) */
input:not(:placeholder-shown):valid {
  border-color: #28a745;
  box-shadow: 0 0 0 3px rgba(40, 167, 69, .15);
}

input:not(:placeholder-shown):valid
~ .campo__msg--ok {
  display: block;
  /*
    ~ é o seletor de irmão geral: seleciona .campo__msg--ok
    que vem depois do input no mesmo pai.
    A condição: placeholder não visível (usuário já digitou) E válido.
  */
}

/* Exibe borda vermelha e mensagem de erro quando inválido */
input:not(:placeholder-shown):invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, .15);
}

input:not(:placeholder-shown):invalid
~ .campo__msg--erro {
  display: block;
}

/* Estilo de foco — acessível e bonito */
input:focus-visible {
  outline: 3px solid #4263eb;
  outline-offset: 2px;
  border-color: #4263eb;
}

button {
  padding: 12px;
  background: #4263eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s;
}

button:hover { background: #3451cc; }
button:active { transform: scale(0.98); }
```

**Conceitos-chave:**
- `:not(:placeholder-shown)` detecta que o usuário já preencheu o campo (placeholder sumiu)
- Combinado com `:valid` ou `:invalid`, cria feedback apenas após a interação
- O seletor `~` (irmão geral) permite que o estado do `input` controle a visibilidade dos `span` seguintes — **sem JavaScript**

---

## 6. Live Coding — Dashboard de Métricas

> 🎬 **Atividade em conjunto:** vamos construir um dashboard básico e interativo passo a passo, aplicando Grid e pseudo-classes na prática.

### O Desafio

1. Criar um container com **4 cards de métricas**
2. **Grid:** definir uma estrutura de duas colunas e duas linhas que se ajustam igualmente usando a unidade `fr`
3. **Interatividade:** aplicar `:hover` para destacar o card e `:active` para simular o clique

---

### Passo 1 — Estrutura HTML

Começamos pelo HTML semântico. Cada card tem um ícone, um rótulo e o valor da métrica:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <main class="dashboard">

    <div class="card">
      <span class="card__icone">👥</span>
      <span class="card__rotulo">Usuários</span>
      <span class="card__valor">12.340</span>
    </div>

    <div class="card">
      <span class="card__icone">💰</span>
      <span class="card__rotulo">Receita</span>
      <span class="card__valor">R$ 98.500</span>
    </div>

    <div class="card">
      <span class="card__icone">📦</span>
      <span class="card__rotulo">Pedidos</span>
      <span class="card__valor">3.210</span>
    </div>

    <div class="card">
      <span class="card__icone">⭐</span>
      <span class="card__rotulo">Avaliação</span>
      <span class="card__valor">4,8 / 5</span>
    </div>

  </main>

</body>
</html>
```

---

### Passo 2 — Reset e Base

```css
/* style.css */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  display: grid;
  place-items: center;         /* centraliza o dashboard na tela */
  background: #f0f2f5;
  font-family: system-ui, sans-serif;
}
```

> 💡 **Discussão ao vivo:** por que `display: grid` + `place-items: center` no `body` é a forma mais limpa de centralizar um bloco na tela inteira?

---

### Passo 3 — Grid do Dashboard

```css
.dashboard {
  display: grid;

  /* 2 colunas que crescem e encolhem igualmente */
  grid-template-columns: 1fr 1fr;

  /* 2 linhas com altura mínima definida */
  grid-template-rows: 1fr 1fr;

  gap: 20px;
  padding: 32px;
  width: min(600px, 90vw);     /* responsivo sem media query */
}
```

> 💡 **Discussão ao vivo:** o que `1fr` significa na prática? Por que é melhor que `50%` aqui?

---

### Passo 4 — Estilo Base do Card

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 28px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  /* Flexbox interno para organizar ícone + rótulo + valor */
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Prepara a transição para o hover */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  cursor: pointer;
}

.card__icone {
  font-size: 2rem;
}

.card__rotulo {
  font-size: 0.85rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card__valor {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a2e;
}
```

---

### Passo 5 — Interatividade com Pseudo-classes

```css
/* :hover — destaca o card ao passar o mouse */
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
}

/* :active — feedback visual ao clicar */
.card:active {
  transform: translateY(-2px);       /* recua levemente, simula pressão */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #f8f9fa;
}
```

> 💡 **Discussão ao vivo:** por que o `:active` usa um `translateY` menor que o `:hover`? O que esse comportamento comunica ao usuário?

---

### Passo 6 — Toque Final: Diferenciando o Primeiro Card

```css
/* :first-child — destaque visual no card principal */
.card:first-child {
  border-top: 4px solid #4263eb;
}

/* :last-child — sutil diferenciação no card final */
.card:last-child {
  border-top: 4px solid #e94560;
}
```

---

### Resultado Final — Código Completo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #f0f2f5;
      font-family: system-ui, sans-serif;
    }

    .dashboard {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 20px;
      padding: 32px;
      width: min(600px, 90vw);
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 28px 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }

    .card__icone  { font-size: 2rem; }

    .card__rotulo {
      font-size: 0.85rem;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .card__valor {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1a1a2e;
    }

    /* Pseudo-classes */
    .card:hover  { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(0,0,0,.14); }
    .card:active { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.10); background: #f8f9fa; }

    .card:first-child { border-top: 4px solid #4263eb; }
    .card:last-child  { border-top: 4px solid #e94560; }
  </style>
</head>
<body>
  <main class="dashboard">
    <div class="card">
      <span class="card__icone">👥</span>
      <span class="card__rotulo">Usuários</span>
      <span class="card__valor">12.340</span>
    </div>
    <div class="card">
      <span class="card__icone">💰</span>
      <span class="card__rotulo">Receita</span>
      <span class="card__valor">R$ 98.500</span>
    </div>
    <div class="card">
      <span class="card__icone">📦</span>
      <span class="card__rotulo">Pedidos</span>
      <span class="card__valor">3.210</span>
    </div>
    <div class="card">
      <span class="card__icone">⭐</span>
      <span class="card__rotulo">Avaliação</span>
      <span class="card__valor">4,8 / 5</span>
    </div>
  </main>
</body>
</html>
```

### Conceitos Aplicados Neste Live Coding

| Conceito | Onde foi usado |
|---|---|
| `display: grid` + `place-items: center` | Centralização do dashboard na tela |
| `grid-template-columns: 1fr 1fr` | 2 colunas iguais sem cálculo manual |
| `display: flex` + `flex-direction: column` | Organização interna de cada card |
| `:hover` | Elevação do card ao passar o mouse |
| `:active` | Feedback tátil ao clicar |
| `:first-child` / `:last-child` | Diferenciação visual sem classes extras |
| `transition` | Suaviza as mudanças de estado |

---

## 7. Desafio Final

### Construa uma landing page com:

- [ ] **3 sections reutilizáveis** com modificadores de cores diferentes
- [ ] **Layout principal com Grid** (ex: grid de cards de serviços)
- [ ] **Componentes internos com Flexbox** (ex: navbar, botões agrupados)
- [ ] **Espaçamento consistente** usando variáveis CSS (`--spacing-md`, `--spacing-lg`, etc.)
- [ ] **Pelo menos 4 pseudo-classes** aplicadas com propósito claro
- [ ] **Centralização correta** de pelo menos 2 elementos (técnicas distintas)

### Sugestão de Estrutura

```
Header (Flexbox: logo + nav + cta)
  └─ Centralização: logo + nav com margin-left: auto no CTA

Hero Section (Grid ou Flexbox: texto + imagem lado a lado)
  └─ Centralização: place-items: center no container

Serviços Section (Grid: 3 cards responsivos com auto-fit)

Depoimentos Section (Flexbox: cards horizontais com wrap)

Footer (Flexbox: colunas de links)
```

#### ✅ Gabarito — Estrutura Base

```css
/* ============================
   DESIGN TOKENS (Variáveis CSS)
   ============================ */
:root {
  /* Cores */
  --cor-primaria: #4263eb;
  --cor-escura: #1a1a2e;
  --cor-destaque: #e94560;
  --cor-fundo: #f8f9fa;

  /* Espaçamentos consistentes */
  --espacamento-xs: 8px;
  --espacamento-sm: 16px;
  --espacamento-md: 24px;
  --espacamento-lg: 48px;
  --espacamento-xl: 80px;

  /* Tipografia */
  --fonte-base: 1rem;
  --fonte-grande: clamp(1.8rem, 4vw, 3rem);
}

/* ============================
   RESET E BASE
   ============================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, sans-serif;
  color: var(--cor-escura);
  line-height: 1.6;
}

/* ============================
   CONTAINER
   ============================ */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--espacamento-md);
}

/* ============================
   SECTIONS (reutilizáveis)
   ============================ */
.section { padding: var(--espacamento-xl) 0; }
.section--light   { background: var(--cor-fundo); }
.section--dark    { background: var(--cor-escura); color: white; }
.section--destaque { background: var(--cor-destaque); color: white; }

.section__header  { text-align: center; margin-bottom: var(--espacamento-lg); }
.section__title   { font-size: var(--fonte-grande); margin-bottom: var(--espacamento-xs); }

/* ============================
   NAVBAR (Flexbox)
   ============================ */
.navbar {
  display: flex;
  align-items: center;
  padding: var(--espacamento-sm) var(--espacamento-md);
  background: var(--cor-escura);
  color: white;
}

.navbar__logo { font-weight: 800; font-size: 1.3rem; }
.navbar__nav  { display: flex; gap: var(--espacamento-md); margin: 0 auto; }
.navbar__nav a { color: rgba(255,255,255,.8); text-decoration: none; }
.navbar__nav a:hover { color: white; }          /* :hover */
.navbar__nav a:focus-visible {                   /* :focus-visible */
  outline: 2px solid var(--cor-destaque);
  border-radius: 2px;
}

.navbar__cta {
  margin-left: auto; /* empurra para direita */
  padding: 8px 20px;
  background: var(--cor-destaque);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.navbar__cta:hover  { opacity: .9; }            /* :hover */
.navbar__cta:active { transform: scale(0.97); } /* :active */

/* ============================
   HERO (Grid: centralização)
   ============================ */
.hero {
  display: grid;
  place-items: center; /* centraliza vertical e horizontalmente */
  min-height: 80vh;
  text-align: center;
  background: linear-gradient(135deg, var(--cor-escura), var(--cor-primaria));
  color: white;
  padding: var(--espacamento-xl) var(--espacamento-md);
}

/* ============================
   GRID DE CARDS (Grid responsivo)
   ============================ */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--espacamento-md);
}

.card {
  background: white;
  border-radius: 10px;
  padding: var(--espacamento-md);
  box-shadow: 0 2px 12px rgba(0,0,0,.08);
  transition: transform .2s, box-shadow .2s;
}

.card:hover { /* :hover */
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,.15);
}

/* Destaque no primeiro card */
.card:first-child { /* :first-child */
  border-top: 4px solid var(--cor-primaria);
}

/* Remove shadow no último para diferenciar */
.card:last-child { /* :last-child */
  border-top: 4px solid var(--cor-destaque);
}

/* ============================
   LISTA SEM BORDA NO ÚLTIMO ITEM
   ============================ */
.lista__item {
  padding: var(--espacamento-sm) 0;
  border-bottom: 1px solid #eee;
}

.lista__item:last-child { /* :last-child */
  border-bottom: none; /* evita borda dupla */
}
```

---

## Resumo da Aula

| Conceito | Regra prática |
|---|---|
| **Box model** | Sempre use `box-sizing: border-box` globalmente |
| **Margin collapse** | Use `display: flow-root` para criar BFC e evitar colapso |
| **Centralização** | Flex/Grid para 2 eixos; `margin: 0 auto` para horizontal |
| **Sections** | Separe estilo base dos modificadores com BEM |
| **Inline-block** | Use apenas para manutenção de código legado |
| **Flexbox** | Componentes lineares, alinhamento de 1 eixo |
| **Grid** | Layouts 2D, cards responsivos com `auto-fit/minmax` |
| **Pseudo-classes** | `:focus-visible` para acessibilidade; `:not(:placeholder-shown)` para forms |

> **A diferença entre layout júnior e profissional:** o profissional pensa em **sistema** antes de escrever código. Espaçamento é token, section é componente, layout é arquitetura.