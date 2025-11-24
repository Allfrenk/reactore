import type { RootState } from '../app/store'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRefValue } from '../slices/hooksSlice'

export default function UseRefCard() {
  const dispatch = useDispatch()
  const persistedValue = useSelector((state: RootState) => state.hooks.useRefValue)

  const counterRef = useRef(persistedValue)

  function increaseCounter() {
    counterRef.current += 1
    dispatch(setRefValue(counterRef.current))
  }

  return (
    <div>
      <h2>useRef</h2>
      <p>
        Mantiene valori persistenti senza causare re-render. Perfetto per contatori,
        accesso al DOM e memorizzazione di valori mutabili che non devono aggiornare la
        UI.{' '}
      </p>

      <button onClick={increaseCounter}>Increase ref counter</button>

      <p>Ref value (persisted in Redux): {persistedValue}</p>
      <small>(Il ref si aggiorna senza re-render)</small>
    </div>
  )
}

/*
============================== COMMENTI ==============================

📌 COSA FA useRef?
- Mantiene un valore persistente tra i rendering.
- NON causa re-render quando cambia .current.
- Può puntare anche a nodi DOM.

📌 QUANDO SI USA?
- Timer
- Contatori interni
- Salvare valore precedente
- Accesso diretto al DOM

📌 ERRORE EVITATO ⚠️
Non si può leggere `.current` durante il render → si usa lo state per mostrarlo.

📌 Esempio TeamSystem
- Tracking di valori tecnici: debounce counters, auto-save timers, ecc.

=====================================================================
*/
