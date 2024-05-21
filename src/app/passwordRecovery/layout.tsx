import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Восстановление пароля',
    description: 'Страница восстановления пароля',
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
