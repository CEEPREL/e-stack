import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/Header";
import StoreProvider from "./store-provider";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/authContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "E-Stack a Platform for shopping in style",
  description: "Explore a wide range of products",
  openGraph: {
    title: "E-commerce Platform",
    description: "Shop the best products online",
    url: "www.e-stack.com",
    siteName: "E-commerce Platform",
    images: [
      {
        url: "https://yourdomain.com/default-image.jpg",
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
            {/* <Header /> */}
            <main>{children}</main>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
