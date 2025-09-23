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
  title: "Plaza - Online Shopping Platform",
  description: "Plaza is your one-stop online store for a wide range of products. Shop easily, track orders, and enjoy a seamless online shopping experience.",
  openGraph: {
    title: "Plaza - Online Shopping Platform",
    description: "Shop for a variety of products online with Plaza. Enjoy seamless browsing, easy ordering, and fast delivery.",
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
    title: "Plaza - Online Shopping Platform",
    description: "Shop online for a variety of products with Plaza. Hassle-free orders and fast delivery.",
    images: ["/assets/images/og-image.png"],
  },
  icons: {
    icon: "/assets/images/favicon.ico",
  },
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