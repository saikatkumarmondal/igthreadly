"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createWorkspaceSchema,
  type CreateWorkspaceInput,
} from "@/lib/validations/organization.schema";
import { useCreateWorkspaceMutation } from "@/lib/redux/api/organizationApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BUSINESS_TYPE_OPTIONS = [
  "Agency",
  "Coach / Consultant",
  "E-commerce",
  "Real Estate",
  "SaaS",
  "Personal Brand",
  "Service Business",
] as const;

const INDUSTRY_OPTIONS = [
  "Marketing",
  "Education",
  "Fitness & Wellness",
  "Fashion & Beauty",
  "Technology",
  "Finance",
  "Other",
] as const;

export function CreateWorkspaceCard() {
  const [createWorkspace, { isLoading: isWorkspaceCreating }] =
    useCreateWorkspaceMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateWorkspaceInput>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const onSubmit = async (formData: CreateWorkspaceInput) => {
    try {
      await createWorkspace(formData).unwrap();
      toast.success("Workspace created successfully");
    } catch (error) {
      const errorMessage =
        (error as { data?: { error?: string } })?.data?.error ??
        "Unable to create workspace";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-line bg-white p-8 shadow-sm">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-coral">
        Get Started
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
        Create Your First Workspace
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        Every Instagram account, automation, and lead will live inside a
        workspace.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5"
        noValidate
      >
        <div className="space-y-2">
          <Label htmlFor="name">Workspace Name</Label>
          <Input
            id="name"
            placeholder="Rahim Marketing Agency"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Business Type</Label>
            <Select
              onValueChange={(value) =>
                setValue("businessType", value, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.businessType && (
              <p className="text-sm text-destructive">
                {errors.businessType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Industry</Label>
            <Select
              onValueChange={(value) =>
                setValue("industry", value, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRY_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-sm text-destructive">
                {errors.industry.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            placeholder="https://yourbusiness.com"
            {...register("website")}
          />
          {errors.website && (
            <p className="text-sm text-destructive">
              {errors.website.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isWorkspaceCreating}
        >
          {isWorkspaceCreating
            ? "Creating..."
            : "Create Workspace"}
        </Button>
      </form>
    </div>
  );
}