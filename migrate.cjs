const fs = require('fs');
const path = require('path');

const SOURCE_DIR = '/Users/kieranpritchard/Documents/Coding Projects/CTF-Write-Ups/Contents/';
const REPORTS_DIR = path.join(__dirname, 'content', 'reports');
const IMAGES_DIR = path.join(__dirname, 'public', 'images');

// Ensure output directories exist
if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 1. Delete old mock reports
const oldFiles = fs.readdirSync(REPORTS_DIR);
for (const file of oldFiles) {
    if (file.endsWith('.md')) {
        fs.unlinkSync(path.join(REPORTS_DIR, file));
    }
}
console.log('Cleaned up old reports.');

// 2. Process source folders
const folders = fs.readdirSync(SOURCE_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

// We want to space dates out within 2025
const ONE_DAY = 24 * 60 * 60 * 1000;
let currentDate = new Date('2025-01-05').getTime();
const daysBetween = Math.floor(350 / Math.max(folders.length, 1));

for (const folder of folders) {
    const sourceFolder = path.join(SOURCE_DIR, folder);
    const readmePath = path.join(sourceFolder, 'README.md');
    
    if (!fs.existsSync(readmePath)) {
        console.log(`No README found in ${folder}, skipping.`);
        continue;
    }

    let content = fs.readFileSync(readmePath, 'utf-8');

    // Strip Emojis globally
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F910}-\u{1F96B}\u{1F980}-\u{1F9E0}]/gu;
    content = content.replace(emojiRegex, '');

    // Extract info (case-insensitive)
    const titleMatch = content.match(/Challenge Name:\s*(.*)/i);
    let title = titleMatch ? titleMatch[1].trim() : folder.replace(/_/g, ' ');
    title = title.replace(/\*/g, '').trim();
    
    const categoryMatch = content.match(/Category:\s*(.*)/i);
    let category = categoryMatch ? categoryMatch[1].trim() : 'other';
    category = category.replace(/\*/g, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const allowed = ['web-application', 'linux', 'windows', 'password-cracking', 'database-exploitation', 'osint', 'cryptography'];
    if (!allowed.includes(category)) {
        if (category.includes('web')) category = 'web-application';
        else if (category.includes('linux')) category = 'linux';
        else if (category.includes('windows')) category = 'windows';
        else if (category.includes('password') || category.includes('crack')) category = 'password-cracking';
        else if (category.includes('database') || category.includes('sql')) category = 'database-exploitation';
        else if (category.includes('osint')) category = 'osint';
        else if (category.includes('crypto')) category = 'cryptography';
        else category = 'linux'; // fallback
    }

    // Create slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Extract Challenge Description text for the frontmatter description field
    const descriptionMatch = content.match(/#\s*Challenge Description\s*\n+([\s\S]*?)(?=\n#)/i);
    const description = descriptionMatch
        ? descriptionMatch[1].trim().replace(/\n+/g, ' ').replace(/\*/g, '').substring(0, 200)
        : `A complete walkthrough and solution for the ${title} CTF challenge.`;

    // Clean up Markdown formatting
    // Remove "Challenge Info" block
    content = content.replace(/#\s*Challenge Info[\s\S]*?(?=#\s*Challenge Description)/i, '');


    // Format Date
    const d = new Date(currentDate);
    const dateString = d.toISOString().split('T')[0];
    currentDate += (daysBetween * ONE_DAY); // Increment by calculated days
    
    // Create images folder
    const targetImageDir = path.join(IMAGES_DIR, slug);
    if (!fs.existsSync(targetImageDir)) {
        fs.mkdirSync(targetImageDir, { recursive: true });
    }

    // Process images
    const files = fs.readdirSync(sourceFolder);
    for (const file of files) {
        if (/\.(png|jpg|jpeg|gif)$/i.test(file)) {
            const sourcePath = path.join(sourceFolder, file);
            const targetPath = path.join(targetImageDir, file);
            fs.copyFileSync(sourcePath, targetPath);

            const localPath = `/images/${slug}/${file}`;

            // Replace GitHub blob URLs in <img src="..."> tags (any path before filename)
            const regexImgTag = new RegExp(`src="https://github\.com/[^"]+/${file}"`, 'gi');
            content = content.replace(regexImgTag, `src="${localPath}"`);

            // Replace GitHub blob URLs in markdown image syntax ![alt](url)
            const regexMdImage = new RegExp(`\\]\\(https://github\.com/[^)]+/${file}\\)`, 'gi');
            content = content.replace(regexMdImage, `](${localPath})`);

            // Replace bare relative src= references
            const regexRelative = new RegExp(`src="${file}"`, 'gi');
            content = content.replace(regexRelative, `src="${localPath}"`);
        }
    }

    // Wrap Screenshots in Carousel
    const screenshotsRegex = /#\s*Screenshots \(Optional\)([\s\S]*)/i;
    const match = content.match(screenshotsRegex);
    if (match) {
        const imagesBlock = match[1].trim();
        content = content.replace(screenshotsRegex, `\n\n<carousel>\n${imagesBlock}\n</carousel>\n`);
    }

    // Generate Frontmatter
    const frontmatter = `---
title: "${title}"
slug: "${slug}"
category: "${category}"
description: "${description}"
date: "${dateString}"
---

`;

    // Write new markdown file
    const newMarkdownPath = path.join(REPORTS_DIR, `${slug}.md`);
    fs.writeFileSync(newMarkdownPath, frontmatter + content);
    console.log(`Migrated ${title} -> ${slug}.md`);
}

console.log('Migration complete!');
