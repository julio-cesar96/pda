# Validação e Sanitização de Dados com Zod em JavaScript

## Objetivos de Aprendizagem

Ao final desta aula, você será capaz de:

1. Gerar pertencimento e sentimento de time
2. Verificar a aprendizagem da aula anterior e verificar o nível técnico da turma
3. Compreender a importância da validação de dados em aplicações
4. Aprender a implementar validações complexas usando a biblioteca Zod
5. Desenvolver estratégias para o tratamento de edge cases (casos extremos) na validação
6. Aplicar Zod para sanitização de dados
7. Fortalecer o projeto final com um sistema de validação robusto

---

## Parte 1: Aquecimento e Dinâmica de Integração (20 minutos)

### Atividade: "Bug ou Feature?"

**Objetivo:** Gerar pertencimento, verificar conhecimento prévio e introduzir o tema de forma lúdica.

**Dinâmica:**

1. Divida a turma em pequenos grupos (3-4 pessoas)
2. Apresente cenários reais de bugs causados por falta de validação:
   - E-mail enviado para destinatário inválido
   - Sistema de pagamento processando valores negativos
   - Cadastro de usuário com idade de 999 anos
3. Cada grupo discute: "Como evitaríamos isso?"
4. Compartilhamento das soluções em 5 minutos

**Revisão da aula anterior:**

- Perguntar sobre conceitos de funções, arrays e objetos
- Conectar com a necessidade de validar esses tipos de dados

---

## Parte 2: Introdução à Validação de Dados (30 minutos)

### Por que Validar Dados?

A validação de dados é uma prática essencial no desenvolvimento de software por diversas razões:

#### 1. **Segurança**

- Previne ataques de injeção (SQL Injection, XSS)
- Protege contra dados maliciosos
- Garante que apenas dados esperados sejam processados

#### 2. **Integridade dos Dados**

- Mantém a consistência do banco de dados
- Evita corrupção de dados
- Garante que as regras de negócio sejam respeitadas

#### 3. **Experiência do Usuário**

- Fornece feedback claro e imediato
- Previne erros silenciosos
- Melhora a confiabilidade da aplicação

#### 4. **Manutenibilidade**

- Código mais previsível e fácil de debugar
- Documentação implícita através dos schemas
- Reduz bugs em produção

### Validação Manual vs. Biblioteca

#### Exemplo: Validando um usuário SEM biblioteca

```javascript
function validarUsuario(usuario) {
  const erros = [];

  // Validar nome
  if (!usuario.nome) {
    erros.push("Nome é obrigatório");
  } else if (typeof usuario.nome !== "string") {
    erros.push("Nome deve ser uma string");
  } else if (usuario.nome.length < 2) {
    erros.push("Nome deve ter pelo menos 2 caracteres");
  } else if (usuario.nome.length > 100) {
    erros.push("Nome deve ter no máximo 100 caracteres");
  }

  // Validar email
  if (!usuario.email) {
    erros.push("Email é obrigatório");
  } else if (typeof usuario.email !== "string") {
    erros.push("Email deve ser uma string");
  } else {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(usuario.email)) {
      erros.push("Email inválido");
    }
  }

  // Validar idade
  if (usuario.idade === undefined) {
    erros.push("Idade é obrigatória");
  } else if (typeof usuario.idade !== "number") {
    erros.push("Idade deve ser um número");
  } else if (usuario.idade < 18) {
    erros.push("Usuário deve ter pelo menos 18 anos");
  } else if (usuario.idade > 120) {
    erros.push("Idade inválida");
  }

  // Validar telefone (opcional)
  if (usuario.telefone !== undefined) {
    if (typeof usuario.telefone !== "string") {
      erros.push("Telefone deve ser uma string");
    } else {
      const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
      if (!regexTelefone.test(usuario.telefone)) {
        erros.push("Telefone deve estar no formato (XX) XXXXX-XXXX");
      }
    }
  }

  if (erros.length > 0) {
    return { sucesso: false, erros };
  }

  return { sucesso: true, dados: usuario };
}

// Testando
const resultado = validarUsuario({
  nome: "Jo",
  email: "email-invalido",
  idade: 15
});

console.log(resultado);
// {
//   sucesso: false,
//   erros: [
//     "Email inválido",
//     "Usuário deve ter pelo menos 18 anos"
//   ]
// }
```

**Problemas dessa abordagem:**

- Código verboso e repetitivo
- Difícil de manter e testar
- Propenso a erros
- Sem type safety (em TypeScript)
- Lógica de validação espalhada pelo código

---

## Parte 3: Conhecendo o Zod (40 minutos)

### O que é Zod?

Zod é uma biblioteca de validação de schemas e declaração de tipos para TypeScript e JavaScript. Ela permite:

- Definir schemas de validação de forma declarativa
- Validar dados em runtime
- Inferir tipos TypeScript automaticamente
- Criar validações complexas de forma simples
- Transformar e sanitizar dados

### Instalação

```bash
# Usando npm
npm install zod

# Usando yarn
yarn add zod

# Usando pnpm
pnpm add zod
```

### Configuração Básica

```javascript
// Em JavaScript (CommonJS)
const { z } = require('zod');

// Em JavaScript/TypeScript (ES Modules)
import { z } from 'zod';
```

### Conceitos Fundamentais

#### 1. Schemas

Um schema é uma definição de como os dados devem ser estruturados:

```javascript
import { z } from 'zod';

// Schema simples para string
const nomeSchema = z.string();

// Schema para número
const idadeSchema = z.number();

// Schema para boolean
const ativoSchema = z.boolean();
```

#### 2. Validação com `.parse()`

O método `.parse()` valida os dados e lança uma exceção se inválidos:

```javascript
const nomeSchema = z.string();

try {
  const nome = nomeSchema.parse("João");
  console.log("Nome válido:", nome);
} catch (error) {
  console.error("Erro de validação:", error.errors);
}

// Tentando com dado inválido
try {
  nomeSchema.parse(123); // Lança erro!
} catch (error) {
  console.error(error.errors);
  // [{ code: 'invalid_type', expected: 'string', received: 'number', ... }]
}
```

#### 3. Validação com `.safeParse()`

O método `.safeParse()` não lança exceção, retorna um objeto com o resultado:

```javascript
const idadeSchema = z.number();

const resultado1 = idadeSchema.safeParse(25);
console.log(resultado1);
// { success: true, data: 25 }

const resultado2 = idadeSchema.safeParse("25");
console.log(resultado2);
// { success: false, error: ZodError {...} }

// Uso prático
if (resultado2.success) {
  console.log("Idade válida:", resultado2.data);
} else {
  console.log("Erros:", resultado2.error.errors);
}
```

### Exemplo: Mesmo usuário COM Zod

```javascript
import { z } from 'zod';

const usuarioSchema = z.object({
  nome: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  
  email: z.string()
    .email("Email inválido"),
  
  idade: z.number()
    .int("Idade deve ser um número inteiro")
    .min(18, "Usuário deve ter pelo menos 18 anos")
    .max(120, "Idade inválida"),
  
  telefone: z.string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone deve estar no formato (XX) XXXXX-XXXX")
    .optional()
});

// Validando
const resultado = usuarioSchema.safeParse({
  nome: "Jo",
  email: "email-invalido",
  idade: 15
});

if (!resultado.success) {
  console.log(resultado.error.errors);
  // Array com todos os erros de validação
}
```

**Vantagens do Zod:**
- Código mais limpo e legível
- Validações declarativas
- Mensagens de erro customizáveis
- Type safety automático em TypeScript
- Composição de schemas facilitada

### Tipos Primitivos no Zod

```javascript
import { z } from 'zod';

// Strings
const stringSchema = z.string();
const stringComRegras = z.string()
  .min(3)
  .max(20)
  .email() // ou .url(), .uuid(), etc.

// Números
const numberSchema = z.number();
const numberComRegras = z.number()
  .int()
  .positive()
  .min(0)
  .max(100)

// Booleanos
const booleanSchema = z.boolean();

// Datas
const dateSchema = z.date();
const dataMinima = z.date().min(new Date("2024-01-01"));

// Literais
const statusSchema = z.literal("ativo");
const numeroEspecifico = z.literal(42);

// Enums
const roleSchema = z.enum(["admin", "user", "guest"]);

// Null e Undefined
const nullSchema = z.null();
const undefinedSchema = z.undefined();
```

---

## Parte 4: Implementando Validações Complexas (50 minutos)

### 1. Objetos Aninhados

```javascript
import { z } from 'zod';

const enderecoSchema = z.object({
  rua: z.string(),
  numero: z.number().positive(),
  complemento: z.string().optional(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string().length(2),
  cep: z.string().regex(/^\d{5}-?\d{3}$/)
});

const usuarioCompletoSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  endereco: enderecoSchema, // Schema aninhado
  enderecoCobranca: enderecoSchema.optional() // Endereço opcional
});

// Validando
const usuario = {
  nome: "Maria Silva",
  email: "maria@example.com",
  endereco: {
    rua: "Av. Paulista",
    numero: 1000,
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100"
  }
};

const resultado = usuarioCompletoSchema.safeParse(usuario);
console.log(resultado.success); // true
```

### 2. Arrays

```javascript
import { z } from 'zod';

// Array simples
const numerosSchema = z.array(z.number());
console.log(numerosSchema.parse([1, 2, 3])); // ✓

// Array com restrições
const tagsSchema = z.array(z.string())
  .min(1, "Deve ter pelo menos uma tag")
  .max(5, "Máximo de 5 tags");

// Array de objetos
const produtoSchema = z.object({
  id: z.number(),
  nome: z.string(),
  preco: z.number().positive()
});

const carrinhoSchema = z.object({
  itens: z.array(produtoSchema).min(1, "Carrinho não pode estar vazio"),
  total: z.number().positive()
});

// Validando
const carrinho = {
  itens: [
    { id: 1, nome: "Notebook", preco: 3000 },
    { id: 2, nome: "Mouse", preco: 50 }
  ],
  total: 3050
};

console.log(carrinhoSchema.parse(carrinho)); // ✓
```

### 3. Uniões e Interseções

```javascript
import { z } from 'zod';

// União (OR) - aceita um tipo OU outro
const idSchema = z.union([
  z.number(),
  z.string()
]);

console.log(idSchema.parse(123)); // ✓
console.log(idSchema.parse("abc")); // ✓

// Forma alternativa com .or()
const idSchema2 = z.number().or(z.string());

// Interseção (AND) - combina schemas
const pessoaSchema = z.object({
  nome: z.string(),
  idade: z.number()
});

const funcionarioSchema = z.object({
  cargo: z.string(),
  salario: z.number()
});

const funcionarioCompletoSchema = z.intersection(
  pessoaSchema,
  funcionarioSchema
);
// Equivalente a:
// { nome, idade, cargo, salario }

// Forma alternativa com .and()
const funcionarioCompletoSchema2 = pessoaSchema.and(funcionarioSchema);
```

### 4. Schemas Condicionais e Refinamentos

```javascript
import { z } from 'zod';

// Refinamento simples
const senhaSchema = z.string()
  .min(8, "Senha deve ter pelo menos 8 caracteres")
  .refine(
    (senha) => /[A-Z]/.test(senha),
    "Senha deve conter pelo menos uma letra maiúscula"
  )
  .refine(
    (senha) => /[0-9]/.test(senha),
    "Senha deve conter pelo menos um número"
  )
  .refine(
    (senha) => /[!@#$%^&*]/.test(senha),
    "Senha deve conter pelo menos um caractere especial"
  );

// Refinamento com acesso ao objeto completo
const cadastroSchema = z.object({
  senha: z.string(),
  confirmarSenha: z.string()
}).refine(
  (data) => data.senha === data.confirmarSenha,
  {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"] // Especifica onde o erro aparece
  }
);

// Exemplo de uso
const resultado = cadastroSchema.safeParse({
  senha: "MinhaSenh@123",
  confirmarSenha: "MinhaSenh@456"
});

if (!resultado.success) {
  console.log(resultado.error.errors);
  // [{ path: ['confirmarSenha'], message: 'As senhas não coincidem' }]
}

// Validação condicional complexa
const pedidoSchema = z.object({
  tipo: z.enum(["fisica", "juridica"]),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  valor: z.number().positive()
}).refine(
  (data) => {
    if (data.tipo === "fisica") {
      return data.cpf !== undefined && /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data.cpf);
    }
    if (data.tipo === "juridica") {
      return data.cnpj !== undefined && /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(data.cnpj);
    }
    return false;
  },
  {
    message: "CPF ou CNPJ inválido para o tipo selecionado",
    path: ["cpf", "cnpj"]
  }
);
```

### 5. Schemas Recursivos

```javascript
import { z } from 'zod';

// Definindo um tipo recursivo (ex: árvore de categorias)
const categoriaSchema = z.lazy(() => 
  z.object({
    id: z.number(),
    nome: z.string(),
    subcategorias: z.array(categoriaSchema).optional()
  })
);

// Exemplo de uso
const categorias = {
  id: 1,
  nome: "Eletrônicos",
  subcategorias: [
    {
      id: 2,
      nome: "Computadores",
      subcategorias: [
        { id: 3, nome: "Notebooks" },
        { id: 4, nome: "Desktops" }
      ]
    },
    {
      id: 5,
      nome: "Celulares"
    }
  ]
};

console.log(categoriaSchema.parse(categorias)); // ✓
```

### 6. Schemas Dinâmicos e Composição

```javascript
import { z } from 'zod';

// Schema base
const baseUsuarioSchema = z.object({
  nome: z.string(),
  email: z.string().email()
});

// Estendendo schemas
const usuarioAdminSchema = baseUsuarioSchema.extend({
  role: z.literal("admin"),
  permissoes: z.array(z.string())
});

const usuarioComumSchema = baseUsuarioSchema.extend({
  role: z.literal("user"),
  assinatura: z.enum(["free", "premium"]).optional()
});

// Usando partial() - torna todos os campos opcionais
const usuarioAtualizacaoSchema = baseUsuarioSchema.partial();

// Usando pick() - seleciona campos específicos
const loginSchema = baseUsuarioSchema.pick({ email: true });

// Usando omit() - remove campos específicos
const usuarioSemEmailSchema = baseUsuarioSchema.omit({ email: true });

// merge() - combina schemas
const usuarioCompletoSchema = usuarioAdminSchema.merge(
  z.object({ dataCriacao: z.date() })
);
```

### Exercício Prático 1 (15 minutos)

Crie um schema para validar um formulário de pedido de e-commerce com:

- Cliente (nome, email, telefone)
- Itens do pedido (array de produtos com id, nome, quantidade, preço)
- Endereço de entrega
- Método de pagamento (cartão ou boleto)
- Se cartão: validar número, validade e CVV
- Total do pedido deve ser igual à soma dos itens

---

## Parte 5: Tratamento de Edge Cases (40 minutos)

### 1. Valores Nulos, Undefined e Opcionais

```javascript
import { z } from 'zod';

// Campo opcional (pode ser undefined)
const usuarioSchema = z.object({
  nome: z.string(),
  apelido: z.string().optional() // pode ser undefined
});

console.log(usuarioSchema.parse({ nome: "João" })); // ✓
console.log(usuarioSchema.parse({ nome: "João", apelido: "JJ" })); // ✓

// Nullable (pode ser null)
const descricaoSchema = z.string().nullable();
console.log(descricaoSchema.parse(null)); // ✓

// Nullable e Optional (pode ser null OU undefined)
const bioSchema = z.string().nullable().optional();

// Valor padrão
const statusSchema = z.string().default("ativo");
const resultado = z.object({ status: statusSchema }).parse({});
console.log(resultado); // { status: "ativo" }

// Tratando valores vazios
const emailSchema = z.string()
  .min(1, "Email é obrigatório") // não aceita string vazia
  .email("Email inválido");

// Alternativa para aceitar vazio ou formato válido
const emailOpcionalSchema = z.string()
  .email("Email inválido")
  .or(z.literal(""));
```

### 2. Coerção de Tipos

```javascript
import { z } from 'zod';

// Dados de formulários HTML sempre vêm como strings
// Zod pode fazer coerção automática

const formularioSchema = z.object({
  idade: z.coerce.number(), // "25" -> 25
  aceiteTermos: z.coerce.boolean(), // "true" -> true
  dataNascimento: z.coerce.date() // "2000-01-01" -> Date
});

const dados = {
  idade: "25",
  aceiteTermos: "true",
  dataNascimento: "2000-01-01"
};

const resultado = formularioSchema.parse(dados);
console.log(resultado);
// {
//   idade: 25,
//   aceiteTermos: true,
//   dataNascimento: Date
// }

// Coerção com validações adicionais
const idadeSchema = z.coerce.number()
  .int("Idade deve ser um número inteiro")
  .positive("Idade deve ser positiva")
  .min(18, "Deve ser maior de 18 anos");

// Tratando valores que não podem ser coagidos
const precoSchema = z.coerce.number().catch(0);
console.log(precoSchema.parse("não é um número")); // 0 (fallback)
```

### 3. Valores Inesperados e Unknown

```javascript
import { z } from 'zod';

// Permitir qualquer valor
const anySchema = z.any();

// Tipo desconhecido (mais seguro que any)
const unknownSchema = z.unknown();

// Validando dados de API externa
const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown() // não sabemos o formato ainda
}).transform((val) => {
  // Podemos validar o data posteriormente
  if (val.success && typeof val.data === 'object') {
    return val;
  }
  throw new Error("Resposta inválida");
});

// Ignorar campos desconhecidos (padrão: strict)
const usuarioStrictSchema = z.object({
  nome: z.string(),
  email: z.string()
});

// Isto falha por padrão
try {
  usuarioStrictSchema.parse({
    nome: "João",
    email: "joao@example.com",
    campoExtra: "não esperado" // Zod ignora por padrão
  });
} catch (error) {
  console.log("Em versões recentes, campos extras são ignorados por padrão");
}

// Rejeitar campos extras explicitamente
const usuarioStrictExplicitoSchema = z.object({
  nome: z.string(),
  email: z.string()
}).strict();

// Permitir campos extras explicitamente
const usuarioPassthroughSchema = z.object({
  nome: z.string(),
  email: z.string()
}).passthrough();
```

### 4. Tratamento de Erros Customizado

```javascript
import { z } from 'zod';

// Mensagens de erro customizadas
const usuarioSchema = z.object({
  nome: z.string({
    required_error: "O nome é obrigatório",
    invalid_type_error: "O nome deve ser um texto"
  }).min(3, "O nome deve ter pelo menos 3 caracteres"),
  
  idade: z.number({
    required_error: "A idade é obrigatória",
    invalid_type_error: "A idade deve ser um número"
  }),
  
  email: z.string()
    .email("Por favor, insira um email válido")
});

// Formatando erros para o usuário
function validarEFormatarErros(schema, dados) {
  const resultado = schema.safeParse(dados);
  
  if (!resultado.success) {
    const errosFormatados = {};
    
    resultado.error.errors.forEach((erro) => {
      const campo = erro.path.join('.');
      errosFormatados[campo] = erro.message;
    });
    
    return { sucesso: false, erros: errosFormatados };
  }
  
  return { sucesso: true, dados: resultado.data };
}

// Usando
const resultado = validarEFormatarErros(usuarioSchema, {
  nome: "Jo",
  idade: "não é número"
});

console.log(resultado);
// {
//   sucesso: false,
//   erros: {
//     'nome': 'O nome deve ter pelo menos 3 caracteres',
//     'idade': 'A idade deve ser um número'
//   }
// }
```

### 5. Edge Cases Comuns

```javascript
import { z } from 'zod';

// Arrays vazios
const tagsSchema = z.array(z.string()).min(1, "Adicione pelo menos uma tag");

// Strings vazias vs undefined
const comentarioSchema = z.string().trim().min(1, "Comentário não pode estar vazio");

// Números especiais
const precoSchema = z.number()
  .finite("Preço deve ser um número finito") // rejeita Infinity
  .safe("Preço fora do intervalo seguro"); // rejeita números muito grandes

// Datas inválidas
const dataSchema = z.date()
  .refine((data) => !isNaN(data.getTime()), "Data inválida");

// Email com espaços
const emailSeguroSchema = z.string()
  .trim()
  .toLowerCase()
  .email("Email inválido");

// Validação de CPF (exemplo)
const cpfSchema = z.string()
  .transform((val) => val.replace(/\D/g, ''))
  .refine((val) => val.length === 11, "CPF deve ter 11 dígitos")
  .refine(validarCPF, "CPF inválido");

function validarCPF(cpf) {
  // Implementação do algoritmo de validação de CPF
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}
```

### Exercício Prático 2

Crie um schema que:

1. Aceite dados de um formulário de contato
2. Trate campos opcionais adequadamente
3. Faça coerção de tipos quando necessário
4. Valide e-mail e telefone com formatos brasileiros
5. Forneça mensagens de erro amigáveis

---

## Pausa (15 minutos)

---

## Parte 6: Sanitização de Dados com Zod (35 minutos)

### 1. Transformações Básicas

```javascript
import { z } from 'zod';

// Transformar strings
const nomeSchema = z.string()
  .trim() // remove espaços
  .toLowerCase() // converte para minúsculas
  .transform((val) => 
    val.charAt(0).toUpperCase() + val.slice(1) // Capitaliza
  );

console.log(nomeSchema.parse("  jOÃO  ")); // "João"

// Transformar números
const precoSchema = z.number()
  .transform((val) => Math.round(val * 100) / 100); // 2 casas decimais

console.log(precoSchema.parse(19.999)); // 20

// Transformar datas
const dataSchema = z.string()
  .transform((val) => new Date(val))
  .refine((data) => !isNaN(data.getTime()), "Data inválida");
```

### 2. Limpeza e Normalização de Dados

```javascript
import { z } from 'zod';

// Normalizar telefone
const telefoneSchema = z.string()
  .transform((val) => val.replace(/\D/g, '')) // remove não-dígitos
  .refine((val) => val.length === 10 || val.length === 11, 
    "Telefone deve ter 10 ou 11 dígitos")
  .transform((val) => {
    // Formata (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (val.length === 11) {
      return `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    }
    return `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
  });

console.log(telefoneSchema.parse("11987654321")); 
// "(11) 98765-4321"

// Normalizar CEP
const cepSchema = z.string()
  .transform((val) => val.replace(/\D/g, ''))
  .refine((val) => val.length === 8, "CEP deve ter 8 dígitos")
  .transform((val) => `${val.slice(0, 5)}-${val.slice(5)}`);

console.log(cepSchema.parse("01310100")); // "01310-100"

// Limpar HTML/Scripts (básico)
const textoSeguroSchema = z.string()
  .transform((val) => 
    val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  )
  .transform((val) => 
    val.replace(/<[^>]*>/g, '') // remove tags HTML
  );

// Sanitizar URL
const urlSchema = z.string()
  .url("URL inválida")
  .transform((val) => {
    const url = new URL(val);
    // Remove query strings sensíveis
    url.searchParams.delete('token');
    url.searchParams.delete('password');
    return url.toString();
  });

// Normalizar email
const emailSchema = z.string()
  .email()
  .trim()
  .toLowerCase()
  .transform((val) => {
    // Remove pontos do Gmail (user.name@gmail.com = username@gmail.com)
    const [local, domain] = val.split('@');
    if (domain === 'gmail.com') {
      return local.replace(/\./g, '') + '@' + domain;
    }
    return val;
  });
```

### 3. Transformações em Objetos Complexos

```javascript
import { z } from 'zod';

const enderecoSchema = z.object({
  cep: z.string().transform((val) => val.replace(/\D/g, '')),
  rua: z.string().trim(),
  numero: z.union([z.string(), z.number()])
    .transform((val) => String(val)), // sempre retorna string
  complemento: z.string().trim().optional(),
  bairro: z.string().trim(),
  cidade: z.string().trim(),
  estado: z.string().trim().toUpperCase().length(2)
});

const usuarioComEnderecoSchema = z.object({
  nome: z.string().trim(),
  email: z.string().email().toLowerCase(),
  telefone: z.string().transform((val) => val.replace(/\D/g, '')),
  endereco: enderecoSchema
}).transform((data) => {
  // Transformação adicional no objeto completo
  return {
    ...data,
    nomeCompleto: data.nome,
    primeiroNome: data.nome.split(' ')[0],
    contatoFormatado: `${data.email} | ${data.telefone}`
  };
});

const resultado = usuarioComEnderecoSchema.parse({
  nome: "  João Silva  ",
  email: "JOAO@EXAMPLE.COM",
  telefone: "(11) 98765-4321",
  endereco: {
    cep: "01310-100",
    rua: "Av. Paulista",
    numero: 1000,
    bairro: "Bela Vista",
    cidade: "são paulo",
    estado: "sp"
  }
});

console.log(resultado);
// {
//   nome: "João Silva",
//   email: "joao@example.com",
//   telefone: "11987654321",
//   endereco: { ... estado: "SP" },
//   nomeCompleto: "João Silva",
//   primeiroNome: "João",
//   contatoFormatado: "joao@example.com | 11987654321"
// }
```

### 4. Preprocess - Transformação Antes da Validação

```javascript
import { z } from 'zod';

// Preprocess permite transformar dados ANTES de validar
const numeroFlexivelSchema = z.preprocess(
  (val) => {
    // Aceita string, número, ou qualquer coisa
    if (typeof val === 'string') {
      return parseFloat(val.replace(',', '.'));
    }
    return val;
  },
  z.number().positive()
);

console.log(numeroFlexivelSchema.parse("1.234,56")); // 1234.56
console.log(numeroFlexivelSchema.parse("1234.56")); // 1234.56
console.log(numeroFlexivelSchema.parse(1234.56)); // 1234.56

// Preprocess para datas flexíveis
const dataFlexivelSchema = z.preprocess(
  (val) => {
    if (val instanceof Date) return val;
    if (typeof val === 'string') return new Date(val);
    if (typeof val === 'number') return new Date(val);
    return val;
  },
  z.date()
);

// Preprocess para booleanos flexíveis
const booleanFlexivelSchema = z.preprocess(
  (val) => {
    if (typeof val === 'boolean') return val;
    if (val === 'true' || val === '1' || val === 1) return true;
    if (val === 'false' || val === '0' || val === 0) return false;
    return val;
  },
  z.boolean()
);

console.log(booleanFlexivelSchema.parse('true')); // true
console.log(booleanFlexivelSchema.parse(1)); // true
console.log(booleanFlexivelSchema.parse('false')); // false
```

### 5. Pipe - Encadeamento de Schemas

```javascript
import { z } from 'zod';

// pipe() permite validar em etapas
const senhaSeguraSchema = z.string()
  .pipe(z.string().min(8))
  .pipe(z.string().regex(/[A-Z]/, "Precisa de maiúscula"))
  .pipe(z.string().regex(/[0-9]/, "Precisa de número"));

// Validação e transformação em sequência
const emailNormalizadoSchema = z.string()
  .pipe(z.string().email())
  .pipe(z.string().toLowerCase())
  .pipe(z.string().trim());

// Uso prático com múltiplas etapas
const idadeStringSchema = z.string()
  .pipe(z.coerce.number())
  .pipe(z.number().int().positive())
  .pipe(z.number().min(18).max(120));

console.log(idadeStringSchema.parse("25")); // 25
```

### 6. Sanitização para APIs e Banco de Dados

```javascript
import { z } from 'zod';

// Schema de entrada (dados do usuário)
const criarUsuarioInputSchema = z.object({
  nome: z.string().trim().min(2).max(100),
  email: z.string().email().toLowerCase().trim(),
  senha: z.string().min(8),
  telefone: z.string().optional(),
  dataNascimento: z.string().transform((val) => new Date(val)),
  aceitaTermos: z.coerce.boolean()
});

// Schema de saída (para salvar no DB)
const criarUsuarioDatabaseSchema = criarUsuarioInputSchema
  .omit({ senha: true }) // Remove senha do schema
  .extend({
    senhaHash: z.string(), // Adiciona hash da senha
    id: z.string().uuid(),
    criadoEm: z.date(),
    atualizadoEm: z.date(),
    ativo: z.boolean().default(true)
  });

// Função de criação de usuário
async function criarUsuario(dadosInput) {
  // 1. Validar e sanitizar input
  const dadosValidados = criarUsuarioInputSchema.parse(dadosInput);
  
  // 2. Processar dados sensíveis
  const senhaHash = await hashSenha(dadosValidados.senha);
  
  // 3. Preparar para database
  const dadosParaDB = {
    id: gerarUUID(),
    nome: dadosValidados.nome,
    email: dadosValidados.email,
    senhaHash: senhaHash,
    telefone: dadosValidados.telefone,
    dataNascimento: dadosValidados.dataNascimento,
    aceitaTermos: dadosValidados.aceitaTermos,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
    ativo: true
  };
  
  // 4. Validar dados finais antes de salvar
  const dadosFinais = criarUsuarioDatabaseSchema.parse(dadosParaDB);
  
  // 5. Salvar no banco
  return await salvarNoBanco(dadosFinais);
}

// Funções auxiliares (exemplo)
function gerarUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function hashSenha(senha) {
  // Em produção, use bcrypt, argon2, etc.
  return `hash_${senha}`;
}

async function salvarNoBanco(dados) {
  // Implementação do banco de dados
  return dados;
}
```

### Exercício Prático 3 (15 minutos)

Crie um sistema de sanitização para um formulário de cadastro que:
1. Normalize todos os campos de texto
2. Formate CPF e telefone automaticamente
3. Transforme a data de nascimento em objeto Date
4. Calcule a idade a partir da data de nascimento
5. Retorne um objeto pronto para ser salvo no banco de dados

---

## Parte 7: Melhores Práticas (30 minutos)

### 1. Organização de Schemas

```javascript
// schemas/usuario.schema.js
import { z } from 'zod';

// Schemas reutilizáveis
export const emailSchema = z.string()
  .email("Email inválido")
  .toLowerCase()
  .trim();

export const senhaSchema = z.string()
  .min(8, "Senha deve ter pelo menos 8 caracteres")
  .regex(/[A-Z]/, "Deve conter letra maiúscula")
  .regex(/[a-z]/, "Deve conter letra minúscula")
  .regex(/[0-9]/, "Deve conter número")
  .regex(/[@$!%*?&#]/, "Deve conter caractere especial");

export const telefoneSchema = z.string()
  .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido")
  .optional();

// Schema principal
export const usuarioSchema = z.object({
  nome: z.string().min(2).max(100),
  email: emailSchema,
  senha: senhaSchema,
  telefone: telefoneSchema
});

// Schema para login (reutiliza parcialmente)
export const loginSchema = usuarioSchema.pick({
  email: true,
  senha: true
});

// Schema para atualização (todos opcionais)
export const atualizarUsuarioSchema = usuarioSchema
  .omit({ senha: true })
  .partial();
```

### 2. Validação em Camadas

```javascript
import { z } from 'zod';

// Camada 1: Validação de API (input do usuário)
const criarProdutoAPISchema = z.object({
  nome: z.string().min(3),
  descricao: z.string().optional(),
  preco: z.string(), // vem como string do formulário
  categoria: z.string(),
  estoque: z.string()
});

// Camada 2: Validação de Negócio
const criarProdutoBusinessSchema = z.object({
  nome: z.string().min(3).max(200),
  descricao: z.string().max(1000).optional(),
  preco: z.number().positive().max(1000000),
  categoria: z.enum(["eletronicos", "roupas", "alimentos"]),
  estoque: z.number().int().nonnegative()
});

// Camada 3: Validação de Banco de Dados
const produtoDatabaseSchema = criarProdutoBusinessSchema.extend({
  id: z.string().uuid(),
  ativo: z.boolean(),
  criadoEm: z.date(),
  atualizadoEm: z.date(),
  slug: z.string()
});

// Uso em Controller
async function criarProdutoController(req, res) {
  try {
    // Validação da API
    const dadosAPI = criarProdutoAPISchema.parse(req.body);
    
    // Transformação e validação de negócio
    const dadosBusiness = criarProdutoBusinessSchema.parse({
      nome: dadosAPI.nome,
      descricao: dadosAPI.descricao,
      preco: parseFloat(dadosAPI.preco),
      categoria: dadosAPI.categoria,
      estoque: parseInt(dadosAPI.estoque)
    });
    
    // Preparar para DB
    const dadosDB = produtoDatabaseSchema.parse({
      ...dadosBusiness,
      id: gerarUUID(),
      ativo: true,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
      slug: gerarSlug(dadosBusiness.nome)
    });
    
    // Salvar
    const produto = await salvarProduto(dadosDB);
    
    res.json({ sucesso: true, produto });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        sucesso: false,
        erros: error.errors
      });
    } else {
      res.status(500).json({ sucesso: false, erro: "Erro interno" });
    }
  }
}

function gerarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
```

### 3. Middleware Express com Zod

```javascript
import { z } from 'zod';

// Middleware genérico de validação
function validar(schema, propriedade = 'body') {
  return (req, res, next) => {
    const resultado = schema.safeParse(req[propriedade]);
    
    if (!resultado.success) {
      return res.status(400).json({
        sucesso: false,
        erros: resultado.error.errors.map(erro => ({
          campo: erro.path.join('.'),
          mensagem: erro.message
        }))
      });
    }
    
    // Substitui os dados originais pelos validados e sanitizados
    req[propriedade] = resultado.data;
    next();
  };
}

// Schemas
const criarUsuarioSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  senha: z.string().min(8)
});

const atualizarUsuarioSchema = criarUsuarioSchema.partial();

const usuarioIdSchema = z.object({
  id: z.string().uuid()
});

const queryPaginacaoSchema = z.object({
  pagina: z.coerce.number().int().positive().default(1),
  limite: z.coerce.number().int().positive().max(100).default(10),
  ordenar: z.enum(['nome', 'email', 'criadoEm']).default('criadoEm')
});

// Rotas
import express from 'express';
const router = express.Router();

router.post(
  '/usuarios',
  validar(criarUsuarioSchema),
  criarUsuarioController
);

router.put(
  '/usuarios/:id',
  validar(usuarioIdSchema, 'params'),
  validar(atualizarUsuarioSchema),
  atualizarUsuarioController
);

router.get(
  '/usuarios',
  validar(queryPaginacaoSchema, 'query'),
  listarUsuariosController
);

// Controllers
async function criarUsuarioController(req, res) {
  // req.body já está validado e sanitizado
  const usuario = await criarUsuario(req.body);
  res.json({ sucesso: true, usuario });
}

async function atualizarUsuarioController(req, res) {
  // req.params.id e req.body já estão validados
  const usuario = await atualizarUsuario(req.params.id, req.body);
  res.json({ sucesso: true, usuario });
}

async function listarUsuariosController(req, res) {
  // req.query já está validado e com valores padrão
  const { pagina, limite, ordenar } = req.query;
  const usuarios = await listarUsuarios({ pagina, limite, ordenar });
  res.json({ sucesso: true, usuarios });
}
```

### 4. Validação de Arquivos Upload

```javascript
import { z } from 'zod';

// Schema para validar metadados de arquivo
const arquivoSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.enum([
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf'
  ], { errorMap: () => ({ message: "Tipo de arquivo não permitido" }) }),
  size: z.number().max(5 * 1024 * 1024, "Arquivo deve ter no máximo 5MB"),
  buffer: z.instanceof(Buffer)
});

// Middleware de upload
function validarUpload(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      sucesso: false,
      erro: "Nenhum arquivo enviado"
    });
  }
  
  const resultado = arquivoSchema.safeParse(req.file);
  
  if (!resultado.success) {
    return res.status(400).json({
      sucesso: false,
      erros: resultado.error.errors
    });
  }
  
  req.file = resultado.data;
  next();
}

// Uso
router.post('/upload', upload.single('arquivo'), validarUpload, uploadController);
```

### 5. Tratamento Global de Erros

```javascript
import { z } from 'zod';

// Error handler personalizado
class ErroValidacao extends Error {
  constructor(erros) {
    super("Erro de validação");
    this.name = "ErroValidacao";
    this.erros = erros;
    this.statusCode = 400;
  }
}

// Função auxiliar para validação
function validarOuLancarErro(schema, dados) {
  const resultado = schema.safeParse(dados);
  
  if (!resultado.success) {
    throw new ErroValidacao(
      resultado.error.errors.map(erro => ({
        campo: erro.path.join('.'),
        mensagem: erro.message,
        codigo: erro.code
      }))
    );
  }
  
  return resultado.data;
}

// Middleware de erro global
function tratadorErroGlobal(err, req, res, next) {
  // Erro de validação do Zod
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      sucesso: false,
      tipo: 'validacao',
      erros: err.errors.map(erro => ({
        campo: erro.path.join('.'),
        mensagem: erro.message
      }))
    });
  }
  
  // Erro customizado de validação
  if (err instanceof ErroValidacao) {
    return res.status(err.statusCode).json({
      sucesso: false,
      tipo: 'validacao',
      erros: err.erros
    });
  }
  
  // Outros erros
  console.error(err);
  res.status(500).json({
    sucesso: false,
    tipo: 'interno',
    mensagem: 'Erro interno do servidor'
  });
}

// Uso no Express
app.use(tratadorErroGlobal);
```

### 6. Performance e Cache de Schemas

```javascript
import { z } from 'zod';

// Cache de schemas para evitar recriação
const schemaCache = new Map();

function obterSchema(chave, criador) {
  if (!schemaCache.has(chave)) {
    schemaCache.set(chave, criador());
  }
  return schemaCache.get(chave);
}

// Uso
const usuarioSchema = obterSchema('usuario', () => 
  z.object({
    nome: z.string(),
    email: z.string().email()
  })
);

// Para schemas grandes, considere lazy loading
const schemaPesado = z.lazy(() => 
  z.object({
    // Schema complexo que só será criado quando necessário
    campo1: z.string(),
    campo2: z.array(z.object({
      // ...
    }))
  })
);
```

### 7. Documentação e Tipos TypeScript

```javascript
import { z } from 'zod';

// Schema bem documentado
const usuarioSchema = z.object({
  /** Nome completo do usuário */
  nome: z.string()
    .min(2, "Nome muito curto")
    .max(100, "Nome muito longo")
    .describe("Nome completo do usuário"),
  
  /** Email único do usuário */
  email: z.string()
    .email("Email inválido")
    .describe("Email único para login"),
  
  /** Idade do usuário em anos */
  idade: z.number()
    .int("Idade deve ser inteira")
    .positive("Idade deve ser positiva")
    .min(18, "Usuário deve ser maior de idade")
    .describe("Idade em anos completos")
});

// Inferir tipos TypeScript
type Usuario = z.infer<typeof usuarioSchema>;
// Usuario = { nome: string; email: string; idade: number }

type UsuarioInput = z.input<typeof usuarioSchema>;
// Tipo antes das transformações

type UsuarioOutput = z.output<typeof usuarioSchema>;
// Tipo depois das transformações

// Uso em funções tipadas
function processarUsuario(dados: Usuario): void {
  console.log(dados.nome); // TypeScript sabe que é string
}

// Extrair tipo parcial
type AtualizarUsuario = Partial<Usuario>;

// Tipo sem campo específico
type UsuarioSemEmail = Omit<Usuario, 'email'>;
```

### Checklist de Boas Práticas

✅ **Organização**

- Mantenha schemas em arquivos separados
- Reutilize schemas comuns
- Use nomes descritivos para schemas

✅ **Validação**

- Valide dados o mais cedo possível
- Use `.safeParse()` quando não quiser exceções
- Forneça mensagens de erro claras e específicas

✅ **Sanitização**

- Sempre normalize dados de entrada (trim, lowercase, etc.)
- Remova caracteres perigosos
- Transforme dados para o formato esperado

✅ **Performance**

- Cache schemas quando possível
- Evite validações desnecessárias
- Use `.partial()` para atualizações

✅ **Segurança**

- Nunca confie em dados do cliente
- Valide tipos e formatos rigorosamente
- Sanitize dados antes de usar em queries

✅ **Manutenibilidade**

- Documente schemas complexos
- Use TypeScript para type safety
- Mantenha schemas simples e compostos

---

## Parte 8: Projeto Prático Final (40 minutos)

### Desafio: Sistema de Gerenciamento de Eventos

Crie um sistema completo de validação para uma API de gerenciamento de eventos com os seguintes requisitos:

#### Requisitos Funcionais:

1. **Cadastro de Evento**
   - Título (3-200 caracteres)
   - Descrição (opcional, máx 2000 caracteres)
   - Data de início (deve ser futura)
   - Data de término (deve ser após início)
   - Local (rua, número, cidade, estado, CEP)
   - Categoria (conferência, workshop, meetup, palestra)
   - Capacidade máxima de participantes
   - Preço (gratuito ou pago)
   - Se pago: valor entre 0.01 e 10000

2. **Inscrição de Participante**
   - Nome completo
   - Email
   - CPF
   - Telefone
   - Data de nascimento (maior de 16 anos)
   - Tipo de ingresso (inteira, meia)

3. **Busca de Eventos**
   - Filtros: categoria, data, cidade, preço
   - Paginação
   - Ordenação

#### Estrutura Sugerida:

```javascript
// schemas/evento.schema.js
import { z } from 'zod';

// Implemente seus schemas aqui

// schemas/participante.schema.js
// schemas/inscricao.schema.js
// controllers/evento.controller.js
// middlewares/validacao.middleware.js
```

#### Critérios de Avaliação

1. Schemas bem estruturados e reutilizáveis
2. Validações complexas (datas, CPF, relacionamentos)
3. Sanitização adequada de dados
4. Tratamento de edge cases
5. Mensagens de erro claras
6. Uso de middleware de validação
7. Tratamento global de erros

**Tempo:** 30 minutos de desenvolvimento + 10 minutos de apresentação

---

## Recursos Adicionais

### Documentação Oficial

- [Zod Documentation](https://zod.dev/)
- [Zod GitHub](https://github.com/colinhacks/zod)

### Bibliotecas Complementares

- **zod-to-json-schema**: Converte schemas Zod para JSON Schema
- **zod-to-openapi**: Gera documentação OpenAPI
- **zod-validation-error**: Mensagens de erro mais amigáveis

### Integração com Frameworks

#### Express.js

```javascript
import { z } from 'zod';
import express from 'express';

const app = express();
app.use(express.json());

// Middleware de validação (já vimos antes)
```

#### Fastify

```javascript
import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

const fastify = Fastify();
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
```


### Comparação com Outras Bibliotecas

| Recurso | Zod | Joi | Yup | Ajv |
|---------|-----|-----|-----|-----|
| Type Inference | ✅ Excelente | ❌ Não | ⚠️ Limitado | ❌ Não |
| Bundle Size | ~8kb | ~146kb | ~40kb | ~120kb |
| TypeScript First | ✅ Sim | ❌ Não | ❌ Não | ❌ Não |
| Validação Async | ✅ Sim | ✅ Sim | ✅ Sim | ✅ Sim |
| Transformações | ✅ Sim | ✅ Sim | ✅ Sim | ❌ Não |
| Performance | ⚠️ Boa | ⚠️ Boa | ⚠️ Média | ✅ Excelente |

---

## Exercícios para Casa (Parte 2)

### Exercício 1: E-commerce
Crie schemas de validação para um carrinho de compras com:
- Produtos com variações (tamanho, cor)
- Cupons de desconto
- Cálculo de frete
- Formas de pagamento múltiplas

### Exercício 2: Rede Social
Implemente validação para:
- Criação de posts com hashtags
- Comentários aninhados
- Sistema de reações
- Upload de imagens/vídeos

### Exercício 3: Sistema Bancário
Desenvolva validação para:
- Transferências entre contas
- Agendamento de pagamentos
- Validação de limites e saldos
- Histórico de transações

---

## Conclusão e Próximos Passos

### O que aprendemos hoje:

1. ✅ A importância crítica da validação de dados
2. ✅ Como usar Zod para criar schemas robustos
3. ✅ Implementação de validações complexas
4. ✅ Tratamento de edge cases
5. ✅ Sanitização e transformação de dados
6. ✅ Melhores práticas para aplicações reais
7. ✅ Integração com frameworks populares

### Próximos Passos:

1. **Pratique** com projetos reais
2. **Explore** integrações com React Hook Form, Formik
3. **Estude** validação em banco de dados (Prisma + Zod)
4. **Implemente** validação em todos os seus projetos
5. **Compartilhe** seu conhecimento com a equipe

### Desafio Final

Implemente um sistema de validação completo para o seu projeto final, incorporando todas as técnicas aprendidas hoje:

**Requisitos:**
- Utilize schemas organizados e reutilizáveis
- Implemente validações complexas com `.refine()`
- Trate edge cases adequadamente
- Sanitize todos os dados de entrada
- Forneça mensagens de erro claras
- Utilize middleware de validação no Express

---

## Recursos Adicionais e Documentação

### Links Úteis
- **Documentação Oficial do Zod:** https://zod.dev/
- **Repositório GitHub:** https://github.com/colinhacks/zod
- **Exemplos Práticos:** https://github.com/colinhacks/zod/tree/main/examples

### Comparação com Outras Bibliotecas

| Recurso | Zod | Joi | Yup |
|---------|-----|-----|-----|
| Tamanho do Bundle | ~8kb | ~146kb | ~40kb |
| Sintaxe | Chainable | Chainable | Chainable |
| Validação Async | ✅ Sim | ✅ Sim | ✅ Sim |
| Transformações | ✅ Sim | ✅ Sim | ✅ Sim |
| Curva de Aprendizado | Baixa | Média | Baixa |
| Comunidade | Grande | Muito Grande | Grande |

### Quando Usar Zod

**✅ Use Zod quando:**
- Você precisa de validação robusta e type-safe
- Quer código limpo e manutenível
- Necessita de transformações de dados
- Está construindo APIs REST
- Precisa validar dados de formulários
- Quer integração fácil com Express/Fastify

**❌ Considere alternativas quando:**
- Você precisa de validação extremamente performática em larga escala (considere Ajv)
- Já tem um projeto grande usando outra biblioteca e a migração não compensa
- Precisa de validação JSON Schema nativa (use Ajv)

---

## Exercícios para Casa

### Exercício 1: E-commerce Completo

Crie um sistema de validação para um e-commerce com:

- **Produtos:** nome, descrição, preço, categoria, estoque, imagens
- **Carrinho:** itens com quantidade, cálculo de subtotal
- **Cupom de desconto:** código, porcentagem/valor fixo, validade
- **Checkout:** dados do cliente, endereço, forma de pagamento
- **Validações extras:** estoque disponível, valor mínimo do pedido, CEP para cálculo de frete

### Exercício 2: Sistema de Agendamentos

Implemente validação para:

- **Serviços:** nome, duração, preço, categoria
- **Profissionais:** nome, especialidades, horários disponíveis
- **Agendamento:** data/hora, cliente, serviço, profissional
- **Validações extras:** horário disponível, conflito de agendamentos, antecedência mínima

### Exercício 3: Plataforma de Cursos

Desenvolva validação para:

- **Cursos:** título, descrição, carga horária, preço, categoria
- **Aulas:** título, conteúdo, vídeo URL, ordem, duração
- **Matrícula:** aluno, curso, forma de pagamento
- **Progresso:** aulas concluídas, certificado (se 100%)
- **Validações extras:** pré-requisitos, validade do certificado

---

## Resumo da Aula

### Principais Conceitos Aprendidos

1. **Importância da Validação**
   - Segurança da aplicação
   - Integridade dos dados
   - Melhor experiência do usuário
   - Código mais manutenível

2. **Zod Básico**
   - Instalação e configuração
   - Tipos primitivos (string, number, boolean, date)
   - `.parse()` vs `.safeParse()`
   - Schemas de objetos e arrays

3. **Validações Complexas**
   - Objetos aninhados
   - Arrays com restrições
   - Uniões e interseções
   - Refinamentos com `.refine()`
   - Schemas recursivos

4. **Edge Cases**
   - Valores null, undefined e optional
   - Coerção de tipos com `z.coerce`
   - Valores vazios e inesperados
   - Campos extras (strict, passthrough)

5. **Sanitização**
   - Transformações com `.transform()`
   - Normalização de dados
   - Limpeza de caracteres especiais
   - Formatação automática

6. **Melhores Práticas**
   - Organização de schemas em arquivos separados
   - Reutilização de schemas
   - Middleware de validação
   - Tratamento global de erros
   - Mensagens de erro personalizadas

### Checklist Final

Antes de finalizar sua implementação, verifique:

- [ ] Todos os inputs do usuário são validados
- [ ] Dados são sanitizados antes de serem usados
- [ ] Schemas estão organizados e documentados
- [ ] Mensagens de erro são claras e úteis
- [ ] Edge cases foram considerados
- [ ] Validações de negócio estão implementadas
- [ ] Middleware de validação está aplicado nas rotas
- [ ] Erros são tratados adequadamente
- [ ] Código está testado com dados válidos e inválidos

---

## Conclusão

Parabéns por concluir esta aula sobre Validação e Sanitização de Dados com Zod! 🎉

### Você agora é capaz de:

✅ Entender a importância crítica da validação de dados  
✅ Implementar validações robustas usando Zod  
✅ Tratar casos extremos e dados inesperados  
✅ Sanitizar e transformar dados de forma segura  
✅ Aplicar melhores práticas em projetos reais  
✅ Proteger sua aplicação contra dados maliciosos  
✅ Melhorar a experiência do usuário com feedback claro  

### Próximos Passos

1. **Pratique imediatamente:** Implemente validação no seu projeto atual
2. **Explore mais:** Tente integrar Zod com outras bibliotecas
3. **Compartilhe:** Ensine o que aprendeu para outros desenvolvedores
4. **Aprofunde:** Estude validação em contextos específicos (GraphQL, WebSockets)

### Frase Final

> "Dados não validados são como portas destrancadas: um convite aberto para problemas. Com Zod, você mantém suas aplicações seguras, robustas e confiáveis."



