# 🎯 Boas Práticas de Desenvolvimento em React

> *"Clean Code, SOLID, KISS, DRY e Engenharia de Software Moderna"*

---

## 📋 Índice

1. [Clean Code em React](#clean-code-em-react)
2. [Princípios SOLID](#princípios-solid)
3. [KISS - Keep It Simple, Stupid](#kiss)
4. [DRY - Don't Repeat Yourself](#dry)
5. [Organização de Código](#organização-de-código)
6. [Nomenclatura](#nomenclatura)
7. [Composição vs Herança](#composição-vs-herança)
8. [Error Handling](#error-handling)
9. [Performance Best Practices](#performance-best-practices)
10. [Code Review Checklist](#code-review-checklist)

---

## 🧹 Clean Code em React

### Componentes Pequenos e Focados

```jsx
// ❌ Componente fazendo muitas coisas
function UserDashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(setUser);
    fetch('/api/orders').then(res => res.json()).then(setOrders);
    fetch('/api/notifications').then(res => res.json()).then(setNotifications);
  }, []);
  
  return (
    <div>
      <header>{user?.name}</header>
      <div>{orders.map(order => <div key={order.id}>{order.total}</div>)}</div>
      <div>{notifications.map(n => <div key={n.id}>{n.message}</div>)}</div>
    </div>
  );
}

// ✅ Componentes separados e focados
function UserDashboard() {
  return (
    <div>
      <UserHeader />
      <OrdersList />
      <NotificationsList />
    </div>
  );
}

function UserHeader() {
  const { data: user } = useUser();
  return <header>{user?.name}</header>;
}

function OrdersList() {
  const { data: orders } = useOrders();
  return (
    <div>
      {orders?.map(order => <OrderCard key={order.id} order={order} />)}
    </div>
  );
}
```

### Extrair Lógica Complexa

```jsx
// ❌ Lógica complexa no componente
function ProductCard({ product }) {
  const discountedPrice = product.price * (1 - product.discount / 100);
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(discountedPrice);
  
  const isOnSale = product.discount > 0;
  const isFreeShipping = product.price > 100;
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formattedPrice}</p>
      {isOnSale && <span>Em promoção!</span>}
      {isFreeShipping && <span>Frete grátis</span>}
    </div>
  );
}

// ✅ Lógica extraída para funções/hooks
function useProductPrice(product) {
  const discountedPrice = product.price * (1 - product.discount / 100);
  
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(discountedPrice);
  
  return { discountedPrice, formattedPrice };
}

function useProductBadges(product) {
  const isOnSale = product.discount > 0;
  const isFreeShipping = product.price > 100;
  
  return { isOnSale, isFreeShipping };
}

function ProductCard({ product }) {
  const { formattedPrice } = useProductPrice(product);
  const { isOnSale, isFreeShipping } = useProductBadges(product);
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formattedPrice}</p>
      {isOnSale && <Badge>Em promoção!</Badge>}
      {isFreeShipping && <Badge>Frete grátis</Badge>}
    </div>
  );
}
```

### Evitar Condicionais Aninhadas

```jsx
// ❌ Condicionais aninhadas difíceis de ler
function UserProfile({ user }) {
  if (user) {
    if (user.isActive) {
      if (user.subscription) {
        if (user.subscription.isPremium) {
          return <PremiumProfile user={user} />;
        } else {
          return <BasicProfile user={user} />;
        }
      } else {
        return <NoSubscription />;
      }
    } else {
      return <InactiveUser />;
    }
  } else {
    return <NotFound />;
  }
}

// ✅ Early returns
function UserProfile({ user }) {
  if (!user) return <NotFound />;
  if (!user.isActive) return <InactiveUser />;
  if (!user.subscription) return <NoSubscription />;
  
  return user.subscription.isPremium 
    ? <PremiumProfile user={user} />
    : <BasicProfile user={user} />;
}
```

---

## 🏗️ Princípios SOLID

### S - Single Responsibility Principle

*"Um componente deve ter uma única responsabilidade"*

```jsx
// ❌ Componente com múltiplas responsabilidades
function UserSettings() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  
  const saveSettings = async () => {
    await fetch('/api/settings', {
      method: 'POST',
      body: JSON.stringify({ theme, notifications }),
    });
  };
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <input 
        type="checkbox" 
        checked={notifications} 
        onChange={(e) => setNotifications(e.target.checked)} 
      />
      <button onClick={saveSettings}>Salvar</button>
    </div>
  );
}

// ✅ Responsabilidades separadas
function UserSettings() {
  return (
    <div>
      <UserHeader />
      <ThemeSelector />
      <NotificationToggle />
      <SettingsSaveButton />
    </div>
  );
}

function ThemeSelector() {
  const { theme, setTheme } = useSettings();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

### O - Open/Closed Principle

*"Aberto para extensão, fechado para modificação"*

```jsx
// ❌ Componente que precisa ser modificado para adicionar tipos
function Button({ variant, children }) {
  let className = 'btn';
  
  if (variant === 'primary') className += ' btn-primary';
  if (variant === 'secondary') className += ' btn-secondary';
  if (variant === 'danger') className += ' btn-danger';
  
  return <button className={className}>{children}</button>;
}

// ✅ Extensível sem modificação
const buttonVariants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
  success: 'btn-success', // Fácil adicionar novos
};

function Button({ variant = 'primary', children, className = '' }) {
  const variantClass = buttonVariants[variant];
  
  return (
    <button className={`btn ${variantClass} ${className}`}>
      {children}
    </button>
  );
}
```

### L - Liskov Substitution Principle

*"Subtipos devem ser substituíveis por seus tipos base"*

```jsx
// ❌ Componente que quebra quando usado no lugar do base
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// SubmitButton exige props diferentes
function SubmitButton({ onSubmit, children }: { onSubmit: () => void; children: React.ReactNode }) {
  return <button type="submit" onClick={onSubmit}>{children}</button>;
}

// ✅ Componente mantém interface compatível
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

function SubmitButton({ onClick, children }: ButtonProps) {
  return <button type="submit" onClick={onClick}>{children}</button>;
}

// Agora podem ser usados intercambiavelmente
<Button onClick={handleClick}>Click</Button>
<SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
```

### I - Interface Segregation Principle

*"Não force componentes a dependerem de props que não usam"*

```jsx
// ❌ Interface muito grande
interface UserCardProps {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: Post[];
  settings: Settings;
}

function UserAvatar({ id, name, email, avatar, bio, followers, following, posts, settings }: UserCardProps) {
  return <img src={avatar} alt={name} />; // Usa apenas 2 props
}

// ✅ Interfaces segregadas
interface UserAvatarProps {
  avatar: string;
  name: string;
}

interface UserStatsProps {
  followers: number;
  following: number;
}

interface UserBioProps {
  bio: string;
}

function UserAvatar({ avatar, name }: UserAvatarProps) {
  return <img src={avatar} alt={name} />;
}

function UserStats({ followers, following }: UserStatsProps) {
  return <div>{followers} seguidores • {following} seguindo</div>;
}
```

### D - Dependency Inversion Principle

*"Dependa de abstrações, não de implementações concretas"*

```jsx
// ❌ Componente depende de implementação específica
function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Dependência direta do fetch
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);
  
  return <div>{users.map(user => <UserCard key={user.id} user={user} />)}</div>;
}

// ✅ Componente depende de abstração (hook)
function useUsers() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Implementação pode mudar (fetch, axios, GraphQL, etc)
    fetchUsers().then(setUsers);
  }, []);
  
  return users;
}

function UserList() {
  const users = useUsers(); // Depende da abstração
  return <div>{users.map(user => <UserCard key={user.id} user={user} />)}</div>;
}

// Ou com injeção de dependência
interface UserListProps {
  fetchUsers: () => Promise<User[]>;
}

function UserList({ fetchUsers }: UserListProps) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, [fetchUsers]);
  
  return <div>{users.map(user => <UserCard key={user.id} user={user} />)}</div>;
}
```

---

## 💋 KISS - Keep It Simple, Stupid

*"Simplicidade é a sofisticação máxima"*

```jsx
// ❌ Over-engineering
function Button({ children, onClick, variant, size, disabled, loading, icon, iconPosition }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mouseenter', () => setIsHovered(true));
      button.addEventListener('mouseleave', () => setIsHovered(false));
      button.addEventListener('focus', () => setIsFocused(true));
      button.addEventListener('blur', () => setIsFocused(false));
    }
  }, []);
  
  const className = useMemo(() => {
    return `btn btn-${variant} btn-${size} ${isHovered ? 'hover' : ''} ${isFocused ? 'focus' : ''}`;
  }, [variant, size, isHovered, isFocused]);
  
  return (
    <button 
      ref={buttonRef}
      className={className} 
      onClick={onClick} 
      disabled={disabled || loading}
    >
      {loading && <Spinner />}
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}

// ✅ Simples e direto
function Button({ children, onClick, variant = 'primary', disabled, loading }) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick} 
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
```

---

## 🔁 DRY - Don't Repeat Yourself

```jsx
// ❌ Código repetido
function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  
  return (
    <form>
      <input value={name} onChange={handleNameChange} />
      <input value={email} onChange={handleEmailChange} />
      <input value={phone} onChange={handlePhoneChange} />
    </form>
  );
}

// ✅ Abstraído em hook reutilizável
function useFormField(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (e) => setValue(e.target.value);
  
  return { value, onChange: handleChange };
}

function UserProfile() {
  const name = useFormField('');
  const email = useFormField('');
  const phone = useFormField('');
  
  return (
    <form>
      <input {...name} />
      <input {...email} type="email" />
      <input {...phone} type="tel" />
    </form>
  );
}

// ✅ Ou com objeto de estado
function UserProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };
  
  return (
    <form>
      <input value={formData.name} onChange={handleChange('name')} />
      <input value={formData.email} onChange={handleChange('email')} />
      <input value={formData.phone} onChange={handleChange('phone')} />
    </form>
  );
}
```

---

## 📁 Organização de Código

### Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de UI (Button, Input, Card)
│   ├── forms/          # Componentes de formulário
│   └── layout/         # Componentes de layout (Header, Footer)
├── features/           # Features por domínio
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   └── products/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types.ts
├── hooks/              # Custom hooks globais
├── services/           # Serviços de API
├── utils/              # Funções utilitárias
├── types/              # TypeScript types/interfaces
├── constants/          # Constantes
└── styles/             # Estilos globais
```

### Organização de Componente

```typescript
// ProductCard.tsx
import { useState } from 'react';
import { Product } from '@/types';
import { formatPrice } from '@/utils';
import { Button } from '@/components/ui';

// 1. Types
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
}

// 2. Helpers/Utils internos
function calculateDiscount(price: number, discount: number) {
  return price * (1 - discount / 100);
}

// 3. Componente principal
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  
  const finalPrice = calculateDiscount(product.price, product.discount);
  
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };
  
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{formatPrice(finalPrice)}</p>
      <Button onClick={handleAddToCart}>Adicionar ao carrinho</Button>
    </div>
  );
}

// 4. Sub-componentes (se necessário)
ProductCard.Image = function ProductImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} loading="lazy" />;
};
```

---

## 🏷️ Nomenclatura

### Componentes

```jsx
// ✅ PascalCase para componentes
function UserProfile() {}
function ProductCard() {}

// ❌ Evite
function userProfile() {}
function product_card() {}
```

### Funções e Variáveis

```jsx
// ✅ camelCase para funções e variáveis
const getUserData = async () => {};
const isLoggedIn = true;
const totalPrice = 100;

// ❌ Evite
const GetUserData = async () => {};
const IsLoggedIn = true;
const total_price = 100;
```

### Event Handlers

```jsx
// ✅ handle + Ação
const handleClick = () => {};
const handleSubmit = () => {};
const handleInputChange = () => {};

// ❌ Evite
const click = () => {};
const submit = () => {};
const onChange = () => {};
```

### Booleans

```jsx
// ✅ is/has/should + Descrição
const isLoading = true;
const hasError = false;
const shouldRender = true;
const canEdit = false;

// ❌ Evite
const loading = true;
const error = false;
const render = true;
```

### Custom Hooks

```jsx
// ✅ use + Função
function useUser() {}
function useFetch() {}
function useLocalStorage() {}

// ❌ Evite
function getUser() {}
function fetcher() {}
```

---

## 🧩 Composição vs Herança

*"Prefira composição a herança"*

```jsx
// ❌ Herança (não suportado naturalmente em React)
class BaseButton extends React.Component {
  render() {
    return <button>{this.props.children}</button>;
  }
}

class PrimaryButton extends BaseButton {
  render() {
    return <button className="primary">{this.props.children}</button>;
  }
}

// ✅ Composição
function Button({ variant = 'base', children, ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
}

// Usar composição para criar variações
<Button variant="primary">Click</Button>
<Button variant="secondary">Cancel</Button>

// ✅ Compound Components (composição avançada)
function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
};

Card.Footer = function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>;
};

// Uso
<Card>
  <Card.Header>Título</Card.Header>
  <Card.Body>Conteúdo</Card.Body>
  <Card.Footer>Rodapé</Card.Footer>
</Card>
```

---

## ⚠️ Error Handling

### Error Boundaries

```jsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };
  
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Enviar para serviço de monitoramento (Sentry, LogRocket, etc)
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <h1>Algo deu errado</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Uso
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

### Async Error Handling

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/user');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao buscar usuário:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <NotFound />;
  
  return <div>{user.name}</div>;
}
```

---

## ⚡ Performance Best Practices

### 1. Evite Criações Desnecessárias

```jsx
// ❌ Cria nova função a cada render
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user}
          onClick={() => console.log(user.id)} // ❌ Nova função
        />
      ))}
    </div>
  );
}

// ✅ useCallback ou função estável
function UserList({ users }) {
  const handleClick = useCallback((id) => {
    console.log(id);
  }, []);
  
  return (
    <div>
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user}
          onClick={() => handleClick(user.id)}
        />
      ))}
    </div>
  );
}
```

### 2. Memoização Seletiva

```jsx
// ❌ Memo desnecessário para componentes simples
const Button = memo(({ children }) => <button>{children}</button>);

// ✅ Memo para componentes pesados
const ExpensiveList = memo(({ items }) => {
  return (
    <div>
      {items.map(item => (
        <ExpensiveCard key={item.id} item={item} />
      ))}
    </div>
  );
});
```

### 3. Lazy Loading

```jsx
import { lazy, Suspense } from 'react';

// ✅ Code splitting para rotas
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

---

## ✅ Code Review Checklist

### Componentes

- [ ] Componente tem responsabilidade única?
- [ ] Nome do componente é descritivo?
- [ ] Props estão tipadas (TypeScript)?
- [ ] Tem valores padrão para props opcionais?
- [ ] Componente é testável?

### Estado

- [ ] Estado está no nível correto da árvore?
- [ ] Usa hooks apropriados (useState, useReducer)?
- [ ] Evita estado derivado desnecessário?

### Performance

- [ ] Usa `React.memo` apenas quando necessário?
- [ ] Event handlers são estáveis (useCallback)?
- [ ] Cálculos pesados usam `useMemo`?
- [ ] Lazy loading para rotas/componentes pesados?

### Código

- [ ] Sem código comentado?
- [ ] Sem console.log em produção?
- [ ] Funções têm nomes descritivos?
- [ ] Lógica complexa está extraída?
- [ ] Sem duplicação de código?

### Acessibilidade

- [ ] Elementos semânticos (button, nav, header)?
- [ ] Labels em inputs?
- [ ] Alt text em imagens?
- [ ] Navegação por teclado funciona?

### Testes

- [ ] Componente tem testes?
- [ ] Testa comportamento, não implementação?
- [ ] Cobertura adequada?

---

## 📚 Recursos

- [Clean Code (Robert C. Martin)](https://www.amazon.com.br/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [React Design Principles](https://react.dev/learn/thinking-in-react)
- [Refactoring UI](https://www.refactoringui.com/)

---

**Próximo:** Arquitetura de Aplicações Front-end em React 🏛️
