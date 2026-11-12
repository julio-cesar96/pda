# 📝 React Hook Form + Zod - Formulários Profissionais

> *"Formulários performáticos com validação type-safe"*

---

## 📋 Por que React Hook Form + Zod?

### Problema: Formulários Tradicionais

```javascript
// ❌ Muitos useState, re-renders, validação manual
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!name) newErrors.name = 'Nome obrigatório';
  if (!email.includes('@')) newErrors.email = 'Email inválido';
  return newErrors;
};
```

### Solução: React Hook Form + Zod

```javascript
// ✅ Performance, validação automática, type-safe
const schema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

---

## 📦 Instalação

```bash
npm install react-hook-form zod @hookform/resolvers
```

---

## 🎯 Exemplo Básico

```javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema de validação
const schema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Deve ser maior de 18 anos'),
});

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = async (data) => {
    console.log(data); // { name: '...', email: '...', age: 25 }
    
    await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} placeholder="Nome" />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      
      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      
      <div>
        <input 
          {...register('age', { valueAsNumber: true })} 
          type="number" 
          placeholder="Idade" 
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Cadastrar'}
      </button>
    </form>
  );
}
```

---

## 🔍 Zod - Validações Avançadas

### Tipos Comuns

```javascript
import { z } from 'zod';

const schema = z.object({
  // String
  name: z.string().min(3).max(50),
  email: z.string().email(),
  url: z.string().url(),
  
  // Number
  age: z.number().int().positive().min(18).max(120),
  price: z.number().positive(),
  
  // Boolean
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar os termos',
  }),
  
  // Date
  birthDate: z.date().max(new Date(), 'Data não pode ser futura'),
  
  // Enum
  role: z.enum(['admin', 'user', 'guest']),
  
  // Array
  tags: z.array(z.string()).min(1, 'Adicione pelo menos 1 tag'),
  
  // Object
  address: z.object({
    street: z.string(),
    number: z.number(),
    city: z.string(),
  }),
  
  // Optional
  phone: z.string().optional(),
  
  // Nullable
  middleName: z.string().nullable(),
  
  // Union
  id: z.union([z.string(), z.number()]),
});
```

### Validações Customizadas

```javascript
const schema = z.object({
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter letra maiúscula')
    .regex(/[a-z]/, 'Deve conter letra minúscula')
    .regex(/[0-9]/, 'Deve conter número')
    .regex(/[^A-Za-z0-9]/, 'Deve conter caractere especial'),
  
  confirmPassword: z.string(),
  
  cpf: z.string()
    .length(11, 'CPF deve ter 11 dígitos')
    .regex(/^\d+$/, 'Apenas números')
    .refine(validateCPF, 'CPF inválido'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});

function validateCPF(cpf) {
  // Lógica de validação de CPF
  return true;
}
```

---

## 🎨 Componentes Reutilizáveis

### Input Component

```javascript
function Input({ label, error, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} className={error ? 'input-error' : ''} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Uso
<Input 
  label="Nome" 
  {...register('name')} 
  error={errors.name?.message} 
/>
```

### Form Component com TypeScript

```typescript
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data); // TypeScript sabe que data é { name: string, email: string }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ... */}
    </form>
  );
}
```

---

## 📋 Exemplo Completo: Formulário de Produto

```javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string()
    .min(3, 'Nome muito curto')
    .max(100, 'Nome muito longo'),
  
  description: z.string()
    .min(10, 'Descrição muito curta')
    .max(500, 'Descrição muito longa'),
  
  price: z.number()
    .positive('Preço deve ser positivo')
    .max(1000000, 'Preço muito alto'),
  
  category: z.enum(['electronics', 'clothing', 'food', 'other'], {
    errorMap: () => ({ message: 'Categoria inválida' }),
  }),
  
  inStock: z.boolean(),
  
  tags: z.array(z.string())
    .min(1, 'Adicione pelo menos 1 tag')
    .max(5, 'Máximo 5 tags'),
  
  images: z.array(z.string().url())
    .min(1, 'Adicione pelo menos 1 imagem')
    .max(10, 'Máximo 10 imagens'),
});

type ProductFormData = z.infer<typeof productSchema>;

function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      inStock: true,
      tags: [],
      images: [],
    },
  });
  
  // Watch para mostrar preview
  const price = watch('price');
  
  const onSubmit = async (data: ProductFormData) => {
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      alert('Produto criado com sucesso!');
      reset();
    } catch (error) {
      alert('Erro ao criar produto');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome *</label>
        <input {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      
      <div>
        <label>Descrição *</label>
        <textarea {...register('description')} rows={4} />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      
      <div>
        <label>Preço *</label>
        <input 
          {...register('price', { valueAsNumber: true })} 
          type="number" 
          step="0.01"
        />
        {errors.price && <span>{errors.price.message}</span>}
        {price && <p>Preview: R$ {price.toFixed(2)}</p>}
      </div>
      
      <div>
        <label>Categoria *</label>
        <select {...register('category')}>
          <option value="">Selecione...</option>
          <option value="electronics">Eletrônicos</option>
          <option value="clothing">Roupas</option>
          <option value="food">Alimentos</option>
          <option value="other">Outros</option>
        </select>
        {errors.category && <span>{errors.category.message}</span>}
      </div>
      
      <div>
        <label>
          <input {...register('inStock')} type="checkbox" />
          Em estoque
        </label>
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
      </button>
    </form>
  );
}
```

---

## 🔄 Valores Padrão e Reset

```javascript
const { register, handleSubmit, reset, setValue } = useForm({
  defaultValues: {
    name: 'Produto Exemplo',
    price: 100,
  },
});

// Resetar para valores padrão
<button type="button" onClick={() => reset()}>
  Resetar
</button>

// Resetar com novos valores
<button type="button" onClick={() => reset({ name: 'Novo', price: 50 })}>
  Resetar com novos valores
</button>

// Setar valor individual
<button type="button" onClick={() => setValue('name', 'Novo Nome')}>
  Mudar nome
</button>
```

---

## 🔍 Validação Assíncrona

```javascript
const schema = z.object({
  username: z.string()
    .min(3)
    .refine(async (username) => {
      const response = await fetch(`/api/check-username?username=${username}`);
      const { available } = await response.json();
      return available;
    }, {
      message: 'Nome de usuário já existe',
    }),
});
```

---

## 🎯 Field Array (Listas Dinâmicas)

```javascript
import { useForm, useFieldArray } from 'react-hook-form';

const schema = z.object({
  productName: z.string(),
  variants: z.array(z.object({
    size: z.string(),
    color: z.string(),
    stock: z.number(),
  })).min(1, 'Adicione pelo menos 1 variante'),
});

function ProductForm() {
  const { register, control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('productName')} />
      
      <h3>Variantes</h3>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`variants.${index}.size`)} placeholder="Tamanho" />
          <input {...register(`variants.${index}.color`)} placeholder="Cor" />
          <input {...register(`variants.${index}.stock`, { valueAsNumber: true })} type="number" />
          <button type="button" onClick={() => remove(index)}>Remover</button>
        </div>
      ))}
      
      <button type="button" onClick={() => append({ size: '', color: '', stock: 0 })}>
        Adicionar Variante
      </button>
      
      <button type="submit">Salvar</button>
    </form>
  );
}
```

---

## ✅ Best Practices

### 1. Sempre use Zod

```javascript
// ✅ Validação type-safe com Zod
const schema = z.object({
  email: z.string().email(),
});

// ❌ Validação manual
validate: (value) => value.includes('@') || 'Email inválido'
```

### 2. Extraia Schemas Reutilizáveis

```javascript
// schemas/user.ts
export const emailSchema = z.string().email('Email inválido');
export const passwordSchema = z.string().min(8, 'Mínimo 8 caracteres');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(3),
  confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});
```

### 3. Mostre Erros Apenas Após Submeter

```javascript
const { formState: { errors, isSubmitted } } = useForm();

// Mostra erro apenas após primeira submissão
{isSubmitted && errors.name && <span>{errors.name.message}</span>}
```

### 4. Use TypeScript

```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

type FormData = z.infer<typeof schema>;

const { register } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

---

## 📚 Recursos

- [React Hook Form Docs](https://react-hook-form.com)
- [Zod Docs](https://zod.dev)

---

**Próximo:** Hooks Essenciais do React ⚓
