# Tutorial: Como Baixar Dataset do Kaggle e Importar no pgAdmin4

## Parte 1: Baixando o Dataset do Kaggle

### Passo 1: Criar uma Conta no Kaggle

1. Acesse o site [www.kaggle.com](https://www.kaggle.com/)
2. Clique em **"Register"** (Registrar) no canto superior direito
3. Preencha seus dados ou faça login com Google/Facebook
4. Confirme seu e-mail, se necessário

### Passo 2: Encontrar o Dataset

1. Na página inicial do Kaggle, clique em **"Datasets"** no menu superior
2. Use a barra de pesquisa para encontrar o dataset desejado
3. Ou navegue pelas categorias disponíveis

### Passo 3: Baixar o Arquivo CSV

1. Clique no dataset escolhido para abrir sua página
2. No lado direito da página, clique no botão **"Download"** (ícone de seta para baixo)
3. O arquivo será baixado como um arquivo `.zip` ou diretamente como `.csv`
4. Se for `.zip`, extraia o arquivo para uma pasta de fácil acesso
5. **Anote o local onde salvou o arquivo CSV!**

### Passo 4: Verificar o Arquivo

1. Abra o arquivo CSV em um editor de texto (Bloco de Notas) ou Excel
2. Observe:
   - Os nomes das colunas (primeira linha)
   - O tipo de dados em cada coluna (números, texto, datas)
   - O separador usado (geralmente vírgula `,` ou ponto e vírgula `;`)

---

## Parte 2: Preparando o Banco de Dados no pgAdmin4

### Passo 5: Abrir o pgAdmin4

1. Abra o aplicativo **pgAdmin4** no seu computador
2. Conecte-se ao servidor PostgreSQL
3. Digite a senha do banco de dados, se solicitado

### Passo 6: Criar um Banco de Dados (se ainda não tiver)

1. No painel esquerdo, clique com o botão direito em **"Databases"**
2. Selecione **"Create" → "Database..."**
3. Digite um nome para o banco (ex: `meu_projeto`)
4. Clique em **"Save"**

### Passo 7: Criar uma Tabela

1. Expanda o banco de dados criado no painel esquerdo
2. Clique com o botão direito em **"Schemas" → "public" → "Tables"**
3. Selecione **"Create" → "Table..."**

### Passo 8: Definir a Estrutura da Tabela

1. Na aba **"General"**:
   - Digite um nome para a tabela (ex: `vendas`, `clientes`)

2. Vá para a aba **"Columns"**:
   - Clique no ícone **"+"** para adicionar cada coluna
   - Para cada coluna do seu CSV, defina:
     - **Name**: nome da coluna (igual ao cabeçalho do CSV)
     - **Data type**: tipo de dado (text, integer, numeric, date, etc.)
     - **Length**: tamanho (se aplicável)

   **Exemplo:**

   ```text
   id          → integer
   nome        → character varying (length: 100)
   idade       → integer
   salario     → numeric
   data_entrada → date
   ```

3. Clique em **"Save"**

---

## Parte 3: Importando o Arquivo CSV

### Passo 9: Usar a Ferramenta de Importação

1. No painel esquerdo, localize a tabela que você criou
2. Clique com o botão direito na tabela
3. Selecione **"Import/Export Data..."**

### Passo 10: Configurar a Importação

1. Na janela que abrir:
   - **Import/Export**: Selecione **"Import"**
   - **Filename**: Clique no ícone de pasta e navegue até o arquivo CSV
   - **Format**: Selecione **"csv"**

2. Na aba **"Options"**:
   - **Header**: Marque como **"Yes"** (se seu CSV tem cabeçalho na primeira linha)
   - **Delimiter**: Digite a vírgula `,` (ou o separador usado no seu arquivo)
   - **Quote**: Deixe aspas duplas `"`
   - **Escape**: Deixe aspas duplas `"`
   - **Encoding**: Selecione **"UTF8"** (ou o encoding do seu arquivo)

3. Clique em **"OK"**

### Passo 11: Verificar a Importação

1. Aguarde o processo de importação terminar
2. Uma mensagem de sucesso aparecerá mostrando quantas linhas foram importadas
3. Para verificar os dados:
   - Clique com o botão direito na tabela
   - Selecione **"View/Edit Data" → "All Rows"**
   - Os dados do CSV estarão visíveis!

---

## Problemas Comuns e Soluções

### ❌ Erro: "Coluna não encontrada"

**Solução:** Verifique se os nomes das colunas na tabela são exatamente iguais aos do CSV (incluindo maiúsculas/minúsculas)

### ❌ Erro: "Tipo de dado incompatível"

**Solução:** Verifique se os tipos de dados das colunas correspondem aos valores no CSV

### ❌ Erro: "Encoding inválido"

**Solução:** Tente mudar o encoding para **"LATIN1"** ou **"WIN1252"**

### ❌ CSV com ponto e vírgula como separador

**Solução:** No Passo 10, altere o **Delimiter** de `,` para `;`

### ❌ Valores com vírgula no meio (ex: "São Paulo, SP")

**Solução:** Certifique-se de que o **Quote** está configurado corretamente como `"`

---

## Dicas Extras

✅ **Faça um backup:** Antes de importar dados importantes, faça backup do banco

✅ **Teste com poucos dados:** Primeiro, teste com um CSV pequeno para validar o processo

✅ **Use nomes em minúsculas:** No PostgreSQL, é recomendado usar nomes de tabelas e colunas em minúsculas sem espaços

✅ **Documente:** Anote os tipos de dados usados para referência futura

---

## Resumo Rápido

1. **Baixar** → Kaggle → Download do CSV
2. **Preparar** → pgAdmin4 → Criar banco e tabela
3. **Importar** → Right-click na tabela → Import/Export
4. **Verificar** → View/Edit Data → Conferir os dados