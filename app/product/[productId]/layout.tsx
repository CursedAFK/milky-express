import { products } from '@/db/products'
import React from 'react'

export async function generateMetadata({
	params
}: {
	params: {
		productId: string
	}
}) {
	const product = products.find(product => product.id === params.productId)

	return {
		title: `${product?.name} | Milky Express Shop`
	}
}

export default function SingleProductLayout({ children }: { children: React.ReactNode }) {
	return children
}
