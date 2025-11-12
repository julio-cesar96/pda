# 🌳 Manipulação do DOM em JavaScript

> *"O DOM é a ponte entre HTML e JavaScript."*

---

## 🎯 O que é o DOM?

**DOM (Document Object Model)** é uma representação em árvore do documento HTML, onde cada elemento é um **objeto** que pode ser manipulado com JavaScript.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Minha Página</title>
  </head>
  <body>
    <div id="container">
      <h1 class="titulo">Olá Mundo</h1>
      <p>Parágrafo</p>
    </div>
  </body>
</html>
```

**Representação em Árvore:**

```text
Document
  └── html
       ├── head
       │    └── title
       │         └── "Minha Página"
       └── body
            └── div#container
                 ├── h1.titulo
                 │    └── "Olá Mundo"
                 └── p
                      └── "Parágrafo"
```

---

## 🔍 Selecionando Elementos

### 1. getElementById() - Por ID

**Uso:** Selecionar **1 elemento** único por ID.

```html
<div id="minhaDiv">Conteúdo</div>
```

```javascript
const elemento = document.getElementById('minhaDiv');

console.log(elemento); // <div id="minhaDiv">Conteúdo</div>
console.log(elemento.textContent); // "Conteúdo"

// ⚠️ Retorna null se não existir
const naoExiste = document.getElementById('inexistente');
console.log(naoExiste); // null
```

**Características:**
- ✅ **Mais rápido** (IDs são únicos)
- ✅ Simples e direto
- ⚠️ Retorna apenas **1 elemento** (ou null)
- ❌ Não aceita seletores CSS complexos

---

### 2. getElementsByClassName() - Por Classe

**Uso:** Selecionar **múltiplos elementos** com a mesma classe.

```html
<div class="card">Card 1</div>
<div class="card">Card 2</div>
<div class="card">Card 3</div>
```

```javascript
const cards = document.getElementsByClassName('card');

console.log(cards); // HTMLCollection [div.card, div.card, div.card]
console.log(cards.length); // 3

// ⚠️ HTMLCollection não é um array!
// Não tem .map(), .filter(), etc.

// Converter para array:
const cardsArray = Array.from(cards);
cardsArray.forEach(card => {
  console.log(card.textContent);
});

// Ou usar spread operator:
[...cards].forEach(card => {
  console.log(card.textContent);
});
```

**Características:**
- ✅ Seleciona **múltiplos elementos**
- ⚠️ Retorna **HTMLCollection** (live - atualiza automaticamente)
- ⚠️ Não é um array verdadeiro
- ❌ Não aceita seletores CSS complexos

---

### 3. getElementsByTagName() - Por Tag

**Uso:** Selecionar **todos os elementos** de uma tag.

```html
<p>Parágrafo 1</p>
<p>Parágrafo 2</p>
<div>
  <p>Parágrafo 3</p>
</div>
```

```javascript
const paragrafos = document.getElementsByTagName('p');

console.log(paragrafos); // HTMLCollection [p, p, p]
console.log(paragrafos.length); // 3

// Acessar por índice
console.log(paragrafos[0].textContent); // "Parágrafo 1"

// Selecionar TODOS os elementos
const todos = document.getElementsByTagName('*');
console.log(todos.length); // Número total de elementos no DOM
```

**Características:**
- ✅ Seleciona **múltiplos elementos**
- ✅ Útil para pegar todos os elementos de um tipo
- ⚠️ Retorna **HTMLCollection** (live)
- ❌ Não aceita seletores CSS

---

### 4. querySelector() - Seletor CSS (1 elemento)

**Uso:** Selecionar **1 elemento** usando **qualquer seletor CSS**.

```html
<div class="container">
  <p class="destaque">Primeiro</p>
  <p class="destaque">Segundo</p>
  <p id="especial">Terceiro</p>
</div>
```

```javascript
// Por ID
const especial = document.querySelector('#especial');

// Por classe (retorna o PRIMEIRO)
const destaque = document.querySelector('.destaque');
console.log(destaque.textContent); // "Primeiro"

// Por tag
const paragrafo = document.querySelector('p');

// Seletores complexos
const primeiroP = document.querySelector('div.container p');
const pDentroDeDiv = document.querySelector('div > p');
const segundoP = document.querySelector('p:nth-child(2)');

// Atributos
const inputEmail = document.querySelector('input[type="email"]');
const linkExterno = document.querySelector('a[target="_blank"]');

// Pseudo-classes
const primeiroFilho = document.querySelector('p:first-child');
const ultimoFilho = document.querySelector('p:last-child');

// ⚠️ Retorna null se não existir
const naoExiste = document.querySelector('.nao-existe');
console.log(naoExiste); // null
```

**Características:**
- ✅ **Mais versátil** (aceita qualquer seletor CSS)
- ✅ Retorna **primeiro elemento** que corresponde
- ✅ Retorna **Element** (fácil de trabalhar)
- ⚠️ Mais lento que `getElementById()`
- ⚠️ Retorna **null** se não encontrar

---

### 5. querySelectorAll() - Seletor CSS (múltiplos)

**Uso:** Selecionar **múltiplos elementos** usando **seletores CSS**.

```html
<ul>
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
  <li class="item ativo">Item 3</li>
  <li class="item">Item 4</li>
</ul>
```

```javascript
// Selecionar todos os itens
const itens = document.querySelectorAll('.item');

console.log(itens); // NodeList [li.item, li.item, li.item, li.item]
console.log(itens.length); // 4

// ✅ NodeList tem .forEach()
itens.forEach((item, index) => {
  console.log(`Item ${index + 1}:`, item.textContent);
});

// Seletores complexos
const itensAtivos = document.querySelectorAll('.item.ativo');
const itensPares = document.querySelectorAll('li:nth-child(even)');
const primeiros3 = document.querySelectorAll('li:nth-child(-n+3)');

// Converter para array (para usar .map, .filter, etc.)
const itensArray = Array.from(itens);
const textos = itensArray.map(item => item.textContent);

// Ou usar spread
const textos2 = [...itens].map(item => item.textContent);
```

**Características:**
- ✅ **Mais versátil** (aceita qualquer seletor CSS)
- ✅ Retorna **NodeList** (tem `.forEach()`)
- ⚠️ NodeList é **estático** (não atualiza automaticamente)
- ⚠️ Mais lento que métodos `getElement*`
- ✅ Retorna **lista vazia** se não encontrar (não null)

---

## 📊 Comparação: Quando Usar Cada Método?

| Método                    | Retorna          | Live? | Velocidade | Seletores CSS | Quando Usar                          |
|---------------------------|------------------|-------|------------|---------------|--------------------------------------|
| `getElementById()`        | Element ou null  | N/A   | ⚡ Rápido  | ❌ Não        | ID único conhecido                   |
| `getElementsByClassName()`| HTMLCollection   | ✅ Sim | 🚀 Médio   | ❌ Não        | Múltiplos por classe                 |
| `getElementsByTagName()`  | HTMLCollection   | ✅ Sim | 🚀 Médio   | ❌ Não        | Todos de uma tag                     |
| `querySelector()`         | Element ou null  | ❌ Não | 🐌 Lento   | ✅ Sim        | 1 elemento, seletor complexo         |
| `querySelectorAll()`      | NodeList         | ❌ Não | 🐌 Lento   | ✅ Sim        | Múltiplos, seletor complexo          |

### Recomendações

```javascript
// ✅ MELHOR: ID conhecido
const header = document.getElementById('header');

// ✅ BOM: Múltiplos elementos, classe simples (se precisa de live)
const botoes = document.getElementsByClassName('btn');

// ✅ ÓTIMO: Seletor complexo, 1 elemento
const primeiroBotao = document.querySelector('.container .btn:first-child');

// ✅ ÓTIMO: Múltiplos elementos, seletor complexo
const botoesAtivos = document.querySelectorAll('.btn.ativo');

// ❌ EVITAR: querySelector para ID simples (use getElementById)
const header = document.querySelector('#header'); // Funciona, mas mais lento
```

---

## 🔎 Seletores Avançados

### Combinadores

```javascript
// Descendente (qualquer nível)
const spans = document.querySelectorAll('div span'); // Todos <span> dentro de <div>

// Filho direto
const filhos = document.querySelectorAll('ul > li'); // Apenas <li> filhos diretos de <ul>

// Irmão adjacente (+)
const proximo = document.querySelector('h2 + p'); // <p> imediatamente após <h2>

// Irmãos gerais (~)
const irmãos = document.querySelectorAll('h2 ~ p'); // Todos <p> após <h2>
```

### Pseudo-classes

```javascript
// Estruturais
const primeiro = document.querySelector('li:first-child');
const ultimo = document.querySelector('li:last-child');
const terceiro = document.querySelector('li:nth-child(3)');
const pares = document.querySelectorAll('li:nth-child(even)');
const impares = document.querySelectorAll('li:nth-child(odd)');

// Estados
const checkboxMarcado = document.querySelector('input:checked');
const inputDesabilitado = document.querySelector('input:disabled');
const linkVisitado = document.querySelector('a:visited');

// Negação
const naoAtivos = document.querySelectorAll('li:not(.ativo)');
```

### Atributos

```javascript
// Atributo existe
const comTitle = document.querySelectorAll('[title]');

// Atributo com valor exato
const email = document.querySelector('[type="email"]');

// Atributo começa com
const linksHTTPS = document.querySelectorAll('[href^="https"]');

// Atributo termina com
const pngs = document.querySelectorAll('[src$=".png"]');

// Atributo contém
const google = document.querySelectorAll('[href*="google"]');

// Múltiplos atributos
const inputs = document.querySelector('[type="text"][required]');
```

---

## 🎨 Manipulando Elementos Selecionados

### Modificar Conteúdo

```javascript
const titulo = document.querySelector('h1');

// textContent: apenas texto (ignora HTML)
titulo.textContent = 'Novo Título';
titulo.textContent = '<strong>Negrito</strong>'; // Mostra literalmente "<strong>..."

// innerHTML: interpreta HTML
titulo.innerHTML = '<strong>Negrito</strong>'; // <h1><strong>Negrito</strong></h1>

// ⚠️ Cuidado com innerHTML (XSS vulnerability)
const userInput = '<img src=x onerror=alert("XSS")>';
titulo.innerHTML = userInput; // ❌ PERIGOSO!

// innerText: respeita CSS (display: none não aparece)
const div = document.querySelector('div');
div.innerText = 'Texto visível';
```

### Modificar Atributos

```javascript
const imagem = document.querySelector('img');

// getAttribute / setAttribute
console.log(imagem.getAttribute('src'));
imagem.setAttribute('src', 'nova-imagem.jpg');
imagem.setAttribute('alt', 'Descrição da imagem');

// Propriedades diretas (preferível)
imagem.src = 'nova-imagem.jpg';
imagem.alt = 'Descrição';

// Verificar se tem atributo
if (imagem.hasAttribute('data-id')) {
  console.log('Tem data-id');
}

// Remover atributo
imagem.removeAttribute('title');

// Data attributes
const card = document.querySelector('.card');
card.setAttribute('data-user-id', '123');
console.log(card.dataset.userId); // "123" (camelCase!)
card.dataset.productName = 'Notebook';
// <div class="card" data-user-id="123" data-product-name="Notebook">
```

### Modificar Classes

```javascript
const botao = document.querySelector('button');

// classList.add()
botao.classList.add('ativo');
botao.classList.add('btn', 'btn-primary'); // Múltiplas classes

// classList.remove()
botao.classList.remove('ativo');

// classList.toggle() (adiciona se não tem, remove se tem)
botao.classList.toggle('ativo');

// classList.contains()
if (botao.classList.contains('ativo')) {
  console.log('Botão está ativo');
}

// classList.replace()
botao.classList.replace('btn-primary', 'btn-secondary');

// ❌ EVITAR: className (sobrescreve tudo)
botao.className = 'btn ativo'; // Perde outras classes!
```

### Modificar Estilos

```javascript
const caixa = document.querySelector('.caixa');

// Estilos inline (style)
caixa.style.backgroundColor = 'red';
caixa.style.width = '200px';
caixa.style.fontSize = '16px'; // camelCase!

// Múltiplos estilos
Object.assign(caixa.style, {
  backgroundColor: 'blue',
  color: 'white',
  padding: '20px',
  borderRadius: '10px'
});

// cssText (sobrescreve tudo)
caixa.style.cssText = 'background: red; color: white; padding: 20px;';

// ⚠️ Preferível: usar classes CSS
// ❌ Ruim
elemento.style.display = 'none';

// ✅ Bom
elemento.classList.add('hidden');
// CSS: .hidden { display: none; }
```

---

## 🏗️ Criar e Adicionar Elementos

### Criar Elementos

```javascript
// 1. createElement()
const div = document.createElement('div');
div.textContent = 'Nova div';
div.classList.add('minha-classe');
div.id = 'minhaDiv';

// 2. Adicionar ao DOM
const container = document.getElementById('container');

// appendChild() - adiciona no final
container.appendChild(div);

// append() - pode adicionar múltiplos (mais moderno)
container.append(div, 'Texto', outroElemento);

// prepend() - adiciona no início
container.prepend(div);

// insertBefore() - adiciona antes de um elemento
const referencia = document.querySelector('.referencia');
container.insertBefore(div, referencia);

// Exemplo completo: criar card
function criarCard(titulo, descricao) {
  const card = document.createElement('div');
  card.classList.add('card');
  
  const h3 = document.createElement('h3');
  h3.textContent = titulo;
  
  const p = document.createElement('p');
  p.textContent = descricao;
  
  const botao = document.createElement('button');
  botao.textContent = 'Ver mais';
  botao.classList.add('btn');
  
  card.append(h3, p, botao);
  
  return card;
}

const meuCard = criarCard('Título', 'Descrição do card');
document.body.appendChild(meuCard);
```

### innerHTML vs createElement

```javascript
// ❌ innerHTML (menos performático, perde event listeners)
container.innerHTML += '<div class="card">Novo card</div>';

// ✅ createElement (mais performático, mantém listeners)
const card = document.createElement('div');
card.className = 'card';
card.textContent = 'Novo card';
container.appendChild(card);

// innerHTML é útil para criar estrutura complexa
const cardHTML = `
  <div class="card">
    <h3>${titulo}</h3>
    <p>${descricao}</p>
    <button class="btn">Ver mais</button>
  </div>
`;
container.innerHTML += cardHTML;

// ✅ Melhor: insertAdjacentHTML (não perde listeners existentes)
container.insertAdjacentHTML('beforeend', cardHTML);

// Posições:
// 'beforebegin': antes do elemento
// 'afterbegin': primeiro filho
// 'beforeend': último filho
// 'afterend': depois do elemento
```

---

## 🗑️ Remover Elementos

```javascript
const elemento = document.querySelector('.remover');

// 1. remove() (moderno)
elemento.remove();

// 2. removeChild() (antigo, precisa do pai)
const pai = elemento.parentElement;
pai.removeChild(elemento);

// 3. Remover todos os filhos
const container = document.getElementById('container');

// Opção 1: Loop
while (container.firstChild) {
  container.removeChild(container.firstChild);
}

// Opção 2: innerHTML (mais rápido)
container.innerHTML = '';

// Opção 3: replaceChildren (moderno)
container.replaceChildren();
```

---

## 🔄 Navegar pelo DOM

### Propriedades de Navegação

```javascript
const elemento = document.querySelector('.item');

// Pai
console.log(elemento.parentElement);
console.log(elemento.parentNode);

// Filhos
console.log(elemento.children); // HTMLCollection (apenas elementos)
console.log(elemento.childNodes); // NodeList (inclui texto, comentários)
console.log(elemento.firstElementChild);
console.log(elemento.lastElementChild);

// Irmãos
console.log(elemento.nextElementSibling);
console.log(elemento.previousElementSibling);

// Exemplo: navegar para cima até encontrar classe
function encontrarAncestral(elemento, classe) {
  let atual = elemento;
  
  while (atual && !atual.classList.contains(classe)) {
    atual = atual.parentElement;
  }
  
  return atual;
}

const card = encontrarAncestral(botao, 'card');
```

### closest() - Ancestral mais próximo

```javascript
const botao = document.querySelector('button');

// Encontra o ancestral mais próximo com a classe 'card'
const card = botao.closest('.card');

// Útil para event delegation
document.addEventListener('click', (event) => {
  const botao = event.target.closest('button');
  
  if (botao) {
    const card = botao.closest('.card');
    console.log('Clicou no botão do card:', card);
  }
});
```

---

## 🎯 Casos Práticos

### 1. To-Do List

```javascript
const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const lista = document.getElementById('todoLista');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const texto = input.value.trim();
  if (!texto) return;
  
  // Criar elementos
  const li = document.createElement('li');
  li.classList.add('todo-item');
  
  const span = document.createElement('span');
  span.textContent = texto;
  
  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'Remover';
  btnRemover.classList.add('btn-remover');
  
  // Event listeners
  span.addEventListener('click', () => {
    li.classList.toggle('concluido');
  });
  
  btnRemover.addEventListener('click', () => {
    li.remove();
  });
  
  // Adicionar ao DOM
  li.append(span, btnRemover);
  lista.appendChild(li);
  
  // Limpar input
  input.value = '';
});
```

### 2. Filtro de Lista

```javascript
const inputBusca = document.getElementById('busca');
const itens = document.querySelectorAll('.item');

inputBusca.addEventListener('input', (event) => {
  const termo = event.target.value.toLowerCase();
  
  itens.forEach(item => {
    const texto = item.textContent.toLowerCase();
    
    if (texto.includes(termo)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});
```

### 3. Accordion

```javascript
const accordions = document.querySelectorAll('.accordion-item');

accordions.forEach(item => {
  const header = item.querySelector('.accordion-header');
  const conteudo = item.querySelector('.accordion-content');
  
  header.addEventListener('click', () => {
    // Fechar outros
    accordions.forEach(outroItem => {
      if (outroItem !== item) {
        outroItem.classList.remove('ativo');
      }
    });
    
    // Toggle atual
    item.classList.toggle('ativo');
  });
});
```

### 4. Galeria de Imagens

```javascript
const imagens = [
  { src: 'img1.jpg', alt: 'Imagem 1' },
  { src: 'img2.jpg', alt: 'Imagem 2' },
  { src: 'img3.jpg', alt: 'Imagem 3' }
];

const galeria = document.getElementById('galeria');

imagens.forEach((img, index) => {
  const figure = document.createElement('figure');
  
  const imgElement = document.createElement('img');
  imgElement.src = img.src;
  imgElement.alt = img.alt;
  imgElement.dataset.index = index;
  
  const caption = document.createElement('figcaption');
  caption.textContent = img.alt;
  
  imgElement.addEventListener('click', () => {
    abrirModal(img.src, img.alt);
  });
  
  figure.append(imgElement, caption);
  galeria.appendChild(figure);
});

function abrirModal(src, alt) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <img src="${src}" alt="${alt}">
      <button class="close">×</button>
    </div>
  `;
  
  modal.querySelector('.close').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  document.body.appendChild(modal);
}
```

---

## ⚡ Performance e Boas Práticas

### 1. Cache de Seleções

```javascript
// ❌ RUIM: Seleciona toda vez
for (let i = 0; i < 1000; i++) {
  document.querySelector('.container').appendChild(elemento);
}

// ✅ BOM: Seleciona uma vez
const container = document.querySelector('.container');
for (let i = 0; i < 1000; i++) {
  container.appendChild(elemento);
}
```

### 2. Document Fragment (múltiplas adições)

```javascript
// ❌ RUIM: Reflow a cada appendChild
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  lista.appendChild(li); // Reflow!
}

// ✅ BOM: Reflow apenas uma vez
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}

lista.appendChild(fragment); // 1 reflow apenas
```

### 3. Event Delegation

```javascript
// ❌ RUIM: Listener em cada item
const itens = document.querySelectorAll('.item');
itens.forEach(item => {
  item.addEventListener('click', () => {
    console.log('Clicou');
  });
});

// ✅ BOM: 1 listener no pai
const lista = document.querySelector('.lista');
lista.addEventListener('click', (event) => {
  if (event.target.classList.contains('item')) {
    console.log('Clicou');
  }
});
```

### 4. Evitar Layout Thrashing

```javascript
// ❌ RUIM: Leitura e escrita alternadas (força reflow)
for (let i = 0; i < elementos.length; i++) {
  const altura = elementos[i].offsetHeight; // Leitura (reflow)
  elementos[i].style.height = altura + 10 + 'px'; // Escrita
}

// ✅ BOM: Separar leituras de escritas
const alturas = [];

// Fase 1: Leituras
for (let i = 0; i < elementos.length; i++) {
  alturas[i] = elementos[i].offsetHeight;
}

// Fase 2: Escritas
for (let i = 0; i < elementos.length; i++) {
  elementos[i].style.height = alturas[i] + 10 + 'px';
}
```

---

## 🎯 Resumo - Cheat Sheet

```javascript
// ========== SELEÇÃO ==========

// ID (1 elemento)
document.getElementById('id')

// Classe (múltiplos, live)
document.getElementsByClassName('classe')

// Tag (múltiplos, live)
document.getElementsByTagName('div')

// Seletor CSS (1 elemento)
document.querySelector('.classe')

// Seletor CSS (múltiplos, estático)
document.querySelectorAll('.classe')

// ========== MANIPULAÇÃO ==========

// Conteúdo
elemento.textContent = 'Texto'
elemento.innerHTML = '<strong>HTML</strong>'

// Atributos
elemento.getAttribute('src')
elemento.setAttribute('src', 'url')
elemento.dataset.userId = '123'

// Classes
elemento.classList.add('classe')
elemento.classList.remove('classe')
elemento.classList.toggle('classe')
elemento.classList.contains('classe')

// Estilos
elemento.style.color = 'red'
elemento.style.fontSize = '16px'

// ========== CRIAR/REMOVER ==========

// Criar
const div = document.createElement('div')
div.textContent = 'Conteúdo'
pai.appendChild(div)
pai.append(div, 'texto', outro)
pai.prepend(div)

// Remover
elemento.remove()
pai.removeChild(elemento)

// ========== NAVEGAÇÃO ==========

elemento.parentElement
elemento.children
elemento.firstElementChild
elemento.lastElementChild
elemento.nextElementSibling
elemento.previousElementSibling
elemento.closest('.classe')
```

---

## 📚 Recursos Adicionais

- **MDN - DOM:** <https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model>
- **JavaScript.info - DOM:** <https://javascript.info/dom-nodes>
- **Can I Use:** <https://caniuse.com/> (compatibilidade de métodos)

---

**Domine a manipulação do DOM para criar interfaces dinâmicas! 🌳✨**
