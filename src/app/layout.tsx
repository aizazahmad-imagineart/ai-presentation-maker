import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const googleSans = localFont({
  src: "../fonts/google-sans-flex.woff2",
  variable: "--font-google-sans",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Presentation Maker: Text to Slides, Fast with Imagine Computer",
  description:
    "Imagine Computer's AI presentation maker turns any prompt, outline, or PDF into a polished deck. Try it for free. No design skills or credit card needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
