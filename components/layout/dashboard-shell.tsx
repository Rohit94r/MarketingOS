"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  LayoutDashboard,
  PenLine,
  Search,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/content", label: "Content", icon: PenLine },
  { href: "/dashboard/scheduler", label: "Scheduler", icon: CalendarDays },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/actions", label: "Actions", icon: CheckCircle2 }
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen text-black">
      <aside className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-[#fbfaf7]/90 px-3 py-2 shadow-[0_-12px_40px_rgba(10,10,10,.08)] backdrop-blur-xl lg:inset-y-0 lg:right-auto lg:w-72 lg:border-r lg:border-t-0 lg:bg-[#f7f4ed]/86 lg:p-5">
        <div className="mb-8 hidden items-center gap-3 lg:flex">
          <div className="grid size-10 place-items-center rounded-2xl bg-black text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="font-semibold">MarketingOS</p>
            <p className="text-xs text-black/45">Autonomous growth desk</p>
          </div>
        </div>
        <nav className="flex justify-between gap-1 lg:block lg:space-y-2">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-xs text-black/55 transition hover:bg-black/5 hover:text-black lg:justify-start lg:text-sm",
                  active && "bg-black text-white hover:bg-black hover:text-white"
                )}
              >
                <Icon size={17} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <section className="pb-24 lg:ml-72 lg:pb-0">
        <header className="sticky top-0 z-30 border-b border-black/10 bg-[#fbfaf7]/78 px-5 py-4 backdrop-blur-xl lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/45 md:flex">
              <Search size={16} />
              <span>Search campaigns, actions, posts</span>
            </div>
            <div className="md:hidden">
              <p className="font-semibold">MarketingOS</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-xs text-blue-700">
                AI online
              </div>
              <div className="size-9 rounded-full bg-gradient-to-br from-black to-blue-500" />
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">{children}</div>
      </section>
    </main>
  );
}
