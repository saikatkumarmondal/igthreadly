import { prisma } from "@/lib/db/prisma";
import type { MemberRole } from "@prisma/client";

interface AuthorizeOrganizationParams {
  userId: string;
  organizationId: string;
  requiredRoles?: MemberRole[];
}

interface AuthorizeOrganizationResult {
  isAuthorized: boolean;
  memberRole: MemberRole | null;
}

export async function authorizeOrganizationAccess({
  userId,
  organizationId,
  requiredRoles,
}: AuthorizeOrganizationParams): Promise<AuthorizeOrganizationResult> {
  const membership = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: { userId, organizationId },
    },
  });

  if (!membership) {
    return { isAuthorized: false, memberRole: null };
  }

  if (requiredRoles && !requiredRoles.includes(membership.role)) {
    return { isAuthorized: false, memberRole: membership.role };
  }

  return { isAuthorized: true, memberRole: membership.role };
}