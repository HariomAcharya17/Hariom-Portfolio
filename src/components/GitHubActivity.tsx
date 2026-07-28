import { useEffect, useState, useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Flame,
  AlertCircle
} from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
}

interface GitHubApiResponse {
  username?: string;
  totalContributions?: number;
  days?: ContributionDay[];
  error?: string;
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [yearOffset, setYearOffset] = useState(0); // 0 = current 12-month window, 1 = previous year, etc.

  useEffect(() => {
    let isMounted = true;

    const fetchContributions = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/github-contributions");
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const json: GitHubApiResponse = await res.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err: any) {
        if (isMounted) {
          setData({ error: err.message || "Failed to load GitHub activity" });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchContributions();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute date range based on yearOffset
  const { startDate, endDate, filteredDays } = useMemo(() => {
    const end = new Date();
    end.setFullYear(end.getFullYear() - yearOffset);

    const start = new Date(end);
    start.setFullYear(start.getFullYear() - 1);

    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];

    const days = data?.days?.filter((d) => d.date >= startStr && d.date <= endStr) || [];

    return { startDate: start, endDate: end, filteredDays: days };
  }, [data, yearOffset]);

  // Compute total contributions in selected view range
  const rangeTotal = useMemo(() => {
    if (!filteredDays.length) return data?.totalContributions || 0;
    return filteredDays.reduce((sum, d) => sum + d.count, 0);
  }, [filteredDays, data]);

  const username = data?.username || "HariomAcharya17";

  return (
    <div className="space-y-4">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/50 pb-4 select-none">
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Github size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-foreground">
                Live GitHub Activity
              </h3>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary_text hover:text-primary transition-colors flex items-center gap-1 text-xs"
                title="View GitHub Profile"
              >
                <span>github.com/{username}</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-xs text-secondary_text font-mono mt-0.5">
              {rangeTotal} total contributions in the selected period
            </p>
          </div>
        </div>

        {/* Date Range Offset Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setYearOffset((prev) => prev + 1)}
            className="p-1.5 rounded-xl border border-border bg-layer hover:bg-border transition-colors text-foreground text-xs flex items-center gap-1 font-mono"
            title="Previous Year Activity"
          >
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">Older</span>
          </button>

          {yearOffset > 0 && (
            <button
              onClick={() => setYearOffset(0)}
              className="px-2.5 py-1 rounded-xl border border-border bg-layer hover:bg-border transition-colors text-xs font-mono font-semibold text-primary"
            >
              Current
            </button>
          )}

          <button
            onClick={() => setYearOffset((prev) => Math.max(0, prev - 1))}
            disabled={yearOffset === 0}
            className={`p-1.5 rounded-xl border border-border transition-colors text-xs flex items-center gap-1 font-mono ${
              yearOffset === 0
                ? "opacity-40 cursor-not-allowed bg-layer text-secondary_text"
                : "bg-layer hover:bg-border text-foreground"
            }`}
            title="Newer Activity"
          >
            <span className="hidden sm:inline">Newer</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Body State */}
      {loading ? (
        <div className="h-44 w-full animate-pulse rounded-2xl bg-border/40 flex items-center justify-center text-xs text-secondary_text font-mono">
          Loading live GitHub contributions from GraphQL API...
        </div>
      ) : data?.error || !data?.days || data.days.length === 0 ? (
        <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20 text-xs text-secondary_text flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-purple-500 shrink-0" />
            <span>GitHub activity unavailable right now.</span>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>View GitHub</span>
            <ExternalLink size={12} />
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto pb-2 select-none">
            <div className="min-w-[650px]">
              <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={filteredDays}
                classForValue={(value) => {
                  if (!value || value.count === 0) return "color-empty";
                  if (value.count === 1) return "color-scale-1";
                  if (value.count <= 3) return "color-scale-2";
                  if (value.count <= 6) return "color-scale-3";
                  return "color-scale-4";
                }}
                titleForValue={(value) => {
                  if (!value || !value.date) return "No contributions";
                  return `${value.date}: ${value.count} contribution${value.count === 1 ? "" : "s"}`;
                }}
                showWeekdayLabels={true}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-xs text-secondary_text font-mono select-none pt-1">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-[3px] bg-[#161b22] border border-white/10 dark:block hidden" title="0 contributions" />
              <span className="w-3 h-3 rounded-[3px] bg-[#f3e8ff] border border-[#d8b4fe] dark:hidden block" title="0 contributions" />
              <span className="w-3 h-3 rounded-[3px] bg-[#d8b4fe]" title="1 contribution" />
              <span className="w-3 h-3 rounded-[3px] bg-[#c084fc]" title="2-3 contributions" />
              <span className="w-3 h-3 rounded-[3px] bg-[#a855f7]" title="4-6 contributions" />
              <span className="w-3 h-3 rounded-[3px] bg-[#7e22ce]" title="7+ contributions" />
            </div>
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  );
}
