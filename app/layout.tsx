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
    icon: [
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
