"use client";

import { Button } from "../../../components/ui/button";
import { createBrowserClient } from "@supabase/ssr";
import React from "react";

export default function OAuthForm() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const loginWithGoogle = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth-server-action/callback`
            }
        });
    };

    return (
        <>
            <div>
                <Button onClick={loginWithGoogle} className="w-full">
                    Login with Google
                </Button>
            </div>
        </>
    );
}
