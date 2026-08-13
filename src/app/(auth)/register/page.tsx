import type { Metadata } from "next";
import { AuthFormHeader } from "@/components/auth/AuthFormHeader";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create an Account — IGThreadly",
};

export default function RegisterPage() {
  return (
    <>
      <AuthFormHeader
        eyebrow="Get Started"
        title="Create a Free Account"
        description="Start automatically turning Instagram comments into qualified leads."
      />
      <RegisterForm />
    </>
  );
}