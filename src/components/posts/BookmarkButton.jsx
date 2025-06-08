import kyInstance from "@/lib/ky";
import { cn } from "@/lib/utils";
import {
    QueryKey,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { useToast } from "../ui/use-toast";

export default function BookmarkButton({
    postId,
    initialState,
}) {
    const { toast } = useToast();

    const queryClient = useQueryClient();

    const queryKey = ["bookmark-info", postId];

    const { data } = useQuery({
        queryKey,
        queryFn: () => kyInstance.get(`/api/posts/${postId}/bookmark`).json(),
        initialData: initialState,
        staleTime: Infinity,
    });

    const { mutate } = useMutation({
        mutationFn: () =>
            data.isBookmarkedByUser
                ? kyInstance.delete(`/api/posts/${postId}/bookmark`)
                : kyInstance.post(`/api/posts/${postId}/bookmark`),
        onMutate: async () => {
            toast({
                description: `Post ${data.isBookmarkedByUser ? "un" : ""}bookmarked`,
            });

            await queryClient.cancelQueries({ queryKey });

            const previousState = queryClient.getQueryData(queryKey);

            queryClient.setQueryData(queryKey, () => ({
                isBookmarkedByUser: !previousState?.isBookmarkedByUser,
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
        <button onClick={() => mutate()} className="flex items-center gap-2">
            <Bookmark
                className={cn(
                    "size-5",
                    data.isBookmarkedByUser && "fill-primary text-primary",
                )}
            />
        </button>
    );
}
