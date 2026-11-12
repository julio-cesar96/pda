# 🧠 Pensamento Computacional para Desenvolvimento

> *"Todo mundo deveria aprender a programar um computador, porque isso te ensina a pensar." - Steve Jobs*

---

## 🎯 O que é Pensamento Computacional?

**Pensamento Computacional** é uma abordagem para resolver problemas de forma estruturada, aplicando conceitos da Ciência da Computação, mesmo em situações do dia a dia.

### 4 Pilares Fundamentais

```text
┌─────────────────────────────────────────────┐
│                                             │
│  1. DECOMPOSIÇÃO                            │
│     Dividir problema grande em pequenos     │
│                                             │
│  2. RECONHECIMENTO DE PADRÕES               │
│     Identificar semelhanças e tendências    │
│                                             │
│  3. ABSTRAÇÃO                               │
│     Focar no essencial, ignorar detalhes    │
│                                             │
│  4. ALGORITMOS                              │
│     Criar sequência de passos para resolver │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🧩 1. Decomposição

### Definição

**Dividir um problema complexo em partes menores e gerenciáveis.**

### Exemplo Prático: Sistema de E-commerce

```javascript
// ❌ PROBLEMA GRANDE (difícil de resolver de uma vez)
"Criar um e-commerce completo"

// ✅ DECOMPOSIÇÃO (pequenos problemas resolvíveis)
const ecommerce = {
  autenticacao: {
    cadastro: 'Criar conta de usuário',
    login: 'Autenticar usuário',
    recuperarSenha: 'Resetar senha'
  },
  
  catalogo: {
    listarProdutos: 'Exibir todos os produtos',
    buscarProdutos: 'Buscar por filtros',
    detalhesProduto: 'Ver informações completas'
  },
  
  carrinho: {
    adicionar: 'Adicionar item ao carrinho',
    remover: 'Remover item do carrinho',
    atualizar: 'Atualizar quantidade'
  },
  
  pagamento: {
    calcularTotal: 'Calcular valor final',
    processarPagamento: 'Processar transação',
    confirmarPedido: 'Confirmar compra'
  }
};
```

### Aplicação: Feature de Carrinho

```javascript
// Decomposição em funções pequenas
class Carrinho {
  constructor() {
    this.itens = [];
  }
  
  // Função 1: Adicionar item
  adicionar(produto, quantidade = 1) {
    const itemExistente = this.buscarItem(produto.id);
    
    if (itemExistente) {
      this.atualizarQuantidade(produto.id, itemExistente.quantidade + quantidade);
    } else {
      this.itens.push({ ...produto, quantidade });
    }
  }
  
  // Função 2: Buscar item
  buscarItem(produtoId) {
    return this.itens.find(item => item.id === produtoId);
  }
  
  // Função 3: Atualizar quantidade
  atualizarQuantidade(produtoId, novaQuantidade) {
    const item = this.buscarItem(produtoId);
    if (item) {
      item.quantidade = novaQuantidade;
    }
  }
  
  // Função 4: Remover item
  remover(produtoId) {
    this.itens = this.itens.filter(item => item.id !== produtoId);
  }
  
  // Função 5: Calcular total
  calcularTotal() {
    return this.itens.reduce((total, item) => {
      return total + (item.preco * item.quantidade);
    }, 0);
  }
}
```

---

## 🔍 2. Reconhecimento de Padrões

### Definição

**Identificar características comuns, semelhanças ou tendências em problemas diferentes.**

### Exemplo: CRUD Operations

```javascript
// Padrão identificado: CRUD (Create, Read, Update, Delete)
// Mesma estrutura para diferentes entidades

class GenericRepository {
  constructor(nomeEntidade) {
    this.entidade = nomeEntidade;
    this.dados = [];
    this.proximoId = 1;
  }
  
  // CREATE
  criar(item) {
    const novoItem = { id: this.proximoId++, ...item };
    this.dados.push(novoItem);
    return novoItem;
  }
  
  // READ
  listarTodos() {
    return this.dados;
  }
  
  buscarPorId(id) {
    return this.dados.find(item => item.id === id);
  }
  
  // UPDATE
  atualizar(id, novosDados) {
    const index = this.dados.findIndex(item => item.id === id);
    if (index !== -1) {
      this.dados[index] = { id, ...novosDados };
      return this.dados[index];
    }
    return null;
  }
  
  // DELETE
  deletar(id) {
    const index = this.dados.findIndex(item => item.id === id);
    if (index !== -1) {
      return this.dados.splice(index, 1)[0];
    }
    return null;
  }
}

// Reutilizar padrão para diferentes entidades
const usuarioRepo = new GenericRepository('Usuario');
const produtoRepo = new GenericRepository('Produto');
const pedidoRepo = new GenericRepository('Pedido');
```

### Padrões Comuns em JavaScript

```javascript
// 1. Padrão: Validação de formulário
const validadores = {
  email: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
  telefone: (valor) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(valor),
  cpf: (valor) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor),
  cep: (valor) => /^\d{5}-\d{3}$/.test(valor)
};

// 2. Padrão: Fetch de API
async function fetchAPI(url, metodo = 'GET', dados = null) {
  const config = {
    method: metodo,
    headers: { 'Content-Type': 'application/json' }
  };
  
  if (dados) {
    config.body = JSON.stringify(dados);
  }
  
  const response = await fetch(url, config);
  return response.json();
}

// 3. Padrão: Debounce (eventos frequentes)
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

---

## 🎨 3. Abstração

### Definição

**Focar nos aspectos essenciais, ignorando detalhes irrelevantes no momento.**

### Níveis de Abstração

```javascript
// ❌ BAIXO NÍVEL DE ABSTRAÇÃO (muitos detalhes)
function processarPedido(pedido) {
  // Validar pedido
  if (!pedido || !pedido.itens || pedido.itens.length === 0) {
    throw new Error('Pedido inválido');
  }
  
  // Calcular total
  let total = 0;
  for (const item of pedido.itens) {
    total += item.preco * item.quantidade;
  }
  
  // Aplicar desconto
  if (pedido.cupom === 'DESC10') {
    total *= 0.9;
  }
  
  // Conectar ao banco
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'ecommerce'
  });
  
  // Salvar pedido
  connection.query(`INSERT INTO pedidos (total) VALUES (${total})`);
  
  // Enviar email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'email@gmail.com', pass: 'senha' }
  });
  
  transporter.sendMail({
    to: pedido.usuario.email,
    subject: 'Pedido confirmado',
    text: `Seu pedido de R$ ${total} foi confirmado`
  });
  
  return total;
}

// ✅ ALTO NÍVEL DE ABSTRAÇÃO (foco no essencial)
function processarPedido(pedido) {
  validarPedido(pedido);
  const total = calcularTotal(pedido);
  salvarPedido(pedido, total);
  enviarConfirmacao(pedido, total);
  return total;
}

// Detalhes implementados em funções separadas
function validarPedido(pedido) { /* ... */ }
function calcularTotal(pedido) { /* ... */ }
function salvarPedido(pedido, total) { /* ... */ }
function enviarConfirmacao(pedido, total) { /* ... */ }
```

### Abstração com Classes

```javascript
// Abstração: Interface de pagamento
class ProcessadorPagamento {
  processar(valor) {
    throw new Error('Método deve ser implementado');
  }
}

// Implementações concretas (detalhes)
class PagamentoCartao extends ProcessadorPagamento {
  processar(valor) {
    console.log(`Processando ${valor} via cartão`);
    // Detalhes específicos de cartão
  }
}

class PagamentoPix extends ProcessadorPagamento {
  processar(valor) {
    console.log(`Processando ${valor} via Pix`);
    // Detalhes específicos de Pix
  }
}

// Uso: Não preciso saber COMO, apenas QUE processa
function finalizarCompra(valor, processador) {
  processador.processar(valor); // Abstração!
}
```

---

## 🔢 4. Algoritmos

### Definição

**Sequência de passos lógicos e ordenados para resolver um problema.**

### Estrutura de um Algoritmo

```text
1. ENTRADA: Dados necessários
2. PROCESSAMENTO: Passos para resolver
3. SAÍDA: Resultado esperado
```

### Exemplo 1: Algoritmo de Login

```javascript
/**
 * ALGORITMO: Autenticar usuário
 * 
 * ENTRADA:
 *   - email (string)
 *   - senha (string)
 * 
 * PROCESSAMENTO:
 *   1. Validar formato do email
 *   2. Buscar usuário no banco de dados
 *   3. Verificar se usuário existe
 *   4. Comparar senha (hash)
 *   5. Gerar token de autenticação
 * 
 * SAÍDA:
 *   - token (string) se sucesso
 *   - erro (objeto) se falha
 */

async function autenticar(email, senha) {
  // Passo 1: Validar email
  if (!validarEmail(email)) {
    throw new Error('Email inválido');
  }
  
  // Passo 2 e 3: Buscar e verificar usuário
  const usuario = await buscarUsuarioPorEmail(email);
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }
  
  // Passo 4: Verificar senha
  const senhaCorreta = await compararSenha(senha, usuario.senhaHash);
  if (!senhaCorreta) {
    throw new Error('Senha incorreta');
  }
  
  // Passo 5: Gerar token
  const token = gerarToken(usuario.id);
  
  return { token, usuario };
}
```

### Exemplo 2: Algoritmo de Busca

```javascript
/**
 * ALGORITMO: Busca Linear
 * 
 * ENTRADA:
 *   - array (array)
 *   - alvo (qualquer)
 * 
 * PROCESSAMENTO:
 *   1. Para cada elemento do array:
 *      a. Comparar com alvo
 *      b. Se igual, retornar índice
 *   2. Se não encontrado, retornar -1
 * 
 * SAÍDA:
 *   - índice (number) ou -1
 */

function buscaLinear(array, alvo) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === alvo) {
      return i; // Encontrado!
    }
  }
  return -1; // Não encontrado
}

/**
 * ALGORITMO: Busca Binária (mais eficiente, array ordenado)
 * 
 * PROCESSAMENTO:
 *   1. Definir início e fim do array
 *   2. Enquanto início <= fim:
 *      a. Calcular meio
 *      b. Se meio === alvo, retornar índice
 *      c. Se meio < alvo, buscar na direita
 *      d. Se meio > alvo, buscar na esquerda
 *   3. Se não encontrado, retornar -1
 */

function buscaBinaria(array, alvo) {
  let inicio = 0;
  let fim = array.length - 1;
  
  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);
    
    if (array[meio] === alvo) {
      return meio;
    } else if (array[meio] < alvo) {
      inicio = meio + 1; // Buscar direita
    } else {
      fim = meio - 1; // Buscar esquerda
    }
  }
  
  return -1;
}
```

---

## 🛠️ Aplicando Pensamento Computacional no Dia a Dia

### Problema: Criar um To-Do List

#### 1. Decomposição

```text
┌─────────────────────────────────┐
│ TODO APP                        │
├─────────────────────────────────┤
│ 1. Interface (UI)               │
│    - Input para nova tarefa     │
│    - Lista de tarefas           │
│    - Botões de ação             │
│                                 │
│ 2. Estado (Data)                │
│    - Array de tarefas           │
│    - Cada tarefa: id, texto,    │
│      concluída                  │
│                                 │
│ 3. Funcionalidades              │
│    - Adicionar tarefa           │
│    - Marcar como concluída      │
│    - Remover tarefa             │
│    - Filtrar (todas/ativas/     │
│      concluídas)                │
│                                 │
│ 4. Persistência                 │
│    - Salvar no localStorage     │
│    - Carregar ao iniciar        │
└─────────────────────────────────┘
```

#### 2. Reconhecimento de Padrões

```javascript
// Padrão: Estado + Ações (como Redux/Zustand)
class TodoStore {
  constructor() {
    this.tarefas = this.carregar();
  }
  
  // Padrão: CRUD
  adicionar(texto) { /* ... */ }
  atualizar(id, dados) { /* ... */ }
  remover(id) { /* ... */ }
  buscar(id) { /* ... */ }
  
  // Padrão: Filtros
  filtrarAtivas() { /* ... */ }
  filtrarConcluidas() { /* ... */ }
  
  // Padrão: Persistência
  salvar() { /* ... */ }
  carregar() { /* ... */ }
}
```

#### 3. Abstração

```javascript
// Abstração: Não importa COMO persiste, apenas QUE persiste
class PersistenciaAbstrata {
  salvar(dados) {
    throw new Error('Implementar');
  }
  
  carregar() {
    throw new Error('Implementar');
  }
}

class LocalStoragePersistencia extends PersistenciaAbstrata {
  salvar(dados) {
    localStorage.setItem('todos', JSON.stringify(dados));
  }
  
  carregar() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  }
}

// Amanhã posso trocar por IndexedDB sem mudar o resto do código!
class IndexedDBPersistencia extends PersistenciaAbstrata {
  salvar(dados) { /* IndexedDB logic */ }
  carregar() { /* IndexedDB logic */ }
}
```

#### 4. Algoritmo Completo

```javascript
class TodoApp {
  constructor(persistencia) {
    this.persistencia = persistencia;
    this.tarefas = this.persistencia.carregar();
    this.proximoId = this.calcularProximoId();
  }
  
  // Algoritmo: Adicionar tarefa
  adicionar(texto) {
    // 1. Validar entrada
    if (!texto || texto.trim() === '') {
      throw new Error('Texto não pode ser vazio');
    }
    
    // 2. Criar tarefa
    const novaTarefa = {
      id: this.proximoId++,
      texto: texto.trim(),
      concluida: false,
      criadaEm: new Date().toISOString()
    };
    
    // 3. Adicionar ao array
    this.tarefas.push(novaTarefa);
    
    // 4. Persistir
    this.persistencia.salvar(this.tarefas);
    
    // 5. Retornar tarefa criada
    return novaTarefa;
  }
  
  // Algoritmo: Marcar como concluída
  marcarConcluida(id) {
    // 1. Buscar tarefa
    const tarefa = this.tarefas.find(t => t.id === id);
    
    // 2. Verificar se existe
    if (!tarefa) {
      throw new Error('Tarefa não encontrada');
    }
    
    // 3. Alternar status
    tarefa.concluida = !tarefa.concluida;
    
    // 4. Persistir
    this.persistencia.salvar(this.tarefas);
    
    return tarefa;
  }
  
  // Algoritmo: Remover tarefa
  remover(id) {
    // 1. Encontrar índice
    const indice = this.tarefas.findIndex(t => t.id === id);
    
    // 2. Verificar se existe
    if (indice === -1) {
      throw new Error('Tarefa não encontrada');
    }
    
    // 3. Remover do array
    const [tarefaRemovida] = this.tarefas.splice(indice, 1);
    
    // 4. Persistir
    this.persistencia.salvar(this.tarefas);
    
    return tarefaRemovida;
  }
  
  // Helpers
  calcularProximoId() {
    return this.tarefas.length > 0
      ? Math.max(...this.tarefas.map(t => t.id)) + 1
      : 1;
  }
  
  filtrar(status) {
    if (status === 'ativas') {
      return this.tarefas.filter(t => !t.concluida);
    } else if (status === 'concluidas') {
      return this.tarefas.filter(t => t.concluida);
    }
    return this.tarefas;
  }
}
```

---

## 🎯 Estratégias para Desenvolver Pensamento Computacional

### 1. Divida e Conquiste

```text
Problema grande → Problemas pequenos → Resolver um a um
```

### 2. Desenhe Fluxogramas

```text
┌─────────┐
│ Início  │
└────┬────┘
     │
     ▼
┌─────────────┐
│ Ler entrada │
└────┬────────┘
     │
     ▼
┌──────────────┐      NÃO
│ Válido?      ├──────────→ [Erro]
└────┬─────────┘
     │ SIM
     ▼
┌──────────────┐
│ Processar    │
└────┬─────────┘
     │
     ▼
┌──────────────┐
│ Retornar     │
└────┬─────────┘
     │
     ▼
┌─────────┐
│   Fim   │
└─────────┘
```

### 3. Escreva Pseudocódigo Antes de Programar

```text
FUNÇÃO autenticar(email, senha):
  SE email é inválido ENTÃO
    RETORNAR erro "Email inválido"
  FIM SE
  
  usuario = buscarUsuario(email)
  
  SE usuario não existe ENTÃO
    RETORNAR erro "Usuário não encontrado"
  FIM SE
  
  SE senha != usuario.senha ENTÃO
    RETORNAR erro "Senha incorreta"
  FIM SE
  
  token = gerarToken(usuario)
  RETORNAR token
FIM FUNÇÃO
```

### 4. Teste com Dados Simples Primeiro

```javascript
// Teste com caso simples
console.log(somar(2, 3)); // 5

// Depois teste com casos complexos
console.log(somar(-5, 10)); // 5
console.log(somar(0, 0)); // 0
console.log(somar(1.5, 2.5)); // 4

// Depois teste edge cases
console.log(somar(null, 5)); // Erro?
console.log(somar('2', 3)); // Erro?
```

### 5. Refatore Sempre

```javascript
// Versão 1: Funciona, mas pode melhorar
function calcular(a, b, op) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return a / b;
}

// Versão 2: Mais extensível
const operacoes = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
};

function calcular(a, b, op) {
  if (!operacoes[op]) {
    throw new Error('Operação inválida');
  }
  return operacoes[op](a, b);
}
```

---

## 📊 Exercícios Práticos

### Exercício 1: Decomposição

**Problema:** "Criar um sistema de reserva de quartos de hotel"

**Sua decomposição:**

```text
1. ...
2. ...
3. ...
```

<details>
<summary>Ver Solução</summary>

```text
1. Gerenciamento de Quartos
   - Listar quartos disponíveis
   - Buscar quarto por ID
   - Atualizar status do quarto

2. Gerenciamento de Clientes
   - Cadastrar cliente
   - Buscar cliente
   - Atualizar dados do cliente

3. Reservas
   - Criar reserva
   - Verificar disponibilidade
   - Cancelar reserva
   - Calcular preço

4. Pagamento
   - Processar pagamento
   - Gerar recibo
   - Reembolso
```

</details>

### Exercício 2: Padrões

**Identifique o padrão:**

```javascript
function buscarUsuario(id) { /* ... */ }
function buscarProduto(id) { /* ... */ }
function buscarPedido(id) { /* ... */ }
```

<details>
<summary>Ver Solução</summary>

```javascript
// Padrão: Busca por ID (repetido)
// Solução: Generic function

function buscar(entidade, id) {
  return database.query(`SELECT * FROM ${entidade} WHERE id = ${id}`);
}

const usuario = buscar('usuarios', 1);
const produto = buscar('produtos', 5);
const pedido = buscar('pedidos', 10);
```

</details>

### Exercício 3: Algoritmo

**Escreva um algoritmo para encontrar o segundo maior número em um array.**

<details>
<summary>Ver Solução</summary>

```javascript
/**
 * ALGORITMO: Segundo maior número
 * 
 * ENTRADA: array de números
 * 
 * PROCESSAMENTO:
 *   1. Validar: array deve ter pelo menos 2 elementos
 *   2. Inicializar: maior = -Infinity, segundo = -Infinity
 *   3. Para cada número:
 *      a. Se > maior:
 *         - segundo = maior
 *         - maior = número
 *      b. Senão, se > segundo e != maior:
 *         - segundo = número
 *   4. Retornar segundo
 * 
 * SAÍDA: segundo maior número
 */

function segundoMaior(array) {
  // Passo 1: Validar
  if (array.length < 2) {
    throw new Error('Array deve ter pelo menos 2 elementos');
  }
  
  // Passo 2: Inicializar
  let maior = -Infinity;
  let segundo = -Infinity;
  
  // Passo 3: Processar
  for (const num of array) {
    if (num > maior) {
      segundo = maior;
      maior = num;
    } else if (num > segundo && num !== maior) {
      segundo = num;
    }
  }
  
  // Passo 4: Retornar
  return segundo;
}

// Testes
console.log(segundoMaior([1, 5, 3, 9, 2])); // 5
console.log(segundoMaior([10, 10, 9])); // 9
```

</details>

---

## 🎓 Recursos para Praticar

- **LeetCode:** <https://leetcode.com/>
- **HackerRank:** <https://www.hackerrank.com/>
- **Codewars:** <https://www.codewars.com/>
- **Exercism:** <https://exercism.org/>
- **CS50 (Harvard):** <https://cs50.harvard.edu/>

---

## 🎯 Resumo

```text
┌──────────────────────────────────────────────┐
│ PENSAMENTO COMPUTACIONAL                     │
├──────────────────────────────────────────────┤
│                                              │
│ 1. DECOMPOSIÇÃO                              │
│    "Divida para conquistar"                  │
│    Problema grande → Problemas pequenos      │
│                                              │
│ 2. PADRÕES                                   │
│    "O que já vi parecido?"                   │
│    Reutilize soluções conhecidas             │
│                                              │
│ 3. ABSTRAÇÃO                                 │
│    "O que realmente importa?"                │
│    Foque no essencial, ignore detalhes       │
│                                              │
│ 4. ALGORITMOS                                │
│    "Como resolver passo a passo?"            │
│    Entrada → Processamento → Saída           │
│                                              │
└──────────────────────────────────────────────┘

Pratique diariamente! 🧠
```

**Desenvolva o pensamento computacional e resolva qualquer problema! 🧠✨**
