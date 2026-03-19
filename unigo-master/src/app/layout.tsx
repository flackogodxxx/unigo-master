import type { Metadata } from 'next';
import { Manrope, Sora } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'UniGo | A carona universitaria da UniFio',
  description:
    'Plataforma de caronas universitarias da comunidade UniFio, criada para conectar estudantes com mais seguranca, economia e organizacao no trajeto ate o campus.',
  icons: {
    icon: '/favicon.svg',
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
