import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/shared/Footer";
import { Nav } from "@/components/shared/Nav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Todo Nestor",
  description: "A simple Todo application powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/check-circle.png" />
      </head>
      <body className={cn(
        "min-h-screen flex flex-col justify-between overflow-x-hidden bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}