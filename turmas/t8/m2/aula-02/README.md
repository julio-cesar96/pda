# 🔎 SQL na prática, bancos não relacionais e busca semântica

**Módulo 2 · Aula 2: fazendo perguntas aos dados**

Neste material você vai encontrar tudo o que vimos em aula, o exercício em dupla (queries SQL e um comparativo entre tipos de banco) e uma lista com 4 exercícios para praticar em casa.

> **Regra de ouro (a mesma de sempre):** escreva uma consulta, rode, olhe o resultado. Rodou, viu, entendeu. Se der erro, leia a mensagem com calma: ela é uma pista, não uma bronca.

---

## 📑 Sumário

1. [Como usar este material](#-como-usar-este-material)
2. [Vocabulário da aula](#-vocabulário-da-aula)
3. [O cenário: as perguntas do time](#o-cenário-as-perguntas-do-time)
4. [1. Criar e consultar](#1-criar-e-consultar)
5. [2. JOIN: ligando as tabelas](#2-join-ligando-as-tabelas)
6. [3. Agregações: resumindo os dados](#3-agregações-resumindo-os-dados)
7. [4. Bancos não relacionais: documentos](#4-bancos-não-relacionais-documentos)
8. [5. Quando usar cada um e a busca semântica](#5-quando-usar-cada-um-e-a-busca-semântica)
9. [Resumo](#-resumo)
10. [Exercício da aula](#-exercício-da-aula-queries-e-comparativo)
11. [Lista de exercícios para casa](#-lista-de-exercícios-para-casa)
12. [Erros comuns e o que eles significam](#-erros-comuns-e-o-que-eles-significam)

---

## 💻 Como usar este material

### Onde rodar o SQL (grátis, no navegador, sem instalar nada)

| Opção | O que é | Quando usar |
|---|---|---|
| **[PGlite](https://pglite.dev)** | **PostgreSQL de verdade**, rodando no seu navegador, sem criar conta | **Principal.** Use esta primeiro |
| **[Sqlime](https://sqlime.org)** | **SQLite** no navegador. Execute com `Ctrl/Cmd + Enter` | Se o PGlite não carregar |

**Passo a passo:**

1. Abra o playground no navegador.
2. Copie **todo** o conteúdo do arquivo [`livecoding/setup.sql`](livecoding/setup.sql), cole e execute. Ele cria as tabelas do MercadoÁgil e coloca os dados.
3. Confira que deu certo: rode `SELECT COUNT(*) FROM produto;`. O resultado tem que ser **6**.
4. Rode uma consulta de cada vez. Todas as consultas da aula estão em [`livecoding/aula.sql`](livecoding/aula.sql).

> **Atenção:** os dados ficam **só no seu navegador**. Se você recarregar a página, eles somem. Basta colar o `setup.sql` de novo.
>
> **Diferenças que você pode notar:** o PostgreSQL mostra `12.00` onde o SQLite mostra `12`, e as mensagens de erro mudam de palavras. O resultado (os valores) é o mesmo.

### Para os arquivos de JavaScript

```bash
node livecoding/documentos.js
node livecoding/busca-semantica.js
```

Os resultados mostrados neste material foram conferidos no **PostgreSQL 18** e no **SQLite**, e deram igual nos dois.

---

## 📖 Vocabulário da aula

| Palavra | Significado simples |
|---|---|
| SQL | A **linguagem** para fazer perguntas a um banco relacional |
| Consulta (query) | Uma **pergunta** escrita em SQL |
| `JOIN` | **Ligar** duas tabelas seguindo a chave estrangeira |
| `LEFT JOIN` | Ligar **mantendo todas** as linhas da tabela da esquerda, mesmo sem par |
| `NULL` | "**Não existe valor**" |
| Função de agregação | Uma função que **dobra muitas linhas em um número** (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) |
| `GROUP BY` | Separar as linhas em **cestas** e fazer a conta de cada uma |
| `HAVING` | Filtrar as cestas **depois** de agrupar |
| Banco relacional | Dados em **tabelas** ligadas por id (PostgreSQL, SQLite) |
| Banco de documentos | Dados em **fichas JSON**, com tudo dentro (MongoDB) |
| Embutir x referenciar | **Copiar** o dado dentro do documento x guardar só o **id** dele |
| Embedding | Uma **lista de números** que representa o **significado** de um texto |
| Busca semântica | Achar o que **significa parecido**, e não o que está escrito igual |

---

## O cenário: as perguntas do time

Na Aula 1 você desenhou e normalizou o modelo do MercadoÁgil. Hoje o modelo vira **banco de verdade** e o time de negócio chega com perguntas:

- **Quanto cada vendedor faturou?**
- **Quais clientes nunca compraram?**
- **Qual produto não vende?**

Na planilha, cada uma vira uma tarde de conta. Num banco, vira **uma consulta**.

> **🎨 Em uma frase:** um banco existe para **responder perguntas** sobre os dados.

---

## 1. Criar e consultar

**Por que usar?** O banco relacional guarda os dados em **tabelas**, e o **SQL** é a linguagem para **perguntar** a elas. É como um arquivo de gavetas bem organizado: você faz o pedido ao arquivista ("traga os produtos acima de R$ 100, do mais caro ao mais barato").

### Do DER às tabelas

Lembra do DER da Aula 1? **Cada caixa vira uma tabela**: o `🔑 id (PK)` vira `PRIMARY KEY` e o `(FK → X)` vira `REFERENCES x (id)`. Um exemplo, o `PEDIDO`:

```sql
CREATE TABLE pedido (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES cliente (id),
  status TEXT NOT NULL,
  criado_em DATE NOT NULL
);
```

O `setup.sql` cria as 7 tabelas (sem o estoque e o cupom, para ficar curto) e os dados: 6 produtos, 5 clientes e 7 pedidos.

### As primeiras consultas

Todas as colunas, todas as linhas:

```sql
SELECT * FROM produto;
```

```
 id |        nome         | preco | vendedor_id | categoria_id
----+---------------------+-------+-------------+--------------
  1 | Mouse               |   120 |           1 |            1
  2 | Teclado             |   350 |           1 |            1
  3 | Livro de JavaScript |    80 |           2 |            2
  4 | Livro de SQL        |    90 |           2 |            2
  5 | Luminária           |    60 |           3 |            3
  6 | Caneca              |    25 |           3 |            3
(6 linhas)
```

Filtrar (`WHERE`) e ordenar (`ORDER BY`):

```sql
SELECT nome, preco
FROM produto
WHERE preco > 100
ORDER BY preco DESC;
```

```
  nome   | preco
---------+-------
 Teclado |   350
 Mouse   |   120
(2 linhas)
```

Filtrar por padrão de texto (`LIKE`: o `%` quer dizer "qualquer coisa"):

```sql
SELECT nome
FROM produto
WHERE nome LIKE 'Livro%';
```

```
        nome
---------------------
 Livro de JavaScript
 Livro de SQL
(2 linhas)
```

Os 3 mais caros (`LIMIT`):

```sql
SELECT nome, preco
FROM produto
ORDER BY preco DESC
LIMIT 3;
```

```
     nome     | preco
--------------+-------
 Teclado      |   350
 Mouse        |   120
 Livro de SQL |    90
(3 linhas)
```

### A "receita" de um SELECT

| Peça | Para que serve |
|---|---|
| `SELECT` | **Quais colunas** eu quero ver |
| `FROM` | **De qual tabela** |
| `WHERE` | **Quais linhas** (filtro) |
| `ORDER BY` | Em **que ordem** (`DESC` = do maior para o menor) |
| `LIMIT` | **Quantas linhas**, no máximo |

> **🎨 Em uma frase:** `SELECT` escolhe as colunas, `WHERE` escolhe as linhas.

**💬 E daí?** Uma pergunta de negócio ("quais são os mais caros?") virou uma linha de SQL. Quem sabe perguntar ao banco responde ao time em segundos.

**✅ Checkpoint:** o que eu mudo na primeira consulta com filtro (a segunda) para ver os produtos que custam **menos** de R$ 100, do mais **barato** ao mais caro?

<details>
<summary>💡 Ver resposta</summary>

Troque `>` por `<` e tire o `DESC` (o padrão do `ORDER BY` é do menor para o maior): `WHERE preco < 100 ORDER BY preco`.

</details>

---

## 2. JOIN: ligando as tabelas

**Por que usar?** Na Aula 1, o pedido guarda só o `cliente_id`. Para ver o **nome** do cliente, o banco precisa **seguir a seta** da FK até a PK. Isso é o `JOIN`. É o mesmo `find` que você fazia no `relacionamentos.js`, só que o banco faz sozinho.

```
 PEDIDO                                  CLIENTE
 ┌────┬────────────┐                     ┌────┬────────────┐
 │ id │ cliente_id │                     │ id │ nome       │
 ├────┼────────────┤                     ├────┼────────────┤
 │ 1  │ 1 ─────────┼─────────────────────▶ 1  │ Ana Souza  │
 │ 3  │ 1 ─────────┼──────────────┐      │    │            │
 │ 2  │ 2 ─────────┼─────────┐    └──────▶ 1  │ (a mesma)  │
 └────┴────────────┘         └──────────▶ 2  │ Bruno Lima │
                                         │ 5  │ Eva Rocha  │  nenhuma seta chega aqui
                                         └────┴────────────┘
```

> **🎨 Em uma frase:** o `JOIN` segue a seta da chave estrangeira.

### Pedidos com o nome do cliente (1:N)

```sql
SELECT pedido.id, cliente.nome, pedido.status
FROM pedido
JOIN cliente ON cliente.id = pedido.cliente_id
ORDER BY pedido.id;
```

```
 id |    nome    |  status
----+------------+-----------
  1 | Ana Souza  | entregue
  2 | Bruno Lima | entregue
  3 | Ana Souza  | entregue
  4 | Carla Dias | cancelado
  5 | Davi Nunes | entregue
  6 | Bruno Lima | pendente
  7 | Ana Souza  | entregue
(7 linhas)
```

### Três tabelas de uma vez

```sql
SELECT produto.nome, categoria.nome AS categoria, vendedor.nome_loja
FROM produto
JOIN categoria ON categoria.id = produto.categoria_id
JOIN vendedor ON vendedor.id = produto.vendedor_id
ORDER BY produto.id;
```

```
        nome         |  categoria  |  nome_loja
---------------------+-------------+--------------
 Mouse               | eletronicos | TechBahia
 Teclado             | eletronicos | TechBahia
 Livro de JavaScript | livros      | Livraria Sol
 Livro de SQL        | livros      | Livraria Sol
 Luminária           | casa        | CasaViva
 Caneca              | casa        | CasaViva
(6 linhas)
```

### Atravessando o N:N

O `ITEM_PEDIDO` da Aula 1: o pedido e o produto só se encontram nele.

```sql
SELECT pedido.id AS pedido, produto.nome, item_pedido.quantidade, item_pedido.preco_unitario
FROM item_pedido
JOIN pedido ON pedido.id = item_pedido.pedido_id
JOIN produto ON produto.id = item_pedido.produto_id
WHERE pedido.id = 3;
```

```
 pedido |        nome         | quantidade | preco_unitario
--------+---------------------+------------+----------------
      3 | Livro de JavaScript |          1 |             80
      3 | Livro de SQL        |          1 |             90
(2 linhas)
```

### LEFT JOIN: mantendo quem não tem par

O `LEFT JOIN` **mantém** os clientes sem pedido (a Eva). Onde não há pedido, fica vazio (`NULL`):

```sql
SELECT cliente.nome, pedido.id AS pedido
FROM cliente
LEFT JOIN pedido ON pedido.cliente_id = cliente.id
ORDER BY cliente.id, pedido.id;
```

```
    nome    | pedido
------------+--------
 Ana Souza  |      1
 Ana Souza  |      3
 Ana Souza  |      7
 Bruno Lima |      2
 Bruno Lima |      6
 Carla Dias |      4
 Davi Nunes |      5
 Eva Rocha  |
(8 linhas)
```

Filtrando os que **não têm par** com `IS NULL`: "quais clientes nunca compraram?"

```sql
SELECT cliente.nome
FROM cliente
LEFT JOIN pedido ON pedido.cliente_id = cliente.id
WHERE pedido.id IS NULL;
```

```
   nome
-----------
 Eva Rocha
(1 linha)
```

### O preço da época

O `preco_unitario` da Aula 1, agora numa consulta. O Mouse foi vendido a 110 no pedido 2 e hoje custa 120:

```sql
SELECT produto.nome, item_pedido.pedido_id AS pedido, item_pedido.preco_unitario, produto.preco AS preco_atual
FROM item_pedido
JOIN produto ON produto.id = item_pedido.produto_id
WHERE item_pedido.preco_unitario <> produto.preco;
```

```
 nome  | pedido | preco_unitario | preco_atual
-------+--------+----------------+-------------
 Mouse |      2 |            110 |         120
(1 linha)
```

| | O que devolve |
|---|---|
| `JOIN` (ou `INNER JOIN`) | Só as linhas que **têm par** nas duas tabelas |
| `LEFT JOIN` | **Todas** as linhas da tabela da **esquerda** (a do `FROM`), com `NULL` onde não há par |

**💬 E daí?** "Quais clientes nunca compraram?" vira campanha de e-mail ("volte para a loja!"). Com `LEFT JOIN ... IS NULL`, o time de marketing tem a lista em segundos.

**✅ Checkpoint:** por que usamos `IS NULL` e não `= NULL`?

<details>
<summary>💡 Ver resposta</summary>

Porque `NULL` quer dizer "não existe valor", e nada é **igual** a "não existe". `= NULL` nunca é verdadeiro e devolve **0 linhas, sem erro**. A pergunta certa é `IS NULL`.

</details>

---

## 3. Agregações: resumindo os dados

**Por que usar?** Agregar é **dobrar muitas linhas em um número**. O `GROUP BY` separa as linhas em **cestas** (uma por cliente, por categoria) e a função faz a conta **uma vez por cesta**.

```
 linhas soltas            GROUP BY categoria                SUM por cesta
 ┌──────────────┐        ╔══ eletronicos ══╗               ┌─────────────────────┐
 │ Mouse    120 │ ─────▶ ║ Mouse    120    ║ ───────────▶  │ eletronicos │  1040 │
 │ Teclado  350 │ ─────▶ ║ Teclado  350 ...║               └─────────────────────┘
 │ Livro JS  80 │ ─────▶ ╔══ livros ═══════╗               ┌─────────────────────┐
 │ Livro SQL 90 │ ─────▶ ║ Livro JS  80 ...║ ───────────▶  │ livros      │   510 │
 │ Luminária 60 │ ─────▶ ╔══ casa ═════════╗               ├─────────────────────┤
 └──────────────┘        ║ Luminária 60 ...║ ───────────▶  │ casa        │   120 │
                         ╚═════════════════╝               └─────────────────────┘
 ordem de leitura: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

> **🎨 Em uma frase:** `GROUP BY` separa em cestas, e a função de agregação faz a conta de cada cesta.

### Resumindo a tabela inteira

```sql
SELECT COUNT(*) AS total_pedidos
FROM pedido;
```

```
 total_pedidos
---------------
             7
(1 linha)
```

```sql
SELECT MIN(preco) AS menor, MAX(preco) AS maior, ROUND(AVG(preco), 2) AS media
FROM produto;
```

```
 menor | maior | media
-------+-------+--------
    25 |   350 | 120.83
(1 linha)
```

### Quantos pedidos cada cliente fez (GROUP BY)

O `COUNT(pedido.id)` conta só quem **tem** pedido, e a Eva dá `0`:

```sql
SELECT cliente.nome, COUNT(pedido.id) AS pedidos
FROM cliente
LEFT JOIN pedido ON pedido.cliente_id = cliente.id
GROUP BY cliente.nome
ORDER BY pedidos DESC, cliente.nome;
```

```
    nome    | pedidos
------------+---------
 Ana Souza  |       3
 Bruno Lima |       2
 Carla Dias |       1
 Davi Nunes |       1
 Eva Rocha  |       0
(5 linhas)
```

### Filtrando depois de agrupar (HAVING)

```sql
SELECT cliente.nome, COUNT(pedido.id) AS pedidos
FROM cliente
JOIN pedido ON pedido.cliente_id = cliente.id
GROUP BY cliente.nome
HAVING COUNT(pedido.id) >= 2
ORDER BY pedidos DESC, cliente.nome;
```

```
    nome    | pedidos
------------+---------
 Ana Souza  |       3
 Bruno Lima |       2
(2 linhas)
```

### O faturamento por categoria

Um `JOIN` em duas etapas, a conta `quantidade * preco_unitario` e o `SUM`:

```sql
SELECT categoria.nome, SUM(item_pedido.quantidade * item_pedido.preco_unitario) AS faturamento
FROM item_pedido
JOIN produto ON produto.id = item_pedido.produto_id
JOIN categoria ON categoria.id = produto.categoria_id
GROUP BY categoria.nome
ORDER BY faturamento DESC;
```

```
    nome     | faturamento
-------------+-------------
 eletronicos |        1040
 livros      |         510
 casa        |         120
(3 linhas)
```

| Função | O que faz |
|---|---|
| `COUNT` | **Conta** linhas |
| `SUM` | **Soma** uma coluna |
| `AVG` | **Média** |
| `MIN` / `MAX` | O **menor** / o **maior** valor |

| | Quando age | Exemplo |
|---|---|---|
| `WHERE` | **Antes** de agrupar: filtra **linhas** | `WHERE status = 'entregue'` |
| `HAVING` | **Depois** de agrupar: filtra **cestas** | `HAVING COUNT(pedido.id) >= 2` |

**💬 E daí?** O faturamento por categoria decide onde investir e quem vende bem. O `SUM` faz em milissegundos a conta que alguém levaria uma tarde para fazer à mão.

**✅ Checkpoint:** por que o `COUNT(pedido.id)` dá `0` para a Eva, mas o `COUNT(*)` dá `1`?

<details>
<summary>💡 Ver resposta</summary>

O `COUNT(pedido.id)` conta só os valores **que existem** (na linha da Eva, o `pedido.id` é `NULL`). O `COUNT(*)` conta **linhas**, e a Eva tem 1 linha (a que o `LEFT JOIN` manteve). Com `COUNT(*)`, o resultado fica errado:

```
    nome    | pedidos
------------+---------
 Ana Souza  |       3
 Bruno Lima |       2
 Carla Dias |       1
 Davi Nunes |       1
 Eva Rocha  |       1
(5 linhas)
```

</details>

---

## 4. Bancos não relacionais: documentos

**Por que usar?** No banco relacional, o pedido fica **espalhado** em 4 tabelas ligadas por id. Num banco de **documentos**, o pedido é **uma ficha só, com tudo dentro**: o cliente e os itens vão **embutidos**. É a diferença entre o **arquivo de gavetas** (várias fichas ligadas por número) e a **pasta do pedido** (a nota fiscal com tudo grampeado).

```
 RELACIONAL: 4 tabelas, ligadas por id              DOCUMENTO: 1 ficha, tudo dentro

   CLIENTE ◀── PEDIDO ──▶ ITEM_PEDIDO ──▶ PRODUTO      ┌────────────────────────────────┐
     (ler o pedido = seguir 3 setas / fazer JOIN)      │ pedido 3                       │
                                                       │  cliente: { Ana Souza, NE }    │
                                                       │  itens:   [ {Livro JS, 80},    │
                                                       │             {Livro SQL, 90} ]  │
                                                       └────────────────────────────────┘
                                                        ler o pedido = 1 leitura, sem JOIN
 custo: o "Ana Souza, NE" é copiado dentro de cada pedido dela
```

> **🎨 Em uma frase:** documento: ler fica fácil, mas copiar custa na hora de atualizar.

### O MercadoÁgil como documentos (em JavaScript)

O arquivo `livecoding/documentos.js` guarda os pedidos como **documentos** (objetos com objetos dentro, igual ao que você já faz em JS):

```js
// O mesmo MercadoÁgil, agora como DOCUMENTOS: cada pedido carrega o cliente e os itens dentro dele.
const pedidos = [
  { _id: 1, cliente: { nome: 'Ana Souza', regiao: 'Nordeste' }, status: 'entregue', criadoEm: '2026-10-02',
    itens: [{ produto: 'Mouse', quantidade: 1, precoUnitario: 120 }, { produto: 'Livro de JavaScript', quantidade: 1, precoUnitario: 80 }] },
  { _id: 2, cliente: { nome: 'Bruno Lima', regiao: 'Sudeste' }, status: 'entregue', criadoEm: '2026-10-05',
    itens: [{ produto: 'Mouse', quantidade: 2, precoUnitario: 110 }] },
  { _id: 3, cliente: { nome: 'Ana Souza', regiao: 'Nordeste' }, status: 'entregue', criadoEm: '2026-10-12',
    itens: [{ produto: 'Livro de JavaScript', quantidade: 1, precoUnitario: 80 }, { produto: 'Livro de SQL', quantidade: 1, precoUnitario: 90 }] },
  { _id: 4, cliente: { nome: 'Carla Dias', regiao: 'Sul' }, status: 'cancelado', criadoEm: '2026-10-14',
    itens: [{ produto: 'Teclado', quantidade: 1, precoUnitario: 350 }] },
  { _id: 5, cliente: { nome: 'Davi Nunes', regiao: 'Nordeste' }, status: 'entregue', criadoEm: '2026-10-20',
    itens: [{ produto: 'Luminária', quantidade: 2, precoUnitario: 60 }, { produto: 'Livro de JavaScript', quantidade: 1, precoUnitario: 80 }] },
  { _id: 6, cliente: { nome: 'Bruno Lima', regiao: 'Sudeste' }, status: 'pendente', criadoEm: '2026-10-25',
    itens: [{ produto: 'Teclado', quantidade: 1, precoUnitario: 350 }] },
  { _id: 7, cliente: { nome: 'Ana Souza', regiao: 'Nordeste' }, status: 'entregue', criadoEm: '2026-10-28',
    itens: [{ produto: 'Livro de SQL', quantidade: 2, precoUnitario: 90 }] },
];

// 1) Ler um pedido inteiro: UMA busca, sem JOIN
const pedido3 = pedidos.find(p => p._id === 3);
console.log(pedido3.cliente.nome, pedido3.itens.length);

// 2) Os pedidos da Ana
console.log(pedidos.filter(p => p.cliente.nome === 'Ana Souza').map(p => p._id));

// 3) Gasto por cliente (só pedidos entregues): o "GROUP BY" feito à mão
const gastoPorCliente = pedidos
  .filter(p => p.status === 'entregue')
  .reduce((gasto, p) => {
    const totalDoPedido = p.itens.reduce((soma, i) => soma + i.quantidade * i.precoUnitario, 0);
    return { ...gasto, [p.cliente.nome]: (gasto[p.cliente.nome] || 0) + totalDoPedido };
  }, {});
console.log(gastoPorCliente);

// 4) O custo da cópia: a Ana mudou de região, mas só o pedido 1 foi corrigido
const depoisDaMudanca = pedidos.map(p =>
  p._id === 1 ? { ...p, cliente: { ...p.cliente, regiao: 'Sudeste' } } : p
);
console.log(depoisDaMudanca.filter(p => p.cliente.nome === 'Ana Souza').map(p => p.cliente.regiao));
```

Resultado esperado no terminal (`node livecoding/documentos.js`):

```
Ana Souza 2
[ 1, 3, 7 ]
{ 'Ana Souza': 550, 'Bruno Lima': 220, 'Davi Nunes': 200 }
[ 'Sudeste', 'Nordeste', 'Nordeste' ]
```

1. `Ana Souza 2`: o pedido 3 inteiro (cliente e 2 itens) saiu de **uma busca só**, sem `JOIN`.
2. `[ 1, 3, 7 ]`: os pedidos da Ana.
3. `{ 'Ana Souza': 550, ... }`: o gasto por cliente, o `GROUP BY` feito à mão. Os valores (`550`, `220` e `200`) são os mesmos do SQL.
4. `[ 'Sudeste', 'Nordeste', 'Nordeste' ]`: a Ana tem **duas regiões**. É a **anomalia de atualização** da Aula 1, só que agora num banco de documentos.

### Embutir x referenciar

| | Embutir (copiar dentro) | Referenciar (guardar o id) |
|---|---|---|
| **Bom para** | O que é lido **junto** e **raramente muda** (os itens do pedido) | O que **muda** e é **compartilhado** (o cadastro do cliente) |
| **Ganha** | Leitura rápida, sem `JOIN` | Uma só cópia, sem divergir |
| **Custa** | A cópia pode **divergir** | Precisa de uma segunda leitura |

> **A cópia nem sempre é erro.** Se a Ana mudar de região, o pedido **antigo** deveria mudar? Nem sempre: o endereço **da época da compra** pode ser exatamente o que o pedido precisa guardar. É o `preco_unitario` outra vez.

### Como seria no MongoDB

O **MongoDB** é um banco de documentos muito usado. As perguntas que acabamos de fazer ficam assim (você não precisa rodar; é só para ver a ideia):

| Pergunta | Consulta no estilo do MongoDB | Resultado |
|---|---|---|
| Pedidos da Ana | `db.pedidos.find({ "cliente.nome": "Ana Souza" })` | pedidos 1, 3 e 7 |
| Pedidos com Mouse | `db.pedidos.find({ "itens.produto": "Mouse" })` | pedidos 1 e 2 |
| Gasto por cliente (entregues) | `db.pedidos.aggregate([{ $match: { status: "entregue" } }, { $unwind: "$itens" }, { $group: { _id: "$cliente.nome", total: { $sum: { $multiply: ["$itens.quantidade", "$itens.precoUnitario"] } } } }, { $sort: { total: -1 } }])` | Ana 550, Bruno 220, Davi 200 |

| SQL | Documento |
|---|---|
| `SELECT ... FROM ... WHERE` | `find({ ... })` |
| `JOIN` | embutido no documento (ou uma segunda busca) |
| `GROUP BY` + `SUM` | `aggregate([ $group ... ])` |

**💬 E daí?** Um catálogo de loja tem produtos com campos muito diferentes (um notebook tem memória e processador, uma camiseta tem tamanho e cor). Forçar tudo numa tabela fixa vira uma tabela com mil colunas vazias. O documento deixa **cada produto ter os seus campos**.

**✅ Checkpoint:** dê um dado do MercadoÁgil que você **embutiria** e um que você **referenciaria**. Por quê?

<details>
<summary>💡 Ver resposta</summary>

**Embutir:** os **itens do pedido** (são lidos sempre junto do pedido e não mudam depois da compra). **Referenciar:** o **cadastro do cliente** (muda de endereço e e-mail, e precisa existir em um lugar só). Outras respostas valem, se tiverem o argumento de "muda ou não muda" e "lê junto ou não".

</details>

---

## 5. Quando usar cada um e a busca semântica

**Por que usar?** Não existe o "melhor banco". Existe o banco **certo para a pergunta**. E há uma **terceira** forma de consultar dados: em vez de achar o que está **escrito igual**, achar o que **significa parecido**.

### Quando usar cada um

| | **Relacional (SQL)** | **Documentos** | **Busca semântica** |
|---|---|---|---|
| **Como guarda** | Tabelas e linhas, ligadas por id | Fichas JSON, com tudo dentro | **Vetores** (listas de números) que representam o significado |
| **Esquema** | Fixo e rígido | Flexível | O que o modelo de embeddings produzir |
| **Relações** | Muito fortes (FK, `JOIN`) | Fracas (embutir ou referenciar) | Não tem: é por proximidade |
| **Consistência** | **Muito forte** (cada dado em um lugar só) | Depende do que foi copiado | Não é o objetivo |
| **Boa pergunta** | "Quanto faturamos por vendedor?" | "Mostre este pedido (ou este perfil) inteiro" | "Ache o que se **parece** com isto" |
| **Cenário típico** | Pedidos, pagamentos, estoque, relatórios | Catálogos com campos diferentes, perfis, conteúdo | Buscar em textos, FAQs, produtos "parecidos"; base do **RAG** |

> **Não é um ou outro.** Sistemas reais **combinam**: os pedidos e pagamentos ficam no relacional; o catálogo, num banco de documentos; a busca "parecida com..." usa vetores. Escolher é decidir **qual pergunta** cada parte do sistema precisa responder.

### Busca semântica e embeddings

A busca por palavra procura o **texto igual**. Se o catálogo diz "Livro de SQL" e o cliente digita "estudar programação", **nenhuma palavra bate**. Na busca semântica, um **modelo** transforma o texto numa lista de números, o **embedding**, que **representa o significado**. Textos com significado parecido ficam **perto** um do outro.

```
 leitura ▲
         │      ● Livro de SQL
         │        ● Livro de JavaScript       ★ "estudar programação"   ◀ vizinhos mais próximos
         │
         │                       ● Teclado
         │                         ● Mouse
         │   ● Caneca
         │  ● Luminária
         └──────────────────────────────────────────▶ tecnologia
 busca por palavra: nenhuma palavra bate
```

> O desenho é um **mapa simplificado**: os embeddings de verdade têm centenas de números, não dois.

> **🎨 Em uma frase:** busca por palavra procura o texto igual. Busca por significado procura o vizinho mais próximo.

O arquivo `livecoding/busca-semantica.js` mostra a ideia com embeddings de **brinquedo** (3 números escritos à mão). Os de verdade vêm de um **modelo**, e isso fica para o M4.

```js
// Embeddings de BRINQUEDO: 3 números por produto, escritos à mão.
// Dimensões: [tecnologia, leitura, casa]. Os de verdade têm centenas de números e vêm de um modelo.
const produtos = [
  { nome: 'Mouse', vetor: [0.9, 0.0, 0.1] },
  { nome: 'Teclado', vetor: [0.9, 0.1, 0.0] },
  { nome: 'Livro de JavaScript', vetor: [0.5, 0.8, 0.0] },
  { nome: 'Livro de SQL', vetor: [0.4, 0.9, 0.0] },
  { nome: 'Luminária', vetor: [0.1, 0.0, 0.9] },
  { nome: 'Caneca', vetor: [0.0, 0.1, 0.9] },
];

// Quão "na mesma direção" estão dois vetores? 1 = muito parecidos, 0 = nada a ver
function similaridade(a, b) {
  const produtoEscalar = a.reduce((soma, x, i) => soma + x * b[i], 0);
  const tamanho = v => Math.sqrt(v.reduce((soma, x) => soma + x * x, 0));
  return produtoEscalar / (tamanho(a) * tamanho(b));
}

function buscarPorSignificado(vetorDaConsulta) {
  return produtos
    .map(p => ({ nome: p.nome, similaridade: Number(similaridade(vetorDaConsulta, p.vetor).toFixed(3)) }))
    .sort((a, b) => b.similaridade - a.similaridade)
    .slice(0, 3);
}

// Busca por PALAVRA: procura o texto "programação" nos nomes
console.log(produtos.filter(p => p.nome.toLowerCase().includes('programação')).map(p => p.nome));

// Busca por SIGNIFICADO: a consulta "estudar programação" também vira um vetor (escrito à mão aqui)
console.log(buscarPorSignificado([0.6, 0.8, 0.0]));

// Outra consulta: "enfeitar a casa"
console.log(buscarPorSignificado([0.0, 0.1, 1.0]));
```

Resultado esperado no terminal (`node livecoding/busca-semantica.js`):

```
[]
[
  { nome: 'Livro de JavaScript', similaridade: 0.996 },
  { nome: 'Livro de SQL', similaridade: 0.975 },
  { nome: 'Teclado', similaridade: 0.685 }
]
[
  { nome: 'Caneca', similaridade: 1 },
  { nome: 'Luminária', similaridade: 0.989 },
  { nome: 'Mouse', similaridade: 0.11 }
]
```

1. `[]`: a busca por **palavra** não achou nada, porque "programação" não está em nenhum nome.
2. O ranking de "estudar programação": os **dois livros** no topo, que é o que o cliente queria. `similaridade` perto de `1` quer dizer "muito parecido".
3. A consulta "enfeitar a casa": a **Caneca** e a **Luminária**, sem a palavra "casa" em nenhum nome.

**O gancho do M4 (RAG):** vamos usar exatamente essa ideia. Dividir documentos em trechos, transformar cada trecho em vetor, **achar os trechos mais próximos da pergunta** e entregá-los ao modelo para ele responder com base neles.

**💬 E daí?** Um cliente digita "celular" e o catálogo só tem "smartphone". Sem busca por significado, ele vê "nenhum resultado" e a venda se perde.

**✅ Checkpoint:** um cliente digita "celular" e o catálogo só tem "smartphone". Qual dos três tipos resolve? E se o time quiser o **faturamento do mês**?

<details>
<summary>💡 Ver resposta</summary>

O primeiro caso pede **busca semântica** (acha pelo **significado**, não pela palavra). O faturamento do mês pede **relacional** (`SUM` com `GROUP BY`, com dado consistente). Mesmo sistema, perguntas diferentes, tipos diferentes.

</details>

---

## 🧠 Resumo

| Quero... | Uso |
|---|---|
| Ver colunas de uma tabela | `SELECT colunas FROM tabela` |
| Filtrar linhas | `WHERE` |
| Ordenar / limitar | `ORDER BY` (`DESC` = decrescente) / `LIMIT` |
| Juntar tabelas | `JOIN ... ON tabela.fk = outra.id` |
| Manter quem não tem par | `LEFT JOIN` |
| Achar quem não tem par | `LEFT JOIN ... WHERE coluna IS NULL` |
| Contar / somar / média / menor / maior | `COUNT` / `SUM` / `AVG` / `MIN` / `MAX` |
| Fazer a conta por grupo | `GROUP BY` |
| Filtrar depois de agrupar | `HAVING` |
| Trocar `NULL` por um valor | `COALESCE(coluna, valor)` |

| Tipo de banco | Escolha quando a pergunta é... |
|---|---|
| **Relacional** | "Quanto?", "Quantos?", "De quem?": dados ligados e consistentes, relatórios |
| **Documentos** | "Mostre isto inteiro": dados com formato que varia, lidos de uma vez |
| **Busca semântica** | "Ache o que se parece com isto": por significado |

---

## 👥 Exercício da aula: queries e comparativo

**Tempo:** até 45 minutos (2 de preparação, 28 para as queries e 15 para o comparativo). Uma pessoa é a **pilota** (digita) e a outra é a **navegadora** (lê o enunciado e confere). **Troquem de papel a cada consulta.**

### 🎯 O cenário

O time de negócio do MercadoÁgil tem **8 perguntas** e quer saber **qual tipo de banco** responde melhor a cada parte do sistema. Você vai responder às perguntas em SQL e depois comparar os tipos de banco.

### 📦 O que a dupla entrega

1. Um arquivo **`queries.sql`** com as 8 consultas (e o desafio extra, se der).
2. Um arquivo **`comparativo.md`** com a tabela preenchida e as 5 escolhas justificadas.

### 🧭 Como a dupla trabalha (High Agency na prática)

- **Bias to Action:** escreva a consulta, **rode logo** e corrija olhando o resultado. Não escreva as 8 para só depois testar.
- **Clear Thinking:** antes de cada consulta, diga em voz alta: **"qual pergunta do time ela responde, e quem vai usar o resultado?"**
- **Discordância Positiva:** na Parte B, a navegadora **discorda** de pelo menos 2 escolhas da pilota. A dupla defende cada lado com **um argumento** e só então decide, **não** quem fala mais alto.

### 🪜 Preparação (2 min)

Cada dupla abre o playground, cola o `setup.sql` e confere:

```sql
SELECT COUNT(*) FROM produto;
```

> Resultado esperado: `6`.

### 🪜 Parte A: as queries (28 min)

Confira o **resultado esperado** de cada consulta antes de seguir. **Ordene** como está pedido, para o seu resultado sair igual ao esperado.

**Query 1: o catálogo.** Liste o **nome do produto**, o **nome da loja do vendedor** e a **comissão da categoria**, ordenado pelo nome do produto.
> Resultado esperado:
> ```
>         nome         |  nome_loja   | comissao
> ---------------------+--------------+----------
>  Caneca              | CasaViva     |       10
>  Livro de JavaScript | Livraria Sol |       15
>  Livro de SQL        | Livraria Sol |       15
>  Luminária           | CasaViva     |       10
>  Mouse               | TechBahia    |        8
>  Teclado             | TechBahia    |        8
> (6 linhas)
> ```

**Query 2: os baratos.** Liste o **nome** e o **preço** dos produtos que custam **menos de R$ 100**, do mais barato ao mais caro.
> Resultado esperado:
> ```
>         nome         | preco
> ---------------------+-------
>  Caneca              |    25
>  Luminária           |    60
>  Livro de JavaScript |    80
>  Livro de SQL        |    90
> (4 linhas)
> ```

**Query 3: o que foi entregue.** Liste o **id do pedido**, o **nome do cliente** e a **data** dos pedidos com status `'entregue'`, do mais antigo ao mais novo.
> Resultado esperado:
> ```
>  id |    nome    | criado_em
> ----+------------+------------
>   1 | Ana Souza  | 2026-10-02
>   2 | Bruno Lima | 2026-10-05
>   3 | Ana Souza  | 2026-10-12
>   5 | Davi Nunes | 2026-10-20
>   7 | Ana Souza  | 2026-10-28
> (5 linhas)
> ```

**Query 4: quem nunca comprou.** Liste o **nome** dos clientes que **nunca fizeram pedido**.
> Resultado esperado:
> ```
>    nome
> -----------
>  Eva Rocha
> (1 linha)
> ```

**Query 5: pedidos por status.** Conte **quantos pedidos** existem em cada status, ordenado pelo status.
> Resultado esperado:
> ```
>   status   | pedidos
> -----------+---------
>  cancelado |       1
>  entregue  |       5
>  pendente  |       1
> (3 linhas)
> ```

**Query 6: o valor de cada pedido.** Calcule o **total de cada pedido** (a soma de `quantidade * preco_unitario` dos itens). Ordene do maior para o menor total e, em caso de empate, pelo id do pedido.
> Resultado esperado:
> ```
>  pedido_id | total
> -----------+-------
>          4 |   350
>          6 |   350
>          2 |   220
>          1 |   200
>          5 |   200
>          7 |   180
>          3 |   170
> (7 linhas)
> ```

**Query 7: o faturamento por vendedor.** Calcule o **faturamento de cada loja**, considerando **só os pedidos entregues**. Ordene do maior para o menor.
> Resultado esperado:
> ```
>   nome_loja   | faturamento
> --------------+-------------
>  Livraria Sol |         510
>  TechBahia    |         340
>  CasaViva     |         120
> (3 linhas)
> ```

**Query 8: a comissão da plataforma.** Para cada **categoria**, calcule a comissão da plataforma nos pedidos entregues: a soma de `quantidade * preco_unitario * comissao / 100`, **arredondada para 2 casas**. Ordene pelo nome da categoria.
> Resultado esperado (no SQLite aparece `12`, `27.2` e `76.5`, sem os zeros):
> ```
>     nome     | comissao_da_plataforma
> -------------+------------------------
>  casa        |                  12.00
>  eletronicos |                  27.20
>  livros      |                  76.50
> (3 linhas)
> ```

**🚀 Desafio extra: o produto que não vende.** Liste o **nome** dos produtos que **nunca foram vendidos** (não aparecem em nenhum pedido).
> Resultado esperado:
> ```
>   nome
> --------
>  Caneca
> (1 linha)
> ```

### 🪜 Parte B: o comparativo (15 min)

Crie o arquivo `comparativo.md`.

**B1 (5 min): complete a tabela** com uma frase curta em cada célula, **pensando no MercadoÁgil**:

| | **Relacional (SQL)** | **Documentos (NoSQL)** |
|---|---|---|
| Como os dados são guardados | ? | ? |
| Esquema (forma dos dados) | ? | ? |
| Como ligar informações | ? | ? |
| Como evitar dado repetido | ? | ? |
| Boa pergunta para ele | ? | ? |
| Maior risco | ? | ? |

> Resultado esperado: as ideias do quadro de decisão da seção 5. Exemplo de uma linha: *Esquema:* relacional = **fixo**, as colunas são definidas antes; documentos = **flexível**, cada documento pode ter campos diferentes.

**B2 (10 min): escolha o tipo certo para cada cenário** e **justifique em uma frase**. As opções: **relacional**, **documentos**, **busca semântica**, ou **uma combinação**.

1. O cadastro de **pedidos e pagamentos**, em que o dinheiro não pode divergir.
2. O **catálogo de produtos**, em que cada produto tem campos muito diferentes (notebook tem memória e processador; camiseta tem tamanho e cor).
3. Uma busca "**um presente para quem gosta de corrida**" que ache produtos que **não têm** essas palavras no nome.
4. O **perfil do usuário** (preferências e favoritos), lido inteiro a cada vez que a pessoa abre o app.
5. O **relatório mensal** de faturamento por categoria.

> Resultado esperado: **1** relacional · **2** documentos · **3** busca semântica · **4** documentos · **5** relacional. Em cada um, a **justificativa** (a pergunta que o sistema precisa responder) vale mais do que a escolha.

**🚀 Pergunta para responder em dupla** (no fim do `comparativo.md`): por que um sistema real **combina** os três tipos de armazenamento em vez de escolher só um? Escrevam **uma frase pensando no time** e **uma pensando no cliente**.

### ✅ Antes de entregar

- [ ] As 8 queries (e o extra, se der) dão **exatamente** o resultado esperado?
- [ ] A dupla trocou de papel a cada consulta?
- [ ] O `comparativo.md` tem a tabela preenchida e as 5 escolhas **justificadas**?
- [ ] Alguém na dupla consegue explicar, **com as próprias palavras**, a diferença entre `WHERE` e `HAVING`?
- [ ] A dupla discordou de forma positiva em pelo menos 2 cenários?

---

## 📝 Lista de exercícios para casa

Faça cada um **sozinho(a)**, nesta ordem. Os exercícios 1, 2 e 4 usam as mesmas tabelas do `setup.sql` (cole de novo no playground se precisar). **Uma consulta de cada vez**: escreva, rode, confira.

As dicas estão escondidas: clique em **"💡 Ver dicas"** só depois de tentar.

| Exercício | Tema | Dificuldade |
|---|---|---|
| 1. A vitrine | `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `COUNT` | 🟢 Fácil |
| 2. O relatório por vendedor | `JOIN`, `GROUP BY`, `LEFT JOIN`, `COALESCE`, `HAVING` | 🟡 Médio |
| 3. Relacional ou documento? | Embutir x referenciar, de relacional para documento | 🟢 Fácil |
| 4. O painel do dono | Tudo junto: vários `JOIN`, `GROUP BY` e um comparativo | 🔴 Difícil |

---

### Exercício 1: A vitrine 🟢 Fácil

A loja vai montar a página inicial. Escreva as consultas abaixo.

**O que fazer:**

1. Os **3 produtos mais baratos** (nome e preço), do mais barato ao mais caro.
2. Os produtos da **categoria 2** (livros): nome e preço, em ordem alfabética.
3. **Quantos produtos** existem no catálogo.

**Resultado esperado:**

```
        nome         | preco
---------------------+-------
 Caneca              |    25
 Luminária           |    60
 Livro de JavaScript |    80
(3 linhas)

        nome         | preco
---------------------+-------
 Livro de JavaScript |    80
 Livro de SQL        |    90
(2 linhas)

 produtos
----------
        6
(1 linha)
```

<details>
<summary>💡 Ver dicas</summary>

- Reveja a "receita de um SELECT" da seção 1.
- Do mais barato ao mais caro é `ORDER BY preco` (sem `DESC`).
- Para "só os 3", use `LIMIT 3`.
- Para filtrar por categoria, use `WHERE categoria_id = 2`.
- Para contar linhas, `COUNT(*)`.

</details>

---

### Exercício 2: O relatório por vendedor 🟡 Médio

O time quer um relatório sobre os vendedores e os produtos.

**O que fazer:**

1. **Quantos produtos** cada vendedor anuncia. Mostre o nome da loja e a quantidade, em ordem alfabética da loja.
2. As **unidades vendidas** de cada produto, **incluindo** os que nunca foram vendidos (que devem aparecer com `0`). Ordene do mais vendido para o menos vendido e, em caso de empate, pelo nome.
3. Os **clientes que gastaram mais de R$ 200** nos pedidos entregues. Mostre o nome e o gasto, do maior para o menor.

**Resultado esperado:**

```
  nome_loja   | produtos
--------------+----------
 CasaViva     |        2
 Livraria Sol |        2
 TechBahia    |        2
(3 linhas)

        nome         | unidades_vendidas
---------------------+-------------------
 Livro de JavaScript |                 3
 Livro de SQL        |                 3
 Mouse               |                 3
 Luminária           |                 2
 Teclado             |                 2
 Caneca              |                 0
(6 linhas)

    nome    | gasto
------------+-------
 Ana Souza  |   550
 Bruno Lima |   220
(2 linhas)
```

<details>
<summary>💡 Ver dicas</summary>

- **Item 1:** `JOIN` entre `vendedor` e `produto`, `COUNT(produto.id)` e `GROUP BY vendedor.nome_loja`.
- **Item 2:** para manter os produtos sem venda, use `LEFT JOIN item_pedido`. Quando não há venda, o `SUM` dá `NULL`; use `COALESCE(SUM(...), 0)` para trocar o `NULL` por `0`.
- **Item 3:** é preciso juntar `item_pedido`, `pedido` e `cliente`; filtrar `status = 'entregue'` no `WHERE`; e o filtro do gasto vai no `HAVING` (depois de somar).
- Se o Davi (gasto de exatamente 200) apareceu, o seu filtro está com `>=` em vez de `>`.
- Se der `must appear in the GROUP BY clause`, falta uma coluna do `SELECT` no `GROUP BY`.

</details>

---

### Exercício 3: Relacional ou documento? 🟢 Fácil

O catálogo vai ganhar uma página de detalhes do pedido, que mostra **tudo de uma vez**. O time está pensando em usar um banco de documentos para isso.

Estas são as linhas do **pedido 3** no banco relacional:

| Tabela | Linhas |
|---|---|
| `pedido` | id 3, cliente_id 1, status `entregue`, criado_em `2026-10-12` |
| `cliente` | id 1, nome `Ana Souza`, regiao_id 1 (Nordeste) |
| `item_pedido` | (pedido 3, produto 3, quantidade 1, preço 80) e (pedido 3, produto 4, quantidade 1, preço 90) |
| `produto` | id 3 = `Livro de JavaScript`; id 4 = `Livro de SQL` |

**O que fazer:**

1. Escreva o **pedido 3 como um documento JSON**, com o cliente e os itens **embutidos** (use o formato do `documentos.js`).
2. Liste **uma vantagem** de ler o pedido como documento.
3. Liste **um custo** de ter o nome e a região da Ana copiados dentro do pedido.
4. Escreva um comentário: **o nome da Ana deve ser embutido ou referenciado?** Defenda com um argumento.

**Resultado esperado:**

```js
{
  _id: 3,
  cliente: { nome: 'Ana Souza', regiao: 'Nordeste' },
  status: 'entregue',
  criadoEm: '2026-10-12',
  itens: [
    { produto: 'Livro de JavaScript', quantidade: 1, precoUnitario: 80 },
    { produto: 'Livro de SQL', quantidade: 1, precoUnitario: 90 }
  ]
}
```

<details>
<summary>💡 Ver dicas</summary>

- Olhe o `documentos.js`: o pedido 3 já está lá. Escreva o seu **sem olhar** e depois compare.
- Os itens são uma **lista** (colchetes) de objetos.
- Vantagem: pense em "quantas buscas" para mostrar a tela. Custo: lembre da Ana com duas regiões.
- Para o item 4, pergunte: "se a Ana mudar de região amanhã, o pedido de ontem deve mudar?"

</details>

---

### Exercício 4: O painel do dono 🔴 Difícil

O dono do MercadoÁgil quer um painel e uma opinião sobre o tipo de banco.

**O que fazer:**

1. O **faturamento por região** dos clientes, nos pedidos entregues. Mostre o nome da região e o faturamento, do maior para o menor.
2. A **comissão da plataforma por vendedor** (nome da loja), nos pedidos entregues: a soma de `quantidade * preco_unitario * comissao / 100`, arredondada para 2 casas, ordenada pelo nome da loja.
3. O **cliente que mais gastou** nos pedidos entregues: só o nome e o gasto, **uma linha**.
4. **Pensando como pessoa de mercado:** escreva **dois comentários**:
   - **Clear Thinking:** o dono quer um campo de busca para "**um presente para quem gosta de café**", e o catálogo não tem a palavra "café" em muitos nomes. Qual dos três tipos de armazenamento resolve? Por quê?
   - **Discordância Positiva:** um colega diz "vamos guardar **tudo** num banco de documentos, porque é mais fácil". Discorde (ou concorde) com **um argumento**, olhando para os pedidos e pagamentos.

**Resultado esperado** (no SQLite os valores decimais aparecem sem os zeros, como `12`):

```
   nome   | faturamento
----------+-------------
 Nordeste |         750
 Sudeste  |         220
(2 linhas)

  nome_loja   | comissao
--------------+----------
 CasaViva     |    12.00
 Livraria Sol |    76.50
 TechBahia    |    27.20
(3 linhas)

   nome    | gasto
-----------+-------
 Ana Souza |   550
(1 linha)
```

<details>
<summary>💡 Ver dicas</summary>

- **Não tente fazer tudo de uma vez.** Escreva o `FROM` e **um** `JOIN`, rode; some o próximo `JOIN`, rode de novo.
- **Item 1:** o caminho é `item_pedido` → `pedido` → `cliente` → `regiao`.
- **Item 2:** o caminho é `item_pedido` → `pedido`, `produto`, `vendedor` e `categoria` (a comissão está na categoria). Divida por `100.0` (com `.0`) para não arredondar para baixo.
- **Item 3:** é o mesmo cálculo do item 1 do Exercício 2, só que `ORDER BY ... DESC` e `LIMIT 1`.
- **Item 4:** pense na **pergunta** que o campo de busca precisa responder: achar pelo **significado** ou pela **palavra**?
- Para o colega: o que acontece com o dinheiro se uma informação for copiada em vários lugares e uma delas ficar errada?

</details>

---

## 🐞 Erros comuns e o que eles significam

Antes de pedir ajuda, leia a mensagem inteira e tente **pelo menos uma** correção. Ela aponta a palavra do problema. As mensagens abaixo são do PostgreSQL; no SQLite as palavras mudam, mas o motivo é o mesmo.

| O que aparece | O que provavelmente aconteceu | Como resolver |
|---|---|---|
| `column "cliente.nome" must appear in the GROUP BY clause or be used in an aggregate function` | Há uma coluna no `SELECT` que não foi agrupada nem resumida | Coloque a coluna no `GROUP BY` ou use uma função de agregação nela |
| `column reference "id" is ambiguous` | O `id` existe em mais de uma tabela | Escreva `tabela.id` |
| `aggregate functions are not allowed in WHERE` | Usou `COUNT`/`SUM` no `WHERE` | Mova a condição para o `HAVING` |
| `column "entregue" does not exist` | Texto escrito com **aspas duplas** | Use **aspas simples**: `'entregue'` |
| `syntax error at or near "SELEC"` | Erro de digitação | Confira a palavra que a mensagem aponta |
| `relation "produtos" does not exist` | O nome da tabela não bate | Confira o nome no `CREATE TABLE` (aqui é `produto`, no singular) |
| **0 linhas, sem erro** com `= NULL` | `= NULL` nunca é verdadeiro | Use `IS NULL` |
| **35 linhas** em vez de 7 | Faltou o `ON` no `JOIN`: o banco combinou cada pedido com cada cliente | Escreva o `ON` ligando a FK à PK |
| A Eva com **1 pedido** em vez de 0 | `COUNT(*)` conta a linha que o `LEFT JOIN` manteve | Use `COUNT(pedido.id)` |

---

**Lembre-se:** ninguém escreve SQL certo de primeira. Escreva, rode, leia o resultado e ajuste. Cada pergunta que você consegue responder com uma consulta é um problema de negócio resolvido. Bons estudos! 🚀

**🏁 Desafio bônus (opcional, 15 minutos):** escolha **uma pergunta de negócio** do app que você mais usa (por exemplo, "qual a música mais tocada do mês?"), diga **qual tipo de banco** responderia melhor (relacional, documentos ou busca semântica) e escreva **uma consulta** (em SQL ou no estilo do MongoDB) que a responda. Quem cria o problema entende o conteúdo de verdade.