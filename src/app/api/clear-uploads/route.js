import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

export async function GET(req) {
    try {
        const authHeader = req.headers.get("Authorization");

        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return Response.json(
                { message: "Invalid authorization header" },
                { status: 401 }
            );
        }

        const unUsedMedia = await prisma.media.findMany({
            where: {
                postId: null,
                ...(process.env.NODE_ENV === "production"
                    ? { createdAt: { lte: new Date(Date.now() - 1000 * 60 * 60 * 24) } }
                    : {}),
            },
            select: {
                id: true,
                url: true,
            },
        });

        new UTApi().deleteFiles(
            unUsedMedia.map((m) => m.url.split(`/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`)[1]),
        );

        await prisma.media.deleteMany({
            where: {
                id: {
                    in: unUsedMedia.map((m) => m.id),
                },
            },
        });

        return new Response();
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
