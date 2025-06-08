import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId) {
    return {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
        followers: {
            where: {
                followerId: loggedInUserId,
            },
            select: {
                followerId: true,
            },
        },
        _count: {
            select: {
                posts: true,
                followers: true,
            },
        },
    };
}

export function getPostDataInclude(loggedInUserId) {
    return {
        user: {
            select: getUserDataSelect(loggedInUserId),
        },
        attachments: true,
        likes: {
            where: {
                userId: loggedInUserId,
            },
            select: {
                userId: true,
            },
        },
        bookmarks: {
            where: {
                userId: loggedInUserId,
            },
            select: {
                userId: true,
            },
        },
        _count: {
            select: {
                likes: true,
                comments: true,
            },
        },
    };
}

export function getCommentDataInclude(loggedInUserId) {
    return {
        user: {
            select: getUserDataSelect(loggedInUserId),
        },
    };
}

export const notificationsInclude = {
    issuer: {
        select: {
            username: true,
            displayName: true,
            avatarUrl: true,
        },
    },
    post: {
        select: {
            content: true,
        },
    },
};
