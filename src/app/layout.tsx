import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./store-provider";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/authContext/GlobalContext";
import { Header } from "@/components/header/Header";
// import { AuthProvider } from "@/contexts/authContext/GlobalContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title:
    "Pricious Agro an E-commerce Platform for shopping all farming products",
  description: "Explore a wide range of products",
  openGraph: {
    title: "Agro E-commerce Platform",
    description: "Shop the best Agro products online",
    url: "www.Priciousagro.com.ng",
    siteName: "E-commerce Platform",
    images: [
      {
        url: "https://www.Priciousagro.com.ng/logo.jpg",
        width: 800,
        height: 600,
        alt: "Default Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="#000000" content="#ffffff" />
      </head>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        <AuthProvider>
          <StoreProvider>
            <Header />
            <main className="pt-32">{children}</main>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
