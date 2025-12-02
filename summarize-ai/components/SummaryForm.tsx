'use client'

import { useState } from 'react'

export function SummaryForm() {
  const [inputText, setInputText] = useState('')
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Helper to manage API calls cleanly
  const handleApiCall = async (
    url: string,
    body: object,
    onSuccess: (data: { summary: string }) => void
  ) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.details || 'Something went wrong.')
      }

      const data = await res.json()
      onSuccess(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const onSummarize = () => {
    setSummary(null)
    handleApiCall('/api/summarize', { text: inputText }, (data) => {
      setSummary(data.summary)
    })
  }

  const onSave = () => {
    if (!inputText || !summary) return
    handleApiCall(
      '/api/save-summary',
      { originalText: inputText, summary },
      () => {
        // Dispatch custom event to notify HistoryList to refresh
        window.dispatchEvent(new CustomEvent('summary-saved'))
        setInputText('')
        setSummary(null)
      }
    )
  }

  const onRetry = () => {
    setSummary(null)
    setError(null)
  }

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-white/40 tracking-tight mb-6 drop-shadow-sm">
          Simplify your reading
        </h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Paste your text below and get a concise summary in seconds using
          advanced AI.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-2 shadow-2xl shadow-black/50 ring-1 ring-white/10">
        <div className="relative group">
          <textarea
            className="w-full p-8 bg-transparent text-zinc-100 placeholder-zinc-600 focus:ring-0 border-none focus:outline-none min-h-[240px] resize-y text-lg leading-relaxed rounded-2xl transition-colors"
            placeholder="Paste your article or text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
          />

          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            <span className="text-xs text-zinc-600 font-medium px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/5">
              {inputText.length} chars
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-black/20 rounded-2xl border-t border-white/5 backdrop-blur-sm">
          <div className="flex gap-2"></div>
          <button
            onClick={onSummarize}
            disabled={loading || !inputText.trim()}
            className="group relative flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-lg shadow-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Processing</span>
              </>
            ) : (
              <>
                <span>Summarize</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 text-center text-sm backdrop-blur-md">
          {error}
        </div>
      )}

      {/* Summary Result */}
      {summary && (
        <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              Summary Result
            </h3>
            <div className="flex gap-3">
              <button
                onClick={onRetry}
                className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full"
              >
                Try again
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-10 text-zinc-200 text-lg leading-loose shadow-2xl shadow-teal-500/10 border-teal-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-teal-500/50 to-transparent opacity-50" />
            <div className="prose prose-invert max-w-none">{summary}</div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 active:scale-95 hover:-translate-y-1"
              disabled={loading}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save to History
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
