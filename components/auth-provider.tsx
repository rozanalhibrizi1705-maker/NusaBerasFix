"use client"

// ============================================================================
// AuthProvider — autentikasi gabungan (Manual & Google) untuk PROTOTIPE.
// Menyimpan sesi di sessionStorage.
// ============================================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

// Kredensial dummy untuk login manual demo prototipe.
const DUMMY_USER = "admin"
const DUMMY_PASS = "admin123"
const STORAGE_KEY = "nusa-beras-auth"

interface AuthContextValue {
  isAuthenticated: boolean
  /** Selesai membaca status awal dari storage */
  ready: boolean
  login: (username: string, password: string) => boolean
  signInWithGoogle: () => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [ready, setReady] = useState(false)

  // Pulihkan sesi saat aplikasi pertama kali dimuat.
  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(STORAGE_KEY) === "true")
    setReady(true)
  }, [])

  // Fungsi 1: Login Manual menggunakan data dummy
  function login(username: string, password: string) {
    if (username.trim() === DUMMY_USER && password === DUMMY_PASS) {
      sessionStorage.setItem(STORAGE_KEY, "true")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  // Fungsi 2: Simulasi Google Sign-In / Sign-Up
  async function signInWithGoogle() {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "true")
          setIsAuthenticated(true)
          resolve(true)
        } catch (error) {
          resolve(false)
        }
      }, 800)
    })
  }

  // Fungsi 3: Logout
  function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    setIsAuthenticated(false)
  }

  return (
    // Menyediakan semua fungsi (termasuk login) ke value Context
    <AuthContext.Provider value={{ isAuthenticated, ready, login, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>")
  return ctx
}