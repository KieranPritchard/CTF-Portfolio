"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, CheckCircle2 } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
        }, 1500)
    }

    return (
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Socials & Info */}
            <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-4">Let&apos;s Connect</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Whether you want to discuss a specific vulnerability, collaborate on a CTF, or just chat about the latest in cybersecurity, feel free to drop me a message.
                    </p>
                </div>

                <div className="space-y-4">
                    <a href="mailto:hello@example.com" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/50 transition-all group">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">hello@example.com</p>
                        </div>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/50 transition-all group">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FaGithub className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium">GitHub</p>
                            <p className="text-sm text-muted-foreground">Check out my tools &amp; scripts</p>
                        </div>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/50 transition-all group">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FaLinkedin className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium">LinkedIn</p>
                            <p className="text-sm text-muted-foreground">Connect professionally</p>
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
                <Card className="border-border/50 shadow-xl shadow-primary/5">
                    <CardHeader>
                        <CardTitle>Send a Message</CardTitle>
                        <CardDescription>
                            I usually respond within 24 hours. No recruiter spam, please.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitted ? (
                            <motion.div 
                                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="h-16 w-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">Message Sent!</h3>
                                <p className="text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you shortly.</p>
                                <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                                    Send Another
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" required placeholder="John Doe" className="bg-muted/30" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" required placeholder="john@example.com" className="bg-muted/30" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" required placeholder="CTF Collaboration" className="bg-muted/30" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea 
                                        id="message" 
                                        required 
                                        placeholder="Hey, I read your write-up on..." 
                                        className="min-h-[150px] bg-muted/30" 
                                    />
                                </div>
                                <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
