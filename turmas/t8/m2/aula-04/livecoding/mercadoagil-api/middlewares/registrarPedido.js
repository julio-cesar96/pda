// A "recepcionista": anota cada pedido antes de passar para a cozinha.
export function registrarPedido(req, res, next) {
  console.log('📝', req.method, req.url);
  next(); // "pode passar": sem esta linha, o pedido fica parado na recepção
}
