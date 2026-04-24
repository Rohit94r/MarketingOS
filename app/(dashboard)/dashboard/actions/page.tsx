import { CheckCircle2, CircleDashed, Wand2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const tasks: Array<{
  status: "Completed" | "In Progress";
  title: string;
  lift: string;
  Icon: typeof CheckCircle2;
}> = [
  { status: "Completed", title: "Fix low-performing product page meta title", lift: "Expected lift +8%", Icon: CheckCircle2 },
  { status: "In Progress", title: "Generate competitor response email sequence", lift: "Expected lift +14%", Icon: CircleDashed },
  { status: "In Progress", title: "Schedule five proof-led LinkedIn posts", lift: "Expected lift +11%", Icon: CircleDashed },
  { status: "Completed", title: "Create new AI visibility report module", lift: "Expected lift +17%", Icon: CheckCircle2 }
];

export default function ActionsPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">Actions</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">Task engine with measurable lift</h1>
      </div>
      <Card className="p-4">
        <div className="space-y-3">
          {tasks.map(({ status, title, lift, Icon }) => (
            <div key={title} className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white/70 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid size-11 place-items-center rounded-2xl bg-black/5">
                  <Icon size={19} className={status === "Completed" ? "text-blue-600" : "text-violet-600"} />
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="mt-1 text-sm text-black/45">{status} - {lift}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm"><Zap size={15} /> Fix</Button>
                <Button variant="ghost" size="sm"><Wand2 size={15} /> Generate</Button>
                <Button variant="blue" size="sm">Schedule</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
