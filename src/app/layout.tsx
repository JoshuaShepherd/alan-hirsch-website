import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Editorial Modern Typography
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-body",
  display: 'swap',
});

const crimsonPro = Crimson_Pro({ 
  subsets: ["latin"],
  variable: "--font-display",
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Alan Hirsch - Missional Church Renewal",
  description: "Reimagining the Church for a Post-Christendom World. Discover frameworks and tools to build movements that last.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${crimsonPro.variable} font-body antialiased`}
      >
        <ThemeProvider
          defaultTheme="system"
          storageKey="alan-hirsch-theme"
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
