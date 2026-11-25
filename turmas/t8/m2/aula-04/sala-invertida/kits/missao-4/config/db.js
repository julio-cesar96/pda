import { Sequelize } from 'sequelize';

// A conexão com o banco. No SQLite, o banco é UM ARQUIVO na pasta do projeto.
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'mercadoagil.sqlite',
  logging: false, // troque para console.log para ver o SQL que o Sequelize escreve
});
