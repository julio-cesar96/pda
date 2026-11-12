// Embeddings de BRINQUEDO: 3 números por produto, escritos à mão.
// Dimensões: [tecnologia, leitura, casa]. Os de verdade têm centenas de números e vêm de um modelo.
const produtos = [
  { nome: 'Mouse', vetor: [0.9, 0.0, 0.1] },
  { nome: 'Teclado', vetor: [0.9, 0.1, 0.0] },
  { nome: 'Livro de JavaScript', vetor: [0.5, 0.8, 0.0] },
  { nome: 'Livro de SQL', vetor: [0.4, 0.9, 0.0] },
  { nome: 'Luminária', vetor: [0.1, 0.0, 0.9] },
  { nome: 'Caneca', vetor: [0.0, 0.1, 0.9] },
];

// Quão "na mesma direção" estão dois vetores? 1 = muito parecidos, 0 = nada a ver
function similaridade(a, b) {
  const produtoEscalar = a.reduce((soma, x, i) => soma + x * b[i], 0);
  const tamanho = v => Math.sqrt(v.reduce((soma, x) => soma + x * x, 0));
  return produtoEscalar / (tamanho(a) * tamanho(b));
}

function buscarPorSignificado(vetorDaConsulta) {
  return produtos
    .map(p => ({ nome: p.nome, similaridade: Number(similaridade(vetorDaConsulta, p.vetor).toFixed(3)) }))
    .sort((a, b) => b.similaridade - a.similaridade)
    .slice(0, 3);
}

// Busca por PALAVRA: procura o texto "programação" nos nomes
console.log(produtos.filter(p => p.nome.toLowerCase().includes('programação')).map(p => p.nome));

// Busca por SIGNIFICADO: a consulta "estudar programação" também vira um vetor (escrito à mão aqui)
console.log(buscarPorSignificado([0.6, 0.8, 0.0]));

// Outra consulta: "enfeitar a casa"
console.log(buscarPorSignificado([0.0, 0.1, 1.0]));