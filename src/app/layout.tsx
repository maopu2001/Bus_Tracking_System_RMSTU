import type { Metadata } from 'next';
import './globals.css';
import QueryClientProviderComponent from '@/components/QueryClientProviderComponent';

export const metadata: Metadata = {
  title: 'Track My Bus - RMSTU',
  description: 'Created By Team Zero Or One',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProviderComponent>{children}</QueryClientProviderComponent>
      </body>
    </html>
  );
}
