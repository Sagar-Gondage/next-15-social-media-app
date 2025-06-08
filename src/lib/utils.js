import { clsx } from "clsx";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatRelativeDate(from) {
    const currentDate = new Date();
    if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
        return formatDistanceToNowStrict(from, { addSuffix: true });
    } else {
        if (currentDate.getFullYear() === from.getFullYear()) {
            return formatDate(from, "MMM d");
        } else {
            return formatDate(from, "MMM d, yyyy");
        }
    }
}

export function formatNumber(n) {
    return Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(n);
}

export function slugify(input) {
    return input
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "");
}
