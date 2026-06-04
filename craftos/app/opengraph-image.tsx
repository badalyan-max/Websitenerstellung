import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'CraftOS – Das Betriebssystem für Handwerksbetriebe'

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
          background: '#020617',
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.12) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo-Zeile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 4L7 11.5V28.5L20 36L33 28.5V11.5L20 4Z"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeOpacity="0.3"
            />
            <path
              d="M7 11.5L20 19M20 19L33 11.5M20 19V36"
              stroke="#818cf8"
              strokeWidth="2.5"
            />
            <circle cx="20" cy="19" r="4" fill="#22d3ee" />
          </svg>
          <span style={{ color: 'white', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>
            CraftOS
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#22d3ee',
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
              color: 'white',
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 1010,
            }}
          >
            <span style={{ marginRight: 20 }}>Das Betriebssystem für</span>
            <span style={{ color: '#818cf8' }}>Handwerksbetriebe</span>
          </div>
        </div>

        {/* Footer-Zeile */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Projekte', 'Angebot → Rechnung', 'Zeiterfassung', 'Craft AI'].map((t) => (
            <div
              key={t}
              style={{
                color: '#cbd5e1',
                fontSize: 22,
                fontWeight: 500,
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.3)',
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
