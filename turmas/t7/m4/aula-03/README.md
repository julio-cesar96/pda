# 🧘🏾 A3: TypeScript com React
### Material de Apoio — DiretoFácil | Programadores do Amanhã

> Este documento é o seu guia de referência da Aula 3. Cada conceito de TypeScript vem explicado antes do código — leia a teoria primeiro, depois estude como ela aparece no projeto. Tudo que foi feito ao vivo em sala está aqui, comentado e contextualizado.

---

## Índice

1. [Por que TypeScript no React?](#1-por-que-typescript-no-react)
2. [type vs interface — qual usar?](#2-type-vs-interface--qual-usar)
3. [Tipando Props de Componentes](#3-tipando-props-de-componentes)
4. [Tipando useState, useRef e useEffect](#4-tipando-usestate-useref-e-useeffect)
5. [Tipando Eventos do DOM](#5-tipando-eventos-do-dom)
6. [Generics no React](#6-generics-no-react)
7. [Utilitários TypeScript — Partial, Pick e Omit](#7-utilitários-typescript--partial-pick-e-omit)
8. [Erros Comuns e Como Resolver](#8-erros-comuns-e-como-resolver)
9. [Código Completo da Aula — DiretoFácil Sprint 3](#9-código-completo-da-aula--diretofácil-sprint-3)
10. [Exercício em Sala](#10-exercício-em-sala)
11. [Resumo dos Conceitos](#11-resumo-dos-conceitos)

---

## 1. Por que TypeScript no React?

### O problema do JavaScript puro

No JavaScript, você pode passar qualquer coisa para qualquer lugar — e o código só quebra quando roda, muitas vezes já em produção.

```js
// JavaScript puro — nenhum aviso, nenhum erro no editor
function CardInstrutor({ nome, preco }) {
  return <p>R$ {preco.toFixed(2)}</p>  // quebra se preco for undefined
}

// Ninguém impediu isso de acontecer:
<CardInstrutor nome="João" />  // preco não foi passado → undefined.toFixed → 💥
```

O TypeScript resolve isso **antes de você rodar o código**. O editor sublinha o erro na hora que você comete.

### O que o TypeScript faz na prática

```
Você escreve código  →  TypeScript verifica os tipos  →  Erro encontrado
       ↓                        ↓                              ↓
  No editor            Antes de rodar              Antes do usuário ver
```

### O que NÃO muda com TypeScript

TypeScript é **JavaScript com anotações de tipo**. O browser nunca vê TypeScript — ele é compilado para JavaScript puro antes de ir para produção. Tudo que você já sabe de JavaScript continua válido.

```ts
// TypeScript
const nome: string = "João"
const preco: number = 120
const disponivel: boolean = true

// Compilado → JavaScript puro (o que o browser executa)
const nome = "João"
const preco = 120
const disponivel = true
```

### Dados de mercado (2024)

- Mais de 80% das vagas de front-end no Brasil pedem TypeScript
- Todos os grandes projetos open source React (Next.js, shadcn/ui, React Query) são escritos em TypeScript
- O VS Code foi escrito em TypeScript e tem suporte nativo — autocomplete muito mais inteligente com tipos corretos

### Configurando o TypeScript no projeto Vite

Se você criou o projeto com `--template react`, ainda não tem TypeScript. Para habilitar:

```bash
# Criar projeto já com TypeScript
npm create vite@latest diretofacil -- --template react-ts

# OU adicionar ao projeto existente
npm install -D typescript @types/react @types/react-dom
```

O arquivo `tsconfig.json` controla as opções do compilador. A configuração mais importante:

```json
{
  "compilerOptions": {
    "strict": true  // ativa todas as verificações rigorosas — use sempre
  }
}
```

> Com `"strict": true`, o TypeScript é mais exigente — e isso é bom. Ele vai encontrar mais bugs, inclusive os que você não sabia que existiam.

---

## 2. type vs interface — qual usar?

Tanto `type` quanto `interface` definem a forma de um objeto. As diferenças são pequenas, mas existem convenções:

```ts
// type — mais flexível, funciona para qualquer tipo
type TaskStatus = "pendente" | "concluida"  // union type — só funciona com type
type ID = string | number                    // union type

// interface — para descrever a forma de objetos e classes
interface Instrutor {
  id: string
  nome: string
  preco: number
}

// interface pode ser "extendida" (herdada)
interface InstructorComAvaliacao extends Instrutor {
  avaliacao: number
}
```

### Convenção no projeto

No DiretoFácil vamos seguir a convenção mais comum no mercado React:

- **`interface`** para props de componentes e formato de objetos da API
- **`type`** para union types, aliases e utilitários

```ts
// ✅ interface para a forma do objeto
interface Instrutor {
  id: string
  nome: string
  cidade: string
  especialidade: string
  preco: number
  disponivel: boolean
  foto: string
}

// ✅ type para union
type StatusFiltro = "todos" | "disponiveis" | "indisponiveis"
```

---

## 3. Tipando Props de Componentes

### O problema sem tipagem

```jsx
// Sem TypeScript — nenhum aviso se você esquecer uma prop
function CardInstrutor({ nome, preco, disponivel }) {
  return (
    <div>
      <h2>{nome}</h2>
      <p>R$ {preco.toFixed(2)}</p>  {/* quebra se preco for undefined */}
    </div>
  )
}

// Ninguém impediu:
<CardInstrutor nome="João" />  // preco e disponivel esquecidos — sem aviso
```

### A solução: interface de props

```tsx
// Com TypeScript — erro imediato no editor
interface CardInstrutorProps {
  nome: string
  preco: number
  disponivel: boolean
}

function CardInstrutor({ nome, preco, disponivel }: CardInstrutorProps) {
  return (
    <div>
      <h2>{nome}</h2>
      <p>R$ {preco.toFixed(2)}</p>
    </div>
  )
}

// Agora isso sublinha vermelho no editor ANTES de rodar:
<CardInstrutor nome="João" />  // ❌ Erro: preco e disponivel são obrigatórios
```

### Props opcionais com `?`

```tsx
interface CardInstrutorProps {
  nome: string
  preco: number
  disponivel: boolean
  foto?: string    // ← ? significa opcional (pode ser string ou undefined)
  avaliacao?: number
}
```

### Props com funções

```tsx
interface BarraFiltrosProps {
  busca: string
  cidade: string
  instrutores: Instrutor[]
  onBuscaChange: (valor: string) => void      // função que recebe string
  onCidadeChange: (valor: string) => void
  onLimpar?: () => void                        // função sem argumentos, opcional
}
```

---

### 🔴 Live Code 1 — Interface Instrutor e tipando props

**Contexto:** na aula anterior o app quebrou porque um instrutor foi cadastrado sem o campo `preco`. Vamos criar a interface que impede isso.

**O que vamos construir:** a `interface Instrutor`, tipar o array de dados e tipar as props do `CardInstrutor`.

**Momento de impacto:** remover um campo da interface e ver o erro vermelho aparecer no editor antes de rodar.

```ts
// src/types/index.ts — arquivo central de tipos do projeto

// Interface principal do instrutor
export interface Instrutor {
  id: string
  nome: string
  cidade: string
  especialidade: string
  preco: number
  disponivel: boolean
  foto: string
}

// Type para os filtros
export type StatusFiltro = "todos" | "disponiveis" | "indisponiveis"

// Interface das props dos filtros
export interface FiltroState {
  busca: string
  cidade: string
}
```

```tsx
// src/components/CardInstrutor.tsx — com tipagem completa

import { Instrutor } from '../types'

// Opção 1: interface separada que referencia Instrutor
interface CardInstrutorProps {
  instrutor: Instrutor
}

// Opção 2: passar os campos diretamente (mais comum quando
// o componente não usa todos os campos do objeto)
interface CardInstrutorProps {
  nome: string
  cidade: string
  especialidade: string
  preco: number
  disponivel: boolean
  foto: string
}

// Vamos usar a Opção 1 — passa o objeto inteiro, mais simples
function CardInstrutor({ instrutor }: CardInstrutorProps) {
  const { nome, cidade, especialidade, preco, disponivel, foto } = instrutor

  return (
    <div className="card">
      <img
        src={foto}
        alt={`Foto de perfil de ${nome}`}
        className="card-foto"
      />

      <div className="card-info">
        <h2 className="card-nome">{nome}</h2>
        <p className="card-cidade">📍 {cidade}</p>
        <p className="card-especialidade">{especialidade}</p>

        {/* preco.toFixed(2) só funciona porque TypeScript garante que preco é number */}
        <p className="card-preco">
          R$ {preco.toFixed(2)}<span>/hora</span>
        </p>

        {disponivel && (
          <span className="badge badge-disponivel">✅ Disponível hoje</span>
        )}

        <button className="btn-agendar">Ver perfil</button>
      </div>
    </div>
  )
}

export default CardInstrutor
```

```ts
// src/data/instrutores.ts — com tipagem no array

import { Instrutor } from '../types'

// TypeScript agora garante que todos os campos estão presentes e corretos
export const instrutores: Instrutor[] = [
  {
    id: "1",
    nome: "Ana Carvalho",
    cidade: "São Paulo",
    especialidade: "Direção defensiva",
    preco: 120,        // ← number, não "120"
    disponivel: true,  // ← boolean, não "true"
    foto: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    nome: "Carlos Mendes",
    cidade: "Rio de Janeiro",
    especialidade: "Primeira habilitação",
    preco: 90,
    disponivel: false,
    foto: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "3",
    nome: "Fernanda Lima",
    cidade: "Belo Horizonte",
    especialidade: "Reciclagem CNH",
    preco: 100,
    disponivel: true,
    foto: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "4",
    nome: "Roberto Alves",
    cidade: "São Paulo",
    especialidade: "Direção defensiva",
    preco: 150,
    disponivel: true,
    foto: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "5",
    nome: "Mariana Costa",
    cidade: "Curitiba",
    especialidade: "Primeira habilitação",
    preco: 80,
    disponivel: false,
    foto: "https://i.pravatar.cc/150?img=9",
  },
]

// Tente remover o campo `preco` de qualquer objeto acima
// O TypeScript vai sublinhar em vermelho IMEDIATAMENTE, sem precisar rodar
```

```tsx
// src/components/ListaInstrutores.tsx

import { Instrutor } from '../types'
import CardInstrutor from './CardInstrutor'

interface ListaInstrutoresProps {
  instrutores: Instrutor[]  // array de Instrutor — TypeScript sabe o formato
}

function ListaInstrutores({ instrutores }: ListaInstrutoresProps) {
  if (instrutores.length === 0) {
    return <p className="lista-vazia">😕 Nenhum instrutor encontrado.</p>
  }

  return (
    <div className="lista-grid">
      {instrutores.map(instrutor => (
        // TypeScript sabe que instrutor é do tipo Instrutor
        // Se CardInstrutor esperar um campo que não existe, erro imediato
        <CardInstrutor
          key={instrutor.id}
          instrutor={instrutor}
        />
      ))}
    </div>
  )
}

export default ListaInstrutores
```

> **Por que criar um arquivo `src/types/index.ts`?**
> Centralizar os tipos evita importações circulares e facilita a manutenção. Quando a API mudar, você atualiza a interface em um só lugar — e o TypeScript aponta todos os componentes que precisam ser ajustados.

---

## 4. Tipando useState, useRef e useEffect

### useState com tipo explícito

```tsx
// O TypeScript consegue inferir o tipo pelo valor inicial na maioria dos casos
const [busca, setBusca] = useState("")           // inferido: string
const [preco, setPreco] = useState(0)            // inferido: number
const [loading, setLoading] = useState(false)    // inferido: boolean

// Mas quando o valor inicial é vazio/null, você precisa ser explícito
const [instrutores, setInstrutores] = useState<Instrutor[]>([])
//                                             ↑
//                          sem isso, TypeScript infere never[] — um array que nunca
//                          pode ter nada, e setInstrutores reclamaria de qualquer dado

const [selecionado, setSelecionado] = useState<Instrutor | null>(null)
//                                             ↑
//                          pode ser um Instrutor ou null — common pattern
```

### useRef com tipo explícito

```tsx
// Para referenciar elementos do DOM, o tipo é o elemento HTML
const inputRef = useRef<HTMLInputElement>(null)
//                      ↑
//              HTMLInputElement, HTMLSelectElement, HTMLDivElement, etc.

// Para guardar valores (não DOM), o tipo é o do valor
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
const contadorRef = useRef<number>(0)

// Conectando ao elemento — TypeScript sabe que inputRef.current é HTMLInputElement
<input ref={inputRef} type="text" />

// Usando a referência
inputRef.current?.focus()           // ?.  porque current pode ser null inicialmente
inputRef.current?.value             // TypeScript sabe que value é string
```

### useEffect — o tipo vem das dependências

```tsx
// useEffect não precisa de tipo explícito — o TypeScript verifica as dependências
useEffect(() => {
  // TypeScript garante que instrutores aqui é Instrutor[]
  // porque useState<Instrutor[]> foi declarado
  const disponiveis = instrutores.filter(i => i.disponivel)
  console.log(disponiveis)
}, [instrutores]) // TypeScript verifica se instrutores é um valor válido aqui
```

---

### 🔴 Live Code 2 — Tipando Hooks e Eventos

**Contexto:** o App.tsx e a BarraFiltros precisam ter todos os estados tipados corretamente.

**O que vamos construir:** tipar todos os `useState`, o `useRef` e os eventos de formulário.

**Momento de impacto:** ver o autocomplete do editor sugerindo `.nome`, `.cidade`, `.preco` automaticamente ao digitar `instrutor.`.

```tsx
// src/App.tsx — com tipagem completa

import { useState, useEffect, useMemo } from 'react'
import { Instrutor } from './types'
import Header from './components/Header'
import BarraFiltros from './components/BarraFiltros'
import ListaInstrutores from './components/ListaInstrutores'
import { instrutores as dadosMockados } from './data/instrutores'

function App() {
  // Estados tipados explicitamente porque os valores iniciais são arrays vazios
  const [instrutores, setInstrutores] = useState<Instrutor[]>([])
  const [loading, setLoading]         = useState<boolean>(false)
  const [erro, setErro]               = useState<string | null>(null)

  // Estados de filtro — TypeScript infere string pelo valor inicial
  const [busca, setBusca]   = useState("")   // inferido: string ✅
  const [cidade, setCidade] = useState("")   // inferido: string ✅

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setInstrutores(dadosMockados)  // TypeScript verifica: dadosMockados é Instrutor[]?
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const instrutoresFiltrados = useMemo<Instrutor[]>(() => {
    //                                 ↑ tipo de retorno explícito — boa prática
    return instrutores.filter(instrutor => {
      // TypeScript sabe que instrutor.nome é string — .toLowerCase() está disponível
      const buscaOk = busca === "" ||
        instrutor.nome.toLowerCase().includes(busca.toLowerCase())

      const cidadeOk = cidade === "" ||
        instrutor.cidade === cidade

      return buscaOk && cidadeOk
    })
  }, [instrutores, busca, cidade])

  const totalDisponiveis = useMemo<number>(() =>
    instrutores.filter(i => i.disponivel).length
  , [instrutores])

  if (loading) return <div className="loading"><p>Carregando...</p></div>
  if (erro)    return <div className="erro"><p>{erro}</p></div>

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
        <ListaInstrutores instrutores={instrutoresFiltrados} />
      </main>
    </div>
  )
}

export default App
```

```tsx
// src/components/BarraFiltros.tsx — com tipagem de eventos

import { useEffect, useRef } from 'react'
import { Instrutor } from '../types'

interface BarraFiltrosProps {
  busca: string
  cidade: string
  instrutores: Instrutor[]
  onBuscaChange: (valor: string) => void
  onCidadeChange: (valor: string) => void
  onLimpar?: () => void    // opcional
}

function BarraFiltros({
  busca,
  cidade,
  instrutores,
  onBuscaChange,
  onCidadeChange,
  onLimpar,
}: BarraFiltrosProps) {

  // useRef tipado com o elemento HTML correto
  const inputBuscaRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputBuscaRef.current?.focus()
  }, [])

  // Evento onChange — tipado com React.ChangeEvent<HTMLInputElement>
  // e.target.value é string — TypeScript sabe disso pelo tipo do evento
  function handleBuscaChange(e: React.ChangeEvent<HTMLInputElement>) {
    onBuscaChange(e.target.value)
  }

  // Para o select, o elemento é HTMLSelectElement
  function handleCidadeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onCidadeChange(e.target.value)
  }

  const cidades = [...new Set(instrutores.map(i => i.cidade))].sort()

  return (
    <section className="barra-filtros" aria-label="Filtros de busca">

      <div className="campo">
        <label htmlFor="busca-nome">Buscar por nome</label>
        <input
          id="busca-nome"
          type="text"
          placeholder="Ex: João Silva"
          value={busca}
          onChange={handleBuscaChange}
          ref={inputBuscaRef}
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

      {/* Renderização condicional — onLimpar é opcional */}
      {onLimpar && (
        <button onClick={onLimpar} className="btn-limpar">
          Limpar filtros
        </button>
      )}

    </section>
  )
}

export default BarraFiltros
```

### Tipos de eventos mais usados no React

```tsx
// Input de texto
onChange: React.ChangeEvent<HTMLInputElement>

// Select
onChange: React.ChangeEvent<HTMLSelectElement>

// Textarea
onChange: React.ChangeEvent<HTMLTextAreaElement>

// Submit de formulário
onSubmit: React.FormEvent<HTMLFormElement>

// Clique em botão
onClick: React.MouseEvent<HTMLButtonElement>

// Tecla pressionada
onKeyDown: React.KeyboardEvent<HTMLInputElement>

// Atalho útil: dentro do handler você pode usar o tipo inline
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  // e.currentTarget é o <form> — TypeScript sabe todos os campos dele
}
```

---

## 5. Tipando Eventos do DOM

Esta seção aprofunda os eventos com exemplos do mundo real.

### Formulário de contato — exemplo completo

```tsx
// Exemplo de formulário tipado do início ao fim

interface FormularioAgendamento {
  nome: string
  telefone: string
  data: string
  observacoes: string
}

function FormularioContato() {
  const [form, setForm] = useState<FormularioAgendamento>({
    nome: "",
    telefone: "",
    data: "",
    observacoes: "",
  })

  // Função genérica que atualiza qualquer campo do form
  // keyof FormularioAgendamento garante que o campo existe
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,  // [name] é keyof FormularioAgendamento
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // form aqui é FormularioAgendamento — todos os campos garantidos
    console.log("Enviando:", form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Seu nome"
      />
      <input
        name="telefone"
        value={form.telefone}
        onChange={handleChange}
        placeholder="Seu telefone"
      />
      <input
        type="date"
        name="data"
        value={form.data}
        onChange={handleChange}
      />
      <textarea
        name="observacoes"
        value={form.observacoes}
        onChange={handleChange}
      />
      <button type="submit">Agendar</button>
    </form>
  )
}
```

---

## 6. Generics no React

### O que são Generics?

Generics são como parâmetros, mas para **tipos** em vez de valores. Eles permitem criar componentes e funções que funcionam com qualquer tipo, mantendo a segurança da tipagem.

```ts
// Sem generic — só funciona com string
function primeiroItem(array: string[]): string {
  return array[0]
}

// Com generic — funciona com qualquer tipo
function primeiroItem<T>(array: T[]): T {
  return array[0]
}

// TypeScript infere T automaticamente
primeiroItem(["a", "b", "c"])     // T = string → retorna string
primeiroItem([1, 2, 3])           // T = number → retorna number
primeiroItem([{ id: 1 }, { id: 2 }]) // T = { id: number } → retorna { id: number }
```

> **Analogia:** T é como um parâmetro, mas para tipos, não para valores. Assim como uma função pode receber `preco` e fazer algo com ele, um generic recebe `T` (um tipo) e usa esse tipo em toda a função.

### Generic em componentes React

```tsx
// Componente que renderiza qualquer lista tipada
interface ListaProps<T> {
  itens: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
  mensagemVazia?: string
}

// <T> antes do parêntese declara o generic do componente
function Lista<T>({ itens, renderItem, keyExtractor, mensagemVazia }: ListaProps<T>) {
  if (itens.length === 0) {
    return <p>{mensagemVazia ?? "Nenhum item encontrado."}</p>
  }

  return (
    <ul>
      {itens.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
```

---

### 🔴 Live Code 3 — Generics e Utilitários no DiretoFácil

**Contexto:** o componente `ListaInstrutores` serve apenas para instrutores. Vamos criar uma versão genérica que funciona com qualquer tipo de dado.

**O que vamos construir:** componente `<Lista<T> />` genérico, e aplicar `Partial`, `Pick` e `Omit` em situações reais do projeto.

**Analogia ao vivo:** *"T é como um parâmetro, mas para tipos, não para valores."*

```tsx
// src/components/Lista.tsx — componente genérico reutilizável

interface ListaProps<T> {
  itens: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
  mensagemVazia?: string
  titulo?: string
}

function Lista<T>({
  itens,
  renderItem,
  keyExtractor,
  mensagemVazia = "Nenhum item encontrado.",
  titulo,
}: ListaProps<T>) {

  return (
    <section>
      {titulo && <h2 className="secao-titulo">{titulo}</h2>}

      {itens.length === 0 ? (
        <div className="lista-vazia">
          <p>😕 {mensagemVazia}</p>
        </div>
      ) : (
        <div className="lista-grid">
          {itens.map(item => (
            <div key={keyExtractor(item)}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Lista
```

```tsx
// Usando o componente genérico com instrutores
// TypeScript infere T = Instrutor automaticamente

<Lista<Instrutor>
  itens={instrutoresFiltrados}
  keyExtractor={(instrutor) => instrutor.id}
  renderItem={(instrutor) => <CardInstrutor instrutor={instrutor} />}
  mensagemVazia="Nenhum instrutor encontrado para esses filtros."
  titulo="Instrutores disponíveis"
/>

// O mesmo componente com qualquer outro tipo — reuso total
<Lista<string>
  itens={["React", "TypeScript", "CSS"]}
  keyExtractor={(item) => item}
  renderItem={(item) => <span>{item}</span>}
/>
```

---

## 7. Utilitários TypeScript — Partial, Pick e Omit

O TypeScript tem utilitários embutidos que transformam interfaces existentes. Os três mais usados no React são `Partial`, `Pick` e `Omit`.

### Partial\<T\> — todos os campos se tornam opcionais

```ts
interface Instrutor {
  id: string
  nome: string
  cidade: string
  especialidade: string
  preco: number
  disponivel: boolean
  foto: string
}

// Partial faz todos os campos opcionais
type RascunhoInstrutor = Partial<Instrutor>
// Equivalente a:
// {
//   id?: string
//   nome?: string
//   cidade?: string
//   ...todos opcionais
// }

// Uso no DiretoFácil: estado do formulário de cadastro
// enquanto o usuário ainda está preenchendo (campos incompletos são válidos)
const [rascunho, setRascunho] = useState<Partial<Instrutor>>({})

// Atualiza um campo sem precisar preencher todos
setRascunho(prev => ({ ...prev, nome: "João" }))
setRascunho(prev => ({ ...prev, cidade: "São Paulo" }))
```

### Pick\<T, K\> — seleciona apenas alguns campos

```ts
// Pick seleciona só os campos que você quer
type InstructorResumo = Pick<Instrutor, "id" | "nome" | "disponivel">
// Resultado:
// {
//   id: string
//   nome: string
//   disponivel: boolean
// }

// Uso no DiretoFácil: card resumido na listagem
// não precisamos de especialidade, foto etc. para exibir uma prévia
function CardResumido({ instrutor }: { instrutor: InstructorResumo }) {
  return (
    <div>
      <p>{instrutor.nome}</p>
      {instrutor.disponivel && <span>✅</span>}
    </div>
  )
}
```

### Omit\<T, K\> — remove alguns campos

```ts
// Omit remove os campos que você NÃO quer
type InstructorSemId = Omit<Instrutor, "id">
// Resultado: Instrutor com todos os campos EXCETO id
// {
//   nome: string
//   cidade: string
//   especialidade: string
//   preco: number
//   disponivel: boolean
//   foto: string
// }

// Uso no DiretoFácil: formulário de criação de instrutor
// o id é gerado pelo back-end, então o formulário não precisa dele
interface FormularioCadastroInstrutor extends Omit<Instrutor, "id"> {}
// ou simplesmente:
type FormularioCadastroInstrutor = Omit<Instrutor, "id">

function FormularioCadastro() {
  const [form, setForm] = useState<FormularioCadastroInstrutor>({
    nome: "",
    cidade: "",
    especialidade: "",
    preco: 0,
    disponivel: false,
    foto: "",
  })
  // id não está aqui porque o TypeScript não deixaria: foi removido com Omit
}
```

### Comparação dos três utilitários

```ts
interface Instrutor {
  id: string       // obrigatório
  nome: string     // obrigatório
  preco: number    // obrigatório
  foto: string     // obrigatório
}

// Partial → todos viram opcionais
type A = Partial<Instrutor>
// { id?: string, nome?: string, preco?: number, foto?: string }

// Pick → pega só o que você quer
type B = Pick<Instrutor, "nome" | "preco">
// { nome: string, preco: number }

// Omit → remove o que você não quer
type C = Omit<Instrutor, "id" | "foto">
// { nome: string, preco: number }
```

```tsx
// src/types/index.ts — adicionando os tipos derivados

import { Instrutor } from './instrutor'

// Rascunho de cadastro — campos opcionais enquanto o usuário preenche
export type RascunhoInstrutor = Partial<Instrutor>

// Card resumido — só os campos necessários para a listagem rápida
export type InstructorResumo = Pick<Instrutor, "id" | "nome" | "cidade" | "disponivel" | "foto">

// Formulário de criação — sem o id (gerado pelo back-end)
export type FormularioCadastroInstrutor = Omit<Instrutor, "id">

// Filtros — todos opcionais (o usuário pode não preencher nenhum)
export type FiltroInstrutor = Partial<{
  busca: string
  cidade: string
  precoMin: number
  precoMax: number
  apenasDisponiveis: boolean
}>
```

---

## 8. Erros Comuns e Como Resolver

### Erro 1: `Type 'string' is not assignable to type 'number'`

```tsx
// O problema:
const [preco, setPreco] = useState<number>(0)

<input
  type="number"
  value={preco}
  onChange={(e) => setPreco(e.target.value)}  // ❌ e.target.value é string!
/>

// A solução: converter para number
onChange={(e) => setPreco(Number(e.target.value))}
// ou
onChange={(e) => setPreco(parseFloat(e.target.value) || 0)}
```

### Erro 2: `Object is possibly 'undefined'` ou `Object is possibly 'null'`

```tsx
// O problema:
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current.focus()  // ❌ current pode ser null antes de montar

// Solução 1: optional chaining ?.
inputRef.current?.focus()  // ✅ só executa se current não for null

// Solução 2: verificação explícita
if (inputRef.current) {
  inputRef.current.focus()  // ✅ TypeScript sabe que não é null aqui
}

// O mesmo padrão com dados da API
const instrutor = instrutores.find(i => i.id === id)
// instrutor pode ser undefined se o id não existir

instrutor?.nome       // ✅ retorna undefined se instrutor não existir
instrutor!.nome       // ⚠️ força o TypeScript a ignorar — use com cuidado
instrutor?.nome ?? "Nome não encontrado"  // ✅ valor padrão com ??
```

### Erro 3: `Property 'X' does not exist on type 'Y'`

```tsx
// O problema: tentar acessar um campo que não está na interface
interface Instrutor {
  nome: string
  preco: number
}

const i: Instrutor = { nome: "João", preco: 120 }
console.log(i.avaliacao)  // ❌ avaliacao não existe em Instrutor

// Solução 1: adicionar o campo à interface
interface Instrutor {
  nome: string
  preco: number
  avaliacao?: number  // opcional, pode não existir
}

// Solução 2: usar type assertion (quando você tem certeza do tipo)
const i = dados as Instrutor & { avaliacao: number }
// ⚠️ Perigoso — prefira adicionar o campo à interface
```

### Erro 4: `Argument of type 'X' is not assignable to parameter of type 'Y'`

```tsx
// O problema: passando tipo errado para uma prop
interface CardProps {
  preco: number
}

// String "120" em vez do number 120
<Card preco="120" />  // ❌ string não é number

// Solução: passar o tipo correto
<Card preco={120} />   // ✅ number
<Card preco={Number(valorDoInput)} />  // ✅ convertido
```

---

## 9. Código Completo da Aula — DiretoFácil Sprint 3

### Estrutura de pastas ao final da aula

```
src/
├── components/
│   ├── BarraFiltros.tsx       ← migrado para .tsx, props tipadas
│   ├── CardInstrutor.tsx      ← migrado para .tsx, props tipadas
│   ├── Header.tsx             ← migrado para .tsx
│   ├── Lista.tsx              ← novo — componente genérico
│   └── ListaInstrutores.tsx   ← migrado para .tsx
├── data/
│   └── instrutores.ts         ← migrado para .ts, array tipado
├── types/
│   └── index.ts               ← novo — tipos centralizados
├── App.tsx                    ← migrado para .tsx, estados tipados
└── index.css
```

---

### `src/types/index.ts` — tipos centralizados

```ts
// Interface principal — todos os campos do instrutor
export interface Instrutor {
  id: string
  nome: string
  cidade: string
  especialidade: string
  preco: number
  disponivel: boolean
  foto: string
}

// Tipos derivados com utilitários
export type RascunhoInstrutor         = Partial<Instrutor>
export type InstructorResumo          = Pick<Instrutor, "id" | "nome" | "cidade" | "disponivel" | "foto">
export type FormularioCadastroInstrutor = Omit<Instrutor, "id">

// Tipo para os filtros — todos opcionais
export interface FiltroInstrutor {
  busca: string
  cidade: string
}

// Props compartilhadas entre componentes
export interface BarraFiltrosProps {
  busca: string
  cidade: string
  instrutores: Instrutor[]
  onBuscaChange: (valor: string) => void
  onCidadeChange: (valor: string) => void
  onLimpar?: () => void
}

export interface ListaInstrutoresProps {
  instrutores: Instrutor[]
}

export interface HeaderProps {
  totalDisponiveis: number
}

export interface CardInstrutorProps {
  instrutor: Instrutor
}
```

---

### `src/components/Lista.tsx` — componente genérico

```tsx
import React from 'react'

interface ListaProps<T> {
  itens: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
  mensagemVazia?: string
  titulo?: string
}

function Lista<T>({
  itens,
  renderItem,
  keyExtractor,
  mensagemVazia = "Nenhum item encontrado.",
  titulo,
}: ListaProps<T>) {
  return (
    <section>
      {titulo && <h2 className="secao-titulo">{titulo}</h2>}

      {itens.length === 0 ? (
        <div className="lista-vazia">
          <p>😕 {mensagemVazia}</p>
        </div>
      ) : (
        <div className="lista-grid">
          {itens.map(item => (
            <div key={keyExtractor(item)}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Lista
```

---

### `src/App.tsx` — versão final com tipagem completa

```tsx
import { useState, useEffect, useMemo } from 'react'
import { Instrutor } from './types'
import Header from './components/Header'
import BarraFiltros from './components/BarraFiltros'
import Lista from './components/Lista'
import CardInstrutor from './components/CardInstrutor'
import { instrutores as dadosMockados } from './data/instrutores'

function App() {
  const [instrutores, setInstrutores] = useState<Instrutor[]>([])
  const [loading, setLoading]         = useState<boolean>(false)
  const [erro, setErro]               = useState<string | null>(null)
  const [busca, setBusca]             = useState<string>("")
  const [cidade, setCidade]           = useState<string>("")

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setInstrutores(dadosMockados)
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const instrutoresFiltrados = useMemo<Instrutor[]>(() => {
    return instrutores.filter(instrutor => {
      const buscaOk = busca === "" ||
        instrutor.nome.toLowerCase().includes(busca.toLowerCase())
      const cidadeOk = cidade === "" || instrutor.cidade === cidade
      return buscaOk && cidadeOk
    })
  }, [instrutores, busca, cidade])

  const totalDisponiveis = useMemo<number>(() =>
    instrutores.filter(i => i.disponivel).length
  , [instrutores])

  function limparFiltros(): void {
    setBusca("")
    setCidade("")
  }

  if (loading) return <div className="loading"><p>Carregando...</p></div>
  if (erro)    return <div className="erro"><p>{erro}</p></div>

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
          onLimpar={limparFiltros}
        />

        <p className="contador">
          {instrutoresFiltrados.length === 0
            ? "Nenhum instrutor encontrado para esses filtros."
            : `${instrutoresFiltrados.length} instrutor(es) encontrado(s)`}
        </p>

        {/* Usando o componente genérico Lista com Instrutor */}
        <Lista<Instrutor>
          itens={instrutoresFiltrados}
          keyExtractor={(i) => i.id}
          renderItem={(i) => <CardInstrutor instrutor={i} />}
          mensagemVazia="Nenhum instrutor encontrado para esses filtros."
        />
      </main>
    </div>
  )
}

export default App
```

---

## 10. Exercício em Sala

### 🏗️ DiretoFácil — Sprint 3

**Em grupos · 40 minutos**

Partindo do código tipado da aula, sua missão é:

**Requisitos obrigatórios:**

1. Criar a interface `FiltroInstrutor` com `Partial<>` — todos os campos de filtro devem ser opcionais
2. Tipar todos os `useState` de filtro explicitamente com essa interface
3. Criar o componente genérico `<ListaFiltrada<T> />` que recebe o array e uma função `renderItem`
4. Criar o tipo `InstructorResumo` usando `Pick` com apenas `id`, `nome`, `cidade` e `disponivel`

**Bonus:**

5. Criar um **type guard** — uma função que verifica em tempo de execução se um objeto desconhecido é um `Instrutor`:

```ts
// Type guard — garante que obj é Instrutor em tempo de execução
function isInstrutor(obj: unknown): obj is Instrutor {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "nome" in obj &&
    "preco" in obj &&
    typeof (obj as Instrutor).preco === "number"
  )
}

// Uso: quando os dados vêm de uma fonte desconhecida (API sem tipagem)
const dados: unknown = await fetch("/api/instrutores").then(r => r.json())

if (isInstrutor(dados)) {
  // Aqui TypeScript sabe que dados é Instrutor
  console.log(dados.nome)  // ✅ sem erro
}
```

---

## 11. Resumo dos Conceitos

| Conceito | Sintaxe | Quando usar |
|---|---|---|
| `interface` | `interface Nome { campo: tipo }` | Formato de objetos, props de componentes |
| `type` | `type Nome = ...` | Union types, aliases, tipos complexos |
| Props tipadas | `function C({ prop }: Props)` | Todo componente que recebe props |
| `useState<T>` | `useState<Instrutor[]>([])` | Quando o valor inicial não deixa o TypeScript inferir |
| `useRef<T>` | `useRef<HTMLInputElement>(null)` | Sempre que referenciar elemento do DOM |
| Eventos | `React.ChangeEvent<HTMLInputElement>` | Todo handler de formulário |
| `Generic <T>` | `function f<T>(arg: T): T` | Componentes e funções reutilizáveis com qualquer tipo |
| `Partial<T>` | `Partial<Instrutor>` | Formulários com campos opcionais, rascunhos |
| `Pick<T, K>` | `Pick<Instrutor, "nome" \| "preco">` | Subconjunto de campos de uma interface |
| `Omit<T, K>` | `Omit<Instrutor, "id">` | Interface sem alguns campos específicos |

---

### 🔗 O que vem na A4

Na próxima aula o projeto ganha identidade visual. Você vai instalar e configurar o Tailwind CSS, estilizar os cards e a barra de filtros, criar variantes de componente com `clsx` e `cva`, e auditar a plataforma com o axe DevTools para garantir que ela seja acessível para todos os usuários.

---

> **Dúvidas?** Consulte a [documentação oficial do TypeScript](https://www.typescriptlang.org/docs/) e o [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) — uma referência prática mantida pela comunidade com os padrões mais comuns no dia a dia.