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
        alert('Summary saved successfully!')
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Glass Container */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 mb-3">
              AI Summarizer
            </h1>
            <p className="text-blue-100/80 text-lg">
              Condense long texts into concise summaries in seconds.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <textarea
                className="relative w-full p-6 bg-gray-900/60 text-white placeholder-gray-400 rounded-xl border border-white/10 focus:border-blue-400/50 focus:ring-0 focus:outline-none transition-all duration-300 min-h-[200px] resize-y text-lg leading-relaxed shadow-inner"
                placeholder="Paste your text here to summarize..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={onSummarize}
                disabled={loading || !inputText.trim()}
                className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white transition-all duration-300 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/30 group"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Summarize'
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Summary Result Area */}
        {summary && (
          <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-emerald-400">Result</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-200 text-lg leading-loose bg-white/5 p-6 rounded-xl border border-white/5 shadow-inner">
                {summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 justify-end">
              <button
                onClick={onRetry}
                className="px-6 py-3 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                disabled={loading}
              >
                Retry
              </button>
              <button
                onClick={onSave}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
                disabled={loading}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border-t border-red-500/20 text-red-200 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
