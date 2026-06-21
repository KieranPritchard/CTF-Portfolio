/**
 * Displays a CTF category label with theme-aware styling.
 * Used across write-ups, stats, and the reports grid.
 * Supports badge and plain-text variants, with an optional category icon.
 */
import { cn } from "@/lib/utils"
import { getCategoryConfig } from "@/lib/categories"

/** Props for the CategoryBadge component. */
type CategoryBadgeProps = {
  category: string
  className?: string
  showIcon?: boolean
  variant?: "badge" | "text"
}

export function CategoryBadge({
  category,
  className,
  showIcon = false,
  variant = "badge",
}: CategoryBadgeProps) {
  const { label, icon: Icon } = getCategoryConfig(category)

  if (variant === "text") {
    return (
      <span
        data-category={category}
        className={cn("category-text uppercase tracking-wider", className)}
      >
        {label}
      </span>
    )
  }

  return (
    <span
      data-category={category}
      className={cn(
        "category-tag inline-flex w-fit shrink-0 items-center gap-1 rounded-4xl border px-2 py-0.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap",
        className
      )}
    >
      {showIcon ? <Icon className="size-3" aria-hidden="true" /> : null}
      {label}
    </span>
  )
}
