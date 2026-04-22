# 📐 A7: Forms + Gerenciamento de Estado

## Índice

1. [Onde estamos — o diagnóstico da A6](#1-onde-estamos--o-diagnóstico-da-a6)
2. [Os três tipos de estado](#2-os-três-tipos-de-estado)
3. [Etapa 1 — O problema: formulário com useState puro](#3-etapa-1--o-problema-formulário-com-usestate-puro)
4. [Etapa 2 — React Hook Form: performance e controle](#4-etapa-2--react-hook-form-performance-e-controle)
5. [Etapa 3 — Zod: validação com tipagem inferida](#5-etapa-3--zod-validação-com-tipagem-inferida)
6. [Etapa 4 — Integrando RHF + Zod + React Query](#6-etapa-4--integrando-rhf--zod--react-query)
7. [Etapa 5 — O problema de estado global: prop drilling](#7-etapa-5--o-problema-de-estado-global-prop-drilling)
8. [Etapa 6 — Context API: primeira solução e seus limites](#8-etapa-6--context-api-primeira-solução-e-seus-limites)
9. [Etapa 7 — Zustand: solução final com selectors](#9-etapa-7--zustand-solução-final-com-selectors)
10. [Slide de referência — Quando usar cada estado](#10-slide-de-referência--quando-usar-cada-estado)
11. [Código Completo da Aula — DiretoFácil Sprint 7](#11-código-completo-da-aula--diretofácil-sprint-7)
12. [Exercício em Sala](#12-exercício-em-sala)
13. [Resumo dos Conceitos](#13-resumo-dos-conceitos)

---

## 1. Onde estamos — o diagnóstico da A6

Ao final da A6, o DiretoFácil tinha:

```
✅ Rotas funcionando (A5)
✅ API real com React Query (A6)
✅ Cards estilizados com Tailwind e cva (A4)
✅ TypeScript em todo o projeto (A3)

❌ Formulário de agendamento aceita datas no passado
❌ Formulário aceita campos em branco — POST chega vazio na API
❌ Re-render a cada tecla digitada (formulário com useState)
❌ Usuário logado passado via props por 5 níveis de componentes
❌ Nenhum feedback de validação antes do submit
```

> 💬 **PERGUNTA PARA A TURMA:** "No formulário atual, o que acontece se alguém enviar um agendamento para ontem? Quem na aplicação impede isso hoje?"
>
> *Resposta esperada: ninguém. O formulário envia, a API recebe, o agendamento é criado com data inválida. O problema está na ausência de validação no cliente.*

Hoje resolvemos os dois problemas independentes que existem no projeto:

1. **Form state**: o formulário não valida, causa re-renders desnecessários e acopla dados com UI
2. **Client state**: o usuário logado vive em `useState` local e é passado via props para baixo — prop drilling

---

## 2. Os três tipos de estado

Antes de escrever qualquer código, precisamos entender **onde cada tipo de dado deve viver**. Esta é a decisão arquitetural mais importante da aula.

```
┌─────────────────────────────────────────────────────────────────┐
│                    TIPOS DE ESTADO                              │
├───────────────────┬─────────────────────┬───────────────────────┤
│   Form State      │   Client State      │   Server State        │
├───────────────────┼─────────────────────┼───────────────────────┤
│ Dados do formulá- │ Estado da UI que    │ Dados que vêm da API  │
│ rio enquanto o    │ persiste entre      │ e precisam de cache,  │
│ usuário preenche  │ páginas             │ sincronização e       │
│                   │                     │ invalidação           │
├───────────────────┼─────────────────────┼───────────────────────┤
│ nome, data,       │ usuário logado,     │ lista de instrutores, │
│ telefone, erros   │ tema, preferências  │ agendamentos, perfis  │
│ de validação      │ do usuário          │                       │
├───────────────────┼─────────────────────┼───────────────────────┤
│ React Hook Form   │ Zustand / Context   │ React Query           │
└───────────────────┴─────────────────────┴───────────────────────┘
```

> 💬 **PERGUNTA PARA A TURMA:** "O valor digitado no campo 'nome' do formulário é server state, client state ou form state? E o usuário logado? E a lista de instrutores que veio da API?"
>
> *Objetivo: fazer a turma nomear cada tipo antes de ver a ferramenta. Quem acerta a classificação aprende a ferramenta mais rápido.*

### O erro mais comum: misturar os três

```tsx
// ❌ Arquitetura confusa — tudo no mesmo lugar
function PaginaAgendamento() {
  // Form state no useState → causa re-render a cada tecla
  const [nome, setNome]       = useState("")
  const [data, setData]       = useState("")
  const [erro, setErro]       = useState<string | null>(null)

  // Client state via prop drilling ← vem de 5 níveis acima
  // Server state no mesmo componente que o form
  const { data: instrutor }   = useQuery(...)

  // Regras de validação misturadas com lógica de UI
  function handleSubmit(e) {
    e.preventDefault()
    if (!nome) { setErro("Nome obrigatório"); return }
    if (new Date(data) < new Date()) { setErro("Data no passado"); return }
    // ...
  }
}
```

```tsx
// ✅ Arquitetura correta — cada estado no lugar certo
function PaginaAgendamento() {
  // Form state → React Hook Form
  const { register, handleSubmit, formState } = useForm<AgendamentoSchema>({
    resolver: zodResolver(agendamentoSchema)
  })

  // Client state → Zustand (sem prop drilling)
  const usuario = useAuthStore(state => state.usuario)

  // Server state → React Query (sem useEffect manual)
  const { data: instrutor } = useQuery({ queryKey: ["instrutores", id], ... })
  const mutation = useMutation({ mutationFn: criarAgendamento, ... })
}
```

---

## 3. Etapa 1 — O problema: formulário com useState puro

> 🟡 **CÓDIGO PRONTO** — mostre este código ao vivo no editor, não precisa digitar. O objetivo é identificar os problemas, não implementar.

### O formulário atual (A6)

```tsx
// src/pages/PaginaAgendamento.tsx — versão da A6
// Este é o estado atual do projeto. Leia e identifique os problemas.

function PaginaAgendamento() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    data: "",
    horario: "",
    observacoes: "",
  })

  // ❌ Problema 1: re-render a cada tecla
  // Cada setForm re-renderiza o componente inteiro — incluindo todos os campos
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // ❌ Problema 2: validação manual e frágil
  // Regras de negócio misturadas com handlers de UI
  // Fácil de esquecer um caso — e TypeScript não ajuda aqui
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.nome.trim()) { alert("Nome obrigatório"); return }
    if (!form.data)        { alert("Data obrigatória"); return }
    // E a data no passado? Não tem verificação. Bug em produção.
    mutation.mutate(form)
  }

  // ❌ Problema 3: estado duplicado
  // O mesmo dado existe no useState do form E vai para a API
  // Se a API retornar um erro de validação, o form não sabe como exibir
}
```

### Demonstração ao vivo dos re-renders

```tsx
// Abra o React DevTools → Components → ative "Highlight updates"
// Comece a digitar no campo "nome" do formulário atual
// Observe: cada tecla faz TODO o componente piscar em verde
// Isso significa re-render completo — incluindo campos que não mudaram
```

> 💬 **PERGUNTA PARA A TURMA:** "Se o formulário tivesse 20 campos e um componente pesado de calendário dentro dele, o que aconteceria a cada tecla digitada no campo 'nome'?"
>
> *Resposta: o calendário inteiro re-renderizaria a cada tecla. Em mobile isso seria perceptível como lentidão.*

---

## 4. Etapa 2 — React Hook Form: performance e controle

### Por que o React Hook Form é mais performático

O React Hook Form trabalha com **inputs não controlados por padrão** — ele não guarda o valor de cada campo no estado React. Em vez disso, usa referências (`ref`) para acessar os valores do DOM diretamente no momento do submit.

```
useState (controlado):
  Usuário digita "J"
       ↓
  setNome("J") → React re-renderiza o componente
  Usuário digita "Jo"
       ↓
  setNome("Jo") → React re-renderiza o componente
  ... uma re-renderização por tecla

React Hook Form (não controlado por padrão):
  Usuário digita "João Silva"
       ↓
  O DOM guarda o valor internamente (nenhum estado React mudou)
  Usuário clica em "Enviar"
       ↓
  RHF lê os valores do DOM → valida → chama handleSubmit
  ... zero re-renders durante a digitação
```

### Anatomia do useForm

```tsx
const {
  register,       // conecta um input ao RHF
  handleSubmit,   // wrapper que valida antes de chamar sua função
  formState,      // { errors, isSubmitting, isDirty, isValid, ... }
  watch,          // observa o valor de um campo em tempo real
  setValue,       // define o valor de um campo programaticamente
  reset,          // reseta o formulário para os valores iniciais
  getValues,      // lê todos os valores sem causar re-render
} = useForm<MeuTipo>({
  resolver: zodResolver(meuSchema),  // integração com Zod
  defaultValues: {                   // valores iniciais
    nome: "",
    data: "",
  },
  mode: "onBlur",  // quando validar: "onBlur" | "onChange" | "onSubmit"
})
```

### O `register` — conectando inputs ao RHF

```tsx
// register retorna: { name, ref, onChange, onBlur }
// Esses atributos conectam o input ao sistema interno do RHF

<input {...register("nome")} />

// É equivalente a:
<input
  name="nome"
  ref={refDoRHF}
  onChange={handlerDoRHF}
  onBlur={handlerDoRHF}
/>

// ⚠️ IMPORTANTE: não misture register com value/onChange controlado
// ❌ Errado:
<input {...register("nome")} value={form.nome} onChange={handleChange} />
// ✅ Correto:
<input {...register("nome")} />
```

### Quando usar `Controller`

`Controller` é necessário apenas para **componentes de UI que não expõem `ref`** nativamente — como selects customizados, date pickers de bibliotecas externas, ou componentes que precisam de `value`/`onChange` controlado.

```tsx
import { Controller } from 'react-hook-form'

// ✅ Use Controller para componentes externos sem ref nativo
<Controller
  name="cidade"
  control={control}
  render={({ field }) => (
    <SelectCidadeCustomizado
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>

// ✅ Para inputs HTML nativos: use register, não Controller
<input {...register("nome")} />   // mais simples, mais performático
<select {...register("cidade")} /> // funciona com register também
```

> 💬 **PERGUNTA PARA A TURMA:** "Se o React Hook Form usa refs e não useState, como ele sabe quando exibir as mensagens de erro? O que precisa causar um re-render para mostrar o erro?"
>
> *Resposta: as mensagens de erro ficam em `formState.errors`, que é um objeto React. Quando a validação roda e encontra erros, esse objeto muda — aí sim ocorre um re-render, mas apenas para exibir os erros, não durante a digitação.*

---

### 🔴 CONSTRUIR AO VIVO — Parte 1: RHF básico no formulário

**Contexto:** substituir o `useState` do formulário de agendamento por `useForm`.

**Antes de começar:** abra o React DevTools com "Highlight updates" ativado. A turma vai ver a diferença visualmente.

**Etapa 1 — instalar e criar o useForm básico:**

```bash
npm install react-hook-form
```

```tsx
// src/pages/PaginaAgendamento.tsx
// Evolução da A6: useState → React Hook Form

import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { buscarInstrutor, criarAgendamento, DadosAgendamento } from '../services/api'
import { Instrutor } from '../types'

// Por enquanto: tipo manual (vamos substituir pela inferência do Zod na Etapa 3)
type FormAgendamento = {
  nome: string
  telefone: string
  data: string
  horario: string
  observacoes: string
}

function PaginaAgendamento() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Substitui: useState + handleChange + estado de erros manual
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormAgendamento>({
    defaultValues: {
      nome: "",
      telefone: "",
      data: "",
      horario: "",
      observacoes: "",
    },
  })

  const { data: instrutor } = useQuery<Instrutor>({
    queryKey: ["instrutores", id],
    queryFn: () => buscarInstrutor(id!),
    enabled: !!id,
  })

  const mutation = useMutation({
    mutationFn: criarAgendamento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] })
      navigate(`/instrutores/${id}`, { replace: true })
    },
  })
```

**Etapa 2 — conectar o handleSubmit:**

```tsx
  // handleSubmit do RHF:
  // 1. Intercepta o evento
  // 2. Roda as validações
  // 3. Só chama onSubmit se tudo for válido
  function onSubmit(dados: FormAgendamento) {
    const payload: DadosAgendamento = {
      instrutorId: id!,
      ...dados,
    }
    mutation.mutate(payload)
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-brand-purple mb-6">
        Agendar com {instrutor?.nome}
      </h1>

      {/* handleSubmit envolve nosso onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 max-w-lg">

        {/* register substitui name + value + onChange */}
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="nome" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
            Seu nome
          </label>
          <input
            id="nome"
            type="text"
            {...register("nome", { required: "Nome é obrigatório" })}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
          />
          {/* Exibe o erro se existir */}
          {errors.nome && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label htmlFor="data" className="text-xs font-semibold text-brand-purple uppercase tracking-wide">
            Data
          </label>
          <input
            id="data"
            type="date"
            {...register("data", { required: "Data é obrigatória" })}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-brand-purple outline-none"
          />
          {errors.data && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.data.message}
            </p>
          )}
        </div>

        {/* Erro da mutation (API) */}
        {mutation.isError && (
          <p className="text-red-600 text-sm mb-4" role="alert">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Erro ao criar agendamento."}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="
            w-full bg-brand-purple text-white font-semibold
            py-3 rounded-xl hover:bg-purple-800 transition-colors
            disabled:opacity-60 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2
          "
        >
          {mutation.isPending ? "Enviando..." : "Confirmar agendamento"}
        </button>

      </form>
    </section>
  )
}
```

**Pause aqui:** demonstre ao vivo no DevTools que não há re-render durante a digitação. Depois tente submitar com campos vazios — veja as mensagens de erro aparecerem.

---

## 5. Etapa 3 — Zod: validação com tipagem inferida

### O que o Zod resolve que o RHF sozinho não resolve

```tsx
// Com RHF puro — validações espalhadas no register():
register("data", {
  required: "Data obrigatória",
  validate: (valor) => {
    // Lógica no componente — difícil de reutilizar em outro formulário
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    return new Date(valor) > hoje || "A data deve ser no futuro"
  }
})

// Com Zod — validações em um schema separado, reutilizável e tipado:
const agendamentoSchema = z.object({
  data: z.string()
    .min(1, "Data obrigatória")
    .refine(
      (valor) => new Date(valor) > new Date(),
      "A data deve ser no futuro"  // ← mensagem clara, regra de negócio isolada
    ),
})
// O schema pode ser importado por outros formulários, testado isoladamente,
// e o TypeScript infere o tipo automaticamente — sem interface manual
```

### Anatomia do schema Zod

```tsx
import { z } from 'zod'

const agendamentoSchema = z.object({
  // String simples com mensagem customizada
  nome: z.string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter ao menos 3 caracteres"),

  // String com regex
  telefone: z.string()
    .min(1, "Telefone é obrigatório")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato: (11) 99999-9999"),

  // Data futura com refine — lógica customizada
  data: z.string()
    .min(1, "Data é obrigatória")
    .refine(
      (valor) => {
        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        return new Date(valor) > hoje
      },
      "A data deve ser a partir de amanhã"
    ),

  // Campo opcional
  observacoes: z.string().optional(),
})

// Inferência de tipo — não precisa de interface manual
// O TypeScript sabe exatamente o formato dos dados válidos
type AgendamentoSchema = z.infer<typeof agendamentoSchema>
//   ↑ equivale a:
//   { nome: string, telefone: string, data: string, observacoes?: string }
```

### superRefine — validações cruzadas entre campos

```tsx
// refine valida um campo isolado
// superRefine valida a relação ENTRE campos

const agendamentoSchema = z.object({
  data: z.string().min(1),
  horario: z.string().min(1),
}).superRefine((dados, ctx) => {
  // Valida que data + horário não esteja no passado
  const dataHora = new Date(`${dados.data}T${dados.horario}`)
  if (dataHora <= new Date()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["horario"],  // o erro aparece no campo horário
      message: "Este horário já passou para o dia selecionado",
    })
  }
})
```

### Separação de responsabilidades com schema

```
src/
├── schemas/
│   └── agendamento.schema.ts  ← schema + tipo inferido
│                                 testável isoladamente
│                                 reutilizável em outros formulários
├── pages/
│   └── PaginaAgendamento.tsx  ← só importa o schema, não repete as regras
```

---

### 🔴 CONSTRUIR AO VIVO — Parte 2: integrar Zod ao RHF

**Contexto:** substituir as validações manuais do `register()` pelo schema Zod.

```bash
npm install zod @hookform/resolvers
```

**Etapa 1 — criar o schema separado:**

```ts
// src/schemas/agendamento.schema.ts
// 🟡 CÓDIGO PRONTO — crie antes da aula, apenas apresente

import { z } from 'zod'

export const agendamentoSchema = z.object({
  nome: z.string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter ao menos 3 caracteres")
    .max(100, "Nome muito longo"),

  telefone: z.string()
    .min(1, "Telefone é obrigatório")
    .min(10, "Telefone inválido"),

  data: z.string()
    .min(1, "Data é obrigatória")
    .refine((valor) => {
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      return new Date(valor) > hoje
    }, "A data deve ser a partir de amanhã"),

  horario: z.string()
    .min(1, "Horário é obrigatório"),

  observacoes: z.string().max(500, "Máximo 500 caracteres").optional(),
})

// Tipo inferido automaticamente — sem interface duplicada
export type AgendamentoSchema = z.infer<typeof agendamentoSchema>
```

**Etapa 2 — conectar ao useForm com zodResolver:**

```tsx
// src/pages/PaginaAgendamento.tsx — com Zod integrado
import { zodResolver } from '@hookform/resolvers/zod'
import { agendamentoSchema, type AgendamentoSchema } from '../schemas/agendamento.schema'

function PaginaAgendamento() {
  // ...

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<AgendamentoSchema>({
    // zodResolver conecta o schema ao ciclo de validação do RHF
    resolver: zodResolver(agendamentoSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      data: "",
      horario: "",
      observacoes: "",
    },
    // "onBlur": valida quando o usuário sai do campo (melhor UX que "onChange")
    mode: "onBlur",
  })

  // Agora dados é tipado como AgendamentoSchema — garantido pelo Zod
  function onSubmit(dados: AgendamentoSchema) {
    mutation.mutate({ instrutorId: id!, ...dados })
  }

  // isDirty: usuário alterou algum campo? (útil para "Salvar" desabilitado)
  // isValid: todos os campos passaram na validação?
```

> 💬 **PERGUNTA PARA A TURMA:** "Se eu tentasse chamar `dados.campoQueNaoExiste` dentro do `onSubmit`, o que o TypeScript diria? Por que isso é importante em um cenário real?"
>
> *Resposta: erro de tipo em tempo de desenvolvimento. Em um cenário real, isso impede que um campo renomeado quebre silenciosamente o envio para a API.*

---

## 6. Etapa 4 — Integrando RHF + Zod + React Query

> 🟡 **CÓDIGO PRONTO** — esta seção mostra o formulário completo. Apresente como resultado da evolução das duas etapas anteriores.

### O formulário completo — PaginaAgendamento.tsx

```tsx
// src/pages/PaginaAgendamento.tsx — versão final da A7
// Integra: RHF + Zod + React Query + UX de formulário

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { agendamentoSchema, type AgendamentoSchema } from '../schemas/agendamento.schema'
import { buscarInstrutor, criarAgendamento } from '../services/api'
import { Instrutor } from '../types'
import Breadcrumb from '../components/ui/Breadcrumb'

function PaginaAgendamento() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // ── Server state: instrutor (React Query) ─────────────────────────
  const { data: instrutor } = useQuery<Instrutor>({
    queryKey: ["instrutores", id],
    queryFn: () => buscarInstrutor(id!),
    enabled: !!id,
  })

  // ── Form state (React Hook Form + Zod) ────────────────────────────
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AgendamentoSchema>({
    resolver: zodResolver(agendamentoSchema),
    defaultValues: { nome: "", telefone: "", data: "", horario: "", observacoes: "" },
    mode: "onBlur",
  })

  // ── Server state: mutation (React Query) ──────────────────────────
  const mutation = useMutation({
    mutationFn: criarAgendamento,
    onSuccess: () => {
      // Invalida agendamentos → PaginaMeuPerfil vai rebuscar
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] })
      // Invalida o instrutor → disponibilidade pode ter mudado
      queryClient.invalidateQueries({ queryKey: ["instrutores", id] })
      // Reseta o formulário para os valores iniciais
      reset()
      navigate(`/instrutores/${id}`, { replace: true })
    },
  })

  function onSubmit(dados: AgendamentoSchema) {
    // dados aqui é garantidamente válido pelo Zod
    // Não há verificação manual — o schema já cuidou disso
    mutation.mutate({ instrutorId: id!, ...dados })
  }

  if (!instrutor) return null

  return (
    <section>
      <Breadcrumb items={[
        { label: "Home", to: "/" },
        { label: instrutor.nome, to: `/instrutores/${id}` },
        { label: "Agendar" },
      ]} />

      <h1 className="text-2xl font-bold text-brand-purple mb-6">
        Agendar com {instrutor.nome}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate  // desativa validação nativa do browser — usamos Zod
        className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 max-w-lg flex flex-col gap-5"
      >
        {/* Campo: nome */}
        <Campo
          label="Seu nome"
          htmlFor="nome"
          erro={errors.nome?.message}
        >
          <input
            id="nome"
            type="text"
            autoComplete="name"
            {...register("nome")}
            className={inputClasses(!!errors.nome)}
          />
        </Campo>

        {/* Campo: telefone */}
        <Campo
          label="Telefone"
          htmlFor="telefone"
          erro={errors.telefone?.message}
        >
          <input
            id="telefone"
            type="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            {...register("telefone")}
            className={inputClasses(!!errors.telefone)}
          />
        </Campo>

        {/* Campos lado a lado: data + horário */}
        <div className="grid grid-cols-2 gap-4">
          <Campo label="Data" htmlFor="data" erro={errors.data?.message}>
            <input
              id="data"
              type="date"
              min={amanha()}
              {...register("data")}
              className={inputClasses(!!errors.data)}
            />
          </Campo>
          <Campo label="Horário" htmlFor="horario" erro={errors.horario?.message}>
            <input
              id="horario"
              type="time"
              {...register("horario")}
              className={inputClasses(!!errors.horario)}
            />
          </Campo>
        </div>

        {/* Campo: observações (opcional) */}
        <Campo
          label="Observações (opcional)"
          htmlFor="observacoes"
          erro={errors.observacoes?.message}
        >
          <textarea
            id="observacoes"
            rows={3}
            {...register("observacoes")}
            className={inputClasses(!!errors.observacoes)}
          />
        </Campo>

        {/* Erro da API */}
        {mutation.isError && (
          <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl" role="alert">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Erro ao criar agendamento. Tente novamente."}
          </p>
        )}

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || mutation.isPending}
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

// ── Utilitários do formulário ─────────────────────────────────────────

function amanha(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}

function inputClasses(temErro: boolean): string {
  return [
    "w-full border-2 rounded-xl px-4 py-2 outline-none transition-colors",
    temErro
      ? "border-red-400 focus:border-red-500 bg-red-50"
      : "border-gray-200 focus:border-brand-purple",
  ].join(" ")
}

// Componente auxiliar para campo com label + erro
function Campo({
  label,
  htmlFor,
  erro,
  children,
}: {
  label: string
  htmlFor: string
  erro?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold text-brand-purple uppercase tracking-wide"
      >
        {label}
      </label>
      {children}
      {erro && (
        <p className="text-red-500 text-xs" role="alert" aria-live="polite">
          {erro}
        </p>
      )}
    </div>
  )
}

export default PaginaAgendamento
```

### O que não fazer: duplicar estado entre form e server

```tsx
// ❌ Anti-pattern: estado do form espelhando estado do servidor
function PaginaAgendamento() {
  const { data: instrutor } = useQuery(...)

  // Errado: copiar dados do servidor para o form
  const { setValue } = useForm()
  useEffect(() => {
    if (instrutor) {
      setValue("nomeInstrutor", instrutor.nome)  // duplicação de estado
    }
  }, [instrutor])
  // Agora o mesmo dado vive em dois lugares — qual é a fonte da verdade?
}

// ✅ Correto: usar os dados do servidor diretamente, sem copiar para o form
function PaginaAgendamento() {
  const { data: instrutor } = useQuery(...)  // source of truth: React Query
  const { register } = useForm()             // source of truth: RHF

  return (
    <form>
      {/* Dados do instrutor vêm do React Query — não do form */}
      <p>Agendando com: {instrutor?.nome}</p>
      {/* Campos do usuário ficam no RHF */}
      <input {...register("nome")} />
    </form>
  )
}
```

---

## 7. Etapa 5 — O problema de estado global: prop drilling

> 🟡 **CÓDIGO PRONTO** — mostre este código, não construa. O objetivo é identificar o problema visualmente.

### O prop drilling atual no DiretoFácil

O usuário logado precisa aparecer em três lugares:
- `Header` — para exibir nome e botão de logout
- `PaginaAgendamento` — para preencher o campo "nome" automaticamente
- `PaginaMeuPerfil` — para mostrar os agendamentos do usuário

Como o estado vive no `App`, ele desce por props assim:

```
App
  └── Layout (recebe: usuario, onLogout)
        ├── Header (recebe: usuario, onLogout)     ← usa
        └── Outlet
              ├── PaginaListagem                    ← não usa, mas o Layout passou
              ├── PaginaAgendamento (recebe: usuario) ← usa
              └── PaginaMeuPerfil (recebe: usuario)   ← usa
```

```tsx
// App.tsx — origem do problema
function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  return (
    <Routes>
      <Route
        path="/"
        // ❌ usuario desce como prop para o Layout
        element={<Layout usuario={usuario} onLogout={() => setUsuario(null)} />}
      >
        <Route index element={<PaginaListagem />} />
        {/* ❌ usuario precisa descer mais um nível */}
        <Route path="agendar/:id" element={<PaginaAgendamento usuario={usuario} />} />
        <Route path="meu-perfil" element={<PaginaMeuPerfil usuario={usuario} />} />
      </Route>
    </Routes>
  )
}

// Layout.tsx — carrega usuario mesmo sem usar diretamente
function Layout({ usuario, onLogout }: { usuario: Usuario | null, onLogout: () => void }) {
  return (
    <>
      {/* Passa usuario para o Header */}
      <Header usuario={usuario} onLogout={onLogout} />
      <Outlet />
      {/* Como passar usuario para PaginaAgendamento via Outlet? Problema. */}
    </>
  )
}
```

> 💬 **PERGUNTA PARA A TURMA:** "Se amanhã surgir um componente `BotaoFavoritar` dentro de `CardInstrutor`, que está dentro de `Lista`, que está dentro de `PaginaListagem` — e ele precisar saber se o usuário está logado para funcionar — o que acontece com o prop drilling?"
>
> *Objetivo: fazer a turma sentir que a solução de useState não escala. A resposta é: mais um nível, mais props, mais componentes que recebem dados que não usam.*

---

## 8. Etapa 6 — Context API: primeira solução e seus limites

### O que a Context API resolve

A Context API elimina o prop drilling: qualquer componente da árvore pode ler o contexto sem precisar recebê-lo via props.

```tsx
// Criando o contexto
const AuthContext = createContext<AuthContextType | null>(null)

// Provendo o contexto — envolve os componentes que precisam acessá-lo
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  return (
    <AuthContext.Provider value={{ usuario, login: setUsuario, logout: () => setUsuario(null) }}>
      {children}
    </AuthContext.Provider>
  )
}

// Consumindo em qualquer componente filho — sem prop drilling
function Header() {
  const { usuario, logout } = useContext(AuthContext)!
  return <p>Olá, {usuario?.nome}</p>
}
```

### O problema de performance da Context API

> 💬 **PERGUNTA PARA A TURMA:** "Se o usuário logado muda (ex: ele edita o nome do perfil), o que acontece com TODOS os componentes que consomem o AuthContext?"

```tsx
// O problema: Context re-renderiza TODOS os consumidores quando o valor muda

const AuthContext = createContext({
  usuario: null,
  tema: "claro",          // ← campo de tema no mesmo contexto
  notificacoes: [],       // ← campo de notificações no mesmo contexto
})

// Quando as notificações chegam (a cada 30 segundos):
// → o valor do contexto muda
// → Header re-renderiza (usa usuario — faz sentido)
// → PaginaAgendamento re-renderiza (usa usuario — faz sentido)
// → PaginaListagem re-renderiza (não usa nada do contexto — PROBLEMA)
// → CardInstrutor re-renderiza (não usa nada do contexto — PROBLEMA)
// → Todos os componentes que consumem este contexto re-renderizam

// A Context API não tem granularidade — ou você consome tudo, ou nada
```

### Quando a Context API é a escolha certa

```
✅ Use Context quando:
  → O dado muda raramente (tema, idioma, preferências)
  → Poucos componentes consomem o contexto
  → Performance não é crítica para aquela funcionalidade
  → Você quer evitar uma dependência externa

❌ Evite Context quando:
  → O dado muda com frequência (usuário logado, notificações)
  → Muitos componentes consomem o contexto
  → Componentes não relacionados estão no mesmo contexto
```

---

### 🔴 CONSTRUIR AO VIVO — Context para o tema

**Contexto:** implementar o `ThemeContext` para o modo claro/escuro — caso de uso ideal da Context API, porque muda raramente.

```tsx
// src/contexts/ThemeContext.tsx
// Bom caso de uso da Context API: tema muda raramente, poucos consumidores

import { createContext, useContext, useState, ReactNode } from 'react'

type Tema = "claro" | "escuro"

interface ThemeContextType {
  tema: Tema
  alternarTema: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>("claro")

  function alternarTema() {
    const novoTema = tema === "claro" ? "escuro" : "claro"
    setTema(novoTema)
    // Tailwind dark mode via classe no html
    document.documentElement.classList.toggle("dark", novoTema === "escuro")
  }

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook customizado com erro descritivo se usado fora do Provider
export function useTema() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTema deve ser usado dentro de ThemeProvider")
  return ctx
}
```

```tsx
// src/main.tsx — adicionar ThemeProvider
<QueryClientProvider client={queryClient}>
  <ThemeProvider>           {/* ← novo */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
  <ReactQueryDevtools />
</QueryClientProvider>
```

```tsx
// src/components/layout/Header.tsx — botão de tema
import { useTema } from '../../contexts/ThemeContext'

function Header() {
  const { tema, alternarTema } = useTema()

  return (
    <header>
      {/* ... */}
      <button
        onClick={alternarTema}
        aria-label={`Mudar para tema ${tema === "claro" ? "escuro" : "claro"}`}
        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        {tema === "claro" ? "🌙" : "☀️"}
      </button>
    </header>
  )
}
```

---

## 9. Etapa 7 — Zustand: solução final com selectors

### Por que Zustand para o usuário logado

O usuário logado muda com mais frequência que o tema, é acessado por componentes muito distintos na árvore e, diferente de um tema, afeta lógica de negócio (o que o usuário pode ver, fazer, agendar).

```bash
npm install zustand
```

### Anatomia de uma store Zustand

```tsx
import { create } from 'zustand'

// O create recebe uma função que retorna o estado inicial + actions
const useStore = create<StoreType>((set, get) => ({
  // estado
  contador: 0,

  // actions — funções que modificam o estado
  incrementar: () => set(state => ({ contador: state.contador + 1 })),
  resetar: () => set({ contador: 0 }),

  // get() lê o estado atual dentro de uma action
  dobrar: () => set({ contador: get().contador * 2 }),
}))

// Uso em qualquer componente — sem Provider, sem prop drilling
function Componente() {
  const contador   = useStore(state => state.contador)    // ← selector
  const incrementar = useStore(state => state.incrementar)
  // Só re-renderiza quando "contador" muda — não quando outras partes da store mudam
}
```

### Selectors — a granularidade que a Context não tem

```tsx
// Context: você consome tudo ou nada
const { usuario, tema, notificacoes } = useContext(AuthContext)
// → re-renderiza quando qualquer um dos três muda

// Zustand com selector: você escolhe exatamente o que precisa
const usuario = useAuthStore(state => state.usuario)
// → re-renderiza APENAS quando usuario muda
// → notificacoes mudando não afeta este componente

const notificacoes = useAuthStore(state => state.notificacoes)
// → re-renderiza APENAS quando notificacoes muda
// → usuario mudando não afeta este componente
```

---

### 🔴 CONSTRUIR AO VIVO — useAuthStore com Zustand

**Contexto:** eliminar o prop drilling do usuário logado.

**Etapa 1 — criar a store:**

```tsx
// src/stores/authStore.ts

import { create } from 'zustand'

export interface Usuario {
  id: string
  nome: string
  email: string
}

interface AuthStore {
  // Estado
  usuario: Usuario | null

  // Actions
  login:  (usuario: Usuario) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  usuario: null,

  login: (usuario) => set({ usuario }),

  logout: () => set({ usuario: null }),
}))
```

**Etapa 2 — usar a store no Header (sem prop):**

```tsx
// src/components/layout/Header.tsx — antes precisava de props
// Agora lê diretamente da store

import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'

function Header() {
  // Selector: só re-renderiza quando usuario muda
  const usuario  = useAuthStore(state => state.usuario)
  const logout   = useAuthStore(state => state.logout)
  const { tema, alternarTema } = useTema()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/", { replace: true })
  }

  return (
    <header className="bg-brand-purple text-white py-4 px-8 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <NavLink to="/" className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">🚗</span>
          <span className="text-2xl font-bold text-brand-yellow">DiretoFácil</span>
        </NavLink>

        <div className="flex items-center gap-4">
          <button onClick={alternarTema} aria-label="Alternar tema">
            {tema === "claro" ? "🌙" : "☀️"}
          </button>

          {usuario ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300">Olá, {usuario.nome}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-brand-yellow hover:text-white transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-sm text-brand-yellow hover:text-white transition-colors"
            >
              Entrar
            </NavLink>
          )}
        </div>

      </div>
    </header>
  )
}
```

**Etapa 3 — usar a store para proteger a rota /meu-perfil:**

```tsx
// src/pages/PaginaMeuPerfil.tsx
// Redireciona para / se não há usuário logado — sem receber usuario via prop

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../stores/authStore'
import { buscarAgendamentos } from '../services/api'

function PaginaMeuPerfil() {
  const usuario  = useAuthStore(state => state.usuario)
  const navigate = useNavigate()

  // Redireciona se não logado — replace=true evita loop no botão "←"
  useEffect(() => {
    if (!usuario) {
      navigate("/", { replace: true })
    }
  }, [usuario, navigate])

  // Server state: agendamentos (React Query)
  const { data: agendamentos = [], isLoading } = useQuery({
    queryKey: ["agendamentos"],
    queryFn: buscarAgendamentos,
    enabled: !!usuario,  // só busca se logado
  })

  if (!usuario) return null  // evita flash de conteúdo antes do redirect

  if (isLoading) return <p className="text-center py-8 text-gray-500">Carregando...</p>

  return (
    <section>
      <h1 className="text-2xl font-bold text-brand-purple mb-6">
        Meus agendamentos
      </h1>

      {agendamentos.length === 0 ? (
        <p className="text-gray-500">Você ainda não tem agendamentos.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {agendamentos.map(ag => (
            <li
              key={ag.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <p className="font-medium text-brand-purple">{ag.instrutorId}</p>
              <p className="text-sm text-gray-500">{ag.data} às {ag.horario}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PaginaMeuPerfil
```

**Etapa 4 — simplificar o App.tsx:**

```tsx
// src/App.tsx — após Zustand: sem usuario como prop
// O App não precisa mais saber do usuário — a store cuida disso

import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import PaginaListagem from './pages/PaginaListagem'
import PaginaPerfil from './pages/PaginaPerfil'
import PaginaAgendamento from './pages/PaginaAgendamento'
import PaginaMeuPerfil from './pages/PaginaMeuPerfil'
import Pagina404 from './pages/Pagina404'

function App() {
  // Antes: const [usuario, setUsuario] = useState(null)
  // Depois: nada — a store é o source of truth
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
```

> 💬 **PERGUNTA PARA A TURMA:** "Comparando a versão com Context e a com Zustand para o usuário logado — qual a diferença mais importante para uma aplicação que cresce?"
>
> *Resposta esperada: granularidade dos selectors. Com Context, qualquer mudança re-renderiza todos os consumidores. Com Zustand, cada componente subscreve só o que precisa. Em uma aplicação grande, isso é a diferença entre laggy e fluido.*

### Organizando stores em slices

```tsx
// Para stores maiores, separe por domínio
// src/stores/authStore.ts   → autenticação
// src/stores/uiStore.ts     → estado de UI (modais, sidebars)

// uiStore.ts — exemplo de store de UI
import { create } from 'zustand'

interface UIStore {
  modalAberto: string | null
  abrirModal: (id: string) => void
  fecharModal: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  modalAberto: null,
  abrirModal:  (id) => set({ modalAberto: id }),
  fecharModal: () => set({ modalAberto: null }),
}))

// Evite store global monolítica:
// ❌ useAppStore com usuario + tema + modal + filtros + notificacoes
// ✅ useAuthStore + useUIStore + useFiltrosStore
```

---

## 10. Slide de referência — Quando usar cada estado

> 🟡 **CÓDIGO PRONTO** — apresente como slide final antes do exercício. Deixe no chat da turma.

```
┌──────────────────────────────────────────────────────────────────────┐
│              ONDE CADA ESTADO DEVE VIVER                             │
├──────────────┬───────────────────┬──────────────────────────────────┤
│  React Query │  Zustand          │  Context API                     │
├──────────────┼───────────────────┼──────────────────────────────────┤
│ Dados da API │ Usuário logado    │ Tema (claro/escuro)               │
│ Cache        │ Carrinho          │ Idioma                            │
│ Sincronização│ Notificações      │ Preferências de layout            │
│ Invalidação  │ Filtros globais   │                                   │
│              │ Estado de UI      │                                   │
│              │  compartilhado    │                                   │
├──────────────┼───────────────────┼──────────────────────────────────┤
│ "Vem do      │ "Persiste entre   │ "Muda raramente e                │
│  servidor"   │  páginas e muda   │  não precisa de                  │
│              │  com frequência"  │  granularidade"                  │
└──────────────┴───────────────────┴──────────────────────────────────┘

  useState       → estado local de um componente (sem compartilhamento)
  React Hook Form → estado dos campos do formulário durante o preenchimento
```

```
REGRA PRÁTICA:

  Preciso buscar da API?          → React Query
  Precisa ser compartilhado?
    Muda raramente?               → Context API
    Muda com frequência?          → Zustand
  É só local ao componente?       → useState
  É campo de formulário?          → React Hook Form
```

> 💬 **PERGUNTA PARA A TURMA:** "O filtro de cidade da barra de busca — useState, Context, Zustand ou React Query? E se ele precisar persistir quando o usuário navegar para outra página e voltar?"
>
> *Resposta: hoje é useState (local). Se precisar persistir entre páginas → Zustand. Se precisar ir para a URL (compartilhável via link) → useSearchParams do React Router.*

---

## 11. Código Completo da Aula — DiretoFácil Sprint 7

### O que mudou em relação à A6

```
A6 → A7: evolução arquivo a arquivo

PaginaAgendamento → useState + validação manual → RHF + Zod + useMutation
src/schemas/      → novo diretório com agendamento.schema.ts
src/contexts/     → novo: ThemeContext.tsx (Context para tema)
src/stores/       → novo: authStore.ts (Zustand para usuário)
App.tsx           → sem useState de usuario — store é source of truth
Header.tsx        → sem props de usuario — usa useAuthStore
PaginaMeuPerfil   → sem prop usuario — usa useAuthStore + redirect
Layout.tsx        → sem props de usuario — sem prop drilling
main.tsx          → adicionado ThemeProvider
```

### Estrutura de pastas ao final da aula

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          ← atualizado — sem props de usuario
│   │   └── Header.tsx          ← atualizado — useAuthStore + useTema
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── SkeletonCard.tsx
│   │   └── ErroFallback.tsx
│   └── features/
│       ├── CardInstrutor.tsx
│       └── BarraFiltros.tsx
├── contexts/
│   └── ThemeContext.tsx         ← novo
├── pages/
│   ├── PaginaListagem.tsx
│   ├── PaginaPerfil.tsx
│   ├── PaginaAgendamento.tsx   ← atualizado — RHF + Zod
│   ├── PaginaMeuPerfil.tsx     ← atualizado — useAuthStore
│   └── Pagina404.tsx
├── schemas/
│   └── agendamento.schema.ts   ← novo
├── services/
│   └── api.ts
├── stores/
│   └── authStore.ts            ← novo
├── types/
│   └── index.ts
├── App.tsx                     ← atualizado — sem estado de usuario
└── main.tsx                    ← atualizado — ThemeProvider
```

---

## 12. Exercício em Sala

### 🏗️ DiretoFácil — Sprint 7

**Em grupos · 40 minutos**

**Requisitos obrigatórios:**

1. Criar o formulário de **cadastro de instrutor** com React Hook Form + Zod em `src/pages/PaginaCadastroInstrutor.tsx`. O schema deve ter:

```ts
// src/schemas/cadastroInstrutor.schema.ts
const cadastroInstrutorSchema = z.object({
  nome: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  especialidade: z.string().min(1, "Especialidade é obrigatória"),
  preco: z.number({ invalid_type_error: "Preço deve ser um número" })
    .min(50, "Preço mínimo é R$ 50"),
  cpf: z.string()
    .regex(/^\d{11}$/, "CPF deve ter 11 dígitos numéricos"),
})
```

> **Dica para o campo `preco`:** inputs retornam strings — use `valueAsNumber` do register:
> ```tsx
> <input type="number" {...register("preco", { valueAsNumber: true })} />
> ```

2. Migrar o estado do usuário logado para `useAuthStore`. Simule um login com um botão "Entrar como João" que chama `login({ id: "1", nome: "João", email: "joao@email.com" })`.

3. Usar o store na rota `/meu-perfil` para redirecionar quem não está logado — usando `useNavigate` com `replace: true`.

4. Criar o `ThemeContext` e o botão de alternar tema no `Header`.

**Bonus:**

5. Adicionar campo de upload de foto ao formulário de cadastro de instrutor com validação de tipo e tamanho:

```ts
// No schema Zod — File não é suportado nativamente no Zod
// Use instanceof para validar no cliente
foto: z.instanceof(FileList)
  .refine(files => files.length > 0, "Foto é obrigatória")
  .refine(
    files => ["image/jpeg", "image/png"].includes(files[0]?.type),
    "Apenas JPG ou PNG"
  )
  .refine(
    files => files[0]?.size <= 2 * 1024 * 1024,
    "Máximo 2MB"
  )
```

```tsx
// No componente — FileList precisa de Controller ou ref manual
<input
  type="file"
  accept="image/jpeg,image/png"
  {...register("foto")}
/>
```

---

## 13. Resumo dos Conceitos

| Conceito | O que resolve | Trade-off |
|---|---|---|
| **React Hook Form** | Re-renders durante digitação; boilerplate de formulário | Curva inicial para campos controlados externos |
| **`register`** | Conecta input ao RHF sem estado React | Não funciona com componentes sem `ref` nativo |
| **`Controller`** | Componentes externos sem `ref` (date pickers, selects custom) | Mais verboso que `register` |
| **`mode: "onBlur"`** | Valida quando sai do campo — melhor UX | Erros não aparecem durante a digitação |
| **Zod schema** | Validação tipada, reutilizável e testável | Separar regra de negócio exige disciplina |
| **`z.infer<>`** | Tipo inferido do schema — sem interface duplicada | — |
| **`refine`** | Validação customizada de um campo (ex: data futura) | Para cruzar campos use `superRefine` |
| **`zodResolver`** | Conecta schema Zod ao ciclo de validação do RHF | Dependência: `@hookform/resolvers` |
| **Context API** | Evita prop drilling para dados que mudam raramente | Re-renderiza todos os consumidores |
| **Zustand** | Estado global com granularidade via selectors | Uma dependência a mais no projeto |
| **Selector** | `state => state.campo` — re-render só quando aquele campo muda | Esquecer o selector causa re-renders desnecessários |
| **Slices de store** | Stores separados por domínio (auth, ui, filtros) | Mais arquivos para gerenciar |

---

### 🔗 O que vem na A8

Na próxima aula o código que cresceu ao longo das 7 aulas vai ser refatorado. O `CardInstrutor` tem 200 linhas, a lógica de `useQuery` de instrutores está repetida em 3 componentes, e a lógica de favoritos está acoplada ao componente. Na A8 você vai extrair **Custom Hooks** (`useInstrutores`, `useFavoritos`, `useAgendamento`), aplicar **Single Responsibility** quebrar componentes grandes e aprender o padrão **Compound Components** — que é exatamente o que os libs como shadcn/ui usam.

---

> **Dúvidas?**
> - [React Hook Form — documentação oficial](https://react-hook-form.com)
> - [Zod — documentação oficial](https://zod.dev)
> - [Zustand — documentação oficial](https://zustand.docs.pmnd.rs)
> - [React Hook Form + Zod — guia oficial](https://react-hook-form.com/get-started#SchemaValidation)
> - [Zustand — selectors e performance](https://zustand.docs.pmnd.rs/guides/prevent-rerenders-with-use-shallow)