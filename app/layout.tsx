import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Outfit,
  Instrument_Serif,
  Playfair_Display,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Thanigaivel — Software Developer",
  description:
    "Portfolio of Thanigaivel — software developer at Golden Axe. One year shipping production web & native apps across dating, delivery, booking, daycare and professional networking.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} ${outfit.variable} ${instrument.variable} ${playfair.variable} ${geistMono.variable} font-jakarta antialiased bg-[#0F0E0E]`}
      >
        {children}
      </body>
    </html>
  );
}
