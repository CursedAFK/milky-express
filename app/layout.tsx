import Header from '@/components/Header/Header'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
	display: 'swap'
})

export const metadata: Metadata = {
	metadataBase: new URL('https://milky-express.vercel.app/'),
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
			<body className={poppins.className}>
				<Header />
				{children}
				<Toaster />
			</body>
		</html>
	)
}
