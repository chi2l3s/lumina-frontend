import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const { url, cookies, nextUrl } = req;

    const session = cookies.get("session")?.value;

    const isAuthRoute = nextUrl.pathname.startsWith("/auth");
    const isAdminRoute = nextUrl.pathname.startsWith("/dashboard");

    if (!session && !isAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", url));
    }

    // if (isAdminRoute) {
    //     return NextResponse.redirect(new URL('/', url))
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};
