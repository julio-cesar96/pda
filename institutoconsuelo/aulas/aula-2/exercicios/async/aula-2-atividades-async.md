## 🏠 Atividades Assíncronas (para casa)
1. **Normalizar** a tabela PedidosProblematicos até 3FN
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

2. **Criar um modelo desnormalizado da tabela PedidosProblematicos** para relatórios e justificar quando usar
3. **Resolver todos os exercícios** da lista (1-10)
4. **Tentar os desafios extras** (11-13)
5. **Ler capítulo sobre Views** no PostgreSQL Docs