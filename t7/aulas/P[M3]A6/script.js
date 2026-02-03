// Seleção de elementos
const formPost = document.getElementById('formPost');
const inputTitulo = document.getElementById('titulo');
const inputConteudo = document.getElementById('conteudo');
const btnCarregar = document.getElementById('btnCarregar');
const listaPosts = document.getElementById('listaPosts');

// Evento: Carregar postagens
btnCarregar.addEventListener('click', carregarPostagens);

// Evento: Enviar formulário
formPost.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    const titulo = inputTitulo.value;
    const conteudo = inputConteudo.value;
    
    if (titulo.trim() === '' || conteudo.trim() === '') {
        alert('Preencha todos os campos!');
        return;
    }
    
    criarPostagem(titulo, conteudo);
});

// GET - Carregar postagens
async function carregarPostagens() {
    listaPosts.innerHTML = '<p class="loading">Carregando postagens...</p>';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const posts = await response.json();
        
        listaPosts.innerHTML = '';
        
        posts.forEach(post => {
            const postElement = criarElementoPost(post);
            listaPosts.appendChild(postElement);
        });
        
    } catch (error) {
        listaPosts.innerHTML = '<p style="color: red;">Erro ao carregar postagens!</p>';
        console.error('Erro:', error);
    }
}

// POST - Criar postagem
async function criarPostagem(titulo, conteudo) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titulo,
                body: conteudo,
                userId: 1
            })
        });
        
        const novoPost = await response.json();
        
        alert('Postagem criada com sucesso! ID: ' + novoPost.id);
        formPost.reset();
        
        const postElement = criarElementoPost(novoPost);
        listaPosts.insertBefore(postElement, listaPosts.firstChild);
        
    } catch (error) {
        alert('Erro ao criar postagem!');
        console.error('Erro:', error);
    }
}

// Função auxiliar
function criarElementoPost(post) {
    const div = document.createElement('div');
    div.className = 'post-item';
    div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
    return div;
}