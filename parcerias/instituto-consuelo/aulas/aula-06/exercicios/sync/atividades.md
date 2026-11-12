# 🧪 Atividades em Sala

## Atividade 1: Implementando Testes para uma API Existente (45 minutos)

**Enunciado:**

Você recebeu uma API simples de gerenciamento de tarefas (TODO list) sem testes. Sua missão é criar uma suíte de testes completa.

**Código base fornecido:**

```python
# app/tasks.py
from flask import Flask, jsonify, request

app = Flask(__name__)
tasks = []

@app.route('/tasks', methods=['GET'])
def get_tasks():
    status = request.args.get('status')
    if status:
        filtered = [t for t in tasks if t['status'] == status]
        return jsonify(filtered), 200
    return jsonify(tasks), 200

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({"error": "Title is required"}), 400
    
    task = {
        "id": len(tasks) + 1,
        "title": data['title'],
        "description": data.get('description', ''),
        "status": "pending"
    }
    
    tasks.append(task)
    return jsonify(task), 201

@app.route('/tasks/<int:task_id>', methods=['PATCH'])
def update_task(task_id):
    task = next((t for t in tasks if t['id'] == task_id), None)
    
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.get_json()
    if 'status' in data and data['status'] not in ['pending', 'done']:
        return jsonify({"error": "Invalid status"}), 400
    
    task.update(data)
    return jsonify(task), 200
```

**Tarefas:**

1. Configure o ambiente de testes com pytest
2. Crie fixtures necessárias
3. Implemente os seguintes testes:
   - Listar tarefas (lista vazia e com dados)
   - Criar tarefa com sucesso
   - Criar tarefa sem título (erro 400)
   - Filtrar tarefas por status
   - Atualizar status de tarefa
   - Atualizar tarefa inexistente (erro 404)
   - Atualizar com status inválido (erro 400)

**Resultado esperado:**

- Arquivo `tests/test_tasks.py` com no mínimo 7 testes
- Todos os testes devem passar
- Cobertura de código acima de 80%
- Uso correto do padrão AAA

---

## Atividade 2: Documentação e Versionamento Colaborativo (50 minutos)

**Enunciado:**

Em duplas, vocês vão documentar e versionar o projeto da atividade anterior seguindo boas práticas profissionais.

**Tarefas (distribuir entre a dupla):**

**Desenvolvedor A:**

1. Criar branch `docs/adicionar-readme`
2. Escrever README.md completo com:
   - Descrição do projeto
   - Instruções de instalação
   - Documentação dos 3 endpoints
   - Exemplos de uso com curl
3. Fazer commits seguindo Conventional Commits
4. Criar Pull Request

**Desenvolvedor B:**

1. Criar branch `feature/adicionar-testes-integracao`
2. Adicionar 2 novos testes de integração
3. Atualizar seção de testes no README (se existir)
4. Fazer commits seguindo Conventional Commits
5. Criar Pull Request

**Ambos:**

1. Fazer code review do PR do parceiro
2. Deixar comentários construtivos
3. Aprovar e fazer merge após ajustes

**Resultado esperado:**

- 2 Pull Requests criados e revisados
- README completo e profissional
- Mensagens de commit seguindo padrão
- Histórico limpo de commits
- Branches deletadas após merge
