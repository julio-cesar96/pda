
Conversa aberta. 1 mensagem não lida.

Pular para o conteúdo
Como usar o Gmail com leitores de tela
4 de 20.013
Guia da aula de hoje - PDA
Caixa de entrada
Resumir este e-mail

Júlio César Brito da Silva <juliobritods.96@gmail.com>
Anexos
16:05 (há 3 horas)
para mim



--
Photo	Júlio César Brito
Educator and Front End Developer
mobile-icon	+55 21 97434 4151
phone-icon	juliobritds.96@gmail.com		mobile-icon	github.com/julio-cesar96
linkedin icon 

 1 anexo
  •  Verificados pelo Gmail

# Responsividade e Organização de CSS em Projetos Front-End

*Roteiro completo de aula com explicações técnicas, exemplos práticos e projeto aplicado*

---

## 📋 Sumário

1. [Introdução](#introdução)
2. [Media Queries para Responsividade](#1-media-queries-para-responsividade)
3. [Cabeçalho Responsivo + Menu Hamburguer](#2-cabeçalho-responsivo--menu-hamburguer)
4. [Conteúdo Responsivo](#3-conteúdo-responsivo)
5. [Ajustando Larguras para Diferentes Dispositivos](#4-ajustando-larguras-para-diferentes-dispositivos)
6. [Variáveis CSS (Custom Properties)](#5-variáveis-css-custom-properties)
7. [Organização em Múltiplos Arquivos CSS](#6-organização-em-múltiplos-arquivos-css)
8. [Projeto Prático: Landing Page TechFlow](#7-projeto-prático-landing-page-techflow)
9. [Desafios Extras](#8-desafios-extras-para-praticar)
10. [Recursos e Próximos Passos](#9-recursos-complementares)

---

## Introdução

A responsividade é um pilar fundamental do desenvolvimento web moderno. Com a diversidade de dispositivos disponíveis hoje — smartphones, tablets, laptops, desktops e TVs — criar interfaces que se adaptam elegantemente a diferentes tamanhos de tela deixou de ser um diferencial para se tornar uma necessidade básica.

### Por que estudar responsividade?

- **65% dos usuários** acessam a web primariamente via mobile (dados de 2024)
- **Google prioriza sites mobile-friendly** nos resultados de busca
- **Experiência do usuário** depende diretamente de layouts adaptáveis
- **Manutenção reduzida** - um código base para todos os dispositivos

### O que você vai dominar nesta aula:

✅ Media queries e estratégias de breakpoints  
✅ Headers responsivos com menu hamburguer  
✅ Layouts flexíveis com Flexbox e Grid  
✅ Variáveis CSS para padronização  
✅ Arquitetura de CSS em múltiplos arquivos  
✅ Projeto completo do zero ao deploy  

---

## 1. Media Queries para Responsividade

### 1.1 O que são Media Queries?

Media queries são **regras condicionais** em CSS que permitem aplicar estilos específicos baseados nas características do dispositivo, sendo a mais comum a **largura da viewport** (área visível do navegador).

**Analogia prática:** Imagine que você está escrevendo uma carta e precisa adaptar o conteúdo dependendo de quem vai ler:
- Para crianças → linguagem simples
- Para adultos → linguagem técnica
- Para idosos → letra maior

Media queries funcionam da mesma forma: você "pergunta" ao navegador sobre o dispositivo e adapta seu CSS conforme a resposta.

### 1.2 Sintaxe Completa

```css
/* Estrutura básica */
@media tipo-de-mídia and (condição) {
  /* Estilos aplicados quando a condição é verdadeira */
  seletor {
    propriedade: valor;
  }
}

/* Exemplo prático */
@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    padding: 15px;
  }
  
  .header {
    flex-direction: column;
  }
}
```

**Anatomia da sintaxe:**

1. **`@media`** - palavra-chave que inicia a regra
2. **`screen`** - tipo de mídia (opcional):
   - `screen` - telas (padrão, mais comum)
   - `print` - impressão
   - `speech` - leitores de tela
   - `all` - todos os tipos
3. **`and`** - operador lógico:
   - `and` - combina condições (ambas devem ser verdadeiras)
   - `or` - ou (usando vírgula: `@media (min-width: 600px), (orientation: landscape)`)
   - `not` - nega a condição
4. **`(max-width: 768px)`** - condição/característica

### 1.3 Tipos de Condições Mais Usadas

```css
/* ========== LARGURA ========== */

/* Largura máxima - "até este tamanho" */
@media (max-width: 768px) {
  /* Aplicado para telas de 0px até 768px */
  .mobile-only {
    display: block;
  }
}

/* Largura mínima - "a partir deste tamanho" */
@media (min-width: 769px) {
  /* Aplicado para telas de 769px ou maiores */
  .desktop-only {
    display: block;
  }
}

/* Intervalo - "entre estes tamanhos" */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Aplicado apenas para tablets (768px a 1024px) */
  .tablet-specific {
    font-size: 18px;
  }
}

/* ========== ORIENTAÇÃO ========== */

/* Dispositivo em modo paisagem */
@media (orientation: landscape) {
  .hero {
    height: 50vh; /* Menor em paisagem */
  }
}

/* Dispositivo em modo retrato */
@media (orientation: portrait) {
  .hero {
    height: 80vh; /* Maior em retrato */
  }
}

/* ========== RESOLUÇÃO ========== */

/* Telas de alta densidade (Retina, HiDPI) */
@media (min-resolution: 2dppx) {
  /* Carrega imagens em alta resolução */
  .logo {
    background-image: url('logo@2x.png');
  }
}

/* ========== ASPECT RATIO ========== */

/* Telas muito largas (ultra-wide) */
@media (min-aspect-ratio: 16/9) {
  .sidebar {
    width: 400px;
  }
}
```

### 1.4 Breakpoints Comuns e Estratégia

Breakpoints são os "pontos de quebra" onde o layout muda. **Não existe um padrão universal**, mas estes valores são amplamente utilizados com base em dispositivos típicos:

```css
/* 
  ========================================
  SISTEMA DE BREAKPOINTS PADRONIZADO
  ========================================
  Baseado em Bootstrap e Tailwind CSS
*/

/* Extra Small (XS) - Smartphones em modo retrato */
/* 0px - 575px - Estilos base (sem media query) */
.container {
  width: 100%;
  padding: 0 15px;
}

/* Small (SM) - Smartphones em modo paisagem */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

/* Medium (MD) - Tablets */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
  
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Large (LG) - Desktops pequenos */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Extra Large (XL) - Desktops médios */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
  
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Extra Extra Large (XXL) - Desktops grandes */
@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}
```

**Por que esses valores?**
- **576px** → Maioria dos smartphones em paisagem
- **768px** → Maioria dos tablets em retrato (iPad = 768px)
- **992px** → Laptops pequenos
- **1200px** → Desktops padrão
- **1400px** → Desktops grandes e ultra-wide

### 1.5 Mobile-First vs Desktop-First

Existem duas filosofias fundamentais para desenvolvimento responsivo:

#### **Abordagem Mobile-First (RECOMENDADA)**

Você começa escrevendo CSS para mobile e **adiciona complexidade** conforme a tela aumenta.

```css
/* ========== MOBILE-FIRST ========== */

/* Passo 1: Estilos base (mobile) - SEM media query */
.card {
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 16px;
}

.card-image {
  height: 200px;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

/* Passo 2: Tablets - ADICIONA funcionalidades */
@media (min-width: 768px) {
  .card {
    width: 48%; /* Agora 2 por linha */
    display: inline-block;
    vertical-align: top;
  }
  
  .card-title {
    font-size: 1.75rem; /* Título maior */
  }
}

/* Passo 3: Desktop - ADICIONA mais funcionalidades */
@media (min-width: 1024px) {
  .card {
    width: 30%; /* Agora 3 por linha */
    padding: 25px; /* Mais espaçamento */
  }
  
  .card-image {
    height: 250px; /* Imagem maior */
  }
  
  .card-title {
    font-size: 2rem;
  }
}
```

**Vantagens do Mobile-First:**

✅ **Performance em mobile** - carrega apenas CSS necessário  
✅ **Priorização de conteúdo** - força você a pensar no essencial  
✅ **CSS mais limpo** - adiciona complexidade de forma progressiva  
✅ **Alinhado com Progressive Enhancement** - funciona em todos os navegadores  
✅ **Maioria dos usuários** - 65%+ acessam via mobile  

#### **Abordagem Desktop-First**

Você começa pelo desktop e **remove complexidade** conforme a tela diminui.

```css
/* ========== DESKTOP-FIRST ========== */

/* Passo 1: Estilos base (desktop) - SEM media query */
.card {
  width: 30%; /* 3 por linha */
  padding: 25px;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 30px;
}

.card-image {
  height: 250px;
}

.card-title {
  font-size: 2rem;
}

/* Passo 2: Tablets - REMOVE funcionalidades */
@media (max-width: 1023px) {
  .card {
    width: 48%; /* Agora 2 por linha */
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.75rem;
  }
}

/* Passo 3: Mobile - REMOVE mais funcionalidades */
@media (max-width: 767px) {
  .card {
    width: 100%; /* Apenas 1 por linha */
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .card-image {
    height: 200px;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
}
```

**Quando usar Desktop-First:**

⚠️ **Público específico** - site B2B com 90%+ de usuários desktop  
⚠️ **Legado** - adaptando sites antigos que foram criados para desktop  
⚠️ **Aplicações web complexas** - dashboards, ERPs, ferramentas profissionais  

### 1.6 Boas Práticas com Media Queries

```css
/* ========================================
   ❌ EVITE - Antipadrões Comuns
   ======================================== */

/* ❌ Breakpoints baseados em dispositivos específicos */
@media (min-width: 375px) { /* iPhone X */ }
@media (min-width: 390px) { /* iPhone 13 */ }
@media (min-width: 414px) { /* iPhone Plus */ }
/* Problema: Novos dispositivos surgem constantemente */

/* ❌ Media queries espalhadas e repetidas */
.header { background: blue; }
@media (max-width: 768px) {
  .header { background: red; }
}

.nav { padding: 20px; }
@media (max-width: 768px) {
  .nav { padding: 10px; }
}

.footer { margin: 30px; }
@media (max-width: 768px) {
  .footer { margin: 15px; }
}
/* Problema: Difícil manutenção, código duplicado */

/* ❌ Unidades absolutas em media queries */
@media (max-width: 1920px) { /* pixels específicos */ }
/* Problema: Não considera zoom ou densidade de pixels */


/* ========================================
   ✅ PREFIRA - Boas Práticas
   ======================================== */

/* ✅ Breakpoints baseados no design */
@media (min-width: 768px) {
  /* Quando o LAYOUT precisa mudar, não quando
     um dispositivo específico aparece */
}

/* ✅ Agrupar media queries por breakpoint */
/* Estilos base */
.header { background: blue; font-size: 16px; }
.nav { padding: 20px; }
.footer { margin: 30px; }

/* Um único bloco para tablet */
@media (min-width: 768px) {
  .header { background: green; font-size: 18px; }
  .nav { padding: 25px; }
  .footer { margin: 40px; }
}

/* Um único bloco para desktop */
@media (min-width: 1024px) {
  .header { background: purple; font-size: 20px; }
  .nav { padding: 30px; }
  .footer { margin: 50px; }
}

/* ✅ Usar em (em) para acessibilidade */
/* Respeita preferências de zoom do usuário */
@media (min-width: 48em) { /* 768px com base de 16px */ }

/* ✅ Combinar condições de forma lógica */
@media (min-width: 768px) and (orientation: landscape) {
  /* Tablets em modo paisagem */
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ✅ Considerar preferências do usuário */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### 1.7 Meta Viewport - OBRIGATÓRIO

**CRÍTICO:** Sem esta tag no HTML, media queries NÃO funcionam corretamente em dispositivos móveis!

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  
  <!-- ========================================
       OBRIGATÓRIO para responsividade funcionar
       ======================================== -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>Meu Site Responsivo</title>
</head>
```

**O que cada parte faz:**

- `width=device-width` → Define a largura da viewport como a largura do dispositivo
- `initial-scale=1.0` → Define o zoom inicial em 100%

**Opções adicionais (use com cuidado):**

```html
<!-- Previne zoom (NÃO recomendado - prejudica acessibilidade) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- Permite zoom mas limita (melhor para acessibilidade) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0">
```

### 1.8 Exemplo Prático Completo: Grid Responsivo

Vamos criar um sistema de grid completo que se adapta automaticamente:

```css
/* ========================================
   SISTEMA DE GRID RESPONSIVO COMPLETO
   ======================================== */

/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Container responsivo */
.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

/* Row com flexbox */
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px; /* Compensa padding das colunas */
}

/* Coluna base - mobile (100% de largura) */
.col {
  width: 100%;
  padding: 0 15px;
  margin-bottom: 20px;
}

/* ========== SMALL (576px+) ========== */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
  
  /* 2 colunas em smartphones paisagem */
  .col-sm-6 {
    width: 50%;
  }
}

/* ========== MEDIUM (768px+) ========== */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
  
  /* 2 colunas */
  .col-md-6 {
    width: 50%;
  }
  
  /* 3 colunas */
  .col-md-4 {
    width: 33.333%;
  }
  
  /* 4 colunas */
  .col-md-3 {
    width: 25%;
  }
}

/* ========== LARGE (992px+) ========== */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
  
  /* 2 colunas */
  .col-lg-6 {
    width: 50%;
  }
  
  /* 3 colunas */
  .col-lg-4 {
    width: 33.333%;
  }
  
  /* 4 colunas */
  .col-lg-3 {
    width: 25%;
  }
}

/* ========== EXTRA LARGE (1200px+) ========== */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
  
  /* 4 colunas */
  .col-xl-3 {
    width: 25%;
  }
}
```

**Uso em HTML:**

```html
<div class="container">
  <div class="row">
    <!-- Mobile: 100% | Tablet: 50% | Desktop: 33.33% -->
    <div class="col col-md-6 col-lg-4">
      <div class="card">Card 1</div>
    </div>
    
    <div class="col col-md-6 col-lg-4">
      <div class="card">Card 2</div>
    </div>
    
    <div class="col col-md-6 col-lg-4">
      <div class="card">Card 3</div>
    </div>
  </div>
</div>
```

---

## 2. Cabeçalho Responsivo + Menu Hamburguer

O header é frequentemente um dos componentes mais desafiadores em um layout responsivo. Precisamos transformar um menu horizontal desktop em um menu vertical colapsável no mobile.

### 2.1 Estrutura HTML Semântica

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Header Responsivo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- ========================================
       HEADER FIXO COM NAVEGAÇÃO RESPONSIVA
       ======================================== -->
  <header class="header">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="Menu principal">
        
        <!-- LOGO -->
        <div class="navbar-brand">
          <a href="#" class="logo" aria-label="Página inicial">
            MeuSite
          </a>
        </div>
        
        <!-- BOTÃO HAMBURGUER (visível apenas no mobile) -->
        <button 
          class="navbar-toggler" 
          type="button"
          aria-label="Abrir menu de navegação" 
          aria-expanded="false"
          aria-controls="navbar-menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        
        <!-- MENU DE NAVEGAÇÃO -->
        <ul class="navbar-menu" id="navbar-menu">
          <li class="nav-item">
            <a href="#home" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="#sobre" class="nav-link">Sobre</a>
          </li>
          <li class="nav-item">
            <a href="#servicos" class="nav-link">Serviços</a>
          </li>
          <li class="nav-item">
            <a href="#portfolio" class="nav-link">Portfólio</a>
          </li>
          <li class="nav-item">
            <a href="#contato" class="nav-link">Contato</a>
          </li>
        </ul>
        
      </nav>
    </div>
  </header>
  
  <!-- CONTEÚDO DA PÁGINA -->
  <main style="margin-top: 70px; /* Compensa header fixo */">
    <h1>Conteúdo da Página</h1>
    <p>Lorem ipsum dolor sit amet...</p>
  </main>
  
  <script src="script.js"></script>
</body>
</html>
```

**Por que esta estrutura?**

✅ **`<header>`** → Tag semântica HTML5 para cabeçalho  
✅ **`<nav>`** → Indica bloco de navegação (SEO e acessibilidade)  
✅ **`role="navigation"`** → Reforça para leitores de tela  
✅ **`aria-label`** → Descrição para usuários com deficiência visual  
✅ **`aria-expanded`** → Informa se menu está aberto/fechado  
✅ **`aria-controls`** → Liga botão ao menu que ele controla  
✅ **Três `<span>`** no botão → Criam as três barras do ícone hamburguer  

### 2.2 CSS: Layout Desktop (Estilos Base)

```css
/* ========================================
   RESET E ESTILOS GLOBAIS
   ======================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

/* Container centralizado */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ========================================
   HEADER FIXO
   ======================================== */

.header {
  background-color: #333;
  color: #fff;
  
  /* Fixa no topo */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  
  /* Garante que fique sobre o conteúdo */
  z-index: 1000;
  
  /* Sombra sutil */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* ========================================
   NAVBAR COM FLEXBOX
   ======================================== */

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  min-height: 70px;
}

/* ========================================
   LOGO
   ======================================== */

.navbar-brand .logo {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar-brand .logo:hover {
  color: #ffd700; /* Dourado no hover */
}

/* ========================================
   MENU DE NAVEGAÇÃO (Horizontal no Desktop)
   ======================================== */

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 2rem; /* Espaçamento entre itens */
}

.nav-item .nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  display: block;
  position: relative;
  transition: color 0.3s ease;
}

/* Efeito underline animado */
.nav-item .nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #ffd700;
  transition: width 0.3s ease;
}

.nav-item .nav-link:hover::after {
  width: 100%;
}

.nav-item .nav-link:hover {
  color: #ffd700;
}

/* ========================================
   BOTÃO HAMBURGUER (Escondido no Desktop)
   ======================================== */

.navbar-toggler {
  display: none; /* Oculto por padrão (desktop) */
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001; /* Fica sobre o menu quando aberto */
}

.navbar-toggler .bar {
  width: 100%;
  height: 3px;
  background-color: #fff;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* Focus para acessibilidade via teclado */
.navbar-toggler:focus {
  outline: 2px solid #ffd700;
  outline-offset: 3px;
}
```

### 2.3 CSS: Responsividade Mobile

```css
/* ========================================
   MOBILE: até 768px
   ======================================== */

@media (max-width: 768px) {
  
  /* ========== MOSTRAR BOTÃO HAMBURGUER ========== */
  .navbar-toggler {
    display: flex;
  }
  
  /* ========== MENU MOBILE VERTICAL ========== */
  .navbar-menu {
    /* Posicionamento fixo cobrindo a tela */
    position: fixed;
    top: 70px; /* Abaixo do header */
    left: -100%; /* Escondido fora da tela à esquerda */
    width: 100%;
    height: calc(100vh - 70px); /* Altura total menos header */
    
    /* Estilização */
    background-color: #333;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 2rem 0;
    gap: 0;
    
    /* Animação suave de deslizar */
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Permite scroll se o menu for muito longo */
    overflow-y: auto;
    overflow-x: hidden;
    
    /* Sombra quando aberto */
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  }
  
  /* ========== MENU ATIVO (VISÍVEL) ========== */
  .navbar-menu.active {
    left: 0; /* Desliza para dentro da tela */
  }
  
  /* ========== ITENS DO MENU OCUPAM LARGURA TOTAL ========== */
  .nav-item {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-item:last-child {
    border-bottom: none;
  }
  
  .nav-item .nav-link {
    padding: 1.25rem 2rem;
    font-size: 1.125rem;
  }
  
  /* Remove o efeito underline no mobile */
  .nav-item .nav-link::after {
    display: none;
  }
  
  /* ========== ANIMAÇÃO HAMBURGUER → X ========== */
  
  /* Quando o botão está ativo (menu aberto) */
  .navbar-toggler.active .bar:nth-child(1) {
    /* Barra superior: rotaciona e move para formar o X */
    transform: rotate(-45deg) translate(-5px, 6px);
  }
  
  .navbar-toggler.active .bar:nth-child(2) {
    /* Barra do meio: desaparece */
    opacity: 0;
  }
  
  .navbar-toggler.active .bar:nth-child(3) {
    /* Barra inferior: rotaciona e move para formar o X */
    transform: rotate(45deg) translate(-5px, -6px);
  }
  
  /* ========== OVERLAY ESCURO (OPCIONAL) ========== */
  /* Adiciona um overlay escuro sobre o conteúdo quando menu abre */
  body.menu-open::before {
    content: '';
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

**Explicação das decisões técnicas:**

🔹 **`position: fixed`** → Menu ocupa tela toda quando aberto  
🔹 **`left: -100%`** → Técnica de slide-in (menu vem da esquerda)  
🔹 **`transition`** → Suaviza animação de abertura/fechamento  
🔹 **`calc(100vh - 70px)`** → Altura da viewport menos altura do header  
🔹 **`cubic-bezier()`** → Curva de animação mais natural que linear  
🔹 **`overflow-y: auto`** → Permite scroll se menu tiver muitos itens  

### 2.4 JavaScript: Interatividade do Menu

```javascript
// ========================================
// MENU MOBILE - SCRIPT COMPLETO
// ========================================

// Seleciona elementos do DOM
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

/**
 * Alterna o estado do menu (aberto/fechado)
 */
function toggleMenu() {
  // Toggle classe 'active' no botão e no menu
  navbarToggler.classList.toggle('active');
  navbarMenu.classList.toggle('active');
  body.classList.toggle('menu-open');
  
  // Atualiza atributo ARIA para acessibilidade
  const isExpanded = navbarToggler.classList.contains('active');
  navbarToggler.setAttribute('aria-expanded', isExpanded);
  
  // Previne scroll do body quando menu está aberto
  // (evita scroll duplo no mobile)
  if (isExpanded) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}

/**
 * Fecha o menu
 */
function closeMenu() {
  navbarToggler.classList.remove('active');
  navbarMenu.classList.remove('active');
  body.classList.remove('menu-open');
  navbarToggler.setAttribute('aria-expanded', 'false');
  body.style.overflow = '';
}

// ========== EVENT LISTENERS ==========

// Clique no botão hamburguer
navbarToggler.addEventListener('click', toggleMenu);

// Fecha menu ao clicar em um link (UX melhorada)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarMenu.classList.contains('active')) {
      closeMenu();
    }
  });
});

// Fecha menu ao pressionar ESC (acessibilidade via teclado)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
    closeMenu();
  }
});

// Fecha menu ao clicar fora do menu
body.addEventListener('click', (e) => {
  if (body.classList.contains('menu-open') && 
      !navbarMenu.contains(e.target) && 
      !navbarToggler.contains(e.target)) {
    closeMenu();
  }
});

// ========== PREVENT BUG AO REDIMENSIONAR ==========

// Fecha menu se usuário redimensionar janela para desktop
// (previne bug de menu aberto ao ampliar janela)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Se está em desktop E menu está aberto, fecha
    if (window.innerWidth > 768 && navbarMenu.classList.contains('active')) {
      closeMenu();
    }
  }, 250); // Debounce de 250ms
});

// ========== SMOOTH SCROLL PARA ÂNCORAS ==========

// Adiciona scroll suave para links com #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Se href não é apenas '#' e o elemento existe
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
```

**Funcionalidades implementadas:**

✅ Abertura/fechamento do menu  
✅ Animação do ícone hamburguer → X  
✅ Fechamento automático ao clicar em link  
✅ Fechamento com tecla ESC (acessibilidade)  
✅ Fechamento ao clicar fora do menu  
✅ Previne scroll duplo quando menu está aberto  
✅ Fecha menu ao redimensionar para desktop  
✅ Scroll suave para âncoras  

### 2.5 Alternativa: Menu Hamburguer Apenas com CSS

É possível criar um menu sem JavaScript usando a técnica "checkbox hack":

```html
<!-- HTML MODIFICADO -->
<nav class="navbar">
  <div class="navbar-brand">
    <a href="#" class="logo">MeuSite</a>
  </div>
  
  <!-- Input checkbox escondido -->
  <input type="checkbox" id="menu-toggle" class="menu-toggle">
  
  <!-- Label funciona como botão -->
  <label for="menu-toggle" class="navbar-toggler" aria-label="Menu">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </label>
  
  <ul class="navbar-menu">
    <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
    <li class="nav-item"><a href="#" class="nav-link">Sobre</a></li>
    <li class="nav-item"><a href="#" class="nav-link">Contato</a></li>
  </ul>
</nav>
```

```css
/* CSS APENAS - SEM JAVASCRIPT */

/* Esconde o checkbox */
.menu-toggle {
  display: none;
}

/* Mobile */
@media (max-width: 768px) {
  /* Menu escondido por padrão */
  .navbar-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    /* ... demais estilos ... */
    transition: left 0.3s ease;
  }
  
  /* Quando checkbox está marcado, mostra o menu */
  .menu-toggle:checked ~ .navbar-menu {
    left: 0;
  }
  
  /* Animação do ícone hamburguer → X */
  .menu-toggle:checked ~ .navbar-toggler .bar:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }
  
  .menu-toggle:checked ~ .navbar-toggler .bar:nth-child(2) {
    opacity: 0;
  }
  
  .menu-toggle:checked ~ .navbar-toggler .bar:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
  
  /* Overlay escuro */
  .menu-toggle:checked ~ .navbar-menu::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}
```

**Prós e contras da solução CSS-only:**

✅ Não requer JavaScript  
✅ Mais leve (menos código)  
✅ Funciona mesmo com JS desabilitado  

❌ Menos controle sobre comportamento  
❌ Difícil adicionar funcionalidades extras (fechar ao clicar fora, prevenir scroll, etc.)  
❌ Não atualiza ARIA attributes automaticamente

---

## 3. Conteúdo Responsivo

Nesta seção vamos ver técnicas para tornar o conteúdo (cards, imagens, seções) fluidos e adaptáveis, usando Flexbox, Grid, imagens responsivas e tipografia fluida.

### 3.1 Flexbox e Grid — quando usar cada um

- Flexbox: ideal para layouts unidimensionais (linha ou coluna). Use para navbars, listas, cards em uma única direção.
- Grid: ideal para layouts bidimensionais (linhas e colunas combinadas). Use para páginas com áreas complexas (hero + sidebar + grid de cards).

Exemplo — Grid que vira coluna no mobile:

```css
.grid-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 992px) {
  .grid-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .grid-cards {
    grid-template-columns: 1fr; /* vira coluna única no mobile */
  }
}
```

Por que esta decisão: Grid dá controle explícito sobre linhas/colunas; ao reduzir a viewport adaptamos o número de colunas via media queries.

### 3.2 Imagens responsivas

- Sempre adicionar `width: 100%` e `height: auto` (quando não for background).
- Usar `object-fit` para controlar cobertura do elemento quando usar `img` em containers com dimensão fixa.
- Preferir `srcset` e `picture` para servir imagens em diferentes resoluções quando necessário.

Exemplos:

```html
<img src="hero.jpg" alt="Hero" style="width:100%; height:auto; display:block;">

<!-- srcset para imagens responsivas -->
<img
  src="card-400.jpg"
  srcset="card-400.jpg 400w, card-800.jpg 800w, card-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Card">
```

### 3.3 Tipografia fluida

Use `clamp()` e unidades relativas para títulos e textos que escalem bem entre devices.

```css
/* Título que escala entre 1.25rem e 2.5rem com base na viewport */
h1 {
  font-size: clamp(1.25rem, 2vw + 1rem, 2.5rem);
}

/* Texto base com rem (acessível ao ajuste da fonte do usuário) */
body { font-size: 1rem; }
```

Por que: `clamp()` evita que o texto fique muito pequeno ou exageradamente grande em telas extremas.

### 3.4 Layouts que quebram em coluna no mobile

Boas práticas:

- Planeje o fluxo vertical: mobile é scroll; coloque o conteúdo mais importante primeiro (order no flexbox se necessário).
- Evite dependência de larguras fixas; prefira `%`, `min()`/`max()`/`clamp()`.

Problemas comuns: overflow horizontal devido a elementos fixos, imagens sem `max-width`, e `white-space: nowrap` em textos longos.

Alerta de erro comum: `100vw` pode causar overflow quando existe scrollbar — prefira `width: 100%` no container.

---

## 4. Ajustando Larguras para Diferentes Dispositivos

Nesta seção cobrimos width, max-width, min-width e unidades relativas.

### 4.1 width / max-width / min-width

- `width` define largura base; `max-width` limita o crescimento; `min-width` evita que algo fique pequeno demais.

Exemplo comum:

```css
.container {
  width: 100%;
  max-width: 1200px; /* evita que fique enorme em telas ultra-wide */
  margin: 0 auto; /* centraliza */
  padding: 0 16px;
}
```

### 4.2 Unidades relativas: %, vw, vh, rem, em

- `%` é relativo ao pai — ótimo para componentes aninhados.
- `vw` / `vh` são relativos à viewport. Use com cuidado (mobile browsers UI pode alterar viewport real).
- `rem` / `em` são essenciais para acessibilidade — `rem` relativo à root, `em` ao elemento pai.

Exemplo de uso prático:

```css
.hero { height: 60vh; }
.card { width: min(100%, 360px); }
.text { font-size: 1rem; /* 16px por padrão */ }
```

### 4.3 Estratégias para evitar overflow

- Use `box-sizing: border-box` globalmente.
- Evite larguras fixas maiores que o container pai.
- Use `word-wrap: break-word` / `overflow-wrap: break-word` em textos.
- Teste com zoom do navegador e tamanhos extremos.

Exemplo:

```css
* { box-sizing: border-box; }
.content { overflow-x: hidden; }
.long-text { overflow-wrap: break-word; }
```

---

## 5. Variáveis CSS (Custom Properties)

Variáveis permitem padronizar cores, espaçamentos e tipografia e tornam fácil ajustar valores por breakpoint.

### 5.1 Sintaxe e escopo

```css
:root {
  --bg: #ffffff;
  --text: #222222;
  --accent: #0070f3;
  --container-max: 1200px;
  --gap: 1rem;
}

.card {
  background: var(--bg);
  color: var(--text);
  gap: var(--gap);
}
```

Escopo: variáveis definidas em `:root` são globais; definidas em um seletor, são locais e cascadem.

### 5.2 Reatribuição em media queries

Uma prática poderosa é reatribuir variáveis por breakpoint para alterar temas/layouts globalmente:

```css
:root { --gap: 0.75rem; --container-padding: 16px; }

@media (min-width: 768px) {
  :root { --gap: 1rem; --container-padding: 32px; }
}

@media (min-width: 1200px) {
  :root { --gap: 1.5rem; }
}
```

Vantagens arquiteturais:

- Permite “theme tokens” que podem ser consumidos por componentes.
- Facilita suporte a modos (dark/light) trocando pouca coisa.
- Reduz duplicação e torna refatorações seguras.

### 5.3 Exemplo: Tema com variáveis e modo escuro

```css
:root {
  --bg: #ffffff;
  --text: #111;
  --muted: #666;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0b0b0b;
    --text: #eaeaea;
    --muted: #999;
  }
}

body { background: var(--bg); color: var(--text); }
```

---

## 6. Bônus: Organização em Múltiplos Arquivos CSS

Profissionais normalmente separam CSS por responsabilidade. Isso melhora leitura, manutenção e reuso.

### 6.1 Estrutura recomendada

- `variables.css` — tokens de design (cores, espaçamentos, tipografia)
- `reset.css` ou `normalize.css` — normalização de estilos
- `base.css` — tipografia base, elementos HTML (h1, p, a)
- `layout.css` — grid/containers, header, footer, main layout
- `components.css` — cards, buttons, forms, navbar
- `utilities.css` — classes utilitárias (text-center, hidden, sr-only)

Ordem de importação recomendada (no `<head>`):

1. `variables.css`
2. `reset.css`
3. `base.css`
4. `layout.css`
5. `components.css`
6. `utilities.css`

### 6.2 `@import` vs múltiplos `<link>`

- Evite `@import` no CSS por questões de performance (bloqueia render). Prefira múltiplos `<link rel="stylesheet">` no `<head>` ou bundlers para concatenar.
- Em muitos projetos modernos usa-se bundlers (Webpack, Vite) ou build tools que juntam tudo em um único arquivo minificado.

### 6.3 Estratégias profissionais

- Use convenções de nomenclatura consistentes (BEM, SUIT, utility-first quando apropriado).
- Prefira componentes coesos: cada arquivo de componente deve conter estilos que pertencem apenas àquele componente.
- Documente tokens em `variables.css` com comentários.

---

## 7. Projeto Prático: Landing Page "TechFlow" (guiado)

Descrição: Construir uma landing page responsiva com header (menu hamburguer), hero, seção de cards (serviços), e footer. O objetivo é aplicar tudo que vimos: media queries, flex/grid, imagens responsivas, variáveis CSS e separação em arquivos.

### 7.1 Estrutura do desafio

Pasta inicial proposta:

```
techflow/
├─ index.html
├─ css/
│  ├─ variables.css
│  ├─ reset.css
│  ├─ base.css
│  ├─ layout.css
│  └─ components.css
├─ js/
│  └─ script.js
└─ img/
   ├─ hero.jpg
   └─ card-1.jpg
```

### 7.2 Estrutura HTML base (`index.html`)

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechFlow - Landing</title>
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <header class="header">
    <div class="container navbar">
      <a href="#" class="logo">TechFlow</a>
      <button class="navbar-toggler" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <ul class="navbar-menu" id="menu">
        <li><a href="#">Home</a></li>
        <li><a href="#servicos">Serviços</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>Fluxo de inovação para seu produto</h1>
        <p>Construímos experiências digitais responsivas e escaláveis.</p>
      </div>
    </section>

    <section id="servicos" class="services container">
      <h2>Serviços</h2>
      <div class="grid-cards">
        <article class="card"> <img src="img/card-1.jpg" alt=""> <h3>Design</h3> </article>
        <article class="card"> <img src="img/card-1.jpg" alt=""> <h3>Desenvolvimento</h3> </article>
        <article class="card"> <img src="img/card-1.jpg" alt=""> <h3>Consultoria</h3> </article>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="container">
      <p>© TechFlow 2026</p>
    </div>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>
```

### 7.3 Implementação progressiva

Passo 1 — Layout base

- Crie `variables.css` com tokens (cores, espaçamentos, container-max).
- Crie `reset.css` (use um reset simples) e `base.css` com tipografia básica (h1,h2,p,a).
- Em `layout.css` defina `.container` e estrutura básica do `.hero`.

Passo 2 — Adição do header responsivo

- Implemente a estrutura de `header` e `.navbar` (Flexbox com logo à esquerda e menu à direita).
- No CSS, esconda `.navbar-toggler` por padrão e mostre via media query `max-width: 768px`.

Passo 3 — Implementação do menu hamburguer

- Em `js/script.js` adicione o código de toggle (já visto na seção 2.4). Teste abertura/fechamento e ARIA `aria-expanded`.

Exemplo mínimo de `js/script.js`:

```javascript
const toggler = document.querySelector('.navbar-toggler');
const menu = document.querySelector('.navbar-menu');

toggler.addEventListener('click', () => {
  toggler.classList.toggle('active');
  menu.classList.toggle('active');
  const expanded = toggler.classList.contains('active');
  toggler.setAttribute('aria-expanded', expanded);
  document.body.style.overflow = expanded ? 'hidden' : '';
});
```

Passo 4 — Ajustes de responsividade com media queries

- Defina breakpoints em `layout.css` (mobile-first). Use `@media (min-width: 768px)` e `@media (min-width: 1024px)` para aumentar colunas do grid e ajustar paddings.

Passo 5 — Refatoração usando variáveis CSS

- Substitua cores, espaçamentos e tamanhos fixos por `var(--token)` para facilitar ajustes.
- Reatribua tokens em media queries para alterar gap, fontes e container padding.

Passo 6 — Separação em múltiplos arquivos CSS

- Garanta que `variables.css` seja carregado primeiro para que os demais arquivos consumam os tokens.
- Opcional: use uma task (npm script) para concatenar/minificar os arquivos para produção.

### 7.4 Critérios de aceitação (QA rápido)

- Layout funciona em 320px, 375px, 768px, 1024px e 1440px.
- Menu acessível: foco visível, `aria-expanded` atualizado, ESC fecha o menu.
- Não há overflow horizontal em nenhum breakpoint.
- Imagens usam `max-width:100%` e `object-fit` quando necessário.

---

## 8. Desafios Extras para os Alunos

1. Implementar um menu com submenus dropdown que funcionem em touch e desktop. Considere `mouseenter` x `click` e fallback para teclado.
2. Adicionar lazy-loading para imagens e `srcset` para servir diferentes resoluções.
3. Criar um modo dark toggle que persista a preferência no localStorage, usando variáveis CSS.
4. Reescrever o CSS usando um pré-processador (Sass) com partials correspondentes à estrutura de arquivos proposta.
5. Implementar testes de acessibilidade (axe-core, Lighthouse) e corrigir os problemas detectados.

---

## 9. Recursos e Próximos Passos

- MDN — Media queries: https://developer.mozilla.org/pt-BR/docs/Web/CSS/Media_Queries
- A Complete Guide to CSS Grid — CSS-Tricks
- A Complete Guide to Flexbox — CSS-Tricks
- Lighthouse e Ferramentas de Acessibilidade (axe)

## Conclusão

Este roteiro cobre os fundamentos e práticas avançadas para construir interfaces responsivas e manter o CSS organizado. O projeto prático é propositalmente minimal — foque na progressão: primeiro funciona, depois melhora (perfomance, acessibilidade, organização).

Boa aula e bons códigos!
media-query.md
Exibindo media-query.md.