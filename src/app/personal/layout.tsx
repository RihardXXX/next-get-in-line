import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Личный кабинет',
};

export default function RegistrationLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {children}
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav>navigation personal</nav>
        </section>
    );
}
