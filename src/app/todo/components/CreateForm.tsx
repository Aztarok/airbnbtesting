"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { toast } from "../../../components/ui/use-toast";
import { Button } from "../../../components/ui/button";
import { useTransition } from "react";
import { cn } from "../../../lib/utils";
import { createTodo } from "../actions";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required."
    })
});

export default function CreateForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: ""
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const res = await createTodo(data.title);
            const { error } = JSON.parse(res);
            if (!error?.message) {
                toast({
                    title: "You have successfully created a todo.",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                {data.title} is created
                            </code>
                        </pre>
                    )
                });
                form.reset();
            }
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-96 mx-auto space-y-6"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-2xl font-bold text-zinc-800">
                                Title
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="todo title"
                                    {...field}
                                    onCanPlay={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full flex gap-2">
                    Create
                    <AiOutlineLoading3Quarters
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>
        </Form>
    );
}