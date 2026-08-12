import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(2, "Workspace name must be at least 2 characters").max(100),
  businessType: z.string().min(1, "Please select a business type"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  industry: z.string().min(1, "Please select an industry"),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;