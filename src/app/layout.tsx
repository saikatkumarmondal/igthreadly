import type { Metadata } from "next";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
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
      <body suppressHydrationWarning>
        <SessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}