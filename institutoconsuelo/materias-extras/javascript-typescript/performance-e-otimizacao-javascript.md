# ⚡ Performance e Otimização em JavaScript

> *"Performance não é apenas sobre velocidade, é sobre experiência do usuário."*

---

## 🎯 Por que Performance Importa?

### Impacto no Negócio

- ⚡ **1 segundo a mais = 7% menos conversões**
- 📱 **53% dos usuários abandonam sites lentos (>3s)**
- 🔍 **Google penaliza sites lentos no ranking**
- 💰 **Performance ruim = prejuízo financeiro**

### Métricas Web Vitals (Google)

```text
LCP (Largest Contentful Paint)  < 2.5s  - Carregamento visual
FID (First Input Delay)         < 100ms - Interatividade
CLS (Cumulative Layout Shift)   < 0.1   - Estabilidade visual
```

---

## 🔍 Identificando Problemas de Performance

### DevTools Performance Tab

```javascript
// 1. Abrir DevTools (F12)
// 2. Aba "Performance"
// 3. Clicar em "Record" (círculo vermelho)
// 4. Realizar ações na página
// 5. Parar gravação
// 6. Analisar timeline
```

### Console.time()

```javascript
// Medir tempo de execução
console.time('operacao');

// Código a ser medido
for (let i = 0; i < 1000000; i++) {
  // ...
}

console.timeEnd('operacao');
// operacao: 45.2ms
```

### Performance API

```javascript
const inicio = performance.now();

// Código a medir
realizarOperacao();

const fim = performance.now();
console.log(`Tempo: ${fim - inicio}ms`);
```

---

## 🚀 Otimizações de JavaScript

### 1. Evite Loops Desnecessários

```javascript
// ❌ RUIM: Loop dentro de loop
function encontrarDuplicatas(array1, array2) {
  const duplicatas = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        duplicatas.push(array1[i]);
      }
    }
  }
  return duplicatas;
}
// Complexidade: O(n²)

// ✅ BOM: Usar Set
function encontrarDuplicatas(array1, array2) {
  const set2 = new Set(array2);
  return array1.filter(item => set2.has(item));
}
// Complexidade: O(n)
```

### 2. Debounce em Eventos Frequentes

```javascript
// ❌ RUIM: Executa a cada tecla
input.addEventListener('input', (e) => {
  buscarAPI(e.target.value); // Centenas de requisições!
});

// ✅ BOM: Debounce (espera parar de digitar)
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

const buscarComDebounce = debounce((valor) => {
  buscarAPI(valor);
}, 300);

input.addEventListener('input', (e) => {
  buscarComDebounce(e.target.value);
});
```

### 3. Throttle para Scroll/Resize

```javascript
// ❌ RUIM: Executa centenas de vezes
window.addEventListener('scroll', () => {
  verificarPosicao(); // Muito pesado!
});

// ✅ BOM: Throttle (limita frequência)
function throttle(fn, delay) {
  let ultimaExecucao = 0;
  return function(...args) {
    const agora = Date.now();
    if (agora - ultimaExecucao >= delay) {
      fn.apply(this, args);
      ultimaExecucao = agora;
    }
  };
}

window.addEventListener('scroll', throttle(() => {
  verificarPosicao();
}, 200));
```

### 4. Memoization (Cache de Resultados)

```javascript
// ❌ RUIM: Recalcula sempre
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
fibonacci(40); // Demora segundos!

// ✅ BOM: Memoization
function fibonacci() {
  const cache = {};
  
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fib = fibonacci();
fib(40); // Instantâneo!
```

### 5. Evite Manipulação Excessiva do DOM

```javascript
// ❌ RUIM: Manipula DOM em loop
const lista = document.getElementById('lista');
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  lista.appendChild(li); // Reflow a cada iteração!
}

// ✅ BOM: Fragment (única inserção)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
lista.appendChild(fragment); // Reflow apenas uma vez!

// ✅ MELHOR: innerHTML (mais rápido ainda)
lista.innerHTML = Array.from({ length: 1000 }, (_, i) =>
  `<li>Item ${i}</li>`
).join('');
```

### 6. requestAnimationFrame para Animações

```javascript
// ❌ RUIM: setInterval (não sincroniza com tela)
let posicao = 0;
setInterval(() => {
  posicao += 1;
  elemento.style.left = posicao + 'px';
}, 16);

// ✅ BOM: requestAnimationFrame
let posicao = 0;
function animar() {
  posicao += 1;
  elemento.style.left = posicao + 'px';
  
  if (posicao < 500) {
    requestAnimationFrame(animar);
  }
}
requestAnimationFrame(animar);
```

---

## 📦 Otimização de Carregamento

### 1. Lazy Loading de Imagens

```html
<!-- ❌ RUIM: Carrega todas imagens imediatamente -->
<img src="imagem-grande.jpg" alt="Descrição">

<!-- ✅ BOM: Lazy loading nativo -->
<img src="imagem-grande.jpg" alt="Descrição" loading="lazy">
```

**JavaScript (Intersection Observer):**

```javascript
const imagensLazy = document.querySelectorAll('img[data-src]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

imagensLazy.forEach(img => observer.observe(img));
```

```html
<img data-src="imagem-grande.jpg" alt="Descrição" src="placeholder.jpg">
```

### 2. Code Splitting (Dynamic Import)

```javascript
// ❌ RUIM: Carrega tudo imediatamente
import { funcaoPesada } from './modulo-grande.js';

// ✅ BOM: Carrega sob demanda
botao.addEventListener('click', async () => {
  const { funcaoPesada } = await import('./modulo-grande.js');
  funcaoPesada();
});
```

### 3. Preload/Prefetch

```html
<!-- Preload: Carregar recurso prioritário -->
<link rel="preload" href="fonte-importante.woff2" as="font" crossorigin>
<link rel="preload" href="script-critico.js" as="script">

<!-- Prefetch: Carregar para navegação futura -->
<link rel="prefetch" href="proxima-pagina.html">

<!-- Preconnect: Conectar ao domínio antecipadamente -->
<link rel="preconnect" href="https://api.exemplo.com">
```

---

## 🎨 Otimização de Renderização

### 1. Evite Reflows/Repaints

```javascript
// ❌ RUIM: Múltiplos reflows
const elemento = document.getElementById('box');
elemento.style.width = '100px';   // Reflow
elemento.style.height = '100px';  // Reflow
elemento.style.margin = '10px';   // Reflow

// ✅ BOM: Modificar classe CSS
elemento.className = 'box-grande'; // Reflow único

// Ou usar cssText
elemento.style.cssText = 'width: 100px; height: 100px; margin: 10px;';
```

### 2. Leitura vs Escrita no DOM

```javascript
// ❌ RUIM: Intercala leitura e escrita (força layout)
const altura1 = elemento1.offsetHeight; // Leitura → Layout
elemento1.style.height = altura1 + 10 + 'px'; // Escrita

const altura2 = elemento2.offsetHeight; // Leitura → Layout
elemento2.style.height = altura2 + 10 + 'px'; // Escrita

// ✅ BOM: Agrupa leituras e escritas
const altura1 = elemento1.offsetHeight; // Leitura
const altura2 = elemento2.offsetHeight; // Leitura

elemento1.style.height = altura1 + 10 + 'px'; // Escrita
elemento2.style.height = altura2 + 10 + 'px'; // Escrita
```

### 3. CSS Containment

```css
/* Isola repaint do elemento */
.card {
  contain: layout style paint;
}
```

---

## 💾 Otimização de Memória

### 1. Limpar Event Listeners

```javascript
// ❌ RUIM: Memory leak
function criarBotao() {
  const botao = document.createElement('button');
  botao.addEventListener('click', handleClick);
  return botao;
}

// ✅ BOM: Remover listener ao destruir
function destruirBotao(botao) {
  botao.removeEventListener('click', handleClick);
  botao.remove();
}
```

### 2. WeakMap/WeakSet para Caches

```javascript
// ❌ RUIM: Map normal impede garbage collection
const cache = new Map();
cache.set(objeto, dados); // Objeto nunca é coletado!

// ✅ BOM: WeakMap permite garbage collection
const cache = new WeakMap();
cache.set(objeto, dados); // Objeto pode ser coletado quando não usado
```

### 3. Evitar Closures Desnecessárias

```javascript
// ❌ RUIM: Closure mantém referência
function criarHandlers(dados) {
  return dados.map(item => {
    return () => console.log(item); // Mantém 'dados' na memória
  });
}

// ✅ BOM: Apenas o necessário
function criarHandlers(dados) {
  return dados.map(item => {
    const valor = item.valor; // Copia apenas o necessário
    return () => console.log(valor);
  });
}
```

---

## 🌐 Otimização de Rede

### 1. Cache de API com Service Worker

```javascript
// service-worker.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna cache se existir
      if (response) return response;
      
      // Senão, busca na rede
      return fetch(event.request).then((response) => {
        // Cacheia resposta
        const responseClone = response.clone();
        caches.open('v1').then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});
```

### 2. Compressão de Dados

```javascript
// Usar GZIP/Brotli no servidor (configuração backend)
// No frontend, enviar Accept-Encoding
fetch(url, {
  headers: {
    'Accept-Encoding': 'gzip, deflate, br'
  }
});
```

### 3. Evitar Múltiplas Requisições

```javascript
// ❌ RUIM: Múltiplas requisições
const usuario = await fetch('/api/usuario/1').then(r => r.json());
const posts = await fetch('/api/posts?userId=1').then(r => r.json());
const comentarios = await fetch('/api/comentarios?userId=1').then(r => r.json());

// ✅ BOM: Promise.all (paralelo)
const [usuario, posts, comentarios] = await Promise.all([
  fetch('/api/usuario/1').then(r => r.json()),
  fetch('/api/posts?userId=1').then(r => r.json()),
  fetch('/api/comentarios?userId=1').then(r => r.json())
]);

// ✅ MELHOR: Endpoint único (backend)
const dados = await fetch('/api/usuario-completo/1').then(r => r.json());
```

---

## 📊 Virtual Scrolling (Grandes Listas)

```javascript
// Para listas com milhares de itens
class VirtualScroll {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleItems = Math.ceil(container.clientHeight / itemHeight) + 1;
    
    this.render();
    container.addEventListener('scroll', () => this.render());
  }
  
  render() {
    const scrollTop = this.container.scrollTop;
    const startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = startIndex + this.visibleItems;
    
    // Renderiza apenas itens visíveis
    const fragment = document.createDocumentFragment();
    
    for (let i = startIndex; i < endIndex && i < this.items.length; i++) {
      const item = document.createElement('div');
      item.style.height = this.itemHeight + 'px';
      item.style.transform = `translateY(${i * this.itemHeight}px)`;
      item.textContent = this.items[i];
      fragment.appendChild(item);
    }
    
    this.container.innerHTML = '';
    this.container.appendChild(fragment);
    
    // Altura total para scroll funcionar
    this.container.style.height = this.items.length * this.itemHeight + 'px';
  }
}

// Uso
const container = document.getElementById('lista');
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
new VirtualScroll(container, items, 50);
```

---

## 🔧 Ferramentas de Análise

### 1. Lighthouse (Chrome DevTools)

```bash
# 1. Abrir DevTools (F12)
# 2. Aba "Lighthouse"
# 3. Selecionar "Performance"
# 4. Clicar "Analyze page load"
# 5. Seguir recomendações
```

### 2. WebPageTest

```text
https://www.webpagetest.org/
- Testa de diferentes locais
- Simula conexões lentas
- Comparação entre sites
```

### 3. Bundle Analyzer

```bash
# Para Webpack
npm install --save-dev webpack-bundle-analyzer

# Para Vite
npm install --save-dev rollup-plugin-visualizer
```

---

## 🎯 Checklist de Performance

### JavaScript

- [ ] Usar debounce/throttle em eventos frequentes
- [ ] Evitar loops aninhados (O(n²))
- [ ] Implementar memoization em cálculos pesados
- [ ] Lazy loading de módulos (dynamic import)
- [ ] Limpar event listeners ao destruir elementos

### DOM

- [ ] Usar DocumentFragment para inserções múltiplas
- [ ] Evitar layout thrashing (leitura/escrita intercalada)
- [ ] Usar classes CSS em vez de manipular style
- [ ] Virtual scrolling para listas grandes

### Rede

- [ ] Lazy loading de imagens
- [ ] Comprimir assets (GZIP/Brotli)
- [ ] Cache de API com Service Worker
- [ ] Minimizar requisições HTTP
- [ ] Usar CDN para assets estáticos

### Recursos

- [ ] Minificar JavaScript/CSS
- [ ] Otimizar imagens (WebP, compressão)
- [ ] Code splitting
- [ ] Tree shaking (remover código não usado)
- [ ] Preload de recursos críticos

---

## 📚 Recursos Adicionais

- **Web.dev Performance:** <https://web.dev/performance/>
- **MDN Performance:** <https://developer.mozilla.org/en-US/docs/Web/Performance>
- **Chrome DevTools:** <https://developer.chrome.com/docs/devtools/>

---

## 🎯 Resumo

| Técnica | Economia | Dificuldade |
|---------|----------|-------------|
| Lazy loading | 40-60% | Fácil |
| Debounce/Throttle | 70-90% | Fácil |
| Virtual scrolling | 80-95% | Média |
| Code splitting | 30-50% | Média |
| Memoization | 50-90% | Fácil |
| Service Worker | 60-80% | Difícil |

**Performance é um recurso, não uma otimização! ⚡✨**
