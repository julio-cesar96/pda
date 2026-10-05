// modelar um carrinho de compras

/*
[
    {
        produto: "Notebook",
        quantidade: 1,
        preco: 3500.00
    },
    {
        produto: "Mouse",
        quantidade: 2,
        preco: 100.00
    },
    {
        produto: "Teclado",
        quantidade: 1,
        preco: 250.00
    }
]
*/


// Bloco 1 - Desestruturando o array de objetos
// Objetivo: pega parte de um array de objetos e transforma em variáveis

const pedido = {
    cliente: {
        nome: "Marlon",
        cpf: "123.456.789-00",
    },
    carrinho: [
        {
            produto: "Notebook",
            quantidade: 1,
            preco: 3500.00
        },
        {
            produto: "Mouse",
            quantidade: 2,
            preco: 100.00
        },
        {
            produto: "Teclado",
            quantidade: 1,
            preco: 250.00
        }
    ],
    pagamento: "pix",
};

console.log(pedido.carrinho[1].preco);// 100

const { cliente, carrinho, pagamento } = pedido;
console.log(cliente.nome); // Marlon
console.log(pagamento); // pix

const { cupom = 'SEM CUPOM' } = pedido;
console.log(pedido);

const[primeiroitem, segundoItem] = carrinho;
console.log(primeiroitem.produto); // Notebook
console.log(segundoItem.produto); // Mouse

// Bloco 2 - Spread e o bug do apelido
// objetivo: copia um objeto sem estragar o original

const teclado = {
    nome: "LogiTECH K120",
    preco: 250.00,
}

const apelido = teclado;
apelido.preco = 280;
console.log(teclado.preco);