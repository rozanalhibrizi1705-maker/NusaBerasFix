// ============================================================================
// lib/data.ts
// Sumber data dummy terstruktur untuk simulasi aplikasi Nusa Beras.
// Semua angka bersifat fiktif dan hanya untuk keperluan prototipe.
// ============================================================================

// Status ketahanan beras sebuah provinsi.
//  - "surplus" : produksi melebihi konsumsi (aman)
//  - "stabil"  : produksi ~ konsumsi (perlu pemantauan)
//  - "defisit" : konsumsi melebihi produksi (rawan / butuh intervensi)
export type Status = "surplus" | "stabil" | "defisit"

export interface ProvinceData {
  /** Kunci mentah sesuai properti "Propinsi" pada GeoJSON peta */
  id: string
  /** Nama tampilan yang rapi untuk UI */
  name: string
  status: Status
  /** Harga beras saat ini (Rp / kg) */
  currentPrice: number
  /** Prediksi harga beras minggu depan (Rp / kg) */
  predictedPrice: number
  /** Estimasi produksi beras (ribu ton / tahun) */
  production: number
  /** Estimasi konsumsi beras (ribu ton / tahun) */
  consumption: number
  /** Rekomendasi kebijakan distribusi spesifik untuk daerah ini */
  recommendation: string
}

// ----------------------------------------------------------------------------
// Dataset utama. Kunci `id` HARUS sama persis dengan properti "Propinsi"
// di dalam /public/indonesia-provinces.json agar peta bisa diwarnai.
// ----------------------------------------------------------------------------
export const PROVINCES: ProvinceData[] = [
  {
    id: "DI. ACEH",
    name: "Aceh",
    status: "stabil",
    currentPrice: 13200,
    predictedPrice: 13400,
    production: 1850,
    consumption: 1790,
    recommendation:
      "Pertahankan stok cadangan di gudang Bulog Banda Aceh, prioritaskan pengawasan harga di wilayah pesisir, dan siapkan distribusi cepat ke daerah yang mulai mengalami kenaikan permintaan menjelang musim paceklik. Langkah ini penting untuk mencegah lonjakan harga yang tidak terkendali dan menjaga daya beli masyarakat.",
  },
  {
    id: "SUMATERA UTARA",
    name: "Sumatera Utara",
    status: "surplus",
    currentPrice: 12800,
    predictedPrice: 12700,
    production: 3100,
    consumption: 2650,
    recommendation:
      "Jadikan Sumatera Utara sebagai hub distribusi regional dengan mengoptimalkan pengangkutan ke Aceh, Kepulauan Riau, dan wilayah lain yang membutuhkan pasokan tambahan. Perkuat kerja sama dengan Bulog, distributor swasta, dan pelaku logistik untuk menjaga kelancaran rantai pasok dan menstabilkan harga di pasar lokal maupun antarpulau.",
  },
  {
    id: "SUMATERA BARAT",
    name: "Sumatera Barat",
    status: "surplus",
    currentPrice: 13000,
    predictedPrice: 12950,
    production: 2050,
    consumption: 1600,
    recommendation:
      "Optimalkan serapan gabah petani oleh Bulog melalui pembelian yang stabil dan harga yang adil, lalu dorong distribusi antarkabupaten dan antarpulau ke wilayah yang sedang mengalami defisit seperti Riau dan Jambi. Dukungan terhadap petani juga perlu diperkuat agar produksi tetap terjaga dan rantai pasok tidak terganggu.",
  },
  {
    id: "RIAU",
    name: "Riau",
    status: "defisit",
    currentPrice: 14100,
    predictedPrice: 14600,
    production: 720,
    consumption: 1450,
    recommendation:
      "Prioritaskan operasi pasar di Pekanbaru dan Dumai, serta perkuat pasokan beras dari Sumatera Utara dan Sumatera Barat melalui jalur distribusi yang lebih terencana. Aktivasi sistem pengawasan harga dan pengendalian stok melalui SPHP sangat penting untuk menekan lonjakan harga dan memastikan ketersediaan beras tetap terjaga di wilayah perkotaan dan industri.",
  },
  {
    id: "JAMBI",
    name: "Jambi",
    status: "stabil",
    currentPrice: 13300,
    predictedPrice: 13500,
    production: 980,
    consumption: 940,
    recommendation:
      "Jaga keseimbangan stok secara ketat dan siapkan jalur distribusi cepat dari Sumatera Selatan apabila defisit musiman muncul. Pemantauan harga harian, penyesuaian pasokan, dan koordinasi lintas kabupaten akan membantu mencegah terjadinya kelangkaan maupun spekulasi pasar yang merugikan masyarakat.",
  },
  {
    id: "SUMATERA SELATAN",
    name: "Sumatera Selatan",
    status: "surplus",
    currentPrice: 12600,
    predictedPrice: 12500,
    production: 2950,
    consumption: 2100,
    recommendation:
      "Perkuat kapasitas penyimpanan dan distribusi agar surplus beras dapat tersalurkan secara cepat ke Jambi, Bengkulu, dan Lampung yang membutuhkan pasokan tambahan. Peningkatan logistik, perbaikan fasilitas gudang, dan koordinasi antarwilayah akan membuat distribusi lebih efisien dan mengurangi potensi pemborosan maupun keterlambatan penyaluran.",
  },
  {
    id: "BENGKULU",
    name: "Bengkulu",
    status: "stabil",
    currentPrice: 13450,
    predictedPrice: 13600,
    production: 640,
    consumption: 600,
    recommendation:
      "Lakukan pemantauan rutin harga eceran dan pastikan pasokan dari Sumatera Selatan tetap lancar, terutama saat cuaca ekstrem memengaruhi distribusi. Langkah ini penting untuk menjaga stabilitas harga di wilayah yang relatif kecil namun sangat sensitif terhadap perubahan pasokan.",
  },
  {
    id: "LAMPUNG",
    name: "Lampung",
    status: "surplus",
    currentPrice: 12400,
    predictedPrice: 12350,
    production: 2700,
    consumption: 1950,
    recommendation:
      "Manfaatkan Lampung sebagai gerbang logistik utama ke Pulau Jawa dengan memastikan kelancaran penyeberangan Bakauheni dan penanganan antrean logistik yang cepat. Distribusi yang lancar ke wilayah Jabodetabek akan membantu menstabilkan pasokan dan mengurangi risiko kenaikan harga di pusat konsumsi besar.",
  },
  {
    id: "BANGKA BELITUNG",
    name: "Bangka Belitung",
    status: "defisit",
    currentPrice: 14500,
    predictedPrice: 15000,
    production: 90,
    consumption: 410,
    recommendation:
      "Karena wilayah kepulauan sangat bergantung pada pasokan luar, amankan jadwal kapal logistik dari Sumatera Selatan, perkuat sistem distribusi antarpulau, dan jaga stok penyangga minimal tiga bulan. Langkah ini sangat penting untuk mengantisipasi gangguan cuaca, keterlambatan pelayaran, dan fluktuasi harga yang tajam.",
  },
  {
    id: "DKI JAKARTA",
    name: "DKI Jakarta",
    status: "defisit",
    currentPrice: 14800,
    predictedPrice: 15200,
    production: 5,
    consumption: 2400,
    recommendation:
      "Karena Jakarta adalah pusat konsumsi tanpa produksi yang cukup besar, jaga stok Pasar Induk Cipinang secara ketat, gencarkan operasi pasar, dan koordinasikan pasokan dari Jawa Barat serta Jawa Tengah secara berkelanjutan. Ketersediaan yang stabil di ibu kota sangat penting untuk menjaga harga tetap terkendali dan mencegah gejolak pasar.",
  },
  {
    id: "PROBANTEN",
    name: "Banten",
    status: "stabil",
    currentPrice: 13700,
    predictedPrice: 13900,
    production: 1450,
    consumption: 1400,
    recommendation:
      "Pantau harga secara intensif di wilayah industri Tangerang dan sekitarnya, lalu siapkan pasokan beras SPHP untuk meredam kenaikan harga akibat tingginya permintaan urban. Kebijakan ini penting untuk menjaga daya beli masyarakat pekerja dan menahan lonjakan akibat konsumsi yang padat.",
  },
  {
    id: "JAWA BARAT",
    name: "Jawa Barat",
    status: "surplus",
    currentPrice: 12900,
    predictedPrice: 12800,
    production: 9500,
    consumption: 8200,
    recommendation:
      "Jawa Barat tetap menjadi penyangga utama beras nasional, sehingga perlu diperkuat serapan gabah petani, pengawasan distribusi, dan koordinasi harian ke DKI Jakarta serta Banten. Langkah ini akan memastikan pasokan tetap stabil sekaligus mendukung harga yang wajar di wilayah konsumen besar.",
  },
  {
    id: "JAWA TENGAH",
    name: "Jawa Tengah",
    status: "surplus",
    currentPrice: 12500,
    predictedPrice: 12450,
    production: 9800,
    consumption: 7600,
    recommendation:
      "Jawa Tengah perlu memaksimalkan penyerapan gabah pada saat panen raya dan menyalurkan surplus secara terarah ke provinsi defisit di Indonesia Timur. Strategi ini tidak hanya menjaga harga di tingkat petani tetap menguntungkan, tetapi juga memperkuat ketahanan pangan nasional secara keseluruhan.",
  },
  {
    id: "DAERAH ISTIMEWA YOGYAKARTA",
    name: "DI Yogyakarta",
    status: "stabil",
    currentPrice: 13100,
    predictedPrice: 13250,
    production: 880,
    consumption: 830,
    recommendation:
      "Jaga keseimbangan stok untuk kebutuhan mahasiswa, wisatawan, dan masyarakat perkotaan, serta siapkan koordinasi pasokan cepat dengan Jawa Tengah ketika lonjakan permintaan musiman terjadi. Pendekatan ini penting untuk menjaga ketersediaan beras tanpa menimbulkan lonjakan harga di pasar lokal.",
  },
  {
    id: "JAWA TIMUR",
    name: "Jawa Timur",
    status: "surplus",
    currentPrice: 12300,
    predictedPrice: 12250,
    production: 10500,
    consumption: 8100,
    recommendation:
      "Jawa Timur sebagai produsen beras terbesar nasional perlu diperkuat posisinya sebagai basis pengiriman antarpulau ke Kalimantan, Sulawesi, Bali, dan Nusa Tenggara Timur. Dukungan logistik, kapasitas gudang, dan penjadwalan distribusi yang baik akan menjaga suplai tetap lancar dan harga lebih stabil di wilayah tujuan.",
  },
  {
    id: "BALI",
    name: "Bali",
    status: "stabil",
    currentPrice: 13600,
    predictedPrice: 13800,
    production: 820,
    consumption: 900,
    recommendation:
      "Karena konsumsi beras di Bali sangat dipengaruhi aktivitas pariwisata, amankan pasokan tambahan dari Jawa Timur dan pantau harga secara lebih ketat menjelang musim liburan. Kesiapan stok di daerah wisata sangat penting untuk menjaga kestabilan harga dan kenyamanan wisatawan maupun masyarakat lokal.",
  },
  {
    id: "NUSATENGGARA BARAT",
    name: "Nusa Tenggara Barat",
    status: "surplus",
    currentPrice: 12700,
    predictedPrice: 12650,
    production: 1500,
    consumption: 1200,
    recommendation:
      "Manfaatkan surplus dari Pulau Lombok dan Sumbawa untuk menyalurkan beras ke Nusa Tenggara Timur dan Bali yang lebih rentan mengalami fluktuasi pasokan. Distribusi yang terjadwal dengan baik akan membantu menyeimbangkan harga di wilayah-wilayah yang sering mengalami gangguan transportasi dan cuaca.",
  },
  {
    id: "NUSA TENGGARA TIMUR",
    name: "Nusa Tenggara Timur",
    status: "defisit",
    currentPrice: 15200,
    predictedPrice: 15800,
    production: 560,
    consumption: 1100,
    recommendation:
      "Nusa Tenggara Timur termasuk wilayah yang rawan pangan dan sangat sensitif terhadap cuaca kering, sehingga perlu dibangun stok penyangga yang memadai, dipercepat distribusinya dari NTB dan Sulawesi Selatan, serta diperluas program bantuan pangan bagi masyarakat yang paling rentan. Langkah ini penting untuk mengurangi risiko kelangkaan dan menahan lonjakan harga.",
  },
  {
    id: "KALIMANTAN BARAT",
    name: "Kalimantan Barat",
    status: "stabil",
    currentPrice: 13800,
    predictedPrice: 14000,
    production: 1300,
    consumption: 1250,
    recommendation:
      "Pantau harga secara intensif di wilayah perbatasan, optimalkan produksi lokal, dan pastikan jalur pasokan dari Jawa melalui Pelabuhan Pontianak tetap lancar. Kesiapan logistik yang baik akan membantu menjaga ketersediaan beras dan mengurangi tekanan harga akibat keterbatasan distribusi.",
  },
  {
    id: "KALIMANTAN TENGAH",
    name: "Kalimantan Tengah",
    status: "stabil",
    currentPrice: 13900,
    predictedPrice: 14100,
    production: 950,
    consumption: 880,
    recommendation:
      "Dorong perluasan areal tanam, cetak sawah, dan penguatan food estate secara bertahap, sambil memastikan pasokan dari Kalimantan Selatan dan Jawa Timur tetap tersedia untuk menutup kekurangan jangka pendek. Kebijakan ini penting agar provinsi dapat mengurangi ketergantungan terhadap pasokan luar dalam jangka menengah.",
  },
  {
    id: "KALIMANTAN SELATAN",
    name: "Kalimantan Selatan",
    status: "surplus",
    currentPrice: 13000,
    predictedPrice: 12950,
    production: 2200,
    consumption: 1500,
    recommendation:
      "Kalimantan Selatan dapat diperkuat posisinya sebagai lumbung padi Kalimantan dengan menjadi pemasok utama bagi Kalimantan Tengah, Kalimantan Timur, dan wilayah sekitar ibu kota nusantara (IKN). Dukungan terhadap sarana penyimpanan, distribusi, dan pembelian gabah dari petani akan memperkuat peran strategis provinsi ini dalam menjaga ketahanan pangan regional.",
  },
  {
    id: "KALIMANTAN TIMUR",
    name: "Kalimantan Timur",
    status: "defisit",
    currentPrice: 14400,
    predictedPrice: 14900,
    production: 480,
    consumption: 1150,
    recommendation:
      "Karena kebutuhan beras di Kalimantan Timur sangat tinggi, termasuk untuk kawasan IKN, amankan pasokan dari Kalimantan Selatan dan Sulawesi Selatan, perkuat logistik pelabuhan, dan pantau harga secara ketat di wilayah Balikpapan-Samarinda. Koordinasi yang baik antara distributor, pelabuhan, dan pasar lokal akan membantu mengurangi potensi kelangkaan.",
  },
  {
    id: "SULAWESI UTARA",
    name: "Sulawesi Utara",
    status: "stabil",
    currentPrice: 13500,
    predictedPrice: 13650,
    production: 720,
    consumption: 690,
    recommendation:
      "Jaga keseimbangan stok di kota-kota utama seperti Manado dan siapkan pasokan cadangan dari Sulawesi Selatan apabila terjadi gangguan cuaca atau hambatan distribusi. Tindakan pencegahan ini penting untuk mencegah gejolak harga yang tajam di pasar lokal.",
  },
  {
    id: "GORONTALO",
    name: "Gorontalo",
    status: "surplus",
    currentPrice: 13200,
    predictedPrice: 13100,
    production: 680,
    consumption: 480,
    recommendation:
      "Manfaatkan surplus jagung dan padi untuk menyalurkan kelebihan beras ke Sulawesi Utara dan Sulawesi Tengah, terutama saat kebutuhan meningkat di wilayah-wilayah yang lebih terpencil. Distribusi yang terencana akan membantu menjaga pasokan tetap stabil dan mengurangi ketergantungan pada impor dari luar daerah.",
  },
  {
    id: "SULAWESI TENGAH",
    name: "Sulawesi Tengah",
    status: "stabil",
    currentPrice: 13600,
    predictedPrice: 13800,
    production: 1050,
    consumption: 980,
    recommendation:
      "Perkuat pemulihan produksi pasca-bencana, jaga distribusi ke wilayah terpencil, dan pastikan stok cadangan di Palu tetap memadai. Langkah ini penting agar pasokan beras tetap aman ketika akses jalan dan transportasi terganggu.",
  },
  {
    id: "SULAWESI SELATAN",
    name: "Sulawesi Selatan",
    status: "surplus",
    currentPrice: 12200,
    predictedPrice: 12150,
    production: 6000,
    consumption: 3800,
    recommendation:
      "Jadikan Sulawesi Selatan sebagai lumbung pangan Indonesia Timur dengan memperkuat peran pusat distribusi ke Kalimantan, Maluku, Papua, dan Nusa Tenggara Timur. Penguatan logistik, penjaminan kualitas, dan sinkronisasi pasokan akan sangat membantu menjaga ketahanan pangan di wilayah-wilayah yang sulit dijangkau.",
  },
  {
    id: "SULAWESI TENGGARA",
    name: "Sulawesi Tenggara",
    status: "stabil",
    currentPrice: 13400,
    predictedPrice: 13550,
    production: 880,
    consumption: 820,
    recommendation:
      "Pantau harga secara rutin di Kendari dan pastikan pasokan dari Sulawesi Selatan tetap stabil, terutama untuk wilayah kepulauan yang sangat bergantung pada distribusi laut. Koordinasi pelabuhan dan jadwal pengiriman yang konsisten akan membuat pasokan lebih andal.",
  },
  {
    id: "MALUKU",
    name: "Maluku",
    status: "defisit",
    currentPrice: 15500,
    predictedPrice: 16100,
    production: 210,
    consumption: 640,
    recommendation:
      "Maluku adalah provinsi kepulauan yang sangat rawan terhadap gangguan pasokan, sehingga perlu dibangun gudang penyangga di Ambon, dipertahankan keamanan tol laut, dan dijaga stok minimal tiga sampai empat bulan. Strategi ini penting untuk mengurangi risiko kelangkaan akibat cuaca buruk maupun keterlambatan transportasi.",
  },
  {
    id: "MALUKU UTARA",
    name: "Maluku Utara",
    status: "defisit",
    currentPrice: 15300,
    predictedPrice: 15900,
    production: 180,
    consumption: 520,
    recommendation:
      "Karena ketergantungan Maluku Utara terhadap pasokan luar sangat tinggi, manfaatkan program tol laut dari Sulawesi dan Surabaya secara konsisten untuk menjaga ketersediaan beras dan menstabilkan harga. Pengawasan distribusi dan penjadwalan yang tepat akan mengurangi risiko penurunan pasokan secara tiba-tiba.",
  },
  {
    id: "IRIAN JAYA BARAT",
    name: "Papua Barat",
    status: "defisit",
    currentPrice: 16200,
    predictedPrice: 16900,
    production: 130,
    consumption: 560,
    recommendation:
      "Karena biaya logistik sangat tinggi, perlu diberikan subsidi ongkos angkut, diperkuat konektivitas tol laut, dan dikembangkan sawah lokal di Manokwari serta Sorong. Langkah ini akan menurunkan harga distribusi dan mengurangi ketergantungan terhadap pasokan jarak jauh yang mahal.",
  },
  {
    id: "IRIAN JAYA TENGAH",
    name: "Papua Tengah",
    status: "defisit",
    currentPrice: 17500,
    predictedPrice: 18400,
    production: 90,
    consumption: 480,
    recommendation:
      "Papua Tengah berada di wilayah pegunungan yang terpencil, sehingga perlu memanfaatkan jembatan udara atau air bridge untuk distribusi, memberikan subsidi penuh ongkos kirim, dan memperkuat diversifikasi pangan lokal. Kebijakan ini sangat penting untuk mengatasi hambatan geografis yang mempersulit akses terhadap beras.",
  },
  {
    id: "IRIAN JAYA TIMUR",
    name: "Papua",
    status: "defisit",
    currentPrice: 16800,
    predictedPrice: 17600,
    production: 240,
    consumption: 900,
    recommendation:
      "Karena distribusi ke wilayah ini sulit dan mahal, perlu diperkuat gudang Bulog di Jayapura, dikombinasikan penyaluran melalui jalur laut dan udara, serta didorong pengembangan sentra produksi di Merauke. Strategi terpadu ini akan membantu menurunkan biaya logistik dan mempercepat penyaluran saat kebutuhan meningkat.",
  },
]

// Peta cepat: id mentah GeoJSON -> data provinsi.
export const PROVINCE_MAP: Record<string, ProvinceData> = PROVINCES.reduce(
  (acc, p) => {
    acc[p.id] = p
    return acc
  },
  {} as Record<string, ProvinceData>,
)

// Warna status (selaras dengan tema). Dipakai untuk mewarnai peta & badge.
export const STATUS_STYLE: Record<
  Status,
  { label: string; fill: string; hover: string; badge: string; text: string }
> = {
  surplus: {
    label: "Surplus",
    fill: "#16a34a",
    hover: "#15803d",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    text: "text-emerald-700",
  },
  stabil: {
    label: "Stabil",
    fill: "#f59e0b",
    hover: "#d97706",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    text: "text-amber-700",
  },
  defisit: {
    label: "Defisit",
    fill: "#dc2626",
    hover: "#b91c1c",
    badge: "bg-red-100 text-red-800 border-red-200",
    text: "text-red-700",
  },
}

// Format angka rupiah singkat (Rp 13.200).
export function formatRupiah(value: number): string {
  return "Rp " + value.toLocaleString("id-ID")
}

// ----------------------------------------------------------------------------
// Bangun tren mingguan harga beras (2 minggu lalu -> minggu ini -> 12 minggu depan).
// Data dihasilkan deterministik dari harga saat ini & prediksi agar grafik
// terlihat natural namun konsisten setiap render.
// ----------------------------------------------------------------------------
export interface TrendPoint {
  label: string
  /** Harga aktual (untuk 2 minggu sebelumnya dan minggu ini) */
  aktual: number | null
  /** Harga prediksi (untuk minggu ini dan 12 minggu ke depan) */
  prediksi: number | null
}

export function buildTrend(p: ProvinceData): TrendPoint[] {
  const { currentPrice, predictedPrice } = p

  // 2 minggu historis: M-2, M-1
  const past = [
    Math.round(currentPrice * 0.992),
    Math.round(currentPrice * 0.998),
  ]

  // 12 minggu prediksi: M+1 sampai M+12
  const future = Array.from({ length: 12 }, (_, i) =>
    Math.round(currentPrice + (predictedPrice - currentPrice) * (i + 1) / 12),
  )

  const labels = [
    "M-2",
    "M-1",
    "Minggu Ini",
    ...Array.from({ length: 12 }, (_, i) => `M+${i + 1}`),
  ]

  const aktualVals = [...past, currentPrice, ...Array(12).fill(null)]
  const prediksiVals = [...Array(2).fill(null), currentPrice, ...future]

  return labels.map((label, i) => ({
    label,
    aktual: aktualVals[i] as number | null,
    prediksi: prediksiVals[i] as number | null,
  }))
}

// Ringkasan nasional untuk kartu statistik dashboard.
export function getNationalSummary() {
  const total = PROVINCES.length
  const surplus = PROVINCES.filter((p) => p.status === "surplus").length
  const stabil = PROVINCES.filter((p) => p.status === "stabil").length
  const defisit = PROVINCES.filter((p) => p.status === "defisit").length
  const avgPrice = Math.round(
    PROVINCES.reduce((s, p) => s + p.currentPrice, 0) / total,
  )
  return { total, surplus, stabil, defisit, avgPrice }
}
