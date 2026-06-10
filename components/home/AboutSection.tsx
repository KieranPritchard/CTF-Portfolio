export default function AboutSection() {
  return (
    <section className="min-h-screen relative overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-screen relative z-10">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-center px-8 sm:px-16 py-12 space-y-12">
          
          {/* About Me Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                About Me
              </h2>
              
              {/* Left-aligned decorative accent bar */}
              <div className="h-1.5 w-24 bg-primary mt-4 rounded-full" />
            </div>
            
            <p className="leading-relaxed max-w-xl">
              I am a [Cybersecurity Student / Security Researcher / Application
              Security Analyst] dedicated to breaking systems down to understand
              exactly how to secure them. My journey in security is driven by an
              intense curiosity about [mention a specific interest, e.g., binary
              exploitation, cloud security, web vulnerabilities] and a passion for
              continuous learning.
            </p>
            <p className="leading-relaxed max-w-xl">
              Beyond just finding bugs, I believe in the power of clear
              documentation. I build labs, compete in CTFs, and publish my
              methodologies here to bridge the gap between complex exploits and
              actionable security insights.
            </p>
          </div>

          {/* Technical Arsenal Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Technical Arsenal
              </h2>

              {/* Left-aligned decorative accent bar */}
              <div className="h-1.5 w-24 bg-primary mt-4 rounded-full" />
            </div>
            
            <ul className="list-disc list-inside space-y-2 max-w-xl">
              <li>
                <span className="font-semibold">Languages:</span> [e.g., Python, Bash, C, Go]
              </li>
              <li>
                <span className="font-semibold">Tools & Platforms:</span> [e.g., Burp Suite, Wireshark, Metasploit, Linux]
              </li>
              <li>
                <span className="font-semibold">Areas of Focus:</span> [e.g., Pentesting, Threat Hunting, Source Code Review]
              </li>
            </ul>
          </div>

          {/* Footer/Call to Action text */}
          <div className="max-w-xl">
            <p>
              When I'm not at the terminal, you can usually find me [insert a brief
              hobby, e.g., tweaking my homelab, brewing espresso, or hiking].
            </p>
            <p className="font-medium">
              [Let's connect on LinkedIn] or check out my latest write-ups above!
            </p>
          </div>
        </div>

        {/* Right Column: Visual Placeholders */}
        <div className="flex flex-col justify-center p-8 sm:p-16 relative">
          {/* Main Large Center/Right Placeholder Box */}
          <div className="w-full aspect-4/5 max-w-md bg-gray-300 self-center md:self-end shadow-2xl" />
        </div>

      </div>
    </section>
  );
}