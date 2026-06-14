import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/providers";

import "@/styles/globals.css";
import "@/styles/variables.css";
import "@/styles/bootstrap.min.css";
import "@/styles/common.css";
import "@/styles/main.css";
import "@/styles/responsive.css";

export const metadata: Metadata = {
  title: "Buddy Script",
  description: "A social feed built with Next.js, TanStack Query and Zustand.",
  icons: { icon: "/assets/images/logo-copy.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
