import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'

export const googleProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})
