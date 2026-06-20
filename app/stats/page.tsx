import { getAllReports } from "@/lib/reports"
import { StatsCards } from "@/components/Stats/StatsCards"
import { CategoryChart } from "@/components/Stats/CategoryChart"
import { MonthlyActivityChart } from "@/components/Stats/MonthlyActivityChart"
import { Timeline } from "@/components/Stats/Timeline"

export const metadata = {
    title: "Stats | CTF Portfolio",
    description: "A quantitative look at my research and write-ups.",
}

export default function StatsPage() {
    const reports = getAllReports()

    // 1. Calculate Metrics
    const total = reports.length
    
    const categoryCounts: Record<string, number> = {}
    reports.forEach(r => {
        categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1
    })
    const categories = Object.keys(categoryCounts).length
    
    const sortedReports = [...reports].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const latest = sortedReports.length > 0 ? sortedReports[0].date : "N/A"
    
    let mostActive = "N/A"
    let maxCount = 0
    Object.entries(categoryCounts).forEach(([cat, count]) => {
        if (count > maxCount) {
            maxCount = count
            mostActive = cat
        }
    })

    // 2. Prepare Chart Data
    const categoryData = Object.entries(categoryCounts)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)

    // Activity over last 12 months (simplified)
    const monthCounts: Record<string, number> = {}
    reports.forEach(r => {
        const d = new Date(r.date)
        const month = d.toLocaleString('default', { month: 'short' }) + " " + d.getFullYear().toString().slice(-2)
        monthCounts[month] = (monthCounts[month] || 0) + 1
    })
    
    // Sort months chronologically
    const monthlyData = Object.entries(monthCounts)
        .map(([month, count]) => {
            const [m, y] = month.split(' ')
            const monthIndex = new Date(`${m} 1, 20${y}`).getTime()
            return { month, count, monthIndex }
        })
        .sort((a, b) => a.monthIndex - b.monthIndex)
        .map(({ month, count }) => ({ month, count }))
        .slice(-12)

    return (
        <div className="mx-auto w-full max-w-5xl px-4 pt-28 sm:pt-32 pb-24 md:px-6 lg:px-8 space-y-16">
            <header className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                    Metrics &amp; Stats
                </h1>
                <div className="h-1.5 w-24 bg-primary rounded-full" />
                <p className="text-muted-foreground text-lg max-w-2xl">
                    A quantitative look at my research, CTF participation, and write-ups over time.
                </p>
            </header>

            <StatsCards total={total} categories={categories} latest={latest} mostActive={mostActive} />

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-12">
                <div className="space-y-16">
                    <CategoryChart data={categoryData} />
                    <MonthlyActivityChart data={monthlyData} />
                </div>
                <div>
                    <Timeline reports={sortedReports} />
                </div>
            </div>
        </div>
    )
}
