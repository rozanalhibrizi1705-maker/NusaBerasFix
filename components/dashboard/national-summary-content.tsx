"use client"

// ============================================================================
// NationalSummaryContent — ringkasan nasional ketahanan beras: kartu
// statistik agregat + tabel rincian seluruh provinsi (status, harga,
// produksi, konsumsi).
// ============================================================================

import { useMemo, useState } from "react"
import {
  ArrowUpDown,
  CircleDollarSign,
  Factory,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  PROVINCES,
  STATUS_STYLE,
  formatRupiah,
  getNationalSummary,
  type ProvinceData,
  type Status,
} from "@/lib/data"

type SortKey = "name" | "currentPrice" | "production" | "consumption"

export function NationalSummaryContent() {
  const summary = getNationalSummary()
  const [statusFilter, setStatusFilter] = useState<Status | "semua">("semua")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortAsc, setSortAsc] = useState(true)

  const totalProduction = useMemo(
    () => PROVINCES.reduce((sum, p) => sum + p.production, 0),
    [],
  )
  const totalConsumption = useMemo(
    () => PROVINCES.reduce((sum, p) => sum + p.consumption, 0),
    [],
  )

  const stats = [
    {
      label: "Total Provinsi",
      value: `${summary.total} Provinsi`,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Rata-rata Harga Nasional",
      value: formatRupiah(summary.avgPrice),
      icon: CircleDollarSign,
      color: "text-primary",
    },
    {
      label: "Total Produksi",
      value: `${totalProduction.toLocaleString("id-ID")} rb ton/thn`,
      icon: Factory,
      color: "text-sky-600",
    },
    {
      label: "Total Konsumsi",
      value: `${totalConsumption.toLocaleString("id-ID")} rb ton/thn`,
      icon: TrendingDown,
      color: "text-amber-600",
    },
  ]

  const statusBreakdown: Array<{ key: Status; count: number }> = [
    { key: "surplus", count: summary.surplus },
    { key: "stabil", count: summary.stabil },
    { key: "defisit", count: summary.defisit },
  ]

  const filtered = useMemo(() => {
    let rows: ProvinceData[] =
      statusFilter === "semua"
        ? [...PROVINCES]
        : PROVINCES.filter((p) => p.status === statusFilter)

    rows.sort((a, b) => {
      let comparison = 0
      if (sortKey === "name") comparison = a.name.localeCompare(b.name)
      else comparison = a[sortKey] - b[sortKey]
      return sortAsc ? comparison : -comparison
    })

    return rows
  }, [statusFilter, sortKey, sortAsc])

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortAsc((prev) => !prev)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Judul halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Ringkasan Nasional
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gambaran agregat ketahanan beras seluruh provinsi di Indonesia.
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

      {/* Distribusi status */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Distribusi Status Ketahanan
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {statusBreakdown.map(({ key, count }) => {
            const pct = Math.round((count / summary.total) * 100)
            return (
              <div
                key={key}
                className="rounded-xl border border-border/70 bg-background/40 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: STATUS_STYLE[key].fill }}
                    />
                    {STATUS_STYLE[key].label}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {count}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: STATUS_STYLE[key].fill }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {pct}% dari total provinsi
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabel rincian provinsi */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-foreground">
            Rincian Seluruh Provinsi
          </h2>
          {/* Filter status */}
          <div className="flex flex-wrap gap-2">
            {(["semua", "surplus", "stabil", "defisit"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  statusFilter === key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {key === "semua" ? "Semua" : STATUS_STYLE[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/70">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">
                  <button
                    onClick={() => toggleSort("name")}
                    className="flex items-center gap-1 font-medium hover:text-foreground"
                  >
                    Provinsi <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">
                  <button
                    onClick={() => toggleSort("currentPrice")}
                    className="flex items-center gap-1 font-medium hover:text-foreground"
                  >
                    Harga Saat Ini <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3">Prediksi</th>
                <th className="px-4 py-3">
                  <button
                    onClick={() => toggleSort("production")}
                    className="flex items-center gap-1 font-medium hover:text-foreground"
                  >
                    Produksi <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button
                    onClick={() => toggleSort("consumption")}
                    className="flex items-center gap-1 font-medium hover:text-foreground"
                  >
                    Konsumsi <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((p) => {
                const priceUp = p.predictedPrice > p.currentPrice
                const priceDown = p.predictedPrice < p.currentPrice
                return (
                  <tr key={p.id} className="hover:bg-secondary/30">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {p.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[p.status].badge}`}
                      >
                        {STATUS_STYLE[p.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {formatRupiah(p.currentPrice)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`flex items-center gap-1 ${
                          priceUp
                            ? "text-red-600"
                            : priceDown
                              ? "text-emerald-600"
                              : "text-muted-foreground"
                        }`}
                      >
                        {priceUp && <TrendingUp className="h-3.5 w-3.5" />}
                        {priceDown && <TrendingDown className="h-3.5 w-3.5" />}
                        {formatRupiah(p.predictedPrice)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.production.toLocaleString("id-ID")} rb ton
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.consumption.toLocaleString("id-ID")} rb ton
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
