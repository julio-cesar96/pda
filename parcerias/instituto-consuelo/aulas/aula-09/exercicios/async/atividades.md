# 🏠 Atividades Assíncronas - React: Fundamentos e Componentes

---

## 🎯 Objetivo

Estas atividades devem ser realizadas **fora do horário de aula** para praticar e consolidar os conhecimentos adquiridos. Cada atividade possui um nível de dificuldade progressivo e deve ser entregue conforme orientações do professor.

---

## ✅ Atividade 1: Conversor de Moedas (Simples)

**Nível:** 🟢 Simples  
**Tempo estimado:** 30-40 minutos  
**Conceitos:** Estado, Formulários controlados, Cálculos dinâmicos

### 📋 Descrição

Crie um **conversor de moedas** que permite converter valores entre Real (BRL), Dólar (USD) e Euro (EUR) usando taxas de câmbio fixas.

### 🎯 Requisitos

1. **Interface:**
   - Campo de entrada para o valor
   - Select para moeda de origem
   - Select para moeda de destino
   - Exibir resultado da conversão em tempo real

2. **Moedas suportadas:**
   - BRL (Real Brasileiro)
   - USD (Dólar Americano)
   - EUR (Euro)

3. **Taxas de câmbio fixas (base BRL):**
   ```javascript
   const taxas = {
     BRL: 1,
     USD: 0.20,  // 1 BRL = 0.20 USD
     EUR: 0.18   // 1 BRL = 0.18 EUR
   };
   ```

4. **Funcionalidades:**
   - Conversão acontece automaticamente ao digitar
   - Validar entrada (apenas números)
   - Formatar valores com 2 casas decimais
   - Botão para inverter moedas (origem ⇄ destino)

5. **Estados necessários:**
   - `valor` - valor a ser convertido
   - `moedaOrigem` - moeda de origem
   - `moedaDestino` - moeda de destino

### 💡 Exemplo de Interface

```
┌──────────────────────────────────────┐
│      💰 Conversor de Moedas          │
├──────────────────────────────────────┤
│  Valor: [_________] 100.00           │
│                                      │
│  De:    [BRL ▼]                     │
│         ↕️ [Inverter]                │
│  Para:  [USD ▼]                     │
│                                      │
│  Resultado: $ 20.00 USD              │
└──────────────────────────────────────┘
```

### 🧮 Lógica de Conversão

```javascript
// Converter de qualquer moeda para BRL primeiro
const valorEmBRL = moedaOrigem === 'BRL' 
  ? valor 
  : valor / taxas[moedaOrigem];

// Depois converter de BRL para moeda destino
const resultado = moedaDestino === 'BRL'
  ? valorEmBRL
  : valorEmBRL * taxas[moedaDestino];
```

### ✅ Critérios de Avaliação

- [ ] Conversão funciona corretamente para todas as combinações
- [ ] Validação de entrada (apenas números)
- [ ] Formatação com 2 casas decimais
- [ ] Botão inverter moedas funciona
- [ ] Interface limpa e organizada
- [ ] Código bem estruturado

### 📦 Entrega

- Criar repositório no GitHub
- Fazer commits organizados
- Incluir README.md com instruções
- Enviar link do repositório

---

## 🔄 Atividade 2: Galeria de Imagens com Unsplash API (Moderado)

**Nível:** 🟡 Moderado  
**Tempo estimado:** 60-90 minutos  
**Conceitos:** useEffect, Fetch API, Renderização de listas, Eventos, Loading states

### 📋 Descrição

Crie uma **galeria de imagens** que busca fotos da API do Unsplash, com funcionalidades de busca, paginação e visualização em modal.

### 🎯 Requisitos

1. **API a utilizar:**
   - **Unsplash API:** https://unsplash.com/developers
   - **Endpoint:** `https://api.unsplash.com/search/photos`
   - **Documentação:** https://unsplash.com/documentation
   
   > ⚠️ **Importante:** Você precisa criar uma conta gratuita no Unsplash e obter uma Access Key.

2. **Configuração inicial:**
   ```javascript
   const ACCESS_KEY = 'SUA_ACCESS_KEY_AQUI';
   const BASE_URL = 'https://api.unsplash.com';
   ```

3. **Componentes:**
   - `Galeria` (componente principal)
   - `BarraBusca` (campo de busca)
   - `GridImagens` (grid de imagens)
   - `CardImagem` (item individual)
   - `Modal` (visualização em tela cheia)
   - `Loading` (spinner de carregamento)
   - `Paginacao` (controles de página)

4. **Funcionalidades:**

   **a) Busca de Imagens:**
   - Campo de busca com botão
   - Buscar ao pressionar Enter
   - Query inicial: "nature" (ao carregar)
   - Exibir 12 imagens por página

   **b) Exibição:**
   - Grid responsivo (3 colunas desktop, 2 tablet, 1 mobile)
   - Mostrar autor da foto
   - Hover com overlay de informações
   - Loading spinner durante requisição

   **c) Modal:**
   - Clicar na imagem abre em tela cheia
   - Exibir informações: título, autor, descrição
   - Botão de fechar (X)
   - Fechar ao clicar fora da imagem

   **d) Paginação:**
   - Botões "Anterior" e "Próxima"
   - Indicador de página atual
   - Desabilitar "Anterior" na primeira página

   **e) Tratamento de Erros:**
   - Mensagem se busca não retornar resultados
   - Mensagem de erro se requisição falhar
   - Validação de campo vazio

5. **Estados necessários:**
   - `imagens` - array de imagens
   - `loading` - estado de carregamento
   - `erro` - mensagem de erro
   - `busca` - termo de busca
   - `pagina` - página atual
   - `modalAberto` - boolean
   - `imagemSelecionada` - imagem do modal

### 💡 Exemplo de Requisição

```javascript
const buscarImagens = async (query, pagina = 1) => {
  try {
    setLoading(true);
    setErro(null);
    
    const response = await fetch(
      `${BASE_URL}/search/photos?query=${query}&page=${pagina}&per_page=12`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Erro ao buscar imagens');
    }
    
    const data = await response.json();
    setImagens(data.results);
  } catch (error) {
    setErro(error.message);
  } finally {
    setLoading(false);
  }
};
```

### 🎨 Estrutura de Dados (Unsplash)

```javascript
{
  id: "abc123",
  urls: {
    small: "https://...",    // Para grid
    regular: "https://...",  // Para modal
  },
  user: {
    name: "John Doe",
    username: "johndoe"
  },
  description: "Beautiful landscape",
  alt_description: "green trees near lake"
}
```

### 🎨 Exemplo de Interface

```
┌─────────────────────────────────────────────┐
│           🖼️ Galeria de Imagens             │
│   [___________buscar____________] [🔍]      │
├─────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐             │
│  │ img1 │  │ img2 │  │ img3 │             │
│  │ foto │  │ foto │  │ foto │             │
│  └──────┘  └──────┘  └──────┘             │
│  ┌──────┐  ┌──────┐  ┌──────┐             │
│  │ img4 │  │ img5 │  │ img6 │             │
│  │ foto │  │ foto │  │ foto │             │
│  └──────┘  └──────┘  └──────┘             │
├─────────────────────────────────────────────┤
│      [← Anterior] Página 1 [Próxima →]     │
└─────────────────────────────────────────────┘
```

### ✅ Critérios de Avaliação

**Funcionalidades (50%):**
- [ ] Busca de imagens funciona (15%)
- [ ] Grid responsivo exibe imagens corretamente (10%)
- [ ] Modal abre/fecha corretamente (10%)
- [ ] Paginação funciona (10%)
- [ ] Loading e erro tratados (5%)

**Interface (25%):**
- [ ] Design limpo e organizado
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Hover effects nas imagens
- [ ] Modal com boa apresentação

**Código (25%):**
- [ ] Componentização adequada
- [ ] Uso correto de useEffect
- [ ] Async/await para requisições
- [ ] Código limpo e comentado

### 🎁 Desafios Extras (Opcional)

- [ ] Adicionar filtro por orientação (landscape/portrait)
- [ ] Infinite scroll em vez de paginação
- [ ] Botão de download da imagem
- [ ] Compartilhar imagem (copiar URL)
- [ ] Galeria de favoritos (localStorage)
- [ ] Dark mode toggle

---

## 🚀 Atividade 3: Aplicação de Clima com Previsão (Difícil)

**Nível:** 🔴 Difícil  
**Tempo estimado:** 120-150 minutos  
**Conceitos:** Múltiplas APIs, Estado complexo, Geolocalização, Charts, LocalStorage

### 📋 Descrição

Crie uma **aplicação completa de previsão do tempo** que busca dados climáticos em tempo real, exibe gráficos de temperatura, e salva cidades favoritas.

### 🎯 Requisitos

1. **APIs a utilizar:**
   
   **OpenWeatherMap API:**
   - **Site:** https://openweathermap.org/
   - **Current Weather:** `https://api.openweathermap.org/data/2.5/weather`
   - **5 Day Forecast:** `https://api.openweathermap.org/data/2.5/forecast`
   - **Documentação:** https://openweathermap.org/api
   
   > ⚠️ **Importante:** Criar conta gratuita e obter API Key

2. **Componentes:**
   - `App` (componente principal)
   - `BarraBusca` (buscar cidade)
   - `CardClima` (clima atual)
   - `PrevisaoSemanal` (próximos 5 dias)
   - `GraficoTemperatura` (gráfico de linha)
   - `ListaFavoritos` (cidades salvas)
   - `DetalhesClima` (humidade, vento, etc.)
   - `Loading` e `Erro`

3. **Funcionalidades Principais:**

   **a) Busca de Cidade:**
   - Campo de busca com autocomplete (opcional)
   - Buscar ao pressionar Enter ou clicar no botão
   - Validar se cidade existe
   - Exibir erro se não encontrar

   **b) Clima Atual:**
   - Temperatura atual (°C)
   - Sensação térmica
   - Condição do tempo (nublado, ensolarado, etc.)
   - Ícone animado do clima
   - Humidade, pressão, vento
   - Nascer e pôr do sol
   - Última atualização

   **c) Previsão 5 Dias:**
   - Cards com previsão para próximos 5 dias
   - Temperatura máxima e mínima
   - Condição do tempo
   - Ícone do clima

   **d) Gráfico de Temperatura:**
   - Gráfico de linha com temperaturas das próximas horas
   - Usar biblioteca (Chart.js ou Recharts)
   - Mostrar temperaturas de 3 em 3 horas (próximas 24h)

   **e) Cidades Favoritas:**
   - Botão de adicionar aos favoritos (⭐)
   - Lista de cidades favoritas (máx 5)
   - Clicar no favorito carrega clima
   - Remover dos favoritos
   - Persistir no localStorage

   **f) Geolocalização:**
   - Botão "Usar minha localização"
   - Solicitar permissão de localização
   - Buscar clima da localização atual

   **g) Extras:**
   - Toggle Celsius/Fahrenheit
   - Dark mode
   - Animações de transição
   - Ícones animados do clima

4. **Estados necessários:**
   ```javascript
   const [climaAtual, setClimaAtual] = useState(null);
   const [previsao, setPrevisao] = useState([]);
   const [loading, setLoading] = useState(false);
   const [erro, setErro] = useState(null);
   const [cidadeBusca, setCidadeBusca] = useState('');
   const [favoritos, setFavoritos] = useState([]);
   const [unidade, setUnidade] = useState('metric'); // metric = Celsius
   const [modoEscuro, setModoEscuro] = useState(false);
   ```

### 💡 Exemplo de Requisição

```javascript
const API_KEY = 'SUA_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Clima atual
const buscarClimaAtual = async (cidade) => {
  try {
    setLoading(true);
    setErro(null);
    
    const response = await fetch(
      `${BASE_URL}/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`
    );
    
    if (!response.ok) {
      throw new Error('Cidade não encontrada');
    }
    
    const data = await response.json();
    setClimaAtual(data);
  } catch (error) {
    setErro(error.message);
  } finally {
    setLoading(false);
  }
};

// Previsão 5 dias
const buscarPrevisao = async (cidade) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`
  );
  const data = await response.json();
  setPrevisao(data.list);
};
```

### 🎨 Estrutura de Dados (OpenWeather)

```javascript
// Clima Atual
{
  name: "São Paulo",
  main: {
    temp: 25.5,
    feels_like: 26.2,
    temp_min: 23,
    temp_max: 28,
    pressure: 1015,
    humidity: 65
  },
  weather: [
    {
      main: "Clouds",
      description: "nublado",
      icon: "04d"
    }
  ],
  wind: {
    speed: 3.5
  },
  sys: {
    sunrise: 1234567890,
    sunset: 1234567890
  }
}

// Previsão (array de objetos similares)
```

### 🎨 Layout Sugerido

```
┌─────────────────────────────────────────────────────┐
│  ☀️ WeatherApp           [Buscar: ___] 🔍  [☾/☀]   │
├─────────────────────────────────────────────────────┤
│  📍 São Paulo, BR                    ⭐ Favoritar   │
│                                                     │
│  ┌───────────────────────────────────────────┐     │
│  │     ☁️                                     │     │
│  │     25°C   Nublado                        │     │
│  │     Sensação: 26°C                        │     │
│  │                                            │     │
│  │  💧 65%  💨 3.5 km/h  🌅 06:15  🌇 18:30   │     │
│  └───────────────────────────────────────────┘     │
│                                                     │
│  📊 Temperatura nas próximas 24h                   │
│  ┌───────────────────────────────────────────┐     │
│  │  [Gráfico de linha aqui]                  │     │
│  └───────────────────────────────────────────┘     │
│                                                     │
│  📅 Previsão 5 dias                                │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │Seg │ │Ter │ │Qua │ │Qui │ │Sex │              │
│  │☀️  │ │⛅ │ │🌧️ │ │☁️  │ │⛈️ │              │
│  │28°C│ │26°C│ │22°C│ │24°C│ │23°C│              │
│  │20°C│ │19°C│ │18°C│ │19°C│ │18°C│              │
│  └────┘ └────┘ └────┘ └────┘ └────┘              │
│                                                     │
│  ⭐ Favoritos: [Rio] [Curitiba] [Brasília]         │
└─────────────────────────────────────────────────────┘
```

### 📦 Bibliotecas Recomendadas

```bash
npm install recharts  # Para gráficos
# ou
npm install chart.js react-chartjs-2
```

### ✅ Critérios de Avaliação

**Funcionalidades (50%):**
- [ ] Busca de clima funciona corretamente (10%)
- [ ] Clima atual exibido com todos os dados (10%)
- [ ] Previsão 5 dias funciona (10%)
- [ ] Gráfico de temperatura renderizado (10%)
- [ ] Favoritos com localStorage (10%)

**Interface e UX (25%):**
- [ ] Layout responsivo e organizado
- [ ] Loading e erro bem tratados
- [ ] Ícones de clima adequados
- [ ] Animações e transições suaves
- [ ] Dark mode funcional (se implementado)

**Código e Arquitetura (25%):**
- [ ] Componentização bem estruturada
- [ ] Custom hooks para lógica reutilizável
- [ ] Tratamento de erros robusto
- [ ] Código limpo e bem documentado
- [ ] Performance otimizada

### 🎁 Desafios Extras (Opcional)

- [ ] Mapa interativo mostrando localização
- [ ] Qualidade do ar (Air Quality Index)
- [ ] Alertas de tempo severo
- [ ] Histórico de buscas
- [ ] Compartilhar clima nas redes sociais
- [ ] PWA (Progressive Web App)
- [ ] Testes unitários com Jest

### 📚 Recursos Úteis

- **OpenWeather Icons:** https://openweathermap.org/weather-conditions
- **Recharts Docs:** https://recharts.org/
- **Geolocation API:** https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

---

## 📦 Instruções de Entrega

### Para todas as atividades:

1. **Repositório GitHub:**
   - Criar repositório público
   - README.md completo com:
     - Descrição do projeto
     - Instruções de instalação
     - Como obter API keys (se necessário)
     - Screenshots da aplicação
     - Tecnologias utilizadas

2. **Código:**
   - Commits organizados e descritivos
   - Código limpo e comentado
   - Sem node_modules (usar .gitignore)

3. **Deploy (Recomendado):**
   - Vercel, Netlify ou GitHub Pages
   - Incluir link do deploy no README

4. **Prazo:**
   - Conforme orientação do professor

5. **Formato de Entrega:**
   - Link do repositório GitHub
   - Link do deploy (se houver)
   - Enviar via plataforma da instituição

---

## 💡 Dicas Gerais

- Comece pela funcionalidade básica, depois adicione melhorias
- Teste em diferentes tamanhos de tela (responsividade)
- Use console.log para debugar
- Leia a documentação das APIs com atenção
- Não copie código pronto, aprenda fazendo!
- Peça ajuda quando travar, mas tente resolver primeiro

---

## 📞 Suporte

Dúvidas podem ser enviadas:
- Email do professor
- Fórum da disciplina
- Grupo da turma

**Bons estudos e excelente desenvolvimento! 🚀⚛️**
