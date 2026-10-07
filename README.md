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
📦 repo
┣ 📂 institutoconsuelo/   # Aulas da PdA em parceria com o Instituto Consuelo e EloGroup
┣ 📂 t7/                  # Aulas e materiais da turma T7 (formação fullstack da PdA)
┣ 📂 t8/                  # Aulas, exercícios e projetos da turma T8
┣ 📂 webinars/            # Roteiros e materiais de webinars
┗ README.md               # Documento inicial
```

Cada pasta de turma ou parceria tem o seu próprio `README.md` explicando como está organizada.

### 📂 Como a `t8/` está organizada

```
t8/
┣ 📂 M1/                  # Aulas do módulo 1, uma pasta por aula
┃ ┗ 📂 AULA-N/
┃   ┣ README.md           # Material do aluno
┃   ┣ GABARITO.md         # Respostas comentadas (publicado depois da aula)
┃   ┣ REVISAO.md          # Aula de revisão, quando houver
┃   ┣ EXERCICIOS-CASA.md  # Exercícios para casa, quando houver
┃   ┗ 📂 livecoding/      # Exemplos feitos ao vivo em aula
┗ 📂 projetos/            # Projetos que atravessam várias aulas
  ┗ 📂 lojagil-validacao/
```

Os projetos de `t8/projetos/` ganham uma **tag no Git** ao fim de cada aula (`t8-aula-3`, `t8-aula-4`...). Assim dá para ver o projeto **como ele estava em cada aula**.

> 📖 Mais detalhes em [`t8/README.md`](t8/README.md).

---

## 💻 Conteúdos

Alguns dos principais tópicos que podem aparecer aqui:

- Fundamentos de programação (Python, JavaScript, HTML/CSS, etc.)
- Estruturação de projetos Node.js (módulos ES) e validação de dados com Zod
- Noções de tipagem estática e TypeScript
- Banco de Dados (SQL, PostgreSQL, etc.)
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