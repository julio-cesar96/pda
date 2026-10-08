import { schemaPedido } from "./schemas.js";

export function validarPedido(pedido) {
    return schemaPedido.safeParse(pedido);
}