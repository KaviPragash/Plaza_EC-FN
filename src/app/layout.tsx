import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/contexts/CartContext";
import { SubcategoryFilterProvider } from "@/contexts/SubcategoryFilterContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlazaOne360",
  description: "PlazaOne360 E-Commerce Site",
  openGraph: {
    title: "PlazaOne360",
    description: "PlazaOne360 E-Commerce Site.",
    url: "https://plazaone360.com/",
    siteName: "Plaza",
    images: [
      {
        url: "/assets/images/og-image.png", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlazaOne360",
    description: "PlazaOne360 E-Commerce Site",
    images: ["/assets/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/assets/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/images/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/assets/images/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        sizes: "192x192",
        url: "/assets/images/android-chrome-192x192.png",
      },
    ],
  },
  manifest: "/assets/images/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <CartProvider>
          <SubcategoryFilterProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <div id="modal-root" /> 
            <Footer />
          </SubcategoryFilterProvider>
        </CartProvider>
      </body>
    </html>
  );
}