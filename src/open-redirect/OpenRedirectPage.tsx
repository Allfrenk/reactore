function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export function OpenRedirectPage() {
  const mobile = isMobile()
  const target = window.location.origin

  const handleContinue = () => {
    window.open(target, '_blank')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* ARROW CONTAINER — SOLO MOBILE */}
        {mobile && (
          <div
            style={{
              width: '100%',
              minHeight: 180,          // spazio dedicato
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingRight: 12,
              boxSizing: 'border-box',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 800"
              width="100%"
              height="100%"
              preserveAspectRatio="xMaxYMin meet"
            >
              <g
                strokeWidth="7"
                stroke="hsl(0, 0%, 0%)"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="matrix(-0.22,-0.97,0.97,-0.22,80,880)"
              >
                <path
                  d="M232 232Q362 687 400 400Q439 167 568 568"
                  markerEnd="url(#arrow)"
                />
              </g>

              <defs>
                <marker
                  id="arrow"
                  markerWidth="12"
                  markerHeight="12"
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

        {/* TITLE */}
        <h1
          style={{
            fontSize: mobile ? 32 : 44,
            fontWeight: 600,
            marginBottom: 16,
            color: '#111',
          }}
        >
          Opening Reactore…
        </h1>

        {/* GUIDA — FOCUS */}
        <div
          style={{
            fontSize: mobile ? 18 : 20,
            fontWeight: 500,
            color: '#222',
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          <div>If the page doesn’t open automatically:</div>
          <div style={{ marginTop: 8 }}>
            Tap <strong>⋯</strong> (top right) and select{' '}
            <strong>“Open in browser”</strong>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleContinue}
          style={{
            width: '100%',
            padding: '16px 28px',
            fontSize: 18,
            fontWeight: 500,
            borderRadius: 14,
            border: 'none',
            background: '#000',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Continue in browser
        </button>

        {/* MICRO DESC */}
        <div
          style={{
            marginTop: 12,
            fontSize: 14,
            color: '#666',
          }}
        >
          Google login requires a full browser for security reasons.
        </div>
      </div>
    </div>
  )
}
