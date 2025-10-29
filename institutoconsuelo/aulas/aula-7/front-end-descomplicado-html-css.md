# 🌐 Front Descomplicado: HTML & CSS

## 🧠 Objetivos de Aprendizagem

Ao final desta aula, você será capaz de:

1. **Compreender a estrutura fundamental de uma página web**:
   - Explicar o papel do HTML na construção de páginas
   - Identificar os principais elementos de uma estrutura HTML (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`)
   - Criar e organizar conteúdo em seções semânticas básicas (`<header>`, `<main>`, `<footer>`)

2. **Utilizar corretamente tags, classes e ids**:
   - Diferenciar o uso de tags, classes e ids e compreender quando aplicar cada um
   - Escrever código HTML limpo e bem estruturado, seguindo boas práticas de legibilidade e hierarquia

3. **Aplicar estilos com CSS para formatar e personalizar páginas**:
   - Entender a função do CSS na aparência e layout de páginas web
   - Utilizar seletores de elementos, classes e ids
   - Modificar cores, fontes e espaçamentos utilizando propriedades básicas de CSS
   - Compreender o conceito de box model (margem, borda, padding, conteúdo)

4. **Construir layouts utilizando Flexbox e CSS Grid**:
   - Compreender os conceitos de **eixo principal** e **transversal** no Flexbox
   - Alinhar e distribuir elementos de forma responsiva com Flexbox
   - Criar layouts estruturados com CSS Grid, utilizando colunas e linhas
   - Aplicar boas práticas de organização e modularidade de layout

5. **Aplicar responsividade com Media Queries**:
   - Compreender o conceito de **design responsivo** e **mobile first**
   - Utilizar **Media Queries** para adaptar o layout a diferentes tamanhos de tela

6. **Adotar boas práticas de desenvolvimento frontend**:
   - Manter separação entre estrutura (HTML) e estilo (CSS)
   - Nomear classes e ids de forma clara e significativa
   - Garantir acessibilidade e legibilidade visual básica

---

## 📋 Conteúdo Programático

### 1. Estrutura Básica de Páginas HTML (30 min)

#### 1.1 O que é HTML?

HTML (HyperText Markup Language) é a **linguagem de marcação** padrão para criar páginas web. Não é uma linguagem de programação, mas sim uma forma de estruturar e organizar conteúdo através de **tags** (marcadores).

**Analogia:** Pense no HTML como o esqueleto e os órgãos de uma casa: ele define onde ficam as paredes, portas, janelas e cômodos. O CSS seria a pintura, decoração e acabamento.

#### 1.2 Anatomia de uma Tag HTML

```html
<!-- Tag com conteúdo -->
<p>Este é um parágrafo</p>
<!-- ↑ tag de abertura | conteúdo | tag de fechamento ↑ -->

<!-- Tag auto-fechada (void element) -->
<img src="foto.jpg" alt="Descrição da foto" />
<!-- ↑ não possui conteúdo interno ↑ -->
```

#### 1.3 Estrutura Fundamental

Todo documento HTML segue uma estrutura básica obrigatória:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Primeira Página</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Todo o conteúdo visível vai aqui -->
    <h1>Olá, Mundo!</h1>
    <p>Esta é minha primeira página HTML.</p>
</body>
</html>
```

**Explicação linha a linha:**

- `<!DOCTYPE html>` → Informa ao navegador que este é um documento HTML5
- `<html lang="pt-BR">` → Container raiz, define o idioma da página
- `<head>` → Metadados, configurações e links para arquivos externos (não visível)
- `<meta charset="UTF-8">` → Define a codificação de caracteres (acentos, ç, etc.)
- `<meta name="viewport"...>` → Essencial para responsividade em dispositivos móveis
- `<title>` → Título que aparece na aba do navegador
- `<body>` → Todo o conteúdo visível da página

#### 1.4 Boas Práticas

✅ **SEMPRE inclua:**

- `<!DOCTYPE html>` no início
- Atributo `lang` na tag `<html>`
- Meta tag de charset
- Meta tag viewport para responsividade
- Um `<title>` descritivo

✅ **Organize seu código:**

- Use indentação consistente (2 ou 4 espaços)
- Feche todas as tags corretamente
- Escreva tags em minúsculas
- Comente seções complexas

---

### 2. Tags HTML5: Estrutura Semântica (40 min)

#### 2.1 O que é HTML Semântico?

HTML semântico utiliza tags que **descrevem o significado** do conteúdo, não apenas sua aparência. Isso melhora:

- **SEO** (Search Engine Optimization)
- **Acessibilidade** (leitores de tela entendem melhor a estrutura)
- **Manutenibilidade** (outros desenvolvedores entendem o código mais facilmente)

#### 2.2 Tags Semânticas Principais

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estrutura Semântica</title>
</head>
<body>
    <!-- Cabeçalho principal do site -->
    <header>
        <nav>
            <ul>
                <li><a href="#home">Início</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>

    <!-- Conteúdo principal -->
    <main>
        <!-- Artigo independente -->
        <article>
            <header>
                <h1>Título do Artigo</h1>
                <p>Publicado em <time datetime="2025-10-27">27 de outubro de 2025</time></p>
            </header>
            
            <section>
                <h2>Seção 1</h2>
                <p>Conteúdo da primeira seção...</p>
            </section>
            
            <section>
                <h2>Seção 2</h2>
                <p>Conteúdo da segunda seção...</p>
            </section>
            
            <footer>
                <p>Autor: João Silva</p>
            </footer>
        </article>

        <!-- Conteúdo relacionado/lateral -->
        <aside>
            <h2>Artigos Relacionados</h2>
            <ul>
                <li><a href="#">Artigo 1</a></li>
                <li><a href="#">Artigo 2</a></li>
            </ul>
        </aside>
    </main>

    <!-- Rodapé do site -->
    <footer>
        <p>&copy; 2025 Meu Site. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
```

#### 2.3 Guia de Tags Semânticas

| Tag | Uso | Exemplo |
|-----|-----|---------|
| `<header>` | Cabeçalho de página ou seção | Logo + navegação |
| `<nav>` | Menu de navegação | Links principais do site |
| `<main>` | Conteúdo principal (único por página) | Corpo do artigo/página |
| `<article>` | Conteúdo independente e reutilizável | Post de blog, notícia |
| `<section>` | Seção temática de conteúdo | Capítulo, agrupamento lógico |
| `<aside>` | Conteúdo relacionado/secundário | Sidebar, widgets |
| `<footer>` | Rodapé de página ou seção | Copyright, links extras |
| `<figure>` + `<figcaption>` | Imagem com legenda | Ilustrações, diagramas |

#### 2.4 Tags de Conteúdo

```html
<!-- Títulos (h1 a h6) -->
<h1>Título Principal</h1>
<h2>Subtítulo</h2>
<h3>Sub-subtítulo</h3>

<!-- Parágrafos e quebras -->
<p>Este é um parágrafo.</p>
<br> <!-- Quebra de linha -->
<hr> <!-- Linha horizontal -->

<!-- Listas -->
<ul> <!-- Lista não ordenada -->
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<ol> <!-- Lista ordenada -->
    <li>Primeiro</li>
    <li>Segundo</li>
</ol>

<!-- Links e imagens -->
<a href="https://example.com" target="_blank" rel="noopener">Link externo</a>
<img src="imagem.jpg" alt="Descrição acessível da imagem" width="300">

<!-- Formatação de texto -->
<strong>Texto importante (negrito)</strong>
<em>Texto enfatizado (itálico)</em>
<mark>Texto destacado</mark>
<small>Texto pequeno</small>
```

#### 2.5 Boas Práticas

✅ Use apenas **um `<h1>` por página** (título principal)  
✅ Mantenha hierarquia lógica de títulos (h1 → h2 → h3, não pule níveis)  
✅ Use `<div>` e `<span>` apenas quando não houver tag semântica adequada  
✅ Sempre inclua `alt` em imagens para acessibilidade  
✅ Use `<strong>` para importância semântica, não apenas para negrito visual

---

### 3. Classes, IDs e Seletores (30 min)

#### 3.1 Diferença entre Classes e IDs

```html
<!-- ID: único na página, usado para identificação específica -->
<div id="cabecalho-principal">Cabeçalho</div>

<!-- Classe: reutilizável, pode ser aplicada a múltiplos elementos -->
<div class="card">Card 1</div>
<div class="card">Card 2</div>
<div class="card card-destaque">Card 3</div>
```

**Regras de ouro:**

- **ID:** Um elemento só pode ter um ID, e cada ID deve ser único na página
- **Classe:** Um elemento pode ter múltiplas classes separadas por espaço
- **Prioridade:** ID tem maior especificidade que classe em CSS

#### 3.2 Quando usar ID vs Classe?

| Use ID quando | Use Classe quando |
|---------------|-------------------|
| Elemento único (ex: `#logo`) | Estilo reutilizável |
| Âncora para link interno | Agrupar elementos similares |
| JavaScript precisa acessar elemento específico | Aplicar variações de estilo |

#### 3.3 Convenções de Nomenclatura

```html
<!-- ❌ Evite -->
<div class="redBox"></div>
<div id="DIV1"></div>
<div class="bnt"></div>

<!-- ✅ Prefira -->
<div class="card-destaque"></div>
<div id="menu-principal"></div>
<div class="botao-primario"></div>
```

**Boas práticas de nomenclatura:**

- Use letras minúsculas
- Separe palavras com hífen (kebab-case)
- Seja descritivo e específico
- Evite abreviações confusas
- Prefira nomes que descrevam função/conteúdo, não aparência

#### 3.4 Introdução ao BEM (Block Element Modifier)

BEM é uma metodologia de nomenclatura que torna o código mais organizado e escalável:

```html
<!-- Estrutura BEM: bloco__elemento--modificador -->
<div class="card">
    <h2 class="card__titulo">Título do Card</h2>
    <p class="card__descricao">Descrição do conteúdo...</p>
    <button class="card__botao card__botao--primario">Ler mais</button>
</div>

<div class="card card--destaque">
    <h2 class="card__titulo">Card em Destaque</h2>
    <p class="card__descricao">Este card tem estilo especial.</p>
    <button class="card__botao card__botao--secundario">Ver detalhes</button>
</div>
```

**Explicação:**

- **Bloco** (`card`): Componente independente
- **Elemento** (`card__titulo`): Parte do bloco
- **Modificador** (`card--destaque`): Variação do bloco ou elemento

Vamos aprofundar BEM na seção de boas práticas!

---

### 4. Introdução ao CSS: Estilizando Páginas (50 min)

#### 4.1 O que é CSS?

CSS (Cascading Style Sheets) é a linguagem que define a **apresentação visual** de documentos HTML. Ele controla cores, fontes, espaçamentos, layouts e animações.

#### 4.2 Três Formas de Aplicar CSS

```html
<!-- 1. CSS Inline (NÃO RECOMENDADO para produção) -->
<p style="color: blue; font-size: 16px;">Texto azul</p>

<!-- 2. CSS Interno (bom para testes/demos) -->
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
    </style>
</head>

<!-- 3. CSS Externo (RECOMENDADO) -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

**Por que CSS externo é melhor?**

- Reutilização em múltiplas páginas
- Melhor manutenibilidade
- Separação de responsabilidades
- Cache do navegador melhora performance

#### 4.3 Seletores CSS Básicos

```css
/* Seletor de tipo (tag) */
p {
    color: #333;
}

/* Seletor de classe */
.destaque {
    background-color: yellow;
}

/* Seletor de ID */
#cabecalho {
    height: 80px;
}

/* Seletor de múltiplas classes */
.card.destaque {
    border: 3px solid gold;
}

/* Seletor descendente */
article p {
    line-height: 1.6;
}

/* Seletor filho direto */
nav > ul {
    list-style: none;
}

/* Pseudo-classes */
a:hover {
    color: red;
}

button:active {
    transform: scale(0.95);
}

input:focus {
    outline: 2px solid blue;
}
```

#### 4.4 Box Model: A Base do Layout CSS

Todo elemento HTML é uma **caixa** com 4 camadas:

```
┌─────────────────── margin ────────────────────┐
│ ┌──────────────── border ──────────────────┐ │
│ │ ┌────────────── padding ──────────────┐ │ │
│ │ │                                      │ │ │
│ │ │          CONTENT                     │ │ │
│ │ │         (width × height)             │ │ │
│ │ │                                      │ │ │
│ │ └──────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

```css
.caixa {
    /* Conteúdo */
    width: 300px;
    height: 200px;
    
    /* Preenchimento interno */
    padding: 20px;
    
    /* Borda */
    border: 2px solid black;
    
    /* Margem externa */
    margin: 10px;
    
    /* Box-sizing: inclui padding e border no width total */
    box-sizing: border-box;
}
```

**Importante:** Use `box-sizing: border-box` para facilitar cálculos:

```css
/* Aplicar globalmente (boa prática) */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```

#### 4.5 Propriedades Essenciais

```css
.exemplo {
    /* Cores */
    color: #333333;                    /* Texto */
    background-color: #f0f0f0;        /* Fundo */
    border-color: rgb(200, 200, 200); /* Borda */
    
    /* Tipografia */
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
    
    /* Espaçamento */
    margin: 20px;           /* Todas as direções */
    margin: 10px 20px;      /* Vertical | Horizontal */
    margin: 10px 15px 20px 25px; /* Top | Right | Bottom | Left */
    
    padding: 15px;
    
    /* Display */
    display: block;
    display: inline;
    display: inline-block;
    display: flex;
    display: grid;
    display: none;
    
    /* Dimensões */
    width: 100%;
    max-width: 1200px;
    height: auto;
    min-height: 300px;
}
```

#### 4.6 Exemplo Prático Completo

**HTML:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card de Produto</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="card">
        <img src="produto.jpg" alt="Produto exemplo" class="card__imagem">
        <h2 class="card__titulo">Nome do Produto</h2>
        <p class="card__preco">R$ 99,90</p>
        <button class="card__botao">Comprar</button>
    </div>
</body>
</html>
```

**CSS (styles.css):**

```css
/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    background-color: #f5f5f5;
    padding: 40px;
}

.card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    max-width: 300px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card__imagem {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
}

.card__titulo {
    margin-top: 15px;
    font-size: 20px;
    color: #333;
}

.card__preco {
    margin-top: 10px;
    font-size: 24px;
    color: #00a650;
    font-weight: bold;
}

.card__botao {
    margin-top: 15px;
    width: 100%;
    padding: 12px;
    background-color: #3483fa;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.card__botao:hover {
    background-color: #2968c8;
}
```

---

### 5. Layouts Modernos: Flexbox (40 min)

#### 5.1 O que é Flexbox?

Flexbox (Flexible Box Layout) é um sistema de layout unidimensional que facilita o alinhamento e distribuição de elementos em um **eixo** (horizontal ou vertical).

**Conceitos fundamentais:**

- **Container flex:** Elemento pai com `display: flex`
- **Flex items:** Elementos filhos diretos do container
- **Eixo principal (main axis):** Direção principal do layout
- **Eixo transversal (cross axis):** Direção perpendicular

#### 5.2 Propriedades do Container Flex

```css
.container {
    display: flex;
    
    /* Direção dos itens */
    flex-direction: row;          /* → (padrão) */
    flex-direction: row-reverse;  /* ← */
    flex-direction: column;       /* ↓ */
    flex-direction: column-reverse; /* ↑ */
    
    /* Quebra de linha */
    flex-wrap: nowrap;  /* Não quebra (padrão) */
    flex-wrap: wrap;    /* Quebra quando necessário */
    
    /* Alinhamento no eixo principal */
    justify-content: flex-start;   /* Início */
    justify-content: flex-end;     /* Fim */
    justify-content: center;       /* Centro */
    justify-content: space-between; /* Espaço entre itens */
    justify-content: space-around;  /* Espaço ao redor */
    justify-content: space-evenly;  /* Espaço uniforme */
    
    /* Alinhamento no eixo transversal */
    align-items: stretch;    /* Estica (padrão) */
    align-items: flex-start; /* Início */
    align-items: flex-end;   /* Fim */
    align-items: center;     /* Centro */
    align-items: baseline;   /* Linha de base do texto */
    
    /* Espaçamento entre itens */
    gap: 20px;
}
```

#### 5.3 Propriedades dos Flex Items

```css
.item {
    /* Crescimento proporcional */
    flex-grow: 1; /* Cresce para ocupar espaço disponível */
    
    /* Encolhimento */
    flex-shrink: 1; /* Pode encolher se necessário */
    
    /* Tamanho base */
    flex-basis: 200px; /* Tamanho inicial antes de crescer/encolher */
    
    /* Atalho */
    flex: 1; /* Equivale a: flex-grow: 1; flex-shrink: 1; flex-basis: 0; */
    
    /* Alinhamento individual */
    align-self: center; /* Sobrescreve align-items do container */
}
```

#### 5.4 Exemplos Práticos

**Exemplo 1: Menu de Navegação Horizontal**

```html
<nav class="menu">
    <a href="#" class="menu__item">Home</a>
    <a href="#" class="menu__item">Sobre</a>
    <a href="#" class="menu__item">Serviços</a>
    <a href="#" class="menu__item">Contato</a>
</nav>
```

```css
.menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 15px 30px;
}

.menu__item {
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    transition: background-color 0.3s;
}

.menu__item:hover {
    background-color: #555;
    border-radius: 4px;
}
```

**Exemplo 2: Grid de Cards Responsivo**

```html
<div class="grid-cards">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
</div>
```

```css
.grid-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

.card {
    flex: 1 1 250px; /* Cresce, encolhe, base de 250px */
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 150px;
}
```

**Exemplo 3: Layout Centralizado**

```css
.container-centralizado {
    display: flex;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center;     /* Centraliza verticalmente */
    min-height: 100vh;      /* Altura total da viewport */
}
```

---

### 6. Layouts Modernos: CSS Grid (40 min)

#### 6.1 O que é CSS Grid?

CSS Grid é um sistema de layout bidimensional que permite criar layouts complexos com **linhas e colunas** simultaneamente.

**Quando usar Grid vs Flexbox?**

- **Flexbox:** Layouts em uma direção (menus, listas, alinhamentos)
- **Grid:** Layouts em duas direções (páginas completas, galerias)

#### 6.2 Propriedades do Container Grid

```css
.container-grid {
    display: grid;
    
    /* Definir colunas */
    grid-template-columns: 200px 200px 200px; /* 3 colunas fixas */
    grid-template-columns: 1fr 1fr 1fr;       /* 3 colunas iguais */
    grid-template-columns: 1fr 2fr 1fr;       /* Coluna do meio é 2x maior */
    grid-template-columns: repeat(3, 1fr);    /* Atalho para 3 colunas iguais */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsivo automático */
    
    /* Definir linhas */
    grid-template-rows: 100px auto 50px;
    
    /* Espaçamento */
    gap: 20px;              /* Entre linhas e colunas */
    row-gap: 20px;          /* Apenas entre linhas */
    column-gap: 20px;       /* Apenas entre colunas */
    
    /* Áreas nomeadas */
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}
```

#### 6.3 Propriedades dos Grid Items

```css
.item {
    /* Posicionamento por linha/coluna */
    grid-column: 1 / 3;     /* Da coluna 1 até 3 */
    grid-column: span 2;    /* Ocupa 2 colunas */
    grid-row: 1 / 4;        /* Da linha 1 até 4 */
    
    /* Usando áreas nomeadas */
    grid-area: header;
    
    /* Alinhamento individual */
    justify-self: center;   /* Horizontal */
    align-self: center;     /* Vertical */
}
```

#### 6.4 Exemplo Prático: Layout de Página Completa

```html
<div class="layout">
    <header class="header">Cabeçalho</header>
    <aside class="sidebar">Menu Lateral</aside>
    <main class="main">Conteúdo Principal</main>
    <footer class="footer">Rodapé</footer>
</div>
```

```css
.layout {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 20px;
}

.header {
    grid-area: header;
    background-color: #333;
    color: white;
    padding: 20px;
}

.sidebar {
    grid-area: sidebar;
    background-color: #f0f0f0;
    padding: 20px;
}

.main {
    grid-area: main;
    background-color: white;
    padding: 20px;
}

.footer {
    grid-area: footer;
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
}
```

#### 6.5 Exemplo: Galeria Responsiva

```html
<div class="galeria">
    <img src="img1.jpg" alt="Imagem 1">
    <img src="img2.jpg" alt="Imagem 2" class="destaque">
    <img src="img3.jpg" alt="Imagem 3">
    <img src="img4.jpg" alt="Imagem 4">
    <img src="img5.jpg" alt="Imagem 5">
    <img src="img6.jpg" alt="Imagem 6">
</div>
```

```css
.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    padding: 20px;
}

.galeria img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

.galeria .destaque {
    grid-column: span 2; /* Ocupa 2 colunas */
    grid-row: span 2;    /* Ocupa 2 linhas */
    height: 100%;
}
```

---

### 7. Responsividade com Media Queries (30 min)

#### 7.1 O que é Design Responsivo?

Design responsivo garante que seu site funcione bem em **qualquer dispositivo**: desktop, tablet ou smartphone. A abordagem moderna utiliza **Mobile First** (projetar primeiro para mobile, depois expandir para telas maiores).

#### 7.2 Sintaxe de Media Queries

```css
/* Sintaxe básica */
@media (condição) {
    /* Estilos aplicados quando a condição é verdadeira */
}

/* Exemplos de condições */
@media (max-width: 768px) {
    /* Telas até 768px (mobile/tablet) */
}

@media (min-width: 769px) {
    /* Telas a partir de 769px (desktop) */
}

@media (min-width: 768px) and (max-width: 1024px) {
    /* Tablets (entre 768px e 1024px) */
}

@media (orientation: landscape) {
    /* Orientação paisagem */
}

@media print {
    /* Estilos para impressão */
}
```

#### 7.3 Breakpoints Comuns

```css
/* Mobile First: Estilos base para mobile */
.container {
    padding: 15px;
    font-size: 14px;
}

/* Tablet (a partir de 768px) */
@media (min-width: 768px) {
    .container {
        padding: 20px;
        font-size: 16px;
    }
}

/* Desktop (a partir de 1024px) */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px;
        font-size: 18px;
    }
}

/* Desktop grande (a partir de 1440px) */
@media (min-width: 1440px) {
    .container {
        max-width: 1400px;
    }
}
```

#### 7.4 Exemplo Prático: Menu Responsivo

```html
<nav class="navbar">
    <div class="navbar__logo">MeuSite</div>
    <ul class="navbar__menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">Sobre</a></li>
        <li><a href="#">Serviços</a></li>
        <li><a href="#">Contato</a></li>
    </ul>
</nav>
```

```css
/* Mobile First */
.navbar {
    background-color: #333;
    padding: 15px;
}

.navbar__logo {
    color: white;
    font-size: 24px;
    font-weight: bold;
}

.navbar__menu {
    list-style: none;
    margin-top: 15px;
}

.navbar__menu li {
    margin: 10px 0;
}

.navbar__menu a {
    color: white;
    text-decoration: none;
    display: block;
    padding: 10px;
}

/* Desktop (768px+) */
@media (min-width: 768px) {
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .navbar__menu {
        display: flex;
        margin-top: 0;
        gap: 20px;
    }
    
    .navbar__menu li {
        margin: 0;
    }
}
```

#### 7.5 Grid Responsivo

```css
.grid {
    display: grid;
    gap: 20px;
    padding: 20px;
}

/* Mobile: 1 coluna */
.grid {
    grid-template-columns: 1fr;
}

/* Tablet: 2 colunas */
@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop: 3 colunas */
@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Desktop grande: 4 colunas */
@media (min-width: 1440px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

#### 7.6 Unidades Responsivas

```css
/* Unidades absolutas (evitar para responsividade) */
.elemento {
    width: 300px; /* Fixo */
}

/* Unidades relativas (preferir) */
.elemento {
    width: 80%;           /* Relativo ao pai */
    max-width: 1200px;    /* Limite máximo */
    font-size: 1.2rem;    /* Relativo à raiz (16px padrão) */
    padding: 2em;         /* Relativo ao font-size do elemento */
}

/* Viewport units */
.hero {
    height: 100vh;        /* 100% da altura da viewport */
    width: 100vw;         /* 100% da largura da viewport */
    font-size: 5vw;       /* 5% da largura da viewport */
}

/* Clamp: valor fluido com limites */
.texto {
    font-size: clamp(14px, 2vw, 24px);
    /* Mínimo 14px, ideal 2vw, máximo 24px */
}
```

---

## 🧩 Tópicos Extras Sugeridos

### 8. Arquitetura BEM CSS (20 min)

#### 8.1 Metodologia BEM

BEM (Block Element Modifier) é uma convenção de nomenclatura que torna o CSS mais organizado, previsível e escalável.

**Estrutura:**

- **Block (Bloco):** Componente independente e reutilizável
- **Element (Elemento):** Parte do bloco que não faz sentido sozinha
- **Modifier (Modificador):** Variação do bloco ou elemento

**Sintaxe:**

```
.bloco {}
.bloco__elemento {}
.bloco--modificador {}
.bloco__elemento--modificador {}
```

#### 8.2 Exemplo Prático: Sistema de Cards

```html
<!-- Card normal -->
<div class="card">
    <img src="produto.jpg" alt="Produto" class="card__imagem">
    <div class="card__corpo">
        <h3 class="card__titulo">Título do Card</h3>
        <p class="card__descricao">Descrição do produto...</p>
        <button class="card__botao card__botao--primario">Comprar</button>
    </div>
</div>

<!-- Card destacado (modificador) -->
<div class="card card--destaque">
    <img src="produto2.jpg" alt="Produto em destaque" class="card__imagem">
    <div class="card__corpo">
        <h3 class="card__titulo">Produto em Destaque</h3>
        <p class="card__descricao">Oferta especial!</p>
        <button class="card__botao card__botao--secundario">Ver mais</button>
    </div>
</div>
```

```css
/* Bloco */
.card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}

/* Elementos */
.card__imagem {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card__corpo {
    padding: 20px;
}

.card__titulo {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
}

.card__descricao {
    color: #666;
    line-height: 1.5;
    margin-bottom: 15px;
}

.card__botao {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

/* Modificadores de bloco */
.card--destaque {
    border: 3px solid gold;
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

/* Modificadores de elemento */
.card__botao--primario {
    background-color: #3483fa;
    color: white;
}

.card__botao--primario:hover {
    background-color: #2968c8;
}

.card__botao--secundario {
    background-color: #fff;
    color: #3483fa;
    border: 2px solid #3483fa;
}

.card__botao--secundario:hover {
    background-color: #3483fa;
    color: white;
}
```

#### 8.3 Vantagens do BEM

✅ **Modularidade:** Componentes são independentes e reutilizáveis  
✅ **Clareza:** Nome da classe indica estrutura e função  
✅ **Evita conflitos:** Baixa especificidade, sem dependência de hierarquia HTML  
✅ **Escalabilidade:** Fácil adicionar novos componentes sem quebrar existentes  
✅ **Manutenibilidade:** Outros desenvolvedores entendem rapidamente

**Recursos:**

- [BEM Official](https://getbem.com/)
- [CSS Wizardry: MindBEMding](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

---

### 9. Acessibilidade na Web (25 min)

#### 9.1 Por que Acessibilidade é Importante?

Acessibilidade digital garante que pessoas com deficiências (visual, auditiva, motora, cognitiva) possam usar seu site. Além disso:

- Melhora SEO
- Amplia seu público
- É exigido por lei em muitos países
- Demonstra responsabilidade social

#### 9.2 HTML Semântico e Acessibilidade

```html
<!-- ❌ Evite divs genéricas -->
<div class="header">
    <div class="nav">
        <div class="menu-item">Home</div>
    </div>
</div>

<!-- ✅ Use tags semânticas -->
<header>
    <nav aria-label="Menu principal">
        <a href="#home">Home</a>
    </nav>
</header>
```

#### 9.3 Atributos de Acessibilidade

```html
<!-- alt: Descrição de imagens -->
<img src="gato.jpg" alt="Gato laranja dormindo no sofá">
<img src="decoracao.jpg" alt=""> <!-- Imagem decorativa -->

<!-- aria-label: Rótulo para leitores de tela -->
<button aria-label="Fechar modal">
    <span class="icone-x">×</span>
</button>

<!-- aria-labelledby: Referenciar elemento que rotula -->
<section aria-labelledby="titulo-secao">
    <h2 id="titulo-secao">Produtos em Destaque</h2>
    <!-- conteúdo -->
</section>

<!-- role: Definir papel do elemento -->
<div role="alert" aria-live="polite">
    Mensagem salva com sucesso!
</div>

<!-- aria-hidden: Esconder de leitores de tela -->
<span aria-hidden="true" class="icone-decorativo">★</span>

<!-- tabindex: Controlar navegação por teclado -->
<div tabindex="0" role="button">Elemento focável</div>
```

#### 9.4 Contraste e Legibilidade

```css
/* ❌ Contraste insuficiente */
.texto-ruim {
    color: #aaa;
    background-color: #ddd;
}

/* ✅ Contraste adequado (mínimo 4.5:1 para texto normal) */
.texto-bom {
    color: #333;
    background-color: #fff;
}

/* Tamanhos de fonte acessíveis */
body {
    font-size: 16px; /* Mínimo recomendado */
    line-height: 1.5; /* Espaçamento entre linhas */
}

h1 {
    font-size: 2.5rem;
}

/* Focar elementos interativos */
a:focus,
button:focus,
input:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
}

/* Nunca remova o outline sem substituir */
button:focus {
    outline: none; /* ❌ NÃO FAÇA ISSO */
}
```

#### 9.5 Hierarquia de Títulos

```html
<!-- ✅ Hierarquia correta -->
<h1>Título Principal da Página</h1>
    <h2>Seção 1</h2>
        <h3>Subseção 1.1</h3>
        <h3>Subseção 1.2</h3>
    <h2>Seção 2</h2>
        <h3>Subseção 2.1</h3>

<!-- ❌ Evite pular níveis -->
<h1>Título</h1>
    <h3>Subtítulo</h3> <!-- Pulou o h2 -->
```

#### 9.6 Formulários Acessíveis

```html
<form>
    <!-- Sempre associe label com input -->
    <label for="nome">Nome completo:</label>
    <input type="text" id="nome" name="nome" required aria-required="true">
    
    <!-- Mensagens de erro acessíveis -->
    <label for="email">E-mail:</label>
    <input 
        type="email" 
        id="email" 
        name="email" 
        aria-describedby="email-erro"
        aria-invalid="true"
    >
    <span id="email-erro" role="alert">Por favor, insira um e-mail válido</span>
    
    <!-- Agrupamento de campos relacionados -->
    <fieldset>
        <legend>Escolha seu plano:</legend>
        <label>
            <input type="radio" name="plano" value="basico"> Básico
        </label>
        <label>
            <input type="radio" name="plano" value="premium"> Premium
        </label>
    </fieldset>
</form>
```

#### 9.7 Testando Acessibilidade

**Ferramentas:**

- **Lighthouse** (Chrome DevTools): Auditoria automática
- **WAVE** (extensão navegador): Análise visual
- **Leitor de tela:** NVDA (Windows), VoiceOver (Mac), TalkBack (Android)
- **Navegação por teclado:** Teste usando apenas Tab, Enter e setas

**Checklist rápida:**

- [ ] Todas as imagens têm `alt` descritivo?
- [ ] Todos os links e botões têm texto/rótulo claro?
- [ ] Contraste de cores está adequado?
- [ ] Site navegável apenas com teclado?
- [ ] Hierarquia de títulos está correta?
- [ ] Formulários têm labels associados?

---

### 10. Fontes Externas e Tipografia (20 min)

#### 10.1 Google Fonts

O Google Fonts oferece centenas de fontes gratuitas e otimizadas para web.

**Método 1: Link no HTML**

```html
<head>
    <!-- 1. Adicione o link no head -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
</head>
```

```css
/* 2. Use no CSS */
body {
    font-family: 'Roboto', sans-serif;
}
```

**Método 2: @import no CSS**

```css
/* No início do arquivo CSS */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

body {
    font-family: 'Poppins', sans-serif;
}
```

#### 10.2 Variáveis CSS para Tipografia

```css
:root {
    /* Família de fontes */
    --font-primary: 'Roboto', sans-serif;
    --font-heading: 'Poppins', sans-serif;
    --font-mono: 'Courier New', monospace;
    
    /* Tamanhos */
    --font-xs: 0.75rem;   /* 12px */
    --font-sm: 0.875rem;  /* 14px */
    --font-base: 1rem;    /* 16px */
    --font-lg: 1.125rem;  /* 18px */
    --font-xl: 1.25rem;   /* 20px */
    --font-2xl: 1.5rem;   /* 24px */
    --font-3xl: 2rem;     /* 32px */
    
    /* Pesos */
    --font-light: 300;
    --font-regular: 400;
    --font-medium: 500;
    --font-bold: 700;
    
    /* Line height */
    --leading-tight: 1.2;
    --leading-normal: 1.5;
    --leading-relaxed: 1.75;
}

/* Uso */
body {
    font-family: var(--font-primary);
    font-size: var(--font-base);
    line-height: var(--leading-normal);
}

h1 {
    font-family: var(--font-heading);
    font-size: var(--font-3xl);
    font-weight: var(--font-bold);
    line-height: var(--leading-tight);
}
```

#### 10.3 Boas Práticas de Tipografia

```css
/* Sempre forneça fallbacks */
body {
    font-family: 'Roboto', 'Arial', sans-serif;
    /* Se Roboto falhar, usa Arial, se não, fonte sans-serif do sistema */
}

/* Limite de caracteres por linha (legibilidade) */
.texto {
    max-width: 65ch; /* ~65 caracteres */
}

/* Performance: carregue apenas os pesos necessários */
/* ❌ Evite carregar todos os pesos (100-900) */
/* ✅ Carregue apenas o que usar (ex: 400, 700) */

/* Otimize carregamento com display=swap */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
```

---

### 11. Frameworks CSS: Bootstrap (30 min)

#### 11.1 O que são Frameworks CSS?

Frameworks CSS são **bibliotecas pré-construídas** que fornecem componentes prontos, sistemas de grid e utilitários, acelerando o desenvolvimento.

**Vantagens:**
✅ Desenvolvimento rápido  
✅ Componentes testados e responsivos  
✅ Consistência visual  
✅ Boa documentação

**Desvantagens:**
❌ Arquivo CSS maior (se não customizado)  
❌ Todos os sites parecem similares  
❌ Curva de aprendizado das classes

#### 11.2 Bootstrap: Introdução

Bootstrap é o framework CSS mais popular. Vamos usar via CDN:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Demo</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Seu conteúdo aqui -->
    
    <!-- Bootstrap JS (opcional, para componentes interativos) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

#### 11.3 Sistema de Grid do Bootstrap

```html
<div class="container">
    <!-- Container centralizado com padding -->
    
    <div class="row">
        <!-- Linha (flex container) -->
        
        <div class="col-12 col-md-6 col-lg-4">
            <!-- Coluna: 12/12 no mobile, 6/12 no tablet, 4/12 no desktop -->
            Conteúdo 1
        </div>
        
        <div class="col-12 col-md-6 col-lg-4">
            Conteúdo 2
        </div>
        
        <div class="col-12 col-md-12 col-lg-4">
            Conteúdo 3
        </div>
    </div>
</div>
```

**Breakpoints do Bootstrap:**

- `col-` → Extra small (<576px)
- `col-sm-` → Small (≥576px)
- `col-md-` → Medium (≥768px)
- `col-lg-` → Large (≥992px)
- `col-xl-` → Extra large (≥1200px)

#### 11.4 Classes Utilitárias

```html
<!-- Espaçamento -->
<div class="m-3">margin: 1rem em todas as direções</div>
<div class="mt-5">margin-top: 3rem</div>
<div class="p-4">padding: 1.5rem</div>
<div class="px-2">padding horizontal: 0.5rem</div>

<!-- Cores -->
<p class="text-primary">Texto azul</p>
<div class="bg-success">Fundo verde</div>
<button class="btn btn-danger">Botão vermelho</button>

<!-- Display -->
<div class="d-flex justify-content-center align-items-center">
    Centralizado com flexbox
</div>

<!-- Tipografia -->
<h1 class="display-1">Título grande</h1>
<p class="lead">Parágrafo de destaque</p>
<p class="text-center">Texto centralizado</p>
```

#### 11.5 Componentes Prontos

**Navbar:**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">MeuSite</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Sobre</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

**Cards:**

```html
<div class="card" style="width: 18rem;">
    <img src="produto.jpg" class="card-img-top" alt="Produto">
    <div class="card-body">
        <h5 class="card-title">Nome do Produto</h5>
        <p class="card-text">Descrição breve do produto</p>
        <a href="#" class="btn btn-primary">Comprar</a>
    </div>
</div>
```

**Botões:**

```html
<button class="btn btn-primary">Primário</button>
<button class="btn btn-secondary">Secundário</button>
<button class="btn btn-success">Sucesso</button>
<button class="btn btn-outline-danger">Perigo Outline</button>
<button class="btn btn-lg">Botão Grande</button>
```

#### 11.6 Comparação: CSS Puro vs Bootstrap

**CSS Puro:**

```html
<!-- HTML -->
<div class="container-custom">
    <div class="grid-custom">
        <div class="card-custom">Card 1</div>
        <div class="card-custom">Card 2</div>
    </div>
</div>
```

```css
/* CSS - você escreve tudo */
.container-custom {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.grid-custom {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.card-custom {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

**Bootstrap:**

```html
<!-- HTML - usa classes prontas -->
<div class="container">
    <div class="row g-3">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">Card 1</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">Card 2</div>
            </div>
        </div>
    </div>
</div>

<!-- CSS - quase nenhum necessário! -->
```

#### 11.7 Outros Frameworks CSS

**Bulma** (<https://bulma.io/>)

- Moderno e baseado em Flexbox
- Sintaxe intuitiva e limpa
- Sem JavaScript necessário

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">

<!-- Exemplo de uso -->
<div class="columns">
    <div class="column">Coluna 1</div>
    <div class="column">Coluna 2</div>
</div>
```

**Pure.css** (<https://pure-css.github.io/>)

- Minimalista (3.7KB minificado)
- Ideal para projetos simples
- Componentes básicos

**Materialize** (<https://materializecss.com/>)

- Baseado no Material Design do Google
- Visual moderno e colorido
- Componentes com animações

#### 11.8 Quando Usar Framework vs CSS Puro?

| Use Framework quando | Use CSS Puro quando |
|---------------------|---------------------|
| Prototipagem rápida | Projeto com design único |
| Projeto com prazo curto | Performance é crítica |
| Equipe iniciante | Aprendizado de CSS |
| MVP ou teste de conceito | Controle total necessário |

---

### 12. Variáveis CSS (Custom Properties) (15 min)

#### 12.1 O que são Variáveis CSS?

Variáveis CSS (ou Custom Properties) permitem armazenar valores reutilizáveis, facilitando manutenção e tematização.

**Sintaxe:**

```css
:root {
    /* Declaração (sempre com --) */
    --cor-primaria: #3483fa;
    --espacamento-base: 20px;
}

.elemento {
    /* Uso com var() */
    color: var(--cor-primaria);
    padding: var(--espacamento-base);
}
```

#### 12.2 Sistema de Design com Variáveis

```css
:root {
    /* Cores */
    --cor-primaria: #3483fa;
    --cor-secundaria: #00a650;
    --cor-perigo: #e63946;
    --cor-sucesso: #06d6a0;
    --cor-alerta: #f77f00;
    
    --cor-texto: #333333;
    --cor-texto-claro: #666666;
    --cor-fundo: #ffffff;
    --cor-fundo-escuro: #f5f5f5;
    
    /* Espaçamento */
    --espaco-xs: 0.25rem;  /* 4px */
    --espaco-sm: 0.5rem;   /* 8px */
    --espaco-md: 1rem;     /* 16px */
    --espaco-lg: 1.5rem;   /* 24px */
    --espaco-xl: 2rem;     /* 32px */
    --espaco-2xl: 3rem;    /* 48px */
    
    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-full: 9999px;
    
    /* Sombras */
    --sombra-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --sombra-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --sombra-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    
    /* Transições */
    --transicao-rapida: 150ms;
    --transicao-normal: 300ms;
    --transicao-lenta: 500ms;
}

/* Uso */
.botao {
    background-color: var(--cor-primaria);
    padding: var(--espaco-md) var(--espaco-lg);
    border-radius: var(--radius-md);
    box-shadow: var(--sombra-md);
    transition: all var(--transicao-normal);
}

.botao:hover {
    box-shadow: var(--sombra-lg);
}
```

#### 12.3 Tema Escuro com Variáveis

```css
/* Tema padrão (claro) */
:root {
    --cor-fundo: #ffffff;
    --cor-texto: #333333;
    --cor-card: #f5f5f5;
}

/* Tema escuro */
[data-theme="dark"] {
    --cor-fundo: #1a1a1a;
    --cor-texto: #e0e0e0;
    --cor-card: #2a2a2a;
}

/* Elementos usam as variáveis */
body {
    background-color: var(--cor-fundo);
    color: var(--cor-texto);
}

.card {
    background-color: var(--cor-card);
}
```

```html
<!-- Alternar tema com JavaScript -->
<button onclick="document.documentElement.setAttribute('data-theme', 'dark')">
    Tema Escuro
</button>
<button onclick="document.documentElement.setAttribute('data-theme', 'light')">
    Tema Claro
</button>
```

#### 12.4 Variáveis com Fallback

```css
.elemento {
    /* Se --cor-customizada não existir, usa #3483fa */
    color: var(--cor-customizada, #3483fa);
    
    /* Fallback de outra variável */
    padding: var(--espaco-custom, var(--espaco-md));
}
```

---

### 13. CSS Nesting (Aninhamento Nativo) (15 min)

#### 13.1 O que é CSS Nesting?

CSS Nesting é uma funcionalidade moderna que permite aninhar seletores diretamente no CSS, sem precisar de pré-processadores como Sass.

**Suporte:** Disponível nos navegadores modernos (Chrome 112+, Safari 16.5+, Firefox 117+)

#### 13.2 Sintaxe Básica

```css
/* Sem nesting (CSS tradicional) */
.card {
    padding: 20px;
}

.card .card__titulo {
    font-size: 20px;
}

.card .card__titulo:hover {
    color: blue;
}

/* Com nesting (CSS moderno) */
.card {
    padding: 20px;
    
    .card__titulo {
        font-size: 20px;
        
        &:hover {
            color: blue;
        }
    }
}
```

#### 13.3 Usando o Seletor & (ampersand)

```css
.botao {
    padding: 10px 20px;
    background-color: blue;
    
    /* Pseudo-classes */
    &:hover {
        background-color: darkblue;
    }
    
    &:focus {
        outline: 2px solid blue;
    }
    
    /* Modificadores BEM */
    &--primario {
        background-color: green;
    }
    
    &--secundario {
        background-color: gray;
    }
    
    /* Contexto específico */
    .tema-escuro & {
        /* Equivale a: .tema-escuro .botao */
        background-color: lightblue;
    }
}
```

#### 13.4 Exemplo Prático com BEM

```css
.card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    
    /* Elementos */
    &__imagem {
        width: 100%;
        border-radius: 4px;
    }
    
    &__titulo {
        font-size: 20px;
        margin-top: 10px;
        
        /* Pseudo-elemento */
        &::before {
            content: "📌 ";
        }
    }
    
    &__descricao {
        color: #666;
        line-height: 1.5;
    }
    
    &__botao {
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        
        &:hover {
            transform: scale(1.05);
        }
    }
    
    /* Modificadores */
    &--destaque {
        border: 2px solid gold;
        box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        
        .card__titulo {
            color: goldenrod;
        }
    }
}
```

**Nota:** Para navegadores mais antigos, considere usar um pós-processador ou manter CSS tradicional.

---

### 14. Performance e Otimização (15 min)

#### 14.1 Boas Práticas de Performance

```css
/* ✅ Use seletores simples e eficientes */
.botao { }              /* Rápido */
.container .botao { }   /* Aceitável */

/* ❌ Evite seletores muito complexos */
div > ul > li > a { }   /* Lento */
* { }                   /* Muito lento (evite) */

/* ✅ Minimize reflows e repaints */
.elemento {
    /* Use transform e opacity para animações (GPU-accelerated) */
    transform: translateX(100px);
    opacity: 0.5;
}

/* ❌ Evite animar propriedades que causam layout */
.elemento-lento {
    /* width, height, top, left causam reflow */
    animation: mover 1s;
}

@keyframes mover {
    to { left: 100px; } /* ❌ Causa reflow */
}

/* ✅ Prefira transform */
@keyframes mover-rapido {
    to { transform: translateX(100px); } /* ✅ Usa GPU */
}
```

#### 14.2 Carregamento de CSS

```html
<!-- ✅ Coloque CSS no <head> -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>

<!-- ✅ CSS crítico inline para primeira renderização -->
<head>
    <style>
        /* CSS essencial para conteúdo above-the-fold */
        body { margin: 0; font-family: sans-serif; }
        .header { background: #333; }
    </style>
    
    <!-- CSS completo carrega depois -->
    <link rel="stylesheet" href="styles-completo.css">
</head>

<!-- ✅ Preload de fontes importantes -->
<link rel="preload" href="fonte.woff2" as="font" type="font/woff2" crossorigin>
```

#### 14.3 Minificação e Organização

```css
/* Desenvolvimento: CSS legível */
.botao {
    padding: 10px 20px;
    background-color: #3483fa;
    border-radius: 4px;
}

/* Produção: CSS minificado (use ferramentas automáticas) */
/* .botao{padding:10px 20px;background-color:#3483fa;border-radius:4px} */
```

**Ferramentas de minificação:**

- CSS Minifier (online)
- Build tools: Vite, Webpack, Parcel (automático)

---





## 📚 Materiais e Referências Sugeridas

### 📖 Documentação Oficial

- **MDN Web Docs (HTML):** <https://developer.mozilla.org/pt-BR/docs/Web/HTML>
- **MDN Web Docs (CSS):** <https://developer.mozilla.org/pt-BR/docs/Web/CSS>
- **W3C HTML Spec:** <https://html.spec.whatwg.org/>
- **CSS Specifications:** <https://www.w3.org/Style/CSS/>

### 🎓 Cursos e Tutoriais

- **Web.dev Learn CSS:** <https://web.dev/learn/css> (Tutorial interativo do Google)
- **CSS-Tricks:** <https://css-tricks.com/> (Artigos e guias práticos)
- **Flexbox Froggy:** <https://flexboxfroggy.com/> (Jogo para aprender Flexbox)
- **Grid Garden:** <https://cssgridgarden.com/> (Jogo para aprender CSS Grid)

### 📝 Artigos e Guias

- **Flexbox — Guia Completo (Origamid):** <https://www.origamid.com/projetos/flexbox-guia-completo/index.html> (Guia em português, muito bom para exercícios e exemplos práticos)
- **CSS Grid Layout — Guia Completo (Origamid):** <https://www.origamid.com/projetos/css-grid-layout-guia-completo/> (Guia em português com exemplos e projetos aplicados)

### 🎨 Design e Inspiração

- **Dribbble:** <https://dribbble.com/> (Inspiração de designs)
- **Awwwards:** <https://www.awwwards.com/> (Sites premiados)
- **CodePen:** <https://codepen.io/> (Exemplos de código interativos)

### 🔧 Ferramentas

- **Can I Use:** <https://caniuse.com/> (Compatibilidade de browsers)
- **CSS Validator:** <https://jigsaw.w3.org/css-validator/>
- **HTML Validator:** <https://validator.w3.org/>
- **Contrast Checker:** <https://webaim.org/resources/contrastchecker/>
- **Google Fonts:** <https://fonts.google.com/>

### 📺 Vídeos Recomendados

- **HTML & CSS Full Course (Inglês):** <https://www.youtube.com/watch?v=G3e-cpL7ofc>
- **CSS Tutorial (Inglês):** <https://www.youtube.com/watch?v=n4R2E7O-Ngo>
- **Kevin Powell (CSS especialista):** <https://www.youtube.com/@KevinPowell>

### 📱 Roadmaps de Aprendizado

- **HTML Roadmap:** <https://roadmap.sh/html>
- **CSS Roadmap:** <https://roadmap.sh/css>
- **Frontend Roadmap:** <https://roadmap.sh/frontend>

### 📦 Frameworks e Bibliotecas

- **Bootstrap:** <https://getbootstrap.com/>
- **Bulma:** <https://bulma.io/>
- **Tailwind CSS:** <https://tailwindcss.com/> (utility-first framework)
- **Material UI:** <https://mui.com/>

### 🎯 Práticas Avançadas

- **BEM Methodology:** <https://getbem.com/>
- **CSS Architecture:** <https://csswizardry.com/>
- **Container Queries:** <https://web.dev/learn/css/container-queries>
- **CSS Custom Properties:** <https://web.dev/learn/css/custom-properties>
- **CSS Nesting:** <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting>

---

#### Troubleshooting comum

- 🔧 CSS não aplica? → Verificar seletor, especificidade, sintaxe
- 🔧 Layout quebrado? → Inspecionar box model, verificar overflow
- 🔧 Flexbox não funciona? → Verificar se display: flex está no pai
- 🔧 Grid não alinha? → Verificar template-columns e gap


## 🎓 Conceitos-Chave para Levar

Ao final desta aula, certifique-se de que os alunos compreendem:

1. **HTML é estrutura, CSS é apresentação** → Separação de responsabilidades
2. **Semântica importa** → Para SEO, acessibilidade e manutenibilidade
3. **Flexbox = 1 dimensão, Grid = 2 dimensões** → Escolha a ferramenta certa
4. **Mobile First** → Projete para pequeno, expanda para grande
5. **BEM ou convenção clara** → Código escalável e legível
6. **Acessibilidade não é opcional** → É responsabilidade profissional
7. **DevTools é seu amigo** → Inspecione, experimente, aprenda

---

## 🚀 Próximos Passos

### Sugestões para a próxima aula

- JavaScript: Manipulação do DOM e interatividade
- CSS Avançado: Animações, transforms, transitions
- Pré-processadores: Sass/SCSS
- Frameworks JavaScript: React, Vue
- Ferramentas: Git, NPM, Vite

### Desafio contínuo

Crie um projeto pessoal aplicando tudo que aprendeu (blog, portfólio, landing page) e vá evoluindo a cada semana!
