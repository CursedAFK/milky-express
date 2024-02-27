import React from 'react'

type Props = {
	params: {
		productId: string
	}
}

export default function Product({ params }: Props) {
	return <div>Product {params.productId}</div>
}
