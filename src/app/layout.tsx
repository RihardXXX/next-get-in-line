import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FooterNav } from "@/app/components/layouts/footerNav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "get-in-line",
  description: "лучшая программа для встреч",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <FooterNav />
      </body>
    </html>
  );
}
