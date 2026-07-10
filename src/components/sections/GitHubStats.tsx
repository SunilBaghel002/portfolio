"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "@/components/animations/CountUp";

interface GitHubData {
  user: {
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
    html_url: string;
  };
  repos: Array<{
    name: string;
    language: string | null;
    size: number;
    stargazers_count: number;
    forks_count: number;
  }>;
  events: Array<{
    type: string;
    repo: { name: string };
    payload: Record<string, unknown>;
    created_at: string;
  }>;
  contributions: {
    totalContributions: number;
    weeks: Array<{
      contributionDays: Array<{
        contributionCount: number;
        date: string;
      }>;
    }>;
  };
  streak: number;
}

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (isNaN(diffMs)) return "recently";
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
}

const languageColors: Record<string, string> = {
  JavaScript: "#C1440E",
  TypeScript: "#2A5F3E",
  HTML: "#E8C547",
  CSS: "#6B2E5F",
  EJS: "#8B8578",
  Python: "#C1440E",
};

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/stats")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Calculate language stats
  const languageStats = data?.repos
    ? (() => {
        const langSizes: Record<string, number> = {};
        let total = 0;
        data.repos.forEach((repo) => {
          if (repo.language) {
            langSizes[repo.language] = (langSizes[repo.language] || 0) + repo.size;
            total += repo.size;
          }
        });
        return Object.entries(langSizes)
          .map(([lang, size]) => ({
            language: lang,
            percentage: total > 0 ? (size / total) * 100 : 0,
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 5);
      })()
    : [];

  // Get contribution levels for heatmap
  const getContributionLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    return 4;
  };

  // Get recent repos from events
  const recentRepos = data?.events
    ? (() => {
        const seen = new Set<string>();
        return data.events
          .filter((e) => e.type === "PushEvent")
          .filter((e) => {
            const name = e.repo.name.split("/")[1];
            if (seen.has(name)) return false;
            seen.add(name);
            return true;
          })
          .slice(0, 3)
          .map((e) => ({
            name: e.repo.name.split("/")[1],
            lastCommit: formatRelativeTime(e.created_at),
          }));
      })()
    : [];

  return (
    <section className="section-padding">
      <div className="container-editorial">
        {/* Chapter marker */}
        <motion.div
          className="chapter-marker mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>Chapter 07 — Proof of Work</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-h1 mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The receipts.
        </motion.h2>

        <motion.p
          className="mb-16"
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "1.125rem",
            color: "var(--color-text-muted)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Live from GitHub. Because talk is cheap.
        </motion.p>

        {/* Top Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[
            { value: data?.streak || 385, label: "Day Streak" },
            {
              value: data?.contributions?.totalContributions || 2680,
              label: "Contributions",
            },
            { value: data?.user?.public_repos || 28, label: "Repositories" },
            { value: data?.user?.followers || 12, label: "Followers" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div className="stat-number">
                <CountUp end={stat.value} />
              </div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Contribution Heatmap */}
        {data?.contributions?.weeks && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3
              className="mb-6"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
              }}
            >
              Contribution Activity
            </h3>
            <div
              className="overflow-x-auto pb-2"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
              }}
            >
              <div className="flex gap-[3px]" style={{ minWidth: "700px" }}>
                {data.contributions.weeks.slice(-52).map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.contributionDays.map((day, di) => (
                      <div
                        key={`${wi}-${di}`}
                        className={`contribution-cell contribution-${getContributionLevel(day.contributionCount)}`}
                        style={{
                          width: "11px",
                          height: "11px",
                        }}
                        title={`${day.date}: ${day.contributionCount} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div className="flex items-center gap-2 mt-4 justify-end">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Less
                </span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`contribution-cell contribution-${level}`}
                    style={{ width: "11px", height: "11px" }}
                  />
                ))}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  More
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Row: Languages + Recent Repos */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3
              className="mb-6"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
              }}
            >
              Most Used Languages
            </h3>
            <div className="flex flex-col gap-4">
              {(loading ? [] : languageStats).map((lang) => (
                <div key={lang.language}>
                  <div className="flex justify-between mb-1.5">
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {lang.language}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {lang.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="lang-bar">
                    <div
                      className="lang-bar-fill"
                      style={{
                        width: `${lang.percentage}%`,
                        background:
                          languageColors[lang.language] || "var(--color-accent)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Repos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3
              className="mb-6"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
              }}
            >
              Recent Activity
            </h3>
            <div className="flex flex-col gap-4">
              {(loading ? [] : recentRepos).map((repo, i) => (
                <div
                  key={repo.name}
                  className="flex items-center justify-between p-4"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border-light)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {i + 1}.
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {repo.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {repo.lastCommit}
                  </span>
                </div>
              ))}
            </div>

            {/* Link to GitHub */}
            <a
              href="https://github.com/SunilBaghel002"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-6 inline-flex"
              style={{ fontSize: "0.8125rem" }}
            >
              View Full Profile →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
