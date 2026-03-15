/**
 * Módulo responsável por criar cards de filmes
 */

/**
 * Cria e retorna um elemento de card de filme
 * @param {Objeto} movieData - Dados do filme
 * @param {string} movieData.titulo - Título
 * @param {number} movieData.ano - Ano de lançamento
 * @param {string} movieData.genero - Gênero
 * @param {number} movieData.avaliacao - Avaliação (1 a 5 estrelas)
 * @param {Function} onRemove - callback para remover o card
 * @returns {HTMLElement} - Elemento do card
 */

export function criarCardFilme(movieData, onRemove) {
    const { titulo, ano, genero, avaliacao } = movieData;

    const card = document.createElement('div');
    card.className = 'movie-card';

    const estrelas = gerarEstrelas(avaliacao);

    card.innerHTML = `
        <h3>${titulo}</h3>
        <div class="movie-info">
            <span class="info-item">
                <strong>📅</strong> ${ano}
            </span>
            <span class="info-item">
                <strong>🎭</strong> ${genero}
            </span>
        </div>
        <div class="movie-rating">
            ${estrelas}
        </div>
    `;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'movie-actions';

    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn-remove';
    btnRemover.textContent = 'Remover';

    btnRemover.addEventListener('click', () => {
        card.style.animation = 'slideOut 0.3s ease-out';

        setTimeout(() => {
            card.remove();

            if (onRemove) {
                onRemove();
            }
        }, 300);
    });

    actionsDiv.appendChild(btnRemover);
    card.appendChild(actionsDiv);

    return card;
}

/**
 * Gera uma string com estrelas baseado na avaliação
 * @param {number} avaliacao - Número de 1 a 5
 * @returns {string} - String com estrelas
 */

function gerarEstrelas(avaliacao) {
    const estrelasPreenchidas = '⭐'.repeat(avaliacao);
    const estrelasVazias = '☆'.repeat(5 - avaliacao);
    return estrelasPreenchidas + estrelasVazias;
}

/**
 * Cria e retorna um elemento de estado vazio
 * @returns {HTMLElement} - Elemento de estado vazio
 */

export function criarEstadoVazio() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <div class="emoji">🎬</div>
        <p>Nenhum filme adicionado ainda!</p>
        <small> Adicione seu primeiro filme para começar a coleção. </small>
    `;

    return emptyState;
}


