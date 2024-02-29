import useGlobalStore from '@/contexts/store'
import { Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlinePrinter } from 'react-icons/hi2'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { Button } from '../ui/button'

type OrderItemProps = {
	cartItem: Product & {
		quantity: number
	}
}

type OrderDetailsProps = {
	currentOrderId: number | undefined
}

function OrderItem({ cartItem }: OrderItemProps) {
	return (
		<div className='flex items-center gap-2'>
			<div className='flex items-center md:gap-8 gap-4 flex-1'>
				<div className='relative md:h-[6rem] md:w-[6rem] h-[5rem] w-[5rem] overflow-hidden rounded-3xl'>
					<Image src={cartItem.image[0]} alt={cartItem.name} fill className='object-contain' />
				</div>

				<p className='font-medium text-sm md:text-base w-[40%] md:w-full'>{cartItem.name}</p>
			</div>

			<p className='font-semibold text-sm md:text-base'>N{cartItem.price.toLocaleString()}</p>
		</div>
	)
}

export default function OrderDetails({ currentOrderId }: OrderDetailsProps) {
	const order = useGlobalStore(state => state.order)

	const orderDetails = order.find(order => order.number === currentOrderId)

	const shippingCosts = {
		shipping: 1500,
		discount: 500
	}

	const cartTotal = orderDetails?.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

	if (!orderDetails) return null

	return (
		<div className='md:flex-1 rounded-3xl md:py-10 md:px-14 py-8 px-6 bg-brand-secondary/10 md:space-y-6 space-y-4'>
			<div className='relative w-24 h-24 md:h-36 md:w-36 bg-white overflow-hidden rounded-full mx-auto'>
				<Image src={'/images/Logo Milky.png'} alt='Milky Express' fill className='object-contain' />
			</div>

			<div className='text-center md:space-y-2 space-y-1'>
				<h4 className='font-semibold md:text-3xl text-2xl'>Order #{orderDetails.number}</h4>

				<div className='flex items-center justify-center md:gap-6 gap-4'>
					<p className='md:text-base text-smfont-medium flex items-center gap-1'>
						Status: <IoIosCheckmarkCircle className='text-green-600' />{' '}
						<span className='text-brand-secondary capitalize'>{orderDetails.status}</span>
					</p>

					<p className='md:text-base text-smfont-medium flex items-center gap-1'>
						Date: <span className='text-brand-secondary'>{orderDetails.date}</span>
					</p>
				</div>
			</div>

			<Button className='bg-brand-primary w-full justify-start cursor-default pointer-events-none rounded-lg md:text-base text-sm'>Order Summary</Button>

			{orderDetails.cart.map(cartItem => (
				<OrderItem cartItem={cartItem} key={cartItem.id} />
			))}

			<div className='md:pt-8 pt-4 md:pb-14 pb-7 md:space-y-4 space-y-2'>
				<div className='flex items-center justify-between'>
					<p className='md:text-lg font-medium'>Subtotal</p>

					<p className='md:text-lg font-medium'>N{cartTotal?.toLocaleString()}</p>
				</div>

				<div className='flex items-center justify-between'>
					<p className='md:text-lg font-medium'>Shipping</p>

					<p className='md:text-lg font-medium'>N{shippingCosts.shipping.toLocaleString()}</p>
				</div>

				<div className='flex items-center justify-between'>
					<p className='md:text-lg font-medium'>Discount</p>

					<p className='md:text-lg font-medium'>N{shippingCosts.discount.toLocaleString()}</p>
				</div>

				<div className='flex items-center justify-between md:pt-4 pt-2'>
					<h5 className='font-semibold md:text-2xl text-xl'>Total</h5>

					<h5 className='font-semibold md:text-2xl text-xl'>
						N{(cartTotal ?? 0 + shippingCosts.shipping - shippingCosts.discount).toLocaleString()}
					</h5>
				</div>
			</div>

			<Button className='bg-brand-primary w-full justify-start cursor-default pointer-events-none rounded-lg md:text-base text-sm'>
				Account Summary
			</Button>

			<div className='md:pt-8 pt-4 md:pb-14 pb-7 md:space-y-4 space-y-2'>
				<div className='flex items-center justify-between'>
					<p className='md:text-lg font-medium'>First Name</p>

					<p className='md:text-base text-sm text-right font-medium text-brand-secondary'>{orderDetails.checkoutInfo.firstName}</p>
				</div>

				<div className='flex items-center justify-between'>
					<p className='md:text-lg font-medium'>Last Name</p>

					<p className='md:text-base text-sm text-right font-medium text-brand-secondary'>{orderDetails.checkoutInfo.lastName}</p>
				</div>

				<div className='flex items-center justify-between'>
					<p className='md:text-lg font-medium'>Email</p>

					<p className='md:text-base text-sm text-right font-medium text-brand-secondary'>{orderDetails.checkoutInfo.email}</p>
				</div>

				<div className='flex items-center justify-between'>
					<p className='md:text-lg font-medium'>Phone</p>

					<p className='md:text-base text-sm text-right font-medium text-brand-secondary'>+234{orderDetails.checkoutInfo.phone.slice(1)}</p>
				</div>

				<div className='flex items-center justify-between'>
					<p className='md:text-lg font-medium'>Address</p>

					<p className='md:text-base text-sm text-right font-medium text-brand-secondary'>{orderDetails.checkoutInfo.address}</p>
				</div>
			</div>

			<Link
				href={`/orders/${orderDetails.number}/print`}
				className='md:text-lg font-medium text-brand-secondary flex items-center justify-center gap-2 hover:text-brand-primary transition-colors md:py-6 py-4 text-center w-full'
			>
				<HiOutlinePrinter /> Print
			</Link>
		</div>
	)
}
