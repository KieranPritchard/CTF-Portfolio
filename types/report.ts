// represents the categories a project can belong to
export type ReportCategory = "web-application" | "linux" | "windows" | "password-cracking" | "database-exploitation" | "osint" | "cryptography"

// Report frontmatter extracted from markdown file
export type ReportFrontmatter = {
    title: string
    slug: string
    category: ReportCategory
    description: string
    date: string
    coverImage?: string
    coverAlt?: string
}

// Exports the project summary
export type ReportSummary = ReportFrontmatter

export type ReportDoc = ReportFrontmatter & {
    /** The full markdown content of the project page. */
    content: string
}
