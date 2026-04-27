export type ActionTask = {
  id: number;
  title: string;
  status: "completed" | "pending";
  lift: string;
  action_button_label: string;
};

export type GrowthPoint = {
  month: string;
  visibility: number;
  reach: number;
  conversion: number;
};

export type ChannelPoint = {
  name: string;
  value: number;
};

export type AnalyticsData = {
  average_score: number;
  platforms: { platform: string; score: number }[];
  growth_data: GrowthPoint[];
  channel_data: ChannelPoint[];
  summary_metrics: { label: string; value: number; suffix: string }[];
};

export type DashboardData = {
  total_posts: number;
  scheduled_posts: number;
  growth: number;
  campaign_lift: number;
  signals_tracked: number;
  pending_actions: number;
  average_score: number;
  growth_data: GrowthPoint[];
  channel_data: ChannelPoint[];
};

export type SchedulerData = {
  month: string;
  days: number[];
  scheduled_days: number[];
  scheduled_count: number;
  posts: { id: number; time: string; title: string; platform: string }[];
};

export type LandingData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  logos: string[];
  features: {
    title: string;
    text: string;
    stat: number;
    label: string;
  }[];
  dashboard: DashboardData;
  analytics: AnalyticsData;
  actions: ActionTask[];
};

export type GeneratedContent = {
  ideas: string[];
  captions: string[];
  hashtags: string[];
  saved_post: {
    id: number;
    title: string;
    content: string;
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function getLandingData() {
  return apiFetch<LandingData>("/landing");
}

export function getDashboardData() {
  return apiFetch<DashboardData>("/dashboard");
}

export function getAnalyticsData() {
  return apiFetch<AnalyticsData>("/analytics");
}

export function getActions() {
  return apiFetch<ActionTask[]>("/actions");
}

export function getSchedulerData() {
  return apiFetch<SchedulerData>("/scheduler");
}

export function generateContent(business: string) {
  return apiFetch<GeneratedContent>("/content/generate", {
    method: "POST",
    body: JSON.stringify({ business })
  });
}
