import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Script from "next/script"
import localFont from "next/font/local"

const SNPro = localFont({
  src: "./SNPro.ttf",
  display: "swap",
  variable: "--font-SNPro",
})

export const metadata: Metadata = {
  title: "Split Easy",
  description: "Split every expenses, it's €a$y",
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
      <body className={`${GeistSans.variable} ${SNPro.variable}`}>
        {children}
      </body>
    </html>
  )
}
