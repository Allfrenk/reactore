export function OpenRedirectPage() {
  const handleOpen = () => {
    window.open(window.location.origin, '_blank')
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <h1 style={{ marginBottom: 12 }}>Opening Reactore…</h1>

      <p style={{ marginBottom: 24 }}>
        To continue, open Reactore in your browser.
      </p>

      <button
        onClick={handleOpen}
        style={{
          padding: '14px 20px',
          fontSize: 16,
          borderRadius: 8,
          border: 'none',
          background: '#000',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Continue
      </button>
    </div>
  )
}
