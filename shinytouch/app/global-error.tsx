'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="de">
      <body>
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4">
          <div className="text-center">
            {/* Error Icon */}
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ein kritischer Fehler ist aufgetreten
            </h1>

            <p className="text-lg text-gray-600 max-w-md mx-auto mb-10">
              Bitte laden Sie die Seite neu oder versuchen Sie es später erneut.
            </p>

            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:bg-blue-700 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Seite neu laden</span>
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
