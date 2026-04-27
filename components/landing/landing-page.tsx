"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Gauge,
  Layers3,
  PenLine,
  Radar,
  Sparkles,
  Wand2,
  Zap
} from "lucide-react";
import { Counter } from "@/components/animations/counter";
import { Reveal } from "@/components/animations/reveal";
import { BarMetricChart, CircularProgress, LineMetricChart } from "@/components/charts/marketing-charts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLandingData, type ActionTask, type LandingData } from "@/lib/api";

const featureIcons = [Gauge, PenLine, Radar, Zap];

function ProductConsole({
  dashboard,
  actions
}: {
  dashboard: LandingData["dashboard"];
  actions: ActionTask[];
}) {
  return (
    <Card className="p-4 md:p-5">
      <div className="rounded-[1.25rem] border border-black/10 bg-[#111] p-4 text-white shadow-[0_22px_70px_rgba(10,10,10,.22)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">MarketingOS Console</p>
            <p className="mt-1 text-xs text-white/45">Live recommendations</p>
          </div>
          <span className="rounded-full bg-blue-500/18 px-3 py-1 text-xs text-blue-100">AI active</span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Score", dashboard.average_score],
            ["Posts", dashboard.total_posts],
            ["Actions", dashboard.pending_actions]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/[0.08] p-4">
              <p className="text-3xl font-semibold"><Counter value={Number(value)} /></p>
              <p className="mt-1 text-xs text-white/45">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-white/65">Recommended next moves</p>
            <Wand2 size={16} className="text-blue-300" />
          </div>
          <div className="space-y-3">
            {actions.slice(0, 3).map((action) => (
              <motion.div
                key={action.id}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.06] px-3 py-3"
              >
                <div>
                  <p className="text-sm">{action.title}</p>
                  <p className="mt-1 text-xs text-white/40">{action.status}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs text-black">{action.action_button_label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function MiniPreview({ index }: { index: number }) {
  return (
    <Card className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.22em] text-black/45">workflow preview</span>
        <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/55">step {index + 1}</span>
      </div>
      <div className="grid gap-3">
        {[82, 64, 92, 56].map((width, row) => (
          <motion.div
            key={row}
            className="h-10 rounded-2xl border border-black/10 bg-black/[0.035]"
            initial={{ width: "35%" }}
            whileInView={{ width: `${width}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: row * 0.08 }}
          />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-2xl border border-black/10 bg-white/70 p-3">
            <div className="mb-3 h-2 w-10 rounded-full bg-black/15" />
            <div className="h-10 rounded-xl bg-blue-500/12" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function LandingPage() {
  const [landing, setLanding] = useState<LandingData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getLandingData()
      .then(setLanding)
      .catch(() => setError("Unable to load site data. Please start the FastAPI backend."));
  }, []);

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center px-5 text-black">
        <Card className="max-w-lg p-6 text-center">
          <h1 className="text-2xl font-semibold">AI MarketingOS</h1>
          <p className="mt-3 text-sm text-red-700">{error}</p>
        </Card>
      </main>
    );
  }

  if (!landing) {
    return (
      <main className="grid min-h-screen place-items-center px-5 text-black">
        <Card className="p-6 text-sm text-black/55">Loading AI MarketingOS...</Card>
      </main>
    );
  }

  const score = landing.analytics.average_score;
  const latestGrowth = landing.analytics.growth_data.at(-1);
  const visibilityAverage = latestGrowth?.visibility ?? 0;
  const reachAverage = latestGrowth?.reach ?? 0;
  const conversionAverage = latestGrowth?.conversion ?? 0;

  return (
    <main className="overflow-hidden text-black">
      <nav className="fixed left-1/2 top-4 z-50 w-[min(1120px,calc(100%-24px))] -translate-x-1/2 rounded-full border border-black/10 bg-[#fbfaf7]/82 px-4 py-3 shadow-[0_16px_45px_rgba(10,10,10,.08)] backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="grid size-9 place-items-center rounded-full bg-black text-white">
              <Sparkles size={17} />
            </span>
            AI MarketingOS
          </Link>
          <div className="hidden items-center gap-7 text-sm text-black/58 md:flex">
            <a href="#features">Features</a>
            <a href="#analytics">Analytics</a>
            <a href="#actions">Actions</a>
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <Link href="/dashboard">
            <Button size="sm">Open App</Button>
          </Link>
        </div>
      </nav>

      <section className="px-5 pb-20 pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_.92fr]">
          <Reveal>
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/65">
                <CircleDot size={15} className="text-blue-600" />
                {landing.hero.eyebrow}
              </div>
              <h1 className="max-w-4xl text-balance text-6xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
                {landing.hero.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62">
                {landing.hero.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free <ArrowRight size={18} />
                  </Button>
                </Link>
                <a href="#analytics">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                    See Demo
                  </Button>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ProductConsole dashboard={landing.dashboard} actions={landing.actions} />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/35 py-6">
        <div className="no-scrollbar flex gap-4 overflow-hidden">
          {[...landing.logos, ...landing.logos].map((logo, index) => (
            <motion.div
              key={`${logo}-${index}`}
              className="min-w-44 rounded-full border border-black/10 bg-white/65 px-8 py-4 text-center text-sm font-semibold tracking-[0.24em] text-black/35 grayscale"
              animate={{ x: ["0%", "-120%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.28em] text-blue-600">Simple operating loop</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Built to feel clear on Monday morning, not dramatic in a demo.
          </h2>
        </Reveal>
        <div className="mt-16 space-y-16">
          {landing.features.map((feature, index) => {
            const Icon = featureIcons[index] ?? Gauge;
            return (
              <Reveal key={feature.title}>
                <div className="grid items-center gap-8 lg:grid-cols-2">
                  <div className={index % 2 ? "lg:order-2" : ""}>
                    <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-black text-white">
                      <Icon size={21} />
                    </div>
                    <h3 className="text-3xl font-semibold tracking-[-0.02em]">{feature.title}</h3>
                    <p className="mt-4 max-w-xl text-lg leading-8 text-black/58">{feature.text}</p>
                    <div className="mt-8 flex items-end gap-3">
                      <span className="text-6xl font-semibold tracking-[-0.05em]"><Counter value={feature.stat} /></span>
                      <span className="pb-2 text-black/45">{feature.label}</span>
                    </div>
                  </div>
                  <MiniPreview index={index} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="analytics" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <Card className="overflow-hidden p-5 md:p-8">
            <div className="mb-8 grid gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-blue-600">Interactive analytics</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Numbers people can trust.</h2>
                <p className="mt-4 max-w-2xl text-black/58">
                  Average score = avg(visibility {visibilityAverage}, reach {reachAverage}, conversion {conversionAverage}) = {score}.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[["Visibility", visibilityAverage], ["Reach", reachAverage], ["Intent", conversionAverage]].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-black/10 bg-white/70 p-4">
                    <p className="text-3xl font-semibold"><Counter value={Number(value)} /></p>
                    <p className="mt-1 text-xs text-black/45">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.25fr_.85fr]">
              <div className="rounded-3xl border border-black/10 bg-white/65 p-4">
                <LineMetricChart data={landing.analytics.growth_data} />
              </div>
              <div className="grid gap-5">
                <div className="rounded-3xl border border-black/10 bg-white/65 p-4">
                  <CircularProgress value={score} />
                </div>
                <div className="rounded-3xl border border-black/10 bg-white/65 p-4">
                  <BarMetricChart data={landing.analytics.channel_data} />
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      <section id="actions" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.28em] text-blue-600">Action engine</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Insight should feel usable.</h2>
            <p className="mt-5 text-lg leading-8 text-black/58">
              Every recommendation is written as a plain task with a status, owner-ready action, and expected impact.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Card className="p-4">
              <div className="space-y-3">
                {landing.actions.map((action) => (
                  <motion.div
                    key={action.id}
                    whileHover={{ x: 4 }}
                    className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white/70 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className={action.status === "completed" ? "text-blue-600" : "text-violet-600"} size={20} />
                      <div>
                        <p className="font-medium">{action.title}</p>
                        <p className="mt-1 text-sm text-black/42">{action.status} - {action.lift}</p>
                      </div>
                    </div>
                    <Button variant={action.status === "completed" ? "ghost" : "blue"} size="sm">{action.action_button_label}</Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-to-b from-transparent to-black px-5 py-28 text-white lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-5xl text-center">
            <Layers3 className="mx-auto mb-6" size={36} />
            <h2 className="text-balance text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
              Your competitors are already using AI
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/62">
              Use a clearer operating system for the work your team already does every week.
            </p>
            <Link href="/dashboard" className="mt-9 inline-flex">
              <Button variant="ghost" size="lg">
                Enter MarketingOS <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
