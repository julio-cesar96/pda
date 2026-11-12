// Cada "tabela" é um array de objetos. A ligação entre elas é feita por id.
const regioes = [
  { id: 1, nome: 'Nordeste', taxaFrete: 25 },
  { id: 2, nome: 'Sudeste', taxaFrete: 20 },
];
const clientes = [
  { id: 1, nome: 'Ana Souza', email: 'ana@email.com', regiaoId: 1 },
  { id: 2, nome: 'Bruno Lima', email: 'bruno@email.com', regiaoId: 2 },
];
const vendedores = [
  { id: 1, nomeLoja: 'TechBahia' },
  { id: 2, nomeLoja: 'Livraria Sol' },
];
const categorias = [
  { id: 1, nome: 'eletronicos', comissao: 8 },
  { id: 2, nome: 'livros', comissao: 15 },
];
const produtos = [
  { id: 1, nome: 'Mouse', preco: 120, vendedorId: 1, categoriaId: 1 },
  { id: 2, nome: 'Livro de JavaScript', preco: 80, vendedorId: 2, categoriaId: 2 },
];
const estoque = [
  { produtoId: 1, quantidade: 10 },
  { produtoId: 2, quantidade: 4 },
];
const pedidos = [
  { id: 1, clienteId: 1 },
  { id: 2, clienteId: 2 },
  { id: 3, clienteId: 1 },
];
const itensPedido = [
  { pedidoId: 1, produtoId: 1, quantidade: 1, precoUnitario: 120 },
  { pedidoId: 1, produtoId: 2, quantidade: 1, precoUnitario: 80 },
  { pedidoId: 2, produtoId: 1, quantidade: 2, precoUnitario: 120 },
  { pedidoId: 3, produtoId: 2, quantidade: 1, precoUnitario: 80 },
];

// 1:N e 1:1 - o produto guarda só os ids; montamos a ficha completa buscando cada um
function montarProduto(idDoProduto) {
  const produto = produtos.find(p => p.id === idDoProduto);
  const vendedor = vendedores.find(v => v.id === produto.vendedorId);
  const categoria = categorias.find(c => c.id === produto.categoriaId);
  const saldo = estoque.find(e => e.produtoId === produto.id);
  return {
    nome: produto.nome,
    preco: produto.preco,
    vendedor: vendedor.nomeLoja,
    categoria: categoria.nome,
    estoque: saldo.quantidade,
  };
}

// N:N - o pedido e os produtos se encontram na tabela itensPedido
function montarPedido(idDoPedido) {
  const pedido = pedidos.find(p => p.id === idDoPedido);
  const cliente = clientes.find(c => c.id === pedido.clienteId);
  const regiao = regioes.find(r => r.id === cliente.regiaoId);
  const itens = itensPedido.filter(i => i.pedidoId === idDoPedido);
  const subtotal = itens.reduce((soma, i) => soma + i.quantidade * i.precoUnitario, 0);
  return {
    id: pedido.id,
    cliente: cliente.nome,
    regiao: regiao.nome,
    frete: regiao.taxaFrete,
    quantidadeDeItens: itens.length,
    subtotal,
  };
}

console.log(montarProduto(1));
console.log(montarPedido(1));
console.log(montarPedido(2));

// N:N visto do outro lado: em quais pedidos o Mouse aparece?
const mouse = produtos.find(p => p.nome === 'Mouse');
const pedidosComMouse = itensPedido
  .filter(item => item.produtoId === mouse.id)
  .map(item => item.pedidoId);
console.log(pedidosComMouse);

// O preço do Mouse sobe, mas o pedido antigo continua com o preço da época
const produtosReajustados = produtos.map(p => (p.id === 1 ? { ...p, preco: 130 } : p));
console.log(produtosReajustados[0].preco, montarPedido(1).subtotal);
