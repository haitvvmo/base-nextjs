/* eslint-disable import/no-anonymous-default-export */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { networkService } from "network";
import { AuthResult } from "interfaces/auth.interface";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { placeholder: "" },
        password: { placeholder: "" },
        userInfo: {},
      },
      async authorize(credentials, req) {
        // Here call your API with data passed in the login form
        const { email, password, userInfo } = credentials as {
          email: string;
          password: string;
          userInfo: string;
        };

        const userParse = JSON.parse(userInfo);

        const response = await networkService.Post<AuthResult>({
          url: '',
          body: { email, password },
        });

        if (response?.data) {
          const { payload, access_token } = response.data;
          return {
            name: payload.name,
            email: payload.email,
            id: payload.sub.toString(),
            userId: payload.sub,
            access_token
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signIn", // -> pages/signIn
    error: '/500'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token["user"] as any;
      return session;
    },
  },
};
export default NextAuth(authOptions);
