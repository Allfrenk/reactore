import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { store } from './app/store.ts'
import './index.css'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 🔥 Best Practice: il Provider a livello root */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

/*
------------------------------------------------------
COMMENTI FINALI (SPIEGAZIONI)
------------------------------------------------------

🧠 Perché React.StrictMode?
Attiva controlli extra in fase di sviluppo:
- doppio rendering di alcuni effetti (solo dev)
- warning su codice non sicuro
- compatibilità futura con React Compiler

💡 Perché usare React.StrictMode e non StrictMode da solo?
Perché StrictMode NON è un export named stabile in tutte le configurazioni.
React.StrictMode invece funziona SEMPRE.

🫂 Perché usare Provider?
Provider collega React al Redux store.
È come “attaccare la corrente” alla casa: da quel momento, tutti i componenti
che usano useSelector o useDispatch possono leggere/scrivere nello store.
*/
