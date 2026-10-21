/**
 * Write-ups listing page with category filtering, search, and multiple view modes.
 * Supports grid, card, and list layouts with animated transitions.
 *
 */
"use client"

import { useState } from "react"
import type { CSSProperties } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { getCategoryConfig, REPORT_CATEGORIES } from "@/lib/categories"
import type { ReportSummary } from "@/types/report"
import {
  ArrowRight,
  LayoutGrid,
  Square,
  List,
  Search,
  ChevronDown,
} from "lucide-react"

/** Colour tokens for one category, each stored as space-separated "r g b" so they can take any opacity. */
interface CategoryTokens {
  /** Main colour: icon glyph, tag text, link text, and the tint behind the icon box and tag. */
  accent: string
  /** Outline colour: the accent blended towards the brand purple/blue, used on borders. */
  border: string
  /** Card fill tint. */
  tint: string
  /** Footer strip fill tint. */
  action: string
}

/** Category colours read from the Figma project cards, keyed by a normalised category name. */
const categoryTokens: Record<string, CategoryTokens> = {
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
 * Builds the CSS variables that the card classes read, for a category.
 * The key is normalised so "Web Application", "web_application" and "web-application" all match.
 */
function categoryStyle(category: string): CSSProperties {
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
 * 0.6px brand-gradient outline (#006fe0 -> #6826ea -> #2840d0), drawn by a masked ::before layer because a
 * CSS border cannot take a gradient. The mask uses longhand properties so it can only ever cut out the ring
 * and never fills the element. Takes up no space, so it never shifts layout. Set the strength with before:opacity-*.
 */
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[0.6px] before:bg-[linear-gradient(98.77deg,#006fe0,#6826ea,#2840d0)] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/**
 * The filter panel: 12.5% black fill, 14px radius, and the design's faint gradient outline (about 33% strength).
 * Unlike the cards, the design gives it no glass effect.
 */
const filterPanel: string =
  `${gradientBorder} before:opacity-[0.33] rounded-[14px] bg-card p-4 space-y-4 dark:bg-[rgba(10,10,10,0.125)]`

/** Shared look for the select and the search input: 30px tall, 7px radius, 0.6px outline, tinted fill, 12px text. */
const controlField: string =
  "h-[30px] w-full rounded-[7px] border-[0.6px] border-border bg-muted/40 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#006fe0] dark:border-[rgba(158,163,190,0.2)] dark:bg-[rgba(28,30,43,0.4)] dark:text-[#fafafa] dark:placeholder:text-[#9296b1]"

/** View-mode toggle button: 32px square, 7px radius. The active one gets the tinted fill and a violet icon. */
const viewButton: string =
  "grid size-8 place-items-center rounded-[7px] transition-colors hover:bg-muted dark:hover:bg-[rgba(28,30,43,0.4)]"

/**
 * Project card surface: 14px radius, 1px outline and a 40% fill tinted by the category, with the Figma Glass effect
 * (blur 4, depth 20) approximated by a 4px backdrop blur, a saturation boost and a gentle rim light on opposing edges.
 * The tint, outline and rim light are dark-mode only; light mode uses the card colour and border.
 */
const cardSurface: string =
  "overflow-hidden rounded-[14px] border border-border bg-card backdrop-blur-[4px] backdrop-saturate-150 transition-colors dark:border-[rgb(var(--cat-border)/0.42)] dark:bg-[rgb(var(--cat-tint)/0.4)] dark:shadow-[inset_1.5px_1.5px_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_rgba(255,255,255,0.04)] dark:hover:bg-[rgb(var(--cat-tint)/0.55)]"

/** Category icon box: accent tint fill and category outline, with the accent-coloured glyph inside. */
const iconBox: string =
  "flex shrink-0 items-center justify-center rounded-[10px] border border-[rgb(var(--cat-border)/0.42)] bg-[rgb(var(--cat)/0.122)] text-[rgb(var(--cat))]"

/** Renders the Lucide icon associated with a given CTF category, in the category's accent colour. */
function CategoryGlyph({ category, className }: { category: string; className?: string }) {
  const { icon: Icon } = getCategoryConfig(category)
  return <Icon className={className} aria-hidden="true" />
}

/** Pill tag showing the category name: accent text on a faint accent tint, with the category outline. */
function CategoryTag({ category, showIcon, className }: { category: string; showIcon?: boolean; className?: string }) {
  const { label } = getCategoryConfig(category)
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[rgb(var(--cat-border)/0.42)] bg-[rgb(var(--cat)/0.122)] px-2 py-0.5 text-[10px] font-medium uppercase leading-[14px] tracking-[0.05em] text-[rgb(var(--cat))]",
        className
      )}
    >
            {showIcon && <CategoryGlyph category={category} className="h-3 w-3" />}
      {label}
        </span>
  )
}

/**
 * ReportsGrid Component
 *
 * A comprehensive project gallery featuring filtering by category, search functionality,
 * and multiple view modes (Grid, Card, and List).
 * Uses Framer Motion's AnimatePresence and layout transitions for smooth UI updates.
 *
 * @param className - Optional CSS class name for the section container.
 * @param projects - An array of all available project summaries.
 */
export default function ReportsGrid({ className, reports }: Readonly<{ className?: string; reports: ReportSummary[] }>) {
  /** State for currently selected category filter. */
  const [filter, setFilter] = useState("all")
  /** State for search query string. */
  const [search, setSearch] = useState("")
  /** State for the active view mode layout. */
  const [viewMode, setViewMode] = useState<"grid" | "card" | "list">("grid")

  /**
   * Projects filtered based on category selection and search query.
   */
  const filteredReports = reports.filter((report) => {
    const matchesFilter = filter === "all" || report.category === filter
    const matchesSearch = report.title.toLowerCase().includes(search.toLowerCase()) ||
      report.description.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <section className={cn("mx-auto w-full max-w-7xl px-4 py-12 md:px-6 lg:px-8", className)}>

      {/* Header and Controls Area */}
      <div className="mb-12 space-y-6">
        <div className="space-y-2">
          <h2 className="w-fit bg-[linear-gradient(90deg,#006fe0,#6826ea,#2840d0)] bg-clip-text text-4xl font-bold tracking-tight text-transparent">
            Everything I&apos;ve built.
          </h2>
          <div
            className="h-1 w-12 rounded-full bg-[linear-gradient(90deg,#006fe0,#6826ea,#2840d0)]"
            aria-hidden="true"
          />
        </div>

        {/* Control Bar: Filter, Search, and View Toggles */}
        <div className={filterPanel}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category Filter Dropdown */}
            <div className="flex w-full items-center gap-2 md:w-auto">
              <span className="shrink-0 font-mono text-xs uppercase text-muted-foreground dark:text-[#9296b1]">Filter</span>
              <div className="relative w-full md:w-[188px]">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  aria-label="Filter by category"
                  className={cn(controlField, "cursor-pointer appearance-none pl-3 pr-8 font-medium dark:[color-scheme:dark]")}
                >
                  <option value="all">All ({reports.length})</option>
                  {REPORT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {getCategoryConfig(cat).label} ({reports.filter(p => p.category === cat).length})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground dark:text-[#9296b1]">
                  <ChevronDown className="h-3 w-3" />
                </div>
              </div>
            </div>

            {/* Search Input Field */}
            <div className="relative flex items-center md:w-64">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground dark:text-[#9296b1]" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search projects"
                className={cn(controlField, "pl-9 pr-3")}
              />
            </div>
          </div>

          {/* View Mode Toggle Bar (Grid vs Card vs List) */}
          <div className="flex gap-2 border-t border-border pt-4 dark:border-[rgba(158,163,190,0.12)]">
            <button type="button" aria-label="Grid view" aria-pressed={viewMode === "grid"} onClick={() => setViewMode("grid")} className={cn(viewButton, viewMode === "grid" ? "bg-muted text-primary dark:bg-[rgba(28,30,43,0.4)] dark:text-[#8b86ff]" : "text-muted-foreground dark:text-[#9296b1]")}><LayoutGrid className="h-4 w-4" /></button>
            <button type="button" aria-label="Card view" aria-pressed={viewMode === "card"} onClick={() => setViewMode("card")} className={cn(viewButton, viewMode === "card" ? "bg-muted text-primary dark:bg-[rgba(28,30,43,0.4)] dark:text-[#8b86ff]" : "text-muted-foreground dark:text-[#9296b1]")}><Square className="h-4 w-4" /></button>
            <button type="button" aria-label="List view" aria-pressed={viewMode === "list"} onClick={() => setViewMode("list")} className={cn(viewButton, viewMode === "list" ? "bg-muted text-primary dark:bg-[rgba(28,30,43,0.4)] dark:text-[#8b86ff]" : "text-muted-foreground dark:text-[#9296b1]")}><List className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Dynamic Results Display Area */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}
      >
        {filteredReports.map((report, index) => (
          <div
            key={report.slug}
            className="h-full"
            style={categoryStyle(report.category)}
          >
            {/* Grid View Mode: Compact Cards */}
            {viewMode === "grid" && (
              <article className={cn(cardSurface, "flex h-full flex-col")}>
                <div className="flex flex-1 flex-col gap-4 p-4">
                  <div className={cn(iconBox, "size-[38px]")}>
                    <CategoryGlyph category={report.category} className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold leading-7 text-foreground dark:text-[#fafafa]">{report.title}</h3>
                    <p className="line-clamp-3 text-sm leading-5 text-muted-foreground dark:text-[#9296b1]">{report.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs leading-4 text-muted-foreground dark:text-[#9296b1]">{report.date}</span>
                    <CategoryTag category={report.category} />
                  </div>
                </div>
                <div className="flex h-[49px] items-center border-t border-border bg-muted/50 px-4 dark:border-[rgb(var(--cat-border)/0.4)] dark:bg-[rgb(var(--cat-action)/0.6)]">
                  <Link
                    href={`/write-ups/${report.slug}`}
                    className="text-xs font-bold text-[rgb(var(--cat))] hover:underline"
                  >
                    View Project
                  </Link>
                </div>
              </article>
            )}

            {/* Card View Mode: Horizontal Extended Cards */}
            {viewMode === "card" && (
              <article className={cn(cardSurface, "flex flex-col gap-6 p-6 md:flex-row")}>
                <div className={cn(iconBox, "h-16 w-16")}>
                  <CategoryGlyph category={report.category} className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <CategoryTag category={report.category} showIcon />
                    <span className="font-mono text-xs text-muted-foreground dark:text-[#9296b1]">{report.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground dark:text-[#fafafa]">{report.title}</h3>
                  <p className="text-sm text-muted-foreground dark:text-[#9296b1]">{report.description}</p>
                  <Link
                    href={`/write-ups/${report.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[rgb(var(--cat))] hover:underline"
                  >
                    Read full case study <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            )}

            {/* List View Mode: Clean Row Items */}
            {viewMode === "list" && (
              <div
                className="flex items-center justify-between border-b border-border px-3 py-6 transition-colors hover:bg-[rgb(var(--cat)/0.06)] dark:border-[rgb(var(--cat-border)/0.25)] sm:px-4"
              >
                <div className="flex items-center gap-8">
                  <span className="w-8 font-mono text-muted-foreground dark:text-[#9296b1]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground dark:text-[#fafafa]">{report.title}</h3>
                    <p className="hidden text-sm text-muted-foreground dark:text-[#9296b1] sm:block">{report.description.substring(0, 80)}...</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right sm:gap-8">
                  <CategoryTag category={report.category} className="hidden sm:inline-flex" />
                  <span className="hidden w-24 font-mono text-xs text-muted-foreground dark:text-[#9296b1] sm:inline-block">{report.date}</span>
                  <Link
                    href={`/write-ups/${report.slug}`}
                    aria-label={`View ${report.title}`}
                    className="text-[rgb(var(--cat))] transition-opacity hover:opacity-80"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}