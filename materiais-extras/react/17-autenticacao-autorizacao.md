# 🔐 Autenticação e Autorização em React

> *"Segurança e Controle de Acesso"*

---

## 📋 Índice

1. [Autenticação vs Autorização](#autenticação-vs-autorização)
2. [Estratégias de Autenticação](#estratégias-de-autenticação)
3. [JWT (JSON Web Tokens)](#jwt)
4. [OAuth 2.0 e Social Login](#oauth-20)
5. [Gerenciamento de Sessão](#gerenciamento-de-sessão)
6. [Protected Routes](#protected-routes)
7. [Role-Based Access Control (RBAC)](#rbac)
8. [Refresh Tokens](#refresh-tokens)
9. [Logout e Timeout](#logout-e-timeout)
10. [Boas Práticas de Segurança](#boas-práticas-de-segurança)

---

## 🔑 Autenticação vs Autorização

### Autenticação
*"Quem é você?"* - Verificar identidade do usuário

### Autorização
*"O que você pode fazer?"* - Verificar permissões do usuário

```typescript
// Autenticação
if (!user) {
  return <LoginPage />; // Usuário não autenticado
}

// Autorização
if (user.role !== 'admin') {
  return <Forbidden />; // Usuário sem permissão
}

return <AdminPanel />;
```

---

## 🎯 Estratégias de Autenticação

### 1. Session-Based (Cookies)

```
Cliente                    Servidor
  │                           │
  ├─── POST /login ──────────>│
  │    (email, password)       │
  │                           │
  │<─── Set-Cookie ───────────┤
  │    (sessionId)             │
  │                           │
  ├─── GET /api/profile ─────>│
  │    Cookie: sessionId       │
  │                           │
  │<─── Dados do usuário ─────┤
```

### 2. Token-Based (JWT)

```
Cliente                    Servidor
  │                           │
  ├─── POST /login ──────────>│
  │    (email, password)       │
  │                           │
  │<─── JWT Token ────────────┤
  │    (armazenado local)      │
  │                           │
  ├─── GET /api/profile ─────>│
  │    Authorization: Bearer JWT│
  │                           │
  │<─── Dados do usuário ─────┤
```

---

## 🎫 JWT (JSON Web Tokens)

### Estrutura do JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

│────────── Header ────────│──────────── Payload ──────────│───────── Signature ──────│
```

### Implementação com React

```typescript
// types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// services/authService.ts
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login falhou');
    }
    
    const data = await response.json();
    
    // Armazenar tokens
    this.setToken(data.token);
    this.setRefreshToken(data.refreshToken);
    
    return data;
  },
  
  async logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  
  setRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  
  // Decodificar JWT (sem verificação)
  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  },
  
  isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },
};

// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Carregar usuário do token ao montar
  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      
      if (token && !authService.isTokenExpired(token)) {
        try {
          // Buscar dados do usuário
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
        }
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);
  
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await authService.login(email, password);
      setUser(user);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  
  return context;
}

// Componente de Login
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Email ou senha inválidos');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
```

---

## 🌐 OAuth 2.0 e Social Login

### Google OAuth

```typescript
// Google Sign-In
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <LoginPage />
    </GoogleOAuthProvider>
  );
}

function LoginPage() {
  const { login } = useAuth();
  
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // Enviar token do Google para seu backend
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      
      const { user, token } = await response.json();
      
      authService.setToken(token);
      // Atualizar estado de autenticação
    } catch (error) {
      toast.error('Erro ao fazer login com Google');
    }
  };
  
  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error('Login falhou')}
      />
    </div>
  );
}
```

### GitHub OAuth

```typescript
// 1. Redirecionar para GitHub
const handleGitHubLogin = () => {
  const clientId = 'YOUR_GITHUB_CLIENT_ID';
  const redirectUri = 'http://localhost:3000/auth/callback/github';
  
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
};

// 2. Callback page
function GitHubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      // Enviar code para backend
      fetch('/api/auth/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(({ token }) => {
          authService.setToken(token);
          navigate('/dashboard');
        })
        .catch(() => {
          toast.error('Erro no login');
          navigate('/login');
        });
    }
  }, [searchParams, navigate]);
  
  return <div>Autenticando...</div>;
}
```

---

## 🔒 Protected Routes

### Basic Protected Route

```typescript
// components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <PageLoader />;
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// routes.tsx
const routes = [
  { path: '/login', element: <LoginPage /> },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
];
```

### Redirect após Login

```typescript
// LoginPage.tsx
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pegar redirect da query string
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Login falhou');
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}

// ProtectedRoute.tsx
export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return <PageLoader />;
  
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
```

---

## 👥 RBAC (Role-Based Access Control)

```typescript
// types/auth.ts
export type Role = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: string[];
}

// hooks/usePermissions.ts
export function usePermissions() {
  const { user } = useAuth();
  
  const hasRole = (role: Role | Role[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };
  
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };
  
  return { hasRole, hasPermission };
}

// components/RoleBasedRoute.tsx
interface RoleBasedRouteProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export function RoleBasedRoute({ allowedRoles, children }: RoleBasedRouteProps) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }
  
  return <>{children}</>;
}

// Uso
<Route
  path="/admin"
  element={
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminPanel />
    </RoleBasedRoute>
  }
/>

// Componente condicional por permissão
function DeleteButton({ itemId }: { itemId: string }) {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission('items.delete')) {
    return null; // Ou botão desabilitado
  }
  
  return <button onClick={() => deleteItem(itemId)}>Deletar</button>;
}

// HOC para permissões
function withPermission(Component: React.ComponentType, permission: string) {
  return function ProtectedComponent(props: any) {
    const { hasPermission } = usePermissions();
    
    if (!hasPermission(permission)) {
      return <Forbidden />;
    }
    
    return <Component {...props} />;
  };
}

const AdminPanel = withPermission(AdminPanelComponent, 'admin.access');
```

---

## 🔄 Refresh Tokens

```typescript
// services/authService.ts
export const authService = {
  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token');
    }
    
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (!response.ok) {
      throw new Error('Refresh failed');
    }
    
    const { token } = await response.json();
    this.setToken(token);
    
    return token;
  },
};

// api/apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
});

// Interceptor para adicionar token
apiClient.interceptors.request.use((config) => {
  const token = authService.getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor para refresh token
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Se 401 e não é retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Aguardar refresh em andamento
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const newToken = await authService.refreshToken();
        processQueue(null, newToken);
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        // Logout se refresh falhar
        authService.logout();
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);
```

---

## 🚪 Logout e Timeout

### Auto Logout por Inatividade

```typescript
// hooks/useIdleTimer.ts
import { useEffect, useRef } from 'react';

export function useIdleTimer(onIdle: () => void, timeout: number = 15 * 60 * 1000) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  
  const resetTimer = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    
    timeoutId.current = setTimeout(onIdle, timeout);
  };
  
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true);
    });
    
    resetTimer();
    
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true);
      });
      
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [timeout]);
}

// App.tsx
function App() {
  const { logout, isAuthenticated } = useAuth();
  
  useIdleTimer(() => {
    if (isAuthenticated) {
      logout();
      toast.info('Sessão expirada por inatividade');
    }
  }, 15 * 60 * 1000); // 15 minutos
  
  return <RouterProvider router={router} />;
}
```

---

## 🛡️ Boas Práticas de Segurança

### 1. Armazenamento Seguro de Tokens

```typescript
// ✅ Bom - localStorage (OK para SPAs)
localStorage.setItem('token', token);

// ⚠️ Melhor - httpOnly cookies (previne XSS)
// Configurado no backend:
res.cookie('token', token, {
  httpOnly: true,  // Não acessível via JavaScript
  secure: true,    // Apenas HTTPS
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
});

// ❌ Evite - sessionStorage para tokens longos
sessionStorage.setItem('token', token); // Perdido ao fechar aba
```

### 2. CSRF Protection

```typescript
// Com httpOnly cookies, usar CSRF token
apiClient.interceptors.request.use((config) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  
  return config;
});
```

### 3. Validação de Token

```typescript
// Sempre validar token no backend
// NUNCA confie apenas na validação client-side

// Client-side (apenas UX)
const isTokenValid = !authService.isTokenExpired(token);

if (!isTokenValid) {
  // Tentar refresh ou logout
}

// Backend (verdadeira validação)
function validateToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
}
```

### 4. Rate Limiting

```typescript
// Backend - Limitar tentativas de login
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: 'Muitas tentativas de login. Tente novamente mais tarde.',
});

app.post('/api/auth/login', loginLimiter, loginHandler);
```

### 5. Sanitização de Inputs

```typescript
// Sempre validar/sanitizar no backend
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function login(req, res) {
  const result = loginSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  
  // Processar login
}
```

---

## 📚 Recursos

- [OAuth 2.0 Guide](https://oauth.net/2/)
- [JWT.io](https://jwt.io/)
- [OWASP Authentication Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

**Próximo:** Acessibilidade (a11y) ♿
