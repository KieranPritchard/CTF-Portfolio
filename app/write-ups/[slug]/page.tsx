import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllReports, getReportBySlug, getReportFileSlugs } from "@/lib/reports";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Home } from "lucide-react";
import { ReportArticleHeader } from "@/components/Write-Ups/ReportArticleHeader";
import { ReportBreadcrumbs } from "@/components/Write-Ups/ReportBreadcrumbs";
import { ReportMarkdown } from "@/components/Write-Ups/ReportMarkdown";

// Function to generate static parameters
export async function generateStaticParams() {
    const slugs = getReportFileSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

// Generates metadata
export async function generateMetadata({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
    const { slug } = await params;
    const report = getReportBySlug(slug);

    if (!report) {
        return {};
    }

    return {
        title: `${report.title} | Write-Ups`,
        description: report.description,
    };
}

// Function for the page
export default async function Page({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
    const { slug } = await params;
    const report = getReportBySlug(slug);

    // Return 404 page if no report matches the slug
    if (!report) {
        notFound();
    }

    // Gets the related reports 
    const related = getAllReports().filter((item) => item.slug !== report.slug).slice(0, 3);

    // Splits out the markdown content from the rest of the report metadata
    const { content, ...summary } = report;

    return (
        // pt-24 pb-20 provides clearance below the fixed NavigationBar in the root layout
        <div className="mx-auto w-full max-w-3xl px-4 pt-24 pb-20 md:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <ReportBreadcrumbs
                className="mb-8"
                items={[
                    { label: "Home", href: "/" },
                    { label: "Write-Ups", href: "/write-ups" },
                    { label: summary.title },
                ]}
            />

            {/* Article Header (Animated) */}
            <ReportArticleHeader report={summary} className="mb-14" />

            {/* Markdown Content Area */}
            <ReportMarkdown content={content} />

            {/* Related Write-Ups */}
            {related.length ? (
                <aside className="mt-16 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-bold">More write-ups</h2>
                    <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                        {related.map((item) => (
                            <li key={item.slug} className="flex items-center gap-2">
                                {/* Bullet marker */}
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <Link className="text-foreground font-medium hover:text-primary hover:underline transition-colors" href={`/write-ups/${item.slug}`}>
                                    {item.title}
                                </Link>
                                {/* Date hidden on small screens to save space */}
                                <span className="ml-auto text-xs font-mono hidden sm:inline-block">
                                    {item.date}
                                </span>
                            </li>
                        ))}
                    </ul>
                </aside>
            ) : null}
        </div>
    );
}