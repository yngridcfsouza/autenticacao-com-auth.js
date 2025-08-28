import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Autenticação com Auth.js e Next.js",
  description: "Projeto para prática com os frameworks de autenticação de rotas privadas e públicas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="pt-br">
        <body className="antialiased">
          <SessionProvider>
            {children}
          </SessionProvider>
          <Toaster />
        </body>
      </html>
  );
}
