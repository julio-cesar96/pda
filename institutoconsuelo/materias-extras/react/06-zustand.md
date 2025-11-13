# 🐻 Zustand - Gerenciamento de Estado Simplificado

> *"State management sem boilerplate"*

---

## 📋 O que é Zustand?

Biblioteca **minimalista** para gerenciamento de estado global no React.

### Por que Zustand?

| Aspecto | Context API | Zustand | Redux |
|---------|-------------|---------|-------|
| **Boilerplate** | Médio | Mínimo | Alto |
| **Performance** | 🟡 | 🟢 | 🟢 |
| **Devtools** | ❌ | ✅ | ✅ |
| **Middleware** | ❌ | ✅ | ✅ |
| **Curva de Aprendizado** | Fácil | Fácil | Difícil |
| **Bundle Size** | 0kb | ~1kb | ~10kb |

---

## 📦 Instalação

```bash
npm install zustand
```

---

## 🎯 Store Básica

```javascript
// stores/userStore.js
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  // Estado
  user: null,
  isLoading: false,
  
  // Ações
  login: async (credentials) => {
    set({ isLoading: true });
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      
      set({ user: data.user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
  
  logout: () => set({ user: null }),
  
  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  })),
}));
```

### Usando a Store

```javascript
import { useUserStore } from './stores/userStore';

function Header() {
  // Seleciona apenas o que precisa (evita re-renders)
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  
  if (!user) return <a href="/login">Login</a>;
  
  return (
    <div>
      <span>Olá, {user.name}</span>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

function LoginForm() {
  const login = useUserStore((state) => state.login);
  const isLoading = useUserStore((state) => state.isLoading);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" />
      <input type="password" />
      <button disabled={isLoading}>
        {isLoading ? 'Carregando...' : 'Entrar'}
      </button>
    </form>
  );
}
```

---

## 🛒 Exemplo: Carrinho de Compras

```javascript
// stores/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Computed values (getters)
      get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      get totalPrice() {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
      
      // Actions
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        
        return {
          items: [...state.items, { ...product, quantity: 1 }],
        };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId),
      })),
      
      updateQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          return {
            items: state.items.filter(item => item.id !== productId),
          };
        }
        
        return {
          items: state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        };
      }),
      
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // Nome no localStorage
    }
  )
);
```

### Usando a Cart Store

```javascript
function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  
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

function CartIcon() {
  // Re-renderiza apenas quando totalItems muda
  const totalItems = useCartStore((state) => state.totalItems);
  
  return (
    <button>
      🛒 {totalItems > 0 && <span>{totalItems}</span>}
    </button>
  );
}

function CartSummary() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
          />
          <button onClick={() => removeItem(item.id)}>X</button>
        </div>
      ))}
      <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
    </div>
  );
}
```

---

## ⚙️ Middleware: Persist (LocalStorage)

```javascript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'light',
      language: 'pt-BR',
      notifications: true,
      
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleNotifications: () => set((state) => ({
        notifications: !state.notifications
      })),
    }),
    {
      name: 'app-settings', // Nome no localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

---

## 🔍 Devtools

```javascript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useUserStore = create(
  devtools(
    (set) => ({
      user: null,
      login: (user) => set({ user }, false, 'user/login'),
      logout: () => set({ user: null }, false, 'user/logout'),
    }),
    { name: 'UserStore' }
  )
);
```

Abra o **Redux DevTools** no navegador para ver as ações!

---

## 🎭 Múltiplas Stores

```javascript
// stores/userStore.js
export const useUserStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// stores/cartStore.js
export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
}));

// stores/themeStore.js
export const useThemeStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}));

// Uso
function App() {
  const user = useUserStore((state) => state.user);
  const theme = useThemeStore((state) => state.theme);
  const totalItems = useCartStore((state) => state.totalItems);
  
  return <div className={theme}>...</div>;
}
```

---

## 🔄 Acessar Store Fora do React

```javascript
// stores/cartStore.js
export const useCartStore = create((set, get) => ({
  items: [],
  
  checkout: async () => {
    const items = get().items; // ✅ Acessa estado atual
    
    await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
    
    set({ items: [] });
  },
}));

// Fora de componente
import { useCartStore } from './stores/cartStore';

async function handleCheckout() {
  const checkout = useCartStore.getState().checkout;
  await checkout();
}

// Ou subscribe para mudanças
const unsubscribe = useCartStore.subscribe(
  (state) => state.items,
  (items) => {
    console.log('Items changed:', items);
  }
);
```

---

## 🎨 Padrões Avançados

### Slices (Dividir Store Grande)

```javascript
// stores/slices/userSlice.js
export const createUserSlice = (set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
});

// stores/slices/cartSlice.js
export const createCartSlice = (set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
});

// stores/appStore.js
import { create } from 'zustand';
import { createUserSlice } from './slices/userSlice';
import { createCartSlice } from './slices/cartSlice';

export const useAppStore = create((...args) => ({
  ...createUserSlice(...args),
  ...createCartSlice(...args),
}));
```

### Immer (Mutações Imutáveis)

```javascript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useTodosStore = create(
  immer((set) => ({
    todos: [],
    
    addTodo: (text) => set((state) => {
      state.todos.push({ id: Date.now(), text, done: false });
      // ✅ Immer permite "mutação" direta
    }),
    
    toggleTodo: (id) => set((state) => {
      const todo = state.todos.find(t => t.id === id);
      if (todo) todo.done = !todo.done;
    }),
  }))
);
```

---

## ⚡ Performance: Seletores

### Problema: Re-render Desnecessário

```javascript
// ❌ Re-renderiza quando qualquer coisa na store muda
const store = useCartStore();

// ❌ Re-renderiza mesmo se items não mudar
const { items, totalPrice } = useCartStore();
```

### Solução: Selecionar Apenas o Necessário

```javascript
// ✅ Re-renderiza apenas quando items muda
const items = useCartStore((state) => state.items);

// ✅ Re-renderiza apenas quando totalPrice muda
const totalPrice = useCartStore((state) => state.totalPrice);

// ✅ Ou use shallow equality
import { shallow } from 'zustand/shallow';

const { items, totalPrice } = useCartStore(
  (state) => ({ items: state.items, totalPrice: state.totalPrice }),
  shallow
);
```

---

## ✅ Best Practices

### 1. Uma Store por Domínio

```javascript
// ✅ Bom
useUserStore (user, login, logout)
useCartStore (items, addItem, removeItem)
useThemeStore (theme, toggleTheme)

// ❌ Ruim
useAppStore (user, cart, theme, settings, ...)
```

### 2. Coloque Lógica nas Actions

```javascript
// ✅ Lógica na store
const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => {
    // Lógica aqui
    const existing = state.items.find(i => i.id === product.id);
    if (existing) {
      return { items: state.items.map(...) };
    }
    return { items: [...state.items, product] };
  }),
}));

// ❌ Lógica no componente
function ProductCard() {
  const items = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);
  
  const addToCart = (product) => {
    const existing = items.find(i => i.id === product.id);
    // ❌ Lógica repetida em vários componentes
  };
}
```

### 3. Use TypeScript

```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) => set((state) => ({
    items: [...state.items, { ...product, quantity: 1 }]
  })),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),
}));
```

---

## 📊 Zustand vs Context API

```javascript
// Context API (mais boilerplate)
const CartContext = createContext();
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addItem = (item) => setItems([...items, item]);
  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}

// Zustand (mais simples)
export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));
```

---

## 📚 Recursos

- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

---

**Próximo:** React Hook Form + Zod 📝
