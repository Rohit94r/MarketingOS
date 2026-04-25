import { CalendarDays, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const days = Array.from({ length: 35 }, (_, index) => index + 1);
const posts = [
  ["Mon 9:00", "Launch teaser for AI visibility score"],
  ["Tue 13:30", "Competitor tracking carousel"],
  ["Thu 10:15", "Founder POV newsletter"],
  ["Fri 16:00", "Demo cutdown for paid social"]
];

export default function SchedulerPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">Scheduler</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">Calendar built for campaign velocity</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_.55fr]">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold"><CalendarDays size={18} /> April 2026</h2>
            <span className="text-sm text-black/45">18 scheduled</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <div
                key={day}
                className={`aspect-square rounded-2xl border border-black/10 p-2 text-sm ${[3, 7, 11, 18, 24, 29].includes(day) ? "bg-blue-500/15 text-blue-800" : "bg-white/65 text-black/55"}`}
              >
                {day}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="mb-5 text-lg font-semibold">Post list</h2>
          <div className="space-y-3">
            {posts.map(([time, title]) => (
              <div key={title} className="rounded-2xl border border-black/10 bg-white/65 p-4">
                <p className="mb-2 flex items-center gap-2 text-sm text-blue-700"><Clock size={15} /> {time}</p>
                <p className="text-black/76">{title}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
