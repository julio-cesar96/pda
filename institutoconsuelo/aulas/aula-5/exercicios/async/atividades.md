# 🏠 Atividades para Casa

## **Nível Simples**: Expandindo a API de Produtos

**Descrição**:
Adicione dois novos endpoints à API de produtos:

1. `GET /produtos/categoria/{categoria}` - Lista produtos de uma categoria específica
2. `PATCH /produtos/{id}/estoque` - Atualiza apenas o estoque de um produto

**O que se espera**:

- Código funcional e comentado
- Testes realizados no Swagger UI com prints das respostas
- Um arquivo `RESPOSTA.md` explicando:
  - Qual a diferença entre PUT e PATCH?
  - Por que usar um endpoint específico para atualizar estoque?

**Critérios de avaliação**:

- Código funciona corretamente (40%)
- Boas práticas aplicadas (30%)
- Explicações claras e corretas (30%)

---

## **Nível Médio**: Sistema de Autenticação Básico

**Descrição**:
Implemente um sistema simples de autenticação para proteger os endpoints de criação, atualização e deleção:

1. Crie um modelo `Usuario` com: `id`, `username`, `email`, `senha_hash`
2. Implemente endpoints de registro e login
3. Proteja endpoints sensíveis (POST, PUT, DELETE) com autenticação básica

**Requisitos técnicos**:

- Use `passlib` para hash de senhas
- Use `python-jose` para gerar tokens JWT
- Implemente um decorator/dependency `@require_auth`

**Critérios de avaliação**:

- Funcionalidade completa (40%)
- Segurança adequada (senha nunca armazenada em texto plano) (30%)
- Organização do código (20%)
- Documentação no código (10%)

**Recursos úteis**:

- Documentação FastAPI sobre segurança: <https://fastapi.tiangolo.com/tutorial/security/>

---

## **Nível Difícil**: Sistema de E-commerce Completo

**Descrição**:
Crie uma API completa de e-commerce integrando múltiplos conceitos:

**Modelos a implementar**:

1. `Usuario` (cliente)
2. `Produto` (expandido com imagens, avaliações)
3. `Carrinho` (relação muitos-para-muitos com produtos)
4. `Pedido` (com status, histórico)
5. `Avaliacao` (relação produto-usuário)

**Funcionalidades**:

- Sistema de carrinho (adicionar, remover, calcular total)
- Checkout (criar pedido a partir do carrinho)
- Sistema de avaliações (usuários avaliam produtos comprados)
- Dashboard de vendas (estatísticas por período)
- Filtros avançados (preço, categoria, avaliação mínima)

**Desafios técnicos**:

- Implementar transações no banco (pedidos devem ser atômicos)
- Criar relacionamentos complexos (muitos-para-muitos)
- Implementar agregações SQL (vendas por período, média de avaliações)
- Adicionar paginação eficiente em todas as listagens
- Implementar cache de consultas frequentes (opcional)

**Estrutura esperada**:

```source
missao-api-ecommerce/
│
├── app/
│   ├── models/
│   │   ├── usuario.py
│   │   ├── produto.py
│   │   ├── carrinho.py
│   │   ├── pedido.py
│   │   └── avaliacao.py
│   │
│   ├── routes/
│   │   ├── usuarios.py
│   │   ├── produtos.py
│   │   ├── carrinho.py
│   │   ├── pedidos.py
│   │   └── dashboard.py
│   │
│   ├── schemas/
│   ├── services/  # Lógica de negócio complexa
│   └── utils/     # Funções auxiliares
│
├── tests/  # Testes unitários (bonus!)
└── README.md  # Documentação completa do projeto
```

**Critérios de avaliação**:

- Funcionalidades implementadas completamente (30%)
- Qualidade do código e organização (25%)
- Tratamento adequado de erros e casos extremos (20%)
- Documentação clara (README + docstrings) (15%)
- Testes (opcional, +10% bonus)

**Entrega**:

- Repositório Git com histórico de commits significativos
- README com instruções de instalação e uso
- Vídeo curto (3-5 min) demonstrando as funcionalidades

**Relação com projetos reais**:
Este projeto simula sistemas reais como Mercado Livre, Amazon, e Magazine Luiza. Habilidades desenvolvidas:

- Modelagem de dados complexos
- Gerenciamento de transações
- Otimização de consultas
- Arquitetura escalável
