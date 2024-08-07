import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { db } from "@/lib/db";
import ModalProvider from "@/providers/ModalProvider";
import { ToasterProvider } from "@/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider/>
        {/* <ModalProvider/> */}
        {children}
        </body>
    </html>
  );
}
