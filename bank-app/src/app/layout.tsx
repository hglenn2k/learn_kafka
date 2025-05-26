import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "bank app",
    description: "bank app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="font-mono antialiased bg-white dark:bg-black text-gray-800 dark:text-gray-200">
        {children}
        </body>
        </html>
    );
}
