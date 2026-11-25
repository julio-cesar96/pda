import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// O model Produto espelha a tabela "produto" do DER do MercadoÁgil (Aulas 1 e 2).
// O "id" é criado sozinho: INTEGER, chave primária, que aumenta a cada novo produto.
export const Produto = sequelize.define(
  'Produto',
  {
    nome: { type: DataTypes.STRING, allowNull: false },
    preco: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'produto', timestamps: false },
);
