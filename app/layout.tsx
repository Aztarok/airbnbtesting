import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "../components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Airbnb",
    description: "Clone made by Aztarok"
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col">
                    <Link href="/auth-server-action">Login / Sign In</Link>
                    <Link href="/">Home</Link>
                    <Link href="/todo">Learn CRUD</Link>
                </div>
                {children} <Toaster />
            </body>
        </html>
    );
}
