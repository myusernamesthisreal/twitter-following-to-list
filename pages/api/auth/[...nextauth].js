import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
export const authOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID ?? "",
            clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
            version: "2.0",
            authorization: {
                url: "https://twitter.com/i/oauth2/authorize",
                params: { scope: "users.read tweet.read list.read list.write" },
            }
        })
    ],
    pages: {
        error: "/",
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log("Account", account);
            if (account && user) {
                if (account.access_token) {
                    token.access_token = account.access_token
                }
            }
            return token
        },
        async session({session, token}) {
            console.log("token", token);
            if (token) 
                session.access_token = token.access_token
            return session
        }
    }
}

export default NextAuth(authOptions)