/**
 * Site-wide footer with navigation links, social icons, and copyright notice.
 * Rendered once in the root layout on every page.
 *
 * Styled to the "New Design" Figma footer: a 1150px-wide, 14px-radius glass panel with a faint (29%) brand-gradient
 * outline, three 335px columns with gradient accent bars, glass social icon buttons, and a tinted copyright bar.
 * Dark values come straight from the design; light mode falls back to the theme tokens.
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

/**
 * 0.6px brand-gradient outline (#006fe0 -> #6826ea -> #2840d0), drawn by a masked ::before layer because a
 * CSS border cannot take a gradient. The mask uses longhand properties so it can only ever cut out the ring
 * and never fills the element. Takes up no space, so it never shifts layout. Set the strength with before:opacity-*.
 */
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[0.6px] before:bg-[linear-gradient(98.77deg,#006fe0,#6826ea,#2840d0)] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/**
 * The footer panel: 20% black fill, 14px radius, and the Figma Glass effect (blur 4, depth 20) approximated with a
 * 4px backdrop blur, a saturation boost, and a gentle rim light on opposing edges (kept far fainter than on the
 * small buttons, because on a panel this big a strong rim looks heavy). The outline is only 29% opacity in the design.
 * The rim light is dark-mode only; light mode uses the card colour.
 */
const footerPanel: string =
  `${gradientBorder} before:opacity-[0.29] mx-auto w-full max-w-[1150px] overflow-hidden rounded-[14px] bg-card text-card-foreground backdrop-blur-[4px] backdrop-saturate-150 dark:bg-[rgba(10,10,10,0.2)] dark:shadow-[inset_1.5px_1.5px_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_rgba(255,255,255,0.04)]`

/** Footer nav link: 32px tall, 8px side padding, 13px medium bright text, tinted fill on hover. */
const footerLink: string =
  "h-8 px-2 text-[13px] font-medium text-foreground hover:bg-muted/60 hover:text-foreground dark:text-[#fafafa] dark:hover:bg-[rgba(28,30,43,0.4)] dark:hover:text-[#fafafa]"

/**
 * Social icon button: 28px square, 8px radius, 1px outline at 25% and no fill, with the same glass treatment as the
 * hero buttons (4px blur, saturation boost, rim light on opposing edges). 16px bright icon.
 */
const socialButton: string =
  "size-7 rounded-[8px] border border-border bg-transparent text-foreground backdrop-blur-[4px] backdrop-saturate-150 hover:bg-muted/60 dark:border-[rgba(158,163,190,0.25)] dark:bg-transparent dark:text-[#fafafa] dark:shadow-[inset_1.5px_1.5px_0_rgba(255,255,255,0.3),inset_-1px_-1px_0_rgba(255,255,255,0.12),inset_0_0_14px_rgba(255,255,255,0.07)] dark:hover:bg-[rgba(28,30,43,0.4)] [&_svg]:size-4"

/** Section heading with a decorative gradient accent underline (48x4px bar). */
function FooterSectionTitle({
                              children,
                              className,
                            }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div className={cn("space-y-3", className)}>
      <h2 className="text-sm font-medium tracking-tight text-foreground dark:text-[#fafafa]">{children}</h2>
      <div
        className="h-1 w-12 rounded-full bg-[linear-gradient(90deg,#006fe0,#6826ea,#2840d0)]"
        aria-hidden="true"
      />
    </div>
  )
}

export function Footer() {
  const year:number = new Date().getFullYear()

  return (
    <footer className="mt-auto w-full px-4 pt-8 pb-8 md:px-6 lg:px-8">
      <div className={footerPanel}>
        <div className="grid gap-10 px-6 py-8 md:grid-cols-3 md:px-8 md:py-10">
          <div className="space-y-4">
            <FooterSectionTitle>Kieran&#39;s CTF Write Ups</FooterSectionTitle>
            <p className="text-sm leading-relaxed text-muted-foreground dark:text-[#9296b1]">
              Documenting CTF walkthroughs and security research with clear,
              actionable write-ups.
            </p>
          </div>

          <div className="space-y-4">
            <FooterSectionTitle>Navigate</FooterSectionTitle>
            <nav
              aria-label="Footer navigation"
              className="flex flex-col items-start gap-1"
            >
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  className={footerLink}
                  asChild
                >
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
                  className={socialButton}
                  asChild
                >
                  <a
                    href={item.href}
                    target={
                      item.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      item.href.startsWith("mailto:")
                        ? undefined
                        : "noreferrer"
                    }
                    aria-label={item.label}
                  >
                    <item.icon />
                  </a>
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground dark:text-[#9296b1]">
              Open to collaborations, CTFs, and security discussions.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border bg-muted/50 px-6 py-4 text-xs text-muted-foreground dark:border-[rgba(158,163,190,0.16)] dark:bg-[rgba(28,30,43,0.5)] dark:text-[#9296b1] sm:h-[50px] sm:flex-row sm:items-center sm:justify-between sm:py-0 md:px-8">
          <p>&copy; {year} CTF Portfolio. All rights reserved.</p>
          <p>Built for cybersecurity research and write-ups.</p>
        </div>
      </div>
    </footer>
  )
}