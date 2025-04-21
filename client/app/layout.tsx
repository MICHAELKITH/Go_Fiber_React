import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "55 BLOCKS Cybersecurity | Advanced Security Solutions",
  description: "Leading cybersecurity solutions provider offering AI-powered protection, end-to-end encryption, and zero-trust security framework for businesses. Get enterprise-grade security today.",
  keywords: "cybersecurity, AI security, encryption, zero-trust, enterprise security, cyber protection, 55 BLOCKS",
  authors: [{ name: "55 BLOCKS" }],
  creator: "55 BLOCKS",
  publisher: "55 BLOCKS",
  metadataBase: new URL('https://55blocks.com'), // Replace with your actual domain
  openGraph: {
    type: 'website',
    title: '55 BLOCKS Cybersecurity | Advanced Security Solutions',
    description: 'Enterprise-grade cybersecurity solutions with AI-powered protection and end-to-end encryption.',
    url: 'https://55blocks.com',
    siteName: '55 BLOCKS',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: '55 BLOCKS Cybersecurity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '55 BLOCKS Cybersecurity',
    description: 'Enterprise-grade cybersecurity solutions with AI-powered protection.',
    creator: '@55blocks', // Replace with your Twitter handle
    images: ['/twitter-image.jpg'], // Add your Twitter card image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
    yandex: 'your-yandex-verification-code', // Add your Yandex verification code if needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://55blocks.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}