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
        <section className="relative flex flex-col min-h-screen overflow-hidden px-4 sm:px-12 md:px-16 lg:px-24 w-full text-foreground pt-16">
            <div className="relative z-10 flex-1 flex flex-col items-center justify-between max-w-5xl w-full mx-auto">
                
                {/* Top/Middle Content Wrapper */}
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                    
                    {/* Header: items-start aligns the title and bar to the left */}
                    <header className="flex flex-col items-start max-w-3xl w-full">
                        <motion.h1 
                            className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-left text-gradient-brand"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                        >
                            Research &amp; Write-Ups
                        </motion.h1>
                        
                        {/* Left-aligned decorative accent bar */}
                        <motion.div 
                            className="h-1.5 w-24 gradient-accent mt-4 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: 96 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        />
                        
                        {/* Centered Paragraph */}
                        <motion.p 
                            className="text-muted-foreground text-center text-sm sm:text-base md:text-lg max-w-xl lg:max-w-2xl leading-relaxed mt-4 mx-auto"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            custom={2}
                        >
                            Dive into my latest CTF walkthroughs and security research. Built to document my 
                            technical methodologies, this portfolio offers a transparent look into my 
                            problem-solving process and hands-on cybersecurity skills.
                        </motion.p>
                    </header>

                    {/* Call to Action Buttons */}
                    <motion.div 
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full sm:w-auto"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                    >
                        <LinkButton link="/write-ups" text="View Research" size="lg"/>
                        <LinkButton link="/stats" text="View Stats" size="lg" variant={"secondary"}/>
                    </motion.div>
                </div>

                {/* Image Container Box - Justified to the bottom */}
                <motion.img
                    className="w-full max-w-4xl aspect-4/1 gradient-border overflow-hidden flex items-center justify-center bg-muted/30 text-muted-foreground rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: "circOut" }}
                    src={"/intro.png"}
                />
            </div>
        </section>
    );
}

export default Welcome;