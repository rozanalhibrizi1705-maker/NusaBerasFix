"use client"

// ============================================================================
// ProvinceDetailPanel — panel samping (slide-over) berisi detail provinsi
// dan rekomendasi kebijakan distribusi beras. Muncul saat provinsi diklik
// pada peta. Responsif: full-width di HP, panel kanan di layar besar.
// ============================================================================

import { useMemo } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Lightbulb,
  Minus,
  Package,
  Users,
  X,
} from "lucide-react"
import { PriceChart } from "@/components/price-chart"
import {
  STATUS_STYLE,
  buildTrend,
  formatRupiah,
  type ProvinceData,
} from "@/lib/data"

interface PanelProps {
  province: ProvinceData | null
  onClose: () => void
}

export function ProvinceDetailPanel({ province, onClose }: PanelProps) {
  const open = !!province
  const trend = useMemo(
    () => (province ? buildTrend(province) : []),
    [province],
  )

  const diff = province ? province.predictedPrice - province.currentPrice : 0
  const status = province ? STATUS_STYLE[province.status] : null

  return (
    <>
      {/* Overlay gelap */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Detail provinsi"
      >
        {province && status && (
          <>
            {/* Header panel */}
            <div className="flex items-start justify-between border-b border-border p-5">
              <div>
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.badge}`}
                >
                  {status.label}
                </span>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                  {province.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Detail wilayah & rekomendasi kebijakan
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Tutup panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Konten yang bisa di-scroll */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Rekomendasi kebijakan */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Rekomendasi Kebijakan Distribusi
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {province.recommendation}
                </p>
              </div>

              {/* Harga */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="text-xs text-muted-foreground">
                    Harga Saat Ini
                  </p>
                  <p className="mt-1 text-lg font-bold text-foreground">
                    {formatRupiah(province.currentPrice)}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="text-xs text-muted-foreground">
                    Prediksi M. Depan
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-lg font-bold text-foreground">
                    {formatRupiah(province.predictedPrice)}
                    {diff > 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-red-600" />
                    ) : diff < 0 ? (
                      <ArrowDownRight className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </p>
                </div>
              </div>

              {/* Produksi & konsumsi */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Produksi</p>
                    <p className="text-sm font-semibold text-foreground">
                      {province.production.toLocaleString("id-ID")} rb ton
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                  <Users className="h-5 w-5 text-chart-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Konsumsi</p>
                    <p className="text-sm font-semibold text-foreground">
                      {province.consumption.toLocaleString("id-ID")} rb ton
                    </p>
                  </div>
                </div>
              </div>

              {/* Grafik tren */}
              <div className="mt-4 rounded-xl border border-border bg-background p-3 sm:p-5">
                <h3 className="mb-2 text-sm font-semibold text-foreground">
                  Tren Harga Beras
                </h3>
                <div className="-mx-2 sm:-mx-3">
                  <PriceChart data={trend} mode="government" />
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
