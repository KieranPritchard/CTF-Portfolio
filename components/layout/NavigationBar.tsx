/**
 * Fixed floating navigation bar with responsive desktop links and a full-screen
 * mobile overlay menu, triggered by a hamburger toggle.
 * Positioned at the top of every page via the root layout.
 */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Terminal, FileText, BarChart3, Mail, Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/** Primary site navigation links displayed in the nav bar, each paired with an icon for desktop links and the mobile overlay. */
const navItems = [
    { label: "Home", href: "/", icon: Terminal },
    { label: "Write-Ups", href: "/write-ups", icon: FileText },
    { label: "Stats", href: "/stats", icon: BarChart3 },
    { label: "Contact", href: "/contact", icon: Mail },
]

export function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    // Theme is only known client-side after mount; avoids hydration mismatch on the toggle icon
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    // Lock body scroll while the full-screen mobile overlay is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    const isDark = mounted && theme === "dark"
    const toggleTheme = () => setTheme(isDark ? "light" : "dark")

    return (
        <div className="fixed top-4 sm:top-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 sm:w-auto">
            <nav className="gradient-border-frosted flex items-center justify-between sm:justify-center gap-1 w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 rounded-full shadow-sm relative">

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center justify-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                                    isActive
                                        ? "text-foreground bg-muted/80"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        )
                    })}
                </div>

                {/* Desktop Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                    className="hidden sm:flex items-center justify-center h-9 w-9 ml-1 shrink-0 rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-muted/80"
                >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>

                {/* Mobile Menu Toggle Button */}
                <div className="flex sm:hidden items-center justify-between w-full pl-3 pr-1">
                    <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground truncate font-mono">
                        CTF Portfolio
                    </span>
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-nav-overlay"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        className="relative z-50 flex items-center justify-center h-9 w-9 shrink-0 text-foreground rounded-full transition-colors duration-200 hover:bg-muted/80"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

            </nav>

            {/* Mobile Full-Screen Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-nav-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 sm:hidden bg-background/98 backdrop-blur-xl flex flex-col"
                    >
                        {/* Faint scanline overlay for a terminal feel */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 3px)",
                            }}
                        />

                        <div className="flex-1 flex flex-col items-stretch justify-center gap-2 px-6">
                            {navItems.map((item, index) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, delay: 0.05 + index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            aria-current={isActive ? "page" : undefined}
                                            className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition-colors duration-200 active:bg-muted ${
                                                isActive
                                                    ? "border-border bg-muted/60"
                                                    : "border-transparent hover:border-border hover:bg-muted/60"
                                            }`}
                                        >
                                            <span
                                                className={`flex items-center justify-center h-11 w-11 shrink-0 rounded-xl transition-colors duration-200 ${
                                                    isActive
                                                        ? "bg-foreground text-background"
                                                        : "bg-muted/80 text-muted-foreground group-hover:text-foreground"
                                                }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <span className="flex flex-col">
                                                <span className="text-base font-medium text-foreground">
                                                    {item.label}
                                                </span>
                                                <span className="text-xs font-mono text-muted-foreground/70">
                                                    {item.href}
                                                </span>
                                            </span>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Mobile Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                            className="mx-auto mb-6 flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs font-mono text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-muted/60"
                        >
                            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                            {isDark ? "Light mode" : "Dark mode"}
                        </button>

                        <p className="pb-8 text-center text-xs font-mono tracking-widest uppercase text-muted-foreground/50">
                            CTF Portfolio
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}