# 🏠 Atividades Assíncronas (para casa)

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

2. **Criar um modelo desnormalizado da tabela do exercício 1** para relatórios e justifique quando usar

3. **Ler capítulo sobre Views** no PostgreSQL Docs

## 📘 Lista de Exercícios – SQL com Dataset `juliaostore.sql`

## 📌 Parte 1 – Consultas Básicas
1. **Liste todos os clientes cadastrados.**
   💡 *Dica: SELECT simples na tabela Clientes*

2. **Liste todos os produtos da categoria "Acessórios".**
   💡 *Dica: WHERE com filtro de categoria*

3. **Mostre todos os pedidos feitos por Ana Silva.**
   💡 *Dica: JOIN entre Clientes e Pedidos + filtro no nome*

---

## 📌 Parte 2 – Consultas Intermediárias

4. **Exiba o valor total de cada pedido.**
   💡 *Dica: Preciso multiplicar quantidade × preço, depois somar por pedido*
   🤔 *Quais tabelas conectar? Pedidos → ItensPedido → Produtos*

5. **Traga o total gasto por cada cliente.**
   💡 *Dica: Expandir a consulta anterior agrupando por cliente*

6. **Mostre os produtos mais vendidos em quantidade.**
   💡 *Dica: SUM(Quantidade) GROUP BY Produto + ORDER BY DESC*

---

## 📌 Parte 3 – Consultas Avançadas

7. **Liste os clientes que já compraram mais de um tipo diferente de produto.**
   💡 *Dica: COUNT(DISTINCT ProdutoID) > 1*

8. **Mostre os pedidos cujo valor total foi acima de R$ 3000.**
   💡 *Dica: Use a consulta do exercício 4 + HAVING*

9. **Calcule o ticket médio dos clientes (média de valor gasto por pedido).**
   💡 *Dica: AVG() da soma dos subtotais*

10. **Liste os clientes que nunca fizeram pedidos.**
    💡 *Dica: LEFT JOIN + WHERE campo IS NULL*

---

## 🎯 Desafios Extras (Para os Ninjas!)

11. **Qual produto gerou mais receita total?**
12. **Quantos clientes compraram em setembro de 2025?**
13. **Qual a diferença entre o maior e menor ticket de pedido?**
