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