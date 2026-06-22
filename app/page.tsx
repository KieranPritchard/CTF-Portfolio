import AboutSection from "@/components/Home/AboutSection"
import Welcome from "@/components/Home/Welcome"

export const metadata = {
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
