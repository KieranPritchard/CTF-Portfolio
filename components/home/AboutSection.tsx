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

/**
 * FadeUpSection - wraps content with a whileInView animation.
 */
function FadeUpSection({ children, className }: { children: React.ReactNode; className?: string }) {
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
    <section className="min-h-screen relative overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-screen relative z-10">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-center px-4 sm:px-8 md:px-16 py-12 space-y-12">
          
          {/* About Me Section */}
          <FadeUpSection className="space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                About Me
              </h2>
              
              {/* Left-aligned decorative accent bar */}
              <motion.div 
                className="h-1.5 w-24 bg-primary mt-4 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <p className="leading-relaxed max-w-xl text-sm sm:text-base">
              I am a [Cybersecurity Student / Security Researcher / Application
              Security Analyst] dedicated to breaking systems down to understand
              exactly how to secure them. My journey in security is driven by an
              intense curiosity about [mention a specific interest, e.g., binary
              exploitation, cloud security, web vulnerabilities] and a passion for
              continuous learning.
            </p>
            <p className="leading-relaxed max-w-xl text-sm sm:text-base">
              Beyond just finding bugs, I believe in the power of clear
              documentation. I build labs, compete in CTFs, and publish my
              methodologies here to bridge the gap between complex exploits and
              actionable security insights.
            </p>
          </FadeUpSection>

          {/* Technical Arsenal Section */}
          <FadeUpSection className="space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Technical Arsenal
              </h2>

              {/* Left-aligned decorative accent bar */}
              <motion.div 
                className="h-1.5 w-24 bg-primary mt-4 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <ul className="list-disc list-inside space-y-2 max-w-xl text-sm sm:text-base">
              <li>
                <span className="font-semibold">Languages:</span> [e.g., Python, Bash, C, Go]
              </li>
              <li>
                <span className="font-semibold">Tools &amp; Platforms:</span> [e.g., Burp Suite, Wireshark, Metasploit, Linux]
              </li>
              <li>
                <span className="font-semibold">Areas of Focus:</span> [e.g., Pentesting, Threat Hunting, Source Code Review]
              </li>
            </ul>
          </FadeUpSection>

          {/* Footer/Call to Action text */}
          <FadeUpSection className="max-w-xl">
            <p className="text-sm sm:text-base">
              When I&apos;m not at the terminal, you can usually find me [insert a brief
              hobby, e.g., tweaking my homelab, brewing espresso, or hiking].
            </p>
            <p className="font-medium text-sm sm:text-base mt-2">
              [Let&apos;s connect on LinkedIn] or check out my latest write-ups above!
            </p>
          </FadeUpSection>
        </div>

        {/* Right Column: Visual Placeholder — hidden on mobile */}
        <FadeUpSection className="hidden md:flex flex-col justify-center p-8 sm:p-16 relative">
          {/* Main Large Center/Right Placeholder Box */}
          <div className="w-full aspect-[4/5] max-w-md bg-gray-300 self-center md:self-end shadow-2xl" />
        </FadeUpSection>

      </div>
    </section>
  );
}