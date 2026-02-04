import type { ReactNode } from "react";

import "./globals.css";
import Providers from "@/components/providers/Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "UGEM-FEG",
  description: "UGEM-FEG Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main className="app-main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
