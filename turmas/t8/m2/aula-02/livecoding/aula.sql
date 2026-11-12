-- Consultas da aula. Rode o setup.sql primeiro e depois uma consulta de cada vez.

-- ===== Bloco 1: consultar =====

-- S1
SELECT * FROM produto;

-- S2
SELECT nome, preco
FROM produto
WHERE preco > 100
ORDER BY preco DESC;

-- S3
SELECT nome
FROM produto
WHERE nome LIKE 'Livro%';

-- S4
SELECT nome, preco
FROM produto
ORDER BY preco DESC
LIMIT 3;

-- ===== Bloco 2: JOIN =====

-- J1
SELECT pedido.id, cliente.nome, pedido.status
FROM pedido
JOIN cliente ON cliente.id = pedido.cliente_id
ORDER BY pedido.id;

-- J2
SELECT produto.nome, categoria.nome AS categoria, vendedor.nome_loja
FROM produto
JOIN categoria ON categoria.id = produto.categoria_id
JOIN vendedor ON vendedor.id = produto.vendedor_id
ORDER BY produto.id;

-- J3
SELECT pedido.id AS pedido, produto.nome, item_pedido.quantidade, item_pedido.preco_unitario
FROM item_pedido
JOIN pedido ON pedido.id = item_pedido.pedido_id
JOIN produto ON produto.id = item_pedido.produto_id
WHERE pedido.id = 3;

-- J4
SELECT cliente.nome, pedido.id AS pedido
FROM cliente
LEFT JOIN pedido ON pedido.cliente_id = cliente.id
ORDER BY cliente.id, pedido.id;

-- J5
SELECT cliente.nome
FROM cliente
LEFT JOIN pedido ON pedido.cliente_id = cliente.id
WHERE pedido.id IS NULL;

-- J6
SELECT produto.nome, item_pedido.pedido_id AS pedido, item_pedido.preco_unitario, produto.preco AS preco_atual
FROM item_pedido
JOIN produto ON produto.id = item_pedido.produto_id
WHERE item_pedido.preco_unitario <> produto.preco;

-- ===== Bloco 3: agregações =====

-- A1
SELECT COUNT(*) AS total_pedidos
FROM pedido;

-- A2
SELECT MIN(preco) AS menor, MAX(preco) AS maior, ROUND(AVG(preco), 2) AS media
FROM produto;

-- A3
SELECT cliente.nome, COUNT(pedido.id) AS pedidos
FROM cliente
LEFT JOIN pedido ON pedido.cliente_id = cliente.id
GROUP BY cliente.nome
ORDER BY pedidos DESC, cliente.nome;

-- A4
SELECT cliente.nome, COUNT(pedido.id) AS pedidos
FROM cliente
JOIN pedido ON pedido.cliente_id = cliente.id
GROUP BY cliente.nome
HAVING COUNT(pedido.id) >= 2
ORDER BY pedidos DESC, cliente.nome;

-- A5
SELECT categoria.nome, SUM(item_pedido.quantidade * item_pedido.preco_unitario) AS faturamento
FROM item_pedido
JOIN produto ON produto.id = item_pedido.produto_id
JOIN categoria ON categoria.id = produto.categoria_id
GROUP BY categoria.nome
ORDER BY faturamento DESC;