import { NextResponse, NextRequest } from 'next/server';
import { authUrls } from '@/api/urls';

const baseUrl = process.env.__NEXT_PRIVATE_ORIGIN; // http://localhost:3000
const urlCheckAuth = authUrls.getUserInfoUrl(); // /server/auth/user-info
const url = baseUrl + urlCheckAuth;

const checkAuth = async (cookies: string) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Cookie: cookies, // Передаем все куки в заголовке
        },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('вы не авторизованы');
    }

    return await res.json();
};

export async function middleware(request: NextRequest) {
    console.log('==========');
    // console.log('request.nextUrl.pathname', request.cookies);
    // Извлечение токена из куков
    // Извлечение всех кук из запроса
    const cookies = request.headers.get('cookie') || '';

    // если пользователь авторизован то не пускаем его на страницы регистрации и авторизации
    const pages = ['/authorization', '/registration', '/passwordRecovery'];
    if (pages.some((page) => request.nextUrl.pathname.startsWith(page))) {
        console.log(
            '/\'/authorization\', \'/registration\', \'/passwordRecovery\'',
            true,
        );

        try {
            await checkAuth(cookies);
            return NextResponse.redirect(new URL('/personal', baseUrl));
        } catch (e) {
            console.log((e as Error).message);
            return NextResponse.next();
        }
    }

    // если не авторизован то не пускаем в личный кабинет
    if (request.nextUrl.pathname.startsWith('/personal')) {
        console.log('/personal', true);
        try {
            await checkAuth(cookies);
            return NextResponse.next();
        } catch (e) {
            console.log((e as Error).message);
            return NextResponse.redirect(new URL('/authorization', baseUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
