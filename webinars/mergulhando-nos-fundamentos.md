# Mergulho nos Fundamentos: Reforçando a Base para Respostas Técnicas Imbatíveis

## 📋 Sumário

1. [Abertura e Contexto](#abertura-e-contexto)
2. [SQL e o Mundo Relacional](#sql-e-o-mundo-relacional)
3. [Estruturas de Dados e Lógica Avançada](#estruturas-de-dados-e-lógica-avançada)
4. [Backend de Ponta a Ponta: Comunicação e Segurança](#backend-de-ponta-a-ponta-comunicação-e-segurança)
5. [Encerramento e Materiais Recomendados](#encerramento-e-materiais-recomendados)

---

## Abertura e Contexto

### Por que fundamentos fazem diferença em entrevistas técnicas?

Bem-vindos! Hoje vamos reforçar a base que sustenta qualquer desenvolvedor backend competente. Durante análises de entrevistas técnicas, identificamos padrões claros: **candidatos que dominam fundamentos conseguem se adaptar a qualquer tecnologia**. Por outro lado, quem depende apenas de memorização ou tutoriais específicos trava quando o problema muda ligeiramente.

### O que será coberto neste webinar

Vamos mergulhar em três pilares essenciais:

1. **SQL e Bancos Relacionais** - Entender como dados se organizam e se relacionam
2. **Estruturas de Dados em JavaScript** - Manipulação eficiente de arrays e objetos
3. **Comunicação Backend** - Fluxo completo de requisições, APIs e segurança

### Os gaps mais comuns identificados

Após análise de dezenas de entrevistas técnicas, os pontos de maior confusão são:

- **SQL**: Não entender o conceito de chaves estrangeiras e relacionamentos
- **ORMs**: Usar sem compreender o que acontece "por baixo do capô"
- **Arrays/Objetos**: Confundir métodos, não saber quando usar cada um
- **Backend**: Não conseguir explicar o fluxo de uma requisição HTTP
- **Segurança**: Respostas vagas sobre autenticação e autorização

**Nosso objetivo**: Transformar cada um desses pontos fracos em domínio conceitual sólido.

---

## SQL e o Mundo Relacional

### O que é um Banco de Dados Relacional?

Imagine que você precisa organizar informações de uma escola. Você tem:
- Alunos
- Turmas
- Professores
- Disciplinas

Um banco relacional organiza essas informações em **tabelas** (como planilhas) que se **relacionam** entre si através de referências.

#### Por que "relacional"?

Porque as tabelas estabelecem **relações** entre si. Um aluno está matriculado em uma turma. Uma turma tem um professor. Um professor ensina várias disciplinas. São essas conexões que dão poder ao modelo relacional.

### Conceito fundamental: Chave Primária (Primary Key)

Cada linha de uma tabela precisa ser **única e identificável**. A chave primária é o campo que garante isso.
```
Tabela: alunos
+----+------------------+-------------------+
| id | nome             | email             |
+----+------------------+-------------------+
| 1  | Maria Silva      | maria@email.com   |
| 2  | João Santos      | joao@email.com    |
| 3  | Ana Costa        | ana@email.com     |
+----+------------------+-------------------+
         ↑
    Chave Primária
```

### Desmistificando: Chave Estrangeira (Foreign Key)

**Este é um dos conceitos que mais geram confusão em entrevistas.**

Uma chave estrangeira é simplesmente **uma referência ao ID de outra tabela**. Ela cria o relacionamento entre tabelas.

#### Exemplo prático
```
Tabela: alunos
+----+------------------+
| id | nome             |
+----+------------------+
| 1  | Maria Silva      |
| 2  | João Santos      |
+----+------------------+

Tabela: matriculas
+----+-----------+----------+
| id | aluno_id  | turma_id |
+----+-----------+----------+
| 1  | 1         | 101      |
| 2  | 2         | 101      |
+----+-----------+----------+
         ↑
   Foreign Key
 (referencia alunos.id)
```

**O que a Foreign Key garante:**
- Integridade referencial: não posso matricular um aluno_id que não existe
- Relacionamentos consistentes: se deletar um aluno, posso configurar o que acontece com suas matrículas

#### Diagrama ASCII de relacionamento
```
    +-------------+              +--------------+
    |   alunos    |              |  matriculas  |
    +-------------+              +--------------+
    | id (PK)     |<------------>| aluno_id(FK) |
    | nome        |       1:N    | turma_id(FK) |
    | email       |              | data         |
    +-------------+              +--------------+
```

**Leia-se:** Um aluno pode ter MUITAS matrículas (1:N)

### Conceitos Avançados em SQL

#### Índices: Acelerando Consultas
Índices são estruturas que aceleram buscas, mas consomem espaço e podem tornar inserções mais lentas. Use em colunas frequentemente filtradas.

**Exemplo prático:**
```sql
-- Criar índice em coluna de email (comum em logins)
CREATE INDEX idx_usuario_email ON usuarios(email);

-- Query otimizada
SELECT * FROM usuarios WHERE email = 'maria@email.com'; -- Agora usa índice
```

**Quando usar índices:**
- Colunas em WHERE, JOIN ou ORDER BY
- Evite em tabelas pequenas ou colunas com baixa cardinalidade

#### Transações: Garantindo Consistência
Transações agrupam operações que devem suceder ou falhar juntas (ACID: Atomicidade, Consistência, Isolamento, Durabilidade).

**Exemplo com Sequelize:**
```javascript
// Transferência bancária: ambas operações ou nenhuma
const t = await sequelize.transaction();

try {
  await Conta.update(
    { saldo: saldoOrigem - valor },
    { where: { id: contaOrigem }, transaction: t }
  );
  
  await Conta.update(
    { saldo: saldoDestino + valor },
    { where: { id: contaDestino }, transaction: t }
  );
  
  await t.commit();
} catch (error) {
  await t.rollback();
  throw error;
}
```

#### Validação de Dados e Constraints
Constraints garantem integridade: NOT NULL, UNIQUE, CHECK, DEFAULT.

**Exemplo de schema com validações:**
```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  idade INTEGER CHECK (idade >= 18),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Gap identificado:** Falta explicar triggers e stored procedures para lógica de negócio no banco.

### O Papel de um ORM

**ORM = Object-Relational Mapping**

É uma camada de abstração que permite trabalhar com banco de dados usando objetos da linguagem de programação, sem escrever SQL diretamente.

#### Vantagens
- Código mais legível e mantível
- Proteção contra SQL Injection
- Facilita mudança de banco de dados

#### Desvantagens
- Abstração pode esconder problemas de performance
- Queries complexas podem ficar confusas

### Exemplo prático: Sequelize (padrão Node.js)

**SQL puro:**
```sql
SELECT nome, email FROM alunos WHERE id = 1;
```

**Equivalente em Sequelize:**
```javascript
const aluno = await Aluno.findOne({
  where: { id: 1 },
  attributes: ['nome', 'email']
});
```

**SQL com JOIN:**
```sql
SELECT 
  alunos.nome,
  matriculas.turma_id
FROM alunos
INNER JOIN matriculas ON alunos.id = matriculas.aluno_id;
```

**Equivalente em Sequelize:**
```javascript
const alunos = await Aluno.findAll({
  attributes: ['nome'],
  include: [{
    model: Matricula,
    attributes: ['turma_id']
  }]
});
```

### Prisma: ORM Moderno

Prisma ganhou muita popularidade por sua type-safety e developer experience.

**Schema do Prisma:**
```prisma
model Aluno {
  id         Int          @id @default(autoincrement())
  nome       String
  email      String       @unique
  matriculas Matricula[]
}

model Matricula {
  id       Int    @id @default(autoincrement())
  aluno    Aluno  @relation(fields: [alunoId], references: [id])
  alunoId  Int
  turmaId  Int
  data     DateTime
}
```

**Query com Prisma:**
```javascript
const alunosComMatriculas = await prisma.aluno.findMany({
  include: {
    matriculas: true
  }
});
```

### Revisão prática de SQL com exemplos Prisma

#### 1. SELECT básico com Prisma
```javascript
// Buscar todos os alunos
const alunos = await prisma.aluno.findMany();

// Buscar com filtros
const alunosAtivos = await prisma.aluno.findMany({
  where: {
    ativo: true
  }
});
```

#### 2. SELECT envolvendo renomear colunas (ex: nome completo)
```javascript
// Criar campo calculado
const alunos = await prisma.aluno.findMany({
  select: {
    id: true,
    nomeCompleto: true, // Campo do banco
    // Ou calcular no JS
    nomeFormatado: true
  }
});

// Com concatenação SQL
const alunos = await prisma.$queryRaw`
  SELECT id, CONCAT(nome, ' ', sobrenome) as nome_completo
  FROM alunos
`;
```

#### 3. JOINs essenciais com Prisma
```javascript
// INNER JOIN (padrão)
const matriculasComAlunos = await prisma.matricula.findMany({
  include: {
    aluno: true
  }
});

// LEFT JOIN
const alunosComMatriculas = await prisma.aluno.findMany({
  include: {
    matriculas: true // LEFT JOIN automático
  }
});

// JOIN múltiplo
const matriculasDetalhadas = await prisma.matricula.findMany({
  include: {
    aluno: true,
    turma: true,
    professor: true
  }
});
```

### Demonstração: Mesmo SELECT feito via ORM (Prisma - recomendado)

**Cenário:** Buscar alunos com suas matrículas ativas

**SQL puro:**
```sql
SELECT 
  a.id,
  a.nome,
  a.email,
  m.id as matricula_id,
  m.turma_id,
  m.data_matricula
FROM alunos a
INNER JOIN matriculas m ON a.id = m.aluno_id
WHERE m.ativa = true
ORDER BY a.nome;
```

**Equivalente em Prisma:**
```javascript
const alunosComMatriculas = await prisma.aluno.findMany({
  where: {
    matriculas: {
      some: {
        ativa: true
      }
    }
  },
  include: {
    matriculas: {
      where: {
        ativa: true
      },
      select: {
        id: true,
        turmaId: true,
        dataMatricula: true
      }
    }
  },
  orderBy: {
    nome: 'asc'
  }
});
```

**Resultado:**
```javascript
[
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana@email.com",
    matriculas: [
      {
        id: 101,
        turmaId: 5,
        dataMatricula: "2024-01-15T00:00:00.000Z"
      }
    ]
  }
]
```

**Sequelize (mencionado para comparação):**
```javascript
const alunos = await Aluno.findAll({
  include: [{
    model: Matricula,
    where: { ativa: true },
    required: true // INNER JOIN
  }],
  order: [['nome', 'ASC']]
});
```

### Reforçar: mais importante do que memorizar comandos é entender o conceito por trás

**Avaliadores querem ver que você:**
1. Entende o que o ORM faz "por baixo"
2. Sabe quando usar SQL puro vs ORM
3. Compreende relacionamentos e JOINs conceitualmente
4. Consegue explicar trade-offs entre ORMs diferentes

**Exemplo de resposta em entrevista:**
> "Uso Prisma no dia a dia porque oferece type safety e DX superior. Mas entendo que ele gera queries SQL - quando faço um include, está fazendo um JOIN. Para queries complexas, às vezes escrevo SQL puro para ter mais controle sobre performance."

### 🎯 Ponto-chave para entrevistas

**Avaliadores querem ver que você entende:**
1. O que acontece "por baixo" quando usa um ORM
2. Quando SQL puro é mais apropriado que ORM
3. Como as relações entre tabelas funcionam conceitualmente

**Nunca diga:** "Não sei SQL porque sempre usei Prisma"  
**Diga:** "Uso Prisma no dia a dia, mas entendo que ele gera queries SQL. Por exemplo, quando faço um include, ele está fazendo um JOIN..."

---

## Estruturas de Dados e Lógica Avançada

### Por que arrays e objetos dominam entrevistas?

Praticamente todo problema de programação envolve:
- Armazenar coleções de dados (arrays)
- Organizar informações estruturadas (objetos)
- Transformar, filtrar ou agregar esses dados

### Revisão: Arrays em JavaScript

Um array é uma **lista ordenada** de elementos.
```javascript
const alunos = ['Maria', 'João', 'Ana'];

// Acessar por índice (começa em 0)
console.log(alunos[0]); // 'Maria'
console.log(alunos[2]); // 'Ana'

// Tamanho do array
console.log(alunos.length); // 3
```

### Revisão: Objetos em JavaScript

Um objeto é uma **coleção de pares chave-valor**.
```javascript
const aluno = {
  nome: 'Maria Silva',
  idade: 22,
  curso: 'Engenharia',
  ativo: true
};

// Acessar propriedades
console.log(aluno.nome);        // 'Maria Silva'
console.log(aluno['idade']);    // 22
```

**Spread/Rest operators (ES6+):**
```javascript
// Spread para copiar objetos
const usuarioBase = { nome: 'Maria', ativo: true };
const usuarioCompleto = { ...usuarioBase, email: 'maria@email.com' };

// Rest para parâmetros variáveis
const somar = (...numeros) => numeros.reduce((a, b) => a + b, 0);
console.log(somar(1, 2, 3, 4)); // 10
```

### Métodos de Arrays: Os 5 Essenciais

#### 1. map() - Transformar cada elemento

**Quando usar:** Preciso criar um novo array transformando cada elemento do array original.
```javascript
const numeros = [1, 2, 3, 4, 5];

// Dobrar cada número
const dobrados = numeros.map(num => num * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]

// Exemplo prático: extrair apenas os nomes
const usuarios = [
  { id: 1, nome: 'Maria' },
  { id: 2, nome: 'João' },
  { id: 3, nome: 'Ana' }
];

const nomes = usuarios.map(usuario => usuario.nome);
console.log(nomes); // ['Maria', 'João', 'Ana']
```

**❌ Erro comum:**
```javascript
// ERRADO - map sem retornar nada
usuarios.map(usuario => {
  console.log(usuario.nome); // Só imprime, não transforma
});
```

#### 2. filter() - Selecionar elementos que atendem critério

**Quando usar:** Preciso criar um novo array contendo apenas elementos que passam em um teste.
```javascript
const numeros = [1, 2, 3, 4, 5, 6];

// Apenas números pares
const pares = numeros.filter(num => num % 2 === 0);
console.log(pares); // [2, 4, 6]

// Exemplo prático: usuários ativos
const usuarios = [
  { nome: 'Maria', ativo: true },
  { nome: 'João', ativo: false },
  { nome: 'Ana', ativo: true }
];

const ativos = usuarios.filter(usuario => usuario.ativo);
console.log(ativos); 
// [{ nome: 'Maria', ativo: true }, { nome: 'Ana', ativo: true }]
```

#### 3. find() - Encontrar o primeiro elemento que atende critério

**Quando usar:** Preciso de UM elemento específico, não uma lista.
```javascript
const usuarios = [
  { id: 1, nome: 'Maria' },
  { id: 2, nome: 'João' },
  { id: 3, nome: 'Ana' }
];

const usuario = usuarios.find(u => u.id === 2);
console.log(usuario); // { id: 2, nome: 'João' }

// Se não encontrar, retorna undefined
const inexistente = usuarios.find(u => u.id === 999);
console.log(inexistente); // undefined
```

**⚠️ Diferença crucial:**
- `filter()` retorna um **array** (pode ser vazio)
- `find()` retorna **um elemento** ou undefined

#### 4. reduce() - Agregar/Acumular valores

**Quando usar:** Preciso reduzir um array a um único valor (soma, objeto, contagem, etc).

**Sintaxe:**
```javascript
array.reduce((acumulador, elementoAtual) => {
  // lógica de acumulação
  return novoAcumulador;
}, valorInicial);
```

**Diagrama ASCII do reduce:**
```
Array: [1, 2, 3, 4, 5]
       │
       ├── reduce((acc, num) => acc + num, 0)
       │
       ├── Iteração 1: acc=0, num=1 → acc=1
       │
       ├── Iteração 2: acc=1, num=2 → acc=3
       │
       ├── Iteração 3: acc=3, num=3 → acc=6
       │
       └── Resultado Final: 15
```

**Exemplo 1: Somar números**
```javascript
const numeros = [1, 2, 3, 4, 5];

const soma = numeros.reduce((total, num) => {
  return total + num;
}, 0);

console.log(soma); // 15
```

**Passo a passo:**
```
Iteração 1: total = 0,  num = 1  → retorna 0 + 1 = 1
Iteração 2: total = 1,  num = 2  → retorna 1 + 2 = 3
Iteração 3: total = 3,  num = 3  → retorna 3 + 3 = 6
Iteração 4: total = 6,  num = 4  → retorna 6 + 4 = 10
Iteração 5: total = 10, num = 5  → retorna 10 + 5 = 15
```

**Exemplo 2: Agrupar por categoria**
```javascript
const produtos = [
  { nome: 'Notebook', categoria: 'eletrônicos' },
  { nome: 'Mouse', categoria: 'eletrônicos' },
  { nome: 'Cadeira', categoria: 'móveis' },
  { nome: 'Mesa', categoria: 'móveis' }
];

const agrupados = produtos.reduce((acc, produto) => {
  const categoria = produto.categoria;
  
  if (!acc[categoria]) {
    acc[categoria] = [];
  }
  
  acc[categoria].push(produto);
  return acc;
}, {});

console.log(agrupados);
/*
{
  'eletrônicos': [
    { nome: 'Notebook', categoria: 'eletrônicos' },
    { nome: 'Mouse', categoria: 'eletrônicos' }
  ],
  'móveis': [
    { nome: 'Cadeira', categoria: 'móveis' },
    { nome: 'Mesa', categoria: 'móveis' }
  ]
}
*/
```

#### 5. forEach() - Executar ação para cada elemento

**Quando usar:** Preciso executar uma ação (como console.log, salvar no banco) para cada elemento, mas NÃO preciso de um novo array.
```javascript
const usuarios = ['Maria', 'João', 'Ana'];

usuarios.forEach(nome => {
  console.log(`Bem-vindo, ${nome}!`);
});

// Output:
// Bem-vindo, Maria!
// Bem-vindo, João!
// Bem-vindo, Ana!
```

**⚠️ Importante:** `forEach` NÃO retorna nada (retorna undefined)
```javascript
// ERRADO
const resultado = usuarios.forEach(nome => nome.toUpperCase());
console.log(resultado); // undefined

// CERTO - use map quando precisar transformar
const maiusculas = usuarios.map(nome => nome.toUpperCase());
console.log(maiusculas); // ['MARIA', 'JOÃO', 'ANA']
```

### Tabela Comparativa: Quando Usar Cada Método

| Método | Retorna | Quando Usar |
|--------|---------|-------------|
| `map` | Novo array com mesmo tamanho | Transformar cada elemento |
| `filter` | Novo array (pode ser menor) | Selecionar elementos |
| `find` | Um elemento ou undefined | Buscar elemento específico |
| `reduce` | Qualquer tipo (número, objeto, etc) | Agregar/acumular valores |
| `forEach` | undefined | Executar ação sem precisar de retorno |

### Encadeamento de Métodos (Method Chaining)

Uma técnica poderosa é combinar múltiplos métodos:
```javascript
const produtos = [
  { nome: 'Notebook', preco: 3000, categoria: 'eletrônicos' },
  { nome: 'Mouse', preco: 50, categoria: 'eletrônicos' },
  { nome: 'Cadeira', preco: 800, categoria: 'móveis' },
  { nome: 'Mesa', preco: 1200, categoria: 'móveis' }
];

// Buscar eletrônicos com preço acima de 100 e retornar só os nomes
const resultado = produtos
  .filter(p => p.categoria === 'eletrônicos')
  .filter(p => p.preco > 100)
  .map(p => p.nome);

console.log(resultado); // ['Notebook']
```

**Fluxo de Method Chaining:**
```
produtos
  .filter(p => p.categoria === 'eletrônicos')  // [Notebook, Mouse]
    ↓
  .filter(p => p.preco > 100)                  // [Notebook]
    ↓
  .map(p => p.nome)                            // ['Notebook']
```

### Casos Reais de Entrevistas

#### Caso 1: Otimização de Queries N+1 (Comum em ORMs)
**Pergunta:** "Você tem uma lista de pedidos e precisa buscar o nome do cliente para cada um. Como evita N+1 queries?"

**Problema comum (N+1):**
```javascript
// ❌ N+1 queries: 1 para pedidos + 1 por cliente
const pedidos = await Pedido.findAll();
for (const pedido of pedidos) {
  const cliente = await Cliente.findByPk(pedido.clienteId); // Query extra por loop
}
```

**Solução com JOIN/Eager Loading:**
```javascript
// ✅ 1 query com JOIN
const pedidos = await Pedido.findAll({
  include: [{ model: Cliente, attributes: ['nome'] }]
});
```

#### Caso 2: Manipulação de Arrays em Tempo Real
**Pergunta:** "Dado um array de produtos, filtre os disponíveis, aplique desconto de 10% e retorne apenas nome e preço final."

**Solução passo a passo:**
```javascript
const produtos = [
  { nome: 'Notebook', preco: 3000, disponivel: true },
  { nome: 'Mouse', preco: 50, disponivel: false },
  { nome: 'Teclado', preco: 200, disponivel: true }
];

const resultado = produtos
  .filter(p => p.disponivel)
  .map(p => ({
    nome: p.nome,
    precoFinal: p.preco * 0.9
  }));

console.log(resultado);
// [{ nome: 'Notebook', precoFinal: 2700 }, { nome: 'Teclado', precoFinal: 180 }]
```

#### Caso 3: Tratamento de Erros em API
**Pergunta:** "Como você lida com erros em uma API REST?"

**Exemplo prático:**
```javascript
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body;
    
    // Validação simples
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e email obrigatórios' });
    }
    
    const usuario = await Usuario.create({ nome, email });
    res.status(201).json(usuario);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ erro: 'Email já cadastrado' });
    } else {
      console.error(error);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
});
```

**Exercício adicional:** Implemente paginação em uma API de listagem (use LIMIT/OFFSET ou cursor-based).

### Erros e Confusões Comuns

#### ❌ Erro 1: Esquecer de retornar no map
```javascript
// ERRADO
const dobrados = [1, 2, 3].map(num => {
  num * 2; // Falta o return!
});
console.log(dobrados); // [undefined, undefined, undefined]

// CERTO
const dobrados = [1, 2, 3].map(num => {
  return num * 2;
});
// ou arrow function implícita
const dobrados = [1, 2, 3].map(num => num * 2);
```

#### ❌ Erro 2: Confundir find com filter
```javascript
const usuarios = [
  { id: 1, nome: 'Maria' },
  { id: 2, nome: 'João' }
];

// find retorna o OBJETO
const usuario = usuarios.find(u => u.id === 1);
console.log(usuario); // { id: 1, nome: 'Maria' }

// filter retorna um ARRAY
const resultado = usuarios.filter(u => u.id === 1);
console.log(resultado); // [{ id: 1, nome: 'Maria' }]
```

#### ❌ Erro 3: Mutar o array original sem querer
```javascript
const numeros = [1, 2, 3];

// sort() muta o array original!
numeros.sort((a, b) => b - a);
console.log(numeros); // [3, 2, 1] - array original foi modificado

// Cópia antes de mutar
const numerosOrdenados = [...numeros].sort((a, b) => b - a);
```

### Raciocínio Lógico: Abordagem Passo a Passo

**Como resolver problemas de lógica em entrevistas:**

#### 1. Leia o enunciado com atenção
- Identifique inputs e outputs esperados
- Procure por palavras-chave (todos, algum, primeiro, maior, etc)

#### 2. Quebre o problema em partes menores
- Não tente resolver tudo de uma vez
- Resolva sub-problemas primeiro

#### 3. Pense em voz alta
- Demonstre seu raciocínio
- Peça esclarecimentos se necessário

#### 4. Comece com a solução mais simples
- Não otimize prematuramente
- Funcione primeiro, otimize depois

**Exemplo prático:**

**Problema:** Encontre o segundo maior número em um array.
```javascript
// Input: [5, 2, 8, 1, 9, 3]
// Output: 8

// Passo 1: Entender o problema
// - Preciso ordenar ou encontrar os dois maiores?
// - E se houver números repetidos?

// Passo 2: Solução simples primeiro
function segundoMaior(numeros) {
  // Remover duplicatas
  const unicos = [...new Set(numeros)];
  
  // Ordenar em ordem decrescente
  unicos.sort((a, b) => b - a);
  
  // Retornar o segundo elemento
  return unicos[1];
}

console.log(segundoMaior([5, 2, 8, 1, 9, 3])); // 8

// Passo 3: Otimização (se pedida)
function segundoMaiorOtimizado(numeros) {
  let maior = -Infinity;
  let segundo = -Infinity;
  
  for (const num of numeros) {
    if (num > maior) {
      segundo = maior;
      maior = num;
    } else if (num > segundo && num !== maior) {
      segundo = num;
    }
  }
  
  return segundo;
}
```

---

## Backend de Ponta a Ponta: Comunicação e Segurança

### O Fluxo Completo de uma Requisição

Este é **o conceito mais importante** para entender desenvolvimento web. Vamos decompor cada etapa:
```
┌─────────────┐      HTTP Request       ┌─────────────┐
│   Frontend  │ ───────────────────────> │   Backend   │
│  (Browser)  │                          │  (Servidor) │
└─────────────┘                          └─────────────┘
                                                │
                                                │ SQL Query
                                                ▼
                                         ┌─────────────┐
                                         │  Banco de   │
                                         │    Dados    │
                                         └─────────────┘
                                                │
                                                │ Response
┌─────────────┐      HTTP Response      ┌─────────────┐
│   Frontend  │ <─────────────────────── │   Backend   │
│  (Browser)  │                          │  (Servidor) │
└─────────────┘                          └─────────────┘
```

#### Passo a Passo Detalhado

**1. Frontend envia requisição**
```javascript
// Exemplo: buscar lista de usuários
fetch('https://api.exemplo.com/usuarios', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer seu-token-aqui',
    'Content-Type': 'application/json'
  }
})
```

**2. Servidor recebe e processa**
```javascript
// Exemplo com Express.js
app.get('/usuarios', async (req, res) => {
  try {
    const { authorization } = req.headers; // Destructuring
    if (!authorization) {
      return res.status(401).json({ erro: 'Não autorizado' });
    }
    
    const usuarios = await Usuario.findAll(); // Async/await consistente
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno' });
  }
});
```

**3. Banco de dados responde**
```sql
SELECT id, nome, email FROM usuarios;
```

**4. Backend formata e devolve**
```json
{
  "usuarios": [
    { "id": 1, "nome": "Maria", "email": "maria@email.com" },
    { "id": 2, "nome": "João", "email": "joao@email.com" }
  ]
}
```

### O que é HTTP?

**HTTP = HyperText Transfer Protocol**

É o protocolo (conjunto de regras) que define como navegadores e servidores se comunicam na web.

#### Anatomia de uma Requisição HTTP
```
GET /usuarios/123 HTTP/1.1
Host: api.exemplo.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Componentes:**
- **Método** (GET): O que queremos fazer
- **URL** (/usuarios/123): Qual recurso acessar
- **Headers**: Metadados da requisição
- **Body** (em POST/PUT): Dados a enviar

#### Anatomia de uma Resposta HTTP
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 152

{
  "id": 123,
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

**Componentes:**
- **Status Code** (200): Resultado da operação
- **Headers**: Metadados da resposta
- **Body**: Dados retornados

### Métodos HTTP: GET, POST, PUT, DELETE

#### GET - Buscar recursos

**Características:**
- Não modifica dados
- Pode ser cacheado
- Idempotente (mesma requisição = mesmo resultado)
```javascript
// Buscar todos os usuários
GET /usuarios

// Buscar um usuário específico
GET /usuarios/123
```

#### POST - Criar recursos

**Características:**
- Cria novos recursos
- Envia dados no body
- NÃO é idempotente (cada chamada cria um novo recurso)
```javascript
POST /usuarios
Content-Type: application/json

{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

#### PUT - Atualizar recursos

**Características:**
- Atualiza recurso existente completamente
- É idempotente (mesma requisição = mesmo resultado)
```javascript
PUT /usuarios/123
Content-Type: application/json

{
  "nome": "Maria Silva Santos",
  "email": "maria.nova@email.com"
}
```

#### PATCH - Atualizar parcialmente
```javascript
PATCH /usuarios/123
Content-Type: application/json

{
  "email": "maria.nova@email.com"
}
// Atualiza apenas o email, mantém outros campos
```

#### DELETE - Remover recursos
```javascript
DELETE /usuarios/123
// Remove o usuário com ID 123
```

### Status Codes: A Linguagem do HTTP

#### 2xx - Sucesso
- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado com sucesso
- **204 No Content**: Sucesso, mas sem conteúdo para retornar

#### 4xx - Erro do Cliente
- **400 Bad Request**: Dados inválidos
- **401 Unauthorized**: Não autenticado
- **403 Forbidden**: Autenticado mas sem permissão
- **404 Not Found**: Recurso não encontrado
- **422 Unprocessable Entity**: Dados válidos mas não processáveis

#### 5xx - Erro do Servidor
- **500 Internal Server Error**: Erro genérico do servidor
- **503 Service Unavailable**: Servidor temporariamente indisponível

### O que é uma API RESTful?

**REST = Representational State Transfer**

É um estilo arquitetural que define boas práticas para APIs web.

#### Princípios REST

**1. Recursos identificados por URLs**
```
GET /usuarios/123          ✓ Bom
GET /getUsuario?id=123     ✗ Não RESTful
```

**2. Usar métodos HTTP semanticamente**
```
POST /usuarios             ✓ Criar
GET /usuarios/123          ✓ Buscar
PUT /usuarios/123          ✓ Atualizar
DELETE /usuarios/123       ✓ Deletar

POST /deletarUsuario/123   ✗ Não RESTful
```

**3. Stateless (sem estado)**
Cada requisição deve conter todas as informações necessárias. O servidor não armazena contexto entre requisições.
```javascript
// ✓ Stateless
GET /usuarios/123
Headers: { Authorization: 'Bearer token' }

// ✗ Stateful (depende de sessão no servidor)JCContinuarGET /usuarios/123
(depende de sessão armazenada no servidor)

**4. Usar representações padronizadas (JSON)**
```json
{
  "id": 123,
  "nome": "Maria Silva",
  "links": {
    "self": "/usuarios/123",
    "pedidos": "/usuarios/123/pedidos"
  }
}
```

#### Exemplo Completo de API RESTful
```javascript
// CRUD de Produtos

// CREATE - Criar produto
POST /produtos
Body: {
  "nome": "Notebook",
  "preco": 3000,
  "categoria": "eletrônicos"
}
Response: 201 Created
{
  "id": 1,
  "nome": "Notebook",
  "preco": 3000,
  "categoria": "eletrônicos"
}

// READ - Listar todos
GET /produtos
Response: 200 OK
[
  { "id": 1, "nome": "Notebook", "preco": 3000 },
  { "id": 2, "nome": "Mouse", "preco": 50 }
]

// READ - Buscar um específico
GET /produtos/1
Response: 200 OK
{
  "id": 1,
  "nome": "Notebook",
  "preco": 3000,
  "categoria": "eletrônicos"
}

// UPDATE - Atualizar
PUT /produtos/1
Body: {
  "nome": "Notebook Pro",
  "preco": 3500,
  "categoria": "eletrônicos"
}
Response: 200 OK

// DELETE - Remover
DELETE /produtos/1
Response: 204 No Content
```

### Segurança em APIs

#### 1. Autenticação Básica (Basic Auth)

O método mais simples: enviar usuário e senha codificados em Base64.
```javascript
// Cliente
const credentials = btoa('usuario:senha'); // Codifica em Base64
fetch('/api/dados', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});

// Servidor
app.get('/api/dados', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) {
    return res.status(401).json({ erro: 'Não autorizado' });
  }
  
  const credentials = Buffer.from(
    auth.split(' ')[1], 
    'base64'
  ).toString();
  
  const [usuario, senha] = credentials.split(':');
  
  // Validar credenciais...
});
```

**⚠️ Problemas:**
- Base64 não é criptografia (é reversível)
- Credenciais enviadas em cada requisição
- Use apenas com HTTPS

#### 2. JWT (JSON Web Token)

Sistema moderno de autenticação baseado em tokens.

**Como funciona:**
┌──────────┐                        ┌──────────┐
│ Cliente  │  1. Login (user/senha) │ Servidor │
│          │ ─────────────────────> │          │
│          │                        │          │
│          │  2. Retorna JWT Token  │          │
│          │ <───────────────────── │          │
│          │                        │          │
│          │  3. Requisições com    │          │
│          │     token no header    │          │
│          │ ─────────────────────> │          │
└──────────┘                        └──────────┘

**Estrutura de um JWT:**
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibm9tZSI6Ik1hcmlhIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
│                                   │                              │
│        HEADER                     │         PAYLOAD              │        SIGNATURE

- **Header**: Tipo e algoritmo
- **Payload**: Dados (userId, nome, etc)
- **Signature**: Assinatura criptográfica

**Implementação:**
```javascript
// Servidor - Gerar token no login
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  // Validar credenciais
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || !await validarSenha(senha, usuario.senha)) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }
  
  // Gerar token
  const token = jwt.sign(
    { userId: usuario.id, nome: usuario.nome },
    'chave-secreta-super-segura',
    { expiresIn: '24h' }
  );
  
  res.json({ token });
});

// Middleware para verificar token
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, 'chave-secreta-super-segura');
    req.usuario = decoded;
    next();
  } catch (erro) {
    res.status(401).json({ erro: 'Token inválido' });
  }
}

// Usar middleware em rotas protegidas
app.get('/perfil', verificarToken, (req, res) => {
  res.json({
    userId: req.usuario.userId,
    nome: req.usuario.nome
  });
});
```

**Cliente:**
```javascript
// Armazenar token após login
const login = async (email, senha) => {
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  
  const { token } = await response.json();
  localStorage.setItem('token', token);
};

// Usar token em requisições
const buscarPerfil = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('/perfil', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
};
```

**Vantagens do JWT:**
- Stateless (servidor não precisa armazenar sessões)
- Pode conter informações do usuário
- Escalável

**Desvantagens:**
- Não pode ser invalidado antes do tempo de expiração
- Token grande (aumenta tamanho das requisições)

#### 3. CORS (Cross-Origin Resource Sharing)

CORS é uma segurança do navegador que bloqueia requisições entre domínios diferentes.

**Problema:**
```javascript
// Frontend em https://meusite.com
fetch('https://api.outrosite.com/dados')
// ❌ Bloqueado por CORS!
```

**Solução - Configurar no servidor:**
```javascript
const cors = require('cors');

// Permitir qualquer origem (desenvolvimento)
app.use(cors());

// Ou configurar específico (produção)
app.use(cors({
  origin: 'https://meusite.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**O que o navegador faz:**

Navegador envia "preflight request" (OPTIONS)
OPTIONS /dados
Origin: https://meusite.com
Servidor responde se permite
Access-Control-Allow-Origin: https://meusite.com
Access-Control-Allow-Methods: GET, POST
Se permitido, navegador faz a requisição real
GET /dados


### O que Avaliadores Esperam Ouvir

Quando perguntado sobre **Backend e APIs**, demonstre compreensão:

#### ✓ Boas Respostas

**"Explique como funciona uma API REST"**
> "Uma API REST usa recursos identificados por URLs e métodos HTTP semânticos. Por exemplo, GET /usuarios busca dados, POST /usuarios cria novos, e assim por diante. É stateless, então cada requisição contém todas as informações necessárias, geralmente incluindo um token de autenticação no header."

**"Como você garante segurança em uma API?"**
> "Primeiro, sempre uso HTTPS para criptografar dados em trânsito. Para autenticação, geralmente implemento JWT: o usuário faz login com credenciais, recebe um token assinado, e envia esse token em requisições subsequentes. No servidor, valido a assinatura do token antes de processar a requisição. Também configuro CORS adequadamente para controlar quais origens podem acessar a API."

**"O que acontece quando você faz um fetch no frontend?"**
> "O navegador envia uma requisição HTTP para o servidor especificado. O servidor processa - que pode incluir validar autenticação, buscar dados no banco, aplicar lógica de negócio - e retorna uma resposta com status code e dados. O navegador então recebe essa resposta e eu posso acessar os dados via .json() ou .text()."

#### ✗ Respostas Fracas

> "API REST é quando você usa rotas para pegar dados."
> "Segurança é usar senha forte."
> "Fetch busca coisas da internet."

---

## Banco de Perguntas de Entrevistas

#### P1: "Explique a diferença entre INNER JOIN e LEFT JOIN."
**Resposta modelo:** "INNER JOIN retorna apenas registros com correspondência em ambas tabelas. LEFT JOIN retorna todos da esquerda, preenchendo NULL na direita se não houver match. Exemplo: alunos e matrículas - INNER mostra só alunos matriculados; LEFT mostra todos alunos, com NULL se não matriculados."

#### P2: "Quando usar map vs forEach?"
**Resposta modelo:** "Use map quando precisar transformar cada elemento em um novo array. Use forEach para executar ações (como logging) sem retorno. Map retorna novo array; forEach retorna undefined."

#### P3: "Como funciona JWT?"
**Resposta modelo:** "JWT é um token assinado com header (algoritmo), payload (dados do usuário) e signature. Cliente envia no header Authorization. Servidor verifica assinatura sem armazenar estado."

#### P4: "Como otimizar uma query lenta?"
**Resposta modelo:** "Adicione índices em colunas filtradas, use EXPLAIN para analisar plano de execução, considere paginação para grandes resultados, e evite SELECT *."

#### P5: "Explique o fluxo de uma requisição HTTP."
**Resposta modelo:** "Cliente envia request (método, URL, headers, body). Servidor processa (valida auth, consulta DB, aplica lógica). Retorna response (status code, headers, body). Exemplo: GET /usuarios busca dados e retorna JSON."

---

## Encerramento e Materiais Recomendados

### Resumo dos Principais Aprendizados

Parabéns por chegar até aqui! Vamos recapitular os pilares que fortalecemos:

#### 1. SQL e Bancos Relacionais
- ✅ Entende o conceito de chaves primárias e estrangeiras
- ✅ Sabe fazer SELECTs básicos e JOINs
- ✅ Compreende o papel de ORMs (Prisma, Sequelize)
- ✅ Consegue explicar relacionamentos entre tabelas

#### 2. Estruturas de Dados em JavaScript
- ✅ Domina os 5 métodos essenciais: map, filter, find, reduce, forEach
- ✅ Sabe quando usar cada método
- ✅ Consegue encadear métodos para resolver problemas complexos
- ✅ Evita erros comuns (esquecer return, confundir find/filter)

#### 3. Backend e APIs
- ✅ Compreende o fluxo completo de uma requisição HTTP
- ✅ Conhece os métodos HTTP e seus usos corretos
- ✅ Entende os princípios REST
- ✅ Sabe explicar autenticação (Basic Auth, JWT)
- ✅ Compreende CORS e por que existe

### Checklist: Fundamentos para Revisar Antes de Entrevistas

Use esta lista para auto-avaliação:

#### SQL e Banco de Dados
- [ ] Consigo explicar o que é uma Foreign Key com exemplo prático
- [ ] Sei fazer um SELECT com JOIN
- [ ] Entendo a diferença entre INNER JOIN e LEFT JOIN
- [ ] Consigo explicar como um ORM transforma objetos em SQL

#### JavaScript - Arrays e Objetos
- [ ] Sei quando usar `map` vs `forEach`
- [ ] Consigo usar `filter` para buscar múltiplos elementos
- [ ] Sei usar `find` para buscar um elemento específico
- [ ] Entendo `reduce` e consigo usá-lo para agregar dados
- [ ] Sei encadear métodos (ex: filter + map + reduce)

#### Backend e APIs
- [ ] Consigo desenhar o fluxo de uma requisição HTTP
- [ ] Sei explicar a diferença entre GET, POST, PUT e DELETE
- [ ] Entendo o que torna uma API RESTful
- [ ] Consigo explicar como JWT funciona
- [ ] Sei explicar CORS de forma simples

#### Lógica e Resolução de Problemas
- [ ] Leio o enunciado com atenção antes de começar
- [ ] Quebro problemas complexos em partes menores
- [ ] Penso em voz alta durante entrevistas
- [ ] Começo com solução simples, otimizo depois

### Exercícios Práticos Recomendados

#### Projeto Pequeno 1: Sistema de Tarefas com Autenticação
**Passos hands-on:**
1. Crie schema SQL para usuários e tarefas.
2. Implemente API Express com rotas /login, /tarefas (CRUD).
3. Use Sequelize para queries e JWT para auth.
4. Frontend simples (HTML/JS) para login e listagem.
5. Teste com Postman: crie tarefa, liste, marque como concluída.

#### Projeto Pequeno 2: Dashboard de Vendas
**Passos:**
1. Schema: produtos, vendas (relacionamento 1:N).
2. API para CRUD de vendas com JOIN para produtos.
3. Use reduce() para calcular totais por produto.
4. Adicione filtros (por data) com query params.
5. Deploy local e teste com dados mock.

#### Nível 1: Fundamentos
1. **SQL**: Crie um schema com 3 tabelas relacionadas (ex: usuarios, posts, comentarios) e faça queries com JOINs
2. **Arrays**: Dado um array de objetos representando produtos, filtre por categoria e calcule o total usando reduce
3. **API**: Implemente um CRUD completo de tarefas usando Express.js

#### Nível 2: Intermediário
1. **SQL + ORM**: Converta 5 queries SQL para Prisma ou Sequelize
2. **Arrays**: Resolva problemas no [HackerRank - JavaScript](https://www.hackerrank.com/domains/tutorials/10-days-of-javascript) focando em arrays
3. **API**: Adicione autenticação JWT ao CRUD de tarefas

#### Nível 3: Integração
1. Crie uma aplicação fullstack simples:
   - Frontend React consumindo API
   - Backend Express com autenticação
   - Banco de dados PostgreSQL com Prisma
   - Operações CRUD completas

### Documentações Oficiais Essenciais

#### JavaScript
- [MDN Web Docs - Arrays](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN Web Docs - Object](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### SQL e ORMs
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Sequelize Docs](https://sequelize.org/docs/v6/)

#### Backend e APIs
- [MDN - HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP)
- [REST API Tutorial](https://restfulapi.net/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT.io](https://jwt.io/introduction)

#### Prática de Código
- [LeetCode](https://leetcode.com/) - Problemas de lógica e algoritmos
- [HackerRank](https://www.hackerrank.com/) - Challenges de JavaScript
- [Exercism](https://exercism.org/) - Mentoria gratuita em várias linguagens

### Recursos Adicionais

#### Livros Recomendados
- "Eloquent JavaScript" (Marijn Haverbeke) - Gratuito online
- "You Don't Know JS" (Kyle Simpson) - Série gratuita online

#### Cursos e Tutoriais
- [Codecademy - Learn SQL](https://www.codecademy.com/learn/learn-sql)
- [FreeCodeCamp - APIs and Microservices](https://www.freecodecamp.org/learn/apis-and-microservices/)

#### Canais YouTube (em português)
- Código Fonte TV
- Filipe Deschamps
- Rocketseat

### Próximos Passos

1. **Hoje**: Revise os conceitos que ainda não ficaram 100% claros
2. **Esta semana**: Faça pelo menos 3 exercícios de cada categoria (SQL, Arrays, APIs)
3. **Próximas 2 semanas**: Implemente um projeto integrando todos os conceitos
4. **Antes da entrevista**: Revise o checklist e faça mock interviews

### Mensagem Final

Lembre-se: **entrevistas técnicas avaliam fundamentos, não memorização**. Um desenvolvedor que entende conceitos consegue:
- Adaptar-se a qualquer framework
- Resolver problemas que nunca viu antes
- Explicar suas decisões técnicas com clareza
- Crescer continuamente na carreira

Você agora tem os fundamentos necessários. Pratique, revise e confie no seu conhecimento.

**Boa sorte nas suas entrevistas! 🚀**

---

## Projeto Integrado: API de E-commerce

**Objetivo:** Conectar SQL, JavaScript e APIs em um CRUD de produtos com autenticação usando Express + Prisma + manipulação JS.

**Schema Prisma:**
```prisma
model Produto {
  id        Int     @id @default(autoincrement())
  nome      String
  preco     Float
  usuarioId Int
  usuario   Usuario @relation(fields: [usuarioId], references: [id])
  
  @@map("produtos")
}

model Usuario {
  id       Int       @id @default(autoincrement())
  nome     String
  email    String    @unique
  senha    String
  produtos Produto[]
  
  @@map("usuarios")
}
```

**API com Express + Prisma + Manipulação JS:**
```javascript
app.get('/produtos', autenticar, async (req, res) => {
  const produtos = await prisma.produto.findMany({
    where: { usuarioId: req.usuarioId },
    orderBy: { preco: 'desc' } // SQL ORDER BY via Prisma
  });
  
  // Manipulação JS: calcular estatísticas usando reduce
  const estatisticas = produtos.reduce((acc, produto) => ({
    total: acc.total + 1,
    precoMedio: acc.precoMedio + produto.preco / produtos.length,
    maisCaro: Math.max(acc.maisCaro, produto.preco),
    categorias: {
      ...acc.categorias,
      [produto.categoria || 'geral']: (acc.categorias[produto.categoria || 'geral'] || 0) + 1
    }
  }), { 
    total: 0, 
    precoMedio: 0, 
    maisCaro: 0,
    categorias: {}
  });
  
  // Manipulação JS: filtrar produtos em promoção usando filter
  const produtosEmPromocao = produtos
    .filter(p => p.preco < 100) // produtos abaixo de R$ 100
    .map(p => ({ ...p, desconto: 0.1 })); // adicionar desconto
  
  res.json({ 
    produtos, 
    estatisticas,
    produtosEmPromocao 
  });
});

app.post('/produtos', autenticar, async (req, res) => {
  const { nome, preco, categoria } = req.body;
  
  // Validação JS usando array methods
  const validacoes = [
    { condicao: !nome?.trim(), mensagem: 'Nome é obrigatório' },
    { condicao: preco <= 0, mensagem: 'Preço deve ser maior que zero' },
    { condicao: !['eletrônicos', 'roupas', 'livros', 'geral'].includes(categoria), 
      mensagem: 'Categoria inválida' }
  ];
  
  const erro = validacoes.find(v => v.condicao);
  if (erro) {
    return res.status(400).json({ erro: erro.mensagem });
  }
  
  const produto = await prisma.produto.create({
    data: {
      nome: nome.trim(),
      preco: Number(preco),
      categoria,
      usuarioId: req.usuarioId
    }
  });
  
  res.status(201).json(produto);
});

app.get('/produtos/estatisticas', autenticar, async (req, res) => {
  const produtos = await prisma.produto.findMany({
    where: { usuarioId: req.usuarioId }
  });
  
  // Manipulação JS avançada: agrupar por categoria usando reduce
  const porCategoria = produtos.reduce((acc, produto) => {
    const cat = produto.categoria || 'geral';
    if (!acc[cat]) {
      acc[cat] = { total: 0, produtos: [] };
    }
    acc[cat].total += produto.preco;
    acc[cat].produtos.push(produto);
    return acc;
  }, {});
  
  // Encontrar produto mais vendido (simulado) usando sort
  const maisCaros = [...produtos]
    .sort((a, b) => b.preco - a.preco)
    .slice(0, 3);
  
  res.json({
    totalProdutos: produtos.length,
    valorTotalEstoque: produtos.reduce((sum, p) => sum + p.preco, 0),
    porCategoria,
    top3MaisCaros: maisCaros
  });
});
```

**Cliente integrando tudo (JavaScript moderno):**
```javascript
const adicionarProduto = async (nome, preco, categoria) => {
  const token = localStorage.getItem('token');
  const response = await fetch('/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nome, preco, categoria })
  });
  
  if (response.ok) {
    const produto = await response.json();
    // Manipulação JS: atualizar lista usando spread e filter
    setProdutos(prevProdutos => [...prevProdutos, produto]);
    
    // Calcular novas estatísticas usando reduce
    const novasEstatisticas = [...produtos, produto].reduce((acc, p) => ({
      total: acc.total + 1,
      precoMedio: acc.precoMedio + p.preco / [...produtos, produto].length,
      maisCaro: Math.max(acc.maisCaro, p.preco)
    }), { total: 0, precoMedio: 0, maisCaro: 0 });
    
    setEstatisticas(novasEstatisticas);
  }
};

const buscarEstatisticas = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('/produtos/estatisticas', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (response.ok) {
    const stats = await response.json();
    // Manipulação JS: formatar dados para exibição
    const formatadas = {
      ...stats,
      valorTotalEstoque: `R$ ${stats.valorTotalEstoque.toFixed(2)}`,
      porCategoria: Object.entries(stats.porCategoria).map(([cat, dados]) => ({
        categoria: cat,
        total: `R$ ${dados.total.toFixed(2)}`,
        quantidade: dados.produtos.length
      }))
    };
    
    setEstatisticasDetalhadas(formatadas);
  }
};
```

---

## Apêndice: Exemplos de Código Completos

### Exemplo 1: API REST Completa com Express e JWT

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const SECRET = 'sua-chave-secreta';

// Mock database
const usuarios = [];
const tarefas = [];

// Middleware de autenticação
function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (erro) {
    res.status(401).json({ erro: 'Token inválido' });
  }
}

// Rotas de autenticação
app.post('/registro', async (req, res) => {
  const { nome, email, senha } = req.body;
  
  const senhaHash = await bcrypt.hash(senha, 10);
  
  const usuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha: senhaHash
  };
  
  usuarios.push(usuario);
  
  res.status(201).json({ id: usuario.id, nome, email });
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  const usuario = usuarios.find(u => u.email === email);
  
  if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }
  
  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome },
    SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token });
});

// CRUD de tarefas (protegido)
app.get('/tarefas', autenticar, (req, res) => {
  const minhasTarefas = tarefas.filter(t => t.usuarioId === req.usuarioId);
  res.json(minhasTarefas);
});

app.post('/tarefas', autenticar, (req, res) => {
  const { titulo, descricao } = req.body;
  
  const tarefa = {
    id: tarefas.length + 1,
    usuarioId: req.usuarioId,
    titulo,
    descricao,
    concluida: false
  };
  
  tarefas.push(tarefa);
  
  res.status(201).json(tarefa);
});

app.put('/tarefas/:id', autenticar, (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, concluida } = req.body;
  
  const tarefa = tarefas.find(t => t.id === parseInt(id) && t.usuarioId === req.usuarioId);
  
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
  
  tarefa.titulo = titulo ?? tarefa.titulo;
  tarefa.descricao = descricao ?? tarefa.descricao;
  tarefa.concluida = concluida ?? tarefa.concluida;
  
  res.json(tarefa);
});

app.delete('/tarefas/:id', autenticar, (req, res) => {
  const { id } = req.params;
  
  const index = tarefas.findIndex(t => t.id === parseInt(id) && t.usuarioId === req.usuarioId);
  
  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
  
  tarefas.splice(index, 1);
  
  res.status(204).send();
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
```

### Exemplo 2: Schema Prisma Completo

```javascript
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        Int       @id @default(autoincrement())
  nome      String
  email     String    @unique
  senha     String
  criadoEm  DateTime  @default(now())
  tarefas   Tarefa[]
  
  @@map("usuarios")
}

model Tarefa {
  id          Int      @id @default(autoincrement())
  titulo      String
  descricao   String?
  concluida   Boolean  @default(false)
  criadaEm    DateTime @default(now())
  atualizadaEm DateTime @updatedAt
  
  usuario     Usuario  @relation(fields: [usuarioId], references: [id])
  usuarioId   Int
  
  @@map("tarefas")
}
```

---
