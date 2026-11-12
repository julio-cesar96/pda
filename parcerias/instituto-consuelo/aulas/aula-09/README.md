*"Componentes são os blocos de construção de aplicações React."*

# ⚛️ React: Fundamentos e Componentes

---

## 🧠 Objetivos de Aprendizagem

Ao final desta aula, você será capaz de:

1. **Compreender os fundamentos do React**:
   - Explicar o que é React e por que é usado
   - Entender o conceito de componentes e Virtual DOM
   - Diferenciar entre biblioteca e framework
   - Compreender o ecossistema React

2. **Configurar ambiente de desenvolvimento React**:
   - Criar projetos com Vite
   - Entender a estrutura de pastas de um projeto React
   - Configurar ferramentas de desenvolvimento
   - Usar React DevTools para debugging

3. **Criar e trabalhar com componentes**:
   - Criar componentes funcionais
   - Entender JSX e suas regras
   - Passar dados via props
   - Compor componentes para criar interfaces

4. **Gerenciar estado com hooks**:
   - Utilizar useState para estado local
   - Entender o ciclo de vida com useEffect
   - Aplicar regras dos hooks
   - Gerenciar múltiplos estados

5. **Trabalhar com listas e eventos**:
   - Renderizar listas de dados
   - Manipular eventos em React
   - Trabalhar com formulários controlados
   - Implementar validação básica

6. **Consumir APIs em React**:
   - Fazer requisições HTTP com fetch
   - Gerenciar estados de loading e erro
   - Exibir dados dinâmicos da API
   - Implementar padrões de carregamento

---

## 📋 Conteúdo Programático

### 1. Introdução ao React: A Biblioteca UI Mais Popular

#### 1.1 O que é React?

**React** é uma **biblioteca JavaScript** criada pelo Facebook (Meta) em 2013 para construir **interfaces de usuário (UI)** de forma **declarativa** e baseada em **componentes**.

**Características principais:**
- ⚛️ **Baseado em componentes** - UI dividida em partes reutilizáveis
- 🔄 **Virtual DOM** - Atualizações eficientes da interface
- 📦 **Declarativo** - Você descreve o QUE quer, não COMO fazer
- 🔀 **Unidirecional** - Fluxo de dados previsível
- 🌐 **Multiplataforma** - Web (React), Mobile (React Native), Desktop (Electron)

**React vs JavaScript Vanilla:**

```javascript
// ❌ JavaScript Vanilla (Imperativo)
const botao = document.getElementById('btn');
let contador = 0;

botao.addEventListener('click', () => {
    contador++;
    document.getElementById('contador').textContent = contador;
});

// ✅ React (Declarativo)
function Contador() {
    const [contador, setContador] = useState(0);
    
    return (
        <div>
            <p>{contador}</p>
            <button onClick={() => setContador(contador + 1)}>
                Incrementar
            </button>
        </div>
    );
}
```

**Por que usar React?**
- ✅ **Componentização** - Código reutilizável e organizado
- ✅ **Produtividade** - Menos código, mais funcionalidade
- ✅ **Performance** - Virtual DOM otimiza atualizações
- ✅ **Ecossistema** - Milhares de bibliotecas e ferramentas
- ✅ **Comunidade** - Suporte ativo e materiais abundantes
- ✅ **Mercado** - Alta demanda profissional

#### 1.2 Virtual DOM: Como React é Rápido

**DOM Real:**
```text
Mudança no estado → Atualizar DOM → Recalcular Layout → Repintar Tela
                      (lento)         (lento)           (lento)
```

**Virtual DOM:**
```text
Mudança no estado → Atualizar Virtual DOM → Comparar (diff) → Atualizar apenas o necessário no DOM Real
                    (rápido, em memória)     (rápido)         (mínimo de operações)
```

**Exemplo:**

```javascript
// Antes: 10 itens na lista
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    ...
    <li>Item 10</li>
</ul>

// Depois: Adiciona Item 11
// React: Compara Virtual DOMs, identifica diferença, adiciona APENAS o <li>Item 11</li>
// Vanilla JS: Recria a lista inteira (ou precisa manipular manualmente)
```

#### 1.3 Biblioteca vs Framework

**React é uma BIBLIOTECA, não um framework!**

| Aspecto | React (Biblioteca) | Angular (Framework) |
|---------|-------------------|---------------------|
| **Foco** | UI (View) | Aplicação completa |
| **Roteamento** | Biblioteca externa (React Router) | Integrado |
| **Estado Global** | Bibliotecas (Redux, Zustand) | Integrado (Services) |
| **HTTP** | fetch ou bibliotecas | Integrado (HttpClient) |
| **Flexibilidade** | 🟢 Alta | 🟡 Média |
| **Curva de Aprendizado** | 🟢 Moderada | 🔴 Alta |
| **Tamanho** | 🟢 Pequeno (~40kb) | 🔴 Grande (~500kb) |

**Analogia:**
- **React (biblioteca):** Caixa de ferramentas - você escolhe as ferramentas que precisa
- **Framework:** Kit completo - vem com tudo, mas menos flexível

---

### 2. Configurando o Ambiente de Desenvolvimento

#### 2.1 Ferramentas Necessárias

```bash
# 1. Node.js (versão LTS recomendada)
node --version  # v18+ ou v20+

# 2. npm (vem com Node.js)
npm --version   # 9+ ou 10+

# 3. Editor de código (VS Code recomendado)
# Extensões úteis:
# - ES7+ React/Redux/React-Native snippets
# - Prettier
# - ESLint
```

#### 2.2 Criar Projeto React com Vite

**Vite** é a ferramenta moderna recomendada (mais rápida que Create React App).

```bash
# Criar projeto
npm create vite@latest meu-app-react -- --template react

# Entrar na pasta
cd meu-app-react

# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev

# Abrir no navegador: http://localhost:5173
```

**Estrutura de pastas criada:**

```text
meu-app-react/
├── node_modules/        # Dependências (não commitar)
├── public/              # Arquivos estáticos
│   └── vite.svg
├── src/                 # Código fonte
│   ├── assets/          # Imagens, fontes, etc.
│   ├── App.css          # Estilos do App
│   ├── App.jsx          # Componente principal
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Ponto de entrada
├── .gitignore           # Arquivos ignorados pelo Git
├── index.html           # HTML raiz
├── package.json         # Dependências e scripts
└── vite.config.js       # Configuração do Vite
```

#### 2.3 Entendendo os Arquivos Principais

**index.html:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meu App React</title>
  </head>
  <body>
    <div id="root"></div> <!-- React renderiza aqui -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**src/main.jsx:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Renderiza o componente App no elemento #root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

**src/App.jsx:**
```javascript
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Olá, React!</h1>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default App;
```

#### 2.4 React DevTools

**Instalação:**
- Chrome: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- Firefox: [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

**O que faz:**
- 🔍 Inspecionar árvore de componentes
- 📊 Ver props e state de cada componente
- ⚡ Identificar re-renderizações
- 🐛 Debugar problemas de performance

---

### 3. JSX: JavaScript + XML

#### 3.1 O que é JSX?

**JSX** é uma **extensão de sintaxe** do JavaScript que permite escrever **HTML dentro do JavaScript**.

```javascript
// ❌ Sem JSX (createElement)
const elemento = React.createElement(
  'h1',
  { className: 'titulo' },
  'Olá, mundo!'
);

// ✅ Com JSX (mais legível)
const elemento = <h1 className="titulo">Olá, mundo!</h1>;
```

**JSX não é HTML!** É JavaScript que **parece** HTML e é **transpilado** para JavaScript puro.

#### 3.2 Regras do JSX

**1. Sempre retornar um único elemento raiz:**

```javascript
// ❌ ERRO: Múltiplas raízes
function Componente() {
  return (
    <h1>Título</h1>
    <p>Parágrafo</p>
  );
}

// ✅ CORRETO: Única raiz (div)
function Componente() {
  return (
    <div>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </div>
  );
}

// ✅ MELHOR: Fragment (não cria div extra no DOM)
function Componente() {
  return (
    <>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </>
  );
}

// Ou
function Componente() {
  return (
    <React.Fragment>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </React.Fragment>
  );
}
```

**2. className em vez de class:**

```javascript
// ❌ ERRO: 'class' é palavra reservada em JS
<div class="container">Conteúdo</div>

// ✅ CORRETO: use 'className'
<div className="container">Conteúdo</div>
```

**3. Fechar todas as tags:**

```javascript
// ❌ ERRO: Tag não fechada
<img src="foto.jpg">
<input type="text">

// ✅ CORRETO: Auto-fechar tags vazias
<img src="foto.jpg" />
<input type="text" />
```

**4. camelCase para atributos:**

```javascript
// ❌ ERRO
<button onclick="funcao()">Clique</button>
<div style="background-color: red;">Texto</div>

// ✅ CORRETO
<button onClick={funcao}>Clique</button>
<div style={{ backgroundColor: 'red' }}>Texto</div>
```

**5. Expressões JavaScript com `{}`:**

```javascript
function Saudacao() {
  const nome = 'João';
  const idade = 25;
  
  return (
    <div>
      <h1>Olá, {nome}!</h1>
      <p>Você tem {idade} anos.</p>
      <p>Ano que vem terá {idade + 1} anos.</p>
      <p>É maior de idade? {idade >= 18 ? 'Sim' : 'Não'}</p>
    </div>
  );
}
```

#### 3.3 Exemplos Práticos de JSX

```javascript
function Perfil() {
  const usuario = {
    nome: 'Ana Silva',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Desenvolvedora Frontend'
  };
  
  const estiloCard = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '300px'
  };
  
  return (
    <div style={estiloCard}>
      <img 
        src={usuario.avatar} 
        alt={usuario.nome}
        style={{ borderRadius: '50%', width: '100px' }}
      />
      <h2>{usuario.nome}</h2>
      <p>{usuario.bio}</p>
      <button onClick={() => alert('Seguindo!')}>
        Seguir
      </button>
    </div>
  );
}
```

---

### 4. Componentes: Blocos de Construção

#### 4.1 Componentes Funcionais

**Componentes** são **funções JavaScript** que retornam **JSX**.

```javascript
// Componente simples
function BotaoPrimario() {
  return (
    <button className="btn btn-primary">
      Clique aqui
    </button>
  );
}

// Usando o componente
function App() {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      <BotaoPrimario />
      <BotaoPrimario />
      <BotaoPrimario />
    </div>
  );
}
```

**Regras de Nomenclatura:**
- ✅ **PascalCase** (primeira letra maiúscula): `BotaoPrimario`, `ListaUsuarios`
- ❌ **camelCase** não funciona: `botaoPrimario` (React não reconhece)
- ✅ Nome do arquivo deve corresponder: `BotaoPrimario.jsx`

**Estrutura recomendada:**

```text
src/
├── components/
│   ├── BotaoPrimario.jsx
│   ├── Card.jsx
│   └── Header.jsx
├── App.jsx
└── main.jsx
```

#### 4.2 Props: Passando Dados para Componentes

**Props** (propriedades) são **argumentos** passados para componentes, como parâmetros de função.

```javascript
// Componente que recebe props
function Saudacao(props) {
  return <h1>Olá, {props.nome}!</h1>;
}

// Usando o componente
function App() {
  return (
    <div>
      <Saudacao nome="João" />
      <Saudacao nome="Maria" />
      <Saudacao nome="Pedro" />
    </div>
  );
}
```

**Destructuring (recomendado):**

```javascript
// ✅ Melhor: Destructuring
function Saudacao({ nome, idade }) {
  return (
    <div>
      <h1>Olá, {nome}!</h1>
      <p>Você tem {idade} anos.</p>
    </div>
  );
}

// Uso
<Saudacao nome="Ana" idade={25} />
```

**Props são imutáveis (read-only):**

```javascript
function Componente(props) {
  // ❌ ERRO: Não pode modificar props
  props.nome = 'Outro nome';
  
  // ✅ Props são apenas para leitura
  return <h1>{props.nome}</h1>;
}
```

**Múltiplos tipos de props:**

```javascript
function Card({ titulo, descricao, preco, disponivel, onClick }) {
  return (
    <div className="card">
      <h2>{titulo}</h2>                    {/* String */}
      <p>{descricao}</p>                   {/* String */}
      <span>R$ {preco.toFixed(2)}</span>   {/* Number */}
      {disponivel && <span>✅ Disponível</span>} {/* Boolean */}
      <button onClick={onClick}>Comprar</button>  {/* Function */}
    </div>
  );
}

// Uso
<Card 
  titulo="Notebook"
  descricao="Dell Inspiron 15"
  preco={2500.00}
  disponivel={true}
  onClick={() => alert('Comprando!')}
/>
```

**Props com valores padrão:**

```javascript
function Botao({ texto = 'Clique aqui', tipo = 'primary' }) {
  return (
    <button className={`btn btn-${tipo}`}>
      {texto}
    </button>
  );
}

// Uso
<Botao />                           // Usa valores padrão
<Botao texto="Enviar" tipo="success" />  // Sobrescreve
```

**Children (conteúdo aninhado):**

```javascript
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Uso
<Card>
  <h2>Título</h2>
  <p>Conteúdo do card</p>
  <button>Ação</button>
</Card>
```

#### 4.3 Composição de Componentes

**Dividir UI em componentes pequenos e reutilizáveis:**

```javascript
// components/Avatar.jsx
function Avatar({ url, nome }) {
  return (
    <img 
      src={url} 
      alt={nome}
      className="avatar"
    />
  );
}

// components/PerfilUsuario.jsx
function PerfilUsuario({ usuario }) {
  return (
    <div className="perfil">
      <Avatar url={usuario.avatar} nome={usuario.nome} />
      <h3>{usuario.nome}</h3>
      <p>{usuario.bio}</p>
    </div>
  );
}

// components/ListaUsuarios.jsx
function ListaUsuarios({ usuarios }) {
  return (
    <div className="lista-usuarios">
      {usuarios.map(usuario => (
        <PerfilUsuario key={usuario.id} usuario={usuario} />
      ))}
    </div>
  );
}

// App.jsx
function App() {
  const usuarios = [
    { id: 1, nome: 'Ana', avatar: 'url1', bio: 'Dev Frontend' },
    { id: 2, nome: 'João', avatar: 'url2', bio: 'Dev Backend' }
  ];
  
  return (
    <div>
      <h1>Usuários</h1>
      <ListaUsuarios usuarios={usuarios} />
    </div>
  );
}
```

---

### 5. Estado com useState

#### 5.1 O que é Estado (State)?

**Estado** são **dados que mudam ao longo do tempo** e causam re-renderização do componente.

```javascript
import { useState } from 'react';

function Contador() {
  // Declarar estado
  const [contador, setContador] = useState(0);
  //      ↑           ↑               ↑
  //   variável   setter       valor inicial
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

**Como funciona:**
1. `useState(0)` cria estado com valor inicial `0`
2. Retorna array com 2 elementos: `[valor, função para atualizar]`
3. Quando `setContador()` é chamado, componente re-renderiza com novo valor

#### 5.2 Regras do useState

**1. Sempre no topo do componente:**

```javascript
// ❌ ERRO: Hooks não podem estar dentro de condições/loops
function Componente() {
  if (algumCondicao) {
    const [estado, setEstado] = useState(0); // ❌
  }
  
  return <div>...</div>;
}

// ✅ CORRETO
function Componente() {
  const [estado, setEstado] = useState(0); // ✅
  
  if (algumCondicao) {
    // Lógica aqui
  }
  
  return <div>...</div>;
}
```

**2. Atualizar estado corretamente:**

```javascript
function Contador() {
  const [count, setCount] = useState(0);
  
  // ❌ NUNCA modifique diretamente
  const incrementarErrado = () => {
    count = count + 1; // ❌ Não funciona!
  };
  
  // ✅ Sempre use o setter
  const incrementar = () => {
    setCount(count + 1); // ✅
  };
  
  // ✅ Ou use função de callback (para múltiplas atualizações)
  const incrementarDuplo = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // ✅ Funciona!
  };
  
  return <button onClick={incrementar}>Count: {count}</button>;
}
```

#### 5.3 Múltiplos Estados

```javascript
function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState(0);
  const [aceiteTermos, setAceiteTermos] = useState(false);
  
  return (
    <form>
      <input 
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      
      <input 
        type="number"
        value={idade}
        onChange={(e) => setIdade(Number(e.target.value))}
        placeholder="Idade"
      />
      
      <label>
        <input 
          type="checkbox"
          checked={aceiteTermos}
          onChange={(e) => setAceiteTermos(e.target.checked)}
        />
        Aceito os termos
      </label>
    </form>
  );
}
```

#### 5.4 Estado com Objetos e Arrays

**Objetos:**

```javascript
function FormularioUsuario() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    idade: 0
  });
  
  // ❌ ERRO: Mutação direta
  const atualizarErrado = () => {
    usuario.nome = 'João'; // ❌ Não funciona!
  };
  
  // ✅ CORRETO: Criar novo objeto (spread)
  const atualizarNome = (novoNome) => {
    setUsuario({
      ...usuario,        // Copia propriedades existentes
      nome: novoNome     // Sobrescreve apenas 'nome'
    });
  };
  
  // ✅ Genérico para qualquer campo
  const handleChange = (campo, valor) => {
    setUsuario({
      ...usuario,
      [campo]: valor
    });
  };
  
  return (
    <form>
      <input 
        value={usuario.nome}
        onChange={(e) => handleChange('nome', e.target.value)}
      />
      <input 
        value={usuario.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
    </form>
  );
}
```

**Arrays:**

```javascript
function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  
  // Adicionar
  const adicionarTarefa = () => {
    setTarefas([...tarefas, novaTarefa]);
    setNovaTarefa('');
  };
  
  // Remover
  const removerTarefa = (indice) => {
    setTarefas(tarefas.filter((_, i) => i !== indice));
  };
  
  // Atualizar
  const marcarConcluida = (indice) => {
    setTarefas(
      tarefas.map((tarefa, i) => 
        i === indice ? { ...tarefa, concluida: true } : tarefa
      )
    );
  };
  
  return (
    <div>
      <input 
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
      
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {tarefa}
            <button onClick={() => removerTarefa(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 6. Renderização de Listas

#### 6.1 map() para Renderizar Arrays

```javascript
function ListaProdutos() {
  const produtos = [
    { id: 1, nome: 'Notebook', preco: 2500 },
    { id: 2, nome: 'Mouse', preco: 50 },
    { id: 3, nome: 'Teclado', preco: 150 }
  ];
  
  return (
    <ul>
      {produtos.map(produto => (
        <li key={produto.id}>
          {produto.nome} - R$ {produto.preco}
        </li>
      ))}
    </ul>
  );
}
```

#### 6.2 A Importância da Key

**Por que `key` é obrigatória?**

React usa `key` para identificar qual item mudou, foi adicionado ou removido. Isso otimiza re-renderizações.

```javascript
// ❌ ERRO: Sem key (React vai avisar no console)
{produtos.map(produto => (
  <li>{produto.nome}</li>
))}

// ⚠️ RUIM: Usar índice como key (problemas com reordenação)
{produtos.map((produto, index) => (
  <li key={index}>{produto.nome}</li>
))}

// ✅ BOM: Usar ID único
{produtos.map(produto => (
  <li key={produto.id}>{produto.nome}</li>
))}
```

**Exemplo com componente:**

```javascript
function CardProduto({ produto }) {
  return (
    <div className="card">
      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <button>Adicionar ao carrinho</button>
    </div>
  );
}

function ListaProdutos({ produtos }) {
  return (
    <div className="grid">
      {produtos.map(produto => (
        <CardProduto key={produto.id} produto={produto} />
      ))}
    </div>
  );
}
```

#### 6.3 Renderização Condicional

```javascript
function ListaProdutos({ produtos }) {
  // Se array vazio
  if (produtos.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }
  
  return (
    <div>
      {produtos.map(produto => (
        <div key={produto.id}>
          <h3>{produto.nome}</h3>
          
          {/* Condicional inline */}
          {produto.promocao && <span className="badge">Promoção!</span>}
          
          {/* Ternário */}
          <span>
            {produto.estoque > 0 ? 'Em estoque' : 'Esgotado'}
          </span>
        </div>
      ))}
    </div>
  );
}
```

---

### 7. Eventos em React

#### 7.1 Manipulando Eventos

```javascript
function BotaoInterativo() {
  // Função handler
  const handleClick = () => {
    alert('Botão clicado!');
  };
  
  const handleMouseEnter = () => {
    console.log('Mouse entrou no botão');
  };
  
  return (
    <div>
      {/* Eventos inline */}
      <button onClick={() => alert('Clicou!')}>
        Click inline
      </button>
      
      {/* Função handler (recomendado) */}
      <button onClick={handleClick} onMouseEnter={handleMouseEnter}>
        Click handler
      </button>
      
      {/* ⚠️ Cuidado: Não chamar a função imediatamente */}
      <button onClick={handleClick()}>  {/* ❌ Executa na renderização */}
      <button onClick={handleClick}>    {/* ✅ Executa no click */}
    </div>
  );
}
```

#### 7.2 Event Object

```javascript
function Formulario() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede reload da página
    console.log('Formulário enviado');
  };
  
  const handleInputChange = (event) => {
    console.log('Valor:', event.target.value);
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter pressionado!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

#### 7.3 Formulários Controlados

**Componente controlado:** React controla o valor do input via estado.

```javascript
function FormularioLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!email.includes('@')) {
      setErro('Email inválido');
      return;
    }
    
    if (senha.length < 6) {
      setErro('Senha deve ter no mínimo 6 caracteres');
      return;
    }
    
    setErro('');
    console.log('Login:', { email, senha });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      
      <div>
        <input 
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
      </div>
      
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      
      <button type="submit">Entrar</button>
    </form>
  );
}
```

---

### 8. useEffect: Efeitos Colaterais

#### 8.1 O que é useEffect?

**useEffect** permite executar **efeitos colaterais** (side effects) em componentes funcionais:
- Requisições HTTP
- Manipulação do DOM
- Timers (setTimeout, setInterval)
- Subscrições (WebSockets, eventos)

```javascript
import { useState, useEffect } from 'react';

function Exemplo() {
  const [count, setCount] = useState(0);
  
  // useEffect executa APÓS a renderização
  useEffect(() => {
    console.log('Componente renderizado ou count mudou');
    document.title = `Count: ${count}`;
  }, [count]); // Array de dependências
  //  ↑
  // Executa quando 'count' mudar
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}
```

#### 8.2 Array de Dependências

```javascript
useEffect(() => {
  // Código do efeito
}, [dependencias]);
```

**Três comportamentos possíveis:**

```javascript
// 1. Sem array: Executa TODA renderização (evitar!)
useEffect(() => {
  console.log('Executa sempre');
});

// 2. Array vazio: Executa APENAS na montagem do componente
useEffect(() => {
  console.log('Executa uma vez (componentDidMount)');
}, []);

// 3. Com dependências: Executa quando dependências mudam
useEffect(() => {
  console.log('Executa quando count mudar');
}, [count]);
```

#### 8.3 Cleanup (Limpeza)

```javascript
function Timer() {
  const [segundos, setSegundos] = useState(0);
  
  useEffect(() => {
    // Configurar timer
    const intervalId = setInterval(() => {
      setSegundos(prev => prev + 1);
    }, 1000);
    
    // Cleanup: executado quando componente desmonta ou antes do próximo efeito
    return () => {
      clearInterval(intervalId);
      console.log('Timer limpo');
    };
  }, []); // Apenas na montagem
  
  return <p>Tempo: {segundos}s</p>;
}
```

---

### 9. Consumindo APIs com React

#### 9.1 Fetch Básico

```javascript
import { useState, useEffect } from 'react';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    buscarUsuarios();
  }, []);
  
  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  
  return (
    <ul>
      {usuarios.map(usuario => (
        <li key={usuario.id}>{usuario.name}</li>
      ))}
    </ul>
  );
}
```

#### 9.2 Fetch com Async/Await

```javascript
function ListaPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    const buscarPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    buscarPosts();
  }, []);
  
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando posts...</p>
      </div>
    );
  }
  
  if (erro) {
    return (
      <div className="erro">
        <p>❌ Erro: {erro}</p>
        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    );
  }
  
  return (
    <div className="posts">
      {posts.map(post => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}
```

#### 9.3 Componente Reutilizável para Fetch

```javascript
// hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        setData(json);
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, erro };
}

// Uso em componentes
function App() {
  const { data: usuarios, loading, erro } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  
  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  
  return (
    <ul>
      {usuarios?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

### 10. Projeto Prático: Galeria de Fotos

**Objetivo:** Criar uma galeria que busca fotos de uma API e exibe em grid.

```javascript
// App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState('');
  const [fotosFiltradas, setFotosFiltradas] = useState([]);
  
  useEffect(() => {
    const buscarFotos = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/photos?_limit=20'
        );
        
        if (!response.ok) {
          throw new Error('Erro ao buscar fotos');
        }
        
        const data = await response.json();
        setFotos(data);
        setFotosFiltradas(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    buscarFotos();
  }, []);
  
  useEffect(() => {
    const resultado = fotos.filter(foto =>
      foto.title.toLowerCase().includes(busca.toLowerCase())
    );
    setFotosFiltradas(resultado);
  }, [busca, fotos]);
  
  if (loading) {
    return <div className="loading">Carregando galeria...</div>;
  }
  
  if (erro) {
    return <div className="erro">Erro: {erro}</div>;
  }
  
  return (
    <div className="app">
      <header>
        <h1>📸 Galeria de Fotos</h1>
        <input
          type="search"
          placeholder="Buscar fotos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="search-input"
        />
        <p>{fotosFiltradas.length} fotos encontradas</p>
      </header>
      
      <div className="galeria">
        {fotosFiltradas.map(foto => (
          <CardFoto key={foto.id} foto={foto} />
        ))}
      </div>
    </div>
  );
}

function CardFoto({ foto }) {
  const [imagemCarregada, setImagemCarregada] = useState(false);
  
  return (
    <div className="card-foto">
      {!imagemCarregada && (
        <div className="skeleton">Carregando...</div>
      )}
      <img
        src={foto.thumbnailUrl}
        alt={foto.title}
        onLoad={() => setImagemCarregada(true)}
        style={{ display: imagemCarregada ? 'block' : 'none' }}
      />
      <p className="titulo">{foto.title}</p>
    </div>
  );
}

export default App;
```

**App.css:**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.search-input {
  padding: 12px 20px;
  width: 100%;
  max-width: 500px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #4CAF50;
}

.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.card-foto {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-foto:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.card-foto img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.titulo {
  padding: 12px;
  font-size: 14px;
  color: #555;
  line-height: 1.4;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skeleton {
  width: 100%;
  height: 150px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.loading,
.erro {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: #666;
}

.erro {
  color: #e74c3c;
}
```

---

## 📚 Exercícios Práticos

### Exercício 1: Contador Avançado

Crie um contador com:
- Botões: +1, -1, +5, -5, Reset
- Não permitir valores negativos
- Mudar cor quando passar de 10

### Exercício 2: Lista de Tarefas (To-Do)

Implemente:
- Adicionar tarefa
- Marcar como concluída (riscado)
- Remover tarefa
- Filtrar: Todas / Ativas / Concluídas
- Persistir no localStorage

### Exercício 3: Formulário de Cadastro

Crie um formulário com:
- Nome, Email, Senha, Confirmar Senha
- Validação em tempo real
- Mensagens de erro específicas
- Botão desabilitado se inválido

### Exercício 4: Busca de Usuários (API)

Usar `https://jsonplaceholder.typicode.com/users`:
- Exibir lista de usuários
- Campo de busca por nome
- Clicar no usuário mostra detalhes
- Loading e tratamento de erro

---

## 🎯 Resumo - Cheat Sheet

```javascript
// ========== COMPONENTE ==========
function MeuComponente({ prop1, prop2 }) {
  return <div>JSX aqui</div>;
}

// ========== ESTADO ==========
import { useState } from 'react';

const [estado, setEstado] = useState(valorInicial);
setEstado(novoValor);

// ========== EFEITO ==========
import { useEffect } from 'react';

useEffect(() => {
  // Código do efeito
  return () => {
    // Cleanup
  };
}, [dependencias]);

// ========== LISTAS ==========
{array.map(item => (
  <ComponenteItem key={item.id} item={item} />
))}

// ========== EVENTOS ==========
<button onClick={handleClick}>Clique</button>
<input onChange={(e) => setValor(e.target.value)} />

// ========== CONDICIONAL ==========
{condicao && <Componente />}
{condicao ? <ComponenteA /> : <ComponenteB />}

// ========== FETCH ==========
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [erro, setErro] = useState(null);

useEffect(() => {
  const buscarDados = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro na requisição');
      const dados = await response.json();
      setData(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  buscarDados();
}, []);
```

---

## 🚀 Próximos Passos

Após dominar estes fundamentos, você pode explorar:

1. **React Router** - Navegação entre páginas
2. **Context API** - Gerenciamento de estado global
3. **Custom Hooks** - Reutilizar lógica
4. **React Query** - Gerenciamento de dados de API
5. **Styled Components** - CSS-in-JS
6. **TypeScript com React** - Tipagem estática
7. **Next.js** - Framework React para produção
8. **Testing Library** - Testes de componentes

---

## 📚 Recursos Adicionais

- **Documentação Oficial:** <https://react.dev/>
- **Tutorial Interativo:** <https://react.dev/learn>
- **React DevTools:** Extensão do navegador para debugging
- **Vite:** <https://vitejs.dev/>
- **Create React App:** <https://create-react-app.dev/> (alternativa)

---

**Parabéns! Você deu os primeiros passos no React! 🎉**

Continue praticando, construindo projetos reais e explorando o ecossistema React. A jornada está apenas começando! ⚛️✨
