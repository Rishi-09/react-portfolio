import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, ExternalLink, Loader2, Github, AlertCircle, } from "lucide-react";
import { Magnetic } from "./Magnetic";
const HeatmapCell = React.memo(({ val, i, cols, cellSize, getColor }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (_jsxs("div", { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), style: { width: `${cellSize}px`, height: `${cellSize}px` }, className: `heatmap-cell rounded-[2px] ${getColor(val)} relative group/cell shadow-sm`, children: [_jsxs("div", { className: "heatmap-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-[9px] font-bold text-white whitespace-nowrap pointer-events-none z-30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]", children: [val, " Contributions"] }), _jsx("style", { children: `
          .heatmap-cell {
            cursor: crosshair;
            transition: all 0.5s ease;
            will-change: ${isHovered ? "transform" : "auto"};
          }

          .heatmap-cell:hover {
            z-index: 10;
            box-shadow: 0 0 0 2px var(--accent-color);
          }

          .heatmap-tooltip {
            opacity: 0;
            transform: translateX(-50%) scale(0.9);
            transition: opacity 0.3s ease, transform 0.3s ease;
          }

          .heatmap-cell:hover .heatmap-tooltip {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        ` })] }));
});
HeatmapCell.displayName = "HeatmapCell";
const RepoCard = React.memo(({ repo }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (_jsx(Magnetic, { strength: 0.15, children: _jsxs("div", { className: "repo-card p-10 rounded-[2.5rem] border border-[var(--border-color)] bg-[var(--bg-color)]/40 group h-full flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.4)]", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), style: {
                willChange: isHovered
                    ? "transform, border-color, box-shadow"
                    : "auto",
            }, children: [_jsx("a", { href: repo.html_url, target: "_blank", rel: "noopener noreferrer", "data-cursor-ignore": true, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "repo-icon p-3 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-inner", children: _jsx(GitCommit, { size: 18, className: "text-[var(--accent-color)]" }) }), _jsx("span", { className: "repo-badge text-[9px] font-black text-[var(--accent-color)] uppercase tracking-[0.2em] px-3 py-1 bg-[var(--accent-color)]/5 rounded-full", children: "Active" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-base font-bold text-[var(--text-color)] uppercase tracking-widest", children: repo.name }), _jsx("p", { className: "text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.3em]", children: repo.language || "N/A" })] }), _jsx("p", { className: "repo-desc text-[13px] text-[var(--text-secondary)]/70 leading-relaxed font-medium line-clamp-2", children: repo.description || "No description provided." })] }) }), _jsx("style", { children: `
          .repo-card {
            cursor: pointer;
            transition: border-color 0.7s ease, box-shadow 0.7s ease;
          }

          .repo-card:hover {
            border-color: rgba(109, 124, 255, 0.3);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          }

          .repo-icon {
            transition: border-color 0.5s ease;
          }

          .repo-card:hover .repo-icon {
            border-color: rgba(109, 124, 255, 0.3);
          }

          .repo-badge {
            opacity: 0;
            transition: opacity 0.5s ease;
          }

          .repo-card:hover .repo-badge {
            opacity: 1;
          }

          .repo-desc {
            transition: color 0.5s ease;
          }

          .repo-card:hover .repo-desc {
            color: var(--text-secondary);
          }
        ` })] }) }));
});
RepoCard.displayName = "RepoCard";
export const GitHubHeatmap = () => {
    const [contributions, setContributions] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const rows = 7;
    const cols = 53;
    const cellSize = 11;
    const cellGap = 5;
    const getColor = useMemo(() => (val) => {
        if (val === 0)
            return "bg-[#121212]";
        if (val < 2)
            return "bg-[#1B223B]";
        if (val < 5)
            return "bg-[#2A3E7F]";
        if (val < 10)
            return "bg-[#4B6FFF]";
        return "bg-[var(--accent-color)]";
    }, []);
    const [repos, setRepos] = useState([]);
    useEffect(() => {
        const fetchContributions = async () => {
            try {
                setLoading(true);
                setError(null);
                const username = "rishi-09";
                const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
                if (!response.ok)
                    throw new Error("API Rate Limited or Unavailable");
                const data = await response.json();
                if (data && data.contributions) {
                    const weeks = data.contributions;
                    const githubOrdered = [];
                    let computedTotal = 0;
                    // Only take the most recent 53 weeks (GitHub behavior)
                    const startWeek = Math.max(0, weeks.length - cols);
                    for (let col = startWeek; col < weeks.length; col++) {
                        for (let row = 0; row < rows; row++) {
                            const count = weeks[col][row]?.contributionCount ?? 0;
                            githubOrdered.push(count);
                            computedTotal += count;
                        }
                    }
                    setContributions(githubOrdered);
                    setTotalCount(computedTotal);
                }
                else {
                    throw new Error("Malformed Response Data");
                }
            }
            catch (err) {
                console.error("GitHub API Error:", err);
                setError(err.message || "Unable to sync live pulse.");
                // Fallback synthetic data
                const fallback = Array.from({ length: rows * cols }).map(() => {
                    const rand = Math.random();
                    if (rand > 0.85)
                        return Math.floor(Math.random() * 8) + 2;
                    if (rand > 0.5)
                        return Math.floor(Math.random() * 3);
                    return 0;
                });
                setContributions(fallback);
                setTotalCount(912);
            }
            finally {
                setTimeout(() => setLoading(false), 1200);
            }
        };
        fetchContributions();
    }, [rows, cols]);
    const displayContributions = useMemo(() => contributions.length > 0
        ? contributions
        : Array.from({ length: rows * cols }).fill(0), [contributions, cols, rows]);
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch("https://api.github.com/users/rishi-09/repos?per_page=100");
                if (!response.ok) {
                    throw new Error("Failed to fetch repositories");
                }
                const data = await response.json();
                // Sort by last updated
                const sorted = data
                    .filter((repo) => !repo.fork) // ignore forks (optional but recommended)
                    .sort((a, b) => new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime())
                    .slice(0, 3);
                setRepos(sorted);
            }
            catch (err) {
                console.error("Repo fetch error:", err);
            }
        };
        fetchRepos();
    }, []);
    return (_jsxs("div", { className: "w-full px-6 md:px-12 lg:px-24", children: [_jsxs("div", { className: "max-w-7xl w-full mx-auto space-y-12", children: [_jsxs("div", { className: "reveal-child flex flex-col md:flex-row md:items-end justify-between gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2.5 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] shadow-inner", children: _jsx(Github, { size: 22 }) }), _jsx("h2", { className: "text-[10px] font-bold text-[var(--accent-color)] uppercase tracking-[0.5em]", children: "Global Impact" })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { className: "text-4xl md:text-7xl font-semibold text-[var(--text-color)] tracking-tighter drop-shadow-lg", children: loading ? "Syncing..." : `${totalCount} Commits` }), _jsxs("div", { className: "flex items-center gap-3 mt-1", children: [_jsx("p", { className: "text-sm text-[var(--text-secondary)]", children: "Annual development velocity" }), error && (_jsxs("div", { className: "flex items-center gap-1 text-amber-500/80 text-[10px] font-bold uppercase tracking-widest bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10", children: [_jsx(AlertCircle, { size: 10 }), " Live Sync Paused"] }))] })] })] }), _jsxs("a", { href: "https://github.com/rishi-09", target: "_blank", rel: "noopener noreferrer", "data-cursor-ignore": true, className: "github-link flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface-color)] px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-color)] group shadow-[0_10px_20px_rgba(0,0,0,0.3)]", children: ["Verify on GitHub", " ", _jsx(ExternalLink, { size: 12, className: "link-icon opacity-40" })] })] }), _jsxs("div", { className: "reveal-child w-full p-10 md:p-14 rounded-[3.5rem] border border-[var(--border-color)] bg-[var(--surface-color)]/60 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] space-y-12 relative", children: [_jsxs("div", { className: "space-y-10", children: [_jsx("div", { className: "flex justify-between items-center text-[9px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)]/30", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { children: "Dormant" }), _jsx("div", { className: "flex gap-1.5", children: [0, 2, 5, 10].map((v) => (_jsx("div", { className: `h-3 w-3 rounded-[2px] ${getColor(v)} shadow-sm` }, v))) }), _jsx("span", { children: "Peak" })] }) }), _jsx("div", { className: "overflow-x-auto pb-6 scrollbar-hide", children: _jsxs("div", { className: "relative min-w-fit", children: [_jsx(AnimatePresence, { children: loading && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "absolute inset-0 bg-[var(--surface-color)]/95 backdrop-blur-md z-20 flex items-center justify-center rounded-2xl", children: _jsxs("div", { className: "flex flex-col items-center gap-5", children: [_jsxs("div", { className: "relative", children: [_jsx(Loader2, { className: "loader-spin text-[var(--accent-color)]", size: 40 }), _jsx("div", { className: "loader-glow absolute inset-0 blur-lg bg-[var(--accent-color)]/20 rounded-full" })] }), _jsx("span", { className: "text-[11px] font-black uppercase tracking-[0.5em] text-[var(--accent-color)]", children: "Synchronizing Neural Pulse" })] }) })) }), _jsx("div", { className: "grid", style: {
                                                        gridAutoFlow: "column",
                                                        gridTemplateRows: "repeat(7, 1fr)",
                                                        gap: `${cellGap}px`,
                                                        width: "max-content",
                                                    }, children: displayContributions.map((val, i) => (_jsx(HeatmapCell, { val: val, i: i, cols: cols, cellSize: cellSize, getColor: getColor }, i))) })] }) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[var(--border-color)]", children: repos.map((repo) => (_jsx(RepoCard, { repo: repo }, repo.name))) })] })] }), _jsx("style", { children: `
        .github-link {
          transition: background-color 0.3s ease,
                      color 0.3s ease,
                      transform 0.2s ease,
                      box-shadow 0.3s ease;
        }

        .github-link:hover {
          background-color: var(--text-color);
          color: var(--bg-color);
          transform: scale(1.05);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
        }

        .github-link:active {
          transform: scale(0.95);
        }

        .link-icon {
          transition: opacity 0.3s ease;
        }

        .github-link:hover .link-icon {
          opacity: 1;
        }

        .loader-spin {
          animation: spin 1s linear infinite;
        }

        .loader-glow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      ` })] }));
};
