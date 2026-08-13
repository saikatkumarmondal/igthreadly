import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MemberRole } from "@prisma/client";

interface OrganizationSummary {
  id: string;
  name: string;
  slug: string;
  businessType: string | null;
  website: string | null;
  industry: string | null;
  createdAt: string;
}

interface OrganizationMembership {
  id: string;
  role: MemberRole;
  organizationId: string;
  organization: OrganizationSummary;
}

interface CreateWorkspacePayload {
  name: string;
  businessType: string;
  website?: string;
  industry: string;
}

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Organization"],
  endpoints: (builder) => ({
    getMyOrganizations: builder.query<OrganizationMembership[], void>({
      query: () => "/organizations",
      transformResponse: (
        response: { organizations: OrganizationMembership[] }
      ) => response.organizations,
      providesTags: ["Organization"],
    }),

    createWorkspace: builder.mutation<
      { organization: OrganizationSummary },
      CreateWorkspacePayload
    >({
      query: (body) => ({
        url: "/organizations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Organization"],
    }),
  }),
});

export const {
  useGetMyOrganizationsQuery,
  useCreateWorkspaceMutation,
} = organizationApi;