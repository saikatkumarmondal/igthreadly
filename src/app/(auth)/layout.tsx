import type { ReactNode } from "react";
import { ThreadPreviewPanel } from "@/components/auth/ThreadPreviewPanel";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-[55%] lg:px-20">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
      <div className="hidden lg:flex lg:w-[45%]">
        <ThreadPreviewPanel />
      </div>
    </div>
  );
}