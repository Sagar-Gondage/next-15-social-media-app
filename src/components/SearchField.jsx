"use client";

import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { Input } from "./ui/input";

export default function SearchField() {
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const q = (form.q).value.trim();
        if (!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }

    return (
        <form onSubmit={handleSubmit} method="GET" action="/search">
            <div className="relative">
                <Input name="q" placeholder="Search" className="pe-10" />
                <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
            </div>
        </form>
    );
}
