// O cozinheiro da praça de produtos: recebe o pedido e prepara a resposta
const produtos = [
  { id: 1, nome: 'Mouse', preco: 120 },
  { id: 2, nome: 'Teclado', preco: 350 },
  { id: 3, nome: 'Livro de JavaScript', preco: 80 },
];

// GET /produtos
export function listar(req, res) {
  res.json(produtos);
}
