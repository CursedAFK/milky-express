import useGlobalStore from '@/contexts/store'
import loginCredentialsSchema from '@/schemas/loginCredentials.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { AuthType } from './Auth'

type LoginCredentials = z.infer<typeof loginCredentialsSchema>

type LoginProps = {
	setAuthType: Dispatch<SetStateAction<AuthType>>
}

export default function Login({ setAuthType }: LoginProps) {
	const addUser = useGlobalStore(state => state.addUser)

	const { toast } = useToast()

	const form = useForm<LoginCredentials>({
		resolver: zodResolver(loginCredentialsSchema)
	})

	function onSubmit(data: LoginCredentials) {
		addUser({
			isAuthenticated: true,
			...data
		})
		form.reset()
		toast({
			title: 'Login successful',
			description: `Welcome back!`
		})
	}

	return (
		<div>
			<div className='space-y-2'>
				<h4 className='font-semibold md:text-3xl text-2xl'>Login</h4>

				<p className='text-brand-secondary text-xs md:text-sm'>Login to complete your order</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='md:pt-8 pt-4 md:space-y-4 space-y-3'>
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
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel hidden>Password</FormLabel>

								<FormControl>
									<Input
										type='password'
										placeholder='Password'
										{...field}
										className='md:text-base text-xs py-3 md:py-4 px-4 md:px-5 rounded-lg focus-visible:ring-brand-primary'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='md:text-base text-xs bg-brand-primary w-full py-4 md:py-5 rounded-lg mt-2 md:mt-3'>
						Log in
					</Button>

					<p
						className='text-brand-secondary text-xs md:text-sm text-center underline hover:text-brand-primary transition-colors cursor-pointer pt-2'
						onClick={() => setAuthType('oauth')}
					>
						Continue with Google or Facebook
					</p>
				</form>
			</Form>
		</div>
	)
}
