"use client"

// ============================================================================
// Halaman Otentikasi Pemerintah - NusaBeras (Pendaftaran & Kredensial via Email)
// ============================================================================

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export default function AuthPage() {
  const router = useRouter()
  // login manual dummy dari auth-provider
  const { login, isAuthenticated, ready } = useAuth()

  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // State pendaftaran akun instansi NusaBeras
  const [regName, setRegName] = useState("")
  const [regNip, setRegNip] = useState("")
  const [regAgency, setRegAgency] = useState("")
  const [regEmail, setRegEmail] = useState("")

  // Redirect otomatis jika pengguna sudah terautentikasi
  useEffect(() => {
    if (ready && isAuthenticated) router.replace("/dashboard")
  }, [ready, isAuthenticated, router])

  // Reset status pesan alert sewaktu berpindah tab
  const handleTabChange = (targetMode: "login" | "register") => {
    setMode(targetMode)
    setError("")
    setSuccessMessage("")
  }

  // Handler Submit Formulir Masuk / Daftar
  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setLoading(true)

    setTimeout(() => {
      if (mode === "login") {
        // Skenario login menggunakan kredensial dummy (admin & admin123)
        const ok = login(username, password)
        if (ok) {
          router.replace("/dashboard")
        } else {
          setError("Username atau password salah. Silakan periksa kembali email resmi Anda.")
          setLoading(false)
        }
      } else {
        // Skenario Alur Pengiriman Kredensial NusaBeras via Email
        setSuccessMessage(
          `Pendaftaran berhasil! Data instansi Anda telah masuk ke database sistem NusaBeras. Jika terverifikasi, Username dan Password akses akan dikirimkan secara otomatis ke email resmi Anda (${regEmail}).`
        )
        
        // Mengosongkan isian form registrasi setelah submit berhasil
        setRegName("")
        setRegNip("")
        setRegAgency("")
        setRegEmail("")
        
        // Mengembalikan otomatis ke tab login agar pemohon bersiap memasukkan akun
        setTimeout(() => {
          setMode("login")
          setLoading(false)
        }, 3000)
      }
    }, 1200)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Halaman Utama
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Logo & Judul Aplikasi NusaBeras */}
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">
              <Image src="/logo-mark.png" alt="Nusa Beras" width={48} height={48} />
            </span>
            <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground">
              {mode === "login" ? "Login Pemerintah" : "Daftar Akun Baru"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login" 
                ? "Masuk untuk mengakses Dashboard Rekomendasi Kebijakan NusaBeras" 
                : "Daftarkan akun instansi Anda untuk mendapatkan kredensial akses NusaBeras"}
            </p>
          </div>

          {/* Toggle Tab Masuk / Daftar */}
          <div className="mt-6 flex rounded-lg bg-muted p-1" role="tablist" aria-label="Mode akses">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault()
                handleTabChange("login")
              }}
              onMouseDown={(event) => event.preventDefault()}
              className={`relative z-10 w-1/2 cursor-pointer rounded-md py-1.5 text-sm font-medium transition-all ${
                mode === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={mode === "login"}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault()
                handleTabChange("register")
              }}
              onMouseDown={(event) => event.preventDefault()}
              className={`relative z-10 w-1/2 cursor-pointer rounded-md py-1.5 text-sm font-medium transition-all ${
                mode === "register" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={mode === "register"}
            >
              Daftar
            </button>
          </div>

          {/* Banner Informasi Pengiriman Email */}
          {successMessage && (
            <div className="mt-6 flex gap-3 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
              <MailCheck className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{successMessage}</p>
            </div>
          )}

          {/* KONDISI 1: FORM MASUK */}
          {mode === "login" ? (
            <form onSubmit={handleManualSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-foreground">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username dari email"
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  required={mode === "login"}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    required={mode === "login"}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={loading}
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">{error}</p>}

              <Button type="submit" className="mt-1 w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Lock className="h-4 w-4" /> Masuk</>}
              </Button>
            </form>
          ) : (
            /* KONDISI 2: FORM DAFTAR */
            <form onSubmit={handleManualSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="reg-name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Nama Lengkap Pemohon
                </label>
                <input
                  id="reg-name"
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Nama sesuai SK Jabatan"
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  required={mode === "register"}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="reg-nip" className="mb-1.5 block text-sm font-medium text-foreground">
                  NIP (Nomor Induk Pegawai)
                </label>
                <input
                  id="reg-nip"
                  type="text"
                  value={regNip}
                  onChange={(e) => setRegNip(e.target.value)}
                  placeholder="1995xxxxxxxxxxxxxx"
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  required={mode === "register"}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="reg-agency" className="mb-1.5 block text-sm font-medium text-foreground">
                  Instansi / Dinas Pemerintah terkait
                </label>
                <input
                  id="reg-agency"
                  type="text"
                  value={regAgency}
                  onChange={(e) => setRegAgency(e.target.value)}
                  placeholder="Contoh: Dinas Pertanian Kota X"
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  required={mode === "register"}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email Resmi Instansi (Untuk Pengiriman Kredensial)
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="nama@instansi.go.id"
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  required={mode === "register"}
                  disabled={loading}
                />
              </div>

              {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">{error}</p>}

              <Button type="submit" className="mt-1 w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Kirim Data Pendaftaran"}
              </Button>
            </form>
          )}

          {/* Catatan Kaki Hak Cipta & Keamanan Administrasi */}
          <div className="mt-6 text-center text-[11px] text-muted-foreground leading-relaxed">
            Seluruh data yang dikirimkan dilindungi enkripsi sistem NusaBeras dan akan diperiksa oleh tim verifikator administrator pusat sebelum akun diaktifkan.
          </div>
        </div>
      </div>
    </main>
  )
}