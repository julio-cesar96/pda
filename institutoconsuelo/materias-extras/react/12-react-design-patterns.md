# 🎨 Design Patterns em React

> *"Padrões reutilizáveis para código limpo e escalável"*

---

## 📋 Padrões Essenciais

1. **Component Composition** - Componentes compostos
2. **Render Props** - Compartilhar lógica via props
3. **Higher-Order Components (HOC)** - Componentes de ordem superior
4. **Container/Presentational** - Separação de lógica e UI
5. **Compound Components** - Componentes que trabalham juntos
6. **State Reducer** - Controle externo de estado

---

## 🧩 1. Component Composition

```javascript
// ❌ Componente monolítico
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
        <button>Sair</button>
      </div>
      <div className="content">
        <div className="sidebar">...</div>
        <div className="main">...</div>
      </div>
    </div>
  );
}

// ✅ Composição de componentes
function Dashboard() {
  return (
    <Layout>
      <Header>
        <Title>Dashboard</Title>
        <LogoutButton />
      </Header>
      <Content>
        <Sidebar />
        <Main />
      </Content>
    </Layout>
  );
}
```

### Exemplo: Card Composto

```javascript
// Card.jsx
export function Card({ children, className }) {
  return <div className={`card ${className}`}>{children}</div>;
}

Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
};

Card.Footer = function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>;
};

// Uso
<Card>
  <Card.Header>
    <h2>Título</h2>
  </Card.Header>
  <Card.Body>
    <p>Conteúdo</p>
  </Card.Body>
  <Card.Footer>
    <button>Ação</button>
  </Card.Footer>
</Card>
```

---

## 🎯 2. Render Props

```javascript
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return render({ data, loading });
}

// Uso
<DataFetcher
  url="/api/users"
  render={({ data, loading }) => (
    loading ? <p>Carregando...</p> : (
      <ul>
        {data.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    )
  )}
/>

// Ou com children (função)
<DataFetcher url="/api/users">
  {({ data, loading }) => (
    loading ? <p>Carregando...</p> : <UsersList users={data} />
  )}
</DataFetcher>
```

---

## 🔄 3. Higher-Order Components (HOC)

```javascript
// HOC que adiciona autenticação
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    
    if (loading) return <p>Carregando...</p>;
    if (!user) return <Navigate to="/login" />;
    
    return <Component {...props} user={user} />;
  };
}

// Uso
function Dashboard({ user }) {
  return <h1>Bem-vindo, {user.name}</h1>;
}

export default withAuth(Dashboard);

// HOC para logging
function withLogging(Component) {
  return function LoggedComponent(props) {
    useEffect(() => {
      console.log('Component mounted:', Component.name);
      return () => console.log('Component unmounted:', Component.name);
    }, []);
    
    return <Component {...props} />;
  };
}

// Composição de HOCs
export default withAuth(withLogging(Dashboard));
```

---

## 📦 4. Container/Presentational Pattern

```javascript
// Presentational (UI pura)
function UserList({ users, onDelete }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => onDelete(user.id)}>Deletar</button>
        </li>
      ))}
    </ul>
  );
}

// Container (lógica)
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);
  
  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter(u => u.id !== id));
  };
  
  if (loading) return <p>Carregando...</p>;
  
  return <UserList users={users} onDelete={handleDelete} />;
}
```

---

## 🔗 5. Compound Components

```javascript
// Tabs.jsx
const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Tab = function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== id) return null;
  
  return <div className="tab-panel">{children}</div>;
};

// Uso
<Tabs defaultTab="home">
  <Tabs.List>
    <Tabs.Tab id="home">Home</Tabs.Tab>
    <Tabs.Tab id="profile">Perfil</Tabs.Tab>
    <Tabs.Tab id="settings">Configurações</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Panel id="home">Conteúdo Home</Tabs.Panel>
  <Tabs.Panel id="profile">Conteúdo Perfil</Tabs.Panel>
  <Tabs.Panel id="settings">Conteúdo Configurações</Tabs.Panel>
</Tabs>
```

---

## 🎛️ 6. State Reducer Pattern

```javascript
function Counter({ initialCount = 0, reducer }) {
  const defaultReducer = (state, action) => {
    switch (action.type) {
      case 'increment': return { count: state.count + 1 };
      case 'decrement': return { count: state.count - 1 };
      default: return state;
    }
  };
  
  const [state, dispatch] = useReducer(
    reducer || defaultReducer,
    { count: initialCount }
  );
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}

// Uso com reducer customizado
const customReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      // Limite máximo
      return { count: Math.min(state.count + 1, 10) };
    case 'decrement':
      // Limite mínimo
      return { count: Math.max(state.count - 1, 0) };
    default:
      return state;
  }
};

<Counter initialCount={5} reducer={customReducer} />
```

---

## 🔒 7. Provider Pattern

```javascript
// ThemeProvider.jsx
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}

// App.jsx
<ThemeProvider>
  <App />
</ThemeProvider>

// Componente
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
      }}
      onClick={toggleTheme}
    >
      Alternar Tema
    </button>
  );
}
```

---

## 🎣 8. Custom Hook Pattern

```javascript
// useToggle.js
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle, setValue];
}

// useAsync.js
function useAsync(asyncFn) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });
  
  const execute = useCallback(async (...params) => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const data = await asyncFn(...params);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      setState({ data: null, loading: false, error });
      throw error;
    }
  }, [asyncFn]);
  
  return { ...state, execute };
}

// Uso
function UserProfile({ userId }) {
  const { data, loading, error, execute } = useAsync(
    async (id) => {
      const res = await fetch(`/api/users/${id}`);
      return res.json();
    }
  );
  
  useEffect(() => {
    execute(userId);
  }, [userId, execute]);
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  
  return <div>{data?.name}</div>;
}
```

---

## 🏭 9. Factory Pattern

```javascript
// buttonFactory.jsx
const buttonVariants = {
  primary: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: 'white',
  },
  danger: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
};

function createButton(variant) {
  return function Button({ children, ...props }) {
    return (
      <button style={buttonVariants[variant]} {...props}>
        {children}
      </button>
    );
  };
}

export const PrimaryButton = createButton('primary');
export const SecondaryButton = createButton('secondary');
export const DangerButton = createButton('danger');

// Uso
<PrimaryButton>Salvar</PrimaryButton>
<SecondaryButton>Cancelar</SecondaryButton>
<DangerButton>Deletar</DangerButton>
```

---

## 🎯 10. Observer Pattern (Pub/Sub)

```javascript
// eventEmitter.js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Retorna função para unsubscribe
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

export const eventEmitter = new EventEmitter();

// useEventEmitter.js
function useEventEmitter(event, callback) {
  useEffect(() => {
    const unsubscribe = eventEmitter.subscribe(event, callback);
    return unsubscribe;
  }, [event, callback]);
}

// ComponentA.jsx (emite)
function ComponentA() {
  const handleClick = () => {
    eventEmitter.emit('user-logged-in', { name: 'João' });
  };
  
  return <button onClick={handleClick}>Login</button>;
}

// ComponentB.jsx (escuta)
function ComponentB() {
  const [user, setUser] = useState(null);
  
  useEventEmitter('user-logged-in', (data) => {
    setUser(data);
  });
  
  return <div>{user?.name}</div>;
}
```

---

## ✅ Quando Usar Cada Padrão?

| Padrão | Quando Usar |
|--------|-------------|
| **Composition** | Componentes flexíveis e reutilizáveis |
| **Render Props** | Compartilhar lógica entre componentes (legado) |
| **HOC** | Adicionar funcionalidades a componentes (legado) |
| **Container/Presentational** | Separar lógica de UI |
| **Compound** | Componentes que trabalham juntos (tabs, accordion) |
| **State Reducer** | Permitir controle externo de estado |
| **Provider** | Estado global ou contexto compartilhado |
| **Custom Hook** | Reutilizar lógica stateful (preferido hoje) |

---

## 📚 Recursos

- [React Patterns](https://reactpatterns.com/)
- [Patterns.dev](https://www.patterns.dev/posts/react-patterns/)

---

**Próximo:** Testes com React Testing Library + Vitest 🧪
