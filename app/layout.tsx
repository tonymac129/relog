import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { deleteUserAccount } from "./actions";
import Session from "./Session";
import Theme from "./Theme";
import Nav from "@/components/layout/Nav";
import User from "@/components/ui/User";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Relog",
  description:
    "Relog is the best daily activity tracker where you can keep track of what you did each day with custom activities! You can browse and manage these activities effectively with powerful data control features. The app supports both online data syncing and local data stroage.",
  authors: [{ name: "TonyMac129", url: "https://tonymac.net" }],
  openGraph: {
    title: "Relog",
    description:
      "Relog is the best daily activity tracker where you can keep track of what you did each day with custom activities! You can browse and manage these activities effectively with powerful data control features. The app supports both online data syncing and local data stroage.",
    url: "https://relog-app.vercel.app",
    siteName: "Relog",
    images: [
      {
        url: "/logo.png",
        width: 200,
        height: 200,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <Session>
          <Theme>
            <Nav deleteUserAccount={deleteUserAccount}>
              <User />
            </Nav>
            {children}
          </Theme>
        </Session>
      </body>
    </html>
  );
}
