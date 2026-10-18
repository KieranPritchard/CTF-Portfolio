/**
 * Styled anchor button that wraps the shadcn Button component.
 * Used for prominent call-to-action links on the home page hero.
 *
 * Styled to the "New Design" Figma hero buttons: a 32px, 8px-radius button in two looks.
 * - "default" is the primary button: a 35% brand-gradient fill with a gradient outline.
 * - "secondary" and "outline" are the neutral button: a dark tinted fill with the same glass treatment.
 * Other shadcn variants (ghost, link, destructive) keep their normal shadcn styling.
 * Dark values come straight from the design; light mode falls back to the theme tokens.
 */
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"

/** Props for LinkButton, extending shadcn button size and variant options. */
interface LinkButtonProps extends VariantProps<typeof buttonVariants> {
  text: string
  link: string
}

/**
 * 0.6px brand-gradient outline (#006fe0 -> #6826ea -> #2840d0), drawn by a masked ::before layer because a
 * CSS border cannot take a gradient. The mask uses longhand properties so it can only ever cut out the ring
 * and never fills the button. Takes up no space, so it never shifts layout.
 */
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[0.6px] before:bg-[linear-gradient(98.77deg,#006fe0,#6826ea,#2840d0)] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/** Shared look for the two hero variants: 8px radius, 14px semibold, bright text in dark mode. */
const sharedStyles: string =
  "rounded-[8px] text-sm font-semibold text-foreground hover:text-foreground dark:text-[#fafafa] dark:hover:text-[#fafafa]"

/**
 * Primary: clear-glass look, built from the Figma button's own values (35% brand-gradient fill, 60% gradient
 * outline, Glass effect with blur 4, depth 20, light intensity 0.8 at -45deg). CSS has no true refraction,
 * so the glass is approximated with:
 * - a small 4px backdrop blur (a big blur reads as frosted, not glass) plus a saturation boost so the hero glow
 *   behind the button shows through crisply and richer in colour,
 * - rim light on opposing edges: bright on the top-left, fainter on the bottom-right, like light catching a bevel,
 * - a soft inner glow for depth, and a very faint sheen across the top half,
 * - the design's drop shadow underneath.
 * The rim light and inner glow are dark-mode only, because white light would be invisible on a light page.
 * Needs something behind the button (the hero glow) to show off the blur. Hover fills the tint to 50%.
 */
const primaryStyles: string = `${gradientBorder} before:opacity-60 hover:before:opacity-100 bg-transparent backdrop-blur-[4px] backdrop-saturate-150 bg-[image:linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0)_50%),linear-gradient(98.77deg,rgba(0,111,224,0.35),rgba(104,38,234,0.35),rgba(40,64,208,0.35))] shadow-[0_2px_2px_rgba(0,0,0,0.14)] dark:shadow-[0_2px_2px_rgba(0,0,0,0.14),inset_1.5px_1.5px_0_rgba(255,255,255,0.3),inset_-1px_-1px_0_rgba(255,255,255,0.12),inset_0_0_14px_rgba(255,255,255,0.07)] hover:bg-transparent hover:bg-[image:linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_50%),linear-gradient(98.77deg,rgba(0,111,224,0.5),rgba(104,38,234,0.5),rgba(40,64,208,0.5))]`

/**
 * Secondary: the Figma button is a 45% dark tinted fill with no stroke and the same Glass effect as the primary
 * (blur 4, depth 20, light intensity 0.8 at -45deg), so it gets the same glass treatment: a 4px backdrop blur with
 * a saturation boost, and rim light on opposing edges (bright top-left, fainter bottom-right) plus a soft inner glow.
 * A hairline inset ring keeps the faint all-round edge the button had before. The rim light is dark-mode only;
 * light mode keeps a normal border. The fill gets stronger on hover.
 */
const secondaryStyles: string =
  "border-[0.6px] border-border bg-muted/60 backdrop-blur-[4px] backdrop-saturate-150 hover:bg-muted dark:border-transparent dark:bg-[rgba(28,30,45,0.45)] dark:shadow-[inset_0_0_0_0.6px_rgba(255,255,255,0.08),inset_1.5px_1.5px_0_rgba(255,255,255,0.3),inset_-1px_-1px_0_rgba(255,255,255,0.12),inset_0_0_14px_rgba(255,255,255,0.07)] dark:hover:bg-[rgba(28,30,45,0.8)]"

/** Renders a navigable button-styled anchor link. */
function LinkButton({
  text,
  link,
  size = "default",
  variant = "default",
}: LinkButtonProps) {
  // The design only specifies the default size (32px tall, 10px side padding)
  const sizeStyles: string = size === "default" ? "h-8 px-2.5" : ""

  // Only the two hero variants get the new look; everything else stays as shadcn defines it
  let variantStyles: string = ""
  if (variant === "default") {
    variantStyles = `${sharedStyles} ${primaryStyles}`
  } else if (variant === "secondary" || variant === "outline") {
    variantStyles = `${sharedStyles} ${secondaryStyles}`
  }

  return (
    <Button
      variant={variant}
      size={size}
      asChild
      className={`${sizeStyles} ${variantStyles}`.trim()}
    >
      <a href={link}>{text}</a>
    </Button>
  )
}

export default LinkButton
