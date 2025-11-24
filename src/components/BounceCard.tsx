// src/components/BounceCard.tsx
import useBounce from '../hooks/useBounce'

export default function BounceCard() {
  const { cardRef, triggerBounce } = useBounce(300)

  return (
    <div
      ref={cardRef}
      style={{
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #c6c6c6',
        width: '300px',
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
      <h2 style={{ marginBottom: '10px' }}>Bounce Card</h2>
      <p style={{ marginBottom: '20px' }}>
        Click the button to trigger the bounce animation.
      </p>

      <button
        onClick={triggerBounce}
        style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        Bounce!
      </button>
    </div>
  )
}
