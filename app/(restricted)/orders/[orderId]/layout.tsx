import React from 'react'

export async function generateMetadata({
	params
}: {
	params: {
		orderId: string
	}
}) {
	return {
		title: `Order #${params.orderId} | Milky Express Shop`
	}
}

export default function SingleOrderLayout({ children }: { children: React.ReactNode }) {
	return children
}
