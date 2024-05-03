import type { Metadata } from 'next';

import '@/styles/globals.scss';

export const metadata: Metadata = {
    title: 'Регистрация',
    description: 'Страница регистрации',
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
