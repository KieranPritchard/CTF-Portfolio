import AboutSection from "@/components/Home/AboutSection"
import Welcome from "@/components/Home/Welcome"
import { Metadata } from "next"

export const metadata:Metadata = {
    title: "Home | CTF Portfolio",
    description: "A look at my research and write-ups.",
}


export default function Page() {
  return (
    <>
      <Welcome />
      <AboutSection />
    </>
  )
}
