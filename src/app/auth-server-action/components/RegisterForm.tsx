import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { toast } from "../../../components/ui/use-toast";
import { cn } from "../../../lib/utils";
import { signUpwithEmailAndPassword } from "../actions";
import { redirect } from "next/navigation";

const FormSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(3, {
            message: "Password is required."
        }),
        confirm: z.string().min(3, {
            message: "Password is required."
        })
    })
    .refine((data) => data.confirm === data.password, {
        message: "Password did not match",
        path: ["confirm"]
    });

export default function RegisterForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm: ""
        }
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const res = await signUpwithEmailAndPassword(data);

            const { error } = JSON.parse(res);

            if (error?.message) {
                toast({
                    variant: "destructive",
                    title: "Error:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{error.message}</code>
                        </pre>
                    )
                });
            } else {
                toast({
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                Successfully registered
                            </code>
                        </pre>
                    )
                });
                return redirect("/auth-server-action");
            }
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@gmail.com"
                                    {...field}
                                    type="email"
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Password"
                                    {...field}
                                    type="password"
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Confirm Password"
                                    {...field}
                                    type="password"
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full flex gap-2">
                    Register
                    <AiOutlineLoading3Quarters
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>
        </Form>
    );
}
