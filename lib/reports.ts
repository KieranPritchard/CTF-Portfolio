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