import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Draw Magic",
  description:
    "Draw Magic is an innovative and feature-rich web-based drawing application designed for creativity and artistic expression. It offers tools like customizable brushes, pencil, eraser, and dynamic color pickers, ensuring users have everything they need to create stunning artwork. With real-time tool switching, custom cursors, and scalable brush options, Draw Magic provides an intuitive and seamless drawing experience. Perfect for artists, designers, and hobbyists, the platform combines functionality with simplicity to unlock creative potential. Future-proof and extendable, Draw Magic adapts to evolving artistic needs, empowering users to bring their imagination to life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
