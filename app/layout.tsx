import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtomicLangToggle from "@/components/AtomicLangToggle"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Moreno — Desarrollador Full Stack",
  description:
    "Portafolio personal de Alex Moreno. Desarrollador Full Stack especializado en experiencias web modernas, elegantes y de alto rendimiento.",
  keywords: ["desarrollador", "full stack", "portafolio", "Next.js", "TypeScript", "React"],
  authors: [{ name: "Alex Moreno" }],
  openGraph: {
    title: "Alex Moreno — Desarrollador Full Stack",
    description: "Portafolio personal de Alex Moreno. Desarrollador Full Stack especializado en experiencias web modernas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-[#0a0a0f] text-slate-200 selection:bg-violet-600/40 selection:text-violet-100`}
      >
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
            <AtomicLangToggle />
    </body>
    </html>
  );
}