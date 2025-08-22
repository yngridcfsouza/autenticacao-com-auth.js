import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Autenticação com Auth.js e Next.js",
  description: "Projeto para prática com os frameworks de autenticação de rotas privadas e públicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased" >
        {children}
      </body>
    </html>
  );
}
