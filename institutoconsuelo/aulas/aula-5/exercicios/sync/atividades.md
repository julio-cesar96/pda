# 🧪 Atividades em Sala

## Atividade 1: Construindo sua Primeira API (45 minutos)

**Objetivo**: Criar uma API funcional para gerenciar uma biblioteca de livros.

**Enunciado**:
Crie uma API REST com os seguintes requisitos:

1. **Modelo de Livro** com os campos:
   - `id` (inteiro, chave primária)
   - `titulo` (string, obrigatório, máximo 200 caracteres)
   - `autor` (string, obrigatório)
   - `ano_publicacao` (inteiro, obrigatório)
   - `isbn` (string, único, 13 caracteres)
   - `disponivel` (booleano, padrão True)

2. **Endpoints a implementar**:
   - `POST /livros` - Criar um novo livro
   - `GET /livros` - Listar todos os livros
   - `GET /livros/{id}` - Buscar livro por ID
   - `GET /livros/buscar?autor=Nome` - Filtrar por autor
   - `DELETE /livros/{id}` - Remover um livro

**Resultado Esperado**:

- API funcional com validação de dados
- Documentação automática no Swagger
- Tratamento de erros (404 quando livro não existe)
- Código organizado seguindo a estrutura apresentada

**Dicas**:

- Comece criando os schemas no `schemas.py`
- Depois crie o modelo no `models.py`
- Por fim, implemente as rotas em `routes/livros.py`
- Teste cada endpoint no Swagger à medida que implementa

---

## Atividade 2: Integração Completa com PostgreSQL (60 minutos - em duplas)

**Objetivo**: Implementar um sistema de gestão de pedidos conectado ao banco de dados.

**Enunciado**:
Trabalhem em duplas para criar uma API que gerencie pedidos de produtos:

1. **Criar dois modelos relacionados**:
   - `Produto` (já existe)
   - `Pedido` com os campos:
     - `id`, `cliente_nome`, `produto_id` (chave estrangeira), `quantidade`, `valor_total`, `status` (pendente/concluído), `data_pedido`

2. **Implementar**:
   - Endpoint para criar pedido (valida se produto existe e tem estoque)
   - Endpoint para listar pedidos de um cliente
   - Endpoint para atualizar status do pedido
   - Ao criar pedido, diminuir automaticamente o estoque do produto

3. **Desafio Extra**: Adicionar endpoint que retorna o total de vendas por categoria

**Resultado Esperado**:

- Relação funcional entre tabelas (Foreign Key)
- Validações de negócio (não permitir pedido sem estoque)
- Transações atômicas (se pedido falhar, estoque não é alterado)
- Código limpo e comentado

**Divisão de Tarefas Sugerida**:

- Pessoa 1: Modelos e schemas
- Pessoa 2: Endpoints e lógica de negócio
- Juntos: Testes e validações
