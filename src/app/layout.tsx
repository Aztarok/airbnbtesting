import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "../components/ui/toaster";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/session-provider";

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
        <html lang="en" suppressHydrationWarning>
            <body className={`text-white ${inter.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
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
                </ThemeProvider>
                <SessionProvider />
            </body>
        </html>
    );
}
