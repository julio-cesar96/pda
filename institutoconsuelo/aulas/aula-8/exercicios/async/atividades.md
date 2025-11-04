
# 🏠 Atividades para Casa

## 📝 Nível Simples: Lista de Compras Interativa

**Objetivo:** Criar uma lista de compras com persistência de dados.

**Funcionalidades:**
- Adicionar item à lista
- Marcar item como comprado (riscado)
- Remover item
- Salvar lista no localStorage
- Contador de itens total e comprados
- Design limpo e usável

**Estrutura:**

```
lista-compras/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

**Critérios de avaliação:**
- [ ] Todas as funcionalidades implementadas
- [ ] localStorage funciona corretamente
- [ ] Interface clara e usável
- [ ] Código organizado e comentado
- [ ] Validação de entrada (não adicionar item vazio)

**Entrega esperada:**
- Arquivo HTML + CSS + JS
- README.md explicando como usar
- Screenshot da aplicação funcionando

---

## 📝 Nível Médio: Catálogo de Filmes (API TMDB)

**Objetivo:** Criar um catálogo de filmes consumindo a API do The Movie Database (TMDB).

**Funcionalidades:**
- Exibir filmes populares ao carregar
- Busca de filmes por nome
- Exibir: poster, título, sinopse, nota
- Sistema de favoritos (localStorage)
- Paginação ou "Carregar mais"
- Modal com detalhes completos ao clicar

**API:**
- **TMDB:** [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
- Criar conta e obter API Key gratuita
- **Documentação:** [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)

**Endpoints úteis:**

```
# Filmes populares
GET https://api.themoviedb.org/3/movie/popular?api_key={SUA_CHAVE}&language=pt-BR

# Buscar filme
GET https://api.themoviedb.org/3/search/movie?api_key={SUA_CHAVE}&query={TERMO}&language=pt-BR

# Detalhes do filme
GET https://api.themoviedb.org/3/movie/{ID}?api_key={SUA_CHAVE}&language=pt-BR
```

**Estrutura sugerida:**

```
catalogo-filmes/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── api.js        (funções de API)
    ├── ui.js         (funções de interface)
    └── main.js       (orquestração)
```

**Critérios de avaliação:**
- [ ] Integração com API funcional
- [ ] Sistema de favoritos persistente
- [ ] UI/UX intuitiva e atraente
- [ ] Código modular (separar em módulos)
- [ ] README com instruções de setup
- [ ] Tratamento adequado de erros

**Diferencial (bônus):**
- Animações de transição
- Filtro por gênero
- Sistema de avaliação pessoal
- Deploy no GitHub Pages

---

## 📝 Nível Difícil: Dashboard Pessoal Completo

**Objetivo:** Criar um dashboard que integra múltiplas APIs e recursos.

**Funcionalidades obrigatórias:**
- **Clima:** Temperatura e previsão da sua cidade
- **Notícias:** Headlines de notícias recentes
- **Cotações:** Dólar, Euro, Bitcoin
- **Tarefas:** To-do list com localStorage
- **Relógio:** Hora atual com atualização
- **Saudação:** "Bom dia", "Boa tarde", "Boa noite"
- **Tema claro/escuro:** Toggle persistente

**APIs sugeridas:**
- Clima: OpenWeather
- Notícias: NewsAPI
- Cotações: AwesomeAPI (Brasil) ou CoinGecko
- Hora: API nativa JavaScript (Date)

**Estrutura recomendada:**

```
dashboard/
├── index.html
├── css/
│   ├── style.css
│   └── themes.css
└── js/
    ├── main.js
    ├── modules/
    │   ├── clima.js
    │   ├── noticias.js
    │   ├── cotacoes.js
    │   ├── tarefas.js
    │   └── tema.js
    └── utils/
        ├── api.js
        └── storage.js
```

**Critérios de avaliação:**
- [ ] Todas as funcionalidades implementadas
- [ ] Código modular (uso de modules)
- [ ] Design responsivo e profissional
- [ ] Loading states e tratamento de erros
- [ ] localStorage e sessionStorage
- [ ] README completo com setup
- [ ] Deploy funcional

**Diferencial (bônus):**
- Gráficos (Chart.js)
- Notificações push
- PWA (Progressive Web App)
- Autenticação (Firebase Auth)
- Dark mode com transições suaves
