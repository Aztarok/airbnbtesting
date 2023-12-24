"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";

export async function readTodo() {
    noStore();
    const supabase = await createSupabaseServerClient();
    return await supabase.from("todo-demo").select("*");
}
