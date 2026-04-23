import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tablr — Social dining on campus",
  description:
    "Tablr matches college students who share your vibe for real-world food hangs. Join the waitlist at your university.",
  metadataBase: new URL("https://jointablr.com"),
  openGraph: {
    title: "Tablr — Social dining on campus",
    description:
      "Tablr matches college students who share your vibe for real-world food hangs. Join the waitlist at your university.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Tablr — Social dining on campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tablr — Social dining on campus",
    description:
      "Tablr matches college students who share your vibe for real-world food hangs. Join the waitlist at your university.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
