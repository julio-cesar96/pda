# 📊 Big O Notation - Complexidade Algorítmica em JavaScript

> *"Código que funciona é bom. Código que funciona eficientemente é excelente."*

---

## 🎯 O que é Big O?

**Big O Notation** é uma forma de medir a **eficiência** de um algoritmo em termos de:

- ⏱️ **Tempo:** Quanto tempo leva para executar?
- 💾 **Espaço:** Quanta memória consome?

### Por que isso importa?

```javascript
// Ambos retornam o mesmo resultado, mas...

// Solução 1: O(n²) - Lento
function temDuplicados1(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) return true;
    }
  }
  return false;
}

// Solução 2: O(n) - Rápido
function temDuplicados2(array) {
  const vistos = new Set();
  for (const item of array) {
    if (vistos.has(item)) return true;
    vistos.add(item);
  }
  return false;
}

// Teste com 10.000 elementos:
// Solução 1: ~200ms ❌
// Solução 2: ~2ms ✅
```

---

## 📈 Principais Complexidades

### Hierarquia (do melhor para o pior)

```text
O(1)         Constante       ⚡ Excelente
O(log n)     Logarítmica     ✅ Ótimo
O(n)         Linear          ✅ Bom
O(n log n)   Log-linear      ⚠️ Aceitável
O(n²)        Quadrática      ❌ Ruim
O(2ⁿ)        Exponencial     🔥 Péssimo
O(n!)        Fatorial        💀 Terrível
```

### Gráfico Visual

```text
Operações
    │
10⁹ │                                    O(n!)
    │                               O(2ⁿ)
10⁶ │                          O(n²)
    │                     O(n log n)
10³ │                O(n)
    │           O(log n)
  1 │     O(1)
    └────────────────────────────────────────── Tamanho (n)
        10    100   1k    10k   100k   1M
```

---

## ⚡ O(1) - Complexidade Constante

### Definição

**Tempo de execução não depende do tamanho da entrada.**

### Exemplos

```javascript
// 1. Acessar índice de array
function primeiro(array) {
  return array[0]; // ⚡ O(1)
}

// 2. Acessar propriedade de objeto
function getNome(pessoa) {
  return pessoa.nome; // ⚡ O(1)
}

// 3. Operações matemáticas
function soma(a, b) {
  return a + b; // ⚡ O(1)
}

// 4. Push/Pop em array (fim)
const arr = [1, 2, 3];
arr.push(4);  // ⚡ O(1)
arr.pop();    // ⚡ O(1)

// 5. Set/Map operations
const set = new Set();
set.add(1);      // ⚡ O(1)
set.has(1);      // ⚡ O(1)
set.delete(1);   // ⚡ O(1)
```

**Característica:** Executa em **tempo constante**, independente do tamanho do input.

---

## 📏 O(n) - Complexidade Linear

### Definição

**Tempo de execução cresce proporcionalmente ao tamanho da entrada.**

### Exemplos

```javascript
// 1. Loop simples
function imprimeTodos(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]); // O(n)
  }
}

// 2. Busca linear
function busca(array, alvo) {
  for (const item of array) {
    if (item === alvo) return true; // O(n)
  }
  return false;
}

// 3. Soma de elementos
function soma(array) {
  let total = 0;
  for (const num of array) {
    total += num; // O(n)
  }
  return total;
}

// 4. map, filter, reduce
const dobrados = array.map(x => x * 2);      // O(n)
const pares = array.filter(x => x % 2 === 0); // O(n)
const soma = array.reduce((a, b) => a + b, 0); // O(n)

// 5. Shift/Unshift (início do array)
arr.shift();    // ❌ O(n) - precisa reindexar tudo!
arr.unshift(1); // ❌ O(n) - precisa reindexar tudo!
```

**Regra:** Se tem **1 loop** sobre os dados, provavelmente é **O(n)**.

---

## 🔄 O(n²) - Complexidade Quadrática

### Definição

**Tempo de execução cresce com o quadrado do tamanho da entrada.**

### Exemplos

```javascript
// 1. Loop aninhado (nested loops)
function imprimePares(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(array[i], array[j]); // O(n²)
    }
  }
}

// 2. Bubble Sort
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array; // O(n²)
}

// 3. Verificar duplicados (força bruta)
function temDuplicados(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) return true; // O(n²)
    }
  }
  return false;
}

// ✅ Otimização: O(n) com Set
function temDuplicadosOtimizado(array) {
  return new Set(array).size !== array.length; // O(n)
}
```

**Regra:** **2 loops aninhados** = **O(n²)**

---

## 🪵 O(log n) - Complexidade Logarítmica

### Definição

**Tempo de execução cresce logaritmicamente** (divide o problema pela metade a cada iteração).

### Exemplos

```javascript
// 1. Busca Binária (array ordenado!)
function buscaBinaria(array, alvo) {
  let esquerda = 0;
  let direita = array.length - 1;
  
  while (esquerda <= direita) {
    const meio = Math.floor((esquerda + direita) / 2);
    
    if (array[meio] === alvo) {
      return meio; // Encontrou!
    } else if (array[meio] < alvo) {
      esquerda = meio + 1; // Buscar na direita
    } else {
      direita = meio - 1; // Buscar na esquerda
    }
  }
  
  return -1; // Não encontrou
}

// Exemplo:
// [1, 3, 5, 7, 9, 11, 13, 15] (8 elementos)
// Pior caso: 3 comparações (log₂ 8 = 3)

// 2. Árvore Binária de Busca (BST)
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function buscar(node, alvo) {
  if (!node) return null;
  if (node.value === alvo) return node;
  
  if (alvo < node.value) {
    return buscar(node.left, alvo); // Metade esquerda
  } else {
    return buscar(node.right, alvo); // Metade direita
  }
}
```

**Característica:** **Divide o problema pela metade** a cada passo.

```text
n = 1000
log₂ 1000 ≈ 10 operações

n = 1.000.000
log₂ 1.000.000 ≈ 20 operações

Extremamente eficiente! ✅
```

---

## 📊 O(n log n) - Complexidade Log-Linear

### Definição

**Melhor complexidade possível para algoritmos de ordenação baseados em comparação.**

### Exemplos

```javascript
// 1. Merge Sort
function mergeSort(array) {
  if (array.length <= 1) return array;
  
  const meio = Math.floor(array.length / 2);
  const esquerda = mergeSort(array.slice(0, meio));
  const direita = mergeSort(array.slice(meio));
  
  return merge(esquerda, direita);
}

function merge(esquerda, direita) {
  const resultado = [];
  let i = 0, j = 0;
  
  while (i < esquerda.length && j < direita.length) {
    if (esquerda[i] < direita[j]) {
      resultado.push(esquerda[i++]);
    } else {
      resultado.push(direita[j++]);
    }
  }
  
  return resultado.concat(esquerda.slice(i)).concat(direita.slice(j));
}

// 2. Quick Sort (média)
function quickSort(array) {
  if (array.length <= 1) return array;
  
  const pivot = array[array.length - 1];
  const menores = array.slice(0, -1).filter(x => x <= pivot);
  const maiores = array.slice(0, -1).filter(x => x > pivot);
  
  return [...quickSort(menores), pivot, ...quickSort(maiores)];
}

// 3. Array.sort() (implementação nativa)
const ordenado = array.sort((a, b) => a - b); // O(n log n)
```

**Uso:** Algoritmos eficientes de ordenação.

---

## 💥 O(2ⁿ) - Complexidade Exponencial

### Definição

**Tempo dobra a cada novo elemento.** Evite a todo custo!

### Exemplos

```javascript
// 1. Fibonacci recursivo (NÃO OTIMIZADO!)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2); // O(2ⁿ)
}

// fibonacci(5):
//               fib(5)
//           /            \
//       fib(4)          fib(3)
//      /      \        /      \
//   fib(3)  fib(2)  fib(2)  fib(1)
//   ...

// ✅ Otimização com memoization: O(n)
function fibonacciMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// 2. Subconjuntos (Power Set)
function subconjuntos(array) {
  if (array.length === 0) return [[]];
  
  const primeiro = array[0];
  const resto = array.slice(1);
  const subsSemPrimeiro = subconjuntos(resto);
  const subsComPrimeiro = subsSemPrimeiro.map(sub => [primeiro, ...sub]);
  
  return [...subsSemPrimeiro, ...subsComPrimeiro]; // O(2ⁿ)
}

// [1, 2, 3] → [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
// 3 elementos → 8 subconjuntos (2³)
```

**Evite:** Recursão sem memoization/dynamic programming.

---

## 💀 O(n!) - Complexidade Fatorial

### Definição

**Pior complexidade prática.** Crescimento explosivo!

### Exemplo

```javascript
// Permutações (todas as ordens possíveis)
function permutacoes(array) {
  if (array.length === 0) return [[]];
  
  const resultado = [];
  
  for (let i = 0; i < array.length; i++) {
    const resto = array.slice(0, i).concat(array.slice(i + 1));
    const permsResto = permutacoes(resto);
    
    for (const perm of permsResto) {
      resultado.push([array[i], ...perm]);
    }
  }
  
  return resultado; // O(n!)
}

// permutacoes([1, 2, 3])
// [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
// 3 elementos → 6 permutações (3!)
// 10 elementos → 3.628.800 permutações (10!) 💀
```

**Quando ocorre:** Problemas que testam **todas as ordens** possíveis.

---

## 🔍 Como Calcular Big O?

### Regras Práticas

```javascript
// 1. Ignore constantes
function exemplo1(array) {
  console.log(array[0]);      // O(1)
  console.log(array[0]);      // O(1)
  console.log(array[0]);      // O(1)
}
// Total: O(1), não O(3)

// 2. Ignore termos menores
function exemplo2(array) {
  console.log(array[0]);      // O(1)
  
  for (const item of array) { // O(n)
    console.log(item);
  }
}
// Total: O(1 + n) → simplifica para O(n)

// 3. Diferentes inputs = diferentes variáveis
function exemplo3(array1, array2) {
  for (const item1 of array1) {     // O(a)
    for (const item2 of array2) {   // O(b)
      console.log(item1, item2);
    }
  }
}
// Total: O(a * b), não O(n²)

// 4. Drop non-dominant terms
function exemplo4(array) {
  for (const item of array) {        // O(n)
    console.log(item);
  }
  
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(i, j);              // O(n²)
    }
  }
}
// Total: O(n + n²) → simplifica para O(n²)
```

### Passo a Passo

```javascript
function exemplo(array) {
  // 1. Identificar operações
  
  const primeiro = array[0];           // 1. O(1)
  
  for (let i = 0; i < array.length; i++) { // 2. O(n)
    console.log(array[i]);
  }
  
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(i, j);                 // 3. O(n²)
    }
  }
  
  // 2. Somar: O(1) + O(n) + O(n²)
  // 3. Simplificar: O(n²) (termo dominante)
}
```

---

## 💾 Complexidade de Espaço

### Definição

**Quanta memória adicional o algoritmo usa?**

### Exemplos

```javascript
// O(1) - Espaço constante
function soma(array) {
  let total = 0; // 1 variável
  for (const num of array) {
    total += num;
  }
  return total;
}

// O(n) - Espaço linear
function dobra(array) {
  const resultado = []; // Array novo com n elementos
  for (const num of array) {
    resultado.push(num * 2);
  }
  return resultado;
}

// O(n²) - Espaço quadrático
function matriz(n) {
  const matriz = [];
  for (let i = 0; i < n; i++) {
    matriz[i] = [];
    for (let j = 0; j < n; j++) {
      matriz[i][j] = i * j;
    }
  }
  return matriz; // n x n matriz
}
```

**Regra:** Considere apenas **memória adicional**, não a memória do input.

---

## 🚀 Otimizando Código JavaScript

### 1. Use Estruturas de Dados Apropriadas

```javascript
// ❌ RUIM: Array para buscas frequentes
const usuarios = ['alice', 'bob', 'charlie'];
function temUsuario(nome) {
  return usuarios.includes(nome); // O(n)
}

// ✅ BOM: Set para buscas frequentes
const usuarios = new Set(['alice', 'bob', 'charlie']);
function temUsuario(nome) {
  return usuarios.has(nome); // O(1)
}
```

### 2. Evite Operações O(n) Desnecessárias

```javascript
// ❌ RUIM
for (let i = 0; i < array.length; i++) { // length calculado toda iteração
  console.log(array[i]);
}

// ✅ BOM
const length = array.length; // Cacheado
for (let i = 0; i < length; i++) {
  console.log(array[i]);
}

// Ou use for...of
for (const item of array) {
  console.log(item);
}
```

### 3. Use Map/Set em vez de Objetos quando possível

```javascript
// ❌ RUIM: Objeto para contadores
const contador = {};
for (const item of array) {
  contador[item] = (contador[item] || 0) + 1;
}

// ✅ BOM: Map
const contador = new Map();
for (const item of array) {
  contador.set(item, (contador.get(item) || 0) + 1);
}
```

### 4. Memoization para Recursão

```javascript
// ❌ RUIM: O(2ⁿ)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// ✅ BOM: O(n) com memoization
const memo = new Map();
function fib(n) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  
  const resultado = fib(n - 1) + fib(n - 2);
  memo.set(n, resultado);
  return resultado;
}
```

---

## 📊 Comparação de Métodos de Array

| Método             | Complexidade | Observações                      |
|--------------------|--------------|----------------------------------|
| `array[i]`         | O(1)         | Acesso direto                    |
| `array.push()`     | O(1)         | Adiciona no fim                  |
| `array.pop()`      | O(1)         | Remove do fim                    |
| `array.shift()`    | O(n)         | Remove do início (reindexação)   |
| `array.unshift()`  | O(n)         | Adiciona no início (reindexação) |
| `array.slice()`    | O(n)         | Cria cópia                       |
| `array.splice()`   | O(n)         | Modifica array                   |
| `array.concat()`   | O(n)         | Combina arrays                   |
| `array.indexOf()`  | O(n)         | Busca linear                     |
| `array.includes()` | O(n)         | Busca linear                     |
| `array.find()`     | O(n)         | Busca linear                     |
| `array.map()`      | O(n)         | Itera sobre todos                |
| `array.filter()`   | O(n)         | Itera sobre todos                |
| `array.reduce()`   | O(n)         | Itera sobre todos                |
| `array.sort()`     | O(n log n)   | Ordenação                        |

---

## 🎯 Casos Práticos

### Caso 1: Remover Duplicados

```javascript
// ❌ O(n²)
function removeDuplicados1(array) {
  const resultado = [];
  for (const item of array) {
    if (!resultado.includes(item)) { // O(n) dentro de O(n)
      resultado.push(item);
    }
  }
  return resultado;
}

// ✅ O(n)
function removeDuplicados2(array) {
  return [...new Set(array)]; // Set remove duplicados em O(n)
}
```

### Caso 2: Contar Frequência

```javascript
// ✅ O(n)
function contarFrequencia(array) {
  const freq = new Map();
  
  for (const item of array) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  
  return freq;
}

// Uso:
// contarFrequencia([1, 2, 2, 3, 3, 3])
// Map { 1 => 1, 2 => 2, 3 => 3 }
```

### Caso 3: Encontrar Par que Soma X

```javascript
// ❌ O(n²)
function temPar1(array, soma) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === soma) return true;
    }
  }
  return false;
}

// ✅ O(n)
function temPar2(array, soma) {
  const vistos = new Set();
  
  for (const num of array) {
    const complemento = soma - num;
    if (vistos.has(complemento)) return true;
    vistos.add(num);
  }
  
  return false;
}
```

---

## 📚 Resumo Visual

```text
╔═══════════════════════════════════════════════════════╗
║ Big O Notation - Cheat Sheet                          ║
╠═══════════════════════════════════════════════════════╣
║ O(1)       | Constante    | ⚡ Acesso array[i]        ║
║ O(log n)   | Logarítmica  | ✅ Busca binária          ║
║ O(n)       | Linear       | ✅ Loop simples           ║
║ O(n log n) | Log-linear   | ✅ Merge/Quick sort       ║
║ O(n²)      | Quadrática   | ❌ Loop aninhado          ║
║ O(2ⁿ)      | Exponencial  | 🔥 Recursão sem memo     ║
║ O(n!)      | Fatorial     | 💀 Permutações           ║
╚═══════════════════════════════════════════════════════╝

Regras de Simplificação:
1. Drop constantes:      O(2n) → O(n)
2. Drop termos menores:  O(n + log n) → O(n)
3. Drop non-dominant:    O(n + n²) → O(n²)
4. Diferentes inputs:    O(a + b), O(a * b)
```

---

## 🎓 Recursos Adicionais

- **Big-O Cheat Sheet:** <https://www.bigocheatsheet.com/>
- **VisuAlgo:** <https://visualgo.net/> (visualizar algoritmos)
- **JavaScript Algorithms:** <https://github.com/trekhleb/javascript-algorithms>

---

**Analise a complexidade do seu código para escrever software eficiente! 📊✨**
