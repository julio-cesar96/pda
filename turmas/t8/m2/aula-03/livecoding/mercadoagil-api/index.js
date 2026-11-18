import express from "express";

// criar o servidor 
const app = express();

// dados em memoria
const produtos = [
    { id: 1, nome: "Mouse", preco: 10.99 },
    { id: 2, nome: "Teclado", preco: 20.99 },
    { id: 3, nome: "Livro de Javascript", preco: 30.99 }
];

const vendedores = [
    {id: 1, nomeLoja: "Tech Store"},
    {id: 2, nomeLoja: "Book Store"}
]

// Rota: quando chegar um GET na raiz (/), responder com uma mensagem de boas vindas
app.get('/', (req, res) => {
    res.send("Bem vindo a API do Mercado Ágil");
});

// Rota: quando chegar um GET em /produtos, responder com a lista de produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// Rota: quando chegar um GET em /vendedores, responder com a lista de vendedores
app.get('/vendedores', (req, res) => {
    res.json(vendedores);
});

// ligando o servidor
app.listen(3000, (erro) => {
    if (erro) {
       return console.log("Erro ao iniciar o servidor: ", erro);
    }
    
    console.log("Servidor iniciado com sucesso na porta 3000");
});