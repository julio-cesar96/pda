# 🧰 Kit da Missão 4: Sequelize

Este kit é o ponto de partida da **Missão 4** da sala de aula invertida. A missão completa (a tarefa, o roteiro da mini-aula e o checklist) está em [`../../missoes.md`](../../missoes.md#-missão-4-sequelize).

## Como rodar

```bash
npm install
npm run dev
```

Num **segundo terminal** (no Windows, use `curl.exe`):

```bash
curl -i -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d "@produto.json"
```

O banco é o arquivo `mercadoagil.sqlite`, criado sozinho na primeira vez que o servidor liga. Ele **não** vai para o GitHub. Para começar do zero, desligue o servidor e apague esse arquivo.

Para desligar o servidor: `Ctrl + C` no terminal dele.
