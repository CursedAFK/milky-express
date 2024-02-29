import { Product } from '@/types/product'

export const products: Product[] = [
	{
		id: '01',
		name: 'Milky Lactation Cookies',
		price: 3000,
		description: {
			short: 'Lactation cookies to improve production of breastmilk',
			long: 'Imagine being a mother who works every morning and still having to take care of the baby. Our lactation cookies are specially made for you. Available in 2 flavors, you can have more than one kind of cookie because it’s so yummy. You might eat it too fast because it tastes so good'
		},
		addons: {
			name: 'flavor',
			type: ['vanilla', 'strawberry', 'chocolate']
		},
		image: ['/images/milky lactose cookies v1.png', '/images/milky lactose cookies v2.png', '/images/milky lactose cookies v2.png']
	},
	{
		id: '02',
		name: 'Breast Milk Bag',
		price: 4500,
		description: {
			short: 'Lactation cookies to improve production of breastmilk',
			long: 'Imagine being a mother who works every morning and still having to take care of the baby. Our lactation cookies are specially made for you. Available in 2 flavors, you can have more than one kind of cookie because it’s so yummy. You might eat it too fast because it tastes so good'
		},
		addons: {
			name: 'flavor',
			type: ['vanilla', 'strawberry', 'chocolate']
		},
		image: ['/images/breast milk bag.png', '/images/milky lactose cookies v2.png', '/images/milky lactose cookies v2.png']
	},
	{
		id: '03',
		name: 'Milky Enrich Shakes',
		price: 3500,
		description: {
			short: 'Lactation cookies to improve production of breastmilk',
			long: 'Imagine being a mother who works every morning and still having to take care of the baby. Our lactation cookies are specially made for you. Available in 2 flavors, you can have more than one kind of cookie because it’s so yummy. You might eat it too fast because it tastes so good'
		},
		addons: {
			name: 'flavor',
			type: ['vanilla', 'strawberry', 'chocolate']
		},
		image: ['/images/milky enrichment.png', '/images/milky lactose cookies v2.png', '/images/milky lactose cookies v2.png']
	},
	{
		id: '04',
		name: 'Milky Lactation Tea',
		price: 6000,
		description: {
			short: 'Lactation cookies to improve production of breastmilk',
			long: 'Imagine being a mother who works every morning and still having to take care of the baby. Our lactation cookies are specially made for you. Available in 2 flavors, you can have more than one kind of cookie because it’s so yummy. You might eat it too fast because it tastes so good'
		},
		addons: {
			name: 'flavor',
			type: ['vanilla', 'strawberry', 'chocolate']
		},
		image: ['/images/milky lactose tea.png', '/images/milky lactose cookies v2.png', '/images/milky lactose cookies v2.png']
	},
	{
		id: '05',
		name: 'Milky Lactation Granola',
		price: 4000,
		description: {
			short: 'Lactation cookies to improve production of breastmilk',
			long: 'Imagine being a mother who works every morning and still having to take care of the baby. Our lactation cookies are specially made for you. Available in 2 flavors, you can have more than one kind of cookie because it’s so yummy. You might eat it too fast because it tastes so good'
		},
		addons: {
			name: 'flavor',
			type: ['vanilla', 'strawberry', 'chocolate']
		},
		image: ['/images/milky lactose granola.png', '/images/milky lactose cookies v2.png', '/images/milky lactose cookies v2.png']
	}
]
