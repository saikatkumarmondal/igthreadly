"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  loginAccountSchema,
  type LoginAccountInput,
} from "@/lib/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/custom/PasswordInput";

export function LoginForm() {
  const router = useRouter();
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAccountInput>({
    resolver: zodResolver(loginAccountSchema),
  });

  const onSubmit = async (formData: LoginAccountInput) => {
    setIsLoginSubmitting(true);
    try {
      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.error("Invalid email or password");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@business.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-brand-indigo hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoginSubmitting}>
        {isLoginSubmitting ? "Logging in..." : "Log In"}
      </Button>

      <p className="text-center text-sm text-ink-soft">
        New user?{" "}
        <Link
          href="/register"
          className="font-medium text-brand-indigo hover:underline"
        >
          Create a Free Account
        </Link>
      </p>
    </form>
  );
}