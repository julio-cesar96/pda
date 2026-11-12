# ♿ Acessibilidade (a11y) em React

> *"Tecnologia para todos - Inclusão e Usabilidade"*

---

## 📋 Índice

1. [Por que Acessibilidade?](#por-que-acessibilidade)
2. [WCAG Guidelines](#wcag-guidelines)
3. [HTML Semântico](#html-semântico)
4. [ARIA Attributes](#aria-attributes)
5. [Navegação por Teclado](#navegação-por-teclado)
6. [Focus Management](#focus-management)
7. [Screen Readers](#screen-readers)
8. [Formulários Acessíveis](#formulários-acessíveis)
9. [Cores e Contraste](#cores-e-contraste)
10. [Ferramentas de Teste](#ferramentas-de-teste)

---

## 🎯 Por que Acessibilidade?

### Estatísticas

- **15%** da população mundial tem alguma deficiência
- **1 bilhão** de pessoas precisam de tecnologias assistivas
- **Legal requirement** em muitos países (ADA, Section 508)
- **Melhor SEO** - sites acessíveis ranqueiam melhor
- **Melhor UX** - beneficia todos os usuários

### Tipos de Deficiências

```
Visual      → Cegueira, baixa visão, daltonismo
Auditiva    → Surdez, perda auditiva
Motora      → Dificuldades com mouse/teclado
Cognitiva   → Dislexia, TDAH, autismo
Temporária  → Braço quebrado, olhos cansados
```

---

## 📜 WCAG Guidelines

### Níveis de Conformidade

```
A    → Básico (requisitos mínimos)
AA   → Intermediário (recomendado)
AAA  → Avançado (ideal)
```

### Princípios POUR

1. **Perceivable** (Perceptível)
   - Conteúdo deve ser perceptível aos sentidos

2. **Operable** (Operável)
   - Interface navegável por teclado e outros dispositivos

3. **Understandable** (Compreensível)
   - Informação e operação clara

4. **Robust** (Robusto)
   - Compatível com tecnologias assistivas

---

## 🏷️ HTML Semântico

### Use Tags Corretas

```jsx
// ❌ Evite divs para tudo
<div onClick={handleClick}>Clique aqui</div>
<div>
  <div>Header</div>
  <div>Content</div>
  <div>Footer</div>
</div>

// ✅ Use elementos semânticos
<button onClick={handleClick}>Clique aqui</button>
<article>
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</article>
```

### Estrutura Semântica Completa

```jsx
function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">Sobre</a></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <article>
          <h1>Título Principal</h1>
          <section>
            <h2>Seção 1</h2>
            <p>Conteúdo...</p>
          </section>
          <section>
            <h2>Seção 2</h2>
            <p>Conteúdo...</p>
          </section>
        </article>
        
        <aside>
          <h2>Sidebar</h2>
          <p>Conteúdo relacionado...</p>
        </aside>
      </main>
      
      <footer>
        <p>&copy; 2024 Minha Empresa</p>
      </footer>
    </>
  );
}
```

### Headings Hierárquicos

```jsx
// ❌ Evite pular níveis
<h1>Título</h1>
<h3>Subtítulo</h3> {/* ❌ Pulou h2 */}

// ✅ Mantenha hierarquia
<h1>Título Principal</h1>
<h2>Seção</h2>
<h3>Subseção</h3>
<h4>Detalhe</h4>
```

---

## 🎭 ARIA Attributes

*Accessible Rich Internet Applications*

### Quando Usar ARIA

```jsx
// ✅ HTML semântico é melhor que ARIA
<button>Salvar</button>

// ⚠️ Use ARIA apenas quando HTML não for suficiente
<div role="button" tabIndex={0}>Salvar</div>
```

### ARIA Roles

```jsx
// Navegação
<nav role="navigation">
  <ul role="list">
    <li role="listitem">Item</li>
  </ul>
</nav>

// Banner (header principal)
<header role="banner">
  <h1>Logo</h1>
</header>

// Conteúdo principal
<main role="main">
  <article role="article">...</article>
</main>

// Complementar (sidebar)
<aside role="complementary">...</aside>

// Informação
<footer role="contentinfo">...</footer>

// Região
<section role="region" aria-labelledby="section-title">
  <h2 id="section-title">Título da Seção</h2>
</section>

// Alert (mensagens)
<div role="alert" aria-live="assertive">
  Erro ao salvar!
</div>

// Dialog/Modal
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">Confirmar ação</h2>
</div>

// Tab interface
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel2">Tab 2</button>
</div>
<div role="tabpanel" id="panel1">Conteúdo 1</div>
```

### ARIA States e Properties

```jsx
// aria-label - Label invisível
<button aria-label="Fechar modal">
  <X /> {/* Apenas ícone */}
</button>

// aria-labelledby - Referencia elemento existente
<section aria-labelledby="title">
  <h2 id="title">Produtos</h2>
</section>

// aria-describedby - Descrição adicional
<input
  type="password"
  aria-describedby="password-help"
/>
<p id="password-help">Mínimo 8 caracteres</p>

// aria-hidden - Oculta de screen readers
<div aria-hidden="true">
  Conteúdo decorativo
</div>

// aria-expanded - Estado de expandido/colapsado
<button
  aria-expanded={isOpen}
  aria-controls="menu"
  onClick={() => setIsOpen(!isOpen)}
>
  Menu
</button>
<div id="menu" hidden={!isOpen}>...</div>

// aria-disabled - Desabilitado
<button aria-disabled={isDisabled}>
  Salvar
</button>

// aria-pressed - Estado de toggle button
<button
  aria-pressed={isActive}
  onClick={() => setIsActive(!isActive)}
>
  {isActive ? 'Ativo' : 'Inativo'}
</button>

// aria-current - Item atual em navegação
<nav>
  <a href="/" aria-current="page">Home</a>
  <a href="/about">Sobre</a>
</nav>

// aria-invalid - Campo inválido
<input
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? "error-message" : undefined}
/>
{error && <p id="error-message" role="alert">{error}</p>}

// aria-required - Campo obrigatório
<input type="text" aria-required="true" required />

// aria-live - Atualizações dinâmicas
<div aria-live="polite" aria-atomic="true">
  {message}
</div>
```

---

## ⌨️ Navegação por Teclado

### Teclas Padrão

```
Tab          → Próximo elemento focável
Shift + Tab  → Elemento anterior
Enter/Space  → Ativar botão/link
Escape       → Fechar modal/menu
Arrow Keys   → Navegar em listas/menus
Home/End     → Início/fim da lista
```

### Torna Elementos Focáveis

```jsx
// ✅ Elementos nativamente focáveis
<button>Click</button>
<a href="/link">Link</a>
<input type="text" />

// ⚠️ Elementos não focáveis nativamente
<div tabIndex={0} onClick={handleClick}>
  Clicável
</div>

// ❌ Evite tabIndex > 0 (quebra ordem natural)
<button tabIndex={1}>Bad</button>
<button tabIndex={2}>Practice</button>

// ✅ tabIndex={-1} - Remove da navegação mas permite focus programático
<div ref={ref} tabIndex={-1}>
  Pode receber focus via JavaScript
</div>
```

### Keyboard Event Handlers

```jsx
function AccessibleButton({ onClick, children }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter ou Space ativam o botão
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

// Dropdown com navegação por setas
function Dropdown({ options }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        // Selecionar item
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };
  
  return (
    <div onKeyDown={handleKeyDown}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Abrir menu
      </button>
      {isOpen && (
        <ul role="listbox">
          {options.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={index === selectedIndex}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 🎯 Focus Management

### Focus Trap em Modais

```jsx
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      // Guardar elemento com focus anterior
      previousFocus.current = document.activeElement as HTMLElement;
      
      // Focar no modal
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      firstFocusable?.focus();
      
      return () => {
        // Restaurar focus ao fechar
        previousFocus.current?.focus();
      };
    }
  }, [isOpen]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    
    // Tab trap
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements || focusableElements.length === 0) return;
      
      const first = focusableElements[0] as HTMLElement;
      const last = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={handleKeyDown}
    >
      <h2 id="modal-title">Título do Modal</h2>
      {children}
      <button onClick={onClose}>Fechar</button>
    </div>
  );
}
```

### Skip Links

```jsx
// Permitir pular navegação
function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para conteúdo principal
      </a>
      
      <header>
        <nav>...</nav>
      </header>
      
      <main id="main-content" tabIndex={-1}>
        <h1>Conteúdo</h1>
      </main>
    </>
  );
}

// CSS
// .skip-link {
//   position: absolute;
//   top: -40px;
//   left: 0;
//   background: #000;
//   color: #fff;
//   padding: 8px;
//   z-index: 100;
// }
//
// .skip-link:focus {
//   top: 0;
// }
```

---

## 🔊 Screen Readers

### Alt Text em Imagens

```jsx
// ✅ Imagens informativas
<img src="chart.png" alt="Gráfico mostrando aumento de 50% nas vendas" />

// ✅ Imagens decorativas
<img src="decoration.png" alt="" /> {/* alt vazio */}
<img src="decoration.png" aria-hidden="true" />

// ✅ Imagens como links
<a href="/profile">
  <img src="avatar.png" alt="Ir para perfil de João Silva" />
</a>

// ❌ Evite alt genérico
<img src="photo.jpg" alt="imagem" /> {/* Inútil */}
```

### Live Regions para Atualizações

```jsx
function Notifications() {
  const [message, setMessage] = useState('');
  
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

// aria-live valores:
// - "off" (padrão): não anuncia
// - "polite": anuncia quando usuário parar de interagir
// - "assertive": anuncia imediatamente (usar com cuidado)

// Exemplo: Toast notifications
function Toast({ message, type }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`toast toast-${type}`}
    >
      {message}
    </div>
  );
}
```

### Anunciar Mudanças de Rota

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RouteAnnouncer() {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState('');
  
  useEffect(() => {
    // Extrair título da página
    const pageTitle = document.title;
    setAnnouncement(`Navegado para ${pageTitle}`);
  }, [location.pathname]);
  
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only" // Visually hidden
    >
      {announcement}
    </div>
  );
}

// CSS para sr-only (screen reader only)
// .sr-only {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   border-width: 0;
// }
```

---

## 📝 Formulários Acessíveis

### Labels Explícitos

```jsx
// ✅ Label associado
<label htmlFor="name">Nome:</label>
<input id="name" type="text" />

// ✅ Label wrapper
<label>
  Nome:
  <input type="text" />
</label>

// ⚠️ aria-label (se não puder usar <label>)
<input type="text" aria-label="Nome" />

// ❌ Evite placeholder como label
<input type="text" placeholder="Nome" /> {/* Não é suficiente */}
```

### Mensagens de Erro

```jsx
function FormField({ label, error, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Uso
<FormField
  label="Email"
  type="email"
  error={errors.email}
/>
```

### Fieldsets e Legends

```jsx
// Agrupar campos relacionados
<fieldset>
  <legend>Informações pessoais</legend>
  <label htmlFor="firstName">Nome:</label>
  <input id="firstName" type="text" />
  
  <label htmlFor="lastName">Sobrenome:</label>
  <input id="lastName" type="text" />
</fieldset>

// Radio buttons
<fieldset>
  <legend>Escolha uma opção:</legend>
  <label>
    <input type="radio" name="option" value="1" />
    Opção 1
  </label>
  <label>
    <input type="radio" name="option" value="2" />
    Opção 2
  </label>
</fieldset>
```

### Required Fields

```jsx
<label htmlFor="email">
  Email <span aria-label="obrigatório">*</span>
</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
/>

// Ou indicar no início do formulário
<p>Campos marcados com <span aria-label="obrigatório">*</span> são obrigatórios</p>
```

---

## 🎨 Cores e Contraste

### Contraste Mínimo (WCAG AA)

```
Texto normal: 4.5:1
Texto grande: 3:1
Elementos UI: 3:1
```

### Não Dependa Apenas de Cores

```jsx
// ❌ Apenas cor
<button style={{ color: 'red' }}>Erro</button>
<button style={{ color: 'green' }}>Sucesso</button>

// ✅ Cor + ícone/texto
<button className="error">
  <X /> Erro
</button>
<button className="success">
  <Check /> Sucesso
</button>

// ✅ Padrões visuais além de cor
<div className={`status status-${status}`}>
  {status === 'error' && <X />}
  {status === 'success' && <Check />}
  {status === 'warning' && <Alert />}
  {statusMessage}
</div>
```

### Dark Mode Acessível

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}
```

---

## 🧪 Ferramentas de Teste

### ESLint Plugin

```bash
npm install -D eslint-plugin-jsx-a11y
```

```json
// .eslintrc.json
{
  "extends": [
    "plugin:jsx-a11y/recommended"
  ]
}
```

### React Testing Library

```jsx
import { render, screen } from '@testing-library/react';

test('botão é acessível', () => {
  render(<Button>Click me</Button>);
  
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});

test('input tem label', () => {
  render(
    <>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
    </>
  );
  
  const input = screen.getByLabelText(/email/i);
  expect(input).toBeInTheDocument();
});
```

### Ferramentas Browser

- **axe DevTools** (extensão Chrome/Firefox)
- **WAVE** (Web Accessibility Evaluation Tool)
- **Lighthouse** (Chrome DevTools)
- **Screen Reader**: NVDA (Windows), VoiceOver (Mac), JAWS

### Testes Manuais

1. **Navegação por teclado**
   - Consegue acessar todos os elementos?
   - Ordem de foco faz sentido?
   - Indicador de foco é visível?

2. **Zoom 200%**
   - Conteúdo ainda legível?
   - Sem scroll horizontal?

3. **Screen reader**
   - Estrutura faz sentido?
   - Todas as informações são anunciadas?
   - Imagens têm alt text?

---

## ✅ Checklist de Acessibilidade

- [ ] HTML semântico (header, nav, main, footer)
- [ ] Hierarquia de headings (h1 → h2 → h3)
- [ ] Todas as imagens com alt text
- [ ] Labels em todos os inputs
- [ ] Navegação por teclado funciona
- [ ] Indicador de foco visível
- [ ] Contraste de cores adequado (4.5:1)
- [ ] Não depende apenas de cor
- [ ] Modais com focus trap
- [ ] ARIA attributes onde necessário
- [ ] Mensagens de erro acessíveis
- [ ] Links descritivos (não "clique aqui")
- [ ] Testado com screen reader
- [ ] Passa no Lighthouse/axe

---

## 📚 Recursos

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility Docs](https://react.dev/learn/accessibility)
- [a11y Project](https://www.a11yproject.com/)
- [WebAIM](https://webaim.org/)

---

**Próximo:** Visualização de Dados 📊
