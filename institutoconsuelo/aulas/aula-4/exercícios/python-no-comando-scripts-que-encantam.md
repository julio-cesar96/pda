# 🐍 Python no Comando: Scripts que Encantam

## 🧠 Objetivos de Aprendizagem

Ao final desta aula, você será capaz de:

1. **Compreender e aplicar o conceito de funções em Python**, utilizando parâmetros, retornos e escopo de variáveis de forma eficiente.
2. **Organizar o código em módulos e scripts reutilizáveis**, entendendo a importância da modularização para a manutenção e escalabilidade de projetos.
3. **Aplicar boas práticas de codificação**, seguindo convenções do PEP 8 e utilizando docstrings e nomes significativos.
4. **Manipular e tratar dados de maneira segura e eficiente**, aplicando técnicas de limpeza e validação de dados.
5. **Introduzir testes unitários em seus scripts**, compreendendo o papel dos testes na qualidade e estabilidade do código.
6. **Integrar todos os conceitos em um pequeno projeto prático**, que demonstre o uso de funções, modularização e testes básicos.

---

## 📋 Agenda da Aula

| Horário | Tópico | Duração |
|---------|--------|---------|
| 00:00 - 00:50 | Aplicação de funções e modularização | 50 min |
| 00:50 - 01:40 | Tratamento de dados e boas práticas | 50 min |
| 01:40 - 01:50 | ☕ Intervalo | 10 min |
| 01:50 - 02:50 | Introdução a testes unitários | 60 min |
| 02:50 - 03:00 | Revisão e encerramento | 10 min |

---

## 1. Aplicação de Funções e Modularização (50 min)

### 📖 Conceitos Fundamentais

#### **O que é Modularização?**

**Modularização** é o processo de dividir um programa em partes menores, independentes e reutilizáveis chamadas de **módulos**. Cada módulo tem uma responsabilidade específica e bem definida.

**Por que modularizar?**

- ✅ **Manutenibilidade:** Código mais fácil de corrigir e atualizar
- ✅ **Reutilização:** Funções podem ser usadas em vários projetos
- ✅ **Testabilidade:** Mais fácil testar partes isoladas
- ✅ **Legibilidade:** Código mais organizado e compreensível
- ✅ **Colaboração:** Equipes podem trabalhar em módulos diferentes

#### **Princípios de Design de Funções**

**1. Single Responsibility Principle (SRP):**  
Cada função deve fazer **uma única coisa** e fazê-la bem.

**2. DRY (Don't Repeat Yourself):**  
Evite duplicação de código. Se você está copiando e colando, provavelmente precisa de uma função.

**3. KISS (Keep It Simple, Stupid):**  
Mantenha as funções simples e diretas.

**4. Funções Puras (quando possível):**  
Funções que não alteram estado externo e sempre retornam o mesmo resultado para as mesmas entradas.

### 🎯 Exemplos Práticos de Tratamento de Dados

#### **Exemplo 1: Código Não Modularizado (Ruim)**

```python
# script_ruim.py - Tudo em um único arquivo, sem organização

dados = input("Digite os números separados por vírgula: ")
numeros = dados.split(',')
total = 0
for num in numeros:
    total += int(num.strip())
media = total / len(numeros)
print(f"Média: {media}")

# E se precisar calcular média em outro lugar? Copiar e colar?
# E se o formato de entrada mudar? Alterar em vários lugares?
```

#### **Exemplo 2: Código Modularizado (Bom)**

```python
# utils/calculadora.py
"""
Módulo com funções matemáticas reutilizáveis.
"""

def calcular_media(numeros):
    """
    Calcula a média aritmética de uma lista de números.
    
    Args:
        numeros (list): Lista de números (int ou float)
        
    Returns:
        float: Média dos números
        
    Raises:
        ValueError: Se a lista estiver vazia
        TypeError: Se os elementos não forem numéricos
        
    Examples:
        >>> calcular_media([1, 2, 3, 4, 5])
        3.0
        >>> calcular_media([10, 20, 30])
        20.0
    """
    if not numeros:
        raise ValueError("A lista não pode estar vazia")
    
    if not all(isinstance(x, (int, float)) for x in numeros):
        raise TypeError("Todos os elementos devem ser números")
    
    return sum(numeros) / len(numeros)


def calcular_mediana(numeros):
    """
    Calcula a mediana de uma lista de números.
    
    Args:
        numeros (list): Lista de números
        
    Returns:
        float: Mediana dos números
    """
    if not numeros:
        raise ValueError("A lista não pode estar vazia")
    
    numeros_ordenados = sorted(numeros)
    n = len(numeros_ordenados)
    meio = n // 2
    
    if n % 2 == 0:
        return (numeros_ordenados[meio - 1] + numeros_ordenados[meio]) / 2
    else:
        return numeros_ordenados[meio]


def calcular_desvio_padrao(numeros):
    """
    Calcula o desvio padrão de uma lista de números.
    
    Args:
        numeros (list): Lista de números
        
    Returns:
        float: Desvio padrão
    """
    if not numeros:
        raise ValueError("A lista não pode estar vazia")
    
    media = calcular_media(numeros)
    variancia = sum((x - media) ** 2 for x in numeros) / len(numeros)
    return variancia ** 0.5
```

```python
# utils/entrada.py
"""
Módulo para processamento de entrada de dados.
"""

def processar_entrada_numerica(texto, separador=','):
    """
    Processa uma string com números separados e retorna lista de floats.
    
    Args:
        texto (str): String com números separados
        separador (str): Caractere separador (padrão: ',')
        
    Returns:
        list: Lista de números float
        
    Raises:
        ValueError: Se não for possível converter para número
    """
    try:
        numeros = [float(item.strip()) for item in texto.split(separador)]
        return numeros
    except ValueError as e:
        raise ValueError(f"Erro ao converter entrada: {e}")


def validar_entrada_positiva(numeros):
    """
    Valida se todos os números são positivos.
    
    Args:
        numeros (list): Lista de números
        
    Returns:
        bool: True se todos forem positivos
    """
    return all(num > 0 for num in numeros)
```

```python
# main.py
"""
Script principal que utiliza os módulos.
"""

from utils.calculadora import calcular_media, calcular_mediana, calcular_desvio_padrao
from utils.entrada import processar_entrada_numerica, validar_entrada_positiva


def main():
    """Função principal do programa."""
    print("=" * 50)
    print("CALCULADORA ESTATÍSTICA")
    print("=" * 50)
    
    try:
        # Solicita entrada do usuário
        entrada = input("\nDigite os números separados por vírgula: ")
        
        # Processa entrada
        numeros = processar_entrada_numerica(entrada)
        
        # Valida se há números suficientes
        if len(numeros) < 2:
            print("❌ É necessário pelo menos 2 números!")
            return
        
        # Realiza cálculos
        media = calcular_media(numeros)
        mediana = calcular_mediana(numeros)
        desvio = calcular_desvio_padrao(numeros)
        
        # Exibe resultados
        print("\n" + "=" * 50)
        print("RESULTADOS:")
        print("=" * 50)
        print(f"📊 Quantidade de números: {len(numeros)}")
        print(f"📈 Média: {media:.2f}")
        print(f"📊 Mediana: {mediana:.2f}")
        print(f"📉 Desvio Padrão: {desvio:.2f}")
        
        if validar_entrada_positiva(numeros):
            print("✅ Todos os números são positivos")
        else:
            print("⚠️  Há números negativos na entrada")
            
    except ValueError as e:
        print(f"❌ Erro de entrada: {e}")
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")


if __name__ == "__main__":
    main()
```

### 🎨 Padrões de Organização de Projetos

```
projeto_encantador/
│
├── README.md                 # Documentação do projeto
├── requirements.txt          # Dependências
├── .gitignore               # Arquivos a ignorar no Git
│
├── src/                     # Código fonte principal
│   ├── __init__.py
│   ├── main.py             # Ponto de entrada
│   │
│   ├── models/             # Modelos/classes de dados
│   │   ├── __init__.py
│   │   └── usuario.py
│   │
│   ├── utils/              # Utilitários/helpers
│   │   ├── __init__.py
│   │   ├── calculadora.py
│   │   └── entrada.py
│   │
│   └── services/           # Lógica de negócio
│       ├── __init__.py
│       └── processador.py
│
├── tests/                   # Testes unitários
│   ├── __init__.py
│   ├── test_calculadora.py
│   └── test_entrada.py
│
└── data/                    # Dados e arquivos
    ├── input/
    └── output/
```

### 💡 Boas Práticas em Funções

```python
# ❌ RUIM: Função faz muitas coisas
def processar_usuario(nome, email, idade):
    # Valida
    if not nome or not email:
        return None
    # Formata
    nome = nome.strip().title()
    email = email.lower()
    # Salva no banco
    # ... código de banco de dados
    # Envia email
    # ... código de envio
    # Gera relatório
    # ... código de relatório
    return True


# ✅ BOM: Cada função tem uma responsabilidade
def validar_usuario(nome, email, idade):
    """Valida dados do usuário."""
    if not nome or not email:
        raise ValueError("Nome e email são obrigatórios")
    if idade < 0 or idade > 150:
        raise ValueError("Idade inválida")
    return True


def formatar_dados_usuario(nome, email):
    """Formata dados do usuário."""
    return {
        'nome': nome.strip().title(),
        'email': email.strip().lower()
    }


def salvar_usuario(dados_usuario):
    """Salva usuário no banco de dados."""
    # Código de banco de dados
    pass


def enviar_email_boas_vindas(email):
    """Envia email de boas-vindas."""
    # Código de email
    pass


def processar_novo_usuario(nome, email, idade):
    """Orquestra o processo de criação de usuário."""
    validar_usuario(nome, email, idade)
    dados = formatar_dados_usuario(nome, email)
    salvar_usuario(dados)
    enviar_email_boas_vindas(dados['email'])
    return dados
```

---

## 2. Tratamento de Dados e Boas Práticas (50 min)

### 📖 Conceitos Fundamentais

#### **O que é Tratamento de Dados?**

**Tratamento de dados** é o processo de validar, limpar, transformar e preparar dados para uso, garantindo que estejam no formato correto e sejam confiáveis.

**Etapas do Tratamento:**
1. **Validação:** Verificar se os dados são válidos
2. **Limpeza:** Remover ou corrigir dados inconsistentes
3. **Transformação:** Converter dados para o formato necessário
4. **Normalização:** Padronizar formatos e valores

#### **Tipos de Erros em Dados**

- **Dados ausentes:** Campos vazios ou None
- **Dados duplicados:** Registros repetidos
- **Dados inconsistentes:** Formatos diferentes para mesma informação
- **Dados inválidos:** Valores fora do esperado
- **Dados corrompidos:** Caracteres especiais, encoding errado

### 🎯 Exemplos Práticos

#### **Exemplo 1: Validação de Dados**

```python
# validadores.py
"""
Módulo com funções de validação de dados.
"""

import re
from datetime import datetime


def validar_email(email):
    """
    Valida formato de email.
    
    Args:
        email (str): Email a validar
        
    Returns:
        bool: True se válido
        
    Examples:
        >>> validar_email("usuario@exemplo.com")
        True
        >>> validar_email("email_invalido")
        False
    """
    if not email or not isinstance(email, str):
        return False
    
    padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(padrao, email))


def validar_cpf(cpf):
    """
    Valida CPF brasileiro (simplificado).
    
    Args:
        cpf (str): CPF a validar
        
    Returns:
        bool: True se válido
    """
    # Remove caracteres não numéricos
    cpf = re.sub(r'[^0-9]', '', cpf)
    
    # Verifica se tem 11 dígitos
    if len(cpf) != 11:
        return False
    
    # Verifica se todos os dígitos são iguais
    if cpf == cpf[0] * 11:
        return False
    
    # Aqui entraria a validação completa dos dígitos verificadores
    # Simplificado para exemplo didático
    return True


def validar_data(data_str, formato="%d/%m/%Y"):
    """
    Valida se string é uma data válida.
    
    Args:
        data_str (str): Data em formato string
        formato (str): Formato esperado
        
    Returns:
        bool: True se válido
    """
    try:
        datetime.strptime(data_str, formato)
        return True
    except ValueError:
        return False


def validar_faixa_numerica(valor, minimo, maximo):
    """
    Valida se número está dentro de uma faixa.
    
    Args:
        valor: Valor a validar
        minimo: Valor mínimo permitido
        maximo: Valor máximo permitido
        
    Returns:
        bool: True se válido
    """
    try:
        numero = float(valor)
        return minimo <= numero <= maximo
    except (ValueError, TypeError):
        return False
```

#### **Exemplo 2: Limpeza e Transformação de Dados**

```python
# limpeza.py
"""
Módulo para limpeza e transformação de dados.
"""

import re
from unicodedata import normalize


def limpar_texto(texto):
    """
    Remove espaços extras e caracteres especiais.
    
    Args:
        texto (str): Texto a limpar
        
    Returns:
        str: Texto limpo
    """
    if not texto:
        return ""
    
    # Remove espaços extras
    texto = ' '.join(texto.split())
    
    # Remove espaços no início e fim
    texto = texto.strip()
    
    return texto


def remover_acentos(texto):
    """
    Remove acentuação de um texto.
    
    Args:
        texto (str): Texto com acentos
        
    Returns:
        str: Texto sem acentos
        
    Examples:
        >>> remover_acentos("São Paulo")
        'Sao Paulo'
    """
    if not texto:
        return ""
    
    return normalize('NFKD', texto).encode('ASCII', 'ignore').decode('ASCII')


def formatar_cpf(cpf):
    """
    Formata CPF para padrão XXX.XXX.XXX-XX.
    
    Args:
        cpf (str): CPF sem formatação
        
    Returns:
        str: CPF formatado
    """
    # Remove não-numéricos
    numeros = re.sub(r'[^0-9]', '', cpf)
    
    if len(numeros) != 11:
        raise ValueError("CPF deve ter 11 dígitos")
    
    return f"{numeros[:3]}.{numeros[3:6]}.{numeros[6:9]}-{numeros[9:]}"


def formatar_telefone(telefone):
    """
    Formata telefone brasileiro.
    
    Args:
        telefone (str): Telefone sem formatação
        
    Returns:
        str: Telefone formatado
    """
    numeros = re.sub(r'[^0-9]', '', telefone)
    
    if len(numeros) == 11:  # Celular com DDD
        return f"({numeros[:2]}) {numeros[2:7]}-{numeros[7:]}"
    elif len(numeros) == 10:  # Fixo com DDD
        return f"({numeros[:2]}) {numeros[2:6]}-{numeros[6:]}"
    else:
        raise ValueError("Telefone com formato inválido")


def padronizar_nome(nome):
    """
    Padroniza nome próprio (primeira letra maiúscula).
    
    Args:
        nome (str): Nome a padronizar
        
    Returns:
        str: Nome padronizado
    """
    if not nome:
        return ""
    
    # Limpa e divide em palavras
    palavras = limpar_texto(nome).split()
    
    # Lista de preposições que ficam em minúsculo
    preposicoes = {'de', 'da', 'do', 'das', 'dos', 'e'}
    
    # Capitaliza cada palavra
    resultado = []
    for i, palavra in enumerate(palavras):
        if i == 0 or palavra.lower() not in preposicoes:
            resultado.append(palavra.capitalize())
        else:
            resultado.append(palavra.lower())
    
    return ' '.join(resultado)
```

#### **Exemplo 3: Sistema Completo de Processamento**

```python
# processador_dados.py
"""
Sistema completo de processamento de dados de usuários.
"""

from validadores import validar_email, validar_cpf, validar_data
from limpeza import limpar_texto, formatar_cpf, padronizar_nome


class ProcessadorDados:
    """Classe para processar e validar dados de usuários."""
    
    def __init__(self):
        self.erros = []
        self.avisos = []
    
    def processar_usuario(self, dados):
        """
        Processa dados de um usuário.
        
        Args:
            dados (dict): Dicionário com dados do usuário
            
        Returns:
            dict: Dados processados ou None se inválido
        """
        self.erros = []
        self.avisos = []
        
        try:
            # Extrai dados
            nome = dados.get('nome', '')
            email = dados.get('email', '')
            cpf = dados.get('cpf', '')
            data_nascimento = dados.get('data_nascimento', '')
            
            # Valida campos obrigatórios
            if not nome:
                self.erros.append("Nome é obrigatório")
            if not email:
                self.erros.append("Email é obrigatório")
            if not cpf:
                self.erros.append("CPF é obrigatório")
            
            # Se tem erros críticos, retorna
            if self.erros:
                return None
            
            # Limpa e formata dados
            nome_limpo = padronizar_nome(nome)
            email_limpo = limpar_texto(email).lower()
            
            # Valida formato
            if not validar_email(email_limpo):
                self.erros.append("Email com formato inválido")
            
            if not validar_cpf(cpf):
                self.erros.append("CPF inválido")
            
            if data_nascimento and not validar_data(data_nascimento):
                self.avisos.append("Data de nascimento com formato inválido")
                data_nascimento = None
            
            # Se tem erros, retorna
            if self.erros:
                return None
            
            # Formata CPF
            try:
                cpf_formatado = formatar_cpf(cpf)
            except ValueError as e:
                self.erros.append(f"Erro ao formatar CPF: {e}")
                return None
            
            # Retorna dados processados
            dados_processados = {
                'nome': nome_limpo,
                'email': email_limpo,
                'cpf': cpf_formatado,
                'data_nascimento': data_nascimento
            }
            
            return dados_processados
            
        except Exception as e:
            self.erros.append(f"Erro ao processar dados: {e}")
            return None
    
    def processar_lote(self, lista_dados):
        """
        Processa múltiplos registros.
        
        Args:
            lista_dados (list): Lista de dicionários com dados
            
        Returns:
            dict: Estatísticas e resultados
        """
        resultados = {
            'processados': [],
            'erros': [],
            'total': len(lista_dados),
            'sucesso': 0,
            'falhas': 0
        }
        
        for i, dados in enumerate(lista_dados):
            resultado = self.processar_usuario(dados)
            
            if resultado:
                resultados['processados'].append(resultado)
                resultados['sucesso'] += 1
            else:
                resultados['erros'].append({
                    'linha': i + 1,
                    'dados_originais': dados,
                    'erros': self.erros.copy(),
                    'avisos': self.avisos.copy()
                })
                resultados['falhas'] += 1
        
        return resultados


# Exemplo de uso
if __name__ == "__main__":
    processador = ProcessadorDados()
    
    # Dados de teste
    usuarios = [
        {
            'nome': '  joão  silva  ',
            'email': 'JOAO@EXEMPLO.COM',
            'cpf': '123.456.789-00',
            'data_nascimento': '15/03/1990'
        },
        {
            'nome': 'maria santos',
            'email': 'email_invalido',
            'cpf': '111.111.111-11',
            'data_nascimento': '20/05/1985'
        },
        {
            'nome': 'Pedro',
            'email': 'pedro@test.com',
            'cpf': '98765432100',
            'data_nascimento': '10/12/1995'
        }
    ]
    
    # Processa lote
    resultado = processador.processar_lote(usuarios)
    
    # Exibe resultados
    print(f"\n{'='*60}")
    print("RELATÓRIO DE PROCESSAMENTO")
    print(f"{'='*60}")
    print(f"Total de registros: {resultado['total']}")
    print(f"✅ Sucesso: {resultado['sucesso']}")
    print(f"❌ Falhas: {resultado['falhas']}")
    
    print(f"\n{'='*60}")
    print("REGISTROS PROCESSADOS COM SUCESSO:")
    print(f"{'='*60}")
    for usuario in resultado['processados']:
        print(f"Nome: {usuario['nome']}")
        print(f"Email: {usuario['email']}")
        print(f"CPF: {usuario['cpf']}")
        print("-" * 60)
    
    if resultado['erros']:
        print(f"\n{'='*60}")
        print("REGISTROS COM ERRO:")
        print(f"{'='*60}")
        for erro in resultado['erros']:
            print(f"Linha {erro['linha']}:")
            print(f"Dados: {erro['dados_originais']}")
            print(f"Erros: {', '.join(erro['erros'])}")
            if erro['avisos']:
                print(f"Avisos: {', '.join(erro['avisos'])}")
            print("-" * 60)
```

### 💎 Boas Práticas de Codificação

#### **1. Naming Conventions (Convenções de Nomes)**

```python
# ❌ RUIM: Nomes não descritivos
def f(x, y):
    return x + y

n = "João"
e = "joao@email.com"
d = [1, 2, 3]


# ✅ BOM: Nomes claros e descritivos
def calcular_soma(numero1, numero2):
    return numero1 + numero2

nome_usuario = "João"
email_contato = "joao@email.com"
lista_numeros = [1, 2, 3]
```

#### **2. Docstrings Completas**

```python
def processar_pagamento(valor, metodo_pagamento, parcelas=1):
    """
    Processa um pagamento no sistema.
    
    Esta função valida o valor, verifica o método de pagamento
    e calcula as parcelas se aplicável.
    
    Args:
        valor (float): Valor total do pagamento em reais
        metodo_pagamento (str): Método de pagamento
            Opções válidas: 'credito', 'debito', 'pix', 'boleto'
        parcelas (int, optional): Número de parcelas. Default: 1
            Válido apenas para 'credito'
    
    Returns:
        dict: Dicionário com informações do pagamento processado
            {
                'status': str,
                'valor_total': float,
                'valor_parcela': float,
                'parcelas': int
            }
    
    Raises:
        ValueError: Se valor for negativo ou zero
        ValueError: Se método de pagamento for inválido
        ValueError: Se número de parcelas for inválido para o método
    
    Examples:
        >>> processar_pagamento(100.0, 'pix')
        {'status': 'aprovado', 'valor_total': 100.0, ...}
        
        >>> processar_pagamento(300.0, 'credito', parcelas=3)
        {'status': 'aprovado', 'valor_total': 300.0, 'valor_parcela': 100.0, ...}
    
    Note:
        - Pagamentos acima de R$ 5000,00 requerem aprovação manual
        - Parcelamento está limitado a 12 vezes
    
    Version:
        1.2.0 - Adicionado suporte a PIX
    """
    # Implementação aqui
    pass
```

#### **3. Tratamento de Erros**

```python
# ❌ RUIM: Ignora erros silenciosamente
def dividir(a, b):
    try:
        return a / b
    except:
        return None


# ✅ BOM: Trata erros específicos e informa
def dividir(dividendo, divisor):
    """
    Divide dois números.
    
    Args:
        dividendo (float): Número a ser dividido
        divisor (float): Número pelo qual dividir
        
    Returns:
        float: Resultado da divisão
        
    Raises:
        ValueError: Se divisor for zero
        TypeError: Se argumentos não forem numéricos
    """
    if not isinstance(dividendo, (int, float)) or not isinstance(divisor, (int, float)):
        raise TypeError("Ambos argumentos devem ser números")
    
    if divisor == 0:
        raise ValueError("Não é possível dividir por zero")
    
    return dividendo / divisor


# Uso com tratamento adequado
try:
    resultado = dividir(10, 2)
    print(f"Resultado: {resultado}")
except ValueError as e:
    print(f"Erro de valor: {e}")
except TypeError as e:
    print(f"Erro de tipo: {e}")
```

---

## 3. Introdução a Testes Unitários (60 min)

### 📦 Preparando o Ambiente para Testes

Antes de começar com testes, precisamos instalar as ferramentas necessárias.

#### **unittest - Já vem com Python!**

O módulo `unittest` já está incluído na biblioteca padrão do Python, não precisa instalar nada!

```bash
# unittest já está disponível, basta importar
python -c "import unittest; print('unittest disponível!')"
```

#### **pytest - Instalação Necessária**

Para usar o pytest (mais moderno e recomendado), precisamos instalar:

```bash
# Ativar ambiente virtual primeiro (boa prática!)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instalar pytest
pip install pytest

# Instalar com cobertura de código
pip install pytest-cov

# Verificar instalação
pytest --version
```

#### **Coverage - Para Medir Cobertura**

```bash
# Instalar coverage (para usar com unittest)
pip install coverage

# Ou já está incluído se instalou pytest-cov
```

#### **Criando requirements.txt para Testes**

```bash
# Salvar dependências de teste
cat > requirements-test.txt << EOF
pytest==7.4.3
pytest-cov==4.1.0
coverage==7.3.2
EOF

# Instalar de uma vez
pip install -r requirements-test.txt
```

#### **Estrutura de Dependências Recomendada**

```bash
# requirements.txt - Dependências de produção
requests==2.31.0
python-dateutil==2.8.2

# requirements-dev.txt - Dependências de desenvolvimento
-r requirements.txt
pytest==7.4.3
pytest-cov==4.1.0
coverage==7.3.2
black==23.11.0
flake8==6.1.0
pylint==3.0.2
```

### 📖 Conceitos Fundamentais

#### **O que são Testes Unitários?**

**Testes unitários** são testes automatizados que verificam se uma unidade individual de código (geralmente uma função ou método) funciona corretamente de forma isolada.

**Por que testar?**

- ✅ **Confiança:** Garantir que o código funciona como esperado
- ✅ **Documentação:** Testes servem como exemplos de uso
- ✅ **Refatoração segura:** Alterar código sem medo de quebrar funcionalidades
- ✅ **Detecção precoce:** Encontrar bugs antes de chegarem à produção
- ✅ **Design melhor:** Código testável tende a ser mais modular

#### **Princípios de Testes**

**AAA Pattern (Arrange-Act-Assert):**

1. **Arrange:** Preparar os dados e condições
2. **Act:** Executar a função/método testado
3. **Assert:** Verificar se o resultado é o esperado

**Características de Bons Testes:**

- **Independentes:** Não dependem de outros testes
- **Rápidos:** Executam rapidamente
- **Repetíveis:** Sempre produzem o mesmo resultado
- **Claros:** Fácil entender o que está sendo testado
- **Isolados:** Testam apenas uma coisa por vez

### 🎯 Exemplos Práticos com unittest

#### **Exemplo 1: Testando Funções Matemáticas**

```python
# calculadora.py (código a ser testado)
"""Funções matemáticas simples."""

def somar(a, b):
    """Soma dois números."""
    return a + b


def subtrair(a, b):
    """Subtrai dois números."""
    return a - b


def multiplicar(a, b):
    """Multiplica dois números."""
    return a * b


def dividir(a, b):
    """
    Divide dois números.
    
    Raises:
        ValueError: Se divisor for zero
    """
    if b == 0:
        raise ValueError("Não é possível dividir por zero")
    return a / b


def potencia(base, expoente):
    """Calcula base elevada ao expoente."""
    return base ** expoente
```

```python
# test_calculadora.py (testes unitários)
"""Testes para o módulo calculadora."""

import unittest
from calculadora import somar, subtrair, multiplicar, dividir, potencia


class TestCalculadora(unittest.TestCase):
    """Testes para funções de calculadora."""
    
    def test_somar_numeros_positivos(self):
        """Testa soma de números positivos."""
        # Arrange
        a = 5
        b = 3
        esperado = 8
        
        # Act
        resultado = somar(a, b)
        
        # Assert
        self.assertEqual(resultado, esperado)
    
    def test_somar_numeros_negativos(self):
        """Testa soma com números negativos."""
        self.assertEqual(somar(-5, -3), -8)
        self.assertEqual(somar(-5, 3), -2)
    
    def test_somar_com_zero(self):
        """Testa soma com zero."""
        self.assertEqual(somar(5, 0), 5)
        self.assertEqual(somar(0, 5), 5)
    
    def test_subtrair(self):
        """Testa subtração."""
        self.assertEqual(subtrair(10, 3), 7)
        self.assertEqual(subtrair(3, 10), -7)
        self.assertEqual(subtrair(5, 5), 0)
    
    def test_multiplicar(self):
        """Testa multiplicação."""
        self.assertEqual(multiplicar(5, 3), 15)
        self.assertEqual(multiplicar(-5, 3), -15)
        self.assertEqual(multiplicar(5, 0), 0)
    
    def test_dividir_normal(self):
        """Testa divisão normal."""
        self.assertEqual(dividir(10, 2), 5)
        self.assertEqual(dividir(10, 4), 2.5)
    
    def test_dividir_por_zero(self):
        """Testa que divisão por zero levanta exceção."""
        with self.assertRaises(ValueError):
            dividir(10, 0)
    
    def test_potencia(self):
        """Testa potenciação."""
        self.assertEqual(potencia(2, 3), 8)
        self.assertEqual(potencia(5, 2), 25)
        self.assertEqual(potencia(10, 0), 1)


if __name__ == '__main__':
    unittest.main()
```

#### **Como executar os testes:**

```bash
# Executar todos os testes
python -m unittest test_calculadora.py

# Executar com mais detalhes (verbose)
python -m unittest test_calculadora.py -v

# Executar um teste específico
python -m unittest test_calculadora.TestCalculadora.test_somar_numeros_positivos

# Executar todos os testes da pasta
python -m unittest discover
```

#### **Exemplo 2: Testando Validadores**

```python
# test_validadores.py
"""Testes para o módulo validadores."""

import unittest
from validadores import validar_email, validar_cpf, validar_data


class TestValidadores(unittest.TestCase):
    """Testes para funções de validação."""
    
    def test_email_valido(self):
        """Testa emails válidos."""
        emails_validos = [
            'usuario@exemplo.com',
            'nome.sobrenome@empresa.com.br',
            'teste123@test.org',
            'user+tag@domain.co.uk'
        ]
        
        for email in emails_validos:
            with self.subTest(email=email):
                self.assertTrue(
                    validar_email(email),
                    f"Email deveria ser válido: {email}"
                )
    
    def test_email_invalido(self):
        """Testa emails inválidos."""
        emails_invalidos = [
            'email_sem_arroba.com',
            '@sem_usuario.com',
            'sem_dominio@.com',
            'sem_ponto@dominio',
            '',
            None,
            'espaço @email.com'
        ]
        
        for email in emails_invalidos:
            with self.subTest(email=email):
                self.assertFalse(
                    validar_email(email),
                    f"Email deveria ser inválido: {email}"
                )
    
    def test_cpf_valido(self):
        """Testa CPFs com formato válido."""
        cpfs_validos = [
            '123.456.789-00',
            '12345678900',
            '987.654.321-00'
        ]
        
        for cpf in cpfs_validos:
            with self.subTest(cpf=cpf):
                # Note: Este teste assume validação simplificada
                resultado = validar_cpf(cpf)
                self.assertIsInstance(resultado, bool)
    
    def test_cpf_invalido(self):
        """Testa CPFs inválidos."""
        cpfs_invalidos = [
            '111.111.111-11',  # Todos dígitos iguais
            '123.456',          # Incompleto
            '123.456.789-0',    # Falta dígito
            '',
            'abc.def.ghi-jk'   # Letras
        ]
        
        for cpf in cpfs_invalidos:
            with self.subTest(cpf=cpf):
                self.assertFalse(validar_cpf(cpf))
    
    def test_data_valida(self):
        """Testa datas válidas."""
        self.assertTrue(validar_data('15/03/1990'))
        self.assertTrue(validar_data('01/01/2000'))
        self.assertTrue(validar_data('31/12/2023'))
    
    def test_data_invalida(self):
        """Testa datas inválidas."""
        datas_invalidas = [
            '32/01/2023',  # Dia inválido
            '15/13/2023',  # Mês inválido
            '15-03-1990',  # Formato errado
            '2023/03/15',  # Formato errado
            'abc',         # Não é data
            ''
        ]
        
        for data in datas_invalidas:
            with self.subTest(data=data):
                self.assertFalse(validar_data(data))


class TestLimpezaDados(unittest.TestCase):
    """Testes para funções de limpeza."""
    
    def test_limpar_texto(self):
        """Testa limpeza de texto."""
        from limpeza import limpar_texto
        
        self.assertEqual(limpar_texto('  texto   com    espaços  '), 'texto com espaços')
        self.assertEqual(limpar_texto('texto'), 'texto')
        self.assertEqual(limpar_texto(''), '')
    
    def test_padronizar_nome(self):
        """Testa padronização de nomes."""
        from limpeza import padronizar_nome
        
        self.assertEqual(padronizar_nome('joão silva'), 'João Silva')
        self.assertEqual(padronizar_nome('MARIA SANTOS'), 'Maria Santos')
        self.assertEqual(padronizar_nome('pedro de souza'), 'Pedro de Souza')
        self.assertEqual(padronizar_nome('  ana   paula  '), 'Ana Paula')


if __name__ == '__main__':
    unittest.main()
```

#### **Exemplo 3: Testando Classes**

```python
# conta_bancaria.py
"""Classe para representar uma conta bancária."""

class ContaBancaria:
    """Representa uma conta bancária simples."""
    
    def __init__(self, titular, saldo_inicial=0):
        """
        Inicializa uma conta bancária.
        
        Args:
            titular (str): Nome do titular
            saldo_inicial (float): Saldo inicial (padrão: 0)
        """
        if not titular:
            raise ValueError("Titular não pode ser vazio")
        
        if saldo_inicial < 0:
            raise ValueError("Saldo inicial não pode ser negativo")
        
        self.titular = titular
        self._saldo = saldo_inicial
        self._transacoes = []
    
    @property
    def saldo(self):
        """Retorna o saldo atual."""
        return self._saldo
    
    def depositar(self, valor):
        """
        Realiza um depósito.
        
        Args:
            valor (float): Valor a depositar
            
        Raises:
            ValueError: Se valor for negativo ou zero
        """
        if valor <= 0:
            raise ValueError("Valor do depósito deve ser positivo")
        
        self._saldo += valor
        self._transacoes.append(f"Depósito: +R$ {valor:.2f}")
        return self._saldo
    
    def sacar(self, valor):
        """
        Realiza um saque.
        
        Args:
            valor (float): Valor a sacar
            
        Raises:
            ValueError: Se valor for negativo ou zero
            ValueError: Se saldo for insuficiente
        """
        if valor <= 0:
            raise ValueError("Valor do saque deve ser positivo")
        
        if valor > self._saldo:
            raise ValueError("Saldo insuficiente")
        
        self._saldo -= valor
        self._transacoes.append(f"Saque: -R$ {valor:.2f}")
        return self._saldo
    
    def transferir(self, valor, conta_destino):
        """
        Transfere valor para outra conta.
        
        Args:
            valor (float): Valor a transferir
            conta_destino (ContaBancaria): Conta de destino
        """
        self.sacar(valor)  # Valida e debita
        conta_destino.depositar(valor)  # Credita
        self._transacoes.append(f"Transferência para {conta_destino.titular}: -R$ {valor:.2f}")
    
    def extrato(self):
        """Retorna o extrato de transações."""
        return self._transacoes.copy()
```

```python
# test_conta_bancaria.py
"""Testes para a classe ContaBancaria."""

import unittest
from conta_bancaria import ContaBancaria


class TestContaBancaria(unittest.TestCase):
    """Testes para ContaBancaria."""
    
    def setUp(self):
        """Prepara dados para cada teste."""
        # Este método é executado antes de cada teste
        self.conta = ContaBancaria("João Silva", 1000)
    
    def tearDown(self):
        """Limpa após cada teste."""
        # Este método é executado após cada teste
        self.conta = None
    
    def test_criacao_conta_valida(self):
        """Testa criação de conta válida."""
        conta = ContaBancaria("Maria", 500)
        self.assertEqual(conta.titular, "Maria")
        self.assertEqual(conta.saldo, 500)
    
    def test_criacao_conta_sem_saldo_inicial(self):
        """Testa criação de conta sem saldo inicial."""
        conta = ContaBancaria("Pedro")
        self.assertEqual(conta.saldo, 0)
    
    def test_criacao_conta_titular_vazio(self):
        """Testa que titular vazio levanta exceção."""
        with self.assertRaises(ValueError):
            ContaBancaria("")
    
    def test_criacao_conta_saldo_negativo(self):
        """Testa que saldo negativo levanta exceção."""
        with self.assertRaises(ValueError):
            ContaBancaria("João", -100)
    
    def test_deposito_valido(self):
        """Testa depósito válido."""
        saldo_anterior = self.conta.saldo
        self.conta.depositar(500)
        self.assertEqual(self.conta.saldo, saldo_anterior + 500)
    
    def test_deposito_invalido(self):
        """Testa que depósito inválido levanta exceção."""
        with self.assertRaises(ValueError):
            self.conta.depositar(-100)
        
        with self.assertRaises(ValueError):
            self.conta.depositar(0)
    
    def test_saque_valido(self):
        """Testa saque válido."""
        saldo_anterior = self.conta.saldo
        self.conta.sacar(300)
        self.assertEqual(self.conta.saldo, saldo_anterior - 300)
    
    def test_saque_saldo_insuficiente(self):
        """Testa saque com saldo insuficiente."""
        with self.assertRaises(ValueError):
            self.conta.sacar(2000)
    
    def test_saque_valor_invalido(self):
        """Testa saque com valor inválido."""
        with self.assertRaises(ValueError):
            self.conta.sacar(-50)
    
    def test_transferencia_valida(self):
        """Testa transferência válida."""
        conta_destino = ContaBancaria("Maria", 500)
        
        saldo_origem_antes = self.conta.saldo
        saldo_destino_antes = conta_destino.saldo
        
        self.conta.transferir(200, conta_destino)
        
        self.assertEqual(self.conta.saldo, saldo_origem_antes - 200)
        self.assertEqual(conta_destino.saldo, saldo_destino_antes + 200)
    
    def test_extrato(self):
        """Testa geração de extrato."""
        self.conta.depositar(500)
        self.conta.sacar(200)
        
        extrato = self.conta.extrato()
        
        self.assertEqual(len(extrato), 2)
        self.assertIn("Depósito", extrato[0])
        self.assertIn("Saque", extrato[1])


if __name__ == '__main__':
    unittest.main()
```

### 🧪 Introdução ao pytest (Alternativa Moderna)

**pytest** é uma framework de testes mais moderna e pythônica que unittest.

```bash
# Instalar pytest
pip install pytest

# Executar testes
pytest

# Com detalhes
pytest -v

# Com cobertura de código
pip install pytest-cov
pytest --cov=calculadora
```

#### **Exemplo com pytest:**

```python
# test_calculadora_pytest.py
"""Testes com pytest para calculadora."""

import pytest
from calculadora import somar, dividir, potencia


def test_somar():
    """Testa soma."""
    assert somar(2, 3) == 5
    assert somar(-1, 1) == 0
    assert somar(0, 0) == 0


def test_dividir_normal():
    """Testa divisão normal."""
    assert dividir(10, 2) == 5
    assert dividir(9, 3) == 3


def test_dividir_por_zero():
    """Testa divisão por zero."""
    with pytest.raises(ValueError):
        dividir(10, 0)


@pytest.mark.parametrize("base,expoente,esperado", [
    (2, 3, 8),
    (5, 2, 25),
    (10, 0, 1),
    (3, 3, 27),
])
def test_potencia(base, expoente, esperado):
    """Testa potenciação com múltiplos casos."""
    assert potencia(base, expoente) == esperado


# Fixtures - Preparam dados para testes
@pytest.fixture
def conta_teste():
    """Cria uma conta para testes."""
    from conta_bancaria import ContaBancaria
    return ContaBancaria("João", 1000)


def test_deposito_com_fixture(conta_teste):
    """Testa depósito usando fixture."""
    conta_teste.depositar(500)
    assert conta_teste.saldo == 1500
```

### 📊 Cobertura de Testes

**Cobertura de código** mede qual porcentagem do código está sendo testada.

#### **Instalação das Ferramentas**

```bash
# Para usar com unittest
pip install coverage

# Para usar com pytest (mais moderno)
pip install pytest-cov

# Verificar instalação
coverage --version
pytest --version
```

#### **Usando Coverage com unittest**

```bash
# Executar testes com coverage
coverage run -m unittest discover

# Ver relatório no terminal
coverage report

# Exemplo de saída:
# Name                 Stmts   Miss  Cover
# ----------------------------------------
# calculadora.py          15      0   100%
# validadores.py          30      5    83%
# ----------------------------------------
# TOTAL                   45      5    89%

# Gerar relatório HTML (mais visual)
coverage html

# Abre htmlcov/index.html no navegador
# No Linux/Mac:
open htmlcov/index.html
# No Windows:
start htmlcov/index.html

# Ver quais linhas não foram testadas
coverage report -m
```

#### **Usando Coverage com pytest**

```bash
# Executar com cobertura
pytest --cov=src

# Com relatório detalhado
pytest --cov=src --cov-report=term-missing

# Gerar HTML
pytest --cov=src --cov-report=html

# Definir cobertura mínima (falha se menor)
pytest --cov=src --cov-fail-under=80

# Exemplo completo com todas opções
pytest --cov=src --cov-report=html --cov-report=term-missing -v
```

#### **Arquivo de Configuração .coveragerc**

```bash
# Criar arquivo .coveragerc para configurar coverage
cat > .coveragerc << EOF
[run]
source = src
omit = 
    */tests/*
    */venv/*
    */__pycache__/*

[report]
precision = 2
show_missing = True
skip_covered = False

[html]
directory = htmlcov
EOF
```

#### **Meta de Cobertura Recomendada**

- **Iniciantes:** 60-70% é um bom começo
- **Projetos sérios:** 80-85% é recomendado
- **Crítico (financeiro, saúde):** 90%+ é necessário
- **100%:** Nem sempre é necessário ou prático

---

## 🧩 Tópicos Extras Sugeridos

### 1. Logging - Rastreando o que acontece

**Logging** é fundamental para entender o comportamento da aplicação em produção.

```python
# exemplo_logging.py
"""Exemplo de uso de logging."""

import logging
from datetime import datetime

# Configurar logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)


def processar_pedido(pedido_id, valor):
    """Processa um pedido com logging."""
    logger.info(f"Iniciando processamento do pedido {pedido_id}")
    
    try:
        if valor <= 0:
            logger.warning(f"Pedido {pedido_id} com valor inválido: {valor}")
            raise ValueError("Valor deve ser positivo")
        
        logger.debug(f"Validando pedido {pedido_id}...")
        # Processamento aqui
        
        logger.info(f"Pedido {pedido_id} processado com sucesso")
        return True
        
    except Exception as e:
        logger.error(f"Erro ao processar pedido {pedido_id}: {e}", exc_info=True)
        return False


# Níveis de log:
# DEBUG: Informações detalhadas para diagnóstico
# INFO: Confirmação que as coisas estão funcionando
# WARNING: Algo inesperado, mas ainda funciona
# ERROR: Erro sério, funcionalidade falhou
# CRITICAL: Erro grave, programa pode parar
```

### 2. Debugging com pdb

```python
# exemplo_debug.py
"""Exemplo de debugging."""

import pdb

def calcular_desconto(preco, percentual):
    """Calcula desconto."""
    # Inserir breakpoint para debug
    pdb.set_trace()  # Pausa aqui
    
    desconto = preco * (percentual / 100)
    preco_final = preco - desconto
    
    return preco_final


# Comandos do pdb:
# n (next): Próxima linha
# s (step): Entra na função
# c (continue): Continua até próximo breakpoint
# p variavel: Imprime valor da variável
# l (list): Mostra código ao redor
# q (quit): Sai do debugger
```

---

## 🧪 Atividades em Sala

### 📝 **Atividade 1: Validador de Senhas** (25 min)

**Objetivo:** Criar um módulo de validação de senhas com testes.

**Enunciado:**
Crie um arquivo `validador_senha.py` com uma função que valida senhas seguindo estas regras:

- Mínimo de 8 caracteres
- Pelo menos uma letra maiúscula
- Pelo menos uma letra minúscula
- Pelo menos um número
- Pelo menos um caractere especial (@, #, $, %, etc.)

Em seguida, crie `test_validador_senha.py` com pelo menos 5 testes diferentes.

**Resultado Esperado:**

```python
# Testes devem verificar:
# 1. Senha válida
# 2. Senha muito curta
# 3. Sem maiúsculas
# 4. Sem números
# 5. Sem caracteres especiais
```

**Dica:** Use regex (`re` module) para validação.

---

### 📝 **Atividade 2: Sistema de Biblioteca (Dupla)** (25 min)

**Objetivo:** Criar um sistema modularizado de gerenciamento de livros.

**Enunciado:**
Trabalhe em dupla para criar:

1. **Módulo `livro.py`:**
   - Classe `Livro` com atributos: titulo, autor, ano, isbn
   - Método para exibir informações
   
2. **Módulo `biblioteca.py`:**
   - Classe `Biblioteca` que gerencia uma coleção de livros
   - Métodos: adicionar_livro, buscar_por_autor, listar_todos
   
3. **Arquivo `test_biblioteca.py`:**
   - Testes para adicionar livros
   - Testes para buscar livros
   - Teste para listar livros

**Resultado Esperado:**
Sistema funcional que permite gerenciar livros com testes cobrindo as principais funcionalidades.

---

## 🏠 Atividades para Casa

### 📝 **Atividade 1 - SIMPLES: Conversor de Temperaturas**

**Descrição:**
Crie um módulo `conversor.py` com funções para converter temperaturas entre Celsius, Fahrenheit e Kelvin.

**Requisitos:**

- Função `celsius_para_fahrenheit(celsius)`
- Função `fahrenheit_para_celsius(fahrenheit)`
- Função `celsius_para_kelvin(celsius)`
- Função `kelvin_para_celsius(kelvin)`
- Todas as funções devem ter docstrings completas
- Validar que temperatura em Kelvin não pode ser negativa
- Criar arquivo `test_conversor.py` com pelo menos 6 testes

**Exemplo esperado:**

```python
>>> celsius_para_fahrenheit(0)
32.0
>>> celsius_para_fahrenheit(100)
212.0
>>> celsius_para_kelvin(-273.15)
0.0
```

**Critérios de avaliação:**

- ✅ Todas as funções implementadas corretamente
- ✅ Docstrings completas
- ✅ Validações adequadas
- ✅ Pelo menos 6 testes passando

---

### 📝 **Atividade 2 - MÉDIA: Sistema de Notas de Alunos**

**Descrição:**
Crie um sistema completo para gerenciar notas de alunos com validação e testes.

**Estrutura do projeto:**
```
sistema_notas/
├── models/
│   └── aluno.py          # Classe Aluno
├── services/
│   └── calculadora_notas.py  # Lógica de cálculo
├── validators/
│   └── validador_notas.py    # Validação de dados
├── tests/
│   ├── test_aluno.py
│   ├── test_calculadora.py
│   └── test_validador.py
└── main.py
```

**Requisitos:**

1. **Classe Aluno** deve ter:
   - nome, matricula, lista de notas
   - Método para adicionar nota (validando 0-10)
   - Método para calcular média
   - Propriedade `aprovado` (média >= 7.0)

2. **Calculadora de Notas** deve ter:
   - Função para calcular média simples
   - Função para calcular média ponderada
   - Função para determinar conceito (A, B, C, D, F)

3. **Validador** deve ter:
   - Validar se nota está entre 0 e 10
   - Validar se nome tem pelo menos 3 caracteres
   - Validar formato de matrícula (ex: "2024001")

4. **Testes** devem cobrir:
   - Criação de aluno válido e inválido
   - Adição de notas válidas e inválidas
   - Cálculo de médias
   - Determinação de aprovação
   - Todas as validações

**Critérios de avaliação:**

- ✅ Estrutura modular correta (15 pontos)
- ✅ Classes e funções bem documentadas (15 pontos)
- ✅ Validações funcionando (20 pontos)
- ✅ Testes com cobertura >= 80% (30 pontos)
- ✅ Código segue PEP 8 (10 pontos)
- ✅ Tratamento de erros adequado (10 pontos)

---

### 📝 **Atividade 3 - DIFÍCIL: API de Gerenciamento de Tarefas**

**Descrição:**
Desenvolva um sistema completo de gerenciamento de tarefas (To-Do List) com persistência em arquivo, validação robusta e testes abrangentes.

**Funcionalidades:**

1. **Modelo de Dados:**
   - Classe `Tarefa` com: id, titulo, descricao, prioridade (baixa/média/alta), status (pendente/em_progresso/concluida), data_criacao, data_conclusao
   - Classe `GerenciadorTarefas` para gerenciar coleção de tarefas

2. **Operações:**
   - Criar tarefa
   - Listar tarefas (todas, por status, por prioridade)
   - Atualizar tarefa
   - Deletar tarefa
   - Marcar como concluída
   - Estatísticas (total, concluídas, pendentes, etc.)

3. **Persistência:**
   - Salvar tarefas em JSON
   - Carregar tarefas do JSON
   - Backup automático

4. **Validações:**
   - Título obrigatório (3-100 caracteres)
   - Descrição opcional (máx 500 caracteres)
   - Prioridade deve ser válida
   - Não permitir conclusão de tarefa já concluída
   - Validar datas

5. **Tratamento de Dados:**
   - Limpar e normalizar entradas
   - Converter datas para formato padrão
   - Sanitizar strings

6. **Logging:**
   - Registrar todas as operações importantes
   - Log de erros detalhado

7. **Testes:**
   - Testes unitários para todas as classes
   - Testes de integração para fluxo completo
   - Testes de validação
   - Testes de persistência
   - Cobertura mínima: 85%

**Estrutura sugerida:**

```source
gerenciador_tarefas/
├── models/
│   ├── __init__.py
│   ├── tarefa.py
│   └── gerenciador.py
├── services/
│   ├── __init__.py
│   ├── persistencia.py
│   └── estatisticas.py
├── validators/
│   ├── __init__.py
│   └── validador_tarefa.py
├── utils/
│   ├── __init__.py
│   ├── logger.py
│   └── formatadores.py
├── tests/
│   ├── __init__.py
│   ├── test_tarefa.py
│   ├── test_gerenciador.py
│   ├── test_persistencia.py
│   ├── test_validadores.py
│   └── test_integracao.py
├── data/
│   └── tarefas.json
├── logs/
│   └── app.log
├── main.py
├── requirements.txt
└── README.md
```

**Bônus (opcional):**

- CLI interativa com menu
- Exportar relatório em CSV
- Filtros avançados (por data, palavra-chave)
- Ordenação personalizada

**Critérios de avaliação:**

- ✅ Arquitetura modular e organizada (20 pontos)
- ✅ Todas as funcionalidades implementadas (25 pontos)
- ✅ Persistência funcionando corretamente (10 pontos)
- ✅ Validações robustas (15 pontos)
- ✅ Testes abrangentes (cobertura >= 85%) (20 pontos)
- ✅ Logging adequado (5 pontos)
- ✅ Documentação completa (README + docstrings) (5 pontos)

---

## 📚 Materiais e Referências Sugeridas

### 📖 Documentação Oficial

- **Python Official Docs:** https://docs.python.org/3/
- **unittest documentation:** https://docs.python.org/3/library/unittest.html
- **pytest documentation:** https://docs.pytest.org/
- **Python Logging:** https://docs.python.org/3/library/logging.html
- **Python Debugger (pdb):** https://docs.python.org/3/library/pdb.html

### 📚 Livros Recomendados

- **"Clean Code in Python"** - Mariano Anaya
- **"Test-Driven Development with Python"** - Harry Percival
- **"Python Testing with pytest"** - Brian Okken
- **"Effective Python: 90 Specific Ways to Write Better Python"** - Brett Slatkin

### 🎥 Vídeos e Tutoriais

- **Real Python - Testing:** https://realpython.com/python-testing/
- **Corey Schafer - Unit Testing:** https://www.youtube.com/watch?v=6tNS--WetLI
- **Tech With Tim - Python Testing:** https://www.youtube.com/watch?v=bbp_849-RZ4

### 🛠️ Ferramentas

- **pytest:** Framework de testes moderno
- **coverage.py:** Medição de cobertura de testes
- **pylint:** Análise estática de código
- **black:** Formatador automático de código
- **mypy:** Verificação de tipos estática

### 📝