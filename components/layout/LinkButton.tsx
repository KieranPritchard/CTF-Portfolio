/**
 * Styled anchor button that wraps the shadcn Button component.
 * Used for prominent call-to-action links on the home page hero.
 */
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"

/** Props for LinkButton, extending shadcn button size and variant options. */
interface LinkButtonProps extends VariantProps<typeof buttonVariants> {
    text: string;
    link: string;
}

/** Renders a navigable button-styled anchor link. */
function LinkButton({ text, link, size = "default", variant = "default" }: LinkButtonProps) {
    return (
        <Button variant={variant} size={size} asChild>
            <a href={link}>
                {text}
            </a>
        </Button>
    )
}

export default LinkButton