import { NextAuthOptions } from "next-auth";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.display = (user as any).display;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const user = session.user as any;
        user.id = token.id as string;
        user.display = token.display;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        await dbConnect();
        const existingUser = await User.findOne({ username: user.email });
        if (!existingUser) {
          await User.create({
            username: user.email,
            display: user.name,
            email: user.email,
            image: user.image,
          });
        } else {
          await User.findOneAndUpdate(existingUser._id, { image: user.image });
        }
      }
      return true;
    },
  },
};
