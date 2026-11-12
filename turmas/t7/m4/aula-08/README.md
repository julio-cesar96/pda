# 🏛️ A8: Custom Hooks + SOLID + Arquitetura Web
### Guia de Live Coding — DiretoFácil | Programadores do Amanhã

> **Para o instrutor:** este material conduz a aula sem improvisação. Cada seção tem contexto, decisão arquitetural, código e pergunta estratégica. Siga a ordem — a narrativa de evolução é o que dá sentido à aula.
>
> **Como ler este documento:**
> - 🟡 **CÓDIGO PRONTO** — prepare antes, apenas apresente e discuta
> - 🔴 **CONSTRUIR AO VIVO** — etapas curtas, foco no raciocínio
> - 💬 **PERGUNTA PARA A TURMA** — pause, deixe a turma responder, só então avance
> - ⚠️ **TRADE-OFF** — explique o custo da decisão, não só o benefício

---

## Índice

1. [Diagnóstico — o código que herdamos da A7](#1-diagnóstico--o-código-que-herdamos-da-a7)
2. [A regra de ouro da separação](#2-a-regra-de-ouro-da-separação)
3. [Etapa 1 — Identificando as violações](#3-etapa-1--identificando-as-violações)
4. [Etapa 2 — Extraindo Custom Hooks](#4-etapa-2--extraindo-custom-hooks)
5. [Etapa 3 — useDebounce: hook de infraestrutura](#5-etapa-3--usedebounce-hook-de-infraestrutura)
6. [Etapa 4 — Single Responsibility nos componentes](#6-etapa-4--single-responsibility-nos-componentes)
7. [Etapa 5 — Compound Components pattern](#7-etapa-5--compound-components-pattern)
8. [Etapa 6 — SPA vs SSR vs SSG](#8-etapa-6--spa-vs-ssr-vs-ssg)
9. [Etapa 7 — Próximos passos no ecossistema](#9-etapa-7--próximos-passos-no-ecossistema)
10. [Antes vs Depois — comparação final](#10-antes-vs-depois--comparação-final)
11. [Sprint Final — Revisão Cruzada](#11-sprint-final--revisão-cruzada)
12. [Resumo Arquitetural](#12-resumo-arquitetural)

---

## 1. Diagnóstico — o código que herdamos da A7

> 🟡 **CÓDIGO PRONTO** — abra os arquivos reais do projeto. Não explique ainda. Apenas mostre e faça a pergunta.

### Abra o `CardInstrutor.tsx` ao vivo

```
💬 "Alguém consegue descrever em uma frase o que esse componente faz?"
```

O que a turma vai encontrar:

```tsx
// src/components/features/CardInstrutor.tsx — estado atual (A7)
// Este componente acumula SETE responsabilidades diferentes:

function CardInstrutor({ instrutor, variant }: CardInstrutorProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // 1. Busca estado de autenticação
  const usuario = useAuthStore(state => state.usuario)

  // 2. Gerencia estado local de favorito
  const [favoritado, setFavoritado] = useState(false)

  // 3. Faz mutação na API
  const mutation = useMutation({
    mutationFn: favoritarInstrutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instrutores"] })
      setFavoritado(prev => !prev)
    },
  })

  // 4. Formata moeda
  const precoFormatado = `R$ ${instrutor.preco.toFixed(2)}`

  // 5. Decide variante visual
  const variantFinal = variant ?? (instrutor.disponivel ? "disponivel" : "padrao")

  // 6. Lida com navegação
  function handleAgendar() {
    if (!usuario) { navigate("/login"); return }
    navigate(`/agendar/${instrutor.id}`)
  }

  // 7. Renderiza JSX com 80+ linhas de markup
  return (
    <article className={cardVariants({ variant: variantFinal })}>
      {/* 80 linhas de JSX misturadas com toda a lógica acima */}
    </article>
  )
}
```

```
💬 "Se a rota /agendar mudar para /booking amanhã,
    quantos arquivos você precisa alterar?"

💬 "Se você quiser reutilizar esse card em um contexto
    onde não há autenticação — o que acontece?"

💬 "Como você testaria isoladamente a lógica de favoritar
    sem montar o componente inteiro?"
```

*Essas três perguntas definem os três problemas que vamos resolver hoje.*

### Abra a `PaginaListagem.tsx` e a `PaginaPerfil.tsx` lado a lado

```tsx
// PaginaListagem.tsx — linhas 8 a 18
const {
  data: instrutores = [],
  isLoading,
  isError,
} = useQuery<Instrutor[]>({
  queryKey: ["instrutores"],
  queryFn: buscarInstrutores,
  staleTime: 1000 * 60 * 5,
})
```

```tsx
// PaginaPerfil.tsx — linhas 12 a 20
const {
  data: instrutor,
  isLoading,
  isError,
} = useQuery<Instrutor>({
  queryKey: ["instrutores", id],
  queryFn: () => buscarInstrutor(id!),
  enabled: !!id,
})
```

```tsx
// Layout.tsx — linhas 5 a 12 (para o contador do Header)
const { data: instrutores = [] } = useQuery<Instrutor[]>({
  queryKey: ["instrutores"],
  queryFn: buscarInstrutores,
  staleTime: 1000 * 60 * 5,  // ← configuração duplicada
})
```

```
💬 "Se a equipe de back-end renomear o endpoint /instrutores
    para /professores, o que acontece com o projeto atual?"

Resposta: três arquivos precisam mudar.
Com Custom Hooks: um arquivo.
```

### O inventário completo dos problemas

```
PROBLEMAS IDENTIFICADOS NO PROJETO APÓS A7:

CardInstrutor.tsx (~200 linhas):
  ❌ Busca estado de auth (deveria ser responsabilidade de quem usa)
  ❌ Gerencia estado de favorito (lógica de dados em componente de UI)
  ❌ Faz mutação na API (acesso a dados em componente de UI)
  ❌ Contém regra de navegação (roteamento em componente de apresentação)
  ❌ Formata dados (lógica de apresentação misturada com lógica de dados)

PaginaListagem.tsx:
  ❌ useQuery de instrutores duplicado (também em Layout e PaginaPerfil)
  ❌ Lógica de filtro inline (difícil de testar e reutilizar)
  ❌ staleTime hardcoded em três lugares

PaginaAgendamento.tsx:
  ❌ useMutation + navigate + invalidateQueries no mesmo lugar
  ❌ Onboarding de novo dev: 3 libs para entender antes de tocar o form
```

---

## 2. A regra de ouro da separação

> 🟡 **CÓDIGO PRONTO** — diagrama conceitual. Apresente antes de qualquer refatoração.

```
REGRA: componente responde "O QUÊ mostrar"
       custom hook responde "COMO obter/mudar os dados"

┌──────────────────────────────────────────────────────────────────┐
│                    CAMADAS DO PROJETO                            │
├──────────────────┬───────────────────────┬───────────────────────┤
│   Apresentação   │   Lógica de domínio   │   Acesso a dados      │
├──────────────────┼───────────────────────┼───────────────────────┤
│ CardInstrutor    │ useInstrutores        │ services/api.ts       │
│ BarraFiltros     │ useFavoritos          │ queryKeys.ts          │
│ PaginaListagem   │ useAgendamento        │                       │
│                  │ useDebounce           │                       │
├──────────────────┼───────────────────────┼───────────────────────┤
│ Só JSX e         │ React Query +         │ fetch / axios         │
│ interações       │ Zustand +             │ Endpoints             │
│ de UI            │ navegação             │ Tipos da API          │
└──────────────────┴───────────────────────┴───────────────────────┘

Fluxo:
  Componente → chama hook → hook chama service → service chama API
  Componente NÃO chama service diretamente
  Componente NÃO chama useQuery diretamente (exceto casos simples)
```

### Centralizando as queryKeys

> 🟡 **CÓDIGO PRONTO** — crie antes da aula. Pequeno mas importante.

```ts
// src/lib/queryKeys.ts
// Fonte única de verdade para todas as queryKeys do projeto.
// Se o endpoint mudar, só este arquivo muda.

export const queryKeys = {
  instrutores: {
    all:    ["instrutores"]              as const,
    detail: (id: string) => ["instrutores", id] as const,
  },
  agendamentos: {
    all:    ["agendamentos"]             as const,
    byUser: (userId: string) => ["agendamentos", "user", userId] as const,
  },
  favoritos: {
    all:    ["favoritos"]                as const,
  },
} as const
```

```tsx
// Uso em qualquer lugar do projeto
import { queryKeys } from '../lib/queryKeys'

useQuery({ queryKey: queryKeys.instrutores.all, ... })
useQuery({ queryKey: queryKeys.instrutores.detail(id), ... })
queryClient.invalidateQueries({ queryKey: queryKeys.instrutores.all })
```

⚠️ **TRADE-OFF:** um arquivo a mais para manter. Compensa quando o projeto tem 10+ queries. Para projetos pequenos, pode ser over-engineering.

```
💬 "Qual o problema de ter a string 'instrutores'
    espalhada em 8 arquivos diferentes?"

Resposta: ela não é verificada pelo TypeScript. Você pode errar
o nome e a query nunca vai funcionar — sem nenhum aviso.
```

---

## 3. Etapa 1 — Identificando as violações

> 🟡 **CÓDIGO PRONTO** — mostre o `CardInstrutor` atual com anotações dos problemas. Não refatore ainda.

### Single Responsibility Principle no React

SRP não significa "um arquivo por função". Significa que **um módulo deve ter apenas um motivo para mudar**.

```tsx
// CardInstrutor hoje tem QUATRO motivos para mudar:

// Motivo 1: o design do card muda (responsabilidade de UI)
// Motivo 2: a lógica de favoritar muda (responsabilidade de dados)
// Motivo 3: a regra de autenticação muda (responsabilidade de auth)
// Motivo 4: a rota de agendamento muda (responsabilidade de roteamento)

// Um componente com 4 motivos para mudar vai ser modificado 4x mais
// do que deveria — e cada modificação pode quebrar as outras 3.
```

### Open/Closed Principle no React

```tsx
// Fechado para modificação, aberto para extensão.

// ❌ Violação: para adicionar uma nova variante de card,
//    você modifica o componente existente:
function CardInstrutor({ tipo }: { tipo: "normal" | "destaque" | "novo-tipo" }) {
  if (tipo === "normal") return <div>...</div>
  if (tipo === "destaque") return <div>...</div>
  if (tipo === "novo-tipo") return <div>...</div>  // ← modifica o componente
}

// ✅ Correto: extensão via Compound Components (Etapa 5)
// O pai compõe sem modificar o componente filho
<Card>
  <Card.Header foto={foto} nome={nome} />
  <Card.Body especialidade={especialidade} preco={preco} />
  <Card.Actions instrutorId={id} disponivel={disponivel} />
</Card>
```

### Dependency Inversion no React

```tsx
// ❌ Componente depende diretamente da implementação (API):
function CardInstrutor({ instrutor }) {
  const mutation = useMutation({ mutationFn: favoritarInstrutor }) // ← acoplado
  // Se trocar de API, este componente muda
}

// ✅ Componente depende de abstração (hook):
function CardInstrutor({ instrutor }) {
  const { favoritar, isFavoritado } = useFavoritos(instrutor.id) // ← desacoplado
  // Se trocar de API, só o hook muda — o componente não sabe
}
```

---

## 4. Etapa 2 — Extraindo Custom Hooks

### O que qualifica um Custom Hook para extração

```
Extraia quando:
  ✅ A mesma lógica de Hook aparece em 2+ componentes
  ✅ Um componente mistura lógica de dados com lógica de UI
  ✅ Você quer testar a lógica sem montar o componente
  ✅ A lógica tem múltiplas etapas (fetch → transformar → derivar estado)

NÃO extraia quando:
  ❌ O hook seria usado em um único lugar e não simplifica nada
  ❌ Seria apenas um wrapper de 3 linhas sem lógica real
  ❌ Criar o hook aumentaria a indireção sem benefício mensurável
```

---

### 🔴 CONSTRUIR AO VIVO — `useInstrutores`

**Objetivo:** encapsular toda a lógica de busca, cache e filtragem de instrutores.

**Antes de digitar:**
```
💬 "O que o useInstrutores precisa receber como parâmetro
    para ser realmente reutilizável?
    Pense em: listagem com filtros vs perfil individual
    vs contador no header."
```

**Etapa 1 — hook para a lista com filtros:**

```tsx
// src/hooks/useInstrutores.ts

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { queryKeys } from '../lib/queryKeys'
import { buscarInstrutores } from '../services/api'
import { Instrutor } from '../types'

interface FiltrosInstrutores {
  busca?: string
  cidade?: string
}

interface UseInstrutoresReturn {
  instrutores: Instrutor[]
  instrutoresFiltrados: Instrutor[]
  totalDisponiveis: number
  isLoading: boolean
  isError: boolean
  error: Error | null
}

export function useInstrutores(filtros: FiltrosInstrutores = {}): UseInstrutoresReturn {
  const { busca = "", cidade = "" } = filtros

  const { data: instrutores = [], isLoading, isError, error } = useQuery<Instrutor[], Error>({
    queryKey: queryKeys.instrutores.all,
    queryFn: buscarInstrutores,
    staleTime: 1000 * 60 * 5,
  })

  // useMemo aqui: lógica de filtragem é derivada — não é estado
  const instrutoresFiltrados = useMemo(() =>
    instrutores.filter(i => {
      const buscaOk = !busca || i.nome.toLowerCase().includes(busca.toLowerCase())
      const cidadeOk = !cidade || i.cidade === cidade
      return buscaOk && cidadeOk
    })
  , [instrutores, busca, cidade])

  const totalDisponiveis = useMemo(
    () => instrutores.filter(i => i.disponivel).length,
    [instrutores]
  )

  return { instrutores, instrutoresFiltrados, totalDisponiveis, isLoading, isError, error }
}
```

**Etapa 2 — hook para um único instrutor:**

```tsx
// Adicionar ao mesmo arquivo src/hooks/useInstrutores.ts

import { buscarInstrutor } from '../services/api'

export function useInstrutor(id: string | undefined) {
  return useQuery<Instrutor, Error>({
    queryKey: queryKeys.instrutores.detail(id!),
    queryFn: () => buscarInstrutor(id!),
    enabled: !!id,  // só busca se id existir
  })
}
```

**Resultado — PaginaListagem antes vs depois:**

```tsx
// ANTES — 20 linhas de lógica de dados no componente
function PaginaListagem() {
  const [busca, setBusca] = useState("")
  const [cidade, setCidade] = useState("")
  const { data: instrutores = [], isLoading, isError } = useQuery({
    queryKey: ["instrutores"],
    queryFn: buscarInstrutores,
    staleTime: 1000 * 60 * 5,
  })
  const instrutoresFiltrados = useMemo(() =>
    instrutores.filter(i => {
      const buscaOk = !busca || i.nome.toLowerCase().includes(busca.toLowerCase())
      const cidadeOk = !cidade || i.cidade === cidade
      return buscaOk && cidadeOk
    })
  , [instrutores, busca, cidade])
  const totalDisponiveis = useMemo(
    () => instrutores.filter(i => i.disponivel).length,
    [instrutores]
  )
  // ... mais 60 linhas de JSX
}

// DEPOIS — componente só fala de UI
function PaginaListagem() {
  const [busca, setBusca] = useState("")
  const [cidade, setCidade] = useState("")
  const { instrutoresFiltrados, isLoading, isError } = useInstrutores({ busca, cidade })
  // ... JSX apenas
}
```

⚠️ **TRADE-OFF:** o hook cria uma camada de indireção. Um dev novo precisa abrir dois arquivos em vez de um para entender o fluxo. Compensa quando a lógica tem complexidade real — como aqui, com filtros, memoização e configuração de cache.

---

### 🔴 CONSTRUIR AO VIVO — `useFavoritos`

**Objetivo:** encapsular estado de favorito + mutation + invalidação.

```
💬 "O estado de favoritado deve viver no hook ou no componente?
    O que acontece se o usuário favoritar na listagem e depois
    abrir o perfil — o ícone deve estar marcado?"

Resposta: depende do requisito. Se favoritos vêm da API
(persistidos), o estado vive no React Query. Se é só local
à sessão, pode ser Zustand ou useState no hook.
Neste caso: API persiste, React Query é a fonte da verdade.
```

```tsx
// src/hooks/useFavoritos.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../lib/queryKeys'
import { favoritarInstrutor, desfavoritarInstrutor, buscarFavoritos } from '../services/api'

export function useFavoritos(instrutorId: string) {
  const queryClient = useQueryClient()

  // Busca a lista de favoritos do usuário
  const { data: favoritos = [] } = useQuery({
    queryKey: queryKeys.favoritos.all,
    queryFn: buscarFavoritos,
  })

  // Deriva o estado de favoritado a partir da lista
  // Não há useState aqui — a fonte da verdade é o servidor
  const isFavoritado = favoritos.includes(instrutorId)

  const mutation = useMutation({
    mutationFn: () =>
      isFavoritado
        ? desfavoritarInstrutor(instrutorId)
        : favoritarInstrutor(instrutorId),
    onMutate: async () => {
      // Atualização otimista: muda a UI antes da resposta da API
      await queryClient.cancelQueries({ queryKey: queryKeys.favoritos.all })
      const anterior = queryClient.getQueryData<string[]>(queryKeys.favoritos.all)
      queryClient.setQueryData<string[]>(
        queryKeys.favoritos.all,
        prev => isFavoritado
          ? (prev ?? []).filter(id => id !== instrutorId)
          : [...(prev ?? []), instrutorId]
      )
      return { anterior }  // snapshot para rollback
    },
    onError: (_err, _vars, context) => {
      // Rollback se a API falhar
      if (context?.anterior) {
        queryClient.setQueryData(queryKeys.favoritos.all, context.anterior)
      }
    },
    onSettled: () => {
      // Sempre revalida — garante consistência com o servidor
      queryClient.invalidateQueries({ queryKey: queryKeys.favoritos.all })
    },
  })

  return {
    isFavoritado,
    favoritar: mutation.mutate,
    isPending: mutation.isPending,
  }
}
```

```
💬 "O que é a atualização otimista e por que ela melhora a UX?"

Resposta: a UI muda imediatamente, sem esperar a API.
Se a API falhar, revertemos. O usuário sente que a ação
foi instantânea — mesmo em conexões lentas.
```

⚠️ **TRADE-OFF:** atualização otimista adiciona complexidade (cancelamento, snapshot, rollback). Só vale a pena para ações frequentes onde o feedback imediato é importante — como favoritar, curtir, marcar como lido.

---

### 🔴 CONSTRUIR AO VIVO — `useAgendamento`

**Objetivo:** encapsular a mutation de agendamento, invalidação e navegação pós-submit.

```
💬 "A lógica de navegação após o submit deveria estar
    no hook ou no componente? Qual o argumento para cada lado?"

Argumento para o hook: o hook sabe exatamente quando o submit
foi bem-sucedido — é coesão com a lógica de dados.

Argumento para o componente: navegação é comportamento de UI.
O hook seria responsável por algo além do seu domínio.

Decisão: o hook recebe uma callback onSuccess —
quem chama decide o que fazer depois.
```

```tsx
// src/hooks/useAgendamento.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../lib/queryKeys'
import { criarAgendamento, DadosAgendamento } from '../services/api'

interface UseAgendamentoOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useAgendamento({ onSuccess, onError }: UseAgendamentoOptions = {}) {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: criarAgendamento,
    onSuccess: () => {
      // Invalidação de cache: responsabilidade do hook
      queryClient.invalidateQueries({ queryKey: queryKeys.agendamentos.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.instrutores.all })
      // Navegação: responsabilidade de quem chama
      onSuccess?.()
    },
    onError: (err: Error) => {
      onError?.(err)
    },
  })

  function agendar(dados: DadosAgendamento) {
    mutate(dados)
  }

  return { agendar, isPending, isError, error }
}
```

```tsx
// PaginaAgendamento.tsx — depois da extração do hook
function PaginaAgendamento() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { agendar, isPending, isError, error } = useAgendamento({
    // Navegação é decisão do componente — o hook não sabe para onde ir
    onSuccess: () => navigate(`/instrutores/${id}`, { replace: true }),
  })

  const { register, handleSubmit, formState } = useForm<AgendamentoSchema>({
    resolver: zodResolver(agendamentoSchema),
  })

  function onSubmit(dados: AgendamentoSchema) {
    agendar({ instrutorId: id!, ...dados })
  }

  // JSX apenas — zero lógica de dados aqui
}
```

---

## 5. Etapa 3 — useDebounce: hook de infraestrutura

> 🔴 **CONSTRUIR AO VIVO** — hook curto, alto impacto didático

### O problema sem debounce

```tsx
// Sem debounce: cada tecla dispara o filtro
// Se os filtros fossem direto para a API, cada tecla seria uma requisição

function PaginaListagem() {
  const [busca, setBusca] = useState("")

  // Cada tecla → setState → re-render → useMemo recalcula → filtra
  // Para 1000 instrutores: 1000 comparações de string por tecla
  const { instrutoresFiltrados } = useInstrutores({ busca })

  return <input onChange={e => setBusca(e.target.value)} />
}
```

### Construindo o hook

```tsx
// src/hooks/useDebounce.ts

import { useState, useEffect } from 'react'

// T é genérico — funciona com string, number, objetos
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Agenda a atualização para daqui a `delay` ms
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup: cancela o timer se value mudar antes do delay
    // Isso é o "debounce" — só executa se value ficou estável
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

```tsx
// Usando na PaginaListagem
function PaginaListagem() {
  const [busca, setBusca] = useState("")
  const buscaDebounced = useDebounce(busca, 300)

  // useInstrutores só recalcula depois que o usuário para de digitar
  const { instrutoresFiltrados } = useInstrutores({ busca: buscaDebounced })

  return (
    <input
      value={busca}             // input reage imediatamente (UX)
      onChange={e => setBusca(e.target.value)}
    />
    // instrutoresFiltrados atualiza 300ms depois (performance)
  )
}
```

⚠️ **TRADE-OFF:** debounce de 300ms cria um atraso perceptível. Para filtros client-side onde a performance não é problema, debounce pode ser desnecessário. Reserve para chamadas de API, filtros com grande volume de dados ou operações custosas.

```
💬 "Qual a diferença entre debounce e throttle?
    Quando você usaria cada um?"

Debounce: executa só depois que o valor para de mudar.
  → Busca, validação inline, resize handler

Throttle: executa no máximo uma vez por intervalo.
  → Scroll handler, mouse move, game loop
```

---

## 6. Etapa 4 — Single Responsibility nos componentes

> 🟡 **CÓDIGO PRONTO** — mostre a versão atual do CardInstrutor. Anote as responsabilidades ao lado.

### O CardInstrutor após extração dos hooks

```tsx
// src/components/features/CardInstrutor.tsx
// DEPOIS da extração dos hooks — mas ANTES do Compound Components
// Agora tem apenas 2 responsabilidades: renderizar e coordenar UI

import { Link, useNavigate } from 'react-router-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { useAuthStore } from '../../stores/authStore'
import { useFavoritos } from '../../hooks/useFavoritos'
import Badge from '../ui/Badge'
import { Instrutor } from '../../types'

const cardVariants = cva(
  ["bg-white rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200"],
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
  const navigate  = useNavigate()
  const usuario   = useAuthStore(state => state.usuario)
  const { isFavoritado, favoritar, isPending } = useFavoritos(instrutor.id)

  const variantFinal = variant ?? (instrutor.disponivel ? "disponivel" : "padrao")

  function handleAgendar() {
    if (!usuario) { navigate("/login"); return }
    navigate(`/agendar/${instrutor.id}`)
  }

  return (
    <article className={cardVariants({ variant: variantFinal })}>

      <div className="flex justify-between items-start">
        <img
          src={instrutor.foto}
          alt={`Foto de perfil de ${instrutor.nome}`}
          className="w-20 h-20 rounded-full object-cover border-4 border-brand-yellow"
        />
        <button
          onClick={() => favoritar()}
          disabled={isPending}
          aria-label={isFavoritado ? `Desfavoritar ${instrutor.nome}` : `Favoritar ${instrutor.nome}`}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {isFavoritado ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-brand-purple">{instrutor.nome}</h3>
        <p className="text-sm text-gray-500"><span aria-hidden="true">📍 </span>{instrutor.cidade}</p>
        <p className="text-sm text-gray-600 italic">{instrutor.especialidade}</p>
        <p className="text-2xl font-bold text-brand-purple">
          R$ {instrutor.preco.toFixed(2)}
          <span className="text-sm font-normal text-gray-400">/hora</span>
        </p>
      </div>

      {instrutor.disponivel
        ? <Badge variant="disponivel">✅ Disponível hoje</Badge>
        : <Badge variant="ocupado">🔴 Indisponível</Badge>
      }

      <div className="flex gap-2 mt-auto">
        <Link
          to={`/instrutores/${instrutor.id}`}
          className="flex-1 text-center border-2 border-brand-purple text-brand-purple font-semibold py-2 rounded-xl hover:bg-brand-purple hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
        >
          Ver perfil
        </Link>
        <button
          onClick={handleAgendar}
          disabled={!instrutor.disponivel}
          aria-label={instrutor.disponivel ? `Agendar com ${instrutor.nome}` : `${instrutor.nome} indisponível`}
          className="flex-1 bg-brand-purple text-white font-semibold py-2 rounded-xl hover:bg-purple-800 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
        >
          Agendar
        </button>
      </div>

    </article>
  )
}

export default CardInstrutor
```

Este já é melhor. Mas ainda tem um problema sutil:

```
💬 "Se você precisar usar este card em um contexto admin,
    onde o botão 'Agendar' não existe mas existe um botão 'Editar',
    o que você faria?"

Opção A: adicionar prop 'modo': "aluno" | "admin" — prop drilling disfarçado
Opção B: extrair as ações como configuração — aumenta a API do componente
Opção C: Compound Components — o pai decide a composição

Opção C resolve o problema sem modificar o componente.
```

---

## 7. Etapa 5 — Compound Components pattern

### O que são Compound Components

Compound Components é um padrão onde um componente é dividido em partes menores que trabalham juntas, mas podem ser compostas de formas diferentes pelo componente pai.

É o padrão usado por `<select>/<option>`, `<table>/<tr>/<td>`, e por todas as grandes bibliotecas: shadcn/ui, Radix UI, Headless UI.

```tsx
// Antes: um componente monolítico que faz tudo
<CardInstrutor instrutor={i} />
// O que está dentro? Não sei sem abrir o arquivo.

// Depois: composição explícita
<Card>
  <Card.Header instrutor={i} />
  <Card.Body instrutor={i} />
  <Card.Actions instrutorId={i.id} disponivel={i.disponivel} />
</Card>
// O que está dentro? Está na cara. Legível e modificável.
```

### Como funciona tecnicamente

```tsx
// O componente pai é uma função + namespace de sub-componentes
// Sub-componentes são propriedades da função principal

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <article className={/* classes */}>{children}</article>
)

Card.Header  = CardHeader   // sub-componente Header
Card.Body    = CardBody     // sub-componente Body
Card.Actions = CardActions  // sub-componente Actions

export default Card
// Importado como: import Card from './Card'
// Usado como: <Card>, <Card.Header>, <Card.Body>, <Card.Actions>
```

---

### 🔴 CONSTRUIR AO VIVO — Compound Components no Card

**Objetivo:** refatorar o `CardInstrutor` para o padrão Compound Components.

**Antes de começar:**
```
💬 "Qual a diferença entre passar uma prop 'modo' para controlar
    o que aparece no card, versus deixar o pai decidir a composição?"

Prop 'modo': o componente cresce a cada nova variação.
             O componente precisa saber de todos os contextos onde é usado.
Composição: o componente não precisa mudar.
            Cada contexto compõe como precisa.
```

**Etapa 1 — criar o arquivo com a estrutura de namespace:**

```tsx
// src/components/ui/Card.tsx — componente base + sub-componentes

import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

// ── Variantes do container ────────────────────────────────────────────

const cardContainerVariants = cva(
  ["bg-white rounded-2xl flex flex-col transition-all duration-200",
   "focus-within:ring-2 focus-within:ring-brand-yellow focus-within:ring-offset-2"],
  {
    variants: {
      variant: {
        default:    "p-6 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1",
        disponivel: "p-6 border-2 border-green-400 shadow-md hover:shadow-green-200 hover:-translate-y-1",
        destaque:   "p-6 border-2 border-brand-yellow shadow-md hover:shadow-yellow-200 hover:-translate-y-1",
        flat:       "p-4 border border-gray-100",
      },
      gap: {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
      },
    },
    defaultVariants: { variant: "default", gap: "md" },
  }
)

// ── Tipos ─────────────────────────────────────────────────────────────

interface CardRootProps extends VariantProps<typeof cardContainerVariants> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType   // permite trocar <article> por <div>, <li>, etc.
}

// ── Card.Root ─────────────────────────────────────────────────────────

function CardRoot({ children, variant, gap, className, as: Tag = "article" }: CardRootProps) {
  return (
    <Tag className={cardContainerVariants({ variant, gap, className })}>
      {children}
    </Tag>
  )
}
```

**Etapa 2 — sub-componente Header:**

```tsx
// Continua em src/components/ui/Card.tsx

interface CardHeaderProps {
  foto: string
  nome: string
  onFavoritar?: () => void
  isFavoritado?: boolean
  isFavoritandoPending?: boolean
}

function CardHeader({ foto, nome, onFavoritar, isFavoritado, isFavoritandoPending }: CardHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <img
        src={foto}
        alt={`Foto de perfil de ${nome}`}
        className="w-20 h-20 rounded-full object-cover border-4 border-brand-yellow"
      />
      {onFavoritar && (
        <button
          onClick={onFavoritar}
          disabled={isFavoritandoPending}
          aria-label={isFavoritado ? `Desfavoritar ${nome}` : `Favoritar ${nome}`}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {isFavoritado ? "❤️" : "🤍"}
        </button>
      )}
    </div>
  )
}
```

**Etapa 3 — sub-componente Body:**

```tsx
import Badge from './Badge'

interface CardBodyProps {
  nome: string
  cidade: string
  especialidade: string
  preco: number
  disponivel: boolean
}

function CardBody({ nome, cidade, especialidade, preco, disponivel }: CardBodyProps) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-brand-purple">{nome}</h3>
        <p className="text-sm text-gray-500">
          <span aria-hidden="true">📍 </span>{cidade}
        </p>
        <p className="text-sm text-gray-600 italic">{especialidade}</p>
        <p className="text-2xl font-bold text-brand-purple">
          R$ {preco.toFixed(2)}
          <span className="text-sm font-normal text-gray-400">/hora</span>
        </p>
      </div>
      {disponivel
        ? <Badge variant="disponivel">✅ Disponível hoje</Badge>
        : <Badge variant="ocupado">🔴 Indisponível</Badge>
      }
    </>
  )
}
```

**Etapa 4 — sub-componente Actions:**

```tsx
import { Link } from 'react-router-dom'

interface CardActionsProps {
  instrutorId: string
  disponivel: boolean
  onAgendar: () => void
}

function CardActions({ instrutorId, disponivel, onAgendar }: CardActionsProps) {
  return (
    <div className="flex gap-2 mt-auto">
      <Link
        to={`/instrutores/${instrutorId}`}
        className="flex-1 text-center border-2 border-brand-purple text-brand-purple font-semibold py-2 rounded-xl hover:bg-brand-purple hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
      >
        Ver perfil
      </Link>
      <button
        onClick={onAgendar}
        disabled={!disponivel}
        aria-label={disponivel ? "Agendar aula" : "Instrutor indisponível"}
        className="flex-1 bg-brand-purple text-white font-semibold py-2 rounded-xl hover:bg-purple-800 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
      >
        Agendar
      </button>
    </div>
  )
}
```

**Etapa 5 — montar o namespace:**

```tsx
// Final do arquivo src/components/ui/Card.tsx

const Card = Object.assign(CardRoot, {
  Header:  CardHeader,
  Body:    CardBody,
  Actions: CardActions,
})

export default Card

// Também exportar os tipos para uso externo
export type { CardRootProps, CardHeaderProps, CardBodyProps, CardActionsProps }
```

**Etapa 6 — `CardInstrutor` final usando o Compound Component:**

```tsx
// src/components/features/CardInstrutor.tsx — versão final
// Este componente agora tem UMA responsabilidade:
// orquestrar os sub-componentes do Card para o domínio de Instrutor

import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useFavoritos } from '../../hooks/useFavoritos'
import Card from '../ui/Card'
import { Instrutor } from '../../types'

interface CardInstrutorProps {
  instrutor: Instrutor
}

function CardInstrutor({ instrutor }: CardInstrutorProps) {
  const navigate  = useNavigate()
  const usuario   = useAuthStore(state => state.usuario)
  const { isFavoritado, favoritar, isPending } = useFavoritos(instrutor.id)

  const variant = instrutor.disponivel ? "disponivel" : "default"

  function handleAgendar() {
    if (!usuario) { navigate("/login"); return }
    navigate(`/agendar/${instrutor.id}`)
  }

  return (
    <Card variant={variant}>
      <Card.Header
        foto={instrutor.foto}
        nome={instrutor.nome}
        onFavoritar={favoritar}
        isFavoritado={isFavoritado}
        isFavoritandoPending={isPending}
      />
      <Card.Body
        nome={instrutor.nome}
        cidade={instrutor.cidade}
        especialidade={instrutor.especialidade}
        preco={instrutor.preco}
        disponivel={instrutor.disponivel}
      />
      <Card.Actions
        instrutorId={instrutor.id}
        disponivel={instrutor.disponivel}
        onAgendar={handleAgendar}
      />
    </Card>
  )
}

export default CardInstrutor
```

### O mesmo `Card` em contexto diferente — sem modificar nada

```tsx
// Card no painel admin — composição diferente, componente igual
<Card variant="flat" as="li">
  <Card.Header foto={instrutor.foto} nome={instrutor.nome} />
  <Card.Body
    nome={instrutor.nome}
    cidade={instrutor.cidade}
    especialidade={instrutor.especialidade}
    preco={instrutor.preco}
    disponivel={instrutor.disponivel}
  />
  {/* Sem Card.Actions — admin não agenda */}
  <div className="mt-auto flex gap-2">
    <button onClick={() => navigate(`/admin/instrutores/${instrutor.id}/editar`)}>
      Editar
    </button>
    <button onClick={() => handleDesativar(instrutor.id)}>
      Desativar
    </button>
  </div>
</Card>

// O componente Card não precisou mudar para suportar este caso.
```

⚠️ **TRADE-OFF:** Compound Components aumentam a verbosidade no ponto de uso — `<CardInstrutor>` se torna 4 linhas em vez de 1. O ganho é flexibilidade real: qualquer combinação de sub-componentes é possível sem modificar o componente base. Compensa quando o componente tem múltiplas variações de composição em contextos diferentes.

```
💬 "Qual a diferença entre passar props para controlar
    o que aparece, versus compor com sub-componentes?
    Pense em manutenibilidade a longo prazo."

Controle via props: o componente cresce com cada nova necessidade.
Em 6 meses: CardInstrutor com 15 props booleanas.

Composição: o componente não muda. O contexto decide.
Em 6 meses: ainda 0 props booleanas.
```

---

## 8. Etapa 6 — SPA vs SSR vs SSG

> 🟡 **CÓDIGO PRONTO** — diagrama + decisão arquitetural. Não há código para digitar.

### O DiretoFácil como SPA — o que construímos

```
O que é uma SPA (Single Page Application):

  Servidor serve: index.html + bundle JS (uma vez)
  Depois disso:   React controla tudo no browser
                  URLs gerenciadas pela History API (A5)
                  Dados buscados via fetch (A6)

Vantagens:
  ✅ Transições instantâneas entre páginas
  ✅ Estado persiste entre navegações
  ✅ Experiência próxima de app nativo
  ✅ Back-end agnóstico (qualquer API)

Limitações:
  ❌ SEO: crawlers veem HTML vazio antes do JS executar
  ❌ First Contentful Paint mais lento (precisa baixar e executar o JS)
  ❌ Não funciona bem sem JavaScript habilitado
```

### SSR — o que é e quando usar

```
SSR (Server-Side Rendering) com Next.js:

  Cada requisição:
    → servidor executa o React
    → gera HTML completo
    → envia para o browser

  Vantagens vs SPA:
    ✅ SEO: crawlers recebem HTML completo com conteúdo
    ✅ Menor Time to First Byte (TTFB) em conexões lentas
    ✅ Funciona sem JavaScript (conteúdo estático acessível)

  Custo:
    ❌ Servidor precisa processar cada requisição
    ❌ Maior complexidade de infraestrutura
    ❌ Algumas libs client-only precisam de adaptação

  Use quando:
    → A listagem de instrutores precisa aparecer no Google
    → SEO é requisito de negócio
    → Audiência inclui usuários com conexão lenta
```

### SSG — geração estática

```
SSG (Static Site Generation):

  Em build time:
    → React gera todos os HTMLs possíveis
    → Arquivos estáticos servidos por CDN

  Vantagens:
    ✅ Performance máxima — sem servidor, sem processamento
    ✅ Barato — CDN é mais barato que servidor com compute
    ✅ SEO perfeito

  Custo:
    ❌ Dados precisam ser conhecidos em build time
    ❌ Conteúdo dinâmico exige rebuild ou ISR
    ❌ Build lento para sites muito grandes

  Use quando:
    → Landing pages, blogs, documentação
    → Dados mudam pouco (diariamente ou menos)
```

### Onde o DiretoFácil se encaixa

```
CENÁRIO ATUAL (SPA):
  Plataforma privada (login requerido para agendamento)
  Lista de instrutores não precisa de SEO para funcionar
  → SPA é suficiente ✅

CENÁRIO COM CRESCIMENTO:
  "Encontre instrutores em São Paulo" precisa aparecer no Google
  → SSR com Next.js App Router seria a evolução natural

  Custo da migração:
    → Hooks client-only (useAuthStore, useFavoritos) precisariam de
      separação clara de "server components" e "client components"
    → A arquitetura que fizemos hoje (hooks separados da UI) torna
      essa migração mais fácil — componentes desacoplados migram melhor
```

```
💬 "A arquitetura que aplicamos hoje (hooks separados da UI)
    facilita ou dificulta uma eventual migração para Next.js?
    Por quê?"

Resposta: facilita muito. Componentes que só renderizam JSX
são facilmente transformados em Server Components.
Hooks que encapsulam lógica client-side ficam em Client Components.
A separação já está feita.
```

---

## 9. Etapa 7 — Próximos passos no ecossistema

> 🟡 **CÓDIGO PRONTO** — slides motivacionais. Mostre o que a turma já sabe vs o que o mercado pede.

### O que você sabe fazer hoje

```
✅ React com TypeScript — componentes, props, renderização
✅ Hooks — useState, useEffect, useRef, useMemo, Custom Hooks
✅ React Query — useQuery, useMutation, cache, invalidação
✅ React Router — rotas, parâmetros, navegação, layouts
✅ React Hook Form + Zod — formulários tipados com validação
✅ Zustand — estado global com selectors
✅ Tailwind + cva — estilização com variantes
✅ Acessibilidade — ARIA, semântica, navegação por teclado
✅ Arquitetura — Custom Hooks, SOLID, Compound Components
```

### O que o mercado pede em 2024

```
Vagas de Front-End Pleno/Sênior (levantamento real):

  React + TypeScript          → ✅ você tem
  React Query / SWR           → ✅ você tem
  Testes unitários (Vitest)   → próximo passo
  Next.js                     → próximo passo (base sólida para aprender)
  Storybook                   → próximo passo
  CI/CD básico                → próximo passo
```

### Os três próximos passos reais

```tsx
// 1. VITEST + REACT TESTING LIBRARY
// Testando um Custom Hook isoladamente — sem montar componente

import { renderHook } from '@testing-library/react'
import { useDebounce } from '../hooks/useDebounce'

test('deve retornar o valor após o delay', async () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 300),
    { initialProps: { value: "inicial" } }
  )

  expect(result.current).toBe("inicial")

  rerender({ value: "atualizado" })

  // Ainda não mudou — debounce ainda não disparou
  expect(result.current).toBe("inicial")

  await new Promise(r => setTimeout(r, 300))

  // Agora mudou
  expect(result.current).toBe("atualizado")
})
```

```tsx
// 2. NEXT.JS — a mesma lógica, nova camada
// Quase tudo que você aprendeu funciona no Next.js
// A diferença está em Server Components e Client Components

// Client Component — mesmo que você já sabe
"use client"
import { useInstrutores } from '@/hooks/useInstrutores'

export default function PaginaListagem() {
  const { instrutoresFiltrados } = useInstrutores()
  return <div>...</div>
}

// Server Component — novo conceito, busca dados no servidor
// SEM hooks, SEM estado, roda no servidor
export default async function PaginaListagemServer() {
  const instrutores = await buscarInstrutores() // fetch direto, no servidor
  return <div>...</div>
}
```

---

## 10. Antes vs Depois — comparação final

> 🟡 **CÓDIGO PRONTO** — exiba lado a lado. O contraste visual é o argumento.

### CardInstrutor: 7 responsabilidades → 1

```
ANTES (200 linhas, 7 responsabilidades):
  - Gerencia auth (useAuthStore)
  - Gerencia favorito (useState + useMutation)
  - Gerencia navegação (useNavigate)
  - Formata dados (preco.toFixed)
  - Decide variante visual (variant ?? disponivel)
  - Lida com erro da mutation
  - Renderiza JSX

DEPOIS (40 linhas, 1 responsabilidade):
  - Orquestra sub-componentes do Card para o domínio de Instrutor

  Lógica de dados → useInstrutores, useFavoritos, useAgendamento
  Lógica de UI    → Card.Header, Card.Body, Card.Actions
  Lógica de auth  → useAuthStore (consumido pelo hook)
```

### Métricas do projeto

```
                    ANTES (A7)    DEPOIS (A8)
CardInstrutor        ~200 linhas   ~40 linhas
PaginaListagem        ~90 linhas   ~45 linhas
PaginaAgendamento    ~120 linhas   ~60 linhas

Arquivos de hook          0             4
Arquivos de service       1             1 (sem mudança)
queryKeys duplicadas      3             0 (centralizado)

Componentes reutilizáveis:
  CardInstrutor em admin?   ❌ modificar    ✅ compor
  Card em outro contexto?   ❌ copiar       ✅ reutilizar
```

### Testabilidade

```tsx
// ANTES — para testar a lógica de favoritar:
// era necessário montar CardInstrutor inteiro + mocks de:
// - React Router (useNavigate)
// - Zustand (useAuthStore)
// - React Query (useMutation, useQueryClient)
// - API (favoritarInstrutor)
// - Todos os sub-componentes (Badge, Link, etc.)

// DEPOIS — para testar useFavoritos:
const { result } = renderHook(() => useFavoritos("instrutor-1"), { wrapper })
await act(() => result.current.favoritar())
expect(result.current.isFavoritado).toBe(true)
// Componente não precisa ser montado.
```

---

## 11. Sprint Final — Revisão Cruzada

### 🏗️ DiretoFácil — Sprint Final

**Metodologia:** cada grupo analisa o projeto de outro grupo — não o próprio.

**Em grupos trocados · 35 minutos**

**Critérios de análise:**

```
1. SINGLE RESPONSIBILITY (5 min por componente)
   Abra qualquer componente de feature.
   Consiga descrever em UMA frase o que ele faz?
   Se não: identifique as responsabilidades extras.
   Proponha: o que poderia ser extraído para um hook?

2. DUPLICAÇÃO DE LÓGICA (5 min)
   Procure por useQuery, useMutation ou useState duplicados.
   Quantas vezes a mesma queryKey aparece?
   Proposta de custom hook: escreva a assinatura (não implementa).

3. ACESSIBILIDADE (5 min)
   Rode axe DevTools no projeto.
   Liste os 3 problemas mais críticos encontrados.

4. RELATÓRIO (10 min)
   Prepare apresentação de 5 minutos com:
   - 2 componentes candidatos a refatoração (SRP)
   - 2 trechos candidatos a custom hook
   - 1 melhoria de acessibilidade prioritária
```

**Bonus — implementar `useDebounce` e medir:**

```tsx
// Adicione ao projeto analisado (com permissão do grupo dono):
// 1. Crie src/hooks/useDebounce.ts (código da aula)
// 2. Aplique na BarraFiltros do projeto
// 3. Abra React Query DevTools e compare:
//    - Sem debounce: quantas queries por busca?
//    - Com debounce: quantas queries por busca?
// 4. Registre a diferença no relatório
```

---

## 12. Resumo Arquitetural

### Mapa de decisões do módulo completo

```
DECISÃO                           FERRAMENTA         AULA
─────────────────────────────────────────────────────────────
Estrutura de componentes          JSX + Props         A1
Reatividade e ciclo de vida       Hooks               A2
Segurança de tipos                TypeScript          A3
Estilização e variantes           Tailwind + cva      A4
Navegação entre páginas           React Router        A5
Dados do servidor                 React Query         A6
Dados de formulário               React Hook Form     A7
Dados globais de UI               Zustand             A7
Reutilização de lógica            Custom Hooks        A8
Composição de componentes         Compound Components A8
Arquitetura de pastas             SOLID               A8
```

### Decisões arquiteturais desta aula

| Decisão | Alternativa descartada | Por que a escolha |
|---|---|---|
| `queryKeys` centralizado | Strings inline | TypeScript verifica, um lugar para mudar |
| Custom Hooks por domínio | `useQuery` nos componentes | Testável, reutilizável, desacoplado |
| Callback `onSuccess` no hook | Navegação dentro do hook | Hook não conhece contexto de UI |
| Atualização otimista em `useFavoritos` | Esperar resposta da API | UX imediata, rollback em caso de erro |
| Compound Components no Card | Props booleanas | Extensível sem modificar o componente base |
| `queryKeys.ts` como `const` | Objetos simples | TypeScript infere o tipo literal das strings |

### O que não fazer — erros comuns

```tsx
// ❌ Hook que sabe demais sobre UI
function useInstrutores() {
  const navigate = useNavigate()  // hook não deve navegar
  const { tema } = useTema()      // hook não deve conhecer tema
  // ...
}

// ❌ Componente que chama service diretamente
function CardInstrutor() {
  const { data } = useQuery({ queryFn: buscarInstrutores })  // ok
  const res = await fetch("/instrutores")                     // não — use service
}

// ❌ Compound Component com estado compartilhado implícito via Context
// (pattern válido, mas adiciona complexidade — evite para começar)
const CardContext = createContext()
function Card({ children }) {
  const [aberto, setAberto] = useState(false)
  return <CardContext.Provider value={{ aberto, setAberto }}>{children}</CardContext.Provider>
}

// ✅ Compound Component simples — sub-componentes independentes
// Nenhum estado compartilhado entre pai e filhos via Context
function Card({ children }) {
  return <article>{children}</article>
}
```

---

### 🔗 O módulo está completo

```
Do componente estático ao sistema com arquitetura de produção:

A1 → Componentes e props
A2 → Reatividade com Hooks
A3 → Segurança com TypeScript
A4 → Identidade visual com Tailwind
A5 → Navegação com React Router
A6 → Dados reais com React Query
A7 → Formulários e estado global
A8 → Arquitetura, Custom Hooks e padrões

O que foi construído:
  ✅ Plataforma full stack conectada à API que vocês criaram
  ✅ TypeScript em toda a base de código
  ✅ Cache coordenado com React Query
  ✅ Formulários com validação robusta
  ✅ Estado global sem prop drilling
  ✅ Arquitetura com Custom Hooks e Compound Components
  ✅ Acessibilidade auditada
  ✅ Pronto para o portfólio
```

---

> **Referências técnicas**
> - [React — Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
> - [Patterns.dev — Compound Components](https://www.patterns.dev/react/compound-pattern)
> - [TanStack Query — Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
> - [Next.js — App Router](https://nextjs.org/docs/app)
> - [Vitest + RTL](https://vitest.dev)
> - [Kent C. Dodds — Inversion of Control](https://kentcdodds.com/blog/inversion-of-control)