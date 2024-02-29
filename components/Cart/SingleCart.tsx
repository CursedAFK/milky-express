import useGlobalStore from '@/contexts/store'
import { Product } from '@/types/product'
import Image from 'next/image'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useToast } from '../ui/use-toast'

type SingleCartProps = {
	item: Product & {
		quantity: number
	}
}

export default function SingleCart({ item }: SingleCartProps) {
	const [increaseQuantity, decreaseQuantity, removeFromCart, cart] = useGlobalStore(state => [
		state.increaseQuantity,
		state.decreaseQuantity,
		state.removeFromCart,
		state.cart
	])

	const { toast } = useToast()

	return (
		<div className='flex items-center justify-between rounded-2xl shadow-lg md:px-3 md:py-3 px-2 py-1'>
			<div className='flex items-center md:gap-2 gap-1'>
				<div className='relative md:h-[6rem] md:w-[6rem] h-[5rem] w-[5rem] overflow-hidden rounded-3xl'>
					<Image src={item.image[0]} alt={item.name} fill className='object-contain' />
				</div>

				<p className='font-medium text-sm md:text-base w-[40%] md:w-full'>{item.name}</p>
			</div>

			<div className='flex items-center md:gap-8 gap-4'>
				<div className='flex items-center gap-2 md:text-base text-sm'>
					<button onClick={() => increaseQuantity(item)} className='font-semibold'>
						+
					</button>

					<p className='rounded-lg border grid place-items-center md:h-10 md:w-8 h-8 w-6'>
						{cart.find(cartItem => cartItem.id === item.id)?.quantity}
					</p>

					<button onClick={() => decreaseQuantity(item)} className='font-semibold'>
						-
					</button>
				</div>

				<p className='font-semibold text-sm md:text-base'>N{item.price.toLocaleString()}</p>

				<RiDeleteBin6Line
					onClick={() => {
						removeFromCart(item)
						toast({
							title: 'Removed from cart',
							description: `${item.name} removed from cart successfully`,
							variant: 'destructive'
						})
					}}
					className='text-brand-secondary hover:text-brand-primary transition-colors cursor-pointer md:text-xl text-lg'
				/>
			</div>
		</div>
	)
}
