import { ContactForm } from "@/components/Contact/ContactForm"

export const metadata = {
    title: "Contact | CTF Portfolio",
    description: "Get in touch for collaborations, CTFs, or security discussions.",
}

export default function ContactPage() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 pt-28 sm:pt-32 pb-24 md:px-6 lg:px-8 min-h-screen">
            <header className="space-y-4 mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gradient-brand">
                    Contact
                </h1>
                <div className="h-1.5 w-24 gradient-accent rounded-full" />
            </header>

            <ContactForm />
        </div>
    )
}
