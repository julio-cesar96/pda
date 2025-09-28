# Rodar Python no VS Code — Passo a passo

> Guia prático em português para configurar o ambiente e executar códigos Python usando o Visual Studio Code (VS Code).

---

## Checklist rápido

* [ ] Python instalado e acessível via terminal
* [ ] VS Code instalado
* [ ] Extensão **Python** (Microsoft) instalada no VS Code
* [ ] Interpretador Python selecionado no VS Code
* [ ] (Opcional) Ambiente virtual criado e ativado por projeto

---

## 1. Pré-requisitos

* Acesso à internet para baixar instaladores (uma vez).
* Permissão para instalar programas na sua máquina.

---

## 2. Instalar o Python

**Windows / macOS / Linux** — opção oficial: baixe em [https://www.python.org/downloads](https://www.python.org/downloads)

### Windows

1. Baixe o instalador para Windows (ex.: `Windows installer (64-bit)`).
2. Execute o instalador e **marque** a opção **"Add Python to PATH"** antes de clicar em Install.
3. Após a instalação, abra o Prompt de Comando (`cmd`) e rode:

```bash
python --version
```

ou

```bash
python3 --version
```

Deve aparecer algo como `Python 3.x.x`.

### macOS

* Opção 1 (recomendada para usuários avançados): usar Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install python
```

* Opção 2: baixar o instalador em python.org.

Verifique com:

```bash
python3 --version
```

### Linux (ex.: Ubuntu/Debian)

```bash
sudo apt update
sudo apt install python3 python3-venv python3-pip -y
python3 --version
```

---

## 3. Instalar o VS Code

Baixe em [https://code.visualstudio.com](https://code.visualstudio.com) e instale.

Opcional (via terminal):

* macOS (Homebrew): `brew install --cask visual-studio-code`
* Linux (snap): `sudo snap install --classic code`

---

## 4. Instalar extensões úteis no VS Code

No VS Code, abra **Extensões** (`Ctrl+Shift+X` / `Cmd+Shift+X`) e instale:

* **Python** (Microsoft) — obrigatório para suporte a execução, linting e debug.
* **Pylance** — linguagem/serviços (melhor autocomplete e análise).
* **Jupyter** — se você usar notebooks `.ipynb`.

---

## 5. Selecionar o interpretador Python no VS Code

1. Abra o VS Code.
2. Pressione `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (macOS).
3. Digite **Python: Select Interpreter** e selecione o interpretador desejado (ex.: `Python 3.x (…/python)`).

> Isso garante que o VS Code use a mesma versão do Python que você instalou e que o terminal integrado aponte para o Python correto.

---

## 6. Criar e executar um arquivo Python simples

1. Crie um arquivo `hello.py` com o conteúdo:

```python
print("Olá, mundo!")
```

2 opções para executar:

**a) Pelo terminal integrado**

* Abra o terminal integrado: `Ctrl+` (acento grave) ou `View → Terminal`.
* Rode:

```bash
python hello.py
```

ou

```bash
python3 hello.py
```

**b) Pelo botão "Run" do VS Code**

* Abra `hello.py` e clique no botão ▶️ (Run) no canto superior direito do editor.

---

## 7. Ambiente virtual (recomendado para projetos)

Criar um ambiente virtual isola dependências por projeto.

### Criar

```bash
python -m venv .venv
```

(use `python3 -m venv .venv` se for necessário)

### Ativar

* **Windows (Prompt de Comando)**

```cmd
.venv\Scripts\activate
```

* **Windows (PowerShell)**

```powershell
.\.venv\Scripts\Activate.ps1
```

* **macOS / Linux**

```bash
source .venv/bin/activate
```

Após ativar, o prompt do terminal mostra `(.venv)`.

### Instalar pacotes

```bash
python -m pip install --upgrade pip
python -m pip install requests flask
```

> Use `python -m pip` para garantir que o `pip` corresponde ao interpretador/ambiente correto.

---

## 8. Depuração (debug)

1. Abra o arquivo Python que quer debugar.
2. Clique na margem esquerda do editor para inserir breakpoints (pontos vermelhos).
3. Pressione `F5` para iniciar o Debug (ou vá em Run → Start Debugging).
4. No primeiro uso, escolha o tipo de configuração `Python File` ou `Flask`/`Django` conforme o projeto.

Controles úteis no painel de debug: continuar (F5), step over (F10), step into (F11), step out (Shift+F11), parar.

---

## 9. Trabalhando com notebooks (opcional)

* Instale a extensão **Jupyter**.
* Abra arquivos `.ipynb` ou crie um novo: `View → Command Palette → Jupyter: Create New Blank Notebook`.
* Cada célula roda com ▶️ ou `Shift+Enter`.

---

## 10. Solução de problemas comuns

* **Comando `python` não encontrado**: Reinstale o Python e marque **Add Python to PATH** (Windows), ou use `python3` no macOS/Linux.
* **VS Code não encontra interpretador**: `Ctrl+Shift+P` → `Python: Select Interpreter` e escolha o correto.
* **Packages instalados mas não importam**: verifique se o ambiente virtual está ativado e se você usou `python -m pip install ...`.
* **Erro no PowerShell ao ativar venv**: pode ser necessário ajustar a política de execução; alternativa: usar o Prompt de Comando (`cmd`) para ativar.

---

## 11. Comandos úteis (resumo)

```bash
# verificar versão
python --version
python3 --version

# criar venv
python -m venv .venv

# ativar (mac/linux)
source .venv/bin/activate

# ativar (windows cmd)
.venv\Scripts\activate

# instalar pacote
python -m pip install nome_do_pacote

# rodar arquivo
python nome_arquivo.py
```

---

## 12. Dicas finais

* Use **.venv** ou **.env** no `.gitignore` para não subir ambientes ao repositório.
* Instale **Pylance** para uma melhor experiência de autocomplete e checagem de tipos.
* Se usar muitos notebooks, prefira a extensão **Jupyter** do VS Code.
