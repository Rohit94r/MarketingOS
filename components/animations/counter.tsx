"use client";

import { useEffect, useState } from "react";

export function Counter({
  value,
  suffix = "",
  duration = 1200
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const frames = Math.max(Math.round(duration / 16), 1);
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      setDisplay(Math.round(value * progress));
      if (frame >= frames) window.clearInterval(timer);
    }, 16);

    return () => window.clearInterval(timer);
  }, [duration, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}
