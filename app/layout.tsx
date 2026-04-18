import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tablr – Fork it, lets go.",
  description:
    "Tablr is coming. Join the waitlist.",
  openGraph: {
    title: "Tablr – Fork it, lets go.",
    description:
      "Tablr is coming. Join the waitlist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
