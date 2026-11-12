# 📘 ADR - Architecture Decision Record

## Título
Escolha da arquitetura e tecnologias para a Plataforma de Cursos Online

## Contexto
Precisamos desenvolver uma plataforma completa de cursos online com suporte a três papéis: aluno, professor e administrador.  
O sistema precisa ser web, escalável, com backend em Python e frontend moderno, além de um banco relacional robusto.

## Decisões Tomadas
- **Backend:** FastAPI (Python)  
  Motivo: rápido, moderno, fácil de documentar com Swagger e ótimo suporte a tipagem.
- **Banco de Dados:** PostgreSQL  
  Motivo: relacional, open source, ótimo suporte a queries complexas e integrações.
- **ORM:** SQLAlchemy + Alembic  
  Motivo: abstração robusta, migrações seguras e integração direta com FastAPI.
- **Frontend:** React (com opção de Vanilla JS)  
  Motivo: reatividade, componentização e facilidade de deploy.
- **Autenticação:** JWT  
  Motivo: segurança e compatibilidade com aplicações SPA.
- **Deploy:** Render / Railway / Vercel  
  Motivo: facilidade de uso e deploy gratuito ou de baixo custo.

## Alternativas Consideradas
- Django (mais pesado, menos flexível para API-first)
- MySQL (menos recursos avançados que PostgreSQL)
- Vue.js (alternativa ao React, mas equipe mais familiarizada com React)

## Consequências
- Arquitetura moderna, modular e escalável.
- Curva de aprendizado média para integração FastAPI + React.
- Deploy simples e facilmente replicável.

---
