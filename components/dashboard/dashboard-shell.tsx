"use client"

// ============================================================================
// DashboardShell — kerangka dashboard pemerintah dengan Sidebar Navigation.
// Menangani proteksi rute (redirect ke /login bila belum autentikasi),
// sidebar responsif (drawer di HP), dan tombol logout.
// ============================================================================

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  LogOut,
  Map as MapIcon,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

// Item navigasi sidebar.
const NAV_ITEMS = [
  { key: "peta" as const, label: "Peta Rekomendasi", icon: MapIcon },
  { key: "ringkasan" as const, label: "Ringkasan Nasional", icon: LayoutDashboard },
]

export type DashboardView = "peta" | "ringkasan"

export function DashboardShell({
  children,
  activeView,
  onChangeView,
}: {
  children: ReactNode
  activeView: DashboardView
  onChangeView: (view: DashboardView) => void
}) {
  const router = useRouter()
  const { isAuthenticated, ready, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Proteksi rute: bila belum login, arahkan ke halaman login.
  useEffect(() => {
    if (ready && !isAuthenticated) router.replace("/login")
  }, [ready, isAuthenticated, router])

  function handleLogout() {
    logout()
    router.replace("/")
  }

  // Tampilkan loader sampai status auth siap; setelah siap dan belum login,
  // biarkan efek redirect berjalan tanpa menahan tampilan.
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Memuat dashboard…</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* ---------- Sidebar ---------- */}
      {/* Overlay drawer di layar kecil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg">
              <Image src="/logo-mark.png" alt="Nusa Beras" width={36} height={36} />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Nusa <span className="text-sidebar-primary">Beras</span>
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-sidebar-foreground/70 hover:text-sidebar-foreground lg:hidden"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3 pb-2 pt-1">
          <p className="px-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
            Menu
          </p>
        </div>

        {/* Navigasi */}
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onChangeView(item.key)
                setSidebarOpen(false)
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeView === item.key
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Akun & logout */}
        <div className="border-t border-sidebar-border p-3">
          <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
              A
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Admin Pemerintah</p>
              <p className="truncate text-xs text-sidebar-foreground/60">
                admin
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* ---------- Area konten ---------- */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (mobile) */}
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-base font-bold text-foreground">
            Nusa <span className="text-primary">Beras</span>
          </span>
          <span className="w-9" />
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}