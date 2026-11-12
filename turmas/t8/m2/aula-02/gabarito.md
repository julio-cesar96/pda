# ✅ Gabarito comentado

**Módulo 2 · Aula 2: SQL na prática, bancos não relacionais e busca semântica**

Este arquivo tem as respostas do **exercício da aula** (as queries e o comparativo) e da **lista de exercícios para casa**.

> **Como usar o gabarito:** ele não serve para copiar. Serve para **comparar**. Primeiro tente resolver sozinho(a). Depois confira a sua consulta com a daqui. Se o **resultado** da sua consulta for igual ao esperado, **ela também está certa**, mesmo escrita de outro jeito. Em SQL há vários caminhos para a mesma resposta.
>
> Se o seu resultado deu diferente, não apague tudo. Compare **linha por linha** com o gabarito e descubra onde está a diferença. Esse é o momento em que você mais aprende.

---

## 📑 Sumário

- [✅ Gabarito comentado](#-gabarito-comentado)
  - [📑 Sumário](#-sumário)
  - [👥 Exercício da aula: Parte A, as queries](#-exercício-da-aula-parte-a-as-queries)
    - [Query 1: o catálogo](#query-1-o-catálogo)
    - [Query 2: os baratos](#query-2-os-baratos)
    - [Query 3: o que foi entregue](#query-3-o-que-foi-entregue)
    - [Query 4: quem nunca comprou](#query-4-quem-nunca-comprou)
    - [Query 5: pedidos por status](#query-5-pedidos-por-status)
    - [Query 6: o valor de cada pedido](#query-6-o-valor-de-cada-pedido)
    - [Query 7: o faturamento por vendedor](#query-7-o-faturamento-por-vendedor)
    - [Query 8: a comissão da plataforma](#query-8-a-comissão-da-plataforma)
    - [🚀 Desafio extra: o produto que não vende](#-desafio-extra-o-produto-que-não-vende)
  - [Parte B: o comparativo](#parte-b-o-comparativo)
    - [B1: a tabela](#b1-a-tabela)
    - [B2: a escolha para cada cenário](#b2-a-escolha-para-cada-cenário)
    - [🚀 Resposta esperada para a pergunta em dupla](#-resposta-esperada-para-a-pergunta-em-dupla)
  - [Exercício 1: A vitrine 🟢](#exercício-1-a-vitrine-)
  - [Exercício 2: O relatório por vendedor 🟡](#exercício-2-o-relatório-por-vendedor-)
  - [Exercício 3: Relacional ou documento? 🟢](#exercício-3-relacional-ou-documento-)
  - [Exercício 4: O painel do dono 🔴](#exercício-4-o-painel-do-dono-)
  - [❓ Dúvidas que costumam aparecer](#-dúvidas-que-costumam-aparecer)

---

## 👥 Exercício da aula: Parte A, as queries

### Query 1: o catálogo

```sql
SELECT produto.nome, vendedor.nome_loja, categoria.comissao
FROM produto
JOIN vendedor ON vendedor.id = produto.vendedor_id
JOIN categoria ON categoria.id = produto.categoria_id
ORDER BY produto.nome;
```

```
        nome         |  nome_loja   | comissao
---------------------+--------------+----------
 Caneca              | CasaViva     |       10
 Livro de JavaScript | Livraria Sol |       15
 Livro de SQL        | Livraria Sol |       15
 Luminária           | CasaViva     |       10
 Mouse               | TechBahia    |        8
 Teclado             | TechBahia    |        8
(6 linhas)
```

**Por que funciona:** o produto guarda o `vendedor_id` e o `categoria_id` (as FKs do DER). Cada `JOIN ... ON` segue uma delas. A **comissão** mora na `categoria` (é dado da categoria, não do produto: é a 3FN da Aula 1).

### Query 2: os baratos

```sql
SELECT nome, preco
FROM produto
WHERE preco < 100
ORDER BY preco;
```

```
        nome         | preco
---------------------+-------
 Caneca              |    25
 Luminária           |    60
 Livro de JavaScript |    80
 Livro de SQL        |    90
(4 linhas)
```

**Por que funciona:** o `WHERE` filtra as linhas **antes** de tudo. O `ORDER BY preco` (sem `DESC`) ordena do menor para o maior.

### Query 3: o que foi entregue

```sql
SELECT pedido.id, cliente.nome, pedido.criado_em
FROM pedido
JOIN cliente ON cliente.id = pedido.cliente_id
WHERE pedido.status = 'entregue'
ORDER BY pedido.criado_em;
```

```
 id |    nome    | criado_em
----+------------+------------
  1 | Ana Souza  | 2026-10-02
  2 | Bruno Lima | 2026-10-05
  3 | Ana Souza  | 2026-10-12
  5 | Davi Nunes | 2026-10-20
  7 | Ana Souza  | 2026-10-28
(5 linhas)
```

**Por que funciona:** `JOIN` com o cliente para ver o **nome** (1:N), `WHERE` pelo status e `ORDER BY` pela data. O texto `'entregue'` vai entre **aspas simples**.

### Query 4: quem nunca comprou

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

**Por que funciona:** o `LEFT JOIN` **mantém todos os clientes**, e nos que não têm pedido o `pedido.id` fica `NULL`. O `WHERE pedido.id IS NULL` fica só com esses. É a Eva.

### Query 5: pedidos por status

```sql
SELECT status, COUNT(*) AS pedidos
FROM pedido
GROUP BY status
ORDER BY status;
```

```
  status   | pedidos
-----------+---------
 cancelado |       1
 entregue  |       5
 pendente  |       1
(3 linhas)
```

**Por que funciona:** sem `JOIN`, o `COUNT(*)` conta as linhas de cada cesta do `GROUP BY status`. Aqui `COUNT(*)` está certo, porque não há `LEFT JOIN` criando linhas "vazias".

### Query 6: o valor de cada pedido

```sql
SELECT pedido_id, SUM(quantidade * preco_unitario) AS total
FROM item_pedido
GROUP BY pedido_id
ORDER BY total DESC, pedido_id;
```

```
 pedido_id | total
-----------+-------
         4 |   350
         6 |   350
         2 |   220
         1 |   200
         5 |   200
         7 |   180
         3 |   170
(7 linhas)
```

**Por que funciona:** o `SUM(quantidade * preco_unitario)` soma, dentro de cada cesta (`GROUP BY pedido_id`), o valor de cada item. Os pedidos 4 e 6 empatam em 350, e o `pedido_id` no `ORDER BY` desempata. Note o pedido 2: **220** é `2 × 110` (o **preço da época**, não os 120 atuais).

### Query 7: o faturamento por vendedor

```sql
SELECT vendedor.nome_loja, SUM(item_pedido.quantidade * item_pedido.preco_unitario) AS faturamento
FROM item_pedido
JOIN pedido ON pedido.id = item_pedido.pedido_id
JOIN produto ON produto.id = item_pedido.produto_id
JOIN vendedor ON vendedor.id = produto.vendedor_id
WHERE pedido.status = 'entregue'
GROUP BY vendedor.nome_loja
ORDER BY faturamento DESC;
```

```
  nome_loja   | faturamento
--------------+-------------
 Livraria Sol |         510
 TechBahia    |         340
 CasaViva     |         120
(3 linhas)
```

**Por que funciona:** quatro tabelas ligadas pelo caminho `item_pedido` → `pedido` (para o status), `produto` → `vendedor`. O `WHERE` tira o pedido cancelado e o pendente **antes** de somar. Conferindo a Livraria Sol à mão: 80 + 80 + 90 + 80 + 180 = 510.

### Query 8: a comissão da plataforma

```sql
SELECT categoria.nome, ROUND(SUM(item_pedido.quantidade * item_pedido.preco_unitario * categoria.comissao) / 100.0, 2) AS comissao_da_plataforma
FROM item_pedido
JOIN pedido ON pedido.id = item_pedido.pedido_id
JOIN produto ON produto.id = item_pedido.produto_id
JOIN categoria ON categoria.id = produto.categoria_id
WHERE pedido.status = 'entregue'
GROUP BY categoria.nome
ORDER BY categoria.nome;
```

```
    nome     | comissao_da_plataforma
-------------+------------------------
 casa        |                  12.00
 eletronicos |                  27.20
 livros      |                  76.50
(3 linhas)
```

**Por que funciona:** a comissão está na `categoria`, então o `JOIN` com ela traz o percentual de cada item. Dividir por `100.0` (com `.0`) faz a conta ser **decimal**. Com `100` (inteiro), o banco arredondaria cada divisão **para baixo**. No SQLite você verá `12`, `27.2` e `76.5` (sem os zeros).

### 🚀 Desafio extra: o produto que não vende

```sql
SELECT produto.nome
FROM produto
LEFT JOIN item_pedido ON item_pedido.produto_id = produto.id
WHERE item_pedido.pedido_id IS NULL;
```

```
  nome
--------
 Caneca
(1 linha)
```

**Por que funciona:** o mesmo padrão da Query 4, agora nos produtos: o `LEFT JOIN` mantém todos, e `item_pedido.pedido_id IS NULL` fica só com quem **não tem nenhuma venda**: a Caneca.

**Outra forma que também está certa:** em várias consultas dá para trocar `JOIN` por `INNER JOIN` (é a mesma coisa) e dar outros nomes às colunas com `AS`. O que importa é o **resultado**.

---

## Parte B: o comparativo

### B1: a tabela

| | **Relacional (SQL)** | **Documentos (NoSQL)** |
|---|---|---|
| Como os dados são guardados | **Tabelas** e linhas, ligadas por **id** | **Fichas JSON** (documentos) com tudo dentro, em coleções |
| Esquema (forma dos dados) | **Fixo**: as colunas são definidas antes | **Flexível**: cada documento pode ter campos diferentes |
| Como ligar informações | **`JOIN`** seguindo as chaves estrangeiras | **Embutir** o dado dentro do documento (ou guardar o id e fazer uma segunda busca) |
| Como evitar dado repetido | **Normalização**: cada informação em um lugar só | **Referenciar** em vez de copiar (e aceitar a cópia quando é um fato histórico) |
| Boa pergunta para ele | "Quanto cada vendedor faturou?" (somas, filtros, relatórios) | "Mostre este pedido (ou este perfil) inteiro" |
| Maior risco | Esquema rígido: mudar a estrutura dá trabalho | **Dado copiado que diverge** (a Ana com duas regiões) |

Qualquer resposta com a **mesma ideia** vale. O que importa é que cada célula fale do **MercadoÁgil** (ou de um caso concreto) e não só de definição.

### B2: a escolha para cada cenário

| # | Cenário | Escolha | Por quê (exemplo de justificativa) |
|---|---|---|---|
| 1 | Pedidos e pagamentos, em que o dinheiro não pode divergir | **Relacional** | Consistência forte: cada dado em um lugar só, com `PRIMARY KEY` e `REFERENCES` garantindo a ligação |
| 2 | Catálogo com produtos de campos muito diferentes | **Documentos** | Cada produto tem os seus campos (notebook: memória; camiseta: tamanho). Uma tabela fixa teria mil colunas vazias |
| 3 | Busca "um presente para quem gosta de corrida" sem as palavras no nome | **Busca semântica** | Procura pelo **significado**, não pela palavra: o embedding da consulta fica perto dos produtos relacionados |
| 4 | Perfil do usuário, lido inteiro a cada vez | **Documentos** | Uma leitura devolve o perfil todo, sem `JOIN`; e cada pessoa pode ter campos diferentes |
| 5 | Relatório mensal de faturamento por categoria | **Relacional** | É um `SUM` com `GROUP BY` sobre dados ligados: o ponto forte do SQL |

**Pontos de discussão (qualquer argumento vale, desde que seja um argumento):**
- **Cenário 4** também pode ser defendido como relacional (um perfil simples cabe numa tabela). O ponto é pesar "lido inteiro de uma vez" contra "campos que mudam".
- **Cenário 2** pode virar **combinação**: relacional para preço e estoque (precisa ser consistente) e documentos para a descrição detalhada.
- Um cenário muito bom de discordância é o **1**: alguém pode propor documentos "porque é mais fácil". O contra-argumento é o dinheiro: se um dado copiado ficar errado, a loja cobra ou repassa o valor errado.

### 🚀 Resposta esperada para a pergunta em dupla

Qualquer resposta com a mesma ideia vale. Um sistema real **combina** os três porque **cada parte faz uma pergunta diferente**:

- **Para o time:** o relatório de vendas, o cadastro do catálogo e a busca "parecido com isto" têm exigências diferentes (consistência, flexibilidade, significado). Um banco só atenderia mal a pelo menos uma delas.
- **Para o cliente:** ele quer o pedido sempre correto (relacional), o catálogo rápido de abrir (documentos) e uma busca que o entenda (semântica). Cada parte do app que ele usa pede um tipo diferente.

---

## Exercício 1: A vitrine 🟢

**1. Os 3 mais baratos:**

```sql
SELECT nome, preco
FROM produto
ORDER BY preco
LIMIT 3;
```

```
        nome         | preco
---------------------+-------
 Caneca              |    25
 Luminária           |    60
 Livro de JavaScript |    80
(3 linhas)
```

**2. Os produtos de livros:**

```sql
SELECT nome, preco
FROM produto
WHERE categoria_id = 2
ORDER BY nome;
```

```
        nome         | preco
---------------------+-------
 Livro de JavaScript |    80
 Livro de SQL        |    90
(2 linhas)
```

**3. Quantos produtos:**

```sql
SELECT COUNT(*) AS produtos
FROM produto;
```

```
 produtos
----------
        6
(1 linha)
```

**Por que funciona:** `ORDER BY preco` (do menor para o maior) com `LIMIT 3` pega os três mais baratos. O `WHERE categoria_id = 2` filtra pelo número da categoria de livros. O `COUNT(*)` conta as linhas da tabela.

---

## Exercício 2: O relatório por vendedor 🟡

**1. Produtos por vendedor:**

```sql
SELECT vendedor.nome_loja, COUNT(produto.id) AS produtos
FROM vendedor
JOIN produto ON produto.vendedor_id = vendedor.id
GROUP BY vendedor.nome_loja
ORDER BY vendedor.nome_loja;
```

```
  nome_loja   | produtos
--------------+----------
 CasaViva     |        2
 Livraria Sol |        2
 TechBahia    |        2
(3 linhas)
```

**2. Unidades vendidas, inclusive os produtos sem venda:**

```sql
SELECT produto.nome, COALESCE(SUM(item_pedido.quantidade), 0) AS unidades_vendidas
FROM produto
LEFT JOIN item_pedido ON item_pedido.produto_id = produto.id
GROUP BY produto.nome
ORDER BY unidades_vendidas DESC, produto.nome;
```

```
        nome         | unidades_vendidas
---------------------+-------------------
 Livro de JavaScript |                 3
 Livro de SQL        |                 3
 Mouse               |                 3
 Luminária           |                 2
 Teclado             |                 2
 Caneca              |                 0
(6 linhas)
```

**3. Clientes que gastaram mais de R$ 200 (pedidos entregues):**

```sql
SELECT cliente.nome, SUM(item_pedido.quantidade * item_pedido.preco_unitario) AS gasto
FROM item_pedido
JOIN pedido ON pedido.id = item_pedido.pedido_id
JOIN cliente ON cliente.id = pedido.cliente_id
WHERE pedido.status = 'entregue'
GROUP BY cliente.nome
HAVING SUM(item_pedido.quantidade * item_pedido.preco_unitario) > 200
ORDER BY gasto DESC;
```

```
    nome    | gasto
------------+-------
 Ana Souza  |   550
 Bruno Lima |   220
(2 linhas)
```

**Por que funciona:**
- **Item 1:** o `JOIN` liga `vendedor` e `produto`; o `COUNT(produto.id)` conta os produtos de cada cesta do `GROUP BY`.
- **Item 2:** o `LEFT JOIN` mantém a **Caneca**, que não tem venda. Na linha dela, o `SUM` dá `NULL`, e o `COALESCE(..., 0)` troca por `0`.
- **Item 3:** o filtro `status = 'entregue'` vai no `WHERE` (antes de somar) e o `> 200` vai no `HAVING` (depois de somar). O **Davi** gastou exatamente 200, então **não** aparece (`>` e não `>=`). O pedido da Carla (cancelado) e o pedido 6 do Bruno (pendente) não entram.

---

## Exercício 3: Relacional ou documento? 🟢

**1. O pedido 3 como documento:**

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

**Por que funciona:** o `cliente` é um objeto **dentro** do pedido, e os `itens` são uma **lista** de objetos. O nome do produto veio da tabela `produto`, e a região, da tabela `regiao` (os dois `JOIN` que o relacional faria já estão resolvidos, **copiados** dentro do documento).

**2. Uma vantagem:** a tela de detalhes do pedido é montada com **uma leitura só**, sem `JOIN` em 4 tabelas.

**3. Um custo:** o nome e a região da Ana ficam **copiados em cada pedido dela**. Se ela mudar de região, é preciso atualizar **todos** os pedidos, e esquecer um deixa a Ana com **duas regiões** (a anomalia de atualização da Aula 1, no `documentos.js`).

**4. Exemplos de resposta para o comentário** (qualquer argumento vale):
- **Embutir o nome:** o pedido é um **retrato da compra**. O nome e a região da **época** são o que o pedido precisa guardar. Se a Ana mudar de região, o pedido antigo **não** deveria mudar (é o `preco_unitario` outra vez).
- **Referenciar o cliente:** se o nome deve refletir sempre o cadastro atual, guarda-se só o `clienteId` e busca-se o cadastro. É mais um acesso, mas só existe **uma cópia**.
- O importante é a **pergunta**: "esse dado deve mudar junto, ou é um fato histórico?"

---

## Exercício 4: O painel do dono 🔴

**1. O faturamento por região:**

```sql
SELECT regiao.nome, SUM(item_pedido.quantidade * item_pedido.preco_unitario) AS faturamento
FROM item_pedido
JOIN pedido ON pedido.id = item_pedido.pedido_id
JOIN cliente ON cliente.id = pedido.cliente_id
JOIN regiao ON regiao.id = cliente.regiao_id
WHERE pedido.status = 'entregue'
GROUP BY regiao.nome
ORDER BY faturamento DESC;
```

```
   nome   | faturamento
----------+-------------
 Nordeste |         750
 Sudeste  |         220
(2 linhas)
```

**2. A comissão da plataforma por vendedor:**

```sql
SELECT vendedor.nome_loja, ROUND(SUM(item_pedido.quantidade * item_pedido.preco_unitario * categoria.comissao) / 100.0, 2) AS comissao
FROM item_pedido
JOIN pedido ON pedido.id = item_pedido.pedido_id
JOIN produto ON produto.id = item_pedido.produto_id
JOIN vendedor ON vendedor.id = produto.vendedor_id
JOIN categoria ON categoria.id = produto.categoria_id
WHERE pedido.status = 'entregue'
GROUP BY vendedor.nome_loja
ORDER BY vendedor.nome_loja;
```

```
  nome_loja   | comissao
--------------+----------
 CasaViva     |    12.00
 Livraria Sol |    76.50
 TechBahia    |    27.20
(3 linhas)
```

**3. O cliente que mais gastou:**

```sql
SELECT cliente.nome, SUM(item_pedido.quantidade * item_pedido.preco_unitario) AS gasto
FROM item_pedido
JOIN pedido ON pedido.id = item_pedido.pedido_id
JOIN cliente ON cliente.id = pedido.cliente_id
WHERE pedido.status = 'entregue'
GROUP BY cliente.nome
ORDER BY gasto DESC
LIMIT 1;
```

```
   nome    | gasto
-----------+-------
 Ana Souza |   550
(1 linha)
```

**Por que funciona:**
- **Item 1:** o caminho é `item_pedido` → `pedido` → `cliente` → `regiao`. O Sul não aparece: a única compra da Carla foi **cancelada**, e o `WHERE` a tira antes de somar. O Nordeste soma 750: Ana 550 + Davi 200.
- **Item 2:** cinco tabelas. A comissão está na `categoria` e o agrupamento é por vendedor (`vendedor.nome_loja`). A conta é a mesma da Query 8 da aula, só que agrupada por outra coisa. O TechBahia tem `120 × 8 / 100 + 220 × 8 / 100 = 9.6 + 17.6 = 27.2`.
- **Item 3:** é o `gasto` por cliente, do maior para o menor (`ORDER BY ... DESC`), e `LIMIT 1` pega só o primeiro. A Ana gastou 550.

**Exemplos de resposta para os comentários (item 4):**

- **Clear Thinking:** o campo "um presente para quem gosta de café" é uma pergunta de **significado**, e o catálogo não tem a palavra em muitos nomes. Quem resolve é a **busca semântica**: o embedding da consulta fica **perto** de produtos como cafeteira, moedor e caneca, sem a palavra "café". O relacional (e a busca por palavra) só acharia quem tem o texto igual.
- **Discordância Positiva (qualquer argumento vale):**
  - **Contra "tudo num banco de documentos":** pedidos e pagamentos são **dinheiro**. Se um dado ficar copiado em vários lugares e um deles divergir, a loja cobra ou repassa o valor errado. O relacional garante **cada dado em um lugar só**.
  - **A favor (um jeito justo de concordar):** para **ler** o pedido inteiro rápido, o documento é ótimo. Por isso muitos sistemas guardam o pedido no relacional e **uma cópia pronta para leitura** num banco de documentos.
  - O importante é **defender com motivo**.

---

## ❓ Dúvidas que costumam aparecer

**"O meu resultado ficou igual ao esperado, mas a consulta está escrita diferente. Está errado?"**
Não. Se o resultado é igual, está certo. Em SQL, `JOIN` e `INNER JOIN` são a mesma coisa, e a ordem de escrever as colunas muda só a ordem delas na tela.

**"Deu `must appear in the GROUP BY clause or be used in an aggregate function`."**
Há uma coluna no `SELECT` que não está no `GROUP BY` nem dentro de uma função como `SUM` ou `COUNT`. Ou ela entra no `GROUP BY`, ou vira uma agregação.

**"Deu `column reference "id" is ambiguous`."**
O `id` existe em mais de uma tabela. Escreva `tabela.id` (por exemplo, `pedido.id`).

**"Deu `aggregate functions are not allowed in WHERE`."**
O `WHERE` roda **antes** de agrupar, então não conhece o `COUNT` nem o `SUM`. Filtros sobre o resultado de uma agregação vão no `HAVING`.

**"O `JOIN` devolveu um monte de linhas a mais."**
Quase sempre faltou o `ON` (ou ele está ligando as colunas erradas). Sem o `ON`, o banco combina **cada linha de uma tabela com cada linha da outra**: 7 pedidos × 5 clientes = 35 linhas.

**"A Eva apareceu com 1 pedido."**
Você usou `COUNT(*)` num `LEFT JOIN`. O `COUNT(*)` conta a linha que o `LEFT JOIN` manteve. Use `COUNT(pedido.id)`, que só conta pedidos que existem.

**"Não achei o cliente sem pedido com `= NULL`."**
`= NULL` nunca é verdadeiro e devolve **0 linhas, sem erro**. A pergunta certa é `IS NULL`.

**"No SQLite os números aparecem diferentes (`12` em vez de `12.00`)."**
É só a forma de mostrar. O valor é o mesmo. O PostgreSQL mostra as casas decimais de um `ROUND(..., 2)`; o SQLite não mostra os zeros.

**"O embedding do `busca-semantica.js` é de verdade?"**
Não. São **3 números escritos à mão**, só para mostrar a ideia. Os embeddings de verdade vêm de um **modelo** e têm centenas de números. Isso fica para o M4.

---

**Conseguiu resolver tudo?** Ótimo! Agora **escolha uma pergunta de negócio** de um app que você usa e escreva a consulta que a responde. Quem consegue criar o problema entende o conteúdo de verdade. 🚀