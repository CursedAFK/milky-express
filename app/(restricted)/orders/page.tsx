'use client'

import OrderDetails from '@/components/Order/OrderDetails'
import SingleOrder from '@/components/Order/SingleOrder'
import useGlobalStore from '@/contexts/store'
import { container } from '@/lib/utils'
import { useState } from 'react'

export default function Orders() {
	const order = useGlobalStore(state => state.order)

	const [currentOrderId, setcurrentOrderId] = useState(order.length > 0 ? order[0].number : undefined)

	return (
		<div className={`${container} pb-20 md:pb-24`}>
			<div className='flex flex-col md:flex-row md:gap-16 gap-12 md:pt-6 pt-4'>
				<div className='md:w-[35%]'>
					<div className='space-y-1'>
						<h4 className='font-semibold md:text-3xl text-2xl'>My orders</h4>

						<p className='text-brand-secondary text-sm md:text-base'>
							{order.length > 0 ? `You have ${order.length} orders` : 'Your order is empty'}
						</p>
					</div>

					{order.length > 0 && (
						<div className='md:pt-8 pt-4 md:space-y-4 space-y-3'>
							{order.map(item => (
								<SingleOrder key={item.number} item={item} currentOrderId={currentOrderId} setcurrentOrderId={setcurrentOrderId} />
							))}
						</div>
					)}
				</div>

				{order.length > 0 && <OrderDetails currentOrderId={currentOrderId} />}
			</div>
		</div>
	)
}
