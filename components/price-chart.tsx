"use client"

// ============================================================================
// PriceChart — grafik garis tren harga beras (aktual vs prediksi).
// Menggunakan Recharts agar tampil lebih dekat dengan desain reference.
// ============================================================================

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { formatRupiah, type TrendPoint } from "@/lib/data"

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ dataKey?: string; value?: number; payload?: TrendPoint }>
  label?: string
}) {
  if (!active || !payload || payload.length === 0) return null

  const aktualEntry = payload.find((entry) => entry.dataKey === "aktual")
  const prediksiEntry = payload.find((entry) => entry.dataKey === "prediksi")

  const aktualValue = aktualEntry?.value
  const prediksiValue = prediksiEntry?.value

  // Kalau nilai prediksi sama dengan aktual (titik "Minggu Ini" yang dipakai
  // hanya untuk menyambungkan garis putus-putus secara visual), jangan
  // tampilkan baris "Prediksi" di tooltip — cukup tampilkan "Harga Aktual".
  const showPrediksi =
    prediksiValue !== undefined &&
    prediksiValue !== null &&
    !(aktualValue !== undefined && aktualValue !== null && prediksiValue === aktualValue)

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--color-border)",
        background: "var(--color-card)",
        fontSize: 12,
        padding: "8px 12px",
      }}
    >
      <p style={{ color: "var(--color-foreground)", fontWeight: 600, margin: 0, marginBottom: 4 }}>
        {label}
      </p>
      {aktualValue !== undefined && aktualValue !== null && (
        <p style={{ color: "#2f8f4c", margin: 0 }}>
          Harga Aktual : {formatRupiah(aktualValue)}
        </p>
      )}
      {showPrediksi && (
        <p style={{ color: "#f5c542", margin: 0 }}>
          Prediksi : {formatRupiah(prediksiValue as number)}
        </p>
      )}
    </div>
  )
}

export function PriceChart({ data, mode = "government" }: { data: TrendPoint[]; mode?: "public" | "government" }) {
  const visibleData = (() => {
    if (mode !== "public") return data

    const base = data.slice(0, 4)
    return base.map((point, index) => {
      if (index === base.length - 2) {
        return { ...point, prediksi: point.aktual ?? point.prediksi }
      }
      if (index === base.length - 1) {
        return { ...point, prediksi: point.prediksi ?? point.aktual }
      }
      return point
    })
  })()

  return (
    <div className="h-72 w-full rounded-xl border border-border/70 bg-background/40 p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={visibleData} margin={{ top: 10, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--color-border)" }}
          />
          <YAxis
            width={72}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={16}
            domain={([dataMin, dataMax]) => {
              const padding = Math.max(400, (dataMax - dataMin) * 0.16)
              const roundedMin = Math.floor((dataMin - padding) / 100) * 100
              const roundedMax = Math.ceil((dataMax + padding) / 100) * 100
              const step = Math.max(100, Math.round((roundedMax - roundedMin) / 4 / 100) * 100)
              return [roundedMin, roundedMax + step]
            }}
            tickFormatter={(value: number) => {
              const rounded = Math.round(value / 100) * 100
              return `Rp${rounded / 1000}k`
            }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="aktual"
            name="aktual"
            stroke="#2f8f4c"
            strokeWidth={2}
            dot={{ r: 3.2, fill: "#2f8f4c", stroke: "#ffffff", strokeWidth: 1 }}
            activeDot={{ r: 4.2, fill: "#2f8f4c", stroke: "#ffffff", strokeWidth: 1 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="prediksi"
            name="prediksi"
            stroke="#f5c542"
            strokeWidth={1.4}
            strokeDasharray="5 4"
            dot={(props: any) => {
              const { cx, cy, payload, index } = props
              // Jangan render dot kalau prediksi-nya null (tidak ada data di titik ini).
              if (payload?.prediksi === null || payload?.prediksi === undefined) {
                return <g key={`dot-prediksi-${index}`} />
              }
              // Jangan render dot kuning kalau nilainya sama dengan aktual
              // (titik "Minggu Ini") — biar tidak menutupi dot hijau.
              if (
                payload?.aktual !== undefined &&
                payload?.aktual !== null &&
                payload?.prediksi === payload?.aktual
              ) {
                return <g key={`dot-prediksi-${index}`} />
              }
              return (
                <circle
                  key={`dot-prediksi-${index}`}
                  cx={cx}
                  cy={cy}
                  r={2.8}
                  fill="#f5c542"
                  stroke="#ffffff"
                  strokeWidth={1}
                />
              )
            }}
            activeDot={{
              r: 3.8,
              fill: "#f5c542",
              stroke: "#ffffff",
              strokeWidth: 1,
            }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
