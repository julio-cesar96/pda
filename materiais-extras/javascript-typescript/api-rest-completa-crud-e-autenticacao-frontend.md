# 🌐 APIs REST Completas - CRUD e Autenticação (Frontend)

> *"A API é a ponte entre o frontend e o backend."*

---

## 🎯 O que é uma API REST?

**REST (Representational State Transfer)** é um estilo arquitetural para criar APIs web usando HTTP.

### Princípios REST

- 📍 **URLs representam recursos:** `/usuarios`, `/produtos`
- 🔧 **Métodos HTTP definem ações:** GET, POST, PUT, DELETE
- 📦 **Respostas em JSON:** Formato padrão de dados
- 🔒 **Stateless:** Cada requisição é independente
- 📊 **Códigos de status:** 200, 404, 500, etc.

---

## 📚 Métodos HTTP (Verbos)

| Método | Ação | Exemplo | Uso |
|--------|------|---------|-----|
| **GET** | Ler/Buscar | `GET /usuarios` | Listar todos usuários |
| **GET** | Ler Um | `GET /usuarios/1` | Buscar usuário ID 1 |
| **POST** | Criar | `POST /usuarios` | Criar novo usuário |
| **PUT** | Atualizar (completo) | `PUT /usuarios/1` | Substituir usuário 1 |
| **PATCH** | Atualizar (parcial) | `PATCH /usuarios/1` | Atualizar campos específicos |
| **DELETE** | Deletar | `DELETE /usuarios/1` | Remover usuário 1 |

---

## 📊 Códigos de Status HTTP

### Sucesso (2xx)

```text
200 OK                  - Requisição bem-sucedida
201 Created             - Recurso criado com sucesso (POST)
204 No Content          - Sucesso, sem conteúdo (DELETE)
```

### Erro do Cliente (4xx)

```text
400 Bad Request         - Requisição inválida
401 Unauthorized        - Não autenticado
403 Forbidden           - Sem permissão
404 Not Found           - Recurso não encontrado
422 Unprocessable Entity - Dados inválidos
```

### Erro do Servidor (5xx)

```text
500 Internal Server Error - Erro no servidor
502 Bad Gateway           - Gateway inválido
503 Service Unavailable   - Serviço indisponível
```

---

## 🔧 CRUD Completo no Frontend

### Estrutura da API

```text
Base URL: https://api.exemplo.com

GET    /usuarios          - Listar todos
GET    /usuarios/:id      - Buscar um
POST   /usuarios          - Criar
PUT    /usuarios/:id      - Atualizar (completo)
PATCH  /usuarios/:id      - Atualizar (parcial)
DELETE /usuarios/:id      - Deletar
```

### Tipos TypeScript

```typescript
// types/usuario.ts
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  avatar?: string;
  criado_em: string;
  atualizado_em: string;
}

export type CriarUsuario = Omit<Usuario, 'id' | 'criado_em' | 'atualizado_em'>;
export type AtualizarUsuario = Partial<CriarUsuario>;
```

---

## 📖 READ - GET (Buscar Dados)

### Listar Todos

```typescript
// api/usuarios.ts
const BASE_URL = 'https://api.exemplo.com';

// GET /usuarios
async function buscarUsuarios(): Promise<Usuario[]> {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const usuarios: Usuario[] = await response.json();
    return usuarios;
    
  } catch (erro) {
    console.error('Erro ao buscar usuários:', erro);
    throw erro;
  }
}

// Uso
const usuarios = await buscarUsuarios();
usuarios.forEach(u => console.log(u.nome));
```

### Buscar Por ID

```typescript
// GET /usuarios/:id
async function buscarUsuario(id: number): Promise<Usuario> {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/${id}`);
    
    if (response.status === 404) {
      throw new Error('Usuário não encontrado');
    }
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (erro) {
    console.error(`Erro ao buscar usuário ${id}:`, erro);
    throw erro;
  }
}

// Uso
const usuario = await buscarUsuario(1);
console.log(usuario.nome);
```

### Query Parameters (Filtros, Paginação)

```typescript
// GET /usuarios?page=1&limit=10&ativo=true
interface BuscarUsuariosParams {
  page?: number;
  limit?: number;
  ativo?: boolean;
  busca?: string;
}

async function buscarUsuarios(params: BuscarUsuariosParams = {}): Promise<Usuario[]> {
  // Construir query string
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.set('page', String(params.page));
  if (params.limit) queryParams.set('limit', String(params.limit));
  if (params.ativo !== undefined) queryParams.set('ativo', String(params.ativo));
  if (params.busca) queryParams.set('busca', params.busca);
  
  const url = `${BASE_URL}/usuarios?${queryParams.toString()}`;
  
  const response = await fetch(url);
  return await response.json();
}

// Uso
const usuarios = await buscarUsuarios({ page: 1, limit: 10, ativo: true });
```

---

## ➕ CREATE - POST (Criar)

```typescript
// POST /usuarios
async function criarUsuario(dados: CriarUsuario): Promise<Usuario> {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    if (response.status === 422) {
      const erro = await response.json();
      throw new Error(`Dados inválidos: ${JSON.stringify(erro)}`);
    }
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const novoUsuario: Usuario = await response.json();
    return novoUsuario;
    
  } catch (erro) {
    console.error('Erro ao criar usuário:', erro);
    throw erro;
  }
}

// Uso
const novoUsuario = await criarUsuario({
  nome: 'João Silva',
  email: 'joao@email.com',
  avatar: 'https://exemplo.com/avatar.jpg'
});

console.log('Usuário criado com ID:', novoUsuario.id);
```

---

## ✏️ UPDATE - PUT/PATCH (Atualizar)

### PUT (Substituição Completa)

```typescript
// PUT /usuarios/:id
async function substituirUsuario(id: number, dados: CriarUsuario): Promise<Usuario> {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (erro) {
    console.error(`Erro ao substituir usuário ${id}:`, erro);
    throw erro;
  }
}

// Uso (TODOS os campos são obrigatórios)
await substituirUsuario(1, {
  nome: 'João Silva Atualizado',
  email: 'joao.novo@email.com',
  avatar: 'https://exemplo.com/novo-avatar.jpg'
});
```

### PATCH (Atualização Parcial) - Recomendado

```typescript
// PATCH /usuarios/:id
async function atualizarUsuario(id: number, dados: AtualizarUsuario): Promise<Usuario> {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (erro) {
    console.error(`Erro ao atualizar usuário ${id}:`, erro);
    throw erro;
  }
}

// Uso (apenas campos que deseja atualizar)
await atualizarUsuario(1, {
  nome: 'João Silva Novo Nome'
  // Apenas o nome é atualizado!
});
```

---

## ❌ DELETE - DELETE (Deletar)

```typescript
// DELETE /usuarios/:id
async function deletarUsuario(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: 'DELETE'
    });
    
    if (response.status === 404) {
      throw new Error('Usuário não encontrado');
    }
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    // DELETE geralmente retorna 204 No Content (sem corpo)
    // Mas algumas APIs retornam dados
    if (response.status !== 204) {
      return await response.json();
    }
    
  } catch (erro) {
    console.error(`Erro ao deletar usuário ${id}:`, erro);
    throw erro;
  }
}

// Uso
await deletarUsuario(1);
console.log('Usuário deletado com sucesso');
```

---

## 🔐 Autenticação e Autorização

### Fluxo de Autenticação JWT

```text
1. Usuário faz login (POST /auth/login)
2. Backend retorna token JWT
3. Frontend armazena token (localStorage/sessionStorage)
4. Frontend envia token em requisições subsequentes
5. Backend valida token e autoriza ação
```

### Login

```typescript
// types/auth.ts
export interface LoginCredenciais {
  email: string;
  senha: string;
}

export interface LoginResposta {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
}

// api/auth.ts
async function login(credenciais: LoginCredenciais): Promise<LoginResposta> {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciais)
    });
    
    if (response.status === 401) {
      throw new Error('Email ou senha inválidos');
    }
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const dados: LoginResposta = await response.json();
    
    // Armazenar token
    localStorage.setItem('token', dados.token);
    localStorage.setItem('usuario', JSON.stringify(dados.usuario));
    
    return dados;
    
  } catch (erro) {
    console.error('Erro ao fazer login:', erro);
    throw erro;
  }
}

// Uso
const { token, usuario } = await login({
  email: 'joao@email.com',
  senha: 'senha123'
});

console.log('Login bem-sucedido!', usuario.nome);
```

### Enviando Token nas Requisições

```typescript
// api/usuarios.ts (com autenticação)
async function buscarUsuarios(): Promise<Usuario[]> {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Usuário não autenticado');
  }
  
  const response = await fetch(`${BASE_URL}/usuarios`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.status === 401) {
    // Token inválido/expirado
    localStorage.removeItem('token');
    throw new Error('Sessão expirada. Faça login novamente.');
  }
  
  return await response.json();
}
```

### Logout

```typescript
function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = '/login';
}
```

### Verificar Autenticação

```typescript
function estaAutenticado(): boolean {
  return !!localStorage.getItem('token');
}

function obterUsuarioAtual(): Usuario | null {
  const usuarioStr = localStorage.getItem('usuario');
  return usuarioStr ? JSON.parse(usuarioStr) : null;
}

// Uso
if (!estaAutenticado()) {
  window.location.href = '/login';
}

const usuario = obterUsuarioAtual();
console.log(`Bem-vindo, ${usuario?.nome}!`);
```

---

## 🏗️ Cliente API Reutilizável

```typescript
// api/client.ts
class APIClient {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }
  
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    });
    
    // Tratamento de erros
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Não autenticado');
    }
    
    if (!response.ok) {
      const erro = await response.json().catch(() => ({}));
      throw new Error(erro.message || `Erro HTTP: ${response.status}`);
    }
    
    // DELETE pode não ter corpo
    if (response.status === 204) {
      return {} as T;
    }
    
    return await response.json();
  }
  
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }
  
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
  
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Instância singleton
export const apiClient = new APIClient('https://api.exemplo.com');

// Uso
const usuarios = await apiClient.get<Usuario[]>('/usuarios');
const novoUsuario = await apiClient.post<Usuario>('/usuarios', dados);
await apiClient.patch<Usuario>(`/usuarios/${id}`, { nome: 'Novo Nome' });
await apiClient.delete(`/usuarios/${id}`);
```

---

## 🎯 Exemplo Prático Completo

**index.html:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>CRUD de Usuários</title>
  <style>
    body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
    .usuario { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
    button { margin-right: 10px; padding: 8px 15px; cursor: pointer; }
    input { padding: 8px; margin: 5px 0; width: 100%; box-sizing: border-box; }
    .form { background: #e8f4f8; padding: 20px; margin: 20px 0; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>Gerenciar Usuários</h1>
  
  <!-- Formulário de criação -->
  <div class="form">
    <h3>Novo Usuário</h3>
    <input type="text" id="nome" placeholder="Nome">
    <input type="email" id="email" placeholder="Email">
    <button onclick="criarUsuario()">Criar</button>
  </div>
  
  <!-- Lista de usuários -->
  <div id="usuarios"></div>
  
  <script type="module">
    const API_URL = 'https://jsonplaceholder.typicode.com';
    
    // Listar usuários
    async function listarUsuarios() {
      try {
        const response = await fetch(`${API_URL}/users`);
        const usuarios = await response.json();
        
        const container = document.getElementById('usuarios');
        container.innerHTML = usuarios.slice(0, 5).map(u => `
          <div class="usuario">
            <strong>${u.name}</strong> (${u.email})
            <br>
            <button onclick="editarUsuario(${u.id}, '${u.name}')">Editar</button>
            <button onclick="deletarUsuario(${u.id})">Deletar</button>
          </div>
        `).join('');
        
      } catch (erro) {
        console.error('Erro ao listar:', erro);
      }
    }
    
    // Criar usuário
    window.criarUsuario = async function() {
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nome, email })
        });
        
        const novoUsuario = await response.json();
        console.log('Usuário criado:', novoUsuario);
        alert('Usuário criado com sucesso!');
        
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        
      } catch (erro) {
        console.error('Erro ao criar:', erro);
      }
    };
    
    // Editar usuário
    window.editarUsuario = async function(id, nomeAtual) {
      const novoNome = prompt('Novo nome:', nomeAtual);
      if (!novoNome) return;
      
      try {
        const response = await fetch(`${API_URL}/users/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: novoNome })
        });
        
        const usuarioAtualizado = await response.json();
        console.log('Usuário atualizado:', usuarioAtualizado);
        alert('Usuário atualizado!');
        
      } catch (erro) {
        console.error('Erro ao editar:', erro);
      }
    };
    
    // Deletar usuário
    window.deletarUsuario = async function(id) {
      if (!confirm('Tem certeza?')) return;
      
      try {
        await fetch(`${API_URL}/users/${id}`, {
          method: 'DELETE'
        });
        
        alert('Usuário deletado!');
        listarUsuarios();
        
      } catch (erro) {
        console.error('Erro ao deletar:', erro);
      }
    };
    
    // Carregar ao iniciar
    listarUsuarios();
  </script>
</body>
</html>
```

---

## 🔒 Segurança

### Nunca armazene senhas no frontend

```typescript
// ❌ NUNCA FAÇA ISSO
localStorage.setItem('senha', senha);

// ✅ Apenas armazene tokens
localStorage.setItem('token', token);
```

### Use HTTPS

```typescript
// ❌ INSEGURO
const API_URL = 'http://api.exemplo.com';

// ✅ SEGURO
const API_URL = 'https://api.exemplo.com';
```

### Valide Dados

```typescript
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(8)
});

// Validar antes de enviar
const dados = loginSchema.parse({ email, senha });
```

---

## 📚 Recursos Adicionais

- **HTTP Status Codes:** <https://httpstatuses.com/>
- **JSONPlaceholder (API fake):** <https://jsonplaceholder.typicode.com/>
- **ReqRes (API fake):** <https://reqres.in/>
- **Postman:** <https://www.postman.com/>

---

## 🎯 Resumo

| Ação | Método | Endpoint | Body |
|------|--------|----------|------|
| **Listar** | GET | `/usuarios` | - |
| **Buscar** | GET | `/usuarios/:id` | - |
| **Criar** | POST | `/usuarios` | Dados do usuário |
| **Atualizar (parcial)** | PATCH | `/usuarios/:id` | Campos a atualizar |
| **Atualizar (completo)** | PUT | `/usuarios/:id` | Todos os dados |
| **Deletar** | DELETE | `/usuarios/:id` | - |

**Domine APIs REST para construir aplicações frontend poderosas! 🌐✨**
