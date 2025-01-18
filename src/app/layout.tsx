import { Footer } from '@/features/layout/ui/footer';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link prefetch={false} href="/">
            HOME
          </Link>{' '}
          &nbsp;
          <Link prefetch={false} href="/about">
            ABOUT
          </Link>{' '}
          &nbsp;
        </nav>
        <div>{children}</div>

        <Footer />
      </body>
    </html>
  );
}
