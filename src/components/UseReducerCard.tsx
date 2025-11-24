import { useEffect, useReducer } from 'react'
import type { RootState } from '../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { setReducerCount } from '../slices/hooksSlice'

function reducer(state: number, action: 'inc' | 'dec') {
  switch (action) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    default:
      return state
  }
}

export default function UseReducerCard() {
  const dispatchRedux = useDispatch()
  const persisted = useSelector((s: RootState) => s.hooks.useReducerCount)

  const [count, dispatch] = useReducer(reducer, persisted)

  useEffect(() => {
    dispatchRedux(setReducerCount(count))
  }, [count, dispatchRedux])

  return (
    <div>
      <h2>useReducer</h2>
      <p>
        Gestisce stato complesso tramite un reducer (azione → nuova versione dello stato).
        Perfetto quando lo stato ha logiche articolate, oppure serve una struttura simile
        a Redux a livello di componente.
      </p>
      <button onClick={() => dispatch('inc')}>+1</button>
      <button onClick={() => dispatch('dec')}>-1</button>

      <p>Count: {count}</p>
    </div>
  )
}

/*
============================== COMMENTI ==============================

📌 COSA FA useReducer?
- Gestisce stato complesso con logiche centralizzate.
- È come una mini-versione di Redux all’interno di un componente.

📌 QUANDO SI USA?
- Form complessi
- UI con tante transizioni
- Gestione stato articolato

📌 Esempio TeamSystem
- Wizard di creazione documenti
- Maschere dati concatenate

=====================================================================
*/
