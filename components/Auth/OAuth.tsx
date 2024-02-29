import { Dispatch, SetStateAction } from 'react'
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { AuthType } from './Auth'

type OAuthProps = {
	setAuthType: Dispatch<SetStateAction<AuthType>>
}

export default function OAuth({ setAuthType }: OAuthProps) {
	const { toast } = useToast()

	return (
		<div>
			<div className='space-y-2'>
				<h4 className='font-semibold md:text-3xl text-2xl'>Login</h4>

				<p className='text-brand-secondary text-xs md:text-sm'>Login to complete your order</p>
			</div>

			<div className='md:pt-8 pt-4 md:space-y-4 space-y-3'>
				<Button
					onClick={() =>
						toast({
							title: 'Coming Soon',
							description: 'This feature is coming soon!'
						})
					}
					className='bg-brand-primary w-full flex items-center gap-3'
				>
					<FaGoogle className='text-xl' />

					<p>Continue with Google</p>
				</Button>

				<Button
					onClick={() =>
						toast({
							title: 'Coming Soon',
							description: 'This feature is coming soon!'
						})
					}
					className='bg-brand-primary w-full flex items-center gap-3'
				>
					<FaFacebookSquare className='text-xl' />

					<p>Continue with Facebook</p>
				</Button>

				<p className='text-brand-secondary text-xs md:text-sm text-center'>
					Or use your password to{' '}
					<span className='underline hover:text-brand-primary transition-colors cursor-pointer' onClick={() => setAuthType('signup')}>
						sign up
					</span>{' '}
					or{' '}
					<span className='underline hover:text-brand-primary transition-colors cursor-pointer' onClick={() => setAuthType('login')}>
						login
					</span>
				</p>
			</div>
		</div>
	)
}
