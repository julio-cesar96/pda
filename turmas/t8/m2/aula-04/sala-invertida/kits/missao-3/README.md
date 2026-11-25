# 🧰 Kit da Missão 3: middleware de log e variáveis de ambiente

Este kit é o ponto de partida da **Missão 3** da sala de aula invertida. A missão completa (a tarefa, o roteiro da mini-aula e o checklist) está em [`../../missoes.md`](../../missoes.md#-missão-3-middleware-de-log-e-variáveis-de-ambiente).

## Como rodar

```bash
npm install
npm run dev
```

Num **segundo terminal** (no Windows, use `curl.exe`):

```bash
curl http://localhost:3000/produtos
```

Este kit **não** traz o `.env` (ele nunca vai para o GitHub). Copie o `.env.example` para um arquivo novo chamado `.env` quando a missão pedir. Depois disso, o servidor passa a atender na porta `3001`.

Para desligar o servidor: `Ctrl + C` no terminal dele.
