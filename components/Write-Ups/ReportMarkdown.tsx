/**
 *
 * Renders write-up markdown content with custom typography, tables, images, and code blocks.
 * Extracts carousel image blocks and delegates them to MarkdownCarousel.
 *
 */
"use client"

import { Variants, MotionConfig } from "framer-motion"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import Image from "next/image"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import MarkdownCarousel from "@/components/Write-Ups/MarkdownCarousel"

// Stores the class for the gradient border
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:bg-[linear-gradient(98.77deg,#006fe0,#6826ea,#2840d0)] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/** Table panel: the filter-panel look. A 0.6px gradient outline at about 33% strength and a 12.5% black fill. */
const tablePanel: string =
  `${gradientBorder} before:p-[0.6px] before:opacity-[0.33] my-8 w-full overflow-hidden rounded-[14px] bg-card/50 dark:bg-[rgba(10,10,10,0.125)]`

/** Image frame: the Home portrait look. 14px radius, 1px full-strength gradient outline, soft drop shadow. */
const imageFrame: string =
  `${gradientBorder} before:p-px block overflow-hidden rounded-[14px] bg-muted/20 shadow-[0_24px_36px_rgba(0,0,0,0.18)]`

/** Link colour: the design's violet-blue accent in dark mode, the theme primary in light mode. */
const linkClass: string =
  "font-medium text-primary underline-offset-4 transition-colors hover:underline dark:text-[#8b86ff]"

/**
 * Standard animation variants for markdown elements.
 * Elements slide up 30px and fade in.
 */
const markdownItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "circOut" }
  },
}

// Interface for fade up observer
interface FadeUpObserverProps {
  children: React.ReactNode
  as?: "div" | "span"
  className?: string
}

/**
 * FadeUpObserver Component
 *
 * A reusable wrapper that detects when its children enter the viewport
 * and triggers a fade-up animation. This ensures animations play
 * sequentially as the user scrolls.
 *
 * @param children - The React elements to wrap with animation.
 * @param as
 * @param className
 */
const FadeUpObserver = ({ children, as = "div", className }: FadeUpObserverProps) => {
  const Component = motion[as]
  return (
    <Component
      variants={markdownItemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px 0px" }}
      className={className}
    >
      {children}
    </Component>
  )
}

/**
 * Pre-processes the raw markdown string.
 * Extracts image src paths from <carousel>...</carousel> blocks,
 * removes the carousel block from the markdown body,
 * and returns both separately so they can be rendered as distinct React elements.
 */
function extractCarousel(content: string): { body: string; imageSrcs: string[] } {
  const carouselRegex = /<carousel>([\s\S]*?)<\/carousel>/i
  const match = content.match(carouselRegex)

  if (!match) {
    return { body: content, imageSrcs: [] }
  }

  const block = match[1]
  const imageSrcs: string[] = []

  // Handle HTML <img src="..."> syntax
  const imgTagRegex = /src="([^"]+)"/gi
  let m
  while ((m = imgTagRegex.exec(block)) !== null) {
    imageSrcs.push(m[1])
  }

  // Handle markdown image syntax ![alt](path)
  const mdImageRegex = /!\[[^\]]*\]\(([^)]+)\)/gi
  while ((m = mdImageRegex.exec(block)) !== null) {
    imageSrcs.push(m[1])
  }

  // Remove the carousel block from the markdown body
  const body = content.replace(carouselRegex, "").trimEnd()

  return { body, imageSrcs }
}

/**
 * ReportMarkdown Component
 *
 * Parses and styles write-up case studies using GitHub Flavored Markdown.
 * Includes custom Tailwind styling for typography, tables, images, and code blocks,
 * with Framer Motion reveal effects for every block element (skipped for people who prefer reduced motion).
 *
 * @param content - The raw markdown string to render.
 */
export default function ReportMarkdown({ content }: Readonly<{ content: string }>) {
  const { body, imageSrcs } = extractCarousel(content)

  return (
    <MotionConfig reducedMotion="user">
      <article className="min-w-0">
        {/* Markdown Parser: Overrides default HTML tags with custom styled React components */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // Typography: All headers and paragraphs wrapped in FadeUpObserver for scroll animations
            h1: ({ children, ...props }) => (
              <FadeUpObserver className="mt-12 first:mt-0">
                <h2 className="scroll-m-20 text-2xl font-bold tracking-tight text-foreground dark:text-[#fafafa]" {...props}>
                  {children}
                </h2>
              </FadeUpObserver>
            ),
            h2: ({ children, ...props }) => (
              <FadeUpObserver className="mt-10">
                <h3 className="scroll-m-20 text-xl font-bold tracking-tight text-foreground/95 dark:text-[#fafafa]" {...props}>
                  {children}
                </h3>
              </FadeUpObserver>
            ),
            h3: ({ children, ...props }) => (
              <FadeUpObserver className="mt-8">
                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight text-foreground/90 dark:text-[#fafafa]" {...props}>
                  {children}
                </h4>
              </FadeUpObserver>
            ),
            p: ({ children, ...props }) => (
              <FadeUpObserver className="mt-5">
                <p className="leading-relaxed text-foreground/90 dark:text-[#fafafa]" {...props}>
                  {children}
                </p>
              </FadeUpObserver>
            ),
            // Blockquote styling with a brand-violet accent edge, a tinted fill and muted italic text
            blockquote: ({ children, ...props }) => (
              <FadeUpObserver>
                <blockquote
                  className="mt-6 rounded-r-lg border-l-4 border-primary/40 bg-muted/30 py-3 pl-5 pr-3 italic text-muted-foreground dark:border-[rgba(104,38,234,0.7)] dark:bg-[rgba(28,30,43,0.4)] dark:text-[#9296b1]"
                  {...props}
                >
                  {children}
                </blockquote>
              </FadeUpObserver>
            ),
            // Table Layout: the filter-panel look. The shadcn Table brings its own horizontal scroll for mobile
            table: ({ children, ...props }) => (
              <FadeUpObserver>
                <div className={tablePanel}>
                  <Table {...props}>{children}</Table>
                </div>
              </FadeUpObserver>
            ),
            // Media: Handles local Next.js optimized images vs standard external URLs
            img: ({ src, alt }) => {
              if (!src || typeof src !== "string") {
                return null
              }

              if (src.startsWith("/")) {
                return (
                  <FadeUpObserver as="span" className="my-10 block">
                  <span className={imageFrame}>
                    <Image
                      src={src}
                      alt={alt ?? ""}
                      width={1200}
                      height={675}
                      className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 896px"
                      priority={false}
                    />
                  </span>
                  </FadeUpObserver>
                )
              }

              // An <img> cannot hold the gradient outline layer, so external images get the same frame as a wrapper
              return (
                <FadeUpObserver as="span" className="my-10 block">
                <span className={imageFrame}>
                  <Image
                    src={src}
                    alt={alt ?? ""}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </span>
                </FadeUpObserver>
              )
            },
            // Table sub-components for consistent UI/Table styling
            thead: ({ children, ...props }) => <TableHeader {...props}>{children}</TableHeader>,
            tbody: ({ children, ...props }) => <TableBody {...props}>{children}</TableBody>,
            tr: ({ children, ...props }) => <TableRow className="border-border/50 dark:border-[rgba(158,163,190,0.12)]" {...props}>{children}</TableRow>,
            th: ({ children, ...props }) => <TableHead className="text-muted-foreground dark:text-[#9296b1]" {...props}>{children}</TableHead>,
            td: ({ children, ...props }) => <TableCell className="text-foreground/90 dark:text-[#fafafa]" {...props}>{children}</TableCell>,
            // Links: Differentiates between internal Next.js links and external new-tab links
            a: ({ href, children, ...props }) => {
              const external = href?.startsWith("http")
              if (href && external) {
                return <a href={href} className={linkClass} target="_blank" rel="noreferrer noopener" {...props}>{children}</a>
              }
              if (href) {
                return <Link href={href} className={linkClass} {...props}>{children}</Link>
              }
              return <span className="font-medium text-primary dark:text-[#8b86ff]" {...props}>{children}</span>
            },
            // Code: Distinguishes between inline snippets and syntax-highlighted code blocks
            code: ({ children, className, ...props }) => {
              const isBlock = Boolean(className?.includes("language-"))
              if (isBlock) {
                return <code className={cn("font-mono text-xs sm:text-sm leading-relaxed text-card-foreground dark:text-[#fafafa]", className)} {...props}>{children}</code>
              }
              return <code className="rounded-md border-[0.6px] border-border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground/90 dark:border-[rgba(158,163,190,0.2)] dark:bg-[rgba(28,30,43,0.4)] dark:text-[#fafafa]" {...props}>{children}</code>
            },
            pre: ({ children, ...props }) => (
              <FadeUpObserver>
              <pre className="my-8 overflow-x-auto rounded-[14px] border-[0.6px] border-border bg-muted/20 p-5 text-sm dark:border-[rgba(158,163,190,0.2)] dark:bg-[rgba(10,10,10,0.4)]" {...props}>
                {children}
              </pre>
              </FadeUpObserver>
            ),
            hr: () => (
              <FadeUpObserver>
                <hr className="my-12 border-border/50 dark:border-[rgba(158,163,190,0.16)]" />
              </FadeUpObserver>
            ),
            ul: ({ children, ...props }) => (
              <FadeUpObserver>
                <ul className="my-6 list-disc space-y-3 pl-6 text-foreground/90 marker:text-primary/70 dark:text-[#fafafa] dark:marker:text-[#8b86ff]/70" {...props}>
                  {children}
                </ul>
              </FadeUpObserver>
            ),
            ol: ({ children, ...props }) => (
              <FadeUpObserver>
                <ol className="my-6 list-decimal space-y-3 pl-6 text-foreground/90 marker:text-primary/70 dark:text-[#fafafa] dark:marker:text-[#8b86ff]/70" {...props}>
                  {children}
                </ol>
              </FadeUpObserver>
            ),
            li: ({ children, ...props }) => <li className="leading-relaxed" {...props}>{children}</li>,
          }}
        >
          {body}
        </ReactMarkdown>

        {/* Render the screenshot carousel directly as a React component with the extracted src paths */}
        {imageSrcs.length > 0 && (
          <MarkdownCarousel srcs={imageSrcs} />
        )}
      </article>
    </MotionConfig>
  )
}