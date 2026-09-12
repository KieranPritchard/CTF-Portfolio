import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

// Stores the content directory
const CONTENT_DIR = "content/reports"

// Stores the required fields
const REQUIRED_FIELDS = [
  "title",
  "slug",
  "category",
  "description",
  "date",
]

// Function to get the Markdown files from a directory
function getMarkdownFiles(dir) {
  // Builds an array of paths
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    // Creates the full path
    const fullPath = path.join(dir, entry.name)

    // Runs the functions on subdirectories
    if (entry.isDirectory()) return getMarkdownFiles(fullPath)

    // Validates the paths
    if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
      return [fullPath]
    return []
  })
}

// Read and parse frontmatter from a project markdown file
function validateFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8")
  const { data } = matter(raw)
  const errors = []

  // Check required fields exist and aren't empty
  for (const field of REQUIRED_FIELDS) {
    if (!(field in data) || data[field] === "" || data[field] == null) {
      errors.push(`missing or empty "${field}"`)
    }
  }

  // Enforce kebab-case slugs to match URL routing
  if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push(`"slug" must be kebab-case: ${data.slug}`)
  }

  // Reject unparseable dates
  if (data.date && isNaN(Date.parse(data.date))) {
    errors.push(`"date" is not a valid date: ${data.date}`)
  }

  // Validate link, github, coverImage as well-formed URLs
  for (const urlField of ["link", "github"]) {
    if (data[urlField]) {
      try {
        // Skips if link or github are blank
        if (
          (urlField.startsWith("link") && data[urlField] === "#") ||
          (urlField.startsWith("github") && data[urlField] === "#")
        ) {
          continue
        }

        new URL(data[urlField])
      } catch {
        errors.push(`"${urlField}" is not a valid URL: ${data[urlField]}`)
      }
    }
  }

  // Restrict category to known values
  const VALID_CATEGORIES = [
    "web-application",
    "linux",
    "windows",
    "password-cracking",
    "database-exploitation",
    "osint",
    "cryptography",
  ] // adjust to your actual categories
  if (data.category && !VALID_CATEGORIES.includes(data.category)) {
    errors.push(`"category" is not a recognized value: ${data.category}`)
  }

  return errors
}

function main() {
  // Gets all of the files
  const files = getMarkdownFiles(CONTENT_DIR)

  // Stores whether there are errors
  let hasErrors = false

  // Loops over the files and validates them
  for (const file of files) {
    const errors = validateFile(file)
    if (errors.length) {
      hasErrors = true
      console.error(`\n❌ ${file}`)
      errors.forEach((e) => console.error(`   - ${e}`))
    }
  }

  if (hasErrors) {
    console.error("\nFrontmatter validation failed.")
    process.exit(1)
  } else {
    console.log(`✅ All ${files.length} files passed frontmatter validation.`)
  }
}

// Runs the script
main()
