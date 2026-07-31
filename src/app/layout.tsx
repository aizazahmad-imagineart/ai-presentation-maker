import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const googleSans = localFont({
  src: "../fonts/google-sans-flex.woff2",
  variable: "--font-google-sans",
  display: "swap",
  weight: "100 900",
});

// Editorial italic accent — used sparingly, one emphasis word per headline,
// never for full sentences or body copy.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.imagine.art/imagine-computer/ai-presentation-maker"),
  title: "AI Presentation Maker: Text to Slides, Fast with Imagine Computer",
  description:
    "Imagine Computer's AI presentation maker turns any prompt, outline, or PDF into a polished deck. Try it for free. No design skills or credit card needed.",
  alternates: {
    canonical: "https://www.imagine.art/imagine-computer/ai-presentation-maker",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleSans.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
