import {
  LayoutDashboard,
  Inbox,
  Users,
  Zap,
  Camera,
  GitBranch,
  BookOpen,
  BarChart3,
  UserCog,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inbox", href: "/inbox", icon: Inbox },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Automations", href: "/automations", icon: Zap },
  { label: "Instagram", href: "/instagram", icon: Camera },
  { label: "Pipelines", href: "/pipelines", icon: GitBranch },
  { label: "Knowledge Base", href: "/knowledge", icon: BookOpen },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Team", href: "/team", icon: UserCog },
  { label: "Settings", href: "/settings", icon: Settings },
];