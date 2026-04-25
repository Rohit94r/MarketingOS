"use client";

import { Copy, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const responses = [
  "Turn the launch into a contrast story: old workflow vs autonomous growth loop.",
  "Lead with a quantified visibility gap, then show the exact action MarketingOS completed.",
  "Repurpose the founder note into three short posts, one email, and one demo script."
];

export default function ContentGeneratorPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">Content Generator</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">Generate with campaign context</h1>
      </div>
      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 text-black/55">
            <Sparkles size={17} className="text-blue-600" />
            Launch prompt
          </div>
          <textarea
            className="min-h-72 w-full resize-none rounded-3xl border border-black/10 bg-white/72 p-5 text-sm leading-7 text-black outline-none transition focus:border-blue-400/50"
            defaultValue={"Create a premium launch campaign for AI MarketingOS. Target growth teams at B2B SaaS companies. Tone: decisive, futuristic, minimal."}
          />
          <div className="mt-4 flex justify-end">
            <Button variant="blue">
              Generate <Send size={16} />
            </Button>
          </div>
        </Card>
        <div className="space-y-4">
          {responses.map((response, index) => (
            <motion.div key={response} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-black/45">AI response {index + 1}</span>
                  <Button variant="ghost" size="sm"><Copy size={15} /> Copy</Button>
                </div>
                <p className="leading-7 text-black/72">{response}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
