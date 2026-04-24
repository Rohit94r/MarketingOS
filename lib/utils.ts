import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function average(values: number[]) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export const visibilitySeries = [64, 68, 71, 78, 82, 87, 91];
export const reachSeries = [38, 44, 49, 58, 62, 69, 76];
export const conversionSeries = [22, 26, 31, 36, 43, 47, 54];
