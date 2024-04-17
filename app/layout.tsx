import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/app/component/navbar';
import { NextAuthProvider } from "@/app/providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "เมนูอาหารวันนี้",
  description: "เย็นนี้กินอะไรดีนะ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={inter.className}>
      
      <NextAuthProvider>
      <Navbar />
        {children}
        </NextAuthProvider>

      </body>
    </html>

  );
}
