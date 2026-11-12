# 🛡️ Segurança em React

> *"Proteção contra vulnerabilidades e ataques"*

---

## 📋 Índice

1. [Principais Vulnerabilidades](#principais-vulnerabilidades)
2. [XSS (Cross-Site Scripting)](#xss)
3. [CSRF (Cross-Site Request Forgery)](#csrf)
4. [Injeção de Código](#injeção-de-código)
5. [Sanitização de Inputs](#sanitização-de-inputs)
6. [Segurança de Dependências](#segurança-de-dependências)
7. [Variáveis de Ambiente](#variáveis-de-ambiente)
8. [Content Security Policy](#csp)
9. [HTTPS e Cookies Seguros](#https-e-cookies)
10. [Auditoria e Monitoramento](#auditoria-e-monitoramento)

---

## ⚠️ Principais Vulnerabilidades

### OWASP Top 10 para SPAs

1. **Injection** (SQL, XSS, etc)
2. **Broken Authentication**
3. **Sensitive Data Exposure**
4. **XML External Entities (XXE)**
5. **Broken Access Control**
6. **Security Misconfiguration**
7. **Cross-Site Scripting (XSS)**
8. **Insecure Deserialization**
9. **Using Components with Known Vulnerabilities**
10. **Insufficient Logging & Monitoring**

---

## 💉 XSS (Cross-Site Scripting)

### React Protege Automaticamente

```jsx
// ✅ React escapa automaticamente
const userInput = '<script>alert("XSS")</script>';
return <div>{userInput}</div>;
// Renderiza: &lt;script&gt;alert("XSS")&lt;/script&gt;

// ✅ Props também são escapadas
<input value={userInput} />
```

### Quando React NÃO Protege

```jsx
// ❌ PERIGO: dangerouslySetInnerHTML
const html = '<script>alert("XSS")</script>';
return <div dangerouslySetInnerHTML={{ __html: html }} />;

// ❌ PERIGO: href com javascript:
<a href={`javascript:alert('XSS')`}>Click</a>

// ❌ PERIGO: Eventos inline via string
<div onClick={eval(userInput)}>Click</div>
```

### Sanitização com DOMPurify

```bash
npm install dompurify
npm install -D @types/dompurify
```

```tsx
import DOMPurify from 'dompurify';

interface SafeHTMLProps {
  html: string;
  className?: string;
}

export function SafeHTML({ html, className }: SafeHTMLProps) {
  const sanitizedHTML = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
  
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}

// Uso
const userHTML = '<p>Texto <b>negrito</b> <script>alert("XSS")</script></p>';
<SafeHTML html={userHTML} />
// Script é removido, apenas tags permitidas ficam
```

### Sanitizar URLs

```tsx
function SafeLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isSafeURL = (url: string): boolean => {
    try {
      const parsed = new URL(url, window.location.origin);
      return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };
  
  if (!isSafeURL(href)) {
    console.warn('URL não segura bloqueada:', href);
    return <span>{children}</span>;
  }
  
  return <a href={href} rel="noopener noreferrer">{children}</a>;
}

// ✅ Uso seguro
<SafeLink href="https://example.com">Link</SafeLink>

// ❌ Bloqueado
<SafeLink href="javascript:alert('XSS')">Link malicioso</SafeLink>
```

---

## 🔐 CSRF (Cross-Site Request Forgery)

### CSRF Token

```tsx
// Backend envia CSRF token via cookie httpOnly
// Frontend envia token em header customizado

// api/apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // Envia cookies
});

// Interceptor para adicionar CSRF token
apiClient.interceptors.request.use((config) => {
  // Token pode vir de meta tag ou cookie
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');
  
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  
  return config;
});

// Uso
async function deleteUser(id: string) {
  await apiClient.delete(`/users/${id}`);
  // CSRF token é automaticamente incluído
}
```

### SameSite Cookies

```typescript
// Backend - Express.js
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: true, // Apenas HTTPS
    sameSite: 'strict', // Previne CSRF
    maxAge: 24 * 60 * 60 * 1000, // 24h
  },
}));
```

---

## 💊 Injeção de Código

### SQL Injection (Backend)

```typescript
// ❌ VULNERÁVEL - String concatenation
const userId = req.params.id;
db.query(`SELECT * FROM users WHERE id = ${userId}`);
// Ataque: /users/1 OR 1=1

// ✅ SEGURO - Prepared statements
db.query('SELECT * FROM users WHERE id = ?', [userId]);
```

### NoSQL Injection

```typescript
// ❌ VULNERÁVEL
const username = req.body.username;
User.findOne({ username: username });
// Ataque: { "$ne": null } retorna todos

// ✅ SEGURO - Validação
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});

const result = loginSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ error: 'Dados inválidos' });
}

User.findOne({ username: result.data.username });
```

---

## 🧹 Sanitização de Inputs

### Validação com Zod

```tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z.object({
  name: z.string()
    .min(3, 'Nome muito curto')
    .max(100, 'Nome muito longo')
    .regex(/^[a-zA-Z\s]+$/, 'Apenas letras e espaços'),
  
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  
  age: z.number()
    .int('Deve ser inteiro')
    .min(18, 'Menor de idade')
    .max(120, 'Idade inválida'),
  
  website: z.string()
    .url('URL inválida')
    .optional(),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });
  
  const onSubmit = async (data: UserFormData) => {
    // data já está validado e sanitizado
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input {...register('email')} type="email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('age', { valueAsNumber: true })} type="number" />
      {errors.age && <span>{errors.age.message}</span>}
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Sanitizar Texto

```tsx
function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/\s+/g, ' ') // Normaliza espaços
    .slice(0, 1000); // Limita tamanho
}

// Uso
const userInput = '  Texto   com <script>   múltiplos   espaços  ';
const safe = sanitizeText(userInput);
// "Texto com múltiplos espaços"
```

---

## 📦 Segurança de Dependências

### Auditoria de Dependências

```bash
# npm
npm audit
npm audit fix

# Auditoria detalhada
npm audit --json

# Atualizar apenas patches de segurança
npm audit fix --production
```

### Dependabot (GitHub)

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Snyk

```bash
npm install -g snyk
snyk auth
snyk test
snyk monitor
```

### Verificar Licenças

```bash
npm install -g license-checker
license-checker --summary
```

---

## 🔑 Variáveis de Ambiente

### NUNCA Comitar Segredos

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_PUBLIC_KEY=pk_test_123  # ✅ Público, OK expor

# ❌ NUNCA faça isso
DATABASE_PASSWORD=senha123
API_SECRET_KEY=secret123
PRIVATE_KEY=...
```

### .gitignore

```
# .gitignore
.env
.env.local
.env.production
.env.development
*.pem
*.key
```

### Usar Variáveis Públicas

```tsx
// ✅ Correto - Vite expõe apenas VITE_*
const apiUrl = import.meta.env.VITE_API_URL;

// ❌ Segredos devem ficar no backend
// NUNCA faça isso:
const apiSecret = import.meta.env.VITE_API_SECRET; // Exposto no bundle!
```

### Validar Env Vars

```tsx
// config/env.ts
const requiredEnvVars = [
  'VITE_API_URL',
  'VITE_APP_NAME',
] as const;

requiredEnvVars.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
});

export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
} as const;
```

---

## 🔒 Content Security Policy (CSP)

### Configurar CSP

```html
<!-- index.html -->
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self' https://api.example.com;
  "
/>
```

### Servidor (Express)

```typescript
import helmet from 'helmet';

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.example.com'],
    },
  })
);
```

### Nonce para Scripts Inline

```tsx
// Gerar nonce no servidor
const nonce = crypto.randomBytes(16).toString('base64');

// HTML
<script nonce={nonce}>
  console.log('Script inline seguro');
</script>

// CSP
Content-Security-Policy: script-src 'nonce-{nonce}'
```

---

## 🍪 HTTPS e Cookies Seguros

### Forçar HTTPS

```typescript
// Express middleware
function forceHTTPS(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://${req.hostname}${req.url}`);
  }
  next();
}

app.use(forceHTTPS);
```

### Cookies Seguros

```typescript
res.cookie('token', token, {
  httpOnly: true,    // Não acessível via JavaScript
  secure: true,      // Apenas HTTPS
  sameSite: 'strict', // Previne CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
  path: '/',
  domain: '.example.com',
});
```

### localStorage vs sessionStorage vs Cookies

| Storage | XSS | CSRF | Tamanho | Expira |
|---------|-----|------|---------|--------|
| **localStorage** | ⚠️ Vulnerável | ✅ Protegido | ~10MB | Manual |
| **sessionStorage** | ⚠️ Vulnerável | ✅ Protegido | ~10MB | Aba fecha |
| **Cookies httpOnly** | ✅ Protegido | ⚠️ Vulnerável* | ~4KB | Configurável |

*CSRF protegido com SameSite

**Recomendação:** Tokens sensíveis em **httpOnly cookies** + **CSRF token**

---

## 📊 Auditoria e Monitoramento

### Logging de Segurança

```typescript
// logger.ts
export const securityLogger = {
  logFailedLogin(email: string, ip: string) {
    console.error('[SECURITY] Failed login attempt', { email, ip, timestamp: new Date() });
    // Enviar para serviço de monitoramento (Sentry, LogRocket, etc)
  },
  
  logSuspiciousActivity(userId: string, action: string) {
    console.warn('[SECURITY] Suspicious activity', { userId, action, timestamp: new Date() });
  },
  
  logDataAccess(userId: string, resource: string) {
    console.info('[AUDIT] Data access', { userId, resource, timestamp: new Date() });
  },
};

// Uso
try {
  await login(email, password);
} catch (error) {
  securityLogger.logFailedLogin(email, req.ip);
  throw error;
}
```

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// Limitar login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: 'Muitas tentativas de login. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/auth/login', loginLimiter, loginHandler);

// Limitar API geral
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // 100 requests
});

app.use('/api', apiLimiter);
```

### Monitoramento com Sentry

```bash
npm install @sentry/react
```

```tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Capturar erros
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}

// Adicionar contexto
Sentry.setUser({ id: user.id, email: user.email });
Sentry.setContext('transaction', { amount: 100 });
```

---

## ✅ Security Checklist

### Front-end
- [ ] Nunca usar `dangerouslySetInnerHTML` sem sanitizar
- [ ] Validar/sanitizar todos os inputs
- [ ] Não expor segredos em variáveis de ambiente
- [ ] Usar HTTPS em produção
- [ ] Implementar CSP
- [ ] Auditar dependências regularmente
- [ ] Não armazenar dados sensíveis em localStorage
- [ ] Validar URLs antes de usar em href

### Back-end
- [ ] Usar prepared statements (SQL)
- [ ] Validar todos os inputs
- [ ] Implementar rate limiting
- [ ] Usar CSRF tokens
- [ ] Cookies com httpOnly, secure, sameSite
- [ ] Implementar CORS corretamente
- [ ] Logar tentativas suspeitas
- [ ] Não expor stack traces em produção

### Geral
- [ ] Manter dependências atualizadas
- [ ] Revisar código (code review)
- [ ] Testes de segurança (penetration testing)
- [ ] Monitoramento ativo (Sentry, etc)
- [ ] Política de senhas fortes
- [ ] 2FA (autenticação em dois fatores)

---

## 📚 Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://react.dev/learn/avoiding-security-pitfalls)
- [Snyk Vulnerability Database](https://security.snyk.io/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

**Próximo:** Deploy e CI/CD 🚀
