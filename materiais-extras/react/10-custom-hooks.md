# 🎣 Custom Hooks - Reutilize Lógica

> *"Extraia lógica repetida em hooks reutilizáveis"*

---

## 📋 O que são Custom Hooks?

Funções que **usam hooks do React** e **encapsulam lógica reutilizável**.

### Regras

1. Nome começa com `use` (ex: `useForm`, `useFetch`)
2. Podem usar outros hooks
3. Retornam valores/funções necessários

---

## 🎯 1. useLocalStorage

```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Inicializa com valor do localStorage
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Salva no localStorage quando valor muda
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);
  
  return [value, setValue];
}

// Uso
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [user, setUser] = useLocalStorage('user', null);
  
  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Alternar Tema
      </button>
    </div>
  );
}
```

---

## 🌐 2. useFetch

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    return () => controller.abort();
  }, [url]);
  
  return { data, loading, error };
}

// Uso
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  
  return <div>{user.name}</div>;
}
```

---

## 📱 3. useWindowSize

```javascript
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

// Uso
function ResponsiveComponent() {
  const { width } = useWindowSize();
  
  return (
    <div>
      {width < 768 ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

---

## 🔍 4. useDebounce

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Uso
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (debouncedQuery) {
      fetch(`/api/search?q=${debouncedQuery}`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [debouncedQuery]);
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Buscar..."
      />
      <ul>
        {results.map(r => <li key={r.id}>{r.name}</li>)}
      </ul>
    </div>
  );
}
```

---

## ⏱️ 5. useInterval

```javascript
import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  // Salva callback mais recente
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // Configura interval
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);
      
      return () => clearInterval(id);
    }
  }, [delay]);
}

// Uso
function Timer() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  
  useInterval(() => {
    setCount(count + 1);
  }, isRunning ? 1000 : null);
  
  return (
    <div>
      <p>{count}s</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pausar' : 'Iniciar'}
      </button>
    </div>
  );
}
```

---

## 👀 6. useOnScreen (Intersection Observer)

```javascript
import { useState, useEffect, useRef } from 'react';

function useOnScreen(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);
  
  return [ref, isVisible];
}

// Uso: Lazy loading de imagens
function LazyImage({ src, alt }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div ref={ref} style={{ minHeight: '200px' }}>
      {isVisible ? (
        <img src={src} alt={alt} />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
```

---

## 📋 7. useForm

```javascript
import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };
  
  const validate = (validationRules) => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field];
      const value = values[field];
      
      if (rule.required && !value) {
        newErrors[field] = 'Campo obrigatório';
      } else if (rule.minLength && value.length < rule.minLength) {
        newErrors[field] = `Mínimo ${rule.minLength} caracteres`;
      } else if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[field] = rule.message || 'Formato inválido';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return { values, errors, handleChange, reset, validate };
}

// Uso
function SignupForm() {
  const { values, errors, handleChange, reset, validate } = useForm({
    name: '',
    email: '',
    password: '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = validate({
      name: { required: true, minLength: 3 },
      email: { 
        required: true, 
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Email inválido',
      },
      password: { required: true, minLength: 8 },
    });
    
    if (isValid) {
      console.log('Formulário válido:', values);
      reset();
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name" 
        value={values.name} 
        onChange={handleChange} 
        placeholder="Nome"
      />
      {errors.name && <span>{errors.name}</span>}
      
      <input 
        name="email" 
        value={values.email} 
        onChange={handleChange} 
        placeholder="Email"
      />
      {errors.email && <span>{errors.email}</span>}
      
      <input 
        name="password" 
        type="password" 
        value={values.password} 
        onChange={handleChange} 
        placeholder="Senha"
      />
      {errors.password && <span>{errors.password}</span>}
      
      <button type="submit">Cadastrar</button>
      <button type="button" onClick={reset}>Limpar</button>
    </form>
  );
}
```

---

## 🎨 8. useToggle

```javascript
import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle, setValue];
}

// Uso
function Menu() {
  const [isOpen, toggleMenu, setIsOpen] = useToggle(false);
  
  return (
    <div>
      <button onClick={toggleMenu}>Menu</button>
      {isOpen && (
        <nav>
          <a href="/home">Home</a>
          <a href="/about">Sobre</a>
        </nav>
      )}
    </div>
  );
}
```

---

## 🔄 9. usePrevious

```javascript
import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Uso
function Counter({ count }) {
  const prevCount = usePrevious(count);
  
  return (
    <div>
      <p>Atual: {count}</p>
      <p>Anterior: {prevCount}</p>
      <p>
        {count > prevCount ? '📈 Aumentou' : 
         count < prevCount ? '📉 Diminuiu' : 
         '➡️ Igual'}
      </p>
    </div>
  );
}
```

---

## 📡 10. useWebSocket

```javascript
import { useState, useEffect, useRef } from 'react';

function useWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  
  useEffect(() => {
    ws.current = new WebSocket(url);
    
    ws.current.onopen = () => {
      setIsConnected(true);
    };
    
    ws.current.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };
    
    ws.current.onclose = () => {
      setIsConnected(false);
    };
    
    return () => {
      ws.current?.close();
    };
  }, [url]);
  
  const sendMessage = (message) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };
  
  return { messages, isConnected, sendMessage };
}

// Uso
function Chat() {
  const { messages, isConnected, sendMessage } = useWebSocket('ws://localhost:8080');
  const [input, setInput] = useState('');
  
  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };
  
  return (
    <div>
      <p>Status: {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}</p>
      
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend} disabled={!isConnected}>
        Enviar
      </button>
    </div>
  );
}
```

---

## ✅ Best Practices

1. **Nome sempre com `use`**
2. **Um hook, uma responsabilidade**
3. **Documente com JSDoc**
4. **Retorne objeto ou array**
5. **TypeScript para type safety**

```typescript
/**
 * Hook para debounce de valores
 * @param value - Valor para fazer debounce
 * @param delay - Delay em milissegundos (padrão: 500)
 * @returns Valor com debounce aplicado
 */
function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}
```

---

## 📚 Recursos

- [React Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [usehooks.com](https://usehooks.com/)
- [useHooks TS](https://usehooks-ts.com/)

---

**Próximo:** React Query - Estado de Servidor 🔄
