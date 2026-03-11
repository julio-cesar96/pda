# 🏗️ A1: Mão na Massa — Criando com React.js

## Índice

1. [Por que o React existe?](#1-por-que-o-react-existe)
2. [O que é o Virtual DOM?](#2-o-que-é-o-virtual-dom)
3. [Configurando o ambiente com Vite](#3-configurando-o-ambiente-com-vite)
4. [JSX — HTML dentro do JavaScript](#4-jsx--html-dentro-do-javascript)
5. [Componentes Funcionais](#5-componentes-funcionais)
6. [Props — passando dados entre componentes](#6-props--passando-dados-entre-componentes)
7. [Renderização de Listas com .map()](#7-renderização-de-listas-com-map)
8. [Renderização Condicional](#8-renderização-condicional)
9. [Código Completo da Aula — DiretoFácil Sprint 1](#9-código-completo-da-aula--diretofácil-sprint-1)
10. [Exercício em Sala](#10-exercício-em-sala)
11. [Resumo dos Conceitos](#11-resumo-dos-conceitos)

---

## 1. Por que o React existe?

Antes do React, construir interfaces dinâmicas significava manipular o DOM manualmente com JavaScript puro. Isso funcionava — mas não escalava bem.

### O problema do JavaScript puro

Imagine que você precisa atualizar uma lista de instrutores toda vez que o usuário aplica um filtro. Com JS puro, você faria algo assim:

```javascript
// JavaScript puro — sem React
const lista = document.getElementById('lista-instrutores');

function atualizarLista(instrutores) {
  lista.innerHTML = ''; // apaga tudo

  instrutores.forEach(instrutor => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="card">
        <h2>${instrutor.nome}</h2>
        <p>${instrutor.cidade}</p>
        <p>${instrutor.especialidade}</p>
      </div>
    `;
    lista.appendChild(li);
  });
}
```

Parece simples — mas pense no que acontece quando:

- O design muda e você precisa alterar o HTML de cada card
- Você quer reutilizar esse card em outra página
- A lista tem 200 itens e você precisa atualizar só um deles
- Vários filtros mudam ao mesmo tempo

O código vira um caos de `getElementById`, `innerHTML` e mutações manuais que ninguém mais consegue entender.

### O que o React propõe

O React resolve esses problemas com dois conceitos centrais:

**Componentes**: blocos reutilizáveis e independentes que encapsulam estrutura, lógica e estilo. Em vez de copiar e colar HTML, você cria um componente uma vez e o usa quantas vezes precisar.

**Estado declarativo**: você descreve *como a interface deve parecer* para cada estado dos dados — e o React cuida de atualizar o DOM automaticamente quando os dados mudam.

```
// Com React — você declara o que quer ver
// Quando `instrutores` muda, a tela atualiza sozinha
<ListaInstrutores instrutores={instrutores} />
```

> **Analogia:** pense no React como um diretor de teatro. Em vez de mover cada ator manualmente no palco, você diz "quando a cena for X, o palco deve parecer Y" — e ele coordena tudo.

---

## 2. O que é o Virtual DOM?

O DOM (Document Object Model) é a representação do HTML na memória do navegador. Operações no DOM real são lentas — o navegador precisa recalcular layout, estilo e redesenhar pixels na tela a cada mudança.

### Como o Virtual DOM resolve isso

O React mantém uma cópia leve do DOM em memória — o **Virtual DOM**. Quando algo muda:

1. O React cria uma nova versão do Virtual DOM com as mudanças
2. Compara com a versão anterior (processo chamado de **reconciliação** ou **diffing**)
3. Calcula exatamente quais partes do DOM real precisam ser atualizadas
4. Aplica **só essas mudanças** no DOM real

```
Estado muda
    ↓
React gera novo Virtual DOM
    ↓
Compara com Virtual DOM anterior (diff)
    ↓
Encontra só o que mudou
    ↓
Atualiza só essas partes no DOM real
```

### Por que isso importa na prática?

Imagine uma lista de 100 cards de instrutores. O usuário favorita um instrutor. Sem Virtual DOM, você apagaria e recriaria todos os 100 cards. Com o Virtual DOM, o React atualiza só o ícone de favorito no card específico.

> **Analogia:** é como fazer um rascunho antes de passar a limpo. Você não apaga a folha toda — só corrige o que mudou.

---

## 3. Configurando o ambiente com Vite

O **Vite** é uma ferramenta de build moderna que substitui o Create React App. É mais rápido, mais leve e mais próximo do que o mercado usa em 2024.

### Passo a passo

```bash
# 1. Criar o projeto
npm create vite@latest diretofacil -- --template react

# 2. Entrar na pasta
cd diretofacil

# 3. Instalar dependências
npm install

# 4. Rodar o servidor de desenvolvimento
npm run dev
```

Após o `npm run dev`, o Vite abre em `http://localhost:5173`.

### Estrutura de pastas gerada

```
diretofacil/
├── public/              # arquivos estáticos (favicon, imagens)
├── src/
│   ├── assets/          # imagens importadas pelo código
│   ├── App.jsx          # componente raiz da aplicação
│   ├── App.css          # estilos do App
│   ├── main.jsx         # ponto de entrada — monta o React no HTML
│   └── index.css        # estilos globais
├── index.html           # único HTML da SPA
├── vite.config.js       # configuração do Vite
└── package.json         # dependências e scripts
```

### O que cada arquivo faz

**`index.html`** — o único arquivo HTML da aplicação. Tem um `<div id="root">` onde o React vai montar tudo.

**`src/main.jsx`** — ponto de entrada. Importa o React e monta o componente `App` dentro do `#root`.

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**`src/App.jsx`** — componente raiz. É aqui que a aplicação começa.

### Limpando o projeto inicial

Antes de começar, apague o conteúdo padrão do Vite:

```jsx
// src/App.jsx — versão limpa
function App() {
  return (
    <div>
      <h1>DiretoFácil</h1>
    </div>
  )
}

export default App
```

```css
/* src/index.css — versão limpa */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background-color: #f5f5f5;
}
```

---

## 4. JSX — HTML dentro do JavaScript

JSX (JavaScript XML) é a sintaxe que permite escrever estrutura de interface dentro do JavaScript. Parece HTML, mas não é — é açúcar sintático que o compilador transforma em chamadas de `React.createElement`.

### O que o compilador faz nos bastidores

```jsx
// O que você escreve (JSX)
const card = <div className="card"><h2>João Silva</h2></div>

// O que o compilador gera (JavaScript puro)
const card = React.createElement(
  'div',
  { className: 'card' },
  React.createElement('h2', null, 'João Silva')
)
```

Você não precisa memorizar o `React.createElement` — o JSX existe exatamente para que você não precise escrever isso.

### Regras do JSX

**1. Um único elemento raiz por retorno**

```jsx
// ❌ Errado — dois elementos raiz
return (
  <h1>Título</h1>
  <p>Parágrafo</p>
)

// ✅ Correto — um elemento raiz envolvendo os demais
return (
  <div>
    <h1>Título</h1>
    <p>Parágrafo</p>
  </div>
)

// ✅ Também correto — Fragment (não gera tag no HTML)
return (
  <>
    <h1>Título</h1>
    <p>Parágrafo</p>
  </>
)
```

**2. `className` em vez de `class`**

`class` é palavra reservada no JavaScript. No JSX, use sempre `className`:

```jsx
// ❌ Errado
<div class="card">...</div>

// ✅ Correto
<div className="card">...</div>
```

**3. Expressões JavaScript com `{}`

Tudo dentro de `{}` é JavaScript puro executado na hora:

```jsx
const nome = 'João Silva'
const preco = 120

return (
  <div>
    <h2>{nome}</h2>                          {/* variável */}
    <p>R$ {preco.toFixed(2)}/hora</p>        {/* expressão */}
    <p>{preco > 100 ? 'Premium' : 'Básico'}</p>  {/* ternário */}
  </div>
)
```

**4. Tags sempre fechadas**

No HTML, `<img>` e `<input>` podem ficar abertos. No JSX, toda tag precisa ser fechada:

```jsx
// ❌ Errado
<img src="foto.jpg">
<input type="text">

// ✅ Correto
<img src="foto.jpg" />
<input type="text" />
```

**5. Atributos em camelCase**

```jsx
// HTML          →  JSX
// class         →  className
// for           →  htmlFor
// onclick       →  onClick
// tabindex      →  tabIndex
// stroke-width  →  strokeWidth
```

---

## 5. Componentes Funcionais

Um componente React é uma função JavaScript que retorna JSX. É o bloco fundamental de qualquer aplicação React.

### Anatomia de um componente

```jsx
// 1. Nome sempre com letra MAIÚSCULA
// 2. Recebe um objeto de props como parâmetro
// 3. Retorna JSX

function NomeDoComponente(props) {
  return (
    <div>
      {/* JSX aqui */}
    </div>
  )
}

// 4. Exporta para ser usado em outros arquivos
export default NomeDoComponente
```

### Por que letra maiúscula?

O React usa a capitalização para distinguir componentes de tags HTML nativas:

```jsx
<div>          // tag HTML nativa — letra minúscula
<CardInstrutor /> // componente React — letra maiúscula
```

Se você escrever `<cardInstrutor />`, o React vai tentar criar uma tag HTML chamada `cardInstrutor` — que não existe.

### Como usar um componente

```jsx
// Importar o componente
import CardInstrutor from './CardInstrutor'

// Usar como uma tag HTML
function App() {
  return (
    <div>
      <CardInstrutor />
      <CardInstrutor />
      <CardInstrutor />
    </div>
  )
}
```

### Componente em arquivo separado

A convenção é criar um arquivo `.jsx` para cada componente, com o mesmo nome do componente:

```
src/
├── components/
│   └── CardInstrutor.jsx   ← um arquivo por componente
└── App.jsx
```

---

## 6. Props — passando dados entre componentes

Props (abreviação de *properties*) são a forma de passar dados de um componente pai para um componente filho. Funcionam como os atributos do HTML, mas podem receber qualquer valor JavaScript.

### Como passar props

```jsx
// No componente pai — passando props como atributos
<CardInstrutor
  nome="João Silva"
  cidade="São Paulo"
  especialidade="Direção defensiva"
  preco={120}
  disponivel={true}
/>
```

### Como receber props

```jsx
// No componente filho — recebendo via parâmetro
function CardInstrutor(props) {
  return (
    <div>
      <h2>{props.nome}</h2>
      <p>{props.cidade}</p>
      <p>{props.especialidade}</p>
      <p>R$ {props.preco}/hora</p>
    </div>
  )
}
```

### Desestruturação de props (forma mais comum)

Em vez de `props.nome`, `props.cidade`, etc., podemos desestruturar diretamente no parâmetro:

```jsx
// Mais limpo e legível
function CardInstrutor({ nome, cidade, especialidade, preco, disponivel }) {
  return (
    <div className="card">
      <h2>{nome}</h2>
      <p>{cidade}</p>
      <p>{especialidade}</p>
      <p>R$ {preco}/hora</p>
    </div>
  )
}
```

### Props são somente leitura

Um componente filho **nunca deve modificar suas próprias props**. Props fluem em uma única direção: do pai para o filho. Isso é o que torna o fluxo de dados do React previsível.

```jsx
// ❌ Nunca faça isso
function CardInstrutor({ nome }) {
  nome = nome.toUpperCase() // ERRADO — não modifique props
  return <h2>{nome}</h2>
}

// ✅ Faça assim — crie uma variável local
function CardInstrutor({ nome }) {
  const nomeFormatado = nome.toUpperCase()
  return <h2>{nomeFormatado}</h2>
}
```

### A prop `children`

Existe uma prop especial chamada `children` que representa o conteúdo entre as tags de abertura e fechamento do componente:

```jsx
// Usando children
function Card({ children }) {
  return <div className="card">{children}</div>
}

// Passando conteúdo como children
<Card>
  <h2>João Silva</h2>
  <p>São Paulo</p>
</Card>
```

---

## 7. Renderização de Listas com `.map()`

Para renderizar múltiplos elementos a partir de um array, usamos o método `.map()` do JavaScript. O `.map()` percorre o array e retorna um novo array — neste caso, um array de elementos JSX.

### Sintaxe básica

```jsx
const frutas = ['maçã', 'banana', 'laranja']

function ListaFrutas() {
  return (
    <ul>
      {frutas.map(fruta => (
        <li>{fruta}</li>
      ))}
    </ul>
  )
}
```

### A prop `key` — obrigatória em listas

Quando você renderiza uma lista, o React precisa identificar unicamente cada item para saber o que mudou quando a lista é atualizada. Para isso, existe a prop especial `key`.

```jsx
// ❌ Sem key — React vai reclamar no console
{instrutores.map(instrutor => (
  <CardInstrutor nome={instrutor.nome} />
))}

// ✅ Com key — React consegue rastrear cada item
{instrutores.map(instrutor => (
  <CardInstrutor
    key={instrutor.id}
    nome={instrutor.nome}
  />
))}
```

**Regras da key:**
- Deve ser única entre os irmãos da lista (não precisa ser globalmente única)
- Deve ser estável — não use o índice do array se a lista pode mudar de ordem
- Prefira sempre um `id` único dos seus dados

```jsx
// ❌ Usando índice — problemático se a lista mudar de ordem
{instrutores.map((instrutor, index) => (
  <CardInstrutor key={index} {...instrutor} />
))}

// ✅ Usando id dos dados — correto
{instrutores.map(instrutor => (
  <CardInstrutor key={instrutor.id} {...instrutor} />
))}
```

### Spread operator em props

O operador `...` (spread) permite passar todas as propriedades de um objeto como props de uma vez:

```jsx
const instrutor = { id: 1, nome: 'João', cidade: 'SP', preco: 120 }

// Equivalente a passar cada prop manualmente
<CardInstrutor {...instrutor} />

// É o mesmo que:
<CardInstrutor id={1} nome="João" cidade="SP" preco={120} />
```

---

## 8. Renderização Condicional

Renderização condicional é exibir ou esconder elementos com base em uma condição. No React, fazemos isso usando JavaScript puro dentro do JSX.

### Operador ternário — `condição ? verdadeiro : falso`

Ideal quando você quer mostrar uma coisa ou outra:

```jsx
function CardInstrutor({ nome, disponivel }) {
  return (
    <div>
      <h2>{nome}</h2>
      {disponivel
        ? <span className="badge verde">Disponível hoje</span>
        : <span className="badge cinza">Indisponível</span>
      }
    </div>
  )
}
```

### Operador `&&` — curto-circuito

Ideal quando você quer mostrar algo ou não mostrar nada:

```jsx
function CardInstrutor({ nome, disponivel }) {
  return (
    <div>
      <h2>{nome}</h2>
      {disponivel && <span className="badge">Disponível hoje</span>}
      {/* Se disponivel for false, não renderiza nada */}
    </div>
  )
}
```

> **Atenção com o `&&`:** se a condição for o número `0`, o React vai renderizar o `0` na tela. Para evitar isso, converta para booleano: `{!!quantidade && <span>{quantidade}</span>}` ou use ternário.

### Retorno antecipado (early return)

Para lógica mais complexa, você pode retornar JSX diferente antes do return principal:

```jsx
function CardInstrutor({ instrutor }) {
  if (!instrutor) {
    return <p>Instrutor não encontrado.</p>
  }

  return (
    <div className="card">
      <h2>{instrutor.nome}</h2>
    </div>
  )
}
```

### Lista vazia

Para exibir uma mensagem quando não há itens:

```jsx
function ListaInstrutores({ instrutores }) {
  if (instrutores.length === 0) {
    return <p className="vazia">Nenhum instrutor encontrado.</p>
  }

  return (
    <ul>
      {instrutores.map(instrutor => (
        <CardInstrutor key={instrutor.id} {...instrutor} />
      ))}
    </ul>
  )
}
```

---

## 9. Código Completo da Aula — DiretoFácil Sprint 1

Abaixo está todo o código desenvolvido durante a aula, organizado por arquivo.

### Estrutura de pastas ao final da aula

```
src/
├── components/
│   ├── CardInstrutor.jsx
│   ├── Header.jsx
│   └── ListaInstrutores.jsx
├── data/
│   └── instrutores.js
├── App.jsx
└── index.css
```

---

### `src/data/instrutores.js`

```javascript
// Dados mockados dos instrutores
// Na A6 esses dados virão de uma API real

export const instrutores = [
  {
    id: 1,
    nome: 'Ana Carvalho',
    cidade: 'São Paulo',
    especialidade: 'Direção defensiva',
    preco: 120,
    disponivel: true,
    foto: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    nome: 'Carlos Mendes',
    cidade: 'Rio de Janeiro',
    especialidade: 'Primeira habilitação',
    preco: 90,
    disponivel: false,
    foto: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 3,
    nome: 'Fernanda Lima',
    cidade: 'Belo Horizonte',
    especialidade: 'Reciclagem CNH',
    preco: 100,
    disponivel: true,
    foto: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 4,
    nome: 'Roberto Alves',
    cidade: 'São Paulo',
    especialidade: 'Direção defensiva',
    preco: 150,
    disponivel: true,
    foto: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: 5,
    nome: 'Mariana Costa',
    cidade: 'Curitiba',
    especialidade: 'Primeira habilitação',
    preco: 80,
    disponivel: false,
    foto: 'https://i.pravatar.cc/150?img=9',
  },
]
```

---

### `src/components/CardInstrutor.jsx`

```jsx
// CardInstrutor — componente que exibe as informações de um instrutor
// Recebe os dados via props e renderiza o card

function CardInstrutor({ nome, cidade, especialidade, preco, disponivel, foto }) {
  return (
    <div className="card">

      {/* Foto do instrutor */}
      <img
        src={foto}
        alt={`Foto de perfil de ${nome}`}
        className="card-foto"
      />

      {/* Informações principais */}
      <div className="card-info">
        <h2 className="card-nome">{nome}</h2>
        <p className="card-cidade">📍 {cidade}</p>
        <p className="card-especialidade">{especialidade}</p>

        {/* Preço */}
        <p className="card-preco">
          R$ {preco}<span>/hora</span>
        </p>

        {/* Badge de disponibilidade — renderização condicional com && */}
        {disponivel && (
          <span className="badge badge-disponivel">
            ✅ Disponível hoje
          </span>
        )}

        {/* Botão de agendamento */}
        <button className="btn-agendar">
          Ver perfil
        </button>
      </div>

    </div>
  )
}

export default CardInstrutor
```

---

### `src/components/ListaInstrutores.jsx`

```jsx
import CardInstrutor from './CardInstrutor'

// ListaInstrutores — recebe o array de instrutores e renderiza os cards
// Exibe mensagem quando a lista está vazia

function ListaInstrutores({ instrutores }) {

  // Renderização condicional — lista vazia
  if (instrutores.length === 0) {
    return (
      <div className="lista-vazia">
        <p>😕 Nenhum instrutor encontrado.</p>
        <p>Tente ajustar os filtros.</p>
      </div>
    )
  }

  return (
    <section>

      {/* Contador de resultados */}
      <p className="contador">
        {instrutores.length} instrutor{instrutores.length !== 1 ? 'es' : ''} encontrado{instrutores.length !== 1 ? 's' : ''}
      </p>

      {/* Lista de cards — .map() com key obrigatória */}
      <div className="lista-grid">
        {instrutores.map(instrutor => (
          <CardInstrutor
            key={instrutor.id}
            nome={instrutor.nome}
            cidade={instrutor.cidade}
            especialidade={instrutor.especialidade}
            preco={instrutor.preco}
            disponivel={instrutor.disponivel}
            foto={instrutor.foto}
          />
        ))}
      </div>

    </section>
  )
}

export default ListaInstrutores
```

> **Dica:** poderíamos usar spread (`{...instrutor}`) em vez de passar cada prop manualmente. As duas formas são corretas — a explícita é mais legível, o spread é mais prático quando o objeto tem muitas propriedades.

---

### `src/components/Header.jsx`

```jsx
// Header — componente de cabeçalho da plataforma
// Recebe o total de instrutores disponíveis para exibir o contador

function Header({ totalDisponiveis }) {
  return (
    <header className="header">

      {/* Logo / nome da plataforma */}
      <div className="header-logo">
        <span className="logo-icone">🚗</span>
        <h1 className="logo-nome">DiretoFácil</h1>
      </div>

      {/* Tagline */}
      <p className="header-tagline">
        Encontre seu instrutor de habilitação
      </p>

      {/* Contador de instrutores disponíveis — renderização condicional com ternário */}
      {totalDisponiveis > 0
        ? (
          <p className="header-disponiveis">
            🟢 {totalDisponiveis} instrutor{totalDisponiveis !== 1 ? 'es' : ''} disponível{totalDisponiveis !== 1 ? 'eis' : ''} agora
          </p>
        )
        : (
          <p className="header-disponiveis">
            🔴 Nenhum instrutor disponível no momento
          </p>
        )
      }

    </header>
  )
}

export default Header
```

---

### `src/App.jsx`

```jsx
import Header from './components/Header'
import ListaInstrutores from './components/ListaInstrutores'
import { instrutores } from './data/instrutores'

// App — componente raiz da aplicação
// Orquestra os dados e distribui para os componentes filhos

function App() {

  // Calcular quantos instrutores estão disponíveis hoje
  // filter() retorna um novo array só com os que passam na condição
  const instrutoresDisponiveis = instrutores.filter(
    instrutor => instrutor.disponivel
  )

  return (
    <div className="app">

      {/* Header recebe o total de disponíveis como prop */}
      <Header totalDisponiveis={instrutoresDisponiveis.length} />

      <main className="main">
        <h2 className="secao-titulo">Instrutores</h2>

        {/* ListaInstrutores recebe o array completo */}
        <ListaInstrutores instrutores={instrutores} />
      </main>

    </div>
  )
}

export default App
```

---

### `src/index.css`

```css
/* Reset e base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f0f0;
  color: #333;
}

/* Layout principal */
.app {
  min-height: 100vh;
}

.main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Header */
.header {
  background-color: #2D0A4E;
  color: white;
  padding: 1.5rem 2rem;
  text-align: center;
}

.header-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.logo-icone {
  font-size: 2rem;
}

.logo-nome {
  font-size: 2rem;
  color: #F5C800;
}

.header-tagline {
  color: #ccc;
  margin-bottom: 0.75rem;
}

.header-disponiveis {
  font-size: 0.9rem;
  color: #F5C800;
}

/* Seção de instrutores */
.secao-titulo {
  font-size: 1.5rem;
  color: #2D0A4E;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #F5C800;
}

/* Grid de cards */
.lista-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Card do instrutor */
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.card-foto {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #F5C800;
  align-self: center;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.card-nome {
  font-size: 1.2rem;
  color: #2D0A4E;
}

.card-cidade {
  color: #666;
  font-size: 0.9rem;
}

.card-especialidade {
  color: #555;
  font-size: 0.9rem;
  font-style: italic;
}

.card-preco {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2D0A4E;
  margin-top: 0.5rem;
}

.card-preco span {
  font-size: 0.85rem;
  font-weight: normal;
  color: #888;
}

/* Badge de disponibilidade */
.badge {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: bold;
  align-self: flex-start;
}

.badge-disponivel {
  background-color: #e6f4ea;
  color: #1e7e34;
}

/* Botão */
.btn-agendar {
  margin-top: 0.75rem;
  background-color: #2D0A4E;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-agendar:hover {
  background-color: #4a1280;
}

/* Lista vazia */
.lista-vazia {
  text-align: center;
  padding: 3rem;
  color: #888;
}

.lista-vazia p:first-child {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Contador de resultados */
.contador {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
```

---

## 10. Exercício em Sala

### 🏗️ DiretoFácil — Sprint 1

**Em grupos · 40 minutos**

Com base em tudo que foi visto na aula, sua missão é entregar os seguintes requisitos:

**Requisitos obrigatórios:**

1. Criar o componente `<CardInstrutor />` com as props: `nome`, `cidade`, `especialidade`, `preco` e `disponivel`
2. Renderizar uma lista mockada de **5 instrutores** usando `.map()` com a prop `key` correta
3. Implementar exibição condicional: mostrar o badge `"Disponível hoje"` apenas para instrutores com `disponivel: true`
4. Exibir a mensagem `"Nenhum instrutor encontrado."` quando o array de instrutores estiver vazio (teste passando um array vazio `[]`)

**Bonus:**

5. Criar um componente `<Header />` que recebe `totalDisponiveis` como prop e exibe o contador de instrutores disponíveis

---

## 11. Resumo dos Conceitos

| Conceito | O que é | Quando usar |
|---|---|---|
| **Componente** | Função que retorna JSX | Sempre que você quiser encapsular um bloco de interface reutilizável |
| **Props** | Dados passados do pai para o filho | Quando um componente precisa de dados externos para renderizar |
| **JSX** | Sintaxe de HTML dentro do JavaScript | Em todo retorno de componente React |
| **`.map()`** | Transforma array em array de JSX | Para renderizar listas de elementos |
| **`key`** | Identificador único de cada item de lista | Sempre que usar `.map()` para renderizar listas |
| **Operador `&&`** | Renderiza ou não renderiza | Quando você quer mostrar algo ou nada |
| **Operador ternário** | Renderiza uma coisa ou outra | Quando você quer mostrar uma de duas opções |
| **`className`** | Equivalente ao `class` do HTML no JSX | Sempre que quiser adicionar classes CSS no JSX |

---

### 🔗 O que vem na A2

Na próxima aula, os cards ganham vida. Você vai aprender a criar filtros reativos com **useState**, simular o carregamento de dados com **useEffect**, e otimizar a performance da lista com **useMemo**. A interface vai começar a responder às escolhas do usuário em tempo real.

---

> **Dúvidas?** Consulte a [documentação oficial do React](https://react.dev) — está em português e é excelente para iniciantes. A seção "Aprenda React" cobre tudo o que foi visto hoje com exemplos interativos.