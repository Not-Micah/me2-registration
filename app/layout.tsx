import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { DataContextProvider } from "@/providers/DataProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Me2 Waitlist",
  description: "Waiting for a thousand students to register before our launch!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataContextProvider>
          <div className="
          bg-offwhite 
          py-12
          overflow-y-scroll no-scrollbar">
            {children}  
          </div>
        </DataContextProvider>
      </body>
    </html>
  );
}
