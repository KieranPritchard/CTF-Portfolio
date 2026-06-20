"use client"
import { motion } from "framer-motion"

export function CategoryChart({ data }: { data: { category: string, count: number }[] }) {
    const max = Math.max(...data.map(d => d.count), 1)
    
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-xl">Category Distribution</h3>
            <div className="space-y-4">
                {data.map((item, i) => (
                    <div key={item.category} className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                            <span className="capitalize text-muted-foreground">{item.category}</span>
                            <span className="font-mono">{item.count}</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-primary"
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
