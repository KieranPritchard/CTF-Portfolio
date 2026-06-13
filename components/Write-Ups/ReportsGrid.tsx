"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import type { ReportSummary } from "@/types/report"
import { ArrowRight, Code, Shield, Zap, LayoutGrid, Square, List, Search, ChevronDown } from "lucide-react"

/**
 * ReportsGrid Component
 * 
 * A comprehensive project gallery featuring filtering by category, search functionality,
 * and multiple view modes (Grid, Card, and List). 
 * Uses Framer Motion's AnimatePresence and layout transitions for smooth UI updates.
 * 
 * @param className - Optional CSS class name for the section container.
 * @param projects - An array of all available project summaries.
 */
export default function ReportsGrid({ className, reports }: Readonly<{ className?: string; reports: ReportSummary[] }>) {
    /** State for currently selected category filter. */
    const [filter, setFilter] = useState("all")
    /** State for search query string. */
    const [search, setSearch] = useState("")
    /** State for the active view mode layout. */
    const [viewMode, setViewMode] = useState<"grid" | "card" | "list">("grid")

    /**
     * Projects filtered based on category selection and search query.
     */
    const filteredReports = reports.filter((report) => {
        const matchesFilter = filter === "all" || report.category === filter
        const matchesSearch = report.title.toLowerCase().includes(search.toLowerCase()) || 
                                report.description.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    /** List of valid project categories for the filter buttons. */
    const categories = ["web-application", "linux", "windows", "password-cracking", "database-exploitation", "osint", "cryptography"]

    return (
        <section className={cn("mx-auto w-full max-w-7xl px-4 py-12 md:px-6 lg:px-8", className)}>
            
            {/* Header and Controls Area */}
            <div className="mb-12 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        Everything I&apos;ve built.
                    </h2>
                    {/* Decorative blue accent line */}
                    <div className="h-1 w-12 bg-primary rounded-full mt-2" />
                </div>

                {/* Control Bar: Filter, Search, and View Toggles */}
                <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Category Filter Dropdown */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground shrink-0">Filter</span>
                            <div className="relative w-full md:w-auto">
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="w-full md:w-auto appearance-none rounded-md border border-border bg-card py-1.5 pl-3 pr-8 text-xs font-medium outline-none focus:border-primary transition-colors cursor-pointer"
                                >
                                    <option value="all">All ({reports.length})</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)} ({reports.filter(p => p.category === cat).length})
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                                    <ChevronDown className="h-3 w-3" />
                                </div>
                            </div>
                        </div>

                        {/* Search Input Field */}
                        <div className="relative flex items-center md:w-64">
                            <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
                            <input 
                                type="text"
                                placeholder="Search projects..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-md border border-border bg-transparent py-1.5 pl-9 pr-3 text-xs outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* View Mode Toggle Bar (Grid vs Card vs List) */}
                    <div className="flex gap-2 border-t border-border pt-4">
                        <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded-md hover:bg-muted transition-colors", viewMode === "grid" ? "text-primary bg-muted" : "text-muted-foreground")}><LayoutGrid className="h-4 w-4" /></button>
                        <button onClick={() => setViewMode("card")} className={cn("p-2 rounded-md hover:bg-muted transition-colors", viewMode === "card" ? "text-primary bg-muted" : "text-muted-foreground")}><Square className="h-4 w-4" /></button>
                        <button onClick={() => setViewMode("list")} className={cn("p-2 rounded-md hover:bg-muted transition-colors", viewMode === "list" ? "text-primary bg-muted" : "text-muted-foreground")}><List className="h-4 w-4" /></button>
                    </div>
                </div>
            </div>

            {/* Dynamic Results Display Area */}
            <div 
                className={cn(
                    "grid gap-6",
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                )}
            >
                {filteredReports.map((report, index) => (
                    <div
                        key={report.slug}
                    >
                        {/* Grid View Mode: Compact Cards */}
                        {viewMode === "grid" && (
                            <Card className="group h-full flex flex-col border-border/50 hover:border-primary/50 transition-all">
                                <CardHeader>
                                    <div className="p-2 w-fit rounded-lg bg-muted border border-border group-hover:border-primary/50 transition-colors">
                                        {report.category === "web-application"  && <Shield className="h-5 w-5 text-primary" />}
                                        {report.category === "linux" && <Code className="h-5 w-5 text-primary" />}
                                        {report.category === "windows" && <Zap className="h-5 w-5 text-primary" />}
                                        {report.category === "password-cracking" && <Zap className="h-5 w-5 text-primary" />}
                                        {report.category === "database-exploitation" && <Zap className="h-5 w-5 text-primary" />}
                                        {report.category === "osint" && <Zap className="h-5 w-5 text-primary" />}
                                        {report.category === "cryptography" && <Zap className="h-5 w-5 text-primary" />}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <h3 className="font-bold text-lg mb-2">{report.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{report.description}</p>
                                    <div className="text-xs font-mono text-muted-foreground">
                                        {report.date} • {report.category}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-4 border-t border-border/50">
                                    <Link href={`/write-ups/${report.slug}`} className="text-xs font-bold hover:underline">View Project</Link>
                                </CardFooter>
                            </Card>
                        )}

                        {/* Card View Mode: Horizontal Extended Cards */}
                        {viewMode === "card" && (
                            <div className="group flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-border bg-card">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted border border-border">
                                    {report.category === "web-application"  && <Shield className="h-6 w-6 text-primary" />}
                                    {report.category === "linux" && <Code className="h-6 w-6 text-primary" />}
                                    {report.category === "windows" && <Zap className="h-6 w-6 text-primary" />}
                                    {report.category === "password-cracking" && <Zap className="h-6 w-6 text-primary" />}
                                    {report.category === "database-exploitation" && <Zap className="h-6 w-6 text-primary" />}
                                    {report.category === "osint" && <Zap className="h-6 w-6 text-primary" />}
                                    {report.category === "cryptography" && <Zap className="h-6 w-6 text-primary" />}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{report.category}</Badge>
                                        <span className="text-xs font-mono text-muted-foreground">{report.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold">{report.title}</h3>
                                    <p className="text-sm text-muted-foreground">{report.description}</p>
                                    <Link href={`/write-ups/${report.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                        Read full case study <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* List View Mode: Clean Row Items */}
                        {viewMode === "list" && (
                            <div className="flex items-center justify-between py-6 border-b border-border group hover:bg-muted/30 px-2 transition-colors">
                                <div className="flex items-center gap-8">
                                    <span className="font-mono text-muted-foreground w-8">0{index + 1}</span>
                                    <div>
                                        <h3 className="font-bold text-lg">{report.title}</h3>
                                        <p className="text-sm text-muted-foreground hidden sm:block">{report.description.substring(0, 80)}...</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 text-right">
                                    <span className="text-xs font-mono uppercase text-muted-foreground w-20">{report.category}</span>
                                    <span className="text-xs font-mono text-muted-foreground w-24">{report.date}</span>
                                    <Link href={`/write-ups/${report.slug}`} className="text-primary hover:text-primary/80">
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}