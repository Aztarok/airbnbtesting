"use client";

import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { readTodo } from "./actions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
    // const supabase = await createSupabaseServerClient();
    // const {
    //     data: { user }
    // } = await supabase.auth.getUser();
    // console.log(user);
    // if (!user) {
    //     redirect("/auth-server-action");
    // }
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-1">
            {/* <div>{user.id}</div>
            <div>{user.aud}</div>
            <div>{user.email}</div> */}
            <div>Hello</div>
        </main>
    );
}
