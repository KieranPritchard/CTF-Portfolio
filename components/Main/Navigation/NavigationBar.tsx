import Link from "next/link"

const navItems = [
    { label: "Home", href: "/" },
    { label: "Write-Ups", href: "/write-ups" },
    { label: "Stats", href: "/stats" },
    { label: "Contact", href: "/contact" },
]

export function NavigationBar() {
    return (
        <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-auto max-w-full px-1">
            <nav className="flex items-center justify-between sm:justify-center gap-0.5 sm:gap-1 px-1 sm:px-3 py-1.5 sm:py-2 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60 border border-border rounded-full shadow-sm overflow-x-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="px-2 sm:px-5 py-2 text-xs sm:text-sm font-medium text-muted-foreground rounded-full whitespace-nowrap transition-colors duration-200 hover:text-foreground hover:bg-muted/80"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}