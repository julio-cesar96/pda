# Projeto Final - EduTech Platform 2.0

## Sistema Completo de Plataforma de Cursos Online (Fullstack)

---

## 📋 Sumário

- [Descrição](#descrição)
- [Contexto e Evolução](#contexto-e-evolução)
- [Organização das Equipes](#organização-das-equipes)
- [Requisitos Funcionais](#requisitos-funcionais)
  - [Módulo de Autenticação](#módulo-de-autenticação)
  - [Módulo do Professor](#módulo-do-professor)
  - [Módulo do Aluno](#módulo-do-aluno)
  - [Módulo do Administrador](#módulo-do-administrador)
  - [Funcionalidades Extras](#funcionalidades-extras-opcional)
- [Requisitos Técnicos](#requisitos-técnicos)
  - [Backend (Python)](#backend-python)
  - [Frontend (JavaScript)](#frontend-javascript)
  - [Integração](#integração)
- [Cronograma Sugerido](#cronograma-sugerido)
- [Entregáveis](#entregáveis)
- [Apresentação](#apresentação)
- [Recursos e Referências](#recursos-e-referências)
- [Rubrica de Avaliação](#rubrica-de-avaliação)

---

## 🎯 Descrição

Este é o **projeto final** do curso, onde vocês irão construir uma **aplicação fullstack completa** de uma plataforma de cursos online (EduTech Platform 2.0). Este projeto é uma **evolução** do mini-projeto anterior, transformando o sistema de banco de dados e scripts Python em uma **aplicação web real e funcional**.

O projeto será desenvolvido de forma **colaborativa**: metade da turma trabalhará no **backend (Python/FastAPI)** e a outra metade no **frontend (HTML/CSS/JavaScript)**. Vocês irão integrar as duas partes, criando uma aplicação completa, profissional e funcional.

### 🎓 Objetivo Pedagógico

Este projeto consolida **todos os conhecimentos** adquiridos durante o curso:

- **SQL e Modelagem de Dados**: Estrutura de banco robusta e normalizada
- **Python e APIs REST**: Backend com FastAPI, autenticação e CRUD completo
- **Frontend Moderno**: Interface interativa com JavaScript e consumo de APIs
- **Trabalho em Equipe**: Colaboração via Git/GitHub, divisão de tarefas e integração
- **Boas Práticas**: Código limpo, documentação, testes e deploy

---

## 📚 Contexto e Evolução

### Do Mini-Projeto ao Projeto Final

No **mini-projeto**, vocês criaram:
- ✅ Modelagem de banco de dados PostgreSQL
- ✅ Consultas SQL complexas
- ✅ Scripts Python para geração e validação de dados

Agora, no **projeto final**, vocês irão:
- 🚀 Transformar isso em uma **API REST funcional**
- 🚀 Criar uma **interface web interativa**
- 🚀 Implementar **autenticação e autorização**
- 🚀 Permitir que usuários **interajam** com o sistema via navegador
- 🚀 Trabalhar em **equipe** integrando backend e frontend

### Tecnologias Utilizadas

| Camada | Tecnologias |
|--------|-------------|
| **Backend** | Python 3.x, FastAPI, SQLAlchemy, PostgreSQL, JWT, Pydantic, Alembic |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Fetch API, (opcional: React) |
| **DevOps** | Git/GitHub, Docker (opcional), Render/Railway (deploy backend), Vercel/Netlify (deploy frontend) |
| **Ferramentas** | VS Code, Postman/Thunder Client, pgAdmin, Figma (opcional) |

---

## 👥 Organização das Equipes

### 🎲 Formação dos Times

**IMPORTANTE:** A divisão das equipes será feita por **sorteio aleatório** no primeiro dia do projeto. Isso simula o ambiente real de trabalho, onde nem sempre escolhemos com quem trabalhar, e é uma oportunidade de desenvolver habilidades de colaboração com diferentes perfis.

### 📋 Estrutura Organizacional

O projeto terá a seguinte hierarquia:

#### 👔 Tech Leads (2 pessoas)

Serão escolhidos **2 Tech Leads** (podem ser por votação ou indicação do professor):
- **1 Tech Lead Backend** (Python/FastAPI)
- **1 Tech Lead Frontend** (HTML/CSS/JavaScript ou React)

**Responsabilidades dos Tech Leads:**
- 📊 **Gestão técnica**: Supervisionar a arquitetura e qualidade do código
- 🗓️ **Organização**: Ajudar a dividir tarefas e priorizar o backlog
- 🤝 **Mentoria**: Auxiliar membros da equipe com dúvidas técnicas
- 🔍 **Code Review**: Revisar Pull Requests antes do merge
- 🔗 **Integração**: Garantir comunicação entre backend e frontend
- 💻 **Codificação**: Também desenvolver funcionalidades (não só gerenciar!)
- 📣 **Comunicação**: Reportar progresso e bloqueios

**⚠️ Nota importante:** Tech Leads **também programam**! Não são só gestores, mas desenvolvedores que também ajudam a organizar o time.

### 🏗️ Divisão de Trabalho

#### 🐍 Equipe Backend (Python/FastAPI)

**Tamanho:** ~50% da turma  
**Tech Lead:** 1 pessoa responsável

**Responsabilidades:**
- Modelagem e criação do banco de dados PostgreSQL
- Desenvolvimento da API REST com FastAPI
- Implementação de autenticação e autorização (JWT)
- CRUD completo para todas as entidades
- Validações de dados com Pydantic
- Documentação automática (Swagger/OpenAPI)
- Testes básicos de endpoints
- Deploy do backend

**Sub-grupos sugeridos:**
1. **Squad Autenticação**: Login, registro, JWT, controle de acesso
2. **Squad Cursos**: CRUD de cursos, módulos, aulas, materiais
3. **Squad Usuários**: Perfis, progresso, matrículas, avaliações
4. **Squad Admin**: Dashboard, estatísticas, gerenciamento

#### 🎨 Equipe Frontend (HTML/CSS/JavaScript)

**Tamanho:** ~50% da turma  
**Tech Lead:** 1 pessoa responsável

**Responsabilidades:**
- Design e prototipação das telas
- Desenvolvimento da interface com HTML/CSS
- Implementação de interatividade com JavaScript
- Integração com a API (consumo via Fetch)
- Tratamento de erros e feedback ao usuário
- Responsividade (mobile-first)
- Deploy do frontend

**Sub-grupos sugeridos:**
1. **Squad Landing/Auth**: Página inicial, login, registro, recuperação de senha
2. **Squad Professor**: Dashboard, criação de cursos, gerenciamento de conteúdo
3. **Squad Aluno**: Listagem de cursos, visualização de aulas, progresso
4. **Squad Admin**: Painel administrativo, estatísticas, gráficos

### 📊 Gestão de Projeto (Obrigatório)

#### Ferramenta de Backlog

Vocês **DEVEM** utilizar uma ferramenta de gestão de projeto para organizar as tarefas:

**Opções recomendadas:**
- **Trello** (mais simples, visual, gratuito)
- **Jira** (mais profissional, usado no mercado)
- **GitHub Projects** (integrado ao repositório)
- **Notion** (flexível e colaborativo)

#### Estrutura do Backlog

Organizem o backlog em colunas:
1. **📋 Backlog**: Todas as tarefas a fazer
2. **📝 To Do**: Tarefas priorizadas para a sprint atual
3. **🔨 In Progress**: Tarefas sendo desenvolvidas
4. **👀 In Review**: Aguardando code review/teste
5. **✅ Done**: Tarefas concluídas

#### 📝 Sugestão Inicial de Backlog

**Sprint 1 - Setup e Autenticação (Semana 1):**

*Backend:*
- [ ] Configurar ambiente (FastAPI, PostgreSQL, SQLAlchemy)
- [ ] Criar estrutura de pastas do projeto
- [ ] Modelar banco de dados (todas as tabelas)
- [ ] Criar migrations com Alembic
- [ ] Implementar model de User
- [ ] Criar endpoint de registro (POST /auth/register)
- [ ] Criar endpoint de login (POST /auth/login)
- [ ] Implementar JWT e middleware de autenticação
- [ ] Criar endpoint de perfil (GET /users/me)
- [ ] Documentar no README como rodar o projeto

*Frontend:*
- [ ] Configurar ambiente (HTML/CSS/JS ou React)
- [ ] Criar estrutura de pastas do projeto
- [ ] Desenvolver página de login
- [ ] Desenvolver página de registro
- [ ] Implementar validação de formulários
- [ ] Criar função de API request (fetch/axios)
- [ ] Implementar armazenamento de token (localStorage)
- [ ] Criar redirecionamentos baseados em papel
- [ ] Desenvolver página inicial (landing page)
- [ ] Documentar no README como rodar o projeto

**Sprint 2 - CRUD de Cursos (Semana 2):**

*Backend:*
- [ ] Criar models de Course, Module, Lesson
- [ ] Endpoint: Listar cursos (GET /courses)
- [ ] Endpoint: Criar curso (POST /courses) - professor only
- [ ] Endpoint: Editar curso (PUT /courses/{id})
- [ ] Endpoint: Deletar curso (DELETE /courses/{id})
- [ ] Endpoint: Detalhes do curso (GET /courses/{id})
- [ ] Implementar filtros e paginação
- [ ] Adicionar validações e tratamento de erros

*Frontend:*
- [ ] Página de listagem de cursos
- [ ] Página de detalhes do curso
- [ ] Formulário de criação de curso (professor)
- [ ] Formulário de edição de curso (professor)
- [ ] Implementar busca e filtros
- [ ] Cards de curso com design responsivo
- [ ] Integrar com API de cursos

**Sprint 3 - Matrículas e Progresso (Semana 3):**

*Backend:*
- [ ] Criar models de Enrollment e Progress
- [ ] Endpoint: Matricular em curso (POST /enrollments)
- [ ] Endpoint: Listar cursos do aluno (GET /enrollments/my-courses)
- [ ] Endpoint: Marcar aula como concluída (POST /progress)
- [ ] Endpoint: Buscar progresso do aluno (GET /progress/{course_id})
- [ ] Implementar regras de negócio (não duplicar matrícula)

*Frontend:*
- [ ] Botão de matrícula em cursos
- [ ] Dashboard do aluno (meus cursos)
- [ ] Interface de visualização de aula
- [ ] Barra de progresso por curso
- [ ] Navegação entre aulas (próxima/anterior)
- [ ] Integrar com APIs de matrícula e progresso

**Sprint 4 - Atividades e Admin (Semana 4):**

*Backend:*
- [ ] Criar models de Activity e Submission
- [ ] Endpoints CRUD de atividades
- [ ] Endpoint de submissão de atividade
- [ ] Endpoint de correção (nota e feedback)
- [ ] Dashboard admin: estatísticas gerais
- [ ] Endpoints de gerenciamento de usuários (admin)
- [ ] Deploy do backend

*Frontend:*
- [ ] Interface de atividades (visualizar, enviar)
- [ ] Dashboard do professor (alunos, correções)
- [ ] Dashboard administrativo (estatísticas)
- [ ] Gráficos e visualizações (opcional: Chart.js)
- [ ] Responsividade final e polimento
- [ ] Deploy do frontend

**Sprint 5 - Refinamento e Apresentação (Semana 5):**
- [ ] Correção de bugs
- [ ] Testes de integração
- [ ] Refinamento de UI/UX
- [ ] Documentação final (README, ADR, PRD)
- [ ] Preparação de slides
- [ ] Gravação de vídeo demo
- [ ] Post no LinkedIn
- [ ] Ensaio de apresentação

**💡 Dica:** Criem cards detalhados com:
- Título claro da tarefa
- Descrição do que precisa ser feito
- Critérios de aceitação
- Responsável (após atribuição)
- Estimativa de tempo (opcional)
- Links/referências úteis

### 🤝 Dinâmica de Trabalho

#### Reuniões Recomendadas

1. **Kick-off (Dia 1)**: 
   - Apresentação do projeto
   - Sorteio dos times
   - Eleição/nomeação dos Tech Leads
   - Divisão em squads
   - Setup do backlog

2. **Daily Stand-up** (15 min, todo dia ou dia sim/dia não):
   - O que fiz ontem?
   - O que vou fazer hoje?
   - Tenho algum bloqueio?

3. **Review de Sprint** (final de cada semana):
   - Demonstração do que foi feito
   - Feedback entre equipes
   - Ajustes no backlog

4. **Retrospectiva** (final de cada semana):
   - O que funcionou bem?
   - O que pode melhorar?
   - Ações para próxima sprint

#### Comunicação

- **Canal no Discord/Slack**: Comunicação rápida
- **WhatsApp/Telegram**: Avisos urgentes
- **GitHub Issues**: Discussões técnicas
- **Trello/Jira**: Organização de tarefas
- **Pull Requests**: Code review e discussões de código

### 🎯 Boas Práticas de Equipe

- ✅ Respeitem os prazos combinados
- ✅ Comuniquem bloqueios o quanto antes
- ✅ Peçam ajuda quando necessário
- ✅ Façam code review construtivo
- ✅ Documentem decisões importantes
- ✅ Celebrem as conquistas do time
- ✅ Aprendam uns com os outros

---

## 📚 Documentação de Arquitetura e Produto

### 📘 ADR - Architecture Decision Record

**O que é um ADR?**

Um **Architecture Decision Record (ADR)** é um documento que registra decisões importantes sobre a arquitetura do software. Ele explica **o que** foi decidido, **por que** foi decidido dessa forma, e **quais alternativas** foram consideradas.

**Por que criar um ADR?**
- 📝 Documenta o contexto histórico de decisões técnicas
- 🤔 Ajuda novos membros da equipe a entender o "porquê" das escolhas
- 🔄 Facilita refatorações futuras (você sabe por que algo foi feito)
- 💡 Evita discussões repetitivas sobre decisões já tomadas

**Estrutura de um ADR:**

```markdown
# ADR 001: [Título da Decisão]

## Status
[Proposto | Aceito | Depreciado | Substituído]

## Contexto
[Descreva o problema ou situação que motivou a decisão]

## Decisão
[Descreva a decisão tomada de forma clara e objetiva]

## Alternativas Consideradas
1. [Alternativa 1]: [Motivo para não escolher]
2. [Alternativa 2]: [Motivo para não escolher]

## Consequências
**Positivas:**
- [Benefício 1]
- [Benefício 2]

**Negativas:**
- [Trade-off 1]
- [Trade-off 2]

## Data
[Data da decisão]

## Participantes
[Quem participou da decisão]
```

**Exemplo para este projeto:**

```markdown
# ADR 001: Escolha do FastAPI como Framework Backend

## Status
Aceito

## Contexto
Precisamos escolher um framework Python para construir a API REST da plataforma 
de cursos. O sistema precisa ser rápido, bem documentado, e fácil de aprender 
para iniciantes em APIs.

## Decisão
Usar FastAPI como framework principal do backend.

## Alternativas Consideradas
1. **Django REST Framework**: Mais maduro, mas mais pesado e com curva de 
   aprendizado maior. Inclui muitas funcionalidades que não precisamos (admin, 
   templates).
2. **Flask + Flask-RESTful**: Mais simples, mas requer muitas extensões e 
   configurações manuais para alcançar o que FastAPI oferece nativamente.

## Consequências
**Positivas:**
- Documentação automática com Swagger/OpenAPI
- Validação de dados nativa com Pydantic
- Performance superior (baseado em Starlette e ASGI)
- Sintaxe moderna e type hints
- Curva de aprendizado adequada para o nível da turma

**Negativas:**
- Ecossistema menor que Django
- Menos recursos prontos (precisaremos implementar mais coisas do zero)

## Data
11/11/2025

## Participantes
Tech Leads Backend e Frontend, Professor
```

**📖 Leitura recomendada:**
- [ADR GitHub - Documentação](https://adr.github.io/)
- [Why Write ADRs](https://github.blog/2020-08-13-why-write-adrs/)
- [Architectural Decision Records](https://www.thoughtworks.com/en-br/radar/techniques/lightweight-architecture-decision-records)

**📝 Vocês devem criar pelo menos 3 ADRs:**
1. Escolha do framework backend (FastAPI)
2. Escolha do banco de dados (PostgreSQL)
3. Estratégia de autenticação (JWT)
4. (Opcional) Escolha do frontend (React vs Vanilla JS)
5. (Opcional) Estratégia de deploy

---

### 📗 PRD - Product Requirements Document

**O que é um PRD?**

Um **Product Requirements Document (PRD)** é um documento que define **o que** o produto deve fazer, **para quem** é destinado, e **quais problemas** ele resolve. É o guia mestre do projeto.

**Por que criar um PRD?**
- 🎯 Alinha expectativas de todos os envolvidos
- 📋 Define escopo claro (o que está dentro e fora)
- 🧭 Serve como norte para tomada de decisões
- ✅ Critérios de sucesso bem definidos

**Estrutura de um PRD:**

```markdown
# PRD - [Nome do Produto]

## 1. Visão Geral
[Descrição em 2-3 parágrafos do que é o produto]

## 2. Objetivos do Produto
- [Objetivo 1]
- [Objetivo 2]
- [Objetivo 3]

## 3. Público-Alvo
**Persona 1: [Nome]**
- Idade: [faixa etária]
- Necessidades: [o que precisa]
- Dores: [problemas que enfrenta]

## 4. Requisitos Funcionais
### Deve Ter (Must Have)
- [Funcionalidade essencial 1]
- [Funcionalidade essencial 2]

### Deveria Ter (Should Have)
- [Funcionalidade importante 1]

### Poderia Ter (Could Have)
- [Funcionalidade desejável 1]

### Não Terá (Won't Have)
- [O que explicitamente NÃO faremos]

## 5. User Stories
**Como [tipo de usuário], eu quero [ação], para [benefício].**

Exemplos:
- Como aluno, quero buscar cursos por categoria, para encontrar conteúdo relevante.
- Como professor, quero adicionar vídeos às aulas, para enriquecer o conteúdo.

## 6. Requisitos Não-Funcionais
- Performance: [ex: tempo de resposta < 2s]
- Segurança: [ex: autenticação JWT]
- Escalabilidade: [ex: suportar 500 usuários simultâneos]

## 7. Métricas de Sucesso
- [Métrica 1: ex: 90% dos usuários completam o cadastro]
- [Métrica 2: ex: Tempo médio de carregamento < 3s]

## 8. Roadmap
**MVP (Minimum Viable Product):**
- [Funcionalidade mínima 1]

**Fase 2:**
- [Melhorias futuras]

## 9. Riscos e Mitigações
| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| [Risco 1] | Alta | Alto | [Como mitigar] |
```

**Exemplo para este projeto:**

```markdown
# PRD - EduTech Platform 2.0

## 1. Visão Geral
EduTech Platform 2.0 é uma plataforma web de cursos online que conecta 
professores e alunos. Professores podem criar, gerenciar e publicar cursos 
com materiais diversos (vídeos, PDFs, quizzes). Alunos podem se inscrever, 
acessar conteúdo, enviar atividades e acompanhar seu progresso. 
Administradores monitoram a plataforma e gerenciam usuários.

## 2. Objetivos do Produto
- Facilitar o ensino e aprendizagem online
- Permitir gestão completa de cursos e conteúdos
- Oferecer experiência intuitiva para todos os perfis
- Demonstrar habilidades fullstack dos desenvolvedores

## 3. Público-Alvo

**Persona 1: Maria - Professora**
- Idade: 35-50 anos
- Necessidades: Compartilhar conhecimento, organizar materiais, acompanhar alunos
- Dores: Ferramentas complexas, falta de métricas de engajamento

**Persona 2: João - Aluno**
- Idade: 18-30 anos
- Necessidades: Aprender novas habilidades, acessar materiais, receber feedback
- Dores: Interfaces confusas, falta de acompanhamento de progresso

## 4. Requisitos Funcionais

### Must Have (MVP)
- ✅ Cadastro e login com JWT
- ✅ CRUD de cursos (professor)
- ✅ Sistema de matrículas
- ✅ Visualização de aulas e materiais
- ✅ Progresso de conclusão
- ✅ Dashboard básico para cada perfil

### Should Have
- ✅ Sistema de atividades e correções
- ✅ Upload de arquivos
- ✅ Busca e filtros de cursos
- ✅ Avaliações e comentários

### Could Have
- 🔵 Notificações por email
- 🔵 Certificados de conclusão
- 🔵 Gamificação (badges, ranking)
- 🔵 Dark mode

### Won't Have (Fora do Escopo)
- ❌ Pagamento real (simulado apenas)
- ❌ Live streaming
- ❌ Chat em tempo real
- ❌ App mobile nativo

## 5. Métricas de Sucesso
- 90% dos usuários completam o cadastro com sucesso
- Tempo médio de resposta da API < 2s
- 100% dos endpoints principais funcionando
- Deploy funcional e acessível

## 6. Riscos e Mitigações
| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Atraso na integração backend-frontend | Média | Alto | Definir contrato de API no início |
| Complexidade de autenticação | Baixa | Médio | Usar bibliotecas consolidadas (JWT) |
| Problemas no deploy | Média | Médio | Testar deploy cedo, usar plataformas simples |
```

**📖 Leitura recomendada:**
- [How to Write a PRD](https://www.atlassian.com/agile/product-management/requirements)
- [Product Requirements Document Template](https://www.productplan.com/glossary/product-requirements-document/)
- [PRD Examples](https://medium.com/@uxpin/how-to-write-a-painless-product-requirements-document-508ff6807b4a)

**📝 Vocês devem criar:**
1. **Um PRD completo** do projeto (pode ser colaborativo, com contribuição de todos)
2. **User Stories** de pelo menos 10 funcionalidades principais

---

## ⚙️ Requisitos Funcionais

### 🔐 Módulo de Autenticação

#### Cadastro de Usuários
- ✅ Formulário de registro com validações
- ✅ Campos: nome, email, senha, tipo de usuário (aluno/professor)
- ✅ Validação de email único
- ✅ Hash de senha (bcrypt)
- ✅ Confirmação de email (opcional)

#### Login e Sessão
- ✅ Login com email e senha
- ✅ Geração de token JWT
- ✅ Armazenamento seguro do token no frontend
- ✅ Renovação automática de token (refresh token - opcional)
- ✅ Logout e invalidação de sessão

#### Recuperação de Senha
- ✅ Solicitação de recuperação via email
- ✅ Geração de token temporário
- ✅ Redefinição de senha com validação

#### Controle de Acesso
- ✅ Middleware de autenticação
- ✅ Verificação de papéis (RBAC - Role Based Access Control)
- ✅ Proteção de rotas no backend
- ✅ Redirecionamentos no frontend baseados em papel

**Papéis:**
- `aluno`: Acessa cursos, envia atividades, visualiza progresso
- `professor`: Cria e gerencia cursos, corrige atividades, visualiza alunos
- `admin`: Acesso total ao sistema, gerencia usuários e cursos

---

### 👨‍🏫 Módulo do Professor

#### Gerenciamento de Cursos
- ✅ **Criar curso**: Título, descrição, categoria, nível, carga horária, thumbnail
- ✅ **Editar curso**: Atualizar informações, adicionar pré-requisitos
- ✅ **Excluir curso**: Soft delete (manter histórico)
- ✅ **Publicar/Despublicar**: Controlar visibilidade do curso
- ✅ **Definir preço**: Cursos gratuitos ou pagos

#### Estruturação de Conteúdo
- ✅ **Criar módulos**: Organizar curso em seções temáticas
- ✅ **Adicionar aulas**: Título, descrição, ordem, tipo (vídeo/texto/quiz)
- ✅ **Upload de materiais**:
  - Documentos (.pdf, .md, .pptx)
  - Links externos (YouTube, Google Drive, etc.)
  - Código embutido (Markdown com syntax highlighting)
- ✅ **Reordenar conteúdo**: Drag-and-drop ou inputs de ordem

#### Atividades e Avaliações
- ✅ **Criar atividades**: Exercícios, projetos, quizzes
- ✅ **Definir prazos**: Datas de entrega e peso na nota
- ✅ **Receber entregas**: Listagem de submissões
- ✅ **Corrigir e dar feedback**: Nota, comentários, revisão
- ✅ **Visualizar estatísticas**: Taxa de conclusão, notas médias

#### Acompanhamento de Alunos
- ✅ **Listar alunos matriculados**: Nome, email, data de matrícula
- ✅ **Ver progresso individual**: Percentual de aulas concluídas
- ✅ **Visualizar desempenho**: Notas em atividades
- ✅ **Enviar mensagens**: Comunicação com alunos (opcional)

---

### 👩‍🎓 Módulo do Aluno

#### Exploração de Cursos
- ✅ **Página inicial**: Cursos em destaque, populares, recentes
- ✅ **Busca e filtros**:
  - Por categoria
  - Por nível (iniciante, intermediário, avançado)
  - Por preço (gratuitos, pagos)
  - Por avaliação (ordenar por nota)
- ✅ **Visualização de curso**: Detalhes, grade curricular, avaliações
- ✅ **Preview de aulas**: Algumas aulas liberadas antes da matrícula

#### Matrícula e Acesso
- ✅ **Inscrever-se**: Confirmação de matrícula (gratuita ou simulação de pagamento)
- ✅ **Desinscrever-se**: Cancelamento de matrícula
- ✅ **Meus cursos**: Listagem de cursos ativos
- ✅ **Continuar assistindo**: Retomar última aula

#### Consumo de Conteúdo
- ✅ **Assistir aulas**: Interface de player com controles
- ✅ **Marcar como concluída**: Checkbox ou botão
- ✅ **Download de materiais**: Links para arquivos
- ✅ **Tomar notas**: Campo de anotações pessoais (opcional)
- ✅ **Navegação sequencial**: Próxima/anterior aula

#### Atividades e Progresso
- ✅ **Visualizar atividades**: Listagem com status e prazos
- ✅ **Enviar atividades**: Upload de arquivo ou resposta em texto
- ✅ **Ver feedback**: Nota e comentários do professor
- ✅ **Acompanhar progresso**:
  - Barra de progresso por curso
  - Percentual de conclusão
  - Certificado ao finalizar (opcional)

#### Avaliação de Cursos
- ✅ **Dar nota**: Escala de 1 a 5 estrelas
- ✅ **Escrever comentário**: Feedback textual
- ✅ **Ver avaliações**: Opiniões de outros alunos

---

### 🛠️ Módulo do Administrador

#### Gerenciamento de Usuários
- ✅ **Listar todos os usuários**: Tabela com filtros
- ✅ **Buscar usuário**: Por nome, email ou papel
- ✅ **Editar usuário**: Alterar papel, email, nome
- ✅ **Bloquear/Desbloquear**: Suspender acesso
- ✅ **Aprovar professores**: Workflow de validação (opcional)
- ✅ **Redefinir senha**: Forçar troca de senha

#### Gerenciamento de Cursos
- ✅ **Listar todos os cursos**: Com filtros e busca
- ✅ **Publicar/Ocultar**: Controlar visibilidade
- ✅ **Remover curso**: Delete definitivo ou soft delete
- ✅ **Ver detalhes**: Estatísticas do curso
- ✅ **Editar curso**: Ajustes emergenciais

#### Dashboard e Estatísticas
- ✅ **Resumo geral**:
  - Total de usuários (alunos, professores, admins)
  - Total de cursos (ativos, rascunhos)
  - Total de matrículas
  - Receita total (simulada)
- ✅ **Gráficos**:
  - Crescimento de usuários ao longo do tempo
  - Cursos mais populares
  - Categorias mais procuradas
  - Taxa de conclusão média
- ✅ **Relatórios**:
  - Engajamento semanal/mensal
  - Cursos com baixa taxa de conclusão
  - Professores mais ativos

#### Configurações da Plataforma
- ✅ **Categorias**: Criar, editar, remover categorias
- ✅ **Notificações**: Envio de emails em massa (opcional)
- ✅ **Logs de sistema**: Auditoria de ações (opcional)

---

### 🎁 Funcionalidades Extras (Opcional)

Essas funcionalidades são **opcionais** e valem **pontos extras** na avaliação:

#### 💬 Sistema de Comentários
- Comentários por aula (dúvidas e discussões)
- Respostas em threads
- Curtidas/Útil em comentários

#### 📧 Notificações
- Email ao matricular-se em curso
- Lembrete de atividades pendentes
- Notificação de feedback do professor
- Notificações in-app (badge com contador)

#### 🏆 Gamificação
- Badges por conquistas (completou primeiro curso, nota máxima, etc.)
- Ranking de alunos por pontuação
- Streak de dias consecutivos acessando

#### 📊 Relatórios Avançados
- Export de relatórios em CSV/PDF
- Gráficos interativos (Chart.js)
- Análise preditiva de abandono

#### 🎨 Temas e Personalização
- Dark mode / Light mode
- Personalização de cores
- Avatar customizável

#### 🔍 Busca Avançada
- Busca full-text em títulos e descrições
- Autocomplete
- Filtros combinados

#### 📱 Responsividade Avançada
- PWA (Progressive Web App)
- Instalação no dispositivo
- Funcionamento offline (cache)

#### 🎬 Player de Vídeo Customizado
- Controles personalizados
- Velocidade de reprodução
- Legendas/Transcrições
- Picture-in-picture

---

## 🔧 Requisitos Técnicos

### 🐍 Backend (Python)

#### Stack Obrigatória

**Framework e Bibliotecas:**
```python
# requirements.txt
fastapi==0.109.0
uvicorn==0.27.0
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
pydantic==2.5.3
python-jose[cryptography]==3.3.0  # JWT
passlib[bcrypt]==1.7.4  # Hash de senhas
python-multipart==0.0.6  # Upload de arquivos
alembic==1.13.1  # Migrações de banco
python-dotenv==1.0.0  # Variáveis de ambiente
pytest==7.4.4  # Testes
```

#### Estrutura de Pastas Obrigatória

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Aplicação FastAPI principal
│   ├── config.py               # Configurações (DB, JWT, etc)
│   ├── database.py             # Conexão com banco
│   ├── dependencies.py         # Injeção de dependências
│   │
│   ├── models/                 # Modelos SQLAlchemy (ORM)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── course.py
│   │   ├── enrollment.py
│   │   └── ...
│   │
│   ├── schemas/                # Schemas Pydantic (validação)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── course.py
│   │   ├── auth.py
│   │   └── ...
│   │
│   ├── routers/                # Rotas da API
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── courses.py
│   │   ├── enrollments.py
│   │   └── admin.py
│   │
│   ├── services/               # Lógica de negócio
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── course_service.py
│   │   └── ...
│   │
│   └── utils/                  # Funções auxiliares
│       ├── __init__.py
│       ├── security.py         # JWT, hash de senhas
│       ├── validators.py
│       └── email.py            # Envio de emails (opcional)
│
├── alembic/                    # Migrações de banco
│   ├── versions/
│   └── env.py
│
├── tests/                      # Testes automatizados
│   ├── __init__.py
│   ├── test_auth.py
│   ├── test_courses.py
│   └── ...
│
├── .env                        # Variáveis de ambiente (não commitar!)
├── .env.example                # Exemplo de .env
├── .gitignore
├── alembic.ini
├── requirements.txt
└── README.md
```

#### Requisitos Técnicos Detalhados

**1. Banco de Dados:**
- ✅ PostgreSQL 14+
- ✅ Modelagem normalizada (3FN)
- ✅ Relacionamentos com Foreign Keys
- ✅ Índices em colunas frequentes
- ✅ Constraints (UNIQUE, CHECK, NOT NULL)
- ✅ Timestamps (created_at, updated_at)
- ✅ Soft delete (deleted_at) para dados importantes

**2. API REST:**
- ✅ Endpoints RESTful (GET, POST, PUT, DELETE)
- ✅ Versionamento (opcional: `/api/v1/`)
- ✅ Paginação em listagens (query params: `?page=1&limit=10`)
- ✅ Filtros e ordenação (query params: `?category=backend&sort=popular`)
- ✅ Respostas padronizadas (JSON)
- ✅ Status codes corretos (200, 201, 400, 401, 403, 404, 500)
- ✅ Tratamento de erros global

**3. Autenticação e Segurança:**
- ✅ JWT (JSON Web Token)
- ✅ Access token + Refresh token (opcional)
- ✅ Hash de senhas com bcrypt
- ✅ Middleware de autenticação
- ✅ Decoradores de autorização por papel
- ✅ Validação de inputs com Pydantic
- ✅ CORS configurado corretamente
- ✅ Rate limiting (opcional)

**4. Documentação:**
- ✅ Swagger UI automático (FastAPI)
- ✅ README completo com instruções
- ✅ Comentários em código complexo
- ✅ Docstrings em funções importantes
- ✅ Exemplos de requisições

**5. Boas Práticas:**
- ✅ Código modular e reutilizável
- ✅ Separação de responsabilidades (SRP)
- ✅ Variáveis de ambiente (.env)
- ✅ Migrations com Alembic
- ✅ Testes básicos (pelo menos 5 testes)
- ✅ Git com commits semânticos (conventional commits)

---

### 🎨 Frontend (JavaScript)

#### Stack Obrigatória

**Tecnologias:**
- HTML5 (semântico)
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript ES6+ (async/await, fetch, modules)
- **Opcional:** React.js (para quem quiser desafio extra)

**Bibliotecas Permitidas (Opcional):**
- Axios (alternativa ao Fetch)
- Chart.js (gráficos)
- SweetAlert2 (modals bonitos)
- Toastify (notificações)
- FontAwesome (ícones)
- Zod (validação)

#### Estrutura de Pastas Obrigatória

**Vanilla JS:**
```
frontend/
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── global.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   └── ...
│   │
│   ├── js/
│   │   ├── api.js              # Configuração do fetch/axios
│   │   ├── auth.js             # Funções de autenticação
│   │   ├── utils.js            # Funções auxiliares
│   │   ├── components/         # Componentes reutilizáveis
│   │   │   ├── navbar.js
│   │   │   ├── modal.js
│   │   │   └── card.js
│   │   └── pages/              # Scripts por página
│   │       ├── login.js
│   │       ├── courses.js
│   │       ├── dashboard.js
│   │       └── ...
│   │
│   └── images/
│       ├── logo.png
│       ├── placeholder-course.jpg
│       └── ...
│
├── pages/
│   ├── login.html
│   ├── register.html
│   ├── courses.html
│   ├── course-detail.html
│   ├── student-dashboard.html
│   ├── teacher-dashboard.html
│   ├── admin-dashboard.html
│   └── ...
│
├── index.html
├── .gitignore
└── README.md
```

**React (Opcional):**
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── auth/
│   │   ├── courses/
│   │   └── ...
│   ├── pages/
│   ├── services/
│   │   └── api.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── hooks/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

#### Requisitos Técnicos Detalhados

**1. Interface e UX:**
- ✅ Design limpo e profissional
- ✅ Navegação intuitiva
- ✅ Feedback visual (loading, success, error)
- ✅ Formulários com validação no frontend
- ✅ Mensagens de erro claras
- ✅ Estados vazios (quando não há dados)
- ✅ Confirmações para ações destrutivas

**2. Responsividade:**
- ✅ Mobile-first approach
- ✅ Breakpoints: 320px, 768px, 1024px, 1440px
- ✅ Menu hamburger em mobile
- ✅ Imagens responsivas
- ✅ Testes em diferentes dispositivos

**3. JavaScript:**
- ✅ Código modular (ES6 modules ou separação clara)
- ✅ Async/await para requisições
- ✅ Tratamento de erros (try/catch)
- ✅ Manipulação do DOM eficiente
- ✅ Event listeners organizados
- ✅ LocalStorage para token JWT
- ✅ Validação de formulários
- ✅ Sanitização de inputs

**4. Integração com API:**
- ✅ Fetch API ou Axios
- ✅ Headers com token JWT
- ✅ Tratamento de respostas (success, error)
- ✅ Parsing de JSON
- ✅ Loading states
- ✅ Retry em caso de falha (opcional)
- ✅ Cache de dados (opcional)

**5. Acessibilidade:**
- ✅ Tags semânticas (header, nav, main, section, footer)
- ✅ Atributos alt em imagens
- ✅ Labels em inputs
- ✅ Contraste adequado (WCAG AA)
- ✅ Navegação por teclado

**6. Performance:**
- ✅ Imagens otimizadas (WebP, lazy loading)
- ✅ Minificação de CSS/JS (produção)
- ✅ Carregamento assíncrono
- ✅ Debounce em buscas

**7. Boas Práticas:**
- ✅ Código limpo e comentado
- ✅ Nomenclatura consistente
- ✅ DRY (Don't Repeat Yourself)
- ✅ Separação de responsabilidades
- ✅ Git com commits semânticos

---

### 🔗 Integração

#### Comunicação Backend-Frontend

**1. Configuração de CORS:**
```python
# backend/app/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://seudominio.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**2. Padrão de Requisição:**
```javascript
// frontend/assets/js/api.js
const API_URL = 'http://localhost:8000/api/v1';

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erro na requisição');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
}
```

**3. Fluxo de Autenticação:**

```javascript
// Login
async function login(email, password) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  // Redirecionar baseado no papel
  if (data.user.role === 'student') {
    window.location.href = '/pages/student-dashboard.html';
  } else if (data.user.role === 'teacher') {
    window.location.href = '/pages/teacher-dashboard.html';
  }
}

// Verificar autenticação
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/pages/login.html';
  }
}

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/index.html';
}
```

---

## 📅 Cronograma Sugerido

| Semana | Backend | Frontend | Integração |
|--------|---------|----------|------------|
| **Semana 1**<br>(11/11 - 17/11) | • Setup do projeto<br>• Modelagem do banco<br>• Models SQLAlchemy<br>• Autenticação (JWT) | • Setup do projeto<br>• Wireframes/protótipo<br>• Páginas de login/registro<br>• Estrutura HTML/CSS base | • Definir contrato da API<br>• Documentar endpoints<br>• Testar login integrado |
| **Semana 2**<br>(18/11 - 24/11) | • CRUD de cursos<br>• CRUD de usuários<br>• Schemas Pydantic<br>• Testes básicos | • Páginas de listagem de cursos<br>• Página de detalhes do curso<br>• Dashboard do aluno<br>• Consumo da API | • Integração de cursos<br>• Testes de fluxo completo<br>• Ajustes de CORS |
| **Semana 3**<br>(25/11 - 01/12) | • Matrículas<br>• Progresso de aulas<br>• Atividades e entregas<br>• Upload de arquivos | • Dashboard do professor<br>• Criação/edição de cursos<br>• Interface de atividades<br>• Progresso visual | • Integração completa<br>• Refinamento de erros<br>• Feedback ao usuário |
| **Semana 4**<br>(02/12 - 08/12) | • Dashboard admin<br>• Estatísticas e relatórios<br>• Refinamentos<br>• Deploy (Render/Railway) | • Painel administrativo<br>• Gráficos e estatísticas<br>• Responsividade final<br>• Deploy (Vercel/Netlify) | • Testes end-to-end<br>• Ajustes finais<br>• Otimizações |
| **Semana 5**<br>(09/12 - 13/12) | • Correção de bugs<br>• Documentação final<br>• Preparação da apresentação | • Polimento da UI<br>• Documentação final<br>• Preparação da apresentação | • Ensaio de apresentação<br>• Vídeo demo<br>• Post no LinkedIn |

### 🎯 Milestones Importantes

- **17/11**: Autenticação funcionando (backend + frontend)
- **24/11**: CRUD de cursos completo e integrado
- **01/12**: Fluxo completo aluno + professor funcionando
- **08/12**: Deploy realizado e funcionalidades completas
- **13/12**: **APRESENTAÇÃO FINAL** 🎉

---

## 📦 Entregáveis

### 1. Código Fonte

**Repositório GitHub:**
- ✅ Repositório público organizado
- ✅ README.md detalhado (como rodar, tecnologias, endpoints)
- ✅ .gitignore configurado
- ✅ Commits frequentes e semânticos
- ✅ Branches organizadas (main, develop, feature/*)
- ✅ Pull Requests revisados entre membros
- ✅ Adicionar professores como colaboradores

**Estrutura esperada:**
```
edutech-platform/
├── backend/          # Código Python/FastAPI
├── frontend/         # Código HTML/CSS/JS
├── docs/             # Documentação extra
│   ├── ADR/
│   │   ├── 001-escolha-framework-backend.md
│   │   ├── 002-escolha-banco-dados.md
│   │   └── 003-estrategia-autenticacao.md
│   ├── PRD.md
│   ├── api.md
│   ├── database-schema.png
│   └── user-stories.md
├── .gitignore
├── README.md
└── docker-compose.yml  # Opcional
```

### 2. Banco de Dados

- ✅ Schema SQL exportado (`schema.sql`)
- ✅ Dados de exemplo (`seed.sql` ou script Python)
- ✅ Diagrama ER em imagem (PNG/SVG)
- ✅ Migrations do Alembic commitadas

### 3. Documentação de Arquitetura

**ADRs (Architecture Decision Records):**
- ✅ Mínimo de 3 ADRs bem estruturados
- ✅ Formato padronizado (Status, Contexto, Decisão, Alternativas, Consequências)
- ✅ Armazenados em `docs/ADR/`
- ✅ Numerados sequencialmente (001, 002, 003...)

**Temas obrigatórios para ADRs:**
1. Escolha do framework backend (FastAPI vs Django vs Flask)
2. Escolha do banco de dados (PostgreSQL vs MySQL vs MongoDB)
3. Estratégia de autenticação (JWT vs OAuth2 vs Session)

**Temas opcionais para ADRs:**
4. Escolha do frontend (React vs Vanilla JS)
5. Estratégia de deploy
6. Estrutura de pastas do projeto
7. Política de branches e versionamento

**PRD (Product Requirements Document):**
- ✅ Um PRD completo do projeto
- ✅ Visão geral e objetivos claros
- ✅ Personas definidas (aluno, professor, admin)
- ✅ Requisitos funcionais com MoSCoW (Must/Should/Could/Won't)
- ✅ Pelo menos 10 User Stories bem definidas
- ✅ Requisitos não-funcionais (performance, segurança)
- ✅ Métricas de sucesso
- ✅ Análise de riscos e mitigações

### 4. Documentação Técnica

**README.md deve conter:**
- Descrição do projeto
- Tecnologias utilizadas
- Pré-requisitos (Python, Node, PostgreSQL)
- Instruções de instalação (passo a passo)
- Como rodar localmente (backend + frontend)
- Como popular o banco (seeds)
- Endpoints da API (ou link para Swagger)
- Credenciais de teste (usuários de exemplo)
- Screenshots ou GIFs
- Link para deploy
- Autores e papéis

**Documentação Técnica:**
- Descrição dos endpoints principais
- Fluxo de autenticação
- Estrutura do banco de dados
- Decisões arquiteturais

### 4. Deploy

**Backend:**
- ✅ Deploy em Render, Railway ou similar
- ✅ Variáveis de ambiente configuradas
- ✅ Banco de dados em produção (ElephantSQL, Supabase, etc.)

**Frontend:**
- ✅ Deploy em Vercel, Netlify ou GitHub Pages
- ✅ Variáveis de ambiente (URL da API)
- ✅ Build otimizado

### 5. Apresentação

- ✅ Slides (PDF ou link)
- ✅ Vídeo demo (5-7 minutos)
- ✅ Post no LinkedIn
- ✅ Demonstração ao vivo

---

## 🎤 Apresentação

### Formato

**Data:** 13/12/2025  
**Duração:** 15-20 minutos  
**Formato:** Apresentação em grupo + demonstração ao vivo

### Estrutura da Apresentação

#### 1. Introdução (2-3 min)
- Apresentação do grupo e divisão de trabalho
- Contexto do projeto (evolução do mini-projeto)
- Objetivos e escopo

#### 2. Demonstração do Sistema (8-10 min)

**Demonstração ao vivo:**
- **Autenticação:** Registro, login, logout
- **Fluxo do Professor:** Criar curso, adicionar aulas, visualizar alunos
- **Fluxo do Aluno:** Explorar cursos, matricular-se, assistir aulas, enviar atividade
- **Fluxo do Admin:** Dashboard, estatísticas, gerenciar usuários
- **Destaque:** Funcionalidade mais legal/desafiadora

#### 3. Aspectos Técnicos (3-4 min)
- **Backend:** Arquitetura, autenticação, banco de dados
- **Frontend:** Design, responsividade, integração com API
- **Integração:** Como as equipes trabalharam juntas
- **Desafios técnicos:** Principais dificuldades e como resolveram

#### 4. Código e Boas Práticas (2-3 min)
- Mostrar trechos de código interessantes
- Explicar alguma funcionalidade complexa
- Demonstrar organização do projeto
- Testes, documentação, versionamento

#### 5. Aprendizados e Conclusão (2-3 min)
- Principais aprendizados técnicos
- Aprendizados sobre trabalho em equipe
- O que fariam diferente
- Próximos passos (melhorias futuras)

### Entregáveis da Apresentação

#### LinkedIn (Obrigatório)
- Post com prints/GIFs do sistema
- Descrição do projeto e tecnologias
- Hashtags: #Python #FastAPI #JavaScript #FullStack #DevBackend #DevFrontend
- Marcar colegas de equipe
- Link para GitHub e deploy

#### GitHub (Obrigatório)
- README completo e profissional
- Badge de tecnologias (shields.io)
- Screenshots na documentação
- Adicionar professores como colaboradores
- **Pull Request** aberto para avaliação

#### Vídeo Demo (Opcional mas recomendado)
- Loom, YouTube ou similar
- 5-7 minutos
- Narração explicando funcionalidades
- Link no README

---

## 📚 Recursos e Referências

### Backend (Python/FastAPI)

**Documentação Oficial:**
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [Pydantic Validation](https://docs.pydantic.dev/)
- [JWT Authentication](https://jwt.io/)

**Tutoriais:**
- [FastAPI + SQLAlchemy Tutorial](https://fastapi.tiangolo.com/tutorial/sql-databases/)
- [JWT Authentication in FastAPI](https://testdriven.io/blog/fastapi-jwt-auth/)
- [Alembic Migrations](https://alembic.sqlalchemy.org/en/latest/tutorial.html)

**Repositórios de Referência:**
- [Full Stack FastAPI Template](https://github.com/tiangolo/full-stack-fastapi-template)
- [FastAPI Best Practices](https://github.com/zhanymkanov/fastapi-best-practices)

### Frontend (JavaScript)

**Documentação:**
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

**Design e UI:**
- [Dribbble - Inspiração de Design](https://dribbble.com/search/education-platform)
- [Figma Community - Templates](https://www.figma.com/community)
- [CSS Tricks](https://css-tricks.com/)

**React (Opcional):**
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Create React App](https://create-react-app.dev/)

### DevOps e Deploy

**Backend:**
- [Render - Deploy FastAPI](https://render.com/docs/deploy-fastapi)
- [Railway - Python Apps](https://docs.railway.app/guides/python)
- [ElephantSQL - PostgreSQL](https://www.elephantsql.com/)

**Frontend:**
- [Vercel - Deploy Guide](https://vercel.com/docs)
- [Netlify - Deploy Guide](https://docs.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

### Ferramentas

- [Postman](https://www.postman.com/) - Testar APIs
- [Thunder Client](https://www.thunderclient.com/) - Extensão VS Code para APIs
- [pgAdmin](https://www.pgadmin.org/) - Interface para PostgreSQL
- [draw.io](https://app.diagrams.net/) - Diagramas ER
- [Excalidraw](https://excalidraw.com/) - Wireframes rápidos

### Git e GitHub

- [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Git Best Practices](https://www.git-tower.com/learn/git/ebook/en/command-line/appendix/best-practices)

---

## 📊 Rubrica de Avaliação

### Legenda

| Cor | Significado |
|-----|-------------|
| 🔴 **Vermelho** | Critérios negativos (Os critérios **em negrito** são eliminatórios) |
| 🟡 **Amarelo** | Critérios neutros (Básico esperado) |
| 🟢 **Verde** | Critérios positivos (Excelência) |
| 🔵 **Azul** | Critérios extras e opcionais |

---

### Tabela de Avaliação

| Categoria | 🔴 Insuficiente | 🟡 Satisfatório | 🟢 Excelente |
|-----------|----------------|-----------------|--------------|
| **Backend - Arquitetura e Estrutura** | • **Projeto não roda/não existe**<br>• **Sem banco de dados**<br>• Código totalmente desorganizado<br>• Sem separação de responsabilidades<br>• Estrutura de pastas confusa | • FastAPI rodando corretamente<br>• Banco PostgreSQL conectado<br>• Estrutura de pastas adequada<br>• Models, Schemas e Routers separados<br>• Código organizado e legível<br>• requirements.txt presente | • Arquitetura exemplar e profissional<br>• Separação clara (models, schemas, services, routers)<br>• Injeção de dependências bem aplicada<br>• 🔵 Design patterns aplicados<br>• 🔵 Testes automatizados<br>• Documentação técnica excelente |
| **Backend - Banco de Dados** | • **Menos de 6 tabelas**<br>• **Sem relacionamentos**<br>• Sem chaves primárias/estrangeiras<br>• Dados não normalizados<br>• Estrutura mal planejada | • Todas as tabelas principais criadas<br>• Relacionamentos corretos (FK)<br>• Normalização aplicada (3FN)<br>• Constraints básicas (NOT NULL, UNIQUE)<br>• Dados de exemplo inseridos<br>• Migrations com Alembic | • Modelagem exemplar<br>• Diagrama ER profissional<br>• Índices estratégicos<br>• Soft delete implementado<br>• 🔵 Triggers ou Procedures<br>• 🔵 Full-text search<br>• Seeds automatizados |
| **Backend - API REST** | • **Menos de 8 endpoints**<br>• **Endpoints não funcionam**<br>• Sem autenticação<br>• Respostas inconsistentes<br>• Status codes incorretos<br>• CRUD incompleto | • CRUD completo para entidades principais<br>• Autenticação JWT funcional<br>• Endpoints RESTful bem definidos<br>• Status codes corretos<br>• Validações com Pydantic<br>• Swagger documentado<br>• CORS configurado | • API profissional e escalável<br>• Autorização por papéis (RBAC)<br>• Paginação, filtros e ordenação<br>• Tratamento de erros global<br>• 🔵 Refresh tokens<br>• 🔵 Rate limiting<br>• 🔵 Logs estruturados<br>• Documentação exemplar |
| **Backend - Segurança** | • **Sem autenticação**<br>• Senhas em texto plano<br>• Sem validação de inputs<br>• Endpoints desprotegidos<br>• SQL injection possível | • JWT implementado corretamente<br>• Hash de senhas com bcrypt<br>• Validações com Pydantic<br>• Middleware de autenticação<br>• Verificação de papéis básica<br>• Variáveis de ambiente (.env) | • Segurança robusta<br>• Access + Refresh tokens<br>• CORS bem configurado<br>• Validações e sanitizações completas<br>• 🔵 Rate limiting<br>• 🔵 Logs de auditoria<br>• 🔵 HTTPS enforced |
| **Frontend - Interface e UX** | • **Páginas não existem**<br>• **Não funciona no navegador**<br>• Interface quebrada<br>• Sem navegação<br>• Design amador | • Todas as páginas principais criadas<br>• Navegação funcional<br>• Design limpo e profissional<br>• Formulários funcionais<br>• Feedback visual (loading, success, error)<br>• Interface intuitiva | • UI excepcional e moderna<br>• Experiência fluida<br>• Animações sutis<br>• Estados vazios bem tratados<br>• 🔵 Dark mode<br>• 🔵 Temas customizáveis<br>• 🔵 Microinterações<br>• Design digno de portfólio |
| **Frontend - Responsividade** | • Não funciona em mobile<br>• Layout quebra em telas pequenas<br>• Sem media queries<br>• Elementos cortados | • Funciona em mobile e desktop<br>• Media queries implementadas<br>• Menu responsivo<br>• Breakpoints principais (768px, 1024px)<br>• Imagens responsivas | • Mobile-first approach<br>• Funciona perfeitamente em todos os tamanhos<br>• Testes em múltiplos dispositivos<br>• 🔵 PWA<br>• 🔵 Gestos mobile<br>• Polimento profissional |
| **Frontend - JavaScript** | • **JavaScript não funciona**<br>• **Não consome a API**<br>• Código com muitos erros<br>• Sem tratamento de erros<br>• Código desorganizado | • JavaScript funcional<br>• Consome API corretamente<br>• Async/await implementado<br>• Tratamento de erros (try/catch)<br>• Manipulação do DOM eficiente<br>• LocalStorage para token<br>• Código organizado | • Código JavaScript exemplar<br>• Modular e reutilizável<br>• Validações robustas<br>• Loading states bem implementados<br>• 🔵 ES6 modules<br>• 🔵 Debounce/throttle<br>• 🔵 Cache de dados<br>• Muito bem documentado |
| **Integração Backend-Frontend** | • **Não integra**<br>• Frontend e backend desconectados<br>• Erros de CORS não resolvidos<br>• Autenticação não funciona | • Integração completa e funcional<br>• Autenticação JWT funcionando<br>• CRUD completo via interface<br>• Erros tratados em ambos os lados<br>• Headers corretos<br>• Fluxos principais funcionam | • Integração impecável<br>• Comunicação eficiente<br>• Tratamento de edge cases<br>• Retry logic<br>• 🔵 Optimistic updates<br>• 🔵 Real-time updates<br>• UX refinada |
| **Funcionalidades Obrigatórias** | • **Menos de 50% das funcionalidades**<br>• Autenticação não funciona<br>• Sem CRUD completo<br>• Papéis não implementados | • ✅ Cadastro e login<br>• ✅ Controle de acesso (aluno, professor, admin)<br>• ✅ CRUD de cursos<br>• ✅ Matrículas<br>• ✅ Progresso de aulas<br>• ✅ Dashboard básico<br>• ✅ Principais fluxos funcionam | • Todas as funcionalidades obrigatórias<br>• Funcionalidades extras implementadas<br>• 🔵 Sistema de comentários<br>• 🔵 Notificações<br>• 🔵 Gamificação<br>• 🔵 Upload de arquivos<br>• 🔵 Relatórios avançados |
| **Trabalho em Equipe** | • Trabalho individual disfarçado<br>• Commits de uma pessoa só<br>• Sem colaboração<br>• Conflitos não resolvidos | • Commits de todos os membros<br>• Pull Requests revisados<br>• Branches organizadas<br>• Divisão clara de tarefas<br>• Issues e Projects usados<br>• Comunicação evidente | • Colaboração exemplar<br>• PRs bem documentados<br>• Code reviews de qualidade<br>• Conventional commits<br>• 🔵 CI/CD setup<br>• 🔵 Testes em PRs<br>• Organização profissional |
| **Documentação Técnica** | • **Sem README**<br>• Sem instruções de instalação<br>• Código sem comentários<br>• Não dá pra rodar o projeto<br>• **Sem ADR ou PRD** | • README básico mas completo<br>• Instruções de instalação claras<br>• Como rodar localmente<br>• Endpoints documentados<br>• Comentários em código complexo<br>• .env.example presente<br>• Pelo menos 2 ADRs criados<br>• PRD básico presente | • Documentação exemplar<br>• README profissional com screenshots<br>• GIFs demonstrativos<br>• Arquitetura documentada<br>• 3+ ADRs bem estruturados<br>• PRD completo e detalhado<br>• User stories documentadas<br>• 🔵 Swagger/OpenAPI completo<br>• 🔵 Vídeo tutorial<br>• 🔵 Diagramas de arquitetura |
| **Gestão de Projeto** | • **Sem backlog ou organização**<br>• Trabalho caótico<br>• Sem planejamento<br>• Tarefas não divididas<br>• Sem ferramenta de gestão | • Backlog organizado (Trello/Jira/GitHub Projects)<br>• Tarefas bem divididas<br>• Cards com descrição clara<br>• Acompanhamento de progresso<br>• Sprints planejadas<br>• Issues usados no GitHub | • Gestão exemplar e profissional<br>• Backlog muito bem estruturado<br>• Estimativas de tempo<br>• Priorização clara (MoSCoW)<br>• Sprint planning documentado<br>• 🔵 Burndown chart<br>• 🔵 Métricas de velocidade<br>• 🔵 Retrospectivas documentadas |
| **Deploy** | • **Não fez deploy**<br>• Deploy não funciona<br>• Links quebrados | • Backend deployado e funcionando<br>• Frontend deployado e funcionando<br>• Links funcionais no README<br>• Banco de produção configurado<br>• Variáveis de ambiente corretas | • Deploy profissional<br>• HTTPS configurado<br>• Domínio customizado<br>• 🔵 Docker/Docker Compose<br>• 🔵 CI/CD pipeline<br>• 🔵 Monitoramento<br>• Alta disponibilidade |
| **Apresentação** | • **Não apresentou**<br>• **Não publicou no LinkedIn**<br>• Apresentação confusa<br>• Não demonstra o sistema | • Apresentou o projeto<br>• Demonstração ao vivo funcional<br>• Explicação clara das tecnologias<br>• Post no LinkedIn com prints<br>• Adicionar professores como colaboradores<br>• Pull Request aberto | • Apresentação profissional<br>• Slides bem elaborados<br>• Demonstração fluida<br>• Explica desafios e soluções<br>• Post no LinkedIn engajador<br>• 🔵 Vídeo demo no YouTube<br>• 🔵 Artigo técnico no Medium/Dev.to |

---

### ❌ Critérios Eliminatórios (Reprovação Automática)

Os critérios abaixo são **ELIMINATÓRIOS** e resultam em reprovação:

- ❌ **Não entregou o projeto** (repositório vazio ou inexistente)
- ❌ **Projeto não roda** (backend ou frontend com erros críticos)
- ❌ **Sem banco de dados ou menos de 6 tabelas**
- ❌ **Sem autenticação** (não implementou JWT ou similar)
- ❌ **Frontend não consome a API** (não há integração)
- ❌ **Menos de 50% das funcionalidades obrigatórias**
- ❌ **Não usou ferramenta de backlog** (Trello/Jira/GitHub Projects)
- ❌ **Sem ADR ou PRD** (documentação mínima obrigatória)
- ❌ **Não apresentou** o projeto
- ❌ **Não publicou no LinkedIn**
- ❌ **Não adicionou professores como colaboradores no GitHub**
- ❌ **Não abriu Pull Request para avaliação**
- ❌ **Plágio** (cópia integral de código sem atribuição)

### 🌟 Avaliação dos Tech Leads

Os **Tech Leads** serão avaliados por critérios adicionais:

**Critérios de Liderança Técnica:**
- ✅ Ajudou na organização e priorização do backlog
- ✅ Fez code reviews construtivos
- ✅ Apoiou membros da equipe com dúvidas
- ✅ Manteve comunicação entre backend e frontend
- ✅ Identificou e resolveu impedimentos
- ✅ Contribuiu com código de qualidade
- ✅ Documentou decisões técnicas

**Bônus para Tech Leads:**
- 🎁 Até **10% de bônus** na nota pela liderança exemplar
- 🎁 Destaque no LinkedIn como Tech Lead do projeto
- 🎁 Carta de recomendação (opcional, se desempenho excepcional)

---

## 💡 Dicas Importantes

### Para o Git/GitHub

- **Commits frequentes**: Não deixe para commitar tudo no final
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- **Branches**: Trabalhem em branches separadas (`feature/auth`, `feature/courses`)
- **Pull Requests**: Revisem o código uns dos outros antes de mergear
- **Issues**: Usem para organizar tarefas e bugs
- **.gitignore**: Nunca commitem `.env`, `__pycache__`, `node_modules`

### Para o Backend

- **Inicie pelo banco**: Modelagem sólida evita refatorações futuras
- **Use Alembic**: Migrations facilitam mudanças no schema
- **Teste no Swagger**: Valide cada endpoint antes de integrar
- **Variáveis de ambiente**: Nunca hardcode senhas ou URLs
- **Validações rigorosas**: Pydantic ajuda muito nisso

### Para o Frontend

- **Wireframes primeiro**: Desenhem as telas antes de codar
- **Mobile-first**: Comecem pelo mobile, é mais fácil adaptar para desktop
- **Componentes reutilizáveis**: Crie funções para cards, modais, etc.
- **Feedback visual**: Loading, success e error são essenciais
- **Teste em navegadores diferentes**: Chrome, Firefox, Safari

### Para a Integração

- **Definam o contrato da API primeiro**: Documento com todos os endpoints
- **Usem dados mockados**: Frontend pode avançar enquanto backend desenvolve
- **Postman/Thunder Client**: Testem endpoints antes de integrar
- **Console do navegador**: Use `console.log()` para debugar requisições
- **Tratamento de erros**: Nunca deixe o usuário sem feedback

### Para a Apresentação

- **Ensaiem**: Pratiquem a apresentação antes do dia
- **Demo ao vivo**: Testem tudo antes para evitar surpresas
- **Plano B**: Tenham screenshots/vídeo caso algo dê errado
- **Storytelling**: Contem a jornada do projeto, não só o resultado
- **Destaquem aprendizados**: O que foi difícil? Como resolveram?

### Para o Deploy

- **Deploy cedo**: Não deixem para última hora
- **Testem em produção**: Pode funcionar localmente e falhar no deploy
- **Variáveis de ambiente**: Configure corretamente no serviço de hospedagem
- **URLs corretas**: Frontend precisa apontar para backend em produção
- **Banco de dados**: Usem serviço gerenciado (ElephantSQL, Supabase)

### Para os Tech Leads

- **Não façam tudo sozinhos**: Deleguem e confiem na equipe
- **Sejam pacientes**: Nem todos têm o mesmo ritmo de aprendizado
- **Documentem decisões**: Crie ADRs para escolhas importantes
- **Comuniquem-se constantemente**: Mantenham todos alinhados
- **Liderem pelo exemplo**: Código de qualidade, boas práticas, pontualidade
- **Estejam disponíveis**: Respondam dúvidas, mas também ensinem a pesquisar
- **Celebrem vitórias**: Reconheçam o esforço da equipe
- **Peçam ajuda quando necessário**: Tech Lead também não sabe tudo!

### Para a Gestão do Backlog

- **Priorize o MVP**: Funcionalidades essenciais primeiro
- **Seja realista**: Estime tempos considerando experiência da equipe
- **Revise diariamente**: Ajuste prioridades conforme necessário
- **Use labels**: Tags como "bug", "feature", "urgent", "enhancement"
- **Atribua responsáveis**: Cada card deve ter um dono
- **Defina critérios de aceitação**: O que significa "pronto"?
- **Documente impedimentos**: Bloqueios devem ser visíveis

---

## 🎉 Considerações Finais

Este é o momento de brilhar! Vocês aprenderam SQL, Python, APIs, Frontend e agora vão juntar tudo isso em um **projeto real e funcional**.

**Lembrem-se:**
- 🤝 **Colaboração é fundamental**: Ajudem-se, revisem código uns dos outros
- 📝 **Documentem tudo**: Seu eu do futuro e seus colegas agradecem
- 🐛 **É normal ter bugs**: O importante é debugar e aprender
- 💬 **Comuniquem-se**: Usem Discord/WhatsApp para alinhar
- 🎯 **Foco no MVP**: Façam funcionar primeiro, depois refinam
- 🚀 **Divulguem**: Esse projeto vai para o portfólio de vocês!

**Qualquer dúvida:**
- Consultem a documentação oficial das ferramentas
- Usem o ChatGPT/Copilot para dúvidas pontuais
- Peçam ajuda aos professores
- Discutam com a turma

Boa sorte, e que comecem os códigos! 🚀💻✨

---

**Data de Entrega:** 13/12/2025  
**Formato:** Apresentação + GitHub + LinkedIn + Deploy

---

*"O código que você escreve hoje é o portfólio que você mostra amanhã."*
