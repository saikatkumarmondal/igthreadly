"use client";

import { MessageSquare, UserPlus, ShieldCheck, TrendingUp } from "lucide-react";
import { useGetMyOrganizationsQuery } from "@/lib/redux/api/organizationApi";
import { CreateWorkspaceCard } from "@/components/workspace/CreateWorkspaceCard";
import { KpiCard } from "@/components/dashboard/KpiCard";

const KPI_PLACEHOLDERS = [
  { label: "Total Conversations", value: "0", icon: MessageSquare },
  { label: "New Leads", value: "0", icon: UserPlus },
  { label: "Qualified Leads", value: "0", icon: ShieldCheck },
  { label: "Conversion Rate", value: "0%", icon: TrendingUp },
] as const;

export default function DashboardPage() {
  const { data: organizations, isLoading } = useGetMyOrganizationsQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-ink-soft">
        Loading...
      </div>
    );
  }

  const hasWorkspace = Boolean(organizations && organizations.length > 0);

  if (!hasWorkspace) {
    return <CreateWorkspaceCard />;
  }

  const activeOrganization = organizations![0].organization;

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-coral">
          {activeOrganization.name}
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI_PLACEHOLDERS.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
        <p className="font-display text-lg font-medium text-ink">
          No Instagram account connected yet
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Connect Instagram and create your first automation
        </p>
      </div>
    </div>
  );
}