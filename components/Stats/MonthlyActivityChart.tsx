"use client"
import { motion } from "framer-motion"

export function MonthlyActivityChart({ data }: { data: { month: string, count: number }[] }) {
    const max = Math.max(...data.map(d => d.count), 1)

    return (
        <div className="space-y-6">
            <h3 className="font-bold text-xl">Activity by Month</h3>
            <div className="flex items-end gap-2 h-48 pt-4 border-b border-border">
                {data.map((item, i) => (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end">
                        {item.count > 0 && (
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-8 text-xs font-mono bg-card border border-border px-2 py-1 rounded transition-opacity shadow-sm z-10">
                                {item.count}
                            </span>
                        )}
                        <motion.div 
                            className="w-full bg-primary/80 group-hover:bg-primary transition-colors rounded-t-sm"
                            initial={{ height: 0 }}
                            whileInView={{ height: `${(item.count / max) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                        />
                        <span className="text-[10px] text-muted-foreground uppercase absolute -bottom-6 truncate w-full text-center hidden sm:block">
                            {item.month}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase absolute -bottom-6 truncate w-full text-center sm:hidden">
                            {item.month.split(" ")[0]}
                        </span>
                    </div>
                ))}
            </div>
            <div className="h-8"></div>
        </div>
    )
}
