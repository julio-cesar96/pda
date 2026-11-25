import express from 'express';
import { listar } from '../controllers/vendedoresController.js';

// A seção "Vendedores" do cardápio
export const rotasVendedores = express.Router();

rotasVendedores.get('/', listar);
