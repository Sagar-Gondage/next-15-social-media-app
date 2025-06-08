"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { formatNumber } from "@/lib/utils";

export default function FollowerCount({ userId, initialState }) {
    const { data } = useFollowerInfo(userId, initialState);

    return (
        <span>
            Followers:{" "}
            <span className="font-semibold">{formatNumber(data.followers)}</span>
        </span>
    );
}
