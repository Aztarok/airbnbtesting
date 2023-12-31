"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@/lib/store/user";
import Profile from "./Profile";

const Navbar = () => {
    const user = useUser((state) => state.user);
    return (
        <div>
            <div className="flex gap-4 m-4 justify-end items-center">
                <Link href="/">
                    <Button variant="outline">Home</Button>
                </Link>
                <Link href="/todo">
                    <Button variant="outline">Todo testing</Button>
                </Link>
                {user?.id ? (
                    <Profile />
                ) : (
                    <Link href="/auth-server-action">
                        <Button variant="outline">Login / Sign In</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
