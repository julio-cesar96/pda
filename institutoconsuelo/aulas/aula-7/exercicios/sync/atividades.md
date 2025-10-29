# 🧪 Atividades em Sala

## Atividade 1: Criando um Portfólio Pessoal (60 min)

**Objetivo:** Aplicar HTML semântico, CSS básico, Flexbox e responsividade.

**Enunciado:**
Crie uma página de portfólio pessoal contendo:

- Header com seu nome e navegação (Home, Sobre, Projetos, Contato)
- Seção "Sobre" com foto e descrição
- Seção "Projetos" com 3 cards de projetos (imagem, título, descrição)
- Footer com links de redes sociais
- Design responsivo (mobile first)

**Requisitos técnicos:**

1. Use tags semânticas apropriadas
2. Aplique classes seguindo convenção BEM
3. Use Flexbox para o layout dos cards
4. Implemente Media Queries para tablet e desktop
5. Adicione transições suaves em hovers

**Estrutura inicial:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Portfólio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Seu código aqui -->
</body>
</html>
```

**Resultado esperado:**

- Mobile: Layout em coluna única
- Tablet (768px+): Cards em 2 colunas
- Desktop (1024px+): Cards em 3 colunas, navegação horizontal

**Tempo:** 45 min desenvolvimento + 15 min apresentação

---

## Atividade 2: Dashboard com CSS Grid (45 min)

**Objetivo:** Dominar CSS Grid para layouts complexos.

**Enunciado:**
Crie um dashboard administrativo com:

- Header fixo no topo (logo + menu)
- Sidebar lateral com menu vertical
- Área principal com:
  - 4 cards de estatísticas (1 linha)
  - Gráfico grande (2 colunas de largura)
  - Tabela de últimas atividades (1 coluna)

**Layout Desktop:**

```
┌─────────────────────────────────────┐
│           HEADER                    │
├────────┬────────────────────────────┤
│        │  Card1  Card2  Card3  Card4│
│ SIDE   ├──────────────┬─────────────┤
│ BAR    │   Gráfico    │   Tabela    │
│        │              │             │
└────────┴──────────────┴─────────────┘
```

**Layout Mobile:**

```
┌─────────────┐
│   HEADER    │
├─────────────┤
│   Card 1    │
│   Card 2    │
│   Card 3    │
│   Card 4    │
│   Gráfico   │
│   Tabela    │
└─────────────┘
```

**Requisitos:**

1. Use CSS Grid com `grid-template-areas`
2. Sidebar fixada à esquerda no desktop
3. Responsivo: mobile (stack vertical), desktop (layout em grid)
4. Use variáveis CSS para cores do tema

**Dica de código:**

```css
.dashboard {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
}
```

**Tempo:** 35 min desenvolvimento + 10 min discussão
