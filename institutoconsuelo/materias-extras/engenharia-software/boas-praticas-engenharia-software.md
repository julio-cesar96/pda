# 🏗️ Boas Práticas de Engenharia de Software

> *"Qualquer tolo pode escrever código que um computador entenda. Bons programadores escrevem código que humanos entendam." - Martin Fowler*

---

## 🎯 Índice

1. **Clean Code** - Código Limpo
2. **SOLID** - Princípios de Design
3. **Design Patterns** - Padrões de Projeto
4. **Early Return** - Retorno Antecipado
5. **Edge Cases** - Casos Extremos
6. **DRY, KISS, YAGNI** - Princípios Gerais

---

## 🧹 Clean Code - Código Limpo

### Nomes Significativos

```javascript
// ❌ RUIM: Nomes vagos
let d; // data?
let arr; // array de quê?
function calc(x, y) { return x + y; } // calcular o quê?

// ✅ BOM: Nomes descritivos
let dataDeNascimento;
let usuariosAtivos;
function calcularPrecoTotal(preco, quantidade) {
  return preco * quantidade;
}
```

### Funções Pequenas e Focadas

```javascript
// ❌ RUIM: Função faz muitas coisas
function processarPedido(pedido) {
  // Validar pedido
  if (!pedido.itens || pedido.itens.length === 0) {
    throw new Error('Pedido vazio');
  }
  
  // Calcular total
  let total = 0;
  for (const item of pedido.itens) {
    total += item.preco * item.quantidade;
  }
  
  // Aplicar desconto
  if (pedido.cupom) {
    total *= 0.9;
  }
  
  // Salvar no banco
  database.save(pedido);
  
  // Enviar email
  emailService.send(pedido.usuario.email, 'Pedido confirmado');
  
  return total;
}

// ✅ BOM: Funções pequenas e focadas
function processarPedido(pedido) {
  validarPedido(pedido);
  const total = calcularTotal(pedido);
  salvarPedido(pedido);
  enviarConfirmacao(pedido);
  return total;
}

function validarPedido(pedido) {
  if (!pedido.itens || pedido.itens.length === 0) {
    throw new Error('Pedido vazio');
  }
}

function calcularTotal(pedido) {
  const subtotal = pedido.itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );
  return aplicarDesconto(subtotal, pedido.cupom);
}

function aplicarDesconto(valor, cupom) {
  return cupom ? valor * 0.9 : valor;
}

function salvarPedido(pedido) {
  database.save(pedido);
}

function enviarConfirmacao(pedido) {
  emailService.send(pedido.usuario.email, 'Pedido confirmado');
}
```

### Evite Comentários Óbvios

```javascript
// ❌ RUIM: Comentários desnecessários
// Incrementa i
i++;

// Loop pelos usuários
for (const usuario of usuarios) {
  // Imprime nome do usuário
  console.log(usuario.nome);
}

// ✅ BOM: Código auto-explicativo
usuarios.forEach(usuario => console.log(usuario.nome));

// ✅ BOM: Comentários para lógica complexa
// Algoritmo de Luhn para validar cartão de crédito
function validarCartao(numero) {
  // Implementação...
}
```

### Evite Magic Numbers

```javascript
// ❌ RUIM: Números mágicos
if (usuario.idade >= 18) {
  permitirAcesso();
}

setTimeout(() => {
  console.log('Timeout');
}, 86400000); // ???

// ✅ BOM: Constantes nomeadas
const IDADE_MINIMA = 18;
const UM_DIA_EM_MS = 24 * 60 * 60 * 1000;

if (usuario.idade >= IDADE_MINIMA) {
  permitirAcesso();
}

setTimeout(() => {
  console.log('Timeout');
}, UM_DIA_EM_MS);
```

---

## 🏛️ SOLID - Princípios de Design

### S - Single Responsibility Principle (Responsabilidade Única)

**Uma classe/função deve ter apenas uma razão para mudar.**

```javascript
// ❌ RUIM: Classe faz muitas coisas
class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
  
  salvar() {
    database.save(this); // Persistência
  }
  
  enviarEmail(mensagem) {
    emailService.send(this.email, mensagem); // Email
  }
  
  validar() {
    return this.email.includes('@'); // Validação
  }
}

// ✅ BOM: Cada classe uma responsabilidade
class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
}

class UsuarioRepository {
  salvar(usuario) {
    database.save(usuario);
  }
}

class EmailService {
  enviar(destinatario, mensagem) {
    emailService.send(destinatario, mensagem);
  }
}

class UsuarioValidator {
  validar(usuario) {
    return usuario.email.includes('@');
  }
}
```

### O - Open/Closed Principle (Aberto/Fechado)

**Aberto para extensão, fechado para modificação.**

```javascript
// ❌ RUIM: Precisa modificar classe para adicionar desconto
class CalculadoraDePreco {
  calcular(pedido) {
    let total = pedido.subtotal;
    
    if (pedido.tipo === 'vip') {
      total *= 0.9;
    } else if (pedido.tipo === 'estudante') {
      total *= 0.85;
    }
    // E se adicionar novo tipo? Modifica classe!
    
    return total;
  }
}

// ✅ BOM: Extensível sem modificar
class CalculadoraDePreco {
  constructor(estrategiaDesconto) {
    this.estrategiaDesconto = estrategiaDesconto;
  }
  
  calcular(pedido) {
    return this.estrategiaDesconto.aplicar(pedido.subtotal);
  }
}

class DescontoVIP {
  aplicar(valor) {
    return valor * 0.9;
  }
}

class DescontoEstudante {
  aplicar(valor) {
    return valor * 0.85;
  }
}

class SemDesconto {
  aplicar(valor) {
    return valor;
  }
}

// Uso:
const calculadoraVIP = new CalculadoraDePreco(new DescontoVIP());
const total = calculadoraVIP.calcular(pedido);
```

### L - Liskov Substitution Principle (Substituição de Liskov)

**Subclasses devem ser substituíveis por suas superclasses.**

```javascript
// ❌ RUIM: Pinguim não pode voar!
class Ave {
  voar() {
    console.log('Voando...');
  }
}

class Pinguim extends Ave {
  voar() {
    throw new Error('Pinguins não voam!'); // Quebra substituição
  }
}

// ✅ BOM: Hierarquia correta
class Ave {
  mover() {
    console.log('Movendo...');
  }
}

class AveVoadora extends Ave {
  voar() {
    console.log('Voando...');
  }
}

class Pardal extends AveVoadora {}

class Pinguim extends Ave {
  nadar() {
    console.log('Nadando...');
  }
}
```

### I - Interface Segregation Principle (Segregação de Interface)

**Não force classes a implementar métodos que não usam.**

```javascript
// ❌ RUIM: Interface "gorda"
class Trabalhador {
  trabalhar() {}
  comer() {}
  dormir() {}
  programar() {} // Nem todo trabalhador programa!
}

class Desenvolvedor extends Trabalhador {
  programar() {
    console.log('Programando...');
  }
}

class Gerente extends Trabalhador {
  programar() {
    throw new Error('Gerente não programa'); // Forçado a implementar
  }
}

// ✅ BOM: Interfaces segregadas
class Trabalhador {
  trabalhar() {}
}

class Programador {
  programar() {}
}

class Desenvolvedor extends Trabalhador {
  programar() {
    console.log('Programando...');
  }
}

class Gerente extends Trabalhador {
  gerenciar() {
    console.log('Gerenciando...');
  }
}
```

### D - Dependency Inversion Principle (Inversão de Dependência)

**Dependa de abstrações, não de implementações concretas.**

```javascript
// ❌ RUIM: Dependência direta
class Usuario {
  constructor(nome) {
    this.nome = nome;
    this.db = new MySQLDatabase(); // Acoplado ao MySQL!
  }
  
  salvar() {
    this.db.save(this);
  }
}

// ✅ BOM: Inversão de dependência (injeção de dependência)
class Usuario {
  constructor(nome, database) {
    this.nome = nome;
    this.database = database; // Abstração
  }
  
  salvar() {
    this.database.save(this);
  }
}

// Implementações
class MySQLDatabase {
  save(data) {
    console.log('Salvando no MySQL:', data);
  }
}

class MongoDatabase {
  save(data) {
    console.log('Salvando no MongoDB:', data);
  }
}

// Uso (injeção de dependência)
const usuario1 = new Usuario('Alice', new MySQLDatabase());
const usuario2 = new Usuario('Bob', new MongoDatabase());
```

---

## 🎨 Design Patterns (Padrões de Projeto)

### 1. Singleton (Instância Única)

```javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connection = this.connect();
    Database.instance = this;
  }
  
  connect() {
    console.log('Conectando ao banco...');
    return 'conexão';
  }
}

// Uso
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true (mesma instância)
```

### 2. Factory (Fábrica)

```javascript
class Carro {
  constructor(modelo) {
    this.modelo = modelo;
    this.tipo = 'carro';
  }
}

class Moto {
  constructor(modelo) {
    this.modelo = modelo;
    this.tipo = 'moto';
  }
}

class VeiculoFactory {
  static criar(tipo, modelo) {
    switch (tipo) {
      case 'carro':
        return new Carro(modelo);
      case 'moto':
        return new Moto(modelo);
      default:
        throw new Error('Tipo inválido');
    }
  }
}

// Uso
const veiculo1 = VeiculoFactory.criar('carro', 'Civic');
const veiculo2 = VeiculoFactory.criar('moto', 'CB500');
```

### 3. Observer (Observador)

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(nome) {
    this.nome = nome;
  }
  
  update(data) {
    console.log(`${this.nome} recebeu:`, data);
  }
}

// Uso
const canal = new Subject();
const inscrito1 = new Observer('Alice');
const inscrito2 = new Observer('Bob');

canal.subscribe(inscrito1);
canal.subscribe(inscrito2);

canal.notify('Novo vídeo!');
// Alice recebeu: Novo vídeo!
// Bob recebeu: Novo vídeo!
```

### 4. Strategy (Estratégia)

```javascript
// Já vimos no Open/Closed Principle!
class Pagamento {
  constructor(estrategia) {
    this.estrategia = estrategia;
  }
  
  pagar(valor) {
    return this.estrategia.processar(valor);
  }
}

class PagamentoCartao {
  processar(valor) {
    console.log(`Pagando ${valor} com cartão`);
  }
}

class PagamentoPix {
  processar(valor) {
    console.log(`Pagando ${valor} com Pix`);
  }
}

// Uso
const pagamento1 = new Pagamento(new PagamentoCartao());
pagamento1.pagar(100);

const pagamento2 = new Pagamento(new PagamentoPix());
pagamento2.pagar(50);
```

### 5. Module Pattern (Padrão de Módulo)

```javascript
const Contador = (function() {
  // Privado
  let count = 0;
  
  // Público
  return {
    incrementar() {
      count++;
    },
    
    decrementar() {
      count--;
    },
    
    obterValor() {
      return count;
    }
  };
})();

// Uso
Contador.incrementar();
Contador.incrementar();
console.log(Contador.obterValor()); // 2
console.log(Contador.count); // undefined (privado)
```

---

## ⏎ Early Return (Retorno Antecipado)

### Reduzir Aninhamento

```javascript
// ❌ RUIM: Aninhamento profundo
function processarUsuario(usuario) {
  if (usuario) {
    if (usuario.ativo) {
      if (usuario.email) {
        if (usuario.email.includes('@')) {
          // Código útil aqui
          console.log('Processando:', usuario.email);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// ✅ BOM: Early return
function processarUsuario(usuario) {
  if (!usuario) return false;
  if (!usuario.ativo) return false;
  if (!usuario.email) return false;
  if (!usuario.email.includes('@')) return false;
  
  // Código útil aqui (sem aninhamento!)
  console.log('Processando:', usuario.email);
  return true;
}
```

### Guard Clauses

```javascript
// ❌ RUIM
function calcularDesconto(usuario, valor) {
  if (usuario && valor > 0) {
    if (usuario.tipo === 'vip') {
      return valor * 0.2;
    } else if (usuario.tipo === 'premium') {
      return valor * 0.1;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

// ✅ BOM: Guard clauses
function calcularDesconto(usuario, valor) {
  // Guards (validações no início)
  if (!usuario) return 0;
  if (valor <= 0) return 0;
  
  // Lógica principal
  if (usuario.tipo === 'vip') return valor * 0.2;
  if (usuario.tipo === 'premium') return valor * 0.1;
  
  return 0;
}
```

---

## 🎯 Edge Cases (Casos Extremos)

### Sempre Considere

```javascript
// ✅ Validação completa
function dividir(a, b) {
  // Edge case: divisão por zero
  if (b === 0) {
    throw new Error('Divisão por zero');
  }
  
  // Edge case: valores não numéricos
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Valores devem ser números');
  }
  
  // Edge case: NaN
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Valores não podem ser NaN');
  }
  
  return a / b;
}
```

### Casos Comuns a Considerar

```javascript
function processarLista(lista) {
  // Edge case: null/undefined
  if (!lista) {
    throw new Error('Lista não pode ser null/undefined');
  }
  
  // Edge case: não é array
  if (!Array.isArray(lista)) {
    throw new Error('Deve ser um array');
  }
  
  // Edge case: array vazio
  if (lista.length === 0) {
    return [];
  }
  
  // Edge case: valores null dentro do array
  const listaFiltrada = lista.filter(item => item !== null && item !== undefined);
  
  // Processar...
  return listaFiltrada.map(item => item * 2);
}
```

### Testes de Edge Cases

```javascript
// Exemplo com Jest
describe('dividir', () => {
  it('deve dividir números normais', () => {
    expect(dividir(10, 2)).toBe(5);
  });
  
  it('deve lançar erro ao dividir por zero', () => {
    expect(() => dividir(10, 0)).toThrow('Divisão por zero');
  });
  
  it('deve lançar erro com valores não numéricos', () => {
    expect(() => dividir('10', 2)).toThrow('Valores devem ser números');
  });
  
  it('deve lançar erro com NaN', () => {
    expect(() => dividir(NaN, 2)).toThrow('Valores não podem ser NaN');
  });
  
  it('deve funcionar com números negativos', () => {
    expect(dividir(-10, 2)).toBe(-5);
  });
  
  it('deve funcionar com decimais', () => {
    expect(dividir(10.5, 2)).toBe(5.25);
  });
});
```

---

## 📝 DRY, KISS, YAGNI

### DRY - Don't Repeat Yourself (Não se Repita)

```javascript
// ❌ RUIM: Código duplicado
function calcularPrecoLivro(preco, quantidade) {
  const subtotal = preco * quantidade;
  const imposto = subtotal * 0.1;
  const total = subtotal + imposto;
  return total;
}

function calcularPrecoEletrônico(preco, quantidade) {
  const subtotal = preco * quantidade;
  const imposto = subtotal * 0.1;
  const total = subtotal + imposto;
  return total;
}

// ✅ BOM: Reutilizar código
function calcularPreco(preco, quantidade, taxaImposto = 0.1) {
  const subtotal = preco * quantidade;
  const imposto = subtotal * taxaImposto;
  return subtotal + imposto;
}

const precoLivro = calcularPreco(50, 2);
const precoEletrônico = calcularPreco(100, 1);
```

### KISS - Keep It Simple, Stupid (Mantenha Simples)

```javascript
// ❌ RUIM: Complexo demais
function isPar(numero) {
  return numero % 2 === 0 ? true : false;
}

// ✅ BOM: Simples
function isPar(numero) {
  return numero % 2 === 0;
}

// ❌ RUIM: Over-engineering
class SomadorDeNumeros {
  constructor() {
    this.resultado = 0;
  }
  
  somar(a, b) {
    this.resultado = a + b;
    return this.resultado;
  }
}

// ✅ BOM: Simples
function somar(a, b) {
  return a + b;
}
```

### YAGNI - You Aren't Gonna Need It (Você Não Vai Precisar Disso)

```javascript
// ❌ RUIM: Código para "possível" uso futuro
class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
    this.telefone = null; // Não usado agora
    this.endereco = null; // Não usado agora
    this.dataNascimento = null; // Não usado agora
    this.cpf = null; // Não usado agora
  }
  
  // Métodos complexos que não são usados
  calcularIdade() { /* ... */ }
  validarCPF() { /* ... */ }
}

// ✅ BOM: Apenas o necessário agora
class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
}

// Adicione outras propriedades/métodos QUANDO realmente precisar!
```

---

## 🎯 Resumo de Boas Práticas

```javascript
// ✅ Checklist
const boasPraticas = {
  cleanCode: {
    nomesSignificativos: true,
    funçõesPequenas: true,
    evitarComentáriosDesnecessários: true,
    evitarMagicNumbers: true
  },
  
  solid: {
    singleResponsibility: true,
    openClosed: true,
    liskovSubstitution: true,
    interfaceSegregation: true,
    dependencyInversion: true
  },
  
  designPatterns: {
    conhecerOsClássicos: true,
    usarQuandoApropriadoç: true,
    nãoOverEngineer: true
  },
  
  earlyReturn: {
    reduzirAninhamento: true,
    guardClauses: true
  },
  
  edgeCases: {
    validarInputs: true,
    testarCasosExtremos: true,
    tratarErros: true
  },
  
  princípios: {
    DRY: true,  // Don't Repeat Yourself
    KISS: true, // Keep It Simple
    YAGNI: true // You Aren't Gonna Need It
  }
};
```

---

## 📚 Recursos Adicionais

- **Clean Code (livro):** Robert C. Martin
- **Refactoring (livro):** Martin Fowler
- **Design Patterns (livro):** Gang of Four
- **JavaScript Patterns:** <https://www.patterns.dev/>
- **Refactoring Guru:** <https://refactoring.guru/>

---

**Escreva código que você terá orgulho de revisar daqui a 6 meses! 🏗️✨**
