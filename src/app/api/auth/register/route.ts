import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { registerAccountSchema } from "@/lib/validations/auth.schema";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const parsedBody = registerAccountSchema.safeParse(requestBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = parsedBody.data;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { name, email: normalizedEmail, passwordHash },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { error: "A server error occurred. Please try again." },
      { status: 500 }
    );
  }
}