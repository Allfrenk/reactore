import { useEffect, useState } from 'react'

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function isLinkedInWebView() {
  return /LinkedInApp/i.test(navigator.userAgent)
}

function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches
}

export function OpenRedirectPage() {
  const target = window.location.origin
  const [mobile, setMobile] = useState(() => isMobile())

  // 🔹 Tentativo automatico iOS 17+ (best effort)
  useEffect(() => {
    if (isIOS() && isLinkedInWebView()) {
      try {
        window.location.href = `x-safari-${target}`
      } catch {
        // fallback silenzioso
      }
    }
  }, [target])

  const handleContinue = () => {
    window.open(target, '_blank')
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
        position: 'relative',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont',
      }}
    >
      {/* MOBILE ONLY — DOODLE ARROW */}
{mobile && (
  <div
    style={{
      position: 'absolute',
      top: 80,            // ⬅️ scende verso il titolo
      right: -10,         // ⬅️ leggermente fuori per dare respiro
      width: 260,         // ⬅️ MOLTO più grande
      height: 260,
      pointerEvents: 'none',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      width="100%"
      height="100%"
    >
      <g
        strokeWidth="7"
        stroke="hsl(0, 0%, 0%)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="
          matrix(
            -0.35,
            -0.94,
             0.94,
            -0.35,
             120,
             900
          )
        "
      >
        <path
          d="
            M180 260
            Q 300 520 400 360
            Q 520 160 650 520
          "
          markerEnd="url(#arrow)"
        />
      </g>

      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="6"
          refY="6"
          viewBox="0 0 12 12"
          orient="auto"
        >
          <polyline
            points="0,6 6,3 0,0"
            fill="none"
            strokeWidth="2"
            stroke="hsl(0, 0%, 0%)"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(2,3)"
          />
        </marker>
      </defs>
    </svg>
  </div>
)}


      {/* CONTENT */}
      <div
        style={{
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: mobile ? 30 : 40,
            fontWeight: 600,
            marginBottom: 16,
            color: '#111',
          }}
        >
          Opening Reactore…
        </h1>

        <p
          style={{
            fontSize: mobile ? 16 : 18,
            fontWeight: 400,
            color: '#555',
            marginBottom: 32,
          }}
        >
          To continue, open Reactore in your browser.
        </p>

        <button
          onClick={handleContinue}
          style={{
            padding: mobile ? '14px 22px' : '16px 26px',
            fontSize: mobile ? 16 : 18,
            borderRadius: 12,
            border: 'none',
            background: '#000',
            color: '#fff',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 500,
          }}
        >
          Continue
        </button>

        {/* MICRO GUIDA */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid #eee',
            fontSize: mobile ? 13 : 14,
            color: '#666',
            textAlign: 'center',
          }}
        >
          <p style={{ marginBottom: 6 }}>
            If it doesn’t open automatically:
          </p>
          <p style={{ margin: 0 }}>
            Tap <strong>⋯</strong> (top right) → <strong>Open in browser</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
