import { Order } from '@/contexts/store'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { FaArrowRight } from 'react-icons/fa6'

type SingleOrderProps = {
	item: Order
	currentOrderId: number | undefined
	setcurrentOrderId: Dispatch<SetStateAction<number | undefined>>
}

export default function SingleOrder({ item, currentOrderId, setcurrentOrderId }: SingleOrderProps) {
	return (
		<div
			className={`flex items-center gap-2 rounded-3xl md:px-4 md:py-2 px-4 py-0 group ${
				item.number === currentOrderId && 'border border-brand-primary'
			} hover:border hover:border-brand-primary transition-all cursor-pointer`}
			onClick={() => setcurrentOrderId(item.number)}
		>
			<div className='flex items-center gap-2 flex-1'>
				<div className='relative md:h-[6rem] md:w-[6rem] h-[5rem] w-[5rem] overflow-hidden rounded-3xl'>
					<Image src={item.cart[0].image[0]} alt={item.cart[0].name} fill className='object-contain' />
				</div>

				<div className='md:space-y-1 space-y-0'>
					<p className='md:text-lg font-medium group-hover:text-brand-primary transition-colors'>Order #{item.number}</p>

					<div className='text-brand-secondary text-xs md:text-sm w-[90%]'>
						{item.cart.map((cartItem, index) => (
							<span key={cartItem.id}>
								{cartItem.name}
								{index !== item.cart.length - 1 && ', '}
							</span>
						))}
					</div>
				</div>
			</div>

			<FaArrowRight className='text-brand-secondary group-hover:text-brand-primary transition-colors md:text-xl text-lg' />
		</div>
	)
}
