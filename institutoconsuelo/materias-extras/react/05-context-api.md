# 🌍 Context API - Gerenciamento de Estado Global

> *"Evite prop drilling compartilhando estado globalmente"*

---

## 📋 O que é Context API?

API nativa do React para **compartilhar estado entre componentes** sem passar props manualmente em cada nível.

### Problema: Prop Drilling

```javascript
// ❌ Prop drilling (passar props por vários níveis)
function App() {
  const [user, setUser] = useState(null);
  return <Dashboard user={user} setUser={setUser} />;
}

function Dashboard({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />;
}

function Sidebar({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />;
}

function UserMenu({ user, setUser }) {
  return <div>{user?.name}</div>;
}
```

### Solução: Context API

```javascript
// ✅ Context API (acesso direto)
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
}

function UserMenu() {
  const { user } = useContext(UserContext);
  return <div>{user?.name}</div>;
}
```

---

## 🔧 Criando um Context

### Estrutura Básica

**contexts/UserContext.jsx:**
```javascript
import { createContext, useContext, useState } from 'react';

// 1. Criar o Context
const UserContext = createContext();

// 2. Provider Component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    setUser(data.user);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Custom Hook para consumir
export function useUser() {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }
  
  return context;
}
```

### Usando o Context

**main.jsx:**
```javascript
import { UserProvider } from './contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
);
```

**components/Header.jsx:**
```javascript
import { useUser } from '../contexts/UserContext';

export function Header() {
  const { user, logout } = useUser();
  
  if (!user) {
    return <a href="/login">Login</a>;
  }
  
  return (
    <div>
      <span>Olá, {user.name}</span>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

---

## 🎯 Exemplo Completo: Tema (Dark Mode)

**contexts/ThemeContext.jsx:**
```javascript
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Recupera do localStorage
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });
  
  useEffect(() => {
    // Salva no localStorage
    localStorage.setItem('theme', theme);
    
    // Aplica classe no body
    document.body.className = theme;
  }, [theme]);
  
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
```

**components/ThemeToggle.jsx:**
```javascript
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

---

## 🛒 Exemplo Avançado: Carrinho de Compras

**contexts/CartContext.jsx:**
```javascript
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Reducer para gerenciar ações do carrinho
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return { items: [] };
    
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, 
    { items: [] },
    // Inicializa do localStorage
    (initial) => {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : initial;
    }
  );
  
  // Salva no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Computed values
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };
  
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
}
```

**components/ProductCard.jsx:**
```javascript
import { useCart } from '../contexts/CartContext';

export function ProductCard({ product }) {
  const { addItem } = useCart();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>R$ {product.price}</p>
      <button onClick={() => addItem(product)}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
```

**components/CartSummary.jsx:**
```javascript
import { useCart } from '../contexts/CartContext';

export function CartSummary() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  
  if (totalItems === 0) {
    return <p>Carrinho vazio</p>;
  }
  
  return (
    <div>
      <h2>Carrinho ({totalItems} items)</h2>
      
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>R$ {item.price}</span>
          
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            min="1"
          />
          
          <button onClick={() => removeItem(item.id)}>Remover</button>
        </div>
      ))}
      
      <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
    </div>
  );
}
```

---

## 🎭 Múltiplos Contexts

```javascript
// main.jsx
<UserProvider>
  <ThemeProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>
</UserProvider>

// Ou com helper
function AppProviders({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

<AppProviders>
  <App />
</AppProviders>
```

---

## ⚡ Performance: Evitando Re-renders

### Problema: Re-render Desnecessário

```javascript
// ❌ Todo componente que usa o context re-renderiza quando qualquer valor muda
const value = { user, theme, settings };

<AppContext.Provider value={value}>
```

### Solução 1: useMemo

```javascript
import { useMemo } from 'react';

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  // ✅ Memoiza o valor do context
  const value = useMemo(() => ({
    user,
    setUser,
    theme,
    setTheme,
  }), [user, theme]);
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
```

### Solução 2: Separar Contexts

```javascript
// ✅ Melhor: um context para cada responsabilidade
<UserContext.Provider value={userValue}>
  <ThemeContext.Provider value={themeValue}>
    {children}
  </ThemeContext.Provider>
</UserContext.Provider>

// Componentes usam apenas o que precisam
const { user } = useUser(); // Não re-renderiza quando theme muda
const { theme } = useTheme(); // Não re-renderiza quando user muda
```

---

## ✅ Best Practices

### 1. Um Context por Responsabilidade

```javascript
// ✅ Bom
UserContext (user, login, logout)
ThemeContext (theme, toggleTheme)
CartContext (items, addItem, removeItem)

// ❌ Ruim
AppContext (user, theme, cart, settings, ...)
```

### 2. Sempre use Custom Hooks

```javascript
// ✅ Bom
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('...');
  return context;
}

// ❌ Ruim (consumidor precisa importar createContext e useContext)
export const CartContext = createContext();
```

### 3. Colocalize Estado

```javascript
// ✅ Estado local quando possível
function Counter() {
  const [count, setCount] = useState(0); // ✅ Local
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ❌ Não coloque tudo no Context
<AppContext.Provider value={{ counter, setCounter }}>
```

### 4. Use useReducer para Lógica Complexa

```javascript
// ✅ useReducer para estado complexo
const [state, dispatch] = useReducer(cartReducer, initialState);

// ❌ Múltiplos useState relacionados
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
const [count, setCount] = useState(0);
```

---

## 📊 Quando NÃO usar Context API

| Cenário | Usar |
|---------|------|
| Estado local (contador, modal) | `useState` |
| Estado global simples (tema, user) | `Context API` |
| Estado global complexo (muitas ações) | `Zustand` ou `Redux` |
| Estado do servidor (API data) | `React Query` |
| Estado da URL (filtros, paginação) | `useSearchParams` |

---

## 📚 Recursos

- [React Context Docs](https://react.dev/learn/passing-data-deeply-with-context)
- [Kent C. Dodds - Context Best Practices](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

---

**Próximo:** Zustand para Estado Complexo 🐻
