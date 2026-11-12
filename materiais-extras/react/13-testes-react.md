# 🧪 Testes em React - Testing Library + Vitest

> *"Teste comportamento, não implementação"*

---

## 📋 Por que Testar?

- ✅ Confiança ao refatorar
- ✅ Documentação viva do código
- ✅ Menos bugs em produção
- ✅ Desenvolvimento mais rápido (long-term)

---

## 📦 Instalação

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**vite.config.js:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
```

**src/test/setup.js:**
```javascript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

**package.json:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 🎯 Teste Básico

```javascript
// Button.jsx
export function Button({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// Button.test.jsx
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza o texto corretamente', () => {
    render(<Button>Clique aqui</Button>);
    
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });
  
  it('chama onClick quando clicado', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Clique</Button>);
    
    await user.click(screen.getByText('Clique'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('não chama onClick quando desabilitado', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick} disabled>Clique</Button>);
    
    await user.click(screen.getByText('Clique'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

---

## 🔍 Queries (Como Buscar Elementos)

### Prioridade de Queries

```javascript
// 1. getByRole (PREFERIDO - acessibilidade)
screen.getByRole('button', { name: 'Salvar' });
screen.getByRole('textbox', { name: 'Nome' });
screen.getByRole('heading', { level: 1 });

// 2. getByLabelText (forms)
screen.getByLabelText('Email');

// 3. getByPlaceholderText
screen.getByPlaceholderText('Digite seu email...');

// 4. getByText
screen.getByText('Bem-vindo');
screen.getByText(/bem-vindo/i); // Regex, case-insensitive

// 5. getByDisplayValue (inputs com valor)
screen.getByDisplayValue('João');

// 6. getByAltText (imagens)
screen.getByAltText('Logo da empresa');

// 7. getByTitle
screen.getByTitle('Fechar');

// 8. getByTestId (ÚLTIMO RECURSO)
screen.getByTestId('custom-element');
```

### Variantes de Queries

```javascript
// getBy: Lança erro se não encontrar (deve existir)
screen.getByText('Salvar');

// queryBy: Retorna null se não encontrar (pode não existir)
expect(screen.queryByText('Erro')).not.toBeInTheDocument();

// findBy: Assíncrono, espera elemento aparecer
const message = await screen.findByText('Salvo com sucesso!');

// getAllBy: Retorna array (múltiplos elementos)
const buttons = screen.getAllByRole('button');
expect(buttons).toHaveLength(3);
```

---

## 📝 Testando Formulários

```javascript
// LoginForm.jsx
export function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    
    await onSubmit({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <label htmlFor="password">Senha</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {error && <p role="alert">{error}</p>}
      
      <button type="submit">Entrar</button>
    </form>
  );
}

// LoginForm.test.jsx
describe('LoginForm', () => {
  it('submete o formulário com dados válidos', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Senha'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
  
  it('mostra erro quando campos estão vazios', async () => {
    const user = userEvent.setup();
    
    render(<LoginForm onSubmit={vi.fn()} />);
    
    await user.click(screen.getByRole('button', { name: 'Entrar' }));
    
    expect(screen.getByRole('alert')).toHaveTextContent('Preencha todos os campos');
  });
});
```

---

## 🔄 Testando Assincronismo

```javascript
// UserProfile.jsx
export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  
  return <div>{user.name}</div>;
}

// UserProfile.test.jsx
describe('UserProfile', () => {
  it('carrega e exibe usuário', async () => {
    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: 'João Silva' }),
      })
    );
    
    render(<UserProfile userId={1} />);
    
    // Espera loading desaparecer
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    
    // Espera nome aparecer
    expect(await screen.findByText('João Silva')).toBeInTheDocument();
    
    // Verifica chamada do fetch
    expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
  });
  
  it('mostra erro quando fetch falha', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));
    
    render(<UserProfile userId={1} />);
    
    expect(await screen.findByText('Erro: Network error')).toBeInTheDocument();
  });
});
```

---

## 🎭 Testando Hooks

```javascript
// useCounter.js
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// useCounter.test.jsx
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  it('inicializa com valor padrão', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });
  
  it('inicializa com valor customizado', () => {
    const { result } = renderHook(() => useCounter(10));
    
    expect(result.current.count).toBe(10);
  });
  
  it('incrementa contador', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('decrementa contador', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
  
  it('reseta contador', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(12);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

---

## 🌍 Testando com Context

```javascript
// ThemeContext.jsx
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// ThemedButton.jsx
export function ThemedButton() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Tema: {theme}
    </button>
  );
}

// ThemedButton.test.jsx
describe('ThemedButton', () => {
  it('alterna tema quando clicado', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Tema: light')).toBeInTheDocument();
    
    await user.click(screen.getByRole('button'));
    
    expect(screen.getByText('Tema: dark')).toBeInTheDocument();
  });
});
```

---

## 🎯 Testando React Query

```javascript
// ProductsList.jsx
export function ProductsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(res => res.json()),
  });
  
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  
  return (
    <ul>
      {data.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// ProductsList.test.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('ProductsList', () => {
  it('carrega e exibe produtos', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, name: 'Produto 1' },
          { id: 2, name: 'Produto 2' },
        ]),
      })
    );
    
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Desabilita retry em testes
        },
      },
    });
    
    render(
      <QueryClientProvider client={queryClient}>
        <ProductsList />
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    
    expect(await screen.findByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
  });
});
```

---

## 🔧 Utilities de Teste

### Custom Render com Providers

```javascript
// test/utils.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

export function renderWithProviders(ui, options = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    );
  }
  
  return render(ui, { wrapper: Wrapper, ...options });
}

// Uso
renderWithProviders(<MyComponent />);
```

### Mock de Módulos

```javascript
// Mockar módulo inteiro
vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ name: 'João' })),
}));

// Mockar parcialmente
vi.mock('./utils', async () => {
  const actual = await vi.importActual('./utils');
  return {
    ...actual,
    formatDate: vi.fn(() => '01/01/2024'),
  };
});
```

---

## ✅ Best Practices

### 1. Teste Comportamento, Não Implementação

```javascript
// ❌ Ruim: testa implementação
expect(component.state.count).toBe(1);

// ✅ Bom: testa comportamento
expect(screen.getByText('1')).toBeInTheDocument();
```

### 2. Use Roles para Acessibilidade

```javascript
// ✅ Bom
screen.getByRole('button', { name: 'Salvar' });
screen.getByRole('textbox', { name: 'Email' });

// ❌ Evite
screen.getByTestId('save-button');
```

### 3. Prefira User Events

```javascript
// ✅ Bom: simula interação real
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'texto');

// ❌ Evite: fireEvent (baixo nível)
fireEvent.click(button);
```

### 4. Não Teste Detalhes de Implementação

```javascript
// ❌ Ruim
expect(component).toHaveProperty('handleClick');

// ✅ Bom
await user.click(screen.getByRole('button'));
expect(mockFunction).toHaveBeenCalled();
```

### 5. Use waitFor para Asserts Assíncronos

```javascript
// ✅ Bom
await waitFor(() => {
  expect(screen.getByText('Carregado')).toBeInTheDocument();
});

// ✅ Melhor (quando possível)
expect(await screen.findByText('Carregado')).toBeInTheDocument();
```

---

## 📊 Coverage

```bash
npm run test:coverage
```

**vite.config.js:**
```javascript
test: {
  coverage: {
    provider: 'v8',
    reporter: ['text', 'html', 'json'],
    exclude: [
      'node_modules/',
      'src/test/',
      '**/*.test.{js,jsx}',
    ],
  },
}
```

---

## 🎯 Pirâmide de Testes

```
        /\
       /  \      E2E (Poucos)
      /____\     
     /      \    Integration (Médio)
    /________\   
   /          \  Unit (Muitos)
  /__________  \
```

- **Unit:** Componentes isolados, hooks, funções
- **Integration:** Componentes com context, query, router
- **E2E:** Fluxos completos (Playwright, Cypress)

---

## 📚 Recursos

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Docs](https://vitest.dev/)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**🎉 Parabéns! Você concluiu todos os 13 materiais de React avançado!**
