import type { Metadata } from "next";
import { AuthFormHeader } from "@/components/auth/AuthFormHeader";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login — IGThreadly",
};

export default function LoginPage() {
  return (
    <>
      <AuthFormHeader
        eyebrow="Welcome Back"
        title="Log In to Your Account"
        description="Continue managing your Instagram leads and conversations."
      />
      <LoginForm />
    </>
  );
}