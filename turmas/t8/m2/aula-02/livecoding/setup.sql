-- MercadoÁgil: parte do DER da Aula 1 (sem estoque e sem cupom, para ficar curto)

CREATE TABLE regiao (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  taxa_frete INTEGER NOT NULL
);

CREATE TABLE cliente (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  regiao_id INTEGER NOT NULL REFERENCES regiao (id)
);

CREATE TABLE vendedor (
  id INTEGER PRIMARY KEY,
  nome_loja TEXT NOT NULL
);

CREATE TABLE categoria (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  comissao INTEGER NOT NULL
);

CREATE TABLE produto (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  preco INTEGER NOT NULL,
  vendedor_id INTEGER NOT NULL REFERENCES vendedor (id),
  categoria_id INTEGER NOT NULL REFERENCES categoria (id)
);

CREATE TABLE pedido (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES cliente (id),
  status TEXT NOT NULL,
  criado_em DATE NOT NULL
);

CREATE TABLE item_pedido (
  pedido_id INTEGER NOT NULL REFERENCES pedido (id),
  produto_id INTEGER NOT NULL REFERENCES produto (id),
  quantidade INTEGER NOT NULL,
  preco_unitario INTEGER NOT NULL,
  PRIMARY KEY (pedido_id, produto_id)
);

INSERT INTO regiao (id, nome, taxa_frete) VALUES
  (1, 'Nordeste', 25),
  (2, 'Sudeste', 20),
  (3, 'Sul', 22);

INSERT INTO cliente (id, nome, email, regiao_id) VALUES
  (1, 'Ana Souza', 'ana@email.com', 1),
  (2, 'Bruno Lima', 'bruno@email.com', 2),
  (3, 'Carla Dias', 'carla@email.com', 3),
  (4, 'Davi Nunes', 'davi@email.com', 1),
  (5, 'Eva Rocha', 'eva@email.com', 2);

INSERT INTO vendedor (id, nome_loja) VALUES
  (1, 'TechBahia'),
  (2, 'Livraria Sol'),
  (3, 'CasaViva');

INSERT INTO categoria (id, nome, comissao) VALUES
  (1, 'eletronicos', 8),
  (2, 'livros', 15),
  (3, 'casa', 10);

INSERT INTO produto (id, nome, preco, vendedor_id, categoria_id) VALUES
  (1, 'Mouse', 120, 1, 1),
  (2, 'Teclado', 350, 1, 1),
  (3, 'Livro de JavaScript', 80, 2, 2),
  (4, 'Livro de SQL', 90, 2, 2),
  (5, 'Luminária', 60, 3, 3),
  (6, 'Caneca', 25, 3, 3);

INSERT INTO pedido (id, cliente_id, status, criado_em) VALUES
  (1, 1, 'entregue', '2026-10-02'),
  (2, 2, 'entregue', '2026-10-05'),
  (3, 1, 'entregue', '2026-10-12'),
  (4, 3, 'cancelado', '2026-10-14'),
  (5, 4, 'entregue', '2026-10-20'),
  (6, 2, 'pendente', '2026-10-25'),
  (7, 1, 'entregue', '2026-10-28');

INSERT INTO item_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
  (1, 1, 1, 120),
  (1, 3, 1, 80),
  (2, 1, 2, 110),
  (3, 3, 1, 80),
  (3, 4, 1, 90),
  (4, 2, 1, 350),
  (5, 5, 2, 60),
  (5, 3, 1, 80),
  (6, 2, 1, 350),
  (7, 4, 2, 90);