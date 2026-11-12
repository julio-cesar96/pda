# 🏛️ Arquitetura de Aplicações Front-end em React

> *"Escalabilidade, Manutenibilidade e Organização"*

---

## 📋 Índice

1. [Princípios de Arquitetura](#princípios-de-arquitetura)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Feature-Sliced Design](#feature-sliced-design)
4. [Camadas da Aplicação](#camadas-da-aplicação)
5. [Gerenciamento de Estado Global](#gerenciamento-de-estado-global)
6. [API Layer](#api-layer)
7. [Padrões de Roteamento](#padrões-de-roteamento)
8. [Configuração e Ambientes](#configuração-e-ambientes)
9. [Monorepo vs Multi-repo](#monorepo-vs-multi-repo)
10. [Escalabilidade](#escalabilidade)

---

## 🎯 Princípios de Arquitetura

### Separation of Concerns

```
Apresentação  ↔️  Lógica de Negócio  ↔️  Acesso a Dados
(Components)     (Hooks/Services)      (API/Repository)
```

### Dependency Flow

```
┌─────────────────────────────────────┐
│           Presentation              │  ← Componentes React
│  (Components, Pages, Layouts)       │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│        Application Logic            │  ← Custom Hooks, Stores
│     (Hooks, State Management)       │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│         Domain Logic                │  ← Regras de negócio
│    (Services, Use Cases)            │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│        Infrastructure               │  ← API, Storage, etc
│    (API Client, Repositories)       │
└─────────────────────────────────────┘
```

---

## 📁 Estrutura de Pastas

### Abordagem 1: Por Tipo (Pequenos Projetos)

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.styles.ts
│   ├── Input/
│   └── Card/
├── pages/              # Páginas/Rotas
│   ├── Home/
│   ├── Dashboard/
│   └── Profile/
├── hooks/              # Custom hooks
├── services/           # Serviços de API
├── utils/              # Funções utilitárias
├── types/              # TypeScript types
├── constants/          # Constantes
└── styles/             # Estilos globais
```

### Abordagem 2: Por Feature (Médios/Grandes Projetos)

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm/
│   │   │   └── SignupForm/
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useLogin.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── store/
│   │   │   └── authStore.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts        # Public API
│   │
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductCard/
│   │   │   ├── ProductList/
│   │   │   └── ProductFilter/
│   │   ├── hooks/
│   │   │   └── useProducts.ts
│   │   ├── services/
│   │   │   └── productService.ts
│   │   ├── types/
│   │   │   └── product.types.ts
│   │   └── index.ts
│   │
│   └── cart/
│       ├── components/
│       ├── hooks/
│       ├── store/
│       └── types/
│
├── shared/             # Código compartilhado
│   ├── components/     # Componentes UI genéricos
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   ├── hooks/
│   ├── utils/
│   └── types/
│
├── core/               # Configurações core
│   ├── api/
│   │   └── apiClient.ts
│   ├── config/
│   │   └── env.ts
│   └── router/
│       └── routes.tsx
│
└── app/                # Setup da aplicação
    ├── App.tsx
    ├── main.tsx
    └── providers.tsx
```

---

## 🎨 Feature-Sliced Design

*Metodologia moderna de arquitetura front-end*

### Estrutura FSD

```
src/
├── app/                    # Inicialização da app
│   ├── providers/
│   ├── styles/
│   └── index.tsx
│
├── pages/                  # Páginas completas
│   ├── home/
│   ├── product/
│   └── checkout/
│
├── widgets/                # Blocos compostos (header, sidebar)
│   ├── header/
│   ├── sidebar/
│   └── product-carousel/
│
├── features/               # Interações do usuário
│   ├── auth/
│   │   ├── login/
│   │   ├── logout/
│   │   └── signup/
│   ├── add-to-cart/
│   └── toggle-theme/
│
├── entities/               # Entidades de negócio
│   ├── user/
│   ├── product/
│   └── order/
│
└── shared/                 # Código reutilizável
    ├── ui/
    ├── lib/
    └── api/
```

### Exemplo: Feature "Add to Cart"

```typescript
// features/add-to-cart/model/useAddToCart.ts
import { useCartStore } from '@/entities/cart';
import { Product } from '@/entities/product';

export function useAddToCart() {
  const addItem = useCartStore(state => state.addItem);
  
  const addToCart = async (product: Product, quantity: number) => {
    try {
      addItem({ ...product, quantity });
      toast.success('Produto adicionado ao carrinho');
    } catch (error) {
      toast.error('Erro ao adicionar produto');
    }
  };
  
  return { addToCart };
}

// features/add-to-cart/ui/AddToCartButton.tsx
import { useAddToCart } from '../model/useAddToCart';
import { Button } from '@/shared/ui';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useAddToCart();
  
  return (
    <Button onClick={() => addToCart(product, 1)}>
      Adicionar ao Carrinho
    </Button>
  );
}

// features/add-to-cart/index.ts
export { AddToCartButton } from './ui/AddToCartButton';
```

---

## 🧱 Camadas da Aplicação

### 1. Presentation Layer (Componentes)

```typescript
// pages/ProductPage.tsx
import { ProductDetails } from '@/features/products';
import { AddToCartButton } from '@/features/add-to-cart';

export function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  
  if (isLoading) return <Skeleton />;
  if (!product) return <NotFound />;
  
  return (
    <div>
      <ProductDetails product={product} />
      <AddToCartButton product={product} />
    </div>
  );
}
```

### 2. Application Layer (Hooks e State)

```typescript
// features/products/hooks/useProduct.ts
import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
```

### 3. Domain Layer (Lógica de Negócio)

```typescript
// features/products/services/productService.ts
import { apiClient } from '@/core/api';
import { Product } from '../types';

export const productService = {
  async getById(id: string): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`);
    return this.transformProduct(response.data);
  },
  
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    const response = await apiClient.get('/products', { params: filters });
    return response.data.map(this.transformProduct);
  },
  
  transformProduct(data: any): Product {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      discount: data.discount || 0,
      image: data.image_url,
      // Lógica de transformação/validação
    };
  },
};
```

### 4. Infrastructure Layer (API Client)

```typescript
// core/api/apiClient.ts
import axios from 'axios';
import { getToken } from '@/features/auth';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Interceptor para adicionar token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logout ou refresh token
    }
    return Promise.reject(error);
  }
);
```

---

## 🌍 Gerenciamento de Estado Global

### Arquitetura de Estado

```
┌─────────────────────────────────────┐
│        Local State (useState)       │  ← Estado de componente
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      URL State (useSearchParams)    │  ← Filtros, paginação
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    Server State (React Query)       │  ← Dados da API
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Global UI State (Zustand/Context) │  ← Theme, sidebar, modal
└─────────────────────────────────────┘
```

### Exemplo: Store Global

```typescript
// stores/uiStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'ui-store',
    }
  )
);
```

---

## 🔌 API Layer

### Repository Pattern

```typescript
// core/api/baseRepository.ts
export abstract class BaseRepository<T> {
  constructor(protected baseURL: string) {}
  
  async getAll(): Promise<T[]> {
    const response = await apiClient.get(this.baseURL);
    return response.data;
  }
  
  async getById(id: string): Promise<T> {
    const response = await apiClient.get(`${this.baseURL}/${id}`);
    return response.data;
  }
  
  async create(data: Partial<T>): Promise<T> {
    const response = await apiClient.post(this.baseURL, data);
    return response.data;
  }
  
  async update(id: string, data: Partial<T>): Promise<T> {
    const response = await apiClient.put(`${this.baseURL}/${id}`, data);
    return response.data;
  }
  
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.baseURL}/${id}`);
  }
}

// features/products/api/productRepository.ts
import { BaseRepository } from '@/core/api/baseRepository';
import { Product } from '../types';

class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super('/products');
  }
  
  async search(query: string): Promise<Product[]> {
    const response = await apiClient.get(`${this.baseURL}/search`, {
      params: { q: query },
    });
    return response.data;
  }
  
  async getByCategory(category: string): Promise<Product[]> {
    const response = await apiClient.get(`${this.baseURL}`, {
      params: { category },
    });
    return response.data;
  }
}

export const productRepository = new ProductRepository();
```

### API Hooks Pattern

```typescript
// features/products/api/queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productRepository } from './productRepository';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: productKeys.list(JSON.stringify(filters)),
    queryFn: () => productRepository.getAll(),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productRepository.getById(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productRepository.create.bind(productRepository),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}
```

---

## 🛤️ Padrões de Roteamento

### Route Configuration

```typescript
// core/router/routes.tsx
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

const HomePage = lazy(() => import('@/pages/Home'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const ProductPage = lazy(() => import('@/pages/Product'));
const DashboardPage = lazy(() => import('@/pages/Dashboard'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductPage /> },
      {
        path: 'dashboard',
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// app/App.tsx
import { useRoutes } from 'react-router-dom';
import { routes } from '@/core/router/routes';

export function App() {
  const element = useRoutes(routes);
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}
```

### Layout Pattern

```typescript
// layouts/RootLayout.tsx
export function RootLayout() {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <main>
        <Outlet /> {/* Renderiza children da rota */}
      </main>
      <Footer />
    </div>
  );
}

// layouts/DashboardLayout.tsx
export function DashboardLayout() {
  return (
    <div className="dashboard">
      <DashboardNav />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
```

---

## ⚙️ Configuração e Ambientes

### Variáveis de Ambiente

```bash
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=MyApp Dev
VITE_ENABLE_ANALYTICS=false

# .env.production
VITE_API_URL=https://api.myapp.com
VITE_APP_NAME=MyApp
VITE_ENABLE_ANALYTICS=true
```

### Config File

```typescript
// core/config/env.ts
interface Config {
  apiUrl: string;
  appName: string;
  enableAnalytics: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
}

export const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || '',
  appName: import.meta.env.VITE_APP_NAME || 'App',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validação de env vars obrigatórias
const requiredEnvVars = ['VITE_API_URL'];

requiredEnvVars.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});
```

---

## 📦 Monorepo vs Multi-repo

### Monorepo (recomendado para projetos relacionados)

```
my-app/
├── apps/
│   ├── web/              # App principal
│   ├── admin/            # Painel admin
│   └── mobile/           # App mobile (React Native)
│
├── packages/
│   ├── ui/               # Componentes compartilhados
│   ├── utils/            # Utilitários compartilhados
│   ├── api-client/       # Cliente API compartilhado
│   └── types/            # Types compartilhados
│
├── package.json
└── turbo.json            # Turborepo config
```

**Ferramentas:**
- [Turborepo](https://turbo.build/)
- [Nx](https://nx.dev/)
- [pnpm workspaces](https://pnpm.io/workspaces)

### Multi-repo

Projetos completamente independentes em repositórios separados.

---

## 📈 Escalabilidade

### Code Splitting

```typescript
// Lazy load por rota
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Lazy load por feature
const AdminPanel = lazy(() =>
  import('./features/admin').then(module => ({ default: module.AdminPanel }))
);

// Prefetch em hover
function ProductLink({ id }) {
  const prefetch = () => {
    import('./pages/Product');
  };
  
  return (
    <Link to={`/products/${id}`} onMouseEnter={prefetch}>
      Ver produto
    </Link>
  );
}
```

### Micro Frontends (avançado)

```typescript
// Module Federation (Webpack 5)
// app1/webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/components/ProductList',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};

// app2/webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};

// Uso em app2
const ProductList = lazy(() => import('app1/ProductList'));
```

---

## 📚 Recursos

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [React Architecture Patterns](https://kentcdodds.com/blog/colocation)

---

**Próximo:** Autenticação e Autorização 🔐
