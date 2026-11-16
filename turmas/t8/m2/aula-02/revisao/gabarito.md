# ✅ Gabarito comentado: revisão

**Revisão da Aula 2 do Módulo 2: JOIN e a diferença entre bancos relacionais e não relacionais**

Este arquivo tem as respostas do **exercício em dupla** (o CursoÁgil): as 7 queries, o desafio extra e a Parte B (o comparativo).

> **Como usar o gabarito:** ele não serve para copiar. Serve para **comparar**. Primeiro tente resolver sozinho(a). Depois confira a sua consulta com a daqui. Se o **resultado** da sua consulta for igual ao esperado, **ela também está certa**, mesmo escrita de outro jeito. Em SQL há vários caminhos para a mesma resposta.
>
> Se o seu resultado deu diferente, não apague tudo. Compare **linha por linha** com o gabarito e descubra onde está a diferença.

---

## 📑 Sumário

1. [Parte A: as queries](#-parte-a-as-queries)
2. [Desafio extra](#-desafio-extra-os-alunos-dedicados)
3. [Parte B: o comparativo](#-parte-b-o-comparativo)
4. [Dúvidas que costumam aparecer](#-dúvidas-que-costumam-aparecer)

---

## 👥 Parte A: as queries

### Query 1: o catálogo

```sql
SELECT curso.nome AS curso, professor.nome AS professor, curso.carga_horaria
FROM curso
JOIN professor ON professor.id = curso.professor_id
ORDER BY curso.nome;
```

```
   curso    | professor | carga_horaria
------------+-----------+---------------
 Git        | Ana Lopes |            10
 JavaScript | Rui Prado |            40
 Node.js    | Rui Prado |            50
 SQL        | Ana Lopes |            30
(4 linhas)
```

**Por que funciona:** o curso guarda o `professor_id` (a FK do DER). O `JOIN professor ON professor.id = curso.professor_id` segue essa FK para trazer o **nome** do professor. Como o `nome` existe nas duas tabelas, os apelidos `AS curso` e `AS professor` deixam as colunas do resultado com nomes diferentes.

### Query 2: as matrículas

```sql
SELECT aluno.nome AS aluno, curso.nome AS curso, matricula.nota_final
FROM matricula
JOIN aluno ON aluno.id = matricula.aluno_id
JOIN curso ON curso.id = matricula.curso_id
ORDER BY aluno.nome, curso.nome;
```

```
   aluno    |   curso    | nota_final
------------+------------+------------
 Carla Dias | JavaScript |          9
 Carla Dias | SQL        |          8
 Davi Nunes | JavaScript |          7
 Davi Nunes | SQL        |          6
 Eva Rocha  | Node.js    |         10
(5 linhas)
```

**Por que funciona:** é o **N:N** da revisão da Aula 1: o aluno e o curso só se encontram na tabela associativa `matricula`. Ela fica no `FROM`, e dois `JOIN` seguem as suas duas FKs (`aluno_id` e `curso_id`). A nota está na `matricula` porque é a nota **daquele aluno naquele curso**.

### Query 3: quem nunca se matriculou

```sql
SELECT aluno.nome
FROM aluno
LEFT JOIN matricula ON matricula.aluno_id = aluno.id
WHERE matricula.curso_id IS NULL;
```

```
    nome
------------
 Bia Torres
(1 linha)
```

**Por que funciona:** o `LEFT JOIN` **mantém todos os alunos**. Na Bia, que não tem matrícula, o `matricula.curso_id` fica `NULL`, e o `WHERE ... IS NULL` fica só com esses.

### Query 4: o curso sem alunos

```sql
SELECT curso.nome
FROM curso
LEFT JOIN matricula ON matricula.curso_id = curso.id
WHERE matricula.aluno_id IS NULL;
```

```
 nome
------
 Git
(1 linha)
```

**Por que funciona:** o mesmo padrão da Query 3, agora com o **curso** à esquerda. O `Git` não aparece em nenhuma matrícula.

### Query 5: os professores e seus cursos

```sql
SELECT professor.nome, COUNT(curso.id) AS cursos
FROM professor
LEFT JOIN curso ON curso.professor_id = professor.id
GROUP BY professor.nome
ORDER BY cursos DESC, professor.nome;
```

```
   nome    | cursos
-----------+--------
 Ana Lopes |      2
 Rui Prado |      2
 Caio Mota |      0
(3 linhas)
```

**Por que funciona:** o `LEFT JOIN` mantém o **Caio**, que não dá nenhum curso. O `COUNT(curso.id)` conta só os cursos **que existem** (na linha do Caio, o `curso.id` é `NULL`), então ele aparece com `0`. Com `COUNT(*)`, ele apareceria com `1`.

### Query 6: a nota média

```sql
SELECT curso.nome, ROUND(AVG(matricula.nota_final), 2) AS nota_media
FROM matricula
JOIN curso ON curso.id = matricula.curso_id
GROUP BY curso.nome
ORDER BY nota_media DESC, curso.nome;
```

```
    nome    | nota_media
------------+------------
 Node.js    |      10.00
 JavaScript |       8.00
 SQL        |       7.00
(3 linhas)
```

**Por que funciona:** o `AVG(matricula.nota_final)` faz a média de cada cesta do `GROUP BY curso.nome`. O `JOIN` (e não `LEFT JOIN`) é de propósito: o pedido é "cada curso **que tem matrícula**", então o Git não entra. Conferindo à mão: JavaScript = (9 + 7) / 2 = 8; SQL = (8 + 6) / 2 = 7. No SQLite você verá `10`, `8` e `7`.

### Query 7: os minutos assistidos

```sql
SELECT aluno.nome, SUM(aula.duracao_min) AS minutos_assistidos
FROM conclusao_aula
JOIN aluno ON aluno.id = conclusao_aula.aluno_id
JOIN aula ON aula.id = conclusao_aula.aula_id
GROUP BY aluno.nome
ORDER BY minutos_assistidos DESC, aluno.nome;
```

```
    nome    | minutos_assistidos
------------+--------------------
 Carla Dias |                 50
 Eva Rocha  |                 30
 Davi Nunes |                 20
(3 linhas)
```

**Por que funciona:** outra tabela associativa, a `conclusao_aula` (aluno e aula). Ela fica no `FROM`, e um `JOIN` com `aluno` e outro com `aula` trazem o nome e a duração. O `SUM(aula.duracao_min)` soma, por aluno, os minutos das aulas concluídas. Conferindo: a Carla concluiu `Variáveis` (20) e `Funções` (30): 50.

### 🚀 Desafio extra: os alunos dedicados

```sql
SELECT aluno.nome, COUNT(matricula.curso_id) AS cursos
FROM aluno
JOIN matricula ON matricula.aluno_id = aluno.id
GROUP BY aluno.nome
HAVING COUNT(matricula.curso_id) >= 2
ORDER BY aluno.nome;
```

```
    nome    | cursos
------------+--------
 Carla Dias |      2
 Davi Nunes |      2
(2 linhas)
```

**Por que funciona:** o filtro sobre o **resultado** de uma contagem vai no `HAVING` (depois de agrupar), e não no `WHERE`. A Eva tem 1 curso e a Bia não tem nenhum (e como é `JOIN`, nem aparece).

**Outra forma que também está certa:** `JOIN` e `INNER JOIN` são a mesma coisa. Dá para escrever os `AS` de outro jeito ou ordenar as colunas do `SELECT` de outra forma. O que importa é o **resultado**.

---

## Parte B: o comparativo

### B1: o curso de SQL como documento

```js
{
  _id: 2,
  nome: 'SQL',
  cargaHoraria: 30,
  professor: { nome: 'Ana Lopes', email: 'ana@escola.com' },
  aulas: [
    { numero: 1, titulo: 'SELECT', duracaoMin: 25 },
    { numero: 2, titulo: 'JOIN', duracaoMin: 35 }
  ]
}
```

**Por que funciona:** o `professor` é um objeto **dentro** do curso, e as `aulas` são uma **lista** de objetos. Os dois `JOIN` que o relacional faria (com `professor` e com `aula`) já estão **resolvidos e copiados** dentro do documento. Para ver as aulas do SQL no relacional, seria preciso:

```sql
SELECT aula.titulo
FROM aula
JOIN curso ON curso.id = aula.curso_id
WHERE curso.nome = 'SQL'
ORDER BY aula.numero;
```

```
 titulo
--------
 SELECT
 JOIN
(2 linhas)
```

No documento, é **uma leitura**: `curso.aulas`.

### B2: embutir ou referenciar

| # | Dado | Escolha | Por quê (exemplo de justificativa) |
|---|---|---|---|
| 1 | As **aulas** do curso | **Embutir** | São lidas **sempre junto** do curso e **mudam pouco**. Quem abre o curso quer ver as aulas |
| 2 | O **professor** do curso | **Referenciar** | O e-mail **muda** e o mesmo professor dá **vários** cursos. Copiar dentro de cada curso cria cópias que podem divergir |
| 3 | As **matrículas** (aluno e nota) | **Referenciar** (coleção própria) | É um **N:N** (aluno e curso) que **cresce sem limite**, e a nota pertence ao **par** aluno-curso. Embutir inchava o documento do curso |

**O e-mail do Rui mudou. Em quantos lugares eu mudo?**

- No **relacional**: **1 lugar** (a linha do Rui em `professor`). Todos os cursos dele mostram o e-mail novo, porque só guardam o `professor_id`.
- No **documento com o professor embutido** em cada curso dele: **2 lugares**, porque o Rui dá 2 cursos (e esquecer um deixa o Rui com dois e-mails):

```
 cursos_do_rui
---------------
             2
(1 linha)
```

**Pontos de discussão (qualquer argumento vale, desde que seja um argumento):**
- **Aulas embutidas** também podem ser defendidas como referência se as aulas forem **reaproveitadas por vários cursos**. A pergunta certa é: "a aula pertence a um curso só?"
- **Professor embutido** só é aceitável se o e-mail **da época** for o que interessa guardar (um fato histórico). Aqui o e-mail atual é o que importa, então referenciar vence.
- **Matrículas** poderiam ser embutidas **no documento do aluno** (cada aluno tem poucas). É uma escolha defendível, e o custo é que o relatório "nota média por curso" fica mais difícil.

### 🚀 Resposta esperada para a pergunta em dupla

Qualquer resposta com a mesma ideia vale. A **nota média por curso** fica mais natural no **relacional**:

- **Para a coordenação:** é um `AVG` com `GROUP BY` sobre dados que **já estão ligados** e **cada um em um lugar só**. Uma consulta responde (a Query 6).
- **Num banco de documentos**, a mesma conta exigiria **percorrer** as matrículas (com um `aggregate` mais longo) e confiar que as cópias estão certas. Dá para fazer, mas é o ponto forte do relacional.

---

## ❓ Dúvidas que costumam aparecer

**"O meu resultado ficou igual ao esperado, mas a consulta está escrita diferente. Está errado?"**
Não. Se o resultado é igual, está certo. `JOIN` e `INNER JOIN` são a mesma coisa.

**"Qual a diferença entre `JOIN` e `LEFT JOIN`, em uma frase?"**
O `JOIN` devolve só o que **tem par**. O `LEFT JOIN` devolve **todas** as linhas da tabela da esquerda (a do `FROM`), com `NULL` onde não há par.

**"Deu `column reference "id" is ambiguous`."**
O `id` existe em mais de uma tabela do `FROM`. Escreva `tabela.id` (por exemplo, `curso.id`).

**"Deu `syntax error at or near ";"` num `JOIN`."**
Faltou o `ON` depois do `JOIN`. Todo `JOIN` precisa dizer **qual coluna liga as duas tabelas**.

**"O `JOIN` devolveu um monte de linhas a mais."**
O `ON` está ligando as colunas erradas (ou faltou). O banco combina **cada linha de uma tabela com cada linha da outra**.

**"A Query 3 (ou a 4) devolveu 0 linhas."**
Duas causas comuns: você escreveu `= NULL` (use `IS NULL`) ou usou `JOIN` no lugar de `LEFT JOIN` (o `JOIN` já descarta quem não tem par, então não sobra ninguém para o `IS NULL` achar).

**"O Caio apareceu com 1 curso na Query 5."**
Você usou `COUNT(*)`. Ele conta a linha que o `LEFT JOIN` manteve. Use `COUNT(curso.id)`.

**"Como sei se um dado deve ser embutido ou referenciado?"**
Faça duas perguntas: "ele é lido **sempre junto** com o resto?" (se sim, favorece **embutir**) e "ele **muda** ou é **compartilhado** por vários?" (se sim, favorece **referenciar**).

**"No SQLite os números aparecem diferentes (`10` em vez de `10.00`)."**
É só a forma de mostrar. O valor é o mesmo.

---

**Conseguiu resolver tudo?** Ótimo! Agora **escolha uma pergunta** de um app que você usa e escreva a consulta (ou o documento) que a responde. Quem consegue criar o problema entende o conteúdo de verdade. 🚀