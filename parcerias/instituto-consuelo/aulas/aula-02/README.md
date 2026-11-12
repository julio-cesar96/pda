# Modelagem Ninja: Esquemas que Contam Histórias

## 🎯 Objetivos da Aula
- Entender as formas normais (1FN, 2FN, 3FN)
- Compreender normalização e desnormalização
- Analisar esquemas reais de bancos de dados
- Aplicar consultas SQL em cenários práticos

---

## 📌 Parte 0 – Ponte com Aula Anterior (10 min)

### Recap Rápido
✅ **Já vimos:** CREATE, INSERT, SELECT básico, WHERE, tipos de dados  
🎯 **Hoje vamos:** Modelar melhor e consultar de forma avançada  
💡 **Pergunta provocativa:** "Por que esta tabela está errada?"

```sql
-- Tabela PROBLEMÁTICA para análise
CREATE TABLE PedidosRuins (
    pedido_id INT,
    cliente_nome VARCHAR(100),
    produtos_comprados VARCHAR(500), -- 🚨 PROBLEMA: múltiplos valores!
    telefones VARCHAR(200),          -- 🚨 PROBLEMA: múltiplos telefones!
    vendedor_nome VARCHAR(100),      -- 🚨 PROBLEMA: depende do produto
    comissao DECIMAL(5,2)           -- 🚨 PROBLEMA: depende do vendedor
);
```

**Atividade inicial:** Em duplas, identifiquem os problemas desta tabela (5 min)

---

## 📌 Parte 1 – Fundamentos da Modelagem (30 min)

### Primeira Forma Normal (1FN)
- **Definição:** Não pode haver grupos repetidos nem atributos multivalorados.  
- Cada célula deve conter apenas um valor **atômico**.  
- **Analogia:** "Imagine uma gaveta de roupas - cada compartimento (célula) deve ter apenas um tipo de item, não uma mistura"
- **Identificação:** Se uma coluna armazena listas ou valores separados por vírgula, está fora da 1FN.  

**Exemplo incorreto:**
```sql
-- ❌ Viola 1FN
CREATE TABLE ClientesRuim (
    ClienteID INT,
    Nome VARCHAR(100),
    Telefones VARCHAR(200) -- "11999999999;11888888888;11777777777"
);
```

**Exemplo correto:**
```sql
-- ✅ Atende 1FN
CREATE TABLE Clientes (
    ClienteID INT PRIMARY KEY,
    Nome VARCHAR(100)
);

CREATE TABLE TelefonesClientes (
    TelefoneID INT PRIMARY KEY,
    ClienteID INT,
    Telefone VARCHAR(20),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
);
```

### Segunda Forma Normal (2FN)
- **Definição:** Estar na 1FN e todos os atributos não-chave dependerem da chave primária inteira.  
- **Analogia:** "Em uma dupla de dança, cada pessoa tem características próprias - não depende apenas do seu parceiro"
- **Identificação:** Problemas ocorrem quando há chave composta e atributos dependem apenas de parte da chave.  

**Exemplo problema:**
```sql
-- ❌ Viola 2FN - NomeAluno depende só de AlunoID, não da chave completa
CREATE TABLE MatriculasRuim (
    AlunoID INT,
    CursoID INT,
    NomeAluno VARCHAR(100),    -- Depende só de AlunoID
    NotaFinal DECIMAL(4,2),    -- Depende da chave completa (AlunoID + CursoID)
    PRIMARY KEY (AlunoID, CursoID)
);
```

**Exemplo correto:**
```sql
-- ✅ Atende 2FN
CREATE TABLE Alunos (
    AlunoID INT PRIMARY KEY,
    Nome VARCHAR(100)
);

CREATE TABLE Matriculas (
    AlunoID INT,
    CursoID INT,
    NotaFinal DECIMAL(4,2),
    PRIMARY KEY (AlunoID, CursoID),
    FOREIGN KEY (AlunoID) REFERENCES Alunos(AlunoID)
);
```

### Terceira Forma Normal (3FN)
- **Definição:** Estar na 2FN e não haver dependências transitivas.  
- **Analogia:** "Evite o 'telefone sem fio' - informações não devem depender de outras informações intermediárias"
- **Identificação:** Se um atributo depende de outro atributo não-chave, está fora da 3FN.  

**Exemplo problema:**
```sql
-- ❌ Viola 3FN - DepartamentoNome depende de DepartamentoID, não do funcionário
CREATE TABLE FuncionariosRuim (
    FuncionarioID INT PRIMARY KEY,
    Nome VARCHAR(100),
    DepartamentoID INT,
    DepartamentoNome VARCHAR(100) -- Dependência transitiva!
);

-- 🔄 DepartamentoNome depende de DepartamentoID,
-- Não do FuncionarioID diretamente
```

**Exemplo correto:**
```sql
-- ✅ Atende 3FN
CREATE TABLE Departamentos (
    DepartamentoID INT PRIMARY KEY,
    Nome VARCHAR(100)
);

CREATE TABLE Funcionarios (
    FuncionarioID INT PRIMARY KEY,
    Nome VARCHAR(100),
    DepartamentoID INT,
    FOREIGN KEY (DepartamentoID) REFERENCES Departamentos(DepartamentoID)
);
```

### 🔍 Atividade: "Detetive de Problemas" (10 min)

**Em grupos de 3-4 pessoas, analisem esta tabela e identifiquem TODOS os problemas:**

```sql
CREATE TABLE PedidosProblematicos (
    PedidoID INT,
    ClienteNome VARCHAR(100),
    ClienteEmail VARCHAR(100),
    ClienteCidade VARCHAR(50),
    ClienteEstado VARCHAR(2),
    ClienteCEP VARCHAR(10),
    ProdutoNome VARCHAR(100),
    ProdutoCategoria VARCHAR(50),
    ProdutoPreco DECIMAL(10,2),
    Quantidade INT,
    DataPedido DATE,
    TelefonesContato VARCHAR(200), 
    NomeVendedor VARCHAR(100),     
    ComissaoVendedor DECIMAL(5,2), 
    EnderecoCompleto VARCHAR(300)
);
```

**Problemas a serem identificados:**
1. **1FN:** TelefonesContato e EnderecoCompleto têm múltiplos valores
2. **2FN:** Se a chave for composta, vários campos dependem só de parte dela
3. **3FN:** NomeVendedor → ComissaoVendedor (dependência transitiva)
4. **Redundância:** Dados do cliente repetidos em cada pedido

---

## 📌 Parte 2 – Normalização e Desnormalização (20 min)

### Normalização
- Processo de estruturar tabelas para reduzir redundância e inconsistências.  
- **Benefícios:** Integridade dos dados, consistência, clareza no modelo.  
- **Desvantagens:** Pode gerar consultas mais complexas e lentas.  

### Desnormalização
- Introduz redundância proposital para melhorar **performance**.  
- Usada em cenários de relatórios, análises rápidas, data warehouses.  

### 💡 Quando Quebrar as Regras (Desnormalização)

**Exemplo prático:**
```sql
-- Tabela normalizada (ideal para transações)
CREATE TABLE Pedidos (
    PedidoID INT PRIMARY KEY,
    ClienteID INT,
    DataPedido DATE
);

-- Tabela desnormalizada (ideal para relatórios)
CREATE TABLE RelatorioVendasMensal (
    Mes VARCHAR(7),           -- '2025-09'
    ClienteNome VARCHAR(100), -- 🚨 Redundante, mas rápido para relatórios
    TotalComprado DECIMAL(10,2),
    QtdePedidos INT,
    TicketMedio DECIMAL(10,2)
);
```

**🤔 Discussão em grupo:** "Quando vale a pena ter dados duplicados?"
- Relatórios frequentes
- Consultas muito complexas
- Sistemas de análise (BI/Data Warehouse)
- Cache de informações calculadas

---

## 📌 Parte 3 – Análise de Esquemas Reais (30 min)

### Esquema E-commerce Atual
```sql
-- Nosso esquema já normalizado
CREATE TABLE Clientes (
    ClienteID SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Telefone VARCHAR(20)
);

CREATE TABLE Produtos (
    ProdutoID SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Preco DECIMAL(10,2) NOT NULL,
    Categoria VARCHAR(50)
);

CREATE TABLE Pedidos (
    PedidoID SERIAL PRIMARY KEY,
    ClienteID INT NOT NULL,
    DataPedido DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
);

CREATE TABLE ItensPedido (
    ItemID SERIAL PRIMARY KEY,
    PedidoID INT NOT NULL,
    ProdutoID INT NOT NULL,
    Quantidade INT NOT NULL CHECK (Quantidade > 0),
    FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID),
    FOREIGN KEY (ProdutoID) REFERENCES Produtos(ProdutoID)
);
```

### 🎯 Atividade: Análise de Melhorias
**Em grupos, identifiquem possíveis melhorias:**

1. **Falta alguma informação importante?**
2. **Há campos que poderiam ser normalizados?**
3. **Que informações poderiam ser desnormalizadas para relatórios?**

**Sugestões esperadas:**
- Endereços dos clientes (tabela separada)
- Histórico de preços dos produtos
- Status dos pedidos
- Tabela de categorias separada

---

## 📌 Parte 4 – Consultas em Cenários Práticos (40 min)

### Progressão de Consultas SQL

#### **Nível 0: Revisão com Dataset Novo**
```sql
-- Consultas simples para aquecer
SELECT Nome, Email FROM Clientes WHERE Nome LIKE 'A%';
SELECT Nome, Preco FROM Produtos WHERE Preco > 1000 ORDER BY Preco DESC;
```

#### **Nível 1: JOINs Simples**
```sql
-- Quais clientes fizeram pedidos?
SELECT DISTINCT c.Nome, c.Email
FROM Clientes c
JOIN Pedidos p ON c.ClienteID = p.ClienteID;

-- Pedidos com nome do cliente
SELECT c.Nome, p.PedidoID, p.DataPedido
FROM Clientes c
JOIN Pedidos p ON c.ClienteID = p.ClienteID
ORDER BY p.DataPedido DESC;
```

#### **Nível 2: JOINs com Filtros**
```sql
-- Pedidos de setembro de 2025
SELECT c.Nome, p.PedidoID, p.DataPedido
FROM Clientes c
JOIN Pedidos p ON c.ClienteID = p.ClienteID
WHERE p.DataPedido >= '2025-09-01' 
  AND p.DataPedido < '2025-10-01';

-- Produtos da categoria 'Acessórios' vendidos
SELECT DISTINCT pr.Nome, pr.Preco
FROM Produtos pr
JOIN ItensPedido i ON pr.ProdutoID = i.ProdutoID
WHERE pr.Categoria = 'Acessórios';
```

#### **Nível 3: JOINs com Agregações**
```sql
-- Valor total de cada pedido
SELECT 
    p.PedidoID, 
    c.Nome as Cliente,
    SUM(i.Quantidade * pr.Preco) AS Total
FROM Pedidos p
JOIN Clientes c ON p.ClienteID = c.ClienteID
JOIN ItensPedido i ON p.PedidoID = i.PedidoID
JOIN Produtos pr ON i.ProdutoID = pr.ProdutoID
GROUP BY p.PedidoID, c.Nome
ORDER BY Total DESC;

-- Total gasto por cada cliente
SELECT 
    c.Nome,
    COUNT(DISTINCT p.PedidoID) as TotalPedidos,
    SUM(i.Quantidade * pr.Preco) AS TotalGasto,
    AVG(i.Quantidade * pr.Preco) AS TicketMedio
FROM Clientes c
JOIN Pedidos p ON c.ClienteID = p.ClienteID
JOIN ItensPedido i ON p.PedidoID = i.PedidoID
JOIN Produtos pr ON i.ProdutoID = pr.ProdutoID
GROUP BY c.ClienteID, c.Nome
ORDER BY TotalGasto DESC;
```

### 🎪 Desafio do Detetive SQL (10 min)

**Encontrem a diferença entre essas consultas:**

```sql
-- Consulta A
SELECT c.Nome, COUNT(pr.ProdutoID) as TotalItens
FROM Clientes c
JOIN Pedidos p ON c.ClienteID = p.ClienteID
JOIN ItensPedido i ON p.PedidoID = i.PedidoID
JOIN Produtos pr ON i.ProdutoID = pr.ProdutoID
GROUP BY c.ClienteID, c.Nome;

-- Consulta B
SELECT c.Nome, COUNT(DISTINCT pr.ProdutoID) as ProdutosDiferentes
FROM Clientes c
JOIN Pedidos p ON c.ClienteID = p.ClienteID
JOIN ItensPedido i ON p.PedidoID = i.PedidoID
JOIN Produtos pr ON i.ProdutoID = pr.ProdutoID
GROUP BY c.ClienteID, c.Nome;
```

**💡 Resposta:** A primeira conta itens totais, a segunda conta produtos únicos!

### 🔥 Atividade Prática em Duplas (20 min)
Resolvam os exercícios da lista, mas agora com **dicas de raciocínio**:

---

## 📌 Parte 5 – Momento "Aha!" Final (10 min)

### O Poder da Normalização + SQL

```sql
-- Criamos uma VIEW que junta tudo de forma "desnormalizada" para relatórios
CREATE VIEW PedidosCompletos AS
SELECT 
    c.Nome as Cliente,
    c.Email,
    p.PedidoID,
    p.DataPedido,
    pr.Nome as Produto,
    pr.Categoria,
    i.Quantidade,
    pr.Preco,
    (i.Quantidade * pr.Preco) as Subtotal
FROM Clientes c
JOIN Pedidos p ON c.ClienteID = p.ClienteID
JOIN ItensPedido i ON p.PedidoID = i.PedidoID
JOIN Produtos pr ON i.ProdutoID = pr.ProdutoID;

-- Agora consultas complexas ficam simples!
SELECT Cliente, SUM(Subtotal) as Total
FROM PedidosCompletos
WHERE DataPedido >= '2025-09-01'
GROUP BY Cliente
ORDER BY Total DESC;
```

**💡 Insight:** Normalizamos para manter integridade, mas podemos criar views desnormalizadas para facilitar consultas!

---

## 📌 FAQ - Respostas para Perguntas Esperadas

### "As views impactam na performance no banco?"
- 💡 VIEWS são "consultas salvas", não tabelas físicas!

🔍 Como funciona:
-- Quando você faz:
```sql
SELECT * FROM PedidosCompletos WHERE Cliente = 'Ana';

-- O banco REALMENTE executa:
SELECT c.Nome as Cliente, p.PedidoID...
FROM Clientes c 
JOIN Pedidos p ON c.ClienteID = p.ClienteID
JOIN ItensPedido i ON p.PedidoID = i.PedidoID
JOIN Produtos pr ON i.ProdutoID = pr.ProdutoID
WHERE c.Nome = 'Ana';
```

- ⚡ Performance: IGUAL à consulta manual
📦 Vantagem: Reutilização + legibilidade
🚫 NÃO são cache ou tabela física

### "É mais rápido buscar numa view ou numa tabela desnormalizada?"
```sql
🏁 CORRIDA DE PERFORMANCE:

🐌 VIEW (consulta com JOINs):
SELECT * FROM PedidosCompletos WHERE Cliente = 'Ana';
-- Precisa juntar 4 tabelas toda vez

🚀 TABELA DESNORMALIZADA:
SELECT * FROM PedidosFlat WHERE Cliente = 'Ana';  
-- Dados já estão juntos, sem JOINs

-- 🏆 VENCEDOR: Tabela desnormalizada (muito mais rápida!)
```

Porém, existem **trade-offs:**

- VIEW:

1. ✅ Dados sempre atualizados
2. ✅ Sem duplicação de espaço
3. ✅ Consistência garantida
4. ❌ Mais lenta (JOINs toda vez)

- TABELA DESNORMALIZADA:

1. ✅ Consultas super rápidas
2. ✅ Menos carga no banco
3. ❌ Dados podem ficar defasados
4. ❌ Ocupa mais espaço
5. ❌ Atualização complexa

**Dica de ouro**: Use views para desenvolvimento e tabelas desnormalizadas para relatórios críticos de performance

### "O termo ON serve para que?"
```sql
🔗 ON = "CONDIÇÃO DE LIGAÇÃO"

Sem ON (❌ erro):
SELECT * FROM Clientes JOIN Pedidos;
-- Como o banco vai saber qual cliente pertence a qual pedido?

Com ON (✅ correto):  
SELECT * FROM Clientes c JOIN Pedidos p ON c.ClienteID = p.ClienteID;
-- Agora o banco sabe: "junte onde IDs são iguais"
```

**Analogia visual:**

```sql
🧩 QUEBRA-CABEÇA:

Tabela Clientes:     Tabela Pedidos:
ClienteID | Nome     PedidoID | ClienteID
1         | Ana      101      | 1
2         | Bruno    102      | 1  
3         | Carla    103      | 2

🔗 ON c.ClienteID = p.ClienteID diz:
"Encaixe peças onde os números são iguais"

Resultado:
Ana   | 101
Ana   | 102  
Bruno | 103
```

**Dica importante:**

```sql
⚠️ SEM ON = PRODUTO CARTESIANO:
-- 3 clientes × 3 pedidos = 9 linhas (incorreto!)
-- Com ON correto = 3 linhas (correto!)

💡 ON sempre compara chaves:
-- Chave primária = Chave estrangeira
-- ClienteID = ClienteID
-- ProdutoID = ProdutoID
```

**Exemplo prático para fixar:**

```sql
-- ❓ Por que este ON faz sentido?
SELECT c.Nome, p.DataPedido
FROM Clientes c 
JOIN Pedidos p ON c.ClienteID = p.ClienteID;

-- 💡 Porque ClienteID é a "cola" entre as tabelas:
-- Clientes.ClienteID (PK) ↔ Pedidos.ClienteID (FK)
```

## 📚 Resumo dos Aprendizados
- **1FN, 2FN, 3FN:** Como identificar e corrigir problemas de modelagem
- **Normalização:** Para integridade e consistência dos dados
- **Desnormalização:** Para performance em cenários específicos
- **SQL Avançado:** JOINs, agregações e views para consultas complexas
- **Views:** Ponte entre normalização e praticidade


## 📚 Materiais Complementares

- **Livro:** Database System Concepts – Abraham Silberschatz  
- **Livro:** SQL Antipatterns – Bill Karwin  
- **Artigo:** [Essential SQL - Normalization](https://www.essentialsql.com/what-is-database-normalization/)
- **Artigo** [Normalização em Banco de Dados](https://www.alura.com.br/artigos/normalizacao-banco-de-dados-estrutura?utm_term=&utm_campaign=topo-aon-search-gg-dsa-artigos_conteudos&utm_source=google&utm_medium=cpc&campaign_id=11384329873_164240702375_703853654617&utm_id=11384329873_164240702375_703853654617&hsa_acc=7964138385&hsa_cam=topo-aon-search-gg-dsa-artigos_conteudos&hsa_grp=164240702375&hsa_ad=703853654617&hsa_src=g&hsa_tgt=aud-574826424850:dsa-2276348409543&hsa_kw=&hsa_mt=&hsa_net=google&hsa_ver=3&gad_source=1&gad_campaignid=11384329873&gbraid=0AAAAADpqZIAs3XZGf0X2UMJVd8n912nwt&gclid=Cj0KCQjwxL7GBhDXARIsAGOcmIMABrm3JJW26bpU0SzXID3lGfCqqu9kvKU0r67vRSG9PoPBWsJV8o4aAsa0EALw_wcB)  
- **Ferramenta:** [DB Diagram](https://dbdiagram.io/) para criar diagramas ER
- **Prática online:** [SQLBolt](https://sqlbolt.com/) para exercícios interativos
- **Documentação:** [PostgreSQL Docs](https://www.postgresql.org/docs/)

### 📋 Cheat Sheet - Comandos que Você Vai Usar 80% do Tempo

```sql
-- Consulta básica
SELECT coluna1, coluna2 FROM tabela WHERE condição;

-- JOIN simples
SELECT * FROM tabela1 t1 JOIN tabela2 t2 ON t1.id = t2.id;

-- Agregações
SELECT coluna, COUNT(*), SUM(valor) FROM tabela GROUP BY coluna;

-- Filtrar grupos
SELECT coluna, COUNT(*) FROM tabela GROUP BY coluna HAVING COUNT(*) > 1;
```

---

## 🏫 Atividades Síncronas (em sala)

1. **Recap + Identificar problemas** em tabela mal-modelada (10 min)
2. **Detetive de Problemas** - análise em grupos (10 min)
3. **Discussão sobre desnormalização** (10 min)
4. **Análise do esquema e-commerce** com sugestões de melhorias (15 min)
5. **Consultas SQL práticas** em duplas (20 min)
6. **Desafio do Detetive SQL** (10 min)
7. **Momento "Aha!" com views** (5 min)

