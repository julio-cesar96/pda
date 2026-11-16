-- Revisão da Aula 2: dois mini-bancos num script só.
-- MúsicaÁgil: usado nos exemplos da revisão.
-- CursoÁgil: usado no exercício em dupla (parte do DER da revisão da Aula 1, sem telefone).

-- ===== MúsicaÁgil =====

CREATE TABLE usuario (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL
);

CREATE TABLE artista (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL
);

CREATE TABLE musica (
  id INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  artista_id INTEGER NOT NULL REFERENCES artista (id)
);

CREATE TABLE playlist (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  usuario_id INTEGER NOT NULL REFERENCES usuario (id)
);

CREATE TABLE item_playlist (
  playlist_id INTEGER NOT NULL REFERENCES playlist (id),
  musica_id INTEGER NOT NULL REFERENCES musica (id),
  posicao INTEGER NOT NULL,
  PRIMARY KEY (playlist_id, musica_id)
);

INSERT INTO usuario (id, nome) VALUES
  (1, 'Marina'),
  (2, 'Diego'),
  (3, 'Lia');

INSERT INTO artista (id, nome) VALUES
  (1, 'Banda Litoral'),
  (2, 'Zeca do Bairro'),
  (3, 'Duo Sereno');

INSERT INTO musica (id, titulo, artista_id) VALUES
  (1, 'Sol de Verão', 1),
  (2, 'Maré Alta', 1),
  (3, 'Trem das Onze', 2),
  (4, 'Noite Longa', 2);

INSERT INTO playlist (id, nome, usuario_id) VALUES
  (1, 'Treino', 1),
  (2, 'Estudo', 2),
  (3, 'Para depois', 2);

INSERT INTO item_playlist (playlist_id, musica_id, posicao) VALUES
  (1, 1, 1),
  (1, 3, 2),
  (2, 1, 1),
  (2, 2, 2),
  (2, 3, 3);

-- ===== CursoÁgil =====

CREATE TABLE professor (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE curso (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  carga_horaria INTEGER NOT NULL,
  professor_id INTEGER NOT NULL REFERENCES professor (id)
);

CREATE TABLE aula (
  id INTEGER PRIMARY KEY,
  curso_id INTEGER NOT NULL REFERENCES curso (id),
  numero INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  duracao_min INTEGER NOT NULL
);

CREATE TABLE aluno (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE matricula (
  aluno_id INTEGER NOT NULL REFERENCES aluno (id),
  curso_id INTEGER NOT NULL REFERENCES curso (id),
  data_matricula DATE NOT NULL,
  nota_final INTEGER NOT NULL,
  PRIMARY KEY (aluno_id, curso_id)
);

CREATE TABLE conclusao_aula (
  aluno_id INTEGER NOT NULL REFERENCES aluno (id),
  aula_id INTEGER NOT NULL REFERENCES aula (id),
  concluida_em DATE NOT NULL,
  PRIMARY KEY (aluno_id, aula_id)
);

INSERT INTO professor (id, nome, email) VALUES
  (1, 'Rui Prado', 'rui@escola.com'),
  (2, 'Ana Lopes', 'ana@escola.com'),
  (3, 'Caio Mota', 'caio@escola.com');

INSERT INTO curso (id, nome, carga_horaria, professor_id) VALUES
  (1, 'JavaScript', 40, 1),
  (2, 'SQL', 30, 2),
  (3, 'Node.js', 50, 1),
  (4, 'Git', 10, 2);

INSERT INTO aula (id, curso_id, numero, titulo, duracao_min) VALUES
  (1, 1, 1, 'Variáveis', 20),
  (2, 1, 2, 'Funções', 30),
  (3, 2, 1, 'SELECT', 25),
  (4, 2, 2, 'JOIN', 35),
  (5, 3, 1, 'Módulos', 30);

INSERT INTO aluno (id, nome, email) VALUES
  (1, 'Carla Dias', 'carla@email.com'),
  (2, 'Davi Nunes', 'davi@email.com'),
  (3, 'Eva Rocha', 'eva@email.com'),
  (4, 'Bia Torres', 'bia@email.com');

INSERT INTO matricula (aluno_id, curso_id, data_matricula, nota_final) VALUES
  (1, 1, '2026-08-01', 9),
  (1, 2, '2026-08-15', 8),
  (2, 1, '2026-08-02', 7),
  (2, 2, '2026-08-15', 6),
  (3, 3, '2026-09-01', 10);

INSERT INTO conclusao_aula (aluno_id, aula_id, concluida_em) VALUES
  (1, 1, '2026-08-03'),
  (1, 2, '2026-08-05'),
  (2, 1, '2026-08-04'),
  (3, 5, '2026-09-02');