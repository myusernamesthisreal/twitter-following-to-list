import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET") throw new Error("Method not allowed");
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) throw new Error("Not authenticated");
        const client = new TwitterApi(token.access_token.toString());
        const following = await client.v2.following(token.sub?.toString(), {
            max_results: 100,
        });
        console.log(following);
        res.status(200).json(following);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            if (error.message === "Not authenticated") {
                res.status(401).json({ error: error.message });
            } else if (error.message === "Method not allowed") {
                res.status(405).json({ error: error.message });
            } else res.status(500).json({ error: error.message });
        } else 
        res.status(500).json(error);
    }
}