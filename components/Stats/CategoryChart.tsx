/**
 * Horizontal bar chart showing the distribution of write-ups across CTF categories.
 * Bar widths animate on scroll, scaled relative to the highest category count.
 *
 * Styled to the "New Design" Figma category distribution: a bold 20px heading, then one row per category with the
 * category tag on the left and a mono count on the right, above an 8px track (#1c1e2b) filled in the category colour.
 * Dark values come straight from the design; light mode falls back to the theme tokens.
 */
"use client"
import { motion, useReducedMotion } from "framer-motion"
import { CategoryTag, categoryStyle } from "@/components/shared/CategoryTag"

export function CategoryChart({ data }: { data: { category: string, count: number }[] }) {
  const max = Math.max(...data.map(d => d.count), 1)
  // People who prefer reduced motion get the bars at their final width straight away
  const reduceMotion = useReducedMotion()

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-foreground dark:text-[#fafafa]">Category Distribution</h3>
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={item.category} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <CategoryTag category={item.category} variant="stat" />
              <span className="font-mono text-sm text-foreground dark:text-[#fafafa]">{item.count}</span>
            </div>
            {/* The tag and count already carry the data, so the bar itself is decorative */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted dark:bg-[#1c1e2b]" aria-hidden="true">
              <motion.div
                style={categoryStyle(item.category)}
                className="h-full rounded-full bg-[rgb(var(--cat))]"
                initial={{ width: reduceMotion ? `${(item.count / max) * 100}%` : 0 }}
                whileInView={{ width: `${(item.count / max) * 100}%` }}
                viewport={{ once: true }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}