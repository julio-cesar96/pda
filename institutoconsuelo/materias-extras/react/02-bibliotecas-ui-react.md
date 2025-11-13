# 🎨 Bibliotecas de UI para React

> *"Não reinvente a roda. Use componentes prontos e personalize."*

---

## 📋 Índice

1. [Introdução](#introdução)
2. [Tailwind CSS](#tailwind-css)
3. [shadcn/ui](#shadcnui)
4. [Radix UI](#radix-ui)
5. [Chakra UI](#chakra-ui)
6. [Ant Design](#ant-design)
7. [Material-UI (MUI)](#material-ui-mui)
8. [Comparação e Escolha](#comparação-e-escolha)

---

## 🎯 Introdução

Bibliotecas de UI aceleram o desenvolvimento fornecendo componentes prontos, acessíveis e responsivos.

### 📊 Panorama Geral

| Biblioteca | Tipo | Bundle | Customização | Acessibilidade |
|------------|------|--------|--------------|----------------|
| **Tailwind** | Utility-First | ~50kb | 🟢🟢🟢 | ⚠️ Manual |
| **shadcn/ui** | Componentes Copiáveis | Variável | 🟢🟢🟢 | ✅ |
| **Radix UI** | Primitivos Headless | ~20kb | 🟢🟢🟢 | ✅ |
| **Chakra UI** | Sistema Completo | ~150kb | 🟢🟢 | ✅ |
| **Ant Design** | Enterprise | ~600kb | 🟢 | ✅ |
| **MUI** | Material Design | ~300kb | 🟢🟢 | ✅ |

---

## 🌊 Tailwind CSS

### O que é?

Framework CSS **utility-first** - você constrói interfaces combinando classes utilitárias.

### 📦 Instalação

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**tailwind.config.js:**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
      },
    },
  },
  plugins: [],
}
```

**index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 🎨 Exemplo de Uso

```javascript
function Button({ children, variant = 'primary' }) {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-300";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  };
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}

// Uso
<Button variant="primary">Salvar</Button>
<Button variant="outline">Cancelar</Button>
```

### 🎯 Classes Responsivas

```javascript
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4
">
  {/* Mobile: 1 coluna, Tablet: 2 colunas, Desktop: 3 colunas */}
</div>
```

### ✅ Prós e Contras

**Prós:**
- ✅ Bundle pequeno (apenas classes usadas)
- ✅ Não precisa escrever CSS
- ✅ Velocidade de desenvolvimento
- ✅ Consistência visual

**Contras:**
- ❌ HTML "poluído" com muitas classes
- ❌ Curva de aprendizado inicial
- ❌ Acessibilidade manual

---

## 🎭 shadcn/ui

### O que é?

**Coleção de componentes copiáveis** construídos com Radix UI + Tailwind. Você **copia** o código para seu projeto.

### 📦 Instalação

```bash
npx shadcn-ui@latest init
```

### 🔧 Adicionar Componentes

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

Componentes são adicionados em `src/components/ui/`.

### 🎨 Exemplo de Uso

```javascript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Dashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Conteúdo do card</p>
        <Button>Ação Principal</Button>
        <Button variant="outline">Cancelar</Button>
      </CardContent>
    </Card>
  );
}
```

### ✅ Prós e Contras

**Prós:**
- ✅ Você **possui** o código (não é dependência)
- ✅ Totalmente customizável
- ✅ Componentes acessíveis (Radix UI)
- ✅ Bundle otimizado

**Contras:**
- ❌ Precisa copiar/atualizar manualmente
- ❌ Requer Tailwind CSS
- ❌ Menos componentes que bibliotecas completas

---

## ⚛️ Radix UI

### O que é?

Biblioteca de **primitivos headless** (sem estilos). Você fornece o CSS.

### 📦 Instalação

```bash
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
```

### 🎨 Exemplo: Modal

```javascript
import * as Dialog from '@radix-ui/react-dialog';
import './modal.css';

function Modal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn-primary">Abrir Modal</button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">
            Confirmar Ação
          </Dialog.Title>
          <Dialog.Description className="dialog-description">
            Tem certeza que deseja continuar?
          </Dialog.Description>
          
          <div className="dialog-actions">
            <Dialog.Close asChild>
              <button className="btn-secondary">Cancelar</button>
            </Dialog.Close>
            <button className="btn-danger">Confirmar</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### ✅ Prós e Contras

**Prós:**
- ✅ Acessibilidade perfeita
- ✅ Estilização total liberdade
- ✅ Bundle pequeno
- ✅ Lógica complexa pronta (foco, teclado, etc.)

**Contras:**
- ❌ Você precisa estilizar tudo
- ❌ Mais trabalho inicial
- ❌ Verboso (muitos componentes)

---

## ⚡ Chakra UI

### O que é?

Sistema de componentes completo com **theme system** poderoso.

### 📦 Instalação

```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

**main.jsx:**
```javascript
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
```

### 🎨 Exemplo de Uso

```javascript
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  useToast
} from '@chakra-ui/react';

function Dashboard() {
  const toast = useToast();
  
  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Heading mb={4}>Dashboard</Heading>
      
      <Stack spacing={4}>
        <Box 
          bg="white" 
          p={6} 
          borderRadius="lg" 
          boxShadow="md"
        >
          <Text fontSize="lg">Conteúdo do card</Text>
          
          <Button 
            colorScheme="blue"
            mt={4}
            onClick={() => toast({
              title: 'Sucesso',
              status: 'success',
              duration: 3000
            })}
          >
            Mostrar Toast
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
```

### 🎨 Tema Customizado

```javascript
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e3f2fd',
      500: '#2196f3',
      900: '#0d47a1',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
});

<ChakraProvider theme={theme}>
  <App />
</ChakraProvider>
```

### ✅ Prós e Contras

**Prós:**
- ✅ Componentes prontos e bonitos
- ✅ Props de estilo (sx, bg, p, m, etc.)
- ✅ Dark mode integrado
- ✅ Acessibilidade excelente

**Contras:**
- ❌ Bundle maior (~150kb)
- ❌ Dependência do Emotion
- ❌ Curva de aprendizado (theme system)

---

## 🐜 Ant Design

### O que é?

Biblioteca **enterprise-grade** com +50 componentes complexos.

### 📦 Instalação

```bash
npm install antd
```

### 🎨 Exemplo de Uso

```javascript
import { Button, Card, Table, Tag, Space } from 'antd';

function ProductsList() {
  const columns = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Preço', dataIndex: 'price', key: 'price' },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.inStock ? 'green' : 'red'}>
          {record.inStock ? 'Disponível' : 'Esgotado'}
        </Tag>
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="primary" size="small">Editar</Button>
          <Button danger size="small">Deletar</Button>
        </Space>
      ),
    },
  ];
  
  const data = [
    { key: '1', name: 'Notebook', price: 'R$ 2.500', inStock: true },
    { key: '2', name: 'Mouse', price: 'R$ 50', inStock: false },
  ];
  
  return (
    <Card title="Produtos">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
}
```

### ✅ Prós e Contras

**Prós:**
- ✅ Componentes complexos (Table, Form, Upload, etc.)
- ✅ Design profissional
- ✅ Ótima documentação
- ✅ Ideal para dashboards/admin

**Contras:**
- ❌ Bundle muito grande (~600kb)
- ❌ Estilo opinativo (difícil customizar)
- ❌ Curva de aprendizado

---

## 🎨 Material-UI (MUI)

### O que é?

Implementação do **Material Design** do Google para React.

### 📦 Instalação

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### 🎨 Exemplo de Uso

```javascript
import {
  Button,
  Card,
  CardContent,
  Typography,
  Stack
} from '@mui/material';

function Dashboard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Dashboard
        </Typography>
        
        <Stack spacing={2} direction="row">
          <Button variant="contained">Salvar</Button>
          <Button variant="outlined">Cancelar</Button>
          <Button variant="text">Mais</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
```

### ✅ Prós e Contras

**Prós:**
- ✅ Material Design consistente
- ✅ Componentes ricos
- ✅ Tema poderoso
- ✅ Grande comunidade

**Contras:**
- ❌ Bundle grande (~300kb)
- ❌ Dependência do Emotion
- ❌ Estilo opinativo

---

## 📊 Comparação e Escolha

### Matriz de Decisão

| Cenário | Recomendação |
|---------|--------------|
| **Startup/MVP rápido** | Tailwind + shadcn/ui |
| **Customização total** | Radix UI + CSS próprio |
| **Dashboard Enterprise** | Ant Design ou MUI |
| **App moderno/startup** | Chakra UI |
| **Design System próprio** | Tailwind ou Radix UI |
| **Projeto pequeno** | Tailwind puro |

### Bundle Size Comparison

```
Tailwind CSS:     ~50kb  (apenas classes usadas)
Radix UI:         ~20kb  (por componente)
shadcn/ui:        ~30kb  (componentes copiados)
Chakra UI:       ~150kb  (completo)
MUI:             ~300kb  (completo)
Ant Design:      ~600kb  (completo)
```

### Performance Impact

```javascript
// ⚡ Rápido: Tailwind/shadcn (CSS estático)
<div className="px-4 py-2 bg-blue-500">Fast</div>

// 🟡 Médio: Chakra (runtime styles)
<Box px={4} py={2} bg="blue.500">Medium</Box>

// 🔴 Mais lento: Ant Design (muitos componentes)
<Button type="primary">Slower</Button>
```

---

## 🎯 Recomendação Final

### Para Iniciantes:
```
1. Tailwind CSS (aprender utility-first)
2. shadcn/ui (componentes prontos)
```

### Para Projetos Reais:
```
- Startup: Chakra UI ou Tailwind + shadcn/ui
- Enterprise: Ant Design ou MUI
- Design System: Radix UI + Tailwind
```

### Combinações Populares:
```
✅ Tailwind + shadcn/ui (melhor DX)
✅ Radix UI + Tailwind (máximo controle)
✅ Chakra UI (tudo incluso)
```

---

## 📚 Recursos

- **Tailwind:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com
- **Radix UI:** https://www.radix-ui.com
- **Chakra UI:** https://chakra-ui.com
- **Ant Design:** https://ant.design
- **MUI:** https://mui.com

---

**Próximo:** Styled Components (CSS-in-JS avançado) 💅
