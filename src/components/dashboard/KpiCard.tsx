import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export function KpiCard({ label, value, icon: Icon }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-soft">{label}</p>
        <div className="rounded-lg bg-brand-coral/10 p-2">
          <Icon className="h-4 w-4 text-brand-coral" />
        </div>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}