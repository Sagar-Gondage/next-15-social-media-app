import TrendsSidebar from "@/components/TrendsSidebar";
import SearchResults from "./SearchResults";

export function generateMetadata({ searchParams: { q } }) {
    return { title: `Search results for "${q}"` };
}

export default function Page({ searchParams: { q } }) {
    return (
        <main className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <div className="rounded-2xl bg-card p-5 shadow-sm">
                    <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
                        {`Search results for "${q}"`}
                    </h1>
                </div>
                <SearchResults query={q} />
            </div>
            <TrendsSidebar />
        </main>
    );
}
