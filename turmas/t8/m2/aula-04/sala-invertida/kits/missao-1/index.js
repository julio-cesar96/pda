// ✅ DEPOIS: o index.js só monta o restaurante e diz qual seção atende qual caminho
import express from 'express';
import { rotasProdutos } from './routes/produtos.js';
import { rotasVendedores } from './routes/vendedores.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Bem-vindo à API do MercadoÁgil!');
});

app.use('/produtos', rotasProdutos);
app.use('/vendedores', rotasVendedores);

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('Servidor do MercadoÁgil rodando em http://localhost:3000');
  }
});
