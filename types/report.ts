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