// objeto - chave e valor
const produto = {
    nome: "x-burguer",
    preco: 10.90,
    descricao: "Delicioso x-burguer com queijo e bacon",
    quantidadeEmEstoque: 10
}

//console.log(produto.nome) // x-burguer
//console.log(produto.preco) // 10.90

// array 
const alunosT8 = ["Cleisson", "João", "Maria", "José", "Ana"];
//console.log(alunosT8[2]); 

// array de objetos
const carrinho = [
    {
        produto: "Arroz",
        preco: 10.90,
    },
    {
        produto: "Feijão",
        preco: 8.50,
    },
    {
        produto: "Macarrão",
        preco: 5.90,
    }
]

console.log(carrinho[0].preco)

// Destruturação de objetos
const cliente = {
    nome: "Cleisson",
    email: "cleisson@gmail.com",
    cpf: "123.456.789-00"
}
// forma longa
const nomeCliente = cliente.nome;
const emailCliente = cliente.email;
const cpfCliente = cliente.cpf;

// forma curta
const { nome, email, cpf } = cliente;

console.log(nome)
console.log(email)
console.log(cpf)