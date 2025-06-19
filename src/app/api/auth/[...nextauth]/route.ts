import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User"
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";



export const authOptions:AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) throw new Error("No user found");

        const isPasswordValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
