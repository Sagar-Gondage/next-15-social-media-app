"use client";

import Link from "next/link";
import kyInstance from "@/lib/ky";
import { Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

export default function MessagesButton({ initialState }) {
    const { data = {} } = useQuery({
        queryKey: ["unread-messages-count"],
        queryFn: () => kyInstance.get("/api/messages/unread-count").json(),
        initialData: initialState,
        refetchInterval: 60 * 1000,
    });

    return (
        <Button
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Messages"
            asChild
        >
            <Link href="/messages">
                <div className="relative">
                    <Mail />
                    {!!data.unreadCount && (
                        <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
                            {data.unreadCount}
                        </span>
                    )}
                </div>
                <span className="hidden lg:inline">Messages</span>
            </Link>
        </Button>
    );
}
