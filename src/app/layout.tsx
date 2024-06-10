import type {Metadata} from "next";
import {Inter, Lexend_Deca} from "next/font/google";
import {cn} from "@/utils/class-names";
import "./globals.css";
import AuthProvider from "@/app/AuthProvider";

const inter = Inter({subsets: ["latin"], variable: "--font-inter"});

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Efood",
  description: "Application de menu digital",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
    <body className={cn(inter.variable, lexendDeca.variable, "font-inter")}>
    <AuthProvider>
      {children}
    </AuthProvider>
    </body>
    </html>
  );
}
