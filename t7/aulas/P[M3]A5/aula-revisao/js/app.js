/**
 * Módulo principal da aplicação
 */

import { criarCardFilme, criarEstadoVazio } from "./movieCard.js";

const movieForm = document.getElementById('movie-form');
const titleInput = document.getElementById('titulo');
const anoInput = document.getElementById('ano');
const generoSelect = document.getElementById('genero');
const avaliacaoInput = document.getElementById('avaliacao');
const avaliacaoValor = document.getElementById('avaliacaoValor');
const movieList = document.getElementById('movieList');
const movieCount = document.getElementById('movieCount');

// Estado da aplicação
let totalDeFilmes = 0;

/**
 * Inicializa a aplicação
 */

function init () {
    configurarEventos();
    exibirEstadoInicial();
    console.log('Aplicação inicializada');
}

/**
 * Configura todos os event listeners
 */

function configurarEventos () {
    // Configura o evento de submit do formulário
    movieForm.addEventListener('submit', handleSubmit);

    // atualiza o valor da avaliação em tempo real
    avaliacaoInput.addEventListener('input', (e) => {
        avaliacaoValor.textContent = e.target.value;
    });
}

/**
 * Manipula o submit do formulário
 * @param {Event} evento - Evento de submit
 */

function handleSubmit (evento) {
    evento.preventDefault();

    // Coleta os dados do formulário
    const movieData = {
        titulo: titleInput.value.trim(),
        ano: parseInt(anoInput.value),
        genero: generoSelect.value,
        avaliacao: parseInt(avaliacaoInput.value)
    };

    if (!validarDados(movieData)) {
        return;
    }

    adicionarFilme(movieData);

    movieForm.reset();
    avaliacaoValor.textContent = '3';

    titleInput.focus();
}

/**
 * Valida os dados do filme
 * @param {Object} movieData - Dados do filme
 * @returns {boolean} - True se válido
 */

function validarDados (movieData) {
    if (!movieData.titulo) {
        alert('O título é obrigatório!');
        titleInput.focus();
        return false;
    }

    if (!movieData.genero) {
        alert('O gênero é obrigatório!');
        generoSelect.focus();
        return false;
    }

    return true;
}

/**
 * Adiciona um filme à lista
 * @param {Object} movieData - Dados do filme
 */

function adicionarFilme (movieData) {
    // remove o estado vazio caso ele exista
    removerEstadoVazio();

    // cria o card do filme
    const card = criarCardFilme(movieData, handleRemoveFilme);

    movieList.prepend(card);

    totalDeFilmes++;
    atualizarContador();

    console.log(`Filme adicionado: ${movieData.titulo}`);
}

/**
 * Callback executado quando um filme é removido
 */

function handleRemoveFilme () {
    totalDeFilmes--;
    atualizarContador();

    if (totalDeFimes === 0) {
        exibirEstadoVazio();
    }

    console.log('🗑️ Filme removido. Total:', totalDeFilmes);
}

/**
 * Atualiza o contador de filmes
 */

function atualizarContador () {
    movieCount.textContent = `Total de filmes: ${totalDeFilmes}`;
}

/**
 * Exibe o estado vazio
 */

function exibirEstadoVazio () {
    const emptyState = criarEstadoVazio();
    movieList.appendChild(emptyState);
}

/**
 * Remove o estado vazio se existir
 */

function removerEstadoVazio () {
    const emptyState = document.getElementById('emptyState');

    if (emptyState) emptyState.remove();
}

init();
