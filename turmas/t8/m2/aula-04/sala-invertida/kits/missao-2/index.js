import express from 'express';
import { rotasProdutos } from './routes/produtos.js';

const app = express();

// Ensina o servidor a ler o JSON que chega no corpo do pedido (req.body)
app.use(express.json());

app.use('/produtos', rotasProdutos);

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('Servidor do MercadoÁgil rodando em http://localhost:3000');
  }
});
