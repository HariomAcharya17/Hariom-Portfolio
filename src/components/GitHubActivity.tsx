import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Github, ExternalLink } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
}

export default function GitHubActivity() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        // Fetch real contribution data from public wrapper API for HariomAcharya17
        const res = await fetch("https://github-contributions-api.jmondi.org/v1/HariomAcharya17");
        if (!res.ok) {
          throw new Error("Failed to fetch GitHub contribution data");
        }
        const data = await res.json();
        if (data && Array.isArray(data.contributions)) {
          const formatted: ContributionDay[] = data.contributions.map((c: any) => ({
            date: c.date,
            count: c.count || 0,
          }));
          setContributions(formatted);
        } else {
          setError(true);
        }
      } catch (err) {
        console.warn("GitHub contribution API fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (error) {
    // Hide gracefully if API fails per requirements
    return null;
  }

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 md:p-8 rounded-2xl border border-border bg-layer/40 shadow-sm">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4 select-none">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Github size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground">
              Live GitHub Activity
            </h3>
            <p className="text-xs text-secondary_text">
              Real-time contribution commit stream
            </p>
          </div>
        </div>

        <a
          href="https://github.com/HariomAcharya17"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          aria-label="View Hariom's GitHub Profile"
        >
          <span>@HariomAcharya17</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {loading ? (
        <div className="h-32 w-full animate-pulse rounded-xl bg-border/40 flex items-center justify-center text-xs text-secondary_text">
          Loading GitHub contributions...
        </div>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[650px]">
            <CalendarHeatmap
              startDate={oneYearAgo}
              endDate={today}
              values={contributions}
              classForValue={(value) => {
                if (!value || value.count === 0) {
                  return "color-empty";
                }
                if (value.count < 3) return "color-scale-1";
                if (value.count < 6) return "color-scale-2";
                if (value.count < 10) return "color-scale-3";
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
      )}
    </div>
  );
}
