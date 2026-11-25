// ❌ ANTES: o jeito da Aula 3, com TODAS as rotas num arquivo só.
// Imagine este arquivo com 40 rotas e 3 pessoas mexendo nele ao mesmo tempo.
import express from 'express';

const app = express();

const produtos = [
  { id: 1, nome: 'Mouse', preco: 120 },
  { id: 2, nome: 'Teclado', preco: 350 },
  { id: 3, nome: 'Livro de JavaScript', preco: 80 },
];

const vendedores = [
  { id: 1, nomeLoja: 'TechBahia' },
  { id: 2, nomeLoja: 'Livraria Sol' },
];

app.get('/', (req, res) => {
  res.send('Bem-vindo à API do MercadoÁgil!');
});

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.get('/vendedores', (req, res) => {
  res.json(vendedores);
});

// ... e aqui viriam /pedidos, /clientes, /cupons, /categorias, /relatorios...

app.listen(3000, (erro) => {
  if (erro) {
    console.log('Não consegui ligar o servidor:', erro.message);
  } else {
    console.log('(ANTES) Servidor do MercadoÁgil rodando em http://localhost:3000');
  }
});
