import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import ScrollToTop from "./components/helper/scroll-to-top";
import ChatWidgetLoader from "./components/chat/ChatWidgetLoader";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://praneeth-portfolio.vercel.app";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Praneeth Vedagiri | Full-Stack Developer & GenAI Specialist",
  description:
    "Full-stack developer specializing in React, Next.js, Node.js, and GenAI integrations. Building intelligent web applications with modern tech stacks and AI-powered solutions. Available for freelance projects.",
  keywords: [
    "Full-Stack Developer",
    "GenAI Specialist",
    "React Developer",
    "Next.js Developer",
    "AI Integration",
    "LLM Developer",
    "Freelance Developer",
    "Web Development",
    "Praneeth Vedagiri"
  ],
  authors: [{ name: "Praneeth Vedagiri" }],
  creator: "Praneeth Vedagiri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Praneeth Vedagiri | Full-Stack Developer & GenAI Specialist",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and GenAI integrations. Building intelligent web applications with modern tech stacks.",
    siteName: "Praneeth Vedagiri Portfolio",
    images: [
      {
        url: new URL("/og-image.png", SITE_URL).toString(),
        width: 1200,
        height: 630,
        alt: "Praneeth Vedagiri - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praneeth Vedagiri | Full-Stack Developer & GenAI Specialist",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and GenAI integrations.",
    creator: "@praneethvvsss",
    images: [new URL("/og-image.png", SITE_URL).toString()],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1224",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0d1224] text-white antialiased`}>
        <MotionConfig reducedMotion="user">
          <div className="min-h-screen relative">
            <Navbar />
            <main className="relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
              {children}
            </main>
            <ScrollToTop />
            <Footer />
            <ChatWidgetLoader />
          </div>
        </MotionConfig>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      </body>
    </html>
  );
}
