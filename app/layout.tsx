import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "../lib/utils"
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/NavBar"

const fontSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
});


export const metadata: Metadata = {
  title: "Spring2Life",
  description:
    "A Supabase-powered mental health scheduling platform with patient registration, multi-session booking, and an actionable admin dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            <NavBar />
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
