import useGlobalStore from '@/contexts/store'
import { Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

type ProductProps = {
	backgroundColor?: boolean
	product: Product
}

export default function Product({ product, backgroundColor }: ProductProps) {
	const [addToCart, increaseQuantity, decreaseQuantity, cart] = useGlobalStore(state => [
		state.addToCart,
		state.increaseQuantity,
		state.decreaseQuantity,
		state.cart
	])

	const { toast } = useToast()

	return (
		<div className={`border-2 rounded py-5 px-4 space-y-3 ${backgroundColor && 'bg-white'}`}>
			<Link href={`/product/${product.id}`}>
				<div className='w-full h-56 relative overflow-hidden group'>
					<Image src={product.image[0]} alt={product.name} fill className='object-contain group-hover:scale-105 transition-transform' />
				</div>
			</Link>

			<Link href={`/product/${product.id}`} className='font-medium transition-colors hover:text-brand-primary'>
				{product.name}
			</Link>

			<p className='text-brand-secondary text-sm'>{product.description.short}</p>

			<div className='flex items-center justify-between pt-4'>
				<p className='font-semibold'>{product.price.toLocaleString()} NGN</p>

				{cart.find(item => item.id === product.id) ? (
					<div className='flex items-center gap-2'>
						<button onClick={() => increaseQuantity(product)} className='font-semibold'>
							+
						</button>

						<p className='rounded-lg border grid place-items-center h-10 w-8'>{cart.find(item => item.id === product.id)?.quantity}</p>

						<button onClick={() => decreaseQuantity(product)} className='font-semibold'>
							-
						</button>
					</div>
				) : (
					<Button
						onClick={() => {
							addToCart(product)
							toast({
								title: 'Added to cart',
								description: `${product.name} added to cart successfully`
							})
						}}
						className='bg-brand-primary'
					>
						Add to cart
					</Button>
				)}
			</div>
		</div>
	)
}
