"use client"

// ============================================================================
// PriceChart — grafik garis tren harga beras.
// Kompatibel dengan data buildTrend() dari lib/data.ts:
// { week, actual, predicted }
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
import { formatRupiah } from "@/lib/data"

type TrendPoint = {
  week?: string
  label?: string
  actual?: number
  predicted?: number
  aktual?: number
  prediksi?: number
}

type NormalizedPoint = {
  week: string
  actual?: number
  predicted?: number
}

function normalizeData(data: TrendPoint[]): NormalizedPoint[] {
  return data.map((point, index) => ({
    week: point.week ?? point.label ?? `M${index + 1}`,
    actual: point.actual ?? point.aktual,
    predicted: point.predicted ?? point.prediksi,
  }))
}

function addSeriesConnectors(data: NormalizedPoint[]): NormalizedPoint[] {
  const firstPredictedIndex = data.findIndex((point) => point.predicted !== undefined)
  if (firstPredictedIndex < 0) return data

  return data.map((point, index) =>
    index === firstPredictedIndex
      ? { ...point, actual: point.predicted }
      : point,
  )
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ dataKey?: string; value?: number }>
  label?: string
}) {
  if (!active || !payload || payload.length === 0) return null

  const actual = payload.find((entry) => entry.dataKey === "actual")?.value
  const predicted = payload.find((entry) => entry.dataKey === "predicted")?.value
  const showPredicted =
    predicted !== undefined &&
    !(actual !== undefined && actual === predicted)

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--color-border)",
        background: "var(--color-card)",
        padding: "8px 12px",
        fontSize: 12,
      }}
    >
      <p style={{ margin: 0, marginBottom: 4, color: "var(--color-foreground)", fontWeight: 600 }}>
        {label}
      </p>
      {actual !== undefined && (
        <p style={{ margin: 0, color: "#22c55e" }}>
          Harga Aktual: {formatRupiah(actual)}
        </p>
      )}
      {showPredicted && (
        <p style={{ margin: 0, color: "#facc15" }}>
          Prediksi: {formatRupiah(predicted as number)}
        </p>
      )}
    </div>
  )
}

export function PriceChart({
  data,
  mode = "government",
}: {
  data: TrendPoint[]
  mode?: "public" | "government"
}) {
  const normalizedData = addSeriesConnectors(normalizeData(data))
  const chartData =
    mode === "public"
      ? normalizedData
          .filter((point) => point.actual !== undefined || point.week === "Minggu Ini" || point.week === "M+1")
          .map((point) => {
            if (point.week === "M+1") return { ...point, week: "Minggu Depan" }
            return point
          })
      : normalizedData

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--color-border)" }}
          />
          <YAxis
            width={72}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            domain={([dataMin, dataMax]) => {
              const padding = Math.max(200, (dataMax - dataMin) * 0.15)
              return [
                Math.floor((dataMin - padding) / 100) * 100,
                Math.ceil((dataMax + padding) / 100) * 100,
              ]
            }}
            tickFormatter={(value: number) => `Rp${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="actual"
            name="Harga Aktual"
            stroke="#22c55e"
            strokeWidth={2.4}
            dot={{ r: 3, fill: "#22c55e", stroke: "#ffffff", strokeWidth: 1 }}
            activeDot={{ r: 5 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="predicted"
            name="Prediksi"
            stroke="#facc15"
            strokeWidth={2.2}
            strokeDasharray="6 5"
            dot={{ r: 3, fill: "#facc15", stroke: "#ffffff", strokeWidth: 1 }}
            activeDot={{ r: 5 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
