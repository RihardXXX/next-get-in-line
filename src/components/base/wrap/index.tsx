export default function Wrap({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-[calc(100vh-5rem)] w-screen overflow-y-auto overflow-x-hidden bg-slate-200">
            {children}
        </main>
    );
}
