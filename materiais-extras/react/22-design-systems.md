# 🎨 Design Systems em React

> *"Consistência, escalabilidade e colaboração"*

---

## 📋 Índice

1. [O que é Design System?](#o-que-é-design-system)
2. [Atomic Design](#atomic-design)
3. [Design Tokens](#design-tokens)
4. [Criando Componentes Base](#componentes-base)
5. [Documentação com Storybook](#storybook)
6. [Temas e Variantes](#temas-e-variantes)
7. [Acessibilidade](#acessibilidade)
8. [Versionamento](#versionamento)
9. [Monorepo para Design System](#monorepo)
10. [Melhores Práticas](#melhores-práticas)

---

## 🎯 O que é Design System?

### Definição

> Um **Design System** é uma coleção de componentes reutilizáveis, guias de estilo e padrões que garantem consistência visual e funcional em produtos digitais.

### Componentes

```
Design System
├── Design Tokens    → Cores, espaçamentos, tipografia
├── Componentes      → Button, Input, Card, etc
├── Padrões          → Layouts, navegação, formulários
├── Documentação     → Storybook, guidelines
└── Ferramentas      → Figma, código, testes
```

### Benefícios

- ✅ **Consistência** visual e de UX
- ✅ **Velocidade** de desenvolvimento
- ✅ **Colaboração** entre design e dev
- ✅ **Manutenibilidade** centralizada
- ✅ **Escalabilidade** de produtos

---

## ⚛️ Atomic Design

### Níveis

```
Atoms       → Botão, Input, Label
Molecules   → Input + Label + Error
Organisms   → Form, Header, Card
Templates   → Page Layout
Pages       → Home, Dashboard
```

### Exemplo Prático

```tsx
// 1. ATOMS
// atoms/Button.tsx
export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="btn" {...props}>{children}</button>;
}

// atoms/Input.tsx
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="input" {...props} />;
}

// atoms/Label.tsx
export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return <label htmlFor={htmlFor}>{children}</label>;
}

// 2. MOLECULES
// molecules/FormField.tsx
interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function FormField({ label, name, error, inputProps }: FormFieldProps) {
  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} aria-invalid={!!error} {...inputProps} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// 3. ORGANISMS
// organisms/LoginForm.tsx
export function LoginForm() {
  return (
    <form className="login-form">
      <FormField label="Email" name="email" inputProps={{ type: 'email' }} />
      <FormField label="Senha" name="password" inputProps={{ type: 'password' }} />
      <Button type="submit">Entrar</Button>
    </form>
  );
}

// 4. TEMPLATES
// templates/AuthLayout.tsx
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-layout">
      <header>Logo</header>
      <main>{children}</main>
      <footer>© 2024</footer>
    </div>
  );
}

// 5. PAGES
// pages/LoginPage.tsx
export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
```

---

## 🎨 Design Tokens

### Definição

```typescript
// tokens/colors.ts
export const colors = {
  // Primitives (cores base)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  blue: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  },
  
  // Semantic (uso específico)
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    disabled: '#9ca3af',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
  },
  border: {
    default: '#e5e7eb',
    focus: '#3b82f6',
  },
  status: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
} as const;

// tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
} as const;

// tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'Fira Code, monospace',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// tokens/borderRadius.ts
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

// tokens/shadows.ts
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// tokens/index.ts
export const tokens = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} as const;
```

### Usar com CSS Variables

```css
/* globals.css */
:root {
  /* Colors */
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-background-primary: #ffffff;
  --color-border-default: #e5e7eb;
  
  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  
  /* Typography */
  --font-family-sans: Inter, system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  
  /* Border Radius */
  --radius-base: 0.25rem;
  --radius-lg: 0.5rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

[data-theme="dark"] {
  --color-text-primary: #f9fafb;
  --color-background-primary: #111827;
}
```

---

## 🧱 Criando Componentes Base

### Button Component

```tsx
// components/Button/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
        ghost: 'hover:bg-gray-100',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, fullWidth, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
            Carregando...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Input Component

```tsx
// components/Input/Input.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus-visible:ring-blue-500',
        error: 'border-red-500 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36)}`;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={inputVariants({ variant: error ? 'error' : variant, size, className })}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

---

## 📚 Documentação com Storybook

### Instalação

```bash
npx storybook@latest init
```

### Story do Button

```tsx
// components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Button',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
```

---

## 🎭 Temas e Variantes

### Theme Provider

```tsx
// providers/ThemeProvider.tsx
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

### Tailwind Dark Mode

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
}
```

---

## ♿ Acessibilidade

### ARIA em Componentes

```tsx
// components/Dialog/Dialog.tsx
import { useEffect, useRef } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        {children}
        <button onClick={onClose} aria-label="Fechar modal">
          ×
        </button>
      </div>
    </div>
  );
}
```

---

## 📦 Monorepo para Design System

### Estrutura

```
my-design-system/
├── packages/
│   ├── tokens/          # Design tokens
│   ├── react/           # Componentes React
│   ├── icons/           # Ícones
│   └── utils/           # Utilitários
├── apps/
│   ├── docs/            # Storybook
│   └── playground/      # App de teste
├── package.json
├── turbo.json
└── pnpm-workspace.yaml
```

### Publicar Pacote

```json
// packages/react/package.json
{
  "name": "@mycompany/design-system",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"]
}
```

---

## ✅ Melhores Práticas

1. **Documentação completa** (Storybook)
2. **Testes** (unitários + visuais)
3. **Acessibilidade** (WCAG AA)
4. **TypeScript** (tipagem forte)
5. **Versionamento semântico**
6. **Changelog** (histórico de mudanças)
7. **Peer dependencies** corretas
8. **Tree-shaking** habilitado
9. **Bundle pequeno**
10. **Exemplos de uso**

---

## 📚 Recursos

- [Material Design](https://m3.material.io/)
- [Ant Design](https://ant.design/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

---

**Próximo:** WebSockets em React 🔌
