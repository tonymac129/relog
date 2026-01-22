import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Theme from "./Theme";
import Nav from "@/components/layout/Nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Relog",
  description: "Relog is a simple full-stack daily acitivity log tracker that makes you feel productive everyday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Theme>
          <Nav />
          {children}
        </Theme>
      </body>
    </html>
  );
}
