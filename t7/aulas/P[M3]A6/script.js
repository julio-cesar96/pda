// Selecionando dos elementos da DOM
const formPost = document.getElementById('formPost');
const inputTitulo = document.getElementById('titulo');
const inputConteudo = document.getElementById('conteudo');
const btnCarregarPosts = document.getElementById('btnCarregar');


//Evento - elemento.addEventListener('evento', funcao);

formPost.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    console.log('Formulário enviado!');

    const titutlo = inputTitulo.value;
    const conteudo = inputConteudo.value;

    if (titutlo.trim() === '' || conteudo.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    criarPost(titutlo, conteudo);
    
    // Limpar os campos do formulário
    inputTitulo.value = '';
    inputConteudo.value = '';
});

btnCarregarPosts.addEventListener('click', () => {
    carregarPosts();
});


//Chamadas a API
async function criarPost(titulo, conteudo) {
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

        const data = await response.json();
        console.log('Post criado com sucesso:', data);
        alert('Post criado com sucesso! ID: ' + data.id);
        formPost.reset();

    } catch (error) {
        console.error('Erro ao criar o post:', error);
        alert('Erro ao criar o post. Tente novamente mais tarde.');
    }
}

async function carregarPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        console.log('Posts carregados:', posts);
    } catch (error) {
        console.error('Erro ao carregar os posts:', error);
        alert('Erro ao carregar os posts. Tente novamente mais tarde.');
    }
}

 