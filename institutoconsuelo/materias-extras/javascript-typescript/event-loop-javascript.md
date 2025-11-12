# 🔄 Event Loop em JavaScript

> *"JavaScript é single-threaded, mas o Event Loop o torna assíncrono."*

---

## 🎯 O que é o Event Loop?

O **Event Loop** é o mecanismo que permite JavaScript executar código assíncrono apesar de ser **single-threaded** (uma única thread).

### Por que isso importa?

```javascript
// ❓ Por que isso não trava o navegador?
console.log('1. Início');

setTimeout(() => {
  console.log('2. Timeout!');
}, 2000);

console.log('3. Fim');

// Saída:
// 1. Início
// 3. Fim
// 2. Timeout! (após 2 segundos)
```

JavaScript é **single-threaded**, mas delega tarefas assíncronas (como setTimeout) para o navegador (Web APIs), enquanto continua executando código síncrono.

---

## 🏗️ Arquitetura do JavaScript Runtime

### Componentes Principais

```text
┌─────────────────────────────────────────┐
│          JavaScript Engine              │
│  ┌─────────────┐   ┌─────────────┐     │
│  │  Call Stack │   │    Heap     │     │
│  │  (Pilha)    │   │  (Memória)  │     │
│  └─────────────┘   └─────────────┘     │
└─────────────────────────────────────────┘
          ↓                    ↑
┌─────────────────────────────────────────┐
│           Web APIs (Browser)            │
│  setTimeout, fetch, DOM events, etc.    │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│         Callback Queue (Fila)           │
│    [callback1, callback2, callback3]    │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│           Event Loop                    │
│  "Call Stack vazia? → Pega próximo      │
│   callback da fila e executa"           │
└─────────────────────────────────────────┘
```

---

## 📚 Call Stack (Pilha de Execução)

### O que é?

**Stack (pilha)** que rastreia **onde estamos** na execução do código.

### Como Funciona?

```javascript
function terceira() {
  console.log('3. Terceira função');
}

function segunda() {
  console.log('2. Segunda função');
  terceira();
  console.log('4. Volta para segunda');
}

function primeira() {
  console.log('1. Primeira função');
  segunda();
  console.log('5. Volta para primeira');
}

primeira();
console.log('6. Fim');
```

**Call Stack ao longo do tempo:**

```text
Passo 1:           Passo 2:           Passo 3:
┌─────────┐        ┌─────────┐        ┌─────────┐
│primeira │        │segunda  │        │terceira │
└─────────┘        ├─────────┤        ├─────────┤
                   │primeira │        │segunda  │
                   └─────────┘        ├─────────┤
                                      │primeira │
                                      └─────────┘

Passo 4:           Passo 5:           Passo 6:
┌─────────┐        ┌─────────┐        (vazia)
│segunda  │        │primeira │        
├─────────┤        └─────────┘        
│primeira │                           
└─────────┘                           
```

---

## 🌐 Web APIs

### O que são?

APIs fornecidas pelo **navegador** (não fazem parte do JavaScript em si):

- `setTimeout` / `setInterval`
- `fetch` (requisições HTTP)
- `DOM events` (click, scroll, etc.)
- `console.log`
- `localStorage`
- `Geolocation API`

### Exemplo

```javascript
console.log('1. Início');

// setTimeout é uma Web API!
setTimeout(() => {
  console.log('2. Timeout!');
}, 0);

console.log('3. Fim');

// Saída:
// 1. Início
// 3. Fim
// 2. Timeout! (mesmo com delay 0!)
```

**Por quê?** Porque `setTimeout` é delegado para a Web API, e seu callback vai para a **Callback Queue**, só sendo executado quando a Call Stack estiver vazia.

---

## 📋 Callback Queue (Fila de Callbacks)

### O que é?

**Fila** onde callbacks de Web APIs esperam para serem executados.

### Regra: FIFO (First In, First Out)

```javascript
setTimeout(() => console.log('A'), 0);
setTimeout(() => console.log('B'), 0);
setTimeout(() => console.log('C'), 0);

// Saída: A, B, C (ordem da fila)
```

---

## 🔄 Event Loop - Como Funciona

### Responsabilidade

```text
ENQUANTO (true) {
  SE (Call Stack está vazia) {
    SE (Callback Queue tem callbacks) {
      callback = Callback Queue.shift()
      Call Stack.push(callback)
      executar callback
    }
  }
}
```

### Visualização Passo a Passo

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

console.log('3');
```

**Timeline:**

```text
┌──────────────────────────────────────────────────────┐
│ Tempo 0ms: Call Stack = [console.log('1')]          │
│ Saída: "1"                                           │
│ Call Stack = []                                      │
├──────────────────────────────────────────────────────┤
│ Tempo 0ms: setTimeout encontrado                     │
│ Web API: setTimeout agendado                         │
│ Call Stack continua...                               │
├──────────────────────────────────────────────────────┤
│ Tempo 0ms: Call Stack = [console.log('3')]          │
│ Saída: "3"                                           │
│ Call Stack = []                                      │
├──────────────────────────────────────────────────────┤
│ Tempo 0ms: setTimeout completo (Web API)            │
│ Callback adicionado à Callback Queue                │
├──────────────────────────────────────────────────────┤
│ Event Loop verifica: Call Stack vazia?              │
│ SIM → Pega callback da fila                         │
│ Call Stack = [callback do setTimeout]               │
│ Saída: "2"                                           │
└──────────────────────────────────────────────────────┘
```

---

## ⚡ Microtasks vs Macrotasks

### Duas Filas Diferentes!

JavaScript tem **duas** filas de callbacks:

1. **Microtask Queue** (prioridade alta)
   - `Promise.then()` / `catch()` / `finally()`
   - `async/await`
   - `queueMicrotask()`
   - `MutationObserver`

2. **Macrotask Queue / Callback Queue** (prioridade baixa)
   - `setTimeout` / `setInterval`
   - `setImmediate` (Node.js)
   - I/O operations
   - UI rendering

### Ordem de Execução

```text
1. Código síncrono (Call Stack)
2. Microtasks (Promises)
3. Macrotasks (setTimeout)
4. Renderização
```

### Exemplo

```javascript
console.log('1. Síncrono');

setTimeout(() => {
  console.log('2. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Microtask (Promise)');
});

console.log('4. Síncrono');

// Saída:
// 1. Síncrono
// 4. Síncrono
// 3. Microtask (Promise)
// 2. Macrotask (setTimeout)
```

**Por quê?**

1. Código síncrono executa primeiro (`1`, `4`)
2. Call Stack vazia → Event Loop processa **Microtasks** (`3`)
3. Microtasks vazias → Event Loop processa **Macrotasks** (`2`)

---

## 🧪 Exemplos Avançados

### Exemplo 1: Promises vs setTimeout

```javascript
console.log('Start');

setTimeout(() => console.log('setTimeout 1'), 0);

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

setTimeout(() => console.log('setTimeout 2'), 0);

console.log('End');

// Saída:
// Start
// End
// Promise 1
// Promise 2
// setTimeout 1
// setTimeout 2
```

### Exemplo 2: Microtasks Aninhadas

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => {
    console.log('3');
    Promise.resolve().then(() => console.log('4'));
  })
  .then(() => console.log('5'));

console.log('6');

// Saída:
// 1
// 6
// 3
// 4
// 5
// 2
```

**Por quê `4` antes de `5`?**

Porque `Promise 4` é adicionada à Microtask Queue **antes** de `then(() => console.log('5'))` ser resolvido.

### Exemplo 3: async/await

```javascript
console.log('1');

async function teste() {
  console.log('2');
  await Promise.resolve();
  console.log('3'); // Microtask!
}

teste();

console.log('4');

// Saída:
// 1
// 2
// 4
// 3
```

**Por quê?**

- `await` pausa a função e adiciona o resto como **Microtask**
- Código síncrono (`4`) executa primeiro

---

## 🐌 Blocking vs Non-Blocking

### Blocking (Código Bloqueante)

```javascript
console.log('Início');

// ❌ BLOQUEIA A THREAD!
for (let i = 0; i < 1000000000; i++) {
  // Cálculo pesado
}

console.log('Fim'); // Só executa depois do loop
```

**Problema:** Durante o loop, o navegador **congela**. Nada funciona (cliques, animações, etc.).

### Non-Blocking (Código Não-Bloqueante)

```javascript
console.log('Início');

// ✅ NÃO BLOQUEIA!
setTimeout(() => {
  console.log('Tarefa pesada concluída');
}, 0);

console.log('Fim');

// Navegador continua responsivo!
```

---

## 🎨 Renderização e o Event Loop

### Quando o Navegador Renderiza?

```text
1. Executa JavaScript (Call Stack)
2. Processa Microtasks (Promises)
3. RENDERIZA (se necessário - ~60fps = a cada 16ms)
4. Processa Macrotasks (setTimeout)
5. Volta para 1
```

### Exemplo: setTimeout vs requestAnimationFrame

```javascript
// ❌ Pode não estar sincronizado com frame
setTimeout(() => {
  elemento.style.left = '100px';
}, 16);

// ✅ Sincronizado com frame (60fps)
requestAnimationFrame(() => {
  elemento.style.left = '100px';
});
```

---

## ⚠️ Problemas Comuns

### 1. setTimeout não é preciso

```javascript
console.log('Início');

setTimeout(() => {
  console.log('Deveria ser 1000ms');
}, 1000);

// Código pesado que demora 2 segundos
for (let i = 0; i < 2000000000; i++) {}

console.log('Fim');

// setTimeout só executa DEPOIS do loop!
// Ou seja, após ~3 segundos, não 1 segundo.
```

**Lição:** `setTimeout(fn, 1000)` significa "execute **no mínimo** após 1 segundo", não "execute **exatamente** após 1 segundo".

### 2. Microtasks podem travar a página

```javascript
// ❌ TRAVA O NAVEGADOR!
function loop() {
  Promise.resolve().then(loop);
}
loop();

// Microtasks têm prioridade sobre renderização!
// Navegador nunca renderiza = página travada
```

**Solução:** Use `setTimeout` para dar espaço à renderização:

```javascript
// ✅ Navegador pode renderizar entre iterações
function loop() {
  setTimeout(loop, 0);
}
loop();
```

### 3. async/await não é mágico

```javascript
// ❌ Ainda bloqueia!
async function slow() {
  for (let i = 0; i < 1000000000; i++) {}
  return 'done';
}

// ✅ Dividir trabalho com setTimeout
async function fast() {
  for (let i = 0; i < 1000; i++) {
    await new Promise(resolve => setTimeout(resolve, 0));
    // Trabalho dividido em chunks
  }
  return 'done';
}
```

---

## 🔍 Debugging do Event Loop

### Chrome DevTools

```javascript
// Adicionar debugger
console.log('1');

debugger; // Pausa aqui

setTimeout(() => {
  console.log('2');
}, 0);

console.log('3');
```

**Call Stack panel** mostra pilha de execução atual.

### console.trace()

```javascript
function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.trace('Onde estou?');
}

a();

// Saída mostra: c() → b() → a()
```

### Performance Tab

```text
Chrome DevTools → Performance → Record
- Veja tasks, eventos, rendering, idle time
- Identifique long tasks (>50ms)
```

---

## 🎯 Boas Práticas

### 1. Evite Código Bloqueante

```javascript
// ❌ RUIM
const data = JSON.parse(bigString); // Bloqueia!

// ✅ BOM (Web Worker para tarefas pesadas)
const worker = new Worker('parser.js');
worker.postMessage(bigString);
worker.onmessage = (e) => {
  const data = e.data;
};
```

### 2. Use requestAnimationFrame para Animações

```javascript
// ❌ RUIM
setInterval(() => {
  elemento.style.left = ++x + 'px';
}, 16);

// ✅ BOM
function animate() {
  elemento.style.left = ++x + 'px';
  requestAnimationFrame(animate);
}
animate();
```

### 3. Divida Tarefas Pesadas

```javascript
// ❌ RUIM (trava)
for (let i = 0; i < 10000; i++) {
  processItem(i);
}

// ✅ BOM (chunking)
async function processAll() {
  for (let i = 0; i < 10000; i += 100) {
    for (let j = i; j < i + 100 && j < 10000; j++) {
      processItem(j);
    }
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}
```

### 4. Entenda Promises vs setTimeout

```javascript
// Se precisa de prioridade
Promise.resolve().then(() => {
  // Executa ANTES de setTimeout
});

// Se pode esperar
setTimeout(() => {
  // Executa DEPOIS de Promises
}, 0);
```

---

## 🧠 Conceitos-Chave

### JavaScript é Single-Threaded

```javascript
// ❌ Isso NÃO executa em paralelo
setTimeout(() => console.log('A'), 0);
setTimeout(() => console.log('B'), 0);

// Executa sequencialmente (A, depois B)
```

### Concorrência, não Paralelismo

JavaScript tem **concorrência** (alternância entre tarefas), não **paralelismo** (execução simultânea).

```text
Concorrência:    A → B → A → B (alternância)
Paralelismo:     A } executam ao mesmo tempo
                 B }
```

### Event Loop é Não-Bloqueante

```javascript
// Enquanto setTimeout espera, código continua
setTimeout(() => console.log('2'), 1000);
console.log('1');
// 1, depois (1 segundo) 2
```

---

## 📊 Visualização Completa

```javascript
console.log('1. Sync');

setTimeout(() => console.log('2. Macro'), 0);

Promise.resolve()
  .then(() => console.log('3. Micro'))
  .then(() => console.log('4. Micro'));

async function test() {
  console.log('5. Sync');
  await Promise.resolve();
  console.log('6. Micro');
}

test();

console.log('7. Sync');

// Saída:
// 1. Sync
// 5. Sync
// 7. Sync
// 3. Micro
// 4. Micro
// 6. Micro
// 2. Macro
```

**Explicação:**

1. **Código síncrono:** 1, 5, 7
2. **Microtasks (Promises):** 3, 4, 6
3. **Macrotasks (setTimeout):** 2

---

## 🎓 Recursos para Aprender Mais

- **Loupe (visualizador):** <http://latentflip.com/loupe/>
- **JavaScript Visualizer:** <https://www.jsv9000.app/>
- **Philip Roberts - Event Loop (vídeo):** <https://www.youtube.com/watch?v=8aGhZQkoFbQ>
- **MDN Concurrency Model:** <https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop>
- **JavaScript.info Event Loop:** <https://javascript.info/event-loop>

---

## 🎯 Resumo

```text
┌─────────────────────────────────────────┐
│ 1. Código Síncrono (Call Stack)        │
│    ↓                                    │
│ 2. Call Stack vazia?                    │
│    ↓                                    │
│ 3. Processar Microtasks (Promises)     │
│    ↓                                    │
│ 4. Microtasks vazias?                   │
│    ↓                                    │
│ 5. Renderizar (se necessário)          │
│    ↓                                    │
│ 6. Processar Macrotask (setTimeout)    │
│    ↓                                    │
│ 7. Voltar para 2                        │
└─────────────────────────────────────────┘

Prioridade:
Sync > Microtasks > Rendering > Macrotasks
```

**Entenda o Event Loop para dominar assincronicidade em JavaScript! 🔄✨**
