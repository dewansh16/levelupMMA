import "./globals.css";
import "@repo/ui/styles.css";

import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
// import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <h1 className="text-white">layout text</h1>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
