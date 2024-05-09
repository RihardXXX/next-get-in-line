/** @type {import('next').NextConfig} */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
const isDevelopment = (process.env.NODE_ENV === 'development')

const getPoxy = (isDevelopment) => {
    return isDevelopment
        ? [
            {
                source: '/server/:path*', // захват любых путей после слова server
                destination: baseUrl + '/:path*', // эти пути после слова server мы переносим на новый эндпоинт через прокси
            },
        ]
        : [{}]
}

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
// Получаем директорию текущего файла
const __dirname = dirname(__filename);


const nextConfig = {
    // async redirects() {
    //     return [
    //         // Basic redirect
    //         // {
    //         //     source: '/authorization', // откуда
    //         //     destination: '/', // куда
    //         //     permanent: true,
    //         // },
    //     ]
    // },
    // proxy for backend server
    async rewrites() {
        return getPoxy(isDevelopment)
    },
    sassOptions: {
        includePaths: [join(__dirname, 'styles')],
    },
};

export default nextConfig;
