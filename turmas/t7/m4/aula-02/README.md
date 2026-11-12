# 🎨 A2: Primeiros Passos com React Hooks

## Material de Apoio — DiretoFácil | Programadores do Amanhã

> Este documento é o seu guia de referência da Aula 2. A teoria de cada Hook vem antes do código — leia a explicação primeiro, depois estude o código. Tudo que foi feito ao vivo em sala está aqui, comentado e contextualizado.

---

## Índice

1. [O que são Hooks e por que eles existem](#1-o-que-são-hooks-e-por-que-eles-existem)
2. [useState — a memória do componente](#2-usestate--a-memória-do-componente)
3. [useEffect — efeitos colaterais e ciclo de vida](#3-useeffect--efeitos-colaterais-e-ciclo-de-vida)
4. [useRef — referências sem re-render](#4-useref--referências-sem-re-render)
5. [useMemo — memorizando cálculos caros](#5-usememo--memorizando-cálculos-caros)
6. [Regras dos Hooks e erros comuns](#6-regras-dos-hooks-e-erros-comuns)
7. [Código Completo da Aula — DiretoFácil Sprint 2](#7-código-completo-da-aula--diretofácil-sprint-2)
8. [Exercício em Sala](#8-exercício-em-sala)
9. [Resumo dos Hooks](#9-resumo-dos-hooks)

---

## 1. O que são Hooks e por que eles existem

Antes dos Hooks (React < 16.8), componentes funcionais eram simples demais — eles só recebiam props e retornavam JSX. Para ter estado ou ciclo de vida, você precisava escrever um **componente de classe**, que tinha uma sintaxe mais verbosa e confusa.

```jsx
// ❌ Jeito antigo — componente de classe (não usamos mais)
class Contador extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }  // estado no constructor
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Cliques: {this.state.count}
      </button>
    )
  }
}
```

Os Hooks chegaram para resolver isso. Com eles, componentes funcionais ganharam superpoderes — estado, ciclo de vida, referências e muito mais — com uma sintaxe muito mais simples.

```jsx
// ✅ Jeito moderno — componente funcional com Hook
function Contador() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Cliques: {count}
    </button>
  )
}
```

### Os Hooks desta aula

| Hook | Para que serve |
|---|---|
| `useState` | Guardar e atualizar valores que fazem a tela re-renderizar |
| `useEffect` | Executar código quando o componente monta, atualiza ou desmonta |
| `useRef` | Guardar referências e valores sem causar re-render |
| `useMemo` | Memorizar o resultado de um cálculo caro para não repetir |

### As duas regras de ouro

> **Regra 1:** Só chame Hooks no **nível superior** do componente — nunca dentro de `if`, `for` ou funções aninhadas.
>
> **Regra 2:** Só chame Hooks dentro de **componentes React** ou de outros **Custom Hooks** — nunca em funções JavaScript comuns.

O motivo é que o React identifica cada Hook pela **ordem em que ele é chamado**. Se essa ordem mudar entre renders (por causa de um `if`, por exemplo), o React perde o controle e o app quebra.

---

## 2. useState — a memória do componente

### O problema sem useState

Quando uma variável JavaScript comum muda de valor, o React não sabe disso. A tela não atualiza.

```jsx
// ❌ Isso NÃO funciona — React não sabe que busca mudou
function BarraFiltros() {
  let busca = ""  // variável comum

  return (
    <input
      value={busca}
      onChange={(e) => {
        busca = e.target.value  // muda o valor...
        // ...mas o React não re-renderiza. A tela fica igual.
      }}
    />
  )
}
```

### A solução: useState

`useState` retorna um array com dois itens: o **valor atual** e uma **função para atualizá-lo**. Quando você chama a função de atualização, o React re-renderiza o componente com o novo valor.

```jsx
const [valor, setValor] = useState(valorInicial)
//     ↑           ↑                ↑
//  estado atual   função que      valor inicial
//                 atualiza        (só na primeira vez)
```

### Sintaxe e exemplos

```jsx
import { useState } from 'react'

// String
const [busca, setBusca] = useState("")

// Número
const [preco, setPreco] = useState(0)

// Boolean
const [loading, setLoading] = useState(false)

// Array
const [instrutores, setInstrutores] = useState([])

// Objeto
const [filtro, setFiltro] = useState({ cidade: "", disponivel: false })
```

### Como atualizar objetos e arrays

Nunca mute o estado diretamente — sempre crie um novo valor:

```jsx
// ❌ ERRADO — mutação direta
filtro.cidade = "São Paulo"
setFiltro(filtro)  // o React pode não detectar a mudança

// ✅ CORRETO — novo objeto com spread
setFiltro({ ...filtro, cidade: "São Paulo" })

// ✅ CORRETO — novo array com spread
setInstrutores([...instrutores, novoInstrutor])

// ✅ CORRETO — filtrar array (remove um item)
setInstrutores(instrutores.filter(i => i.id !== idRemovido))
```

---

### 🔴 Live Code 1 — useState no DiretoFácil

**Contexto:** os cards de instrutores estão prontos da aula anterior, mas estáticos. O usuário precisa filtrar a lista por nome em tempo real.

**O que vamos construir:** campo de busca que filtra a lista de instrutores enquanto o usuário digita.

**Ponto de reflexão ao vivo:** *"O que acontece se eu usar uma variável comum em vez de useState?"*

```jsx
// src/components/BarraFiltros.jsx

import { useState } from 'react'

function BarraFiltros({ instrutores, onFiltrar }) {
  // Estado para o campo de busca por nome
  const [busca, setBusca] = useState("")

  // Estado para o filtro de cidade
  const [cidade, setCidade] = useState("")

  // Toda vez que busca ou cidade mudar, recalcula a lista filtrada
  // e avisa o componente pai através da prop onFiltrar
  function handleBuscaChange(e) {
    const novaBusca = e.target.value
    setBusca(novaBusca)

    // Filtra usando o novo valor, não o estado (que ainda é o antigo)
    const filtrados = instrutores.filter(instrutor =>
      instrutor.nome.toLowerCase().includes(novaBusca.toLowerCase()) &&
      (cidade === "" || instrutor.cidade === cidade)
    )
    onFiltrar(filtrados)
  }

  function handleCidadeChange(e) {
    const novaCidade = e.target.value
    setCidade(novaCidade)

    const filtrados = instrutores.filter(instrutor =>
      (busca === "" || instrutor.nome.toLowerCase().includes(busca.toLowerCase())) &&
      (novaCidade === "" || instrutor.cidade === novaCidade)
    )
    onFiltrar(filtrados)
  }

  // Extrai cidades únicas para o select
  const cidades = [...new Set(instrutores.map(i => i.cidade))]

  return (
    <div className="barra-filtros">

      {/* Campo de busca por nome */}
      <div className="campo">
        <label htmlFor="busca-nome">Buscar por nome</label>
        <input
          id="busca-nome"
          type="text"
          placeholder="Ex: João Silva"
          value={busca}       {/* valor controlado pelo estado */}
          onChange={handleBuscaChange}
        />
      </div>

      {/* Select de cidade */}
      <div className="campo">
        <label htmlFor="filtro-cidade">Cidade</label>
        <select
          id="filtro-cidade"
          value={cidade}
          onChange={handleCidadeChange}
        >
          <option value="">Todas as cidades</option>
          {cidades.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

    </div>
  )
}

export default BarraFiltros
```

```jsx
// src/App.jsx — usando a BarraFiltros com estado elevado

import { useState } from 'react'
import BarraFiltros from './components/BarraFiltros'
import ListaInstrutores from './components/ListaInstrutores'
import { instrutores as dadosMockados } from './data/instrutores'

function App() {
  // Estado da lista filtrada — começa com todos os instrutores
  const [instrutoresFiltrados, setInstrutoresFiltrados] = useState(dadosMockados)

  return (
    <div className="app">
      <header className="header">
        {/* Contador atualiza junto com o estado */}
        <p>{instrutoresFiltrados.length} instrutor(es) encontrado(s)</p>
      </header>

      <main>
        <BarraFiltros
          instrutores={dadosMockados}
          onFiltrar={setInstrutoresFiltrados}
        />
        <ListaInstrutores instrutores={instrutoresFiltrados} />
      </main>
    </div>
  )
}

export default App
```

> **Por que o estado da lista filtrada fica no App e não na BarraFiltros?**
> Porque tanto a BarraFiltros (que filtra) quanto a ListaInstrutores (que exibe) precisam acessar esse valor. Quando dois componentes precisam compartilhar um estado, ele sobe para o **ancestral comum mais próximo** — neste caso, o App. Isso se chama **elevação de estado** (*lifting state up*).

---

## 3. useEffect — efeitos colaterais e ciclo de vida

### O que é um efeito colateral?

Um efeito colateral é qualquer coisa que acontece **fora do fluxo de renderização** do React — como:

- Buscar dados de uma API
- Salvar algo no `localStorage`
- Assinar um evento do navegador
- Manipular o título da página

O React renderiza componentes de forma pura (entrada → saída). Efeitos colaterais não devem acontecer durante a renderização — é por isso que `useEffect` existe: para executá-los no momento certo.

### Sintaxe

```jsx
useEffect(() => {
  // código do efeito — roda depois do render

  return () => {
    // cleanup (opcional) — roda antes do próximo efeito
    // ou quando o componente desmonta
  }
}, [dependências]) // array de dependências
```

### Os três comportamentos do useEffect

```jsx
// 1. Sem array — roda depois de CADA render
useEffect(() => {
  console.log('rodou depois de todo render')
})

// 2. Array vazio [] — roda só uma vez, na montagem
useEffect(() => {
  console.log('rodou só quando o componente apareceu na tela')
}, [])

// 3. Array com dependências — roda quando uma delas muda
useEffect(() => {
  console.log('rodou porque busca ou cidade mudou')
}, [busca, cidade])
```

### O ciclo de vida simplificado

```
Componente monta    →  useEffect roda (após o primeiro render)
Estado/prop muda    →  componente re-renderiza → useEffect roda (se dependência mudou)
Componente desmonta →  função de cleanup roda
```

---

### 🔴 Live Code 2 — useEffect no DiretoFácil

**Contexto:** os dados ainda são mockados. Vamos simular o carregamento da API com um `setTimeout` para aprender o ciclo de vida antes de conectar a API real na A6.

**O que vamos construir:** estado de loading que aparece enquanto os dados "chegam", e desaparece quando a lista está pronta.

```jsx
// src/App.jsx — com simulação de carregamento

import { useState, useEffect } from 'react'
import BarraFiltros from './components/BarraFiltros'
import ListaInstrutores from './components/ListaInstrutores'
import { instrutores as dadosMockados } from './data/instrutores'

function App() {
  const [instrutores, setInstrutores] = useState([])           // lista vazia no início
  const [instrutoresFiltrados, setInstrutoresFiltrados] = useState([])
  const [loading, setLoading] = useState(true)                 // começa carregando
  const [erro, setErro] = useState(null)

  // useEffect com [] — roda uma vez quando o App monta
  // Simula uma requisição de 1.5 segundos
  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      try {
        // Aqui futuramente virá o fetch() real
        setInstrutores(dadosMockados)
        setInstrutoresFiltrados(dadosMockados)
        setLoading(false)
      } catch (e) {
        setErro("Não foi possível carregar os instrutores.")
        setLoading(false)
      }
    }, 1500)

    // Cleanup: cancela o timer se o componente desmontar antes do tempo
    return () => clearTimeout(timer)
  }, []) // [] = roda só na montagem

  // Renderização condicional baseada nos estados
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" aria-label="Carregando instrutores..." />
        <p>Buscando instrutores...</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="erro">
        <p>😕 {erro}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <p>{instrutoresFiltrados.length} instrutor(es) encontrado(s)</p>
      </header>
      <main>
        <BarraFiltros
          instrutores={instrutores}
          onFiltrar={setInstrutoresFiltrados}
        />
        <ListaInstrutores instrutores={instrutoresFiltrados} />
      </main>
    </div>
  )
}

export default App
```

### useEffect com dependências — exemplo prático

```jsx
// Exemplo: salvar o último filtro aplicado no console
// com timestamp de quando foi aplicado

useEffect(() => {
  if (busca !== "" || cidade !== "") {
    const agora = new Date().toLocaleTimeString()
    console.log(`Filtro aplicado às ${agora}:`, { busca, cidade })
  }
}, [busca, cidade])
// Roda toda vez que busca ou cidade mudar
```

> **Erro mais comum:** esquecer de colocar uma dependência no array. Se você usa `busca` dentro do `useEffect` mas não coloca `busca` no array, o efeito vai usar o valor antigo de `busca` — um bug difícil de encontrar chamado de **stale closure**.

---

## 4. useRef — referências sem re-render

### Quando usar useRef

`useRef` serve para duas situações distintas:

**1. Acessar elementos do DOM diretamente** (como dar foco a um input)

**2. Guardar um valor que persiste entre renders mas não deve causar re-render**

A diferença crucial em relação ao `useState`:

| | `useState` | `useRef` |
|---|---|---|
| Causa re-render quando muda? | ✅ Sim | ❌ Não |
| Persiste entre renders? | ✅ Sim | ✅ Sim |
| Acessado por | `valor` | `ref.current` |

### Sintaxe

```jsx
const meuRef = useRef(valorInicial)

// Acessar o valor atual
console.log(meuRef.current)

// Atualizar (não causa re-render)
meuRef.current = novoValor

// Conectar a um elemento do DOM
<input ref={meuRef} />
// Agora meuRef.current é o elemento <input> do DOM
```

---

### 🔴 Live Code 3 — useRef no DiretoFácil

**Contexto:** quando a página carrega, o foco deve ir automaticamente para o campo de busca, facilitando o uso por teclado.

**O que vamos construir:** foco automático no campo de busca com `useRef`, e demonstração de que `useRef` não causa re-render.

```jsx
// src/components/BarraFiltros.jsx — com useRef adicionado

import { useState, useEffect, useRef } from 'react'

function BarraFiltros({ instrutores, onFiltrar }) {
  const [busca, setBusca] = useState("")
  const [cidade, setCidade] = useState("")

  // Cria a referência para o input de busca
  const inputBuscaRef = useRef(null)

  // Foca no input quando o componente monta
  useEffect(() => {
    if (inputBuscaRef.current) {
      inputBuscaRef.current.focus()
    }
  }, []) // [] = só na montagem

  // Conta quantas vezes o componente renderizou
  // useRef para contar sem causar re-render
  const renderCount = useRef(0)
  renderCount.current += 1
  // Se fosse useState, cada incremento causaria um novo render — loop infinito!

  function handleBuscaChange(e) {
    const novaBusca = e.target.value
    setBusca(novaBusca)
    const filtrados = instrutores.filter(instrutor =>
      instrutor.nome.toLowerCase().includes(novaBusca.toLowerCase()) &&
      (cidade === "" || instrutor.cidade === cidade)
    )
    onFiltrar(filtrados)
  }

  function handleCidadeChange(e) {
    const novaCidade = e.target.value
    setCidade(novaCidade)
    const filtrados = instrutores.filter(instrutor =>
      (busca === "" || instrutor.nome.toLowerCase().includes(busca.toLowerCase())) &&
      (novaCidade === "" || instrutor.cidade === novaCidade)
    )
    onFiltrar(filtrados)
  }

  const cidades = [...new Set(instrutores.map(i => i.cidade))]

  return (
    <div className="barra-filtros">
      <div className="campo">
        <label htmlFor="busca-nome">Buscar por nome</label>
        <input
          id="busca-nome"
          type="text"
          placeholder="Ex: João Silva"
          value={busca}
          onChange={handleBuscaChange}
          ref={inputBuscaRef}  {/* conecta a referência ao input */}
        />
      </div>

      <div className="campo">
        <label htmlFor="filtro-cidade">Cidade</label>
        <select
          id="filtro-cidade"
          value={cidade}
          onChange={handleCidadeChange}
        >
          <option value="">Todas as cidades</option>
          {cidades.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Só para demonstração em aula — remove depois */}
      <p style={{ fontSize: '12px', color: '#999' }}>
        Renders: {renderCount.current}
      </p>
    </div>
  )
}

export default BarraFiltros
```

> **Por que não usar `document.getElementById` em vez de useRef?**
> Porque o React controla o DOM — acessar elementos diretamente com `querySelector` ou `getElementById` é trabalhar contra o React. O `useRef` é a forma "React" de fazer a mesma coisa com segurança.

---

## 5. useMemo — memorizando cálculos caros

### O problema sem useMemo

Toda vez que um componente re-renderiza, **todo o código dentro dele roda novamente** — incluindo cálculos pesados como filtragens grandes.

```jsx
// Sem useMemo — .filter() roda a cada render, mesmo quando
// nada relacionado à lista mudou
function App() {
  const [busca, setBusca] = useState("")
  const [tema, setTema] = useState("claro") // tema não afeta a lista

  // Este filter roda toda vez que o tema mudar também!
  const instrutoresFiltrados = instrutores.filter(i =>
    i.nome.toLowerCase().includes(busca.toLowerCase())
  )

  // ...
}
```

### A solução: useMemo

`useMemo` memoriza o resultado de um cálculo e só recalcula quando as dependências mudam.

```jsx
const valorMemorizado = useMemo(() => {
  // cálculo caro aqui
  return resultado
}, [dependências]) // recalcula só quando isso mudar
```

### Sintaxe no contexto do DiretoFácil

```jsx
// Com useMemo — .filter() só roda quando busca ou cidade mudar
const instrutoresFiltrados = useMemo(() => {
  return instrutores.filter(instrutor =>
    instrutor.nome.toLowerCase().includes(busca.toLowerCase()) &&
    (cidade === "" || instrutor.cidade === cidade)
  )
}, [instrutores, busca, cidade])
// ↑ só recalcula se instrutores, busca ou cidade mudarem
```

---

### 🔴 Live Code 4 — useMemo no DiretoFácil

**Contexto:** a lista filtrada está sendo recalculada a cada render, mesmo quando mudanças não relacionadas acontecem (como tema, tamanho da janela, etc).

**O que vamos construir:** mover a lógica de filtragem para dentro de um `useMemo` no App, centralizando a lógica e otimizando a performance.

```jsx
// src/App.jsx — versão final da aula com useMemo

import { useState, useEffect, useMemo } from 'react'
import BarraFiltros from './components/BarraFiltros'
import ListaInstrutores from './components/ListaInstrutores'
import { instrutores as dadosMockados } from './data/instrutores'

function App() {
  const [instrutores, setInstrutores] = useState([])
  const [loading, setLoading]         = useState(true)
  const [erro, setErro]               = useState(null)

  // Estados dos filtros — agora vivem no App
  const [busca, setBusca]   = useState("")
  const [cidade, setCidade] = useState("")

  // Simulação de carregamento
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setInstrutores(dadosMockados)
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // useMemo: lista filtrada só recalcula quando instrutores, busca ou cidade mudam
  const instrutoresFiltrados = useMemo(() => {
    return instrutores.filter(instrutor => {
      const buscaOk = busca === "" ||
        instrutor.nome.toLowerCase().includes(busca.toLowerCase())

      const cidadeOk = cidade === "" ||
        instrutor.cidade === cidade

      return buscaOk && cidadeOk
    })
  }, [instrutores, busca, cidade])

  if (loading) return <div className="loading"><p>Carregando...</p></div>
  if (erro)    return <div className="erro"><p>{erro}</p></div>

  return (
    <div className="app">
      <header className="header">
        <p>{instrutoresFiltrados.length} instrutor(es) encontrado(s)</p>
      </header>

      <main>
        {/* BarraFiltros agora recebe e atualiza os estados do App */}
        <BarraFiltros
          busca={busca}
          cidade={cidade}
          instrutores={instrutores}
          onBuscaChange={setBusca}
          onCidadeChange={setCidade}
        />

        <ListaInstrutores instrutores={instrutoresFiltrados} />
      </main>
    </div>
  )
}

export default App
```

```jsx
// src/components/BarraFiltros.jsx — versão final (recebe estados como props)

import { useEffect, useRef } from 'react'

// Agora a BarraFiltros não gerencia mais os estados de filtro
// Ela só exibe os controles e avisa o pai quando algo muda
function BarraFiltros({ busca, cidade, instrutores, onBuscaChange, onCidadeChange }) {
  const inputBuscaRef = useRef(null)

  useEffect(() => {
    inputBuscaRef.current?.focus()
  }, [])

  const cidades = [...new Set(instrutores.map(i => i.cidade))]

  return (
    <div className="barra-filtros">

      <div className="campo">
        <label htmlFor="busca-nome">Buscar por nome</label>
        <input
          id="busca-nome"
          type="text"
          placeholder="Ex: João Silva"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          ref={inputBuscaRef}
        />
      </div>

      <div className="campo">
        <label htmlFor="filtro-cidade">Cidade</label>
        <select
          id="filtro-cidade"
          value={cidade}
          onChange={(e) => onCidadeChange(e.target.value)}
        >
          <option value="">Todas as cidades</option>
          {cidades.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

    </div>
  )
}

export default BarraFiltros
```

> **Quando NÃO usar useMemo?**
> Para listas pequenas (menos de algumas centenas de itens), o custo de memorizar pode ser maior do que o de recalcular. Use `useMemo` quando o cálculo for genuinamente pesado ou quando um re-render desnecessário causador de problemas visuais for comprovado. Otimização prematura é um problema real.

---

## 6. Regras dos Hooks e erros comuns

### As regras (revisão)

```jsx
// ✅ CORRETO — Hook no nível superior
function MeuComponente() {
  const [valor, setValor] = useState("")
  // ...
}

// ❌ ERRADO — Hook dentro de if
function MeuComponente({ mostrar }) {
  if (mostrar) {
    const [valor, setValor] = useState("") // QUEBRA o React
  }
}

// ❌ ERRADO — Hook dentro de for
function MeuComponente() {
  for (let i = 0; i < 3; i++) {
    const [valor, setValor] = useState("") // QUEBRA o React
  }
}

// ❌ ERRADO — Hook dentro de função aninhada
function MeuComponente() {
  function inicializar() {
    const [valor, setValor] = useState("") // QUEBRA o React
  }
}

// ❌ ERRADO — Hook fora de componente React
function funcaoComum() {
  const [valor, setValor] = useState("") // QUEBRA o React
}
```

### Erros mais comuns

**Erro 1: useEffect sem dependências corretas (stale closure)**

```jsx
// ❌ Problemático — busca dentro do effect mas não no array
useEffect(() => {
  const filtrados = instrutores.filter(i =>
    i.nome.includes(busca) // usa busca...
  )
  setInstrutoresFiltrados(filtrados)
}, [instrutores]) // ...mas busca não está aqui! Valor sempre será ""

// ✅ Correto
useEffect(() => {
  const filtrados = instrutores.filter(i =>
    i.nome.includes(busca)
  )
  setInstrutoresFiltrados(filtrados)
}, [instrutores, busca]) // busca está no array
```

**Erro 2: Loop infinito no useEffect**

```jsx
// ❌ Loop infinito — o effect atualiza instrutores,
// que é dependência, que dispara o effect de novo...
useEffect(() => {
  setInstrutores([...instrutores, novoItem]) // atualiza estado
}, [instrutores]) // que é dependência → loop!

// ✅ Use o updater function ou [] dependendo do caso
useEffect(() => {
  setInstrutores(prev => [...prev, novoItem])
}, []) // roda só uma vez
```

**Erro 3: Atualização assíncrona do estado**

```jsx
// ❌ Pode pegar o valor antigo em operações rápidas
function incrementar() {
  setCount(count + 1) // count pode estar desatualizado
  setCount(count + 1) // ainda usa o count antigo!
}

// ✅ Use a função updater para garantir o valor mais recente
function incrementar() {
  setCount(prev => prev + 1) // prev é sempre o valor atual
  setCount(prev => prev + 1) // funciona corretamente
}
```

---

## 7. Código Completo da Aula — DiretoFácil Sprint 2

### Estrutura de pastas ao final da aula

```
src/
├── components/
│   ├── BarraFiltros.jsx       ← atualizado com useRef
│   ├── CardInstrutor.jsx      ← da aula anterior
│   ├── Header.jsx             ← da aula anterior
│   └── ListaInstrutores.jsx   ← da aula anterior
├── data/
│   └── instrutores.js         ← da aula anterior
├── App.jsx                    ← atualizado com todos os hooks
└── index.css                  ← adicionado spinner
```

---

### `src/App.jsx` — versão final completa

```jsx
import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import BarraFiltros from './components/BarraFiltros'
import ListaInstrutores from './components/ListaInstrutores'
import { instrutores as dadosMockados } from './data/instrutores'

function App() {
  // ── Estados de dados ──────────────────────────────
  const [instrutores, setInstrutores] = useState([])
  const [loading, setLoading]         = useState(true)
  const [erro, setErro]               = useState(null)

  // ── Estados dos filtros ───────────────────────────
  const [busca, setBusca]   = useState("")
  const [cidade, setCidade] = useState("")

  // ── Carregamento inicial (simula API) ─────────────
  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      try {
        setInstrutores(dadosMockados)
        setLoading(false)
      } catch {
        setErro("Não foi possível carregar os instrutores.")
        setLoading(false)
      }
    }, 1500)

    return () => clearTimeout(timer) // cleanup
  }, [])

  // ── Log do filtro aplicado ────────────────────────
  useEffect(() => {
    if (busca !== "" || cidade !== "") {
      const agora = new Date().toLocaleTimeString("pt-BR")
      console.log(`[${agora}] Filtro aplicado:`, { busca, cidade })
    }
  }, [busca, cidade])

  // ── Lista filtrada memorizada ─────────────────────
  const instrutoresFiltrados = useMemo(() => {
    return instrutores.filter(instrutor => {
      const buscaOk = busca === "" ||
        instrutor.nome.toLowerCase().includes(busca.toLowerCase())

      const cidadeOk = cidade === "" ||
        instrutor.cidade === cidade

      return buscaOk && cidadeOk
    })
  }, [instrutores, busca, cidade])

  // ── Instrutores disponíveis para o Header ─────────
  const totalDisponiveis = useMemo(() =>
    instrutores.filter(i => i.disponivel).length
  , [instrutores])

  // ── Renderizações condicionais ────────────────────
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" aria-label="Carregando instrutores..." />
        <p>Buscando instrutores...</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="erro-container">
        <p>😕 {erro}</p>
        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <Header totalDisponiveis={totalDisponiveis} />

      <main className="main">
        <BarraFiltros
          busca={busca}
          cidade={cidade}
          instrutores={instrutores}
          onBuscaChange={setBusca}
          onCidadeChange={setCidade}
        />

        {/* Contador de resultados */}
        <p className="contador">
          {instrutoresFiltrados.length === 0
            ? "Nenhum instrutor encontrado para esses filtros."
            : `${instrutoresFiltrados.length} instrutor(es) encontrado(s)`
          }
        </p>

        <ListaInstrutores instrutores={instrutoresFiltrados} />
      </main>
    </div>
  )
}

export default App
```

---

### `src/components/BarraFiltros.jsx` — versão final completa

```jsx
import { useEffect, useRef } from 'react'

function BarraFiltros({ busca, cidade, instrutores, onBuscaChange, onCidadeChange }) {
  // Referência para o campo de busca — foco automático na montagem
  const inputBuscaRef = useRef(null)

  useEffect(() => {
    inputBuscaRef.current?.focus()
  }, [])

  // Cidades únicas para o select
  const cidades = [...new Set(instrutores.map(i => i.cidade))].sort()

  return (
    <section className="barra-filtros" aria-label="Filtros de busca">

      {/* Busca por nome */}
      <div className="campo">
        <label htmlFor="busca-nome">Buscar por nome</label>
        <input
          id="busca-nome"
          type="text"
          placeholder="Ex: João Silva"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          ref={inputBuscaRef}
          aria-label="Buscar instrutor por nome"
        />
      </div>

      {/* Filtro por cidade */}
      <div className="campo">
        <label htmlFor="filtro-cidade">Cidade</label>
        <select
          id="filtro-cidade"
          value={cidade}
          onChange={(e) => onCidadeChange(e.target.value)}
          aria-label="Filtrar por cidade"
        >
          <option value="">Todas as cidades</option>
          {cidades.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

    </section>
  )
}

export default BarraFiltros
```

---

### Adições ao `src/index.css`

```css
/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 1rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #2D0A4E;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Erro */
.erro-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 1rem;
  color: #c0392b;
}

.erro-container button {
  background-color: #2D0A4E;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
}

/* Barra de filtros */
.barra-filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 1.5rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 200px;
}

.campo label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2D0A4E;
}

.campo input,
.campo select {
  padding: 0.5rem 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.campo input:focus,
.campo select:focus {
  border-color: #2D0A4E;
}

/* Contador */
.contador {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
```

---

## 8. Exercício em Sala

### 🏗️ DiretoFácil — Sprint 2

**Em grupos · 40 minutos**

Partindo do código construído na aula, sua missão é:

**Requisitos obrigatórios:**

1. Adicionar um filtro de **faixa de preço** com dois inputs (mínimo e máximo) usando `useState`
2. Fazer os **três filtros funcionarem juntos** (busca + cidade + preço) com lógica AND dentro do `useMemo`
3. Adicionar um `useEffect` que salva no console o **último filtro aplicado** e **há quantos segundos** ele foi aplicado

**Bonus:**

4. Botão **"Limpar filtros"** que reseta todos os estados de filtro de uma vez

---

### Dica para o item 3

```jsx
// Guarde o timestamp do último filtro com useRef
// (não deve causar re-render — por isso useRef, não useState)
const ultimoFiltroRef = useRef(Date.now())

useEffect(() => {
  const agora = Date.now()
  const segundos = ((agora - ultimoFiltroRef.current) / 1000).toFixed(1)
  ultimoFiltroRef.current = agora

  console.log(`Filtro aplicado (${segundos}s desde o último):`, { busca, cidade })
}, [busca, cidade])
```

### Dica para o bonus

```jsx
function limparFiltros() {
  setBusca("")
  setCidade("")
  setPrecoMin(0)
  setPrecoMax(Infinity)
}
```

---

## 9. Resumo dos Hooks

| Hook | Sintaxe | Quando usar | Causa re-render? |
|---|---|---|---|
| `useState` | `const [val, setVal] = useState(inicial)` | Qualquer valor que, ao mudar, deve atualizar a tela | ✅ Sim |
| `useEffect` | `useEffect(() => {}, [deps])` | Buscar dados, assinar eventos, manipular DOM | ❌ Não diretamente |
| `useRef` | `const ref = useRef(inicial)` | Referenciar elementos DOM ou guardar valores sem re-render | ❌ Não |
| `useMemo` | `const val = useMemo(() => cálculo, [deps])` | Memorizar resultado de cálculos caros | ❌ Não diretamente |

---

### 🔗 O que vem na A3

Na próxima aula, o TypeScript entra no projeto. Você vai tipar as props do `CardInstrutor`, os estados com `useState<Instrutor[]>`, os eventos de formulário e criar interfaces para os dados da API. O objetivo é que o compilador encontre erros antes de você rodar o código — e antes do usuário encontrá-los em produção.

---

> **Dúvidas?** Consulte a [documentação oficial dos Hooks](https://react.dev/reference/react/hooks) — está em português e tem playground interativo para cada Hook.