# 🧪 Testes Unitários com Jest e Vitest

> *"Código não testado é código quebrado que ainda não descobrimos."*

---

## 🎯 Por que Testar Código?

**Testes automatizados** verificam se seu código funciona como esperado, aumentando confiança e qualidade.

### Benefícios

- ✅ **Previne bugs:** Detecta erros antes da produção
- ✅ **Refatoração segura:** Muda código sem medo
- ✅ **Documentação viva:** Testes mostram como usar o código
- ✅ **Confiança:** Sabe que funciona
- ✅ **Economia de tempo:** Automatiza validações manuais

### Tipos de Testes

```text
              ┌─────────────────────┐
              │   Testes E2E       │ (Selenium, Playwright)
              │  (End-to-End)      │
              └─────────────────────┘
                      ▲
                      │ Poucos, lentos
                      │
              ┌─────────────────────┐
              │ Testes de Integração│ (Componentes juntos)
              │                     │
              └─────────────────────┘
                      ▲
                      │ Médio número
                      │
              ┌─────────────────────┐
              │  Testes Unitários   │ ← Foco desta aula!
              │  (Funções isoladas) │
              └─────────────────────┘
                Muitos, rápidos
```

---

## 🆚 Jest vs Vitest

| Característica | Jest | Vitest |
|---------------|------|--------|
| **Performance** | ⚡ Bom | ⚡⚡⚡ Muito rápido |
| **ESM Support** | ⚠️ Limitado | ✅ Nativo |
| **HMR** | ❌ Não | ✅ Sim |
| **Configuração** | ⚙️ Manual | ⚙️ Zero-config (com Vite) |
| **Compatibilidade** | Jest API | Jest API (compatível!) |
| **Popularidade** | 🌟🌟🌟🌟🌟 | 🌟🌟🌟🌟 |
| **Melhor para** | Projetos React | Projetos Vite/Vue |

**Resumo:** Ambos são excelentes! Vitest é mais moderno e rápido, Jest é mais estabelecido.

---

## 🎨 Jest - Configuração e Primeiros Testes

### Instalação

```bash
# npm
npm install --save-dev jest

# Com TypeScript
npm install --save-dev jest @types/jest ts-jest

# Yarn
yarn add --dev jest

# pnpm
pnpm add -D jest
```

### Configuração Jest

```bash
# Criar configuração
npx jest --init
```

**jest.config.js:**

```javascript
module.exports = {
  testEnvironment: 'node',           // ou 'jsdom' para testes de DOM
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ]
};
```

**Para TypeScript (jest.config.js):**

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts']
};
```

### package.json scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## ⚡ Vitest - Configuração e Primeiros Testes

### Instalação

```bash
# npm
npm install --save-dev vitest

# Yarn
yarn add --dev vitest

# pnpm
pnpm add -D vitest
```

### Configuração Vitest

**vite.config.ts (ou vitest.config.ts):**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,              // Usa variáveis globais (describe, it, expect)
    environment: 'node',        // ou 'jsdom' para DOM
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html']
    }
  }
});
```

### package.json scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 📘 Estrutura de Testes

### Anatomia de um Teste

```typescript
// Importar funções de teste
import { describe, it, expect } from 'vitest'; // ou 'jest' para Jest

// Função a ser testada
function somar(a: number, b: number): number {
  return a + b;
}

// Suite de testes (agrupa testes relacionados)
describe('somar', () => {
  
  // Teste individual
  it('deve somar dois números positivos', () => {
    // Arrange (Preparar)
    const a = 2;
    const b = 3;
    
    // Act (Agir)
    const resultado = somar(a, b);
    
    // Assert (Verificar)
    expect(resultado).toBe(5);
  });
  
  it('deve somar números negativos', () => {
    expect(somar(-2, -3)).toBe(-5);
  });
  
  it('deve lidar com zero', () => {
    expect(somar(5, 0)).toBe(5);
    expect(somar(0, 0)).toBe(0);
  });
});
```

### Convenções de Nomenclatura

```typescript
// ✅ BOM: Descreve o que a função DEVE fazer
it('deve retornar true para emails válidos', () => {});
it('deve lançar erro quando divisor é zero', () => {});
it('deve filtrar usuários ativos', () => {});

// ❌ RUIM: Vago ou técnico demais
it('testa validação', () => {});
it('caso 1', () => {});
```

---

## 🔍 Matchers (Asserções)

### Igualdade

```typescript
// toBe (igualdade estrita ===)
expect(2 + 2).toBe(4);
expect('hello').toBe('hello');

// toEqual (igualdade profunda para objetos/arrays)
expect({ nome: 'João' }).toEqual({ nome: 'João' });
expect([1, 2, 3]).toEqual([1, 2, 3]);

// toStrictEqual (mais rigoroso, verifica undefined)
expect({ nome: 'João' }).toStrictEqual({ nome: 'João' });
```

### Números

```typescript
expect(2 + 2).toBe(4);
expect(5).toBeGreaterThan(3);
expect(5).toBeGreaterThanOrEqual(5);
expect(3).toBeLessThan(5);
expect(3).toBeLessThanOrEqual(3);

// Números decimais
expect(0.1 + 0.2).toBeCloseTo(0.3); // Evita problemas de precisão
```

### Strings

```typescript
expect('JavaScript').toMatch(/Script/);
expect('hello world').toContain('world');
expect('JavaScript').toHaveLength(10);
```

### Arrays e Iteráveis

```typescript
const frutas = ['maçã', 'banana', 'laranja'];

expect(frutas).toContain('banana');
expect(frutas).toHaveLength(3);
expect(frutas).toEqual(['maçã', 'banana', 'laranja']);

// Verificar se array contém objeto
const usuarios = [
  { id: 1, nome: 'João' },
  { id: 2, nome: 'Maria' }
];

expect(usuarios).toContainEqual({ id: 1, nome: 'João' });
```

### Booleanos e Nulos

```typescript
expect(true).toBe(true);
expect(false).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect('texto').toBeDefined();

// Truthy/Falsy
expect(1).toBeTruthy();
expect(0).toBeFalsy();
expect('').toBeFalsy();
expect('texto').toBeTruthy();
```

### Exceções

```typescript
function dividir(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Divisão por zero');
  }
  return a / b;
}

it('deve lançar erro ao dividir por zero', () => {
  expect(() => dividir(10, 0)).toThrow();
  expect(() => dividir(10, 0)).toThrow('Divisão por zero');
  expect(() => dividir(10, 0)).toThrow(Error);
});
```

### Negação

```typescript
expect(2 + 2).not.toBe(5);
expect('hello').not.toMatch(/goodbye/);
expect([1, 2, 3]).not.toContain(4);
```

---

## 🎯 Testando Funções Puras

### Exemplo: Utilitários de String

**utils/string.ts:**

```typescript
export function capitalizar(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function truncar(texto: string, maxLength: number): string {
  if (texto.length <= maxLength) return texto;
  return texto.slice(0, maxLength) + '...';
}

export function slug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Remove acentos
    .replace(/[^a-z0-9]+/g, '-')       // Substitui caracteres especiais
    .replace(/^-|-$/g, '');            // Remove hífens das pontas
}
```

**utils/string.test.ts:**

```typescript
import { describe, it, expect } from 'vitest';
import { capitalizar, truncar, slug } from './string';

describe('capitalizar', () => {
  it('deve capitalizar primeira letra', () => {
    expect(capitalizar('hello')).toBe('Hello');
  });
  
  it('deve manter maiúsculas existentes', () => {
    expect(capitalizar('HELLO')).toBe('HELLO');
  });
  
  it('deve retornar string vazia para string vazia', () => {
    expect(capitalizar('')).toBe('');
  });
});

describe('truncar', () => {
  it('deve truncar texto longo', () => {
    expect(truncar('Este é um texto longo', 10)).toBe('Este é um...');
  });
  
  it('não deve truncar texto curto', () => {
    expect(truncar('Curto', 10)).toBe('Curto');
  });
  
  it('deve lidar com texto do tamanho exato', () => {
    expect(truncar('Exato', 5)).toBe('Exato');
  });
});

describe('slug', () => {
  it('deve converter para slug', () => {
    expect(slug('Olá Mundo')).toBe('ola-mundo');
  });
  
  it('deve remover acentos', () => {
    expect(slug('Açúcar')).toBe('acucar');
  });
  
  it('deve substituir espaços por hífens', () => {
    expect(slug('JavaScript é incrível')).toBe('javascript-e-incrivel');
  });
});
```

---

## 🔧 Testando Funções com Objetos/Arrays

**utils/array.ts:**

```typescript
export function filtrarAtivos<T extends { ativo: boolean }>(items: T[]): T[] {
  return items.filter(item => item.ativo);
}

export function agruparPor<T>(array: T[], chave: keyof T): Record<string, T[]> {
  return array.reduce((grupos, item) => {
    const valor = String(item[chave]);
    if (!grupos[valor]) {
      grupos[valor] = [];
    }
    grupos[valor].push(item);
    return grupos;
  }, {} as Record<string, T[]>);
}
```

**utils/array.test.ts:**

```typescript
import { describe, it, expect } from 'vitest';
import { filtrarAtivos, agruparPor } from './array';

describe('filtrarAtivos', () => {
  it('deve retornar apenas itens ativos', () => {
    const usuarios = [
      { id: 1, nome: 'João', ativo: true },
      { id: 2, nome: 'Maria', ativo: false },
      { id: 3, nome: 'Pedro', ativo: true }
    ];
    
    const resultado = filtrarAtivos(usuarios);
    
    expect(resultado).toHaveLength(2);
    expect(resultado).toEqual([
      { id: 1, nome: 'João', ativo: true },
      { id: 3, nome: 'Pedro', ativo: true }
    ]);
  });
  
  it('deve retornar array vazio se nenhum ativo', () => {
    const usuarios = [
      { id: 1, nome: 'João', ativo: false }
    ];
    
    expect(filtrarAtivos(usuarios)).toEqual([]);
  });
});

describe('agruparPor', () => {
  it('deve agrupar por propriedade', () => {
    const produtos = [
      { nome: 'Notebook', categoria: 'eletronicos' },
      { nome: 'Livro', categoria: 'livros' },
      { nome: 'Mouse', categoria: 'eletronicos' }
    ];
    
    const resultado = agruparPor(produtos, 'categoria');
    
    expect(resultado).toEqual({
      eletronicos: [
        { nome: 'Notebook', categoria: 'eletronicos' },
        { nome: 'Mouse', categoria: 'eletronicos' }
      ],
      livros: [
        { nome: 'Livro', categoria: 'livros' }
      ]
    });
  });
});
```

---

## ⏱️ Testando Funções Assíncronas

**api/users.ts:**

```typescript
export async function buscarUsuario(id: number): Promise<{ id: number; nome: string }> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  
  if (!response.ok) {
    throw new Error('Usuário não encontrado');
  }
  
  const data = await response.json();
  return { id: data.id, nome: data.name };
}
```

**api/users.test.ts:**

```typescript
import { describe, it, expect, vi } from 'vitest';
import { buscarUsuario } from './users';

// Mock do fetch
global.fetch = vi.fn();

describe('buscarUsuario', () => {
  it('deve buscar usuário com sucesso', async () => {
    // Mock da resposta
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: 'João Silva' })
    });
    
    const usuario = await buscarUsuario(1);
    
    expect(usuario).toEqual({ id: 1, nome: 'João Silva' });
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
  });
  
  it('deve lançar erro quando usuário não existe', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false
    });
    
    await expect(buscarUsuario(999)).rejects.toThrow('Usuário não encontrado');
  });
});
```

---

## 🎭 Mocks, Spies e Stubs

### Mock de Funções

```typescript
import { describe, it, expect, vi } from 'vitest';

// Mock simples
const mockFuncao = vi.fn();

it('deve chamar função mockada', () => {
  mockFuncao('olá', 123);
  
  expect(mockFuncao).toHaveBeenCalled();
  expect(mockFuncao).toHaveBeenCalledWith('olá', 123);
  expect(mockFuncao).toHaveBeenCalledTimes(1);
});

// Mock com retorno
const somar = vi.fn((a: number, b: number) => a + b);

it('deve retornar valor mockado', () => {
  expect(somar(2, 3)).toBe(5);
  expect(somar).toHaveBeenCalledWith(2, 3);
});

// Mock com implementações diferentes
const mockCallback = vi.fn()
  .mockReturnValueOnce('primeira chamada')
  .mockReturnValueOnce('segunda chamada')
  .mockReturnValue('demais chamadas');

it('deve retornar valores diferentes', () => {
  expect(mockCallback()).toBe('primeira chamada');
  expect(mockCallback()).toBe('segunda chamada');
  expect(mockCallback()).toBe('demais chamadas');
  expect(mockCallback()).toBe('demais chamadas');
});
```

### Spy em Métodos

```typescript
import { describe, it, expect, vi } from 'vitest';

const calculator = {
  somar: (a: number, b: number) => a + b,
  multiplicar: (a: number, b: number) => a * b
};

it('deve espionar método', () => {
  const spy = vi.spyOn(calculator, 'somar');
  
  const resultado = calculator.somar(2, 3);
  
  expect(resultado).toBe(5);
  expect(spy).toHaveBeenCalledWith(2, 3);
  
  spy.mockRestore(); // Restaura implementação original
});
```

### Mock de Módulos

```typescript
// Mock de módulo inteiro
vi.mock('./api', () => ({
  buscarUsuarios: vi.fn(() => Promise.resolve([
    { id: 1, nome: 'João' }
  ]))
}));

import { buscarUsuarios } from './api';

it('deve usar módulo mockado', async () => {
  const usuarios = await buscarUsuarios();
  expect(usuarios).toHaveLength(1);
});
```

---

## 🏗️ Setup e Teardown

```typescript
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';

describe('Suite de testes', () => {
  let database: any;
  
  // Executado UMA VEZ antes de todos os testes
  beforeAll(() => {
    console.log('Conectando ao banco...');
    database = conectarBanco();
  });
  
  // Executado ANTES DE CADA teste
  beforeEach(() => {
    console.log('Limpando dados...');
    database.limpar();
  });
  
  // Executado DEPOIS DE CADA teste
  afterEach(() => {
    console.log('Teste concluído');
  });
  
  // Executado UMA VEZ depois de todos os testes
  afterAll(() => {
    console.log('Desconectando do banco...');
    database.desconectar();
  });
  
  it('teste 1', () => {
    // beforeEach executa aqui
    expect(true).toBe(true);
    // afterEach executa aqui
  });
  
  it('teste 2', () => {
    // beforeEach executa aqui
    expect(true).toBe(true);
    // afterEach executa aqui
  });
});
```

---

## 📊 Cobertura de Testes (Coverage)

```bash
# Jest
npm test -- --coverage

# Vitest
npm run test:coverage
```

**Relatório de cobertura:**

```text
-----------------|---------|----------|---------|---------|
File             | % Stmts | % Branch | % Funcs | % Lines |
-----------------|---------|----------|---------|---------|
All files        |   85.71 |    83.33 |     100 |   85.71 |
 utils/string.ts |   85.71 |    83.33 |     100 |   85.71 |
-----------------|---------|----------|---------|---------|
```

**Meta ideal:**
- ✅ **80-90%** de cobertura é excelente
- ⚠️ **100%** nem sempre é realista ou necessário
- 🎯 Foque em **código crítico** (lógica de negócio)

---

## 🎯 Boas Práticas

### ✅ Faça

```typescript
// 1. Testes isolados (não dependem uns dos outros)
it('teste 1', () => {
  const resultado = funcao();
  expect(resultado).toBe(esperado);
});

// 2. Arrange-Act-Assert
it('deve somar corretamente', () => {
  // Arrange
  const a = 2, b = 3;
  
  // Act
  const resultado = somar(a, b);
  
  // Assert
  expect(resultado).toBe(5);
});

// 3. Nome descritivo
it('deve retornar erro quando email é inválido', () => {});

// 4. Teste um comportamento por vez
it('deve validar email', () => {
  expect(validarEmail('valido@email.com')).toBe(true);
});

it('deve rejeitar email sem @', () => {
  expect(validarEmail('invalido')).toBe(false);
});
```

### ❌ Evite

```typescript
// 1. Testes dependentes
let resultado: any;

it('teste 1', () => {
  resultado = funcao();
});

it('teste 2', () => {
  expect(resultado).toBe(5); // ❌ Depende do teste 1!
});

// 2. Testar implementação, não comportamento
it('deve chamar forEach', () => {
  // ❌ Teste de implementação
  const spy = vi.spyOn(array, 'forEach');
  funcao();
  expect(spy).toHaveBeenCalled();
});

// 3. Nomes vagos
it('testa função', () => {}); // ❌ Muito vago!
```

---

## 📚 Recursos Adicionais

- **Jest:** <https://jestjs.io/>
- **Vitest:** <https://vitest.dev/>
- **Testing Library:** <https://testing-library.com/>

---

## 🚀 Executando Testes

```bash
# Jest
npm test                    # Executar todos os testes
npm test -- --watch         # Watch mode
npm test -- --coverage      # Com cobertura
npm test -- string.test     # Apenas arquivo específico

# Vitest
npm test                    # Executar todos
npm test -- --watch         # Watch mode (padrão)
npm test -- --ui            # Interface web
npm test -- --coverage      # Cobertura
npm test string             # Arquivo específico
```

**Teste seu código para garantir qualidade e confiança! 🧪✨**
