# 📱 A6: Consumindo APIs com React Query

## Índice

1. [O problema do fetch manual — demonstração ao vivo](#1-o-problema-do-fetch-manual--demonstração-ao-vivo)
2. [O que é React Query e como ele pensa](#2-o-que-é-react-query-e-como-ele-pensa)
3. [Configuração inicial — QueryClient e Provider](#3-configuração-inicial--queryclient-e-provider)
4. [Backend local com json-server — pronto para a aula](#4-backend-local-com-json-server--pronto-para-a-aula)
5. [useQuery — buscando dados com cache automático](#5-usequery--buscando-dados-com-cache-automático)
6. [Skeleton de carregamento](#6-skeleton-de-carregamento)
7. [useMutation — criando e modificando dados](#7-usemutation--criando-e-modificando-dados)
8. [staleTime e invalidateQueries — coordenando o cache](#8-staletime-e-invalidatequeries--coordenando-o-cache)
9. [React Query DevTools](#9-react-query-devtools)
10. [Error Boundaries com react-error-boundary](#10-error-boundaries-com-react-error-boundary)
11. [Código Completo da Aula — DiretoFácil Sprint 6](#11-código-completo-da-aula--diretofácil-sprint-6)
12. [Exercício em Sala](#12-exercício-em-sala)
13. [Resumo dos Conceitos](#13-resumo-dos-conceitos)

---

## 1. O problema do fetch manual — demonstração ao vivo

> 🔴 **DESENVOLVER AO VIVO** — escreva isso ao vivo, mostre os problemas acontecendo, depois apague e substitua pelo React Query

Antes de apresentar a solução, vamos construir o problema na frente da turma. Conecte a `PaginaListagem` à API com `useEffect + fetch` puro e observe o que acontece.

### Passo 1 — o fetch básico funciona, mas...

```tsx
// src/pages/PaginaListagem.tsx — versão com fetch manual
// ⚠️ CÓDIGO PROBLEMÁTICO — apenas para demonstração

function PaginaListagem() {
  const [instrutores, setInstrutores] = useState<Instrutor[]>([])
  const [loading, setLoading]         = useState(true)
  const [erro, setErro]               = useState<string | null>(null)

  useEffect(() => {
    let ativo = true

    async function carregarInstrutores() {
      try {
        setLoading(true)

        const res = await fetch("http://localhost:3000/instrutores")
        if (!res.ok) throw new Error("Erro ao buscar instrutores")

        const dados: Instrutor[] = await res.json()
        if (ativo) setInstrutores(dados)
      } catch (err) {
        if (ativo) {
          setErro(err instanceof Error ? err.message : "Erro inesperado")
        }
      } finally {
        if (ativo) setLoading(false)
      }
    }

    carregarInstrutores()

    return () => {
      ativo = false
    }
  }, [])

  // ...
}
```

### Passo 2 — mostre os problemas um a um

Depois de digitar o código acima, demonstre cada problema ao vivo:

**Problema 1: o cache não existe**
```
1. Abra a aba Network do DevTools
2. Navegue para a página de perfil de um instrutor
3. Volte para a home com o botão "←"
4. Observe: o GET /instrutores dispara DE NOVO
   → Os dados foram perdidos ao desmontar o componente
   → O usuário vê o spinner toda vez que volta para a home
```

**Problema 2: loading duplicado em cada componente**
```tsx
// Para mostrar o perfil do instrutor, você precisaria de:
function PaginaPerfil() {
  const { id } = useParams()
  const [instrutor, setInstrutor] = useState<Instrutor | null>(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  // O MESMO boilerplate de loading/erro repetido aqui
  useEffect(() => {
    let ativo = true

    async function carregarPerfil() {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:3000/instrutores/${id}`)
        if (!res.ok) throw new Error("Erro ao buscar perfil")

        const dados: Instrutor = await res.json()
        if (ativo) setInstrutor(dados)
      } catch (err) {
        if (ativo) {
          setErro(err instanceof Error ? err.message : "Erro inesperado")
        }
      } finally {
        if (ativo) setLoading(false)
      }
    }

    carregarPerfil()

    return () => {
      ativo = false
    }
  }, [id])

  // Isso vai se repetir em CADA página que precisar de dados
}
```

**Problema 3: race condition**
```tsx
// Cenário: usuário clica rapidamente entre instrutores 1, 2 e 3
// Três requisições são disparadas. A mais antiga pode chegar POR ÚLTIMO.

useEffect(() => {
  const controller = new AbortController()

  async function carregarInstrutor() {
    try {
      // Com controle de cancelamento:
      const res = await fetch(`http://localhost:3000/instrutores/${id}`, {
        signal: controller.signal,
      })
      const dados = await res.json()
      setInstrutor(dados)
    } catch (erro) {
      // Ignora apenas erros de cancelamento na troca rápida de perfil
      if (erro instanceof DOMException && erro.name === "AbortError") return
      throw erro
    }
  }

  carregarInstrutor()

  return () => {
    controller.abort()
  }
  // Se a requisição do instrutor 1 demorar mais que a do 3,
  // o usuário está vendo o perfil do 3, mas os dados são do 1 — BUG SILENCIOSO
}, [id])
```

**Conclusão ao vivo:**
```
Escreva no quadro/telão os estados que uma requisição precisa ter:

  loading       → está buscando?
  error         → deu erro?
  data          → os dados chegaram?
  refetching    → está atualizando em background?
  stale         → os dados estão desatualizados?
  paused        → sem internet, esperando?

"Gerenciar tudo isso manualmente em cada componente
não escala. Precisamos de uma camada de gerenciamento.
Não de mais código manual."
```

---

## 2. O que é React Query e como ele pensa

### Definição

**React Query não é um cliente HTTP** — ele não faz as requisições. Você ainda usa `fetch` ou `axios`. O React Query é um **gerenciador de estado de servidor**: ele coordena quando buscar, armazenar, atualizar e descartar dados que vêm de uma fonte externa.

```
Sem React Query:
  Componente A → fetch(/instrutores) → estado local de A
  Componente B → fetch(/instrutores) → estado local de B  ← requisição duplicada!
  Componente C → fetch(/instrutores) → estado local de C  ← requisição duplicada!

Com React Query:
  Componente A → useQuery("instrutores") ─┐
  Componente B → useQuery("instrutores") ─┤→ UMA única requisição → cache compartilhado
  Componente C → useQuery("instrutores") ─┘
```

### O ciclo de vida de um dado no React Query

```
1. FRESH (fresco)
   → Dado acabou de chegar. React Query não vai buscar de novo.
   → Duração: configurada pelo staleTime (padrão: 0ms — imediatamente stale)

2. STALE (obsoleto)
   → Dado existe no cache mas pode estar desatualizado.
   → React Query vai buscar novamente quando:
     - O componente montar
     - A janela ganhar foco (usuário volta para a aba)
     - A rede reconectar
     - Você chamar refetch() ou invalidateQueries()

3. INACTIVE (inativo)
   → Nenhum componente está usando este dado.
   → React Query mantém por gcTime (padrão: 5 minutos) e então descarta.

4. DELETED
   → Dado removido do cache após gcTime expirar.
```

```
Ciclo visual:

  fetch()     staleTime     gcTime
    ↓            ↓            ↓
  FRESH ──────→ STALE ──────→ INACTIVE ──────→ DELETED
         (0ms)        (componente         (5min)
         padrão        desmonta)
```

### A queryKey — o endereço do dado no cache

Toda query precisa de uma `queryKey` — um array que identifica unicamente aquele dado no cache. O React Query usa essa chave para:

- Saber se já tem o dado (evita requisição duplicada)
- Saber quando invalidar e refetch (quando a chave muda, refetch automático)
- Identificar o dado nas DevTools

```tsx
// Convenção de queryKey — do mais genérico para o mais específico
["instrutores"]               // lista de todos os instrutores
["instrutores", "1"]          // instrutor específico com id "1"
["instrutores", { cidade: "SP" }]  // instrutores filtrados por SP
["agendamentos", userId]      // agendamentos de um usuário específico
```

> **Regra de ouro:** se dois componentes usam a mesma `queryKey`, eles compartilham o mesmo cache. Se a `queryKey` muda, React Query entende como um dado diferente e busca novamente.

---

## 3. Configuração inicial — QueryClient e Provider

> 🟡 **MOSTRAR PRONTO** — configure antes da aula, apenas apresente e explique cada parte

### Instalação

```bash
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

### Configuração no `main.tsx`

```tsx
// src/main.tsx — evolução da A5

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'  // ← novo
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'        // ← novo
import App from './App.tsx'
import './index.css'

/*
  QueryClient é o gerenciador central do cache.
  Uma única instância para toda a aplicação — por isso fica aqui,
  fora do componente, para não ser recriado a cada render.

  defaultOptions permite configurar comportamentos globais.
*/
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: quanto tempo o dado fica "fresco" (não rebusca)
      // 1 minuto para todas as queries por padrão
      staleTime: 1000 * 60,

      // retry: quantas vezes tenta novamente em caso de erro
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/*
        QueryClientProvider torna o queryClient disponível
        para todos os componentes filhos via Context.
        Deve envolver BrowserRouter para que as queries
        funcionem dentro das rotas.
      */}
      <BrowserRouter>
        <App />
      </BrowserRouter>

      {/*
        DevTools — aparece como um botão flutuante na tela.
        Em produção (import.meta.env.PROD) é removido automaticamente.
      */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
```

### Camada de serviço — `src/services/api.ts`

> 🟡 **MOSTRAR PRONTO** — crie antes da aula. Explique que separar as chamadas HTTP dos componentes é boa prática.

```ts
// src/services/api.ts
// Centraliza todas as chamadas à API.
// Os componentes não fazem fetch diretamente — eles chamam funções daqui.

import { Instrutor } from '../types'

const BASE_URL = "http://localhost:3000"

// Função auxiliar — lida com erros de HTTP de forma consistente
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  if (!res.ok) {
    // Lança um erro com a mensagem do servidor se disponível
    let erro: { message?: string } = { message: "Erro desconhecido" }

    try {
      erro = await res.json()
    } catch {
      erro = { message: "Erro desconhecido" }
    }

    throw new Error(erro.message ?? `Erro HTTP ${res.status}`)
  }

  return res.json()
}

// ── Instrutores ───────────────────────────────────────────────────────

export async function buscarInstrutores(): Promise<Instrutor[]> {
  return apiFetch<Instrutor[]>("/instrutores")
}

export async function buscarInstrutor(id: string): Promise<Instrutor> {
  return apiFetch<Instrutor>(`/instrutores/${id}`)
}

// ── Agendamentos ──────────────────────────────────────────────────────

export interface DadosAgendamento {
  instrutorId: string
  nome: string
  telefone: string
  data: string
  horario: string
  observacoes?: string
}

export interface Agendamento extends DadosAgendamento {
  id: string
  criadoEm: string
}

export async function criarAgendamento(dados: DadosAgendamento): Promise<Agendamento> {
  return apiFetch<Agendamento>("/agendamentos", {
    method: "POST",
    body: JSON.stringify(dados),
  })
}

export async function buscarAgendamentos(): Promise<Agendamento[]> {
  return apiFetch<Agendamento[]>("/agendamentos")
}

// ── Favoritos ─────────────────────────────────────────────────────────

export async function favoritarInstrutor(id: string): Promise<void> {
  return apiFetch(`/favoritos/${id}`, { method: "POST" })
}

export async function desfavoritarInstrutor(id: string): Promise<void> {
  return apiFetch(`/favoritos/${id}`, { method: "DELETE" })
}
```

---

## 4. Backend local com json-server — pronto para a aula

> 🟡 **MOSTRAR PRONTO** — deixe isso preparado antes da aula para evitar perda de tempo com setup

### Passo 1 — instalar o json-server

Dentro do projeto React (onde está o `package.json`):

```bash
npm install -D json-server
```

### Passo 2 — criar o arquivo `db.json`

Crie `db.json` na raiz do projeto com dados iniciais para a demo:

```json
{
  "instrutores": [
    {
      "id": "1",
      "nome": "Ana Silva",
      "cidade": "Rio de Janeiro",
      "especialidade": "Reforço em Matemática",
      "preco": 120,
      "disponivel": true,
      "foto": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400"
    },
    {
      "id": "2",
      "nome": "Carlos Lima",
      "cidade": "São Paulo",
      "especialidade": "Programação Front-end",
      "preco": 150,
      "disponivel": false,
      "foto": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
    }
  ],
  "agendamentos": [],
  "favoritos": []
}
```

### Passo 3 — adicionar scripts no `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "api": "json-server --watch db.json --port 3000",
    "dev:full": "concurrently \"npm run dev\" \"npm run api\""
  }
}
```

Se ainda não tiver o `concurrently`:

```bash
npm install -D concurrently
```

### Passo 4 — subir backend e frontend

Em dois terminais separados:

```bash
npm run api
npm run dev
```

Ou tudo junto:

```bash
npm run dev:full
```

### Passo 5 — endpoints para mostrar em sala

```bash
GET    http://localhost:3000/instrutores
GET    http://localhost:3000/instrutores/1
POST   http://localhost:3000/agendamentos
GET    http://localhost:3000/agendamentos
POST   http://localhost:3000/favoritos
DELETE http://localhost:3000/favoritos/1
```

### Dica de demonstração rápida

1. Abra `http://localhost:3000/instrutores` no navegador e mostre os dados crus em JSON.
2. Faça um `POST` de teste no Insomnia/Postman para `agendamentos`.
3. Volte para o app React e mostre o `invalidateQueries` atualizando sem reload.

---

## 5. useQuery — buscando dados com cache automático

### Anatomia do useQuery

```tsx
const {
  data,        // os dados retornados — tipo inferido pelo TypeScript
  isLoading,   // true na PRIMEIRA carga (sem dados no cache ainda)
  isFetching,  // true SEMPRE que está buscando (inclusive refetch em background)
  isError,     // true se deu erro
  error,       // o objeto de erro
  refetch,     // função para forçar nova busca manualmente
} = useQuery({
  queryKey: ["instrutores"],           // identificador único no cache
  queryFn: buscarInstrutores,          // a função que faz o fetch
  staleTime: 1000 * 60 * 5,           // 5 minutos fresco (opcional, sobrescreve o global)
  enabled: true,                       // false = não busca até mudar para true
})
```

### A diferença entre `isLoading` e `isFetching`

```
isLoading = true   → primeira vez que busca, sem dado em cache
                     → mostrar skeleton/spinner grande

isFetching = true  → está buscando (pode ter dado antigo em cache)
                     → mostrar indicador sutil (ex: spinner pequeno no header)
                     → NÃO substitua o conteúdo existente por skeleton
```

---

### 🔴 DESENVOLVER AO VIVO — Parte 1: useQuery na listagem

**Contexto:** substituir o `useEffect + fetch` da `PaginaListagem` por `useQuery`.

**Etapa 1 — importar e usar o useQuery básico:**

```tsx
// src/pages/PaginaListagem.tsx
// Evolução da A5: dados mockados → API real com useQuery

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'       // ← novo
import { buscarInstrutores } from '../services/api'    // ← novo
import { Instrutor } from '../types'
import BarraFiltros from '../components/features/BarraFiltros'
import CardInstrutor from '../components/features/CardInstrutor'

function PaginaListagem() {
  const [busca, setBusca]   = useState<string>("")
  const [cidade, setCidade] = useState<string>("")

  // ANTES (A5): useEffect + useState + setLoading + setErro + setInstrutores
  // DEPOIS: uma linha substitui tudo isso
  const {
    data: instrutores = [],  // valor padrão [] evita undefined
    isLoading,
    isError,
    error,
  } = useQuery<Instrutor[]>({
    queryKey: ["instrutores"],
    queryFn: buscarInstrutores,
  })
```

**Etapa 2 — adicionar filtro com useMemo (igual à A5, só muda a fonte dos dados):**

```tsx
  const instrutoresFiltrados = useMemo(() =>
    instrutores.filter(i => {
      const buscaOk = busca === "" ||
        i.nome.toLowerCase().includes(busca.toLowerCase())
      const cidadeOk = cidade === "" || i.cidade === cidade
      return buscaOk && cidadeOk
    })
  , [instrutores, busca, cidade])
```

**Etapa 3 — renderização condicional:**

```tsx
  // isLoading = true apenas na primeira carga
  if (isLoading) {
    return <p className="text-center py-16 text-gray-500">Carregando...</p>
    // ← vamos substituir por Skeleton na próxima etapa
  }

  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">
          {error instanceof Error ? error.message : "Erro ao carregar instrutores"}
        </p>
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

**Pause aqui:** abra o React Query DevTools, navegue para outra página e volte. Mostre que os dados estão em cache — o GET não dispara de novo.

---

### 🔴 DESENVOLVER AO VIVO — Parte 2: useQuery no perfil individual

```tsx
// src/pages/PaginaPerfil.tsx
// Evolução da A5: dados do array mockado → useQuery por id

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { buscarInstrutor } from '../services/api'
import { Instrutor } from '../types'
import Badge from '../components/ui/Badge'
import Breadcrumb from '../components/ui/Breadcrumb'

function PaginaPerfil() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    data: instrutor,
    isLoading,
    isError,
  } = useQuery<Instrutor>({
    queryKey: ["instrutores", id],   // ← queryKey com id: rebusca quando id muda
    queryFn: () => buscarInstrutor(id!),
    enabled: !!id,                   // ← só busca se id existir
  })

  if (isLoading) return <p className="py-16 text-center text-gray-500">Carregando perfil...</p>

  if (isError || !instrutor) {
    return (
      <div className="flex flex-col items-center py-16 gap-4">
        <p className="text-2xl">😕</p>
        <h1 className="text-xl font-bold text-brand-purple">Instrutor não encontrado</h1>
        <Link to="/" className="text-brand-purple underline">Voltar para a listagem</Link>
      </div>
    )
  }

  const { nome, cidade, especialidade, preco, disponivel, foto } = instrutor

  return (
    <article>
      <Breadcrumb items={[
        { label: "Home", to: "/" },
        { label: "Instrutores", to: "/" },
        { label: nome },
      ]} />

      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-8">
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

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate(`/agendar/${id}`)}
            disabled={!disponivel}
            className="
              bg-brand-purple text-white font-semibold py-3 px-8 rounded-xl
              hover:bg-purple-800 transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
            "
            aria-label={disponivel ? `Agendar aula com ${nome}` : `${nome} indisponível`}
          >
            {disponivel ? "Agendar aula" : "Indisponível"}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="
              border-2 border-gray-200 text-gray-600 font-semibold py-3 px-8 rounded-xl
              hover:border-brand-purple hover:text-brand-purple transition-all
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

## 6. Skeleton de carregamento

> 🟡 **MOSTRAR PRONTO** — crie antes da aula, apenas apresente e substitua o `<p>Carregando...</p>`

### Por que skeleton em vez de spinner?

Um skeleton ocupa o mesmo espaço do conteúdo real — evita o "salto" de layout quando os dados chegam. É a experiência que grandes plataformas usam.

```tsx
// src/components/ui/SkeletonCard.tsx

function SkeletonCard() {
  return (
    /*
      animate-pulse = animação de pulso do Tailwind
      bg-gray-200 com rounded = formato do conteúdo real, sem dados
    */
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-100"
      aria-hidden="true"  // ← esconde do leitor de tela — não é conteúdo real
    >
      {/* Foto */}
      <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse self-center" />

      {/* Nome */}
      <div className="h-5 bg-gray-200 animate-pulse rounded-lg w-3/4" />

      {/* Cidade */}
      <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-1/2" />

      {/* Especialidade */}
      <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-2/3" />

      {/* Preço */}
      <div className="h-8 bg-gray-200 animate-pulse rounded-lg w-1/3" />

      {/* Botão */}
      <div className="h-10 bg-gray-200 animate-pulse rounded-xl mt-auto" />
    </div>
  )
}

export default SkeletonCard
```

```tsx
// Usando o SkeletonCard na PaginaListagem
// Substitua o if (isLoading) simples por:

if (isLoading) {
  return (
    <section>
      <h1 className="text-2xl font-bold text-brand-purple mb-6">
        Encontre seu instrutor
      </h1>
      {/*
        aria-label="Carregando instrutores" no grid:
        leitores de tela anunciam o loading sem ver os skeletons
      */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="Carregando instrutores..."
        aria-busy="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  )
}
```

---

## 7. useMutation — criando e modificando dados

### A diferença entre useQuery e useMutation

```
useQuery  → leitura  → dispara automaticamente → gerencia cache de leitura
useMutation → escrita → dispara manualmente     → você coordena o cache após a mutação
```

### Anatomia do useMutation

```tsx
const {
  mutate,       // função que dispara a mutação — chame com os dados
  mutateAsync,  // versão Promise — use com await dentro de try/catch
  isPending,    // true enquanto a requisição está em andamento
  isSuccess,    // true após sucesso
  isError,      // true se deu erro
  error,        // objeto de erro
  reset,        // reseta o estado da mutation para idle
} = useMutation({
  mutationFn: criarAgendamento,   // a função que faz o POST/PUT/DELETE
  onSuccess: (data) => { },       // callback de sucesso
  onError: (error) => { },        // callback de erro
  onSettled: () => { },           // roda sempre — sucesso ou erro
})
```

---

### 🔴 DESENVOLVER AO VIVO — useMutation no agendamento

**Contexto:** o formulário da A5 só simulava o envio com `setTimeout`. Agora vai chamar a API real.

**Etapa 1 — criar a mutation:**

```tsx
// src/pages/PaginaAgendamento.tsx
// Evolução da A5: setTimeout simulado → useMutation com API real

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'  // ← novo
import { criarAgendamento, DadosAgendamento } from '../services/api'  // ← novo
import { useQuery } from '@tanstack/react-query'
import { buscarInstrutor } from '../services/api'
import { Instrutor } from '../types'

function PaginaAgendamento() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()  // ← acesso ao cache global

  // Busca o instrutor para exibir o nome no formulário
  const { data: instrutor } = useQuery<Instrutor>({
    queryKey: ["instrutores", id],
    queryFn: () => buscarInstrutor(id!),
    enabled: !!id,
  })
```

**Etapa 2 — definir a mutation:**

```tsx
  const mutation = useMutation({
    mutationFn: criarAgendamento,

    onSuccess: () => {
      /*
        invalidateQueries marca a query de agendamentos como stale.
        Na próxima vez que PaginaMeuPerfil montar, vai rebuscar.
        Não precisa recarregar a página — o cache cuida disso.
      */
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] })

      // Redireciona para o perfil após sucesso
      // replace=true: botão "←" volta para o perfil, não para o formulário
      navigate(`/instrutores/${id}`, { replace: true })
    },

    onError: (erro: Error) => {
      console.error("Falha ao criar agendamento:", erro.message)
    },
  })
```

**Etapa 3 — conectar ao formulário:**

```tsx
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    data: "",
    horario: "",
    observacoes: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const dados: DadosAgendamento = {
      instrutorId: id!,
      ...form,
    }

    // Dispara a mutation com os dados do formulário
    mutation.mutate(dados)
  }

  if (!instrutor) return null

  return (
    <section>
      <h1 className="text-2xl font-bold text-brand-purple mb-6">
        Agendar com {instrutor.nome}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 max-w-lg"
      >
        {/* Campo nome */}
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="nome" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
            Seu nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            value={form.nome}
            onChange={handleChange}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
          />
        </div>

        {/* Campo data */}
        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="data" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
            Data
          </label>
          <input
            id="data"
            name="data"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            value={form.data}
            onChange={handleChange}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
          />
        </div>

        {/* Feedback de erro */}
        {mutation.isError && (
          <p className="text-red-600 text-sm mb-4" role="alert">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Erro ao criar agendamento. Tente novamente."}
          </p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            /*
              isPending = true enquanto o POST está em andamento.
              Desabilita o botão para evitar duplo envio.
              Muda o texto para feedback visual imediato.
            */
            disabled={mutation.isPending}
            className="
              flex-1 bg-brand-purple text-white font-semibold
              py-3 rounded-xl hover:bg-purple-800 transition-colors
              disabled:opacity-60 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
            "
          >
            {mutation.isPending ? "Enviando..." : "Confirmar agendamento"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={mutation.isPending}
            className="
              flex-1 border-2 border-gray-200 text-gray-600 font-semibold
              py-3 rounded-xl hover:border-brand-purple hover:text-brand-purple
              transition-all disabled:opacity-60
              focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2
            "
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  )
}

export default PaginaAgendamento
```

---

## 8. staleTime e invalidateQueries — coordenando o cache

> 🟡 **MOSTRAR PRONTO** — explique a teoria com o diagrama, depois aplique no código já escrito

### staleTime — quanto tempo o dado fica "fresco"

```tsx
// Global: todas as queries ficam frescas por 1 minuto
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 }
  }
})

// Local: apenas essa query fica fresca por 5 minutos
useQuery({
  queryKey: ["instrutores"],
  queryFn: buscarInstrutores,
  staleTime: 1000 * 60 * 5,  // 5 minutos — lista não muda com frequência
})

// Para dados que mudam muito frequentemente:
useQuery({
  queryKey: ["disponibilidade", instrutorId],
  queryFn: () => buscarDisponibilidade(instrutorId),
  staleTime: 0,  // sempre stale — rebusca a cada montagem
})
```

### invalidateQueries — forçando atualização do cache

```tsx
const queryClient = useQueryClient()

// Invalida UMA query específica
queryClient.invalidateQueries({ queryKey: ["agendamentos"] })

// Invalida TODAS as queries que começam com "instrutores"
// Útil quando um agendamento muda a disponibilidade do instrutor
queryClient.invalidateQueries({ queryKey: ["instrutores"] })

// Invalida várias queries de uma vez (no onSuccess do agendamento)
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["agendamentos"] })
  queryClient.invalidateQueries({ queryKey: ["instrutores"] })
  // Ambas as páginas vão rebuscar na próxima visita
}
```

### Diagrama visual do invalidateQueries

```
Usuário cria agendamento
         ↓
useMutation.onSuccess() dispara
         ↓
queryClient.invalidateQueries(["agendamentos"])
         ↓
Cache de "agendamentos" marcado como STALE
         ↓
Se PaginaMeuPerfil estiver montada: refetch automático imediato
Se PaginaMeuPerfil não estiver montada: refetch quando montar
         ↓
Usuário navega para /meu-perfil
         ↓
useQuery detecta dado STALE → dispara fetch automaticamente
         ↓
Lista de agendamentos atualizada sem reload
```

---

## 9. React Query DevTools

> 🟡 **MOSTRAR PRONTO** — já configurado no `main.tsx`. Demonstre ao vivo após o primeiro useQuery funcionar.

### O que você pode ver nas DevTools

```
No painel das DevTools, cada query aparece com:

  Estado:
  ┌─ fresh    → verde  — dado recente, não vai rebuscar
  ├─ stale    → amarelo — dado pode estar desatualizado
  ├─ fetching → azul   — requisição em andamento
  └─ inactive → cinza  — nenhum componente usando

  Informações:
  ├─ queryKey       → identificador do dado no cache
  ├─ data           → o dado em cache (clique para inspecionar)
  ├─ dataUpdatedAt  → timestamp da última atualização
  ├─ observers      → quantos componentes estão usando
  └─ actions        → refetch manual, invalidar, resetar
```

### Roteiro de demonstração ao vivo

```
1. Abra o painel (clique no ícone 🌸 no canto inferior)
2. Mostre a query "instrutores" em estado "fresh"
3. Navegue para uma página de perfil → nova query "instrutores, 1"
4. Volte para a home → mostre que "instrutores" ainda está em cache
5. Espere o staleTime expirar → veja mudar para "stale"
6. Clique em "refetch" manualmente no painel
7. Mostre o dado atualizando sem recarregar a página
```

---

## 10. Error Boundaries com react-error-boundary

> 🔴 **DESENVOLVER AO VIVO** — construa ao vivo, depois simule a queda da API para demonstrar

### O problema sem Error Boundary

Quando um erro não tratado ocorre durante a renderização do React, o app inteiro quebra com uma **tela branca**. O usuário não vê nada — nenhuma mensagem, nenhum botão de tentar novamente.

```
API offline → useQuery lança erro → componente não trata → tela branca 💥
```

### O que é um Error Boundary

Um Error Boundary é um componente React que **captura erros de renderização** dos seus filhos e exibe uma UI de fallback em vez da tela branca.

```bash
npm install react-error-boundary
```

**Etapa 1 — criar o componente de fallback:**

```tsx
// src/components/ui/ErroFallback.tsx
// 🟡 MOSTRAR PRONTO — crie antes da aula

import { FallbackProps } from 'react-error-boundary'

/*
  FallbackProps vem da lib react-error-boundary.
  Ela injeta automaticamente:
  - error: o erro que foi capturado
  - resetErrorBoundary: função para tentar novamente
*/
function ErroFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center px-4"
      role="alert"   // ← aria: anuncia ao leitor de tela como alerta
    >
      <p className="text-5xl">😕</p>

      <h2 className="text-xl font-bold text-brand-purple">
        Algo deu errado
      </h2>

      <p className="text-gray-500 text-sm max-w-md">
        {error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado. Tente novamente."}
      </p>

      <button
        onClick={resetErrorBoundary}
        className="
          bg-brand-purple text-white font-semibold
          py-2 px-6 rounded-xl
          hover:bg-purple-800 transition-colors
          focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
        "
      >
        Tentar novamente
      </button>
    </div>
  )
}

export default ErroFallback
```

**Etapa 2 — aplicar o ErrorBoundary nas páginas:**

```tsx
// src/components/layout/Layout.tsx
// Evolução da A5: adicionar ErrorBoundary envolvendo o Outlet

import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'  // ← novo
import Header from './Header'
import ErroFallback from '../ui/ErroFallback'

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header totalDisponiveis={0} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
        {/*
          ErrorBoundary envolve o Outlet — captura erros de qualquer página.
          FallbackComponent: o que mostrar quando ocorre um erro.
          onReset: chamado quando o usuário clica "Tentar novamente" —
                   o React Query vai rebuscar os dados.
        */}
        <ErrorBoundary FallbackComponent={ErroFallback}>
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer className="bg-brand-purple text-white text-center py-4 text-sm">
        <p>© 2024 DiretoFácil</p>
      </footer>
    </div>
  )
}

export default Layout
```

**Etapa 3 — integrar com React Query:**

```tsx
// Para que o React Query lance erros para o ErrorBoundary capturar,
// adicione throwOnError nas queries críticas:

const { data: instrutores = [] } = useQuery<Instrutor[]>({
  queryKey: ["instrutores"],
  queryFn: buscarInstrutores,
  throwOnError: true,  // ← lança o erro para o ErrorBoundary capturar
})

// Sem throwOnError: o erro fica em isError → você trata no componente (UI inline)
// Com throwOnError: o erro sobe para o ErrorBoundary → UI de fallback de página
//
// Use throwOnError para erros fatais (API fora do ar).
// Use isError para erros esperados (formulário inválido, item não encontrado).
```

**Demonstração ao vivo:**
```
1. Com o app funcionando normalmente, pare o servidor da API
2. Recarregue a página — o ErrorBoundary captura o erro
3. A tela de fallback aparece com "Tentar novamente"
4. Suba o servidor novamente
5. Clique "Tentar novamente" — o React Query rebusca e a tela volta ao normal
```

---

## 11. Código Completo da Aula — DiretoFácil Sprint 6

### O que mudou em relação à A5

```
A5 → A6: evolução arquivo a arquivo

main.tsx          → adicionado QueryClientProvider + DevTools
src/services/     → novo diretório com api.ts
PaginaListagem    → useEffect + mock → useQuery + API real + SkeletonCard
PaginaPerfil      → array.find() → useQuery por id
PaginaAgendamento → setTimeout → useMutation com invalidateQueries
Layout            → adicionado ErrorBoundary envolvendo o Outlet
src/components/ui → novos: SkeletonCard.tsx, ErroFallback.tsx
```

### Estrutura de pastas ao final da aula

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          ← atualizado — ErrorBoundary
│   │   └── Header.tsx          ← da A5
│   ├── ui/
│   │   ├── Badge.tsx           ← da A4
│   │   ├── Breadcrumb.tsx      ← da A5
│   │   ├── Lista.tsx           ← da A3
│   │   ├── SkeletonCard.tsx    ← novo
│   │   └── ErroFallback.tsx    ← novo
│   └── features/
│       ├── CardInstrutor.tsx   ← da A5
│       └── BarraFiltros.tsx    ← da A4
├── pages/
│   ├── PaginaListagem.tsx      ← atualizado — useQuery
│   ├── PaginaPerfil.tsx        ← atualizado — useQuery
│   ├── PaginaAgendamento.tsx   ← atualizado — useMutation
│   ├── PaginaMeuPerfil.tsx     ← da A5 (exercício)
│   └── Pagina404.tsx           ← da A5
├── services/
│   └── api.ts                  ← novo
├── types/
│   └── index.ts                ← da A3
├── App.tsx                     ← da A5
└── main.tsx                    ← atualizado — QueryClientProvider
```

---

## 12. Exercício em Sala

### 🏗️ DiretoFácil — Sprint 6

**Em grupos · 40 minutos**

**Requisitos obrigatórios:**

1. Implementar `useQuery` na `PaginaMeuPerfil` para carregar os agendamentos do usuário vindos da API:
   ```tsx
   const { data: agendamentos = [], isLoading } = useQuery({
     queryKey: ["agendamentos"],
     queryFn: buscarAgendamentos,
   })
   ```

2. Criar o botão **"Favoritar instrutor"** no `CardInstrutor` com `useMutation`:
   - Ao clicar, chama `favoritarInstrutor(id)` da camada de serviço
   - O ícone muda visualmente enquanto `isPending` é true
   - No `onSuccess`, invalida a query `["instrutores"]`

3. Configurar `staleTime` de **5 minutos** especificamente para a query `["instrutores"]` na `PaginaListagem`:
   ```tsx
   useQuery({
     queryKey: ["instrutores"],
     queryFn: buscarInstrutores,
     staleTime: 1000 * 60 * 5,
   })
   ```

4. Adicionar um `<ErrorBoundary>` específico na `PaginaPerfil` com uma mensagem diferente do global:
   ```tsx
   // FallbackComponent customizado só para o perfil
   function ErroPerfilFallback({ resetErrorBoundary }: FallbackProps) {
     return (
       <div>
         <p>Não foi possível carregar este perfil.</p>
         <button onClick={resetErrorBoundary}>Tentar novamente</button>
         <Link to="/">Ver outros instrutores</Link>
       </div>
     )
   }
   ```

**Bonus:**

5. Implementar paginação na listagem — a `queryKey` muda conforme a página, o React Query trata cada página como um cache separado:
   ```tsx
   const [pagina, setPagina] = useState(1)

   const { data } = useQuery({
     queryKey: ["instrutores", { pagina }],  // ← pagina na queryKey
     queryFn: () => buscarInstrutores(pagina),
   })
   ```

---

## 13. Resumo dos Conceitos

| Conceito | Como funciona | Quando usar |
|---|---|---|
| `QueryClient` | Gerenciador central do cache — criado uma vez fora dos componentes | `main.tsx` — instância única da aplicação |
| `QueryClientProvider` | Disponibiliza o `QueryClient` via Context | Envolve toda a aplicação no `main.tsx` |
| `queryKey` | Array que identifica o dado no cache | Toda `useQuery` — do geral para o específico |
| `useQuery` | Busca dados com cache, loading e erro automáticos | Toda leitura de dados de uma API |
| `isLoading` | `true` só na **primeira** carga sem cache | Mostrar skeleton/spinner grande |
| `isFetching` | `true` em qualquer busca, inclusive refetch | Mostrar indicador sutil em background |
| `staleTime` | Tempo que o dado fica "fresco" antes de rebuscar | Dados que não mudam com frequência — liste em minutos |
| `useMutation` | Executa POST/PUT/DELETE manualmente | Toda escrita de dados — formulários, ações |
| `isPending` | `true` enquanto a mutation está em andamento | Desabilitar botão, mudar texto para "Enviando..." |
| `invalidateQueries` | Marca cache como stale → rebusca automático | `onSuccess` da mutation — sincroniza UI com servidor |
| `throwOnError` | Lança o erro para o ErrorBoundary capturar | Erros fatais — API offline, autenticação |
| `ErrorBoundary` | Captura erros de renderização dos filhos | Envolve páginas ou seções críticas no Layout |
| `FallbackComponent` | UI exibida quando ErrorBoundary captura erro | Sempre junto com `ErrorBoundary` |
| `ReactQueryDevtools` | Painel de inspeção do cache em tempo real | Desenvolvimento — removido automaticamente em produção |

---

### 🔗 O que vem na A7

Na próxima aula o formulário de agendamento ganha validação real. Hoje ele aceita datas no passado e campos em branco — na A7 o **React Hook Form** elimina os re-renders desnecessários e o **Zod** garante que dados inválidos nunca cheguem à API. Além disso, o estado do usuário logado — que hoje é passado via props por vários níveis — vai ser centralizado com **Zustand**.

---

> **Dúvidas?**
> - [TanStack Query — documentação oficial](https://tanstack.com/query/latest)
> - [TanStack Query — guia de queryKey](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
> - [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
> - [Tailwind — animate-pulse](https://tailwindcss.com/docs/animation#pulse)