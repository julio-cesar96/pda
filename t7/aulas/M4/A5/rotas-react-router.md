# 📑 A5: Aplicação com Novos Caminhos — Rotas com React Router
### Material de Apoio — DiretoFácil | Programadores do Amanhã

> Este documento é o seu guia de referência da Aula 5. O código parte exatamente de onde a A4 terminou — o `CardInstrutor` com Tailwind, `cva` e acessibilidade prontos. Hoje esse componente ganha destino: o botão "Ver perfil" vai finalmente funcionar.

---

## Índice

1. [O problema — a SPA que não tem endereço](#1-o-problema--a-spa-que-não-tem-endereço)
2. [Como o navegador gerencia URLs — a History API](#2-como-o-navegador-gerencia-urls--a-history-api)
3. [Client-side Routing — como o React Router usa a History API](#3-client-side-routing--como-o-react-router-usa-a-history-api)
4. [Instalação e configuração do React Router v7](#4-instalação-e-configuração-do-react-router-v7)
5. [Link e NavLink — navegação declarativa](#5-link-e-navlink--navegação-declarativa)
6. [Rotas dinâmicas e useParams](#6-rotas-dinâmicas-e-useparams)
7. [useNavigate — navegação programática](#7-usenavigate--navegação-programática)
8. [Rotas aninhadas e Layout compartilhado com Outlet](#8-rotas-aninhadas-e-layout-compartilhado-com-outlet)
9. [TanStack Router — a alternativa moderna](#9-tanstack-router--a-alternativa-moderna)
10. [Código Completo da Aula — DiretoFácil Sprint 5](#10-código-completo-da-aula--diretofácil-sprint-5)
11. [Exercício em Sala](#11-exercício-em-sala)
12. [Resumo dos Conceitos](#12-resumo-dos-conceitos)

---

## 1. O problema — a SPA que não tem endereço

No final da A4, o DiretoFácil estava assim: uma única página, com cards estilizados, filtros funcionando e acessibilidade corrigida. Mas havia um problema silencioso.

**Tente responder:** como você mandaria o link do perfil do instrutor João Silva para um amigo?

A resposta hoje é: você não consegue. Toda a plataforma vive em uma única URL — `http://localhost:5173`. Não importa o que o usuário clique, a URL nunca muda. Isso causa três problemas reais:

```
Problema 1 — Sem links compartilháveis
  Usuário quer enviar o perfil de um instrutor
  → Só existe uma URL para toda a plataforma
  → O amigo vai ver a home, não o perfil

Problema 2 — Sem histórico de navegação
  Usuário está no perfil do instrutor
  → Clica em "voltar" no navegador
  → Nada acontece — não há histórico para voltar

Problema 3 — Sem marcadores (bookmarks)
  Usuário favorita a página de agendamento
  → Na próxima visita, cai na home
  → O estado da aplicação não sobrevive ao reload
```

A solução é o **roteamento client-side** — fazer com que a URL reflita o estado da aplicação, sem recarregar a página.

---

## 2. Como o navegador gerencia URLs — a History API

Para entender como o React Router funciona, precisamos entender como o navegador gerencia o histórico de navegação nativamente.

### O objeto `window.history`

Todo navegador moderno expõe o objeto `window.history`, que representa a **pilha de navegação** da aba atual. Pense nele como uma pilha de cartas — você vai empilhando páginas visitadas e pode andar para frente e para trás.

```
Pilha de histórico:
  ┌─────────────────────┐
  │  /instrutores/3      │  ← posição atual (topo)
  ├─────────────────────┤
  │  /instrutores/1      │
  ├─────────────────────┤
  │  /                   │  ← primeira visita (base)
  └─────────────────────┘
```

### Os três métodos fundamentais da History API

```js
// 1. pushState — empurra uma nova entrada na pilha
//    A URL muda, a página NÃO recarrega
window.history.pushState(
  { instrutor: "João" },  // estado — qualquer objeto JS
  "",                     // title — ignorado pelos browsers modernos
  "/instrutores/1"        // nova URL que aparece na barra do navegador
)

// 2. replaceState — substitui a entrada atual na pilha
//    Não empilha, apenas troca — o botão "voltar" não volta para cá
window.history.replaceState(
  {},
  "",
  "/instrutores/1?tab=avaliacoes"
)

// 3. back() / forward() / go()
window.history.back()     // equivale a apertar "←" no navegador
window.history.forward()  // equivale a apertar "→"
window.history.go(-2)     // volta 2 posições na pilha
```

### O evento `popstate`

Quando o usuário aperta "voltar" ou "avançar" no navegador, o evento `popstate` é disparado. É aqui que o roteador precisa agir — detectar a mudança e atualizar o componente renderizado.

```js
// O navegador avisa quando o usuário navega pelo histórico
window.addEventListener("popstate", (event) => {
  console.log("URL mudou para:", window.location.pathname)
  console.log("Estado salvo:", event.state)
  // Aqui o roteador decide qual componente renderizar
})
```

### Montando um roteador minimalista do zero

Para entender o que o React Router faz por você, veja como seria implementar o conceito na mão:

```tsx
// Roteador minimalista — APENAS para entender o conceito
// NÃO use isso em produção

function RoteadorManual() {
  // Estado que reflete a URL atual
  const [rota, setRota] = useState(window.location.pathname)

  useEffect(() => {
    // Quando o usuário usa os botões ← → do navegador
    const handlePopState = () => {
      setRota(window.location.pathname)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Função de navegação que usa pushState
  function navegar(novaRota: string) {
    window.history.pushState({}, "", novaRota)
    setRota(novaRota)
    // O React re-renderiza com a nova rota
  }

  // Decide qual componente renderizar com base na URL
  if (rota === "/")               return <PaginaHome navegar={navegar} />
  if (rota.startsWith("/instrutores/")) {
    const id = rota.split("/")[2]
    return <PaginaPerfil id={id} navegar={navegar} />
  }
  return <Pagina404 />
}
```

Isso funciona — mas não escala. À medida que as rotas crescem, esse `if/else` vira um caos. O React Router resolve isso de forma declarativa e robusta.

### Por que não usar `<a href="...">` comum?

```tsx
// ❌ Link HTML comum — recarrega a página inteira
<a href="/instrutores/1">Ver perfil</a>
// O navegador faz uma requisição HTTP ao servidor
// Toda a aplicação React reinicia do zero
// Todo o estado é perdido

// ✅ Link do React Router — troca de rota sem recarregar
<Link to="/instrutores/1">Ver perfil</Link>
// React Router intercepta o clique
// Chama history.pushState() internamente
// Atualiza apenas o componente que deve mudar
// Todo o estado React permanece intacto
```

---

## 3. Client-side Routing — como o React Router usa a History API

O React Router é uma camada sobre a History API que torna o roteamento **declarativo** e **integrado ao React**. O fluxo completo funciona assim:

```
Usuário clica em <Link to="/instrutores/1">
         ↓
React Router intercepta o clique (preventDefault no evento)
         ↓
Chama window.history.pushState({}, "", "/instrutores/1")
         ↓
A URL na barra do navegador muda para /instrutores/1
         ↓
O React Router atualiza seu estado interno com a nova URL
         ↓
O React re-renderiza — o componente <Routes> lê a URL atual
         ↓
O <Route path="/instrutores/:id"> casa com a URL
         ↓
O componente <PerfilInstrutor> é renderizado no lugar certo
         ↓
A página NÃO recarregou — o header, o estado dos filtros,
tudo continua intacto
```

```
Usuário aperta "←" no navegador
         ↓
O navegador dispara o evento "popstate"
         ↓
React Router ouve o evento e atualiza o estado interno
         ↓
A URL volta para / 
         ↓
O React re-renderiza — <ListagemInstrutores> é exibido novamente
         ↓
O estado dos filtros? Depende — se estava no App, persiste.
Se estava na ListagemInstrutores, foi perdido (componente desmontou)
```

### Modos de roteamento: BrowserRouter vs HashRouter

```
BrowserRouter — usa a History API (pushState)
  URL: https://diretofacil.com/instrutores/1
  ✅ URLs limpas e profissionais
  ✅ SEO melhor (crawlers entendem a URL)
  ⚠️  Requer configuração no servidor de deploy para não retornar 404
      (o servidor precisa sempre servir o index.html)

HashRouter — usa o fragmento da URL (#)
  URL: https://diretofacil.com/#/instrutores/1
  ✅ Zero configuração de servidor — o hash nunca vai ao servidor
  ❌ URLs feias com #
  ❌ SEO prejudicado
  Uso: quando não há controle sobre o servidor (GitHub Pages sem config)
```

> **Na prática:** use sempre `BrowserRouter`. Ao fazer deploy na Vercel ou Netlify, eles já configuram o servidor corretamente. Para GitHub Pages, há um workaround com `404.html`.

---

## 4. Instalação e configuração do React Router v7

### Instalação

```bash
npm install react-router-dom
```

### Evolução do código da A4

Na A4, o `main.tsx` era simples — só montava o `App`. Agora envolvemos tudo com `BrowserRouter`:

```tsx
// src/main.tsx — ANTES (A4)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

```tsx
// src/main.tsx — DEPOIS (A5)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // ← novo
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      BrowserRouter deve envolver TODA a aplicação.
      Ele é o contexto que fornece informações de rota
      para todos os componentes filhos.
      Se um componente usar useNavigate ou Link fora do
      BrowserRouter, vai quebrar com erro.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

### Estrutura de rotas no App

```tsx
// src/App.tsx — com Routes declarativas

import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import PaginaListagem from './pages/PaginaListagem'
import PaginaPerfil from './pages/PaginaPerfil'
import PaginaAgendamento from './pages/PaginaAgendamento'
import Pagina404 from './pages/Pagina404'

function App() {
  return (
    <Routes>
      {/*
        Route com element={<Layout />} como pai
        Todas as rotas filhas herdam o Layout (header + footer)
        O <Outlet /> dentro do Layout é onde o conteúdo filho aparece
      */}
      <Route path="/" element={<Layout />}>

        {/* index = rota padrão quando o path é "/" exato */}
        <Route index element={<PaginaListagem />} />

        {/* :id = parâmetro dinâmico — capturado com useParams */}
        <Route path="instrutores/:id" element={<PaginaPerfil />} />

        {/* Rota de agendamento */}
        <Route path="agendar/:id" element={<PaginaAgendamento />} />

      </Route>

      {/* Rota 404 — "*" casa com qualquer URL não mapeada acima */}
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  )
}

export default App
```

### Como o React Router decide qual rota renderizar

O React Router v6+ usa um algoritmo de **melhor correspondência** — não a primeira que casar. Rotas mais específicas ganham de rotas genéricas:

```
URL atual: /instrutores/42

Rotas declaradas:
  /                     → não casa
  /instrutores/:id      → ✅ casa! id = "42"
  /agendar/:id          → não casa
  *                     → casaria, mas /instrutores/:id é mais específica

Resultado: renderiza PaginaPerfil com id = "42"
```

```
URL atual: /pagina-inexistente

Rotas declaradas:
  /                     → não casa
  /instrutores/:id      → não casa
  /agendar/:id          → não casa
  *                     → ✅ casa (pega tudo que sobrou)

Resultado: renderiza Pagina404
```

---

## 5. Link e NavLink — navegação declarativa

### Link — o substituto do `<a>`

```tsx
import { Link } from 'react-router-dom'

// Link básico
<Link to="/instrutores/1">Ver perfil</Link>

// Link com estado — passa dados para a próxima rota
// sem expor na URL
<Link
  to="/instrutores/1"
  state={{ origem: "listagem" }}  // acessível via useLocation().state
>
  Ver perfil
</Link>

// Link relativo — relativo à rota atual
// Se estiver em /instrutores, /voltar = /voltar (absoluto)
// Se to não começa com /, é relativo
<Link to="avaliacoes">Ver avaliações</Link>  // /instrutores/1/avaliacoes

// Substituir no histórico em vez de empilhar
// O botão "voltar" vai pular essa navegação
<Link to="/" replace>Voltar</Link>
```

### NavLink — Link com estilo ativo

`NavLink` é igual ao `Link`, mas adiciona automaticamente uma classe `active` quando a URL atual corresponde ao destino.

```tsx
import { NavLink } from 'react-router-dom'

// Forma básica — adiciona className "active" quando a rota casa
<NavLink to="/">Home</NavLink>
<NavLink to="/instrutores">Instrutores</NavLink>

// Com Tailwind — usando a prop className como função
<NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "font-bold text-brand-yellow border-b-2 border-brand-yellow"
      : "text-white hover:text-brand-yellow transition-colors"
  }
>
  Home
</NavLink>

// end — por padrão "/" casa com QUALQUER URL (pois toda URL começa com /)
// end faz com que só case quando a URL é "/" exatamente
<NavLink to="/" end>Home</NavLink>
```

### Diferença prática entre Link e NavLink

```tsx
// Use Link quando:
// - Navegação dentro de conteúdo (cards, listas, botões de ação)
// - O destino não precisa de estilo ativo

// Use NavLink quando:
// - Menus de navegação (header, sidebar, tabs)
// - O usuário precisa saber visualmente em que página está
```

---

### 🔴 Live Code 1 — Configuração e rotas básicas

**Contexto:** partindo do código da A4 com o `CardInstrutor` estilizado, o botão "Ver perfil" ainda não faz nada. Vamos conectar as rotas ao projeto.

**Evolução do código:** o `App.tsx` deixa de ser a única "tela" e passa a ser o orquestrador de rotas. O `CardInstrutor` ganha um `Link` real.

**Momento de impacto:** clicar no card e ver a URL mudar sem a página recarregar.

```tsx
// src/components/features/CardInstrutor.tsx
// Evolução da A4: adicionar Link ao botão "Ver perfil"

import { Link } from 'react-router-dom'  // ← novo import
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
        disponivel: "border-2 border-green-400 shadow-md hover:shadow-green-200 hover:-translate-y-1",
        destaque:   "border-2 border-brand-yellow shadow-md hover:shadow-yellow-200 hover:-translate-y-1",
      },
    },
    defaultVariants: { variant: "padrao" },
  }
)

interface CardInstrutorProps extends VariantProps<typeof cardVariants> {
  instrutor: Instrutor
}

function CardInstrutor({ instrutor, variant }: CardInstrutorProps) {
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
          <span aria-hidden="true">📍 </span>{cidade}
        </p>
        <p className="text-sm text-gray-600 italic">{especialidade}</p>
      </div>

      <p className="text-2xl font-bold text-brand-purple">
        R$ {preco.toFixed(2)}
        <span className="text-sm font-normal text-gray-400">/hora</span>
      </p>

      {disponivel
        ? <Badge variant="disponivel">✅ Disponível hoje</Badge>
        : <Badge variant="ocupado">🔴 Indisponível</Badge>
      }

      {/*
        Link substitui o <button> da A4.
        to="/instrutores/1" → URL com o id real do instrutor
        O React Router chama history.pushState() internamente.
        A página NÃO recarrega.
      */}
      <Link
        to={`/instrutores/${id}`}
        className="
          mt-auto text-center
          bg-brand-purple text-white
          font-semibold py-2 px-4 rounded-xl
          hover:bg-purple-800 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
        "
        aria-label={`Ver perfil de ${nome}`}
      >
        Ver perfil
      </Link>

    </article>
  )
}

export default CardInstrutor
```

```tsx
// src/components/layout/Header.tsx
// Evolução da A4: adicionar NavLink no header

import { NavLink } from 'react-router-dom'

interface HeaderProps {
  totalDisponiveis: number
}

function Header({ totalDisponiveis }: HeaderProps) {
  return (
    <header className="bg-brand-purple text-white py-4 px-8 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo — Link para a home */}
        <NavLink
          to="/"
          className="flex items-center gap-3 no-underline"
          aria-label="DiretoFácil — ir para a página inicial"
        >
          <span className="text-3xl" aria-hidden="true">🚗</span>
          <span className="text-2xl font-bold text-brand-yellow">
            DiretoFácil
          </span>
        </NavLink>

        {/* Navegação principal */}
        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-6 list-none">
            <li>
              <NavLink
                to="/"
                end  // ← end: só ativa quando a URL é "/" exatamente
                className={({ isActive }) =>
                  isActive
                    ? "text-brand-yellow font-bold border-b-2 border-brand-yellow pb-1"
                    : "text-white hover:text-brand-yellow transition-colors duration-200"
                }
              >
                Instrutores
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/meu-perfil"
                className={({ isActive }) =>
                  isActive
                    ? "text-brand-yellow font-bold border-b-2 border-brand-yellow pb-1"
                    : "text-white hover:text-brand-yellow transition-colors duration-200"
                }
              >
                Meu perfil
              </NavLink>
            </li>
          </ul>
        </nav>

        <p className="text-sm text-gray-300" aria-live="polite">
          {totalDisponiveis} disponíveis agora
        </p>

      </div>
    </header>
  )
}

export default Header
```

---

## 6. Rotas dinâmicas e useParams

### O que são rotas dinâmicas

Uma rota dinâmica tem segmentos variáveis na URL, marcados com `:`. Esses segmentos capturam qualquer valor e tornam o valor acessível no componente.

```
Rota declarada:    /instrutores/:id
URL real:          /instrutores/42
                                ↑
                         id = "42"  ← sempre string

URL real:          /instrutores/ana-carvalho
                                ↑
                         id = "ana-carvalho"
```

### useParams — capturando os parâmetros

```tsx
import { useParams } from 'react-router-dom'

function PaginaPerfil() {
  // useParams retorna um objeto com todos os parâmetros da rota
  // O tipo genérico diz ao TypeScript o que esperar
  const { id } = useParams<{ id: string }>()

  // ATENÇÃO: id pode ser undefined se a rota for acessada sem o parâmetro
  // Com TypeScript, o tipo é string | undefined
  if (!id) return <p>ID inválido</p>

  // id aqui é garantidamente string
  const instrutor = instrutores.find(i => i.id === id)

  if (!instrutor) {
    return <p>Instrutor não encontrado</p>
  }

  return <div>{instrutor.nome}</div>
}
```

### Múltiplos parâmetros

```tsx
// Rota: /categorias/:categoria/instrutores/:id
const { categoria, id } = useParams<{
  categoria: string
  id: string
}>()
```

---

### 🔴 Live Code 2 — Rotas dinâmicas, useNavigate e Layout

**Contexto:** as rotas estão configuradas. Agora vamos construir a página de perfil que usa `useParams` para saber qual instrutor exibir, e o `Layout` com `Outlet` para compartilhar o header entre todas as páginas.

**Evolução do código:** o `App.tsx` que antes renderizava tudo diretamente agora delega para páginas, e o `Header` vive uma única vez dentro do `Layout`.

```tsx
// src/components/layout/Layout.tsx
// Novo arquivo — o "esqueleto" que envolve todas as páginas

import { Outlet } from 'react-router-dom'
import Header from './Header'

/*
  Layout é o componente que define a estrutura visual
  compartilhada entre todas as páginas.

  <Outlet /> é o "buraco" onde o conteúdo da rota filha aparece.

  Analogia: o Layout é a moldura do quadro.
  O Outlet é onde a tela vai.

  Quando a URL é "/":
    Layout renderiza → Header + <Outlet /> = Header + PaginaListagem

  Quando a URL é "/instrutores/1":
    Layout renderiza → Header + <Outlet /> = Header + PaginaPerfil
*/

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/*
        Header aparece em TODAS as páginas filhas.
        É renderizado uma única vez — não remonta ao navegar.
        Todo estado interno do Header persiste entre navegações.
      */}
      <Header totalDisponiveis={3} />

      {/*
        Outlet = ponto de injeção das rotas filhas.
        O React Router substitui <Outlet /> pelo componente
        da rota que casou com a URL atual.
      */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-brand-purple text-white text-center py-4 text-sm">
        <p>© 2024 DiretoFácil — Todos os direitos reservados</p>
      </footer>

    </div>
  )
}

export default Layout
```

```tsx
// src/pages/PaginaListagem.tsx
// Evolução da A4: o App.tsx virou uma página dedicada

import { useState, useEffect, useMemo } from 'react'
import { Instrutor } from '../types'
import BarraFiltros from '../components/features/BarraFiltros'
import { Lista } from '../components/ui/Lista'
import CardInstrutor from '../components/features/CardInstrutor'
import { instrutores as dadosMockados } from '../data/instrutores'

function PaginaListagem() {
  const [instrutores, setInstrutores] = useState<Instrutor[]>([])
  const [loading, setLoading]         = useState<boolean>(true)
  const [busca, setBusca]             = useState<string>("")
  const [cidade, setCidade]           = useState<string>("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setInstrutores(dadosMockados)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const instrutoresFiltrados = useMemo<Instrutor[]>(() =>
    instrutores.filter(i => {
      const buscaOk = busca === "" ||
        i.nome.toLowerCase().includes(busca.toLowerCase())
      const cidadeOk = cidade === "" || i.cidade === cidade
      return buscaOk && cidadeOk
    })
  , [instrutores, busca, cidade])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="flex flex-col items-center gap-4 text-gray-500">
          <div
            className="w-10 h-10 border-4 border-gray-200 border-t-brand-purple rounded-full animate-spin"
            aria-label="Carregando instrutores"
          />
          <p>Buscando instrutores...</p>
        </div>
      </div>
    )
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-brand-purple mb-6">
        Encontre seu instrutor
      </h1>

      <BarraFiltros
        busca={busca}
        cidade={cidade}
        instrutores={instrutores}
        onBuscaChange={setBusca}
        onCidadeChange={setCidade}
        onLimpar={() => { setBusca(""); setCidade("") }}
      />

      <p className="text-sm text-gray-500 mb-4" aria-live="polite">
        {instrutoresFiltrados.length} instrutor(es) encontrado(s)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {instrutoresFiltrados.map(instrutor => (
          <CardInstrutor key={instrutor.id} instrutor={instrutor} />
        ))}
      </div>
    </section>
  )
}

export default PaginaListagem
```

```tsx
// src/pages/PaginaPerfil.tsx
// Novo arquivo — página de perfil do instrutor

import { useParams, Link, useNavigate } from 'react-router-dom'
import { instrutores } from '../data/instrutores'
import Badge from '../components/ui/Badge'

function PaginaPerfil() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Busca o instrutor pelo id da URL
  const instrutor = instrutores.find(i => i.id === id)

  // Se o id não existir na lista, mostra 404 inline
  if (!instrutor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-6xl">😕</p>
        <h1 className="text-2xl font-bold text-brand-purple">
          Instrutor não encontrado
        </h1>
        <p className="text-gray-500">
          O instrutor com ID <code className="bg-gray-100 px-2 py-1 rounded">{id}</code> não existe.
        </p>
        {/*
          Link de volta para a listagem.
          Poderia ser useNavigate(-1) para "voltar",
          mas Link é mais previsível — sempre vai para a home.
        */}
        <Link
          to="/"
          className="
            bg-brand-purple text-white font-semibold
            py-2 px-6 rounded-xl
            hover:bg-purple-800 transition-colors
            focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
          "
        >
          Voltar para a listagem
        </Link>
      </div>
    )
  }

  const { nome, cidade, especialidade, preco, disponivel, foto } = instrutor

  return (
    <article>

      {/* Breadcrumb — mostra o caminho de navegação */}
      <nav aria-label="Navegação estrutural" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-brand-purple transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/" className="hover:text-brand-purple transition-colors">
              Instrutores
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          {/* Página atual — não é link, tem aria-current */}
          <li
            className="text-brand-purple font-medium"
            aria-current="page"
          >
            {nome}
          </li>
        </ol>
      </nav>

      {/* Perfil */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-8 items-start">

          <img
            src={foto}
            alt={`Foto de perfil de ${nome}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-brand-yellow"
          />

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-brand-purple">{nome}</h1>
            <p className="text-gray-600">📍 {cidade}</p>
            <p className="text-gray-600 italic">{especialidade}</p>
            <p className="text-2xl font-bold text-brand-purple">
              R$ {preco.toFixed(2)}
              <span className="text-sm font-normal text-gray-400">/hora</span>
            </p>
            {disponivel
              ? <Badge variant="disponivel">✅ Disponível hoje</Badge>
              : <Badge variant="ocupado">🔴 Indisponível</Badge>
            }
          </div>

        </div>

        {/* Ações */}
        <div className="flex gap-4 mt-8">

          {/*
            useNavigate para navegação programática.
            Aqui usamos navigate() com uma string de rota.
            O React Router chama history.pushState() internamente.
          */}
          <button
            onClick={() => navigate(`/agendar/${instrutor.id}`)}
            disabled={!disponivel}
            className="
              bg-brand-purple text-white font-semibold
              py-3 px-8 rounded-xl
              hover:bg-purple-800 transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
            "
            aria-label={
              disponivel
                ? `Agendar aula com ${nome}`
                : `${nome} está indisponível para agendamento`
            }
          >
            {disponivel ? "Agendar aula" : "Indisponível"}
          </button>

          {/*
            navigate(-1) = history.back() — volta uma posição na pilha
            É o equivalente do botão "←" do navegador
          */}
          <button
            onClick={() => navigate(-1)}
            className="
              border-2 border-gray-200 text-gray-600 font-semibold
              py-3 px-8 rounded-xl
              hover:border-brand-purple hover:text-brand-purple
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2
            "
          >
            Voltar
          </button>

        </div>

      </div>
    </article>
  )
}

export default PaginaPerfil
```

---

## 7. useNavigate — navegação programática

`useNavigate` é para quando a navegação acontece como resultado de uma ação — não de um clique em link, mas de uma lógica de código.

```tsx
import { useNavigate } from 'react-router-dom'

function MeuComponente() {
  const navigate = useNavigate()

  // Navegar para uma rota específica
  navigate('/instrutores/1')

  // Passar estado sem expor na URL
  navigate('/confirmacao', { state: { nomeInstrutor: 'João' } })

  // Substituir no histórico em vez de empilhar
  // O botão "voltar" vai pular esta navegação
  navigate('/login', { replace: true })

  // Voltar uma página (como o botão ← do navegador)
  navigate(-1)

  // Avançar uma página (como o botão → do navegador)
  navigate(1)

  // Voltar duas páginas
  navigate(-2)
}
```

### Quando usar navigate vs Link

```tsx
// USE <Link> quando:
// - A navegação está atrelada a um elemento clicável na UI
// - O destino é sempre o mesmo independente de condições
<Link to="/instrutores/1">Ver perfil</Link>

// USE navigate() quando:
// - A navegação acontece após uma operação assíncrona
// - A URL de destino depende de lógica condicional
// - Você precisa redirecionar sem interação do usuário

async function handleSubmit() {
  await criarAgendamento(dados)
  // Só navega DEPOIS que a operação concluiu
  navigate(`/confirmacao/${agendamento.id}`)
}

function verificarAutenticacao() {
  if (!usuario) {
    // Redireciona para login — replace=true para não criar
    // entrada no histórico (evita loop ao apertar "voltar")
    navigate('/login', { replace: true })
  }
}
```

### Acessando o estado passado via navigate

```tsx
import { useLocation } from 'react-router-dom'

function PaginaConfirmacao() {
  const location = useLocation()

  // Acessa o estado passado pelo navigate()
  const { nomeInstrutor } = location.state as { nomeInstrutor: string }

  return <p>Agendamento confirmado com {nomeInstrutor}!</p>
}
```

---

## 8. Rotas aninhadas e Layout compartilhado com Outlet

### O problema sem layout compartilhado

```tsx
// ❌ Sem layout — repete o Header em cada página
function PaginaListagem() {
  return (
    <>
      <Header />  {/* repetido */}
      {/* conteúdo */}
    </>
  )
}

function PaginaPerfil() {
  return (
    <>
      <Header />  {/* repetido */}
      {/* conteúdo */}
    </>
  )
}
```

```tsx
// ✅ Com layout e Outlet — Header declarado uma única vez
function Layout() {
  return (
    <>
      <Header />
      <Outlet />  {/* conteúdo da rota filha aqui */}
    </>
  )
}
```

### Como as rotas aninhadas funcionam visualmente

```
Árvore de rotas:
  <Route path="/" element={<Layout />}>
    <Route index element={<PaginaListagem />} />
    <Route path="instrutores/:id" element={<PaginaPerfil />} />
    <Route path="agendar/:id" element={<PaginaAgendamento />} />
  </Route>

Quando URL = "/":
  ┌──────────────────────────────────────────────────┐
  │  <Layout>                                        │
  │    <Header />           ← sempre visível         │
  │    <Outlet />           ← substituído por:       │
  │      <PaginaListagem /> ← rota index             │
  │    <Footer />           ← sempre visível         │
  │  </Layout>                                       │
  └──────────────────────────────────────────────────┘

Quando URL = "/instrutores/1":
  ┌──────────────────────────────────────────────────┐
  │  <Layout>                                        │
  │    <Header />           ← mesmo componente,      │
  │                           não remontou           │
  │    <Outlet />           ← substituído por:       │
  │      <PaginaPerfil />   ← rota dinâmica          │
  │    <Footer />           ← mesmo componente       │
  │  </Layout>                                       │
  └──────────────────────────────────────────────────┘
```

### Passando dados do Layout para o Outlet com `useOutletContext`

```tsx
// Layout pode passar dados para as páginas filhas
import { Outlet, useOutletContext } from 'react-router-dom'

interface LayoutContext {
  totalDisponiveis: number
  usuario: string | null
}

function Layout() {
  const [totalDisponiveis] = useState(3)
  const [usuario] = useState<string | null>(null)

  return (
    <div>
      <Header totalDisponiveis={totalDisponiveis} />
      {/* Passa contexto para qualquer rota filha */}
      <Outlet context={{ totalDisponiveis, usuario } satisfies LayoutContext} />
    </div>
  )
}

// Página filha consome o contexto do Layout
function PaginaPerfil() {
  const { usuario } = useOutletContext<LayoutContext>()
  // ...
}
```

---

## 9. TanStack Router — a alternativa moderna

### O que é e por que está crescendo

O **TanStack Router** (antigo React Location) é uma alternativa ao React Router com foco total em **type safety**. Enquanto o React Router usa strings para definir rotas, o TanStack Router usa objetos tipados.

```bash
npm install @tanstack/react-router
```

### A diferença fundamental: type safety nas rotas

```tsx
// React Router — strings mágicas (sem verificação de tipo)
<Link to="/instrutores/1">Ver perfil</Link>
navigate('/instrutores/1')
// Se você errar o path: "/intrutores/1" — zero aviso do TypeScript

// TanStack Router — rotas como objetos tipados
<Link to="/instrutores/$id" params={{ id: "1" }}>Ver perfil</Link>
// Se você errar o path — ERRO de tipo no editor imediatamente
// Se você esquecer o params — ERRO de tipo
// TypeScript sabe EXATAMENTE quais parâmetros cada rota precisa
```

### Declarando rotas no TanStack Router

```tsx
// src/routes/__root.tsx — rota raiz (equivale ao Layout)
import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/layout/Header'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      <Header totalDisponiveis={3} />
      <main className="max-w-6xl mx-auto px-8 py-8">
        <Outlet />
      </main>
    </div>
  ),
})
```

```tsx
// src/routes/index.tsx — rota "/"
import { createFileRoute } from '@tanstack/react-router'
import PaginaListagem from '../pages/PaginaListagem'

export const Route = createFileRoute('/')({
  component: PaginaListagem,
})
```

```tsx
// src/routes/instrutores.$id.tsx — rota "/instrutores/:id"
// O $ no nome do arquivo indica parâmetro dinâmico
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/instrutores/$id')({
  component: PaginaPerfil,
})

function PaginaPerfil() {
  // Aqui id é tipado como string — sem union com undefined
  const { id } = Route.useParams()
  // TypeScript sabe que id existe e é string
  // Porque a rota /instrutores/$id exige esse parâmetro
  return <div>Instrutor: {id}</div>
}
```

```tsx
// Navegação tipada — TypeScript valida tudo
import { Link, useNavigate } from '@tanstack/react-router'

// ✅ Correto — TypeScript valida path e params
<Link to="/instrutores/$id" params={{ id: instrutor.id }}>
  Ver perfil
</Link>

// ❌ Erro de tipo — params.id é obrigatório para essa rota
<Link to="/instrutores/$id">Ver perfil</Link>

// ✅ navigate também é tipado
const navigate = useNavigate()
navigate({ to: '/instrutores/$id', params: { id: '1' } })
```

### Comparação direta: React Router vs TanStack Router

| | React Router v7 | TanStack Router |
|---|---|---|
| **Type safety nas rotas** | ❌ Strings sem tipagem | ✅ Totalmente tipado |
| **Params tipados** | ⚠️ `useParams<{id: string}>()` manual | ✅ Inferido automaticamente |
| **Integração com React Query** | Manual | ✅ Nativa (mesmo ecossistema TanStack) |
| **File-based routing** | ❌ Não | ✅ Opcional com Vite plugin |
| **Curva de aprendizado** | Baixa | Média |
| **Adoção no mercado** | ✅ Muito alta | 📈 Crescendo rapidamente |
| **Quando escolher** | Projetos com equipe já familiarizada | Projetos novos com TypeScript rigoroso |

### Quando usar cada um

```
Use React Router v7 quando:
  → A equipe já conhece React Router
  → O projeto não exige type safety extrema nas rotas
  → Você quer a opção mais consolidada no mercado hoje

Use TanStack Router quando:
  → O projeto usa TypeScript com strict: true
  → Você já usa React Query (mesmo ecossistema TanStack)
  → Quer type safety completa — parâmetros, search params, estado
  → Projetos novos onde você pode definir a stack do zero
```

> **Para o DiretoFácil neste módulo:** usamos React Router v7 por ser mais direto para aprender os conceitos. Nas aulas A6 em diante, quando o React Query entrar, você vai ver como os dois ecossistemas se complementam naturalmente — e por que o TanStack Router é tão atraente.

---

## 10. Código Completo da Aula — DiretoFácil Sprint 5

### Estrutura de pastas ao final da aula

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx        ← novo — Outlet + Header + Footer
│   │   └── Header.tsx        ← atualizado — NavLink
│   ├── ui/
│   │   ├── Badge.tsx         ← da A4
│   │   └── Lista.tsx         ← da A3
│   └── features/
│       ├── CardInstrutor.tsx ← atualizado — Link no botão
│       ├── BarraFiltros.tsx  ← da A4
│       └── ListaInstrutores.tsx
├── pages/
│   ├── PaginaListagem.tsx    ← novo — conteúdo extraído do App
│   ├── PaginaPerfil.tsx      ← novo — useParams + breadcrumb
│   ├── PaginaAgendamento.tsx ← novo — formulário básico
│   └── Pagina404.tsx         ← novo — rota catch-all
├── data/
│   └── instrutores.ts
├── types/
│   └── index.ts
├── App.tsx                   ← simplificado — só Routes
├── main.tsx                  ← atualizado — BrowserRouter
└── index.css
```

---

### `src/App.tsx` — versão final simplificada

```tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import PaginaListagem from './pages/PaginaListagem'
import PaginaPerfil from './pages/PaginaPerfil'
import PaginaAgendamento from './pages/PaginaAgendamento'
import Pagina404 from './pages/Pagina404'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PaginaListagem />} />
        <Route path="instrutores/:id" element={<PaginaPerfil />} />
        <Route path="agendar/:id" element={<PaginaAgendamento />} />
        <Route path="meu-perfil" element={<PaginaMeuPerfil />} />
      </Route>
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  )
}

export default App
```

---

### `src/pages/PaginaAgendamento.tsx`

```tsx
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { instrutores } from '../data/instrutores'

function PaginaAgendamento() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [enviado, setEnviado] = useState(false)

  const instrutor = instrutores.find(i => i.id === id)

  if (!instrutor) {
    return (
      <div className="text-center py-16">
        <p>Instrutor não encontrado.</p>
        <Link to="/">Voltar para a listagem</Link>
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Simula envio
    setEnviado(true)
    // Após 2 segundos, redireciona para o perfil
    // navigate() com replace=true evita que o usuário volte para o formulário
    setTimeout(() => {
      navigate(`/instrutores/${id}`, { replace: true })
    }, 2000)
  }

  if (enviado) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl">✅</p>
        <p className="text-xl font-bold text-brand-purple mt-4">
          Agendamento confirmado!
        </p>
        <p className="text-gray-500 mt-2">
          Redirecionando para o perfil de {instrutor.nome}...
        </p>
      </div>
    )
  }

  return (
    <section>
      {/* Breadcrumb */}
      <nav aria-label="Navegação estrutural" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link to="/" className="hover:text-brand-purple">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              to={`/instrutores/${id}`}
              className="hover:text-brand-purple"
            >
              {instrutor.nome}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-brand-purple font-medium" aria-current="page">
            Agendar
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-brand-purple mb-6">
        Agendar aula com {instrutor.nome}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 max-w-lg"
      >
        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
              Seu nome
            </label>
            <input
              id="nome"
              type="text"
              required
              className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
              placeholder="João da Silva"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="data" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
              Data da aula
            </label>
            <input
              id="data"
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="
                flex-1 bg-brand-purple text-white font-semibold
                py-3 rounded-xl hover:bg-purple-800 transition-colors
                focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
              "
            >
              Confirmar agendamento
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                flex-1 border-2 border-gray-200 text-gray-600 font-semibold
                py-3 rounded-xl hover:border-brand-purple hover:text-brand-purple
                transition-all
                focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2
              "
            >
              Cancelar
            </button>
          </div>

        </div>
      </form>
    </section>
  )
}

export default PaginaAgendamento
```

---

### `src/pages/Pagina404.tsx`

```tsx
import { Link, useLocation } from 'react-router-dom'

function Pagina404() {
  // useLocation dá acesso à URL atual
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-8xl">🚗💨</p>

      <h1 className="text-4xl font-bold text-brand-purple">
        Página não encontrada
      </h1>

      <p className="text-gray-500 max-w-md">
        A URL{" "}
        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
          {location.pathname}
        </code>{" "}
        não existe na plataforma.
      </p>

      <Link
        to="/"
        className="
          bg-brand-purple text-white font-semibold
          py-3 px-8 rounded-xl
          hover:bg-purple-800 transition-colors
          focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
        "
      >
        Voltar para a home
      </Link>
    </div>
  )
}

export default Pagina404
```

---

## 11. Exercício em Sala

### 🏗️ DiretoFácil — Sprint 5

**Em grupos · 40 minutos**

**Requisitos obrigatórios:**

1. Criar a rota `/meu-perfil` que exibe os agendamentos do usuário logado. Por enquanto use um array mockado de agendamentos.

2. Implementar redirecionamento protegido: se não houver usuário logado (use um `useState` simples no `Layout` com `true/false`), redirecionar para `/` usando `useNavigate` com `replace: true`.
   > **Dica:** `navigate('/', { replace: true })` — o `replace` impede que o usuário volte para `/meu-perfil` com o botão "←"

3. Adicionar o breadcrumb na `PaginaPerfil` usando o componente abaixo como base — ele já está implementado no código da aula, refatore-o em um componente separado `<Breadcrumb />` em `/components/ui/`:

```tsx
// src/components/ui/Breadcrumb.tsx

interface BreadcrumbItem {
  label: string
  to?: string  // se não tiver "to", é a página atual
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Navegação estrutural" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.to ? (
              <Link to={item.to} className="hover:text-brand-purple transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-purple font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

4. Criar a rota `*` (404) que exibe a URL que o usuário tentou acessar — usando `useLocation().pathname`.

**Bonus:**

5. Implementar animação de transição entre páginas com CSS — ao entrar em uma nova rota, o conteúdo faz `fade in`:

```css
/* src/index.css */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-transition {
  animation: fadeIn 0.2s ease-out;
}
```

```tsx
// Adicionar ao elemento raiz de cada página
<section className="page-transition">
  {/* conteúdo */}
</section>
```

---

## 12. Resumo dos Conceitos

| Conceito | Como funciona | Quando usar |
|---|---|---|
| **History API** | `pushState()` muda a URL sem recarregar; `popstate` detecta ← → | Base do client-side routing — entender isso explica tudo |
| **BrowserRouter** | Provê contexto de rota para toda a aplicação | Envolve o `App` no `main.tsx` — uma única vez |
| **Routes + Route** | Declara o mapeamento URL → componente | No `App.tsx` — estrutura principal das rotas |
| **Route index** | Rota padrão de um grupo | Quando a URL é o path exato do pai (`/`) |
| **Route `*`** | Casa com qualquer URL não mapeada | Sempre ao final — rota 404 |
| **Link** | Navega sem recarregar — chama `pushState` internamente | Substituindo `<a href>` para navegação interna |
| **NavLink** | Link com classe ativa quando a rota casa | Menus e navegação principal |
| **useParams** | Captura parâmetros dinâmicos da URL | Páginas de detalhe — `/instrutores/:id` |
| **useNavigate** | Navega programaticamente após lógica | Após submits, redirecionamentos condicionais |
| **navigate(-1)** | Volta uma posição no histórico | Botões "Voltar" — equivale a `history.back()` |
| **navigate(path, { replace })** | Substitui em vez de empilhar no histórico | Redirecionamentos — evita loop no botão "←" |
| **Outlet** | Ponto de injeção das rotas filhas no Layout | Dentro do componente Layout — uma única vez |
| **TanStack Router** | React Router com type safety completa | Projetos novos com TypeScript rigoroso + React Query |

---

### 🔗 O que vem na A6

Na próxima aula os dados mockados saem e a API real entra. O `useEffect + fetch` que você usaria naturalmente vai mostrar problemas sérios — race conditions, cache perdido ao navegar, loading duplicado em cada componente. O React Query resolve tudo isso com `useQuery` e `useMutation`, e o `invalidateQueries` vai coordenar o cache automaticamente após cada agendamento.

---

> **Dúvidas?**
> - [React Router v7 — documentação oficial](https://reactrouter.com/home)
> - [TanStack Router — documentação oficial](https://tanstack.com/router/latest)
> - [MDN — History API](https://developer.mozilla.org/pt-BR/docs/Web/API/History_API)
> - [MDN — pushState](https://developer.mozilla.org/pt-BR/docs/Web/API/History/pushState)