*"O código é poesia que computadores entendem."*

# 🚀 Missão Frontend Interativo: JavaScript e Integração com APIs

---

## 🧠 Objetivos de Aprendizagem

Ao final desta aula, você será capaz de:

1. **Compreender os fundamentos e a sintaxe essencial do JavaScript**:
   - Explicar o papel do JavaScript no funcionamento dinâmico das páginas
   - Diferenciar entre `var`, `let` e `const` e entender o escopo de variáveis
   - Criar variáveis, funções e estruturas de controle

2. **Manipular o DOM para criar interatividade**:
   - Selecionar e alterar elementos HTML via JavaScript
   - Modificar atributos, estilos e textos dinamicamente
   - Implementar eventos (cliques, inputs, etc.) para interação do usuário

3. **Trabalhar com estruturas de dados em JavaScript**:
   - Criar e manipular objetos e arrays
   - Utilizar métodos modernos de array (`forEach`, `map`, `filter`, `find`, `reduce`)
   - Trabalhar com array de objetos (padrão de dados de APIs)

4. **Consumir APIs no front-end**:
   - Realizar requisições HTTP com `fetch()` e interpretar respostas JSON
   - Exibir dados vindos da API em elementos HTML
   - Tratar erros e fluxos assíncronos com `async`/`await`
   - Lidar com erros e latência usando `try`/`catch`

5. **Publicar e testar a aplicação**:
   - Realizar deploy do projeto no GitHub Pages
   - Garantir que os arquivos estejam organizados e funcionais
   - Validar a comunicação entre o frontend e a API

6. **Aplicar boas práticas de desenvolvimento**:
   - Manter separação entre lógica, estilo e estrutura
   - Escrever código limpo, reutilizável e bem documentado
   - Tratar erros de forma clara ao usuário

---

## 📋 Conteúdo Programático

### 1. Introdução ao JavaScript: A Linguagem da Web

#### 1.1 O que é JavaScript?

JavaScript é a **linguagem de programação da web** que torna as páginas **interativas e dinâmicas**. Enquanto HTML é a estrutura e CSS é o estilo, JavaScript é o **comportamento**.

**O que JavaScript pode fazer:**
- ✅ Reagir a eventos do usuário (cliques, digitação, scroll)
- ✅ Manipular elementos da página em tempo real
- ✅ Buscar e exibir dados de APIs
- ✅ Validar formulários
- ✅ Criar animações e efeitos
- ✅ Armazenar dados no navegador

**Analogia da Casa:**
- 🏗️ **HTML** = Estrutura (paredes, portas, janelas)
- 🎨 **CSS** = Decoração (cores, móveis, estilo)
- ⚡ **JavaScript** = Funcionalidade (ligar luzes, abrir portas, tocar música)

#### 1.2 Como Incluir JavaScript no HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Demo</title>
</head>
<body>
    <h1>Olá, JavaScript!</h1>
    
    <!-- Método 1: JavaScript Inline (NÃO RECOMENDADO) -->
    <button onclick="alert('Clicou!')">Clique aqui</button>
    
    <!-- Método 2: JavaScript Interno -->
    <script>
        console.log('JavaScript interno funcionando!');
    </script>
    
    <!-- Método 3: JavaScript Externo (RECOMENDADO) -->
    <script src="script.js"></script>
</body>
</html>
```

**Boas práticas:**
- ✅ Sempre coloque `<script>` **antes do fechamento** do `</body>`
- ✅ Use arquivos externos para manter o código organizado
- ✅ Use `defer` ou `async` quando necessário: `<script src="script.js" defer></script>`

#### 1.3 Console do Navegador: Sua Ferramenta de Desenvolvimento

```javascript
// Exibir mensagens no console
console.log('Mensagem simples');
console.log('Valor da variável:', minhaVariavel);

// Avisos e erros
console.warn('⚠️ Atenção: isso pode causar problemas');
console.error('❌ Erro encontrado!');

// Testar expressões
console.log(2 + 2);
console.log('Hello' + ' ' + 'World');

// Inspecionar objetos
console.log({nome: 'João', idade: 25});
console.table([{id: 1, nome: 'Ana'}, {id: 2, nome: 'Pedro'}]);
```

**Como abrir o Console:**
- **Chrome/Edge:** F12 ou Ctrl+Shift+J (Cmd+Option+J no Mac)
- **Firefox:** F12 ou Ctrl+Shift+K
- Navegue até a aba "Console"

---

### 2. Sintaxe Essencial do JavaScript

#### 2.1 Variáveis: var, let e const

```javascript
// VAR (antigo, evitar)
var nome = 'João';
var nome = 'Maria'; // ❌ Pode redeclarar (confuso)
// Escopo de função, não de bloco

// LET (moderno, valor pode mudar)
let idade = 25;
idade = 26; // ✅ Pode reatribuir
// let idade = 30; // ❌ Não pode redeclarar

// CONST (moderno, valor constante)
const PI = 3.14159;
// PI = 3.14; // ❌ Erro! Não pode reatribuir
const cidade = 'São Paulo';
```

**Diferenças importantes:**

| Característica | var | let | const |
|---------------|-----|-----|-------|
| **Reatribuição** | ✅ | ✅ | ❌ |
| **Redeclaração** | ✅ | ❌ | ❌ |
| **Escopo** | Função | Bloco | Bloco |
| **Hoisting** | ✅ (confuso) | ❌ | ❌ |
| **Recomendação** | ❌ Evitar | ✅ Valores variáveis | ✅ Valores fixos |

**Escopo de Bloco:**

```javascript
function exemploEscopo() {
    if (true) {
        var x = 1;   // Visível em toda a função
        let y = 2;   // Visível só dentro do if
        const z = 3; // Visível só dentro do if
    }
    
    console.log(x); // 1 (funciona)
    console.log(y); // ❌ Erro: y não está definido
    console.log(z); // ❌ Erro: z não está definido
}
```

**Regra de ouro:**
- Use `const` por padrão
- Use `let` quando o valor precisa mudar
- **Nunca use `var`** em código moderno

#### 2.2 Tipos de Dados

```javascript
// Primitivos
const texto = 'Olá, mundo!';           // String
const numero = 42;                     // Number
const decimal = 3.14;                  // Number
const verdadeiro = true;               // Boolean
const falso = false;                   // Boolean
const nulo = null;                     // Null (ausência intencional)
const indefinido = undefined;          // Undefined (não definido)

// Compostos
const array = [1, 2, 3, 4];           // Array (lista)
const objeto = {nome: 'Ana', idade: 30}; // Object (chave-valor)

// Verificar tipo
console.log(typeof texto);    // "string"
console.log(typeof numero);   // "number"
console.log(typeof array);    // "object" (arrays são objetos especiais)
```

#### 2.3 Operadores

```javascript
// Aritméticos
let soma = 10 + 5;        // 15
let subtracao = 10 - 5;   // 5
let multiplicacao = 10 * 5; // 50
let divisao = 10 / 5;     // 2
let resto = 10 % 3;       // 1 (módulo)
let potencia = 2 ** 3;    // 8 (2³)

// Incremento/Decremento
let contador = 0;
contador++;  // contador = 1
contador--;  // contador = 0

// Comparação
console.log(5 == '5');   // true (compara valor)
console.log(5 === '5');  // false (compara valor E tipo)
console.log(5 != '5');   // false
console.log(5 !== '5');  // true
console.log(10 > 5);     // true
console.log(10 <= 10);   // true

// Lógicos
console.log(true && false);  // false (AND)
console.log(true || false);  // true (OR)
console.log(!true);          // false (NOT)

// Ternário (if inline)
const idade = 18;
const status = idade >= 18 ? 'Maior' : 'Menor';
console.log(status); // "Maior"
```

**⚠️ Sempre use `===` e `!==` para evitar conversões indesejadas!**

#### 2.4 Estruturas de Controle

```javascript
// IF/ELSE
const idade = 20;

if (idade >= 18) {
    console.log('Maior de idade');
} else if (idade >= 16) {
    console.log('Pode votar, mas não pode dirigir');
} else {
    console.log('Menor de idade');
}

// SWITCH
const diaSemana = 3;

switch (diaSemana) {
    case 1:
        console.log('Segunda-feira');
        break;
    case 2:
        console.log('Terça-feira');
        break;
    case 3:
        console.log('Quarta-feira');
        break;
    default:
        console.log('Outro dia');
}

// LOOPS
// For tradicional
for (let i = 0; i < 5; i++) {
    console.log(`Número ${i}`);
}

// While
let contador = 0;
while (contador < 3) {
    console.log(contador);
    contador++;
}

// Do-While (executa pelo menos uma vez)
let num = 0;
do {
    console.log(num);
    num++;
} while (num < 3);
```

#### 2.5 Funções: Tipos e Quando Usar Cada Uma

JavaScript possui **3 formas principais** de declarar funções, cada uma com características e casos de uso específicos.

---

**1️⃣ Declaração de Função (Function Declaration)**

```javascript
function saudar(nome) {
    return `Olá, ${nome}!`;
}

console.log(saudar('João')); // "Olá, João!"

// Função com múltiplos parâmetros
function somar(a, b) {
    return a + b;
}

console.log(somar(5, 3)); // 8

// Função com valor padrão
function cumprimentar(nome = 'Visitante') {
    return `Bem-vindo, ${nome}!`;
}

console.log(cumprimentar());        // "Bem-vindo, Visitante!"
console.log(cumprimentar('Maria')); // "Bem-vindo, Maria!"
```

**Características:**
- ✅ **Hoisting:** Pode ser chamada antes da declaração
- ✅ Tem nome (facilita debug)
- ✅ Cria sua própria referência `this`
- ✅ Tem acesso ao objeto `arguments`

**Quando usar:**
- ✅ Funções principais do programa
- ✅ Funções que precisam ser chamadas antes da declaração
- ✅ Métodos de objetos que usam `this`
- ✅ Construtores (embora classes sejam preferíveis hoje)

---

**2️⃣ Expressão de Função (Function Expression)**

```javascript
// Função anônima atribuída a uma variável
const multiplicar = function(a, b) {
    return a * b;
};

console.log(multiplicar(4, 3)); // 12

// Função nomeada (útil para recursão e debug)
const fatorial = function calcularFatorial(n) {
    if (n <= 1) return 1;
    return n * calcularFatorial(n - 1); // Recursão usando o nome
};

console.log(fatorial(5)); // 120

// IIFE - Immediately Invoked Function Expression
(function() {
    console.log('Executada imediatamente!');
})();

// IIFE com parâmetros
(function(nome) {
    console.log(`Olá, ${nome}!`);
})('Maria');
```

**Características:**
- ❌ **Não há hoisting:** Só pode ser chamada após a declaração
- ✅ Pode ser anônima ou nomeada
- ✅ Cria sua própria referência `this`
- ✅ Útil para criar escopo isolado (IIFE)

**Quando usar:**
- ✅ Callbacks que precisam de `this` próprio
- ✅ Quando quer controlar a ordem de execução
- ✅ IIFE para criar escopo isolado
- ✅ Quando precisa de recursão com nome próprio

---

**3️⃣ Arrow Function (Função Seta) - ES6+ ⭐ MODERNO**

```javascript
// Sintaxe completa
const dividir = (a, b) => {
    return a / b;
};

// Retorno implícito (sem chaves, retorna automaticamente)
const dobrar = x => x * 2;
console.log(dobrar(5));  // 10

// Sem parâmetros
const saudar = () => 'Olá!';
console.log(saudar()); // 'Olá!'

// Um parâmetro (parênteses opcionais)
const quadrado = n => n * n;
console.log(quadrado(4)); // 16

// Múltiplos parâmetros
const somar = (a, b) => a + b;
console.log(somar(3, 7)); // 10

// Retornar objeto (precisa de parênteses!)
const criarUsuario = (nome, idade) => ({ nome, idade });
console.log(criarUsuario('João', 30)); // { nome: 'João', idade: 30 }

// Com corpo de função
const calcularDesconto = (preco, desconto) => {
    const valorDesconto = preco * (desconto / 100);
    const precoFinal = preco - valorDesconto;
    return precoFinal;
};

console.log(calcularDesconto(100, 10)); // 90
```

**Características:**
- ❌ **Não há hoisting:** Igual à expressão de função
- ✅ **Sintaxe curta e limpa**
- ⭐ **`this` léxico:** Herda `this` do contexto pai (grande vantagem!)
- ❌ Não tem `arguments` (use rest parameters `...args`)
- ❌ Não pode ser usada como construtor

**Quando usar:**
- ✅ **Callbacks** (map, filter, forEach, addEventListener, setTimeout)
- ✅ **Funções curtas** e expressões simples
- ✅ **Quando `this` deve vir do escopo pai** (ex: métodos de classe React)
- ✅ **Code moderno** (padrão atual do JavaScript)

---

**📊 Comparação: Function vs Arrow Function**

| Característica | Function Declaration/Expression | Arrow Function |
|----------------|--------------------------------|----------------|
| **Sintaxe** | `function() {}` | `() => {}` |
| **Hoisting** | ✅ (declaration) / ❌ (expression) | ❌ |
| **`this`** | Próprio (depende de como é chamada) | Léxico (do contexto pai) |
| **`arguments`** | ✅ Tem | ❌ Não tem (use `...args`) |
| **Construtor** | ✅ Pode (`new Function()`) | ❌ Não pode |
| **Método de objeto** | ✅ Recomendado | ⚠️ Evitar (perde `this`) |
| **Callback** | ⚠️ Funciona (mas verboso) | ✅ **Ideal** |
| **Legibilidade** | ⚠️ Mais verboso | ✅ Mais conciso |

---

**🎯 Quando Usar Cada Uma: Guia Prático**

```javascript
// ✅ USE DECLARAÇÃO: Funções principais e métodos de objetos
function calcularTotal(itens) {
    return itens.reduce((total, item) => total + item.preco, 0);
}

const carrinho = {
    itens: [],
    
    // ✅ USE FUNCTION: Métodos que usam 'this'
    adicionar: function(item) {
        this.itens.push(item);
    },
    
    // ❌ EVITE ARROW: Perde referência ao objeto
    // adicionar: (item) => {
    //     this.itens.push(item); // this não funciona!
    // }
};

// ✅ USE ARROW: Callbacks e funções curtas
const numeros = [1, 2, 3, 4, 5];

// Perfeito para map, filter, etc
const dobrados = numeros.map(n => n * 2);
const pares = numeros.filter(n => n % 2 === 0);
const soma = numeros.reduce((acc, n) => acc + n, 0);

// ✅ USE ARROW: Event listeners
document.getElementById('botao').addEventListener('click', () => {
    console.log('Clicou!');
});

// ✅ USE ARROW: setTimeout/setInterval
setTimeout(() => {
    console.log('Executou após 1 segundo');
}, 1000);

// ✅ USE ARROW: Funções inline em JSX (React)
// <button onClick={() => setCount(count + 1)}>Incrementar</button>
```

---

**⚠️ Armadilhas Comuns**

**Problema 1: Arrow function como método de objeto**

```javascript
// ❌ ERRADO
const pessoa = {
    nome: 'João',
    saudar: () => {
        console.log(`Olá, ${this.nome}`); // this.nome é undefined!
    }
};

// ✅ CORRETO
const pessoa = {
    nome: 'João',
    saudar: function() {
        console.log(`Olá, ${this.nome}`); // "Olá, João"
    }
    // Ou sintaxe curta (ES6):
    // saudar() {
    //     console.log(`Olá, ${this.nome}`);
    // }
};
```

**Problema 2: Hoisting**

```javascript
// ✅ Funciona (hoisting)
console.log(funcao1()); // "Funciona!"
function funcao1() {
    return "Funciona!";
}

// ❌ Erro! (não há hoisting)
console.log(funcao2()); // ReferenceError
const funcao2 = () => "Erro!";
```

**Problema 3: Arrow function e 'arguments'**

```javascript
// ✅ Function tem 'arguments'
function somar() {
    return Array.from(arguments).reduce((a, b) => a + b, 0);
}
console.log(somar(1, 2, 3, 4)); // 10

// ❌ Arrow não tem 'arguments'
const somarArrow = () => {
    return Array.from(arguments).reduce((a, b) => a + b, 0); // Erro!
};

// ✅ Use rest parameters
const somarArrow = (...numeros) => {
    return numeros.reduce((a, b) => a + b, 0);
};
console.log(somarArrow(1, 2, 3, 4)); // 10
```

---

**💡 Por Que Arrow Functions Existem?**

Arrow functions foram criadas no ES6 (2015) para resolver **3 problemas principais**:

**1. Sintaxe Verbosa:**
```javascript
// Antes (ES5)
const numeros = [1, 2, 3];
const dobrados = numeros.map(function(n) {
    return n * 2;
});

// Depois (ES6) - Muito mais limpo!
const dobrados = numeros.map(n => n * 2);
```

**2. Problema do `this` em Callbacks:**
```javascript
// Antes (ES5) - Precisava de workarounds
function Contador() {
    this.valor = 0;
    var self = this; // Workaround feio!
    
    setInterval(function() {
        self.valor++; // Tinha que usar 'self'
    }, 1000);
}

// Depois (ES6) - Arrow resolve automaticamente!
function Contador() {
    this.valor = 0;
    
    setInterval(() => {
        this.valor++; // 'this' funciona naturalmente!
    }, 1000);
}
```

**3. Código Mais Funcional:**
Arrow functions incentivam programação funcional (map, filter, reduce) que é mais declarativa e menos imperativa.

---

**🎓 Resumo: Regra Geral**

```javascript
// 🏆 PADRÃO MODERNO RECOMENDADO:

// ✅ Funções principais: DECLARAÇÃO
function calcularTotal(items) { ... }

// ✅ Callbacks e funções curtas: ARROW
array.map(x => x * 2)
setTimeout(() => { ... }, 1000)
button.addEventListener('click', () => { ... })

// ✅ Métodos de objeto: FUNCTION ou sintaxe curta
const obj = {
    metodo() { ... }  // Sintaxe curta (ES6)
}

// ⚠️ Evite misturar estilos sem motivo - seja consistente!
```

**Para React especificamente:**
- ✅ Componentes funcionais: Arrow function
- ✅ Métodos de classe: Arrow function (evita bind)
- ✅ Event handlers: Arrow function
- ✅ Callbacks (map, filter): Arrow function

---

### 3. Manipulação do DOM

#### 3.1 O que é o DOM?

DOM (Document Object Model) é a **representação em árvore** do HTML que o JavaScript pode manipular.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Minha Página</title>
  </head>
  <body>
    <h1>Título</h1>
    <p>Parágrafo</p>
  </body>
</html>
```

```
Árvore DOM:
document
  └── html
      ├── head
      │   └── title
      │       └── "Minha Página"
      └── body
          ├── h1
          │   └── "Título"
          └── p
              └── "Parágrafo"
```

#### 3.2 Selecionando Elementos

```javascript
// Por ID (mais rápido)
const titulo = document.getElementById('titulo');

// Query Selector (CSS selector - RECOMENDADO)
const paragrafo = document.querySelector('.paragrafo');
const primeiroBotao = document.querySelector('button');

// Query Selector All (retorna NodeList)
const todosOsBotoes = document.querySelectorAll('button');
const cards = document.querySelectorAll('.card');

// Métodos antigos (ainda funcionam, mas menos usados)
const elementosPorClasse = document.getElementsByClassName('minhaClasse');
const elementosPorTag = document.getElementsByTagName('p');
```

**Exemplo prático:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Selecionando Elementos</title>
</head>
<body>
    <h1 id="titulo-principal">Meu Site</h1>
    <p class="texto">Primeiro parágrafo</p>
    <p class="texto">Segundo parágrafo</p>
    <button class="btn">Botão 1</button>
    <button class="btn">Botão 2</button>
    
    <script>
        // Selecionar um elemento
        const titulo = document.querySelector('#titulo-principal');
        console.log(titulo.textContent); // "Meu Site"
        
        // Selecionar múltiplos elementos
        const textos = document.querySelectorAll('.texto');
        console.log(textos.length); // 2
        
        // Iterar sobre NodeList
        textos.forEach(texto => {
            console.log(texto.textContent);
        });
    </script>
</body>
</html>
```

#### 3.3 Modificando Conteúdo e Atributos

```javascript
// Modificar texto
const titulo = document.querySelector('h1');
titulo.textContent = 'Novo Título';        // Apenas texto
titulo.innerHTML = '<strong>Negrito</strong>'; // Pode ter HTML

// Modificar atributos
const imagem = document.querySelector('img');
imagem.src = 'nova-imagem.jpg';
imagem.alt = 'Descrição da nova imagem';
imagem.setAttribute('width', '300');

// Trabalhar com classes
const botao = document.querySelector('.botao');
botao.classList.add('ativo');           // Adiciona classe
botao.classList.remove('inativo');      // Remove classe
botao.classList.toggle('selecionado');  // Alterna (on/off)
botao.classList.contains('ativo');      // true/false

// Modificar estilos inline
const caixa = document.querySelector('.caixa');
caixa.style.backgroundColor = 'blue';
caixa.style.padding = '20px';
caixa.style.borderRadius = '8px';

// ⚠️ Prefira classes CSS em vez de estilos inline!
```

**Exemplo completo:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Manipulando DOM</title>
    <style>
        .destaque {
            background-color: yellow;
            font-weight: bold;
        }
        .oculto {
            display: none;
        }
    </style>
</head>
<body>
    <h1 id="titulo">Título Original</h1>
    <p id="paragrafo" class="texto">Este é um parágrafo.</p>
    <button id="btn-mudar">Mudar Conteúdo</button>
    <button id="btn-destacar">Destacar</button>
    
    <script>
        const titulo = document.getElementById('titulo');
        const paragrafo = document.getElementById('paragrafo');
        const btnMudar = document.getElementById('btn-mudar');
        const btnDestacar = document.getElementById('btn-destacar');
        
        btnMudar.addEventListener('click', () => {
            titulo.textContent = 'Título Modificado!';
            paragrafo.innerHTML = 'Conteúdo <strong>alterado</strong> pelo JavaScript!';
        });
        
        btnDestacar.addEventListener('click', () => {
            paragrafo.classList.toggle('destaque');
        });
    </script>
</body>
</html>
```

#### 3.4 Criando e Removendo Elementos

```javascript
// Criar novo elemento
const novoParagrafo = document.createElement('p');
novoParagrafo.textContent = 'Parágrafo criado dinamicamente';
novoParagrafo.classList.add('dinamico');

// Adicionar ao DOM
const container = document.querySelector('.container');
container.appendChild(novoParagrafo);       // Adiciona no final
container.prepend(novoParagrafo);           // Adiciona no início
container.insertBefore(novoParagrafo, ref); // Adiciona antes de 'ref'

// Remover elemento
const elementoParaRemover = document.querySelector('.remover');
elementoParaRemover.remove(); // Método moderno
// ou
elementoParaRemover.parentElement.removeChild(elementoParaRemover); // Antigo

// Substituir elemento
const novo = document.createElement('h2');
novo.textContent = 'Novo Título';
const antigo = document.querySelector('h1');
antigo.replaceWith(novo);
```

**Exemplo: Lista dinâmica**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Lista Dinâmica</title>
</head>
<body>
    <input type="text" id="input-item" placeholder="Digite um item">
    <button id="btn-adicionar">Adicionar</button>
    <ul id="lista"></ul>
    
    <script>
        const input = document.getElementById('input-item');
        const btnAdicionar = document.getElementById('btn-adicionar');
        const lista = document.getElementById('lista');
        
        btnAdicionar.addEventListener('click', () => {
            const valor = input.value.trim();
            
            if (valor === '') {
                alert('Digite algo!');
                return;
            }
            
            // Criar novo item
            const li = document.createElement('li');
            li.textContent = valor;
            
            // Botão de remover
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.style.marginLeft = '10px';
            btnRemover.addEventListener('click', () => {
                li.remove();
            });
            
            li.appendChild(btnRemover);
            lista.appendChild(li);
            
            // Limpar input
            input.value = '';
            input.focus();
        });
        
        // Adicionar com Enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnAdicionar.click();
            }
        });
    </script>
</body>
</html>
```

#### 3.5 Eventos

```javascript
// addEventListener (RECOMENDADO)
const botao = document.querySelector('#meu-botao');

botao.addEventListener('click', () => {
    console.log('Botão clicado!');
});

// Múltiplos listeners no mesmo elemento
botao.addEventListener('click', funcao1);
botao.addEventListener('click', funcao2);

// Eventos comuns
elemento.addEventListener('click', () => {}); // Clique
elemento.addEventListener('dblclick', () => {}); // Clique duplo
elemento.addEventListener('mouseenter', () => {}); // Mouse entra
elemento.addEventListener('mouseleave', () => {}); // Mouse sai
elemento.addEventListener('mousemove', () => {}); // Mouse move

input.addEventListener('input', () => {}); // Valor muda (tempo real)
input.addEventListener('change', () => {}); // Valor muda (ao sair do campo)
input.addEventListener('focus', () => {}); // Campo recebe foco
input.addEventListener('blur', () => {}); // Campo perde foco

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne comportamento padrão
});

document.addEventListener('keydown', (e) => {
    console.log(`Tecla pressionada: ${e.key}`);
});

window.addEventListener('scroll', () => {
    console.log('Página rolando');
});

window.addEventListener('resize', () => {
    console.log(`Nova largura: ${window.innerWidth}px`);
});
```

**Objeto Event:**

```javascript
botao.addEventListener('click', (event) => {
    console.log(event.type);        // "click"
    console.log(event.target);      // Elemento clicado
    console.log(event.currentTarget); // Elemento com o listener
    console.log(event.clientX);     // Posição X do mouse
    console.log(event.clientY);     // Posição Y do mouse
});

input.addEventListener('keydown', (event) => {
    console.log(event.key);         // Tecla pressionada
    console.log(event.code);        // Código da tecla
    console.log(event.ctrlKey);     // Ctrl está pressionado?
    
    if (event.key === 'Enter') {
        console.log('Enter pressionado!');
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Não envia o formulário
    console.log('Formulário interceptado!');
});
```

**Exemplo: Contador interativo**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Contador</title>
    <style>
        .contador {
            font-size: 48px;
            font-weight: bold;
            text-align: center;
            margin: 50px;
        }
        .botoes {
            text-align: center;
        }
        button {
            font-size: 20px;
            padding: 10px 20px;
            margin: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="contador" id="contador">0</div>
    <div class="botoes">
        <button id="btn-decrementar">-</button>
        <button id="btn-resetar">Reset</button>
        <button id="btn-incrementar">+</button>
    </div>
    
    <script>
        let valor = 0;
        const contadorElemento = document.getElementById('contador');
        const btnIncrementar = document.getElementById('btn-incrementar');
        const btnDecrementar = document.getElementById('btn-decrementar');
        const btnResetar = document.getElementById('btn-resetar');
        
        function atualizarDisplay() {
            contadorElemento.textContent = valor;
            
            // Cores baseadas no valor
            if (valor > 0) {
                contadorElemento.style.color = 'green';
            } else if (valor < 0) {
                contadorElemento.style.color = 'red';
            } else {
                contadorElemento.style.color = 'black';
            }
        }
        
        btnIncrementar.addEventListener('click', () => {
            valor++;
            atualizarDisplay();
        });
        
        btnDecrementar.addEventListener('click', () => {
            valor--;
            atualizarDisplay();
        });
        
        btnResetar.addEventListener('click', () => {
            valor = 0;
            atualizarDisplay();
        });
        
        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                valor++;
                atualizarDisplay();
            } else if (e.key === 'ArrowDown') {
                valor--;
                atualizarDisplay();
            } else if (e.key === 'r' || e.key === 'R') {
                valor = 0;
                atualizarDisplay();
            }
        });
    </script>
</body>
</html>
```

---

### 4. Estruturas de Dados: Objetos e Arrays

#### 4.1 Objetos: Dados em Chave-Valor

```javascript
// Criando objetos
const pessoa = {
    nome: 'João Silva',
    idade: 30,
    cidade: 'São Paulo',
    profissao: 'Desenvolvedor'
};

// Acessando propriedades
console.log(pessoa.nome);        // "João Silva" (dot notation)
console.log(pessoa['idade']);    // 30 (bracket notation)

// Modificando propriedades
pessoa.idade = 31;
pessoa['cidade'] = 'Rio de Janeiro';

// Adicionando propriedades
pessoa.email = 'joao@email.com';

// Removendo propriedades
delete pessoa.profissao;

// Métodos em objetos
const carro = {
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: 2023,
    ligar: function() {
        console.log('Carro ligado!');
    },
    // Sintaxe moderna
    desligar() {
        console.log('Carro desligado!');
    },
    descricao() {
        return `${this.marca} ${this.modelo} ${this.ano}`;
    }
};

carro.ligar();        // "Carro ligado!"
console.log(carro.descricao()); // "Toyota Corolla 2023"

// Objetos aninhados
const usuario = {
    nome: 'Maria',
    endereco: {
        rua: 'Av. Paulista',
        numero: 1000,
        cidade: 'São Paulo',
        cep: '01310-100'
    },
    contato: {
        email: 'maria@email.com',
        telefone: '(11) 98765-4321'
    }
};

console.log(usuario.endereco.cidade);     // "São Paulo"
console.log(usuario.contato.email);       // "maria@email.com"

// Destructuring (desestruturação)
const { nome, idade } = pessoa;
console.log(nome);    // "João Silva"
console.log(idade);   // 31

const { endereco: { cidade, cep } } = usuario;
console.log(cidade);  // "São Paulo"
console.log(cep);     // "01310-100"
```

#### 4.2 Arrays: Listas Ordenadas

```javascript
// Criando arrays
const frutas = ['Maçã', 'Banana', 'Laranja'];
const numeros = [1, 2, 3, 4, 5];
const misto = [1, 'texto', true, {nome: 'João'}, [1, 2]];

// Acessando elementos (índice começa em 0)
console.log(frutas[0]);  // "Maçã"
console.log(frutas[2]);  // "Laranja"
console.log(frutas.length); // 3

// Modificando elementos
frutas[1] = 'Morango';
console.log(frutas); // ['Maçã', 'Morango', 'Laranja']

// Adicionando elementos
frutas.push('Uva');           // Adiciona no final
frutas.unshift('Abacaxi');    // Adiciona no início
console.log(frutas); // ['Abacaxi', 'Maçã', 'Morango', 'Laranja', 'Uva']

// Removendo elementos
frutas.pop();                 // Remove do final (retorna 'Uva')
frutas.shift();               // Remove do início (retorna 'Abacaxi')
console.log(frutas); // ['Maçã', 'Morango', 'Laranja']

// Remover por índice
frutas.splice(1, 1); // Remove 1 elemento a partir do índice 1
console.log(frutas); // ['Maçã', 'Laranja']

// Encontrar índice
const indice = frutas.indexOf('Laranja'); // 1
console.log(frutas.includes('Banana'));   // false
```

#### 4.3 Array de Objetos (Padrão de APIs)

```javascript
// Estrutura comum retornada por APIs
const usuarios = [
    { id: 1, nome: 'João', idade: 30, ativo: true },
    { id: 2, nome: 'Maria', idade: 25, ativo: true },
    { id: 3, nome: 'Pedro', idade: 35, ativo: false },
    { id: 4, nome: 'Ana', idade: 28, ativo: true }
];

// Acessar dados
console.log(usuarios[0].nome);     // "João"
console.log(usuarios[1].idade);    // 25

// Adicionar novo usuário
usuarios.push({
    id: 5,
    nome: 'Carlos',
    idade: 32,
    ativo: true
});

// Modificar usuário existente
usuarios[0].ativo = false;
usuarios[2].idade = 36;
```

#### 4.4 Métodos Modernos de Array

**forEach: Percorrer elementos**

```javascript
const numeros = [1, 2, 3, 4, 5];

// Sintaxe básica
numeros.forEach((numero) => {
    console.log(numero);
});

// Com índice e array completo
numeros.forEach((numero, indice, arrayCompleto) => {
    console.log(`Índice ${indice}: ${numero}`);
});

// Exemplo prático: exibir lista de usuários
const usuarios = [
    { nome: 'João', email: 'joao@email.com' },
    { nome: 'Maria', email: 'maria@email.com' }
];

usuarios.forEach((usuario) => {
    console.log(`${usuario.nome} - ${usuario.email}`);
});
```

**map: Transformar array (retorna novo array)**

```javascript
const numeros = [1, 2, 3, 4, 5];

// Dobrar todos os valores
const dobrados = numeros.map((num) => num * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]

// Extrair propriedades de objetos
const usuarios = [
    { id: 1, nome: 'João', idade: 30 },
    { id: 2, nome: 'Maria', idade: 25 }
];

const nomes = usuarios.map((usuario) => usuario.nome);
console.log(nomes); // ['João', 'Maria']

// Criar novos objetos
const usuariosComStatus = usuarios.map((usuario) => ({
    ...usuario,
    maiorDeIdade: usuario.idade >= 18
}));

console.log(usuariosComStatus);
// [{id: 1, nome: 'João', idade: 30, maiorDeIdade: true}, ...]

// Exemplo prático: converter para HTML
const produtos = [
    { nome: 'Notebook', preco: 3000 },
    { nome: 'Mouse', preco: 50 }
];

const produtosHTML = produtos.map((produto) => 
    `<div class="produto">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
    </div>`
);

console.log(produtosHTML.join('')); // Junta sem separador
```

**filter: Filtrar elementos (retorna novo array)**

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Apenas números pares
const pares = numeros.filter((num) => num % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]

// Apenas números maiores que 5
const maioresQue5 = numeros.filter((num) => num > 5);
console.log(maioresQue5); // [6, 7, 8, 9, 10]

// Filtrar objetos
const usuarios = [
    { nome: 'João', idade: 30, ativo: true },
    { nome: 'Maria', idade: 17, ativo: true },
    { nome: 'Pedro', idade: 25, ativo: false },
    { nome: 'Ana', idade: 22, ativo: true }
];

// Apenas usuários ativos
const ativos = usuarios.filter((usuario) => usuario.ativo);
console.log(ativos.length); // 3

// Apenas maiores de idade
const maiores = usuarios.filter((usuario) => usuario.idade >= 18);

// Múltiplas condições
const ativosEMaiores = usuarios.filter((usuario) => 
    usuario.ativo && usuario.idade >= 18
);

console.log(ativosEMaiores);
// [{nome: 'João', ...}, {nome: 'Ana', ...}]
```

**find: Encontrar primeiro elemento que satisfaz condição**

```javascript
const usuarios = [
    { id: 1, nome: 'João', email: 'joao@email.com' },
    { id: 2, nome: 'Maria', email: 'maria@email.com' },
    { id: 3, nome: 'Pedro', email: 'pedro@email.com' }
];

// Encontrar por ID
const usuario = usuarios.find((u) => u.id === 2);
console.log(usuario); // {id: 2, nome: 'Maria', ...}

// Encontrar por nome
const maria = usuarios.find((u) => u.nome === 'Maria');
console.log(maria.email); // "maria@email.com"

// Se não encontrar, retorna undefined
const inexistente = usuarios.find((u) => u.id === 999);
console.log(inexistente); // undefined

// findIndex: retorna o índice
const indice = usuarios.findIndex((u) => u.nome === 'Pedro');
console.log(indice); // 2
```

**reduce: Agregar/reduzir array a um valor único**

```javascript
const numeros = [1, 2, 3, 4, 5];

// Somar todos os números
const soma = numeros.reduce((acumulador, numero) => {
    return acumulador + numero;
}, 0); // 0 é o valor inicial
console.log(soma); // 15

// Forma compacta
const soma2 = numeros.reduce((acc, num) => acc + num, 0);

// Multiplicar todos
const produto = numeros.reduce((acc, num) => acc * num, 1);
console.log(produto); // 120

// Contar ocorrências
const frutas = ['maçã', 'banana', 'maçã', 'laranja', 'banana', 'maçã'];

const contagem = frutas.reduce((acc, fruta) => {
    acc[fruta] = (acc[fruta] || 0) + 1;
    return acc;
}, {});

console.log(contagem);
// {maçã: 3, banana: 2, laranja: 1}

// Exemplo prático: calcular total de um carrinho
const carrinho = [
    { nome: 'Notebook', preco: 3000, quantidade: 1 },
    { nome: 'Mouse', preco: 50, quantidade: 2 },
    { nome: 'Teclado', preco: 200, quantidade: 1 }
];

const total = carrinho.reduce((acc, item) => {
    return acc + (item.preco * item.quantidade);
}, 0);

console.log(`Total: R$ ${total.toFixed(2)}`);
// "Total: R$ 3300.00"

// Agrupar por propriedade
const usuarios = [
    { nome: 'João', idade: 30 },
    { nome: 'Maria', idade: 25 },
    { nome: 'Pedro', idade: 30 },
    { nome: 'Ana', idade: 25 }
];

const porIdade = usuarios.reduce((acc, usuario) => {
    const idade = usuario.idade;
    if (!acc[idade]) {
        acc[idade] = [];
    }
    acc[idade].push(usuario);
    return acc;
}, {});

console.log(porIdade);
// {25: [{nome: 'Maria',...}, {nome: 'Ana',...}], 30: [...]}
```

**Encadeamento de métodos**

```javascript
const usuarios = [
    { nome: 'João', idade: 30, ativo: true, cidade: 'São Paulo' },
    { nome: 'Maria', idade: 17, ativo: true, cidade: 'Rio de Janeiro' },
    { nome: 'Pedro', idade: 25, ativo: false, cidade: 'São Paulo' },
    { nome: 'Ana', idade: 22, ativo: true, cidade: 'São Paulo' }
];

// Encontrar nomes dos usuários ativos de SP maiores de 18
const resultado = usuarios
    .filter(u => u.ativo)                    // Apenas ativos
    .filter(u => u.cidade === 'São Paulo')   // Apenas de SP
    .filter(u => u.idade >= 18)              // Maiores de idade
    .map(u => u.nome);                       // Apenas nomes

console.log(resultado); // ['João', 'Ana']

// Calcular média de idade dos usuários ativos
const mediaIdade = usuarios
    .filter(u => u.ativo)
    .reduce((acc, u, i, arr) => acc + u.idade / arr.length, 0);

console.log(mediaIdade); // 24.33
```

---

### 5. Consumindo APIs com Fetch

#### 5.1 O que são APIs?

**API (Application Programming Interface)** é uma interface que permite que aplicações se comuniquem entre si. APIs REST retornam dados geralmente em formato **JSON**.

**Analogia:** Imagine um restaurante:
- **Cliente (Frontend):** Você fazendo um pedido
- **Garçom (API):** Leva seu pedido à cozinha e traz a comida
- **Cozinha (Backend/Database):** Prepara o pedido

#### 5.2 JSON: A Linguagem das APIs

```javascript
// JSON (JavaScript Object Notation)
// Formato de texto para troca de dados

// Objeto JavaScript
const usuario = {
    nome: 'João',
    idade: 30,
    ativo: true
};

// Converter para JSON (string)
const json = JSON.stringify(usuario);
console.log(json);
// '{"nome":"João","idade":30,"ativo":true}'
console.log(typeof json); // "string"

// Converter JSON para objeto
const objeto = JSON.parse(json);
console.log(objeto.nome); // "João"
console.log(typeof objeto); // "object"

// JSON típico de uma API
const respostaAPI = `{
    "usuarios": [
        {"id": 1, "nome": "João", "email": "joao@email.com"},
        {"id": 2, "nome": "Maria", "email": "maria@email.com"}
    ],
    "total": 2,
    "sucesso": true
}`;

const dados = JSON.parse(respostaAPI);
console.log(dados.usuarios[0].nome); // "João"
```

#### 5.3 Fetch API: Fazendo Requisições HTTP

```javascript
// Sintaxe com async/await (RECOMENDADO)
async function buscarDados() {
    try {
        const response = await fetch('https://api.exemplo.com/dados');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro:', error);
    }
}

buscarDados();

// Nota: fetch retorna uma Promise, por isso usamos await
// A seção 6 explica Promises e async/await em detalhes
```

#### 5.4 Exemplo Prático: JSONPlaceholder (API de Testes)

**API gratuita para testes:** https://jsonplaceholder.typicode.com/

```javascript
// Buscar lista de usuários
async function buscarUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Verificar se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        
        const usuarios = await response.json();
        console.log(usuarios);
        
        // Exibir na tela
        exibirUsuarios(usuarios);
        
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        exibirErro('Não foi possível carregar os usuários.');
    }
}

function exibirUsuarios(usuarios) {
    const container = document.getElementById('usuarios-container');
    
    // Limpar conteúdo anterior
    container.innerHTML = '';
    
    // Criar card para cada usuário
    usuarios.forEach(usuario => {
        const card = document.createElement('div');
        card.className = 'usuario-card';
        card.innerHTML = `
            <h3>${usuario.name}</h3>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Empresa:</strong> ${usuario.company.name}</p>
            <p><strong>Cidade:</strong> ${usuario.address.city}</p>
        `;
        container.appendChild(card);
    });
}

function exibirErro(mensagem) {
    const container = document.getElementById('usuarios-container');
    container.innerHTML = `
        <div class="erro">
            <p>❌ ${mensagem}</p>
        </div>
    `;
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', buscarUsuarios);
```

**HTML correspondente:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listagem de Usuários</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        h1 {
            text-align: center;
            color: #333;
        }
        
        #usuarios-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .usuario-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
        }
        
        .usuario-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .usuario-card h3 {
            margin-top: 0;
            color: #3483fa;
        }
        
        .usuario-card p {
            margin: 10px 0;
            color: #666;
        }
        
        .erro {
            background-color: #fee;
            border: 2px solid #f00;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            color: #d00;
        }
        
        .loading {
            text-align: center;
            font-size: 24px;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>📋 Lista de Usuários</h1>
    <div id="usuarios-container">
        <div class="loading">Carregando...</div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

#### 5.5 Estados de Loading e Feedback Visual

```javascript
async function buscarDados() {
    const container = document.getElementById('container');
    const loadingElement = document.getElementById('loading');
    
    try {
        // Mostrar loading
        loadingElement.style.display = 'block';
        container.innerHTML = '';
        
        const response = await fetch('https://api.exemplo.com/dados');
        
        if (!response.ok) {
            throw new Error('Falha na requisição');
        }
        
        const dados = await response.json();
        
        // Esconder loading
        loadingElement.style.display = 'none';
        
        // Exibir dados
        exibirDados(dados);
        
    } catch (error) {
        // Esconder loading
        loadingElement.style.display = 'none';
        
        // Exibir erro
        container.innerHTML = `
            <div class="erro">
                <h3>Erro ao carregar dados</h3>
                <p>${error.message}</p>
                <button onclick="buscarDados()">Tentar Novamente</button>
            </div>
        `;
    }
}
```

#### 5.6 Busca com Filtros e Parâmetros

```javascript
// Buscar com parâmetros na URL
async function buscarPosts(userId) {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    
    try {
        const response = await fetch(url);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

// Uso
buscarPosts(1).then(posts => {
    console.log(`Posts do usuário 1:`, posts);
});

// Buscar item específico
async function buscarPostPorId(id) {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    
    try {
        const response = await fetch(url);
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}
```

#### 5.7 Exemplo Completo: Buscador de CEP

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscador de CEP</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            text-align: center;
            color: #333;
        }
        
        .input-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        
        input {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box;
        }
        
        input:focus {
            outline: none;
            border-color: #3483fa;
        }
        
        button {
            width: 100%;
            padding: 12px;
            background-color: #3483fa;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #2968c8;
        }
        
        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        
        #resultado {
            margin-top: 20px;
            padding: 20px;
            border-radius: 4px;
            display: none;
        }
        
        .sucesso {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        
        .erro {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        
        .loading {
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📮 Buscador de CEP</h1>
        
        <div class="input-group">
            <label for="cep">Digite o CEP:</label>
            <input 
                type="text" 
                id="cep" 
                placeholder="00000-000"
                maxlength="9"
            >
        </div>
        
        <button id="btn-buscar">Buscar CEP</button>
        
        <div id="resultado"></div>
    </div>
    
    <script>
        const inputCep = document.getElementById('cep');
        const btnBuscar = document.getElementById('btn-buscar');
        const resultado = document.getElementById('resultado');
        
        // Formatar CEP enquanto digita
        inputCep.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, ''); // Remove não-numéricos
            
            if (valor.length > 5) {
                valor = valor.slice(0, 5) + '-' + valor.slice(5, 8);
            }
            
            e.target.value = valor;
        });
        
        // Buscar ao clicar no botão
        btnBuscar.addEventListener('click', buscarCEP);
        
        // Buscar ao pressionar Enter
        inputCep.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscarCEP();
            }
        });
        
        async function buscarCEP() {
            const cep = inputCep.value.replace(/\D/g, '');
            
            // Validar CEP
            if (cep.length !== 8) {
                exibirErro('CEP inválido! Digite 8 dígitos.');
                return;
            }
            
            // Exibir loading
            resultado.style.display = 'block';
            resultado.className = 'loading';
            resultado.innerHTML = '<p>🔍 Buscando...</p>';
            btnBuscar.disabled = true;
            
            try {
                // API ViaCEP (gratuita)
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const dados = await response.json();
                
                if (dados.erro) {
                    throw new Error('CEP não encontrado');
                }
                
                exibirSucesso(dados);
                
            } catch (error) {
                exibirErro('CEP não encontrado. Verifique e tente novamente.');
            } finally {
                btnBuscar.disabled = false;
            }
        }
        
        function exibirSucesso(dados) {
            resultado.className = 'sucesso';
            resultado.innerHTML = `
                <h3>✅ Endereço Encontrado</h3>
                <p><strong>CEP:</strong> ${dados.cep}</p>
                <p><strong>Logradouro:</strong> ${dados.logradouro}</p>
                <p><strong>Bairro:</strong> ${dados.bairro}</p>
                <p><strong>Cidade:</strong> ${dados.localidade}</p>
                <p><strong>Estado:</strong> ${dados.uf}</p>
            `;
        }
        
        function exibirErro(mensagem) {
            resultado.className = 'erro';
            resultado.innerHTML = `
                <h3>❌ Erro</h3>
                <p>${mensagem}</p>
            `;
        }
    </script>
</body>
</html>
```

---

### 6. Promises, Async/Await e Assincronicidade

#### 6.1 O que é Assincronicidade?

JavaScript é **single-threaded** (uma única thread de execução), mas muitas operações são **assíncronas** (não bloqueiam a execução):

- ✅ Requisições HTTP (fetch)
- ✅ Temporizadores (setTimeout, setInterval)
- ✅ Leitura de arquivos
- ✅ Operações de banco de dados

**Exemplo do problema:**

```javascript
// ❌ Código síncrono (bloqueante) - NÃO FUNCIONA assim no JS real
const dados = fetch('https://api.exemplo.com/dados'); // Espera resposta
console.log(dados); // Dados prontos

// Na realidade, fetch retorna imediatamente uma Promise!
```

#### 6.2 Promises: Representando Operações Futuras

**Promise** = Promessa de que algo vai acontecer no futuro. É um objeto que representa o resultado eventual (sucesso ou falha) de uma operação assíncrona.

**Estados de uma Promise:**

```
                    ┌──────────────┐
                    │   PENDING    │  (aguardando)
                    │  (inicial)   │
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
      ┌───────────────┐         ┌──────────────┐
      │   FULFILLED   │         │   REJECTED   │
      │   (sucesso)   │         │    (erro)    │
      └───────────────┘         └──────────────┘
```

**Criando uma Promise:**

```javascript
const minhaPromise = new Promise((resolve, reject) => {
    // Operação assíncrona
    const sucesso = true;
    
    if (sucesso) {
        resolve('Deu certo!'); // Promise fulfilled
    } else {
        reject('Deu erro!');   // Promise rejected
    }
});

// Usando a Promise
minhaPromise
    .then(resultado => console.log(resultado))    // Se resolve
    .catch(erro => console.error(erro));          // Se reject
```

**Exemplo prático: Simular requisição com delay**

```javascript
function buscarUsuarioSimulado(id) {
    return new Promise((resolve, reject) => {
        console.log('Buscando usuário...');
        
        setTimeout(() => {
            if (id > 0) {
                resolve({ id: id, nome: 'João Silva', email: 'joao@email.com' });
            } else {
                reject('ID inválido');
            }
        }, 2000); // Simula 2 segundos de delay
    });
}

// Usando
buscarUsuarioSimulado(1)
    .then(usuario => {
        console.log('Usuário encontrado:', usuario);
    })
    .catch(erro => {
        console.error('Erro:', erro);
    });
```

#### 6.3 Métodos .then() e .catch() (Abordagem Antiga)

**Sintaxe com encadeamento:**

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro HTTP');
        }
        return response.json();
    })
    .then(usuario => {
        console.log(usuario.name);
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuario.id}`);
    })
    .then(response => response.json())
    .then(posts => {
        console.log('Posts:', posts);
    })
    .catch(erro => {
        console.error('Erro em algum ponto:', erro);
    })
    .finally(() => {
        console.log('Finalizou (sempre executa)');
    });
```

**Problemas com .then()/.catch():**
- ❌ "Callback hell" em operações complexas
- ❌ Difícil de ler e manter
- ❌ Tratamento de erro pode ficar confuso
- ❌ Difícil fazer debug

#### 6.4 Async/Await: Sintaxe Moderna (RECOMENDADO)

**async/await** torna código assíncrono **parecer síncrono**, muito mais legível!

**Regras básicas:**
- Use `async` antes da função
- Use `await` antes de Promises
- Use `try/catch` para erros

**Exemplo comparativo:**

```javascript
// ❌ Com .then() (antigo)
function buscarUsuarioAntigo() {
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
        .then(usuario => {
            console.log(usuario);
        })
        .catch(erro => {
            console.error(erro);
        });
}

// ✅ Com async/await (moderno - RECOMENDADO)
async function buscarUsuario() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const usuario = await response.json();
        console.log(usuario);
    } catch (erro) {
        console.error(erro);
    }
}
```

**Encadeamento de requisições:**

```javascript
async function buscarUsuarioEPosts(userId) {
    try {
        // 1. Buscar usuário
        const responseUsuario = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const usuario = await responseUsuario.json();
        console.log('Usuário:', usuario.name);
        
        // 2. Buscar posts do usuário
        const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuario.id}`);
        const posts = await responsePosts.json();
        console.log('Total de posts:', posts.length);
        
        return { usuario, posts };
        
    } catch (erro) {
        console.error('Erro:', erro);
        throw erro; // Re-throw para quem chamou a função tratar
    }
}

// Usar a função
buscarUsuarioEPosts(1);
```

**Requisições em paralelo (quando não há dependência):**

```javascript
// ❌ Sequencial (demora mais - 6 segundos se cada uma demorar 2s)
async function buscarSequencial() {
    const usuario1 = await fetch('https://api.exemplo.com/user/1').then(r => r.json());
    const usuario2 = await fetch('https://api.exemplo.com/user/2').then(r => r.json());
    const usuario3 = await fetch('https://api.exemplo.com/user/3').then(r => r.json());
    return [usuario1, usuario2, usuario3];
}

// ✅ Paralelo (demora 2 segundos - todas ao mesmo tempo)
async function buscarParalelo() {
    const [usuario1, usuario2, usuario3] = await Promise.all([
        fetch('https://api.exemplo.com/user/1').then(r => r.json()),
        fetch('https://api.exemplo.com/user/2').then(r => r.json()),
        fetch('https://api.exemplo.com/user/3').then(r => r.json())
    ]);
    return [usuario1, usuario2, usuario3];
}
```

**Promise.all() - Aguardar múltiplas promises:**

```javascript
async function buscarTodosDados() {
    try {
        const [usuarios, posts, comentarios] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json())
        ]);
        
        console.log(`${usuarios.length} usuários`);
        console.log(`${posts.length} posts`);
        console.log(`${comentarios.length} comentários`);
        
        return { usuarios, posts, comentarios };
        
    } catch (erro) {
        console.error('Erro em alguma requisição:', erro);
    }
}
```

**Outros métodos úteis de Promise:**

```javascript
// Promise.race() - Retorna a primeira que resolver
async function buscarRapido() {
    const resultado = await Promise.race([
        fetch('https://api1.com/dados'),
        fetch('https://api2.com/dados'),
        fetch('https://api3.com/dados')
    ]);
    return resultado.json();
}

// Promise.allSettled() - Aguarda todas, mesmo que algumas falhem
async function buscarTodas() {
    const resultados = await Promise.allSettled([
        fetch('https://api1.com/dados'),
        fetch('https://api-quebrada.com/dados'), // Vai falhar
        fetch('https://api2.com/dados')
    ]);
    
    resultados.forEach((resultado, index) => {
        if (resultado.status === 'fulfilled') {
            console.log(`API ${index + 1}: Sucesso`);
        } else {
            console.log(`API ${index + 1}: Falhou -`, resultado.reason);
        }
    });
}
```

#### 6.5 setTimeout e setInterval: Temporizadores

**setTimeout: Executar depois de X milissegundos**

```javascript
// Sintaxe
setTimeout(função, delay, ...argumentos);

// Exemplo básico
setTimeout(() => {
    console.log('Executou depois de 2 segundos');
}, 2000);

// Com argumentos
function saudar(nome, sobrenome) {
    console.log(`Olá, ${nome} ${sobrenome}!`);
}

setTimeout(saudar, 1000, 'João', 'Silva');
// Após 1 segundo: "Olá, João Silva!"

// Cancelar timeout
const timeoutId = setTimeout(() => {
    console.log('Isso não vai executar');
}, 5000);

clearTimeout(timeoutId); // Cancela antes de executar
```

**setInterval: Executar repetidamente a cada X milissegundos**

```javascript
// Sintaxe
setInterval(função, delay);

// Exemplo: contador
let contador = 0;

const intervalId = setInterval(() => {
    contador++;
    console.log(`Contador: ${contador}`);
    
    if (contador === 5) {
        clearInterval(intervalId); // Para o intervalo
        console.log('Intervalo finalizado');
    }
}, 1000); // A cada 1 segundo

// Saída:
// Contador: 1
// Contador: 2
// Contador: 3
// Contador: 4
// Contador: 5
// Intervalo finalizado
```

**Exemplo prático: Relógio digital**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relógio</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        #relogio {
            font-size: 72px;
            font-weight: bold;
            color: white;
            text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
        }
    </style>
</head>
<body>
    <div id="relogio">00:00:00</div>
    
    <script>
        function atualizarRelogio() {
            const agora = new Date();
            
            const horas = String(agora.getHours()).padStart(2, '0');
            const minutos = String(agora.getMinutes()).padStart(2, '0');
            const segundos = String(agora.getSeconds()).padStart(2, '0');
            
            document.getElementById('relogio').textContent = 
                `${horas}:${minutos}:${segundos}`;
        }
        
        // Atualizar imediatamente
        atualizarRelogio();
        
        // Atualizar a cada 1 segundo
        setInterval(atualizarRelogio, 1000);
    </script>
</body>
</html>
```

**Exemplo: Countdown timer**

```javascript
function iniciarCountdown(segundos, callback) {
    let tempoRestante = segundos;
    
    const displayElement = document.getElementById('countdown');
    
    // Mostrar tempo inicial
    displayElement.textContent = tempoRestante;
    
    const intervalId = setInterval(() => {
        tempoRestante--;
        displayElement.textContent = tempoRestante;
        
        if (tempoRestante <= 0) {
            clearInterval(intervalId);
            displayElement.textContent = 'Tempo esgotado!';
            if (callback) callback(); // Executar callback ao finalizar
        }
    }, 1000);
    
    // Retornar função para cancelar
    return () => clearInterval(intervalId);
}

// Uso
const cancelar = iniciarCountdown(10, () => {
    alert('Acabou o tempo!');
});

// Para cancelar antes de terminar:
// cancelar();
```

**Exemplo: Polling (verificar API repetidamente)**

```javascript
async function verificarStatus() {
    try {
        const response = await fetch('https://api.exemplo.com/status');
        const dados = await response.json();
        
        if (dados.pronto) {
            console.log('Processamento completo!');
            return true;
        } else {
            console.log('Ainda processando...');
            return false;
        }
    } catch (erro) {
        console.error('Erro ao verificar status:', erro);
        return false;
    }
}

// Polling: verificar a cada 5 segundos
function iniciarPolling() {
    const intervalId = setInterval(async () => {
        const completo = await verificarStatus();
        
        if (completo) {
            clearInterval(intervalId);
            console.log('Polling finalizado');
        }
    }, 5000);
    
    return intervalId;
}

const pollingId = iniciarPolling();

// Para parar manualmente:
// clearInterval(pollingId);
```

**⚠️ Cuidados importantes:**

```javascript
// ❌ RUIM: criar múltiplos intervalos
button.addEventListener('click', () => {
    setInterval(() => {
        console.log('Intervalo');
    }, 1000);
});
// Cada clique cria um novo intervalo que nunca para!

// ✅ BOM: guardar ID e limpar antes de criar novo
let intervalId = null;

button.addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId); // Limpa intervalo anterior
    }
    
    intervalId = setInterval(() => {
        console.log('Intervalo');
    }, 1000);
});

// ✅ Limpar ao sair da página (evitar memory leaks)
window.addEventListener('beforeunload', () => {
    if (intervalId) clearInterval(intervalId);
});
```

#### 6.6 Por que async/await é melhor que .then()?

| Aspecto | .then().catch() | async/await |
|---------|-----------------|-------------|
| **Legibilidade** | ❌ Callback hell | ✅ Código linear |
| **Debug** | ❌ Difícil rastrear erros | ✅ Stack trace claro |
| **Tratamento de erro** | ❌ .catch() para cada promise | ✅ Um try/catch geral |
| **Condicionais** | ❌ Aninhamento complexo | ✅ If/else normal |
| **Loops** | ❌ Impossível usar loops | ✅ for/while funcionam |
| **Suporte** | ✅ ES2015+ | ✅ ES2017+ (amplo) |

**Exemplo: condicionais complexas**

```javascript
// ❌ Com .then() - confuso
function buscarDadosComplexo() {
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            if (config.usarCache) {
                return fetch('/api/cache');
            } else {
                return fetch('/api/dados');
            }
        })
        .then(response => response.json())
        .then(dados => {
            console.log(dados);
        })
        .catch(erro => console.error(erro));
}

// ✅ Com async/await - claro
async function buscarDadosComplexo() {
    try {
        const configResponse = await fetch('/api/config');
        const config = await configResponse.json();
        
        let dadosResponse;
        if (config.usarCache) {
            dadosResponse = await fetch('/api/cache');
        } else {
            dadosResponse = await fetch('/api/dados');
        }
        
        const dados = await dadosResponse.json();
        console.log(dados);
        
    } catch (erro) {
        console.error(erro);
    }
}
```

**Exemplo: loops**

```javascript
// ❌ Com .then() - não funciona
const ids = [1, 2, 3, 4, 5];
ids.forEach(id => {
    fetch(`/api/user/${id}`)
        .then(response => response.json())
        .then(usuario => console.log(usuario));
});
// Problema: não espera uma terminar antes da outra

// ✅ Com async/await - funciona perfeitamente
async function buscarUsuariosSequencial(ids) {
    for (const id of ids) {
        const response = await fetch(`/api/user/${id}`);
        const usuario = await response.json();
        console.log(usuario);
    }
}

buscarUsuariosSequencial([1, 2, 3, 4, 5]);
```

**Resumo: Sempre use async/await!**
- ✅ Mais legível
- ✅ Mais fácil de debugar
- ✅ Mais fácil de testar
- ✅ Padrão moderno do JavaScript
- ✅ Essencial para React (useEffect, data fetching)

---

### 7. Armazenamento Local: localStorage e sessionStorage

#### 6.1 O que são Web Storage APIs?

**localStorage** e **sessionStorage** permitem armazenar dados no navegador do usuário.

| Característica | localStorage | sessionStorage |
|---------------|--------------|----------------|
| **Persistência** | Permanente (até limpar) | Apenas durante a sessão |
| **Compartilhamento** | Entre abas | Apenas na aba atual |
| **Capacidade** | ~5-10MB | ~5-10MB |
| **Tipo de dados** | Apenas strings | Apenas strings |

#### 6.2 Usando localStorage

```javascript
// Salvar dados (sempre como string)
localStorage.setItem('nome', 'João');
localStorage.setItem('idade', '30');

// Recuperar dados
const nome = localStorage.getItem('nome');
console.log(nome); // "João"

// Remover item específico
localStorage.removeItem('idade');

// Limpar tudo
localStorage.clear();

// Verificar se existe
if (localStorage.getItem('nome')) {
    console.log('Nome existe!');
}

// Armazenar objetos (converter para JSON)
const usuario = {
    nome: 'Maria',
    email: 'maria@email.com',
    idade: 25
};

localStorage.setItem('usuario', JSON.stringify(usuario));

// Recuperar objeto
const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
console.log(usuarioSalvo.nome); // "Maria"

// Armazenar array
const tarefas = ['Estudar', 'Trabalhar', 'Exercitar'];
localStorage.setItem('tarefas', JSON.stringify(tarefas));

const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));
console.log(tarefasSalvas); // ['Estudar', 'Trabalhar', 'Exercitar']
```

#### 6.3 Exemplo Prático: Lista de Tarefas Persistente

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tarefas</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        
        h1 {
            text-align: center;
            color: #333;
        }
        
        .input-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        input {
            flex: 1;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        
        button {
            padding: 12px 24px;
            background-color: #3483fa;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        
        button:hover {
            background-color: #2968c8;
        }
        
        .tarefa {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .tarefa.concluida {
            opacity: 0.6;
            text-decoration: line-through;
        }
        
        .tarefa-texto {
            flex: 1;
            cursor: pointer;
        }
        
        .btn-remover {
            background-color: #e63946;
            padding: 8px 16px;
            font-size: 14px;
        }
        
        .btn-remover:hover {
            background-color: #d62828;
        }
        
        .contador {
            text-align: center;
            color: #666;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>✅ Minhas Tarefas</h1>
    
    <div class="input-container">
        <input 
            type="text" 
            id="input-tarefa" 
            placeholder="Digite uma nova tarefa..."
        >
        <button id="btn-adicionar">Adicionar</button>
    </div>
    
    <div id="lista-tarefas"></div>
    
    <div class="contador">
        <p id="contador">0 tarefas</p>
    </div>
    
    <script>
        let tarefas = [];
        
        const inputTarefa = document.getElementById('input-tarefa');
        const btnAdicionar = document.getElementById('btn-adicionar');
        const listaTarefas = document.getElementById('lista-tarefas');
        const contador = document.getElementById('contador');
        
        // Carregar tarefas ao iniciar
        carregarTarefas();
        
        // Adicionar tarefa
        btnAdicionar.addEventListener('click', adicionarTarefa);
        inputTarefa.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') adicionarTarefa();
        });
        
        function adicionarTarefa() {
            const texto = inputTarefa.value.trim();
            
            if (texto === '') {
                alert('Digite uma tarefa!');
                return;
            }
            
            const tarefa = {
                id: Date.now(),
                texto: texto,
                concluida: false
            };
            
            tarefas.push(tarefa);
            salvarTarefas();
            renderizarTarefas();
            
            inputTarefa.value = '';
            inputTarefa.focus();
        }
        
        function alternarConcluida(id) {
            tarefas = tarefas.map(tarefa => {
                if (tarefa.id === id) {
                    return { ...tarefa, concluida: !tarefa.concluida };
                }
                return tarefa;
            });
            
            salvarTarefas();
            renderizarTarefas();
        }
        
        function removerTarefa(id) {
            if (confirm('Deseja remover esta tarefa?')) {
                tarefas = tarefas.filter(tarefa => tarefa.id !== id);
                salvarTarefas();
                renderizarTarefas();
            }
        }
        
        function renderizarTarefas() {
            listaTarefas.innerHTML = '';
            
            tarefas.forEach(tarefa => {
                const div = document.createElement('div');
                div.className = `tarefa ${tarefa.concluida ? 'concluida' : ''}`;
                
                div.innerHTML = `
                    <span class="tarefa-texto">${tarefa.texto}</span>
                    <button class="btn-remover">Remover</button>
                `;
                
                // Alternar concluída ao clicar no texto
                const textoElement = div.querySelector('.tarefa-texto');
                textoElement.addEventListener('click', () => {
                    alternarConcluida(tarefa.id);
                });
                
                // Remover tarefa
                const btnRemover = div.querySelector('.btn-remover');
                btnRemover.addEventListener('click', () => {
                    removerTarefa(tarefa.id);
                });
                
                listaTarefas.appendChild(div);
            });
            
            atualizarContador();
        }
        
        function atualizarContador() {
            const total = tarefas.length;
            const concluidas = tarefas.filter(t => t.concluida).length;
            contador.textContent = `${total} tarefas (${concluidas} concluídas)`;
        }
        
        function salvarTarefas() {
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }
        
        function carregarTarefas() {
            const tarefasSalvas = localStorage.getItem('tarefas');
            
            if (tarefasSalvas) {
                tarefas = JSON.parse(tarefasSalvas);
                renderizarTarefas();
            }
        }
    </script>
</body>
</html>
```

#### 6.4 sessionStorage

```javascript
// Funciona exatamente como localStorage
// Mas os dados são perdidos ao fechar a aba

sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');
sessionStorage.removeItem('token');
sessionStorage.clear();

// Exemplo: salvar estado temporário de um formulário
const formulario = document.getElementById('formulario');

formulario.addEventListener('input', () => {
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value
    };
    
    sessionStorage.setItem('rascunho', JSON.stringify(dados));
});

// Recuperar ao recarregar a página
window.addEventListener('load', () => {
    const rascunho = sessionStorage.getItem('rascunho');
    
    if (rascunho) {
        const dados = JSON.parse(rascunho);
        document.getElementById('nome').value = dados.nome;
        document.getElementById('email').value = dados.email;
    }
});
```

---

### 8. Módulos JavaScript: import e export

#### 8.1 Por que usar módulos?

Módulos permitem **dividir o código** em múltiplos arquivos, facilitando:
- ✅ **Organização:** Cada módulo tem uma responsabilidade única
- ✅ **Reutilização:** Código pode ser importado em diferentes partes do projeto
- ✅ **Manutenção:** Mais fácil encontrar e corrigir bugs
- ✅ **Colaboração:** Equipes podem trabalhar em arquivos diferentes

**Estrutura típica de um projeto modular:**

```
projeto/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── main.js       (arquivo principal)
    ├── api.js        (funções de API)
    ├── ui.js         (funções de interface)
    └── utils.js      (funções utilitárias)
```

#### 8.2 Exportando e Importando

**api.js** (exportando funções):

```javascript
// Named exports (recomendado)
export async function buscarUsuarios() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
}

export async function buscarPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return await response.json();
}

// Ou exportar tudo de uma vez
function buscarComentarios(postId) {
    // código...
}

export { buscarComentarios };
```

**utils.js** (funções auxiliares):

```javascript
export function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

export function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Default export (apenas um por arquivo)
export default function saudar(nome) {
    return `Olá, ${nome}!`;
}
```

**main.js** (importando módulos):

```javascript
// Importar named exports
import { buscarUsuarios, buscarPosts } from './api.js';
import { formatarData, validarEmail } from './utils.js';

// Importar default export
import saudar from './utils.js';

// Usar as funções importadas
async function init() {
    const usuarios = await buscarUsuarios();
    console.log(usuarios);
    
    console.log(formatarData(new Date()));
    console.log(saudar('João'));
}

init();
```

**index.html** (habilitar módulos):

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Projeto com Módulos</title>
</head>
<body>
    <h1>Projeto Modular</h1>
    
    <!-- IMPORTANTE: type="module" para habilitar imports -->
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

#### 8.3 Exemplo Prático: Projeto com Módulos

**Estrutura do projeto:**

```
pokedex/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── main.js      (inicialização)
    ├── api.js       (chamadas à API)
    ├── ui.js        (interface)
    └── utils.js     (utilitários)
```

**js/api.js**:

```javascript
const BASE_URL = 'https://pokeapi.co/api/v2';

export async function buscarPokemon(nome) {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${nome.toLowerCase()}`);
        
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function buscarListaPokemon(limit = 20) {
    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erro ao buscar lista:', error);
        return [];
    }
}
```

**js/ui.js**:

```javascript
export function exibirPokemon(pokemon) {
    const container = document.getElementById('pokemon-container');
    
    const card = `
        <div class="pokemon-card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <p><strong>Altura:</strong> ${pokemon.height / 10}m</p>
            <p><strong>Peso:</strong> ${pokemon.weight / 10}kg</p>
            <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        </div>
    `;
    
    container.innerHTML = card;
}

export function exibirErro(mensagem) {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = `
        <div class="erro">
            <p>❌ ${mensagem}</p>
        </div>
    `;
}

export function exibirLoading() {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = '<div class="loading">🔍 Buscando...</div>';
}
```

**js/utils.js**:

```javascript
export function capitalizarPrimeiraLetra(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatarNome(nome) {
    return nome.toLowerCase().trim();
}

export function validarNomeVazio(nome) {
    return nome.trim() !== '';
}
```

**js/main.js**:

```javascript
import { buscarPokemon } from './api.js';
import { exibirPokemon, exibirErro, exibirLoading } from './ui.js';
import { validarNomeVazio, formatarNome } from './utils.js';

const inputPokemon = document.getElementById('input-pokemon');
const btnBuscar = document.getElementById('btn-buscar');

btnBuscar.addEventListener('click', buscar);
inputPokemon.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscar();
});

async function buscar() {
    const nome = inputPokemon.value;
    
    if (!validarNomeVazio(nome)) {
        exibirErro('Digite o nome de um Pokémon!');
        return;
    }
    
    exibirLoading();
    
    try {
        const pokemon = await buscarPokemon(formatarNome(nome));
        exibirPokemon(pokemon);
    } catch (error) {
        exibirErro('Pokémon não encontrado! Tente outro nome.');
    }
}

// Buscar Pikachu ao carregar
document.addEventListener('DOMContentLoaded', () => {
    inputPokemon.value = 'pikachu';
    buscar();
});
```

**index.html**:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokédex Modular</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h1>🔴 Pokédex</h1>
        
        <div class="busca">
            <input type="text" id="input-pokemon" placeholder="Digite o nome do Pokémon">
            <button id="btn-buscar">Buscar</button>
        </div>
        
        <div id="pokemon-container"></div>
    </div>
    
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

**Vantagens dessa estrutura:**
- ✅ Código organizado por responsabilidade
- ✅ Fácil de testar cada módulo separadamente
- ✅ Reutilizável em outros projetos
- ✅ Fácil de manter e escalar

**⚠️ Importante:** Módulos JavaScript só funcionam via servidor HTTP (não abre direto no navegador pelo arquivo). Use extensões como "Live Server" no VS Code ou GitHub Pages.

---

### 9. Boas Práticas de Código JavaScript

Escrever código limpo e manutenível é tão importante quanto fazê-lo funcionar. Aqui estão as principais boas práticas que você deve seguir desde o início.

#### 9.1 Nomenclatura (Naming Conventions)

**Variáveis e Funções: camelCase**

```javascript
// ✅ BOM
const nomeCompleto = 'João Silva';
const idadeUsuario = 30;
function calcularTotal() { }
function buscarUsuarioPorId() { }

// ❌ RUIM
const nome_completo = 'João Silva';  // snake_case (Python)
const IdadeUsuario = 30;             // PascalCase (só para classes)
function Calcular_Total() { }        // Inconsistente
```

**Classes e Construtores: PascalCase**

```javascript
// ✅ BOM
class Usuario { }
class ContaBancaria { }
function Pessoa(nome) { }  // Construtor (antigo, prefira classes)

// ❌ RUIM
class usuario { }
class conta_bancaria { }
```

**Constantes Globais: UPPER_SNAKE_CASE**

```javascript
// ✅ BOM
const API_URL = 'https://api.exemplo.com';
const MAX_TENTATIVAS = 3;
const TIMEOUT_PADRAO = 5000;

// ❌ RUIM
const apiUrl = 'https://api.exemplo.com';  // Parece variável mutável
const maxTentativas = 3;
```

**Nomes Descritivos e Significativos**

```javascript
// ❌ RUIM - Nomes genéricos
const d = new Date();
const arr = [1, 2, 3];
function calc(x, y) { return x + y; }
const temp = usuario.nome;

// ✅ BOM - Nomes descritivos
const dataAtual = new Date();
const numerosPrimos = [1, 2, 3];
function calcularDesconto(preco, percentual) { return preco * (percentual / 100); }
const nomeUsuario = usuario.nome;
```

**Booleanos: Prefixos Indicativos**

```javascript
// ✅ BOM - Fica claro que é boolean
const isAtivo = true;
const hasPermissao = false;
const canEdit = true;
const shouldUpdate = false;

// ❌ RUIM - Não fica claro
const ativo = true;
const permissao = false;
```

#### 9.2 Estrutura e Organização

**Use const por padrão, let quando necessário, evite var**

```javascript
// ✅ BOM
const PI = 3.14159;
let contador = 0;
contador++;

// ❌ RUIM
var PI = 3.14159;  // var tem escopo problemático
var contador = 0;
```

**Uma declaração por linha**

```javascript
// ❌ RUIM
const nome = 'João', idade = 30, cidade = 'SP';

// ✅ BOM
const nome = 'João';
const idade = 30;
const cidade = 'SP';
```

**Agrupe declarações relacionadas**

```javascript
// ✅ BOM - Agrupamento lógico
// Dados do usuário
const nome = 'João';
const email = 'joao@email.com';
const telefone = '123456789';

// Configurações
const tema = 'dark';
const idioma = 'pt-BR';

// ❌ RUIM - Misturado
const nome = 'João';
const tema = 'dark';
const email = 'joao@email.com';
const idioma = 'pt-BR';
```

#### 9.3 Funções

**Funções pequenas e focadas (Single Responsibility)**

```javascript
// ❌ RUIM - Faz muitas coisas
function processarUsuario(usuario) {
    // Validar
    if (!usuario.nome) return false;
    if (!usuario.email) return false;
    
    // Formatar
    usuario.nome = usuario.nome.trim().toUpperCase();
    usuario.email = usuario.email.toLowerCase();
    
    // Salvar
    fetch('/api/usuarios', {
        method: 'POST',
        body: JSON.stringify(usuario)
    });
    
    // Enviar email
    fetch('/api/emails', {
        method: 'POST',
        body: JSON.stringify({ to: usuario.email })
    });
}

// ✅ BOM - Funções separadas
function validarUsuario(usuario) {
    return usuario.nome && usuario.email;
}

function formatarUsuario(usuario) {
    return {
        ...usuario,
        nome: usuario.nome.trim().toUpperCase(),
        email: usuario.email.toLowerCase()
    };
}

async function salvarUsuario(usuario) {
    return await fetch('/api/usuarios', {
        method: 'POST',
        body: JSON.stringify(usuario)
    });
}

async function enviarEmailBoasVindas(email) {
    return await fetch('/api/emails', {
        method: 'POST',
        body: JSON.stringify({ to: email })
    });
}

// Orquestrar
async function processarUsuario(usuario) {
    if (!validarUsuario(usuario)) return false;
    
    const usuarioFormatado = formatarUsuario(usuario);
    await salvarUsuario(usuarioFormatado);
    await enviarEmailBoasVindas(usuarioFormatado.email);
    
    return true;
}
```

**Evite muitos parâmetros (máximo 3-4)**

```javascript
// ❌ RUIM
function criarUsuario(nome, email, idade, cidade, estado, pais, telefone, cpf) {
    // ...
}

// ✅ BOM - Use um objeto
function criarUsuario({ nome, email, idade, endereco, contato, documentos }) {
    // ...
}

// Uso
criarUsuario({
    nome: 'João',
    email: 'joao@email.com',
    idade: 30,
    endereco: { cidade: 'SP', estado: 'SP', pais: 'Brasil' },
    contato: { telefone: '123456789' },
    documentos: { cpf: '12345678900' }
});
```

**Retorne cedo (Early Return)**

```javascript
// ❌ RUIM - Muitos níveis de indentação
function processarPedido(pedido) {
    if (pedido) {
        if (pedido.itens) {
            if (pedido.itens.length > 0) {
                if (pedido.total > 0) {
                    // Processar pedido
                    return true;
                }
            }
        }
    }
    return false;
}

// ✅ BOM - Early return
function processarPedido(pedido) {
    if (!pedido) return false;
    if (!pedido.itens) return false;
    if (pedido.itens.length === 0) return false;
    if (pedido.total <= 0) return false;
    
    // Processar pedido
    return true;
}
```

#### 9.4 Código Limpo

**Evite código duplicado (DRY - Don't Repeat Yourself)**

```javascript
// ❌ RUIM
function calcularDescontoCliente(preco) {
    return preco * 0.9;
}

function calcularDescontoVIP(preco) {
    return preco * 0.8;
}

function calcularDescontoEmpresa(preco) {
    return preco * 0.85;
}

// ✅ BOM
function calcularDesconto(preco, percentual) {
    return preco * (1 - percentual / 100);
}

const calcularDescontoCliente = (preco) => calcularDesconto(preco, 10);
const calcularDescontoVIP = (preco) => calcularDesconto(preco, 20);
const calcularDescontoEmpresa = (preco) => calcularDesconto(preco, 15);
```

**Comentários úteis, não óbvios**

```javascript
// ❌ RUIM - Comentários óbvios
// Incrementa o contador
contador++;

// Cria um array
const numeros = [1, 2, 3];

// ✅ BOM - Comentários úteis
// Workaround para bug do IE11 com Date.parse()
const data = new Date(dateString.replace(/-/g, '/'));

// API retorna valores em centavos, converter para reais
const precoEmReais = precoEmCentavos / 100;

// Timeout de 5 segundos (conforme documentação da API)
const TIMEOUT = 5000;
```

**Use constantes para valores mágicos**

```javascript
// ❌ RUIM - "Números mágicos"
if (usuario.idade >= 18) {
    permitirAcesso();
}

setTimeout(() => {
    verificarStatus();
}, 300000);

// ✅ BOM - Constantes descritivas
const IDADE_MINIMA = 18;
const TEMPO_VERIFICACAO_MS = 5 * 60 * 1000; // 5 minutos

if (usuario.idade >= IDADE_MINIMA) {
    permitirAcesso();
}

setTimeout(() => {
    verificarStatus();
}, TEMPO_VERIFICACAO_MS);
```

#### 9.5 Tratamento de Erros

**Sempre trate erros em operações assíncronas**

```javascript
// ❌ RUIM
async function buscarDados() {
    const response = await fetch('/api/dados');
    const dados = await response.json();
    return dados;
}

// ✅ BOM
async function buscarDados() {
    try {
        const response = await fetch('/api/dados');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const dados = await response.json();
        return dados;
        
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        throw erro; // Re-throw para quem chamou tratar
    }
}
```

**Validação de entrada**

```javascript
// ❌ RUIM - Assume que entrada é válida
function dividir(a, b) {
    return a / b;
}

// ✅ BOM - Valida entrada
function dividir(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Ambos parâmetros devem ser números');
    }
    
    if (b === 0) {
        throw new Error('Divisão por zero não é permitida');
    }
    
    return a / b;
}
```

#### 9.6 Comparações e Condicionais

**Use === e !== (strict equality)**

```javascript
// ❌ RUIM - Igualdade fraca (coerção de tipo)
if (idade == '18') { }  // true mesmo se idade for string
if (null == undefined) { }  // true (confuso!)

// ✅ BOM - Igualdade estrita
if (idade === 18) { }
if (valor === null) { }
if (valor === undefined) { }
```

**Simplifique condicionais booleanos**

```javascript
// ❌ RUIM
if (isAtivo === true) { }
if (hasPermissao === false) { }

// ✅ BOM
if (isAtivo) { }
if (!hasPermissao) { }

// ❌ RUIM
function isAdulto(idade) {
    if (idade >= 18) {
        return true;
    } else {
        return false;
    }
}

// ✅ BOM
function isAdulto(idade) {
    return idade >= 18;
}
```

#### 9.7 Arrays e Objetos

**Use métodos modernos de array**

```javascript
// ❌ RUIM - Loop manual
const numeros = [1, 2, 3, 4, 5];
const dobrados = [];
for (let i = 0; i < numeros.length; i++) {
    dobrados.push(numeros[i] * 2);
}

// ✅ BOM - map
const dobrados = numeros.map(n => n * 2);

// ❌ RUIM
const pares = [];
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        pares.push(numeros[i]);
    }
}

// ✅ BOM - filter
const pares = numeros.filter(n => n % 2 === 0);
```

**Imutabilidade (especialmente para React)**

```javascript
// ❌ RUIM - Mutação direta
const usuario = { nome: 'João', idade: 30 };
usuario.idade = 31;  // Muta o objeto original

const lista = [1, 2, 3];
lista.push(4);  // Muta o array original

// ✅ BOM - Cria novos objetos/arrays
const usuario = { nome: 'João', idade: 30 };
const usuarioAtualizado = { ...usuario, idade: 31 };

const lista = [1, 2, 3];
const novaLista = [...lista, 4];
```

#### 9.8 Formatação e Estilo

**Indentação consistente (2 ou 4 espaços)**

```javascript
// ✅ BOM - Indentação clara
function exemplo() {
    if (condicao) {
        fazAlgo();
        fazOutraCoisa();
    }
}

// ❌ RUIM - Inconsistente
function exemplo() {
if (condicao) {
fazAlgo();
    fazOutraCoisa();
}
}
```

**Espaçamento adequado**

```javascript
// ✅ BOM
const soma = a + b;
if (x === 10) { }
function exemplo(a, b, c) { }
const arr = [1, 2, 3];

// ❌ RUIM
const soma=a+b;
if(x===10){}
function exemplo(a,b,c){}
const arr=[1,2,3];
```

**Ponto e vírgula (opcional, mas seja consistente)**

```javascript
// ✅ Opção 1: Com ponto e vírgula (mais seguro)
const nome = 'João';
const idade = 30;

// ✅ Opção 2: Sem ponto e vírgula (moderno)
const nome = 'João'
const idade = 30

// ❌ RUIM: Inconsistente
const nome = 'João';
const idade = 30
```

#### 9.9 Ferramentas Recomendadas

**ESLint - Linter de código**

```bash
# Instalar
npm install --save-dev eslint

# Configurar
npx eslint --init

# Executar
npx eslint seu-arquivo.js
```

**Prettier - Formatador automático**

```bash
# Instalar
npm install --save-dev prettier

# Criar .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}

# Formatar
npx prettier --write "**/*.js"
```

**EditorConfig - Padronizar em equipe**

```ini
# .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

---

### 10. NPM e Gerenciamento de Pacotes

Mesmo em projetos Vanilla JS, conhecer NPM é essencial para ferramentas modernas, bundlers e preparação para React.

#### 10.1 O que é NPM?

**NPM** (Node Package Manager) é o **gerenciador de pacotes** do JavaScript. Permite:

- ✅ Instalar bibliotecas de terceiros
- ✅ Gerenciar dependências do projeto
- ✅ Compartilhar código com a comunidade
- ✅ Executar scripts de build e desenvolvimento

**Analogia:** NPM é como uma "loja de apps" para código JavaScript.

#### 10.2 Instalando o Node.js e NPM

NPM vem junto com o Node.js:

**Download:** <https://nodejs.org/>

```bash
# Verificar instalação
node --version   # v18.17.0 (ou superior)
npm --version    # 9.6.7 (ou superior)
```

#### 10.3 Iniciando um Projeto com NPM

```bash
# Criar pasta do projeto
mkdir meu-projeto
cd meu-projeto

# Inicializar NPM (cria package.json)
npm init

# Ou inicializar com valores padrão
npm init -y
```

**Resultado: package.json**

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Meu projeto JavaScript",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Seu Nome",
  "license": "ISC"
}
```

#### 10.4 Instalando Pacotes

**Instalação local (no projeto)**

```bash
# Instalar pacote
npm install nome-do-pacote

# Exemplos práticos
npm install axios          # Cliente HTTP
npm install date-fns       # Manipulação de datas
npm install lodash         # Utilitários JavaScript

# Instalar múltiplos pacotes
npm install axios date-fns lodash

# Instalar versão específica
npm install axios@1.4.0
```

**Após instalação:**
- ✅ Cria pasta `node_modules/` (não commitar no Git!)
- ✅ Atualiza `package.json` com a dependência
- ✅ Cria/atualiza `package-lock.json` (versões exatas)

**Tipos de dependências:**

```bash
# Dependências de produção (padrão)
npm install axios

# Dependências de desenvolvimento (apenas dev)
npm install --save-dev eslint prettier

# Atalhos
npm i axios              # install
npm i -D eslint          # --save-dev
```

**Instalação global (ferramentas CLI)**

```bash
# Instalar globalmente
npm install -g http-server  # Servidor HTTP simples
npm install -g live-server  # Servidor com live reload
npm install -g nodemon      # Auto-restart Node.js

# Usar ferramenta global
http-server .               # Servir pasta atual
live-server                 # Abrir no navegador
```

#### 10.5 Usando Pacotes no Código

**Sem bundler (HTML tradicional) - Limitado**

```html
<!-- Usando CDN -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    axios.get('https://api.exemplo.com/dados')
        .then(response => console.log(response.data));
</script>
```

**Com módulos ES6 e bundler (Vite, Webpack) - MODERNO**

```javascript
// Importar pacote instalado via NPM
import axios from 'axios';
import { format } from 'date-fns';
import { debounce } from 'lodash';

// Usar normalmente
async function buscarDados() {
    const response = await axios.get('https://api.exemplo.com/dados');
    console.log(response.data);
}

const dataFormatada = format(new Date(), 'dd/MM/yyyy');
console.log(dataFormatada);

const buscarDebounced = debounce(buscarDados, 500);
```

#### 10.6 Scripts NPM

**package.json - Seção de scripts**

```json
{
  "scripts": {
    "start": "live-server",
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "format": "prettier --write \"**/*.js\"",
    "test": "jest"
  }
}
```

**Executar scripts:**

```bash
npm run start     # Executar script "start"
npm run build     # Executar script "build"
npm test          # Atalho para "npm run test"
npm start         # Atalho para "npm run start"
```

#### 10.7 Removendo e Atualizando Pacotes

```bash
# Remover pacote
npm uninstall nome-do-pacote
npm uninstall axios

# Atualizar pacote específico
npm update axios

# Atualizar todos os pacotes
npm update

# Ver pacotes desatualizados
npm outdated

# Limpar cache (se houver problemas)
npm cache clean --force
```

#### 10.8 Arquivo .gitignore

**SEMPRE ignorar node_modules no Git!**

```.gitignore
# Dependências
node_modules/
package-lock.json  # Opcional, mas alguns times preferem commitar

# Build
dist/
build/

# Ambiente
.env
.env.local

# Editor
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

#### 10.9 Exemplo Prático: Projeto com Axios

**1. Criar projeto**

```bash
mkdir weather-app
cd weather-app
npm init -y
```

**2. Instalar dependências**

```bash
npm install axios
npm install --save-dev vite
```

**3. Configurar scripts (package.json)**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "vite": "^4.3.9"
  }
}
```

**4. Criar código (index.html)**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Weather App</title>
</head>
<body>
    <h1>Clima Atual</h1>
    <div id="clima"></div>
    
    <script type="module" src="./main.js"></script>
</body>
</html>
```

**5. Usar pacote (main.js)**

```javascript
import axios from 'axios';

async function buscarClima() {
    try {
        const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
                params: {
                    q: 'São Paulo',
                    appid: 'SUA_API_KEY',
                    units: 'metric',
                    lang: 'pt_br'
                }
            }
        );
        
        const { main, weather } = response.data;
        
        document.getElementById('clima').innerHTML = `
            <h2>São Paulo</h2>
            <p>Temperatura: ${main.temp}°C</p>
            <p>Descrição: ${weather[0].description}</p>
        `;
        
    } catch (erro) {
        console.error('Erro ao buscar clima:', erro);
    }
}

buscarClima();
```

**6. Executar**

```bash
npm run dev
# Abre em http://localhost:5173
```

#### 10.10 Pacotes Úteis para Vanilla JS

| Pacote | Descrição | Uso |
|--------|-----------|-----|
| **axios** | Cliente HTTP melhorado | Requisições API |
| **date-fns** | Manipulação de datas | Formatar datas |
| **lodash** | Utilitários JS | Debounce, deep clone |
| **chart.js** | Gráficos | Visualização de dados |
| **dayjs** | Datas leve (alternativa moment.js) | Manipular datas |
| **validator** | Validação | Validar email, CPF, etc |

**Instalação:**

```bash
npm install axios date-fns lodash chart.js dayjs validator
```

#### 10.11 Preparação para React

Quando você avançar para React, já estará familiarizado com:

✅ `npm install react react-dom`  
✅ `npm install --save-dev vite @vitejs/plugin-react`  
✅ `npm run dev` e `npm run build`  
✅ Importar componentes: `import Button from './Button'`  
✅ Gerenciar dependências do projeto  

**Exemplo futuro (React):**

```bash
# Criar projeto React
npm create vite@latest my-react-app -- --template react

# Entrar na pasta
cd my-react-app

# Instalar dependências
npm install

# Rodar projeto
npm run dev
```

#### 10.12 Comandos NPM Essenciais - Resumo

```bash
# Iniciar projeto
npm init -y

# Instalar pacotes
npm install <pacote>          # Produção
npm install -D <pacote>       # Desenvolvimento
npm install -g <pacote>       # Global

# Remover
npm uninstall <pacote>

# Atualizar
npm update
npm outdated

# Scripts
npm run <script>
npm start
npm test

# Informações
npm list                      # Listar pacotes instalados
npm list --depth=0            # Apenas principais
npm view <pacote>             # Info do pacote no registry

# Limpeza
npm cache clean --force
rm -rf node_modules
npm install                   # Reinstalar tudo
```

---

## 🧩 Tópicos Extras Sugeridos

_Os tópicos a seguir são **essenciais para React** e devem ser estudados antes de avançar para frameworks._

---

### 8. Spread Operator e Rest Parameters

#### 8.1 Spread Operator (...) - "Espalhar" elementos

O **spread operator** `...` "expande" iteráveis (arrays, objetos, strings) em elementos individuais.

**Com Arrays:**

```javascript
const numeros = [1, 2, 3];
const maisNumeros = [4, 5, 6];

// Combinar arrays
const todos = [...numeros, ...maisNumeros];
console.log(todos); // [1, 2, 3, 4, 5, 6]

// Copiar array (imutabilidade!)
const copia = [...numeros];
copia.push(4);
console.log(numeros);  // [1, 2, 3] (original intacto)
console.log(copia);    // [1, 2, 3, 4]

// Passar elementos como argumentos
const valores = [5, 10, 15];
console.log(Math.max(...valores)); // 15
// Equivalente a: Math.max(5, 10, 15)

// Adicionar elementos no início/meio/fim
const frutas = ['banana', 'laranja'];
const novasFrutas = ['maçã', ...frutas, 'uva'];
console.log(novasFrutas); // ['maçã', 'banana', 'laranja', 'uva']
```

**Com Objetos (ESSENCIAL para React!):**

```javascript
const usuario = {
    nome: 'João',
    idade: 30
};

// Copiar objeto (imutabilidade!)
const copia = { ...usuario };
copia.idade = 31;
console.log(usuario.idade); // 30 (original intacto)
console.log(copia.idade);   // 31

// Mesclar objetos
const endereco = {
    cidade: 'São Paulo',
    estado: 'SP'
};

const usuarioCompleto = { ...usuario, ...endereco };
console.log(usuarioCompleto);
// { nome: 'João', idade: 30, cidade: 'São Paulo', estado: 'SP' }

// Sobrescrever propriedades (ordem importa!)
const usuarioAtualizado = {
    ...usuario,
    idade: 31,           // Sobrescreve
    email: 'joao@email.com'  // Adiciona nova propriedade
};
console.log(usuarioAtualizado);
// { nome: 'João', idade: 31, email: 'joao@email.com' }

// Remover propriedade (usando destructuring + spread)
const { idade, ...usuarioSemIdade } = usuario;
console.log(usuarioSemIdade); // { nome: 'João' }
```

**Por que é essencial para React?**

```javascript
// ❌ ERRADO no React: mutação direta
this.state.usuario.nome = 'Maria'; // NÃO FAÇA ISSO!

// ✅ CORRETO no React: criar novo objeto
this.setState({
    usuario: {
        ...this.state.usuario,
        nome: 'Maria'
    }
});

// Ou com hooks:
setUsuario({
    ...usuario,
    nome: 'Maria'
});
```

#### 8.2 Rest Parameters (...) - "Coletar" argumentos

O **rest parameter** `...` coleta múltiplos elementos em um array.

```javascript
// Função com número variável de argumentos
function somar(...numeros) {
    return numeros.reduce((total, num) => total + num, 0);
}

console.log(somar(1, 2));           // 3
console.log(somar(1, 2, 3, 4, 5)); // 15

// Combinar com parâmetros normais
function apresentar(saudacao, ...nomes) {
    return `${saudacao}, ${nomes.join(' e ')}!`;
}

console.log(apresentar('Olá', 'João', 'Maria', 'Pedro'));
// "Olá, João e Maria e Pedro!"

// Destructuring com rest
const [primeiro, segundo, ...resto] = [1, 2, 3, 4, 5];
console.log(primeiro); // 1
console.log(segundo);  // 2
console.log(resto);    // [3, 4, 5]

const { nome, idade, ...outrasInfos } = {
    nome: 'João',
    idade: 30,
    cidade: 'SP',
    profissao: 'Dev'
};
console.log(nome);        // 'João'
console.log(idade);       // 30
console.log(outrasInfos); // { cidade: 'SP', profissao: 'Dev' }
```

**Spread vs Rest:**

```javascript
// SPREAD: expande → ...array vira elementos separados
const arr = [1, 2, 3];
console.log(...arr); // 1 2 3

// REST: coleta → elementos separados viram ...array
function exemplo(...args) {
    console.log(args); // [1, 2, 3]
}
exemplo(1, 2, 3);
```

---

### 9. Destructuring Avançado

#### 9.1 Destructuring de Arrays

```javascript
const frutas = ['maçã', 'banana', 'laranja', 'uva'];

// Básico
const [primeira, segunda] = frutas;
console.log(primeira); // 'maçã'
console.log(segunda);  // 'banana'

// Pular elementos
const [, , terceira] = frutas;
console.log(terceira); // 'laranja'

// Rest para pegar o restante
const [primeira, ...resto] = frutas;
console.log(primeira); // 'maçã'
console.log(resto);    // ['banana', 'laranja', 'uva']

// Valores padrão
const [a, b, c, d, e = 'padrão'] = [1, 2, 3, 4];
console.log(e); // 'padrão'

// Trocar valores (swap)
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

#### 9.2 Destructuring de Objetos (ESSENCIAL para React)

```javascript
const usuario = {
    nome: 'João Silva',
    idade: 30,
    email: 'joao@email.com',
    endereco: {
        rua: 'Av. Paulista',
        numero: 1000,
        cidade: 'São Paulo'
    }
};

// Básico
const { nome, idade } = usuario;
console.log(nome);  // 'João Silva'
console.log(idade); // 30

// Renomear variáveis
const { nome: nomeCompleto, idade: anos } = usuario;
console.log(nomeCompleto); // 'João Silva'
console.log(anos);         // 30

// Valores padrão
const { telefone = 'Não informado' } = usuario;
console.log(telefone); // 'Não informado'

// Destructuring aninhado
const { endereco: { cidade, rua } } = usuario;
console.log(cidade); // 'São Paulo'
console.log(rua);    // 'Av. Paulista'

// Rest para pegar o restante
const { nome, ...outrosDados } = usuario;
console.log(outrosDados);
// { idade: 30, email: 'joao@email.com', endereco: {...} }
```

**Destructuring em parâmetros de função (como em React!):**

```javascript
// ❌ Sem destructuring
function exibirUsuario(usuario) {
    console.log(usuario.nome);
    console.log(usuario.email);
}

// ✅ Com destructuring (React faz assim!)
function exibirUsuario({ nome, email, idade = 18 }) {
    console.log(nome);
    console.log(email);
    console.log(idade);
}

exibirUsuario({ nome: 'Maria', email: 'maria@email.com' });
// Maria
// maria@email.com
// 18 (valor padrão)

// Exemplo React-like: componente recebe props
function Card({ titulo, descricao, imagem = 'placeholder.jpg' }) {
    return `
        <div class="card">
            <img src="${imagem}" alt="${titulo}">
            <h3>${titulo}</h3>
            <p>${descricao}</p>
        </div>
    `;
}

// Uso
Card({
    titulo: 'Produto',
    descricao: 'Descrição do produto'
});
```

**Destructuring em arrays de objetos (padrão de APIs):**

```javascript
const usuarios = [
    { id: 1, nome: 'João', ativo: true },
    { id: 2, nome: 'Maria', ativo: false },
    { id: 3, nome: 'Pedro', ativo: true }
];

// Com map e destructuring
const nomes = usuarios.map(({ nome }) => nome);
console.log(nomes); // ['João', 'Maria', 'Pedro']

// Com filter e destructuring
const ativos = usuarios.filter(({ ativo }) => ativo);
console.log(ativos);
// [{ id: 1, nome: 'João', ativo: true }, { id: 3, nome: 'Pedro', ativo: true }]
```

---

### 10. Arrow Functions e o contexto 'this'

#### 10.1 Diferenças entre function e arrow function

```javascript
// Função tradicional
function soma(a, b) {
    return a + b;
}

// Arrow function
const soma = (a, b) => a + b;

// Arrow function com corpo (precisa de return explícito)
const soma = (a, b) => {
    const resultado = a + b;
    return resultado;
};

// Um parâmetro: parênteses opcionais
const dobrar = x => x * 2;

// Sem parâmetros: parênteses obrigatórios
const saudar = () => console.log('Olá!');

// Retornar objeto: precisa de parênteses
const criarUsuario = (nome, idade) => ({ nome, idade });
console.log(criarUsuario('João', 30)); // { nome: 'João', idade: 30 }
```

#### 10.2 O problema do 'this'

**Função tradicional:** `this` depende de **como a função é chamada**

```javascript
const pessoa = {
    nome: 'João',
    
    // Função tradicional
    saudar: function() {
        console.log(`Olá, meu nome é ${this.nome}`);
    },
    
    // Problema com setTimeout
    saudarDepois: function() {
        setTimeout(function() {
            console.log(`Olá, meu nome é ${this.nome}`);
            // ❌ this aqui é undefined ou window!
        }, 1000);
    }
};

pessoa.saudar();        // ✅ "Olá, meu nome é João"
pessoa.saudarDepois();  // ❌ "Olá, meu nome é undefined"
```

**Arrow function:** `this` é **léxico** (pega do contexto onde foi criada)

```javascript
const pessoa = {
    nome: 'João',
    
    // Com arrow function no callback
    saudarDepois: function() {
        setTimeout(() => {
            console.log(`Olá, meu nome é ${this.nome}`);
            // ✅ this aqui é o this do objeto pessoa!
        }, 1000);
    }
};

pessoa.saudarDepois(); // ✅ "Olá, meu nome é João"
```

**Por que isso é importante para React?**

```javascript
class MeuComponente extends React.Component {
    constructor(props) {
        super(props);
        this.state = { contador: 0 };
        
        // ❌ Método tradicional: precisa fazer bind
        // this.incrementar = this.incrementar.bind(this);
    }
    
    // ❌ Função tradicional: this vai dar undefined no onClick
    incrementar() {
        this.setState({ contador: this.state.contador + 1 });
    }
    
    // ✅ Arrow function: this funciona automaticamente!
    incrementar = () => {
        this.setState({ contador: this.state.contador + 1 });
    }
    
    render() {
        return (
            <button onClick={this.incrementar}>
                Contador: {this.state.contador}
            </button>
        );
    }
}
```

**Resumo: Quando usar cada uma?**

| Situação | Use |
|----------|-----|
| Métodos de objeto que usam `this` | Função tradicional |
| Callbacks (addEventListener, setTimeout, map, etc.) | **Arrow function** |
| Métodos de classe React | **Arrow function** |
| Funções que NÃO usam `this` | **Arrow function** (mais concisa) |
| Precisa de `arguments` | Função tradicional |

---

### 11. Operadores Modernos Essenciais

#### 11.1 Template Literals (Template Strings)

```javascript
const nome = 'João';
const idade = 30;

// ❌ Concatenação antiga
const mensagem = 'Olá, meu nome é ' + nome + ' e tenho ' + idade + ' anos.';

// ✅ Template literal (mais legível)
const mensagem = `Olá, meu nome é ${nome} e tenho ${idade} anos.`;

// Expressões dentro de ${}
const preco = 100;
console.log(`Preço com desconto: R$ ${preco * 0.9}`);

// Multilinhas
const html = `
    <div class="card">
        <h2>${nome}</h2>
        <p>Idade: ${idade}</p>
    </div>
`;

// Funções dentro
const usuarios = ['João', 'Maria', 'Pedro'];
const lista = `
    <ul>
        ${usuarios.map(u => `<li>${u}</li>`).join('')}
    </ul>
`;
console.log(lista);
// <ul>
//     <li>João</li><li>Maria</li><li>Pedro</li>
// </ul>
```

#### 11.2 Optional Chaining (?.)

**Problema:** Acessar propriedades aninhadas que podem não existir

```javascript
const usuario = {
    nome: 'João',
    endereco: {
        rua: 'Av. Paulista',
        numero: 1000
    }
};

// ❌ Sem optional chaining: precisa verificar cada nível
if (usuario && usuario.endereco && usuario.endereco.cidade) {
    console.log(usuario.endereco.cidade);
}

// ✅ Com optional chaining: muito mais simples!
console.log(usuario?.endereco?.cidade); // undefined (sem erro!)

// Também funciona com arrays
const usuarios = [
    { nome: 'João', contato: { email: 'joao@email.com' } },
    { nome: 'Maria' } // Sem contato!
];

console.log(usuarios[0]?.contato?.email); // 'joao@email.com'
console.log(usuarios[1]?.contato?.email); // undefined (sem erro!)

// Com chamadas de função
const pessoa = {
    saudar: () => 'Olá!'
};

console.log(pessoa.saudar?.()); // 'Olá!'
console.log(pessoa.despedir?.()); // undefined (sem erro!)

// Muito útil com dados de APIs
async function buscarUsuario(id) {
    const response = await fetch(`/api/usuario/${id}`);
    const usuario = await response.json();
    
    // Sem precisar verificar se cada propriedade existe
    const cidade = usuario?.endereco?.cidade ?? 'Cidade não informada';
    const telefone = usuario?.contatos?.[0]?.telefone ?? 'Sem telefone';
    
    return { cidade, telefone };
}
```

#### 11.3 Nullish Coalescing (??)

**Diferença entre `||` e `??`:**

```javascript
const valor1 = 0;
const valor2 = '';
const valor3 = false;
const valor4 = null;
const valor5 = undefined;

// || retorna o primeiro valor "truthy"
console.log(valor1 || 'padrão'); // 'padrão' (0 é falsy!)
console.log(valor2 || 'padrão'); // 'padrão' ('' é falsy!)
console.log(valor3 || 'padrão'); // 'padrão' (false é falsy!)

// ?? retorna o primeiro valor que NÃO seja null ou undefined
console.log(valor1 ?? 'padrão'); // 0 (zero é válido!)
console.log(valor2 ?? 'padrão'); // '' (string vazia é válida!)
console.log(valor3 ?? 'padrão'); // false (false é válido!)
console.log(valor4 ?? 'padrão'); // 'padrão'
console.log(valor5 ?? 'padrão'); // 'padrão'
```

**Quando usar cada um:**

```javascript
// Use || quando quiser valores falsy como padrão
const quantidade = input || 1; // Se input for 0, usa 1

// Use ?? quando 0, false, '' forem valores válidos
const quantidade = input ?? 1; // Se input for 0, mantém 0!

// Exemplo prático
const config = {
    port: 0, // 0 é uma porta válida (portas dinâmicas)
    debug: false,
    host: ''
};

// ❌ Com || (vai usar valores padrão mesmo com valores válidos)
const port = config.port || 3000;     // 3000 (errado! 0 foi ignorado)
const debug = config.debug || true;   // true (errado! false foi ignorado)

// ✅ Com ?? (respeita valores válidos)
const port = config.port ?? 3000;     // 0 (correto!)
const debug = config.debug ?? true;   // false (correto!)
const host = config.host ?? 'localhost'; // 'localhost' (correto!)
```

**Combinar com Optional Chaining:**

```javascript
const usuario = {
    nome: 'João'
    // Sem idade e sem email
};

// Obter valor ou padrão de forma segura
const idade = usuario?.idade ?? 18;
const email = usuario?.email ?? 'nao-informado@email.com';

console.log(idade); // 18
console.log(email); // 'nao-informado@email.com'

// Muito útil em React para props com valores padrão
function Produto({ nome, preco, estoque = 0 }) {
    return (
        <div>
            <h2>{nome ?? 'Produto sem nome'}</h2>
            <p>R$ {preco?.toFixed(2) ?? '0.00'}</p>
            <span>Estoque: {estoque}</span>
        </div>
    );
}
```

#### 11.4 Encadeamento de Atribuição (??=, ||=, &&=)

```javascript
let config = {};

// ??= atribui apenas se for null ou undefined
config.port ??= 3000;
console.log(config.port); // 3000

config.port = 8080;
config.port ??= 3000;
console.log(config.port); // 8080 (não sobrescreve)

// ||= atribui se for falsy
let texto = '';
texto ||= 'padrão';
console.log(texto); // 'padrão'

// &&= atribui apenas se for truthy
let usuario = { nome: 'João' };
usuario.nome &&= usuario.nome.toUpperCase();
console.log(usuario.nome); // 'JOÃO'
```

---

### 12. Ferramentas de Teste de API: Postman/Insomnia

#### 8.1 Por que testar APIs antes de integrar?

Antes de escrever código JavaScript para consumir uma API, é útil **testar os endpoints** usando ferramentas especializadas:
- ✅ Verificar se a API está funcionando
- ✅ Entender a estrutura dos dados retornados
- ✅ Testar diferentes parâmetros e cenários
- ✅ Identificar erros de autenticação ou permissão
- ✅ Economizar tempo de desenvolvimento

#### 8.2 Postman

**Postman** é a ferramenta mais popular para testar APIs.

**Download:** [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

**Como usar:**

1. **Criar uma nova requisição:**
   - Clique em "New" → "HTTP Request"
   - Cole a URL da API: `https://jsonplaceholder.typicode.com/users`
   - Selecione o método HTTP: `GET`
   - Clique em "Send"

2. **Visualizar resposta:**
   - Na aba "Body", você verá o JSON retornado
   - Na aba "Headers", veja os cabeçalhos HTTP
   - Na aba "Status", veja o código de status (200, 404, etc.)

3. **Testar com parâmetros:**
   - URL: `https://jsonplaceholder.typicode.com/posts`
   - Na aba "Params", adicione: `userId = 1`
   - Resultado: apenas posts do usuário 1

4. **Testar POST (criar recurso):**
   - Método: `POST`
   - URL: `https://jsonplaceholder.typicode.com/posts`
   - Na aba "Body" → "raw" → "JSON", adicione:
   
   ```json
   {
     "title": "Meu Post",
     "body": "Conteúdo do post",
     "userId": 1
   }
   ```
   - Clique em "Send"

#### 8.3 Insomnia

**Insomnia** é uma alternativa ao Postman, mais simples e leve.

**Download:** [https://insomnia.rest/download](https://insomnia.rest/download)

**Interface similar ao Postman:**
- Criar requisição → Escolher método → Inserir URL → Send
- Suporta GraphQL, WebSockets e gRPC
- Interface minimalista e rápida

#### 8.4 APIs Públicas para Praticar

**APIs sem autenticação (fáceis para começar):**

| API | URL Base | Descrição |
|-----|----------|-----------|
| JSONPlaceholder | `https://jsonplaceholder.typicode.com` | Dados fake para testes |
| PokéAPI | `https://pokeapi.co/api/v2` | Dados de Pokémon |
| ViaCEP | `https://viacep.com.br/ws/{cep}/json/` | Busca de CEPs brasileiros |
| Dog CEO | `https://dog.ceo/api` | Fotos aleatórias de cachorros |
| Open Trivia | `https://opentdb.com/api.php` | Perguntas de quiz |

**APIs que requerem chave (gratuitas):**

| API | URL | Requer Chave |
|-----|-----|--------------|
| OpenWeather | `https://openweathermap.org/api` | Sim (gratuita) |
| TMDB (Filmes) | `https://www.themoviedb.org/settings/api` | Sim (gratuita) |
| NewsAPI | `https://newsapi.org/` | Sim (gratuita) |
| GitHub API | `https://api.github.com` | Opcional (+ requisições com chave) |

**Exemplo: Testar ViaCEP no Postman**

```
GET https://viacep.com.br/ws/01310100/json/
```

**Resposta esperada:**

```json
{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "até 610 - lado par",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

---

### 9. Deploy Simples com GitHub Pages

#### 9.1 O que é GitHub Pages?

**GitHub Pages** é um serviço **gratuito** do GitHub que hospeda sites estáticos diretamente do repositório.

**Vantagens:**
- ✅ 100% gratuito
- ✅ HTTPS automático
- ✅ Deploy automático ao fazer push
- ✅ Ideal para projetos frontend (HTML, CSS, JS)
- ✅ Suporta domínios customizados

**Limitações:**
- ❌ Apenas sites estáticos (sem backend Node.js, Python, etc.)
- ❌ Limite de 1GB por repositório
- ❌ Limite de 100GB de banda por mês

#### 9.2 Passo a Passo

**1. Criar repositório no GitHub:**

- Acesse [github.com](https://github.com) e faça login
- Clique em "New repository"
- Nome: `meu-projeto-frontend`
- Marque "Public"
- Clique em "Create repository"

**2. Preparar projeto localmente:**

Certifique-se de que seu projeto tenha:
- Um arquivo `index.html` na raiz
- Pasta `css/` com arquivos CSS
- Pasta `js/` com arquivos JavaScript

**3. Enviar para o GitHub:**

```bash
# No terminal, dentro da pasta do projeto

# Inicializar Git
git init

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Primeiro commit"

# Conectar ao repositório remoto
git remote add origin https://github.com/SEU-USUARIO/meu-projeto-frontend.git

# Enviar para o GitHub
git push -u origin main
```

**4. Ativar GitHub Pages:**

- No repositório do GitHub, vá em "Settings"
- No menu lateral, clique em "Pages"
- Em "Source", selecione a branch `main` e pasta `/ (root)`
- Clique em "Save"

**5. Acessar o site:**

Em alguns minutos, seu site estará disponível em:

```
https://SEU-USUARIO.github.io/meu-projeto-frontend/
```

#### 9.3 Atualizando o Site

Sempre que você fizer mudanças no código e enviar para o GitHub, o site será atualizado automaticamente:

```bash
# Fazer modificações nos arquivos

# Adicionar mudanças
git add .

# Commit
git commit -m "Atualizar layout"

# Enviar para GitHub (site atualiza automaticamente)
git push
```

#### 9.4 Alternativas ao GitHub Pages

| Plataforma | Gratuito | Facilidade | Backend Suportado |
|------------|----------|------------|-------------------|
| **Vercel** | ✅ | ⭐⭐⭐⭐⭐ | ✅ (Node.js, Next.js) |
| **Netlify** | ✅ | ⭐⭐⭐⭐⭐ | ✅ (Serverless) |
| **GitHub Pages** | ✅ | ⭐⭐⭐⭐ | ❌ |
| **Render** | ✅ | ⭐⭐⭐ | ✅ (Full stack) |
| **Railway** | ✅ (limitado) | ⭐⭐⭐ | ✅ (Full stack) |

---

### 10. Tratamento de Erros e Feedbacks Visuais

#### 10.1 Tipos de Erros Comuns

```javascript
// 1. Erro de rede (API offline, sem internet)
try {
    const response = await fetch('https://api-fora.com/dados');
    const data = await response.json();
} catch (error) {
    console.error('Erro de rede:', error);
    // Exibir mensagem: "Verifique sua conexão com a internet"
}

// 2. Erro HTTP (404, 500, etc.)
try {
    const response = await fetch('https://api.exemplo.com/dados');
    
    if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
    }
    
    const data = await response.json();
} catch (error) {
    console.error('Erro:', error);
    // Exibir: "Recurso não encontrado"
}

// 3. Erro de validação
function buscarCEP(cep) {
    if (cep.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos');
    }
    // continuar...
}

// 4. Timeout (demora demais)
async function fetchComTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Requisição demorou muito');
        }
        throw error;
    }
}
```

#### 10.2 Sistema de Notificações

**Criar notificações toast (tipo Snackbar):**

**CSS:**

```css
.notificacao {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease;
    z-index: 1000;
}

.notificacao.sucesso {
    background-color: #4caf50;
}

.notificacao.erro {
    background-color: #f44336;
}

.notificacao.aviso {
    background-color: #ff9800;
}

.notificacao.info {
    background-color: #2196f3;
}

@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
```

**JavaScript:**

```javascript
function mostrarNotificacao(mensagem, tipo = 'info', duracao = 3000) {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, duracao);
}

// Uso
mostrarNotificacao('Dados carregados com sucesso!', 'sucesso');
mostrarNotificacao('Erro ao buscar dados', 'erro');
mostrarNotificacao('CEP inválido!', 'aviso');
mostrarNotificacao('Buscando...', 'info', 5000);
```

**Uso em requisições:**

```javascript
async function buscarDados() {
    try {
        mostrarNotificacao('Carregando...', 'info', 1000);
        
        const response = await fetch('https://api.exemplo.com/dados');
        
        if (!response.ok) {
            throw new Error('Falha na requisição');
        }
        
        const dados = await response.json();
        exibirDados(dados);
        
        mostrarNotificacao('Dados carregados!', 'sucesso');
        
    } catch (error) {
        mostrarNotificacao('Erro ao carregar dados', 'erro');
        console.error(error);
    }
}
```

#### 10.3 Estados de Loading Elegantes

**Spinner CSS puro:**

```css
.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

**Skeleton Loading (placeholder animado):**

```css
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.skeleton-text {
    height: 16px;
    margin: 8px 0;
    width: 100%;
}

.skeleton-title {
    height: 24px;
    width: 60%;
    margin-bottom: 16px;
}
```

**HTML:**

```html
<div class="loading">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text" style="width: 80%;"></div>
</div>
```

---

### 11. Debouncing e Throttling em Buscas

#### 11.1 O Problema

Quando o usuário digita em um campo de busca, cada tecla dispara um evento. Se você faz uma requisição a cada tecla:

```javascript
input.addEventListener('input', async () => {
    const resultados = await buscarAPI(input.value);
    exibirResultados(resultados);
});

// Usuário digita "pokemon":
// p      → requisição
// po     → requisição
// pok    → requisição
// poke   → requisição
// pokem  → requisição
// pokemon → requisição
// Total: 7 requisições!
```

**Problemas:**
- ❌ Desperdício de requisições
- ❌ Sobrecarga no servidor
- ❌ Custo de API (muitas APIs cobram por requisição)
- ❌ Performance ruim

#### 11.2 Debounce: Esperar o Usuário Parar de Digitar

**Debounce** = Só executar a função após o usuário **parar de digitar** por X milissegundos.

```javascript
function debounce(funcao, delay) {
    let timeout;
    
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => funcao.apply(this, args), delay);
    };
}

// Uso
const inputBusca = document.getElementById('busca');

const buscarComDebounce = debounce(async (termo) => {
    console.log('Buscando:', termo);
    const resultados = await buscarAPI(termo);
    exibirResultados(resultados);
}, 500); // Espera 500ms após parar de digitar

inputBusca.addEventListener('input', (e) => {
    buscarComDebounce(e.target.value);
});

// Agora: Usuário digita "pokemon" rapidamente:
// p → aguarda
// po → aguarda
// pok → aguarda
// poke → aguarda
// pokem → aguarda
// pokemon → aguarda 500ms → FAZ APENAS 1 REQUISIÇÃO!
```

**Exemplo prático: Busca de Pokémon com debounce**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Busca com Debounce</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        
        input {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        
        #resultados {
            margin-top: 20px;
        }
        
        .pokemon-card {
            background: #f5f5f5;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
        
        .contador {
            margin-top: 10px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>🔍 Busca de Pokémon com Debounce</h1>
    <input type="text" id="busca" placeholder="Digite o nome do Pokémon...">
    <div class="contador">Requisições feitas: <span id="contador">0</span></div>
    <div id="resultados"></div>
    
    <script>
        let contadorRequisicoes = 0;
        const inputBusca = document.getElementById('busca');
        const resultadosDiv = document.getElementById('resultados');
        const contadorSpan = document.getElementById('contador');
        
        // Função debounce
        function debounce(func, delay) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        }
        
        async function buscarPokemon(nome) {
            if (nome.trim() === '') {
                resultadosDiv.innerHTML = '';
                return;
            }
            
            resultadosDiv.innerHTML = '<p>🔍 Buscando...</p>';
            
            try {
                contadorRequisicoes++;
                contadorSpan.textContent = contadorRequisicoes;
                
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);
                
                if (!response.ok) {
                    throw new Error('Pokémon não encontrado');
                }
                
                const pokemon = await response.json();
                
                resultadosDiv.innerHTML = `
                    <div class="pokemon-card">
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                        <h2>${pokemon.name.toUpperCase()}</h2>
                        <p><strong>Altura:</strong> ${pokemon.height / 10}m</p>
                        <p><strong>Peso:</strong> ${pokemon.weight / 10}kg</p>
                    </div>
                `;
            } catch (error) {
                resultadosDiv.innerHTML = '<p>❌ Pokémon não encontrado</p>';
            }
        }
        
        // Aplicar debounce
        const buscarComDebounce = debounce(buscarPokemon, 500);
        
        inputBusca.addEventListener('input', (e) => {
            buscarComDebounce(e.target.value);
        });
    </script>
</body>
</html>
```

#### 11.3 Throttle: Limitar Frequência de Execução

**Throttle** = Executar no **máximo uma vez** a cada X milissegundos, mesmo que o usuário continue disparando o evento.

```javascript
function throttle(funcao, delay) {
    let ultimaExecucao = 0;
    
    return function(...args) {
        const agora = Date.now();
        
        if (agora - ultimaExecucao >= delay) {
            funcao.apply(this, args);
            ultimaExecucao = agora;
        }
    };
}

// Uso em scroll
const tratarScroll = throttle(() => {
    console.log('Scroll detectado!');
    // Código para animações, lazy loading, etc.
}, 200); // Máximo 1 execução a cada 200ms

window.addEventListener('scroll', tratarScroll);
```

**Quando usar cada um:**

| Técnica | Quando usar | Exemplo |
|---------|-------------|---------|
| **Debounce** | Esperar usuário terminar ação | Busca, validação de formulário, resize |
| **Throttle** | Limitar frequência contínua | Scroll, mousemove, drag |

---

### 12. Princípios SOLID aplicados ao Frontend

#### 12.1 O que é SOLID?

**SOLID** são 5 princípios de design de código para torná-lo mais **limpo, reutilizável e manutenível**.

#### 12.2 Single Responsibility (Responsabilidade Única)

**Princípio:** Cada função deve ter **uma única responsabilidade**.

**❌ Ruim (função faz muitas coisas):**

```javascript
function buscarEExibirUsuarios() {
    // Busca dados
    fetch('https://api.exemplo.com/usuarios')
        .then(res => res.json())
        .then(usuarios => {
            // Manipula DOM
            const container = document.getElementById('usuarios');
            container.innerHTML = '';
            
            // Cria elementos
            usuarios.forEach(usuario => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${usuario.nome}</h3>`;
                container.appendChild(div);
            });
        });
}
```

**✅ Bom (separar responsabilidades):**

```javascript
// 1. Função para buscar dados (API)
async function buscarUsuarios() {
    const response = await fetch('https://api.exemplo.com/usuarios');
    return await response.json();
}

// 2. Função para exibir dados (UI)
function exibirUsuarios(usuarios) {
    const container = document.getElementById('usuarios');
    container.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const div = criarCardUsuario(usuario);
        container.appendChild(div);
    });
}

// 3. Função para criar elemento (componente)
function criarCardUsuario(usuario) {
    const div = document.createElement('div');
    div.className = 'usuario-card';
    div.innerHTML = `<h3>${usuario.nome}</h3>`;
    return div;
}

// 4. Orquestrar (main)
async function init() {
    const usuarios = await buscarUsuarios();
    exibirUsuarios(usuarios);
}
```

**Benefícios:**
- ✅ Fácil testar cada função separadamente
- ✅ Fácil reutilizar (`buscarUsuarios()` pode ser usada em outro lugar)
- ✅ Fácil manter e debugar

#### 12.3 Outros princípios SOLID (resumo)

**O - Open/Closed (Aberto/Fechado):**
- Código deve estar **aberto para extensão**, mas **fechado para modificação**.
- Use funções genéricas que aceitem parâmetros, em vez de hardcode.

```javascript
// ❌ Ruim
function exibirUsuarios() {
    // Hardcoded
}

// ✅ Bom
function exibir<parameter name="items">(items, createItemElement) {
    items.forEach(item => {
        const element = createItemElement(item);
        container.appendChild(element);
    });
}
```

**L - Liskov Substitution:**
- Funções derivadas devem poder substituir a função base sem quebrar o código.

**I - Interface Segregation:**
- Não force uso de métodos desnecessários. Crie interfaces específicas.

**D - Dependency Inversion:**
- Dependa de abstrações, não de implementações concretas.
- Use injeção de dependências.

```javascript
// ✅ Bom: função aceita qualquer fonte de dados
async function init(apiService) {
    const dados = await apiService.buscar();
    exibir(dados);
}

// Pode usar diferentes implementações
init(apiUsuarios);
init(apiProdutos);
```

---


---

## 📚 Materiais e Referências Sugeridas

### 📖 Documentação Oficial

- **MDN JavaScript:** <https://developer.mozilla.org/pt-BR/docs/Web/JavaScript>
- **JavaScript.info:** <https://javascript.info/>
- **Eloquent JavaScript:** <https://eloquentjavascript.net/>

### 🎓 Tutoriais e Cursos

- **JavaScript30:** <https://javascript30.com/>
- **freeCodeCamp:** <https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/>
- **Roadmap JavaScript:** <https://roadmap.sh/javascript>

### 🔗 APIs Públicas

- **Public APIs:** <https://github.com/public-apis/public-apis>
- **JSONPlaceholder:** <https://jsonplaceholder.typicode.com/>
- **PokeAPI:** <https://pokeapi.co/>
- **OpenWeather:** <https://openweathermap.org/api>
- **ViaCEP:** <https://viacep.com.br/>

### 🔧 Ferramentas

- **Postman:** <https://www.postman.com/downloads/>
- **Insomnia:** <https://insomnia.rest/download>
- **JSON Formatter:** <https://jsonformatter.org/>

### 📱 Deploy

- **GitHub Pages:** <https://pages.github.com/>
- **Vercel:** <https://vercel.com/>
- **Netlify:** <https://www.netlify.com/>

---

**Bons códigos e ótimos projetos! 🚀💻✨**
