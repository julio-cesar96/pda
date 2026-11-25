import 'dotenv/config'; // abre o cofre (.env) e coloca os valores em process.env
import express from 'express';
import { registrarPedido } from './middlewares/registrarPedido.js';
import { rotasProdutos } from './routes/produtos.js';

console.log('Porta lida do .env:', process.env.PORT);

const app = express();
const porta = process.env.PORT || 3000; // se não achar no .env, usa 3000

app.use(registrarPedido); // a recepcionista anota TODO pedido, antes das rotas

app.use('/produtos', rotasProdutos);

app.listen(porta, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('Servidor do MercadoÁgil rodando em http://localhost:' + porta);
  }
});
