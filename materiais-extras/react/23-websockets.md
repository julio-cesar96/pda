# 🔌 WebSockets em React

> *"Comunicação em tempo real"*

---

## 📋 Índice

1. [O que são WebSockets?](#o-que-sao-websockets)
2. [Socket.io com React](#socketio-com-react)
3. [Conexão e Desconexão](#conexao-e-desconexao)
4. [Enviando e Recebendo Mensagens](#mensagens)
5. [Rooms e Namespaces](#rooms-e-namespaces)
6. [Autenticação](#autenticacao)
7. [Reconexão Automática](#reconexao)
8. [Padrões e Boas Práticas](#padroes)
9. [Alternativas (SSE, Polling)](#alternativas)
10. [Escalabilidade](#escalabilidade)

---

## 🌐 O que são WebSockets?

### HTTP vs WebSocket

```
HTTP (Request-Response)
Cliente  →  Request  →  Servidor
Cliente  ←  Response ←  Servidor

WebSocket (Full-Duplex)
Cliente  ⇄  Servidor
  ↓           ↓
Bidirecional em tempo real
```

### Quando usar?

✅ **Usar WebSockets:**
- Chat em tempo real
- Notificações push
- Jogos multiplayer
- Colaboração (Google Docs)
- Dashboard com dados ao vivo
- Trading/Cotações

❌ **Não usar:**
- Requisições simples (use fetch)
- Dados que não mudam frequentemente
- SEO crítico (WebSocket não é indexável)

---

## 🚀 Socket.io com React

### Instalação

```bash
# Cliente
npm install socket.io-client

# Servidor (Node.js/Express)
npm install socket.io express
```

### Servidor Básico

```typescript
// server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('message', (data) => {
    console.log('Received:', data);
    // Enviar para todos
    io.emit('message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Cliente React

```tsx
// socket.ts
import { io, Socket } from 'socket.io-client';

export const socket: Socket = io('http://localhost:3000', {
  autoConnect: false, // Conectar manualmente
});

// App.tsx
import { useEffect, useState } from 'react';
import { socket } from './socket';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
    // Conectar
    socket.connect();
    
    // Event listeners
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected:', socket.id);
    });
    
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    
    socket.on('message', (data) => {
      setMessages(prev => [...prev, data]);
    });
    
    // Cleanup
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
      socket.disconnect();
    };
  }, []);
  
  const sendMessage = (msg: string) => {
    socket.emit('message', msg);
  };
  
  return (
    <div>
      <p>Status: {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}</p>
      <button onClick={() => sendMessage('Hello!')}>Enviar</button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🔌 Conexão e Desconexão

### Hook Customizado

```tsx
// hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { socket } from '../socket';

interface UseSocketOptions {
  autoConnect?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function useSocket(options: UseSocketOptions = {}) {
  const { autoConnect = true, onConnect, onDisconnect } = options;
  const [isConnected, setIsConnected] = useState(socket.connected);
  
  useEffect(() => {
    if (autoConnect) {
      socket.connect();
    }
    
    function handleConnect() {
      setIsConnected(true);
      onConnect?.();
    }
    
    function handleDisconnect() {
      setIsConnected(false);
      onDisconnect?.();
    }
    
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      if (autoConnect) {
        socket.disconnect();
      }
    };
  }, [autoConnect, onConnect, onDisconnect]);
  
  return {
    socket,
    isConnected,
    connect: () => socket.connect(),
    disconnect: () => socket.disconnect(),
  };
}

// Usar:
function App() {
  const { isConnected, socket } = useSocket({
    onConnect: () => console.log('Connected!'),
    onDisconnect: () => console.log('Disconnected!'),
  });
  
  return <div>Status: {isConnected ? 'Online' : 'Offline'}</div>;
}
```

---

## 💬 Enviando e Recebendo Mensagens

### Hook para Chat

```tsx
// hooks/useChat.ts
import { useEffect, useState } from 'react';
import { socket } from '../socket';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: number;
}

export function useChat(roomId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    if (roomId) {
      socket.emit('join-room', roomId);
    }
    
    socket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });
    
    socket.on('message-history', (history: Message[]) => {
      setMessages(history);
    });
    
    return () => {
      socket.off('message');
      socket.off('message-history');
      if (roomId) {
        socket.emit('leave-room', roomId);
      }
    };
  }, [roomId]);
  
  const sendMessage = (text: string, user: string) => {
    const message: Message = {
      id: crypto.randomUUID(),
      user,
      text,
      timestamp: Date.now(),
    };
    socket.emit('message', message);
  };
  
  const clearMessages = () => {
    setMessages([]);
  };
  
  return {
    messages,
    sendMessage,
    clearMessages,
  };
}

// ChatComponent.tsx
function ChatComponent({ roomId, username }: { roomId: string; username: string }) {
  const { messages, sendMessage } = useChat(roomId);
  const [input, setInput] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input, username);
      setInput('');
    }
  };
  
  return (
    <div className="chat">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <strong>{msg.user}:</strong> {msg.text}
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma mensagem..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
```

---

## 🏠 Rooms e Namespaces

### Servidor com Rooms

```typescript
// server.ts
io.on('connection', (socket) => {
  socket.on('join-room', (roomId: string) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
    
    // Notificar outros usuários da sala
    socket.to(roomId).emit('user-joined', socket.id);
  });
  
  socket.on('leave-room', (roomId: string) => {
    socket.leave(roomId);
    socket.to(roomId).emit('user-left', socket.id);
  });
  
  socket.on('message', (data) => {
    const { roomId, message } = data;
    // Enviar apenas para usuários da sala
    io.to(roomId).emit('message', message);
  });
  
  socket.on('typing', (roomId: string) => {
    socket.to(roomId).emit('user-typing', socket.id);
  });
});
```

### Namespaces (Separar Contextos)

```typescript
// server.ts
const chatNamespace = io.of('/chat');
const notificationsNamespace = io.of('/notifications');

chatNamespace.on('connection', (socket) => {
  console.log('User connected to /chat');
});

notificationsNamespace.on('connection', (socket) => {
  console.log('User connected to /notifications');
});

// Cliente
import { io } from 'socket.io-client';

const chatSocket = io('http://localhost:3000/chat');
const notifSocket = io('http://localhost:3000/notifications');
```

---

## 🔐 Autenticação

### JWT com Socket.io

```typescript
// server.ts
import jwt from 'jsonwebtoken';

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Authentication error'));
  }
  
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log('User:', socket.data.user);
  
  socket.on('message', (data) => {
    const message = {
      ...data,
      userId: socket.data.user.id,
      username: socket.data.user.name,
    };
    io.emit('message', message);
  });
});
```

### Cliente com Token

```tsx
// socket.ts
import { io } from 'socket.io-client';

export function createAuthSocket(token: string) {
  return io('http://localhost:3000', {
    auth: {
      token,
    },
  });
}

// App.tsx
function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const authSocket = createAuthSocket(token);
      
      authSocket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
        // Redirecionar para login
      });
      
      setSocket(authSocket);
      
      return () => {
        authSocket.disconnect();
      };
    }
  }, []);
  
  return <div>{socket ? 'Authenticated' : 'Not authenticated'}</div>;
}
```

---

## 🔄 Reconexão Automática

### Configuração

```tsx
// socket.ts
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

// Hook com Reconexão
function useSocketWithReconnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      setReconnectAttempts(0);
    });
    
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    
    socket.io.on('reconnect_attempt', (attempt) => {
      setReconnectAttempts(attempt);
    });
    
    socket.io.on('reconnect_failed', () => {
      console.error('Reconnection failed');
    });
    
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.io.off('reconnect_attempt');
      socket.io.off('reconnect_failed');
    };
  }, []);
  
  return { isConnected, reconnectAttempts };
}

// ConnectionStatus.tsx
function ConnectionStatus() {
  const { isConnected, reconnectAttempts } = useSocketWithReconnect();
  
  if (isConnected) {
    return <div className="status-online">🟢 Conectado</div>;
  }
  
  if (reconnectAttempts > 0) {
    return (
      <div className="status-reconnecting">
        🟡 Reconectando... (tentativa {reconnectAttempts})
      </div>
    );
  }
  
  return <div className="status-offline">🔴 Desconectado</div>;
}
```

---

## 📐 Padrões e Boas Práticas

### 1. Context para Socket

```tsx
// contexts/SocketContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket } from '../socket';

interface SocketContextType {
  socket: Socket;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    socket.connect();
    
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);
  
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocketContext must be used within SocketProvider');
  return context;
}
```

### 2. Eventos Tipados

```typescript
// types/socket.ts
interface ServerToClientEvents {
  message: (data: Message) => void;
  'user-joined': (userId: string) => void;
  'user-left': (userId: string) => void;
}

interface ClientToServerEvents {
  message: (data: Message) => void;
  'join-room': (roomId: string) => void;
  'leave-room': (roomId: string) => void;
}

// socket.ts
import { io, Socket } from 'socket.io-client';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3000');
```

---

## 🔀 Alternativas

### Server-Sent Events (SSE)

```tsx
// Servidor (Express)
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
  }, 1000);
  
  req.on('close', () => {
    clearInterval(interval);
  });
});

// Cliente React
function useSSE(url: string) {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    const eventSource = new EventSource(url);
    
    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    
    eventSource.onerror = () => {
      eventSource.close();
    };
    
    return () => {
      eventSource.close();
    };
  }, [url]);
  
  return data;
}
```

### Long Polling

```tsx
function useLongPolling(url: string, interval = 5000) {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    let isActive = true;
    
    async function poll() {
      if (!isActive) return;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Polling error:', error);
      }
      
      setTimeout(poll, interval);
    }
    
    poll();
    
    return () => {
      isActive = false;
    };
  }, [url, interval]);
  
  return data;
}
```

### Comparação

| Método | Bidirecional | Latência | Complexidade | Uso |
|--------|--------------|----------|--------------|-----|
| **WebSocket** | ✅ Sim | Muito baixa | Média | Chat, jogos |
| **SSE** | ❌ Não (servidor→cliente) | Baixa | Baixa | Notificações |
| **Long Polling** | ❌ Não | Média | Baixa | Fallback |

---

## 📈 Escalabilidade

### Redis Adapter

```typescript
// server.ts
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
});

// Agora múltiplos servidores podem compartilhar eventos
```

### Load Balancer (Nginx)

```nginx
upstream socketio {
  ip_hash;
  server localhost:3000;
  server localhost:3001;
  server localhost:3002;
}

server {
  location / {
    proxy_pass http://socketio;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

---

## 📚 Recursos

- [Socket.io Documentation](https://socket.io/docs/)
- [Socket.io React Example](https://github.com/socketio/socket.io/tree/main/examples/react-chat)
- [WebSockets MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

---

**Fim dos materiais de React!** 🎉
