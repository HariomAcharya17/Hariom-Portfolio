import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 30-minute cache header (s-maxage=1800, stale-while-revalidate for 24h)
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
  res.setHeader("Content-Type", "application/json");

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "HariomAcharya17";

  const { from, to } = req.query;
  const fromStr = typeof from === "string" ? from : undefined;
  const toStr = typeof to === "string" ? to : undefined;

  if (!token) {
    return res.status(200).json({
      error: "GITHUB_TOKEN environment variable is not configured",
      user: {
        name: "Hariom Acharya",
        login: username,
        avatarUrl: "https://github.com/github.png",
        bio: "Full-Stack Web & Cloud Developer",
        followers: 0,
        following: 0
      },
      stats: {
        totalContributions: 0,
        commits: 0,
        pullRequests: 0,
        issues: 0,
        repositories: 0
      },
      days: [],
      repositories: []
    });
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
          totalContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
        repositories(first: 6, orderBy: {field: PUSHED_AT, direction: DESC}, ownerAffiliations: OWNER) {
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

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Vercel-Serverless-Function-Portfolio"
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: fromStr ? `${fromStr}T00:00:00Z` : undefined,
          to: toStr ? `${toStr}T23:59:59Z` : undefined
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(200).json({
        error: `GitHub API HTTP error: ${response.status}`,
        details: errText,
        user: { name: "Hariom Acharya", login: username },
        stats: { totalContributions: 0, commits: 0, pullRequests: 0, issues: 0, repositories: 0 },
        days: [],
        repositories: []
      });
    }

    const result = await response.json();

    if (result.errors && result.errors.length > 0) {
      return res.status(200).json({
        error: result.errors[0].message || "GitHub GraphQL Query Error",
        user: { name: "Hariom Acharya", login: username },
        stats: { totalContributions: 0, commits: 0, pullRequests: 0, issues: 0, repositories: 0 },
        days: [],
        repositories: []
      });
    }

    const userData = result.data?.user;
    if (!userData) {
      return res.status(200).json({
        error: `GitHub user "${username}" not found`,
        user: { name: "Hariom Acharya", login: username },
        stats: { totalContributions: 0, commits: 0, pullRequests: 0, issues: 0, repositories: 0 },
        days: [],
        repositories: []
      });
    }

    const coll = userData.contributionsCollection || {};
    const calendar = coll.contributionCalendar || {};

    const days: { date: string; count: number; color?: string }[] = [];
    calendar.weeks?.forEach((week: any) => {
      week.contributionDays?.forEach((day: any) => {
        days.push({
          date: day.date,
          count: day.contributionCount,
          color: day.color
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
        : null
    }));

    return res.status(200).json({
      user: {
        name: userData.name || username,
        login: userData.login || username,
        avatarUrl: userData.avatarUrl || "https://github.com/github.png",
        bio: userData.bio || "Full-Stack Web & Cloud Developer",
        followers: userData.followers?.totalCount || 0,
        following: userData.following?.totalCount || 0
      },
      stats: {
        totalContributions: coll.totalContributions || calendar.totalContributions || 0,
        commits: coll.totalCommitContributions || 0,
        pullRequests: coll.totalPullRequestContributions || 0,
        issues: coll.totalIssueContributions || 0,
        repositories: coll.totalRepositoryContributions || 0
      },
      days,
      repositories: repos
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err.message || "Failed to query GitHub GraphQL API",
      user: { name: "Hariom Acharya", login: username },
      stats: { totalContributions: 0, commits: 0, pullRequests: 0, issues: 0, repositories: 0 },
      days: [],
      repositories: []
    });
  }
}
