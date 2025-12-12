import { NextRequest, NextResponse } from "next/server";
import { ur } from "zod/v4/locales";

export default function middleware(req: NextRequest) {
    const { url, cookies, nextUrl } = req
    
    const session = cookies.get('session')?.value

    const isAuthRoute = nextUrl.pathname.startsWith('/auth')
    const isAdminRoute = nextUrl.pathname.startsWith('/dashboard')

    if (!session && !isAuthRoute) {
        return NextResponse.redirect(new URL('/auth/login', url))
    }

    // if (isAdminRoute) {
    //     return NextResponse.redirect(new URL('/', url))
    // }

    return NextResponse.next()
}