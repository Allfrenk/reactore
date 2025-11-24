import { useEffect } from 'react'
import { setEffectTime } from '../slices/hooksSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'

export default function UseEffectCard() {
  const dispatch = useDispatch()
  const currentTime = useSelector((state: RootState) => state.hooks.useEffectLastTime)

  useEffect(() => {
    const i = setInterval(() => {
      const now = new Date().toLocaleTimeString()
      dispatch(setEffectTime(now))
    }, 1000)

    return () => clearInterval(i)
  }, [dispatch])

  return (
    <div>
      <h2>useEffect</h2>
      <p>
        Esegue effetti collaterali dopo il rendering: chiamate API, sincronizzazione con
        sistemi esterni, timers, listeners, aggiornamenti documento/DOM. Dipende dalle
        variabili fornite in input.
      </p>
      <p>Current time: {currentTime}</p>
    </div>
  )
}

/*
============================== COMMENTI ==============================

📌 COSA FA useEffect?
- Sincronizza React con sistemi esterni.
- Esempi: API calls, event listener, timers.

📌 PERCHÉ NON SI PUÒ USARE setState DIRETTAMENTE?
- UseEffect deve gestire side effects, NON logiche di render.
- SetState “dentro il render” causerebbe loop infiniti.

📌 QUANDO SI USA?
- Fetch di dati
- Subscriptions
- Intervalli/timer
- LocalStorage sync

📌 Esempio TeamSystem
- Recuperare dati da API gestionali.
- Aggiornare dashboard periodiche.

=====================================================================
*/
