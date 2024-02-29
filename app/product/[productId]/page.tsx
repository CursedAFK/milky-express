'use client'

import ProductTemplate from '@/components/Product/Product'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import useGlobalStore from '@/contexts/store'
import { products } from '@/db/products'
import { container } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
	params: {
		productId: string
	}
}

export default function Product({ params }: Props) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const [addToCart, increaseQuantity, decreaseQuantity, cart] = useGlobalStore(state => [
		state.addToCart,
		state.increaseQuantity,
		state.decreaseQuantity,
		state.cart
	])

	const { toast } = useToast()

	const product = products.find(product => product.id === params.productId)

	if (!product) {
		return <p className='text-center text-lg md:text-xl font-semibold pt-20 md:pt-16'>Product not found ...</p>
	}

	const productQuantity = cart.find(item => item.id === product.id)?.quantity

	return (
		<div>
			<div className={`${container} flex gap-8 flex-col md:flex-row pt-14 md:pt-10 pb-20 md:pb-24`}>
				<div className='md:flex-1 space-y-4'>
					<div className='relative w-full h-[20rem] md:h-[37.5rem] border rounded-md shadow group overflow-hidden'>
						<Image
							src={product.image[currentImageIndex]}
							alt={product.name}
							fill
							className='object-contain group-hover:scale-105 transition-transform'
						/>
					</div>

					<div className='flex gap-2 md:gap-6 items-center'>
						{product.image.map((image, index) => (
							<div
								key={index}
								className={`relative flex-1 h-[7rem] md:h-[10rem] rounded-md cursor-pointer overflow-hidden group ${
									index === currentImageIndex && 'border-2 border-brand-primary'
								}`}
								onClick={() => setCurrentImageIndex(index)}
							>
								<Image src={image} alt={product.name} fill className='object-cover group-hover:scale-110 transition-transform' />
							</div>
						))}
					</div>
				</div>

				<div className='md:flex-1'>
					<div className='md:px-5 pt-6 md:pt-4 space-y-6 md:space-y-8'>
						<h2 className='font-semibold text-4xl md:text-5xl'>{product.name}</h2>

						<h4 className='font-medium text-2xl md:text-3xl'>{product.price.toLocaleString()} NGN</h4>

						<p className='text-brand-secondary md:text-lg'>{product.description.long}</p>

						<Select
							onValueChange={() =>
								toast({
									title: 'Coming Soon',
									description: 'This feature is coming soon!'
								})
							}
						>
							<SelectTrigger className='w-[50%] md:w-[32.5%] border-brand-primary text-brand-primary'>
								<SelectValue placeholder={`Choose a ${product.addons.name}`} />
							</SelectTrigger>

							<SelectContent className='border-brand-primary text-brand-primary'>
								{product.addons.type.map(type => (
									<SelectItem key={type} value={type}>
										{type}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<div className='pt-6 md:pt-8 flex gap-12 md:gap-14 items-center'>
							<Button
								onClick={() => {
									addToCart(product)
									toast({
										title: 'Added to cart',
										description: `${product.name} added to cart successfully`
									})
								}}
								className='bg-brand-primary'
								disabled={cart.find(item => item.id === product.id) ? true : false}
							>
								Add to cart
							</Button>

							<div className={`flex items-center gap-2 ${!productQuantity && 'opacity-60 pointer-events-none'}`}>
								<button onClick={() => increaseQuantity(product)} className='font-semibold'>
									+
								</button>

								<p className='rounded-lg border grid place-items-center h-10 w-8'>{productQuantity ?? 0}</p>

								<button onClick={() => decreaseQuantity(product)} className='font-semibold'>
									-
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='py-20 md:py-24 bg-brand-primary/10'>
				<div className={`${container}`}>
					<h3 className='font-semibold text-center pb-10 md:pb-12 text-2xl md:text-3xl'>Related Products</h3>

					<div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-4'>
						{products
							.filter(product => product.id !== params.productId)
							.map(product => (
								<ProductTemplate product={product} key={product.id} backgroundColor />
							))}
					</div>
				</div>
			</div>
		</div>
	)
}
