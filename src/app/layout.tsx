import { CartProvider } from '@/context/cart-context'
import { Toaster } from 'sonner'
import type { Metadata } from "next";
import { Inter, Cabin } from "next/font/google";
import "./globals.css";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";
import siteConfig from '../../site.config';

const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
const cabin = Cabin({
  weight: ["400", "600", "700"],
  // weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.seo.defaultTitle}`,
  description: `${siteConfig.seo.defaultDescription}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cabin.className} antialiased min-h-screen bg-white`}>
        <CartProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
