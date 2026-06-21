/**
 * Chronological timeline of all write-ups on the stats page.
 * Each entry links to its full article with a category-coloured dot marker.
 */
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { CategoryBadge } from "@/components/shared/CategoryBadge"
import type { ReportSummary } from "@/types/report"

export function Timeline({ reports }: { reports: ReportSummary[] }) {
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-xl">Timeline</h3>
            <div className="border-l-2 border-muted ml-3 space-y-8">
                {reports.map((report, i) => (
                    <motion.div 
                        key={report.slug} 
                        className="relative pl-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <div
                            data-category={report.category}
                            className="category-dot absolute w-3 h-3 rounded-full -left-[7px] top-1.5 ring-4 ring-background"
                        />
                        <p className="text-xs font-mono text-muted-foreground">{report.date}</p>
                        <Link href={`/write-ups/${report.slug}`} className="font-medium hover:text-primary hover:underline transition-colors block mt-1 text-lg">
                            {report.title}
                        </Link>
                        <CategoryBadge category={report.category} className="mt-2 text-[10px]" />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
