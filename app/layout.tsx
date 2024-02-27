import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Miky Experss Shop',
	description:
		'Milky Express: Your dairy destination for premium milk, yogurts, cheeses & plant-based alternatives. Ethically sourced, deliciously crafted. Join us on a journey of taste!',
	openGraph: {
		title: 'Milky Express',
		description:
			'Milky Express: Your dairy destination for premium milk, yogurts, cheeses & plant-based alternatives. Ethically sourced, deliciously crafted. Join us on a journey of taste!',
		images: ['/images/screenshot.png'],
		url: 'https://milky-express.vercel.app/'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={poppins.className}>{children}</body>
		</html>
	)
}
