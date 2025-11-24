import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { setUseMemoInput } from '../slices/hooksSlice'

export default function UseMemoCard() {
  const dispatch = useDispatch()

  const savedValue = useSelector((s: RootState) => s.hooks.useMemoInput)

  const [localValue, setLocalValue] = useState(savedValue)

  const expensiveCalculation = (n: number) => {
    let result = 0
    for (let i = 0; i < 1_000_000_000; i++) result += n
    return result
  }

  const result = useMemo(() => {
    return expensiveCalculation(Number(localValue))
  }, [localValue])

  const syncInput = () => {
    dispatch(setUseMemoInput(localValue))
  }

  return (
    <div>
      <h2>useMemo</h2>
      <p>
        {' '}
        Memoizza un valore computato per evitare calcoli pesanti ad ogni re-render. Ottimo
        per ottimizzare performance quando la computation cost è alta oppure deriva da
        valori complessi.
      </p>
      <input
        value={localValue}
        onChange={e => setLocalValue(e.target.value as unknown as number)}
        onBlur={syncInput}
      />

      <p>Expensive result: {result}</p>
    </div>
  )
}
