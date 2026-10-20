/**
 * Hero header for individual write-up pages.
 * Displays the title, date, category badge, description, and optional cover image.
 *
 * The Figma has no write-up detail page, so this is built from the design system used on the other pages:
 * a gradient page title with the gradient accent bar, muted body and mono metadata text, the faint divider colour,
 * and a cover image styled like the Home page portrait (14px radius, 1px gradient outline, soft drop shadow).
 * Dark values come straight from the design; light mode falls back to the theme tokens.
 */
"use client"

import { MotionConfig, Variants, motion } from "framer-motion"
import Image from "next/image"
import { CategoryTag } from "@/components/shared/CategoryTag"
import type { ReportSummary } from "@/types/report"
import { cn } from "@/lib/utils"

/**
 * 1px brand-gradient outline (#006fe0 -> #6826ea -> #2840d0), drawn by a masked ::before layer because a
 * CSS border cannot take a gradient. The mask uses longhand properties so it can only ever cut out the ring
 * and never fills the element. It sits above the image (z-10) and takes up no space.
 */
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:p-px before:bg-[linear-gradient(98.77deg,#006fe0,#6826ea,#2840d0)] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/** Gradient fill for text, used with bg-clip-text. */
const gradientText: string =
  "bg-[linear-gradient(90deg,#006fe0,#6826ea,#2840d0)] bg-clip-text text-transparent"

/**
 * Formats an ISO date string into a localized British English format (e.g., 5 April 2026).
 *
 * @param iso - The ISO date string to format.
 * @returns A formatted date string or the original string if parsing fails.
 */
function formatArticleDate(iso: string) {
  const parsed = new Date(iso)
  if (Number.isNaN(parsed.getTime())) {
    return iso
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed)
}

/**
 * ReportArticleHeader Component
 *
 * Displays the hero section for a write-up, including
 * title, metadata (date, category), and description.
 * Uses Framer Motion for sequenced entrance animations, which are skipped for people who prefer reduced motion.
 *
 * @param report - The report summary data.
 * @param className - Optional CSS class name for the header container.
 */
export function ReportArticleHeader({
                                      report,
                                      coverImage,
                                      coverAlt,
                                      className,
                                    }: Readonly<{ report: ReportSummary; coverImage?: string; coverAlt?: string; className?: string }>) {
  /**
   * Animation variants for text elements using a custom delay multiplier.
   */
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" }
    })
  }

  return (
    <MotionConfig reducedMotion="user">
      <header className={cn("space-y-8", className)}>
        <div className="space-y-6 pb-10 relative">
          <div className="space-y-4">
            {/* Branded Label */}
            <motion.p
              className={cn("w-fit text-xs font-mono uppercase tracking-widest", gradientText)}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              - Write-Up
            </motion.p>

            {/* Project Title: Large gradient heading with sequential animation delay.
              The bottom padding stops the gradient clip cutting off descenders (g, y, p). */}
            <motion.h1
              className={cn("w-fit pb-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl", gradientText)}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              {report.title}
            </motion.h1>

            {/* Accent Underline Line (48x4px gradient bar, as on the other page titles) */}
            <motion.div
              className="h-1 w-12 rounded-full bg-[linear-gradient(90deg,#006fe0,#6826ea,#2840d0)]"
              aria-hidden="true"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            {/* Metadata Row: Displays the formatted date and project category */}
            <motion.div
              className="flex flex-wrap items-center gap-2 pt-2 font-mono text-xs text-muted-foreground dark:text-[#9296b1]"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <time dateTime={report.date}>{formatArticleDate(report.date)}</time>
              <CategoryTag category={report.category} showIcon />
            </motion.div>

            {/* Project Summary: Leading paragraph */}
            <motion.p
              className="max-w-3xl pt-2 text-lg leading-relaxed text-muted-foreground dark:text-[#9296b1] md:text-xl"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              {report.description}
            </motion.p>
          </div>

          {/* Decorative Animated Bottom Border (the design's faint divider colour) */}
          <motion.div
            className="absolute bottom-0 left-0 h-px w-full bg-border dark:bg-[rgba(158,163,190,0.16)]"
            aria-hidden="true"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        {/* Hero Cover Image: styled like the Home page portrait. Zoom-out and fade-in effect */}
        {coverImage ? (
          <motion.figure
            className={cn(gradientBorder, "mt-8 overflow-hidden rounded-[14px] bg-muted/30 shadow-[0_24px_36px_rgba(0,0,0,0.18)]")}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "circOut" }}
          >
            <div className="relative aspect-[21/9] w-full sm:aspect-[2.4/1]">
              <Image
                src={coverImage}
                alt={coverAlt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority
              />
            </div>
          </motion.figure>
        ) : null}
      </header>
    </MotionConfig>
  )
}