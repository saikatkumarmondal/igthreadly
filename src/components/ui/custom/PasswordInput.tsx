"use client";

import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function PasswordInput({ className, ...props }: ComponentProps<typeof Input>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={isPasswordVisible ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}