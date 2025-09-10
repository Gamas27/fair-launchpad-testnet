import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { type ReputationLevel } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "WLD"): string {
  return `${amount.toLocaleString()} ${currency}`
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function getReputationLevel(xp: number): {
  level: ReputationLevel;
  icon: string;
  color: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progress: number;
} {
  let level: ReputationLevel = 'Bronze'
  let icon = '🥉'
  let color = 'text-amber-600'
  let currentLevelXp = 0
  let nextLevelXp = 1000

  if (xp >= 5000) {
    level = 'Diamond'
    icon = '💎'
    color = 'text-blue-400'
    currentLevelXp = 5000
    nextLevelXp = Infinity
  } else if (xp >= 2500) {
    level = 'Gold'
    icon = '🥇'
    color = 'text-yellow-500'
    currentLevelXp = 2500
    nextLevelXp = 5000
  } else if (xp >= 1000) {
    level = 'Silver'
    icon = '🥈'
    color = 'text-gray-400'
    currentLevelXp = 1000
    nextLevelXp = 2500
  } else {
    level = 'Bronze'
    icon = '🥉'
    color = 'text-amber-600'
    currentLevelXp = 0
    nextLevelXp = 1000
  }

  const progress = level === 'Diamond' ? 100 : ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100

  return {
    level,
    icon,
    color,
    currentLevelXp,
    nextLevelXp,
    progress: Math.max(0, Math.min(100, progress))
  }
}

export function calculateAllocationCap(level: string): number {
  const caps = {
    "Bronze": 200,
    "Silver": 500,
    "Gold": 1000,
    "Diamond": 2500
  }
  return caps[level as keyof typeof caps] || 200
}
