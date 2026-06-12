import ReportsGrid from "@/components/Write-Ups/ReportsGrid";
import { getAllReports } from "@/lib/reports";

export default async function Page() {
    const reports = getAllReports()
    
    return (
        <>
            <ReportsGrid reports={reports} />
        </>
    )
}
