import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/providers/Providers";
import PWARegister from "@/components/providers/PWARegister";
import InstallAppButton from "@/components/ui/InstallAppButton";

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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6LFTED24TW"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-6LFTED24TW');`}
        </Script>
      </head>
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
