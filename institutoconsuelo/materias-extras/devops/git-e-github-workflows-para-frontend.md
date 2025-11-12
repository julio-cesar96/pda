# 🌿 Git e GitHub Workflows para Projetos Frontend

> *"Git não é apenas controle de versão, é a máquina do tempo do código."*

---

## 🎯 Por que Git e GitHub?

**Git** é um sistema de controle de versão que rastreia mudanças no código.
**GitHub** é uma plataforma que hospeda repositórios Git e adiciona colaboração.

### Benefícios

- 📚 **Histórico completo** de mudanças
- 🔄 **Colaboração** em equipe
- 🔀 **Branches** para experimentar sem medo
- ⏪ **Reverter** erros facilmente
- 📦 **Backup** na nuvem
- 🚀 **Deploy automático** (CI/CD)

---

## 📘 Fundamentos do Git

### Instalação

```bash
# Verificar se Git está instalado
git --version

# Configuração inicial (uma vez)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Verificar configuração
git config --list
```

### Ciclo de Vida dos Arquivos

```text
Untracked → Staged → Committed → Pushed

┌─────────────┐
│ Working Dir │  (arquivos modificados)
└──────┬──────┘
       │ git add
       ▼
┌─────────────┐
│ Staging Area│  (preparados para commit)
└──────┬──────┘
       │ git commit
       ▼
┌─────────────┐
│ Local Repo  │  (salvos localmente)
└──────┬──────┘
       │ git push
       ▼
┌─────────────┐
│ Remote Repo │  (GitHub/GitLab)
└─────────────┘
```

---

## 🚀 Comandos Essenciais

### Iniciar Repositório

```bash
# Criar novo repositório
git init

# Clonar repositório existente
git clone https://github.com/usuario/repositorio.git
```

### Adicionar e Commitar

```bash
# Ver status dos arquivos
git status

# Adicionar arquivo específico
git add index.html

# Adicionar todos os arquivos
git add .

# Commit com mensagem
git commit -m "Adiciona página inicial"

# Add + Commit (apenas arquivos já rastreados)
git commit -am "Atualiza estilos"
```

### Histórico

```bash
# Ver histórico de commits
git log

# Histórico resumido (uma linha por commit)
git log --oneline

# Histórico gráfico
git log --oneline --graph --all

# Ver mudanças de um commit específico
git show abc123
```

### Desfazer Mudanças

```bash
# Descartar mudanças não commitadas (arquivo específico)
git checkout -- arquivo.js

# Descartar todas mudanças não commitadas
git reset --hard

# Remover arquivo da staging area
git reset HEAD arquivo.js

# Reverter commit (cria novo commit)
git revert abc123

# Voltar para commit anterior (apaga histórico!)
git reset --hard abc123  # ⚠️ Cuidado!
```

---

## 🌿 Branches (Ramificações)

### Por que usar Branches?

- ✅ Desenvolver features isoladamente
- ✅ Corrigir bugs sem afetar produção
- ✅ Experimentar sem medo
- ✅ Trabalhar em paralelo com equipe

### Comandos de Branch

```bash
# Listar branches
git branch

# Criar nova branch
git branch feature/nova-funcionalidade

# Mudar para branch
git checkout feature/nova-funcionalidade

# Criar e mudar (atalho)
git checkout -b feature/nova-funcionalidade

# Versão moderna (Git 2.23+)
git switch feature/nova-funcionalidade
git switch -c feature/nova-funcionalidade  # Criar e mudar

# Deletar branch
git branch -d feature/funcionalidade-antiga

# Deletar branch forçadamente
git branch -D feature/funcionalidade-antiga
```

### Workflow de Branches

```text
main (produção)
  ↓
  └─→ develop (desenvolvimento)
        ↓
        ├─→ feature/login (nova feature)
        ├─→ feature/carrinho
        └─→ bugfix/corrige-botao (correção)
```

---

## 🔀 Merge (Mesclar Branches)

### Merge Simples

```bash
# 1. Voltar para branch principal
git checkout main

# 2. Mesclar feature
git merge feature/nova-funcionalidade

# 3. Deletar branch (opcional)
git branch -d feature/nova-funcionalidade
```

### Resolver Conflitos

```bash
# Quando há conflito, Git marca os arquivos:
<<<<<<< HEAD
código da branch atual
=======
código da branch que está sendo mesclada
>>>>>>> feature/nova-funcionalidade

# Passos:
# 1. Editar arquivo manualmente (escolher código correto)
# 2. Remover marcadores (<<<, ===, >>>)
# 3. git add arquivo-resolvido.js
# 4. git commit -m "Resolve conflito de merge"
```

### Rebase (Alternativa ao Merge)

```bash
# Reaplica commits da feature sobre main
git checkout feature/login
git rebase main

# Vantagem: Histórico linear (mais limpo)
# Desvantagem: Reescreve histórico (não use em branches públicas!)
```

---

## 🌐 GitHub - Trabalhando com Repositórios Remotos

### Conectar Repositório Local ao GitHub

```bash
# 1. Criar repositório no GitHub (via web)

# 2. Adicionar remote
git remote add origin https://github.com/usuario/repositorio.git

# 3. Verificar remotes
git remote -v

# 4. Enviar código (primeira vez)
git push -u origin main

# 5. Envios subsequentes
git push
```

### Sincronizar com GitHub

```bash
# Baixar mudanças (não mescla)
git fetch origin

# Baixar e mesclar mudanças
git pull origin main

# Pull com rebase
git pull --rebase origin main
```

---

## 🔄 Pull Requests (PRs)

### O que é um Pull Request?

Uma **solicitação para mesclar** código de uma branch para outra, com revisão de código.

### Workflow de PR

```bash
# 1. Criar branch para feature
git checkout -b feature/botao-login

# 2. Desenvolver e commitar
git add .
git commit -m "Adiciona botão de login"

# 3. Enviar para GitHub
git push origin feature/botao-login

# 4. No GitHub:
#    - Clicar em "New Pull Request"
#    - Selecionar branches (feature/botao-login → main)
#    - Adicionar título e descrição
#    - Solicitar revisores
#    - Criar PR

# 5. Após aprovação, fazer merge no GitHub

# 6. Atualizar local
git checkout main
git pull origin main

# 7. Deletar branch localmente
git branch -d feature/botao-login
```

### Boas Práticas de PR

```markdown
# Título do PR
Adiciona funcionalidade de login com Google

# Descrição
## O que foi feito?
- Criado componente de botão de login
- Integração com Google OAuth
- Validação de token
- Redirecionamento após login

## Como testar?
1. Clicar no botão "Login com Google"
2. Autorizar aplicação
3. Verificar redirecionamento para dashboard

## Checklist
- [x] Código testado localmente
- [x] Sem erros no console
- [x] Documentação atualizada
- [x] Testes unitários passando

## Screenshots
![Login Button](screenshot.png)
```

---

## 🏷️ Tags e Releases

### Criar Tags

```bash
# Tag leve
git tag v1.0.0

# Tag anotada (recomendada)
git tag -a v1.0.0 -m "Versão 1.0.0 - Lançamento inicial"

# Listar tags
git tag

# Enviar tag para GitHub
git push origin v1.0.0

# Enviar todas tags
git push --tags
```

### Versionamento Semântico (SemVer)

```text
v1.2.3
│ │ │
│ │ └─→ PATCH (correções de bugs)
│ └───→ MINOR (novas features compatíveis)
└─────→ MAJOR (mudanças incompatíveis)

Exemplos:
v1.0.0 → Primeira versão
v1.1.0 → Nova feature
v1.1.1 → Correção de bug
v2.0.0 → Breaking change
```

---

## 🤝 Colaboração em Equipe

### Fork + Pull Request (Open Source)

```bash
# 1. Fazer fork do repositório no GitHub

# 2. Clonar SEU fork
git clone https://github.com/seu-usuario/repositorio.git

# 3. Adicionar upstream (repositório original)
git remote add upstream https://github.com/usuario-original/repositorio.git

# 4. Criar branch e desenvolver
git checkout -b feature/minha-contribuicao
# ... fazer alterações ...
git commit -m "Minha contribuição"

# 5. Enviar para SEU fork
git push origin feature/minha-contribuicao

# 6. Criar Pull Request no GitHub
#    (do seu fork para o repositório original)

# 7. Sincronizar com upstream (manter fork atualizado)
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Code Review

**Revisor:**
```markdown
# Comentários construtivos
✅ "Excelente organização do código!"
✅ "Poderia extrair isso para uma função separada?"
⚠️ "Cuidado: esse loop pode ser O(n²)"
❌ "Adicione tratamento de erro aqui"

# Aprovar PR
- Approve: Código bom, pode mesclar
- Request changes: Precisa de ajustes
- Comment: Feedback sem bloquear
```

**Autor:**
```bash
# Após feedback, fazer ajustes
git add .
git commit -m "Refatora função conforme review"
git push origin feature/minha-feature

# PR é atualizado automaticamente!
```

---

## 🚀 GitHub Actions (CI/CD)

### O que é CI/CD?

- **CI (Continuous Integration):** Integrar código frequentemente
- **CD (Continuous Deployment):** Deploy automático

### Workflow Básico

**.github/workflows/deploy.yml:**

```yaml
name: Deploy Frontend

# Quando executar
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# Jobs a executar
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      # Checkout do código
      - name: Checkout código
        uses: actions/checkout@v3
      
      # Setup Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      # Instalar dependências
      - name: Instalar dependências
        run: npm install
      
      # Rodar testes
      - name: Executar testes
        run: npm test
      
      # Build
      - name: Build produção
        run: npm run build
      
      # Deploy para GitHub Pages
      - name: Deploy GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Workflow para Lint

**.github/workflows/lint.yml:**

```yaml
name: Lint Code

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Instalar dependências
        run: npm install
      
      - name: ESLint
        run: npm run lint
      
      - name: Prettier
        run: npm run format:check
```

---

## 📁 .gitignore

### Arquivo .gitignore

```gitignore
# Dependências
node_modules/
bower_components/

# Build
dist/
build/
out/
.next/
.nuxt/

# Ambiente
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*

# Cache
.cache/
.parcel-cache/
.eslintcache

# Cobertura de testes
coverage/
.nyc_output/
```

---

## 🔐 Segurança

### Nunca Commite

```bash
# ❌ NUNCA commite:
- Senhas
- API Keys
- Tokens
- Arquivos .env

# ✅ Use variáveis de ambiente
# Crie .env.example (sem valores reais)
API_KEY=sua_api_key_aqui
DATABASE_URL=sua_url_aqui

# Adicione .env ao .gitignore
echo ".env" >> .gitignore
```

### Remover Dados Sensíveis do Histórico

```bash
# Se acidentalmente commitou dados sensíveis:

# 1. Remover do último commit
git reset HEAD~1
git add .gitignore
git commit -m "Remove dados sensíveis"

# 2. Se já fez push (mais complexo)
# Use BFG Repo-Cleaner ou git filter-branch
# Ou regenere API keys comprometidas!
```

---

## 🎯 Boas Práticas

### Commits

```bash
# ✅ BOM: Mensagens descritivas
git commit -m "Adiciona validação de email no formulário de login"
git commit -m "Corrige bug de scroll infinito na lista de produtos"
git commit -m "Refatora componente de card para usar hooks"

# ❌ RUIM: Mensagens vagas
git commit -m "fix"
git commit -m "update"
git commit -m "wip"
```

### Conventional Commits

```bash
# Formato: <tipo>(<escopo>): <descrição>

git commit -m "feat(auth): adiciona login com Google"
git commit -m "fix(cart): corrige cálculo de desconto"
git commit -m "docs(readme): atualiza instruções de instalação"
git commit -m "style(button): ajusta padding e cores"
git commit -m "refactor(api): extrai lógica de fetch para service"
git commit -m "test(login): adiciona testes unitários"
git commit -m "chore(deps): atualiza dependências"

# Tipos comuns:
# feat: Nova funcionalidade
# fix: Correção de bug
# docs: Documentação
# style: Formatação, CSS
# refactor: Refatoração de código
# test: Testes
# chore: Tarefas de manutenção
```

### Branches

```bash
# Nomenclatura clara
feature/nome-da-feature
bugfix/nome-do-bug
hotfix/correcao-urgente
refactor/nome-da-refatoracao

# Exemplos:
git checkout -b feature/dark-mode
git checkout -b bugfix/broken-header-mobile
git checkout -b refactor/extract-api-service
```

### Pull Requests

- ✅ **1 PR = 1 feature/bugfix**
- ✅ **Pequenos e frequentes** (fáceis de revisar)
- ✅ **Descrição clara** do que foi feito
- ✅ **Screenshots** quando envolve UI
- ✅ **Testes passando** antes de criar PR
- ❌ **Evite PRs gigantes** (>500 linhas)

---

## 🛠️ Ferramentas Úteis

### GitHub Desktop

```text
Interface gráfica para Git (para iniciantes)
https://desktop.github.com/
```

### VS Code Git

```text
Git integrado no VS Code:
- Source Control (Ctrl+Shift+G)
- GitLens extension (histórico detalhado)
- Git Graph extension (visualizar branches)
```

### Aliases Úteis

```bash
# Adicionar aliases no ~/.gitconfig ou ~/.zshrc

git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --all"

# Uso:
git st    # em vez de git status
git co main
git lg
```

---

## 🚨 Resolvendo Problemas Comuns

### "I made a huge mistake!"

```bash
# Commitou na branch errada
git log  # Copie hash do commit
git checkout branch-correta
git cherry-pick abc123  # Aplica commit na branch correta
git checkout branch-errada
git reset --hard HEAD~1  # Remove commit da branch errada

# Commitou arquivo errado
git reset HEAD~1  # Desfaz último commit (mantém alterações)
git add arquivo-correto.js
git commit -m "Mensagem correta"

# Mensagem de commit errada (último commit)
git commit --amend -m "Mensagem correta"

# Esqueceu de adicionar arquivo no último commit
git add arquivo-esquecido.js
git commit --amend --no-edit
```

### Conflitos de Merge

```bash
# Durante merge/pull
# 1. Ver arquivos em conflito
git status

# 2. Abrir arquivo e resolver manualmente
# Ou usar ferramenta visual:
git mergetool

# 3. Marcar como resolvido
git add arquivo-resolvido.js

# 4. Finalizar merge
git commit -m "Resolve conflitos de merge"
```

---

## 📚 Recursos Adicionais

- **Git Book (oficial):** <https://git-scm.com/book/pt-br>
- **GitHub Docs:** <https://docs.github.com/>
- **Oh My Git! (jogo):** <https://ohmygit.org/>
- **Learn Git Branching:** <https://learngitbranching.js.org/>
- **GitHub Skills:** <https://skills.github.com/>

---

## 🎯 Workflow Completo (Resumo)

```bash
# 1. Clonar repositório
git clone https://github.com/usuario/projeto.git
cd projeto

# 2. Criar branch para feature
git checkout -b feature/nova-funcionalidade

# 3. Desenvolver
# ... editar arquivos ...

# 4. Adicionar e commitar
git add .
git commit -m "feat: adiciona nova funcionalidade"

# 5. Enviar para GitHub
git push origin feature/nova-funcionalidade

# 6. Criar Pull Request no GitHub

# 7. Após aprovação, mesclar

# 8. Atualizar main local
git checkout main
git pull origin main

# 9. Deletar branch
git branch -d feature/nova-funcionalidade

# 10. Repetir processo para próxima feature!
```

**Domine Git e GitHub para colaborar efetivamente em projetos! 🌿✨**
