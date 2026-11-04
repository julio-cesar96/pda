// A planilha do MercadoÁgil: uma linha por item vendido
const planilha = [
  { pedido: 1, cliente: 'Ana Souza', email: 'ana@email.com', regiao: 'Nordeste', taxaFrete: 25, produto: 'Mouse', quantidade: 1 },
  { pedido: 1, cliente: 'Ana Souza', email: 'ana@email.com', regiao: 'Nordeste', taxaFrete: 25, produto: 'Livro de JavaScript', quantidade: 1 },
  { pedido: 2, cliente: 'Bruno Lima', email: 'bruno@email.com', regiao: 'Sudeste', taxaFrete: 20, produto: 'Mouse', quantidade: 2 },
  { pedido: 3, cliente: 'Ana Souza', email: 'ana@email.com', regiao: 'Nordeste', taxaFrete: 25, produto: 'Livro de JavaScript', quantidade: 1 },
];

// Problema 1: a Ana mudou de email. A atendente corrige só as linhas do pedido 1...
const atualizada = planilha.map(linha =>
  linha.pedido === 1 ? { ...linha, email: 'ana.souza@novo.com' } : linha
);
const emailsDaAna = atualizada
  .filter(linha => linha.cliente === 'Ana Souza')
  .map(linha => linha.email);
console.log(emailsDaAna);

// Problema 2: o pedido 2 foi apagado. O Bruno some junto?
const semPedido2 = planilha.filter(linha => linha.pedido !== 2);
console.log(semPedido2.find(linha => linha.cliente === 'Bruno Lima'));

// Solução: cada informação mora em UM lugar só
const clientes = [
  { id: 1, nome: 'Ana Souza', email: 'ana@email.com' },
  { id: 2, nome: 'Bruno Lima', email: 'bruno@email.com' },
];
const pedidos = [
  { id: 1, clienteId: 1 },
  { id: 2, clienteId: 2 },
  { id: 3, clienteId: 1 },
];

// A Ana muda de email: UMA mudança só
const clientesAtualizados = clientes.map(cliente =>
  cliente.id === 1 ? { ...cliente, email: 'ana.souza@novo.com' } : cliente
);
const pedido3 = pedidos.find(pedido => pedido.id === 3);
const donoDoPedido3 = clientesAtualizados.find(cliente => cliente.id === pedido3.clienteId);
console.log(donoDoPedido3.email);

// O pedido 2 é apagado: o Bruno continua existindo
const pedidosSemODois = pedidos.filter(pedido => pedido.id !== 2);
console.log(pedidosSemODois.length, clientes.find(cliente => cliente.nome === 'Bruno Lima').nome);
