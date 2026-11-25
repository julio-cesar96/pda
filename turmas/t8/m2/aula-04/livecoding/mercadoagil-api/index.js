import 'dotenv/config'; // 1º de tudo: abre o cofre (.env) e coloca os valores em process.env
import express from 'express';
import { sequelize } from './config/db.js';
import { registrarPedido } from './middlewares/registrarPedido.js';
import { rotasProdutos } from './routes/produtos.js';
import { rotasVendedores } from './routes/vendedores.js';

const app = express();
const porta = process.env.PORT || 3000;

// Middlewares: tudo o que todo pedido atravessa antes de chegar às rotas
app.use(express.json()); // lê o JSON do corpo do pedido e guarda em req.body
app.use(registrarPedido); // a recepcionista anota cada pedido

app.get('/', (req, res) => {
  res.send('Bem-vindo à API do MercadoÁgil!');
});

// Cada seção do cardápio tem o seu arquivo de rotas
app.use('/produtos', rotasProdutos);
app.use('/vendedores', rotasVendedores);

// Cria as tabelas que ainda não existem no banco (a partir dos models)
await sequelize.sync();

app.listen(porta, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('Servidor do MercadoÁgil rodando em http://localhost:' + porta);
  }
});
