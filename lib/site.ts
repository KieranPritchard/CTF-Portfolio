import type { ComponentType } from "react"
import { Mail, Globe } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export const site = {
  name: "Kieran's CTF Write Ups",
  email: "KieranPritchard06@gmail.com",
  github: "https://github.com/KieranPritchard",
  linkedin: "https://www.linkedin.com/in/kieran-pritchard",
  website: "https://github.com/KieranPritchard",
}

export const socialLinks: {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}[] = [
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
  { label: "GitHub", href: site.github, icon: FaGithub },
  { label: "LinkedIn", href: site.linkedin, icon: FaLinkedin },
  { label: "Website", href: site.website, icon: Globe },
]
