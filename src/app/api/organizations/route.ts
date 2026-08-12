import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/auth";
import { createWorkspaceSchema } from "@/lib/validations/organization.schema";
import { generateSlugFromName } from "@/lib/utils/slug";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const requestBody = await request.json();
    const parsedBody = createWorkspaceSchema.safeParse(requestBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, businessType, website, industry } = parsedBody.data;
    const slug = generateSlugFromName(name);

    const newOrganization = await prisma.organization.create({
      data: {
        name,
        slug,
        businessType,
        website: website || null,
        industry,
        members: {
          create: {
            userId: session.user.id,
            role: "OWNER",
          },
        },
      },
      include: { members: true },
    });

    return NextResponse.json(
      { organization: newOrganization },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CREATE_ORGANIZATION_ERROR]", error);
    return NextResponse.json(
      { error: "A server error occurred, please try again" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const userOrganizations = await prisma.organizationMember.findMany({
      where: { userId: session.user.id },
      include: { organization: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { organizations: userOrganizations },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET_ORGANIZATIONS_ERROR]", error);
    return NextResponse.json(
      { error: "A server error occurred, please try again" },
      { status: 500 }
    );
  }
}