import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Orders | Milky Express Shop'
}

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
	return children
}
