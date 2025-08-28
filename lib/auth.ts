import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { loginSchema } from "@/schemas/login";
import Google from "next-auth/providers/google";


export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const { success, data } = loginSchema.safeParse(credentials);

        if (!success) {
          return null;
        }

        const { email, password } = data;

        const user = await db.user.findUnique({ where: { email }});

        if (!user) {
          throw new Error('Usuário não encontrado ou credenciais inválidas');
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Usuário não encontrado ou credenciais inválidas');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },
});
