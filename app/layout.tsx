import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { MeshBackground } from "@/components/ui/mesh-background";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <div aria-hidden="true" className="fixed inset-0 -z-20 bg-background" />
          <MeshBackground fixed intensity="default" />
          <div className="relative flex min-h-screen flex-col">
            <NavigationBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
