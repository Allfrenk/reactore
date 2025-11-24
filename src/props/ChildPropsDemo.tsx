import { useState } from 'react'

interface Props {
  user: {
    name: string
    role: string
    level: number
  }
  message: string
  onMessageChange: (msg: string) => void
}

export default function ChildPropsDemo({ user, message, onMessageChange }: Props) {
  // Lo stato locale del figlio → copia della prop
  const [localMsg, setLocalMsg] = useState(message)

  return (
    <div>
      <h3>Child Component</h3>
      <p>
        <strong>User:</strong> {user.name}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Level:</strong> {user.level}
      </p>
      <p>
        <strong>Message from parent:</strong> {message}
      </p>
      <input
        value={localMsg}
        onChange={e => setLocalMsg(e.target.value)}
        placeholder="Edit message..."
      />
      <button onClick={() => onMessageChange(localMsg)}>Send to Parent</button>
    </div>
  )
}
