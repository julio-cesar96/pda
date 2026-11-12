# 🏠 Atividades para Casa

## 📗 Nível Simples: Expandindo a Suíte de Testes

**Descrição:**

Adicione mais 3 testes ao projeto de tarefas, cobrindo edge cases:

1. Criar tarefa com título vazio (string vazia)
2. Atualizar múltiplos campos de uma tarefa simultaneamente
3. Listar tarefas com filtro de status inválido

**O que entregar:**

- Arquivo `tests/test_tasks_extra.py` com os 3 testes
- Todos os testes devem passar
- Commits seguindo Conventional Commits

**Critério de sucesso:**

- Testes cobrem cenários diferentes dos exemplos em aula
- Código segue o padrão AAA
- Mensagens de commit são descritivas

---

## 📘 Nível Médio: Documentação Visual com Diagramas

**Descrição:**

Crie um README aprimorado para um projeto pessoal seu (ou escolha um projeto open source pequeno) que inclua:

1. Descrição completa e atrativa
2. Diagrama de fluxo usando Mermaid para pelo menos um processo
3. Diagrama de sequência para uma interação importante
4. Badges de status, Python version e licença
5. Seção de troubleshooting com problemas comuns

**Critérios de avaliação:**

- Clareza e organização da documentação
- Qualidade e relevância dos diagramas
- Completude das informações
- Uso correto da sintaxe Markdown

**O que entregar:**

- README.md completo
- Screenshots ou link para repositório
- Documento explicando as escolhas de estrutura

---

## 📕 Nível Difícil: Projeto Integrado com CI/CD

**Descrição:**

Crie uma API REST completa de gerenciamento de biblioteca (livros, autores, empréstimos) integrando todos os conceitos da aula:

**Requisitos funcionais:**

- CRUD completo de livros (título, autor, ISBN, ano, disponível)
- CRUD de autores (nome, nacionalidade, data_nascimento)
- Sistema de empréstimos (registrar empréstimo, devolução)
- Validações robustas (ISBN válido, datas coerentes, etc.)

**Requisitos técnicos:**

1. **Testes:**
   - Mínimo 15 testes cobrindo cenários de sucesso e falha
   - Cobertura de código acima de 85%
   - Testes de validação para todos os campos obrigatórios

2. **Documentação:**
   - README profissional com todos os elementos vistos
   - Diagrama ER do banco de dados
   - Diagrama de fluxo do processo de empréstimo
   - Documentação completa de todos os endpoints

3. **Versionamento:**
   - Histórico limpo com commits seguindo Conventional Commits
   - Mínimo 3 branches feature diferentes
   - Pull Requests com descrições detalhadas
   - Uso de issues para organizar tarefas

4. **CI/CD:**
   - GitHub Actions configurado para executar testes automaticamente
   - Badge de build status no README
   - Configuração de cobertura mínima (80%)

**Critérios de avaliação:**

- **Funcionalidade**: API funciona corretamente
- **Testes**: Cobertura e qualidade dos testes
- **Documentação**: Clareza e completude
- **Versionamento**: Uso correto de Git/GitHub
- **CI/CD**: Automação funcionando

**Desafios extras (bônus):**

- Implementar autenticação básica
- Adicionar filtros e paginação na listagem
- Criar endpoint de estatísticas (livros mais emprestados, etc.)
- Dockerizar a aplicação

**O que entregar:**

- Link do repositório GitHub (público)
- README com instruções de execução
- Vídeo curto (3-5 min) demonstrando a aplicação funcionando

---
