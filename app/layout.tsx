import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import CustomNavbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Stumble",
  description: "Stumble",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body>
        <Providers>
          <CustomNavbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
