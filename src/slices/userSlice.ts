import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// 🔥 Best Practice: tipizzare sempre lo stato
export interface UserState {
  name: string;
  lastName: string;
  profession: string;
}

const initialState: UserState = {
  name: "",
  lastName: "",
  profession: "",
};

// CreateSlice genera automaticamente actions + reducer
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Setter completo per aggiornare l'intero oggetto user
    setUser: (_, action: PayloadAction<UserState>) => {
      return action.payload; // 🔥 Best Practice: return diretto per oggetti complessi
    },

    // Update singolo campo: esempio utile in UI
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setProfession: (state, action: PayloadAction<string>) => {
      state.profession = action.payload;
    },

    // OPPURE DIRETTAMENTE MODIFICARE LO STATO (Immer sotto al cofano)
    //  setUser(state, action: PayloadAction<UserState>) {
    //   state.firstName = action.payload.firstName;
    //   state.lastName = action.payload.lastName;
    //   state.profession = action.payload.profession;
    // },
  },
});

export const { setUser, setName, setLastName, setProfession } =
  userSlice.actions;
export default userSlice.reducer;

/* 
------------------------------------------------------
COMMENTI FINALI (SPIEGAZIONI)
------------------------------------------------------

🧠 Che cos’è una Slice?
Una slice è un “pezzo di stato globale” della tua applicazione Redux.
Ogni slice ha:
- stato iniziale
- reducers (le funzioni che modificano lo stato)
- actions (che vengono generati automaticamente)

🧱 setUser: perché funziona "modificando" lo stato?
Redux Toolkit usa Immer sotto al cofano → permette la mutazione immutabile.
È la best practice moderna: più semplice, più leggibile.

📝 Perché PayloadAction?
Serve a tipizzare il valore di action.payload.
Essenziale per fare app React + TS solide.

🚫 Perché import type?
Perché con verbatimModuleSyntax attivo, i tipi devono essere importati come “import type”.
Evita errori e comportamenti strani nei bundler moderni.

🔍 Similitudine finale:
Pensa alla slice come a una “cartella” dentro l’armadio (lo store).
Dentro ci stanno i dati dell’utente.
I reducers sono come “istruzioni” per cambiare quello che c’è nella cartella.
*/
