import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    signInwithEmailAndPassword,
    signUpwithEmailAndPassword
} from "../actions";
import { toast } from "../../../components/ui/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "../../../lib/utils";

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required."
    })
});

export default function SignInForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const res = await signInwithEmailAndPassword(data);

            const { error } = JSON.parse(res);

            if (error?.message) {
                toast({
                    variant: "destructive",
                    title: "You submitted the following values:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{error.message}</code>
                        </pre>
                    )
                });
            } else {
                toast({
                    title: "You submitted the following values:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                Successfully signed in
                            </code>
                        </pre>
                    )
                });
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

                <Button type="submit" className="w-full flex gap-2">
                    Sign In
                    <AiOutlineLoading3Quarters
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </form>
        </Form>
    );
}
