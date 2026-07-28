import type { VercelRequest, VercelResponse } from "@vercel/node";

// Simple ISO date validator: expects YYYY-MM-DD
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isValidDateStr(s: unknown): s is string {
  return typeof s === "string" && DATE_RE.test(s) && !isNaN(Date.parse(s));
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // ------------------------------------------------------------------
  // 1. Method restriction — this endpoint only ever needs to be read
  // ------------------------------------------------------------------
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ------------------------------------------------------------------
  // 2. Caching — 5 minutes fresh, serve stale for up to 1 hour while
  //    revalidating in the background. Keeps data reasonably current
  //    without risking GitHub's API rate limit under real traffic.
  // ------------------------------------------------------------------
  res.setHeader(
    "Cache-Control",
    "s-maxage=300, stale-while-revalidate=3600"
  );
  res.setHeader("Content-Type", "application/json");

  // Defensive headers — this endpoint returns read-only public data,
  // but these cost nothing and reduce attack surface generally.
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "HariomAcharya17";

  const EMPTY_PAYLOAD = {
    user: {
      name: "Hariom Acharya",
      login: username,
      avatarUrl: "https://github.com/github.png",
      bio: "Full-Stack Web & Cloud Developer",
      followers: 0,
      following: 0,
    },
    stats: {
      totalContributions: 0,
      commits: 0,
      pullRequests: 0,
      issues: 0,
      repositories: 0,
    },
    days: [] as { date: string; count: number }[],
    repositories: [] as unknown[],
  };

  // ------------------------------------------------------------------
  // 3. Fail safely and clearly if the token isn't configured.
  //    Never echo the token value itself anywhere in the response.
  // ------------------------------------------------------------------
  if (!token) {
    return res.status(200).json({
      ...EMPTY_PAYLOAD,
      error: "GITHUB_TOKEN environment variable is not configured",
    });
  }

  // ------------------------------------------------------------------
  // 4. Validate and sanitize query params before using them.
  //    Reject anything malformed instead of passing it through.
  // ------------------------------------------------------------------
  const { from, to } = req.query;

  let fromStr: string | undefined;
  let toStr: string | undefined;

  if (from !== undefined) {
    if (!isValidDateStr(from)) {
      return res
        .status(400)
        .json({ ...EMPTY_PAYLOAD, error: "Invalid 'from' date format, expected YYYY-MM-DD" });
    }
    fromStr = from;
  }

  if (to !== undefined) {
    if (!isValidDateStr(to)) {
      return res
        .status(400)
        .json({ ...EMPTY_PAYLOAD, error: "Invalid 'to' date format, expected YYYY-MM-DD" });
    }
    toStr = to;
  }

  // Guard against an unreasonably large range being requested
  // (defensive limit — GitHub's own API also caps this, but fail
  // fast and cheaply before spending a GraphQL call on it).
  if (fromStr && toStr) {
    const days =
      (new Date(toStr).getTime() - new Date(fromStr).getTime()) /
      (1000 * 60 * 60 * 24);
    if (days < 0 || days > 400) {
      return res.status(400).json({
        ...EMPTY_PAYLOAD,
        error: "Date range invalid or exceeds maximum of 400 days",
      });
    }
  }

  const query = `
    query($username: String!, $from: DateTime, $to: DateTime) {
      user(login: $username) {
        name
        login
        avatarUrl
        bio
        followers {
          totalCount
        }
        following {
          totalCount
        }
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
        repositories(
          first: 6
          orderBy: { field: PUSHED_AT, direction: DESC }
          ownerAffiliations: OWNER
          privacy: PUBLIC
        ) {
          nodes {
            name
            description
            url
            stargazerCount
            pushedAt
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  `;

  // ------------------------------------------------------------------
  // 5. Timeout guard — don't let a hung GitHub API call hang this
  //    function indefinitely (Vercel has its own limits too, but fail
  //    faster and more predictably on our side).
  // ------------------------------------------------------------------
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000); // 10s

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Vercel-Serverless-Function-Portfolio",
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: fromStr ? `${fromStr}T00:00:00Z` : undefined,
          to: toStr ? `${toStr}T23:59:59Z` : undefined,
        },
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      // Don't leak raw upstream error bodies to the client — log
      // server-side only, return a generic message externally.
      console.error("GitHub API HTTP error:", response.status, await response.text());
      return res.status(200).json({
        ...EMPTY_PAYLOAD,
        error: `GitHub API returned an error (status ${response.status})`,
      });
    }

    const result = await response.json();

    if (result.errors && result.errors.length > 0) {
      console.error("GitHub GraphQL error:", result.errors);
      return res.status(200).json({
        ...EMPTY_PAYLOAD,
        error: "GitHub GraphQL query error",
      });
    }

    const userData = result.data?.user;
    if (!userData) {
      return res.status(200).json({
        ...EMPTY_PAYLOAD,
        error: `GitHub user "${username}" not found`,
      });
    }

    const coll = userData.contributionsCollection || {};
    const calendar = coll.contributionCalendar || {};

    const days: { date: string; count: number }[] = [];
    calendar.weeks?.forEach((week: any) => {
      week.contributionDays?.forEach((day: any) => {
        days.push({
          date: day.date,
          count: day.contributionCount,
        });
      });
    });

    const repos = (userData.repositories?.nodes || []).map((r: any) => ({
      name: r.name,
      description: r.description || null,
      url: r.url,
      stargazerCount: r.stargazerCount || 0,
      pushedAt: r.pushedAt,
      primaryLanguage: r.primaryLanguage
        ? { name: r.primaryLanguage.name, color: r.primaryLanguage.color }
        : null,
    }));

    return res.status(200).json({
      user: {
        name: userData.name || username,
        login: userData.login || username,
        avatarUrl: userData.avatarUrl || "https://github.com/github.png",
        bio: userData.bio || "Full-Stack Web & Cloud Developer",
        followers: userData.followers?.totalCount || 0,
        following: userData.following?.totalCount || 0,
      },
      stats: {
        totalContributions: calendar.totalContributions || 0,
        commits: coll.totalCommitContributions || 0,
        pullRequests: coll.totalPullRequestContributions || 0,
        issues: coll.totalIssueContributions || 0,
        repositories: coll.totalRepositoryContributions || 0,
      },
      days,
      repositories: repos,
    });
  } catch (err: any) {
    clearTimeout(timeout);

    if (err.name === "AbortError") {
      console.error("GitHub API request timed out");
      return res.status(200).json({
        ...EMPTY_PAYLOAD,
        error: "GitHub API request timed out",
      });
    }

    // Log the real error server-side for debugging, but never expose
    // internal error details (which could include stack traces or
    // other implementation info) to the client.
    console.error("Unexpected error querying GitHub GraphQL API:", err);
    return res.status(200).json({
      ...EMPTY_PAYLOAD,
      error: "Failed to query GitHub API",
    });
  }
}