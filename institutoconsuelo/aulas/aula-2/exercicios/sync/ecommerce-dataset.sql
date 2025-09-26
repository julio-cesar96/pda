-- Tabela de Clientes
CREATE TABLE Clientes (
    ClienteID SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Telefone VARCHAR(20)
);

-- Tabela de Produtos
CREATE TABLE Produtos (
    ProdutoID SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Preco DECIMAL(10,2) NOT NULL,
    Categoria VARCHAR(50)
);

-- Tabela de Pedidos
CREATE TABLE Pedidos (
    PedidoID SERIAL PRIMARY KEY,
    ClienteID INT NOT NULL,
    DataPedido DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
);

-- Tabela de Itens do Pedido
CREATE TABLE ItensPedido (
    ItemID SERIAL PRIMARY KEY,
    PedidoID INT NOT NULL,
    ProdutoID INT NOT NULL,
    Quantidade INT NOT NULL CHECK (Quantidade > 0),
    FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID),
    FOREIGN KEY (ProdutoID) REFERENCES Produtos(ProdutoID)
);

-- Inserção de dados fictícios
INSERT INTO Clientes (Nome, Email, Telefone) VALUES
('Ana Silva', 'ana@email.com', '11999999999'),
('Bruno Costa', 'bruno@email.com', '21988888888'),
('Carla Souza', 'carla@email.com', '31977777777');

INSERT INTO Produtos (Nome, Preco, Categoria) VALUES
('Notebook Gamer', 5500.00, 'Eletrônicos'),
('Mouse Sem Fio', 120.00, 'Acessórios'),
('Teclado Mecânico', 350.00, 'Acessórios'),
('Cadeira Gamer', 1500.00, 'Móveis');

INSERT INTO Pedidos (ClienteID, DataPedido) VALUES
(1, '2025-09-01'),
(2, '2025-09-05'),
(1, '2025-09-10');

INSERT INTO ItensPedido (PedidoID, ProdutoID, Quantidade) VALUES
(1, 1, 1), -- Ana comprou um Notebook
(1, 2, 2), -- Ana comprou 2 Mouses
(2, 4, 1), -- Bruno comprou 1 Cadeira Gamer
(3, 3, 1), -- Ana comprou 1 Teclado
(3, 2, 1); -- Ana comprou 1 Mouse

-- View para facilitar consultas (Momento "Aha!")
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