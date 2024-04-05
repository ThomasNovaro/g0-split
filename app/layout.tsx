import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Split Easy",
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="public/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="public/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="public/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="public/icons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
