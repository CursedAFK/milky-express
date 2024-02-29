import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Cart | Milky Express Shop'
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
	return children
}
