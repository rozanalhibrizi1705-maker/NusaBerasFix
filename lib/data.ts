    consumption: 131180,
  },
  {
    id: "papua-barat",
    name: "Papua Barat",
    kluster: "D",
    status: "defisit",
    currentPrice: 16843,
    predictedPrice: 16865,
    prediksi12Minggu: [16843,16837,16833,16830,16829,16830,16832,16835,16840,16847,16855,16865],
    perubahanKumulatifPct: 0.09,
    shapeTrajectory: "late_surge",
    skorPrioritas: 9.128,
    pasarTerhubung: ["Papua", "Sulawesi Selatan"],
    rekomendasiOperasional: "Harga beras di Papua Barat diprediksi stabil dalam 3 bulan ke depan, namun dengan surplus ratio 0.07, stabilitas ini bergantung penuh pada kelancaran pasokan dari luar daerah. Pasar Papua dan Sulawesi Selatan saat ini masih stabil. Gunakan jeda ini untuk memastikan kelancaran distribusi internal. Susun protokol respons darurat untuk skenario gangguan jalur pasokan utama. Diversifikasi sumber pasokan dengan menjalin kesepakatan awal bersama minimal dua provinsi pemasok.",
    rekomendasiStruktural: "Rantai distribusi beras di Papua Barat lebih panjang dibanding median nasional (nilai 4.00). Petakan seluruh titik perantara dan identifikasi tahapan yang dapat dihilangkan. Fasilitasi skema kemitraan langsung antara penggilingan padi dan jaringan pengecer. Terapkan sistem informasi harga terbuka di tingkat pedagang grosir.",
    recommendation: "Harga beras di Papua Barat diprediksi stabil dalam 3 bulan ke depan, namun dengan surplus ratio 0.07, stabilitas ini bergantung penuh pada kelancaran pasokan dari luar daerah. Pasar Papua dan Sulawesi Selatan saat ini masih stabil. Gunakan jeda ini untuk memastikan kelancaran distribusi internal. Susun protokol respons darurat untuk skenario gangguan jalur pasokan utama. Diversifikasi sumber pasokan dengan menjalin kesepakatan awal bersama minimal dua provinsi pemasok.",
    production: 8360,
    consumption: 116780,
  },
  {
    id: "papua",
    name: "Papua",
    kluster: "D",
    status: "defisit",
    currentPrice: 19034,
    predictedPrice: 18838,
    prediksi12Minggu: [19034,19018,19001,18985,18968,18950,18932,18914,18896,18877,18858,18838],
    perubahanKumulatifPct: -1.11,
    shapeTrajectory: "stabil",
    skorPrioritas: 6.917,
    pasarTerhubung: ["Sulawesi Selatan", "Jawa Timur"],
    rekomendasiOperasional: "Harga beras di Papua diprediksi stabil dalam 3 bulan ke depan, namun dengan surplus ratio 0.68, stabilitas ini bergantung penuh pada kelancaran pasokan dari luar daerah. Pasar Sulawesi Selatan dan Jawa Timur saat ini masih stabil. Gunakan jeda ini untuk memastikan kelancaran distribusi internal. Susun protokol respons darurat untuk skenario gangguan jalur pasokan utama. Diversifikasi sumber pasokan dengan menjalin kesepakatan awal bersama minimal dua provinsi pemasok.",
    rekomendasiStruktural: "Papua — tidak ada catatan struktural yang memerlukan perhatian saat ini.",
    recommendation: "Harga beras di Papua diprediksi stabil dalam 3 bulan ke depan, namun dengan surplus ratio 0.68, stabilitas ini bergantung penuh pada kelancaran pasokan dari luar daerah. Pasar Sulawesi Selatan dan Jawa Timur saat ini masih stabil. Gunakan jeda ini untuk memastikan kelancaran distribusi internal. Susun protokol respons darurat untuk skenario gangguan jalur pasokan utama. Diversifikasi sumber pasokan dengan menjalin kesepakatan awal bersama minimal dua provinsi pemasok.",
    production: 195980,
    consumption: 288070,
  },
]

// ---------------------------------------------------------------------------
// Lookup maps
// ---------------------------------------------------------------------------

/** Lookup by id */
export const PROVINCE_MAP: Record<string, ProvinceData> = Object.fromEntries(
  PROVINCES.map((p) => [p.id, p])
)

/**
 * Lookup by raw GeoJSON Propinsi key.
 * Key = nilai PERSIS dari field Propinsi di indonesia-provinces.json (huruf kapital, nama lama).
 */
const GEO_NAME_MAP: Record<string, string> = {
  // Sumatera
  "DI. ACEH": "aceh",
  "SUMATERA UTARA": "sumatera-utara",
  "SUMATERA BARAT": "sumatera-barat",
  "RIAU": "riau",
  "KEP. RIAU": "kepulauan-riau",
  "JAMBI": "jambi",
  "SUMATERA SELATAN": "sumatera-selatan",
  "BANGKA BELITUNG": "kepulauan-bangka-belitung",
  "BENGKULU": "bengkulu",
  "LAMPUNG": "lampung",
  // Jawa
  "DKI JAKARTA": "dki-jakarta",
  "JAWA BARAT": "jawa-barat",
  "JAWA TENGAH": "jawa-tengah",
  "DAERAH ISTIMEWA YOGYAKARTA": "di-yogyakarta",
  "JAWA TIMUR": "jawa-timur",
  "PROBANTEN": "banten",          // nama lama Banten di GeoJSON ini
  // Bali & Nusa Tenggara
  "BALI": "bali",
  "NUSATENGGARA BARAT": "nusa-tenggara-barat",
  "NUSA TENGGARA TIMUR": "nusa-tenggara-timur",
  // Kalimantan
  "KALIMANTAN BARAT": "kalimantan-barat",
  "KALIMANTAN TENGAH": "kalimantan-tengah",
  "KALIMANTAN SELATAN": "kalimantan-selatan",
  "KALIMANTAN TIMUR": "kalimantan-timur",
  "KALIMANTAN UTARA": "kalimantan-utara",
  // Sulawesi
  "SULAWESI UTARA": "sulawesi-utara",
  "SULAWESI TENGAH": "sulawesi-tengah",
  "SULAWESI SELATAN": "sulawesi-selatan",
  "SULAWESI TENGGARA": "sulawesi-tenggara",
  "GORONTALO": "gorontalo",
  "SULAWESI BARAT": "sulawesi-barat",
  // Maluku & Papua
  "MALUKU": "maluku",
  "MALUKU UTARA": "maluku-utara",
  "IRIAN JAYA BARAT": "papua-barat",   // nama lama Papua Barat
  "IRIAN JAYA TIMUR": "papua",         // nama lama Papua
}

/**
 * Dipakai IndonesiaMap: lookup ProvinceData dari nama GeoJSON Propinsi.
 */
export const PROVINCE_MAP_BY_GEO: Record<string, ProvinceData> = Object.fromEntries(
  Object.entries(GEO_NAME_MAP)
    .filter(([, id]) => PROVINCE_MAP[id])
    .map(([geoName, id]) => [geoName, PROVINCE_MAP[id]])
)

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function getNationalSummary() {
  const total = PROVINCES.length
  const surplus = PROVINCES.filter((p) => p.status === "surplus").length
  const stabil = PROVINCES.filter((p) => p.status === "stabil").length
  const defisit = PROVINCES.filter((p) => p.status === "defisit").length
  const avgPrice = Math.round(
    PROVINCES.reduce((sum, p) => sum + p.currentPrice, 0) / total
  )
  return { total, surplus, stabil, defisit, avgPrice }
}

/**
 * Membangun array titik tren harga untuk PriceChart.
 * Menggunakan prediksi_12minggu: minggu 1 = aktual, minggu 2–12 = prediksi.
 */
export function buildTrend(
  province: ProvinceData
): Array<{ week: string; actual?: number; predicted?: number }> {
  return province.prediksi12Minggu.map((price, i) => ({
    week: `M${i + 1}`,
    actual: i === 0 ? price : undefined,
    predicted: i > 0 ? price : undefined,
  }))
}
