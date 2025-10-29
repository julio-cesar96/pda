# 🏠 Atividades para Casa

## 📝 Nível Simples: Landing Page de Produto

**Descrição:**
Crie uma landing page simples para um produto fictício (aplicativo, curso, gadget).

**Requisitos mínimos:**

- Header com logo e botão "Comprar agora"
- Seção hero com título impactante, descrição e CTA
- Seção de 3 benefícios (ícones + texto)
- Footer com copyright

**Critérios de avaliação:**

- [ ] HTML semântico correto
- [ ] Layout responsivo (mobile e desktop)
- [ ] Uso de Flexbox para alinhamento
- [ ] Pelo menos 1 hover effect
- [ ] Código bem indentado e comentado

**Exemplo esperado:**

- Mobile: Tudo empilhado verticalmente
- Desktop: Hero com imagem ao lado, benefícios em linha

---

## 📝 Nível Médio: Clone de Interface Real

**Descrição:**
Escolha uma seção de um site real (ex: header do Twitter, cards do Airbnb, seção de planos do Spotify) e recrie-a usando apenas HTML e CSS.

**Requisitos:**

- Escolha uma seção com pelo menos 3 elementos diferentes
- Replique o design o mais fielmente possível
- Implemente responsividade
- Use BEM para nomenclatura
- Crie um arquivo README.md explicando:
  - Qual site escolheu e por quê
  - Desafios encontrados
  - Técnicas CSS utilizadas

**Critérios de avaliação:**

- [ ] Fidelidade visual (70%+ similar ao original)
- [ ] Responsividade funcional
- [ ] Código organizado com BEM
- [ ] README completo
- [ ] Uso criativo de Flexbox/Grid

**Dica:** Use as ferramentas de desenvolvedor do navegador (F12) para inspecionar o site original, mas **escreva o código do zero**.

---

### 📝 Nível Difícil: Sistema de Componentes Reutilizáveis

**Descrição:**
Crie uma biblioteca pessoal de componentes UI reutilizáveis (Design System básico).

**Componentes obrigatórios:**

1. **Botões** (5 variações: primário, secundário, perigo, sucesso, outline)
2. **Cards** (3 tipos: simples, com imagem, com ações)
3. **Formulário completo** (inputs, select, checkbox, radio, textarea)
4. **Navegação** (navbar responsiva com menu mobile)
5. **Modal** (overlay + caixa centralizada)

**Requisitos técnicos:**

- Crie uma página "showcase" mostrando todos os componentes
- Use variáveis CSS para tema (cores, espaçamentos, etc.)
- Implemente tema claro/escuro
- Todos os componentes devem ser responsivos
- Inclua estados hover, focus e active
- Documente cada componente (como usar, variações disponíveis)

**Estrutura de arquivos:**

```
projeto/
├── index.html (showcase)
├── css/
│   ├── variables.css (variáveis)
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   ├── navbar.css
│   │   └── modal.css
│   └── main.css (imports + base)
└── README.md (documentação)
```

**Critérios de avaliação:**

- [ ] Todos os 5 componentes implementados
- [ ] Tema claro/escuro funcional
- [ ] Código modular e bem organizado
- [ ] Documentação clara no README
- [ ] Acessibilidade básica (alt, aria, contraste)
- [ ] Showcase visualmente atraente

**Bônus:**

- Animações e transições suaves
- Componente extra criativo (tooltip, accordion, etc.)
- Publicar no GitHub Pages
