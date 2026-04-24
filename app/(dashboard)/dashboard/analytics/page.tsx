import { Counter } from "@/components/animations/counter";
import { AreaMetricChart, BarMetricChart, LineMetricChart } from "@/components/charts/marketing-charts";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">Analytics</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">Growth tracking across every surface</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[["Pipeline influence", 42, "%"], ["Organic mentions", 286, ""], ["Conversion lift", 19, "%"]].map(([label, value, suffix]) => (
          <Card key={label} className="p-5">
            <p className="text-sm text-black/45">{label}</p>
            <p className="mt-6 text-4xl font-semibold"><Counter value={Number(value)} suffix={String(suffix)} /></p>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="p-5"><LineMetricChart /></Card>
        <Card className="p-5"><BarMetricChart /></Card>
      </div>
      <Card className="p-5"><AreaMetricChart /></Card>
    </div>
  );
}
