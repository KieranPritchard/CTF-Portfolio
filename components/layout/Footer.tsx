/**
 * Site-wide footer with navigation links, social icons, and copyright notice.
 * Rendered once in the root layout on every page.
 */
import Link from "next/link"
import { Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Primary site navigation links, shared between the footer and nav bar. */
const navItems = [
    { label: "Home", href: "/" },
    { label: "Write-Ups", href: "/write-ups" },
    { label: "Stats", href: "/stats" },
    { label: "Contact", href: "/contact" },
]

/** External and mailto links displayed as icon buttons in the footer. */
const socialLinks = [
    { label: "Email", href: "mailto:hello@example.com", icon: Mail },
    { label: "GitHub", href: "https://github.com", icon: FaGithub },
    { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
]

/** Section heading with a decorative gradient accent underline. */
function FooterSectionTitle({
    children,
    className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
    return (
        <div className={cn("space-y-3", className)}>
            <h2 className="text-sm font-medium tracking-tight">{children}</h2>
            <div className="h-1 w-12 gradient-accent rounded-full" aria-hidden="true" />
        </div>
    )
}

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="mt-auto w-full px-4 pb-6 pt-8 md:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl bg-card text-card-foreground gradient-border">
                <div className="grid gap-10 px-6 py-8 md:grid-cols-3 md:px-8 md:py-10">
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <p className="text-lg font-bold tracking-tight text-gradient-brand">CTF Portfolio</p>
                            <div className="h-1.5 w-24 gradient-accent rounded-full" aria-hidden="true" />
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            Documenting CTF walkthroughs and security research with clear,
                            actionable write-ups.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <FooterSectionTitle>Navigate</FooterSectionTitle>
                        <nav aria-label="Footer navigation" className="flex flex-col items-start gap-1">
                            {navItems.map((item) => (
                                <Button key={item.href} variant="ghost" size="sm" className="h-8 px-2" asChild>
                                    <Link href={item.href}>{item.label}</Link>
                                </Button>
                            ))}
                        </nav>
                    </div>

                    <div className="space-y-4">
                        <FooterSectionTitle>Connect</FooterSectionTitle>
                        <div className="flex flex-wrap gap-2">
                            {socialLinks.map((item) => (
                                <Button
                                    key={item.href}
                                    variant="outline"
                                    size="icon-sm"
                                    asChild
                                >
                                    <a
                                        href={item.href}
                                        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                                        rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                                        aria-label={item.label}
                                    >
                                        <item.icon />
                                    </a>
                                </Button>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Open to collaborations, CTFs, and security discussions.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t bg-muted/50 px-6 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
                    <p>&copy; {year} CTF Portfolio. All rights reserved.</p>
                    <p>Built for cybersecurity research and write-ups.</p>
                </div>
            </div>
        </footer>
    )
}
