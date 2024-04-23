/** @type {import('next').NextConfig} */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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
    sassOptions: {
        includePaths: [join(__dirname, 'styles')],
    },
};

export default nextConfig;
