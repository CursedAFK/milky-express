import useGlobalStore from '@/contexts/store'
import signupCredentialsSchema from '@/schemas/signupCredentials.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { AuthType } from './Auth'

type SignupCredentials = z.infer<typeof signupCredentialsSchema>

type SignupProps = {
	setAuthType: Dispatch<SetStateAction<AuthType>>
}

export default function Signup({ setAuthType }: SignupProps) {
	const addUser = useGlobalStore(state => state.addUser)

	const { toast } = useToast()

	const form = useForm<SignupCredentials>({
		resolver: zodResolver(signupCredentialsSchema)
	})

	function onSubmit(data: SignupCredentials) {
		addUser({
			isAuthenticated: true,
			...data
		})
		form.reset()
		toast({
			title: 'Sign up successful',
			description: `Welcome to Milky Express!`
		})
	}

	return (
		<div>
			<div className='space-y-2'>
				<h4 className='font-semibold md:text-3xl text-2xl'>Sign Up</h4>

				<p className='text-brand-secondary text-xs md:text-sm'>Sign up to get started</p>
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

					<Button type='submit' className='md:text-base text-xs bg-brand-primary w-full py-4 md:py-5 rounded-lg mt-2 md:mt-3'>
						Sign up
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
