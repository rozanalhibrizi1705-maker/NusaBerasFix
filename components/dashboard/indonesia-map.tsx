"use client"

// ============================================================================
// IndonesiaMap — peta interaktif provinsi Indonesia.
// Setiap provinsi diwarnai berdasarkan status (surplus/stabil/defisit) dan
// dapat diklik untuk membuka panel detail.
// Memakai react-simple-maps + GeoJSON di /public/indonesia-provinces.json.
// ============================================================================

import { useState } from "react"

declare module "react-simple-maps" {
  import type { ComponentType } from "react"

  export const ComposableMap: ComponentType<any>
  export const Geographies: ComponentType<any>
  export const Geography: ComponentType<any>
}

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { PROVINCE_MAP, STATUS_STYLE, type ProvinceData } from "@/lib/data"

const GEO_URL = "/indonesia-provinces.json"

interface IndonesiaMapProps {
  selectedId: string | null
  onSelect: (province: ProvinceData) => void
}

export function IndonesiaMap({ selectedId, onSelect }: IndonesiaMapProps) {
  // Provinsi yang sedang di-hover (untuk tooltip).
  const [hovered, setHovered] = useState<{
    name: string
    statusLabel: string
    x: number
    y: number
  } | null>(null)

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          // Pusatkan & perbesar agar fokus ke kepulauan Indonesia.
          scale: 1050,
          center: [118, -2.5],
        }}
        width={800}
        height={350}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const rawId: string = geo.properties.Propinsi
              const data = PROVINCE_MAP[rawId]
              const status = data ? STATUS_STYLE[data.status] : null
              const isSelected = data && data.id === selectedId

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => data && onSelect(data)}
                  onMouseEnter={(e) => {
                    if (data && status) {
                      setHovered({
                        name: data.name,
                        statusLabel: status.label,
                        x: e.clientX,
                        y: e.clientY,
                      })
                    }
                  }}
                  onMouseMove={(e) =>
                    setHovered((h) =>
                      h ? { ...h, x: e.clientX, y: e.clientY } : h,
                    )
                  }
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    default: {
                      fill: status ? status.fill : "#cbd5e1",
                      stroke: "#ffffff",
                      strokeWidth: isSelected ? 1.5 : 0.5,
                      outline: "none",
                      opacity: isSelected ? 1 : 0.88,
                      transition: "opacity 150ms, fill 150ms",
                    },
                    hover: {
                      fill: status ? status.hover : "#94a3b8",
                      stroke: "#ffffff",
                      strokeWidth: 1,
                      outline: "none",
                      opacity: 1,
                      cursor: data ? "pointer" : "default",
                    },
                    pressed: {
                      fill: status ? status.hover : "#94a3b8",
                      outline: "none",
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip mengikuti kursor */}
      {hovered && (
        <div
          className="pointer-events-none fixed z-50 rounded-lg border border-border bg-popover px-3 py-1.5 text-xs shadow-md"
          style={{ left: hovered.x + 12, top: hovered.y + 12 }}
        >
          <p className="font-semibold text-popover-foreground">
            {hovered.name}
          </p>
          <p className="text-muted-foreground">
            Status: {hovered.statusLabel}
          </p>
        </div>
      )}
    </div>
  )
}
