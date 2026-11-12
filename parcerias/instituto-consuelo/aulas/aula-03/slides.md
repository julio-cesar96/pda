# Python na Cozinha: Preparando os Dados

## 📋 Agenda da Aula

1. **Estrutura de scripts e boas práticas** (30 min)
2. **Variáveis, operadores, condicionais e loops** (45 min)
3. **Funções, módulos e pacotes** (45 min)
4. **Manipulação de arquivos e dados** (60 min)

---

## 1. Estrutura de Scripts e Boas Práticas (30 min)

### 📖 Definições Fundamentais de Funções, Módulos e Pacotes

**Script Python:** É um arquivo de texto com extensão `.py` que contém código Python e pode ser executado diretamente pelo interpretador. Diferente do C que precisa de compilação, o Python é interpretado em tempo de execução.

**Interpretador Python:** É o programa que lê e executa código Python linha por linha. Executamos com `python arquivo.py` no terminal.

**Indentação:** É o espaçamento no início das linhas que define a estrutura hierárquica do código. No Python, a indentação não é apenas visual (como em C), ela é parte da sintaxe e define blocos de código.

**PEP (Python Enhancement Proposal):** São documentos que descrevem melhorias e convenções para Python. O PEP 8 define o guia de estilo oficial.

**Docstring:** É uma string literal que aparece como primeira instrução em módulos, funções, classes ou métodos. Serve como documentação automática.

### 🔄 C vs Python: Primeira impressão

**Em C:**

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

**Em Python (modo pythônico):**

```python
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()
```

### 🐍 Características Pythônicas

#### **O que é "Pythônico"?**

Código pythônico segue as filosofias e convenções da linguagem Python, priorizando:

- **Legibilidade:** "Code is read much more often than it is written"
- **Simplicidade:** "Simple is better than complex"
- **Explícito:** "Explicit is better than implicit"
- **Elegância:** "Beautiful is better than ugly"

#### 1. **Indentação é obrigatória**

- **C:** Usa `{}` para delimitar blocos
- **Python:** Usa indentação (4 espaços recomendados)

```python
# Pythônico ✅
if True:
    print("Correto")
    if True:
        print("Aninhado correto")

# Não pythônico ❌ 
if True:
print("Erro de indentação")
```

#### 2. **Sem ponto e vírgula**

```python
# Python
nome = "João"
idade = 25
print(f"{nome} tem {idade} anos")

# Equivalente em C
// char nome[] = "João";
// int idade = 25;
// printf("%s tem %d anos\n", nome, idade);
```

#### 3. **Guia de Estilo PEP 8 (Oficial)**

**PEP 8** é o guia de estilo oficial do Python que define como escrever código legível e consistente.

##### **📝 Convenções de Nomenclatura:**

```python
# Variáveis e funções: snake_case (minúsculas com underscore)
nome_usuario = "maria"
idade_maxima = 100

def calcular_media(lista_notas):
    return sum(lista_notas) / len(lista_notas)

def processar_dados_usuario():
    pass

# Classes: PascalCase (primeira letra maiúscula)
class ContaBancaria:
    pass

class UsuarioAutenticado:
    pass

# Constantes: UPPER_CASE (maiúsculas com underscore)
PI = 3.14159
MAX_TENTATIVAS = 3
TAXA_JUROS_ANUAL = 0.05

# Métodos privados: prefixo com underscore
class MinhaClasse:
    def __init__(self):
        self._variavel_privada = "privada"  # Uma _ = convenção privada
        self.__variavel_muito_privada = "muito privada"  # Duas _ = name mangling
    
    def _metodo_privado(self):
        pass
```

##### **📏 Formatação e Espaçamento:**

```python
# CORRETO ✅ - Espaços ao redor de operadores
resultado = (a + b) * (c - d)
lista = [1, 2, 3, 4, 5]
dicionario = {'nome': 'João', 'idade': 25}

# INCORRETO ❌
resultado=(a+b)*(c-d)
lista=[1,2,3,4,5]
dicionario={'nome':'João','idade':25}

# CORRETO ✅ - Argumentos de função
def funcao(param1, param2, param3=None):
    pass

funcao(arg1, arg2, param3=valor)

# INCORRETO ❌
def funcao(param1,param2,param3 = None):
    pass

funcao(arg1,arg2,param3= valor)
```

##### **📄 Comprimento de Linha e Quebras:**

```python
# Máximo 79 caracteres por linha
# CORRETO ✅ - Quebra de linha em parênteses
resultado = alguma_funcao_com_nome_longo(
    parametro1,
    parametro2,
    parametro3
)

# CORRETO ✅ - Quebra em listas longas
lista_longa = [
    'item1', 'item2', 'item3',
    'item4', 'item5', 'item6'
]

# CORRETO ✅ - Quebra em condicionais complexas
if (condicao1 and condicao2 and 
    condicao3 and condicao4):
    fazer_algo()
```

##### **📦 Imports (Importações):**

```python
# CORRETO ✅ - Ordem dos imports
# 1. Biblioteca padrão
import os
import sys
from datetime import datetime

# 2. Bibliotecas de terceiros
import requests
import numpy as np

# 3. Módulos locais/próprios
from meu_projeto import utils
from meu_projeto.modelos import Usuario

# CORRETO ✅ - Imports específicos
from os import path, environ
from datetime import datetime, timedelta

# EVITAR ❌ - Import de tudo
from os import *  # Não recomendado
```

##### **🔤 Strings e Comentários:**

```python
# CORRETO ✅ - Docstrings em funções
def calcular_area_triangulo(base, altura):
    """
    Calcula a área de um triângulo.
    
    Args:
        base (float): Base do triângulo
        altura (float): Altura do triângulo
        
    Returns:
        float: Área do triângulo
    """
    return (base * altura) / 2

# CORRETO ✅ - Comentários explicativos
# Calcula a média ponderada considerando os pesos
media_ponderada = sum(nota * peso for nota, peso in zip(notas, pesos)) / sum(pesos)

# CORRETO ✅ - Strings: aspas simples ou duplas consistentes
nome = 'João'  # ou "João" - seja consistente no projeto
mensagem = "Ele disse: 'Olá!'"  # Use duplas quando tiver aspas simples dentro
```

##### **🏗️ Estrutura de Classes:**

```python
class ExemploPEP8:
    """Classe que demonstra convenções PEP 8."""
    
    # Constantes de classe
    VALOR_PADRAO = 100
    
    def __init__(self, nome, idade):
        """Inicializa a instância."""
        self.nome = nome
        self.idade = idade
        self._privado = "valor privado"
    
    def metodo_publico(self):
        """Método público da classe."""
        return self._metodo_privado()
    
    def _metodo_privado(self):
        """Método privado (convenção)."""
        return f"{self.nome} tem {self.idade} anos"
    
    @staticmethod
    def metodo_estatico():
        """Método estático."""
        return "Não depende da instância"
    
    @classmethod
    def metodo_de_classe(cls):
        """Método de classe."""
        return cls.VALOR_PADRAO
```

##### **⚠️ Principais Regras PEP 8:**

1. **Indentação:** 4 espaços (nunca tabs)
2. **Linha:** Máximo 79 caracteres
3. **Linhas em branco:** 2 linhas entre classes, 1 linha entre métodos
4. **Encoding:** UTF-8 sempre
5. **Imports:** No topo do arquivo, separados por categoria
6. **Espaços:** Ao redor de operadores, após vírgulas
7. **Comentários:** Em inglês (projetos internacionais) ou idioma do projeto

#### 4. **O padrão `if __name__ == "__main__":`**

```python
def saudacao(nome):
    """Função para cumprimentar"""
    return f"Olá, {nome}!"

def main():
    """Função principal do programa"""
    usuario = input("Digite seu nome: ")
    mensagem = saudacao(usuario)
    print(mensagem)

# Executa apenas quando o script é rodado diretamente
if __name__ == "__main__":
    main()
```

### 🎯 **ATIVIDADE EM SALA #1** (10 min)

Crie um script `calculadora_basica.py` que:

- Tenha funções para soma, subtração, multiplicação e divisão
- Use o padrão `if __name__ == "__main__":`
- Peça dois números ao usuário e mostre todas as operações

---

## 2. Variáveis, Operadores, Condicionais e Loops (45 min)

### 📖 Definições Fundamentais de Funções, Módulos e Pacotes (Revisão)

**Tipagem Dinâmica:** O tipo da variável é determinado em tempo de execução, não na declaração. Uma mesma variável pode armazenar diferentes tipos durante a execução do programa.

**Duck Typing:** Conceito Python: "Se anda como um pato e grasna como um pato, então é um pato". O tipo é determinado pelo comportamento, não pela declaração explícita.

**Mutabilidade:**

- **Objetos Mutáveis:** Podem ser alterados após criação (listas, dicionários, sets)
- **Objetos Imutáveis:** Não podem ser alterados após criação (strings, tuplas, números)

**Operadores de Identidade:**

- `is`: Verifica se duas variáveis referenciam o mesmo objeto
- `==`: Verifica se dois objetos têm o mesmo valor

**List Comprehension:** Forma concisa e pythônica de criar listas aplicando operações ou filtros em sequências existentes.

**Iterable:** Qualquer objeto que pode ser percorrido em um loop (listas, tuplas, strings, ranges, etc.).

### 🔄 Tipagem: C vs Python

**C (tipagem estática):**

```c
int numero = 42;
float preco = 19.99;
char letra = 'A';
```

**Python (tipagem dinâmica - pythônico):**

```python
numero = 42          # int
preco = 19.99        # float
letra = 'A'          # str
ativo = True         # bool

# Verificar tipo
print(type(numero))  # <class 'int'>

# Python permite reatribuição com tipos diferentes
numero = "agora sou string"
print(type(numero))  # <class 'str'>
```

### 🔢 Operadores Lógicos

**Por que Python mudou os operadores?**
Python prioriza a legibilidade, usando palavras em inglês que são mais intuitivas que símbolos:

| C | Python | Exemplo Python | Significado |
|---|--------|----------------|-------------|
| `&&` | `and` | `if idade >= 18 and tem_documento:` | E lógico |
| `\|\|` | `or` | `if chuva or frio:` | OU lógico |
| `!` | `not` | `if not aprovado:` | NÃO lógico |

**Operadores de Comparação:**

- `==` : Igual (valor)
- `!=` : Diferente  
- `is` : Identidade (mesmo objeto)
- `is not` : Não é o mesmo objeto
- `in` : Pertencimento (pythônico!)
- `not in` : Não pertence

```python
# Exemplos pythônicos
nome = "Python"
if 'y' in nome:  # Verifica se 'y' está na string
    print("Contém y")

lista = [1, 2, 3, 4, 5]
if 3 in lista:  # Verifica se 3 está na lista
    print("3 está na lista")
```

### 🔄 Estruturas de Controle

#### **Condicionais**

```python
# Python - mais limpo e legível
idade = 20

if idade < 18:
    categoria = "menor"
elif idade < 60:
    categoria = "adulto"
else:
    categoria = "idoso"

print(f"Categoria: {categoria}")

# Operador ternário pythônico
status = "maior" if idade >= 18 else "menor"
```

#### **Loops - A grande diferença!**

**C:**

```c
// Loop tradicional
for(int i = 0; i < 5; i++) {
    printf("%d\n", i);
}
```

**Python (modo pythônico):**

```python
# Pythônico com range()
for i in range(5):
    print(i)

# Ainda mais pythônico - iterando diretamente
frutas = ["maçã", "banana", "laranja"]
for fruta in frutas:
    print(f"Eu gosto de {fruta}")

# Com índice quando necessário
for indice, fruta in enumerate(frutas):
    print(f"{indice}: {fruta}")
```

### 🚀 List Comprehensions (Super Pythônico!)

**O que são List Comprehensions?**
Uma forma concisa e eficiente de criar listas baseadas em listas existentes. Seguem o padrão:
`[expressão for item in iterável if condição]`

**Vantagens:**

- Mais rápido que loops tradicionais
- Mais legível para operações simples
- Menos código
- Mais pythônico

```python
# Tradicional (como você faria em C)
numeros = []
for i in range(10):
    if i % 2 == 0:
        numeros.append(i ** 2)

# Pythônico com list comprehension
numeros = [i ** 2 for i in range(10) if i % 2 == 0]
print(numeros)  # [0, 4, 16, 36, 64]

# Outros exemplos pythônicos
palavras = ["python", "java", "c", "javascript"]
maiusculas = [palavra.upper() for palavra in palavras]
grandes = [palavra for palavra in palavras if len(palavra) > 3]
```

### 🎯 **ATIVIDADE EM SALA #2** (15 min)

Crie um programa que:

1. Gere uma lista com os números de 1 a 50
2. Use list comprehension para filtrar apenas os múltiplos de 3 e 5
3. Calcule a soma desses números
4. Mostre quantos números foram encontrados

---

## 3. Funções, Módulos e Pacotes (45 min)

### 📖 Definições Fundamentais de Manipulação de Arquivos e Dados

**Função:** Bloco de código reutilizável que executa uma tarefa específica. Em Python, funções são objetos de primeira classe (podem ser passadas como argumentos, retornadas de outras funções, atribuídas a variáveis).

**Escopo:** Define onde uma variável pode ser acessada:

- **Local:** Dentro da função onde foi definida
- **Global:** No nível do módulo
- **Built-in:** Nomes pré-definidos do Python

**Parâmetro vs Argumento:**

- **Parâmetro:** Variável na definição da função
- **Argumento:** Valor real passado quando a função é chamada

**Type Hints:** Anotações opcionais que indicam os tipos esperados dos parâmetros e retorno (Python 3.5+).

**Módulo:** Um arquivo Python (`.py`) que contém definições e instruções. O nome do módulo é o nome do arquivo sem a extensão.

**Pacote:** Uma coleção de módulos organizados em diretórios. Deve conter um arquivo `__init__.py`.

**Namespace:** Sistema que evita conflitos de nomes, criando contextos onde nomes podem existir sem interferir uns com os outros.

**`*args`:** Permite que uma função aceite qualquer número de argumentos posicionais (empacota em tupla).

**`**kwargs`:** Permite que uma função aceite qualquer número de argumentos nomeados (empacota em dicionário).

### 🔄 Funções: C vs Python

**C:**

```c
int soma(int a, int b) {
    return a + b;
}
```

**Python (mais flexível):**

```python
def soma(a, b):
    """Retorna a soma de dois números"""
    return a + b

# Tipagem opcional (Python 3.5+)
def soma_tipada(a: int, b: int) -> int:
    """Versão com type hints"""
    return a + b
```

### 🐍 Recursos Pythônicos em Funções

#### **1. Parâmetros com valores padrão**

```python
def saudacao(nome, cumprimento="Olá"):
    return f"{cumprimento}, {nome}!"

print(saudacao("Maria"))           # Olá, Maria!
print(saudacao("João", "Oi"))      # Oi, João!
```

#### **2. Argumentos nomeados**

```python
def criar_perfil(nome, idade, cidade="Não informada", ativo=True):
    return {
        "nome": nome,
        "idade": idade,
        "cidade": cidade,
        "ativo": ativo
    }

# Chamadas pythônicas
perfil1 = criar_perfil("Ana", 25)
perfil2 = criar_perfil(nome="Pedro", cidade="São Paulo", idade=30)
```

#### **3. *args e **kwargs (muito pythônico!)**

```python
def soma_flexivel(*numeros):
    """Soma qualquer quantidade de números"""
    return sum(numeros)

print(soma_flexivel(1, 2, 3, 4, 5))  # 15

def info_pessoa(**dados):
    """Aceita qualquer quantidade de informações"""
    for chave, valor in dados.items():
        print(f"{chave}: {valor}")

info_pessoa(nome="João", idade=25, profissao="Dev")
```

#### **4. Retorno múltiplo (pythônico!)**

```python
def operacoes_basicas(a, b):
    """Retorna múltiplos valores"""
    return a + b, a - b, a * b, a / b

# Desempacotamento
soma, sub, mult, div = operacoes_basicas(10, 3)
print(f"Soma: {soma}, Subtração: {sub}")
```

### 📦 Módulos e Pacotes

#### **Criando um módulo**

#### arquivo: `matematica.py`

```python
"""
Módulo com funções matemáticas básicas
"""

PI = 3.14159

def area_circulo(raio):
    """Calcula área do círculo"""
    return PI * raio ** 2

def fatorial(n):
    """Calcula fatorial de n"""
    if n <= 1:
        return 1
    return n * fatorial(n - 1)

def eh_primo(numero):
    """Verifica se um número é primo"""
    if numero < 2:
        return False
    for i in range(2, int(numero ** 0.5) + 1):
        if numero % i == 0:
            return False
    return True
```

#### **Importando de forma pythônica**

```python
# Diferentes formas de importar
import matematica
resultado = matematica.area_circulo(5)

# Importar função específica
from matematica import area_circulo, PI
resultado = area_circulo(5)

# Importar com alias
import matematica as math
resultado = math.fatorial(5)

# Importar tudo (não recomendado)
from matematica import *
```

### 📁 Estrutura de Pacotes

```source
meu_projeto/
├── main.py
├── utils/
│   ├── __init__.py
│   ├── matematica.py
│   └── texto.py
└── modelos/
    ├── __init__.py
    └── usuario.py
```

### 📦 Gerenciamento de Pacotes e Ambientes Virtuais

#### **O que é o pip?**

**pip** (Pip Installs Packages) é o gerenciador de pacotes padrão do Python. Permite instalar, atualizar e remover bibliotecas de terceiros do PyPI (Python Package Index).

#### **Instalando Pacotes com pip**

```bash
# Instalar um pacote
pip install requests

# Instalar versão específica
pip install requests==2.28.0

# Instalar múltiplos pacotes
pip install requests numpy pandas

# Atualizar um pacote
pip install --upgrade requests

# Desinstalar um pacote
pip uninstall requests

# Listar pacotes instalados
pip list

# Mostrar informações de um pacote
pip show requests

# Buscar pacotes
pip search "web scraping"
```

#### **Por que usar Ambientes Virtuais?**

**Problema em C:** Bibliotecas instaladas globalmente no sistema podem causar conflitos.

**Solução Python:** Ambientes virtuais isolam dependências de cada projeto.

**Benefícios:**

- Cada projeto tem suas próprias dependências
- Evita conflitos entre versões
- Facilita compartilhamento do projeto
- Mantém o sistema limpo

#### **Criando e Usando Ambientes Virtuais**

##### **Com venv (Built-in do Python):**

```bash
# Criar ambiente virtual
python -m venv meu_ambiente

# Ativar ambiente virtual
# Windows:
meu_ambiente\Scripts\activate

# Linux/Mac:
source meu_ambiente/bin/activate

# Seu terminal mostrará: (meu_ambiente) user@computer:~$

# Instalar pacotes no ambiente
pip install requests pandas

# Desativar ambiente virtual
deactivate
```

##### **Arquivo requirements.txt:**

```bash
# Salvar dependências do projeto
pip freeze > requirements.txt

# Conteúdo do requirements.txt:
# requests==2.28.0
# pandas==1.5.0
# numpy==1.23.0

# Instalar todas as dependências de um projeto
pip install -r requirements.txt
```

#### **Exemplo Prático Completo:**

```bash
# 1. Criar projeto
mkdir meu_projeto
cd meu_projeto

# 2. Criar ambiente virtual
python -m venv venv

# 3. Ativar ambiente
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# 4. Instalar dependências
pip install requests pandas matplotlib

# 5. Salvar dependências
pip freeze > requirements.txt

# 6. Criar estrutura do projeto
mkdir src
touch src/main.py
touch src/__init__.py

# 7. Quando terminar
deactivate
```

#### **Boas Práticas:**

```python
# ✅ SEMPRE use ambientes virtuais
# ✅ Inclua requirements.txt no projeto
# ✅ Adicione venv/ ao .gitignore
# ✅ Documente as dependências no README

# Estrutura recomendada:
"""
meu_projeto/
├── venv/                 # Ambiente virtual (não commitar)
├── src/                  # Código fonte
│   ├── __init__.py
│   └── main.py
├── tests/                # Testes
├── requirements.txt      # Dependências
├── README.md            # Documentação
└── .gitignore           # Ignorar venv/
"""
```

#### **Pacotes Essenciais para Começar:**

```bash
# Manipulação de dados
pip install pandas numpy

# Requisições HTTP
pip install requests

# Análise de dados e gráficos
pip install matplotlib seaborn

# Desenvolvimento web
pip install flask django

# Testes
pip install pytest

# Formatação de código
pip install black flake8 pylint

# Ambiente de dados
pip install jupyter notebook
```

---

## 4. Manipulação de Arquivos e Dados (60 min)

### 📖 Definições Fundamentais

**Context Manager:** Protocolo que garante que recursos sejam adequadamente adquiridos e liberados. O `with` implementa este padrão automaticamente.

**Encoding:** Sistema de codificação de caracteres. UTF-8 é o padrão moderno que suporta caracteres especiais e acentos.

**CSV (Comma-Separated Values):** Formato de arquivo que armazena dados tabulares usando vírgulas (ou outros delimitadores) para separar valores.

**JSON (JavaScript Object Notation):** Formato leve de troca de dados, fácil de ler e escrever. Baseado em texto e independente de linguagem.

**API (Application Programming Interface):** Conjunto de protocolos e ferramentas para construir software. APIs web permitem comunicação entre aplicações via HTTP.

**HTTP Methods:**

- **GET:** Recupera dados do servidor
- **POST:** Envia dados para o servidor
- **PUT:** Atualiza dados existentes
- **DELETE:** Remove dados

**Request/Response:**

- **Request:** Solicitação feita ao servidor (contém método, URL, headers, body)
- **Response:** Resposta do servidor (contém status code, headers, body)

**Status Codes HTTP:**

- **200:** Sucesso
- **400:** Erro do cliente (bad request)
- **404:** Não encontrado
- **500:** Erro interno do servidor

**Serialização/Deserialização:**

- **Serialização:** Converter objeto Python em formato de armazenamento (JSON, XML)
- **Deserialização:** Converter dados armazenados de volta em objeto Python

**Exception Handling:** Mecanismo para capturar e tratar erros que podem ocorrer durante a execução.

### 📄 Manipulação de Arquivos

#### **Context Manager (pythônico!)**

```python
# Não pythônico (como em C)
arquivo = open("dados.txt", "w")
arquivo.write("Hello World")
arquivo.close()  # Pode esquecer de fechar!

# Pythônico com context manager
with open("dados.txt", "w", encoding="utf-8") as arquivo:
    arquivo.write("Olá, mundo!")
# Arquivo fecha automaticamente
```

#### **Lendo arquivos**

```python
# Ler arquivo completo
with open("dados.txt", "r", encoding="utf-8") as arquivo:
    conteudo = arquivo.read()
    print(conteudo)

# Ler linha por linha (mais eficiente para arquivos grandes)
with open("dados.txt", "r", encoding="utf-8") as arquivo:
    for linha in arquivo:
        print(linha.strip())

# Ler todas as linhas em uma lista
with open("dados.txt", "r", encoding="utf-8") as arquivo:
    linhas = arquivo.readlines()
```

### 📊 Manipulação de CSV

```python
import csv

# Escrevendo CSV
dados_alunos = [
    ["Nome", "Idade", "Nota"],
    ["Ana", 22, 8.5],
    ["Bruno", 23, 7.2],
    ["Carlos", 21, 9.1]
]

with open("alunos.csv", "w", newline="", encoding="utf-8") as arquivo:
    escritor = csv.writer(arquivo)
    escritor.writerows(dados_alunos)

# Lendo CSV pythonicamente
with open("alunos.csv", "r", encoding="utf-8") as arquivo:
    leitor = csv.DictReader(arquivo)
    for linha in leitor:
        print(f"{linha['Nome']}: {linha['Nota']}")

# Calculando média das notas
with open("alunos.csv", "r", encoding="utf-8") as arquivo:
    leitor = csv.DictReader(arquivo)
    notas = [float(linha['Nota']) for linha in leitor]
    media = sum(notas) / len(notas)
    print(f"Média da turma: {media:.2f}")
```

### 🔧 Manipulação de JSON

```python
import json

# Dados em Python
pessoa = {
    "nome": "Maria Silva",
    "idade": 28,
    "profissao": "Desenvolvedora",
    "linguagens": ["Python", "JavaScript", "C"],
    "ativa": True
}

# Salvando JSON
with open("pessoa.json", "w", encoding="utf-8") as arquivo:
    json.dump(pessoa, arquivo, ensure_ascii=False, indent=2)

# Lendo JSON
with open("pessoa.json", "r", encoding="utf-8") as arquivo:
    dados = json.load(arquivo)
    print(f"Nome: {dados['nome']}")
    print(f"Linguagens: {', '.join(dados['linguagens'])}")

# Convertendo para string JSON
json_string = json.dumps(pessoa, ensure_ascii=False, indent=2)
print(json_string)
```

### 🌐 Consumindo APIs

```python
import requests
import json

# Fazendo requisição GET
def buscar_cep(cep):
    """Busca informações de um CEP"""
    url = f"https://viacep.com.br/ws/{cep}/json/"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Levanta exceção para status de erro
        
        dados = response.json()
        
        if 'erro' in dados:
            return None
            
        return {
            "cep": dados.get("cep"),
            "logradouro": dados.get("logradouro"),
            "bairro": dados.get("bairro"),
            "localidade": dados.get("localidade"),
            "uf": dados.get("uf")
        }
        
    except requests.RequestException as e:
        print(f"Erro na requisição: {e}")
        return None

# Exemplo de uso
endereco = buscar_cep("01310-100")
if endereco:
    print(f"Endereço: {endereco['logradouro']}, {endereco['bairro']}")
    print(f"Cidade: {endereco['localidade']}-{endereco['uf']}")
```

### 📋 Exemplo Completo: Sistema de Cadastro

```python
import json
import csv
from datetime import datetime

class SistemaCadastro:
    def __init__(self, arquivo_dados="usuarios.json"):
        self.arquivo_dados = arquivo_dados
        self.usuarios = self.carregar_dados()
    
    def carregar_dados(self):
        """Carrega dados do arquivo JSON"""
        try:
            with open(self.arquivo_dados, "r", encoding="utf-8") as arquivo:
                return json.load(arquivo)
        except FileNotFoundError:
            return []
    
    def salvar_dados(self):
        """Salva dados no arquivo JSON"""
        with open(self.arquivo_dados, "w", encoding="utf-8") as arquivo:
            json.dump(self.usuarios, arquivo, ensure_ascii=False, indent=2)
    
    def adicionar_usuario(self, nome, email, idade):
        """Adiciona novo usuário"""
        usuario = {
            "id": len(self.usuarios) + 1,
            "nome": nome,
            "email": email,
            "idade": idade,
            "cadastrado_em": datetime.now().isoformat()
        }
        self.usuarios.append(usuario)
        self.salvar_dados()
        return usuario
    
    def exportar_csv(self, nome_arquivo="relatorio_usuarios.csv"):
        """Exporta dados para CSV"""
        with open(nome_arquivo, "w", newline="", encoding="utf-8") as arquivo:
            if not self.usuarios:
                return
            
            campos = self.usuarios[0].keys()
            escritor = csv.DictWriter(arquivo, fieldnames=campos)
            escritor.writeheader()
            escritor.writerows(self.usuarios)
    
    def listar_usuarios(self):
        """Lista todos os usuários"""
        for usuario in self.usuarios:
            print(f"ID: {usuario['id']} - {usuario['nome']} ({usuario['email']})")

# Exemplo de uso
sistema = SistemaCadastro()
sistema.adicionar_usuario("João Silva", "joao@email.com", 30)
sistema.adicionar_usuario("Maria Santos", "maria@email.com", 25)
sistema.listar_usuarios()
sistema.exportar_csv()
```

---

## 📚 Material Extra de Estudo

### 🔗 Links Essenciais

- **Documentação Python:** <https://docs.python.org/3/>
- **PEP 8 - Style Guide:** <https://peps.python.org/pep-0008/>
- **Real Python:** <https://realpython.com/>
- **Python Package Index (PyPI):** <https://pypi.org/>

### 📖 Livros Recomendados

- "Automate the Boring Stuff with Python" - Al Sweigart
- "Python Tricks" - Dan Bader
- "Effective Python" - Brett Slatkin

### 🛠️ Ferramentas Úteis

- **IDE/Editores:** VS Code, PyCharm, Vim
- **Linters:** pylint, flake8, black
- **Ambientes virtuais:** venv, conda
- **APIs para testes:**
  - JSONPlaceholder: <https://jsonplaceholder.typicode.com/>
  - ViaCEP: <https://viacep.com.br/>
  - Open Library: <https://openlibrary.org/developers/api>

---

## 🎯 Resumo da Aula

### O que aprendemos hoje

1. **Python vs C:** Sintaxe mais limpa, tipagem dinâmica, indentação obrigatória
2. **Modo Pythônico:** List comprehensions, context managers, desempacotamento
3. **Funções flexíveis:** Parâmetros padrão, *args, **kwargs, múltiplos retornos
4. **Manipulação de dados:** CSV, JSON, APIs de forma eficiente e legível

### Próximos passos

- Pratique os exercícios propostos
- Explore as bibliotecas padrão do Python
- Experimente com APIs públicas
- Comece a pensar de forma pythônica! 🐍

---

*"Beautiful is better than ugly. Explicit is better than implicit. Simple is better than complex."* - The Zen of Python
