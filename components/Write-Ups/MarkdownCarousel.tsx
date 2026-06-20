"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"

interface MarkdownCarouselProps {
  srcs: string[]
}

/**
 * Renders a list of image paths as a paginated shadcn/ui Carousel.
 * Receives plain string paths (pre-extracted from the markdown carousel block)
 * so it's completely decoupled from the react-markdown rendering pipeline.
 */
export function MarkdownCarousel({ srcs }: MarkdownCarouselProps) {
  if (!srcs || srcs.length === 0) return null

  return (
    <motion.div
      className="my-12 px-10 sm:px-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px 0px" }}
      transition={{ duration: 0.6, ease: "circOut" }}
    >
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Screenshots
      </p>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {srcs.map((src, index) => (
            <CarouselItem key={index}>
              <div className="overflow-hidden rounded-xl border border-border/50 bg-muted/20 shadow-lg">
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
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {index + 1} / {srcs.length}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.div>
  )
}
