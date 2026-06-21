import {
  Binoculars,
  Bug,
  DatabaseZap,
  Hash,
  LockKeyhole,
  Monitor,
  Terminal,
  type LucideIcon,
} from "lucide-react"
import type { ReportCategory } from "@/types/report"

export const REPORT_CATEGORIES = [
  "web-application",
  "linux",
  "windows",
  "password-cracking",
  "database-exploitation",
  "osint",
  "cryptography",
] as const satisfies readonly ReportCategory[]

type CategoryConfig = {
  label: string
  icon: LucideIcon
}

export const categoryConfig: Record<ReportCategory, CategoryConfig> = {
  "web-application": { label: "Web Application", icon: Bug },
  linux: { label: "Linux", icon: Terminal },
  windows: { label: "Windows", icon: Monitor },
  "password-cracking": { label: "Password Cracking", icon: Hash },
  "database-exploitation": { label: "Database Exploitation", icon: DatabaseZap },
  osint: { label: "OSINT", icon: Binoculars },
  cryptography: { label: "Cryptography", icon: LockKeyhole },
}

export function isReportCategory(value: unknown): value is ReportCategory {
  return REPORT_CATEGORIES.includes(value as ReportCategory)
}

export function getCategoryConfig(category: string): CategoryConfig {
  if (isReportCategory(category)) {
    return categoryConfig[category]
  }

  return {
    label: category.replace(/-/g, " "),
    icon: Bug,
  }
}
