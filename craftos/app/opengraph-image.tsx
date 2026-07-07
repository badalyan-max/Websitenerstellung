import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'CraftOS – Das Betriebssystem für Handwerksbetriebe'

// Werkbank-Look: near-black #101014, Amber-Gradient (Logo), Hairline-Raster
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#101014',
          backgroundImage:
            'linear-gradient(rgba(244,244,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,245,0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo-Zeile: Amber-Hexagon-Tile + Wortmarke */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #ffc438 0%, #ffb21d 55%, #f19800 100%)',
              color: '#1c1507',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <span style={{ color: '#f4f4f5', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>
            CraftOS
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#f2af38',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Handwerkersoftware · Made in Germany
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              color: '#f4f4f5',
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 1010,
            }}
          >
            <span style={{ marginRight: 20 }}>Das Betriebssystem für</span>
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #ffc438, #f19800)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Handwerksbetriebe
            </span>
          </div>
        </div>

        {/* Footer-Zeile */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Angebot → Rechnung', 'Plantafel', 'Zeiterfassung', 'Lager', 'Craft AI'].map((t) => (
            <div
              key={t}
              style={{
                color: '#d0d0d5',
                fontSize: 22,
                fontWeight: 500,
                background: 'rgba(242,175,56,0.08)',
                border: '1px solid rgba(242,175,56,0.35)',
                borderRadius: 12,
                padding: '10px 22px',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
