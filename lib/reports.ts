import "server-only"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { ReportCategory, ReportDoc, ReportSummary } from "@/types/report"

// Contains the path to the directory storing the content files
const contentDir = path.join(process.cwd(), "content/reports")

// Function to check if the project category is correct
function isReportCategory(value: unknown): value is ReportCategory {
    return value === "web-application" || value ===  "linux" || value ===  "windows" || value ===  "password-cracking" || value ===  "database-exploitation" || value ===  "osint" || value ===  "cryptography"
}

// Function to normalise frontmatter
function normalizeFrontmatter(data: Record<string, unknown>): ReportDoc | null {
    // Extract and validate basic fields
    const title = typeof data.title === "string" ? data.title : null
    const slug = typeof data.slug === "string" ? data.slug : null
    const category = data.category
    const description = typeof data.description === "string" ? data.description : null
    const date = typeof data.date === "string" ? data.date : null

    // Checks if all the mandatory fields are present
    if (!title || !slug || !isReportCategory(category) || !description || !date) {
        return null
    }

    // Returns the frontmatter
    return {
        title,
        slug,
        category,
        description,
        date,
        content: "",
    }
}

// Function to get report file slugs
export function getReportFileSlugs(): string[] {
    // Checks if the file exists
    if (!fs.existsSync(contentDir)) {
        return []
    }

    // Returns the file stream
    return fs
        .readdirSync(contentDir)
        .filter((file) => file.endsWith(".md"))
        .map((file) => path.basename(file, ".md"))
}

// Function to get the report by slug
export function getReportBySlug(slug: string): ReportDoc | null {
    
    // Gets the full path
    const fullPath = path.join(contentDir, `${slug}.md`)
    
    // Checks if the file does not exist
    if (!fs.existsSync(fullPath)) {
        return null
    }

    // Read and parse markdown file
    const raw = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(raw)
    
    // Normalize and validate the frontmatter
    const base = normalizeFrontmatter(data as Record<string, unknown>)
    
    // Checks if there is no the base
    if (!base) {
        return null
    }

    // Security check: ensure the slug in frontmatter matches the requested slug
    if (base.slug !== slug) {
        return null
    }

    return { ...base, content }
}

// Function to get report summary from document
function reportSummaryFromDoc(doc: ReportDoc): ReportSummary {
    const { title, slug, category, description, date } = doc
    return { title, slug, category, description, date }
}

// Function to get all of the reports
export function getAllReports(): ReportSummary[] {
    // Gets all of the items
    const items = getReportFileSlugs()
        .map((fileSlug) => getReportBySlug(fileSlug))
        .filter((doc): doc is ReportDoc => doc !== null)
        .map(reportSummaryFromDoc)

    // Sort by date: newest first
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

