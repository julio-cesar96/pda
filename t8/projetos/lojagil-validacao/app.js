import { schemaProduto } from './src/utils/schemas.js';

const bom = schemaProduto.safeParse({
    nome: 'Teclado',
    preco: 100,
});

console.log(bom.success);
console.log(bom.data);

const ruim = schemaProduto.safeParse({
    nome: 'Teclado',
    preco: 'abc'
})

console.log(ruim.success);
console.log(ruim.data);
console.log(ruim.error.issues[0].message);