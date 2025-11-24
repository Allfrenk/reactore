import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { setCallbackCount } from '../slices/hooksSlice'

export default function UseCallbackCard() {
  const dispatch = useDispatch()
  const persisted = useSelector((s: RootState) => s.hooks.useCallbackCount)

  const [count, setCount] = useState(persisted)

  const increase = useCallback(() => {
    const newValue = count + 1
    setCount(newValue)
    dispatch(setCallbackCount(newValue))
  }, [count, dispatch])

  return (
    <div>
      <h2>useCallback</h2>
      <p>
        Memoizza una funzione così da non ricrearla ad ogni re-render. Utile per
        ottimizzare componenti figli, evitare re-render inutili o migliorare performance
        di liste.
      </p>
      <button onClick={increase}>Increase</button>
      <p>Count: {count}</p>
    </div>
  )
}

/*
============================== COMMENTI ==============================

📌 COSA FA useCallback?
- Memorizza una funzione tra un render e l’altro.
- Utile quando passi funzioni a componenti figli pesanti.

📌 QUANDO SI USA?
- Liste con elementi memoizzati
- Callback passate a children costosi
- Evitare re-render inutili

📌 Esempio TeamSystem
- Liste di documenti, fatture, movimenti → componenti ottimizzati.

=====================================================================
*/
