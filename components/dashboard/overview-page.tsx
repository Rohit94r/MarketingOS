"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, BrainCircuit, CalendarClock, RadioTower } from "lucide-react";
import { Counter } from "@/components/animations/counter";
import { AreaMetricChart, BarMetricChart, CircularProgress } from "@/components/charts/marketing-charts";
import { Card } from "@/components/ui/card";
import { getDashboardData, type DashboardData } from "@/lib/api";

export default function DashboardOverview() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardData()
      .then(setDashboard)
      .catch(() => setError("Unable to load dashboard data. Please start the FastAPI backend."));
  }, []);

  if (error) {
    return <Card className="p-5 text-sm text-red-700">{error}</Card>;
  }

  if (!dashboard) {
    return <Card className="p-5 text-sm text-black/55">Loading dashboard data...</Card>;
  }

  const metrics = [
    { label: "AI score", value: dashboard.average_score, suffix: "", icon: BrainCircuit },
    { label: "Campaign lift", value: dashboard.campaign_lift, suffix: "%", icon: ArrowUpRight },
    { label: "Scheduled assets", value: dashboard.scheduled_posts, suffix: "", icon: CalendarClock },
    { label: "Signals tracked", value: dashboard.signals_tracked, suffix: "", icon: RadioTower }
  ];

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">Overview</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">Autonomous growth cockpit</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="p-5">
              <div className="mb-7 flex items-center justify-between">
                <p className="text-sm text-black/48">{metric.label}</p>
                <Icon size={18} className="text-blue-600" />
              </div>
              <p className="text-4xl font-semibold tracking-[-0.04em]">
                <Counter value={metric.value} suffix={metric.suffix} />
              </p>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Visibility growth</h2>
            <span className="rounded-full bg-blue-500/12 px-3 py-1 text-xs text-blue-700">+{dashboard.growth}%</span>
          </div>
          <AreaMetricChart data={dashboard.growth_data} />
        </Card>
        <Card className="p-5">
          <h2 className="mb-5 text-lg font-semibold">AI operating score</h2>
          <CircularProgress value={dashboard.average_score} />
        </Card>
      </div>
      <Card className="p-5">
        <h2 className="mb-5 text-lg font-semibold">Channel strength</h2>
        <BarMetricChart data={dashboard.channel_data} />
      </Card>
    </div>
  );
}
