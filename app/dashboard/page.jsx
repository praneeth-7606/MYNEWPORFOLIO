"use client";

import { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaSearch } from "react-icons/fa";
import { deploymentsData } from "@/data/deployments-data";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = deploymentsData
    .map((group) => ({
      ...group,
      deployments: group.deployments.filter(
        (d) =>
          q === "" ||
          group.repo.toLowerCase().includes(q) ||
          group.info.toLowerCase().includes(q) ||
          d.name.toLowerCase().includes(q)
      ),
    }))
    .filter(
      (group) =>
        group.deployments.length > 0 ||
        (q !== "" &&
          (group.repo.toLowerCase().includes(q) ||
            group.info.toLowerCase().includes(q)))
    );

  const totalDeployments = deploymentsData.reduce(
    (sum, group) => sum + group.deployments.length,
    0
  );

  return (
    <div className="pt-28 pb-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text">
          Deployments Dashboard
        </h1>
        <p className="text-gray-400 mt-4 text-sm md:text-base">
          Every live deployment, project by project — each with its live link
          and corresponding source code.
        </p>
        <p className="font-mono text-teal-300 text-xs md:text-sm mt-2">
          {deploymentsData.length} repositories · {totalDeployments} live
          deployments
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mt-8">
        <FaSearch
          size={16}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects or deployments..."
          className="w-full pl-12 pr-5 py-2.5 text-sm text-white bg-[#0a0e27] border border-teal-500/20 rounded-full outline-none placeholder:text-gray-500 focus:border-cyan-400 transition-colors"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-sm text-center mt-10">
          No deployments match your search.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {filtered.map((group) => (
          <div
            key={group.repo}
            className="rounded-2xl border border-teal-500/20 bg-[#0a0e27]/60 backdrop-blur p-5 md:p-6 hover:border-cyan-400/40 transition-colors"
          >
            <p className="font-mono text-teal-300 text-base md:text-lg break-all">
              {group.repo}
            </p>
            <p className="text-gray-400 text-xs md:text-sm mt-1">
              {group.info}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {group.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-0.5 rounded-full border border-cyan-500/30 text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>
            {group.repoUrl ? (
              <a
                href={group.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full text-xs font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
              >
                <FaGithub size={14} /> GitHub Repo
              </a>
            ) : (
              <p className="mt-4 text-[11px] text-gray-500">
                Source not linked to GitHub
              </p>
            )}
            <p className="font-mono text-[11px] text-gray-500 mt-5 mb-2">
              live deployments ({group.deployments.length})
            </p>
            <div className="flex flex-col gap-2">
              {group.deployments.map((d) => (
                <a
                  key={d.name}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-teal-500/20 hover:border-cyan-400/50 hover:bg-teal-500/5 transition-all"
                >
                  <span className="font-mono text-xs md:text-sm text-amber-300 break-all">
                    {d.name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-teal-300 whitespace-nowrap">
                    Live <FaExternalLinkAlt size={11} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-xs text-center mt-10">
        All deployments are hosted live on Vercel.
      </p>
    </div>
  );
}
