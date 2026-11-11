// O mesmo MercadoÁgil, agora como DOCUMENTOS: cada pedido carrega o cliente e os itens dentro dele.
const pedidos = [
  { _id: 1, cliente: { nome: 'Ana Souza', regiao: 'Nordeste' }, status: 'entregue', criadoEm: '2026-10-02',
    itens: [{ produto: 'Mouse', quantidade: 1, precoUnitario: 120 }, { produto: 'Livro de JavaScript', quantidade: 1, precoUnitario: 80 }] },
  { _id: 2, cliente: { nome: 'Bruno Lima', regiao: 'Sudeste' }, status: 'entregue', criadoEm: '2026-10-05',
    itens: [{ produto: 'Mouse', quantidade: 2, precoUnitario: 110 }] },
  { _id: 3, cliente: { nome: 'Ana Souza', regiao: 'Nordeste' }, status: 'entregue', criadoEm: '2026-10-12',
    itens: [{ produto: 'Livro de JavaScript', quantidade: 1, precoUnitario: 80 }, { produto: 'Livro de SQL', quantidade: 1, precoUnitario: 90 }] },
  { _id: 4, cliente: { nome: 'Carla Dias', regiao: 'Sul' }, status: 'cancelado', criadoEm: '2026-10-14',
    itens: [{ produto: 'Teclado', quantidade: 1, precoUnitario: 350 }] },
  { _id: 5, cliente: { nome: 'Davi Nunes', regiao: 'Nordeste' }, status: 'entregue', criadoEm: '2026-10-20',
    itens: [{ produto: 'Luminária', quantidade: 2, precoUnitario: 60 }, { produto: 'Livro de JavaScript', quantidade: 1, precoUnitario: 80 }] },
  { _id: 6, cliente: { nome: 'Bruno Lima', regiao: 'Sudeste' }, status: 'pendente', criadoEm: '2026-10-25',
    itens: [{ produto: 'Teclado', quantidade: 1, precoUnitario: 350 }] },
  { _id: 7, cliente: { nome: 'Ana Souza', regiao: 'Nordeste' }, status: 'entregue', criadoEm: '2026-10-28',
    itens: [{ produto: 'Livro de SQL', quantidade: 2, precoUnitario: 90 }] },
];

// 1) Ler um pedido inteiro: UMA busca, sem JOIN
const pedido3 = pedidos.find(p => p._id === 3);
console.log(pedido3.cliente.nome, pedido3.itens.length);

// 2) Os pedidos da Ana
console.log(pedidos.filter(p => p.cliente.nome === 'Ana Souza').map(p => p._id));

// 3) Gasto por cliente (só pedidos entregues): o "GROUP BY" feito à mão
const gastoPorCliente = pedidos
  .filter(p => p.status === 'entregue')
  .reduce((gasto, p) => {
    const totalDoPedido = p.itens.reduce((soma, i) => soma + i.quantidade * i.precoUnitario, 0);
    return { ...gasto, [p.cliente.nome]: (gasto[p.cliente.nome] || 0) + totalDoPedido };
  }, {});
console.log(gastoPorCliente);

// 4) O custo da cópia: a Ana mudou de região, mas só o pedido 1 foi corrigido
const depoisDaMudanca = pedidos.map(p =>
  p._id === 1 ? { ...p, cliente: { ...p.cliente, regiao: 'Sudeste' } } : p
);
console.log(depoisDaMudanca.filter(p => p.cliente.nome === 'Ana Souza').map(p => p.cliente.regiao));