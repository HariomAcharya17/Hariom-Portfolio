import { useEffect, useState, useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Flame,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  FolderGit2,
  Users,
  Star,
  Activity,
  Sparkles,
  Calendar as CalendarIcon,
  RefreshCw
} from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
}

interface RepositoryNode {
  name: string;
  description?: string | null;
  url: string;
  stargazerCount: number;
  pushedAt: string;
  primaryLanguage?: {
    name: string;
    color: string;
  } | null;
}

interface GitHubActivityResponse {
  user?: {
    name: string;
    login: string;
    avatarUrl: string;
    bio: string;
    followers: number;
    following: number;
  };
  stats?: {
    totalContributions: number;
    commits: number;
    pullRequests: number;
    issues: number;
    repositories: number;
  };
  days?: ContributionDay[];
  repositories?: RepositoryNode[];
  error?: string;
}

export default function GitHubActivityPage() {
  const [data, setData] = useState<GitHubActivityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [yearOffset, setYearOffset] = useState(0); // 0 = current 12-month window, 1 = 1 year ago, etc.

  // Compute date range for query
  const { fromStr, toStr, startDate, endDate } = useMemo(() => {
    const end = new Date();
    end.setFullYear(end.getFullYear() - yearOffset);

    const start = new Date(end);
    start.setFullYear(start.getFullYear() - 1);

    const fromS = start.toISOString().split("T")[0];
    const toS = end.toISOString().split("T")[0];

    return {
      fromStr: fromS,
      toStr: toS,
      startDate: start,
      endDate: end
    };
  }, [yearOffset]);

  useEffect(() => {
    document.title = "GitHub Activity & Coding Dashboard | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Live GitHub commit activity, contribution heatmap, repository breakdown, and coding metrics for Hariom Acharya."
      );
    }

    let isMounted = true;

    const fetchActivity = async () => {
      try {
        setLoading(true);
        const url = `/api/github-activity?from=${fromStr}&to=${toStr}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const json: GitHubActivityResponse = await res.json();
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

    fetchActivity();

    return () => {
      isMounted = false;
    };
  }, [fromStr, toStr]);

  // Active Streak calculation based on fetched days
  const streakCount = useMemo(() => {
    if (!data?.days || data.days.length === 0) return 0;
    const sortedDays = [...data.days].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    for (const d of sortedDays) {
      if (d.count > 0) {
        streak++;
      } else if (streak > 0) {
        break; // Streak broke
      }
    }
    return streak;
  }, [data]);

  const username = data?.user?.login || "HariomAcharya17";

  return (
    <div className="pt-20 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-10">

        {/* SECTION A: PAGE HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Activity size={14} /> Real-Time Developer Dashboard
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              GitHub Activity
            </h1>
            <p className="text-xs md:text-sm text-secondary_text font-mono mt-1">
              Live commit history, contribution heatmaps, and recently active repositories from GitHub's GraphQL API.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
            >
              <Github size={16} />
              <span>@github.com/{username}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* SECTION B: COMPACT PROFILE SUMMARY STRIP */}
        <div className="carbon-card p-5 md:p-6 rounded-3xl border border-border bg-layer/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={data?.user?.avatarUrl || "https://github.com/github.png"}
              alt={data?.user?.name || "Hariom Acharya"}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-border object-cover bg-background shadow-sm"
            />
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                <span>{data?.user?.name || "Hariom Acharya"}</span>
                <span className="text-xs font-mono font-normal text-secondary_text">
                  (@{username})
                </span>
              </h2>
              <p className="text-xs md:text-sm text-secondary_text max-w-xl">
                {data?.user?.bio || "Full-Stack Web & Cloud Developer building AI-integrated platforms and cloud systems."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono shrink-0 bg-background/60 p-3.5 rounded-2xl border border-border">
            <div className="flex items-center gap-1.5 text-foreground">
              <Users size={15} className="text-purple-500" />
              <span><strong className="font-bold">{data?.user?.followers || 0}</strong> Followers</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1.5 text-foreground">
              <span><strong className="font-bold">{data?.user?.following || 0}</strong> Following</span>
            </div>
          </div>
        </div>

        {/* SECTION C: MAIN CONTRIBUTION HEATMAP BOARD */}
        <div className="carbon-card p-5 md:p-8 rounded-3xl border border-border bg-background shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-4 select-none">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <CalendarIcon size={18} className="text-purple-500" /> Contribution Activity
              </h2>
              <p className="text-xs text-secondary_text font-mono mt-0.5">
                {data?.stats?.totalContributions || 0} contributions in the selected 12-month window
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setYearOffset((prev) => prev + 1)}
                className="p-2 rounded-xl border border-border bg-layer hover:bg-border transition-colors text-foreground text-xs flex items-center gap-1 font-mono"
                title="Previous Year Activity"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Older Period</span>
              </button>

              {yearOffset > 0 && (
                <button
                  onClick={() => setYearOffset(0)}
                  className="px-3 py-1.5 rounded-xl border border-border bg-layer hover:bg-border transition-colors text-xs font-mono font-semibold text-primary"
                >
                  Current
                </button>
              )}

              <button
                onClick={() => setYearOffset((prev) => Math.max(0, prev - 1))}
                disabled={yearOffset === 0}
                className={`p-2 rounded-xl border border-border transition-colors text-xs flex items-center gap-1 font-mono ${
                  yearOffset === 0
                    ? "opacity-40 cursor-not-allowed bg-layer text-secondary_text"
                    : "bg-layer hover:bg-border text-foreground"
                }`}
                title="Newer Activity"
              >
                <span className="hidden sm:inline">Newer Period</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="h-48 w-full animate-pulse rounded-2xl bg-border/40 flex items-center justify-center text-xs text-secondary_text font-mono">
              Fetching GitHub contribution matrix from GraphQL API...
            </div>
          ) : data?.error || !data?.days || data.days.length === 0 ? (
            <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20 text-xs text-secondary_text flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-purple-500 shrink-0" />
                <span>GitHub activity unavailable right now.</span>
              </div>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>View on GitHub</span>
                <ExternalLink size={13} />
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto pb-2 select-none">
                <div className="min-w-[680px]">
                  <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={data.days}
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

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-secondary_text font-mono select-none pt-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
                  <Flame size={16} />
                  <span>{streakCount}-Day Active Contribution Streak</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-[3px] bg-[#161b22] border border-white/10 dark:block hidden" title="0" />
                    <span className="w-3.5 h-3.5 rounded-[3px] bg-[#f3e8ff] border border-[#d8b4fe] dark:hidden block" title="0" />
                    <span className="w-3.5 h-3.5 rounded-[3px] bg-[#d8b4fe]" title="1" />
                    <span className="w-3.5 h-3.5 rounded-[3px] bg-[#c084fc]" title="2-3" />
                    <span className="w-3.5 h-3.5 rounded-[3px] bg-[#a855f7]" title="4-6" />
                    <span className="w-3.5 h-3.5 rounded-[3px] bg-[#7e22ce]" title="7+" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION D: STATS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-border bg-layer/40 shadow-sm flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center justify-between">
              Total Commits <GitCommit size={16} />
            </span>
            <span className="text-3xl md:text-4xl font-bold text-foreground">
              {data?.stats?.commits || 0}
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-layer/40 shadow-sm flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Pull Requests <GitPullRequest size={16} />
            </span>
            <span className="text-3xl md:text-4xl font-bold text-foreground">
              {data?.stats?.pullRequests || 0}
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-layer/40 shadow-sm flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              Total Activity <Activity size={16} />
            </span>
            <span className="text-3xl md:text-4xl font-bold text-foreground">
              {data?.stats?.totalContributions || 0}
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-layer/40 shadow-sm flex flex-col justify-between space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center justify-between">
              Repositories <FolderGit2 size={16} />
            </span>
            <span className="text-3xl md:text-4xl font-bold text-foreground">
              {data?.stats?.repositories || (data?.repositories?.length || 0)}
            </span>
          </div>
        </div>

        {/* SECTION E: RECENTLY ACTIVE REPOSITORIES GRID */}
        <div className="p-6 md:p-8 rounded-3xl border border-border bg-layer/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-2">
              <FolderGit2 size={20} className="text-purple-500" />
              <h2 className="text-xl font-bold text-foreground">
                Recently Pushed Repositories
              </h2>
            </div>
            <a
              href={`https://github.com/${username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary_text hover:text-primary transition-colors flex items-center gap-1 font-mono"
            >
              <span>View All Repos</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-36 rounded-2xl bg-border/40 animate-pulse" />
              ))}
            </div>
          ) : !data?.repositories || data.repositories.length === 0 ? (
            <div className="p-8 text-center text-xs text-secondary_text border border-dashed border-border rounded-2xl">
              No recent repositories returned from GitHub API.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.repositories.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl border border-border bg-background hover:bg-layer/50 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </h3>
                      <ExternalLink size={14} className="text-secondary_text group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-xs text-secondary_text line-clamp-2 leading-relaxed">
                      {repo.description || "Public repository for web, cloud, and engineering projects."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-border/40 text-secondary_text">
                    {repo.primaryLanguage ? (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: repo.primaryLanguage.color || "#a855f7" }}
                        />
                        <span>{repo.primaryLanguage.name}</span>
                      </div>
                    ) : (
                      <span>Code</span>
                    )}

                    <div className="flex items-center gap-1">
                      <Star size={13} className="text-amber-500" />
                      <span>{repo.stargazerCount}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
