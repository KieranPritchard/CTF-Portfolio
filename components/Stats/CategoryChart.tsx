/**
 * Horizontal bar chart showing the distribution of write-ups across CTF categories.
 * Bar widths animate on scroll, scaled relative to the highest category count.
 */
"use client"
import { motion } from "framer-motion"
import { CategoryBadge } from "@/components/shared/CategoryBadge"

export function CategoryChart({ data }: { data: { category: string, count: number }[] }) {
    const max = Math.max(...data.map(d => d.count), 1)
    
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-xl">Category Distribution</h3>
            <div className="space-y-4">
                {data.map((item, i) => (
                    <div key={item.category} className="space-y-1.5">
                        <div className="flex justify-between items-center gap-3 text-sm">
                            <CategoryBadge category={item.category} className="text-[10px]" showIcon />
                            <span className="font-mono">{item.count}</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div 
                                data-category={item.category}
                                className="category-bar h-full rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(item.count / max) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
