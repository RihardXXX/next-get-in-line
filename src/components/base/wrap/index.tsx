

export default function Wrap({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <main className="min-h-screen pb-20 overflow-auto">
            { children }
        </main>
    );
}