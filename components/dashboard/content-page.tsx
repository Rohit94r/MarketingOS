"use client";

import { useState } from "react";
import { Copy, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateContent, type GeneratedContent } from "@/lib/api";

export default function ContentGeneratorPage() {
  const [business, setBusiness] = useState("gym");
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");

    try {
      const generated = await generateContent(business);
      setResult(generated);
    } catch {
      setError("Unable to generate content. Please start the FastAPI backend.");
    } finally {
      setLoading(false);
    }
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
  }

  const responses = result
    ? [...result.ideas, ...result.captions, result.hashtags.join(" ")]
    : [];

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
            Business
          </div>
          <input
            className="w-full rounded-3xl border border-black/10 bg-white/72 p-5 text-sm leading-7 text-black outline-none transition focus:border-blue-400/50"
            value={business}
            onChange={(event) => setBusiness(event.target.value)}
            placeholder="gym, salon, SaaS, cafe"
          />
          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
          <div className="mt-4 flex justify-end">
            <Button variant="blue" onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate"} <Send size={16} />
            </Button>
          </div>
        </Card>
        <div className="space-y-4">
          {!result && (
            <Card className="p-5 text-sm text-black/55">
              Enter a business and generate live content from the FastAPI backend.
            </Card>
          )}
          {result?.saved_post && (
            <Card className="p-5">
              <p className="text-sm text-black/45">Saved draft #{result.saved_post.id}</p>
              <p className="mt-2 font-medium">{result.saved_post.title}</p>
            </Card>
          )}
          {responses.map((response, index) => (
            <motion.div key={response} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-black/45">AI response {index + 1}</span>
                  <Button variant="ghost" size="sm" onClick={() => copyText(response)}><Copy size={15} /> Copy</Button>
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
