/**
 * Fixed floating navigation bar with responsive desktop links and a full-screen
 * mobile overlay menu, triggered by a hamburger toggle.
 * Positioned at the top of every page via the root layout.
 *
 * Styled to the "New Design" Figma frames: a 52px frosted pill with a thin brand-
 * gradient border, 36px pill-shaped items, and a gradient-outlined active state.
 * Dark values come straight from the design; light mode falls back to the theme tokens.
 */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  Terminal,
  FileText,
  BarChart3,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/** Primary site navigation links displayed in the nav bar, each paired with an icon for desktop links and the mobile overlay. */
const navItems = [
  { label: "Home", href: "/", icon: Terminal },
  { label: "Write-Ups", href: "/write-ups", icon: FileText },
  { label: "Stats", href: "/stats", icon: BarChart3 },
  { label: "Contact", href: "/contact", icon: Mail },
]

/** Shared keyboard focus ring so every interactive element in the nav is visibly focusable. */
const focusRing: string =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006fe0] focus-visible:ring-offset-0"

/**
 * 0.6px brand-gradient border (#006fe0 -> #6826ea -> #2840d0). Drawn with a masked ::before layer, because a
 * CSS border cannot take a gradient and this keeps rounded corners and transparent backgrounds intact.
 * It sits on top of the element without taking up space, so toggling it never shifts layout.
 */
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[0.6px] before:bg-gradient-to-r before:from-[#006fe0] before:via-[#6826ea] before:to-[#2840d0] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/** Same border, hidden until hover. Used for inactive mobile rows. */
const gradientBorderOnHover: string = `${gradientBorder} before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100`

/** Desktop link base: 36px tall pill. */
const desktopLinkBase: string = `flex h-9 items-center justify-center gap-2 px-5 text-sm font-medium rounded-full transition-colors duration-200 ${focusRing}`

/** Desktop link active state: tinted fill, gradient border, bright text. */
const desktopLinkActive: string = `${gradientBorder} bg-muted/60 text-foreground dark:bg-[rgba(28,30,43,0.4)] dark:text-[#fafafa]`

/** Desktop link inactive state: muted text, no fill, tinted fill on hover. */
const desktopLinkInactive: string =
  "text-muted-foreground hover:bg-muted/60 hover:text-foreground dark:text-[#9296b1] dark:hover:bg-[rgba(28,30,43,0.4)] dark:hover:text-[#fafafa]"

export function NavigationBar() {
  // Stores whether the navigation bar is open or not
  const [isOpen, setIsOpen] = useState(false)

  // Uses the pathname from the hook
  const pathname: string = usePathname()

  // Stores the getter and setter for the current theme
  const { theme, setTheme } = useTheme()

  // Theme is only known client-side after mount; avoids hydration mismatch on the toggle icon
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Lock body scroll while the full-screen mobile overlay is open
  useEffect((): (() => void) => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return (): void => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Checks if the theme is dark
  const isDark: boolean = mounted && theme === "dark"

  // Function to toggle theme
  const toggleTheme: () => void = (): void =>
    setTheme(isDark ? "light" : "dark")

  return (
    <div className="fixed inset-x-4 top-4 z-50 sm:inset-x-auto sm:top-6 sm:left-1/2 sm:w-auto sm:-translate-x-1/2">
      <nav
        className={`${gradientBorder} flex w-full items-center justify-between gap-2 rounded-full bg-background/80 px-3 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.25)] backdrop-blur-md before:opacity-[0.55] supports-[backdrop-filter]:bg-background/60 sm:w-auto sm:justify-center sm:py-2 dark:bg-[rgba(10,10,10,0.2)] dark:supports-[backdrop-filter]:bg-[rgba(10,10,10,0.2)]`}
      >
        {/* Desktop Menu */}
        <div className="hidden items-center justify-center gap-2 sm:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${desktopLinkBase} ${isActive ? desktopLinkActive : desktopLinkInactive}`}
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
          className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground sm:flex dark:text-[#9296b1] dark:hover:text-[#fafafa] ${focusRing}`}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Mobile Menu Toggle Button */}
        <div className="flex w-full items-center justify-between pr-1 pl-3 sm:hidden">
          <span className="truncate font-mono text-sm font-bold tracking-widest text-muted-foreground uppercase dark:text-[#9296b1]">
            CTF Portfolio
          </span>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-overlay"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`relative z-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-muted/80 dark:text-[#fafafa] dark:hover:bg-[rgba(28,30,43,0.4)] ${focusRing}`}
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
            className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-xl sm:hidden dark:bg-[#0a0a0a]/98"
          >
            {/* Faint scanline overlay for a terminal feel */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 3px)",
              }}
            />

            <div className="flex flex-1 flex-col items-stretch justify-center gap-2 px-6">
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
                      className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-200 ${focusRing} ${
                        isActive
                          ? `${gradientBorder} bg-muted/60 dark:bg-[rgba(28,30,43,0.4)]`
                          : `${gradientBorderOnHover} hover:bg-muted/60 dark:hover:bg-[rgba(28,30,43,0.4)]`
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                          isActive
                            ? "bg-muted text-foreground dark:bg-[rgba(28,30,43,0.4)] dark:text-[#fafafa]"
                            : "bg-muted/80 text-muted-foreground group-hover:text-foreground dark:bg-[rgba(28,30,43,0.4)] dark:text-[#9296b1] dark:group-hover:text-[#fafafa]"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-base font-medium text-foreground dark:text-[#fafafa]">
                          {item.label}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground/70 dark:text-[#9296b1]">
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
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
              className={`${gradientBorder} mx-auto mb-6 flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-muted-foreground transition-colors duration-200 before:opacity-[0.55] hover:bg-muted/60 hover:text-foreground dark:text-[#9296b1] dark:hover:bg-[rgba(28,30,43,0.4)] dark:hover:text-[#fafafa] ${focusRing}`}
            >
              {isDark ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
              {isDark ? "Light mode" : "Dark mode"}
            </button>

            <p className="pb-8 text-center font-mono text-xs tracking-widest text-muted-foreground/50 uppercase">
              CTF Portfolio
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavigationBar