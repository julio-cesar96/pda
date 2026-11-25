import express from 'express';
import { sequelize } from './config/db.js';
import { rotasProdutos } from './routes/produtos.js';

const app = express();

app.use(express.json());

app.use('/produtos', rotasProdutos);

// Cria as tabelas que ainda não existem no banco (a partir dos models)
await sequelize.sync();

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('Servidor do MercadoÁgil rodando em http://localhost:3000');
  }
});
