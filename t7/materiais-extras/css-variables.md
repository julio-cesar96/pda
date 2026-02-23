# Variáveis CSS & Design Tokens

> **Módulo Avançado — CSS3**
> Da teoria à arquitetura. Aprenda a criar sistemas de tokens que escalam, com estrutura semântica e separação real entre valor e intenção.

---

## 01 — Fundamentos: CSS Custom Properties

CSS Custom Properties são variáveis nativas do CSS que vivem na cascata, herdam valores e podem ser manipuladas em tempo de execução. Isso é algo impossível com pré-processadores como Sass ou Less, que resolvem suas variáveis em tempo de compilação — após o build, os valores já estão fixos no arquivo final.

### Sintaxe básica

Toda custom property começa obrigatoriamente com `--`. A declaração e o uso seguem o padrão abaixo:

```css
/* Declaração — sempre com -- */
:root {
  --color-brand: #ff4d6d;
  --space-4: 16px;
  --font-display: 'Syne', sans-serif;
}

/* Uso com var() */
.button {
  background: var(--color-brand);
  padding: var(--space-4);

  /* Com fallback — segundo argumento é o valor alternativo */
  font-family: var(--font-display, sans-serif);
}
```

O fallback em `var()` é sua rede de segurança: se a variável não estiver definida, o browser usa o segundo argumento. Isso permite migrações graduais e evita quebras visuais inesperadas.

### Escopo e Herança

Custom properties respeitam a cascata CSS. Uma variável declarada em `:root` está disponível para todo o documento. Uma declarada em `.card` está disponível apenas para `.card` e seus descendentes.

```css
/* Global — disponível em todo o DOM */
:root {
  --color-bg: white;
}

/* Local — apenas filhos do .card herdam */
.card {
  --color-bg: #f0f0f0;
  background: var(--color-bg);
}

/* Sobrescrita local sem afetar o restante */
.card--featured {
  --color-bg: #1a1a2e;
}
```

Esse comportamento de herança é a base para theming e dark mode — basta sobrescrever as variáveis no escopo correto.

### Atualização via JavaScript

Diferente de variáveis Sass, custom properties existem no DOM em tempo de execução. O browser recalcula todos os elementos que dependem de uma variável quando seu valor muda.

```js
const root = document.documentElement;

// Leitura de um token
const brand = getComputedStyle(root)
  .getPropertyValue('--color-brand').trim();

// Sobrescrita dinâmica — toda a UI recalcula instantaneamente
root.style.setProperty('--color-brand', '#4cc9f0');

// Caso de uso: tema por preferência do usuário
function applyUserTheme(primaryColor) {
  root.style.setProperty('--color-interactive-primary', primaryColor);
  root.style.setProperty('--btn-bg', primaryColor);
}
```

Casos de uso práticos: customização por usuário, white label, feature flags visuais, personalização em tempo real via painel de configurações.

---

## 02 — O que são Design Tokens?

Design Tokens são a representação abstrata de decisões de design. Não são apenas variáveis — são **intenção com nome**.

A distinção fundamental é essa:

- `#ff4d6d` é um **valor**
- `--color-feedback-error` é uma **intenção**

O token separa *o quê* do *por quê*. Isso permite que o mesmo vermelho seja o botão de perigo em um contexto e a mensagem de erro em outro — e quando a cor mudar, tudo muda junto.

### Por que usar Design Tokens

**Escalabilidade** — um token muda, todos os componentes que o usam se atualizam. Sem find & replace, sem regressões silenciosas.

**Consistência** — o espaçamento de 16px em um botão é o mesmo que em um card porque ambos usam `--space-4`. Não existe "um 16px" e "outro 16px".

**Velocidade** — design e desenvolvimento falam a mesma língua. O token `--color-feedback-error` existe no Figma e no CSS com o mesmo nome e intenção.

**Manutenibilidade** — decisões de design versionadas como código. Reduz débito técnico e facilita auditoria.

---

## 03 — As Três Camadas de Tokens

Um sistema de tokens maduro tem três camadas. Cada uma serve um propósito distinto e **nunca devem ser misturadas**.

```
┌─────────────────────────────────────────────┐
│  🧩 Component Tokens                        │
│  --btn-bg, --card-radius, --input-border    │  ← Específico
└────────────────────┬────────────────────────┘
                     │ referencia
┌────────────────────▼────────────────────────┐
│  🎨 Semantic Tokens                         │
│  --color-interactive-primary                │  ← Contextual
│  --color-bg-surface, --color-text-primary   │
└────────────────────┬────────────────────────┘
                     │ referencia
┌────────────────────▼────────────────────────┐
│  ⚙️  Primitive Tokens                       │
│  --color-red-400, --space-4, --text-sm      │  ← Fundação
└─────────────────────────────────────────────┘
```

### Primitive Tokens (Base)

Valores brutos sem contexto semântico. Definem a paleta completa, a escala de espaçamento e toda a tipografia base. **Nunca devem ser usados diretamente em componentes.**

```css
:root {
  /* Paleta de cores completa */
  --color-red-400: #ff4d6d;
  --color-red-500: #c1121f;
  --color-blue-400: #4cc9f0;
  --color-blue-500: #0096c7;
  --color-lime-400: #b5e550;
  --color-ink-100: #0a0a0f;
  --color-canvas-100: #f8f7f3;

  /* Escala de espaçamento — 4pt system */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Escala tipográfica */
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  2rem;
  --text-4xl:  2.75rem;

  /* Border radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-full: 9999px;

  /* Z-index */
  --z-base:    0;
  --z-raised:  10;
  --z-overlay: 100;
  --z-modal:   200;
}
```

### Semantic Tokens

Tokens com **intenção de uso**. Referenciam primitivos e desacoplam valor de contexto. Quando a identidade visual muda, apenas esses tokens precisam ser atualizados — os componentes permanecem intactos.

```css
:root {
  /* Backgrounds */
  --color-bg-page:    var(--color-canvas-100);
  --color-bg-surface: white;
  --color-bg-subtle:  var(--color-canvas-200);
  --color-bg-inverse: var(--color-ink-100);

  /* Texto */
  --color-text-primary:   var(--color-ink-100);
  --color-text-secondary: var(--color-ink-300);
  --color-text-inverse:   var(--color-canvas-100);

  /* Interação */
  --color-interactive-primary: var(--color-red-400);
  --color-interactive-hover:   var(--color-red-500);

  /* Feedback */
  --color-feedback-success: var(--color-lime-400);
  --color-feedback-error:   var(--color-red-400);
  --color-feedback-warning: var(--color-amber-400);
  --color-feedback-info:    var(--color-blue-400);
}
```

### Component Tokens

Tokens específicos para componentes. Referenciam semânticos e permitem customização isolada sem hardcode dentro do componente.

```css
:root {
  /* Botão */
  --btn-bg:        var(--color-interactive-primary);
  --btn-text:      white;
  --btn-radius:    var(--radius-full);
  --btn-padding-x: var(--space-6);
  --btn-padding-y: var(--space-3);

  /* Card */
  --card-bg:     var(--color-bg-surface);
  --card-radius: var(--radius-lg);
  --card-shadow: 0 2px 0 var(--color-border-default), 0 4px 24px rgba(0,0,0,0.06);

  /* Input */
  --input-border:        var(--color-border-default);
  --input-border-focus:  var(--color-interactive-primary);
  --input-bg:            var(--color-bg-surface);
  --input-radius:        var(--radius-md);
}

/* O componente usa apenas seus próprios tokens */
.button {
  background:    var(--btn-bg);
  color:         var(--btn-text);
  border-radius: var(--btn-radius);
  padding:       var(--btn-padding-y) var(--btn-padding-x);
}
```

---

## 04 — Estratégia de Naming

### Estrutura hierárquica

Um bom nome de token é previsível, hierárquico e descreve intenção — nunca aparência.

```
--[categoria]-[subcategoria]-[propriedade]-[estado]

Exemplos:
  --color-feedback-error-hover
  --color-text-primary
  --space-inset-md
  --font-size-heading-xl
  --btn-bg-disabled
```

Cada segmento tem um papel:

| Segmento | Papel | Exemplos |
|---|---|---|
| Categoria | Tipo de propriedade | `color`, `space`, `font`, `radius` |
| Subcategoria | Contexto de uso | `feedback`, `text`, `interactive`, `bg` |
| Propriedade | O que representa | `primary`, `error`, `surface` |
| Estado | Variação de estado | `hover`, `focus`, `disabled`, `active` |

### Erros comuns de naming

| ❌ Evite | ✅ Prefira | Motivo |
|---|---|---|
| `--red` | `--color-feedback-error` | Nome deve descrever intenção, não cor |
| `--blue-button-bg` | `--btn-bg` | Cor não deve estar no nome |
| `--big` | `--space-8` | Hierarquia e consistência de escala |
| `--txtPrimary` | `--color-text-primary` | Categoria explícita, kebab-case |
| `--myAwesomeColor` | `--color-brand-primary` | Nomes agnósticos e previsíveis |
| `--error` | `--color-feedback-error` | Categoria e subcategoria claras |

> **Regra de ouro:** se o nome do token menciona uma cor específica (azul, vermelho, verde), ele provavelmente está errado. Quando a paleta mudar, o nome ficará incorreto e vai confundir o time.

---

## 05 — Organização e Arquitetura de Arquivos

### Estrutura recomendada

```
tokens/
├── primitive/
│   ├── color.css        ← Paleta completa
│   ├── spacing.css      ← Escala de espaçamento
│   ├── typography.css   ← Fontes, tamanhos, pesos
│   ├── radius.css       ← Border radius
│   └── z-index.css      ← Camadas de profundidade
│
├── semantic/
│   ├── color.css        ← Intenções de cor
│   ├── spacing.css      ← Espaçamentos contextuais
│   └── typography.css   ← Tipografia semântica
│
├── component/
│   ├── button.css
│   ├── card.css
│   ├── input.css
│   └── ...
│
└── themes/
    ├── dark.css         ← Sobrescrita para dark mode
    ├── brand-acme.css   ← White label / multi-brand
    └── brand-xyz.css
```

### Governança

Um sistema de tokens sem governança degenera rapidamente. Defina:

- **Quem pode criar tokens** — processo de proposta e aprovação
- **Versionamento** — tokens seguem semver; breaking changes são major
- **Documentação** — cada token precisa de contexto: quando usar, quando não usar
- **Controle de duplicidade** — revisar se o token já existe antes de criar

---

## 06 — Theming e Dark Mode

A estrutura de theming é direta: primitive tokens não mudam, apenas os semantic tokens são sobrescritos no escopo do tema.

```css
/* ─── Tema padrão (light) ─── */
:root {
  --color-bg-page:      var(--color-canvas-100);
  --color-bg-surface:   white;
  --color-text-primary: var(--color-ink-100);
  --color-border:       var(--color-canvas-300);
}

/* ─── Dark mode via data-theme ─── */
[data-theme="dark"] {
  --color-bg-page:      var(--color-ink-100);
  --color-bg-surface:   var(--color-ink-200);
  --color-text-primary: var(--color-canvas-100);
  --color-border:       var(--color-ink-300);
}

/* ─── Ativação via JavaScript ─── */
```

```js
// Alternância de tema
document.documentElement.setAttribute('data-theme', 'dark');

// Detectar preferência do sistema
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
```

### Multi-brand / White label

```css
/* Marca padrão */
:root {
  --color-interactive-primary: var(--color-red-400);
  --font-display: 'Syne', sans-serif;
}

/* Marca Acme — apenas tokens semânticos mudam */
[data-brand="acme"] {
  --color-interactive-primary: #ff6b35;
  --font-display: 'Acme Brand Font', sans-serif;
}

/* Marca XYZ */
[data-brand="xyz"] {
  --color-interactive-primary: #0057ff;
  --font-display: 'XYZ Font', sans-serif;
}
```

Os componentes não são tocados. Todo botão, card e link se adapta automaticamente.

---

## 07 — Tipografia como Token

Evite variações arbitrárias de fonte. Tudo deve vir de tokens.

```css
:root {
  /* Famílias */
  --font-display: 'Syne', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Tamanhos — escala modular */
  --text-xs:   0.75rem;    /*  12px */
  --text-sm:   0.875rem;   /*  14px */
  --text-base: 1rem;       /*  16px */
  --text-lg:   1.125rem;   /*  18px */
  --text-xl:   1.25rem;    /*  20px */
  --text-2xl:  1.5rem;     /*  24px */
  --text-3xl:  2rem;       /*  32px */
  --text-4xl:  2.75rem;    /*  44px */
  --text-5xl:  3.75rem;    /*  60px */

  /* Pesos */
  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --font-weight-bold:    700;
  --font-weight-black:   800;

  /* Line heights */
  --leading-tight:  1.1;
  --leading-snug:   1.35;
  --leading-normal: 1.5;
  --leading-relaxed:1.7;
}
```

---

## 08 — Espaçamento e Escala

### O sistema 4pt

Todo espaçamento é múltiplo de 4. Isso garante alinhamento visual consistente entre componentes e facilita o trabalho com grids.

```css
:root {
  --space-1:  4px;   /* micro — bordas, gaps internos  */
  --space-2:  8px;   /* pequeno — padding ícone, gap   */
  --space-3:  12px;  /* — padding compacto             */
  --space-4:  16px;  /* base — padding padrão          */
  --space-5:  24px;  /* médio — gaps entre elementos   */
  --space-6:  32px;  /* grande — padding de cards      */
  --space-7:  48px;  /* xl — separação de seções       */
  --space-8:  64px;  /* 2xl — margens de layout        */
  --space-9:  96px;  /* 3xl — espaçamento hero         */
  --space-10: 128px; /* 4xl — padding de página        */
}
```

**Regra prática:** nunca use um valor de espaçamento que não esteja na escala. Se você precisa de `20px`, reveja o design — provavelmente é `16px` ou `24px`.

---

## 09 — Integração com JavaScript

Custom properties abrem possibilidades que pré-processadores nunca teriam. Aqui estão os padrões mais úteis:

```js
const root = document.documentElement;

// ─── Leitura de token ───
const brandColor = getComputedStyle(root)
  .getPropertyValue('--color-brand').trim();

// ─── Escrita de token ───
root.style.setProperty('--color-interactive-primary', '#0057ff');

// ─── Customização por usuário ───
function applyUserPreferences(prefs) {
  if (prefs.accentColor) {
    root.style.setProperty('--color-interactive-primary', prefs.accentColor);
  }
  if (prefs.fontSize === 'large') {
    root.style.setProperty('--text-base', '1.125rem');
  }
}

// ─── Feature flag visual ───
function enableBetaTheme() {
  root.style.setProperty('--color-bg-page', '#0d0d1a');
  root.setAttribute('data-theme', 'beta');
}

// ─── Animação de transição de tema ───
function switchTheme(theme) {
  root.style.setProperty('--theme-transition', 'all 300ms ease');
  root.setAttribute('data-theme', theme);
  setTimeout(() => root.style.removeProperty('--theme-transition'), 300);
}
```

---

## 10 — Erros Comuns em Design Tokens

### 🚫 Criar tokens demais

Se existe um token para cada variação, o sistema perde consistência. A regra: se um valor não é reutilizado em pelo menos dois lugares diferentes, ele provavelmente não precisa ser um token.

```css
/* ❌ Tokens demais — granularidade desnecessária */
--border-radius-btn-large-hover-active: 20px;
--color-btn-primary-bg-hover-dark-mode: #c1121f;

/* ✅ Estrutura enxuta e previsível */
--btn-radius: var(--radius-full);
--color-interactive-hover: var(--color-red-500);
```

### 🚫 Misturar camadas

Componente usando primitive diretamente é o erro mais comum — e o mais perigoso. Quebra a cadeia de theming.

```css
/* ❌ Componente acessa primitive diretamente */
.button {
  background: var(--color-red-400); /* quebra no dark mode */
}

/* ✅ Componente usa seu próprio token */
.button {
  background: var(--btn-bg); /* respeita o tema */
}
```

### ⚠️ Sem documentação

Token sem contexto de uso é letra morta. Documente:

```css
/**
 * --color-feedback-error
 * Usado para: mensagens de erro, bordas de input inválido, ícones de falha.
 * NÃO usar para: elementos decorativos, destaques de marca.
 * Referencia: --color-red-400
 */
--color-feedback-error: var(--color-red-400);
```

### ⚠️ Cor no nome do token

```css
/* ❌ Quando a cor mudar, o nome ficará errado */
--blue-button-bg: #0057ff;

/* ✅ Nome descreve intenção — sobrevive a rebrandings */
--btn-bg: var(--color-interactive-primary);
```

### 🚫 Hardcode em componentes

```css
/* ❌ Impossível de customizar ou fazer theming */
.card {
  background: white;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* ✅ Configurável via tokens */
.card {
  background:    var(--card-bg);
  color:         var(--color-text-primary);
  border-radius: var(--card-radius);
  box-shadow:    var(--card-shadow);
}
```

---

## 11 — Nível Avançado

### Tokens como Source of Truth

O ideal é ter um único arquivo JSON de tokens que gera automaticamente CSS, JavaScript, Swift, Kotlin e qualquer outro formato necessário.

**Style Dictionary** é a ferramenta padrão da indústria para isso:

```json
// tokens/color/brand.json
{
  "color": {
    "brand": {
      "primary": { "value": "#ff4d6d", "comment": "Cor de ação principal" },
      "secondary": { "value": "#4cc9f0" }
    },
    "feedback": {
      "error": { "value": "{color.brand.primary}", "comment": "Sempre referenciar via alias" }
    }
  }
}
```

```js
// style-dictionary.config.js
module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: "color",
      files: [{
        destination: "tokens.css",
        format: "css/variables"
      }]
    },
    ios: {
      transformGroup: "ios-swift",
      files: [{ destination: "StyleDictionary.swift", format: "ios-swift/class.swift" }]
    },
    android: {
      transformGroup: "android",
      files: [{ destination: "tokens.xml", format: "android/resources" }]
    }
  }
};
```

**Output gerado:**
```css
/* CSS */
:root { --color-brand-primary: #ff4d6d; }
```
```swift
// iOS Swift
public class StyleDictionary { public static let colorBrandPrimary = UIColor(red: 1.000, green: 0.302, blue: 0.427, alpha: 1) }
```

### Distribuição via NPM

```json
// package.json do pacote de tokens
{
  "name": "@minha-empresa/design-tokens",
  "version": "2.1.0",
  "main": "dist/tokens.js",
  "style": "dist/tokens.css",
  "files": ["dist/"]
}
```

Times consomem via:
```bash
npm install @minha-empresa/design-tokens
```

```css
/* No projeto */
@import '@minha-empresa/design-tokens/dist/tokens.css';
```

### Tokens com CSS-in-JS

```js
// tokens.ts — type-safe
export const tokens = {
  color: {
    brand: { primary: 'var(--color-brand-primary)' },
    feedback: { error: 'var(--color-feedback-error)' }
  },
  space: { 4: 'var(--space-4)', 6: 'var(--space-6)' }
} as const;

// styled-components
const Button = styled.button`
  background: ${tokens.color.brand.primary};
  padding: ${tokens.space[4]};
`;
```

### Tokens Contextuais com Container Queries

```css
/* Token se adapta ao container, não à viewport */
@container (min-width: 400px) {
  .card {
    --card-padding: var(--space-6);
    --card-font-size: var(--text-base);
  }
}

@container (max-width: 399px) {
  .card {
    --card-padding: var(--space-4);
    --card-font-size: var(--text-sm);
  }
}
```

---

## Erros vs. Boas Práticas — Resumo Visual

```
ARQUITETURA CORRETA:

  Primitive → Semantic → Component → CSS final
  
  --color-red-400
       └─→ --color-feedback-error
                 └─→ --btn-danger-bg
                           └─→ background: var(--btn-danger-bg)


ARQUITETURA QUEBRADA:

  --color-red-400
       └─→ background: var(--color-red-400)  ← ERRADO
```

---

## 🎯 Exercício Prático

Monte um mini sistema de tokens do zero para um produto fictício.

### Passo 1 — Primitive Tokens

Defina:
- Paleta de 5 cores (2 tons cada)
- Escala de espaçamento 4pt (4, 8, 16, 24, 32, 48, 64px)
- Escala tipográfica (xs ao 4xl)

> Nenhum nome deve ter significado semântico nessa camada.

### Passo 2 — Semantic Tokens

Mapeie as intenções abaixo, referenciando sempre primitivos via `var()`:

- `--color-bg-page`
- `--color-bg-surface`
- `--color-text-primary`
- `--color-text-secondary`
- `--color-interactive-primary`
- `--color-interactive-hover`
- `--color-feedback-error`
- `--color-feedback-success`

### Passo 3 — Component Tokens

Para um **botão** e um **card**, defina tokens próprios que referenciam semânticos. O CSS do componente deve usar **apenas seus tokens de componente** — sem acessar primitive ou semantic diretamente.

### Passo 4 — Dark Mode

Implemente `[data-theme="dark"]` sobrescrevendo **apenas os semantic tokens**. Verifique que nenhuma linha de CSS dos componentes precisou mudar.

### Passo 5 — Integração com JavaScript

Adicione um input de cor e atualize `--color-interactive-primary` via `setProperty()`. Todos os componentes devem refletir a mudança em tempo real.

---

## Recapitulação das camadas

| Camada | Quem define | Referencia | Usado por |
|---|---|---|---|
| **Primitive** | Design System | Valores brutos | Semantic tokens |
| **Semantic** | Design System | Primitivos | Component tokens |
| **Component** | Time de produto | Semânticos | CSS do componente |

**A regra mais importante:** componentes nunca acessam primitive tokens diretamente. A cadeia de referência deve ser sempre respeitada — isso é o que garante que theming, dark mode e white label funcionem sem tocar em componentes.

---

*Tokens são decisões de design representadas como código. Quanto mais clara for a intenção por trás de cada nome, mais robusto e sustentável será o sistema.*