"use client"

// ============================================================================
// PublicLanding — Landing page publik (Masyarakat Umum).
// Fitur: pemilihan provinsi, kartu harga saat ini & prediksi, grafik tren.
// ============================================================================

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowDownRight,
  ArrowUpRight,
  LineChart as LineChartIcon,
  Lock,
  Minus,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { PriceChart } from "@/components/price-chart"
import {
  PROVINCES,
  STATUS_STYLE,
  buildTrend,
  formatRupiah,
} from "@/lib/data"

export function PublicLanding() {
  // Provinsi terpilih (default: Jawa Barat sebagai penyangga utama).
  const [selectedId, setSelectedId] = useState("JAWA BARAT")

  const province = useMemo(
    () => PROVINCES.find((p) => p.id === selectedId) ?? PROVINCES[0],
    [selectedId],
  )
  const trend = useMemo(() => buildTrend(province), [province])

  // Selisih harga prediksi vs harga sekarang.
  const diff = province.predictedPrice - province.currentPrice
  const diffPct = ((diff / province.currentPrice) * 100).toFixed(1)
  const status = STATUS_STYLE[province.status]

  return (
    <div className="min-h-screen bg-background">
      {/* ---------- Header publik ---------- */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg">
              <Image src="/logo-mark.png" alt="Nusa Beras" width={36} height={36} />
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Nusa <span className="text-primary">Beras</span>
            </span>
          </Link>

          <Link href="/login" className={buttonVariants()}>
            <Lock className="h-4 w-4" />
            Login Pemerintah
          </Link>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-sawah.png"
            alt="Hamparan sawah hijau di Indonesia"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Pemantauan Ketahanan Pangan Nasional
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Pantau Harga Beras & Prediksi Mingguan di Seluruh Indonesia
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Nusa Beras menyajikan data harga beras terkini, prediksi harga
              minggu depan, serta tren pergerakannya per provinsi — transparan
              dan mudah dipahami untuk masyarakat.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#nusa-beras" className={buttonVariants({ size: "lg" })}>
                <TrendingUp className="h-4 w-4" />
                Cek Harga Beras
              </a>
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Area Pemerintah
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Fitur Utama: Nusa Beras ---------- */}
      <section id="nusa-beras" className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Cek Harga Beras di Provinsimu
          </h2>
          <p className="mx-auto max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
            Pilih provinsi untuk melihat harga saat ini, prediksi minggu depan,
            dan grafik tren pergerakan harga beras.
          </p>
        </div>

        {/* Pemilih provinsi */}
        <div className="mx-auto mt-8 max-w-md">
          <label
            htmlFor="province-select"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Pilih Provinsi
          </label>
          <select
            id="province-select"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm font-medium text-foreground shadow-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
          >
            {[...PROVINCES]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>

        {/* Kartu informasi */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Harga saat ini */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Harga Beras Saat Ini
              </p>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.badge}`}
              >
                {status.label}
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              {formatRupiah(province.currentPrice)}
              <span className="ml-1 text-base font-medium text-muted-foreground">
                /kg
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {province.name}
            </p>
          </div>

          {/* Prediksi minggu depan */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Prediksi Harga Minggu Depan
              </p>
              <LineChartIcon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              {formatRupiah(province.predictedPrice)}
              <span className="ml-1 text-base font-medium text-muted-foreground">
                /kg
              </span>
            </p>
            <p
              className={`mt-1 flex items-center gap-1 text-sm font-medium ${
                diff > 0
                  ? "text-red-600"
                  : diff < 0
                    ? "text-emerald-600"
                    : "text-muted-foreground"
              }`}
            >
              {diff > 0 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : diff < 0 ? (
                <ArrowDownRight className="h-4 w-4" />
              ) : (
                <Minus className="h-4 w-4" />
              )}
              {diff === 0
                ? "Stabil"
                : `${diff > 0 ? "+" : ""}${formatRupiah(diff)} (${diffPct}%)`}{" "}
              dari minggu ini
            </p>
          </div>
        </div>

        {/* Grafik tren */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Tren Harga Beras — {province.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Pergerakan harga dari minggu ini ke minggu depan
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-4 rounded-full bg-chart-1" />
                Aktual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-0 w-4 border-t-2 border-dashed border-chart-2" />
                Prediksi
              </span>
            </div>
          </div>
          <PriceChart key={province.id} data={trend} mode="public" />
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md">
              <Image src="/logo-mark.png" alt="Nusa Beras" width={28} height={28} />
            </span>
            <span className="text-sm font-semibold text-foreground">
              Nusa Beras
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Prototipe pemantauan ketahanan pangan. Data bersifat simulasi.
          </p>
        </div>
      </footer>
    </div>
  )
}