# 🧰 Kit da Missão 2: o CRUD

Este kit é o ponto de partida da **Missão 2** da sala de aula invertida. A missão completa (a tarefa, o roteiro da mini-aula e o checklist) está em [`../../missoes.md`](../../missoes.md#-missão-2-o-crud).

## Como rodar

```bash
npm install
npm run dev
```

Num **segundo terminal** (no Windows, use `curl.exe`):

```bash
curl -i -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d "@produto.json"
```

Os arquivos `produto.json` e `produto-editado.json` são os **corpos** dos pedidos `POST` e `PUT`. Rode o `curl` **nesta pasta**, e mantenha as aspas em `"@produto.json"` (no PowerShell, elas são obrigatórias).

Para desligar o servidor: `Ctrl + C` no terminal dele.
