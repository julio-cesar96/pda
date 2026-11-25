import express from 'express';
import { listar, buscarPorId, criar, atualizar, remover } from '../controllers/produtosController.js';

// A seção "Produtos" do cardápio. O caminho "/" aqui quer dizer "/produtos".
export const rotasProdutos = express.Router();

rotasProdutos.get('/', listar);
rotasProdutos.get('/:id', buscarPorId);
rotasProdutos.post('/', criar);
rotasProdutos.put('/:id', atualizar);
rotasProdutos.delete('/:id', remover);
