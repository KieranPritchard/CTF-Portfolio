/**
 * Full-page ambient gradient blob background.
 * Used in the root layout behind all page content with configurable intensity.
 */
import { cn } from "@/lib/utils"

type MeshBackgroundProps = {
  className?: string
  intensity?: "subtle" | "default" | "hero"
  fixed?: boolean
}

/** Blob position and colour presets for each intensity level. */
const blobs = {
  subtle: [
    { className: "bg-mesh-blue/12 -top-[25%] -left-[15%] h-[55%] w-[55%] blur-[120px]" },
    { className: "bg-mesh-purple/10 -top-[10%] -right-[20%] h-[50%] w-[50%] blur-[110px]" },
    { className: "bg-mesh-indigo/8 -bottom-[20%] left-[20%] h-[45%] w-[45%] blur-[100px]" },
  ],
  default: [
    { className: "bg-mesh-blue/20 -top-[30%] -left-[10%] h-[65%] w-[65%] blur-[130px]" },
    { className: "bg-mesh-purple/16 -top-[5%] -right-[15%] h-[55%] w-[55%] blur-[120px]" },
    { className: "bg-mesh-indigo/14 -bottom-[25%] left-[30%] h-[50%] w-[50%] blur-[110px]" },
    { className: "bg-mesh-blue/10 bottom-[10%] -right-[10%] h-[40%] w-[40%] blur-[90px]" },
  ],
  hero: [
    { className: "bg-mesh-blue/25 -top-[35%] -left-[5%] h-[70%] w-[70%] blur-[140px]" },
    { className: "bg-mesh-purple/20 -top-[10%] -right-[10%] h-[60%] w-[60%] blur-[130px]" },
    { className: "bg-mesh-indigo/18 -bottom-[30%] left-[25%] h-[55%] w-[55%] blur-[120px]" },
    { className: "bg-mesh-purple/12 top-[40%] right-[20%] h-[35%] w-[35%] blur-[100px]" },
  ],
} as const

export function MeshBackground({
  className,
  intensity = "subtle",
  fixed = false,
}: MeshBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none inset-0 overflow-hidden mesh-fade",
        fixed ? "fixed -z-10" : "absolute z-0",
        className
      )}
      aria-hidden="true"
    >
      {blobs[intensity].map((blob) => (
        <div
          key={blob.className}
          className={cn("absolute rounded-full", blob.className)}
        />
      ))}
    </div>
  )
}
