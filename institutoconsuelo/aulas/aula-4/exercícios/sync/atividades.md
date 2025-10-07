# 🧪 Atividades em Sala

## 📝 **Atividade 1: Validador de Senhas** (25 min)

**Objetivo:** Criar um módulo de validação de senhas com testes.

**Enunciado:**
Crie um arquivo `validador_senha.py` com uma função que valida senhas seguindo estas regras:

- Mínimo de 8 caracteres
- Pelo menos uma letra maiúscula
- Pelo menos uma letra minúscula
- Pelo menos um número
- Pelo menos um caractere especial (@, #, $, %, etc.)

Em seguida, crie `test_validador_senha.py` com pelo menos 5 testes diferentes.

**Resultado Esperado:**

```python
# Testes devem verificar:
# 1. Senha válida
# 2. Senha muito curta
# 3. Sem maiúsculas
# 4. Sem números
# 5. Sem caracteres especiais
```

**Dica:** Use regex (`re` module) para validação.

---

### 📝 **Atividade 2: Sistema de Biblioteca (Dupla)** (25 min)

**Objetivo:** Criar um sistema modularizado de gerenciamento de livros.

**Enunciado:**
Trabalhe em dupla para criar:

1. **Módulo `livro.py`:**
   - Classe `Livro` com atributos: titulo, autor, ano, isbn
   - Método para exibir informações
   
2. **Módulo `biblioteca.py`:**
   - Classe `Biblioteca` que gerencia uma coleção de livros
   - Métodos: adicionar_livro, buscar_por_autor, listar_todos
   
3. **Arquivo `test_biblioteca.py`:**
   - Testes para adicionar livros
   - Testes para buscar livros
   - Teste para listar livros

**Resultado Esperado:**
Sistema funcional que permite gerenciar livros com testes cobrindo as principais funcionalidades.
