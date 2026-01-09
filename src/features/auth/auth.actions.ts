import { auth } from '@/core/firebase/firebase'
import { upsertUser } from '@/features/users/users.repository'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { githubProvider, googleProvider } from './auth.providers'

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '.')
    .replace(/[^a-z0-9._-]/g, '')
    .replace(/\.+/g, '.')
    .replace(/^\.|\.$/g, '')
}

function normalizeDisplayName(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function normalizeCompany(input: string): string {
  return input.trim().replace(/\s+/g, ' ').toUpperCase()
}

function buildRecruiterEmail(displayName: string, company: string) {
  const name = slugify(displayName)
  const comp = slugify(company)

  if (!name || !comp) {
    throw new Error('Invalid recruiter identity')
  }

  return `${name}.${comp}@recruiter.io`
}

export const loginWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider)
  const user = res.user

  await upsertUser({
    uid: user.uid,
    displayName: user.displayName ?? 'User',
    company: '',
    email: user.email ?? '',
    role: 'user',
    provider: 'google',
  })

  return res
}

export const loginWithGithub = async () => {
  const res = await signInWithPopup(auth, githubProvider)
  const user = res.user

  await upsertUser({
    uid: user.uid,
    displayName: user.displayName ?? 'User',
    company: '',
    email: user.email ?? '',
    role: 'user',
    provider: 'github',
  })

  return res
}

export const loginAsRecruiter = async (params: {
  displayName: string
  company: string
  password: string
}) => {
  const displayName = normalizeDisplayName(params.displayName)
  const company = normalizeCompany(params.company)

  const password = params.password

  const email = buildRecruiterEmail(displayName, company)

  // stato pulito
  await signOut(auth)

  try {
    // 1️⃣ PROVA A CREARE (caso: primo accesso)
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user

    await upsertUser({
      uid: user.uid,
      displayName,
      company,
      email,
      role: 'recruiter',
      provider: 'recruiter',
    })

    return res
  } catch (err: unknown) {
    // 2️⃣ SE ESISTE → LOGIN
    if (
      err &&
      typeof err === 'object' &&
      'code' in err &&
      err.code === 'auth/email-already-in-use'
    ) {
      const res = await signInWithEmailAndPassword(auth, email, password)
      const user = res.user

      await upsertUser({
        uid: user.uid,
        displayName,
        company,
        email,
        role: 'recruiter',
        provider: 'recruiter',
      })

      return res
    }

    // altri errori reali
    throw err
  }
}

export const logout = () => signOut(auth)
