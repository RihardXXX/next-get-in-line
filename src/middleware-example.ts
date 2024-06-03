import { NextRequest, NextResponse } from 'next/server';

export function middlewareExample(request: NextRequest) {
    // Check the origin from the request
    console.log('check multi-middleware');

    return NextResponse.next();
}

export const config = {
    matcher: '/',
};
