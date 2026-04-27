"use client";

import { useEffect, useState } from "react";
import { Counter } from "@/components/animations/counter";
import { AreaMetricChart, BarMetricChart, LineMetricChart } from "@/components/charts/marketing-charts";
import { Card } from "@/components/ui/card";
import { getAnalyticsData, type AnalyticsData } from "@/lib/api";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAnalyticsData()
      .then(setAnalytics)
      .catch(() => setError("Unable to load analytics. Please start the FastAPI backend."));
  }, []);

  if (error) {
    return <Card className="p-5 text-sm text-red-700">{error}</Card>;
  }

  if (!analytics) {
    return <Card className="p-5 text-sm text-black/55">Loading analytics...</Card>;
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">Analytics</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">Growth tracking across every surface</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {analytics.summary_metrics.map((metric) => (
          <Card key={metric.label} className="p-5">
            <p className="text-sm text-black/45">{metric.label}</p>
            <p className="mt-6 text-4xl font-semibold"><Counter value={metric.value} suffix={metric.suffix} /></p>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="p-5"><LineMetricChart data={analytics.growth_data} /></Card>
        <Card className="p-5"><BarMetricChart data={analytics.channel_data} /></Card>
      </div>
      <Card className="p-5"><AreaMetricChart data={analytics.growth_data} /></Card>
    </div>
  );
}
