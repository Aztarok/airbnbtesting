import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const TopNav = () => {
    return (
        <div className="flex justify-between">
            <div>airbnb</div>
            <div>
                <Button>Anywhere</Button>
                <Button>Any week</Button>
                <Button>Add guests</Button>
                <Button>
                    <Search />
                </Button>
            </div>
            <div></div>
        </div>
    );
};

export default TopNav;
