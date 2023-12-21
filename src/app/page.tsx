import TopNav from "@/components/TopNav";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-h-screen items-start justify-center gap-24 p-24">
            <TopNav />
        </div>
    );
}
