/** @type {import('next').NextConfig} */


const nextConfig = {
    async redirects() {
        return [
            // Basic redirect
            // {
            //     source: '/authorization', // откуда
            //     destination: '/', // куда
            //     permanent: true,
            // },
        ]
    },
};

export default nextConfig;
