# ⚡ Eventos em JavaScript

> *"Eventos são a ponte entre o usuário e sua aplicação."*

---

## 🎯 O que são Eventos?

**Eventos** são ações ou ocorrências que acontecem no navegador:

- 🖱️ **Cliques** do usuário
- ⌨️ **Teclas** pressionadas
- 📄 **Página** carregada
- 📏 **Scroll** da página
- 📝 **Formulário** enviado
- 🎨 **Elementos** que aparecem/desaparecem

JavaScript pode "escutar" esses eventos e reagir a eles.

---

## 👂 Event Listeners

### Sintaxe Básica

```javascript
elemento.addEventListener('tipo-evento', função);
```

### Exemplo Simples

```html
<button id="meuBotao">Clique aqui</button>
```

```javascript
const botao = document.getElementById('meuBotao');

botao.addEventListener('click', function() {
  console.log('Botão clicado!');
});
```

### Arrow Function

```javascript
botao.addEventListener('click', () => {
  console.log('Botão clicado!');
});
```

### Função Nomeada (Reutilizável)

```javascript
function handleClick() {
  console.log('Botão clicado!');
}

botao.addEventListener('click', handleClick);
```

---

## 🖱️ Eventos de Mouse

### Tipos Comuns

```javascript
const elemento = document.getElementById('box');

// Click simples
elemento.addEventListener('click', () => {
  console.log('Clicou!');
});

// Duplo clique
elemento.addEventListener('dblclick', () => {
  console.log('Duplo clique!');
});

// Mouse sobre o elemento
elemento.addEventListener('mouseenter', () => {
  console.log('Mouse entrou!');
});

// Mouse sai do elemento
elemento.addEventListener('mouseleave', () => {
  console.log('Mouse saiu!');
});

// Mouse se move sobre o elemento
elemento.addEventListener('mousemove', (event) => {
  console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
});

// Botão do mouse pressionado
elemento.addEventListener('mousedown', () => {
  console.log('Botão pressionado!');
});

// Botão do mouse solto
elemento.addEventListener('mouseup', () => {
  console.log('Botão solto!');
});
```

### Exemplo Prático: Hover Effect

```html
<div id="card" style="width: 200px; height: 200px; background: #3498db;"></div>
```

```javascript
const card = document.getElementById('card');

card.addEventListener('mouseenter', () => {
  card.style.background = '#e74c3c';
  card.style.transform = 'scale(1.1)';
  card.style.transition = 'all 0.3s';
});

card.addEventListener('mouseleave', () => {
  card.style.background = '#3498db';
  card.style.transform = 'scale(1)';
});
```

---

## ⌨️ Eventos de Teclado

### Tipos

```javascript
const input = document.getElementById('meuInput');

// Tecla pressionada
input.addEventListener('keydown', (event) => {
  console.log('Tecla pressionada:', event.key);
});

// Tecla solta
input.addEventListener('keyup', (event) => {
  console.log('Tecla solta:', event.key);
});

// Tecla pressionada (caractere)
input.addEventListener('keypress', (event) => {
  console.log('Caractere:', event.key);
});
```

### Propriedades do Event Object

```javascript
input.addEventListener('keydown', (event) => {
  console.log('Tecla:', event.key);          // "a", "Enter", "Escape"
  console.log('Código:', event.code);        // "KeyA", "Enter", "Escape"
  console.log('Ctrl?', event.ctrlKey);       // true/false
  console.log('Shift?', event.shiftKey);     // true/false
  console.log('Alt?', event.altKey);         // true/false
  console.log('Meta (Cmd)?', event.metaKey); // true/false
});
```

### Exemplo: Atalhos de Teclado

```javascript
document.addEventListener('keydown', (event) => {
  // Ctrl + S (Salvar)
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault(); // Impede comportamento padrão
    console.log('Salvando...');
  }
  
  // Escape (Fechar modal)
  if (event.key === 'Escape') {
    console.log('Fechando modal...');
  }
  
  // Enter (Enviar formulário)
  if (event.key === 'Enter') {
    console.log('Enviando formulário...');
  }
});
```

### Exemplo: Contador de Caracteres

```html
<textarea id="comentario" maxlength="280"></textarea>
<p>Caracteres restantes: <span id="contador">280</span></p>
```

```javascript
const textarea = document.getElementById('comentario');
const contador = document.getElementById('contador');

textarea.addEventListener('input', () => {
  const restantes = 280 - textarea.value.length;
  contador.textContent = restantes;
  
  if (restantes < 20) {
    contador.style.color = 'red';
  } else {
    contador.style.color = 'black';
  }
});
```

---

## 📝 Eventos de Formulário

### input vs change

```javascript
const input = document.getElementById('nome');

// Dispara a cada caractere digitado
input.addEventListener('input', (event) => {
  console.log('Valor atual:', event.target.value);
});

// Dispara quando perde foco E valor mudou
input.addEventListener('change', (event) => {
  console.log('Valor final:', event.target.value);
});
```

### submit (Envio de Formulário)

```html
<form id="meuForm">
  <input type="text" name="nome" required>
  <input type="email" name="email" required>
  <button type="submit">Enviar</button>
</form>
```

```javascript
const form = document.getElementById('meuForm');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede recarregar página
  
  const formData = new FormData(form);
  const dados = {
    nome: formData.get('nome'),
    email: formData.get('email')
  };
  
  console.log('Dados:', dados);
  // Enviar para API...
});
```

### focus e blur

```javascript
const input = document.getElementById('email');

// Quando recebe foco
input.addEventListener('focus', () => {
  input.style.borderColor = '#3498db';
  input.style.boxShadow = '0 0 5px rgba(52, 152, 219, 0.5)';
});

// Quando perde foco
input.addEventListener('blur', () => {
  input.style.borderColor = '#ccc';
  input.style.boxShadow = 'none';
  
  // Validar email
  if (!input.value.includes('@')) {
    input.style.borderColor = 'red';
  }
});
```

---

## 📄 Eventos de Documento/Janela

### DOMContentLoaded

```javascript
// Dispara quando DOM está pronto (antes de imagens)
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM pronto!');
  // Inicializar aplicação...
});
```

### load

```javascript
// Dispara quando TUDO foi carregado (incluindo imagens)
window.addEventListener('load', () => {
  console.log('Página totalmente carregada!');
});
```

### scroll

```javascript
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  console.log('Scroll position:', scrollTop);
  
  // Exemplo: Mostrar botão "Voltar ao topo"
  const btnTopo = document.getElementById('btnTopo');
  if (scrollTop > 300) {
    btnTopo.style.display = 'block';
  } else {
    btnTopo.style.display = 'none';
  }
});
```

### resize

```javascript
window.addEventListener('resize', () => {
  console.log('Largura:', window.innerWidth);
  console.log('Altura:', window.innerHeight);
  
  // Exemplo: Layout responsivo via JS
  if (window.innerWidth < 768) {
    console.log('Mobile');
  } else {
    console.log('Desktop');
  }
});
```

---

## 🎯 Event Object

### Propriedades Úteis

```javascript
elemento.addEventListener('click', (event) => {
  console.log('Tipo:', event.type);              // "click"
  console.log('Target:', event.target);          // Elemento clicado
  console.log('CurrentTarget:', event.currentTarget); // Elemento com listener
  console.log('Timestamp:', event.timeStamp);    // Quando ocorreu
  
  // Posição do mouse
  console.log('ClientX:', event.clientX);        // Relativo ao viewport
  console.log('ClientY:', event.clientY);
  console.log('PageX:', event.pageX);            // Relativo à página
  console.log('PageY:', event.pageY);
  console.log('ScreenX:', event.screenX);        // Relativo à tela
  console.log('ScreenY:', event.screenY);
});
```

### Métodos Importantes

```javascript
elemento.addEventListener('click', (event) => {
  // Impede comportamento padrão (ex: link não navega)
  event.preventDefault();
  
  // Para propagação do evento (bubbling/capturing)
  event.stopPropagation();
  
  // Para propagação E outros listeners no mesmo elemento
  event.stopImmediatePropagation();
});
```

---

## 🫧 Event Bubbling (Propagação)

### Como Funciona

```html
<div id="pai" style="padding: 50px; background: lightblue;">
  Pai
  <div id="filho" style="padding: 30px; background: lightcoral;">
    Filho
    <button id="botao">Clique aqui</button>
  </div>
</div>
```

```javascript
const pai = document.getElementById('pai');
const filho = document.getElementById('filho');
const botao = document.getElementById('botao');

// Evento "sobe" do elemento clicado até o document
botao.addEventListener('click', () => {
  console.log('1. Botão clicado!');
});

filho.addEventListener('click', () => {
  console.log('2. Filho clicado!');
});

pai.addEventListener('click', () => {
  console.log('3. Pai clicado!');
});

// Ao clicar no botão, saída:
// 1. Botão clicado!
// 2. Filho clicado!
// 3. Pai clicado!
```

### Parar Propagação

```javascript
botao.addEventListener('click', (event) => {
  event.stopPropagation(); // Evento não sobe!
  console.log('Apenas botão!');
});

// Agora, ao clicar no botão:
// Apenas botão!
```

---

## 🎯 Event Delegation (Delegação)

### Problema

```html
<ul id="lista">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <!-- Mais 100 itens... -->
</ul>
```

```javascript
// ❌ RUIM: 103 event listeners!
const itens = document.querySelectorAll('#lista li');
itens.forEach(item => {
  item.addEventListener('click', () => {
    console.log('Clicou em:', item.textContent);
  });
});
```

### Solução: Event Delegation

```javascript
// ✅ BOM: 1 event listener!
const lista = document.getElementById('lista');

lista.addEventListener('click', (event) => {
  // Verificar se clicou em um <li>
  if (event.target.tagName === 'LI') {
    console.log('Clicou em:', event.target.textContent);
  }
});
```

### Vantagens

- ✅ **Menos memória** (menos listeners)
- ✅ **Funciona com elementos dinâmicos** (adicionados depois)
- ✅ **Melhor performance**

### Exemplo com Elementos Dinâmicos

```javascript
const lista = document.getElementById('lista');
const btnAdicionar = document.getElementById('adicionar');

// Event delegation (funciona mesmo com novos itens!)
lista.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.remove(); // Remove ao clicar
  }
});

// Adicionar novos itens
btnAdicionar.addEventListener('click', () => {
  const novoItem = document.createElement('li');
  novoItem.textContent = `Item ${lista.children.length + 1}`;
  lista.appendChild(novoItem);
});
```

---

## 🔄 Remover Event Listeners

### Sintaxe

```javascript
elemento.removeEventListener('tipo-evento', função);
```

### Exemplo

```javascript
function handleClick() {
  console.log('Clicou!');
  // Remover listener após primeiro clique
  botao.removeEventListener('click', handleClick);
}

const botao = document.getElementById('btn');
botao.addEventListener('click', handleClick);
```

### ⚠️ Cuidado com Arrow Functions

```javascript
// ❌ NÃO FUNCIONA (funções diferentes!)
elemento.addEventListener('click', () => {
  console.log('Clicou!');
});

elemento.removeEventListener('click', () => {
  console.log('Clicou!');
});

// ✅ FUNCIONA (mesma função)
const handler = () => console.log('Clicou!');
elemento.addEventListener('click', handler);
elemento.removeEventListener('click', handler);
```

---

## 🎨 Eventos Customizados

### Criar e Disparar

```javascript
// Criar evento customizado
const meuEvento = new CustomEvent('meuEvento', {
  detail: { mensagem: 'Dados customizados!' }
});

// Escutar evento
elemento.addEventListener('meuEvento', (event) => {
  console.log('Evento customizado!', event.detail.mensagem);
});

// Disparar evento
elemento.dispatchEvent(meuEvento);
```

### Exemplo Prático: Sistema de Notificações

```javascript
// Componente de notificação
class NotificationSystem {
  constructor() {
    this.container = document.getElementById('notifications');
    
    // Escutar eventos customizados
    document.addEventListener('notify', (event) => {
      this.show(event.detail);
    });
  }
  
  show({ message, type = 'info' }) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    this.container.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

const notificationSystem = new NotificationSystem();

// De qualquer lugar do código:
document.dispatchEvent(new CustomEvent('notify', {
  detail: { message: 'Bem-vindo!', type: 'success' }
}));
```

---

## 🚀 Padrões e Boas Práticas

### 1. Event Delegation para Listas

```javascript
// ✅ BOM
document.getElementById('lista').addEventListener('click', (event) => {
  if (event.target.classList.contains('item')) {
    // Handle click
  }
});

// ❌ RUIM
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => {
    // Handle click
  });
});
```

### 2. Debounce para Eventos Frequentes

```javascript
// Função debounce
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Uso
const handleSearch = debounce((event) => {
  console.log('Buscando:', event.target.value);
  // Fazer requisição à API...
}, 300);

input.addEventListener('input', handleSearch);
```

### 3. Remover Listeners ao Destruir Componentes

```javascript
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.button = document.getElementById('btn');
    this.button.addEventListener('click', this.handleClick);
  }
  
  handleClick() {
    console.log('Clicou!');
  }
  
  destroy() {
    // Limpar listeners
    this.button.removeEventListener('click', this.handleClick);
  }
}
```

### 4. Passive Listeners (Performance)

```javascript
// Para scroll/touch events
elemento.addEventListener('touchstart', handler, { passive: true });
elemento.addEventListener('scroll', handler, { passive: true });

// Melhora performance (não bloqueia scroll)
```

### 5. Once (Executar Apenas Uma Vez)

```javascript
botao.addEventListener('click', () => {
  console.log('Executado apenas uma vez!');
}, { once: true });

// Equivalente a:
function handler() {
  console.log('Executado apenas uma vez!');
  botao.removeEventListener('click', handler);
}
botao.addEventListener('click', handler);
```

---

## 📊 Exemplos Práticos

### 1. Modal Acessível

```javascript
const modal = document.getElementById('modal');
const btnAbrir = document.getElementById('abrirModal');
const btnFechar = document.getElementById('fecharModal');

btnAbrir.addEventListener('click', () => {
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
});

btnFechar.addEventListener('click', () => {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
});

// Fechar com Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    btnFechar.click();
  }
});

// Fechar clicando fora
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    btnFechar.click();
  }
});
```

### 2. Drag and Drop

```javascript
const draggable = document.getElementById('draggable');
const dropzone = document.getElementById('dropzone');

draggable.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.target.classList.add('dragging');
});

draggable.addEventListener('dragend', (event) => {
  event.target.classList.remove('dragging');
});

dropzone.addEventListener('dragover', (event) => {
  event.preventDefault(); // Permitir drop
  dropzone.classList.add('drag-over');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('drag-over');
});

dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  const elemento = document.getElementById(id);
  dropzone.appendChild(elemento);
  dropzone.classList.remove('drag-over');
});
```

### 3. Infinite Scroll

```javascript
const container = document.getElementById('container');
let page = 1;
let loading = false;

window.addEventListener('scroll', () => {
  // Chegou perto do fim?
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
    loadMore();
  }
});

async function loadMore() {
  loading = true;
  page++;
  
  const response = await fetch(`/api/items?page=${page}`);
  const items = await response.json();
  
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.title;
    container.appendChild(div);
  });
  
  loading = false;
}
```

---

## 📚 Recursos Adicionais

- **MDN Events:** <https://developer.mozilla.org/pt-BR/docs/Web/Events>
- **JavaScript.info Events:** <https://javascript.info/events>
- **Event Reference:** <https://developer.mozilla.org/en-US/docs/Web/Events>

---

## 🎯 Resumo

```javascript
// Adicionar listener
elemento.addEventListener('evento', função);

// Remover listener
elemento.removeEventListener('evento', função);

// Prevenir comportamento padrão
event.preventDefault();

// Parar propagação
event.stopPropagation();

// Event delegation
pai.addEventListener('click', (event) => {
  if (event.target.matches('.filho')) {
    // Handle
  }
});

// Eventos customizados
const evento = new CustomEvent('meuEvento', { detail: dados });
elemento.dispatchEvent(evento);
```

**Domine eventos para criar interfaces interativas e responsivas! ⚡✨**
