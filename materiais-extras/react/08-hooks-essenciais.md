# ⚓ Hooks Essenciais do React

> *"Domine os hooks fundamentais para dominar React"*

---

## 📋 Hooks Essenciais

1. **useState** - Estado local
2. **useEffect** - Efeitos colaterais
3. **useRef** - Referências mutáveis
4. **useContext** - Consumir Context
5. **useReducer** - Estado complexo
6. **useMemo** - Memoização de valores
7. **useCallback** - Memoização de funções

---

## 🎯 1. useState

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Contador: {count}
    </button>
  );
}

// Função inicializadora (lazy initialization)
const [state, setState] = useState(() => {
  const stored = localStorage.getItem('key');
  return stored ? JSON.parse(stored) : defaultValue;
});

// Atualização baseada no estado anterior
setCount(prevCount => prevCount + 1);

// Múltiplos estados
const [name, setName] = useState('');
const [age, setAge] = useState(0);
const [isLoading, setIsLoading] = useState(false);
```

---

## ⚡ 2. useEffect

```javascript
import { useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  // Executa após cada render
  useEffect(() => {
    console.log('Componente renderizado');
  });
  
  // Executa apenas na montagem
  useEffect(() => {
    console.log('Componente montado');
  }, []);
  
  // Executa quando userId muda
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };
    
    fetchUser();
  }, [userId]);
  
  // Cleanup (desmontagem ou antes de re-executar)
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);
    
    return () => {
      clearInterval(timer); // Cleanup
    };
  }, []);
  
  return <div>{user?.name}</div>;
}
```

### Padrões Comuns

```javascript
// Fetch de dados
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal,
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    }
  };
  
  fetchData();
  
  return () => controller.abort(); // Cancela fetch ao desmontar
}, []);

// Event listeners
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// WebSocket
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080');
  
  ws.onmessage = (event) => {
    setMessages(prev => [...prev, event.data]);
  };
  
  return () => ws.close();
}, []);
```

---

## 🎯 3. useRef

```javascript
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Foca o input ao montar
    inputRef.current?.focus();
  }, []);
  
  return <input ref={inputRef} />;
}

// Armazenar valores mutáveis sem causar re-render
function Timer() {
  const intervalRef = useRef(null);
  const [count, setCount] = useState(0);
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };
  
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={startTimer}>Iniciar</button>
      <button onClick={stopTimer}>Parar</button>
    </div>
  );
}

// Acessar valor anterior
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

function Counter({ count }) {
  const prevCount = usePrevious(count);
  
  return (
    <div>
      Atual: {count}, Anterior: {prevCount}
    </div>
  );
}
```

---

## 🌍 4. useContext

```javascript
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
      }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Alternar Tema
    </button>
  );
}
```

---

## 🔄 5. useReducer

```javascript
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error('Ação desconhecida');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

// Exemplo complexo: Todo List
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    
    default:
      return state;
  }
};

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };
  
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Adicionar</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 💾 6. useMemo

```javascript
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState('');
  
  // ❌ Recalcula toda vez que o componente renderiza
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  // ✅ Recalcula apenas quando items ou filter mudam
  const filteredItems = useMemo(() => {
    console.log('Filtrando items...');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);
  
  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Exemplo: Cálculo pesado
function DataAnalysis({ data }) {
  const stats = useMemo(() => {
    console.log('Calculando estatísticas...');
    return {
      total: data.length,
      sum: data.reduce((acc, n) => acc + n, 0),
      avg: data.reduce((acc, n) => acc + n, 0) / data.length,
      max: Math.max(...data),
      min: Math.min(...data),
    };
  }, [data]);
  
  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Soma: {stats.sum}</p>
      <p>Média: {stats.avg}</p>
      <p>Máximo: {stats.max}</p>
      <p>Mínimo: {stats.min}</p>
    </div>
  );
}
```

---

## 🔁 7. useCallback

```javascript
import { useCallback, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  // ❌ Nova função a cada render (causa re-render do Child)
  const addItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  };
  
  // ✅ Mesma função (Child não re-renderiza se for React.memo)
  const addItem = useCallback(() => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      <Child onAddItem={addItem} />
      <ItemList items={items} />
    </div>
  );
}

const Child = React.memo(({ onAddItem }) => {
  console.log('Child renderizou');
  return <button onClick={onAddItem}>Adicionar Item</button>;
});

// Exemplo com dependências
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const search = useCallback(async () => {
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    setResults(data);
  }, [query]); // Re-cria quando query muda
  
  useEffect(() => {
    if (query) {
      search();
    }
  }, [search, query]);
  
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {results.map(r => <li key={r.id}>{r.name}</li>)}
      </ul>
    </div>
  );
}
```

---

## ✅ Regras dos Hooks

1. **Sempre no top level** (não dentro de condicionais/loops)
2. **Apenas em componentes React ou custom hooks**
3. **Ordem importa** (mesma ordem em cada render)

```javascript
// ❌ Errado
if (condition) {
  const [state, setState] = useState(0);
}

// ❌ Errado
for (let i = 0; i < 10; i++) {
  useEffect(() => {}, []);
}

// ✅ Correto
const [state, setState] = useState(0);

if (condition) {
  setState(10);
}
```

---

## 🎯 Quando Usar Cada Hook?

| Hook | Quando usar |
|------|-------------|
| `useState` | Estado local simples |
| `useEffect` | Side effects (fetch, subscriptions, DOM) |
| `useRef` | Valores mutáveis, acessar DOM |
| `useContext` | Consumir Context API |
| `useReducer` | Estado complexo com múltiplas ações |
| `useMemo` | Cálculos pesados |
| `useCallback` | Evitar re-renders de componentes filhos |

---

## 📚 Recursos

- [React Hooks Docs](https://react.dev/reference/react)
- [React Hooks Cheat Sheet](https://react-hooks-cheatsheet.com/)

---

**Próximo:** Performance com useCallback, useMemo e React.memo 🚀
