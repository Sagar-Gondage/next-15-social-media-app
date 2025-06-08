import Image from "next/image";

import avatarPlaceholder from "@/assets/avatar-placeholder.png";

import { cn } from "@/lib/utils";

export default function UserAvatar({
    avatarUrl,
    size,
    className,
}) {
    return (
        <Image
            src={avatarUrl || avatarPlaceholder}
            alt="User avatar"
            width={size ?? 48}
            height={size ?? 48}
            className={cn(
                "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
                className
            )}
        />
    );
}
