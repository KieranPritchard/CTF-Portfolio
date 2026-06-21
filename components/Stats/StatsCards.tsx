/**
 * Summary stat cards for the stats page.
 * Displays total write-ups, category count, latest activity date, and most active category.
 */
"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryBadge } from "@/components/shared/CategoryBadge"
import { isReportCategory } from "@/lib/categories"

export function StatsCards({ total, categories, latest, mostActive }: { total: number, categories: number, latest: string, mostActive: string }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Write-Ups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{total}</div>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categories Covered</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{categories}</div>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Latest Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{latest}</div>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Most Active</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isReportCategory(mostActive) ? (
                            <CategoryBadge category={mostActive} className="text-sm" showIcon />
                        ) : (
                            <div className="text-xl font-bold capitalize">{mostActive}</div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
