/**
 * Vertical bar chart showing write-up activity grouped by month.
 * Displays hover tooltips with exact counts and responsive month labels.
 *
 * Styled to the "New Design" Figma monthly chart: a bold 20px heading, a 192px plot with 16px of top padding and
 * 8px between bars, vertical brand-gradient bars (violet at the top, blue at the bottom) with 3px rounded tops,
 * a 1px #1c1e2b baseline, and 9px uppercase muted month labels sitting below it.
 * Dark values come straight from the design; light mode falls back to the theme tokens.
 */
"use client"
import { motion, useReducedMotion } from "framer-motion"

export function MonthlyActivityChart({ data }: { data: { month: string, count: number }[] }) {
  const max = Math.max(...data.map(d => d.count), 1)
  // People who prefer reduced motion get the bars at their final height straight away
  const reduceMotion = useReducedMotion()

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-foreground dark:text-[#fafafa]">Activity by Month</h3>
      <div className="flex h-48 items-end gap-2 border-b border-border pt-4 dark:border-[#1c1e2b]" role="list">
        {data.map((item, i) => (
          <div
            key={item.month}
            role="listitem"
            aria-label={`${item.month}: ${item.count}`}
            tabIndex={0}
            className="group relative flex h-full flex-1 flex-col items-center justify-end gap-2 rounded-t-[3px] outline-none focus-visible:ring-2 focus-visible:ring-[#006fe0]"
          >
            {item.count > 0 && (
              <span className="absolute -top-8 z-10 rounded-[7px] border-[0.6px] border-border bg-card px-2 py-1 font-mono text-xs text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-[rgba(158,163,190,0.2)] dark:bg-[#1c1e2b] dark:text-[#fafafa]">
                                {item.count}
                            </span>
            )}
            <motion.div
              className="w-full rounded-t-[3px] bg-[linear-gradient(180deg,#6826ea,#006fe0)] transition-[filter] group-hover:brightness-110"
              initial={{ height: reduceMotion ? `${(item.count / max) * 100}%` : 0 }}
              whileInView={{ height: `${(item.count / max) * 100}%` }}
              viewport={{ once: true }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: i * 0.05 }}
            />
            {/* Month labels sit 10px under the baseline. The full label shows from sm up, the short one below. */}
            <span className="absolute -bottom-6 hidden w-full truncate text-center text-[9px] uppercase leading-[14px] text-muted-foreground dark:text-[#9296b1] sm:block" aria-hidden="true">
                            {item.month}
                        </span>
            <span className="absolute -bottom-6 w-full truncate text-center text-[9px] uppercase leading-[14px] text-muted-foreground dark:text-[#9296b1] sm:hidden" aria-hidden="true">
                            {item.month.split(" ")[0]}
                        </span>
          </div>
        ))}
      </div>
      <div className="h-6"></div>
    </div>
  )
}