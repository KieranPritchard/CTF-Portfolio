import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllReports, getReportBySlug, getReportFileSlugs } from "@/lib/reports";
import { ReportArticleHeader } from "@/components/Write-Ups/ReportArticleHeader";
import { ReportBreadcrumbs } from "@/components/Write-Ups/ReportBreadcrumbs";
import { ReportMarkdown } from "@/components/Write-Ups/ReportMarkdown";

/**
 * 0.6px brand-gradient outline (#006fe0 -> #6826ea -> #2840d0), drawn by a masked ::before layer because a
 * CSS border cannot take a gradient. The mask uses longhand properties so it can only ever cut out the ring
 * and never fills the element. Takes up no space, so it never shifts layout. Set the strength with before:opacity-*.
 */
const gradientBorder: string =
  "relative before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[0.6px] before:bg-[linear-gradient(98.77deg,#006fe0,#6826ea,#2840d0)] before:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"

/**
 * The "More write-ups" panel: the filter-panel look from the Write-Ups page. 14px radius, a gradient outline at
 * about 33% strength, and a 12.5% black fill in dark mode (the card colour in light mode).
 */
const relatedPanel: string =
  `${gradientBorder} before:opacity-[0.33] mt-16 rounded-[14px] bg-card p-6 dark:bg-[rgba(10,10,10,0.125)]`

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
        <aside className={relatedPanel}>
          <h2 className="text-lg font-bold text-foreground dark:text-[#fafafa]">More write-ups</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground dark:text-[#9296b1]">
            {related.map((item) => (
              <li key={item.slug} className="flex items-center gap-2">
                {/* Bullet marker */}
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary dark:bg-[#8b86ff]" aria-hidden="true" />
                <Link className="font-medium text-foreground transition-colors hover:text-primary hover:underline dark:text-[#fafafa] dark:hover:text-[#8b86ff]" href={`/write-ups/${item.slug}`}>
                  {item.title}
                </Link>
                {/* Date hidden on small screens to save space */}
                <span className="ml-auto hidden font-mono text-xs sm:inline-block">
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