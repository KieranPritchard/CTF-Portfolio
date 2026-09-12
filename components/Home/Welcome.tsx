/**
 * Home page hero section with animated headline, description, and call-to-action buttons.
 * Occupies the full viewport height and includes a project showcase placeholder.
 */
"use client"

import { Variants, motion } from "framer-motion"
import LinkButton from "@/components/layout/LinkButton"

/**
 * Animation variants for text elements using a custom delay multiplier.
 */
const textVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" }
    })
}

function Welcome() {
    return (
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden px-4 pt-16 text-foreground sm:px-12 md:px-16 lg:px-24">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-between">
          {/* Top/Middle Content Wrapper */}
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            {/* Header: items-start aligns the title and bar to the left */}
            <header className="flex w-full max-w-3xl flex-col flex-start">
              <div>
                <motion.h1
                  className="text-gradient-brand text-left text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  Research &amp; Write-Ups
                </motion.h1>

                {/* Left-aligned decorative accent bar */}
                <motion.div
                  className="gradient-accent mt-4 h-1.5 w-24 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              </div>

              {/* Centered Paragraph */}
              <motion.p
                className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg lg:max-w-2xl"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                Dive into my latest CTF walkthroughs and security research.
                Built to document my technical methodologies, this portfolio
                offers a transparent look into my problem-solving process and
                hands-on cybersecurity skills.
              </motion.p>
            </header>

            {/* Call-to-Action Buttons */}
            <motion.div
              className="mt-4 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <LinkButton link="/write-ups" text="View Research" size="lg" />
              <LinkButton
                link="/stats"
                text="View Stats"
                size="lg"
                variant={"secondary"}
              />
            </motion.div>
          </div>

          {/* Image Container Box - Justified to the bottom */}
          <motion.img
            className="gradient-border hidden aspect-4/1 w-full max-w-4xl items-center justify-center overflow-hidden rounded-xl bg-muted/30 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "circOut" }}
            src={"/intro.png"}
          />
        </div>
      </section>
    )
}

export default Welcome;