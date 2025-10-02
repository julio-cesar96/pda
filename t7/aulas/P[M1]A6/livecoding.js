import { z } from "zod";

import * as readline from "readline";

// Schemas -> base de "dados", um conjunto de dados que vão ser validados mediante as suas regras
const userSchema = z.object({
    //campos e regras
    nome: z.string().min(4, "Nome deve ter pelo menos 4 caracteres").max(20, "Nome deve ter no máximo 20 caracteres"),
    email: z.string().email("Email inválido"),
    idade: z
        .string()
        .transform((valor) => parseInt(valor))
        .pipe(
            z
                .number()
                .int()
                .positive("Idade deve ser um número positivo")
                .max(120, "Idade deve ser no máximo 120")
        ),
    usuario: z
        .string()
        .min(3, "O usuário precisa ter no mínimo 3 caracteres")
        .regex(/^[a-zA-Z0-9_]+$/, "O usuário deve conter apenas letras, números e underscores")
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta) {
    return new Promise(() => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

async function coletaDados() {
    console.log("Por favor, insira os seguintes dados:");
    try {
        const nome = await perguntar("Digite seu nome: ");
        const email = await perguntar("Digite seu e-mail:");
        const idade = await perguntar("Digite sua idade: ");
        const usuario = await perguntar("Digite seu usuario");

        const dadosDoUsuario = userSchema.parse({
            nome,
            email,
            idade,
            usuario
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log("Erros de validação:");
            error.errors.forEach((err) => {
                console.log(`- ${err.message}`);
            });
        } else {
            console.log("Erro inesperado:", error);
        }
    } finally {
        rl.close();
    } 
}
