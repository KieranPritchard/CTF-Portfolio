/**
 * Shared category colour tokens and the category pill tag.
 * Colours are read from the "New Design" Figma, where every category has its own accent, outline blend,
 * card tint and footer-strip tint. Used by the stats cards, and available to the write-ups grid, the stats
 * charts and the timeline so every tag in the site comes from one place.
 */
import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { getCategoryConfig } from "@/lib/categories"

/** Colour tokens for one category, each stored as space-separated "r g b" so they can take any opacity. */
export interface CategoryTokens {
  /** Main colour: icon glyph, tag text, link text, and the tint behind the icon box and tag. */
  accent: string
  /** Outline colour: the accent blended towards the brand purple/blue, used on write-up card borders. */
  border: string
  /** Card fill tint. */
  tint: string
  /** Footer strip fill tint. */
  action: string
}

/** Category colours read from the Figma, keyed by a normalised category name. */
export const categoryTokens: Record<string, CategoryTokens> = {
  cryptography: { accent: "187 145 255", border: "162 156 252", tint: "33 31 36", action: "39 41 62" },
  linux: { accent: "87 188 128", border: "83 176 225", tint: "28 33 30", action: "34 43 61" },
  "web-application": { accent: "94 169 249", border: "133 161 241", tint: "28 32 36", action: "38 41 61" },
  osint: { accent: "61 187 174", border: "111 171 222", tint: "28 33 32", action: "36 42 60" },
  "database-exploitation": { accent: "249 118 118", border: "196 137 224", tint: "37 29 29", action: "42 40 61" },
  "password-cracking": { accent: "244 163 75", border: "223 151 218", tint: "36 32 28", action: "45 41 61" },
  windows: { accent: "74 184 232", border: "132 170 236", tint: "28 33 35", action: "38 42 61" },
}

/** Neutral tokens for any category that is not in the design, so an unknown category still looks right. */
const fallbackTokens: CategoryTokens = { accent: "146 150 177", border: "158 163 190", tint: "28 30 43", action: "28 30 43" }

/**
 * Builds the CSS variables that category-coloured classes read.
 * The key is normalised so "Web Application", "web_application" and "web-application" all match.
 */
export function categoryStyle(category: string): CSSProperties {
  const key: string = category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  const tokens: CategoryTokens = categoryTokens[key] ?? fallbackTokens
  return {
    "--cat": tokens.accent,
    "--cat-border": tokens.border,
    "--cat-tint": tokens.tint,
    "--cat-action": tokens.action,
  } as CSSProperties
}

/**
 * The two tag styles in the Figma:
 * - "card": on write-up cards.
 * - "stat": on the stats page.
 */
type CategoryTagVariant = "card" | "stat"

/** Outline classes for each variant. */
const variantStyles: Record<CategoryTagVariant, string> = {
  card: "border-[rgb(var(--cat-border)/0.427)]",
  stat: "border-[rgb(var(--cat)/0.251)]",
}

// Interface type for the category buttons
interface CategoryTagProps {
  category: string;
  variant?: CategoryTagVariant;
  showIcon?: boolean;
  className?: string;
}

/**
 * Pill tag showing the category name: accent text on a 12% accent tint with a 1px outline,
 * 10px medium uppercase text with 5% tracking. Sets its own colour variables, so it works anywhere.
 */
export function CategoryTag({ category, variant = "card", showIcon = variant === "stat", className, }:CategoryTagProps) {
  // Stores the label and icon from the category config
  const { label, icon: Icon } = getCategoryConfig(category)
  return (
    <span
      style={categoryStyle(category)}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border bg-[rgb(var(--cat)/0.122)] px-2 py-0.5 text-[10px] font-medium uppercase leading-[14px] tracking-[0.05em] text-[rgb(var(--cat))]",
        variantStyles[variant],
        className
      )}
    >
            {showIcon && <Icon className="h-3 w-3" aria-hidden="true" />}
      {label}
        </span>
  )
}