# 🔄 React Query - Gerenciamento de Estado do Servidor

> *"Gerencie dados de API com cache, sincronização e muito mais"*

---

## 📋 Por que React Query?

### Problema: Fetch Manual

```javascript
// ❌ Muito código repetitivo
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

### Solução: React Query

```javascript
// ✅ Simples, com cache, refetch automático, etc.
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json()),
});
```

---

## 📦 Instalação

```bash
npm install @tanstack/react-query
npm install -D @tanstack/react-query-devtools
```

---

## 🚀 Setup Inicial

```javascript
// main.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 10, // 10 minutos
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
```

---

## 🔍 useQuery - Buscar Dados

### Básico

```javascript
import { useQuery } from '@tanstack/react-query';

function UsersList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      return response.json();
    },
  });
  
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Com Parâmetros

```javascript
function UserProfile({ userId }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['users', userId], // Cache separado por userId
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json();
    },
    enabled: !!userId, // Só executa se userId existir
  });
  
  if (isLoading) return <p>Carregando...</p>;
  
  return <div>{user.name}</div>;
}
```

### Estados Adicionais

```javascript
const { 
  data, 
  isLoading,        // Carregando pela primeira vez
  isFetching,       // Buscando dados (incluindo refetch)
  isError, 
  error,
  isSuccess,
  refetch,          // Função para forçar refetch
  dataUpdatedAt,    // Timestamp da última atualização
} = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});

// Exemplo de uso
<div>
  {isLoading && <p>Carregando...</p>}
  {isFetching && !isLoading && <p>Atualizando...</p>}
  {isError && <p>Erro: {error.message}</p>}
  {isSuccess && data.map(product => <ProductCard key={product.id} product={product} />)}
  
  <button onClick={() => refetch()}>Atualizar</button>
</div>
```

---

## ✏️ useMutation - Modificar Dados

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateProductForm() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalida e refetch a lista de produtos
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name: 'Produto Novo', price: 100 });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Salvando...' : 'Salvar'}
      </button>
      
      {mutation.isError && <p>Erro: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Produto criado com sucesso!</p>}
    </form>
  );
}
```

### Mutation Completa (CRUD)

```javascript
function ProductsManager() {
  const queryClient = useQueryClient();
  
  // CREATE
  const createMutation = useMutation({
    mutationFn: (newProduct) => fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  
  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }) => fetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }).then(res => res.json()),
    onSuccess: (data, variables) => {
      // Atualiza cache específico
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  
  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id) => fetch(`/api/products/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  
  return (
    <div>
      <button onClick={() => createMutation.mutate({ name: 'Novo' })}>
        Criar
      </button>
      <button onClick={() => updateMutation.mutate({ id: 1, name: 'Atualizado' })}>
        Atualizar
      </button>
      <button onClick={() => deleteMutation.mutate(1)}>
        Deletar
      </button>
    </div>
  );
}
```

---

## 🔄 Otimistic Updates

```javascript
const updateMutation = useMutation({
  mutationFn: async (updatedProduct) => {
    const response = await fetch(`/api/products/${updatedProduct.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
    });
    return response.json();
  },
  
  // Antes de enviar para servidor
  onMutate: async (updatedProduct) => {
    // Cancela refetches em andamento
    await queryClient.cancelQueries({ queryKey: ['products'] });
    
    // Snapshot do valor anterior
    const previousProducts = queryClient.getQueryData(['products']);
    
    // Atualiza cache otimisticamente
    queryClient.setQueryData(['products'], (old) => 
      old.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    
    // Retorna contexto para rollback
    return { previousProducts };
  },
  
  // Se der erro, reverte
  onError: (err, updatedProduct, context) => {
    queryClient.setQueryData(['products'], context.previousProducts);
  },
  
  // Sempre refetch depois
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
});
```

---

## 📄 Paginação

```javascript
function ProductsList() {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      const response = await fetch(`/api/products?page=${page}&limit=10`);
      return response.json();
    },
    placeholderData: (previousData) => previousData, // Mantém dados antigos enquanto carrega novos
  });
  
  return (
    <div>
      <ul>
        {data?.products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      
      <div>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
        >
          Anterior
        </button>
        
        <span>Página {page}</span>
        
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
```

---

## 🔄 Infinite Scroll

```javascript
import { useInfiniteQuery } from '@tanstack/react-query';

function InfiniteProductsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/products?page=${pageParam}`);
      return response.json();
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });
  
  return (
    <div>
      <ul>
        {data?.pages.map((page) => 
          page.products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))
        )}
      </ul>
      
      <button 
        onClick={() => fetchNextPage()} 
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Carregando...' : 
         hasNextPage ? 'Carregar Mais' : 
         'Sem mais produtos'}
      </button>
    </div>
  );
}
```

---

## 🎯 Prefetching

```javascript
function ProductsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  
  const { data } = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page),
  });
  
  // Prefetch próxima página
  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['products', page + 1],
        queryFn: () => fetchProducts(page + 1),
      });
    }
  }, [data, page, queryClient]);
  
  // Prefetch ao hover
  const handleMouseEnter = (productId) => {
    queryClient.prefetchQuery({
      queryKey: ['products', productId],
      queryFn: () => fetchProduct(productId),
    });
  };
  
  return (
    <div>
      {data?.products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
          onMouseEnter={() => handleMouseEnter(product.id)}
        />
      ))}
    </div>
  );
}
```

---

## 📡 Polling / Refetch Automático

```javascript
const { data } = useQuery({
  queryKey: ['orders'],
  queryFn: fetchOrders,
  refetchInterval: 5000, // Refetch a cada 5 segundos
  refetchIntervalInBackground: true, // Continua refetchando mesmo em background
});

// Ou apenas quando ativo
const { data } = useQuery({
  queryKey: ['notifications'],
  queryFn: fetchNotifications,
  refetchInterval: (data) => {
    // Para de refetchar se não houver notificações
    return data?.hasUnread ? 3000 : false;
  },
});
```

---

## 🎨 API Helper

```javascript
// api/products.js
const api = {
  fetchProducts: async () => {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return response.json();
  },
  
  fetchProduct: async (id) => {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) throw new Error('Produto não encontrado');
    return response.json();
  },
  
  createProduct: async (product) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response.json();
  },
  
  updateProduct: async ({ id, ...product }) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response.json();
  },
  
  deleteProduct: async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
  },
};

export default api;

// Uso
import { useQuery, useMutation } from '@tanstack/react-query';
import api from './api/products';

const { data } = useQuery({
  queryKey: ['products'],
  queryFn: api.fetchProducts,
});

const mutation = useMutation({
  mutationFn: api.createProduct,
});
```

---

## ✅ Best Practices

1. **Use queryKey consistente**
```javascript
// ✅ Bom
['products']
['products', productId]
['products', { category: 'electronics' }]

// ❌ Ruim
['getProducts']
['product' + productId]
```

2. **Invalide queries relacionadas**
```javascript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalida todas as queries de produtos
  queryClient.invalidateQueries({ queryKey: ['products', productId] }); // Específica
}
```

3. **Configure staleTime e cacheTime**
```javascript
{
  staleTime: 1000 * 60 * 5,  // Dados considerados frescos por 5 minutos
  cacheTime: 1000 * 60 * 10, // Cache mantido por 10 minutos
}
```

4. **Use TypeScript**
```typescript
const { data } = useQuery<Product[]>({
  queryKey: ['products'],
  queryFn: fetchProducts,
});
```

---

## 📚 Recursos

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Query Examples](https://tanstack.com/query/latest/docs/react/examples/react/simple)

---

**Próximo:** Design Patterns em React 🎨
