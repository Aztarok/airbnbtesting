import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "../components/ui/toaster";
import { Button } from "@/components/ui/button";

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
            <body className={`bg-slate-800 text-white ${inter.className}`}>
                <div className="flex gap-4 m-4 justify-end">
                    <Link href="/auth-server-action">
                        <Button variant="outline">Login / Sign In</Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline">Home</Button>
                    </Link>
                    <Link href="/todo">
                        <Button variant="outline">Todo testing</Button>
                    </Link>
                </div>
                {children} <Toaster />
            </body>
        </html>
    );
}
