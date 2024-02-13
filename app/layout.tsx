import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  title: "G0 Split",
  description: "Split every expenses, with anyone, on the G0",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-ZF2T3R39MW`}
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZF2T3R39MW');
          `}
        </Script>
      </head>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
