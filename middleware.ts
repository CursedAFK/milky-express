import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (request: NextRequest) => {
	const cookieUser = request.cookies.get('user')

	if (request.nextUrl.pathname.startsWith('/orders')) {
		if (!cookieUser) {
			return NextResponse.redirect(new URL('/cart', request.url))
		}
		return NextResponse.next()
	}
}
