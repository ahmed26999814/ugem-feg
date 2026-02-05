import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/providers/Providers";
import PWARegister from "@/components/providers/PWARegister";
import InstallAppButton from "@/components/ui/InstallAppButton";

export const metadata: Metadata = {
  title: "UGEM-FEG",
  description: "UGEM-FEG Platform",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UGEM-FEG",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <Providers>
          <PWARegister />
          <Navbar />
          <InstallAppButton />
          <main className="app-main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
