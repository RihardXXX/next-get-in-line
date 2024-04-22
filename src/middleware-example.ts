import { NextRequest, NextResponse } from 'next/server';

export function middlewareExample(request: NextRequest) {
    // Check the origin from the request
    console.log('check multi-middleware');

    return NextResponse.next();
}

export const config = {
    matcher: '/',
};



// код для корсов бэка next
// import { NextRequest, NextResponse } from 'next/server'
//
// const allowedOrigins = ['https://acme.com', 'https://my-app.org']
//
// const corsOptions = {
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// }
//
// export function middleware(request: NextRequest) {
//     // Check the origin from the request
//     const origin = request.headers.get('origin') ?? ''
//     const isAllowedOrigin = allowedOrigins.includes(origin)
//
//     // Handle preflighted requests
//     const isPreflight = request.method === 'OPTIONS'
//
//     if (isPreflight) {
//         const preflightHeaders = {
//             ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
//             ...corsOptions,
//         }
//         return NextResponse.json({}, { headers: preflightHeaders })
//     }
//
//     // Handle simple requests
//     const response = NextResponse.next()
//
//     if (isAllowedOrigin) {
//         response.headers.set('Access-Control-Allow-Origin', origin)
//     }
//
//     Object.entries(corsOptions).forEach(([key, value]) => {
//         response.headers.set(key, value)
//     })
//
//     return response
// }
//
// export const config = {
//     matcher: '/api/:path*',
// }