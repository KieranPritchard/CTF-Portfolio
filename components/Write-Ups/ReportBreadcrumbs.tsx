import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Defines the structure for a single breadcrumb item.
 */
type Crumb = { 
  /** The text label to display. */
  label: string; 
  /** The destination URL (optional for the last item). */
  href?: string 
}

/**
 * ReportBreadcrumbs Component
 * 
 * Renders a horizontal navigation trail (breadcrumb) for hierarchical pages.
 * Automatically inserts separators and highlights the active (last) item.
 * 
 * @param items - An array of breadcrumb objects (label and optional href).
 * @param className - Optional CSS class name for the navigation container.
 */
export function ReportBreadcrumbs({ items, className }: Readonly<{ items: Crumb[]; className?: string }>) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-muted-foreground", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {/* Separator Icon: Hidden from screen readers */}
              {index > 0 && <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />}
              
              {/* Interactive Link or Static Label */}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast && "font-medium text-foreground")}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
