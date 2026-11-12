# 📚 Materiais de Facilitação – Programadores do Amanhã

Este repositório reúne os **conteúdos, exemplos e materiais** que utilizo como facilitador na ONG **Programadores do Amanhã (PDA)**.  
O objetivo é manter a organização dos recursos, centralizar referências e facilitar tanto a preparação das aulas quanto o compartilhamento de conhecimento.

---

## 🎯 Objetivo

- Organizar conteúdos usados em sala de aula.  
- Reunir exemplos de código e exercícios práticos.  
- Centralizar materiais de apoio e referências adicionais.  
- Criar uma base acessível para revisão e consulta.

---

## 🗂 Estrutura do Repositório

```
📦 pda
┣ 📂 turmas/                # Formação fullstack da PdA, uma pasta por turma
┃ ┣ 📂 t7/
┃ ┗ 📂 t8/
┣ 📂 parcerias/             # Cursos feitos em parceria com outras instituições
┃ ┗ 📂 instituto-consuelo/  # Parceria com o Instituto Consuelo e a EloGroup
┣ 📂 materiais-extras/      # Banco de materiais de apoio, compartilhado por todas as turmas
┣ 📂 webinars/              # Roteiros e materiais de webinars
┗ README.md
```

| Pasta | O que tem |
|---|---|
| [`turmas/t7/`](turmas/t7/) | Aulas da turma T7 (JavaScript, DOM, CSS e React) |
| [`turmas/t8/`](turmas/t8/) | Aulas, exercícios e projetos da turma T8 (JavaScript e banco de dados) |
| [`parcerias/instituto-consuelo/`](parcerias/instituto-consuelo/) | Curso do Instituto Consuelo (SQL, Python, APIs, HTML/CSS, JavaScript e React) |
| [`materiais-extras/`](materiais-extras/) | Apostilas de apoio por tema: CSS, JavaScript/TypeScript, React, banco de dados, testes... |
| [`webinars/`](webinars/) | Roteiros dos webinars |

Cada pasta tem o seu próprio `README.md` com o índice do que tem dentro.

---

## 🧭 Como uma aula é organizada

Todas as turmas e parcerias seguem o mesmo esqueleto. Uma aula só tem as partes de que precisa:

```
aula-01/
┣ README.md              # Material do aluno (abre sozinho no GitHub)
┣ slides.md              # Roteiro de slides, quando houver
┣ gabarito.md            # Respostas comentadas (publicado depois da aula)
┣ 📂 exercicios/
┃ ┣ 📂 sync/             # Exercícios feitos em sala
┃ ┗ 📂 async/            # Exercícios para casa
┣ 📂 revisao/            # Aula de revisão, quando houver
┃ ┣ revisao.md
┃ ┗ gabarito.md
┗ 📂 livecoding/         # Código feito ao vivo em aula
```

As turmas da formação são divididas em módulos: `turmas/t8/m1/aula-02/` é a **aula 2 do módulo 1** da T8.

Projetos que atravessam várias aulas ficam em `projetos/`, dentro da pasta da turma, cada um com o seu `package.json`. Eles podem ganhar uma **tag no Git** ao fim de cada aula (por exemplo `t8-m1-aula-03`). Assim dá para ver o projeto **como ele estava em cada aula**.

### ✏️ Padrão de nomes

- Pastas e arquivos em **minúsculas**, com palavras separadas por hífen e **sem acento** (`exercicios`, não `Exercícios`).
- Números com **dois dígitos** (`aula-01`, `aula-10`), para a ordem ficar certa.
- A exceção é o `README.md`, que fica em maiúsculas porque o GitHub o exibe automaticamente.

---

## 💻 Conteúdos

Alguns dos principais tópicos que aparecem aqui:

- Fundamentos de programação (Python, JavaScript, HTML/CSS, etc.)
- Estruturação de projetos Node.js (módulos ES) e validação de dados com Zod
- Noções de tipagem estática e TypeScript
- React e o seu ecossistema (hooks, rotas, React Query, formulários)
- Banco de Dados (modelagem, SQL, PostgreSQL, bancos não relacionais)
- Paradigmas de POO: encapsulamento, herança, polimorfismo, abstração
- Estruturas de dados e algoritmos
- Boas práticas de desenvolvimento
- Ferramentas e recursos para estudo

---

## 🔒 O que não é publicado

Planos do professor, notas e avaliações **não** ficam neste repositório (veja o `.gitignore`). Os **gabaritos** são publicados somente **depois** da aula ou do prazo dos exercícios.

---

## 🤝 Contribuições

Este repositório é **pessoal**, voltado para minha organização como facilitador.  
Mas se você chegou até aqui e quiser sugerir algo, fique à vontade para abrir uma **issue** ou enviar um **pull request**. ✨

---

## 📌 Sobre o Programadores do Amanhã

O **Programadores do Amanhã** é um instituto que tem a missão de formar e empregar jovens pretos, pardos e indígenas no mercado de tecnologia.  
Mais informações: [site oficial](https://programadoresdoamanha.org.br/pt)
