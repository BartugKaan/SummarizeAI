'use client'

import { useEffect, useState } from 'react'

type SummaryItem = {
  id: string
  originalText: string
  summary: string
  createdAt: string
}

export function HistoryList() {
  const [summaries, setSummaries] = useState<SummaryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummaries = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/summaries')
      if (!res.ok) throw new Error('Failed to fetch history')
      const data = await res.json()
      setSummaries(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummaries()

    // Listen for summary-saved event to refresh the list
    const handleSummarySaved = () => {
      fetchSummaries()
    }
    window.addEventListener('summary-saved', handleSummarySaved)

    return () => {
      window.removeEventListener('summary-saved', handleSummarySaved)
    }
  }, [])

  if (loading) {
    return (
      <div className="w-full pt-12 border-t border-white/5">
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-40 w-full bg-white/5 rounded-3xl animate-pulse border border-white/5"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-400 text-center mt-8 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20">
        Unable to load history: {error}
      </div>
    )
  }

  if (summaries.length === 0) {
    return (
      <div className="w-full pt-12 border-t border-white/5">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
            <svg
              className="w-5 h-5 text-teal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Recent Activity
          </h2>
        </div>
        <div className="glass-card rounded-3xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-zinc-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-400 mb-2">
            No summaries yet
          </h3>
          <p className="text-sm text-zinc-600">
            Your saved summaries will appear here
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full pt-12 border-t border-white/5 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
          <svg
            className="w-5 h-5 text-teal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Recent Activity
        </h2>
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full border border-white/5">
          {summaries.length} Items
        </span>
      </div>

      <div className="grid gap-6">
        {summaries.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-3xl p-8 group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-teal-500 transition-colors shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
                <span className="text-xs text-zinc-500 font-medium font-mono">
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-2">
                  Original Text
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {item.originalText}
                </p>
              </div>

              <div className="space-y-3 relative">
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
                <h3 className="text-xs uppercase tracking-wider text-teal-400 font-bold flex items-center gap-2">
                  Summary
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
