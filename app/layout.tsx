import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MealMates – Eat Out. Save Together.",
  description:
    "MealMates helps college students get exclusive restaurant discounts just by dining out in groups. Join the waitlist today.",
  openGraph: {
    title: "MealMates – Eat Out. Save Together.",
    description:
      "Get exclusive restaurant discounts when you dine out with your crew. Built for college students.",
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
