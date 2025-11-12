# 📝 Atividades Síncronas - React: Fundamentos e Componentes

---

## 🎯 Objetivo

Estas atividades devem ser realizadas **durante a aula** com acompanhamento do professor. Cada atividade possui um nível de dificuldade progressivo para consolidar os conceitos aprendidos.

---

## ✅ Atividade 1: Cartão de Perfil Interativo (Simples)

**Nível:** 🟢 Simples  
**Tempo estimado:** 20-30 minutos  
**Conceitos:** Componentes, Props, Estado básico

### 📋 Descrição

Crie um **componente de cartão de perfil** que exibe informações de um usuário e permite alternar entre modo claro e escuro.

### 🎯 Requisitos

1. **Componente `PerfilCard`** que recebe as seguintes props:
   - `nome` (string)
   - `cargo` (string)
   - `avatar` (URL da imagem)
   - `bio` (string)

2. **Funcionalidades:**
   - Botão para alternar tema (claro/escuro)
   - Contador de "curtidas" com botão de incrementar
   - Exibir dados do usuário de forma organizada

3. **Estado:**
   - `temaEscuro` (boolean) - controla o tema
   - `curtidas` (number) - contador de curtidas

### 💡 Exemplo de Uso

```javascript
<PerfilCard 
  nome="Ana Silva"
  cargo="Desenvolvedora Frontend"
  avatar="https://i.pravatar.cc/150?img=1"
  bio="Apaixonada por React e tecnologia!"
/>
```

### 🎨 Dica de Estilo

```javascript
const estiloClaro = {
  backgroundColor: '#ffffff',
  color: '#333333',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const estiloEscuro = {
  backgroundColor: '#2d2d2d',
  color: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
};
```

### ✅ Critérios de Avaliação

- [ ] Componente criado corretamente com props
- [ ] Estado gerenciado com useState
- [ ] Botão de tema funciona corretamente
- [ ] Contador de curtidas incrementa ao clicar
- [ ] Código organizado e legível

---

## 🔄 Atividade 2: Lista de Produtos com Filtro (Moderado)

**Nível:** 🟡 Moderado  
**Tempo estimado:** 40-50 minutos  
**Conceitos:** Listas, Renderização condicional, Eventos, Múltiplos estados

### 📋 Descrição

Crie uma **aplicação de lista de produtos** com funcionalidades de busca, filtro por categoria e ordenação por preço.

### 🎯 Requisitos

1. **Array de produtos inicial:**

```javascript
const produtosIniciais = [
  { id: 1, nome: 'Notebook Dell', preco: 3500, categoria: 'Eletrônicos', estoque: 5 },
  { id: 2, nome: 'Mouse Logitech', preco: 80, categoria: 'Periféricos', estoque: 15 },
  { id: 3, nome: 'Teclado Mecânico', preco: 350, categoria: 'Periféricos', estoque: 8 },
  { id: 4, nome: 'Monitor LG 24"', preco: 900, categoria: 'Eletrônicos', estoque: 3 },
  { id: 5, nome: 'Webcam HD', preco: 250, categoria: 'Periféricos', estoque: 12 },
  { id: 6, nome: 'SSD 1TB', preco: 450, categoria: 'Componentes', estoque: 20 },
  { id: 7, nome: 'Memória RAM 16GB', preco: 380, categoria: 'Componentes', estoque: 10 },
  { id: 8, nome: 'Headset Gamer', preco: 320, categoria: 'Periféricos', estoque: 0 }
];
```

2. **Componentes:**
   - `ListaProdutos` (componente principal)
   - `CardProduto` (componente para cada produto)
   - `FiltrosBar` (barra de filtros - opcional, pode ser inline)

3. **Funcionalidades:**
   - **Busca:** Campo de texto para buscar produtos por nome
   - **Filtro por categoria:** Botões ou select para filtrar (Todos, Eletrônicos, Periféricos, Componentes)
   - **Ordenação:** Botões para ordenar por:
     - Menor preço
     - Maior preço
     - Nome (A-Z)
   - **Indicador de estoque:** Mostrar "Em estoque" (verde) ou "Esgotado" (vermelho)
   - **Contador:** Exibir quantidade de produtos filtrados

4. **Estados necessários:**
   - `produtos` - array de produtos
   - `busca` - texto da busca
   - `categoriaFiltro` - categoria selecionada
   - `ordenacao` - tipo de ordenação

### 💡 Dicas

**Filtrar e ordenar:**
```javascript
const produtosFiltrados = produtos
  .filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))
  .filter(p => categoriaFiltro === 'Todos' || p.categoria === categoriaFiltro)
  .sort((a, b) => {
    if (ordenacao === 'menor') return a.preco - b.preco;
    if (ordenacao === 'maior') return b.preco - a.preco;
    if (ordenacao === 'nome') return a.nome.localeCompare(b.nome);
    return 0;
  });
```

### ✅ Critérios de Avaliação

- [ ] Lista de produtos renderizada corretamente com map()
- [ ] Busca funciona em tempo real
- [ ] Filtro por categoria funciona
- [ ] Ordenação por preço e nome funciona
- [ ] Indicador de estoque exibido corretamente
- [ ] Contador de produtos atualiza conforme filtros
- [ ] Uso correto de keys nos itens da lista
- [ ] Componentização adequada (CardProduto separado)

---

## 🚀 Atividade 3: Dashboard de Tarefas com API (Difícil)

**Nível:** 🔴 Difícil  
**Tempo estimado:** 60-80 minutos  
**Conceitos:** useEffect, Fetch API, Formulários controlados, Estado complexo, CRUD completo

### 📋 Descrição

Crie um **dashboard de gerenciamento de tarefas** que consome dados de uma API, permite criar, editar, marcar como concluída e deletar tarefas, além de exibir estatísticas.

### 🎯 Requisitos

1. **API a utilizar:**
   - **GET:** `https://jsonplaceholder.typicode.com/todos?_limit=10`
   - **POST:** `https://jsonplaceholder.typicode.com/todos` (simulado)
   - **PUT:** `https://jsonplaceholder.typicode.com/todos/:id` (simulado)
   - **DELETE:** `https://jsonplaceholder.typicode.com/todos/:id` (simulado)

   > ⚠️ **Nota:** A API JSONPlaceholder simula requisições POST/PUT/DELETE mas não persiste dados.

2. **Componentes:**
   - `Dashboard` (componente principal)
   - `FormularioTarefa` (adicionar/editar tarefa)
   - `ListaTarefas` (lista de tarefas)
   - `CardTarefa` (item individual)
   - `Estatisticas` (painel de estatísticas)
   - `Loading` (componente de carregamento)

3. **Funcionalidades:**

   **a) Listagem de Tarefas:**
   - Buscar tarefas da API ao montar o componente
   - Exibir loading enquanto busca
   - Tratar erros de requisição
   - Mostrar mensagem se não houver tarefas

   **b) Adicionar Tarefa:**
   - Formulário com campos:
     - `title` (texto, obrigatório)
     - `userId` (número, padrão: 1)
   - Validar campos antes de enviar
   - Adicionar tarefa à lista após criação

   **c) Editar Tarefa:**
   - Clicar em "Editar" preenche o formulário
   - Atualizar tarefa existente
   - Modo de edição visualmente diferente

   **d) Marcar como Concluída:**
   - Checkbox para marcar/desmarcar
   - Riscar texto de tarefas concluídas
   - Atualizar via PUT na API

   **e) Deletar Tarefa:**
   - Botão de deletar com confirmação
   - Remover da lista após confirmação

   **f) Estatísticas:**
   - Total de tarefas
   - Tarefas concluídas
   - Tarefas pendentes
   - Percentual de conclusão

   **g) Filtros:**
   - Todas
   - Pendentes
   - Concluídas

4. **Estados necessários:**
   - `tarefas` - array de tarefas
   - `loading` - estado de carregamento
   - `erro` - mensagem de erro
   - `formulario` - dados do formulário
   - `editando` - ID da tarefa sendo editada (null se não estiver editando)
   - `filtro` - filtro ativo ('todas', 'pendentes', 'concluidas')

### 💡 Estrutura de Dados

```javascript
// Formato da tarefa
{
  id: 1,
  userId: 1,
  title: "Estudar React",
  completed: false
}
```

### 🎨 Exemplo de Código Inicial

```javascript
function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [formulario, setFormulario] = useState({ title: '', userId: 1 });
  const [editando, setEditando] = useState(null);
  const [filtro, setFiltro] = useState('todas');

  // Buscar tarefas ao montar
  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) throw new Error('Erro ao buscar tarefas');
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Implementar outras funções...
  // - adicionarTarefa()
  // - atualizarTarefa()
  // - deletarTarefa()
  // - marcarConcluida()
  // - calcularEstatisticas()

  return (
    // JSX do Dashboard
  );
}
```

### 🎨 Sugestão de Layout

```
┌─────────────────────────────────────────┐
│         📊 Dashboard de Tarefas         │
├─────────────────────────────────────────┤
│  Estatísticas:                          │
│  📋 Total: 10 | ✅ Concluídas: 5 | ⏳ Pendentes: 5  │
├─────────────────────────────────────────┤
│  ➕ Adicionar Tarefa                    │
│  [________________] [Adicionar]         │
├─────────────────────────────────────────┤
│  Filtros: [Todas] [Pendentes] [Concluídas] │
├─────────────────────────────────────────┤
│  Tarefas:                               │
│  ☐ Estudar React    [✏️ Editar] [🗑️ Deletar] │
│  ☑ Fazer exercícios [✏️ Editar] [🗑️ Deletar] │
│  ☐ Revisar código   [✏️ Editar] [🗑️ Deletar] │
└─────────────────────────────────────────┘
```

### ✅ Critérios de Avaliação

**Funcionalidades (60%):**
- [ ] Busca tarefas da API ao montar (10%)
- [ ] Adiciona nova tarefa (10%)
- [ ] Edita tarefa existente (10%)
- [ ] Marca como concluída/pendente (10%)
- [ ] Deleta tarefa (10%)
- [ ] Filtros funcionam corretamente (10%)

**Interface e UX (20%):**
- [ ] Loading exibido durante requisições
- [ ] Mensagens de erro tratadas
- [ ] Feedback visual para ações (concluída, editando)
- [ ] Estatísticas atualizadas em tempo real

**Código e Boas Práticas (20%):**
- [ ] Uso correto de useEffect com dependências
- [ ] Async/await para requisições
- [ ] Try/catch para tratamento de erros
- [ ] Componentização adequada
- [ ] Código limpo e organizado
- [ ] Keys corretas nas listas

### 🎁 Desafios Extras (Opcional)

- [ ] Adicionar paginação (limite de 5 tarefas por página)
- [ ] Implementar busca por título
- [ ] Adicionar animações com CSS transitions
- [ ] Persistir dados no localStorage
- [ ] Adicionar toast notifications para ações
- [ ] Implementar drag-and-drop para reordenar tarefas

---

## 📚 Recursos de Apoio

- **Documentação React:** https://react.dev/
- **JSONPlaceholder:** https://jsonplaceholder.typicode.com/
- **MDN Fetch API:** https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API

---

## 💬 Dúvidas?

Não hesite em chamar o professor durante a realização das atividades! 🙋‍♂️🙋‍♀️

**Boa sorte e bom código! 🚀⚛️**
