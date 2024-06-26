import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Авторизация',
    description: 'Страница авторизации',
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
