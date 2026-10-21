/**
 * Image carousel for write-up screenshot galleries.
 * Receives pre-extracted image paths from ReportMarkdown's carousel block parser.
 */
"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MotionConfig, motion } from "framer-motion"

interface MarkdownCarouselProps {
  srcs: string[]
}

// Gradient border styling
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:p-px before:bg-[linear-gradient(98.77deg,#006fe0,#6826ea,#2840d0)] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/** Slide frame: the Home portrait look. 14px radius, 1px gradient outline, soft drop shadow, dark backing for letterboxing. */
const slideFrame: string =
  `${gradientBorder} overflow-hidden rounded-[14px] bg-muted/20 shadow-[0_24px_36px_rgba(0,0,0,0.18)] dark:bg-[rgba(10,10,10,0.4)]`

// Arrow button
const arrowButton: string =
  "size-8 rounded-[8px] border border-border bg-transparent text-foreground backdrop-blur-[4px] backdrop-saturate-150 hover:bg-muted/60 dark:border-[rgba(158,163,190,0.25)] dark:bg-transparent dark:text-[#fafafa] dark:shadow-[inset_1.5px_1.5px_0_rgba(255,255,255,0.3),inset_-1px_-1px_0_rgba(255,255,255,0.12),inset_0_0_14px_rgba(255,255,255,0.07)] dark:hover:bg-[rgba(28,30,43,0.4)] [&_svg]:size-4"

/**
 * Renders a list of image paths as a paginated shadcn/ui Carousel.
 * Receives plain string paths (pre-extracted from the markdown carousel block)
 * so it's completely decoupled from the react-markdown rendering pipeline.
 */
export default function MarkdownCarousel({ srcs }: MarkdownCarouselProps) {
  // Checks if there are not sources to display
  if (!srcs || srcs.length === 0) return null

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="my-12 px-10 sm:px-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6, ease: "circOut" }}
      >
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground dark:text-[#9296b1]">
          Screenshots
        </p>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
          aria-label="Screenshot gallery"
        >
          <CarouselContent>
            {srcs.map((src, index) => (
              <CarouselItem key={index}>
                <div className={slideFrame}>
                  <div className="relative aspect-video w-full">
                    <Image
                      src={src}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 896px"
                    />
                  </div>
                </div>
                <p className="mt-3 text-center font-mono text-xs text-muted-foreground dark:text-[#9296b1]">
                  {index + 1} / {srcs.length}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={arrowButton} />
          <CarouselNext className={arrowButton} />
        </Carousel>
      </motion.div>
    </MotionConfig>
  )
}