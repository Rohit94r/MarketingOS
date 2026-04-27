"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getSchedulerData, type SchedulerData } from "@/lib/api";

export default function SchedulerPage() {
  const [scheduler, setScheduler] = useState<SchedulerData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getSchedulerData()
      .then(setScheduler)
      .catch(() => setError("Unable to load scheduler. Please start the FastAPI backend."));
  }, []);

  if (error) {
    return <Card className="p-5 text-sm text-red-700">{error}</Card>;
  }

  if (!scheduler) {
    return <Card className="p-5 text-sm text-black/55">Loading scheduler...</Card>;
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">Scheduler</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">Calendar built for campaign velocity</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_.55fr]">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold"><CalendarDays size={18} /> {scheduler.month}</h2>
            <span className="text-sm text-black/45">{scheduler.scheduled_count} scheduled</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {scheduler.days.map((day) => (
              <div
                key={day}
                className={`aspect-square rounded-2xl border border-black/10 p-2 text-sm ${scheduler.scheduled_days.includes(day) ? "bg-blue-500/15 text-blue-800" : "bg-white/65 text-black/55"}`}
              >
                {day}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="mb-5 text-lg font-semibold">Post list</h2>
          <div className="space-y-3">
            {scheduler.posts.map((post) => (
              <div key={post.id} className="rounded-2xl border border-black/10 bg-white/65 p-4">
                <p className="mb-2 flex items-center gap-2 text-sm text-blue-700"><Clock size={15} /> {post.time}</p>
                <p className="text-black/76">{post.title}</p>
                <p className="mt-1 text-xs text-black/42">{post.platform}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
