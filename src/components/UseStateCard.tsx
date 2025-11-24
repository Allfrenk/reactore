import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUseStateValue } from '../slices/hooksSlice'

export default function UseStateCard() {
  const dispatch = useDispatch()
  const [localName, setLocalName] = useState('')

  return (
    <div>
      <h2>useState</h2>
      <p>
        Gestisce stato locale del componente. Ideale per valori temporanei e UI state
        (input, campi form, toggle). Quando cambia, il componente effettua un re-render.
      </p>

      <input
        value={localName}
        placeholder="Write a name…"
        onChange={e => {
          const val = e.target.value
          setLocalName(val)
          dispatch(setUseStateValue(val))
        }}
      />

      <button onClick={() => dispatch(setUseStateValue(localName))}>
        Save useState to Redux
      </button>
    </div>
  )
}

/*
============================== COMMENTI ==============================

📌 COSA FA useState?
- È l’hook più semplice di React.
- Serve a gestire valori locali, NON condivisi tra componenti.
- Ad ogni “set”, il componente re-renderizza.

📌 QUANDO SI USA?
- Input temporanei
- UI toggle (modali, switch)
- Form locali
- Contatori

📌 DIFFERENZA CON REDUX
- useState: stato locale → vive e muore nel componente.
- Redux: stato globale → condiviso e persistente.

📌 Esempio reale TeamSystem
- Campi di ricerca veloci e transienti in pannelli della dashboard.

=====================================================================
*/
