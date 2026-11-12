# 📊 Visualização de Dados em React

> *"Transforme dados em insights visuais"*

---

## 📋 Índice

1. [Bibliotecas de Charts](#bibliotecas-de-charts)
2. [Recharts - Simples e Composable](#recharts)
3. [Victory - Flexível e Modular](#victory)
4. [Chart.js com React](#chartjs)
5. [D3.js com React](#d3js)
6. [Visx - D3 + React](#visx)
7. [Mapas e Geolocalização](#mapas)
8. [Dashboards](#dashboards)
9. [Performance](#performance)
10. [Acessibilidade em Charts](#acessibilidade)

---

## 📚 Bibliotecas de Charts

### Comparação

| Biblioteca | Tamanho | Dificuldade | Customização | Best For |
|-----------|---------|-------------|--------------|----------|
| **Recharts** | ~150KB | Fácil | Média | Charts simples, protótipos |
| **Victory** | ~200KB | Fácil | Alta | Gráficos modulares |
| **Chart.js** | ~60KB | Fácil | Baixa | Charts básicos, performance |
| **D3.js** | ~150KB | Difícil | Total | Visualizações complexas |
| **Visx** | ~100KB | Médio | Alta | D3 com React patterns |
| **Nivo** | ~200KB | Médio | Alta | Dashboards completos |

---

## 📈 Recharts - Simples e Composable

### Instalação

```bash
npm install recharts
```

### Line Chart

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', vendas: 4000, despesas: 2400 },
  { month: 'Fev', vendas: 3000, despesas: 1398 },
  { month: 'Mar', vendas: 2000, despesas: 9800 },
  { month: 'Abr', vendas: 2780, despesas: 3908 },
  { month: 'Mai', vendas: 1890, despesas: 4800 },
  { month: 'Jun', vendas: 2390, despesas: 3800 },
];

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="vendas" 
          stroke="#8884d8" 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="despesas" 
          stroke="#82ca9d" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### Bar Chart

```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Product A', vendas: 4000, meta: 5000 },
  { name: 'Product B', vendas: 3000, meta: 3500 },
  { name: 'Product C', vendas: 2000, meta: 2800 },
  { name: 'Product D', vendas: 2780, meta: 2000 },
  { name: 'Product E', vendas: 1890, meta: 2200 },
];

export function ProductSalesChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="vendas" fill="#8884d8" />
        <Bar dataKey="meta" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

### Pie Chart

```tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export function DeviceChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
```

### Area Chart com Gradiente

```tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export function GradientAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="vendas" 
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#colorVendas)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

---

## 🎯 Victory - Flexível e Modular

### Instalação

```bash
npm install victory
```

### Line Chart

```tsx
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

const data = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 7 },
];

export function VictoryLineChart() {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={<VictoryVoronoiContainer />}
    >
      <VictoryAxis />
      <VictoryAxis dependentAxis />
      <VictoryLine
        data={data}
        style={{
          data: { stroke: '#c43a31' },
          parent: { border: '1px solid #ccc' },
        }}
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  );
}
```

### Composed Chart

```tsx
import { VictoryChart, VictoryBar, VictoryLine, VictoryAxis } from 'victory';

export function ComposedChart() {
  const barData = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
  ];
  
  const lineData = [
    { x: 1, y: 3 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
  ];
  
  return (
    <VictoryChart>
      <VictoryAxis />
      <VictoryAxis dependentAxis />
      <VictoryBar data={barData} style={{ data: { fill: '#c43a31' } }} />
      <VictoryLine data={lineData} style={{ data: { stroke: '#000' } }} />
    </VictoryChart>
  );
}
```

---

## 📊 Chart.js com React

### Instalação

```bash
npm install react-chartjs-2 chart.js
```

### Setup

```tsx
// App.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
```

### Line Chart

```tsx
import { Line } from 'react-chartjs-2';

export function ChartJsLineChart() {
  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Vendas',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vendas Mensais',
      },
    },
  };
  
  return <Line data={data} options={options} />;
}
```

### Bar Chart

```tsx
import { Bar } from 'react-chartjs-2';

export function ChartJsBarChart() {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return <Bar data={data} />;
}
```

---

## 🎨 D3.js com React

### Instalação

```bash
npm install d3
npm install -D @types/d3
```

### Bar Chart com D3

```tsx
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  name: string;
  value: number;
}

interface D3BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

export function D3BarChart({ data, width = 500, height = 300 }: D3BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Limpar antes de renderizar
    
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Scales
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, innerWidth])
      .padding(0.1);
    
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);
    
    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));
    
    g.append('g')
      .call(d3.axisLeft(y));
    
    // Bars
    g.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name) || 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.value))
      .attr('fill', 'steelblue')
      .on('mouseover', function() {
        d3.select(this).attr('fill', 'orange');
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', 'steelblue');
      });
    
  }, [data, width, height]);
  
  return <svg ref={svgRef} width={width} height={height} />;
}

// Uso
const data = [
  { name: 'A', value: 30 },
  { name: 'B', value: 80 },
  { name: 'C', value: 45 },
  { name: 'D', value: 60 },
  { name: 'E', value: 20 },
];

<D3BarChart data={data} />
```

---

## 🌟 Visx - D3 + React

### Instalação

```bash
npm install @visx/visx
```

### Line Chart

```tsx
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';

interface DataPoint {
  date: Date;
  value: number;
}

interface VisxLineChartProps {
  data: DataPoint[];
  width: number;
  height: number;
}

export function VisxLineChart({ data, width, height }: VisxLineChartProps) {
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Accessors
  const getDate = (d: DataPoint) => d.date;
  const getValue = (d: DataPoint) => d.value;
  
  // Scales
  const xScale = scaleTime({
    domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
    range: [0, innerWidth],
  });
  
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(getValue))],
    range: [innerHeight, 0],
    nice: true,
  });
  
  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
        />
        <AxisLeft scale={yScale} />
        <LinePath
          data={data}
          x={d => xScale(getDate(d))}
          y={d => yScale(getValue(d))}
          stroke="#8884d8"
          strokeWidth={2}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  );
}
```

---

## 🗺️ Mapas e Geolocalização

### React Leaflet

```bash
npm install react-leaflet leaflet
npm install -D @types/leaflet
```

```tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function Map() {
  const position: [number, number] = [-23.5505, -46.6333]; // São Paulo
  
  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          São Paulo, Brasil
        </Popup>
      </Marker>
    </MapContainer>
  );
}
```

---

## 📱 Dashboards

### Layout Responsivo

```tsx
import { LineChart, BarChart, PieChart } from './charts';

export function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard de Vendas</h1>
      </header>
      
      <div className="dashboard-grid">
        {/* KPIs */}
        <div className="kpi-card">
          <h3>Vendas Totais</h3>
          <p className="kpi-value">R$ 1.234.567</p>
          <p className="kpi-change positive">+12% vs mês anterior</p>
        </div>
        
        <div className="kpi-card">
          <h3>Novos Clientes</h3>
          <p className="kpi-value">1.234</p>
          <p className="kpi-change positive">+5%</p>
        </div>
        
        <div className="kpi-card">
          <h3>Taxa de Conversão</h3>
          <p className="kpi-value">23.5%</p>
          <p className="kpi-change negative">-2%</p>
        </div>
        
        {/* Charts */}
        <div className="chart-card">
          <h3>Vendas ao Longo do Tempo</h3>
          <LineChart data={salesData} />
        </div>
        
        <div className="chart-card">
          <h3>Vendas por Produto</h3>
          <BarChart data={productData} />
        </div>
        
        <div className="chart-card">
          <h3>Vendas por Categoria</h3>
          <PieChart data={categoryData} />
        </div>
      </div>
    </div>
  );
}
```

---

## ⚡ Performance

### Memoização de Charts

```tsx
import { memo } from 'react';

export const ExpensiveChart = memo(({ data }: { data: DataPoint[] }) => {
  return <LineChart data={data} />;
}, (prevProps, nextProps) => {
  // Custom comparison
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});
```

### Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
```

### Virtualização para Muitos Dados

```tsx
// Usar react-window para renderizar apenas itens visíveis
import { FixedSizeList } from 'react-window';

function LargeDatasetChart({ data }) {
  // Renderizar apenas subset visível
  const visibleData = data.slice(startIndex, endIndex);
  
  return <LineChart data={visibleData} />;
}
```

---

## ♿ Acessibilidade em Charts

### Textos Alternativos

```tsx
<div role="img" aria-label="Gráfico de linha mostrando vendas de janeiro a junho, com pico em março">
  <LineChart data={data} />
</div>
```

### Tabela de Dados Alternativa

```tsx
function AccessibleChart({ data }) {
  const [showTable, setShowTable] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowTable(!showTable)}>
        {showTable ? 'Mostrar gráfico' : 'Mostrar tabela'}
      </button>
      
      {showTable ? (
        <table>
          <caption>Vendas por mês</caption>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Vendas</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.month}>
                <td>{item.month}</td>
                <td>{item.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <LineChart data={data} />
      )}
    </>
  );
}
```

---

## 📚 Recursos

- [Recharts Docs](https://recharts.org/)
- [Victory Docs](https://formidable.com/open-source/victory/)
- [Chart.js Docs](https://www.chartjs.org/)
- [D3.js Docs](https://d3js.org/)
- [Visx Docs](https://airbnb.io/visx/)

---

**Próximo:** Segurança em React 🛡️
