import React from "react";
import CreateForm from "./components/CreateForm";
import { cn } from "../../lib/utils";
import readUserSession from "../../lib/actions";
import { redirect } from "next/navigation";
import { deleteTodoById, readTodo, updateTodoById } from "./actions";
import SignOut from "./components/SignOut";
import { Button } from "../../components/ui/button";

export default async function Page() {
    const { data } = await readUserSession();
    if (!data.session) {
        return redirect("/auth-server-action");
    }
    const { data: todos, error } = await readTodo();
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 h-1/2 space-y-5">
                <div className="flex gap-5 p-5 rounded-xl bg-slate-300">
                    <CreateForm />

                    <SignOut />
                </div>

                {todos?.map((todo, index) => {
                    const deleteTodo = deleteTodoById.bind(null, todo.id);
                    const updateTodo = updateTodoById.bind(
                        null,
                        todo.id,
                        !todo.completed
                    );
                    return (
                        <div key={index} className="flex items-center gap-6">
                            <h1
                                className={cn({
                                    "line-through": todo.completed
                                })}
                            >
                                {todo.title}
                            </h1>
                            <form action={deleteTodo}>
                                <Button>Delete</Button>
                            </form>
                            <form action={updateTodo}>
                                <Button>Update</Button>
                            </form>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
