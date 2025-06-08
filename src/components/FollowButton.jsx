"use client";

import kyInstance from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

import useFollowerInfo from "@/hooks/useFollowerInfo";

export default function FollowButton({ userId, initialState }) {
    const { toast } = useToast();

    const queryClient = useQueryClient();

    const { data } = useFollowerInfo(userId, initialState);

    const queryKey = ["follower-info", userId];

    const { mutate } = useMutation({
        mutationFn: () => (data.isFollowedByUser ? kyInstance.delete(`/api/users/${userId}/followers`) : kyInstance.post(`/api/users/${userId}/followers`)),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });

            const previousState = queryClient.getQueryData(queryKey);

            queryClient.setQueryData(queryKey, () => ({
                followers: (previousState?.followers || 0) + (previousState?.isFollowedByUser ? -1 : 1),
                isFollowedByUser: !previousState?.isFollowedByUser,
            }));

            return { previousState };
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey, context?.previousState);
            console.error(error);
            toast({
                variant: "destructive",
                description: "Something went wrong. Please try again.",
            });
        },
    });

    return (
        <Button
            variant={data.isFollowedByUser ? "secondary" : "default"}
            onClick={() => mutate()}
        >
            {data.isFollowedByUser ? "Unfollow" : "Follow"}
        </Button>
    );
}
