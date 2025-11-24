import { useState, useCallback } from 'react'
import ChildPropsDemo from './ChildPropsDemo'

export default function ParentPropsDemo() {
  // 🔥 Stato locale del padre (immutabile per il figlio)
  const [message, setMessage] = useState('Hello from Parent!')

  // 🔥 Callback che verrà passata al figlio
  const updateMessage = useCallback((newMsg: string) => {
    setMessage(newMsg)
  }, [])

  // 📦 Oggetto complesso da passare come props
  const userData = {
    name: 'Alessandro',
    role: 'Frontend Developer',
    level: 2,
  }

  return (
    <div style={{ padding: '20px', border: '1px solid gray', borderRadius: '16px' }}>
      <h2>Parent Component</h2>
      <p>
        <strong>Message:</strong> {message}
      </p>
      {/* Passo props al figlio */}
      <ChildPropsDemo user={userData} message={message} onMessageChange={updateMessage} />
    </div>
  )
}
