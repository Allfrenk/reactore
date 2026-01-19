import { useEffect } from 'react'

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function isLinkedInWebView() {
  return /LinkedInApp/i.test(navigator.userAgent)
}

export function OpenRedirectPage() {
  const target = window.location.origin

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
        position: 'relative',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      {/* DOODLE ARROW */}
      <svg
        width="140"
        height="90"
        viewBox="0 0 140 90"
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      >
        {/* curva principale */}
        <path
          d="M20 70
             C 40 20,
               90 20,
               115 18"
          stroke="#000"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* punta freccia */}
        <path
          d="M110 12
             L 122 18
             L 108 22"
          stroke="#000"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* CONTENUTO */}
      <div
        style={{
          maxWidth: 340,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Opening Reactore…
        </h1>

        <p
          style={{
            fontSize: 15,
            color: '#555',
            marginBottom: 28,
          }}
        >
          To continue, open Reactore in your browser.
        </p>

        <button
          onClick={handleContinue}
          style={{
            padding: '14px 22px',
            fontSize: 16,
            borderRadius: 10,
            border: 'none',
            background: '#000',
            color: '#fff',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Continue
        </button>

        {/* MICRO GUIDA */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 18,
            borderTop: '1px solid #eee',
            fontSize: 13,
            color: '#666',
            textAlign: 'left',
          }}
        >
          <p style={{ marginBottom: 8 }}>
            If it doesn’t open automatically:
          </p>
          <ol style={{ paddingLeft: 18, margin: 0 }}>
            <li>Tap the <strong>⋯</strong> button (top right)</li>
            <li>Select <strong>“Open in browser”</strong></li>
          </ol>
        </div>
      </div>
    </div>
  )
}
