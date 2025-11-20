import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

import { cn } from "../lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "@/components/NavBar"

const fontSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Spring2Life",
  description:
    "A refreshed Supabase-powered mental health scheduling platform with secure auth, rich patient profiles, and streamlined appointments.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_20%_20%,#2dd4bf15,transparent_35%),radial-gradient(circle_at_80%_10%,#60a5fa20,transparent_30%),radial-gradient(circle_at_50%_80%,#a855f730,transparent_30%)] font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
