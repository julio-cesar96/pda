# 🛣️ React Router + Gerenciamento de Estado via URL

> *"URLs são o estado mais importante da sua aplicação"*

---

## 📋 Índice

1. [Por que React Router?](#por-que-react-router)
2. [Instalação e Setup](#instalação)
3. [Rotas Básicas](#rotas-básicas)
4. [Navegação](#navegação)
5. [Parâmetros de Rota](#parâmetros)
6. [Query Parameters](#query-parameters)
7. [Rotas Aninhadas](#rotas-aninhadas)
8. [Proteção de Rotas](#proteção-de-rotas)
9. [Loader e Actions](#loader-e-actions)
10. [Best Practices](#best-practices)

---

## 🎯 Por que React Router?

SPAs (Single Page Applications) precisam de **roteamento client-side** para:

- ✅ Navegação sem reload da página
- ✅ URLs compartilháveis
- ✅ Histórico do navegador (voltar/avançar)
- ✅ SEO (com Server-Side Rendering)
- ✅ **Estado via URL** (filtros, paginação, etc.)

---

## 📦 Instalação

```bash
npm install react-router-dom
```

---

## 🗺️ Rotas Básicas

### Setup Simples

**main.jsx:**
```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
```

**App.jsx:**
```javascript
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">Sobre</Link>
        <Link to="/contact">Contato</Link>
      </nav>
      
      <main>
        <Outlet /> {/* Renderiza a rota filha */}
      </main>
    </div>
  );
}
```

---

## 🧭 Navegação

### Link vs NavLink

```javascript
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* Link básico */}
      <Link to="/products">Produtos</Link>
      
      {/* NavLink com classe ativa */}
      <NavLink 
        to="/products" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Produtos
      </NavLink>
      
      {/* NavLink com estilo inline */}
      <NavLink
        to="/products"
        style={({ isActive }) => ({
          color: isActive ? 'blue' : 'black',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
      >
        Produtos
      </NavLink>
    </nav>
  );
}
```

### Navegação Programática

```javascript
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await login(credentials);
      
      // Redireciona após login
      navigate('/dashboard');
      
      // Ou redireciona e substitui no histórico
      navigate('/dashboard', { replace: true });
      
      // Ou volta para página anterior
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## 🔗 Parâmetros de Rota

### Definindo Parâmetros

```javascript
<Routes>
  <Route path="/products/:productId" element={<ProductDetails />} />
  <Route path="/users/:userId/posts/:postId" element={<PostDetails />} />
</Routes>
```

### Lendo Parâmetros

```javascript
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };
    
    fetchProduct();
  }, [productId]);
  
  if (!product) return <p>Carregando...</p>;
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>R$ {product.price}</p>
    </div>
  );
}
```

---

## 🔍 Query Parameters (Estado na URL)

### Lendo Query Params

```javascript
import { useSearchParams } from 'react-router-dom';

function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Ler valores
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'name';
  const page = Number(searchParams.get('page')) || 1;
  
  // URL: /products?category=electronics&sort=price&page=2
  
  return (
    <div>
      <h1>Produtos - {category}</h1>
      <p>Ordenar por: {sort}</p>
      <p>Página: {page}</p>
    </div>
  );
}
```

### Atualizando Query Params

```javascript
function ProductsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleCategoryChange = (category) => {
    // Atualiza apenas o parâmetro `category`, mantém os outros
    setSearchParams(prev => {
      prev.set('category', category);
      return prev;
    });
  };
  
  const handleSortChange = (sort) => {
    setSearchParams(prev => {
      prev.set('sort', sort);
      prev.set('page', '1'); // Reset pagination
      return prev;
    });
  };
  
  const clearFilters = () => {
    setSearchParams({});
  };
  
  return (
    <div>
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="all">Todas</option>
        <option value="electronics">Eletrônicos</option>
        <option value="clothing">Roupas</option>
      </select>
      
      <select onChange={(e) => handleSortChange(e.target.value)}>
        <option value="name">Nome</option>
        <option value="price">Preço</option>
      </select>
      
      <button onClick={clearFilters}>Limpar Filtros</button>
    </div>
  );
}
```

### Exemplo Completo: Tabela com Filtros

```javascript
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  
  // Ler parâmetros da URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const page = Number(searchParams.get('page')) || 1;
  const limit = 10;
  
  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams({
        search,
        category: category === 'all' ? '' : category,
        page,
        limit,
      });
      
      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products);
    };
    
    fetchProducts();
  }, [search, category, page]);
  
  const handleSearchChange = (value) => {
    setSearchParams(prev => {
      prev.set('search', value);
      prev.set('page', '1');
      return prev;
    });
  };
  
  const handleCategoryChange = (value) => {
    setSearchParams(prev => {
      prev.set('category', value);
      prev.set('page', '1');
      return prev;
    });
  };
  
  const handlePageChange = (newPage) => {
    setSearchParams(prev => {
      prev.set('page', String(newPage));
      return prev;
    });
  };
  
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Buscar produtos..."
      />
      
      <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="all">Todas</option>
        <option value="electronics">Eletrônicos</option>
        <option value="clothing">Roupas</option>
      </select>
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>R$ {product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={() => handlePageChange(page + 1)}>
          Próxima
        </button>
      </div>
    </div>
  );
}
```

---

## 🌳 Rotas Aninhadas

```javascript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    
    <Route path="products" element={<ProductsLayout />}>
      <Route index element={<ProductsList />} />
      <Route path=":productId" element={<ProductDetails />} />
      <Route path="new" element={<NewProduct />} />
    </Route>
    
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
```

**ProductsLayout.jsx:**
```javascript
import { Outlet, NavLink } from 'react-router-dom';

export default function ProductsLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/products">Lista</NavLink>
        <NavLink to="/products/new">Novo Produto</NavLink>
      </nav>
      
      <Outlet /> {/* Renderiza ProductsList, ProductDetails ou NewProduct */}
    </div>
  );
}
```

---

## 🔒 Proteção de Rotas

### PrivateRoute Component

```javascript
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function PrivateRoute() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

// Uso
<Routes>
  <Route path="/login" element={<LoginPage />} />
  
  <Route element={<PrivateRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
</Routes>
```

### Redirecionamento com Estado

```javascript
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Página que o usuário tentou acessar
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleLogin = async () => {
    await login();
    navigate(from, { replace: true });
  };
  
  return <button onClick={handleLogin}>Login</button>;
}

// Ao redirecionar para login, salve a página original
function PrivateRoute() {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
}
```

---

## 📥 Loader e Actions (React Router v6.4+)

### Loader (Carregar Dados)

```javascript
import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom';

// Loader: carrega dados antes de renderizar
const productLoader = async ({ params }) => {
  const response = await fetch(`/api/products/${params.productId}`);
  if (!response.ok) {
    throw new Response('Not Found', { status: 404 });
  }
  return response.json();
};

// Componente usa os dados
function ProductDetails() {
  const product = useLoaderData();
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

// Router com loader
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'products/:productId',
        element: <ProductDetails />,
        loader: productLoader,
      },
    ],
  },
]);

// App
function Root() {
  return <RouterProvider router={router} />;
}
```

### Actions (Submeter Dados)

```javascript
import { Form, redirect } from 'react-router-dom';

// Action: processa formulário
const createProductAction = async ({ request }) => {
  const formData = await request.formData();
  const product = {
    name: formData.get('name'),
    price: formData.get('price'),
  };
  
  await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  
  return redirect('/products');
};

// Componente com Form
function NewProduct() {
  return (
    <Form method="post">
      <input type="text" name="name" required />
      <input type="number" name="price" required />
      <button type="submit">Criar</button>
    </Form>
  );
}

// Router
const router = createBrowserRouter([
  {
    path: 'products/new',
    element: <NewProduct />,
    action: createProductAction,
  },
]);
```

---

## ✅ Best Practices

### 1. Use Query Params para Estado Compartilhável

```javascript
// ✅ Estado na URL (compartilhável, bookmarkable)
const [searchParams] = useSearchParams();
const filters = {
  category: searchParams.get('category'),
  sort: searchParams.get('sort'),
};

// ❌ Estado local (perde ao recarregar)
const [filters, setFilters] = useState({ category: 'all' });
```

### 2. Reset ao Mudar Filtros

```javascript
const handleFilterChange = (key, value) => {
  setSearchParams(prev => {
    prev.set(key, value);
    prev.set('page', '1'); // ✅ Reset paginação
    return prev;
  });
};
```

### 3. Sincronize URL com Estado

```javascript
useEffect(() => {
  const category = searchParams.get('category');
  // Atualiza estado local baseado na URL
  setSelectedCategory(category || 'all');
}, [searchParams]);
```

### 4. Organize Rotas em Arquivo Separado

**router.jsx:**
```javascript
import { createBrowserRouter } from 'react-router-dom';
import { productLoader, productsLoader } from './loaders/products';
import { createProductAction } from './actions/products';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'products',
        children: [
          { index: true, element: <ProductsList />, loader: productsLoader },
          { path: ':id', element: <ProductDetails />, loader: productLoader },
          { path: 'new', element: <NewProduct />, action: createProductAction },
        ],
      },
    ],
  },
]);
```

---

## 📚 Recursos

- [React Router Docs](https://reactrouter.com)
- [URL State Management](https://www.smashingmagazine.com/2022/06/state-management-nextjs-url/)

---

**Próximo:** Context API para Gerenciamento de Estado 🌍
