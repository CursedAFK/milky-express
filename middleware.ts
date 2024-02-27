import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (request: NextRequest) => {
	const cookieUser = request.cookies.get('user')

	if (request.nextUrl.pathname.startsWith('/orders') || request.nextUrl.pathname.startsWith('/cart')) {
		if (!cookieUser) {
			return NextResponse.redirect(new URL('/auth', request.url))
		}
		return NextResponse.next()
	}

	if (request.nextUrl.pathname.startsWith('/auth')) {
		if (!cookieUser) {
			return NextResponse.next()
		} else {
			return NextResponse.redirect(new URL('/cart', request.url))
		}
	}
}
