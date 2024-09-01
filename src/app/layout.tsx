import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header/Header";
import StoreProvider from "./store-provider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
