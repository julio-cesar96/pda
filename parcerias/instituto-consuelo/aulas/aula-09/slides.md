

# React na Prática: Guia para Criação de Slides

## 📋 Agenda da Aula

1. **Fundamentos do React** (20 min)
2. **Ambiente e Projeto Inicial** (15 min)
3. **JSX e Componentes** (20 min)
4. **Estado e Hooks** (20 min)
5. **Listas, Eventos e APIs** (15 min)
6. **Resumo, Exercícios e Próximos Passos** (10 min)

---

## 1. Fundamentos do React (20 min)

### O que é React?
Breve explicação sobre React como biblioteca JavaScript para construção de interfaces de usuário. (Referência: Seção 1.1)

**Exemplo:**
```javascript
function Contador() {
  const [contador, setContador] = useState(0);
  return (
    <div>
      <p>{contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
```

### Por que usar React?
Principais vantagens: componentização, produtividade, performance, ecossistema, comunidade, mercado. (Referência: "Por que usar React?")

### Virtual DOM
Explicação do conceito e exemplo visual de atualização eficiente. (Referência: Seção 1.2)

**Exemplo:**
```javascript
// Antes: Vanilla JS
ul.innerHTML = '';
items.forEach(i => {
  const li = document.createElement('li');
  li.textContent = i;
  ul.appendChild(li);
});

// Com React
function Lista({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
```

### Biblioteca vs Framework
Tabela comparativa e analogia. (Referência: Seção 1.3)

**Atividade:**
Monte uma tabela comparando React e Angular.

---

## 2. Ambiente e Projeto Inicial (15 min)

### Ferramentas essenciais
Node.js, npm/yarn, VS Code, extensões recomendadas. (Referência: Seção 2.1)

### Criando projeto com Vite
Passo a passo para criar e rodar o projeto. (Referência: Seção 2.2)

**Exemplo:**
```bash
npm create vite@latest meu-app-react -- --template react
cd meu-app-react
npm install
npm run dev
```

### Estrutura de pastas e arquivos principais
Árvore de arquivos e explicação dos principais. (Referência: Seção 2.2 e 2.3)

**Atividade:**
Desenhe a estrutura de um projeto React criado com Vite.

---

## 3. JSX e Componentes (20 min)

### O que é JSX
Explicação e exemplo comparativo entre JSX e createElement. (Referência: Seção 3.1)

**Exemplo:**
```javascript
// Sem JSX
React.createElement('h1', null, 'Olá')
// Com JSX
const el = <h1>Olá</h1>
```

### Regras do JSX
className, fechar tags, camelCase, expressões. (Referência: Seção 3.2)

**Exemplo:**
```javascript
<div className="container" />
<button onClick={funcao}>Clique</button>
<input type="text" />
```

### Componentes funcionais
Anatomia de um componente simples. (Referência: Seção 4.1)

**Exemplo:**
```javascript
export default function Saudacao({ nome }) {
  return <h1>Olá, {nome}</h1>;
}
```

### Props, children e composição
Exemplos de props, destructuring, children e composição. (Referência: Seções 4.2 e 4.3)

**Exemplo:**
```javascript
function Card({ titulo, children }) {
  return (<div className="card"><h3>{titulo}</h3>{children}</div>);
}
```

**Atividade:**
Crie um componente Card que recebe children e exibe um título.

---

## 4. Estado e Hooks (20 min)

### useState - conceito e sintaxe
Explicação do hook de estado e re-render. (Referência: Seção 5.1 e 5.2)

**Exemplo:**
```javascript
const [valor, setValor] = useState(0);
```

### Exemplo prático: contador
Código completo do contador. (Referência: Seção 5.1)

### Múltiplos estados
Comparação entre vários useState e objeto. (Referência: Seção 5.3 e 5.4)

**Exemplo:**
```javascript
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
```

### useEffect - efeitos colaterais
Explicação de side-effects, dependências e cleanup. (Referência: Seção 8.1)

**Exemplo:**
```javascript
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

**Atividade:**
Implemente um contador com botão de reset usando useState e useEffect.

---

## 5. Listas, Eventos e APIs (15 min)

### Renderizando listas
Exemplo com key. (Referência: Seção 6.1 e 6.2)

**Exemplo:**
```javascript
{items.map(i => <li key={i.id}>{i.name}</li>)}
```

### Eventos e formulários controlados
Exemplo de input controlado e onSubmit. (Referência: Seção 7.1 e 7.3)

**Exemplo:**
```javascript
<input value={valor} onChange={e => setValor(e.target.value)} />
<form onSubmit={handleSubmit} />
```


### Consumindo APIs
Padrão completo de fetch com async/await, exemplo visual de galeria de fotos. (Referência: Seção 9.1, 9.2 e 10)

**Exemplo:**

```javascript
useEffect(() => {
  const buscarDados = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro na requisição');
      const dados = await response.json();
      setData(dados);
    } catch (error) {
      setErro(error.message);
    }
  };
  buscarDados();
}, [url]);
```

**Atividade:**
Crie um componente que busca dados de uma API usando async/await e exibe uma lista.

---

## 6. Resumo, Exercícios e Próximos Passos (10 min)

### Cheat Sheet React
Código resumido: componente, useState, useEffect, map, eventos. (Referência: "Resumo - Cheat Sheet")

### Exercícios práticos
Sugestão de exercícios para praticar os conceitos da aula. (Referência: "Exercícios Práticos")

### Próximos passos e recursos
Lista de estudos, links, QR code para documentação oficial. (Referência: "Próximos Passos" e "Recursos Adicionais")

---

## Dicas rápidas de apresentação

- Use sintaxe destacada para código
- Prefira diagramas simples para Virtual DOM
- Sugestão de momentos para live coding: criação do projeto, contador, fetch API

---

## Resumo da Estrutura

| Bloco | Tema | Tempo |
|-------|------|-------|
| 1 | Fundamentos do React | 20 min |
| 2 | Ambiente e Projeto | 15 min |
| 3 | JSX e Componentes | 20 min |
| 4 | Estado e Hooks | 20 min |
| 5 | Listas, Eventos e APIs | 15 min |
| 6 | Resumo e Exercícios | 10 min |

---

*"Componentes são os blocos de construção de aplicações React."*
  # � Guia para Criação de Slides - React: Fundamentos e Componentes

  **Total: 28 slides** | **Duração estimada: 80-110 minutos**

  ---

  Resumo: este guia descreve o conteúdo sugerido para cada slide (o que mostrar e um breve texto/exemplo que pode ir no slide e no script do apresentador). Mantive foco em clareza didática e incluí exemplos pequenos para facilitar a montagem dos slides. Reduzi para 28 slides e detalhei mais cada item (incluindo Virtual DOM com um exemplo).

  ## 🎯 BLOCO 1: ABERTURA E INTRODUÇÃO (3 slides)

  ### Slide 1 — Título e objetivo rápido
  + Título: "React: Fundamentos e Componentes"
  + Subtítulo: "Componentes são os blocos de construção de aplicações React"
  + Nome do instrutor, duração da aula, link para material

  ### Slide 2 — Objetivos de aprendizagem (detalhado)
  + Mostrar 6 objetivos em bullets curtos (cada bullet 1 linha e legível)
  + Sugestão de script: "Ao final desta aula você saberá configurar o ambiente, criar componentes reutilizáveis, gerenciar estado com Hooks e consumir APIs." 

  ### Slide 3 — Motive o aluno (por que aprender React)
  + 3 bullets: produtividade, ecossistema e demanda de mercado
  + Inserir uma estatística rápida (ex.: bibliotecas populares, vagas) e o logo do React

  ---

  ## 🔄 BLOCO 2: CONCEITOS FUNDAMENTAIS (4 slides)

  ### Slide 4 — O que é React (curto e direto)
  + Definição: "Biblioteca JavaScript para construir UIs declarativas baseadas em componentes"
  + 3 bullets de características (componentes, virtual DOM, declarativo)

  ### Slide 5 — Virtual DOM (DETALHADO + exemplo)
  + Objetivo: explicar por que React atualiza a UI de forma eficiente.
  + Texto curto para o slide: "Virtual DOM: representação em memória da UI que permite calcular um diff e aplicar somente as mudanças necessárias no DOM real."
  + Visual sugerido: diagrama com duas colunas — Virtual DOM vs DOM real — e fluxos (estado → virtual DOM → diff → patch no DOM).
  + Exemplo prático (colocar no slide ou em nota do apresentador):

  ```javascript
  // DOM manual (imperativo): recria/atualiza elementos
  const ul = document.getElementById('lista');
  ul.innerHTML = '';
  items.forEach(i => {
    const li = document.createElement('li');
    li.textContent = i;
    ul.appendChild(li);
  });

  // React (conceito): apenas atualiza o que mudou
  function Lista({ items }) {
    return (
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    );
  }

  // Se apenas um item novo for adicionado, React 'diff' aplicará só esse <li>
  ```

  + Nota para apresentação: reproduza visualmente o antes/depois (10 itens → adiciona 1) e explique que o Virtual DOM calcula a diferença e aplica um patch em vez de recriar tudo.

  ### Slide 6 — Biblioteca vs Framework (comparação prática)
  + Tabela curta com 4 linhas: foco, opinionated, rotas/estado, curva de aprendizagem
  + Exemplo de uso: quando preferir React (flexibilidade) vs framework (projeto grande e padrão)

  ### Slide 7 — Benefícios e casos de uso
  + 5 bullets com exemplos reais (dashboard, SPA, PWA, mobile com React Native, prototipagem rápida)

  ---

  ## ⚙️ BLOCO 3: AMBIENTE (3 slides)

  ### Slide 8 — Ferramentas essenciais
  + Node.js, npm/yarn, VS Code, extensões (lista curta)
  + Nota: mostrar versões recomendadas

  ### Slide 9 — Criando projeto com Vite (passo a passo curto)
  + Comandos (colocar em código no slide):
  ```bash
  npm create vite@latest meu-app-react -- --template react
  cd meu-app-react
  npm install
  npm run dev
  ```
  + Dica de script para o apresentador: abra o browser já com a página rodando para demo rápida

  ### Slide 10 — Estrutura de pastas e arquivos principais
  + Mostrar árvore reduzida e explicar função de `main.jsx`, `App.jsx`, `index.html` e `package.json`

  ---

  ## 📝 BLOCO 4: JSX (2 slides)

  ### Slide 11 — O que é JSX (com exemplo)
  + Texto curto: "JSX é sintaxe que permite escrever HTML-like dentro do JS"
  + Exemplo no slide:
  ```javascript
  // Sem JSX
  React.createElement('h1', null, 'Olá')

  // Com JSX
  const el = <h1>Olá</h1>
  ```

  ### Slide 12 — Regras úteis do JSX (com exemplos rápidos)
  + className, fechar tags, camelCase, expressions `{}`
  + Uma linha de código para cada regra (visual e curto)

  ---

  ## 🧩 BLOCO 5: COMPONENTES (4 slides)

  ### Slide 13 — Componentes funcionais (anatomia)
  + Mostre um componente simples com `export default function Saudacao({ nome }) { return <h1>Olá, {nome}</h1>; }`
  + Explique estrutura: imports, função, props, return

  ### Slide 14 — Props e children (exemplo)
  + Exemplo:
  ```javascript
  function Card({ titulo, children }) {
    return (<div className="card"><h3>{titulo}</h3>{children}</div>);
  }
  ```
  + Nota: props são imutáveis

  ### Slide 15 — Composição (layout) com exemplo
  + Exemplo de App que monta Header, Main, Footer com props e slots (children)

  ### Slide 16 — Boas práticas (curto checklist)
  + Componentes pequenos, um arquivo por componente, nomes PascalCase, evitar duplicação

  ---

  ## 🎣 BLOCO 6: HOOKS - ESTADO (3 slides)

  ### Slide 17 — useState: conceito e sintaxe
  + Mostrar sintaxe `const [valor, setValor] = useState(initial)` e explicar re-render

  ### Slide 18 — Exemplo prático: contador (código completo)
  ```javascript
  function Contador(){
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>{count}</p>
        <button onClick={() => setCount(c => c + 1)}>+1</button>
        <button onClick={() => setCount(c => Math.max(0, c - 1))}>-1</button>
      </div>
    );
  }
  ```

  ### Slide 19 — Múltiplos estados e quando usar objeto vs vários useState
  + Exemplo curto comparando `useState({ nome, email })` vs dois `useState` separados; pro/contra

  ---

  ## ⚡ BLOCO 7: HOOKS - EFEITOS (3 slides)

  ### Slide 20 — useEffect: quando usar
  + Explique side-effects (fetch, timers, subscrições)

  ### Slide 21 — Dependências e cleanup (exemplos)
  + Mostrar 3 casos: sem array, `[]`, com deps
  + Mostrar exemplo de cleanup com setInterval

  ### Slide 22 — Exemplo: buscar dados (padrão fetch)
  ```javascript
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        if(mounted) setData(json);
      } catch(e){ setError(e); }
    })();
    return () => { mounted = false; };
  }, [url]);
  ```

  ---

  ## 📋 BLOCO 8: LISTAS E EVENTOS (2 slides)

  ### Slide 23 — Renderizando listas (com key)
  + Exemplo: `{items.map(i => <li key={i.id}>{i.name}</li>)}`
  + Dica: evitar usar índice como key

  ### Slide 24 — Eventos e formulários controlados
  + Exemplo rápido de input controlado e onSubmit (preventDefault + state)

  ---

  ## 🌐 BLOCO 9: CONSUMINDO APIS (2 slides)

  ### Slide 25 — Padrão completo de fetch (data/loading/error)
  + Código compacto (useEffect + estados) e o que mostrar no UI

  ### Slide 26 — Exemplo visual: galeria de fotos (mini-demo)
  + Sugestão de layout do slide: imagem grande + spinner + mensagem de erro

  ---

  ## 🎓 BLOCO 10: ENCERRAMENTO E PRÓXIMOS PASSOS (2 slides)

  ### Slide 27 — Resumo (Cheat Sheet)
  + Código resumido: componente, useState, useEffect, map, eventos (cada item 1-2 linhas)

  ### Slide 28 — Próximos passos e recursos
  + Lista curta de estudos: React Router, Context, Custom Hooks, React Query, TypeScript
  + Links e QR code para material, e sugestão de exercícios práticos

  ---

  ### Dicas rápidas de design e apresentação
  + Use sintaxe destacada (highlight) para trechos de código; mantenha no máximo 6 linhas de código por slide.
  + Para conceitos (Virtual DOM, diff/patch) prefira diagramas simples e uma animação (GIF) mostrando a diferença.
  + Tenha 3 pontos de demo ao vivo: criar projeto (curto), contador, fetch API.

  ---

  Notas da alteração:
  - Reduzi o total para 28 slides e ampliei as instruções e exemplos, especialmente no slide sobre Virtual DOM.
  - Renderização condicional
- Exemplo visual: galeria de fotos

---

## 🎓 BLOCO 10: ENCERRAMENTO (2 slides)

### **Slide 29: Resumo - Cheat Sheet**
- Código condensado (quick reference):
  - Componente
  - useState
  - useEffect
  - Listas (.map)
  - Eventos
  - Fetch

### **Slide 30: Próximos Passos**
- O que aprender depois:
  - React Router
  - Context API
  - Custom Hooks
  - React Query
  - TypeScript
- Recursos adicionais (links)
- QR Code para documentação oficial
- Agradecimento e contato

---

## 📝 Dicas de Apresentação

### **Timing Sugerido por Bloco:**
- Bloco 1 (Abertura): 8 min
- Bloco 2 (Conceitos): 10 min
- Bloco 3 (Ambiente): 12 min ⚠️ DEMO AO VIVO
- Bloco 4 (JSX): 10 min
- Bloco 5 (Componentes): 15 min ⚠️ DEMO AO VIVO
- Bloco 6 (useState): 15 min ⚠️ DEMO AO VIVO
- Bloco 7 (useEffect): 12 min
- Bloco 8 (Listas/Eventos): 10 min
- Bloco 9 (APIs): 8 min ⚠️ DEMO AO VIVO
- Bloco 10 (Encerramento): 5 min

**Total: ~105 minutos (1h45min)**

### **Momentos para Live Coding:**
1. Slide 9: Criar projeto com Vite
2. Slides 15-17: Criar componentes
3. Slides 20-21: useState com contador
4. Slide 28: Fetch de API

### **Elementos Visuais Recomendados:**
- 🎨 Usar paleta de cores do React (azul #61DAFB)
- 📊 Diagramas para Virtual DOM e composição
- 💻 Syntax highlighting nos códigos
- ✅/❌ Checkmarks para boas práticas
- 📸 Screenshots de DevTools e VS Code
- 🎬 GIFs animados para demonstrar interações

---

## 🎯 Resumo da Estrutura

| Bloco | Tema | Slides | Tempo | Live Coding |
|-------|------|--------|-------|-------------|
| 1 | Abertura e Introdução | 1-4 | 8 min | ❌ |
| 2 | Conceitos Fundamentais | 5-7 | 10 min | ❌ |
| 3 | Ambiente de Desenvolvimento | 8-11 | 12 min | ✅ |
| 4 | JSX | 12-14 | 10 min | ❌ |
| 5 | Componentes | 15-18 | 15 min | ✅ |
| 6 | Hooks - Estado | 19-22 | 15 min | ✅ |
| 7 | Hooks - Efeitos | 23-25 | 12 min | ❌ |
| 8 | Listas e Eventos | 26-27 | 10 min | ❌ |
| 9 | Consumindo APIs | 28 | 8 min | ✅ |
| 10 | Encerramento | 29-30 | 5 min | ❌ |

**Total: 30 slides | ~105 minutos**

---

**Este guia garante que você cubra todo o conteúdo essencial em 30 slides, mantendo o equilíbrio entre teoria e prática!** 🚀


```jsx

```