# 🧪 Atividades em Sala

## Atividade 1: Buscador de Pokémon com PokéAPI

**Objetivo:** Criar uma aplicação que busca informações de Pokémon usando a PokéAPI.

**Requisitos funcionais:**
- Campo de texto para digitar o nome do Pokémon
- Botão "Buscar" e busca ao pressionar Enter
- Exibir: imagem, nome, altura, peso, tipos e habilidades
- Tratamento de erros (Pokémon não encontrado)
- Estado de loading durante a busca
- Design responsivo e atraente

**API:**
- **Documentação:** [https://pokeapi.co/](https://pokeapi.co/)
- **Endpoint:** `https://pokeapi.co/api/v2/pokemon/{nome-ou-id}`

**Exemplo de resposta da API:**

```json
{
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
  "types": [
    {
      "type": {
        "name": "electric"
      }
    }
  ],
  "abilities": [
    {
      "ability": {
        "name": "static"
      }
    }
  ]
}
```

**Estrutura sugerida:**

```
pokedex/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

**Checklist de implementação:**
- [ ] HTML com estrutura semântica
- [ ] Estilização com CSS (Flexbox/Grid)
- [ ] Função `buscarPokemon(nome)` com fetch
- [ ] Função `exibirPokemon(dados)`
- [ ] Função `exibirErro(mensagem)`
- [ ] Função `exibirLoading()`
- [ ] Event listeners (click e Enter)
- [ ] Try/catch para tratamento de erros
- [ ] Testes manuais com diferentes Pokémon

**Diferencial (bônus):**
- Busca com debounce (sugestões enquanto digita)
- Histórico de buscas (localStorage)
- Botão "Aleatório" para buscar Pokémon random
- Comparação entre dois Pokémon lado a lado

---

## Atividade 2: Dashboard de Clima com OpenWeather API

**Objetivo:** Criar um dashboard que exibe informações climáticas de uma cidade.

**Requisitos funcionais:**
- Campo para digitar nome da cidade
- Exibir: temperatura, descrição, umidade, velocidade do vento
- Ícone do clima
- Previsão para os próximos dias (opcional)
- Tratamento de erros (cidade não encontrada)

**API:**
- **OpenWeather:** [https://openweathermap.org/api](https://openweathermap.org/api)
- Criar conta gratuita e obter API Key
- **Endpoint:** `https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={SUA_CHAVE}&units=metric&lang=pt_br`

**Exemplo de resposta:**

```json
{
  "name": "São Paulo",
  "main": {
    "temp": 25.5,
    "humidity": 60
  },
  "weather": [
    {
      "description": "céu limpo",
      "icon": "01d"
    }
  ],
  "wind": {
    "speed": 3.5
  }
}
```

**Checklist:**
- [ ] Obter API Key do OpenWeather
- [ ] Função `buscarClima(cidade, apiKey)`
- [ ] Exibir temperatura em Celsius
- [ ] Ícone do clima (usar URL da API)
- [ ] Design responsivo
- [ ] Salvar última cidade buscada (localStorage)
