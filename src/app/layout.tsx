import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {Providers} from './providers';
import { FooterNav } from '@/components/layouts/footerNav';

import '@/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'get-in-line',
    description: 'лучшая программа для встреч',
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <html lang="ru">
            <body className={inter.className} >
                <Providers>
                    {children}
                    <FooterNav />
                </Providers>
            </body>
        </html>
    );
}
