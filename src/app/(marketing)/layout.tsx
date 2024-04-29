import { Metadata } from "next";

export const metadata: Metadata = {
    title: "о нас",
    description: "страница о нас",
};

export default function MarketingLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {children}
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav>about</nav>
        </section>
    );
}
