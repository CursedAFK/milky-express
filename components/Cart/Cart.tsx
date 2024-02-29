import useGlobalStore from '@/contexts/store'
import SingleCart from './SingleCart'

export default function Cart() {
	const cart = useGlobalStore(state => state.cart)

	return (
		<div className='md:flex-1'>
			<div className='space-y-1'>
				<h4 className='font-semibold md:text-3xl text-2xl'>Cart</h4>

				<p className='text-brand-secondary text-sm md:text-base'>
					{cart.length > 0 ? `You have ${cart.reduce((acc, item) => acc + item.quantity, 0)} items in your cart` : 'Your cart is empty'}
				</p>
			</div>

			{cart.length > 0 && (
				<div className='md:pt-8 pt-4 md:space-y-4 space-y-3'>
					{cart.map(item => (
						<SingleCart key={item.id} item={item} />
					))}
				</div>
			)}
		</div>
	)
}
