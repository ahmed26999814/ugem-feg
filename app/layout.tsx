import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/providers/Providers";
import PWARegister from "@/components/providers/PWARegister";
import InstallAppButton from "@/components/ui/InstallAppButton";
import ComingSoon from "@/components/site/ComingSoon";
import { SITE_CLOSED } from "@/lib/siteState";

export const metadata: Metadata = {
  title: "UGEM-FEG",
  description: "UGEM-FEG Platform",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/ugem-logo.jpg",
    apple: "/ugem-logo.jpg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UGEM",
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: "andYCQ-6yfVrn-DMes1tZti6qTwYs84zunI_vR3flL8",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={SITE_CLOSED ? "site-closed" : undefined}>
        {SITE_CLOSED ? (
          <ComingSoon />
        ) : (
          <Providers>
            <PWARegister />
            <Navbar />
            <InstallAppButton />
            <main className="app-main">{children}</main>
          </Providers>
        )}
      </body>
    </html>
  );
}
