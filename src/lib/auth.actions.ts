import { signInWithPopup, signOut } from 'firebase/auth'
import { githubProvider, googleProvider } from './auth.providers'
import { auth } from './firebase'

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider)

export const loginWithGithub = () => signInWithPopup(auth, githubProvider)

export const logout = () => signOut(auth)
