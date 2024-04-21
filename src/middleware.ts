import { NextResponse, NextRequest } from 'next/server';
// import { authenticate } from 'auth-provider'
// Промежуточное программное обеспечение запускается после и redirects до рендеринга .next.config.js

export function middleware(request: NextRequest) {
    // const isAuthenticated = authenticate(request)
    const isAuthenticated = false;

    // If the user is authenticated, continue as normal
    if (isAuthenticated) {
        return NextResponse.next();
    }

    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/authorization', request.url));
}

export const config = {
    matcher: '/personal/:path*',
};