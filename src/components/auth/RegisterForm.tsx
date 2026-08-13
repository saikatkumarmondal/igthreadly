"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  registerAccountSchema,
  type RegisterAccountInput,
} from "@/lib/validations/auth.schema";
import { useRegisterAccountMutation } from "@/lib/redux/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/custom/PasswordInput";

export function RegisterForm() {
  const router = useRouter();
  const [registerAccount, { isLoading: isRegisterSubmitting }] =
    useRegisterAccountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterAccountInput>({
    resolver: zodResolver(registerAccountSchema),
  });

  const onSubmit = async (formData: RegisterAccountInput) => {
    try {
      await registerAccount(formData).unwrap();
      toast.success("Account created, please log in now");
      router.push("/login");
    } catch (error) {
      const errorMessage =
        (error as { data?: { error?: string } })?.data?.error ??
        "Unable to create account";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Saikat Kumar Mondal" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

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
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isRegisterSubmitting}>
        {isRegisterSubmitting
          ? "Creating Account..."
          : "Create Free Account"}
      </Button>

      <p className="text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-brand-indigo hover:underline"
        >
          Log In
        </Link>
      </p>
    </form>
  );
}