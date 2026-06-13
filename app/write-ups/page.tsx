import ReportsGrid from "@/components/Write-Ups/ReportsGrid";
import { getAllReports } from "@/lib/reports";

/**
 * Write-Ups listing page.
 *
 * Renders the grid of all available reports/write-ups.
 *
 * Note: `pt-24 sm:pt-28` offsets the content below the fixed
 * `NavigationBar` (defined in the root layout) to prevent overlap
 * with the page heading and top of the grid.
 */
export default async function Page() {
    // Fetch all reports at build/request time (server component)
    const reports = getAllReports()

    return (
        <main className="pt-24 sm:pt-28">
            <ReportsGrid reports={reports} />
        </main>
    )
}