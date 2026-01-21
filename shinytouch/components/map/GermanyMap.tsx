'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Germany from '@react-map/germany'
import { CITIES } from '@/lib/cities'
import { getCityCoordinates, projectToSVG } from '@/lib/city-coordinates'

// Kuratierte Liste: Max 8 Orte pro Bundesland, geografisch verteilt
// Insgesamt ~75 Orte statt 600+ - keine Überlappung mehr
const MAP_CITY_SLUGS = new Set([
  // Bayern (8) - von Nord nach Süd/Ost nach West verteilt
  'bamberg', 'nuernberg', 'wuerzburg', 'regensburg', 'muenchen', 'augsburg', 'ingolstadt', 'passau',
  // Nordrhein-Westfalen (8) - geografisch verteilt, nicht nur Ruhrgebiet
  'koeln', 'duesseldorf', 'muenster', 'bielefeld', 'dortmund', 'bonn', 'aachen', 'paderborn',
  // Baden-Württemberg (7)
  'stuttgart', 'mannheim', 'karlsruhe', 'freiburg', 'heidelberg', 'ulm', 'konstanz',
  // Niedersachsen (6)
  'hannover', 'braunschweig', 'oldenburg', 'osnabrueck', 'goettingen', 'lueneburg',
  // Hessen (5)
  'frankfurt-am-main', 'wiesbaden', 'kassel', 'darmstadt', 'giessen',
  // Sachsen (4)
  'dresden', 'leipzig', 'chemnitz', 'zwickau',
  // Rheinland-Pfalz (4)
  'mainz', 'koblenz', 'trier', 'kaiserslautern',
  // Schleswig-Holstein (3)
  'kiel', 'luebeck', 'flensburg',
  // Sachsen-Anhalt (3)
  'magdeburg', 'halle', 'dessau-rosslau',
  // Thüringen (3)
  'erfurt', 'jena', 'gera',
  // Brandenburg (3)
  'potsdam', 'cottbus', 'frankfurt-oder',
  // Mecklenburg-Vorpommern (3)
  'rostock', 'schwerin', 'stralsund',
  // Saarland (2)
  'saarbruecken', 'neunkirchen',
  // Stadtstaaten (3)
  'berlin', 'hamburg', 'bremen',
])

interface GermanyMapProps {
  variant?: 'full' | 'compact'
  className?: string
}

export function GermanyMap({ variant = 'full', className = '' }: GermanyMapProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const mapWrapperRef = useRef<HTMLDivElement>(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  // Zoom & Pan State
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Zoom Controls
  const handleZoomIn = useCallback(() => {
    setZoom(z => Math.min(z + 0.5, 8))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(z => {
      const newZoom = Math.max(z - 0.5, 1)
      if (newZoom === 1) setPan({ x: 0, y: 0 })
      return newZoom
    })
  }, [])

  const handleReset = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  // Mouse Drag for Pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom > 1) {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }, [zoom, pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      // Limit pan to reasonable bounds (scales with zoom)
      const maxPan = (zoom - 1) * 300
      setPan({
        x: Math.max(-maxPan, Math.min(maxPan, newX)),
        y: Math.max(-maxPan, Math.min(maxPan, newY))
      })
    }
  }, [isDragging, dragStart, zoom])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Native wheel event listener with { passive: false } to prevent page scroll
  // Zooms towards mouse cursor position
  useEffect(() => {
    const element = mapWrapperRef.current
    if (!element) return

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const rect = element.getBoundingClientRect()
      // Calculate mouse position relative to center
      const mouseX = e.clientX - rect.left - rect.width / 2
      const mouseY = e.clientY - rect.top - rect.height / 2

      if (e.deltaY < 0) {
        // Zoom in towards mouse position
        setZoom(prevZoom => {
          const newZoom = Math.min(prevZoom + 0.25, 4)
          const zoomDelta = newZoom - prevZoom
          // Adjust pan to zoom towards mouse cursor
          setPan(prevPan => ({
            x: prevPan.x - mouseX * zoomDelta * 0.4,
            y: prevPan.y - mouseY * zoomDelta * 0.4
          }))
          return newZoom
        })
      } else {
        // Zoom out
        setZoom(prevZoom => {
          const newZoom = Math.max(prevZoom - 0.25, 1)
          if (newZoom === 1) {
            setPan({ x: 0, y: 0 })
          } else {
            // Gradually move pan back towards center when zooming out
            setPan(prevPan => ({
              x: prevPan.x * 0.8,
              y: prevPan.y * 0.8
            }))
          }
          return newZoom
        })
      }
    }

    element.addEventListener('wheel', handleNativeWheel, { passive: false })
    return () => element.removeEventListener('wheel', handleNativeWheel)
  }, [])

  // Touch Events for Mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1) {
      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y })
    }
  }, [zoom, pan])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging && zoom > 1 && e.touches.length === 1) {
      const touch = e.touches[0]
      const newX = touch.clientX - dragStart.x
      const newY = touch.clientY - dragStart.y
      const maxPan = (zoom - 1) * 200
      setPan({
        x: Math.max(-maxPan, Math.min(maxPan, newX)),
        y: Math.max(-maxPan, Math.min(maxPan, newY))
      })
    }
  }, [isDragging, dragStart, zoom])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Kuratierte Liste: Nur ~75 geografisch verteilte Orte (max 8 pro Bundesland)
  // Keine komplexe Zoom-Logik mehr - alle Orte sind immer sichtbar
  const citiesToShow = useMemo(() => {
    return CITIES.filter(city => MAP_CITY_SLUGS.has(city.slug))
  }, [])

  // Einheitliche Dot-Größe - klein genug um nicht zu überlappen
  const getDotSize = useCallback((priority: number, isHovered: boolean) => {
    const baseSize = 8  // Kleiner für bessere Übersicht
    const hoverScale = isHovered ? 1.5 : 1
    return baseSize * hoverScale
  }, [])

  // Measure the actual map dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const svg = containerRef.current.querySelector('svg')
        if (svg) {
          const rect = svg.getBoundingClientRect()
          setMapDimensions({ width: rect.width, height: rect.height })
        }
      }
    }

    // Initial measurement
    const timer = setTimeout(updateDimensions, 100)

    // Update on resize
    window.addEventListener('resize', updateDimensions)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  const handleCityClick = (slug: string) => {
    router.push(`/${slug}`)
  }

  const size = variant === 'compact' ? 380 : 500

  return (
    <div className={`mx-auto ${className}`} style={{ maxWidth: size }}>
      {/* Map Container with zoom controls */}
      <div
        ref={mapWrapperRef}
        className="relative overflow-hidden rounded-2xl border border-secondary-200 bg-secondary-50/50"
      >
        {/* Zoom Controls */}
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-1.5">
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 4}
            className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-secondary-200
                     flex items-center justify-center text-secondary-700 hover:bg-primary-50 hover:text-primary-600
                     hover:border-primary-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Vergrößern"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-secondary-200
                     flex items-center justify-center text-secondary-700 hover:bg-primary-50 hover:text-primary-600
                     hover:border-primary-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Verkleinern"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
          {zoom > 1 && (
            <button
              onClick={handleReset}
              className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-secondary-200
                       flex items-center justify-center text-secondary-700 hover:bg-primary-50 hover:text-primary-600
                       hover:border-primary-300 transition-all"
              aria-label="Zurücksetzen"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
        </div>

        {/* Zoom Level Indicator */}
        {zoom > 1 && (
          <div className="absolute bottom-3 left-3 z-50 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-md border border-secondary-200 text-xs font-medium text-secondary-600">
            {Math.round(zoom * 100)}%
          </div>
        )}

        {/* Hint when zoomed */}
        {zoom > 1 && (
          <div className="absolute top-3 left-3 z-50 bg-primary-500/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-md text-xs font-medium text-white">
            Ziehen zum Verschieben
          </div>
        )}

        {/* Zoomable Map Content */}
        <div
          ref={containerRef}
          className="relative select-none"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: 'center center',
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Base Map */}
          <Germany
            type="select-single"
            size={size}
            mapColor="#f1f5f9"
            strokeColor="#94a3b8"
            strokeWidth={1.5}
            hoverColor="#e0f2fe"
            selectColor="#bae6fd"
            hints={false}
            onSelect={() => {}}
          />

          {/* City Markers Overlay */}
          {mapDimensions.width > 0 && (
            <div className="absolute inset-0 pointer-events-none">
              {citiesToShow.map((city) => {
                const coords = getCityCoordinates(city)
                if (!coords) return null

                const pos = projectToSVG(
                  coords.lat,
                  coords.lng,
                  mapDimensions.width,
                  mapDimensions.height
                )

                const isHQ = city.slug === 'bamberg'
                const isHovered = hoveredCity === city.slug
                const priority = city.priority || 3
                const dotSize = getDotSize(priority, isHovered)

                // Determine dot color based on priority
                const dotColor = isHQ
                  ? 'bg-primary-700'
                  : priority === 1
                  ? 'bg-primary-600'
                  : priority === 2
                  ? 'bg-primary-500'
                  : 'bg-primary-400'

                return (
                  <button
                    key={city.slug}
                    className="absolute pointer-events-auto group"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isHovered ? 50 : isHQ ? 40 : priority === 1 ? 35 : priority === 2 ? 32 : 30,
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!isDragging) handleCityClick(city.slug)
                    }}
                    onMouseEnter={() => setHoveredCity(city.slug)}
                    onMouseLeave={() => setHoveredCity(null)}
                    aria-label={`${city.name} - Klicken für Details`}
                  >
                    {/* City Dot - Dynamic size based on priority and zoom */}
                    <div
                      className={`
                        rounded-full border-2 border-white shadow-md
                        transition-all duration-150 ease-out
                        ${dotColor}
                        ${isHovered ? 'ring-2 ring-primary-300 ring-offset-1' : ''}
                      `}
                      style={{
                        width: dotSize,
                        height: dotSize,
                      }}
                    />

                    {/* Pulsing ring for HQ */}
                    {isHQ && !isDragging && zoom < 2 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="rounded-full bg-primary-400/30 animate-ping"
                          style={{ width: dotSize * 1.8, height: dotSize * 1.8 }}
                        />
                      </div>
                    )}

                    {/* Tooltip */}
                    <div
                      className={`
                        absolute left-1/2 -top-2
                        bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg
                        border border-secondary-100
                        text-xs font-medium text-secondary-900 whitespace-nowrap
                        transition-all duration-200
                        ${isHovered && !isDragging ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                      `}
                      style={{
                        transform: `translate(-50%, -100%) scale(${1 / zoom})`,
                        transformOrigin: 'bottom center'
                      }}
                    >
                      {city.name}
                      {isHQ && (
                        <span className="ml-1.5 px-1.5 py-0.5 bg-primary-500 text-white text-[10px] rounded-full">
                          HQ
                        </span>
                      )}
                      {priority === 1 && !isHQ && (
                        <span className="ml-1.5 text-[10px] text-primary-500">★</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      {variant === 'full' && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-secondary-600">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-primary-700 border-2 border-white shadow-sm" />
            <span>Hauptsitz Bamberg</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-600 border-2 border-white shadow-sm" />
            <span>Großstadt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary-500 border-2 border-white shadow-sm" />
            <span>Ort</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400 border border-white shadow-sm" />
            <span>Weitere Orte</span>
          </div>
        </div>
      )}

      {/* Mobile hint */}
      <p className="mt-4 text-center text-xs text-secondary-400 lg:hidden">
        {zoom > 1 ? 'Ziehen zum Verschieben • Tippen auf Ort für Details' : 'Zoom mit +/− • Tippen auf Ort für Details'}
      </p>
    </div>
  )
}
