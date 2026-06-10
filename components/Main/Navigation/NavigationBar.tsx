import Link from "next/link"

const navItems = [
    { label: "Home", href: "/" },
    { label: "Write-Ups", href: "/write-ups" },
    { label: "Stats", href: "/stats" },
    { label: "Contact", href: "/contact" },
]

export function NavigationBar() {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <nav className="flex items-center gap-1 px-3 py-2 bg-background/80 border border-border rounded-full shadow-xl backdrop-blur-md">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="px-5 py-2 text-sm font-medium text-muted-foreground rounded-full transition-all duration-200 hover:text-foreground hover:bg-muted/60 hover:scale-110"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}