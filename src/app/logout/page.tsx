import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/auth-server-action");
    return <div>hi</div>;
};

export default page;
