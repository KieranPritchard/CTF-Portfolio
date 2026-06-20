"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export function Timeline({ reports }: { reports: any[] }) {
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
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-background" />
                        <p className="text-xs font-mono text-muted-foreground">{report.date}</p>
                        <Link href={`/write-ups/${report.slug}`} className="font-medium hover:text-primary hover:underline transition-colors block mt-1 text-lg">
                            {report.title}
                        </Link>
                        <span className="text-[10px] uppercase border border-border px-1.5 py-0.5 rounded inline-block mt-2 text-muted-foreground">
                            {report.category}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
