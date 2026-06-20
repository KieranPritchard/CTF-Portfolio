"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { label: "Home", href: "/" },
    { label: "Write-Ups", href: "/write-ups" },
    { label: "Stats", href: "/stats" },
    { label: "Contact", href: "/contact" },
]

export function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto">
            <nav className="flex items-center justify-between sm:justify-center gap-1 px-3 py-1.5 sm:py-2 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border border-border rounded-full shadow-sm relative">
                
                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center justify-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-5 py-2 text-sm font-medium text-muted-foreground rounded-full transition-colors duration-200 hover:text-foreground hover:bg-muted/80"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="flex sm:hidden items-center justify-between w-full px-2">
                    <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">CTF Portfolio</span>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 -mr-2 text-foreground">
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl overflow-hidden sm:hidden flex flex-col p-2"
                        >
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 text-sm font-medium text-muted-foreground rounded-xl transition-colors duration-200 hover:text-foreground hover:bg-muted/80"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

            </nav>
        </div>
    )
}