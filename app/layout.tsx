import "../styles/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/context/providers";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans"
});

export const metadata: Metadata = {
  title: "RestorNet Prototype",
  description: "High-fidelity prototype of the CRDN RestorNet platform."
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={openSans.variable} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/assets/images/favicon.png" />
      </head>

      <body className="min-h-screen bg-background">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
