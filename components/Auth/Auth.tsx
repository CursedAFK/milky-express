import { useState } from 'react'
import Login from './Login'
import OAuth from './OAuth'
import Signup from './Signup'

export type AuthType = 'oauth' | 'login' | 'signup'

export default function Auth() {
	const [AuthType, setAuthType] = useState<AuthType>('oauth')

	return (
		<div className='md:flex-1'>
			{AuthType === 'oauth' && <OAuth setAuthType={setAuthType} />}

			{AuthType === 'login' && <Login setAuthType={setAuthType} />}

			{AuthType === 'signup' && <Signup setAuthType={setAuthType} />}
		</div>
	)
}
