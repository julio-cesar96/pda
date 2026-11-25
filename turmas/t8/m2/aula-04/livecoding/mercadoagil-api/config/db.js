import { Sequelize } from 'sequelize';

// A conexão com o banco. No SQLite, o banco é UM ARQUIVO no seu computador.
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_ARQUIVO || 'mercadoagil.sqlite',
  logging: false, // troque para console.log para ver o SQL que o Sequelize escreve
});
