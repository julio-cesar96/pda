# 🛡️ Tratamento de Erros e Validação com Zod

> *"Validar dados é prevenir problemas, não corrigi-los depois."*

---

## 🎯 Por que Validar Dados?

**Validação de dados** garante que as informações recebidas (formulários, APIs, etc.) estejam **corretas e seguras** antes de processá-las.

### Problemas sem validação

```typescript
// ❌ Sem validação
function criarUsuario(data: any) {
  // E se email não for string?
  // E se idade for negativa?
  // E se nome estiver vazio?
  return { nome: data.nome, email: data.email, idade: data.idade };
}

criarUsuario({ nome: '', email: 'invalido', idade: -5 }); // 💥
```

**Consequências:**
- ❌ Dados inválidos no banco de dados
- ❌ Bugs difíceis de rastrear
- ❌ Vulnerabilidades de segurança
- ❌ Má experiência do usuário

---

## 🔍 Tratamento de Erros em JavaScript

### Try/Catch Básico

```javascript
// Sem tratamento de erro
function dividir(a, b) {
  return a / b;
}

console.log(dividir(10, 0)); // Infinity (não lança erro!)

// Com validação
function dividirSeguro(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Ambos parâmetros devem ser números');
  }
  
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida');
  }
  
  return a / b;
}

// Usando com try/catch
try {
  const resultado = dividirSeguro(10, 2);
  console.log(resultado); // 5
} catch (erro) {
  console.error('Erro:', erro.message);
}
```

### Erros Customizados

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Uso
function buscarUsuario(id) {
  if (typeof id !== 'number') {
    throw new ValidationError('ID deve ser um número', 'id');
  }
  
  const usuario = database.find(u => u.id === id);
  
  if (!usuario) {
    throw new NotFoundError(`Usuário ${id} não encontrado`);
  }
  
  return usuario;
}

// Tratamento específico
try {
  const usuario = buscarUsuario('abc');
} catch (erro) {
  if (erro instanceof ValidationError) {
    console.error(`Erro de validação no campo ${erro.field}: ${erro.message}`);
  } else if (erro instanceof NotFoundError) {
    console.error('Recurso não encontrado:', erro.message);
  } else {
    console.error('Erro desconhecido:', erro);
  }
}
```

### Tratamento em Promises/Async

```javascript
// Promises com .catch()
fetch('https://api.exemplo.com/dados')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(dados => console.log(dados))
  .catch(erro => console.error('Erro na requisição:', erro));

// Async/await com try/catch (RECOMENDADO)
async function buscarDados() {
  try {
    const response = await fetch('https://api.exemplo.com/dados');
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const dados = await response.json();
    return dados;
    
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
    throw erro; // Re-lança para quem chamou tratar
  }
}
```

---

## 🎨 Introdução ao Zod

**Zod** é uma biblioteca TypeScript-first para **validação de schemas** e **type inference**.

### Por que usar Zod?

- ✅ **TypeScript nativo:** Infere tipos automaticamente
- ✅ **API fluente:** Fácil de ler e escrever
- ✅ **Zero dependências**
- ✅ **Runtime validation:** Valida em tempo de execução
- ✅ **Mensagens de erro claras**
- ✅ **Composição:** Combina schemas facilmente

### Instalação

```bash
# npm
npm install zod

# Yarn
yarn add zod

# pnpm
pnpm add zod
```

---

## 📘 Schemas Básicos com Zod

### Tipos Primitivos

```typescript
import { z } from 'zod';

// String
const nomeSchema = z.string();

nomeSchema.parse('João');      // ✅ OK
// nomeSchema.parse(123);      // ❌ Erro: Expected string, received number

// Number
const idadeSchema = z.number();

idadeSchema.parse(30);         // ✅ OK
// idadeSchema.parse('30');    // ❌ Erro

// Boolean
const ativoSchema = z.boolean();

ativoSchema.parse(true);       // ✅ OK

// Date
const dataSchema = z.date();

dataSchema.parse(new Date());  // ✅ OK
```

### Validações de String

```typescript
import { z } from 'zod';

// String não vazia
const nomeSchema = z.string().min(1, 'Nome não pode ser vazio');

// Email
const emailSchema = z.string().email('Email inválido');

// URL
const urlSchema = z.string().url('URL inválida');

// Regex
const telefoneSchema = z.string().regex(/^\d{11}$/, 'Telefone deve ter 11 dígitos');

// Comprimento
const senhaSchema = z.string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .max(100, 'Senha muito longa');

// UUID
const idSchema = z.string().uuid();

// Transformações
const nomeNormalizadoSchema = z.string()
  .trim()                    // Remove espaços
  .toLowerCase()             // Minúsculas
  .transform(s => s.charAt(0).toUpperCase() + s.slice(1)); // Capitaliza

// Exemplos
emailSchema.parse('joao@email.com');           // ✅
// emailSchema.parse('invalido');              // ❌

senhaSchema.parse('senhaSegura123');          // ✅
// senhaSchema.parse('123');                   // ❌ Muito curta
```

### Validações de Number

```typescript
import { z } from 'zod';

// Inteiro
const idSchema = z.number().int('Deve ser um inteiro');

// Positivo
const precoSchema = z.number().positive('Preço deve ser positivo');

// Range
const idadeSchema = z.number()
  .min(0, 'Idade não pode ser negativa')
  .max(150, 'Idade inválida');

// Multiple of
const quantidadeSchema = z.number().multipleOf(5, 'Deve ser múltiplo de 5');

// Coerção (converte string para number)
const porcentagemSchema = z.coerce.number().min(0).max(100);

porcentagemSchema.parse('75');    // ✅ Converte '75' → 75
porcentagemSchema.parse(80);      // ✅
// porcentagemSchema.parse('abc'); // ❌
```

---

## 🏗️ Schemas de Objetos

```typescript
import { z } from 'zod';

// Schema básico
const usuarioSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  idade: z.number().min(0).max(150),
  ativo: z.boolean()
});

// Validar objeto
const dadosValidos = {
  nome: 'João Silva',
  email: 'joao@email.com',
  idade: 30,
  ativo: true
};

const usuario = usuarioSchema.parse(dadosValidos); // ✅
// usuario tem tipo inferido automaticamente!

// Propriedades opcionais
const perfilSchema = z.object({
  nome: z.string(),
  bio: z.string().optional(),        // Pode ser undefined
  avatar: z.string().nullable(),     // Pode ser null
  idade: z.number().nullish()        // Pode ser null OU undefined
});

// Valores padrão
const configSchema = z.object({
  tema: z.string().default('claro'),
  idioma: z.string().default('pt-BR')
});

const config = configSchema.parse({});
// { tema: 'claro', idioma: 'pt-BR' }

// Propriedades aninhadas
const enderecoSchema = z.object({
  rua: z.string(),
  numero: z.number(),
  cidade: z.string(),
  cep: z.string().regex(/^\d{5}-\d{3}$/)
});

const pessoaSchema = z.object({
  nome: z.string(),
  endereco: enderecoSchema  // Schema aninhado
});

// Validar
const pessoa = pessoaSchema.parse({
  nome: 'João',
  endereco: {
    rua: 'Av. Paulista',
    numero: 1000,
    cidade: 'São Paulo',
    cep: '01310-100'
  }
});
```

---

## 📦 Schemas de Arrays

```typescript
import { z } from 'zod';

// Array de strings
const tagsSchema = z.array(z.string());

tagsSchema.parse(['javascript', 'typescript', 'react']); // ✅

// Array de objetos
const produtoSchema = z.object({
  id: z.number(),
  nome: z.string(),
  preco: z.number().positive()
});

const carrinhoSchema = z.array(produtoSchema);

carrinhoSchema.parse([
  { id: 1, nome: 'Notebook', preco: 3000 },
  { id: 2, nome: 'Mouse', preco: 50 }
]); // ✅

// Validações de array
const listaNumerosSchema = z.array(z.number())
  .min(1, 'Array não pode ser vazio')
  .max(10, 'Máximo 10 elementos');

// Array não vazio
const tagObrigatoriasSchema = z.array(z.string()).nonempty('Adicione pelo menos uma tag');
```

---

## 🔄 Union, Enum e Literal

```typescript
import { z } from 'zod';

// Union (OU)
const idSchema = z.union([z.string(), z.number()]);

idSchema.parse(123);     // ✅
idSchema.parse('abc');   // ✅
// idSchema.parse(true); // ❌

// Enum
const statusSchema = z.enum(['pendente', 'aprovado', 'rejeitado']);

statusSchema.parse('aprovado');  // ✅
// statusSchema.parse('invalido'); // ❌

// Literal (valor específico)
const versaoSchema = z.literal('1.0.0');

versaoSchema.parse('1.0.0');  // ✅
// versaoSchema.parse('2.0.0'); // ❌

// Discriminated Union (para diferentes tipos de objeto)
const eventoSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('click'),
    x: z.number(),
    y: z.number()
  }),
  z.object({
    tipo: z.literal('scroll'),
    posicao: z.number()
  })
]);

eventoSchema.parse({ tipo: 'click', x: 10, y: 20 });     // ✅
eventoSchema.parse({ tipo: 'scroll', posicao: 100 });    // ✅
```

---

## 🎯 Validação de Formulários

### HTML + JavaScript Vanilla

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Formulário com Zod</title>
</head>
<body>
  <form id="form-cadastro">
    <div>
      <label>Nome:</label>
      <input type="text" name="nome" required>
      <span class="erro" id="erro-nome"></span>
    </div>
    
    <div>
      <label>Email:</label>
      <input type="email" name="email" required>
      <span class="erro" id="erro-email"></span>
    </div>
    
    <div>
      <label>Idade:</label>
      <input type="number" name="idade" required>
      <span class="erro" id="erro-idade"></span>
    </div>
    
    <button type="submit">Cadastrar</button>
  </form>

  <script type="module">
    import { z } from 'https://esm.sh/zod';

    const cadastroSchema = z.object({
      nome: z.string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome muito longo'),
      email: z.string()
        .email('Email inválido'),
      idade: z.coerce.number()
        .int('Idade deve ser um número inteiro')
        .min(18, 'Você deve ter pelo menos 18 anos')
        .max(120, 'Idade inválida')
    });

    const form = document.getElementById('form-cadastro');
    const erroElements = {
      nome: document.getElementById('erro-nome'),
      email: document.getElementById('erro-email'),
      idade: document.getElementById('erro-idade')
    };

    // Limpar erros
    function limparErros() {
      Object.values(erroElements).forEach(el => el.textContent = '');
    }

    // Exibir erros
    function exibirErros(erros) {
      erros.forEach(erro => {
        const campo = erro.path[0];
        if (erroElements[campo]) {
          erroElements[campo].textContent = erro.message;
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      limparErros();

      const formData = new FormData(form);
      const dados = Object.fromEntries(formData);

      try {
        const dadosValidados = cadastroSchema.parse(dados);
        console.log('Dados válidos:', dadosValidados);
        alert('Cadastro realizado com sucesso!');
        form.reset();
      } catch (erro) {
        if (erro instanceof z.ZodError) {
          exibirErros(erro.errors);
        }
      }
    });
  </script>
</body>
</html>
```

### TypeScript

```typescript
import { z } from 'zod';

const cadastroSchema = z.object({
  nome: z.string().min(3).max(100),
  email: z.string().email(),
  senha: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
  confirmarSenha: z.string()
}).refine(data => data.senha === data.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha']
});

// Type inference automática!
type CadastroInput = z.infer<typeof cadastroSchema>;

function processarCadastro(dados: unknown): CadastroInput {
  return cadastroSchema.parse(dados);
}

// Uso
try {
  const dadosValidados = processarCadastro({
    nome: 'João Silva',
    email: 'joao@email.com',
    senha: 'Senha123',
    confirmarSenha: 'Senha123'
  });
  
  console.log('Cadastro válido:', dadosValidados);
} catch (erro) {
  if (erro instanceof z.ZodError) {
    erro.errors.forEach(err => {
      console.error(`${err.path.join('.')}: ${err.message}`);
    });
  }
}
```

---

## 🌐 Validação de Dados de API

```typescript
import { z } from 'zod';

// Schema para resposta da API
const usuarioAPISchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipcode: z.string()
  }).optional()
});

const listaUsuariosSchema = z.array(usuarioAPISchema);

// Type inference
type Usuario = z.infer<typeof usuarioAPISchema>;

async function buscarUsuarios(): Promise<Usuario[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const dados = await response.json();
    
    // Validar dados da API
    const usuariosValidados = listaUsuariosSchema.parse(dados);
    return usuariosValidados;
    
  } catch (erro) {
    if (erro instanceof z.ZodError) {
      console.error('Dados da API inválidos:', erro.errors);
    }
    throw erro;
  }
}

// safeParse (não lança erro)
async function buscarUsuariosSeguro(): Promise<Usuario[] | null> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const dados = await response.json();
  
  const resultado = listaUsuariosSchema.safeParse(dados);
  
  if (resultado.success) {
    return resultado.data;  // Dados validados
  } else {
    console.error('Validação falhou:', resultado.error.errors);
    return null;
  }
}
```

---

## 🔧 Métodos Úteis do Zod

```typescript
import { z } from 'zod';

const schema = z.string().email();

// parse() - lança erro se inválido
try {
  const email = schema.parse('joao@email.com');
} catch (erro) {
  console.error(erro);
}

// safeParse() - retorna objeto com resultado
const resultado = schema.safeParse('joao@email.com');

if (resultado.success) {
  console.log('Email válido:', resultado.data);
} else {
  console.error('Email inválido:', resultado.error.errors);
}

// partial() - torna todas propriedades opcionais
const usuarioSchema = z.object({
  nome: z.string(),
  email: z.string().email()
});

const atualizacaoSchema = usuarioSchema.partial();
// { nome?: string, email?: string }

// pick() - selecionar campos
const loginSchema = usuarioSchema.pick({ email: true });
// { email: string }

// omit() - omitir campos
const usuarioPublicoSchema = usuarioSchema.omit({ senha: true });

// extend() - adicionar campos
const usuarioComIdSchema = usuarioSchema.extend({
  id: z.number()
});

// merge() - mesclar schemas
const schema1 = z.object({ nome: z.string() });
const schema2 = z.object({ idade: z.number() });
const schemaCompleto = schema1.merge(schema2);
```

---

## 🎯 Exemplo Prático Completo

**validacoes.ts:**

```typescript
import { z } from 'zod';

// Schema de produto
export const produtoSchema = z.object({
  id: z.number().int().positive(),
  nome: z.string().min(3).max(100),
  descricao: z.string().min(10).max(500),
  preco: z.number().positive(),
  estoque: z.number().int().min(0),
  categoria: z.enum(['eletronicos', 'livros', 'roupas', 'outros']),
  ativo: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  criado_em: z.coerce.date()
});

// Schema para criar produto (sem id e criado_em)
export const criarProdutoSchema = produtoSchema.omit({
  id: true,
  criado_em: true
});

// Schema para atualizar produto (tudo opcional)
export const atualizarProdutoSchema = criarProdutoSchema.partial();

// Types inferidos
export type Produto = z.infer<typeof produtoSchema>;
export type CriarProduto = z.infer<typeof criarProdutoSchema>;
export type AtualizarProduto = z.infer<typeof atualizarProdutoSchema>;
```

**api.ts:**

```typescript
import { 
  Produto, 
  CriarProduto, 
  criarProdutoSchema, 
  atualizarProdutoSchema 
} from './validacoes';
import { z } from 'zod';

// Criar produto
async function criarProduto(dados: unknown): Promise<Produto> {
  try {
    // Validar dados de entrada
    const dadosValidados = criarProdutoSchema.parse(dados);
    
    // Enviar para API
    const response = await fetch('https://api.exemplo.com/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosValidados)
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const produto = await response.json();
    return produto;
    
  } catch (erro) {
    if (erro instanceof z.ZodError) {
      console.error('Dados inválidos:');
      erro.errors.forEach(err => {
        console.error(`  ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw erro;
  }
}

// Atualizar produto
async function atualizarProduto(id: number, dados: unknown): Promise<Produto> {
  const dadosValidados = atualizarProdutoSchema.parse(dados);
  
  const response = await fetch(`https://api.exemplo.com/produtos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosValidados)
  });
  
  return await response.json();
}

// Uso
const novoProduto = {
  nome: 'Notebook Gamer',
  descricao: 'Notebook para jogos de alta performance',
  preco: 4500.00,
  estoque: 10,
  categoria: 'eletronicos' as const,
  tags: ['gamer', 'notebook', 'tecnologia']
};

criarProduto(novoProduto)
  .then(produto => console.log('Produto criado:', produto))
  .catch(erro => console.error('Erro:', erro));
```

---

## 📚 Recursos Adicionais

- **Documentação Zod:** <https://zod.dev/>
- **Zod Playground:** <https://stackblitz.com/edit/zod-playground>
- **GitHub:** <https://github.com/colinhacks/zod>

---

## 🎯 Resumo

| Conceito | Descrição | Exemplo |
|----------|-----------|---------|
| **parse()** | Valida e lança erro | `schema.parse(data)` |
| **safeParse()** | Valida sem lançar erro | `schema.safeParse(data)` |
| **z.string()** | Validar string | `z.string().email()` |
| **z.number()** | Validar número | `z.number().positive()` |
| **z.object()** | Validar objeto | `z.object({ nome: z.string() })` |
| **z.array()** | Validar array | `z.array(z.string())` |
| **optional()** | Campo opcional | `z.string().optional()` |
| **default()** | Valor padrão | `z.string().default('valor')` |
| **z.infer** | Inferir tipo TypeScript | `type T = z.infer<typeof schema>` |

**Valide sempre os dados de entrada para garantir aplicações seguras e robustas! 🛡️✨**
