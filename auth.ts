import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"




export const {
    auth,
    handlers,
    signIn,
    signOut


} = NextAuth({
    pages: {
        signIn: "/auth/login",
        // signOut: "/auth/signout",
        error: "/auth/error",
        // verifyRequest: "/auth/verify-request",
        // newUser: "/auth/new-user",
    },
    callbacks: {
        async session({ token, session }) {
            // console.log("session token: ", token);

            if (token.role && session.user) {
                session.user.role = token.role as "ADMIN" | "USER"
            }
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt({ token }) {
            if(!token.sub){
                return token
            }
            const user = await getUserById(token.sub)
            if (!user) return user
            token.role = user.role
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})