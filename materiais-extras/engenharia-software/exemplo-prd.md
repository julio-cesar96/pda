# 📗 PRD - Product Requirements Document

## Visão Geral
O produto é uma **plataforma de cursos online** onde professores podem criar e gerenciar cursos e alunos podem se inscrever e acompanhar seu progresso.  
O objetivo é oferecer uma experiência de ensino e aprendizagem completa em uma aplicação web moderna.

---

## Objetivos do Produto
- Permitir a criação e consumo de cursos online.
- Oferecer diferentes níveis de acesso (aluno, professor, admin).
- Garantir uma experiência intuitiva e segura.

---

## Papéis de Usuário

### Aluno
- Criar conta, fazer login e recuperar senha.
- Inscrever-se em cursos.
- Visualizar materiais e enviar atividades.
- Receber notas e feedbacks.

### Professor
- Criar, editar e excluir cursos.
- Adicionar materiais e atividades.
- Avaliar submissões.
- Acompanhar progresso dos alunos.

### Administrador
- Gerenciar usuários e cursos.
- Monitorar estatísticas gerais.
- Acessar painel de controle administrativo.

---

## Requisitos Funcionais
1. Sistema de login e recuperação de senha.  
2. CRUD de cursos, materiais e atividades.  
3. Controle de acesso baseado em papéis.  
4. Upload e armazenamento de arquivos.  
5. Sistema de inscrição de alunos.  
6. Painel de controle do professor e admin.  
7. API REST documentada com Swagger.

---

## Requisitos Não Funcionais
- Backend em **FastAPI (Python)**.
- Banco **PostgreSQL**.
- Frontend em **React ou Vanilla JS**.
- Deploy em **Render / Railway / Vercel**.
- Código aberto e modular.
- Testes básicos de API e interface.

---

## Métricas de Sucesso
- Tempo médio de cadastro e login < 5s.
- Disponibilidade > 99%.
- Até 500 usuários simultâneos em ambiente inicial.

---
