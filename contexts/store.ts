import { Product } from '@/types/product'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import Cookies from 'js-cookie'

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
		phone: number
	}
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
	order: (Cart & {
		number: number
		status: 'paid' | 'pending' | 'delivered' | 'cancelled'
		checkoutInfo: CkeckoutInfo
	})[]
}

const useGlobalStore = create(
	immer<GlobalStore>(set => ({
		user: {
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
				else store.removeFromCart(product)
			}),
		order: []
	}))
)

export default useGlobalStore
