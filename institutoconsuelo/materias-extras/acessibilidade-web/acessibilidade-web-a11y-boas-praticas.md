# ♿ Acessibilidade Web (a11y) e Boas Práticas

> *"A web deve ser acessível a todos, independente de suas habilidades."*

---

## 🎯 O que é Acessibilidade Web?

**Acessibilidade (a11y)** significa criar websites que **todas as pessoas** possam usar, incluindo pessoas com:

- 👁️ **Deficiência visual** (cegueira, baixa visão, daltonismo)
- 👂 **Deficiência auditiva** (surdez, perda auditiva)
- 🖐️ **Deficiência motora** (dificuldade de usar mouse)
- 🧠 **Deficiência cognitiva** (dislexia, autismo, TDAH)
- 📱 **Limitações temporárias** (braço quebrado, ambiente barulhento)
- 🌐 **Conexões lentas** ou **dispositivos antigos**

**a11y:** "a" + 11 letras + "y" = **accessibility**

---

## 📊 Por que Acessibilidade Importa?

### Números

- 🌍 **1 bilhão de pessoas** (15% da população) têm alguma deficiência
- 📱 **71% dos usuários com deficiência** abandonam sites inacessíveis
- 💰 **Mercado de US$ 8 trilhões** em poder de compra

### Benefícios

- ✅ **Mais usuários** alcançados
- ✅ **Melhor SEO** (Google valoriza acessibilidade)
- ✅ **Conformidade legal** (obrigatório em muitos países)
- ✅ **Melhor UX para todos**
- ✅ **Responsabilidade social**

---

## 🎨 HTML Semântico

### Use Tags Corretas

```html
<!-- ❌ RUIM: Divs para tudo -->
<div class="header">
  <div class="nav">
    <div class="link">Home</div>
  </div>
</div>

<!-- ✅ BOM: HTML semântico -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
```

### Estrutura de Página

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título Descritivo da Página</title>
</head>
<body>
  <!-- Cabeçalho -->
  <header>
    <nav aria-label="Navegação principal">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>
  </header>
  
  <!-- Conteúdo principal -->
  <main>
    <article>
      <h1>Título Principal</h1>
      <p>Conteúdo do artigo...</p>
    </article>
    
    <aside>
      <h2>Barra lateral</h2>
      <p>Conteúdo relacionado...</p>
    </aside>
  </main>
  
  <!-- Rodapé -->
  <footer>
    <p>&copy; 2024 Meu Site</p>
  </footer>
</body>
</html>
```

### Hierarquia de Headings

```html
<!-- ❌ RUIM: Hierarquia quebrada -->
<h1>Título Principal</h1>
<h3>Subtítulo</h3> <!-- Pulou h2! -->
<h2>Outro Título</h2> <!-- Ordem errada! -->

<!-- ✅ BOM: Hierarquia lógica -->
<h1>Título Principal</h1>
<h2>Seção 1</h2>
<h3>Subseção 1.1</h3>
<h3>Subseção 1.2</h3>
<h2>Seção 2</h2>
```

---

## 🏷️ ARIA (Accessible Rich Internet Applications)

### Quando Usar ARIA

**Regra de ouro:** Use HTML semântico primeiro, ARIA apenas quando necessário.

```html
<!-- ❌ RUIM: ARIA desnecessário -->
<button role="button">Clique</button>

<!-- ✅ BOM: HTML nativo -->
<button>Clique</button>

<!-- ✅ ARIA necessário: Widget customizado -->
<div role="button" tabindex="0" aria-pressed="false">
  Toggle customizado
</div>
```

### ARIA Labels

```html
<!-- Botão com ícone (sem texto visível) -->
<button aria-label="Fechar">
  <svg>...</svg>
</button>

<!-- Link com contexto adicional -->
<a href="/produto/1" aria-label="Ver detalhes do Notebook Gamer">
  Ver mais
</a>

<!-- Navegação -->
<nav aria-label="Navegação principal">...</nav>
<nav aria-label="Navegação secundária">...</nav>

<!-- aria-labelledby: referencia outro elemento -->
<h2 id="titulo-secao">Produtos</h2>
<section aria-labelledby="titulo-secao">
  <!-- Conteúdo -->
</section>
```

### ARIA Live Regions

```html
<!-- Notificações dinâmicas -->
<div role="alert" aria-live="assertive">
  Erro: Preencha todos os campos!
</div>

<div role="status" aria-live="polite">
  5 novos itens adicionados
</div>

<!-- aria-live valores:
     - off: Não anuncia (padrão)
     - polite: Anuncia quando usuário terminar ação atual
     - assertive: Anuncia imediatamente (use com moderação!)
-->
```

### ARIA States

```html
<!-- Accordion/Collapse -->
<button aria-expanded="false" aria-controls="conteudo">
  Expandir
</button>
<div id="conteudo" hidden>
  Conteúdo oculto
</div>

<!-- Toggle button -->
<button aria-pressed="false">
  Modo escuro
</button>

<!-- Loading state -->
<button aria-busy="true" aria-disabled="true">
  Carregando...
</button>
```

---

## 🖼️ Imagens Acessíveis

### Texto Alternativo (alt)

```html
<!-- ❌ RUIM: alt vazio ou genérico -->
<img src="produto.jpg" alt="">
<img src="produto.jpg" alt="imagem">

<!-- ✅ BOM: alt descritivo -->
<img src="notebook.jpg" alt="Notebook Gamer Dell com tela de 15 polegadas">

<!-- Imagem decorativa: alt vazio (screen reader ignora) -->
<img src="decoracao.svg" alt="">

<!-- Imagem com texto: repetir texto -->
<img src="logo.png" alt="TechStore">

<!-- Imagem complexa: use figcaption ou aria-describedby -->
<figure>
  <img src="grafico.png" alt="Gráfico de vendas 2024">
  <figcaption>
    O gráfico mostra aumento de 30% nas vendas de janeiro a dezembro.
  </figcaption>
</figure>
```

### Ícones

```html
<!-- ❌ RUIM: Ícone sem descrição -->
<button>
  <svg>...</svg>
</button>

<!-- ✅ BOM: aria-label -->
<button aria-label="Adicionar ao carrinho">
  <svg aria-hidden="true">...</svg>
</button>

<!-- ✅ BOM: Texto oculto visualmente -->
<button>
  <svg aria-hidden="true">...</svg>
  <span class="sr-only">Adicionar ao carrinho</span>
</button>
```

**CSS para sr-only:**

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## ⌨️ Navegação por Teclado

### Tabindex

```html
<!-- tabindex="0": Ordem natural do DOM -->
<div tabindex="0">Pode receber foco</div>

<!-- tabindex="-1": Não está na ordem de tabulação (apenas via JS) -->
<div tabindex="-1" id="modal">Modal</div>

<!-- ❌ EVITE: tabindex > 0 (quebra ordem natural) -->
<button tabindex="5">Não faça isso!</button>
```

### Elementos Interativos

```html
<!-- ✅ Elementos nativos já são focáveis -->
<button>Clique</button>
<a href="/link">Link</a>
<input type="text">

<!-- ❌ Div clicável (inacessível) -->
<div onclick="acao()">Clique aqui</div>

<!-- ✅ Div clicável acessível -->
<div 
  role="button" 
  tabindex="0" 
  onclick="acao()"
  onkeypress="handleKeyPress(event)"
>
  Clique aqui
</div>
```

### Event Handlers Acessíveis

```javascript
// Função para tecla Enter e Espaço (padrão de botões)
function handleKeyPress(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    acao();
  }
}

// Uso
elemento.addEventListener('keypress', handleKeyPress);
elemento.addEventListener('click', acao);
```

### Focus Management

```javascript
// Focar elemento programaticamente
const modal = document.getElementById('modal');
modal.focus();

// Trap de foco em modal
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}

// Uso
trapFocus(modal);
```

---

## 🎨 Contraste de Cores (WCAG)

### Proporções Mínimas

```text
WCAG AA (Mínimo):
- Texto normal: 4.5:1
- Texto grande (18pt+ ou 14pt+ bold): 3:1

WCAG AAA (Recomendado):
- Texto normal: 7:1
- Texto grande: 4.5:1
```

### Verificar Contraste

```css
/* ❌ RUIM: Contraste insuficiente (2.5:1) */
.texto {
  color: #999;
  background: #fff;
}

/* ✅ BOM: Contraste adequado (7:1) */
.texto {
  color: #333;
  background: #fff;
}
```

**Ferramentas:**
- WebAIM Contrast Checker: <https://webaim.org/resources/contrastchecker/>
- Chrome DevTools (inspecionar elemento → Contrast ratio)

### Não Dependa Apenas de Cor

```html
<!-- ❌ RUIM: Apenas cor indica erro -->
<input type="text" style="border: 2px solid red;">

<!-- ✅ BOM: Cor + ícone + texto -->
<div class="input-group">
  <input type="text" aria-invalid="true" aria-describedby="erro-email">
  <span class="erro-icon" aria-hidden="true">⚠️</span>
  <span id="erro-email" class="erro-texto">Email inválido</span>
</div>
```

---

## 📝 Formulários Acessíveis

### Labels

```html
<!-- ❌ RUIM: Sem label -->
<input type="text" placeholder="Nome">

<!-- ✅ BOM: Label explícito -->
<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome">

<!-- ✅ BOM: Label implícito -->
<label>
  Email:
  <input type="email" name="email">
</label>
```

### Validação

```html
<form>
  <div>
    <label for="email">Email:</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required
      aria-required="true"
      aria-invalid="false"
      aria-describedby="erro-email"
    >
    <span id="erro-email" role="alert" class="erro" hidden>
      Por favor, insira um email válido
    </span>
  </div>
  
  <button type="submit">Enviar</button>
</form>
```

**JavaScript:**

```javascript
const emailInput = document.getElementById('email');
const erroEmail = document.getElementById('erro-email');

emailInput.addEventListener('blur', () => {
  if (!emailInput.validity.valid) {
    emailInput.setAttribute('aria-invalid', 'true');
    erroEmail.removeAttribute('hidden');
  } else {
    emailInput.setAttribute('aria-invalid', 'false');
    erroEmail.setAttribute('hidden', '');
  }
});
```

### Fieldset e Legend

```html
<fieldset>
  <legend>Informações de Contato</legend>
  
  <label for="telefone">Telefone:</label>
  <input type="tel" id="telefone">
  
  <label for="celular">Celular:</label>
  <input type="tel" id="celular">
</fieldset>
```

---

## 🎭 Componentes Acessíveis

### Modal/Dialog

```html
<div 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="titulo-modal"
  hidden
  id="modal"
>
  <h2 id="titulo-modal">Confirmar ação</h2>
  <p>Tem certeza que deseja continuar?</p>
  
  <button onclick="confirmar()">Confirmar</button>
  <button onclick="fecharModal()">Cancelar</button>
</div>
```

**JavaScript:**

```javascript
function abrirModal() {
  const modal = document.getElementById('modal');
  modal.removeAttribute('hidden');
  modal.focus();
  
  // Trap focus
  trapFocus(modal);
  
  // Evitar scroll do body
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  const modal = document.getElementById('modal');
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  
  // Retornar foco ao elemento que abriu o modal
  botaoQueAbriu.focus();
}

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    fecharModal();
  }
});
```

### Tabs (Abas)

```html
<div class="tabs">
  <div role="tablist" aria-label="Abas de conteúdo">
    <button 
      role="tab" 
      aria-selected="true" 
      aria-controls="painel-1"
      id="tab-1"
    >
      Aba 1
    </button>
    
    <button 
      role="tab" 
      aria-selected="false" 
      aria-controls="painel-2"
      id="tab-2"
    >
      Aba 2
    </button>
  </div>
  
  <div role="tabpanel" id="painel-1" aria-labelledby="tab-1">
    Conteúdo da Aba 1
  </div>
  
  <div role="tabpanel" id="painel-2" aria-labelledby="tab-2" hidden>
    Conteúdo da Aba 2
  </div>
</div>
```

### Accordion

```html
<div class="accordion">
  <h3>
    <button 
      aria-expanded="false" 
      aria-controls="secao-1"
      id="botao-1"
    >
      Seção 1
    </button>
  </h3>
  <div id="secao-1" aria-labelledby="botao-1" hidden>
    Conteúdo da Seção 1
  </div>
  
  <h3>
    <button 
      aria-expanded="false" 
      aria-controls="secao-2"
      id="botao-2"
    >
      Seção 2
    </button>
  </h3>
  <div id="secao-2" aria-labelledby="botao-2" hidden>
    Conteúdo da Seção 2
  </div>
</div>
```

---

## 🔧 Ferramentas de Teste

### 1. axe DevTools

```bash
# Extensão do Chrome
https://chrome.google.com/webstore → "axe DevTools"

# Uso:
1. Abrir DevTools (F12)
2. Aba "axe DevTools"
3. Clicar "Scan"
4. Corrigir problemas encontrados
```

### 2. Lighthouse

```bash
# Chrome DevTools
1. F12 → Aba "Lighthouse"
2. Selecionar "Accessibility"
3. Clicar "Analyze page load"
```

### 3. Screen Readers

**Windows:**
- NVDA (gratuito): <https://www.nvaccess.org/>
- JAWS (pago)

**macOS:**
- VoiceOver (nativo): Cmd + F5

**Linux:**
- Orca (gratuito)

### 4. Testes Manuais

```bash
# Checklist:
- [ ] Navegar apenas com teclado (Tab, Enter, Esc, Setas)
- [ ] Testar com zoom 200%
- [ ] Usar screen reader
- [ ] Verificar contraste
- [ ] Validar HTML (validator.w3.org)
```

---

## 🎯 Checklist de Acessibilidade

### HTML

- [ ] HTML semântico (header, nav, main, footer)
- [ ] Lang attribute (`<html lang="pt-BR">`)
- [ ] Hierarquia de headings (h1 → h2 → h3)
- [ ] Todas imagens têm alt

### Teclado

- [ ] Todos elementos interativos são focáveis
- [ ] Ordem de tabulação lógica
- [ ] Focus visível (outline)
- [ ] Atalhos de teclado funcionam

### ARIA

- [ ] Roles apropriados
- [ ] Labels descritivos
- [ ] States atualizados (aria-expanded, etc.)
- [ ] Live regions para conteúdo dinâmico

### Formulários

- [ ] Todos inputs têm labels
- [ ] Erros são anunciados
- [ ] Required fields identificados
- [ ] Autocomplete apropriado

### Visual

- [ ] Contraste adequado (4.5:1 mínimo)
- [ ] Não depende apenas de cor
- [ ] Texto redimensionável (zoom 200%)
- [ ] Animações podem ser desabilitadas

---

## 📚 Recursos Adicionais

- **WCAG 2.1:** <https://www.w3.org/WAI/WCAG21/quickref/>
- **WebAIM:** <https://webaim.org/>
- **A11y Project:** <https://www.a11yproject.com/>
- **MDN Accessibility:** <https://developer.mozilla.org/en-US/docs/Web/Accessibility>
- **ARIA Practices:** <https://www.w3.org/WAI/ARIA/apg/>

---

## 🎯 Resumo

| Princípio | Implementação |
|-----------|---------------|
| **Perceptível** | Alt text, legendas, contraste |
| **Operável** | Teclado, tempo suficiente, navegação |
| **Compreensível** | Linguagem clara, previsível |
| **Robusto** | HTML válido, compatível com tecnologias assistivas |

**Acessibilidade não é opcional - é obrigação de todo desenvolvedor! ♿✨**
