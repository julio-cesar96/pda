// O "cozinheiro" da praça de produtos: recebe o pedido e prepara a resposta.
// Por enquanto, os produtos moram na memória.
let produtos = [
  { id: 1, nome: 'Mouse', preco: 120 },
  { id: 2, nome: 'Teclado', preco: 350 },
  { id: 3, nome: 'Livro de JavaScript', preco: 80 },
];
let proximoId = 4;

// GET /produtos
export function listar(req, res) {
  res.json(produtos);
}

// GET /produtos/:id
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }
  res.json(produto);
}

// POST /produtos
export function criar(req, res) {
  const { nome, preco } = req.body;
  const novo = { id: proximoId, nome, preco };
  proximoId++;

  produtos.push(novo);
  res.status(201).json(novo);
}

// PUT /produtos/:id
export function atualizar(req, res) {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }

  const { nome, preco } = req.body;
  produto.nome = nome;
  produto.preco = preco;
  res.json(produto);
}

// DELETE /produtos/:id
export function remover(req, res) {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }

  produtos = produtos.filter((p) => p.id !== id);
  res.status(204).send();
}
