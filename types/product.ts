export type Product = {
	id: string
	name: string
	price: number
	description: {
		short: string
		long: string
	}
	image: string[]
	addons: {
		name: string
		type: string[]
	}
}
