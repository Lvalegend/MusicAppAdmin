import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/src/styles/globals.scss';
import StoreProvider from './StoreProvider';

const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'MusicAdmin - Đăng nhập',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </StoreProvider>
  );
}
