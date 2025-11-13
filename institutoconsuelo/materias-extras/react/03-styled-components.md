# 💅 Styled Components - CSS-in-JS Avançado

> *"Escreva CSS com superpoderes do JavaScript"*

---

## 📋 Índice

1. [Introdução ao CSS-in-JS](#introdução)
2. [Instalação e Setup](#instalação)
3. [Sintaxe Básica](#sintaxe-básica)
4. [Props Dinâmicas](#props-dinâmicas)
5. [Temas e Theming](#temas)
6. [Animações](#animações)
7. [Global Styles](#global-styles)
8. [Best Practices](#best-practices)

---

## 🎯 Introdução

**Styled Components** permite escrever CSS dentro do JavaScript usando **tagged template literals**.

### Por que usar?

```javascript
// ❌ CSS tradicional (conflitos de nome)
import './Button.css';
<button className="button primary">Clique</button>

// ✅ Styled Components (escopo automático)
const Button = styled.button`
  background: blue;
  color: white;
`;
<Button>Clique</Button>
```

### Benefícios

- ✅ **Escopo automático** (sem conflitos de classe)
- ✅ **Props dinâmicas** (estilos baseados em props)
- ✅ **Tema global** (light/dark mode fácil)
- ✅ **TypeScript friendly**
- ✅ **Dead code elimination** (remove CSS não usado)

---

## 📦 Instalação

```bash
npm install styled-components
```

**TypeScript:**
```bash
npm install -D @types/styled-components
```

---

## 🎨 Sintaxe Básica

### Componente Simples

```javascript
import styled from 'styled-components';

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Uso
function App() {
  return (
    <div>
      <Button>Clique aqui</Button>
      <Button disabled>Desabilitado</Button>
    </div>
  );
}
```

### Estendendo Estilos

```javascript
const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

const PrimaryButton = styled(Button)`
  background-color: #007bff;
  color: white;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const DangerButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  
  &:hover {
    background-color: #c82333;
  }
`;
```

---

## ⚡ Props Dinâmicas

### Usando Props

```javascript
const Button = styled.button`
  background-color: ${props => props.$primary ? '#007bff' : '#6c757d'};
  color: white;
  padding: ${props => props.$size === 'large' ? '16px 32px' : '12px 24px'};
  font-size: ${props => props.$size === 'large' ? '18px' : '16px'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

// Uso
<Button $primary>Primary</Button>
<Button>Secondary</Button>
<Button $primary $size="large">Large Primary</Button>
```

**⚠️ Nota:** Use `$prop` (com `$`) para props que não devem ser passadas ao DOM.

### Função de Props Complexa

```javascript
const Card = styled.div`
  padding: 24px;
  border-radius: 12px;
  background-color: ${props => {
    if (props.$variant === 'success') return '#d4edda';
    if (props.$variant === 'error') return '#f8d7da';
    if (props.$variant === 'warning') return '#fff3cd';
    return '#ffffff';
  }};
  
  border-left: 4px solid ${props => {
    if (props.$variant === 'success') return '#28a745';
    if (props.$variant === 'error') return '#dc3545';
    if (props.$variant === 'warning') return '#ffc107';
    return '#007bff';
  }};
  
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Uso
<Card $variant="success">Sucesso!</Card>
<Card $variant="error">Erro!</Card>
```

### Helper para Props

```javascript
import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  
  ${props => props.$primary && css`
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  `}
  
  ${props => props.$secondary && css`
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #5a6268;
    }
  `}
  
  ${props => props.$outline && css`
    background-color: transparent;
    border: 2px solid #007bff;
    color: #007bff;
    
    &:hover {
      background-color: #007bff;
      color: white;
    }
  `}
`;
```

---

## 🎨 Temas e Theming

### Definindo o Tema

**theme.js:**
```javascript
export const lightTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    background: '#ffffff',
    text: '#212529',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  borderRadius: '8px',
};

export const darkTheme = {
  colors: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    background: '#212529',
    text: '#f8f9fa',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  borderRadius: '8px',
};
```

### Aplicando o Tema

**App.jsx:**
```javascript
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { useState } from 'react';

function App() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Container>
        <h1>Meu App</h1>
        <Button onClick={() => setIsDark(!isDark)}>
          Alternar Tema
        </Button>
      </Container>
    </ThemeProvider>
  );
}
```

### Usando o Tema nos Componentes

```javascript
const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.large};
  min-height: 100vh;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.text}22;
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.large};
  margin: ${props => props.theme.spacing.medium} 0;
`;
```

---

## 🎬 Animações

### Keyframes

```javascript
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const Card = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  padding: 24px;
  border-radius: 12px;
`;

const PulsingButton = styled.button`
  animation: ${pulse} 2s infinite;
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
```

### Animação Condicional

```javascript
const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  
  ${props => props.$isLoading && css`
    animation: ${keyframes`
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    `} 1s linear infinite;
  `}
`;

// Uso
<LoadingSpinner $isLoading={true} />
```

---

## 🌍 Global Styles

```javascript
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }
  
  button {
    font-family: inherit;
  }
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// App.jsx
function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <div>Conteúdo</div>
    </ThemeProvider>
  );
}
```

---

## ✅ Best Practices

### 1. Use Transient Props (`$prop`)

```javascript
// ❌ Evite (passa `primary` para o DOM)
const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
`;
<Button primary>Click</Button>

// ✅ Use transient props
const Button = styled.button`
  background: ${props => props.$primary ? 'blue' : 'gray'};
`;
<Button $primary>Click</Button>
```

### 2. Extraia Lógica Complexa

```javascript
// ❌ Lógica no template
const Button = styled.button`
  background: ${props => 
    props.$variant === 'primary' ? '#007bff' :
    props.$variant === 'danger' ? '#dc3545' :
    '#6c757d'
  };
`;

// ✅ Extraia para função
const getButtonColor = (variant) => {
  const colors = {
    primary: '#007bff',
    danger: '#dc3545',
    secondary: '#6c757d',
  };
  return colors[variant] || colors.secondary;
};

const Button = styled.button`
  background: ${props => getButtonColor(props.$variant)};
`;
```

### 3. Componha com `css`

```javascript
import styled, { css } from 'styled-components';

const sharedStyles = css`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

const Button = styled.button`
  ${sharedStyles}
  background: #007bff;
  color: white;
`;

const Link = styled.a`
  ${sharedStyles}
  background: transparent;
  color: #007bff;
`;
```

### 4. TypeScript Support

```typescript
import styled from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger';
  $size?: 'small' | 'medium' | 'large';
}

const Button = styled.button<ButtonProps>`
  background-color: ${props => {
    switch (props.$variant) {
      case 'primary': return '#007bff';
      case 'danger': return '#dc3545';
      default: return '#6c757d';
    }
  }};
  
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
`;
```

---

## 📊 Styled Components vs Alternativas

| Aspecto | Styled Components | Tailwind | CSS Modules |
|---------|------------------|----------|-------------|
| **Sintaxe** | CSS-in-JS | Classes utilitárias | CSS tradicional |
| **Bundle** | ~16kb | ~50kb | Mínimo |
| **Runtime** | Sim | Não | Não |
| **Tema** | Excelente | Bom | Manual |
| **TypeScript** | ✅ | ⚠️ | ✅ |
| **Performance** | 🟡 Boa | 🟢 Excelente | 🟢 Excelente |

---

## 🎯 Exemplo Completo: Sistema de Design

**theme.js:**
```javascript
export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    white: '#ffffff',
    gray: {
      100: '#f8f9fa',
      200: '#e9ecef',
      800: '#343a40',
      900: '#212529',
    },
  },
  spacing: (multiplier) => `${multiplier * 8}px`,
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '24px',
    },
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
};
```

**Button.jsx:**
```javascript
import styled, { css } from 'styled-components';

const getVariantStyles = (variant, theme) => {
  const variants = {
    primary: css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
    `,
    secondary: css`
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.white};
    `,
    danger: css`
      background-color: ${theme.colors.danger};
      color: ${theme.colors.white};
    `,
  };
  return variants[variant] || variants.primary;
};

export const Button = styled.button`
  padding: ${props => props.theme.spacing(1.5)} ${props => props.theme.spacing(3)};
  border: none;
  border-radius: 8px;
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.fontSize.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => getVariantStyles(props.$variant, props.theme)}
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(2)};
    font-size: ${props => props.theme.typography.fontSize.small};
  }
`;
```

---

## 📚 Recursos

- **Documentação:** https://styled-components.com
- **Awesome Styled Components:** https://github.com/styled-components/awesome-styled-components
- **Polished (helpers):** https://polished.js.org

---

**Próximo:** React Router e Gerenciamento de URL 🛣️
