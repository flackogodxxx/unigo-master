import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "UniGo | A carona universitária da UniFio",
  description:
    "Plataforma de caronas universitárias da comunidade UniFio, criada para conectar estudantes com mais segurança, economia e organização no trajeto até o campus.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${sora.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
