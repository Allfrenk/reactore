import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import hooksSlice from '../slices/hooksSlice'

// 🔥 Persistenza plug-and-play (localStorage)
function saveToLocalStorage(state: unknown) {
  localStorage.setItem('app_state', JSON.stringify(state))
}

function loadFromLocalStorage(): { user: ReturnType<typeof userReducer> } | undefined {
  try {
    const serialized = localStorage.getItem('app_state')
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch {
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    hooks: hooksSlice,
  },
  preloadedState: loadFromLocalStorage(), // <-- carica stato salvato
})

// 🔥 ogni volta che cambia lo store → salva
store.subscribe(() => {
  saveToLocalStorage(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
/* 
------------------------------------------------------
COMMENTI FINALI (SPIEGAZIONI)
------------------------------------------------------

🧠 Perché abbiamo creato lo store con configureStore?
È la best practice di Redux Toolkit: semplifica tutto, attiva automaticamente
i middleware utili e abilita lo sviluppo con Redux DevTools.

📦 Perché userReducer?
Perché nella slice abbiamo esportato di default il reducer.
Nello store rinominiamo il default export in “userReducer”.
Se cambi nome nel file slice, ricordati di mantenere il default export.

📚 Perché abbiamo creato RootState e AppDispatch?
Sono tipi TypeScript derivati dallo store.
Servono per avere autocomplete e sicurezza totale nei componenti React.

🚀 Spiegazione similitudine
Pensa allo store come al “cervello centrale” della tua app.
Ogni slice è una “scatola di memoria”, lo store le assembla tutte insieme,
così che ogni componente possa leggerle e aggiornarle.
*/
