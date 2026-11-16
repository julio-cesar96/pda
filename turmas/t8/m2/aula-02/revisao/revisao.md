# 🔄 Aula de revisão: JOIN e a diferença entre bancos relacionais e não relacionais

**Revisão da Aula 2 do Módulo 2: SQL na prática, bancos não relacionais e busca semântica**

Hoje não tem conteúdo novo. Vamos **reativar** o que você já viu, em 25 minutos, com **mais atenção** a duas coisas: os **comandos de `JOIN`** e a **diferença entre bancos relacionais e não relacionais**. Depois você vai **escrever queries e comparar os bancos**, em dupla.

Os exemplos da revisão são da **MúsicaÁgil**, um app de música. O exercício, mais adiante, usa outro cenário: o **CursoÁgil**.

> **Regra de ouro (a mesma de sempre):** escreva uma consulta, rode, olhe o resultado. Rodou, viu, entendeu. Se der erro, leia a mensagem com calma: ela é uma pista, não uma bronca.
>
> O material completo continua no `README.md` da Aula 2. Aqui está só o essencial.

---

## 📑 Sumário

1. [Roteiro do dia](#roteiro-do-dia)
2. [Como usar este material](#-como-usar-este-material)
3. [Aquecimento](#-aquecimento-3-min)
4. [Bloco 1: SELECT em um minuto](#bloco-1--select-em-um-minuto-3-min)
5. [Bloco 2: os comandos de JOIN](#bloco-2--os-comandos-de-join-10-min)
6. [Bloco 3: relacional x não relacional](#bloco-3--relacional-x-não-relacional-9-min)
7. [Exercício em dupla: o CursoÁgil](#-exercício-em-dupla-o-cursoágil)
8. [Fechamento](#-fechamento-15-min)

---

## Roteiro do dia

| Parte | Tempo | O que acontece |
|---|---|---|
| Revisão | até **25 min** | Aquecimento e 3 blocos (o peso está nos blocos 2 e 3) |
| Exercício em dupla | até **45 min** | O CursoÁgil: 7 queries e um comparativo de bancos |
| Fechamento | **15 min** | Correção ao vivo, retrospectiva e próximo passo |

**Dentro da revisão:**

| Tempo | O que acontece |
|---|---|
| 0 a 3 min | Aquecimento: o que você lembra? |
| 3 a 6 min | Bloco 1: `SELECT` em um minuto |
| 6 a 16 min | Bloco 2: os comandos de `JOIN` |
| 16 a 25 min | Bloco 3: relacional x não relacional |

---

## 💻 Como usar este material

Use o **mesmo playground da Aula 2**: o **[PGlite](https://pglite.dev)** (PostgreSQL no navegador, sem conta) ou, se ele não carregar, o **[Sqlime](https://sqlime.org)** (SQLite no navegador).

1. Abra o playground.
2. Copie **todo** o conteúdo do arquivo [`livecoding/setup-revisao.sql`](livecoding/setup-revisao.sql), cole e execute. Ele cria **dois mini-bancos**: a **MúsicaÁgil** (exemplos da revisão) e o **CursoÁgil** (exercício).
3. Confira que deu certo. Rode as duas consultas abaixo, uma de cada vez:

```sql
SELECT COUNT(*) FROM musica;
SELECT COUNT(*) FROM curso;
```

> Resultado esperado: `4` e `4`.

> **Atenção:** os dados ficam **só no seu navegador**. Se você recarregar a página, eles somem. Basta colar o `setup-revisao.sql` de novo.
>
> **Diferença que você pode notar:** o PostgreSQL mostra `10.00` onde o SQLite mostra `10`. O valor é o mesmo.

Para o arquivo de JavaScript:

```bash
node livecoding/revisao-documentos.js
```

Os resultados mostrados neste material foram conferidos no **PostgreSQL 18** e no **SQLite**, e deram igual nos dois.

---

## 🔥 Aquecimento (3 min)

Sem olhar o material, responda em voz alta ou numa folha. Se não lembrar, tudo bem: **errar aqui é o objetivo**, porque mostra o que precisa ser revisto.

1. Qual a diferença entre `JOIN` e `LEFT JOIN`? O que aparece no resultado para uma playlist **sem nenhuma música**?
2. O `JOIN` liga duas tabelas **seguindo o quê**?
3. Uma playlist guardada num banco **relacional** e a mesma playlist guardada num banco de **documentos**: qual das duas é "uma ficha só, com tudo dentro"?

<details>
<summary>💡 Ver respostas</summary>

1. O `JOIN` devolve só as linhas que **têm par** nas duas tabelas. O `LEFT JOIN` devolve **todas** as linhas da tabela da esquerda, e a playlist sem música aparece com o campo da música **vazio** (`NULL`).
2. Seguindo a **chave estrangeira** (FK) até a chave primária (PK): `ON tabela.fk = outra.id`.
3. A de **documentos**: a playlist inteira, com as músicas **embutidas**. No relacional ela fica espalhada em tabelas ligadas por id.

</details>

---

## Bloco 1 · SELECT em um minuto (3 min)

**Objetivo:** lembrar a receita de uma consulta antes de ligar tabelas.

| Peça | Para que serve |
|---|---|
| `SELECT` | **Quais colunas** eu quero ver |
| `FROM` | **De qual tabela** |
| `WHERE` | **Quais linhas** (filtro) |
| `ORDER BY` | Em **que ordem** (`DESC` = do maior para o menor) |
| `LIMIT` | **Quantas linhas**, no máximo |

Duas consultas rápidas na MúsicaÁgil:

```sql
SELECT titulo
FROM musica
ORDER BY titulo;
```

```
    titulo
---------------
 Maré Alta
 Noite Longa
 Sol de Verão
 Trem das Onze
(4 linhas)
```

```sql
SELECT COUNT(*) AS musicas
FROM musica;
```

```
 musicas
---------
       4
(1 linha)
```

**✅ Checkpoint:** o que a consulta `SELECT titulo FROM musica ORDER BY titulo DESC LIMIT 2;` devolve?

<details>
<summary>💡 Ver resposta</summary>

Os **2 últimos** títulos em ordem alfabética: `Trem das Onze` e `Sol de Verão`. O `DESC` inverte a ordem e o `LIMIT 2` pega só as duas primeiras linhas dessa ordem.

</details>

---

## Bloco 2 · Os comandos de JOIN (10 min)

**Objetivo:** juntar tabelas com `JOIN` e `LEFT JOIN`, atravessar o N:N e achar "quem não tem par".

**O porquê:** o `JOIN` é a pergunta **"seguindo a seta da FK, quem está ligado a quem?"**. Existem **duas** situações, e a diferença entre elas é o que se cobra em prova e em entrevista:

| | O que devolve | Use quando |
|---|---|---|
| `JOIN` (ou `INNER JOIN`) | Só as linhas que **têm par** nas duas tabelas | Você só quer o que **está ligado** |
| `LEFT JOIN` | **Todas** as linhas da tabela da **esquerda** (a do `FROM`), com `NULL` onde não há par | Você quer **manter** quem não tem par |

**A receita de um `JOIN`, em 3 passos:**

1. `FROM` a tabela **principal** (a que você quer listar).
2. `JOIN outra ON outra.pk = principal.fk` (o `ON` diz **qual coluna liga as duas**).
3. Se precisar de mais uma tabela, **repita** o `JOIN ... ON ...`.

### 🎨 Redesenhe com a turma no Excalidraw: o JOIN e o LEFT JOIN
**Tempo de desenho:** até 3 min (use o [guia rápido do Excalidraw](../AULA-1/README.md#guia-rápido-do-excalidraw) da Aula 1 do M2)

**Ordem do desenho:**
1. Tabela `PLAYLIST` com 3 linhas: Treino (1), Estudo (2), Para depois (3) (🔵)
2. Tabela `ITEM_PLAYLIST` (a "ponte") com as colunas `playlist_id` e `musica_id` e algumas linhas (🔵)
3. **Setas** de cada linha da `ITEM_PLAYLIST` até a playlist para a qual `playlist_id` aponta (🟡)
4. A linha **"Para depois"** sem nenhuma seta chegando (🔴)
5. Duas anotações: `JOIN` → "a Para depois **some**" e `LEFT JOIN` → "a Para depois **fica**, com o campo da música vazio" (🟢)

**Esboço do layout:**
```
 PLAYLIST                    ITEM_PLAYLIST
 ┌────┬─────────────┐        ┌─────────────┬───────────┐
 │ id │ nome        │        │ playlist_id │ musica_id │
 ├────┼─────────────┤        ├─────────────┼───────────┤
 │ 1  │ Treino      │◀───────│ 1           │ 1         │
 │    │             │◀───────│ 1           │ 3         │
 │ 2  │ Estudo      │◀───────│ 2           │ 1         │
 │ 3  │ Para depois │        │ ...         │ ...       │
 └────┴─────────────┘        └─────────────┴───────────┘
   🔴 nenhuma seta chega em "Para depois"
   JOIN: ela some    ·    LEFT JOIN: ela fica, com o campo da música vazio
```

**Pergunta para a turma antes de revelar:** "Se eu juntar as duas tabelas, quantas linhas vão aparecer para 'Para depois'? E no `LEFT JOIN`?" (No `JOIN`: nenhuma. No `LEFT JOIN`: uma.)

### As consultas

**1:N com `JOIN`:** cada música com o nome do artista.

```sql
SELECT musica.titulo, artista.nome AS artista
FROM musica
JOIN artista ON artista.id = musica.artista_id
ORDER BY musica.id;
```

```
    titulo     |    artista
---------------+----------------
 Sol de Verão  | Banda Litoral
 Maré Alta     | Banda Litoral
 Trem das Onze | Zeca do Bairro
 Noite Longa   | Zeca do Bairro
(4 linhas)
```

**`LEFT JOIN` + `COUNT`:** quantas músicas cada artista tem (o Duo Sereno não tem nenhuma e **fica**, com `0`).

```sql
SELECT artista.nome, COUNT(musica.id) AS musicas
FROM artista
LEFT JOIN musica ON musica.artista_id = artista.id
GROUP BY artista.nome
ORDER BY musicas DESC, artista.nome;
```

```
      nome      | musicas
----------------+---------
 Banda Litoral  |       2
 Zeca do Bairro |       2
 Duo Sereno     |       0
(3 linhas)
```

**N:N com três tabelas:** a playlist e a música só se encontram na tabela associativa `item_playlist`.

```sql
SELECT playlist.nome AS playlist, item_playlist.posicao, musica.titulo
FROM item_playlist
JOIN playlist ON playlist.id = item_playlist.playlist_id
JOIN musica ON musica.id = item_playlist.musica_id
ORDER BY playlist.id, item_playlist.posicao;
```

```
 playlist | posicao |    titulo
----------+---------+---------------
 Treino   |       1 | Sol de Verão
 Treino   |       2 | Trem das Onze
 Estudo   |       1 | Sol de Verão
 Estudo   |       2 | Maré Alta
 Estudo   |       3 | Trem das Onze
(5 linhas)
```

**`LEFT JOIN` encadeado:** todas as playlists com suas músicas, **inclusive a vazia**.

```sql
SELECT playlist.nome AS playlist, musica.titulo
FROM playlist
LEFT JOIN item_playlist ON item_playlist.playlist_id = playlist.id
LEFT JOIN musica ON musica.id = item_playlist.musica_id
ORDER BY playlist.id, item_playlist.posicao;
```

```
  playlist   |    titulo
-------------+---------------
 Treino      | Sol de Verão
 Treino      | Trem das Onze
 Estudo      | Sol de Verão
 Estudo      | Maré Alta
 Estudo      | Trem das Onze
 Para depois |
(6 linhas)
```

**"Quem não tem par?" com `LEFT JOIN` + `IS NULL`:** as playlists vazias.

```sql
SELECT playlist.nome
FROM playlist
LEFT JOIN item_playlist ON item_playlist.playlist_id = playlist.id
WHERE item_playlist.musica_id IS NULL;
```

```
    nome
-------------
 Para depois
(1 linha)
```

O **mesmo padrão** serve para outra pergunta: "quais músicas não estão em nenhuma playlist?" Só trocamos a tabela da esquerda:

```sql
SELECT musica.titulo
FROM musica
LEFT JOIN item_playlist ON item_playlist.musica_id = musica.id
WHERE item_playlist.playlist_id IS NULL;
```

```
   titulo
-------------
 Noite Longa
(1 linha)
```

### As três armadilhas do JOIN

| Armadilha | O que acontece | Como evitar |
|---|---|---|
| **Esquecer o `ON`** (ou ligar a coluna errada) | O banco combina **cada linha com cada linha**: 3 playlists × 4 músicas = **12** linhas, em vez das 5 que existem | Todo `JOIN` leva um `ON` que liga a **FK** à **PK** |
| **`= NULL`** em vez de `IS NULL` | Devolve **0 linhas, sem erro** | Para "não tem par", use `IS NULL` |
| **`COUNT(*)`** com `LEFT JOIN` | O artista sem música aparece com **1**, em vez de 0 | Conte uma coluna da tabela **da direita**: `COUNT(musica.id)` |

Os resultados errados:

```
 linhas
--------
     12
(1 linha)
```

```
 nome
------
(0 linhas)
```

```
      nome      | musicas
----------------+---------
 Banda Litoral  |       2
 Zeca do Bairro |       2
 Duo Sereno     |       1
(3 linhas)
```

**💬 E daí?** "Quais playlists estão vazias?" e "quais músicas ninguém colocou numa playlist?" viram **limpeza do catálogo** e **sugestão para o usuário**. O `LEFT JOIN ... IS NULL` responde as duas em uma consulta.

**✅ Checkpoint:** "Quais **usuários** não criaram nenhuma playlist?" Escreva só o esqueleto: qual tabela fica no `FROM`, qual é o `JOIN` e qual é o filtro?

<details>
<summary>💡 Ver resposta</summary>

```sql
SELECT usuario.nome
FROM usuario
LEFT JOIN playlist ON playlist.usuario_id = usuario.id
WHERE playlist.id IS NULL;
```

`usuario` fica no `FROM` (a tabela que você quer **listar**), o `LEFT JOIN` mantém todos os usuários, e o `IS NULL` fica só com quem não tem par. O resultado é a **Lia**.

</details>

---

## Bloco 3 · Relacional x não relacional (9 min)

**Objetivo:** entender, com **a mesma playlist nos dois bancos**, o que cada um ganha e o que cada um custa.

**O porquê:** no **relacional**, os dados ficam em **tabelas separadas**, ligadas por id, e **cada informação mora em um lugar só**. Num banco de **documentos**, a playlist é **uma ficha com tudo dentro**: as músicas vão **embutidas**. Analogia: o arquivo de gavetas (várias fichas ligadas por número) contra a pasta da playlist (tudo grampeado).

### 🎨 Redesenhe com a turma no Excalidraw: a mesma playlist em dois bancos
**Tempo de desenho:** até 3 min

**Ordem do desenho:**
1. À esquerda, o **relacional**: três caixas, `PLAYLIST`, `ITEM_PLAYLIST` e `MUSICA`, ligadas por setas (🔵)
2. À direita, o **documento**: **uma** caixa grande com `playlist: Estudo` e `musicas: [ {Sol de Verão}, {Maré Alta}, {Trem das Onze} ]` **dentro** (🟢)
3. Embaixo do relacional: "**Sol de Verão** mora em **1 lugar**" (🟢)
4. Embaixo do documento, em vermelho: "**Sol de Verão** é **copiado** em cada playlist" (🔴)

**Esboço do layout:**
```
 RELACIONAL                                    DOCUMENTO
 PLAYLIST ◀── ITEM_PLAYLIST ──▶ MUSICA         ┌─────────────────────────────┐
 (ler a playlist = 2 JOIN)                     │ playlist Estudo             │
                                               │  musicas: [ {Sol de Verão}, │
 🟢 "Sol de Verão" mora em 1 lugar (MUSICA)    │             {Maré Alta},    │
                                               │             {Trem das Onze}]│
                                               └─────────────────────────────┘
                                               🔴 "Sol de Verão" é copiado em cada playlist
```

**Pergunta para a turma antes de revelar o vermelho:** "Se a música for renomeada, em quantos lugares eu mudo no relacional? E no documento?"

### A mesma pergunta, nos dois bancos

**Pergunta 1: "Quais as músicas da playlist Estudo?"**

No **relacional**, um `JOIN` em três tabelas:

```sql
SELECT musica.titulo
FROM item_playlist
JOIN playlist ON playlist.id = item_playlist.playlist_id
JOIN musica ON musica.id = item_playlist.musica_id
WHERE playlist.nome = 'Estudo'
ORDER BY item_playlist.posicao;
```

```
    titulo
---------------
 Sol de Verão
 Maré Alta
 Trem das Onze
(3 linhas)
```

No **documento**, uma busca só (arquivo `livecoding/revisao-documentos.js`):

```js
// A MúsicaÁgil como DOCUMENTOS: cada playlist leva as músicas (e o artista) dentro dela.
const playlists = [
  { _id: 1, nome: 'Treino', dono: 'Marina',
    musicas: [{ titulo: 'Sol de Verão', artista: 'Banda Litoral' }, { titulo: 'Trem das Onze', artista: 'Zeca do Bairro' }] },
  { _id: 2, nome: 'Estudo', dono: 'Diego',
    musicas: [{ titulo: 'Sol de Verão', artista: 'Banda Litoral' }, { titulo: 'Maré Alta', artista: 'Banda Litoral' }, { titulo: 'Trem das Onze', artista: 'Zeca do Bairro' }] },
  { _id: 3, nome: 'Para depois', dono: 'Diego', musicas: [] },
];

// 1) As músicas da playlist "Estudo": UMA busca, sem JOIN
const estudo = playlists.find(p => p.nome === 'Estudo');
console.log(estudo.musicas.map(m => m.titulo));

// 2) Em quantas playlists "Sol de Verão" aparece?
console.log(playlists.filter(p => p.musicas.some(m => m.titulo === 'Sol de Verão')).length);

// 3) O custo da cópia: a música foi renomeada, mas só a playlist 1 foi corrigida
const depoisDeRenomear = playlists.map(p =>
  p._id === 1
    ? { ...p, musicas: p.musicas.map(m => (m.titulo === 'Sol de Verão' ? { ...m, titulo: 'Sol de Verão (Ao Vivo)' } : m)) }
    : p
);
console.log(
  depoisDeRenomear
    .flatMap(p => p.musicas)
    .filter(m => m.artista === 'Banda Litoral' && m.titulo.startsWith('Sol'))
    .map(m => m.titulo)
);
```

Resultado esperado no terminal (`node livecoding/revisao-documentos.js`):

```
[ 'Sol de Verão', 'Maré Alta', 'Trem das Onze' ]
2
[ 'Sol de Verão (Ao Vivo)', 'Sol de Verão' ]
```

1. `[ 'Sol de Verão', 'Maré Alta', 'Trem das Onze' ]`: as músicas da playlist Estudo, de **uma leitura só**, **sem `JOIN`**.
2. `2`: "Sol de Verão" aparece em **2** playlists (no SQL, a pergunta 2 abaixo dá o mesmo número).
3. `[ 'Sol de Verão (Ao Vivo)', 'Sol de Verão' ]`: a música foi renomeada **só na playlist 1**. Agora existe **a mesma música com dois nomes**. É a **anomalia de atualização** da Aula 1, num banco de documentos.

**Pergunta 2: "Em quantas playlists o 'Sol de Verão' aparece?"**

```sql
SELECT COUNT(*) AS playlists
FROM item_playlist
WHERE musica_id = 1;
```

```
 playlists
-----------
         2
(1 linha)
```

**Pergunta 3: "A música foi renomeada. Em quantos lugares eu mudo?"**

No **relacional**, em **um**: `UPDATE musica SET titulo = 'Sol de Verão (Ao Vivo)' WHERE id = 1;` altera **1 linha**, e **todas** as playlists mostram o nome novo, porque a música mora só na tabela `musica`:

```
 playlist |         titulo
----------+------------------------
 Treino   | Sol de Verão (Ao Vivo)
 Estudo   | Sol de Verão (Ao Vivo)
(2 linhas)
```

No **documento**, em **tantos lugares quantas forem as playlists** que têm a música (aqui, 2). Se esquecer uma, as cópias **divergem**.

### O que cada um ganha e custa

| | **Relacional** | **Documentos** |
|---|---|---|
| **Como guarda** | Tabelas ligadas por **id** | **Fichas JSON**, com tudo dentro |
| **Ler a playlist inteira** | Precisa de **`JOIN`** (segue as setas) | **Uma leitura** só |
| **Mudar uma informação compartilhada** | **1 lugar** | Tantos lugares quantas forem as cópias |
| **Esquema** | **Fixo**: as colunas são definidas antes | **Flexível**: cada documento pode ter campos diferentes |
| **Boa pergunta** | "Quanto?", "Quantos?", "De quem?" (somas, filtros, relatórios) | "Mostre isto **inteiro**" |
| **Maior risco** | Mudar a estrutura dá trabalho | **Dado copiado que diverge** |

> **A cópia nem sempre é erro.** Quando o dado é um **fato histórico** (o preço da época, o endereço de entrega **daquele** pedido), copiar é a escolha certa. O erro é copiar um dado que **deveria mudar junto**.

### Como seria no MongoDB (só para ver a ideia)

| Pergunta | Consulta no estilo do MongoDB | Resultado |
|---|---|---|
| A playlist Estudo | `db.playlists.find({ nome: "Estudo" })` | a playlist 2 |
| Playlists com "Sol de Verão" | `db.playlists.find({ "musicas.titulo": "Sol de Verão" })` | as playlists 1 e 2 |
| Playlists vazias | `db.playlists.find({ musicas: { $size: 0 } })` | a playlist 3 |

**E a busca semântica?** É a **terceira** forma: em vez de achar o que está **escrito igual**, acha o que **significa parecido**, comparando **vetores** (embeddings). Responde a outro tipo de pergunta ("ache músicas parecidas com esta") e é a base do **RAG** do M4. Não substitui o relacional nem o documento: **combina** com eles.

**💬 E daí?** Escolher entre relacional e documentos é decidir **o que dói mais**: o `JOIN` (ler fica mais trabalhoso) ou a **cópia que diverge** (atualizar fica arriscado). Para dinheiro e relatórios, o relacional. Para ler uma ficha inteira de uma vez, o documento.

**✅ Checkpoint:** "Dê um dado da MúsicaÁgil que você **embutiria** na playlist e um que você **referenciaria**. Por quê?"

<details>
<summary>💡 Ver resposta</summary>

**Embutir:** a **posição** da música na playlist (é lida sempre junto e só faz sentido naquela playlist). **Referenciar:** o **título da música** (muda, é compartilhado por várias playlists, e precisa existir em um lugar só). Outras respostas valem, se tiverem o argumento de "muda ou não muda" e "lê junto ou não".

</details>

---

## 👥 Exercício em dupla: o CursoÁgil

**Tempo:** até 45 minutos (2 de preparação, 28 para as queries e 15 para o comparativo). Uma pessoa é a **pilota** (digita) e a outra é a **navegadora** (lê o enunciado e confere). **Troquem de papel a cada consulta.**

### 🎯 O cenário

O CursoÁgil é a plataforma de cursos online da revisão da Aula 1: **professores** dão **cursos**, que têm **aulas**; **alunos** se **matriculam** nos cursos (com uma **nota final**) e **concluem** aulas. Agora o modelo virou **banco de verdade**, e a coordenação tem perguntas. Você vai respondê-las em SQL e depois comparar os tipos de banco.

### 📦 O que a dupla entrega

1. Um arquivo **`queries.sql`** com as 7 consultas (e o desafio extra, se der).
2. Um arquivo **`comparativo.md`** com as respostas da Parte B.

### 🧭 Como a dupla trabalha (High Agency na prática)

- **Bias to Action:** escreva a consulta, **rode logo** e corrija olhando o resultado. Não escreva as 7 para só depois testar.
- **Clear Thinking:** antes de cada consulta, diga em voz alta: **"qual pergunta da coordenação ela responde, e quem vai usar o resultado?"**
- **Discordância Positiva:** na Parte B, a navegadora **discorda** de pelo menos 1 decisão da pilota (embutir ou referenciar). A dupla defende cada lado com **um argumento** e só então decide.

### 🪜 Preparação (2 min)

Se ainda não colou o `setup-revisao.sql`, cole agora. Confira:

```sql
SELECT COUNT(*) FROM aluno;
```

> Resultado esperado: `4`.

### 🪜 Parte A: as queries (28 min)

Confira o **resultado esperado** de cada consulta antes de seguir. **Ordene** como está pedido, para o seu resultado sair igual ao esperado.

**Query 1: o catálogo.** Liste o **nome do curso**, o **nome do professor** e a **carga horária**, ordenado pelo nome do curso.
> Resultado esperado:
> ```
>    curso    | professor | carga_horaria
> ------------+-----------+---------------
>  Git        | Ana Lopes |            10
>  JavaScript | Rui Prado |            40
>  Node.js    | Rui Prado |            50
>  SQL        | Ana Lopes |            30
> (4 linhas)
> ```

**Query 2: as matrículas.** Liste o **nome do aluno**, o **nome do curso** e a **nota final** de cada matrícula, ordenado pelo nome do aluno e depois pelo nome do curso.
> Resultado esperado:
> ```
>    aluno    |   curso    | nota_final
> ------------+------------+------------
>  Carla Dias | JavaScript |          9
>  Carla Dias | SQL        |          8
>  Davi Nunes | JavaScript |          7
>  Davi Nunes | SQL        |          6
>  Eva Rocha  | Node.js    |         10
> (5 linhas)
> ```

**Query 3: quem nunca se matriculou.** Liste o **nome** dos alunos que **não têm nenhuma matrícula**.
> Resultado esperado:
> ```
>     nome
> ------------
>  Bia Torres
> (1 linha)
> ```

**Query 4: o curso sem alunos.** Liste o **nome** dos cursos que **não têm nenhuma matrícula**.
> Resultado esperado:
> ```
>  nome
> ------
>  Git
> (1 linha)
> ```

**Query 5: os professores e seus cursos.** Conte **quantos cursos** cada professor dá, **incluindo** quem não dá nenhum (que deve aparecer com `0`). Ordene do maior número de cursos para o menor e, em caso de empate, pelo nome.
> Resultado esperado:
> ```
>    nome    | cursos
> -----------+--------
>  Ana Lopes |      2
>  Rui Prado |      2
>  Caio Mota |      0
> (3 linhas)
> ```

**Query 6: a nota média.** Calcule a **nota média** de cada curso que tem matrícula, **arredondada para 2 casas**. Ordene da maior média para a menor e, em caso de empate, pelo nome do curso.
> Resultado esperado (no SQLite aparece `10`, `8` e `7`, sem os zeros):
> ```
>     nome    | nota_media
> ------------+------------
>  Node.js    |      10.00
>  JavaScript |       8.00
>  SQL        |       7.00
> (3 linhas)
> ```

**Query 7: os minutos assistidos.** Calcule quantos **minutos de aula** cada aluno **concluiu** (a soma da `duracao_min` das aulas em `conclusao_aula`). Ordene do maior para o menor e, em caso de empate, pelo nome.
> Resultado esperado:
> ```
>     nome    | minutos_assistidos
> ------------+--------------------
>  Carla Dias |                 50
>  Eva Rocha  |                 30
>  Davi Nunes |                 20
> (3 linhas)
> ```

**🚀 Desafio extra: os alunos dedicados.** Liste o **nome** e a **quantidade de cursos** dos alunos matriculados em **2 ou mais** cursos.
> Resultado esperado:
> ```
>     nome    | cursos
> ------------+--------
>  Carla Dias |      2
>  Davi Nunes |      2
> (2 linhas)
> ```

### 🪜 Parte B: o comparativo (15 min)

Crie o arquivo `comparativo.md`.

**B1 (5 min): o curso de SQL como documento.** Escreva o curso de SQL (id 2) como **um documento JSON**, com o **professor** e as **aulas embutidos** (use o formato do `revisao-documentos.js`).

> Resultado esperado:
> ```js
> {
>   _id: 2,
>   nome: 'SQL',
>   cargaHoraria: 30,
>   professor: { nome: 'Ana Lopes', email: 'ana@escola.com' },
>   aulas: [
>     { numero: 1, titulo: 'SELECT', duracaoMin: 25 },
>     { numero: 2, titulo: 'JOIN', duracaoMin: 35 }
>   ]
> }
> ```

**B2 (10 min): embutir ou referenciar?** Para cada dado, escolha **embutir** (copiar dentro do documento do curso) ou **referenciar** (guardar só o id) e **justifique em uma frase**:

1. As **aulas** do curso.
2. O **professor** do curso.
3. As **matrículas** (aluno e nota).

Depois, responda: **o professor Rui mudou de e-mail.** Em quantos lugares você precisa mudar no **relacional**? E num banco de **documentos** em que o professor está **embutido** em cada curso dele?

> Resultado esperado:
> 1. **Embutir** as aulas: são lidas sempre junto do curso e mudam pouco.
> 2. **Referenciar** o professor: o e-mail muda e o mesmo professor dá **vários** cursos. Copiar dentro de cada curso criaria cópias que podem divergir.
> 3. **Referenciar** as matrículas: é um N:N (aluno e curso) que **cresce sem limite**, e a nota pertence ao **par** aluno-curso. Fica numa coleção própria.
>
> O e-mail do Rui: no **relacional**, **1 lugar** (`professor`). No **documento com o professor embutido**, **2 lugares**, porque o Rui dá 2 cursos:
> ```
>  cursos_do_rui
> ---------------
>              2
> (1 linha)
> ```

**🚀 Pergunta para responder em dupla** (no fim do `comparativo.md`): o relatório "**nota média por curso**" (a Query 6) fica mais natural no relacional ou nos documentos? Por quê? Escrevam **uma frase pensando na coordenação**.

### ✅ Antes de entregar

- [ ] As 7 queries (e o extra, se der) dão **exatamente** o resultado esperado?
- [ ] A dupla trocou de papel a cada consulta?
- [ ] O `comparativo.md` tem o documento do B1 e as 3 escolhas **justificadas**?
- [ ] Alguém na dupla consegue explicar, **com as próprias palavras**, a diferença entre `JOIN` e `LEFT JOIN`?
- [ ] A dupla discordou de forma positiva em pelo menos 1 decisão?

### 🐞 Se algo não bater

| O que aparece | O que provavelmente aconteceu |
|---|---|
| `column reference "id" is ambiguous` | O `id` existe em mais de uma tabela: escreva `tabela.id` |
| `syntax error at or near ";"` num `JOIN` | Faltou o `ON` depois do `JOIN` |
| **Linhas demais** | O `ON` ligou a coluna errada (ou faltou): cada linha foi combinada com cada linha |
| **0 linhas** na Query 3 ou 4 | Você usou `= NULL` em vez de `IS NULL`, ou usou `JOIN` em vez de `LEFT JOIN` |
| O professor sem curso (`Caio`) **sumiu** na Query 5 | Faltou trocar `JOIN` por `LEFT JOIN` |
| O `Caio` aparece com `1` curso | Você usou `COUNT(*)`: use `COUNT(curso.id)` |

---

## 🏁 Fechamento (15 min)

| Min | Atividade | Objetivo |
|---|---|---|
| 0 a 5 | **Correção ao vivo**: uma dupla roda a **Query 5** e mostra o documento do B1 | Bias to Action: conferir no resultado, não na opinião |
| 5 a 10 | **Retrospectiva**: "onde travamos, o que tentamos, o que funcionou" | Transformar dificuldade em informação |
| 10 a 13 | **Conexão**: onde, num app que você usa, uma informação aparece copiada em mais de um lugar? | Clear Thinking: valor para alguém |
| 13 a 15 | **Próximo passo** e liberação do gabarito | Algo para fazer em menos de 30 minutos |

**Próximo passo físico:** esta noite, escreva **uma** pergunta do app que você mais usa e diga se ela pede `JOIN` (relacional), uma leitura de documento inteira, ou uma busca por significado.