import { NextResponse, NextRequest } from 'next/server';
// import { authenticate } from 'auth-provider'
// import { useAuthorization } from '@/hooks/useAuthorization';

// Промежуточное программное обеспечение запускается после и redirects до рендеринга .next.config.mjs

export function middleware(request: NextRequest) {
    // const isAuthenticated = authenticate(request)
    console.log('middleware');

    // начале добавить корсы для запросов, чтобы запросы шли только в рамкх текущего источника

    // тут перед тем как делать проверку на авторизацию, проверить данные пользователя уже в стейте

    const isAuthenticated = true;

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
