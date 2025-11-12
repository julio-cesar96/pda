# 🔷 TypeScript - Adicionando Tipos ao JavaScript

*"TypeScript é JavaScript que escala."*

---

## 📋 O que é TypeScript?

**TypeScript** é um **superset** do JavaScript que adiciona **tipagem estática** ao código. Todo código JavaScript válido é também código TypeScript válido.

**Principais benefícios:**
- ✅ **Detecta erros em tempo de desenvolvimento** (antes de rodar)
- ✅ **Autocomplete inteligente** (IntelliSense)
- ✅ **Refatoração segura**
- ✅ **Documentação automática** via tipos
- ✅ **Código mais robusto e manutenível**

**Analogia:**
- JavaScript = "Confie em mim, vai funcionar!"
- TypeScript = "Deixa eu verificar antes se isso faz sentido"

---

## 🚀 Instalação e Configuração

### Instalando TypeScript

```bash
# Instalar globalmente
npm install -g typescript

# Ou no projeto
npm install --save-dev typescript

# Verificar instalação
tsc --version
```

### Criando um projeto TypeScript

```bash
# Criar pasta do projeto
mkdir meu-projeto-ts
cd meu-projeto-ts

# Inicializar npm
npm init -y

# Instalar TypeScript
npm install --save-dev typescript

# Criar arquivo de configuração
npx tsc --init
```

### Configuração básica (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",                  // Versão JS de saída
    "module": "ESNext",                  // Sistema de módulos
    "lib": ["ES2020", "DOM"],            // Bibliotecas incluídas
    "outDir": "./dist",                  // Pasta de saída
    "rootDir": "./src",                  // Pasta de código fonte
    "strict": true,                      // Ativar todas verificações estritas
    "esModuleInterop": true,             // Compatibilidade com CommonJS
    "skipLibCheck": true,                // Pular verificação de .d.ts
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Estrutura do projeto

```
meu-projeto-ts/
├── src/
│   ├── index.ts         # Código TypeScript
│   └── utils.ts
├── dist/                # Código compilado (gerado automaticamente)
│   ├── index.js
│   └── utils.js
├── tsconfig.json        # Configuração TypeScript
└── package.json
```

---

## 📘 Tipos Básicos

### Tipos Primitivos

```typescript
// String
let nome: string = 'João';
let email: string = "joao@email.com";

// Number
let idade: number = 30;
let preco: number = 19.99;
let temperatura: number = -5;

// Boolean
let ativo: boolean = true;
let concluido: boolean = false;

// Null e Undefined
let nulo: null = null;
let indefinido: undefined = undefined;

// Any (evite usar!)
let qualquerCoisa: any = 'texto';
qualquerCoisa = 123;  // Permitido, mas perde os benefícios do TS
```

### Arrays

```typescript
// Array de números
let numeros: number[] = [1, 2, 3, 4, 5];

// Array de strings (sintaxe alternativa)
let frutas: Array<string> = ['maçã', 'banana', 'laranja'];

// Array de objetos
let usuarios: { nome: string; idade: number }[] = [
  { nome: 'João', idade: 30 },
  { nome: 'Maria', idade: 25 }
];

// Array misto (tuple)
let pessoa: [string, number] = ['João', 30];
```

### Objetos

```typescript
// Tipagem inline
let usuario: { nome: string; idade: number; email: string } = {
  nome: 'João',
  idade: 30,
  email: 'joao@email.com'
};

// Propriedades opcionais
let config: { tema: string; modo?: 'claro' | 'escuro' } = {
  tema: 'azul'
  // modo é opcional
};

// Propriedades readonly
let produto: { readonly id: number; nome: string } = {
  id: 1,
  nome: 'Notebook'
};
// produto.id = 2; // ❌ Erro: readonly!
```

---

## 🎯 Interfaces e Types

### Interface (preferida para objetos)

```typescript
interface Usuario {
  id: number;
  nome: string;
  email: string;
  idade?: number;              // Opcional
  readonly cpf: string;        // Somente leitura
  ativo: boolean;
}

// Uso
const usuario: Usuario = {
  id: 1,
  nome: 'João Silva',
  email: 'joao@email.com',
  cpf: '123.456.789-00',
  ativo: true
};

// Estender interface
interface UsuarioAdmin extends Usuario {
  permissoes: string[];
  nivel: 'admin' | 'super-admin';
}

const admin: UsuarioAdmin = {
  id: 2,
  nome: 'Maria Admin',
  email: 'maria@admin.com',
  cpf: '987.654.321-00',
  ativo: true,
  permissoes: ['criar', 'editar', 'deletar'],
  nivel: 'admin'
};
```

### Type (mais flexível)

```typescript
// Type alias
type ID = number | string;

type Usuario = {
  id: ID;
  nome: string;
};

// Union types
type Status = 'pendente' | 'aprovado' | 'rejeitado';

let status: Status = 'pendente';
// status = 'invalido'; // ❌ Erro!

// Intersection types
type Pessoa = {
  nome: string;
  idade: number;
};

type Empregado = {
  empresa: string;
  salario: number;
};

type PessoaEmpregada = Pessoa & Empregado;

const funcionario: PessoaEmpregada = {
  nome: 'João',
  idade: 30,
  empresa: 'TechCorp',
  salario: 5000
};
```

### Interface vs Type

```typescript
// ✅ Use Interface para:
// - Objetos e classes
// - Quando precisa estender/implementar
// - APIs públicas

interface Animal {
  nome: string;
}

interface Cachorro extends Animal {
  raca: string;
}

// ✅ Use Type para:
// - Unions, intersections, primitivos
// - Tipos complexos
// - Tipos utilitários

type Resposta = Sucesso | Erro;
type ID = string | number;
```

---

## 🔧 Funções Tipadas

### Tipagem de parâmetros e retorno

```typescript
// Função básica
function somar(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiplicar = (a: number, b: number): number => a * b;

// Parâmetros opcionais
function saudar(nome: string, sobrenome?: string): string {
  return sobrenome ? `Olá, ${nome} ${sobrenome}!` : `Olá, ${nome}!`;
}

// Parâmetros com valor padrão
function criarUsuario(nome: string, ativo: boolean = true): Usuario {
  return { nome, ativo };
}

// Rest parameters
function somar(...numeros: number[]): number {
  return numeros.reduce((total, num) => total + num, 0);
}

// Void (função sem retorno)
function logar(mensagem: string): void {
  console.log(mensagem);
}

// Never (função que nunca retorna)
function erro(mensagem: string): never {
  throw new Error(mensagem);
}
```

### Function Types

```typescript
// Tipo de função
type Operacao = (a: number, b: number) => number;

const somar: Operacao = (a, b) => a + b;
const subtrair: Operacao = (a, b) => a - b;

// Callback tipado
function processar(valor: number, callback: (n: number) => void): void {
  callback(valor * 2);
}

processar(5, (resultado) => {
  console.log(resultado); // 10
});
```

---

## 🎨 Tipos Avançados

### Union Types

```typescript
// Aceita múltiplos tipos
type Resultado = number | string;

function exibir(valor: Resultado): void {
  console.log(valor);
}

exibir(42);      // ✅
exibir('texto'); // ✅

// Type narrowing
function processar(valor: number | string): void {
  if (typeof valor === 'string') {
    console.log(valor.toUpperCase()); // TypeScript sabe que é string
  } else {
    console.log(valor.toFixed(2));    // TypeScript sabe que é number
  }
}
```

### Literal Types

```typescript
// Valores específicos
type Direcao = 'cima' | 'baixo' | 'esquerda' | 'direita';

function mover(direcao: Direcao): void {
  console.log(`Movendo para ${direcao}`);
}

mover('cima');     // ✅
// mover('frente'); // ❌ Erro!

// Com números
type DadoFace = 1 | 2 | 3 | 4 | 5 | 6;
let resultado: DadoFace = 3;
```

### Type Guards

```typescript
// typeof guard
function processar(valor: number | string): void {
  if (typeof valor === 'string') {
    console.log(valor.toUpperCase());
  } else {
    console.log(valor.toFixed(2));
  }
}

// instanceof guard
class Cachorro {
  latir() { console.log('Au au!'); }
}

class Gato {
  miar() { console.log('Miau!'); }
}

function fazerBarulho(animal: Cachorro | Gato): void {
  if (animal instanceof Cachorro) {
    animal.latir();
  } else {
    animal.miar();
  }
}

// Custom type guard
interface Peixe {
  nadar(): void;
}

interface Passaro {
  voar(): void;
}

function isPeixe(animal: Peixe | Passaro): animal is Peixe {
  return (animal as Peixe).nadar !== undefined;
}

function mover(animal: Peixe | Passaro): void {
  if (isPeixe(animal)) {
    animal.nadar();
  } else {
    animal.voar();
  }
}
```

### Utility Types

```typescript
interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

// Partial - todas propriedades opcionais
type UsuarioParcial = Partial<Usuario>;
const atualizar: UsuarioParcial = { nome: 'João' }; // ✅

// Required - todas propriedades obrigatórias
type UsuarioCompleto = Required<Usuario>;

// Pick - selecionar propriedades específicas
type UsuarioPublico = Pick<Usuario, 'id' | 'nome' | 'email'>;

// Omit - omitir propriedades específicas
type UsuarioSemSenha = Omit<Usuario, 'senha'>;

// Readonly - todas propriedades readonly
type UsuarioImutavel = Readonly<Usuario>;

// Record - criar objeto com chaves específicas
type Roles = 'admin' | 'user' | 'guest';
type Permissoes = Record<Roles, string[]>;

const permissoes: Permissoes = {
  admin: ['criar', 'editar', 'deletar'],
  user: ['visualizar', 'editar'],
  guest: ['visualizar']
};
```

---

## 🌐 TypeScript com DOM

```typescript
// Seleção de elementos
const botao = document.getElementById('btn') as HTMLButtonElement;
const input = document.querySelector<HTMLInputElement>('#email');
const lista = document.querySelectorAll<HTMLLIElement>('li');

// Eventos tipados
botao?.addEventListener('click', (event: MouseEvent) => {
  console.log(event.clientX, event.clientY);
});

input?.addEventListener('input', (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
});

// Criação de elementos
const div = document.createElement('div');
div.className = 'card';
div.textContent = 'Olá, TypeScript!';
```

---

## 🔄 TypeScript com Fetch/APIs

```typescript
// Interface para resposta da API
interface Usuario {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Função tipada para buscar dados
async function buscarUsuarios(): Promise<Usuario[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
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
async function exibirUsuarios(): Promise<void> {
  const usuarios = await buscarUsuarios();
  
  usuarios.forEach((usuario: Usuario) => {
    console.log(`${usuario.id} - ${usuario.name} (${usuario.email})`);
  });
}

// POST com tipagem
interface NovoPost {
  title: string;
  body: string;
  userId: number;
}

async function criarPost(post: NovoPost): Promise<Post> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });
  
  return await response.json();
}
```

---

## 🎓 Exemplo Prático Completo

**src/tipos.ts** (Definições de tipos):

```typescript
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: 'eletronicos' | 'livros' | 'roupas';
}

export interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}

export type Carrinho = CarrinhoItem[];
```

**src/api.ts** (Chamadas à API):

```typescript
import { Produto } from './tipos';

const BASE_URL = 'https://api.exemplo.com';

export async function buscarProdutos(): Promise<Produto[]> {
  const response = await fetch(`${BASE_URL}/produtos`);
  return await response.json();
}

export async function buscarProduto(id: number): Promise<Produto> {
  const response = await fetch(`${BASE_URL}/produtos/${id}`);
  return await response.json();
}
```

**src/carrinho.ts** (Lógica de negócio):

```typescript
import { Carrinho, CarrinhoItem, Produto } from './tipos';

export class GerenciadorCarrinho {
  private carrinho: Carrinho = [];

  adicionar(produto: Produto, quantidade: number = 1): void {
    const itemExistente = this.carrinho.find(
      item => item.produto.id === produto.id
    );

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.carrinho.push({ produto, quantidade });
    }
  }

  remover(produtoId: number): void {
    this.carrinho = this.carrinho.filter(
      item => item.produto.id !== produtoId
    );
  }

  calcularTotal(): number {
    return this.carrinho.reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade);
    }, 0);
  }

  obterItens(): Readonly<Carrinho> {
    return this.carrinho;
  }

  limpar(): void {
    this.carrinho = [];
  }
}
```

**src/index.ts** (Ponto de entrada):

```typescript
import { buscarProdutos } from './api';
import { GerenciadorCarrinho } from './carrinho';

async function init(): Promise<void> {
  const produtos = await buscarProdutos();
  const carrinho = new GerenciadorCarrinho();

  produtos.forEach(produto => {
    if (produto.estoque > 0) {
      carrinho.adicionar(produto, 1);
    }
  });

  const total = carrinho.calcularTotal();
  console.log(`Total do carrinho: R$ ${total.toFixed(2)}`);
}

init();
```

---

## 🔨 Compilando e Executando

```bash
# Compilar TypeScript para JavaScript
npx tsc

# Compilar e assistir mudanças
npx tsc --watch

# Executar diretamente com ts-node
npm install --save-dev ts-node
npx ts-node src/index.ts

# Ou usar tsx (mais moderno e rápido)
npm install --save-dev tsx
npx tsx src/index.ts
```

---

## 🎯 Boas Práticas

### ✅ Faça

```typescript
// 1. Use tipos estritos
let idade: number = 30;

// 2. Prefira interface para objetos
interface Usuario {
  nome: string;
}

// 3. Use readonly quando apropriado
interface Config {
  readonly apiKey: string;
}

// 4. Evite any
// ❌ let dados: any;
// ✅ let dados: unknown;

// 5. Use union types
type Status = 'ativo' | 'inativo';
```

### ❌ Evite

```typescript
// 1. Não use any (perde tipagem)
let dados: any = 'teste';

// 2. Não ignore erros do compilador
// @ts-ignore - evite isso!

// 3. Não repita definições de tipo
// Use types/interfaces reutilizáveis

// 4. Não misture JavaScript e TypeScript
// Converta todo o projeto
```

---

## 📚 Recursos Adicionais

- **Documentação Oficial:** https://www.typescriptlang.org/docs/
- **TypeScript Playground:** https://www.typescriptlang.org/play
- **TypeScript Deep Dive:** https://basarat.gitbook.io/typescript/
- **Type Challenges:** https://github.com/type-challenges/type-challenges

---

## 🚀 Próximos Passos

1. ✅ Converter projeto JavaScript para TypeScript
2. ✅ Configurar tsconfig.json apropriadamente
3. ✅ Adicionar tipos gradualmente
4. ✅ Usar TypeScript com React/Vue/frameworks
5. ✅ Explorar tipos avançados (Generics, Conditional Types)

**TypeScript torna seu código mais seguro, manutenível e profissional! 🔷✨**
