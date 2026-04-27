"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, CircleDashed, Wand2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getActions, type ActionTask } from "@/lib/api";

export default function ActionsPage() {
  const [tasks, setTasks] = useState<ActionTask[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getActions()
      .then(setTasks)
      .catch(() => setError("Unable to load actions. Please start the FastAPI backend."));
  }, []);

  if (error) {
    return <Card className="p-5 text-sm text-red-700">{error}</Card>;
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">Actions</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">Task engine with measurable lift</h1>
      </div>
      <Card className="p-4">
        <div className="space-y-3">
          {tasks.length === 0 && <p className="p-3 text-sm text-black/55">Loading actions...</p>}
          {tasks.map(({ id, status, title, lift, action_button_label }) => {
            const Icon = status === "completed" ? CheckCircle2 : CircleDashed;
            return (
              <div key={id} className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white/70 p-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="grid size-11 place-items-center rounded-2xl bg-black/5">
                    <Icon size={19} className={status === "completed" ? "text-blue-600" : "text-violet-600"} />
                  </div>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="mt-1 text-sm text-black/45">{status} - {lift}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm"><Zap size={15} /> Fix</Button>
                  <Button variant="ghost" size="sm"><Wand2 size={15} /> Generate</Button>
                  <Button variant="blue" size="sm">{action_button_label}</Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
