/**
 * Hero header for individual write-up pages.
 * Displays the title, date, category badge, description, and optional cover image.
 */
"use client"

import { Variants, motion } from "framer-motion"
import Image from "next/image"
import { CategoryBadge } from "@/components/shared/CategoryBadge"
import type { ReportSummary } from "@/types/report"
import { cn } from "@/lib/utils"

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
 * Uses Framer Motion for sequenced entrance animations.
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
    <header className={cn("space-y-8", className)}>
      <div className="space-y-6 pb-10 relative">
        <div className="space-y-4">
          {/* Branded Label */}
          <motion.p 
            className="text-xs font-mono uppercase tracking-widest text-gradient-brand"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            - Write-Up
          </motion.p>

          {/* Project Title: Large heading with sequential animation delay */}
          <motion.h1 
            className="font-heading text-4xl font-bold tracking-tight text-gradient-brand sm:text-5xl md:text-6xl"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {report.title}
          </motion.h1>

          {/* Accent Underline Line */}
          <motion.div 
            className="h-1 w-12 gradient-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          {/* Metadata Row: Displays the formatted date and project category */}
          <motion.div 
            className="flex flex-wrap items-center gap-3 text-[12px] font-mono text-muted-foreground pt-2"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <time dateTime={report.date}>{formatArticleDate(report.date)}</time>
            <span>·</span>
            <CategoryBadge category={report.category} showIcon />
          </motion.div>

          {/* Project Summary: Leading paragraph */}
          <motion.p 
            className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl pt-2"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            {report.description}
          </motion.p>
        </div>

        {/* Decorative Animated Bottom Border */}
        <motion.div 
          className="absolute bottom-0 left-0 h-px bg-border w-full"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </div>

      {/* Hero Cover Image: Zoom-out and fade-in effect */}
      {coverImage ? (
        <motion.figure 
          className="overflow-hidden rounded-2xl border bg-muted/30 shadow-2xl shadow-primary/5 mt-8"
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
  )
}
