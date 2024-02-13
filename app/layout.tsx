import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { useEffect } from "react"
import * as ga from "react-ga"

export const metadata: Metadata = {
  title: "G0 Split",
  description: "Split every expenses, with everyone, on the G0",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    ga.initialize("G-ZF2T3R39MW")
  }, [])
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
