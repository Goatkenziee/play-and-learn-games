import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Play & Learn — K-3rd Grade Educational Games",
  description:
    "Interactive educational games for Kindergarten through 3rd Grade. Aligned with curriculum standards in math and reading. Fun, safe, and designed to build confidence.",
  keywords: [
    "educational games",
    "kids games",
    "kindergarten",
    "1st grade",
    "2nd grade",
    "3rd grade",
    "math games",
    "reading games",
    "phonics",
    "sight words",
    "counting",
    "addition",
    "subtraction",
    "multiplication",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ ["--font-sans" as string]: "Inter, system-ui, sans-serif" }}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
