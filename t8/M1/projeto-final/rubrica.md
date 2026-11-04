# Projeto Final

### MercadoÁgil: Microsserviço de Pedidos 🛒

**Módulo 1 · Back-end com JavaScript e Node.js**

---

## 📑 Sumário

- [Projeto Final](#projeto-final)
    - [MercadoÁgil: Microsserviço de Pedidos 🛒](#mercadoágil-microsserviço-de-pedidos-)
  - [📑 Sumário](#-sumário)
  - [🎯 Descrição](#-descrição)
    - [O que é um microsserviço?](#o-que-é-um-microsserviço)
    - [O que este projeto treina](#o-que-este-projeto-treina)
  - [🛒 O cenário: MercadoÁgil](#-o-cenário-mercadoágil)
  - [📋 Requisitos](#-requisitos)
    - [Formato do Projeto: Trabalho em SQUAD](#formato-do-projeto-trabalho-em-squad)
    - [Requisitos Funcionais Mínimos](#requisitos-funcionais-mínimos)
      - [1. Modelagem com Classes](#1-modelagem-com-classes)
      - [2. Operações de Gerenciamento (CRUD Básico)](#2-operações-de-gerenciamento-crud-básico)
      - [3. Resposta do serviço](#3-resposta-do-serviço)
      - [4. Regras de Negócio do Pedido](#4-regras-de-negócio-do-pedido)
      - [5. Relatórios Financeiros](#5-relatórios-financeiros)
    - [Requisitos Técnicos Obrigatórios](#requisitos-técnicos-obrigatórios)
    - [Estrutura de Pastas Sugerida](#estrutura-de-pastas-sugerida)
  - [🎤 Apresentação](#-apresentação)
  - [🧰 Utilitários](#-utilitários)
  - [📊 Rubrica](#-rubrica)
    - [Legenda](#legenda)
    - [Tabela de Avaliação](#tabela-de-avaliação)
  - [❌ Critérios Eliminatórios](#-critérios-eliminatórios)
  - [💡 Dicas para não travar](#-dicas-para-não-travar)
  - [📦 Entrega](#-entrega)

---

## 🎯 Descrição

Este é o **projeto final do Módulo 1**. O objetivo é juntar tudo o que vocês aprenderam sobre back-end com JavaScript em um único sistema, que roda no terminal com Node.js.

O projeto será desenvolvido em **SQUAD**, simulando um time de verdade: vocês vão dividir tarefas, conversar sobre decisões, revisar o código uns dos outros e versionar tudo com Git e GitHub.

Desta vez **o tema é o mesmo para todos os SQUADs**: o **serviço de pedidos do MercadoÁgil**, um marketplace. O que muda de um SQUAD para outro é **como** cada time resolve as regras de negócio, organiza o código e cuida de quem vai usar o sistema.

### O que é um microsserviço?

Um marketplace (pense em Mercado Livre ou Shopee) é um sistema enorme, e ninguém consegue construir tudo num arquivo só. Por isso ele é dividido em **programas pequenos, cada um cuidando de uma parte**: um para cadastro, um para pagamento, um para entrega. Cada um desses programas é um **microsserviço**.

O SQUAD de vocês constrói o **serviço de pedidos**. Ele recebe o "quero comprar isso", confere o estoque, aplica os cupons, calcula frete e comissão, e **responde com o resultado**. Neste módulo, o serviço roda no terminal: o menu faz o papel do app ou do site que, no mundo real, chamaria o serviço.

### O que este projeto treina

| O que vimos no módulo | Onde aparece no projeto |
| --- | --- |
| Git e GitHub no fluxo de versionamento | Repositório único do SQUAD, com commits de todos |
| Métodos funcionais de array | Carrinho, estoque e relatórios com `map`, `filter` e `reduce` |
| Arrays de objetos, destructuring, spread e rest | Itens do pedido, cópias sem estragar o original, CPF fora da resposta |
| Aplicação Node.js com ES6+ e módulos | Projeto dividido em arquivos com `import` e `export` |
| Validação de dados com Zod | Cadastro de clientes, vendedores, produtos e cupons |
| Classes e classe principal que orquestra as regras | `Cliente`, `Vendedor`, `Produto`, `Estoque`, `CupomDesconto`, `Pedido` e `Marketplace` |
| Integração com uma API de IA | Funcionalidade extra (opcional) |

Além do código, o projeto treina a **Mentalidade High Agency**: **Clear Thinking** para quebrar um problema grande em regras pequenas e testáveis, **Bias to Action** para rodar o código cedo e corrigir cedo, e **Disagreeability** para propor e defender, com argumentos, a melhor solução dentro do SQUAD.

> **E daí?** Marketplaces perdem dinheiro quando um cupom é aplicado errado, quando vendem o que o vendedor não tem em estoque e quando repassam o valor errado para quem vendeu. E são punidos pela LGPD quando expõem o CPF do cliente. Cada regra deste projeto existe porque alguma empresa já teve esse problema.

## 🛒 O cenário: MercadoÁgil

O MercadoÁgil é um marketplace novo, onde **vários vendedores** anunciam produtos e **vários clientes** compram. Uma mesma compra pode ter itens de vendedores diferentes. Por enquanto, a equipe registra os pedidos numa planilha, e os problemas se repetem toda semana:

- cupons aplicados errado: dois cupons que não podiam ser somados, cupom vencido aceito;
- pedidos confirmados com produto que **não tinha mais no estoque**;
- frete calculado "no olho", cada atendente de um jeito;
- o repasse para os vendedores é feito na mão, e às vezes o valor está errado;
- ninguém sabe dizer quanto o marketplace faturou, nem qual categoria vende mais;
- o CPF dos clientes aparece em qualquer tela.

O SQUAD de vocês foi contratado para construir o serviço de pedidos que acaba com esses problemas.

## 📋 Requisitos

### Formato do Projeto: Trabalho em SQUAD

O projeto final **deve ser realizado em SQUADs** (grupos) definidos pelo professor. O objetivo é praticar não apenas as habilidades técnicas, mas também a colaboração, o versionamento de código em equipe com Git e GitHub e a gestão de um projeto conjunto.

### Requisitos Funcionais Mínimos

#### 1. Modelagem com Classes

O sistema deve ter, no mínimo, estas classes:

| Classe | Responsabilidade |
| --- | --- |
| `Cliente` | Nome, e-mail, CPF e região de entrega. |
| `Vendedor` | Nome da loja, CNPJ e e-mail. É dono dos produtos que anuncia. |
| `Produto` | Id, nome, preço, categoria e o vendedor que o anuncia. |
| `Estoque` | Guarda a quantidade de cada produto. Verifica, dá baixa e devolve. |
| `CupomDesconto` | Código, tipo, valor, validade, valor mínimo e se é cumulativo. Sabe dizer se está válido. |
| `Pedido` | **Orquestra as regras de negócio do pedido**: itens, cupons, frete, tributos, total, comissão e status. |
| `Marketplace` | **Classe principal do serviço**: guarda as listas, faz os cadastros, cria pedidos e gera relatórios. O menu só conversa com ela. |

#### 2. Operações de Gerenciamento (CRUD Básico)

Para **Clientes**, **Vendedores**, **Produtos** e **Cupons**:

- **Cadastrar:** adicionar um novo item, com validação dos dados.
- **Listar:** exibir todos os itens cadastrados.
- **Buscar:** encontrar um item específico (cliente por CPF ou nome, vendedor por CNPJ ou nome, produto por id ou nome, cupom por código).
- **Excluir:** remover um item específico.

Para **Pedidos**: criar um pedido para um cliente, adicionar e remover itens, aplicar cupons, ver o resumo, **confirmar**, **cancelar** e listar os pedidos.

#### 3. Resposta do serviço

Um microsserviço **sempre responde**, mesmo quando algo dá errado. Por isso, os métodos públicos da classe `Marketplace` devolvem um objeto com o resultado, em vez de deixar o programa quebrar:

```js
// deu certo
{ ok: true, dados: { id: 7, total: 193 } }

// deu errado: explica o que aconteceu
{ ok: false, erros: ['Estoque insuficiente: Mouse (pedido 3, disponível 1)'] }
```

O menu só **lê** essa resposta e mostra na tela. Quem decide é o serviço.

#### 4. Regras de Negócio do Pedido

É aqui que a classe `Pedido` trabalha. As regras abaixo são **obrigatórias** e precisam funcionar exatamente como descritas.

**Estoque: tudo ou nada**

- Ao confirmar, o pedido verifica **todos os itens de uma vez** no estoque.
- Se faltar qualquer item, **nada é confirmado e nada sai do estoque**. A mensagem lista **todos** os itens que faltaram, não só o primeiro.
- Pedido confirmado dá baixa no estoque. Pedido confirmado e depois cancelado **devolve** os itens ao estoque.
- O pedido só aceita mudanças (itens e cupons) enquanto o status for `aberto`. Os status possíveis são `aberto`, `confirmado` e `cancelado`.

**Cupons cumulativos**

O cupom é do **marketplace** (não do vendedor) e vale para o pedido inteiro.

| Tipo | O que faz | Exemplo |
| --- | --- | --- |
| `percentual` | Tira uma porcentagem do valor | `BEMVINDO10`: 10% de desconto |
| `fixo` | Tira um valor em reais | `PDA15`: R$ 15,00 de desconto |
| `frete` | Zera o frete | `FRETEZERO` |

1. Cupom **vencido** é recusado, mesmo que estivesse válido quando foi cadastrado.
2. O subtotal do pedido precisa atingir o **valor mínimo** do cupom.
3. No máximo **2 cupons** por pedido, e o mesmo cupom não pode entrar duas vezes.
4. Cupom marcado como **não cumulativo** só pode ser usado sozinho.
5. **Ordem de aplicação:** primeiro os percentuais, depois os fixos, por último o de frete.
6. **Teto de desconto:** a soma dos descontos nunca passa de **30% do subtotal**, e o total nunca fica negativo.

**Frete dinâmico**

O frete é calculado assim: **taxa da região + R$ 1,50 por unidade** de produto no pedido. Ele é **um só por pedido**, mesmo que os itens sejam de vendedores diferentes.

| Região | Norte | Nordeste | Centro-Oeste | Sudeste | Sul |
| --- | --- | --- | --- | --- | --- |
| Taxa | R$ 35,00 | R$ 25,00 | R$ 30,00 | R$ 20,00 | R$ 22,00 |

O frete é **grátis** quando o valor, já com os descontos, for de **R$ 300,00 ou mais**, ou quando o pedido usar um cupom do tipo `frete`.

**Tributos aproximados por categoria**

Pela Lei da Transparência Fiscal (Lei 12.741/2012), toda nota mostra o **valor aproximado dos tributos**. No nosso sistema esse valor é **informativo**: ele aparece no resumo do pedido, mas **não soma no total**. É calculado sobre o valor dos itens, antes dos descontos.

| Categoria | `eletronicos` | `livros` | `alimentos` | `vestuario` | `casa` |
| --- | --- | --- | --- | --- | --- |
| Alíquota (fictícia) | 12% | 0% | 5% | 8% | 10% |

**Comissão do marketplace e repasse ao vendedor**

O MercadoÁgil fica com uma **comissão** sobre cada item vendido, e o resto é **repassado ao vendedor**. A comissão é calculada sobre o **valor dos itens, antes dos descontos**: cupom e frete são custo do marketplace e **não diminuem o repasse**.

| Categoria | `eletronicos` | `livros` | `alimentos` | `vestuario` | `casa` |
| --- | --- | --- | --- | --- | --- |
| Comissão (fictícia) | 8% | 15% | 10% | 12% | 10% |

**Repasse do vendedor = soma dos itens dele − comissão desses itens.** Só pedidos **confirmados** geram repasse.

**Exemplo completo de um pedido**

A cliente mora no **Nordeste** e comprou 1 Mouse (eletrônicos, R$ 120,00, vendedor **TechBahia**) e 1 Livro de JavaScript (livros, R$ 80,00, vendedor **Livraria Sol**), usando os cupons `BEMVINDO10` e `PDA15`.

```
Subtotal                              R$ 200,00
(-) BEMVINDO10: 10% de R$ 200,00    - R$  20,00
(-) PDA15: desconto fixo            - R$  15,00
(+) Frete: R$ 25,00 + 2 x R$ 1,50   + R$  28,00
TOTAL                                 R$ 193,00

Desconto total: R$ 35,00 (dentro do teto de 30% = R$ 60,00)
Tributos aproximados: 12% x 120,00 + 0% x 80,00 = R$ 14,40

Repasse:
TechBahia     R$ 120,00 - comissão 8% (R$ 9,60)   = R$ 110,40
Livraria Sol  R$  80,00 - comissão 15% (R$ 12,00) = R$  68,00
Comissão total do marketplace: R$ 21,60
```

> Usem este exemplo como **teste**: cadastrem esses dados no sistema de vocês. Se o resultado for diferente, tem alguma regra errada.

#### 5. Relatórios Financeiros

Considerando **somente pedidos confirmados**, o sistema deve mostrar:

- **faturamento total** (soma do que os clientes pagaram) e **quantidade de pedidos**;
- **ticket médio** (faturamento dividido pela quantidade de pedidos);
- **faturamento por categoria** (valor dos itens antes dos descontos);
- **repasse por vendedor**: valor bruto, comissão e valor a repassar;
- **top 3 produtos mais vendidos** (por quantidade).

### Requisitos Técnicos Obrigatórios

- **Linguagem:** JavaScript puro, executado com Node.js. O `package.json` deve ter `"type": "module"`.
- **Paradigma:** o projeto deve ser estruturado com **Classes** e os princípios da Programação Orientada a Objetos.
- **Organização:** o código deve ser dividido em **módulos** (arquivos separados), com `import` e `export`.
- **Validação de Dados com Zod:** schemas para `Cliente`, `Vendedor`, `Produto` e `CupomDesconto`, com pelo menos **três `.refine()`**: formato do CPF, formato do CNPJ e validade do cupom em data futura. Usem `safeParse` e devolvam a mensagem no formato de resposta do serviço: **o programa nunca pode fechar por causa de um dado inválido**.
- **Métodos de array:** as listas devem ser processadas com `map`, `filter`, `find`, `findIndex` e `reduce`. Sem `for` e `while` para processar dados (o laço que mantém o menu aberto pode usar `while`).
- **Destructuring, spread e rest na lógica de negócio:** spread para criar listas e objetos novos sem estragar o original, e rest para **tirar o CPF** antes de devolver os dados do cliente (LGPD).
- **Interface:** menu interativo no terminal (CLI), com `node:readline/promises` ou uma biblioteca como `prompt-sync`.
- **Dados de exemplo:** os dados ficam em memória. Ao iniciar, o sistema carrega um arquivo `seed.js` com pelo menos 3 clientes, 3 vendedores, 8 produtos de 3 categorias diferentes e 3 cupons com validade futura.
- **Versionamento:** projeto versionado com Git em **um único repositório no GitHub para o SQUAD**, onde **todos os membros devem realizar commits**. O `.gitignore` deve ignorar `node_modules` e `.env`.

### Estrutura de Pastas Sugerida

```
mercadoagil/
├── src/
│   ├── models/        # uma classe por arquivo: Cliente.js, Pedido.js...
│   ├── schemas/       # schemas do Zod: clienteSchema.js...
│   ├── services/      # Marketplace.js (classe principal), relatorios.js
│   ├── config/        # regras.js: frete, alíquotas, comissões, teto
│   ├── data/          # seed.js (dados de exemplo)
│   └── cli/           # menu.js (só lê do teclado e mostra na tela)
├── index.js
├── package.json
├── .gitignore
└── README.md
```

## 🎤 Apresentação

- Desenvolvam uma apresentação em SQUAD sobre o projeto:
    - apresentem o problema do MercadoÁgil e a solução que construíram;
    - mostrem a estrutura do código e as decisões de design;
    - demonstrem o sistema funcionando com **um pedido completo**: cupons, frete, estoque, comissão e relatório de repasse;
    - **a apresentação é responsabilidade de todo o SQUAD, e todos os membros devem participar ativamente.**
- Publiquem a apresentação no **LinkedIn** (pode ser um post por membro, ou um post principal com todos marcados).
- O projeto finalizado deve ser entregue pelo **link do repositório do GitHub do SQUAD**.

## 🧰 Utilitários

- **Programação Orientada a Objetos (POO):** `class`, `constructor`, `this` e métodos para modelar as entidades. Campos privados (`#estoque`) ajudam a proteger o que só pode mudar por um método.
- **Módulos (ES Modules):** `import` e `export` para separar as responsabilidades em arquivos.
- **Zod:** `z.object`, `z.string().email()`, `z.enum`, `z.number().positive()`, `z.coerce.date()`, `.refine()` e `safeParse`.
- **Arrays e seus métodos:** `push`, `find`, `findIndex`, `filter`, `map`, `some`, `every`, `reduce` e `sort`.
- **Destructuring, spread e rest:** `const { cpf, ...clienteSeguro } = cliente` é o mesmo truque da aula, agora protegendo a LGPD num sistema inteiro.

Exemplo de schema com `.refine()`, para servir de ponto de partida:

```js
import { z } from 'zod';

export const cupomSchema = z.object({
  codigo: z.string()
    .min(3, 'O código precisa ter pelo menos 3 letras.')
    .toUpperCase(),
  tipo: z.enum(['percentual', 'fixo', 'frete']),
  valor: z.number().nonnegative(),
  validade: z.coerce.date().refine((data) => data > new Date(), {
    message: 'A validade do cupom precisa ser uma data futura.',
  }),
});
```

---

## 📊 Rubrica

A rubrica é o arquivo utilizado para correção. Dentro dela estão todos os critérios de correção.

### Legenda

| Cor | Significado |
| --- | --- |
| 🔴 **Vermelho** | Critérios negativos. Os critérios **🔴 em negrito** são **eliminatórios e podem zerar a nota das demais tecnologias.** |
| 🟡 **Amarelo** | Critérios neutros (o esperado). |
| 🟢 **Verde** | Critérios positivos (excelência). |
| 🔵 **Azul** | Critérios extras e opcionais. |

### Tabela de Avaliação

| Tecnologia | 🔴 Faltou algo | 🟡 Tudo OK | 🟢 Majestoso |
| --- | --- | --- | --- |
| **Problematização** | • 🔴 **O SQUAD ignorou o cenário do MercadoÁgil ou construiu um sistema diferente do pedido.** | • O sistema resolve os problemas do cenário: **estoque, cupons, frete, tributos, repasse e relatórios** funcionam conforme o descritivo. | • Resolve todos os problemas do cenário e o SQUAD **explica o impacto** de cada regra para o marketplace, o vendedor e o cliente.<br>• 🔵 Identificou um problema real a mais do marketplace e o resolveu (ex.: alerta de estoque baixo, histórico de pedidos por cliente). |
| **Funcionalidades** | • 🔴 **O programa não executa ou fecha com erro durante o uso normal.**<br>• 🔴 **Não implementa o CRUD mínimo (cadastrar, listar, buscar e excluir) ou a confirmação de pedido.** | • CRUD completo de clientes, vendedores, produtos e cupons.<br>• Pedido: criar, adicionar itens, aplicar cupom, confirmar e cancelar.<br>• O menu do terminal é funcional, inclusive quando a opção digitada não existe. | • Todas as funcionalidades operam perfeitamente.<br>• Interface de terminal clara: valores em reais (R$ 1.234,50) e mensagens que explicam o que fazer.<br>• 🔵 Funcionalidades extras relevantes (ex.: editar cadastro, histórico do cliente).<br>• 🔵 Integração com uma API de IA (ex.: gerar a descrição de um produto), com a chave guardada no `.env`. |
| **Regras de Negócio** | • 🔴 **Confirma pedido sem verificar o estoque, ou dá baixa só em parte dos itens quando algum falta.**<br>• Cupons aplicados sem conferir validade, valor mínimo ou combinação.<br>• Frete fixo ou calculado de forma diferente do descritivo.<br>• Comissão ou repasse calculados de forma diferente do descritivo. | • Estoque **tudo ou nada**, listando todos os itens em falta.<br>• Cupons respeitam validade, valor mínimo, limite de 2, cumulatividade e teto de 30%.<br>• Frete por região e unidades, com frete grátis a partir de R$ 300,00. Tributos aparecem no resumo.<br>• Comissão por categoria e repasse por vendedor corretos.<br>• O exemplo do descritivo dá **R$ 193,00** de total e **R$ 110,40** e **R$ 68,00** de repasse. | • Ordem de aplicação dos descontos explicada no README.<br>• Casos extremos tratados: pedido vazio, cupom repetido, cancelar pedido já cancelado, excluir produto que está num pedido aberto.<br>• Valores sempre com 2 casas decimais, sem erros como `14.399999`.<br>• 🔵 Região calculada a partir da UF do cliente. |
| **Estrutura (POO)** | • 🔴 **Não utiliza Classes ou as utiliza de forma inadequada.**<br>• 🔴 **A lógica de negócio está misturada no menu e não encapsulada nas classes.** | • Utiliza Classes para modelar as entidades, `Pedido` para orquestrar as regras do pedido e `Marketplace` como classe principal.<br>• Os métodos públicos do `Marketplace` respondem com `{ ok, dados }` ou `{ ok, erros }`.<br>• Os métodos estão bem definidos em suas respectivas classes. | • Estrutura de classes coesa: o menu só lê e mostra, quem decide são as classes.<br>• Excelente encapsulamento: estoque e status do pedido só mudam por métodos (ex.: `confirmar()`, `cancelar()`).<br>• 🔵 Uso de campos privados (`#`) e getters. |
| **Validação de Dados (Zod)** | • 🔴 **Não usa Zod: dados inválidos entram no sistema.**<br>• Um erro de validação derruba o programa. | • Schemas Zod para `Cliente`, `Vendedor`, `Produto` e `CupomDesconto`.<br>• Pelo menos três `.refine()`: formato do CPF, formato do CNPJ e validade futura do cupom.<br>• Usa `safeParse` e devolve a mensagem de erro no formato de resposta do serviço. | • CPF e CNPJ validados com os **dígitos verificadores**.<br>• Mensagens de erro em português, específicas para cada campo.<br>• 🔵 Rejeita produto de vendedor que não existe, ou preço e quantidade com formato estranho (ex.: `'abc'`). |
| **Manipulação de Dados** | • Listas processadas com `for` e variáveis acumuladoras.<br>• Altera o original sem querer (ex.: `const copia = original`).<br>• O CPF aparece na resposta ou na listagem de clientes. | • Usa `map`, `filter`, `find`, `findIndex` e `reduce` para processar as listas.<br>• Usa spread para criar listas e objetos novos e rest para tirar o CPF antes de devolver.<br>• Usa destructuring para ler os dados. | • Encadeamento claro de métodos (`filter` → `map` → `reduce`) com nomes que se explicam.<br>• `reduce` gerando objetos (ex.: faturamento por categoria, repasse por vendedor).<br>• Nenhuma mutação acidental dos dados. |
| **Relatórios** | • Não gera relatórios, ou os números estão errados.<br>• Soma pedidos abertos ou cancelados no faturamento ou no repasse. | • Faturamento total, quantidade de pedidos, ticket médio, faturamento por categoria, repasse por vendedor e top 3 produtos, só com pedidos confirmados. | • Relatório fácil de ler no terminal (ex.: `console.table`, valores em R$).<br>• Mostra também o total de descontos concedidos, de tributos e de comissão.<br>• 🔵 Filtro por período, por vendedor ou por cliente.<br>• 🔵 Resumo do relatório em linguagem natural, gerado por uma API de IA. |
| **Organização do Código** | • 🔴 **Código em um único arquivo.**<br>• Nomes de variáveis e métodos inadequados (ex.: `x`, `dados2`, `func`).<br>• Sem comentários. | • Código organizado em módulos (arquivos separados) com `import` e `export`.<br>• Nomes descritivos para variáveis e métodos.<br>• Comentários explicativos nos pontos-chave (cupons, frete, estoque, comissão). | • Código muito bem estruturado, com clara separação de responsabilidades (models, schemas, services, cli).<br>• Regras (taxas, alíquotas, comissões, teto de desconto) em um só lugar, fáceis de mudar. |
| **Versionamento** | • 🔴 **Repositório não foi utilizado ou possui um histórico de commits que não reflete um trabalho em equipe (ex.: um único commit por uma única pessoa).**<br>• `node_modules` ou `.env` enviados para o GitHub. | • O projeto está em um repositório no GitHub.<br>• **Todos os membros do SQUAD realizaram commits**, demonstrando colaboração.<br>• `.gitignore` configurado. | • Excelente histórico de commits, pequenos e com mensagens claras (ex.: `feat: aplica teto de desconto`).<br>• 🔵 Branches por funcionalidade e Pull Requests revisados por outro membro. |
| **Documentação (README)** | • Sem README, ou não dá para rodar o projeto seguindo ele. | • O `README.md` explica o projeto, como instalar (`npm install`) e rodar, e quem fez o quê. | • README completo: regras de negócio com exemplo, estrutura de pastas, decisões do SQUAD e prints do terminal. |
| **Colaboração no SQUAD** | • Uma ou duas pessoas fazem tudo enquanto o resto assiste.<br>• Bloqueios escondidos até a véspera da entrega. | • Tarefas divididas e visíveis (GitHub Projects, Trello ou similar).<br>• Cada membro sabe explicar a parte que fez.<br>• Bloqueios comunicados cedo. | • O SQUAD tenta destravar sozinho antes de pedir ajuda (documentação, testes, conversa entre si).<br>• Decisões debatidas com argumentos e registradas no README. |
| **Apresentação** | • 🔴 **O SQUAD não apresentou.**<br>• 🔴 **Nenhum membro consegue explicar o código apresentado.**<br>• Não publicou no LinkedIn. | • Apresenta o problema, a solução, a estrutura do código e o sistema funcionando.<br>• Todos os membros participam.<br>• Post publicado no LinkedIn. | • Demonstração fluida de um pedido completo (cupons, frete, estoque, comissão e repasse).<br>• Contam um desafio que travou o time e como resolveram.<br>• 🔵 Post no LinkedIn com vídeo ou GIF do sistema. |

---

## ❌ Critérios Eliminatórios

Os critérios abaixo são **eliminatórios** e podem zerar a nota das demais tecnologias:

- ❌ **O programa não executa** ou fecha com erro durante o uso normal.
- ❌ **Não implementa o CRUD mínimo** ou a confirmação de pedido.
- ❌ **Confirma pedido sem verificar o estoque** ou dá baixa parcial.
- ❌ **Não utiliza Classes**, ou a lógica de negócio está toda no menu.
- ❌ **Não usa Zod** para validar os dados.
- ❌ **Código em um único arquivo.**
- ❌ **Repositório não utilizado** ou histórico que não mostra trabalho em equipe.
- ❌ **O SQUAD não apresentou**, ou **nenhum membro consegue explicar o código**.
- ❌ **Ignorou o cenário do MercadoÁgil** ou construiu outro sistema.

---

## 💡 Dicas para não travar

- **Comecem pequeno.** Primeiro um `index.js` que mostra o menu e sai. Depois uma classe. Depois um cadastro. Rodou, viu, entendeu.
- **Façam as contas no papel antes do código.** Se o SQUAD não sabe calcular o pedido de exemplo à mão, o código também não vai saber.
- **Usem o pedido de exemplo como teste** sempre que mexerem nas regras de cupom, frete ou comissão.
- **Dividam por classe**, não por "quem sabe mais". Cada pessoa fica dona de uma parte e explica essa parte na apresentação.
- **[Commit pequeno e frequente](https://www-conventionalcommits-org.translate.goog/en/v1.0.0/?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc).** Um commit por funcionalidade que funciona. Nunca deixem para subir tudo no último dia.
- **O prazo é curto, então corte o que não é obrigatório.** Primeiro tudo o que está nos Requisitos, funcionando. Só depois pensem nos extras 🔵.
- **Travou?** Leiam a mensagem de erro, procurem na documentação e conversem com o SQUAD. Se mesmo assim não sair, peçam ajuda mostrando o que já tentaram.

## 📦 Entrega

- **Link do repositório do GitHub do SQUAD**, com o professor adicionado (julio-cesar96) e o Léo (LeonardoCAlves) como colaborador.
- **Link do post no LinkedIn.**
- **Data de entrega:** 28/10/2026 (quarta-feira)

*Lembrem-se: ninguém aprende programação sem errar. O que diferencia um time é o que ele faz depois do erro.* 🚀
