import { Product } from '@/types/product'
import Cookies from 'js-cookie'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

type CkeckoutInfo = {
	firstName: string
	lastName: string
	email: string
	phone: string
	address: string
	country: string
	state: string
	city: string
	additionalInformation?: string
	coupon?: string
}

type User = {
	isAuthenticated: boolean
	data?: {
		email: string
		password: string
		phone?: number
	}
}

export type Order = {
	cart: Cart
	number: number
	status: 'paid' | 'pending' | 'delivered' | 'cancelled'
	date: string
	checkoutInfo: CkeckoutInfo
}

type Cart = (Product & { quantity: number })[]

type GlobalStore = {
	user: User
	addUser: (user: User) => void
	cart: Cart
	addToCart: (product: Product) => void
	removeFromCart: (product: Product) => void
	increaseQuantity: (product: Product) => void
	decreaseQuantity: (product: Product) => void
	order: Order[]
	addOrder: (order: Order) => void
}

const useGlobalStore = createWithEqualityFn(
	immer<GlobalStore>(set => ({
		user: Cookies.get('user')
			? JSON.parse(Cookies.get('user')!)
			: {
					isAuthenticated: false
			  },
		addUser: (user: User) =>
			set(store => {
				store.user = user
				Cookies.set('user', JSON.stringify(user))
			}),
		cart: [],
		addToCart: (product: Product) =>
			set(store => {
				store.cart.push({ ...product, quantity: 1 })
			}),
		removeFromCart: (product: Product) =>
			set(store => {
				store.cart = store.cart.filter(item => item.id !== product.id)
			}),
		increaseQuantity: (product: Product) =>
			set(store => {
				const item = store.cart.find(item => item.id === product.id)
				if (item) item.quantity++
			}),
		decreaseQuantity: (product: Product) =>
			set(store => {
				const item = store.cart.find(item => item.id === product.id)
				if (item && item.quantity > 1) item.quantity--
				else store.cart = store.cart.filter(item => item.id !== product.id)
			}),
		order: Cookies.get('order') ? JSON.parse(Cookies.get('order')!) : [],
		addOrder: (order: Order) =>
			set(store => {
				store.order.push(order)
				store.cart = []
				Cookies.set('order', JSON.stringify([...useGlobalStore.getState().order, order]))
			})
	})),
	shallow
)

export default useGlobalStore
