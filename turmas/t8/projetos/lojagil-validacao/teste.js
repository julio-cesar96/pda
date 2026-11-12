import { validarPedido, schemaClienteSeguro } from './index.js';

const pedido = {
  cliente: { nome: 'Ana Souza', email: 'ana@email.com', cpf: '123.456.789-00', cidade: 'Salvador' },
  carrinho: [
    { nome: 'Teclado', preco: 350 },
    { nome: 'Mouse', preco: 120 },
  ],
  pagamento: 'pix',
};

const resultado = validarPedido(pedido);

if (resultado.success) {
  console.log('Pedido aceito. Cupom:', resultado.data.cupom);
} else {
  console.log('Pedido recusado:', resultado.error.issues[0].message);
}

// Pedido com carrinho vazio, copiado com spread
const pedidoVazio = { ...pedido, carrinho: [] };
const resultadoVazio = validarPedido(pedidoVazio);

if (resultadoVazio.success) {
  console.log('Pedido aceito. Cupom:', resultadoVazio.data.cupom);
} else {
  console.log('Pedido recusado:', resultadoVazio.error.issues[0].message);
}

// Esconder o CPF
console.log(schemaClienteSeguro.parse(pedido.cliente));