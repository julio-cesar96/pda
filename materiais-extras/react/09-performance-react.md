# 🚀 Performance em React - useCallback, useMemo, React.memo

> *"Otimize apenas quando necessário"*

---

## 📋 Introdução

**Regra de Ouro:** Otimize apenas quando houver problemas de performance reais.

### Ferramentas de Diagnóstico

1. **React DevTools Profiler**
2. **Chrome Performance Tab**
3. **why-did-you-render** (biblioteca)

---

## 🔍 React.memo - Evitar Re-renders

```javascript
import React from 'react';

// ❌ Re-renderiza toda vez que o pai renderiza
function ExpensiveComponent({ data }) {
  console.log('Renderizou ExpensiveComponent');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// ✅ Re-renderiza apenas quando `data` muda
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  console.log('Renderizou ExpensiveComponent');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

// Exemplo de uso
function Parent() {
  const [count, setCount] = useState(0);
  const data = [{ id: 1, name: 'Item 1' }];
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* ExpensiveComponent NÃO re-renderiza quando count muda */}
      <ExpensiveComponent data={data} />
    </div>
  );
}
```

### Custom Comparison

```javascript
const ProductCard = React.memo(
  ({ product }) => {
    return (
      <div>
        <h3>{product.name}</h3>
        <p>R$ {product.price}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Retorna true se as props são IGUAIS (não re-renderizar)
    return prevProps.product.id === nextProps.product.id &&
           prevProps.product.price === nextProps.product.price;
  }
);
```

---

## 💾 useMemo - Memoizar Valores

```javascript
import { useMemo, useState } from 'react';

function ProductList({ products }) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  // ❌ Recalcula a cada render
  const processedProducts = products
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  
  // ✅ Recalcula apenas quando products, filter ou sortBy mudam
  const processedProducts = useMemo(() => {
    console.log('Processando produtos...');
    return products
      .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [products, filter, sortBy]);
  
  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Nome</option>
        <option value="price">Preço</option>
      </select>
      
      <ul>
        {processedProducts.map(product => (
          <li key={product.id}>{product.name} - R$ {product.price}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Exemplo: Cálculos Pesados

```javascript
function DataDashboard({ data }) {
  // ✅ Memoiza estatísticas complexas
  const statistics = useMemo(() => {
    console.log('Calculando estatísticas...');
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const average = total / data.length;
    const max = Math.max(...data.map(item => item.value));
    const min = Math.min(...data.map(item => item.value));
    
    // Cálculo pesado: desvio padrão
    const variance = data.reduce((sum, item) => 
      sum + Math.pow(item.value - average, 2), 0
    ) / data.length;
    const stdDev = Math.sqrt(variance);
    
    return { total, average, max, min, stdDev };
  }, [data]);
  
  return (
    <div>
      <p>Total: {statistics.total}</p>
      <p>Média: {statistics.average.toFixed(2)}</p>
      <p>Máximo: {statistics.max}</p>
      <p>Mínimo: {statistics.min}</p>
      <p>Desvio Padrão: {statistics.stdDev.toFixed(2)}</p>
    </div>
  );
}
```

---

## 🔁 useCallback - Memoizar Funções

```javascript
import { useCallback, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  // ❌ Nova função a cada render (causa re-render de Child)
  const handleAddItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  };
  
  // ✅ Mesma referência da função
  const handleAddItem = useCallback(() => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  }, []); // Sem dependências, função nunca muda
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      {/* Child só re-renderiza quando handleAddItem muda */}
      <AddButton onAdd={handleAddItem} />
      
      <ItemList items={items} />
    </div>
  );
}

const AddButton = React.memo(({ onAdd }) => {
  console.log('AddButton renderizou');
  return <button onClick={onAdd}>Adicionar Item</button>;
});
```

### Exemplo: Debounce Search

```javascript
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  // ✅ Debounced search memoizado
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      const response = await fetch(`/api/search?q=${searchQuery}`);
      const data = await response.json();
      setResults(data);
    }, 500),
    []
  );
  
  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);
  
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

// Debounce helper
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
```

---

## 🎯 Exemplo Completo: Otimização de Lista

```javascript
import { useState, useMemo, useCallback } from 'react';

function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  // ✅ Filtragem e ordenação memoizadas
  const filteredProducts = useMemo(() => {
    console.log('Filtrando produtos...');
    return products.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);
  
  const sortedProducts = useMemo(() => {
    console.log('Ordenando produtos...');
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });
  }, [filteredProducts, sortBy]);
  
  // ✅ Callbacks memoizados
  const handleDelete = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);
  
  const handleToggleFavorite = useCallback((id) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, favorite: !p.favorite } : p
    ));
  }, []);
  
  return (
    <div>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        placeholder="Filtrar..."
      />
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Nome</option>
        <option value="price">Preço</option>
      </select>
      
      <div>
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

// ✅ Componente memoizado
const ProductCard = React.memo(({ product, onDelete, onToggleFavorite }) => {
  console.log(`Renderizou ProductCard ${product.id}`);
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>R$ {product.price}</p>
      
      <button onClick={() => onToggleFavorite(product.id)}>
        {product.favorite ? '❤️' : '🤍'}
      </button>
      
      <button onClick={() => onDelete(product.id)}>
        Deletar
      </button>
    </div>
  );
});
```

---

## ⚠️ Quando NÃO Otimizar

```javascript
// ❌ NÃO otimize cálculos simples
const doubled = useMemo(() => count * 2, [count]); // Overhead desnecessário

// ✅ Apenas calcule
const doubled = count * 2;

// ❌ NÃO memoize tudo
const ExpensiveComponent = React.memo(({ text }) => {
  return <p>{text}</p>; // Componente simples, não precisa
});

// ❌ NÃO use useCallback para funções inline simples
<button onClick={useCallback(() => setCount(count + 1), [count])}>
  Incrementar
</button>

// ✅ Inline direto (mais performático)
<button onClick={() => setCount(count + 1)}>
  Incrementar
</button>
```

---

## 📊 Checklist de Otimização

| Situação | Otimização |
|----------|------------|
| Componente renderiza frequentemente | `React.memo` |
| Cálculo pesado em render | `useMemo` |
| Função passada como prop para componente memoizado | `useCallback` |
| Lista grande de itens | Virtualização (react-window) |
| Estado global que muda muito | Dividir em múltiplos contexts |
| Imagens grandes | Lazy loading, WebP |

---

## 🛠️ Ferramentas de Profiling

### React DevTools Profiler

```javascript
// Envolva componente para medir performance
import { Profiler } from 'react';

function App() {
  return (
    <Profiler id="App" onRender={(id, phase, actualDuration) => {
      console.log(`${id} took ${actualDuration}ms to render`);
    }}>
      <MyComponent />
    </Profiler>
  );
}
```

### why-did-you-render

```bash
npm install @welldone-software/why-did-you-render
```

```javascript
// wdyr.js
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// Componente
MyComponent.whyDidYouRender = true;
```

---

## ✅ Best Practices

1. **Meça antes de otimizar** (use Profiler)
2. **Otimize de cima para baixo** (componentes pais primeiro)
3. **Memoize apenas cálculos pesados**
4. **Use keys estáveis em listas**
5. **Virtualize listas grandes** (react-window)
6. **Code splitting** (React.lazy, Suspense)

---

## 📚 Recursos

- [React Performance Docs](https://react.dev/learn/render-and-commit)
- [React Profiler](https://react.dev/reference/react/Profiler)

---

**Próximo:** Custom Hooks 🎣
