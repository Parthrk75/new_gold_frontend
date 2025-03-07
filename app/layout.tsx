import './globals.css';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
// import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import Navbar from '@/components/navbar';
import { Metadata } from 'next';


// Load Inter font with display: swap to prevent FOIT (Flash of Invisible Text)
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: false // Disable preloading to prevent AbortError
});



export const metadata: Metadata = {
  title: 'Gold Price Tracker | Live Prices & Historical Data',
  description: 'Track live gold prices and view historical price data with interactive charts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}