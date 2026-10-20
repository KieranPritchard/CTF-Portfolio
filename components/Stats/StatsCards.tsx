/**
 * Summary stat cards for the stats page.
 * Displays total write-ups, category count, latest activity date, and most active category.
 *
 * Styled to the "New Design" Figma metric cards: 12px-radius glass cards with a faint brand-gradient outline,
 * a muted 14px label above a bold 24px value, and a category tag for the most active category.
 * Dark values come straight from the design; light mode falls back to the theme tokens.
 */
"use client"
import type { ReactNode } from "react"
import { MotionConfig, motion } from "framer-motion"
import { CategoryTag } from "@/components/shared/CategoryTag"
import { isReportCategory } from "@/lib/categories"

/**
 * 0.6px brand-gradient outline (#006fe0 -> #6826ea -> #2840d0), drawn by a masked ::before layer because a
 * CSS border cannot take a gradient. The mask uses longhand properties so it can only ever cut out the ring
 * and never fills the element. Takes up no space, so it never shifts layout. Set the strength with before:opacity-*.
 */
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[0.6px] before:bg-[linear-gradient(98.77deg,#006fe0,#6826ea,#2840d0)] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/**
 * Metric card surface: 12px radius, 40% black fill, 16px padding with 24px between label and value, at least 112px tall.
 * The outline is the gradient at about 33% strength. The Figma Glass effect (blur 4, depth 20) is approximated with a
 * 4px backdrop blur, a saturation boost and a gentle rim light on opposing edges. The fill and rim light are dark-mode
 * only; light mode uses the card colour.
 */
const metricCard: string =
  `${gradientBorder} before:opacity-[0.33] flex h-full min-h-[112px] flex-col gap-6 rounded-xl bg-card p-4 backdrop-blur-[4px] backdrop-saturate-150 dark:bg-[rgba(10,10,10,0.4)] dark:shadow-[inset_1.5px_1.5px_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_rgba(255,255,255,0.04)]`

/** One metric card: a muted label above its value, fading up with a staggered delay. */
function MetricCard({ label, delay, children }: Readonly<{ label: string; delay: number; children: ReactNode }>) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div className={metricCard}>
        <h3 className="text-sm font-medium text-muted-foreground dark:text-[#9296b1]">{label}</h3>
        {children}
      </div>
    </motion.div>
  )
}

export function StatsCards({ total, categories, latest, mostActive }: { total: number, categories: number, latest: string, mostActive: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Write-Ups" delay={0.1}>
          <div className="text-2xl font-bold text-foreground dark:text-[#fafafa]">{total}</div>
        </MetricCard>
        <MetricCard label="Categories Covered" delay={0.2}>
          <div className="text-2xl font-bold text-foreground dark:text-[#fafafa]">{categories}</div>
        </MetricCard>
        <MetricCard label="Latest Activity" delay={0.3}>
          <div className="text-xl font-bold text-foreground dark:text-[#fafafa]">{latest}</div>
        </MetricCard>
        <MetricCard label="Most Active" delay={0.4}>
          {isReportCategory(mostActive) ? (
            <div>
              <CategoryTag category={mostActive} variant="stat" />
            </div>
          ) : (
            <div className="text-xl font-bold capitalize text-foreground dark:text-[#fafafa]">{mostActive}</div>
          )}
        </MetricCard>
      </div>
    </MotionConfig>
  )
}