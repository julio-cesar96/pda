# 📦 Gerenciadores de Pacotes - npm, pnpm e Yarn

> *"Gerenciadores de pacotes são a cola que une a comunidade JavaScript."*

---

## 🎯 O que são Gerenciadores de Pacotes?

**Gerenciadores de pacotes** são ferramentas que automatizam a instalação, atualização e remoção de bibliotecas (pacotes) em projetos JavaScript/TypeScript.

**Principais benefícios:**
- ✅ Instalar bibliotecas com um comando
- ✅ Gerenciar versões de dependências
- ✅ Compartilhar projetos facilmente
- ✅ Executar scripts de build/teste
- ✅ Garantir consistência entre ambientes

**Analogia:** Como uma loja de aplicativos (App Store) para código!

---

## 📊 Comparação: npm vs pnpm vs Yarn

| Característica | npm | Yarn | pnpm |
|---------------|-----|------|------|
| **Velocidade** | ⚡ Médio | ⚡⚡ Rápido | ⚡⚡⚡ Muito rápido |
| **Espaço em disco** | 💾 Alto | 💾 Alto | 💾 Mínimo |
| **Instalação** | Vem com Node.js | Manual | Manual |
| **Lockfile** | package-lock.json | yarn.lock | pnpm-lock.yaml |
| **Workspaces** | ✅ Sim | ✅ Sim | ✅ Sim |
| **Popularidade** | 🌟🌟🌟🌟🌟 | 🌟🌟🌟🌟 | 🌟🌟🌟 |

---

## 📘 npm (Node Package Manager)

### Características

- **Padrão:** Vem instalado com Node.js
- **Registry:** npmjs.com (maior repositório de pacotes JavaScript)
- **Comunidade:** Mais de 2 milhões de pacotes

### Instalação

```bash
# npm já vem com Node.js
# Verificar versão
npm --version

# Atualizar npm
npm install -g npm@latest
```

### Comandos Essenciais

```bash
# Inicializar projeto (cria package.json)
npm init
npm init -y  # Aceita padrões automaticamente

# Instalar dependências do projeto
npm install              # Instala tudo do package.json
npm i                   # Atalho

# Instalar pacote específico
npm install lodash
npm install express
npm i axios

# Instalar como dependência de desenvolvimento
npm install --save-dev jest
npm i -D typescript      # Atalho

# Instalar globalmente (comandos CLI)
npm install -g nodemon
npm i -g typescript

# Desinstalar
npm uninstall lodash
npm un express          # Atalho

# Atualizar pacotes
npm update
npm update lodash

# Listar pacotes instalados
npm list
npm list --depth=0      # Apenas nível raiz

# Procurar pacotes
npm search react

# Ver informações de um pacote
npm info react
npm view react versions  # Ver versões disponíveis

# Executar scripts
npm run build
npm run dev
npm test                # Atalho para npm run test
npm start              # Atalho para npm run start

# Limpar cache
npm cache clean --force
```

### package.json

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Meu projeto incrível",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon src/index.js",
    "build": "tsc",
    "test": "jest",
    "start": "node dist/index.js"
  },
  "keywords": ["javascript", "api"],
  "author": "Seu Nome",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "jest": "^29.7.0"
  }
}
```

### Versionamento Semântico (SemVer)

```json
{
  "dependencies": {
    "express": "4.18.2",     // Versão exata
    "axios": "^1.6.0",       // ^1.6.0 = >=1.6.0 <2.0.0 (minor/patch)
    "lodash": "~4.17.21",    // ~4.17.21 = >=4.17.21 <4.18.0 (patch)
    "react": "*",            // Qualquer versão (não recomendado!)
    "vue": ">=3.0.0"         // 3.0.0 ou superior
  }
}
```

**Formato:** `MAJOR.MINOR.PATCH`
- **MAJOR:** Mudanças incompatíveis (breaking changes)
- **MINOR:** Novas funcionalidades (compatível)
- **PATCH:** Correções de bugs (compatível)

---

## 🧶 Yarn

### Características

- **Performance:** Mais rápido que npm (especialmente Yarn 2+)
- **Segurança:** Verifica integridade de pacotes
- **Offline:** Cache robusto para instalações offline
- **Determinístico:** Sempre instala as mesmas versões

### Instalação

```bash
# Via npm
npm install -g yarn

# Verificar versão
yarn --version
```

### Comandos Essenciais

```bash
# Inicializar projeto
yarn init
yarn init -y

# Instalar dependências
yarn install
yarn              # Atalho

# Adicionar pacote
yarn add lodash
yarn add express
yarn add axios

# Adicionar como dev dependency
yarn add --dev jest
yarn add -D typescript

# Adicionar globalmente
yarn global add nodemon

# Remover pacote
yarn remove lodash

# Atualizar pacotes
yarn upgrade
yarn upgrade lodash

# Listar pacotes
yarn list
yarn list --depth=0

# Informações de pacote
yarn info react

# Executar scripts
yarn run build
yarn dev          # Sem 'run'
yarn test
yarn start

# Limpar cache
yarn cache clean
```

### yarn.lock

```yaml
# yarn.lock - NÃO editar manualmente!
express@^4.18.2:
  version "4.18.2"
  resolved "https://registry.yarnpkg.com/express/-/express-4.18.2.tgz"
  integrity sha512-5/PsL6iGPdfQ/lKM1UuielYgv3BUoJfz1aUwU9vHZ+J7gyvwdQXFEBIEIaxeGf0GIcreATNyBExtalisDbuMqQ==
  dependencies:
    accepts "~1.3.8"
    array-flatten "1.1.1"
```

---

## ⚡ pnpm (Performant npm)

### Características

- **Economia de espaço:** Usa hard links (não duplica pacotes)
- **Velocidade:** Mais rápido que npm e Yarn
- **Estrito:** Não permite acessar dependências não declaradas
- **Monorepos:** Excelente suporte para workspaces

### Instalação

```bash
# Via npm
npm install -g pnpm

# Via script (Linux/macOS)
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Verificar versão
pnpm --version
```

### Comandos Essenciais

```bash
# Inicializar projeto
pnpm init

# Instalar dependências
pnpm install
pnpm i

# Adicionar pacote
pnpm add lodash
pnpm add express

# Adicionar como dev dependency
pnpm add -D jest

# Adicionar globalmente
pnpm add -g typescript

# Remover pacote
pnpm remove lodash

# Atualizar pacotes
pnpm update
pnpm up lodash

# Listar pacotes
pnpm list

# Executar scripts
pnpm run build
pnpm dev
pnpm test

# Limpar cache
pnpm store prune
```

### Como pnpm economiza espaço

```text
npm/Yarn:
projeto-1/node_modules/lodash  (1MB)
projeto-2/node_modules/lodash  (1MB)
projeto-3/node_modules/lodash  (1MB)
Total: 3MB

pnpm:
~/.pnpm-store/lodash           (1MB)
projeto-1/node_modules/lodash  → link para store
projeto-2/node_modules/lodash  → link para store
projeto-3/node_modules/lodash  → link para store
Total: 1MB
```

---

## 🆚 Quando Usar Cada Um?

### Use npm se:

- ✅ Quer a solução padrão (já vem com Node.js)
- ✅ Projeto pequeno/médio
- ✅ Primeiro projeto JavaScript
- ✅ Máxima compatibilidade

### Use Yarn se:

- ✅ Quer velocidade e cache robusto
- ✅ Trabalha com monorepos
- ✅ Prefere sintaxe mais simples
- ✅ Quer instalações offline

### Use pnpm se:

- ✅ Quer **máxima performance**
- ✅ Trabalha com **múltiplos projetos** (economizar disco)
- ✅ Trabalha com **monorepos**
- ✅ Quer **controle estrito de dependências**

---

## 📝 Scripts no package.json

### Scripts Comuns

```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean",
    "postbuild": "echo Build completo!"
  }
}
```

### Executando Scripts

```bash
# npm
npm run dev
npm test         # Atalho
npm start        # Atalho

# Yarn
yarn dev
yarn test
yarn start

# pnpm
pnpm dev
pnpm test
pnpm start
```

### Scripts Lifecycle

```json
{
  "scripts": {
    "prebuild": "echo Antes do build",
    "build": "tsc",
    "postbuild": "echo Depois do build",
    
    "pretest": "npm run lint",
    "test": "jest",
    "posttest": "echo Testes completos"
  }
}
```

**Ordem de execução:**
1. `prebuild` (se existir)
2. `build`
3. `postbuild` (se existir)

---

## 🔒 Lockfiles - Garantindo Consistência

### Por que existem?

**Problema:** package.json permite ranges de versão (`^1.0.0`)

```json
{
  "dependencies": {
    "axios": "^1.6.0"  // Pode instalar 1.6.0, 1.6.1, 1.7.0, etc.
  }
}
```

**Solução:** Lockfiles garantem que todos instalem **exatamente** as mesmas versões.

### Tipos de Lockfile

```text
npm     → package-lock.json
Yarn    → yarn.lock
pnpm    → pnpm-lock.yaml
```

**⚠️ IMPORTANTE:**
- ✅ **Sempre commite** lockfiles no Git
- ✅ **Nunca edite** lockfiles manualmente
- ✅ **Delete e reinstale** se houver conflitos

---

## 🌳 Workspaces (Monorepos)

### O que são Workspaces?

Gerenciar múltiplos pacotes em um único repositório.

### Estrutura

```text
meu-monorepo/
├── package.json
├── packages/
│   ├── app-web/
│   │   └── package.json
│   ├── app-mobile/
│   │   └── package.json
│   └── shared/
│       └── package.json
```

### Configuração npm/yarn

**package.json (raiz):**

```json
{
  "name": "meu-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

### Configuração pnpm

**pnpm-workspace.yaml:**

```yaml
packages:
  - 'packages/*'
```

---

## 🎯 Boas Práticas

### ✅ Faça

```bash
# 1. Use lockfiles
git add package-lock.json yarn.lock pnpm-lock.yaml

# 2. Especifique versões no package.json
"dependencies": {
  "express": "^4.18.2"  # Específico
}

# 3. Use scripts para comandos comuns
npm run dev
npm run build

# 4. Instale dependências exatas em produção
npm ci  # Usa lockfile, não package.json

# 5. Atualize regularmente
npm outdated
npm update
```

### ❌ Evite

```bash
# 1. Não commite node_modules
echo "node_modules/" >> .gitignore

# 2. Não misture gerenciadores no mesmo projeto
# Escolha um: npm, Yarn OU pnpm

# 3. Não use versões genéricas
"dependencies": {
  "lodash": "*"  # ❌ Muito amplo!
}

# 4. Não edite lockfiles manualmente
# Deixe o gerenciador fazer isso

# 5. Não instale tudo globalmente
npm i -g express  # ❌ Use local quando possível
```

---

## 🔧 Comandos Úteis

### Auditoria de Segurança

```bash
# npm
npm audit
npm audit fix          # Corrigir automaticamente
npm audit fix --force  # Forçar atualizações breaking

# Yarn
yarn audit
yarn audit --fix

# pnpm
pnpm audit
pnpm audit --fix
```

### Limpeza

```bash
# Remover node_modules
rm -rf node_modules

# Reinstalar tudo do zero
npm ci           # npm
yarn install --frozen-lockfile  # Yarn
pnpm install --frozen-lockfile  # pnpm
```

### Publicar Pacote

```bash
# Login no npm
npm login

# Publicar
npm publish

# Publicar versão beta
npm publish --tag beta
```

---

## 📦 Criando seu Primeiro Projeto

```bash
# 1. Criar pasta
mkdir meu-projeto
cd meu-projeto

# 2. Inicializar
npm init -y

# 3. Instalar dependências
npm install express

# 4. Instalar dev dependencies
npm install -D nodemon typescript @types/node

# 5. Criar .gitignore
echo "node_modules/" > .gitignore

# 6. Adicionar scripts
# Edite package.json:
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  }
}

# 7. Executar
npm run dev
```

---

## 🚀 Migração Entre Gerenciadores

### npm → Yarn

```bash
# Remover lockfile npm
rm package-lock.json

# Instalar com Yarn
yarn install
```

### npm → pnpm

```bash
# Remover lockfile npm
rm package-lock.json

# Instalar com pnpm
pnpm install
```

### Yarn → pnpm

```bash
# Remover lockfile Yarn
rm yarn.lock

# Instalar com pnpm
pnpm install
```

---

## 📚 Recursos Adicionais

- **npm:** <https://docs.npmjs.com/>
- **Yarn:** <https://yarnpkg.com/>
- **pnpm:** <https://pnpm.io/>
- **npmjs.com:** Pesquisar pacotes

---

## 🎯 Resumo

| Ação | npm | Yarn | pnpm |
|------|-----|------|------|
| **Inicializar** | `npm init` | `yarn init` | `pnpm init` |
| **Instalar tudo** | `npm install` | `yarn` | `pnpm install` |
| **Adicionar pacote** | `npm i axios` | `yarn add axios` | `pnpm add axios` |
| **Dev dependency** | `npm i -D jest` | `yarn add -D jest` | `pnpm add -D jest` |
| **Remover** | `npm un axios` | `yarn remove axios` | `pnpm remove axios` |
| **Executar script** | `npm run dev` | `yarn dev` | `pnpm dev` |
| **Global** | `npm i -g pkg` | `yarn global add pkg` | `pnpm add -g pkg` |

**Escolha o gerenciador que melhor se adequa ao seu projeto e mantenha a consistência! 📦✨**
