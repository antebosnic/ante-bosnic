import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import { Geist, Geist_Mono, DM_Sans, Inter, Playfair_Display } from "next/font/google";
import ContactModal from "./components/ContactModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "H.Studio",
  description: "Full-service creative studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ContactModal />
        <SanityLive refreshOnFocus={false} refreshOnReconnect={false} />
      </body>
    </html>
  );
}
