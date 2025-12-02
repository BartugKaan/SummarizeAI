import { SummaryForm } from '@/components/SummaryForm'
import { HistoryList } from '@/components/HistoryList'

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col selection:bg-teal-500/30 selection:text-teal-200 font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      {/* Floating Header */}
      <header className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center">
        <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              SummarizeAI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#history" className="hover:text-white transition-colors">
              History
            </a>
            <a
              href="#"
              className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-all text-zinc-200 hover:scale-105 active:scale-95"
            >
              Sign In
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 grow flex flex-col items-center pt-32 pb-20 px-6 md:px-12">
        <div className="w-full max-w-4xl space-y-20">
          <SummaryForm />
          <div id="history" className="scroll-mt-32">
            <HistoryList />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center text-zinc-600 text-sm border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 SummarizeAI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
