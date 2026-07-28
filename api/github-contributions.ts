import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set cache headers (1 hour cache, stale-while-revalidate for 24h)
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.setHeader("Content-Type", "application/json");

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "HariomAcharya17";

  if (!token) {
    // If local dev or environment token is missing, return a clean error
    return res.status(200).json({
      error: "GITHUB_TOKEN environment variable is not configured",
      totalContributions: 0,
      days: []
    });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
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
        variables: { username }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(200).json({
        error: `GitHub API error: ${response.status}`,
        details: errText,
        totalContributions: 0,
        days: []
      });
    }

    const result = await response.json();

    if (result.errors && result.errors.length > 0) {
      return res.status(200).json({
        error: result.errors[0].message || "GitHub GraphQL error",
        totalContributions: 0,
        days: []
      });
    }

    const calendar = result.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return res.status(200).json({
        error: "Contribution calendar data unavailable for user",
        totalContributions: 0,
        days: []
      });
    }

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

    return res.status(200).json({
      username,
      totalContributions: calendar.totalContributions || 0,
      days
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err.message || "Failed to query GitHub GraphQL API",
      totalContributions: 0,
      days: []
    });
  }
}
