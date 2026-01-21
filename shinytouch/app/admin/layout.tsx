'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin/seo', label: 'Dashboard', icon: '📊' },
  { href: '/admin/seo/keywords', label: 'Keywords', icon: '🔍' },
  { href: '/admin/seo/serp', label: 'SERP Tracking', icon: '📈' },
  { href: '/admin/seo/audit', label: 'OnPage Audit', icon: '🔬' },
  { href: '/admin/seo/ai-visibility', label: 'AI Visibility', icon: '🤖' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-secondary-500 hover:text-secondary-700">
                ← Zurück zur Website
              </Link>
              <span className="text-secondary-300">|</span>
              <h1 className="text-xl font-bold text-secondary-900">SEO Dashboard</h1>
            </div>
            <div className="text-sm text-secondary-500">
              ShinyTouch Admin
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 border-l-4 border-transparent'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-xl border border-secondary-200 p-4">
              <h3 className="text-sm font-semibold text-secondary-900 mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">City Pages</span>
                  <span className="font-medium text-secondary-900">600+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Services</span>
                  <span className="font-medium text-secondary-900">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">FAQs gesamt</span>
                  <span className="font-medium text-secondary-900">1000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
