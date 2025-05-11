import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';

// GeistSans and GeistMono are objects from 'geist/font' that provide
// .variable and .className properties directly. They are not functions to be called.
// The .variable property provides a CSS class that sets up the CSS variable (e.g., --font-geist-sans).

export const metadata: Metadata = {
  title: 'ChallengerVerse',
  description: 'Join and create exciting challenges!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/*
        Use GeistSans.variable and GeistMono.variable directly from the imports.
        These will apply classes that define CSS variables like '--font-geist-sans'.
        The globals.css file then uses these CSS variables.
      */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
