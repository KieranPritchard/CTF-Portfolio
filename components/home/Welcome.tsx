import LinkButton from "../Main/LinkButton";

function Welcome() {
    return (
        <section className="flex flex-col min-h-screen px-6 sm:px-12 md:px-16 lg:px-24 w-full bg-background text-foreground pt-16">
            <div className="flex-1 flex flex-col items-center justify-between max-w-5xl w-full mx-auto">
                
                {/* Top/Middle Content Wrapper */}
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                    
                    {/* Header: items-start aligns the title and bar to the left */}
                    <header className="flex flex-col items-start max-w-3xl w-full">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-left">
                            Research & Write-Ups
                        </h1>
                        
                        {/* Left-aligned decorative accent bar */}
                        <div className="h-1.5 w-24 bg-primary mt-4 rounded-full" />
                        
                        {/* Centered Paragraph: text-center handles text, mx-auto centers the container block */}
                        <p className="text-muted-foreground text-center text-base sm:text-md md:text-lg max-w-xl lg:max-w-2xl leading-relaxed mt-4 mx-auto">
                            Dive into my latest CTF walkthroughs and security research. Built to document my 
                            technical methodologies, this portfolio offers a transparent look into my 
                            problem-solving process and hands-on cybersecurity skills.
                        </p>
                    </header>

                    {/* Call to Action Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <LinkButton link="" text="Learn More" size="lg"/>
                        <LinkButton link="" text="View Research" size="lg" variant={"secondary"}/>
                    </div>
                </div>

                {/* Image Container Box - Justified to the bottom */}
                <div className="w-full max-w-4xl aspect-4/1 bg-zinc-800/50 border border-zinc-800 overflow-hidden flex items-center justify-center text-muted-foreground">
                    <span className="text-sm tracking-wider uppercase opacity-50">Project Showcase / Image Placeholder</span>
                </div>
            </div>
        </section>
    );
}

export default Welcome;