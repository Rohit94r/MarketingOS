"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { ChannelPoint, GrowthPoint } from "@/lib/api";

const tooltipStyle = {
  background: "rgba(255,255,255,.94)",
  border: "1px solid rgba(10,10,10,.1)",
  borderRadius: 14,
  color: "#0a0a0a",
  boxShadow: "0 18px 50px rgba(10,10,10,.12)"
};

export function LineMetricChart({ data }: { data: GrowthPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(10,10,10,.08)" vertical={false} />
        <XAxis dataKey="month" stroke="rgba(10,10,10,.45)" tickLine={false} axisLine={false} />
        <YAxis stroke="rgba(10,10,10,.35)" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="visibility" stroke="#3B82F6" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="reach" stroke="#8B5CF6" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AreaMetricChart({ data }: { data: GrowthPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="visibility" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(10,10,10,.08)" vertical={false} />
        <XAxis dataKey="month" stroke="rgba(10,10,10,.45)" tickLine={false} axisLine={false} />
        <YAxis stroke="rgba(10,10,10,.35)" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="visibility" stroke="#3B82F6" fill="url(#visibility)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarMetricChart({ data }: { data: ChannelPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(10,10,10,.08)" vertical={false} />
        <XAxis dataKey="name" stroke="rgba(10,10,10,.45)" tickLine={false} axisLine={false} />
        <YAxis stroke="rgba(10,10,10,.35)" tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={index % 2 ? "#8B5CF6" : "#3B82F6"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CircularProgress({ value }: { value: number }) {
  return (
    <ResponsiveContainer width="100%" height={210}>
      <RadialBarChart innerRadius="72%" outerRadius="100%" data={[{ value }]} startAngle={90} endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="value" cornerRadius={18} fill="#3B82F6" background={{ fill: "rgba(10,10,10,.08)" }} />
        <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" fill="#0a0a0a" fontSize="34" fontWeight="700">
          {value}
        </text>
        <text x="50%" y="64%" textAnchor="middle" dominantBaseline="middle" fill="rgba(10,10,10,.55)" fontSize="12">
          avg score
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
