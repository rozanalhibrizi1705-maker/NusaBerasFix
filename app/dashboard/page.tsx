"use client"

// Halaman Dashboard Pemerintah (terproteksi).
// DashboardShell menangani proteksi rute & sidebar; konten yang ditampilkan
// berpindah antara Peta Rekomendasi dan Ringkasan Nasional lewat state `view`.
import { useState } from "react"
import { DashboardShell, type DashboardView } from "@/components/dashboard/dashboard-shell"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { NationalSummaryContent } from "@/components/dashboard/national-summary-content"

export default function DashboardPage() {
  const [view, setView] = useState<DashboardView>("peta")

  return (
    <DashboardShell activeView={view} onChangeView={setView}>
      {view === "peta" ? <DashboardContent /> : <NationalSummaryContent />}
    </DashboardShell>
  )
}