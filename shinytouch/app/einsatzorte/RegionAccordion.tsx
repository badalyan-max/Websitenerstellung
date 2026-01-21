'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { City } from '@/lib/types'

interface RegionAccordionProps {
  citiesByRegion: Record<string, City[]>
}

export function RegionAccordion({ citiesByRegion }: RegionAccordionProps) {
  // Bayern standardmäßig geöffnet (Heimatregion)
  const [openRegions, setOpenRegions] = useState<Set<string>>(new Set(['Bayern']))

  const toggleRegion = (region: string) => {
    setOpenRegions((prev) => {
      const next = new Set(prev)
      if (next.has(region)) {
        next.delete(region)
      } else {
        next.add(region)
      }
      return next
    })
  }

  // Sortiere Regionen alphabetisch, aber Bayern zuerst
  const sortedRegions = Object.entries(citiesByRegion).sort(([a], [b]) => {
    if (a === 'Bayern') return -1
    if (b === 'Bayern') return 1
    return a.localeCompare(b, 'de')
  })

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {sortedRegions.map(([region, cities]) => {
        const isOpen = openRegions.has(region)
        const cityCount = cities.length
        const hasBamberg = cities.some((c) => c.slug === 'bamberg')

        return (
          <div
            key={region}
            className="bg-white rounded-2xl border border-secondary-100 shadow-sm overflow-hidden"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleRegion(region)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary-50 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`region-${region}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    hasBamberg
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-secondary-100 text-secondary-500'
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900">
                    {region === 'NRW' ? 'Nordrhein-Westfalen' : region}
                  </h3>
                  <p className="text-sm text-secondary-500">
                    {cityCount} {cityCount === 1 ? 'Stadt' : 'Städte'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasBamberg && (
                  <span className="hidden sm:inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                    Hauptsitz
                  </span>
                )}
                <svg
                  className={`w-5 h-5 text-secondary-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Accordion Content */}
            <div
              id={`region-${region}`}
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 pb-5 pt-2 border-t border-secondary-100">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cities
                    .sort((a, b) => a.name.localeCompare(b.name, 'de'))
                    .map((city) => (
                      <Link
                        key={city.slug}
                        href={`/${city.slug}`}
                        className={`group flex items-center gap-2 py-2 px-3 rounded-lg transition-colors ${
                          city.slug === 'bamberg'
                            ? 'bg-primary-50 hover:bg-primary-100'
                            : 'hover:bg-secondary-50'
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            city.slug === 'bamberg'
                              ? 'text-primary-700 font-medium'
                              : 'text-secondary-700 group-hover:text-primary-600'
                          }`}
                        >
                          {city.name}
                        </span>
                        {city.slug === 'bamberg' && (
                          <svg
                            className="w-3.5 h-3.5 text-primary-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
