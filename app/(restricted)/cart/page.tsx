'use client'

import Auth from '@/components/Auth/Auth'
import CartGroup from '@/components/Cart/Cart'
import Checkout from '@/components/Checkout/Checkout'
import useGlobalStore from '@/contexts/store'
import { container } from '@/lib/utils'
import Link from 'next/link'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

export default function Cart() {
	const [user, cart] = useGlobalStore(state => [state.user, state.cart])

	return (
		<div className={`${container} pb-20 md:pb-24`}>
			<Link href={'/'} className='flex items-center md:gap-4 gap-2 font-medium hover:text-brand-primary md:py-4 py-3'>
				<MdOutlineKeyboardArrowLeft className='transition-colors md:text-xl text-lg' />

				<p className='md:text-lg transition-colors'>Continue Shopping</p>
			</Link>

			<div className='flex flex-col md:flex-row md:gap-16 gap-12 md:pt-6 pt-4'>
				<CartGroup />

				{cart.length > 0 && (user.isAuthenticated ? <Checkout /> : <Auth />)}
			</div>
		</div>
	)
}
