import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";

export async function GET() {
    console.log("\n\n\n\n\n===================");
    try {
        const { user } = await validateRequest("get toekn");
        console.log("user", user)
        console.log("Calling get-token for user: ", user?.id);

        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

        const issuedAt = Math.floor(Date.now() / 1000) - 60;

        const token = streamServerClient.createToken(
            user.id,
            expirationTime,
            issuedAt,
        );
        console.log("token", token)
        return Response.json({ token });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
