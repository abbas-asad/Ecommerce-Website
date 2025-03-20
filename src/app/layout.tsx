import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "sonner";
import { Cabin } from "next/font/google";
import "./globals.css";
import siteConfig from "@site.config";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";
import PromoBanner from "./components/layout/promo-banner";

const cabin = Cabin({
  weight: ["400", "600", "700"],
  // weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${cabin.className} antialiased min-h-screen bg-white`}>
          <CartProvider>

            {/* 🔹 Navbar */}
            <PromoBanner />
            <Navbar />

            {/* 🔹 Main Content */}
            {children}

            {/* 🔹 Toast Notifications */}
            <Toaster position="top-right" />

            {/* 🔹 Footer */}
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}