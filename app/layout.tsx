import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/providers/Providers";
import PWARegister from "@/components/providers/PWARegister";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-6LFTED24TW" strategy="afterInteractive" />
        {/* Google AdSense */}
        <Script
          id="adsense-script"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8677539442954307"
          strategy="afterInteractive"
          crossOrigin="anonymous"
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
          <main className="app-main">{children}</main>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
