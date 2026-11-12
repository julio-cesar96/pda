import { z } from 'zod';

// Define o schema para validar os dados do cliente
export const schemaCliente = z.object({
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.email("O email deve ser válido"),
    cpf: z.string().length(14, "O CPF deve ter 14 caracteres no formato XXX.XXX.XXX-XX"),
    cidade: z.string().min(2, "A cidade deve ter pelo menos 2 caracteres"),
});

//Define o schema para validar um produto
export const schemaProduto = z.object({
    nome: z.string(),
    preco: z.number("O preço deve ser um número").positive("O preço deve ser positivo, ou seja, maior que zero")
});

// Define o schema para validar os dados do pedido
export const schemaPedido = z.object({
    cliente: schemaCliente,
    carrinho: z.array(schemaProduto).min(1, "O carrinho deve ter pelo menos um produto"),
    pagamento: z.string().refine((value) => ['cartão', 'boleto', 'pix'].includes(value), {
        message: "O pagamento deve ser 'cartão', 'boleto' ou 'pix'"
    }),
    cupom: z.string().default("SEM CUPOM")
})

// Define schema para validar um cliente de forma segura, sem expor dados sensíveis como CPF
export const schemaClienteSeguro = schemaCliente.omit({ cpf: true});