import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { fontVariables } from "./fonts";
import AuroraBackground from "@/components/main/AuroraBackground";
import Navbar from "@/components/main/Navbar";
import CustomCursor from "@/components/main/CustomCursor";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Bárbara Peslo | Full-Stack Software Developer",
  description:
    "Full-stack software developer building web products, scalable platforms, and AI solutions.",
  keywords: [
    "Bárbara Peslo",
    "Full-Stack Software Developer",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Machine Learning",
    "LLM",
    "RAG",
    "Agentic AI",
    "LangChain",
    "Vector Search",
    "Computer Vision",
    "YOLO",
    "ONNX",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Bárbara Peslo" }],
  openGraph: {
    title: "Bárbara Peslo | Full-Stack Software Developer",
    description: "Building web products, scalable platforms, and AI solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bárbara Peslo | Full-Stack Software Developer",
    description: "Building web products, scalable platforms, and AI solutions.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen bg-canvas font-sans text-zinc-900 antialiased">
        <SmoothScroll />
        <ScrollProgressBar />
        <CustomCursor />
        <AuroraBackground />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Toaster theme="light" position="bottom-right" offset={84} richColors closeButton />
        <SpeedInsights />
      </body>
    </html>
  );
}
