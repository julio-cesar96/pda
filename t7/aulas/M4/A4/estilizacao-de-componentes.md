# 🎨 A4: Estilização de Componentes + Acessibilidade
### Material de Apoio — DiretoFácil | Programadores do Amanhã

> Este documento é o seu guia de referência da Aula 4. A teoria de cada conceito vem antes do código — leia a explicação primeiro, depois estude como ela aparece no projeto. Tudo que foi feito ao vivo em sala está aqui, comentado e contextualizado.

---

## Índice

1. [CSS Modules vs CSS-in-JS vs Utility-first](#1-css-modules-vs-css-in-js-vs-utility-first)
2. [Tailwind CSS — fundamentos](#2-tailwind-css--fundamentos)
3. [Configurando o Tailwind no projeto Vite](#3-configurando-o-tailwind-no-projeto-vite)
4. [clsx — combinando classes condicionalmente](#4-clsx--combinando-classes-condicionalmente)
5. [cva — variantes de componente com tipagem](#5-cva--variantes-de-componente-com-tipagem)
6. [Acessibilidade (a11y) — fundamentos](#6-acessibilidade-a11y--fundamentos)
7. [Organização de estilos em projetos reais](#7-organização-de-estilos-em-projetos-reais)
8. [Código Completo da Aula — DiretoFácil Sprint 4](#8-código-completo-da-aula--diretofácil-sprint-4)
9. [Exercício em Sala](#9-exercício-em-sala)
10. [Resumo dos Conceitos](#10-resumo-dos-conceitos)

---

## 1. CSS Modules vs CSS-in-JS vs Utility-first

Antes de escrever uma linha de estilo, a decisão de arquitetura importa. As três abordagens mais comuns no React têm casos de uso diferentes — não existe resposta certa, existe a certa para o contexto.

### CSS Modules

Cada componente tem seu próprio arquivo `.module.css`. As classes são escopadas automaticamente — não vazam para outros componentes.

```css
/* CardInstrutor.module.css */
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
}

.nome {
  font-size: 1.2rem;
  color: #2D0A4E;
}
```

```tsx
// CardInstrutor.tsx
import styles from './CardInstrutor.module.css'

function CardInstrutor() {
  return (
    <div className={styles.card}>
      <h2 className={styles.nome}>João Silva</h2>
    </div>
  )
}
```

**Quando usar:** projetos com CSS existente, times com designers que entregam CSS, quando você quer familiaridade com CSS tradicional.

**Limitação:** troca constante entre o arquivo `.tsx` e o `.module.css`. Variantes (ex: card com destaque) exigem lógica manual.

---

### CSS-in-JS (styled-components, Emotion)

Os estilos são escritos diretamente no JavaScript, junto com o componente. Permitem usar props para estilizar dinamicamente.

```tsx
// Com styled-components
import styled from 'styled-components'

const Card = styled.div<{ destaque?: boolean }>`
  background: white;
  border-radius: 12px;
  border: ${props => props.destaque ? '2px solid #F5C800' : 'none'};
`

function CardInstrutor({ destaque }) {
  return <Card destaque={destaque}>...</Card>
}
```

**Quando usar:** design systems com temas dinâmicos, quando os estilos dependem muito de props, quando você quer co-localizar tudo.

**Limitação:** overhead de runtime, curva de aprendizado, gera CSS no JavaScript (pode afetar performance em apps grandes).

---

### Utility-first (Tailwind CSS)

Classes utilitárias aplicadas diretamente no JSX. Cada classe faz uma coisa específica — sem inventar nomes, sem arquivos `.css`.

```tsx
// Com Tailwind — zero arquivo CSS
function CardInstrutor() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold text-purple-900">João Silva</h2>
    </div>
  )
}
```

**Quando usar:** SPAs e projetos novos, times que querem consistência sem sistema de design próprio, quando a velocidade de entrega importa.

**Limitação:** JSX com muitas classes pode ficar verboso — `clsx` e `cva` resolvem isso.

---

### Por que Tailwind no DiretoFácil?

No contexto deste projeto:
- Consistência visual imediata — o sistema de espaçamento, cores e tipografia já vem pronto
- Sem inventar tokens do zero (o `tailwind.config` permite customizar sem sair do ecossistema)
- Integra perfeitamente com `cva` para variantes tipadas
- Responsividade com prefixos `sm:`, `md:`, `lg:` sem escrever media queries

---

## 2. Tailwind CSS — fundamentos

### Como funciona

O Tailwind gera CSS a partir das classes que você usa no código. Nenhuma classe não utilizada vai para o bundle final — o CSS de produção é pequeno.

```
Você usa className="text-purple-900 bg-yellow-400"
         ↓
Tailwind escaneia o código
         ↓
Gera só o CSS das classes usadas
         ↓
Bundle de produção: ~5-10kb de CSS
```

### Classes mais usadas

```tsx
// Layout
"flex"              // display: flex
"flex-col"          // flex-direction: column
"items-center"      // align-items: center
"justify-between"   // justify-content: space-between
"gap-4"             // gap: 1rem  (4 × 0.25rem)
"grid"              // display: grid
"grid-cols-3"       // grid-template-columns: repeat(3, minmax(0, 1fr))

// Espaçamento (escala: 1 = 0.25rem, 4 = 1rem, 8 = 2rem)
"p-4"               // padding: 1rem
"px-6"              // padding-left + right: 1.5rem
"py-2"              // padding-top + bottom: 0.5rem
"mt-4"              // margin-top: 1rem
"mb-8"              // margin-bottom: 2rem

// Tipografia
"text-sm"           // font-size: 0.875rem
"text-lg"           // font-size: 1.125rem
"text-2xl"          // font-size: 1.5rem
"font-bold"         // font-weight: 700
"font-medium"       // font-weight: 500
"text-center"       // text-align: center
"leading-relaxed"   // line-height: 1.625

// Cores (formato: propriedade-cor-intensidade)
"text-purple-900"   // color: #2D0A4E (aprox.)
"bg-yellow-400"     // background: #F5C800 (aprox.)
"bg-white"          // background: white
"text-gray-600"     // color: cinza médio

// Bordas e sombras
"rounded-xl"        // border-radius: 0.75rem
"rounded-full"      // border-radius: 9999px (círculo)
"border"            // border-width: 1px
"border-gray-200"   // border-color: cinza claro
"shadow-md"         // box-shadow médio
"shadow-lg"         // box-shadow grande

// Interatividade
"hover:shadow-lg"   // sombra maior no hover
"hover:bg-purple-800" // cor diferente no hover
"transition-all"    // transição suave em todas as propriedades
"duration-200"      // 200ms de duração
"cursor-pointer"    // cursor de ponteiro

// Responsividade (mobile-first)
"grid-cols-1"           // 1 coluna em mobile
"md:grid-cols-2"        // 2 colunas a partir de 768px
"lg:grid-cols-3"        // 3 colunas a partir de 1024px
"hidden md:block"       // escondido em mobile, visível no desktop
```

### Cores customizadas no tailwind.config

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cores da marca DiretoFácil
        brand: {
          purple: "#2D0A4E",
          yellow: "#F5C800",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}
```

```tsx
// Usando as cores customizadas
<div className="bg-brand-purple text-brand-yellow">
  DiretoFácil
</div>
```

---

## 3. Configurando o Tailwind no projeto Vite

### Instalação

```bash
# Instalar Tailwind e suas dependências
npm install -D tailwindcss postcss autoprefixer

# Gerar os arquivos de configuração
npx tailwindcss init -p
```

Isso cria dois arquivos: `tailwind.config.js` e `postcss.config.js`.

### Configurar o `tailwind.config.js`

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // Diz ao Tailwind onde procurar classes — MUITO IMPORTANTE
  // Se esquecer, nenhuma classe vai funcionar em produção
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#2D0A4E",
          yellow: "#F5C800",
        },
      },
    },
  },
  plugins: [],
}
```

### Adicionar as diretivas no CSS global

```css
/* src/index.css — substitua o conteúdo por estas três linhas */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Verificar que funcionou

```tsx
// src/App.tsx — teste rápido
function App() {
  return (
    <h1 className="text-3xl font-bold text-brand-purple">
      DiretoFácil
    </h1>
  )
}
```

Se o texto aparecer roxo e grande, o Tailwind está configurado.

---

### 🔴 Live Code 1 — Tailwind no DiretoFácil

**Contexto:** a plataforma funciona mas usa CSS puro sem consistência visual. Vamos instalar o Tailwind e estilizar o `CardInstrutor` e a `BarraFiltros` ao vivo.

**Momento de impacto:** mostrar o antes e depois lado a lado — a mudança visual é imediata e motivadora.

```tsx
// src/components/CardInstrutor.tsx — com Tailwind

import { Instrutor } from '../types'

interface CardInstrutorProps {
  instrutor: Instrutor
}

function CardInstrutor({ instrutor }: CardInstrutorProps) {
  const { nome, cidade, especialidade, preco, disponivel, foto } = instrutor

  return (
    // Card container
    <div className="
      bg-white
      rounded-2xl
      p-6
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-200
      flex
      flex-col
      gap-4
      border
      border-gray-100
    ">

      {/* Foto */}
      <img
        src={foto}
        alt={`Foto de perfil de ${nome}`}
        className="
          w-20 h-20
          rounded-full
          object-cover
          border-4
          border-brand-yellow
          self-center
        "
      />

      {/* Informações */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-brand-purple">
          {nome}
        </h2>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          📍 {cidade}
        </p>
        <p className="text-sm text-gray-600 italic">
          {especialidade}
        </p>
      </div>

      {/* Preço */}
      <p className="text-2xl font-bold text-brand-purple">
        R$ {preco.toFixed(2)}
        <span className="text-sm font-normal text-gray-400">/hora</span>
      </p>

      {/* Badge de disponibilidade */}
      {disponivel && (
        <span className="
          self-start
          bg-green-100
          text-green-700
          text-xs
          font-semibold
          px-3
          py-1
          rounded-full
        ">
          ✅ Disponível hoje
        </span>
      )}

      {/* Botão */}
      <button className="
        mt-auto
        bg-brand-purple
        text-white
        font-semibold
        py-2
        px-4
        rounded-xl
        hover:bg-purple-800
        transition-colors
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-brand-yellow
        focus:ring-offset-2
      ">
        Ver perfil
      </button>

    </div>
  )
}

export default CardInstrutor
```

```tsx
// src/components/BarraFiltros.tsx — com Tailwind

import { useEffect, useRef } from 'react'
import { Instrutor } from '../types'

interface BarraFiltrosProps {
  busca: string
  cidade: string
  instrutores: Instrutor[]
  onBuscaChange: (valor: string) => void
  onCidadeChange: (valor: string) => void
  onLimpar?: () => void
}

function BarraFiltros({
  busca,
  cidade,
  instrutores,
  onBuscaChange,
  onCidadeChange,
  onLimpar,
}: BarraFiltrosProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const cidades = [...new Set(instrutores.map(i => i.cidade))].sort()

  // Classe reutilizável para os inputs — evita repetição
  const inputClasses = `
    w-full
    border-2
    border-gray-200
    rounded-xl
    px-4
    py-2
    text-sm
    text-gray-700
    outline-none
    focus:border-brand-purple
    transition-colors
    duration-200
  `

  return (
    <section
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
      aria-label="Filtros de busca"
    >
      <div className="flex flex-wrap gap-4">

        {/* Campo de busca */}
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <label
            htmlFor="busca-nome"
            className="text-xs font-semibold text-brand-purple uppercase tracking-wide"
          >
            Buscar por nome
          </label>
          <input
            id="busca-nome"
            type="text"
            placeholder="Ex: João Silva"
            value={busca}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onBuscaChange(e.target.value)
            }
            ref={inputRef}
            className={inputClasses}
            aria-label="Buscar instrutor por nome"
          />
        </div>

        {/* Filtro de cidade */}
        <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
          <label
            htmlFor="filtro-cidade"
            className="text-xs font-semibold text-brand-purple uppercase tracking-wide"
          >
            Cidade
          </label>
          <select
            id="filtro-cidade"
            value={cidade}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onCidadeChange(e.target.value)
            }
            className={inputClasses}
            aria-label="Filtrar por cidade"
          >
            <option value="">Todas as cidades</option>
            {cidades.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Botão limpar */}
        {onLimpar && (
          <div className="flex items-end">
            <button
              onClick={onLimpar}
              className="
                px-4 py-2
                text-sm
                font-medium
                text-gray-500
                border-2
                border-gray-200
                rounded-xl
                hover:border-brand-purple
                hover:text-brand-purple
                transition-all
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-brand-purple
                focus:ring-offset-2
              "
              aria-label="Limpar todos os filtros"
            >
              Limpar filtros
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default BarraFiltros
```

```tsx
// src/App.tsx — layout geral com Tailwind

function App() {
  // ... estados e lógica iguais à aula anterior

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-brand-purple text-white py-6 px-8 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚗</span>
            <h1 className="text-2xl font-bold text-brand-yellow">
              DiretoFácil
            </h1>
          </div>
          <p className="text-sm text-gray-300">
            {totalDisponiveis} instrutores disponíveis
          </p>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-6xl mx-auto px-8 py-8">

        <BarraFiltros
          busca={busca}
          cidade={cidade}
          instrutores={instrutores}
          onBuscaChange={setBusca}
          onCidadeChange={setCidade}
          onLimpar={limparFiltros}
        />

        <p className="text-sm text-gray-500 mb-4">
          {instrutoresFiltrados.length} instrutor(es) encontrado(s)
        </p>

        {/* Grid responsivo */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">
          {instrutoresFiltrados.map(instrutor => (
            <CardInstrutor key={instrutor.id} instrutor={instrutor} />
          ))}
        </div>

      </main>
    </div>
  )
}
```

> **Dica de produtividade:** instale a extensão **Tailwind CSS IntelliSense** no VS Code. Ela mostra autocomplete das classes, o CSS gerado ao passar o mouse e avisa sobre classes inválidas.

---

## 4. clsx — combinando classes condicionalmente

### O problema sem clsx

Quando as classes dependem de condições, o código fica verboso e difícil de ler:

```tsx
// ❌ Sem clsx — string concatenation manual
<div
  className={
    "card " +
    (disponivel ? "card-disponivel " : "") +
    (destaque ? "card-destaque " : "") +
    (tamanho === "grande" ? "card-grande" : "card-pequeno")
  }
>
```

### A solução: clsx

`clsx` aceita qualquer combinação de strings, objetos e arrays e monta a string de classes final, ignorando valores falsy (`false`, `null`, `undefined`).

```bash
npm install clsx
```

```tsx
import { clsx } from 'clsx'

// Strings simples
clsx("foo", "bar")
// → "foo bar"

// Objeto condicional — a classe entra se o valor for true
clsx({
  "card-disponivel": disponivel,
  "card-destaque": destaque,
})
// → "card-disponivel" (se disponivel=true, destaque=false)

// Mistura de tudo
clsx(
  "card",
  { "card-disponivel": disponivel },
  destaque && "card-destaque",     // && retorna false se destaque for false — ignorado
  tamanho === "grande" ? "p-8" : "p-4"
)
```

### Uso com Tailwind

```tsx
// Componente com variação visual baseada em props
function CardInstrutor({ instrutor, destaque = false }) {
  return (
    <div
      className={clsx(
        // Classes sempre presentes
        "bg-white rounded-2xl p-6 shadow-md transition-all duration-200",
        // Classes condicionais
        {
          "border-2 border-brand-yellow shadow-yellow-100": destaque,
          "border border-gray-100": !destaque,
        },
        // Hover condicional
        destaque ? "hover:shadow-yellow-200" : "hover:shadow-lg"
      )}
    >
      {/* ... */}
    </div>
  )
}
```

---

## 5. cva — variantes de componente com tipagem

### O que é cva?

`cva` (class-variance-authority) é uma biblioteca que organiza variantes de componentes de forma estruturada, com integração automática com TypeScript.

```bash
npm install class-variance-authority
```

### Por que usar cva em vez de clsx puro?

Com `clsx`, as variantes são condicionais espalhadas pelo código. Com `cva`, elas ficam declaradas de forma organizada e o TypeScript garante que você só pode passar valores válidos.

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

// Declaração das variantes
const cardVariants = cva(
  // Classes base — presentes em todas as variantes
  "rounded-2xl p-6 transition-all duration-200",
  {
    variants: {
      // Cada chave é uma dimensão de variação
      variant: {
        padrao:     "bg-white border border-gray-100 shadow-md hover:shadow-lg",
        disponivel: "bg-white border-2 border-green-400 shadow-green-50 hover:shadow-green-100",
        destaque:   "bg-white border-2 border-brand-yellow shadow-yellow-50 hover:shadow-yellow-100",
      },
      tamanho: {
        normal:  "p-6",
        compacto: "p-4",
      },
    },
    // Valores padrão se a prop não for passada
    defaultVariants: {
      variant: "padrao",
      tamanho: "normal",
    },
  }
)

// Tipo das props gerado automaticamente pelo cva
type CardVariants = VariantProps<typeof cardVariants>
// → { variant?: "padrao" | "disponivel" | "destaque", tamanho?: "normal" | "compacto" }
```

### Usando cva no componente

```tsx
interface CardInstrutorProps extends VariantProps<typeof cardVariants> {
  instrutor: Instrutor
}

function CardInstrutor({ instrutor, variant, tamanho }: CardInstrutorProps) {
  return (
    <div className={cardVariants({ variant, tamanho })}>
      {/* ... */}
    </div>
  )
}

// Uso — TypeScript só aceita valores declarados nas variantes
<CardInstrutor instrutor={i} variant="disponivel" />   // ✅
<CardInstrutor instrutor={i} variant="urgente" />      // ❌ erro de tipo
```

---

### 🔴 Live Code 2 — clsx, cva e Acessibilidade no DiretoFácil

**Contexto:** o `CardInstrutor` precisa de variantes visuais (padrão, disponível, destaque). E a plataforma tem problemas de acessibilidade que precisam ser corrigidos ao vivo.

**O que vamos construir:**
- Variantes do card com `cva`
- Correções de acessibilidade: `aria-label`, `<label>`, `alt`, contraste e foco

**Momento de impacto:** demonstrar com o leitor de tela do sistema operacional antes e depois das correções.

```tsx
// src/components/CardInstrutor.tsx — com cva e acessibilidade

import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { Instrutor } from '../types'

// ── Variantes do card ─────────────────────────────────────────────────
const cardVariants = cva(
  // Classes base
  [
    "bg-white rounded-2xl p-6",
    "flex flex-col gap-4",
    "transition-all duration-200",
    "focus-within:ring-2 focus-within:ring-brand-yellow focus-within:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        padrao:     "border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1",
        disponivel: "border-2 border-green-400 shadow-md shadow-green-50 hover:shadow-green-200 hover:-translate-y-1",
        destaque:   "border-2 border-brand-yellow shadow-md shadow-yellow-50 hover:shadow-yellow-200 hover:-translate-y-1",
      },
    },
    defaultVariants: {
      variant: "padrao",
    },
  }
)

// ── Tipagem das props ─────────────────────────────────────────────────
interface CardInstrutorProps extends VariantProps<typeof cardVariants> {
  instrutor: Instrutor
  onAgendar?: (id: string) => void
}

function CardInstrutor({ instrutor, variant, onAgendar }: CardInstrutorProps) {
  const { id, nome, cidade, especialidade, preco, disponivel, foto } = instrutor

  // Define a variante automaticamente com base na disponibilidade
  // mas permite override pela prop variant
  const variantFinal = variant ?? (disponivel ? "disponivel" : "padrao")

  return (
    // article é mais semântico que div para um item de lista
    <article className={cardVariants({ variant: variantFinal })}>

      {/* ── Foto ───────────────────────────────────────────────── */}
      <img
        src={foto}
        // ✅ alt descritivo — leitor de tela fala "Foto de perfil de João Silva"
        // ❌ alt="" ou alt="foto" não diz nada
        alt={`Foto de perfil de ${nome}`}
        className="w-20 h-20 rounded-full object-cover border-4 border-brand-yellow self-center"
      />

      {/* ── Informações ────────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        {/* h3 dentro de article — hierarquia semântica correta */}
        <h3 className="text-lg font-bold text-brand-purple">{nome}</h3>
        <p className="text-sm text-gray-500">📍 {cidade}</p>
        <p className="text-sm text-gray-600 italic">{especialidade}</p>
      </div>

      {/* ── Preço ──────────────────────────────────────────────── */}
      <p className="text-2xl font-bold text-brand-purple">
        R$ {preco.toFixed(2)}
        <span className="text-sm font-normal text-gray-400">/hora</span>
      </p>

      {/* ── Badge de disponibilidade ───────────────────────────── */}
      {disponivel && (
        <span
          className="self-start bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full"
          // ✅ role="status" avisa leitores de tela que é uma informação de estado
          role="status"
          aria-label="Instrutor disponível hoje"
        >
          ✅ Disponível hoje
        </span>
      )}

      {/* ── Botão ──────────────────────────────────────────────── */}
      <button
        className="
          mt-auto
          bg-brand-purple text-white
          font-semibold py-2 px-4
          rounded-xl
          hover:bg-purple-800
          transition-colors duration-200
          focus:outline-none
          focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
        "
        // ✅ aria-label contextual — leitor de tela fala
        // "Ver perfil de João Silva" em vez de apenas "Ver perfil"
        aria-label={`Ver perfil de ${nome}`}
        onClick={() => onAgendar?.(id)}
      >
        Ver perfil
      </button>

    </article>
  )
}

export default CardInstrutor
```

```tsx
// src/components/BarraFiltros.tsx — com acessibilidade corrigida

import { useEffect, useRef } from 'react'
import { Instrutor } from '../types'

interface BarraFiltrosProps {
  busca: string
  cidade: string
  instrutores: Instrutor[]
  onBuscaChange: (valor: string) => void
  onCidadeChange: (valor: string) => void
  onLimpar?: () => void
}

function BarraFiltros({
  busca,
  cidade,
  instrutores,
  onBuscaChange,
  onCidadeChange,
  onLimpar,
}: BarraFiltrosProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const cidades = [...new Set(instrutores.map(i => i.cidade))].sort()

  const labelClasses = "text-xs font-semibold text-brand-purple uppercase tracking-wide"
  const inputClasses = `
    w-full border-2 border-gray-200 rounded-xl px-4 py-2
    text-sm text-gray-700 outline-none bg-white
    focus:border-brand-purple transition-colors duration-200
  `

  return (
    // ✅ <section> + aria-label = região identificável para leitores de tela
    // O usuário pode navegar direto para "Filtros de busca" com atalhos de teclado
    <section
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
      aria-label="Filtros de busca"
    >
      <div className="flex flex-wrap gap-4">

        {/* ── Busca por nome ───────────────────────────────────── */}
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          {/*
            ✅ <label htmlFor="busca-nome"> conectado ao <input id="busca-nome">
            ❌ Sem label: leitor de tela fala apenas "campo de texto" sem contexto
          */}
          <label htmlFor="busca-nome" className={labelClasses}>
            Buscar por nome
          </label>
          <input
            id="busca-nome"
            type="text"
            placeholder="Ex: João Silva"
            value={busca}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onBuscaChange(e.target.value)
            }
            ref={inputRef}
            className={inputClasses}
            // ✅ aria-describedby pode conectar a uma dica de preenchimento
            aria-label="Buscar instrutor por nome"
          />
        </div>

        {/* ── Filtro de cidade ─────────────────────────────────── */}
        <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
          <label htmlFor="filtro-cidade" className={labelClasses}>
            Cidade
          </label>
          <select
            id="filtro-cidade"
            value={cidade}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onCidadeChange(e.target.value)
            }
            className={inputClasses}
          >
            <option value="">Todas as cidades</option>
            {cidades.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* ── Limpar filtros ───────────────────────────────────── */}
        {onLimpar && (
          <div className="flex items-end">
            <button
              onClick={onLimpar}
              className="
                px-4 py-2 text-sm font-medium
                text-gray-500 border-2 border-gray-200 rounded-xl
                hover:border-brand-purple hover:text-brand-purple
                transition-all duration-200
                focus:outline-none focus:ring-2
                focus:ring-brand-purple focus:ring-offset-2
              "
              // ✅ aria-label descritivo
              // ❌ sem aria-label: leitor de tela fala só "botão"
              aria-label="Limpar todos os filtros de busca"
            >
              Limpar filtros
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default BarraFiltros
```

---

## 6. Acessibilidade (a11y) — fundamentos

### Por que acessibilidade importa

1 em cada 4 brasileiros tem alguma deficiência (IBGE, 2022). Acessibilidade não é opcional — é parte da qualidade do produto e, em muitos contextos, é lei.

As principais deficiências que afetam o uso de interfaces web:
- **Visual:** pessoas que usam leitores de tela (NVDA, VoiceOver, JAWS)
- **Motora:** pessoas que navegam só com teclado, sem mouse
- **Cognitiva:** pessoas que precisam de interfaces claras e previsíveis
- **Auditiva:** pessoas que precisam de alternativas a conteúdo em áudio

### Os 4 princípios do WCAG

O **WCAG 2.1** (Web Content Accessibility Guidelines) organiza a acessibilidade em 4 princípios:

| Princípio | O que significa |
|---|---|
| **Perceptível** | O conteúdo pode ser percebido por todos os sentidos disponíveis |
| **Operável** | A interface pode ser usada com teclado, mouse ou assistivas |
| **Compreensível** | O conteúdo e a interface são claros e previsíveis |
| **Robusto** | O código funciona em diferentes tecnologias assistivas |

### Problemas mais comuns no DiretoFácil (e como corrigir)

#### Problema 1: Imagens sem `alt`

```tsx
// ❌ Sem alt — leitor de tela fala o nome do arquivo
<img src="foto.jpg" />
<img src="foto.jpg" alt="" />  // ❌ alt vazio — leitor ignora a imagem

// ✅ Alt descritivo
<img src={foto} alt={`Foto de perfil de ${nome}`} />

// ✅ Alt vazio é correto para imagens DECORATIVAS (ícones, divisores)
<img src="divisor.png" alt="" role="presentation" />
```

#### Problema 2: Formulários sem `<label>`

```tsx
// ❌ Sem label — leitor de tela fala "campo de texto" sem contexto
<input type="text" placeholder="Buscar..." />

// ❌ Label não associada — não funciona para leitores de tela
<label>Buscar por nome</label>
<input type="text" />

// ✅ Correto — htmlFor conecta a label ao input pelo id
<label htmlFor="busca-nome">Buscar por nome</label>
<input id="busca-nome" type="text" />

// ✅ Alternativa: label envolvendo o input
<label>
  Buscar por nome
  <input type="text" />
</label>
```

#### Problema 3: Botões sem contexto

```tsx
// ❌ Sem contexto — leitor de tela fala apenas "botão"
<button>Ver</button>
<button>✕</button>
<button>→</button>

// ✅ Com texto descritivo
<button>Ver perfil de João Silva</button>

// ✅ Com aria-label quando o texto visível é curto
<button aria-label="Ver perfil de João Silva">Ver</button>
<button aria-label="Fechar modal">✕</button>
```

#### Problema 4: Contraste insuficiente

O WCAG exige contraste mínimo de **4.5:1** para texto normal e **3:1** para texto grande.

```tsx
// ❌ Contraste baixo — cinza claro em fundo branco
<p className="text-gray-300">Disponível hoje</p>

// ✅ Contraste adequado
<p className="text-gray-700">Disponível hoje</p>

// Ferramentas para verificar:
// - axe DevTools (extensão Chrome/Firefox)
// - WebAIM Contrast Checker (webaim.org/resources/contrastchecker)
// - Tailwind tem tabela de contraste na documentação
```

#### Problema 5: Foco invisível

```tsx
// ❌ Removendo o outline sem alternativa — usuários de teclado
// não conseguem ver onde estão
<button className="focus:outline-none">Agendar</button>

// ✅ Substituir o outline padrão por um visível e bonito
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-brand-yellow
  focus:ring-offset-2
">
  Agendar
</button>
```

#### Problema 6: HTML não semântico

```tsx
// ❌ Divs para tudo — sem estrutura para leitores de tela
<div className="header">
  <div className="nav">
    <div onClick={irParaHome}>Home</div>
  </div>
</div>

// ✅ HTML semântico — leitores de tela entendem a estrutura
<header>
  <nav>
    <a href="/">Home</a>  {/* ou <Link> com React Router */}
  </nav>
</header>

// Elementos semânticos importantes no React:
// <header>   — cabeçalho da página ou seção
// <main>     — conteúdo principal (só um por página)
// <nav>      — navegação
// <section>  — seção com assunto próprio (precisa de título)
// <article>  — conteúdo independente (card, post, item de lista)
// <aside>    — conteúdo relacionado mas secundário
// <footer>   — rodapé
// <h1>-<h6>  — hierarquia de títulos (não pule níveis)
```

### Atributos ARIA mais usados

```tsx
// aria-label — rótulo acessível quando não há texto visível suficiente
<button aria-label="Fechar modal de agendamento">✕</button>

// aria-labelledby — aponta para o id de outro elemento como rótulo
<section aria-labelledby="titulo-instrutores">
  <h2 id="titulo-instrutores">Instrutores disponíveis</h2>
</section>

// aria-describedby — informação adicional sobre um elemento
<input
  id="busca"
  aria-describedby="busca-dica"
/>
<p id="busca-dica" className="text-xs text-gray-400">
  Digite o nome completo ou parcial do instrutor
</p>

// aria-live — anuncia mudanças dinâmicas para leitores de tela
<p aria-live="polite">
  {instrutoresFiltrados.length} instrutor(es) encontrado(s)
</p>
// "polite" = anuncia quando o usuário para de interagir
// "assertive" = anuncia imediatamente (para erros críticos)

// aria-hidden — esconde elemento de leitores de tela
<span aria-hidden="true">📍</span>  {/* ícone decorativo */}
<span>São Paulo</span>              {/* texto real que o leitor lê */}

// role — define o papel semântico de um elemento
<div role="status">Carregando...</div>
<div role="alert">Erro ao carregar dados</div>
<span role="img" aria-label="Disponível">✅</span>
```

### Navegação por teclado — o que precisa funcionar

| Tecla | Comportamento esperado |
|---|---|
| `Tab` | Avança para o próximo elemento focável |
| `Shift+Tab` | Volta para o elemento anterior |
| `Enter` | Ativa botões e links |
| `Espaço` | Marca/desmarca checkboxes, ativa botões |
| `↑↓` | Navega entre opções de select |
| `Esc` | Fecha modais e dropdowns |

```tsx
// Garantir que elementos customizados funcionam com teclado
// Divs clicáveis NÃO são focáveis por padrão

// ❌ Div clicável — não funciona com Tab ou Enter
<div onClick={handleClick} className="cursor-pointer">
  Ver perfil
</div>

// ✅ Botão — focável e ativável com Enter por padrão
<button onClick={handleClick}>
  Ver perfil
</button>

// Se precisar de div interativa (raro), adicione tabIndex e onKeyDown
<div
  onClick={handleClick}
  onKeyDown={(e) => e.key === "Enter" && handleClick()}
  tabIndex={0}
  role="button"
  aria-label="Ver perfil de João Silva"
>
  Ver perfil
</div>
```

---

## 7. Organização de estilos em projetos reais

### Estrutura de pastas recomendada

```
src/
├── components/
│   ├── ui/                    ← componentes base, sem lógica de negócio
│   │   ├── Badge.tsx          ← só recebe variant e children
│   │   ├── Button.tsx         ← só recebe variant, size e onClick
│   │   ├── Input.tsx          ← só recebe value, onChange e label
│   │   └── Card.tsx           ← wrapper de card genérico
│   │
│   └── features/              ← componentes de domínio
│       ├── CardInstrutor.tsx  ← usa Button, Badge, Card do /ui
│       ├── BarraFiltros.tsx   ← usa Input, Button do /ui
│       └── ListaInstrutores.tsx
```

### A regra fundamental

**Componentes em `/ui`** não sabem nada sobre o negócio — eles só recebem props e renderizam. Você pode usar um `Button` do `/ui` em qualquer página, com qualquer dado.

**Componentes em `/features`** conhecem o domínio. O `CardInstrutor` sabe o que é um `Instrutor`, usa a interface TypeScript e chama funções de negócio.

```tsx
// ✅ Button em /ui — agnóstico ao negócio
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

function Button({ variant = "primary", size = "md", children, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  )
}

// ✅ CardInstrutor em /features — usa Button do /ui
import Button from '../ui/Button'

function CardInstrutor({ instrutor }: CardInstrutorProps) {
  return (
    <article>
      {/* ... */}
      <Button
        variant="primary"
        aria-label={`Agendar com ${instrutor.nome}`}
        onClick={() => navigate(`/agendar/${instrutor.id}`)}
      >
        Agendar aula
      </Button>
    </article>
  )
}
```

---

## 8. Código Completo da Aula — DiretoFácil Sprint 4

### Estrutura de pastas ao final da aula

```
src/
├── components/
│   ├── ui/
│   │   └── Badge.tsx          ← novo — com 4 variantes via cva
│   └── features/
│       ├── CardInstrutor.tsx  ← com Tailwind + cva + a11y
│       ├── BarraFiltros.tsx   ← com Tailwind + a11y
│       └── ListaInstrutores.tsx
├── data/
│   └── instrutores.ts
├── types/
│   └── index.ts
├── App.tsx
└── index.css                  ← só as diretivas do Tailwind
```

---

### `src/components/ui/Badge.tsx`

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

// ── Variantes do Badge ────────────────────────────────────────────────
const badgeVariants = cva(
  // Classes base — presentes em todas as variantes
  "inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full",
  {
    variants: {
      variant: {
        disponivel: "bg-green-100 text-green-700",
        ocupado:    "bg-gray-100 text-gray-600",
        destaque:   "bg-yellow-100 text-yellow-700",
        novo:       "bg-purple-100 text-purple-700",
      },
    },
    defaultVariants: {
      variant: "disponivel",
    },
  }
)

// ── Props ─────────────────────────────────────────────────────────────
interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  className?: string
}

// ── Componente ────────────────────────────────────────────────────────
function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={badgeVariants({ variant, className })}
      role="status"
    >
      {children}
    </span>
  )
}

export default Badge

// ── Uso ───────────────────────────────────────────────────────────────
// <Badge variant="disponivel">✅ Disponível hoje</Badge>
// <Badge variant="ocupado">🔴 Indisponível</Badge>
// <Badge variant="destaque">⭐ Em destaque</Badge>
// <Badge variant="novo">🆕 Novo</Badge>
```

---

### `src/components/features/CardInstrutor.tsx` — versão final

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import Badge from '../ui/Badge'
import { Instrutor } from '../../types'

const cardVariants = cva(
  [
    "bg-white rounded-2xl p-6",
    "flex flex-col gap-4",
    "transition-all duration-200",
    "focus-within:ring-2 focus-within:ring-brand-yellow focus-within:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        padrao:     "border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1",
        disponivel: "border-2 border-green-400 shadow-md shadow-green-50 hover:shadow-green-200 hover:-translate-y-1",
        destaque:   "border-2 border-brand-yellow shadow-md shadow-yellow-50 hover:shadow-yellow-200 hover:-translate-y-1",
      },
    },
    defaultVariants: { variant: "padrao" },
  }
)

interface CardInstrutorProps extends VariantProps<typeof cardVariants> {
  instrutor: Instrutor
  onVerPerfil?: (id: string) => void
}

function CardInstrutor({ instrutor, variant, onVerPerfil }: CardInstrutorProps) {
  const { id, nome, cidade, especialidade, preco, disponivel, foto } = instrutor
  const variantFinal = variant ?? (disponivel ? "disponivel" : "padrao")

  return (
    <article className={cardVariants({ variant: variantFinal })}>

      <img
        src={foto}
        alt={`Foto de perfil de ${nome}`}
        className="w-20 h-20 rounded-full object-cover border-4 border-brand-yellow self-center"
      />

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-brand-purple">{nome}</h3>
        <p className="text-sm text-gray-500">
          <span aria-hidden="true">📍 </span>
          {cidade}
        </p>
        <p className="text-sm text-gray-600 italic">{especialidade}</p>
      </div>

      <p className="text-2xl font-bold text-brand-purple">
        R$ {preco.toFixed(2)}
        <span className="text-sm font-normal text-gray-400">/hora</span>
      </p>

      {/* Badge usando o componente do /ui */}
      {disponivel
        ? <Badge variant="disponivel">✅ Disponível hoje</Badge>
        : <Badge variant="ocupado">🔴 Indisponível</Badge>
      }

      <button
        className="
          mt-auto bg-brand-purple text-white
          font-semibold py-2 px-4 rounded-xl
          hover:bg-purple-800 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
        "
        aria-label={`Ver perfil de ${nome}`}
        onClick={() => onVerPerfil?.(id)}
      >
        Ver perfil
      </button>

    </article>
  )
}

export default CardInstrutor
```

---

### `src/index.css` — apenas as diretivas Tailwind

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### `tailwind.config.js` — configuração completa

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#2D0A4E",
          yellow: "#F5C800",
        },
      },
    },
  },
  plugins: [],
}
```

---

## 9. Exercício em Sala

### 🏗️ DiretoFácil — Sprint 4

**Em grupos · 40 minutos**

**Requisitos obrigatórios:**

1. Criar o componente `<Badge />` em `src/components/ui/Badge.tsx` com **4 variantes** usando `cva`:
   - `disponivel` → fundo verde claro, texto verde escuro
   - `ocupado` → fundo cinza claro, texto cinza escuro
   - `destaque` → fundo amarelo claro, texto amarelo escuro
   - `novo` → fundo roxo claro, texto roxo escuro

2. Adicionar o `Badge` ao `CardInstrutor` com base no status do instrutor

3. Auditar a plataforma com a extensão **axe DevTools** e corrigir **ao menos 3 problemas** encontrados (documente os problemas encontrados e o que foi corrigido)

4. Garantir que todos os filtros da `BarraFiltros` sejam navegáveis por teclado na ordem correta — teste usando apenas `Tab` e `Enter`

**Bonus:**

5. Implementar tema claro/escuro usando a variante `dark:` do Tailwind:

```tsx
// Adicionar darkMode ao tailwind.config.js
export default {
  darkMode: "class",  // ativa dark mode via classe CSS
  // ...
}

// Botão para alternar o tema
function BotaoTema() {
  const [escuro, setEscuro] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", escuro)
  }, [escuro])

  return (
    <button onClick={() => setEscuro(!escuro)} aria-label="Alternar tema">
      {escuro ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  )
}

// Usando dark: nos componentes
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

---

## 10. Resumo dos Conceitos

| Conceito | Sintaxe / Ferramenta | Quando usar |
|---|---|---|
| Tailwind CSS | `className="text-purple-900 bg-yellow-400"` | Estilização rápida e consistente sem sair do JSX |
| Cores customizadas | `tailwind.config.js → theme.extend.colors` | Tokens da marca — evita hardcoding de hexadecimais |
| `clsx` | `clsx("base", { "condicional": bool })` | Combinar classes com condições de forma legível |
| `cva` | `cva("base", { variants: { ... } })` | Variantes de componente com tipagem automática pelo TypeScript |
| `VariantProps` | `VariantProps<typeof minhasVariantes>` | Extrair o tipo das props de variante gerado pelo cva |
| `alt` descritivo | `alt="Foto de perfil de João Silva"` | Toda imagem com conteúdo — descreva o que ela mostra |
| `<label htmlFor>` | `<label htmlFor="id"><input id="id">` | Todo campo de formulário — obrigatório para acessibilidade |
| `aria-label` | `aria-label="Fechar modal de agendamento"` | Botões com texto curto ou só ícone |
| `aria-live` | `aria-live="polite"` | Conteúdo que muda dinamicamente (contadores, mensagens) |
| `focus:ring-*` | `focus:ring-2 focus:ring-yellow-400` | Sempre substitua `outline-none` por algo visível |
| HTML semântico | `header`, `main`, `nav`, `article`, `section` | Em todo lugar onde uma `div` genérica estiver |
| `/ui` e `/features` | Estrutura de pastas | Separar componentes base de componentes de domínio |

---

### 🔗 O que vem na A5

Na próxima aula a plataforma ganha múltiplas páginas. Você vai instalar o React Router v7, criar rotas para `/`, `/instrutores/:id` e `/agendar/:id`, navegar com `Link` e `NavLink`, capturar parâmetros de URL com `useParams` e criar um layout compartilhado com `Outlet`. O botão "Ver perfil" que criamos hoje vai finalmente funcionar.

---

> **Dúvidas?**
> - [Documentação do Tailwind CSS](https://tailwindcss.com/docs) — pesquise qualquer propriedade CSS e encontre a classe equivalente
> - [cva documentation](https://cva.style/docs) — referência completa das variantes
> - [WCAG 2.1 em português](https://www.w3c.br/traducoes/wcag/wcag21-pt-BR/) — critérios de acessibilidade
> - [axe DevTools](https://www.deque.com/axe/devtools/) — extensão gratuita para auditar acessibilidade