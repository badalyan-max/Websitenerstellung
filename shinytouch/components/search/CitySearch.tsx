'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { City } from '@/lib/types'

interface CitySearchProps {
  cities: City[]
  placeholder?: string
  className?: string
}

export function CitySearch({
  cities,
  placeholder = 'Ort oder PLZ eingeben...',
  className = '',
}: CitySearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Filter cities based on query
  const filteredCities = useMemo(() => {
    if (!query || query.length < 2) return []

    const q = query.toLowerCase().trim()
    return cities
      .filter((city) => city.name.toLowerCase().includes(q) || city.plz.startsWith(q))
      .slice(0, 8)
  }, [query, cities])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || filteredCities.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => (prev < filteredCities.length - 1 ? prev + 1 : prev))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < filteredCities.length) {
            const city = filteredCities[selectedIndex]
            window.location.href = `/${city.slug}`
          }
          break
        case 'Escape':
          setIsOpen(false)
          setSelectedIndex(-1)
          inputRef.current?.blur()
          break
      }
    },
    [isOpen, filteredCities, selectedIndex]
  )

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  // Close dropdown when clicking outside the entire container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Open dropdown when query changes and has results
  useEffect(() => {
    if (filteredCities.length > 0) {
      setIsOpen(true)
      setSelectedIndex(-1)
    } else {
      setIsOpen(false)
    }
  }, [filteredCities.length])

  return (
    <div ref={containerRef} className={`relative w-full max-w-xl mx-auto ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-secondary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => filteredCities.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 text-lg bg-white border-2 border-secondary-200 rounded-2xl shadow-sm focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
          aria-label="Ort oder PLZ suchen"
          aria-expanded={isOpen}
          aria-controls="city-search-results"
          aria-autocomplete="list"
          role="combobox"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
              inputRef.current?.focus()
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-secondary-400 hover:text-secondary-600 transition-colors"
            aria-label="Suche löschen"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && filteredCities.length > 0 && (
        <ul
          ref={listRef}
          id="city-search-results"
          role="listbox"
          className="absolute z-[100] w-full mt-2 bg-white border border-secondary-200 rounded-xl shadow-xl overflow-hidden max-h-96 overflow-y-auto"
        >
          {filteredCities.map((city, index) => (
            <li key={city.slug} role="option" aria-selected={index === selectedIndex}>
              <Link
                href={`/${city.slug}`}
                className={`flex items-center justify-between px-4 py-3 transition-colors ${
                  index === selectedIndex
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-secondary-50'
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      city.priority === 1
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-secondary-100 text-secondary-500'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <div className="font-medium text-secondary-900">{city.name}</div>
                    <div className="text-sm text-secondary-500">{city.region}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-secondary-400 font-mono">{city.plz}</span>
                  {city.slug === 'bamberg' && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                      Hauptsitz
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* No Results Message */}
      {isOpen && query.length >= 2 && filteredCities.length === 0 && (
        <div className="absolute z-50 w-full mt-2 px-4 py-6 bg-white border border-secondary-200 rounded-xl shadow-xl text-center">
          <div className="text-secondary-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-secondary-600 font-medium">Kein Ort gefunden</p>
          <p className="text-sm text-secondary-400 mt-1">
            Probieren Sie einen anderen Suchbegriff oder eine PLZ
          </p>
        </div>
      )}

      {/* Help Text */}
      {!isOpen && !query && (
        <p className="mt-3 text-center text-sm text-secondary-500">
          Geben Sie mindestens 2 Zeichen ein, um zu suchen
        </p>
      )}
    </div>
  )
}
