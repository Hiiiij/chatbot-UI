import type { Metadata } from "next"
import { Inter, Unbounded } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"
import { UserProvider } from "@/contexts/user-context"

const inter = Inter({ subsets: ["latin"] })
const unbounded = Unbounded({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "News Beat - AI-Powered News Chat",
  description: "Stay informed with AI-powered news conversations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  )
}

