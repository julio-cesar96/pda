const produto = {
    nome: "Camiseta",
    preco: 29.99,
    descricao: "Camiseta 100% algodão, confortável e estilosa."
}

const cardNode = document.createElement('div'); //  quando a gente precisar adicionar eventos ou manipular o elemento, é melhor criar o nó assim
cardNode.classList.add('card');


const cardHTML = `
    <div class="card">
        <h2>${produto.nome}</h2>
        <p class="descricao">${produto.descricao}</p>
        <p class="preco">Preço: R$ ${produto.preco.toFixed(2)}</p>
        <button class="btn-comprar">Comprar</button>
    </div>
` // quando a gente só precisa adicionar o elemento, é mais simples criar o HTML como string

console.log(typeof cardHTML);
console.log(typeof cardNode);


document.body.innerHTML += cardHTML; // adiciona o elemento ao corpo do documento
