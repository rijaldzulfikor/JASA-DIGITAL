import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jasa Digital - Pemesanan Website & Desain Grafis",
  description:
    "Platform pemesanan jasa pembuatan website dan desain grafis untuk usaha kecil dan brand modern.",
  openGraph: {
    title: "Jasa Digital - Pemesanan Website & Desain Grafis",
    description:
      "Platform pemesanan jasa pembuatan website dan desain grafis untuk usaha kecil dan brand modern.",
    type: "website",
    url: "https://jasadigital.example.com",
    siteName: "Jasa Digital",
    images: [
      {
        url: "https://jasadigital.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jasa Digital - Web & Desain 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Digital - Pemesanan Website & Desain Grafis",
    description:
      "Platform pemesanan jasa pembuatan website dan desain grafis untuk usaha kecil dan brand modern.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
