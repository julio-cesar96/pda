// O cozinheiro da praça de vendedores
const vendedores = [
  { id: 1, nomeLoja: 'TechBahia' },
  { id: 2, nomeLoja: 'Livraria Sol' },
];

// GET /vendedores
export function listar(req, res) {
  res.json(vendedores);
}
