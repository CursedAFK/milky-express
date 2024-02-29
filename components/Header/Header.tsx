'use client'

import useGlobalStore from '@/contexts/store'
import { container } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileHeader from './MobileHeader'

export default function Header() {
	const cart = useGlobalStore(state => state.cart)

	const pathname = usePathname()

	return (
		<>
			{pathname.includes('print') ? null : (
				<header className={`flex items-center justify-between py-3 md:py-4 ${container}`}>
					<MobileHeader />

					<Image src={'/images/Logo Milky.png'} alt='Milky Express' priority width={155} height={135} className='w-24 h-auto md:w-36' />

					<div className='flex gap-10 items-center'>
						<nav className='gap-10 items-center hidden md:flex text-sm uppercase'>
							<Link href={'/'} className='transition-colors hover:text-brand-primary'>
								Home
							</Link>

							<Link href={'/orders'} className='transition-colors hover:text-brand-primary'>
								My Order
							</Link>
						</nav>

						<Link href={'/cart'} className='flex items-center gap-2 group'>
							<div className='grid place-items-center w-14 h-14 md:w-16 md:h-16 bg-brand-primary rounded-full relative'>
								<Image src={'/images/cart icon.png'} alt='cart' priority width={43} height={59} className='w-9 md:w-10 h-auto' />

								<p className='absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm md:hidden'>
									{cart.reduce((acc, item) => acc + item.quantity, 0)}
								</p>
							</div>

							<div className='-space-y-1 group-hover:text-brand-primary transition-colors hidden md:block'>
								<h5 className='font-semibold'>Cart</h5>

								<p className='text-xs text-brand-secondary'>{cart.reduce((acc, item) => acc + item.quantity, 0)} Items</p>
							</div>
						</Link>
					</div>
				</header>
			)}
		</>
	)
}
