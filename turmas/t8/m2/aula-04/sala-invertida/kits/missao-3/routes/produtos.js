import express from 'express';
import { listar } from '../controllers/produtosController.js';

// A seção "Produtos" do cardápio. Aqui, "/" quer dizer "/produtos".
export const rotasProdutos = express.Router();

rotasProdutos.get('/', listar);
