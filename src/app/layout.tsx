import type { Metadata } from "next";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "IGThreadly",
  description: "AI-Powered Instagram Lead Generation Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}