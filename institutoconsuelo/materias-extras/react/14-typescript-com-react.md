# 🔷 TypeScript com React

> *"Type safety para menos bugs e melhor DX"*

---

## 📋 Índice

1. [Por que TypeScript?](#por-que-typescript)
2. [Setup Inicial](#setup-inicial)
3. [Tipagem de Componentes](#tipagem-de-componentes)
4. [Props e Interfaces](#props-e-interfaces)
5. [Hooks com TypeScript](#hooks-com-typescript)
6. [Eventos](#eventos)
7. [Context API](#context-api)
8. [Generics](#generics)
9. [Utility Types](#utility-types)
10. [Best Practices](#best-practices)

---

## 🎯 Por que TypeScript?

```typescript
// ❌ JavaScript - erro só em runtime
function Welcome({ name }) {
  return <h1>Olá, {name.toUpperCase()}</h1>;
}
<Welcome name={123} /> // Runtime error!

// ✅ TypeScript - erro em desenvolvimento
interface WelcomeProps {
  name: string;
}
function Welcome({ name }: WelcomeProps) {
  return <h1>Olá, {name.toUpperCase()}</h1>;
}
<Welcome name={123} /> // ❌ Type error: Type 'number' is not assignable to type 'string'
```

### Benefícios

- ✅ **Autocomplete inteligente** no editor
- ✅ **Detecção de erros em tempo de desenvolvimento**
- ✅ **Refatoração segura**
- ✅ **Documentação automática** via tipos
- ✅ **Menos bugs em produção**

---

## 📦 Setup Inicial

### Novo Projeto

```bash
# Vite
npm create vite@latest my-app -- --template react-ts

# Next.js
npx create-next-app@latest --typescript
```

### Projeto Existente

```bash
npm install -D typescript @types/react @types/react-dom
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 🎨 Tipagem de Componentes

### Function Components

```typescript
// Básico
function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}

// Com interface
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={variant}>
      {children}
    </button>
  );
}

// Com React.FC (opcional, não recomendado)
const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button onClick={onClick} className={variant}>
      {children}
    </button>
  );
};
```

### Componentes com Generics

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Uso
interface User {
  id: number;
  name: string;
}

<List<User>
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
/>
```

---

## 🔧 Props e Interfaces

### Interfaces vs Types

```typescript
// Interface (preferido para componentes)
interface UserCardProps {
  name: string;
  age: number;
  email?: string; // Opcional
}

// Type (para unions, intersections)
type Status = 'loading' | 'success' | 'error';
type UserCardProps = {
  name: string;
  age: number;
  email?: string;
};

// Extends (Interface)
interface BaseProps {
  id: string;
  className?: string;
}

interface UserCardProps extends BaseProps {
  name: string;
  age: number;
}

// Intersections (Type)
type BaseProps = {
  id: string;
  className?: string;
};

type UserCardProps = BaseProps & {
  name: string;
  age: number;
};
```

### Props com Children

```typescript
// ReactNode (mais flexível)
interface CardProps {
  children: React.ReactNode;
}

// ReactElement (específico)
interface CardProps {
  children: React.ReactElement;
}

// Múltiplos children
interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

// Função como children
interface CardProps {
  children: (data: User) => React.ReactNode;
}
```

### Props com HTML Attributes

```typescript
// Extender atributos HTML
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <button className={variant} {...props} />;
}

// Uso com autocomplete de atributos HTML
<Button variant="primary" onClick={() => {}} disabled />

// Input com atributos HTML
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <span>{error}</span>}
    </div>
  );
}
```

---

## ⚓ Hooks com TypeScript

### useState

```typescript
// Inferência automática
const [count, setCount] = useState(0); // number
const [name, setName] = useState('João'); // string

// Tipo explícito
const [user, setUser] = useState<User | null>(null);

// Com interface
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User>({
  id: 1,
  name: 'João',
  email: 'joao@example.com',
});

// Array
const [users, setUsers] = useState<User[]>([]);

// Union types
type Status = 'idle' | 'loading' | 'success' | 'error';
const [status, setStatus] = useState<Status>('idle');
```

### useRef

```typescript
// Elemento DOM
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus(); // ? = optional chaining
}, []);

return <input ref={inputRef} />;

// Valor mutável
const countRef = useRef<number>(0);

const increment = () => {
  countRef.current += 1;
};

// Timer
const timerRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  timerRef.current = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
}, []);
```

### useReducer

```typescript
interface State {
  count: number;
  error: string | null;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset'; payload: number }
  | { type: 'error'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { ...state, count: action.payload };
    case 'error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, error: null });
  
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset', payload: 0 })}>Reset</button>
    </div>
  );
}
```

### useContext

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  
  return context;
}

// Uso
function ThemedButton() {
  const { theme, toggleTheme } = useTheme(); // ✅ Tipado automaticamente
  
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

### Custom Hooks

```typescript
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Uso
interface User {
  id: number;
  name: string;
}

function UserProfile() {
  const { data, loading, error } = useFetch<User>('/api/user');
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  
  return <div>{data?.name}</div>; // ✅ TypeScript sabe que data é User | null
}
```

---

## 🎯 Eventos

```typescript
function Form() {
  // Click
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.name);
  };
  
  // Submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submetido');
  };
  
  // Change (input)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  
  // Change (select)
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };
  
  // Keyboard
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Enter pressionado');
    }
  };
  
  // Focus
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input focado');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} />
      <select onChange={handleSelectChange}>
        <option value="1">Opção 1</option>
      </select>
      <button onClick={handleClick}>Enviar</button>
    </form>
  );
}
```

---

## 🌍 Context API com TypeScript

```typescript
// types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// contexts/AuthContext.tsx
import { createContext, useContext, useState, useCallback } from 'react';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const logout = useCallback(() => {
    setUser(null);
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  
  return context;
}

// Uso
function LoginForm() {
  const { login, loading } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login('user@example.com', 'password');
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## 🎭 Generics

```typescript
// Hook genérico para API
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}

// Uso
interface Product {
  id: number;
  name: string;
  price: number;
}

const { data: products } = useApi<Product[]>('/api/products');

// Componente genérico de tabela
interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

function Table<T extends { id: string | number }>({ data, columns }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {columns.map(col => (
              <td key={String(col.key)}>
                {col.render ? col.render(item[col.key], item) : String(item[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Uso
interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

<Table<User>
  data={users}
  columns={[
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { 
      key: 'active', 
      label: 'Status',
      render: (value) => value ? '✅ Ativo' : '❌ Inativo'
    },
  ]}
/>
```

---

## 🛠️ Utility Types

```typescript
// Partial - torna todas as props opcionais
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, updates: Partial<User>) {
  // updates pode ter apenas alguns campos
}

updateUser(1, { name: 'João' }); // ✅

// Required - torna todas as props obrigatórias
interface UserForm {
  name?: string;
  email?: string;
}

type RequiredUserForm = Required<UserForm>;
// { name: string; email: string }

// Pick - seleciona props específicas
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string }

// Omit - remove props específicas
type UserWithoutId = Omit<User, 'id'>;
// { name: string; email: string }

// Record - cria objeto com chaves e valores tipados
type Roles = 'admin' | 'user' | 'guest';
type Permissions = Record<Roles, string[]>;
// { admin: string[]; user: string[]; guest: string[] }

const permissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};

// Readonly - torna props imutáveis
interface Config {
  apiUrl: string;
  timeout: number;
}

const config: Readonly<Config> = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
};

// config.apiUrl = 'outro'; // ❌ Error: Cannot assign to 'apiUrl'

// ReturnType - extrai tipo de retorno de função
function getUser() {
  return { id: 1, name: 'João' };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string }

// Exclude - remove tipos de uma union
type Status = 'idle' | 'loading' | 'success' | 'error';
type NonIdleStatus = Exclude<Status, 'idle'>;
// 'loading' | 'success' | 'error'

// Extract - extrai tipos de uma union
type ValidStatus = Extract<Status, 'success' | 'error'>;
// 'success' | 'error'

// NonNullable - remove null e undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string
```

---

## ✅ Best Practices

### 1. Prefira Interfaces para Props

```typescript
// ✅ Bom - Interface
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

// ❌ Evite - Type (exceto para unions)
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};
```

### 2. Evite `any`

```typescript
// ❌ Ruim
function formatData(data: any) {
  return data.map((item: any) => item.name);
}

// ✅ Bom
interface Item {
  id: number;
  name: string;
}

function formatData(data: Item[]) {
  return data.map(item => item.name);
}

// ✅ Melhor - Generic
function formatData<T extends { name: string }>(data: T[]) {
  return data.map(item => item.name);
}
```

### 3. Use Tipos Estritos

```typescript
// ❌ Evite string literal
interface User {
  role: string; // Muito amplo
}

// ✅ Use union types
interface User {
  role: 'admin' | 'user' | 'guest';
}
```

### 4. Declare Tipos em Arquivos Separados

```typescript
// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

// components/UserCard.tsx
import type { User } from '@/types/user';

interface UserCardProps {
  user: User;
}
```

### 5. Use `as const` para Objetos Imutáveis

```typescript
// ❌ Tipo amplo
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
};
// { apiUrl: string; timeout: number }

// ✅ Tipo específico
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} as const;
// { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000 }

// Útil para arrays de opções
const roles = ['admin', 'user', 'guest'] as const;
type Role = typeof roles[number]; // 'admin' | 'user' | 'guest'
```

### 6. Type Assertions com Cuidado

```typescript
// ❌ Perigoso
const data = JSON.parse(response) as User;

// ✅ Melhor - Validação em runtime
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}

const data = JSON.parse(response);
if (isUser(data)) {
  console.log(data.name); // ✅ TypeScript sabe que é User
}
```

### 7. Componentes com Props Padrão

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

function Button({ 
  variant = 'primary', 
  size = 'medium' 
}: ButtonProps) {
  return <button className={`${variant} ${size}`}>Click</button>;
}
```

---

## 📚 Recursos

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Total TypeScript](https://www.totaltypescript.com/)

---

**Próximo:** Boas Práticas de Desenvolvimento em React 🎯
