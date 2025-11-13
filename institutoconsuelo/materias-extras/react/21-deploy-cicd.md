# 🚀 Deploy e CI/CD para React

> *"Da produção local ao ar - Automatização e entrega contínua"*

---

## 📋 Índice

1. [Estratégias de Deploy](#estratégias-de-deploy)
2. [Build de Produção](#build-de-produção)
3. [Plataformas de Deploy](#plataformas-de-deploy)
4. [CI/CD com GitHub Actions](#cicd-github-actions)
5. [Variáveis de Ambiente](#variáveis-de-ambiente)
6. [Otimizações de Build](#otimizações-de-build)
7. [CDN e Cache](#cdn-e-cache)
8. [Monitoring e Error Tracking](#monitoring)
9. [Rollback e Versionamento](#rollback)
10. [Preview Deployments](#preview-deployments)

---

## 🎯 Estratégias de Deploy

### Tipos de Deploy

```
Static Hosting   → Vercel, Netlify, GitHub Pages
Serverless       → AWS Lambda, Cloudflare Workers
Containers       → Docker, Kubernetes
Tradicionais     → VPS, EC2, Digital Ocean
```

### Ambientes

```
Development  → localhost
Staging      → staging.example.com (testes)
Production   → example.com (usuários reais)
```

---

## 📦 Build de Produção

### Vite Build

```bash
# Build
npm run build

# Preview local
npm run preview
```

**package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### Otimizações Automáticas

- ✅ Minificação de JS/CSS
- ✅ Tree shaking (remoção de código não usado)
- ✅ Code splitting
- ✅ Hashing de arquivos (cache busting)
- ✅ Compressão gzip/brotli

### Estrutura do Build

```
dist/
├── index.html
├── assets/
│   ├── index-a1b2c3d4.js
│   ├── index-e5f6g7h8.css
│   ├── vendor-i9j0k1l2.js
│   └── logo-m3n4o5p6.png
└── favicon.ico
```

---

## ☁️ Plataformas de Deploy

### Vercel (Recomendado para React)

```bash
npm install -g vercel
vercel login
vercel
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**netlify.toml:**
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### GitHub Pages

```bash
npm install -g gh-pages
```

**package.json:**
```json
{
  "homepage": "https://username.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**vite.config.ts:**
```typescript
export default defineConfig({
  base: '/repo-name/', // Nome do repositório
  plugins: [react()],
});
```

### AWS S3 + CloudFront

```bash
# Instalar AWS CLI
aws configure

# Build
npm run build

# Upload para S3
aws s3 sync dist/ s3://my-bucket --delete

# Invalidar cache do CloudFront
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"
```

### Docker

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /assets {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

**Build e Run:**
```bash
docker build -t my-react-app .
docker run -p 3000:80 my-react-app
```

---

## 🔄 CI/CD com GitHub Actions

### Workflow Básico

**.github/workflows/deploy.yml:**
```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Workflow Completo com Testes

```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Unit tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Deploy to production
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Secrets no GitHub

```
Settings → Secrets and variables → Actions → New repository secret

VERCEL_TOKEN
ORG_ID
PROJECT_ID
```

---

## 🔐 Variáveis de Ambiente

### Desenvolvimento vs Produção

```bash
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=MyApp Dev

# .env.production
VITE_API_URL=https://api.myapp.com
VITE_APP_NAME=MyApp
```

### GitHub Actions

```yaml
- name: Build
  run: npm run build
  env:
    VITE_API_URL: ${{ secrets.API_URL }}
    VITE_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
```

### Vercel

```bash
# Via CLI
vercel env add VITE_API_URL production
vercel env add VITE_SENTRY_DSN production

# Via UI: Settings → Environment Variables
```

---

## ⚡ Otimizações de Build

### Code Splitting

```tsx
import { lazy, Suspense } from 'react';

// Lazy load rotas
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### Bundle Analysis

```bash
npm install -D rollup-plugin-visualizer
```

**vite.config.ts:**
```typescript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

### Tree Shaking

```tsx
// ❌ Evite - importa toda a biblioteca
import _ from 'lodash';

// ✅ Bom - importa apenas o necessário
import debounce from 'lodash/debounce';

// ✅ Melhor - bibliotecas tree-shakeable
import { debounce } from 'lodash-es';
```

### Compressão

**vite.config.ts:**
```typescript
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
});
```

---

## 🌐 CDN e Cache

### Cache Headers

**Vercel (vercel.json):**
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### Service Worker para Cache

```tsx
// src/sw.ts
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

// Cache API calls
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

---

## 📊 Monitoring e Error Tracking

### Sentry

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

// Criar release no deploy
// sentry-cli releases new $VERSION
// sentry-cli releases deploys $VERSION new -e production
```

### Web Vitals

```tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ name, value, id }) {
  // Enviar para analytics (Google Analytics, etc)
  console.log(name, value, id);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## 🔙 Rollback e Versionamento

### Semantic Versioning

```json
{
  "version": "1.2.3"
}
// MAJOR.MINOR.PATCH
// 1.0.0 → Breaking changes
// 0.1.0 → New features
// 0.0.1 → Bug fixes
```

### Git Tags

```bash
# Criar tag
git tag -a v1.2.3 -m "Release 1.2.3"
git push origin v1.2.3

# Rollback
git checkout v1.2.2
vercel --prod
```

### Vercel Rollback

```bash
# Listar deployments
vercel ls

# Promover deployment anterior
vercel promote <deployment-url>
```

---

## 👀 Preview Deployments

### GitHub Actions para PRs

```yaml
name: Preview

on:
  pull_request:
    branches: [main]

jobs:
  preview:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install and Build
        run: |
          npm ci
          npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        id: vercel
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
      
      - name: Comment PR
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `✅ Preview deployment: ${{ steps.vercel.outputs.preview-url }}`
            })
```

---

## ✅ Deploy Checklist

### Antes do Deploy

- [ ] Testes passando
- [ ] Lint sem erros
- [ ] Build local funciona
- [ ] Variáveis de ambiente configuradas
- [ ] Secrets seguros (não commitados)
- [ ] Dependências atualizadas
- [ ] Bundle size aceitável (<200KB gzipped)

### Configuração

- [ ] HTTPS habilitado
- [ ] Custom domain configurado
- [ ] Cache headers corretos
- [ ] CSP configurado
- [ ] Error tracking (Sentry)
- [ ] Analytics configurado
- [ ] Monitoring ativo

### Pós-Deploy

- [ ] Testar em produção
- [ ] Verificar Core Web Vitals
- [ ] Monitorar erros
- [ ] Validar SEO
- [ ] Testar em diferentes navegadores
- [ ] Testar em mobile

---

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Web Vitals](https://web.dev/vitals/)

---

**Próximo:** Design Systems 🎨
