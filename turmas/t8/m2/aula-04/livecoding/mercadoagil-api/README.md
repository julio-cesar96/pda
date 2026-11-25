# 🛒 mercadoagil-api (Aula 4)

O servidor do MercadoÁgil **depois** da Aula 4: rotas e controllers separados, CRUD de produtos no banco **SQLite** com o **Sequelize**, middleware de log e configuração no `.env`. Os vendedores continuam na memória.

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

No Windows (PowerShell), troque o `cp` por `copy .env.example .env`, ou crie o `.env` no VS Code. Sem o `.env`, o servidor usa a porta `3000` e o arquivo `mercadoagil.sqlite` mesmo assim.

## As pastas

| Pasta ou arquivo | O que tem |
|---|---|
| `index.js` | Liga o servidor, os middlewares, as seções do cardápio e o `sync` |
| `routes/` | Um arquivo de rotas por recurso (as seções do cardápio) |
| `controllers/` | Os cozinheiros: as funções que respondem cada pedido |
| `models/` | O model `Produto` (a tabela `produto` do DER) |
| `middlewares/` | A recepcionista que anota cada pedido |
| `config/db.js` | A conexão com o banco |
| `.env.example` | O modelo do cofre (o `.env` de verdade não vai para o GitHub) |
| `produto.json`, `produto-editado.json` | Os corpos dos pedidos `POST` e `PUT` |

O código **em memória** dos produtos (a versão do bloco 2, antes do banco) está no `README.md` da aula, seção 2.
