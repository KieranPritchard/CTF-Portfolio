/**
 * Contact page form with social links and a simulated message submission flow.
 * Shows a success state after the user submits the form.
 */
"use client"

import { useState } from "react"
import { MotionConfig, motion } from "framer-motion"
import { Mail, Send, CheckCircle2 } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

/**
 * brand-gradient outline (#006fe0 -> #6826ea -> #2840d0), drawn by a masked ::before layer.
 * The mask uses longhand properties so it can only ever cut out the ring
 * and never fills the element. Takes up no space, so it never shifts layout. Set the strength with before:opacity-*.
 */
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[0.6px] before:transition-opacity before:duration-200 before:bg-[linear-gradient(98.77deg,#006fe0,#6826ea,#2840d0)] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/**
 * Glass approximation shared by the panel and cards: a 4px backdrop blur, a saturation boost, and a gentle rim light
 * on opposing edges. The rim light is dark-mode only.
 */
const glass: string =
  "backdrop-blur-[4px] backdrop-saturate-150 dark:shadow-[inset_1.5px_1.5px_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_rgba(255,255,255,0.04)]"

/** Channel card: 14px radius, 40% black fill, 16px padding, faint gradient outline that strengthens on hover. */
const channelCard: string = `${gradientBorder} ${glass} before:opacity-[0.33] hover:before:opacity-100 group flex items-center gap-4 rounded-[14px] bg-card p-4 transition-colors hover:bg-muted/50 dark:bg-[rgba(10,10,10,0.4)] dark:hover:bg-[rgba(28,30,43,0.4)]`

/** Channel icon: 40px circle in a 10% indigo tint with a 20px indigo icon. */
const channelIcon: string =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110 dark:bg-[rgba(150,148,255,0.102)] dark:text-[#9694ff]"

/** Form panel: 14px radius, 40% black fill, 16px padding with 10px between sections, outline at about 55%. */
const formPanel: string = `${gradientBorder} ${glass} before:opacity-[0.55] flex flex-col gap-2.5 rounded-[14px] bg-card p-4 dark:bg-[rgba(10,10,10,0.4)]`

/**
 * Field wrapper: an <input> cannot hold the gradient outline layer, so each field sits in a 10px-radius wrapper that
 * carries the 20% black fill and the outline.
 */
const fieldWrap: string = `${gradientBorder} before:opacity-[0.55] focus-within:before:opacity-100 rounded-[10px] bg-muted/30 dark:bg-[rgba(10,10,10,0.2)]`

/** Overrides that make the shadcn Input sit flat inside its wrapper: 32px tall, 10px side padding, 14px text. */
const inputClass: string =
  "h-8 rounded-[10px] border-0 bg-transparent px-[10px] py-[6px] text-sm text-foreground shadow-none focus-visible:ring-0 dark:bg-transparent dark:text-[#fafafa] placeholder:text-muted-foreground dark:placeholder:text-[#9296b1] md:text-sm"

/** Same for the Textarea: at least 150px tall and resizable vertically. */
const textareaClass: string =
  "min-h-[150px] resize-y rounded-[10px] border-0 bg-transparent px-[10px] py-[6px] text-sm text-foreground shadow-none focus-visible:ring-0 dark:bg-transparent dark:text-[#fafafa] placeholder:text-muted-foreground dark:placeholder:text-[#9296b1] md:text-sm"

/** Field label: 14px regular, bright. */
const labelClass: string =
  "text-sm font-normal leading-5 text-foreground dark:text-[#fafafa]"

/**
 * Submit button: full width, 32px tall, 8px radius, with the brand gradient fill and a 60% gradient outline.
 * The Figma uses dark text (#0a0a0a) on the gradient. Swap text-[#0a0a0a] for text-white if you want more contrast
 * against the violet middle of the gradient.
 */
const submitButton: string = `${gradientBorder} before:opacity-60 h-8 w-full gap-[14px] rounded-[8px] bg-transparent bg-[image:linear-gradient(90deg,#006fe0,#6826ea,#2840d0)] px-[10px] text-sm font-semibold text-[#0a0a0a] transition-[filter] hover:bg-transparent hover:brightness-110`

/** Neutral glass button for the success state's "Send Another", matching the secondary button used on the hero. */
const secondaryButton: string =
  "h-8 rounded-[8px] border-[0.6px] border-border bg-muted/60 px-2.5 text-sm font-semibold text-foreground backdrop-blur-[4px] backdrop-saturate-150 hover:bg-muted hover:text-foreground dark:border-transparent dark:bg-[rgba(28,30,45,0.45)] dark:text-[#fafafa] dark:shadow-[inset_0_0_0_0.6px_rgba(255,255,255,0.08),inset_1.5px_1.5px_0_rgba(255,255,255,0.3),inset_-1px_-1px_0_rgba(255,255,255,0.12),inset_0_0_14px_rgba(255,255,255,0.07)] dark:hover:bg-[rgba(28,30,45,0.8)] dark:hover:text-[#fafafa]"

export function ContactForm() {
  // Stores the state for wether the page is submitted or not
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handler function for submission
  const handleSubmit = (e: React.FormEvent) => {
    // Prevents the setting fields to default event
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        {/* Left Column: Socials & Info */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground dark:text-[#fafafa]">
              Let&apos;s Connect
            </h2>
            <p className="leading-relaxed text-muted-foreground dark:text-[#9296b1]">
              Whether you want to discuss a specific vulnerability, collaborate
              on a CTF, or just chat about the latest in cybersecurity, feel
              free to drop me a message.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:KieranPritchard06@gmail.com"
              className={channelCard}
            >
              <div className={channelIcon}>
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="leading-5 text-foreground dark:text-[#fafafa]">
                  Email
                </p>
                <p className="text-sm leading-5 text-muted-foreground dark:text-[#9296b1]">
                  KieranPritchard06@gmail.com
                </p>
              </div>
            </a>
            <a
              href="https://github.com/KieranPritchard"
              target="_blank"
              rel="noreferrer"
              className={channelCard}
            >
              <div className={channelIcon}>
                <FaGithub className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="leading-5 text-foreground dark:text-[#fafafa]">
                  GitHub
                </p>
                <p className="text-sm leading-5 text-muted-foreground dark:text-[#9296b1]">
                  Check out my tools &amp; scripts
                </p>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noreferrer"
              className={channelCard}
            >
              <div className={channelIcon}>
                <FaLinkedin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="leading-5 text-foreground dark:text-[#fafafa]">
                  LinkedIn
                </p>
                <p className="text-sm leading-5 text-muted-foreground dark:text-[#9296b1]">
                  Connect professionally
                </p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={formPanel}>
            <div className="space-y-1">
              <h3 className="text-base leading-6 font-medium text-foreground dark:text-[#fafafa]">
                Send a Message
              </h3>
              <p className="text-sm leading-5 text-muted-foreground dark:text-[#9296b1]">
                I usually respond within 24 hours. No recruiter spam, please.
              </p>
            </div>
            <div>
              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center space-y-4 py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-[rgba(150,148,255,0.102)] dark:text-[#9694ff]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground dark:text-[#fafafa]">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground dark:text-[#9296b1]">
                    Thanks for reaching out. I&apos;ll get back to you shortly.
                  </p>
                  <Button
                    variant="outline"
                    className={`mt-4 ${secondaryButton}`}
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className={labelClass}>
                        Name
                      </Label>
                      <div className={fieldWrap}>
                        <Input
                          id="name"
                          required
                          autoComplete="name"
                          placeholder="John Doe"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className={labelClass}>
                        Email
                      </Label>
                      <div className={fieldWrap}>
                        <Input
                          id="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="john@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className={labelClass}>
                        Subject
                      </Label>
                      <div className={fieldWrap}>
                        <Input
                          id="subject"
                          required
                          placeholder="CTF Collaboration"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className={labelClass}>
                        Message
                      </Label>
                      <div className={fieldWrap}>
                        <Textarea
                          id="message"
                          required
                          placeholder="Hey, I read your write-up on..."
                          className={textareaClass}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className={submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="h-4 w-4" />}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
