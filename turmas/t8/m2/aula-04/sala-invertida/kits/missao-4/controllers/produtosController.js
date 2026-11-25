import { Produto } from '../models/Produto.js';

// O cozinheiro da praça de produtos, agora buscando no BANCO.
// O "await" espera o banco responder antes de seguir para a próxima linha.

// GET /produtos
export async function listar(req, res) {
  const produtos = await Produto.findAll();
  res.json(produtos);
}

// GET /produtos/:id
export async function buscarPorId(req, res) {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }
  res.json(produto);
}

// POST /produtos
export async function criar(req, res) {
  const { nome, preco } = req.body;
  const novo = await Produto.create({ nome, preco });
  res.status(201).json(novo);
}

// PUT /produtos/:id
export async function atualizar(req, res) {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }

  const { nome, preco } = req.body;
  await produto.update({ nome, preco });
  res.json(produto);
}

// DELETE /produtos/:id
export async function remover(req, res) {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erros: ['Produto não encontrado'] });
  }

  await produto.destroy();
  res.status(204).send();
}
