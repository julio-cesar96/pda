// O cozinheiro da praça de vendedores. Os vendedores continuam na memória.
const vendedores = [
  { id: 1, nomeLoja: 'TechBahia' },
  { id: 2, nomeLoja: 'Livraria Sol' },
];

// GET /vendedores
export function listar(req, res) {
  res.json(vendedores);
}

// GET /vendedores/:id
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const vendedor = vendedores.find((v) => v.id === id);

  if (!vendedor) {
    return res.status(404).json({ erros: ['Vendedor não encontrado'] });
  }
  res.json(vendedor);
}
