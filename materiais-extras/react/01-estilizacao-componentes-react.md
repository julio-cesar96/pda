# 🎨 Estilização de Componentes React

> *"CSS é fácil. Organizar CSS em projetos grandes é difícil."*

---

## 📋 Índice

1. [Introdução](#introdução)
2. [CSS Puro (Global)](#css-puro-global)
3. [CSS Modules](#css-modules)
4. [CSS-in-JS (Inline Styles)](#css-in-js-inline-styles)
5. [Styled Components (Preview)](#styled-components-preview)
6. [Comparação das Abordagens](#comparação-das-abordagens)
7. [Boas Práticas](#boas-práticas)

---

## 🎯 Introdução

React não força uma abordagem específica para estilização. Você pode escolher entre várias estratégias, cada uma com seus prós e contras.

### 🔍 Opções Principais

| Abordagem | Escopo | Dinâmico | Performance | Curva |
|-----------|--------|----------|-------------|-------|
| **CSS Puro** | Global | ❌ | 🟢 Alta | 🟢 Fácil |
| **CSS Modules** | Local | ⚠️ Limitado | 🟢 Alta | 🟡 Média |
| **Inline Styles** | Local | ✅ | 🟡 Média | 🟢 Fácil |
| **CSS-in-JS** | Local | ✅ | 🔴 Variável | 🔴 Alta |

---

## 📄 CSS Puro (Global)

### O que é?

Arquivos `.css` tradicionais importados nos componentes. **Estilos são globais** por padrão.

### ✅ Quando Usar

- Projetos pequenos
- Estilos globais (reset, variáveis, tipografia)
- Familiaridade com CSS tradicional

### Exemplo

**Button.css:**
```css
/* ⚠️ Global - pode conflitar com outros botões */
.button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

.button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.button-primary {
  background-color: #007bff;
}

.button-secondary {
  background-color: #6c757d;
}

.button-danger {
  background-color: #dc3545;
}
```

**Button.jsx:**
```javascript
import './Button.css';

function Button({ children, variant = 'primary', ...props }) {
  return (
    <button 
      className={`button button-${variant}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
```

**Uso:**
```javascript
<Button variant="primary">Salvar</Button>
<Button variant="danger">Deletar</Button>
<Button variant="secondary" disabled>Desabilitado</Button>
```

### ⚠️ Problemas

**1. Conflito de Nomes:**
```javascript
// ComponenteA.jsx
import './styles.css'; // .title { color: red; }

// ComponenteB.jsx
import './styles.css'; // .title { color: blue; }

// ❌ Qual cor vai prevalecer? Depende da ordem!
```

**2. Sem Escopo Local:**
```css
/* Afeta TODOS os buttons da aplicação */
button {
  background: red;
}
```

### ✅ Solução: Convenções de Nomenclatura

**BEM (Block Element Modifier):**
```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__body { }
.card__footer { }

/* Modifier */
.card--featured { }
.card--compact { }
```

```javascript
function Card({ title, featured }) {
  const cardClass = featured ? 'card card--featured' : 'card';
  
  return (
    <div className={cardClass}>
      <h2 className="card__title">{title}</h2>
      <div className="card__body">Conteúdo</div>
    </div>
  );
}
```

---

## 🧩 CSS Modules

### O que é?

Arquivos CSS com **escopo local automático**. Classes são únicas por componente.

### ✅ Quando Usar

- Projetos médios/grandes
- Evitar conflitos de nomes
- Manter CSS organizado por componente

### Como Funciona?

Vite/Webpack **renomeia automaticamente** as classes:

```css
/* Button.module.css */
.button { color: blue; }

/* ↓ Compilado para ↓ */
.Button_button__abc123 { color: blue; }
```

### Exemplo Completo

**Button.module.css:**
```css
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.primary {
  background-color: #007bff;
  color: white;
}

.primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.danger {
  background-color: #dc3545;
  color: white;
}

.small {
  padding: 8px 16px;
  font-size: 14px;
}

.large {
  padding: 16px 32px;
  font-size: 18px;
}

.disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}
```

**Button.jsx:**
```javascript
import styles from './Button.module.css';

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  ...props 
}) {
  // Combinar múltiplas classes
  const className = [
    styles.button,
    styles[variant],
    size !== 'medium' && styles[size],
    disabled && styles.disabled
  ]
    .filter(Boolean) // Remove valores falsy
    .join(' ');
  
  return (
    <button 
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
```

**Uso:**
```javascript
<Button variant="primary">Salvar</Button>
<Button variant="danger" size="small">Deletar</Button>
<Button variant="secondary" size="large" disabled>
  Desabilitado
</Button>
```

### 🔧 Classes Dinâmicas com classnames

**Instalar biblioteca:**
```bash
npm install classnames
```

**Uso:**
```javascript
import styles from './Button.module.css';
import classNames from 'classnames';

function Button({ variant, size, disabled, ...props }) {
  const className = classNames(
    styles.button,
    styles[variant],
    {
      [styles.small]: size === 'small',
      [styles.large]: size === 'large',
      [styles.disabled]: disabled
    }
  );
  
  return <button className={className} {...props} />;
}
```

### 🎨 Classes Globais em Modules

**Usar `:global()` para estilos globais:**
```css
/* Button.module.css */
.button {
  /* Local */
}

:global(.theme-dark) .button {
  /* Global + Local combinados */
  background-color: #333;
}
```

### 🔀 Composição de Estilos

**base.module.css:**
```css
.baseButton {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

**Button.module.css:**
```css
.button {
  composes: baseButton from './base.module.css';
  background-color: #007bff;
  color: white;
}
```

---

## 💅 CSS-in-JS (Inline Styles)

### O que é?

Estilos definidos **diretamente em objetos JavaScript** usando a prop `style`.

### ✅ Quando Usar

- Estilos extremamente dinâmicos
- Protótipos rápidos
- Animações baseadas em estado

### Sintaxe

```javascript
const styles = {
  backgroundColor: 'blue',  // camelCase
  fontSize: '16px',         // String para unidades
  padding: 20,              // Number = px
  margin: '10px 20px'       // String para múltiplos valores
};

<div style={styles}>Conteúdo</div>
```

### Exemplo: Botão Dinâmico

```javascript
function Button({ 
  children, 
  variant = 'primary',
  disabled = false 
}) {
  const colors = {
    primary: '#007bff',
    secondary: '#6c757d',
    danger: '#dc3545'
  };
  
  const baseStyles = {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    backgroundColor: disabled ? '#cccccc' : colors[variant],
    color: 'white',
    opacity: disabled ? 0.6 : 1
  };
  
  const [isHovered, setIsHovered] = useState(false);
  
  const hoverStyles = isHovered && !disabled ? {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  } : {};
  
  return (
    <button
      style={{ ...baseStyles, ...hoverStyles }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Exemplo: Card com Tema Dinâmico

```javascript
function Card({ title, content, theme = 'light' }) {
  const themes = {
    light: {
      background: '#ffffff',
      color: '#333333',
      border: '1px solid #ddd'
    },
    dark: {
      background: '#2d2d2d',
      color: '#ffffff',
      border: '1px solid #555'
    }
  };
  
  const cardStyle = {
    ...themes[theme],
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '400px'
  };
  
  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px'
  };
  
  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{title}</h2>
      <p>{content}</p>
    </div>
  );
}
```

### ⚠️ Limitações

**1. Sem pseudo-classes:**
```javascript
// ❌ Não funciona
style={{ ':hover': { color: 'red' } }}

// ✅ Solução: useState
const [isHovered, setIsHovered] = useState(false);
```

**2. Sem media queries:**
```javascript
// ❌ Não funciona
style={{ '@media (max-width: 768px)': { fontSize: '14px' } }}

// ✅ Solução: Lógica condicional
const isMobile = window.innerWidth < 768;
style={{ fontSize: isMobile ? '14px' : '16px' }}
```

**3. Performance:**
- Estilos recriados a cada render
- Sem cache de estilos

---

## 🎭 Styled Components (Preview)

Preview da abordagem CSS-in-JS mais popular (aprofundamento em material próprio).

```javascript
import styled from 'styled-components';

const Button = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.$variant === 'danger' ? '#dc3545' : '#007bff'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Uso
<Button $variant="danger">Deletar</Button>
```

---

## 📊 Comparação das Abordagens

### Matriz de Decisão

| Critério | CSS Puro | CSS Modules | Inline Styles | Styled Comp. |
|----------|----------|-------------|---------------|--------------|
| **Escopo Local** | ❌ | ✅ | ✅ | ✅ |
| **Dinâmico** | ❌ | ⚠️ | ✅ | ✅ |
| **Pseudo-classes** | ✅ | ✅ | ❌ | ✅ |
| **Media Queries** | ✅ | ✅ | ❌ | ✅ |
| **Performance** | 🟢 | 🟢 | 🟡 | 🟡 |
| **SSR** | ✅ | ✅ | ✅ | ⚠️ |
| **Bundle Size** | 0kb | 0kb | 0kb | ~15kb |
| **Curva Aprendizado** | 🟢 | 🟢 | 🟢 | 🟡 |

### Quando Usar Cada Uma?

**CSS Puro:**
```
✅ Estilos globais (reset, variáveis)
✅ Projetos pequenos/simples
✅ Equipe familiarizada com CSS
❌ Projetos grandes
❌ Múltiplos desenvolvedores
```

**CSS Modules:**
```
✅ Projetos médios/grandes
✅ Componentização clara
✅ Zero dependências extras
✅ Performance importante
❌ Estilos muito dinâmicos
❌ Temas complexos
```

**Inline Styles:**
```
✅ Estilos extremamente dinâmicos
✅ Valores baseados em props/state
✅ Protótipos rápidos
❌ Pseudo-classes/media queries
❌ Performance crítica
❌ Estilos complexos
```

**CSS-in-JS (Styled Components):**
```
✅ Estilos dinâmicos complexos
✅ Temas elaborados
✅ Component libraries
❌ Bundle size crítico
❌ Performance máxima
❌ SSR simples
```

---

## 🎯 Boas Práticas

### 1. Convenções de Nomenclatura

```javascript
// ✅ BOM: Descritivo e específico
.product-card
.user-profile-avatar
.checkout-button-primary

// ❌ RUIM: Genérico demais
.card
.image
.btn
```

### 2. Organização de Arquivos

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   └── index.js
│   └── Card/
│       ├── Card.jsx
│       ├── Card.module.css
│       └── index.js
└── styles/
    ├── globals.css
    ├── variables.css
    └── reset.css
```

### 3. Variáveis CSS (CSS Custom Properties)

**globals.css:**
```css
:root {
  /* Cores */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-danger: #dc3545;
  --color-success: #28a745;
  
  /* Espaçamento */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Tipografia */
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  
  /* Bordas */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}
```

**Button.module.css:**
```css
.button {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-primary);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-md);
}
```

### 4. Composição vs Herança

```javascript
// ❌ RUIM: Herança complexa
<div className="card card-primary card-large card-shadow">

// ✅ BOM: Composição clara
import styles from './Card.module.css';

const className = classNames(
  styles.card,
  styles[variant],
  styles[size]
);
```

### 5. Mobile-First

```css
/* ✅ Mobile-first */
.button {
  font-size: 14px; /* Base: mobile */
}

@media (min-width: 768px) {
  .button {
    font-size: 16px; /* Tablet+ */
  }
}

@media (min-width: 1024px) {
  .button {
    font-size: 18px; /* Desktop+ */
  }
}
```

---

## 🚀 Exemplo Prático: Sistema de Design

**theme.css:**
```css
:root {
  --primary-50: #e3f2fd;
  --primary-100: #bbdefb;
  --primary-500: #2196f3;
  --primary-700: #1976d2;
  --primary-900: #0d47a1;
  
  --spacing-unit: 8px;
}
```

**Button.module.css:**
```css
.button {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  background-color: var(--primary-500);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--primary-700);
}

.button:active {
  background-color: var(--primary-900);
}
```

---

## 📚 Recursos Adicionais

- **CSS Modules:** https://github.com/css-modules/css-modules
- **classnames:** https://github.com/JedWatson/classnames
- **BEM Methodology:** https://getbem.com/
- **CSS Custom Properties:** https://developer.mozilla.org/en-US/docs/Web/CSS/--*

---

**Continue aprendendo:** Próximo material sobre bibliotecas de UI (Tailwind, ShadcnUI, etc.) 🎨✨
