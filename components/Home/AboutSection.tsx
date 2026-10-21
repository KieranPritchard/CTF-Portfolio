/**
 * Home page about section with biographical content and a technical skills list.
 * Uses a two-column layout with scroll-triggered fade-up animations on desktop.
 */
"use client"

import { Variants, motion } from "framer-motion"

/**
 * Animation variants for scroll-triggered fade-up elements.
 */
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "circOut" } 
  },
}

// Interface for the fade up section props
interface FadeUpSectionProps {
  children: React.ReactNode
  className?: string
}

/**
 * FadeUpSection - wraps content with a whileInView animation.
 */
function FadeUpSection({ children, className }:FadeUpSectionProps) {
  return (
    <motion.div
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px 0px" }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-2">
        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-center space-y-12 px-4 py-12 sm:px-8 md:px-16">
          {/* About Me Section */}
          <FadeUpSection className="space-y-4">
            <div>
              <h2 className="text-gradient-brand text-2xl font-bold tracking-tight sm:text-3xl">
                About Me
              </h2>

              {/* Left-aligned decorative accent bar */}
              <motion.div
                className="gradient-accent mt-4 h-1.5 w-24 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="max-w-xl text-sm leading-relaxed sm:text-base">
              I am a Software Development student at Bournemouth & Poole College
              dedicated to breaking systems down to understand exactly how to
              rebuild them to secure them. My journey in security is driven by
              an intense curiosity about offensive security and a passion for
              continuous learning.
            </p>
            <p className="max-w-xl text-sm leading-relaxed sm:text-base">
              Beyond just finding bugs, I believe in the power of clear
              documentation and robust code. I build labs, compete in CTFs, and
              publish my methodologies here to bridge the gap between complex
              exploits and actionable security insights.
            </p>
            <p className="text-sm sm:text-base">
              When I&apos;m not at the terminal, you can usually find me gaming,
              listening to bands like Linkin Park and Marilyn Manson.
            </p>
          </FadeUpSection>
        </div>

        {/* Right Column: Visual Placeholder — hidden on mobile */}
        <FadeUpSection className="relative hidden flex-col justify-center p-8 sm:p-16 md:flex">
          {/* Main Large Center/Right Placeholder Box */}
          <img
            className="gradient-border aspect-4/5 w-full max-w-md self-center rounded-xl bg-muted/30 shadow-2xl md:self-end"
            src={"/kieran-pritchard.jpg"}
          />
        </FadeUpSection>
      </div>
    </section>
  )
}