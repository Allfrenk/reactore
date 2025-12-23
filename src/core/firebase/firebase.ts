import { getAnalytics, isSupported } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyANfBTzAf0Y4V93BKRjN0bW8NKEtAJVdA0',
  authDomain: 'reactore-7aea6.firebaseapp.com',
  projectId: 'reactore-7aea6',
  storageBucket: 'reactore-7aea6.appspot.com',
  messagingSenderId: '244684331606',
  appId: '1:244684331606:web:965cc743e46f7d47efb9f7',
}

export const app = initializeApp(firebaseConfig)

// 🔐 Auth
export const auth = getAuth(app)

// 🗄️ Firestore
export const db = getFirestore(app)

// 📊 Analytics (safe)
export async function getFirebaseAnalytics() {
  const supported = await isSupported()
  if (!supported) return null
  return getAnalytics(app)
}
