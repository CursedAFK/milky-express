import React from 'react'

type Props = {
	params: {
		orderId: string
	}
}

export default function Order({ params }: Props) {
	return <div>Order {params.orderId}</div>
}
