import { useEffect, useState, useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  Code,
  Search,
  ExternalLink,
  Flame,
  CheckCircle2,
  AlertCircle,
  Filter,
  ArrowUpDown,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  BarChart2,
  Clock,
  Tag,
  FileText
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import TechBadge from "@/components/ui/TechBadge";

export interface LeetCodeProblem {
  id: string;
  title: string;
  slug?: string | null;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  topic?: string[] | string | null;
  language: string;
  date_solved: string;
  time_taken_minutes?: number | null;
  notes?: string | null;
  leetcode_url?: string | null;
  created_at: string;
}

// Safely normalize topic values into a string array
const parseTopics = (topicVal: any): string[] => {
  if (!topicVal) return [];
  if (Array.isArray(topicVal)) return topicVal.map(String);
  if (typeof topicVal === "string") {
    const trimmed = topicVal.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {
        // Fallback
      }
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

// Local date string to YYYY-MM-DD Date object without UTC timezone shifts
const parseDateString = (dStr: string): Date => {
  if (!dStr) return new Date();
  const parts = dStr.split("-");
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return new Date(y, m, d);
  }
  return new Date(dStr);
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const FULL_MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function LeetCodePage() {
  const [problems, setProblems] = useState<LeetCodeProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // View Mode: 'grid' (Month Grid Calendar like reference image) or 'heatmap' (GitHub Heatmap)
  const [viewMode, setViewMode] = useState<"grid" | "heatmap">("grid");

  // Selected Month Grid Date (defaults to current date e.g. July 2026)
  const [gridDate, setGridDate] = useState<Date>(new Date());

  // Problem Modal state
  const [selectedProblem, setSelectedProblem] = useState<LeetCodeProblem | null>(null);
  const [selectedDayProblems, setSelectedDayProblems] = useState<{ date: string; items: LeetCodeProblem[] } | null>(null);

  // Filter States for Table
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [sortDesc, setSortDesc] = useState(true);

  // Heatmap Range Filters
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedMonth, setSelectedMonth] = useState<string>("All");

  useEffect(() => {
    document.title = "LeetCode Tracker | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Live LeetCode problem-solving tracker for Hariom Acharya. Explore solved algorithmic problems, difficulty breakdown, streak stats, and monthly calendar UI."
      );
    }

    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError(false);
        const { data, error: fetchError } = await supabase
          .from("leetcode_problems")
          .select("*")
          .order("date_solved", { ascending: false });

        if (fetchError) throw fetchError;
        if (data) setProblems(data as LeetCodeProblem[]);
      } catch (err) {
        console.warn("Supabase leetcode_problems fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // Map problems grouped by YYYY-MM-DD
  const problemsByDate = useMemo(() => {
    const map = new Map<string, LeetCodeProblem[]>();
    problems.forEach((p) => {
      if (!p.date_solved) return;
      const key = p.date_solved;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(p);
    });
    return map;
  }, [problems]);

  // Generate Month Grid Days array for selected gridDate
  const gridCells = useMemo(() => {
    const year = gridDate.getFullYear();
    const month = gridDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const cells: {
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      problems: LeetCodeProblem[];
    }[] = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const pDay = daysInPrevMonth - i;
      const pMonth = month === 0 ? 11 : month - 1;
      const pYear = month === 0 ? year - 1 : year;
      const dateStr = `${pYear}-${String(pMonth + 1).padStart(2, "0")}-${String(pDay).padStart(2, "0")}`;
      cells.push({
        dateStr,
        dayNumber: pDay,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        problems: problemsByDate.get(dateStr) || [],
      });
    }

    // Current month days
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        problems: problemsByDate.get(dateStr) || [],
      });
    }

    // Next month padding days to complete 35 or 42 grid cells
    const remaining = 35 - cells.length > 0 ? 35 - cells.length : (42 - cells.length > 0 ? 42 - cells.length : 0);
    for (let n = 1; n <= remaining; n++) {
      const nMonth = month === 11 ? 0 : month + 1;
      const nYear = month === 11 ? year + 1 : year;
      const dateStr = `${nYear}-${String(nMonth + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
      cells.push({
        dateStr,
        dayNumber: n,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        problems: problemsByDate.get(dateStr) || [],
      });
    }

    return cells;
  }, [gridDate, problemsByDate]);

  // Distinct Languages
  const languagesList = useMemo(() => {
    const set = new Set<string>();
    problems.forEach((p) => {
      if (p.language) set.add(p.language);
    });
    return Array.from(set).sort();
  }, [problems]);

  // Distinct Years
  const yearsList = useMemo(() => {
    const set = new Set<string>();
    problems.forEach((p) => {
      if (p.date_solved) {
        const d = parseDateString(p.date_solved);
        set.add(d.getFullYear().toString());
      }
    });
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [problems]);

  // Count Statistics
  const easyCount = useMemo(() => problems.filter((p) => p.difficulty?.toLowerCase() === "easy").length, [problems]);
  const mediumCount = useMemo(() => problems.filter((p) => p.difficulty?.toLowerCase() === "medium").length, [problems]);
  const hardCount = useMemo(() => problems.filter((p) => p.difficulty?.toLowerCase() === "hard").length, [problems]);

  // Active Streak calculation
  const streakCount = useMemo(() => {
    if (problems.length === 0) return 0;
    const sortedDates = Array.from(
      new Set(
        problems
          .map((p) => p.date_solved)
          .filter(Boolean)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      )
    );

    if (sortedDates.length === 0) return 0;

    let streak = 1;
    let curr = parseDateString(sortedDates[0]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffFromToday = Math.floor((today.getTime() - curr.getTime()) / (1000 * 3600 * 24));
    if (diffFromToday > 1) return 0;

    for (let i = 1; i < sortedDates.length; i++) {
      const prev = parseDateString(sortedDates[i]);
      const diff = Math.round((curr.getTime() - prev.getTime()) / (1000 * 3600 * 24));
      if (diff === 1) {
        streak++;
        curr = prev;
      } else if (diff > 1) {
        break;
      }
    }
    return streak;
  }, [problems]);

  // Heatmap values generator
  const heatmapValues = useMemo(() => {
    const counts: { [dateStr: string]: number } = {};
    problems.forEach((p) => {
      if (p.date_solved) {
        if (selectedYear !== "All") {
          const pYear = parseDateString(p.date_solved).getFullYear().toString();
          if (pYear !== selectedYear) return;
        }
        if (selectedMonth !== "All") {
          const pMonth = parseDateString(p.date_solved).getMonth().toString();
          if (pMonth !== selectedMonth) return;
        }
        counts[p.date_solved] = (counts[p.date_solved] || 0) + 1;
      }
    });

    return Object.keys(counts).map((date) => ({
      date,
      count: counts[date],
    }));
  }, [problems, selectedYear, selectedMonth]);

  const heatmapStartDate = useMemo(() => {
    if (selectedYear !== "All" && selectedMonth !== "All") {
      const y = parseInt(selectedYear, 10);
      const m = parseInt(selectedMonth, 10);
      return new Date(y, m, 1);
    }
    if (selectedYear !== "All") {
      return new Date(parseInt(selectedYear, 10), 0, 1);
    }
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d;
  }, [selectedYear, selectedMonth]);

  const heatmapEndDate = useMemo(() => {
    if (selectedYear !== "All" && selectedMonth !== "All") {
      const y = parseInt(selectedYear, 10);
      const m = parseInt(selectedMonth, 10);
      return new Date(y, m + 1, 0);
    }
    if (selectedYear !== "All") {
      return new Date(parseInt(selectedYear, 10), 11, 31);
    }
    return new Date();
  }, [selectedYear, selectedMonth]);

  // Filter & Search Problems for Table
  const filteredProblems = useMemo(() => {
    return problems
      .filter((p) => {
        if (
          difficultyFilter !== "All" &&
          p.difficulty?.toString().toLowerCase() !== difficultyFilter.toLowerCase()
        ) {
          return false;
        }
        if (
          languageFilter !== "All" &&
          p.language?.toString().toLowerCase() !== languageFilter.toLowerCase()
        ) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const titleMatch = p.title?.toLowerCase().includes(q);
          const topics = parseTopics(p.topic);
          const topicMatch = topics.some((t) => t.toLowerCase().includes(q));
          const langMatch = p.language?.toLowerCase().includes(q);
          const notesMatch = p.notes?.toLowerCase().includes(q);
          return titleMatch || topicMatch || langMatch || notesMatch;
        }
        return true;
      })
      .sort((a, b) => {
        const timeA = parseDateString(a.date_solved || a.created_at).getTime();
        const timeB = parseDateString(b.date_solved || b.created_at).getTime();
        return sortDesc ? timeB - timeA : timeA - timeB;
      });
  }, [problems, difficultyFilter, languageFilter, searchQuery, sortDesc]);

  // Pill badge color mapping matching the user's image UI design
  const getPillStyle = (difficulty: string) => {
    const diff = difficulty?.toLowerCase();
    if (diff === "easy") {
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/20";
    }
    if (diff === "medium") {
      return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/25 hover:bg-blue-500/20";
    }
    if (diff === "hard") {
      return "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/25 hover:bg-rose-500/20";
    }
    return "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25 hover:bg-purple-500/20";
  };

  return (
    <div className="pt-20 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-10">
        
        {/* HEADER */}
        <div className="border-b border-border/50 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Code size={14} /> Algorithmic Problem Solving
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            LeetCode Tracker
          </h1>
          <p className="text-secondary_text text-sm md:text-base max-w-2xl">
            Live database of solved LeetCode problems, interactive monthly calendar UI, difficulty analytics, and topic tags.
          </p>
        </div>

        {/* 1. CALENDAR CONTAINER WITH VIEW TOGGLE */}
        <div className="p-4 md:p-8 rounded-3xl border border-border bg-layer/40 shadow-sm space-y-6">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/50 pb-4 select-none">
            {/* Left: Summary Line & Streak */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
                <Flame size={22} />
              </div>
              <div>
                <h2 className="font-bold text-base text-foreground">
                  Solve Activity & Consistency
                </h2>
                <p className="text-xs text-secondary_text font-mono">
                  {problems.length} total problems solved · {streakCount}-day active streak
                </p>
              </div>
            </div>

            {/* Right: View Mode Toggle & Navigation */}
            <div className="flex flex-wrap items-center gap-3 text-xs w-full lg:w-auto justify-between lg:justify-end">
              
              {/* VIEW SWITCHER: MONTH GRID vs HEATMAP */}
              <div className="flex items-center p-1 rounded-xl bg-input border border-border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-background text-foreground shadow-sm font-semibold"
                      : "text-secondary_text hover:text-foreground"
                  }`}
                >
                  <Grid size={13} />
                  <span>Month Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("heatmap")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "heatmap"
                      ? "bg-background text-foreground shadow-sm font-semibold"
                      : "text-secondary_text hover:text-foreground"
                  }`}
                >
                  <BarChart2 size={13} />
                  <span>Heatmap</span>
                </button>
              </div>

              {/* MONTH GRID NAV CONTROLS */}
              {viewMode === "grid" ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGridDate(new Date(gridDate.getFullYear(), gridDate.getMonth() - 1, 1))}
                    className="p-1.5 rounded-lg border border-border bg-background hover:bg-layer transition-colors text-foreground"
                    title="Previous Month"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-bold font-mono text-sm px-2 text-foreground">
                    {FULL_MONTH_NAMES[gridDate.getMonth()]} {gridDate.getFullYear()}
                  </span>
                  <button
                    onClick={() => setGridDate(new Date(gridDate.getFullYear(), gridDate.getMonth() + 1, 1))}
                    className="p-1.5 rounded-lg border border-border bg-background hover:bg-layer transition-colors text-foreground"
                    title="Next Month"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={() => setGridDate(new Date())}
                    className="px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-layer transition-colors font-mono text-xs font-semibold text-primary"
                  >
                    Today
                  </button>
                </div>
              ) : (
                /* HEATMAP DROPDOWNS */
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-background border border-border px-2.5 py-1 rounded-xl">
                    <CalendarIcon size={13} className="text-secondary_text" />
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="bg-transparent text-foreground text-xs focus:outline-none cursor-pointer font-medium"
                    >
                      <option value="All">All Years</option>
                      {yearsList.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-background border border-border px-2.5 py-1 rounded-xl">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="bg-transparent text-foreground text-xs focus:outline-none cursor-pointer font-medium"
                    >
                      <option value="All">All Months</option>
                      {MONTH_NAMES.map((m, idx) => (
                        <option key={m} value={idx.toString()}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MAIN CALENDAR DISPLAY AREA */}
          {loading ? (
            <div className="h-48 w-full animate-pulse rounded-2xl bg-border/40 flex items-center justify-center text-xs text-secondary_text">
              Loading LeetCode activity from database...
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <AlertCircle size={16} />
              <span>Unable to connect to Supabase leetcode_problems table. Verify table existence and permissions.</span>
            </div>
          ) : viewMode === "grid" ? (
            
            /* MONTHLY GRID CALENDAR MATCHING REFERENCE IMAGE UI */
            <div className="overflow-x-auto select-none rounded-2xl border border-border bg-background shadow-sm">
              <div className="min-w-[700px]">
                
                {/* Weekday Header */}
                <div className="grid grid-cols-7 border-b border-border bg-layer/60 text-center font-mono text-xs font-bold text-secondary_text py-2.5 uppercase tracking-wider">
                  {WEEKDAY_NAMES.map((day) => (
                    <div key={day}>{day}</div>
                  ))}
                </div>

                {/* Day Cells Grid */}
                <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-border bg-background">
                  {gridCells.map((cell, idx) => (
                    <div
                      key={idx}
                      className={`min-h-[110px] p-2 flex flex-col justify-between transition-colors ${
                        cell.isCurrentMonth
                          ? "bg-background"
                          : "bg-layer/20 text-secondary_text/40"
                      }`}
                    >
                      {/* Top Header: Day Number */}
                      <div className="flex items-center justify-between mb-1.5">
                        {cell.isToday ? (
                          <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                            {cell.dayNumber}
                          </span>
                        ) : (
                          <span
                            className={`text-xs font-semibold font-mono ${
                              cell.isCurrentMonth ? "text-foreground" : "text-secondary_text/40"
                            }`}
                          >
                            {cell.dayNumber}
                          </span>
                        )}
                      </div>

                      {/* Problem Pills inside Day Cell */}
                      <div className="space-y-1.5 flex-1 overflow-hidden">
                        {cell.problems.slice(0, 2).map((prob) => (
                          <button
                            key={prob.id}
                            onClick={() => setSelectedProblem(prob)}
                            className={`w-full text-left px-2 py-1 rounded-lg text-[11px] font-medium flex items-center justify-between gap-1 transition-all ${getPillStyle(
                              prob.difficulty
                            )}`}
                            title={prob.title}
                          >
                            <span className="truncate max-w-[100px]">{prob.title}</span>
                            <span className="text-[9px] font-mono opacity-80 shrink-0 font-bold">
                              {prob.difficulty}
                            </span>
                          </button>
                        ))}

                        {/* Overflow +N more indicator */}
                        {cell.problems.length > 2 && (
                          <button
                            onClick={() =>
                              setSelectedDayProblems({
                                date: cell.dateStr,
                                items: cell.problems,
                              })
                            }
                            className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold hover:underline block pt-0.5"
                          >
                            {cell.problems.length - 2} more...
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ) : (

            /* GITHUB PURPLE SIGNUP HEATMAP VIEW */
            <div className="space-y-4">
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[650px]">
                  <CalendarHeatmap
                    startDate={heatmapStartDate}
                    endDate={heatmapEndDate}
                    values={heatmapValues}
                    classForValue={(value) => {
                      if (!value || value.count === 0) return "color-empty";
                      if (value.count === 1) return "color-scale-1";
                      if (value.count === 2) return "color-scale-2";
                      if (value.count < 5) return "color-scale-3";
                      return "color-scale-4";
                    }}
                    titleForValue={(value) => {
                      if (!value || !value.date) return "No solves logged";
                      return `${value.date}: ${value.count} problem${value.count === 1 ? "" : "s"} solved`;
                    }}
                    showWeekdayLabels={true}
                  />
                </div>
              </div>

              {/* INTENSITY LEGEND BELOW CALENDAR */}
              <div className="flex items-center justify-end gap-2 text-xs text-secondary_text font-mono select-none pt-2">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-[3px] bg-[#161b22] border border-white/10 dark:block hidden" title="0 solves" />
                  <span className="w-3 h-3 rounded-[3px] bg-[#f3e8ff] border border-[#d8b4fe] dark:hidden block" title="0 solves" />
                  <span className="w-3 h-3 rounded-[3px] bg-[#d8b4fe]" title="1 solve" />
                  <span className="w-3 h-3 rounded-[3px] bg-[#c084fc]" title="2 solves" />
                  <span className="w-3 h-3 rounded-[3px] bg-[#a855f7]" title="3-4 solves" />
                  <span className="w-3 h-3 rounded-[3px] bg-[#7e22ce]" title="5+ solves" />
                </div>
                <span>More</span>
              </div>
            </div>
          )}
        </div>

        {/* 2. STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl border border-border bg-layer/40 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-secondary_text">
              Total Solved
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                {problems.length}
              </span>
              <CheckCircle2 size={20} className="text-primary opacity-80" />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-layer/40 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Easy Problems
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                {easyCount}
              </span>
              <span className="text-xs font-mono text-secondary_text">
                {problems.length ? Math.round((easyCount / problems.length) * 100) : 0}%
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-layer/40 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Medium Problems
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                {mediumCount}
              </span>
              <span className="text-xs font-mono text-secondary_text">
                {problems.length ? Math.round((mediumCount / problems.length) * 100) : 0}%
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-layer/40 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Hard Problems
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                {hardCount}
              </span>
              <span className="text-xs font-mono text-secondary_text">
                {problems.length ? Math.round((hardCount / problems.length) * 100) : 0}%
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-layer/40 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Current Streak
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                {streakCount} <span className="text-xs text-secondary_text font-normal">days</span>
              </span>
              <Flame size={20} className="text-amber-500 opacity-90" />
            </div>
          </div>
        </div>

        {/* 3. FILTERABLE PROBLEMS TABLE */}
        <div className="p-6 md:p-8 rounded-3xl border border-border bg-layer/40 shadow-sm space-y-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code size={20} className="text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                All Solved Problems ({filteredProblems.length})
              </h2>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              
              {/* Search Bar */}
              <div className="relative flex-1 md:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary_text" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problem, topic, language..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-background border border-border rounded-xl outline-none focus:border-primary text-foreground"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-1 bg-background border border-border px-2.5 py-1.5 rounded-xl text-xs">
                <Filter size={13} className="text-secondary_text" />
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-transparent text-foreground focus:outline-none cursor-pointer font-medium"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Language Filter */}
              {languagesList.length > 0 && (
                <div className="flex items-center gap-1 bg-background border border-border px-2.5 py-1.5 rounded-xl text-xs">
                  <select
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    className="bg-transparent text-foreground focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="All">All Languages</option>
                    {languagesList.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sort Order Toggle */}
              <button
                onClick={() => setSortDesc(!sortDesc)}
                className="p-1.5 rounded-xl border border-border bg-background hover:bg-layer transition-colors text-foreground"
                title={sortDesc ? "Sort Newest First" : "Sort Oldest First"}
              >
                <ArrowUpDown size={14} />
              </button>
            </div>
          </div>

          {/* Table Container */}
          {filteredProblems.length === 0 ? (
            <div className="p-8 text-center text-xs text-secondary_text border border-dashed border-border rounded-2xl">
              No problems found matching your current filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-layer/50 text-secondary_text font-mono uppercase tracking-wider">
                    <th className="py-3 pl-3 pr-2 font-bold">#</th>
                    <th className="py-3 px-3 font-bold">Problem Title</th>
                    <th className="py-3 px-3 font-bold">Difficulty</th>
                    <th className="py-3 px-3 font-bold">Topics</th>
                    <th className="py-3 px-3 font-bold">Language</th>
                    <th className="py-3 pr-3 text-right font-bold">Date Solved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredProblems.map((prob, index) => {
                    const topics = parseTopics(prob.topic);
                    const diffLower = prob.difficulty?.toLowerCase();
                    return (
                      <tr
                        key={prob.id || index}
                        onClick={() => setSelectedProblem(prob)}
                        className="hover:bg-layer/40 transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 pl-3 pr-2 font-mono text-secondary_text">
                          {index + 1}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground hover:text-primary">
                              {prob.title}
                            </span>
                            {prob.leetcode_url && (
                              <a
                                href={prob.leetcode_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-secondary_text hover:text-primary"
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                              diffLower === "easy"
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                : diffLower === "medium"
                                ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                            }`}
                          >
                            {prob.difficulty}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {topics.slice(0, 3).map((t, idx) => (
                              <TechBadge key={idx} name={t} />
                            ))}
                            {topics.length > 3 && (
                              <span className="text-[10px] text-secondary_text font-mono">
                                +{topics.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-medium text-foreground whitespace-nowrap">
                          {prob.language || "Python"}
                        </td>
                        <td className="py-3.5 pr-3 font-mono text-secondary_text text-right whitespace-nowrap">
                          {prob.date_solved}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* PROBLEM DETAILS MODAL DRAWER */}
      {selectedProblem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg carbon-card p-6 shadow-2xl rounded-3xl space-y-5 border border-border bg-background">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border mb-2 inline-block ${
                    selectedProblem.difficulty?.toLowerCase() === "easy"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : selectedProblem.difficulty?.toLowerCase() === "medium"
                      ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                      : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                  }`}
                >
                  {selectedProblem.difficulty}
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  {selectedProblem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProblem(null)}
                className="p-1.5 rounded-xl border border-border bg-layer hover:bg-border transition-colors text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-layer/40 border border-border font-mono">
                <div>
                  <span className="text-secondary_text block text-[10px]">Date Solved</span>
                  <span className="font-semibold text-foreground">{selectedProblem.date_solved}</span>
                </div>
                <div>
                  <span className="text-secondary_text block text-[10px]">Language</span>
                  <span className="font-semibold text-foreground">{selectedProblem.language || "Python"}</span>
                </div>
              </div>

              {/* Topics */}
              {parseTopics(selectedProblem.topic).length > 0 && (
                <div>
                  <span className="text-secondary_text block text-[10px] font-mono uppercase font-bold mb-1.5">
                    Topic Tags
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {parseTopics(selectedProblem.topic).map((t, i) => (
                      <TechBadge key={i} name={t} />
                    ))}
                  </div>
                </div>
              )}

              {/* Notes / Explanation */}
              {selectedProblem.notes && (
                <div>
                  <span className="text-secondary_text block text-[10px] font-mono uppercase font-bold mb-1.5">
                    Notes & Key Insights
                  </span>
                  <p className="p-3 rounded-xl bg-input border border-border text-foreground leading-relaxed">
                    {selectedProblem.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="pt-2 flex items-center justify-end gap-3">
              {selectedProblem.leetcode_url ? (
                <a
                  href={selectedProblem.leetcode_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full carbon-btn-primary justify-center text-xs py-2.5"
                >
                  <span>Open Problem on LeetCode</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="w-full carbon-btn-primary justify-center text-xs py-2.5"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MULTIPLE PROBLEMS DAY MODAL */}
      {selectedDayProblems && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md carbon-card p-6 shadow-2xl rounded-3xl space-y-4 border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-base text-foreground font-mono">
                Problems Solved on {selectedDayProblems.date}
              </h3>
              <button
                onClick={() => setSelectedDayProblems(null)}
                className="p-1.5 rounded-xl border border-border bg-layer hover:bg-border transition-colors text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {selectedDayProblems.items.map((prob) => (
                <div
                  key={prob.id}
                  onClick={() => {
                    setSelectedDayProblems(null);
                    setSelectedProblem(prob);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${getPillStyle(
                    prob.difficulty
                  )}`}
                >
                  <span className="font-bold text-xs">{prob.title}</span>
                  <span className="font-mono text-[10px] uppercase font-bold">{prob.difficulty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HEATMAP STYLES */}
      <style>{`
        .react-calendar-heatmap .color-empty {
          fill: #f3e8ff;
          stroke: #d8b4fe;
          rx: 2px;
        }
        .dark .react-calendar-heatmap .color-empty {
          fill: rgba(255, 255, 255, 0.06);
          stroke: rgba(255, 255, 255, 0.15);
          rx: 2px;
        }
        .react-calendar-heatmap .color-scale-1 { fill: #d8b4fe; rx: 2px; }
        .react-calendar-heatmap .color-scale-2 { fill: #c084fc; rx: 2px; }
        .react-calendar-heatmap .color-scale-3 { fill: #a855f7; rx: 2px; }
        .react-calendar-heatmap .color-scale-4 { fill: #7e22ce; rx: 2px; }
        .react-calendar-heatmap text {
          fill: currentColor;
          opacity: 0.6;
          font-size: 9px;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}
