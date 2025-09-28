# 🏠 Atividades para Casa

## 📝 **Atividade 1 - SIMPLES**

Crie um programa que:

- Leia um arquivo de texto com uma lista de palavras (uma por linha)
- Conte quantas palavras têm mais de 5 letras
- Salve o resultado em um arquivo JSON com o formato:

```json
{
    "total_palavras": 100,
    "palavras_grandes": 45,
    "porcentagem": 45.0
}
```

## 📝 **Atividade 2 - MÉDIA**

Desenvolva um sistema de notas que:

- Leia dados de alunos de um CSV (nome, nota1, nota2, nota3)
- Calcule a média de cada aluno
- Determine se foi aprovado (média ≥ 7.0)
- Gere um relatório em JSON com estatísticas da turma:
  - Quantidade de aprovados/reprovados
  - Média geral da turma
  - Maior e menor nota
- Use funções separadas para cada operação

## 📝 **Atividade 3 - DIFÍCIL**

Crie um sistema completo de gerenciamento de biblioteca que:

- Tenha classes para `Livro`, `Usuario` e `Biblioteca`
- Permita cadastrar livros e usuários
- Implemente empréstimo e devolução
- Salve todos os dados em arquivos JSON
- Tenha funcionalidade para:
  - Gerar relatório de livros mais emprestados (CSV)
  - Buscar informações de livros em uma API pública (ex: Open Library)
  - Importar lista de livros de um CSV
- Use tratamento de exceções adequado
- Implemente log de operações em arquivo de texto