import useGlobalStore from '@/contexts/store'
import checkoutCredentialsSchema from '@/schemas/checkoutCredentials.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { IoMdLock } from 'react-icons/io'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useToast } from '../ui/use-toast'

type CheckoutCredentials = z.infer<typeof checkoutCredentialsSchema>

export default function Checkout() {
	const [cart, addOrder, order] = useGlobalStore(state => [state.cart, state.addOrder, state.order])

	const { toast } = useToast()

	const router = useRouter()

	const currentOrderNumber = order[order.length - 1]?.number ?? 0

	const shippingCosts = {
		shipping: 1500,
		discount: 500
	}

	const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

	const form = useForm<CheckoutCredentials>({
		resolver: zodResolver(checkoutCredentialsSchema)
	})

	function onSubmit(data: CheckoutCredentials) {
		const day = String(new Date().getDate()).padStart(2, '0')
		const month = String(new Date().getMonth() + 1).padStart(2, '0')
		const year = new Date().getFullYear()

		addOrder({
			cart,
			number: currentOrderNumber + 1,
			status: 'paid',
			date: `${day}-${month}-${year}`,
			checkoutInfo: {
				...data
			}
		})
		form.reset()
		toast({
			title: 'Order Made Successfully',
			description: 'Thank you for your order!'
		})
		router.push(`/orders/${currentOrderNumber + 1}`)
	}

	return (
		<div className='md:flex-1 rounded-lg md:py-8 md:px-12 py-6 px-6 bg-brand-secondary/10'>
			<div className='space-y-1'>
				<h4 className='font-semibold md:text-3xl text-2xl'>Checkout</h4>

				<p className='text-brand-secondary text-xs md:text-sm'>Complete your purchase by filling the information below</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='md:pt-8 pt-4 md:space-y-4 space-y-3'>
					<div className='flex items-center gap-3 md:gap-4 flex-col md:flex-row'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem className='flex-1 w-full'>
									<FormLabel hidden>First Name</FormLabel>

									<FormControl>
										<Input
											type='text'
											placeholder='First Name'
											{...field}
											className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem className='flex-1 w-full'>
									<FormLabel hidden>Last Name</FormLabel>

									<FormControl>
										<Input
											type='text'
											placeholder='Last Name'
											{...field}
											className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel hidden>Email</FormLabel>

								<FormControl>
									<Input
										type='email'
										placeholder='Email'
										{...field}
										className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel hidden>Phone</FormLabel>

								<FormControl>
									<Input
										type='number'
										inputMode='numeric'
										placeholder='Phone'
										{...field}
										className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<p className='md:text-lg font-medium pt-2 pb-1'>Shipping Address</p>

					<FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem>
								<FormLabel hidden>Address</FormLabel>

								<FormControl>
									<Input
										type='text'
										placeholder='Address'
										{...field}
										className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='country'
						render={({ field }) => (
							<FormItem>
								<FormLabel hidden>Country</FormLabel>

								<FormControl>
									<Input
										type='text'
										placeholder='Country'
										{...field}
										className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex items-center gap-3 md:gap-4 flex-col md:flex-row'>
						<FormField
							control={form.control}
							name='state'
							render={({ field }) => (
								<FormItem className='flex-1 w-full'>
									<FormLabel hidden>State</FormLabel>

									<FormControl>
										<Input
											type='text'
											placeholder='State'
											{...field}
											className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='city'
							render={({ field }) => (
								<FormItem className='flex-1 w-full'>
									<FormLabel hidden>City</FormLabel>

									<FormControl>
										<Input
											type='text'
											placeholder='City'
											{...field}
											className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='additionalInformation'
						render={({ field }) => (
							<FormItem>
								<FormLabel hidden>Additional Information</FormLabel>

								<FormControl>
									<Textarea
										placeholder='Additional Information'
										{...field}
										className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary resize-none'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<p className='text-xs md:text-sm pt-2 pb-1'>Coupon (Optional)</p>

					<FormField
						control={form.control}
						name='coupon'
						render={({ field }) => (
							<FormItem>
								<FormLabel hidden>Coupon</FormLabel>

								<FormControl>
									<Input
										type='text'
										placeholder='Coupon'
										{...field}
										className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='md:pt-8 pt-4 md:pb-14 pb-7 md:space-y-4 space-y-2'>
						<div className='flex items-center justify-between'>
							<p className='md:text-lg font-medium'>Subtotal</p>

							<p className='md:text-lg font-medium'>N{cartTotal.toLocaleString()}</p>
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
								N{(cartTotal + shippingCosts.shipping - shippingCosts.discount).toLocaleString()}
							</h5>
						</div>
					</div>

					<Button type='submit' className='md:text-base text-xs bg-brand-primary w-full py-4 md:py-5 rounded-lg mt-2 md:mt-3'>
						Pay N{(cartTotal + shippingCosts.shipping - shippingCosts.discount).toLocaleString()}
					</Button>

					<p className='text-brand-secondary text-xs md:text-sm text-center pt-2 flex items-center gap-2 justify-center'>
						<IoMdLock /> Payments are secure and encrypted
					</p>
				</form>
			</Form>
		</div>
	)
}
