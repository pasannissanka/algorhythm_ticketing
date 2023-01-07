import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        if (
          email !== process.env.NEXT_PUBLIC_EMAIL ||
          password !== process.env.NEXT_PUBLIC_PASSWORD
        ) {
          throw new Error("invalid credentials");
        }

        // if everything is fine

        return {
          id: "1234",
          name: "Admin",
          email: process.env.NEXT_PUBLIC_EMAIL,
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
};

export default NextAuth(authOptions);
