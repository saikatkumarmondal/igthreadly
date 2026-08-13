"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Menu, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NAV_ITEMS } from "./nav-items";

export function Topbar() {
  const { data: session } = useSession();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const userInitial = session?.user?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-line bg-white px-4 lg:px-8">
      <div className="relative flex items-center gap-3 lg:hidden">
        <button
          onClick={() => setIsMobileNavOpen((prev) => !prev)}
          className="rounded-lg p-2 text-ink-soft hover:bg-paper"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-display text-base font-semibold text-ink">
          IGThreadly
        </span>

        {isMobileNavOpen && (
          <nav className="absolute left-0 top-12 z-20 w-56 rounded-xl border border-line bg-white p-2 shadow-lg">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper hover:text-ink"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <div className="hidden lg:block" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-paper">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-brand-indigo text-sm text-white">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium text-ink sm:inline">
              {session?.user?.name ?? "User"}
            </span>
            <ChevronDown className="h-4 w-4 text-ink-soft" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem disabled className="text-xs text-ink-soft">
            {session?.user?.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}