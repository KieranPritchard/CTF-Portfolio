import { Button, buttonVariants } from "../../ui/button"
import { VariantProps } from "class-variance-authority"

// Define the interface extending shadcn's button variants
interface LinkButtonProps extends VariantProps<typeof buttonVariants> {
    text: string;
    link: string;
}

// Apply the interface to your component props
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