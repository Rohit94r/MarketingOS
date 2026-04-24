import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI MarketingOS",
  description: "AI-powered marketing assistant for visibility, content, analytics, and action."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
