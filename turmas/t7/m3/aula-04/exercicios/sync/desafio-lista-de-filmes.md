## Exercício Prático em Sala

### 🎯 Desafio: Sistema de Lista de Filmes

Você vai criar um sistema onde o usuário pode adicionar filmes a uma lista pessoal. Cada filme deve exibir título, ano de lançamento, gênero e uma avaliação em estrelas.

### 📋 Descrição do Desafio

Crie uma aplicação web que permita:
1. Adicionar filmes através de um formulário
2. Exibir os filmes em cards dinâmicos
3. Cada card deve mostrar as informações do filme
4. Permitir remover filmes da lista
5. (Opcional) Atualizar a avaliação do filme

### ✅ Requisitos Obrigatórios

**HTML Base:**
- Um formulário com campos para:
  - Título do filme (input text)
  - Ano de lançamento (input number)
  - Gênero (select com opções: Ação, Comédia, Drama, Terror, Ficção)
  - Avaliação (input range de 1 a 5)
- Um botão "Adicionar Filme"
- Uma área (`div`) para exibir os filmes

**JavaScript - Funcionalidades:**

1. **Criar elementos dinamicamente:**
   - Use `document.createElement()` para criar o card do filme
   - O card deve ter a classe `movie-card`

2. **Usar Template Strings:**
   - Utilize Template Strings para criar a estrutura HTML interna do card
   - Interpole as variáveis com os dados do filme (`${titulo}`, `${ano}`, etc.)

3. **Inserir no DOM:**
   - Use `appendChild()` para adicionar o card na lista de filmes

4. **Estrutura do Card:**
   ```
   Card do Filme
   ├── Título do filme
   ├── Ano de lançamento
   ├── Gênero
   ├── Avaliação (exibir estrelas: ⭐⭐⭐⭐⭐)
   └── Botão "Remover"
   ```

5. **Funcionalidade de Remover:**
   - Ao clicar no botão "Remover", o card deve ser removido da lista
   - Dica: use o método `.remove()` no elemento

6. **Validação Básica:**
   - Não permitir adicionar filmes sem título
   - Limpar o formulário após adicionar um filme

### 💡 Dicas de Implementação

**Estrutura do JavaScript:**
```javascript
// 1. Selecionar elementos do DOM
const formulario = document.getElementById('....');
const tituloInput = document.getElementById('....');
// ... outros inputs

// 2. Criar função para adicionar filme
function adicionarFilme(evento) {
  evento.preventDefault();
  
  // Pegar valores dos inputs
  const titulo = tituloInput.value;
  // ...
  
  // Validar
  if (!titulo) {
    alert('Preencha o título!');
    return;
  }
  
  // Criar o card
  const movieCard = criarCardFilme(titulo, ano, genero, avaliacao);
  
  // Adicionar ao DOM
  // ...
  
  // Limpar formulário
  formulario.reset();
}

// 3. Criar função para gerar o card
function criarCardFilme(titulo, ano, genero, avaliacao) {
  // Criar elemento principal
  const card = document.createElement('div');
  card.className = 'movie-card';
  
  // Gerar estrelas
  const estrelas = '⭐'.repeat(avaliacao);
  
  // Usar Template String para o conteúdo
  card.innerHTML = `
    ${titulo}
    ...
  `;
  
  // Criar botão de remover
  const btnRemover = document.createElement('button');
  // ...
  
  // Adicionar evento ao botão
  btnRemover.addEventListener('click', function() {
    card.remove();
  });
  
  // Adicionar botão ao card
  card.appendChild(btnRemover);
  
  return card;
}

// 4. Adicionar event listener ao formulário
formulario.addEventListener('submit', adicionarFilme);
```

**CSS Sugerido (para visualização):**
```css
.movie-card {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-left: 4px solid #2196F3;
}

.movie-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.movie-card p {
  margin: 5px 0;
  color: #666;
}

.movie-card button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

### 🚀 Extensões (para quem terminar antes)

Se você terminar o exercício básico, tente implementar:

1. **Contador de filmes:**
   - Mostre quantos filmes estão na lista
   - Atualize o contador ao adicionar/remover filmes

2. **Filtro por gênero:**
   - Adicione botões para filtrar filmes por gênero
   - Mostre apenas os filmes do gênero selecionado

3. **Editar avaliação:**
   - Adicione um botão "Editar" em cada card
   - Permita alterar a avaliação do filme

4. **Ordenação:**
   - Adicione botões para ordenar por:
     - Título (A-Z)
     - Ano (mais recente primeiro)
     - Avaliação (maior primeiro)

5. **Persistência com LocalStorage:**
   - Salve os filmes no LocalStorage
   - Carregue os filmes ao reabrir a página

6. **Animações:**
   - Adicione uma animação quando um card é adicionado
   - Adicione uma animação quando um card é removido
