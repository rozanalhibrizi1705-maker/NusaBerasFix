"use client"

// ============================================================================
// DashboardContent — isi utama dashboard: kartu ringkasan nasional,
// peta interaktif, legenda status, dan panel detail provinsi.
// ============================================================================

import { useState } from "react"
import { CircleDollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { IndonesiaMap } from "@/components/dashboard/indonesia-map"
import { ProvinceDetailPanel } from "@/components/dashboard/province-detail-panel"
import {
  STATUS_STYLE,
  formatRupiah,
  getNationalSummary,
  type ProvinceData,
} from "@/lib/data"

export function DashboardContent() {
  // Provinsi yang sedang dipilih/dibuka di panel detail.
  const [selected, setSelected] = useState<ProvinceData | null>(null)
  const summary = getNationalSummary()

  // Definisi kartu statistik ringkasan nasional.
  const stats = [
    {
      label: "Rata-rata Harga Nasional",
      value: formatRupiah(summary.avgPrice),
      icon: CircleDollarSign,
      color: "text-primary",
    },
    {
      label: "Provinsi Surplus",
      value: `${summary.surplus} Provinsi`,
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      label: "Provinsi Defisit",
      value: `${summary.defisit} Provinsi`,
      icon: TrendingDown,
      color: "text-red-600",
    },
    
    
  ]

  return (
    <div className="mx-auto max-w-6xl">
      {/* Judul halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Peta Rekomendasi Kebijakan
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Klik sebuah provinsi pada peta untuk melihat detail data dan
          rekomendasi kebijakan distribusi beras.
        </p>
      </div>

      {/* Kartu statistik */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">
                {s.label}
              </p>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Peta + legenda */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-foreground">
            Peta Status Ketahanan Beras Indonesia
          </h2>
          {/* Legenda warna */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {(["surplus", "stabil", "defisit"] as const).map((key) => (
              <span key={key} className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{ background: STATUS_STYLE[key].fill }}
                />
                {STATUS_STYLE[key].label}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-secondary/40 p-2">
          <IndonesiaMap
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
          />
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Arahkan kursor untuk melihat nama provinsi, lalu klik untuk membuka
          detail.
        </p>
      </div>

      {/* Panel detail samping */}
      {selected && (
        <ProvinceDetailPanel
          province={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
