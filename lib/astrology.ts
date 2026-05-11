// ------------------------------------------------------------
// ASTROLOGIE TROPICALE — VERSION PROPRE ET COMPLÈTE
// ------------------------------------------------------------

const normalize360 = (v: number) => ((v % 360) + 360) % 360

// Date julienne
export function getJulianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5
}

// Détermine le signe tropical
export function getSign(lon: number): string {
  const signs = [
    "Bélier","Taureau","Gémeaux","Cancer",
    "Lion","Vierge","Balance","Scorpion",
    "Sagittaire","Capricorne","Verseau","Poissons"
  ]
  return signs[Math.floor(normalize360(lon) / 30)]
}

// ------------------------------------------------------------
// CALCUL ASCENDANT / MC / MAISONS — TROPICAL
// ------------------------------------------------------------

function calcAscMc(jd: number, lat: number, lonDeg: number) {
  const T = (jd - 2451545.0) / 36525

  // Temps sidéral de Greenwich
  let gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000

  // Temps sidéral local
  const lst = normalize360(gmst + lonDeg)

  const eps = 23.439291 - 0.0130042 * T
  const epsRad = (eps * Math.PI) / 180
  const latRad = (lat * Math.PI) / 180
  const ramc = (lst * Math.PI) / 180

  // MC tropical
  const MC = normalize360(
    (Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(epsRad)) * 180) /
      Math.PI
  )

  // ASC tropical
  const Asc = normalize360(
    (Math.atan2(
      -Math.cos(ramc),
      Math.sin(ramc) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad)
    ) *
      180) /
      Math.PI
  )

  // Maisons égales tropicales
  const cusps = Array.from({ length: 12 }, (_, i) =>
    normalize360(Asc + i * 30)
  )

  return { Asc, MC, cusps }
}

// Détermine la maison d’un point
export function getHouse(lon: number, cusps: number[]): number {
  const L = normalize360(lon)
  for (let i = 0; i < 12; i++) {
    const start = cusps[i]
    const end = cusps[(i + 1) % 12]
    const inside =
      start <= end ? L >= start && L < end : L >= start || L < end
    if (inside) return i + 1
  }
  return 12
}

// Création du thème tropical
export function createEphemeris(date: Date, lat: number, lonDeg: number) {
  const jd = getJulianDate(date)
  const { Asc, MC, cusps } = calcAscMc(jd, lat, lonDeg)
  return { jd, Asc, MC, cusps }
}

// ------------------------------------------------------------
// PLANÈTES TROPICALES — Soleil, Lune, Mercure, Vénus, Mars
// ------------------------------------------------------------

const TFromUnixSeconds = (unixSec: number) => {
  const JD = unixSec / 86400 + 2440587.5
  return (JD - 2451545.0) / 36525
}

// Soleil tropical
const sunLon = (t: number) => {
  const L = normalize360(280.46646 + 36000.76983 * t)
  const g = normalize360(357.52911 + 35999.05029 * t)
  return normalize360(
    L +
      1.914602 * Math.sin((g * Math.PI) / 180) +
      0.019993 * Math.sin((2 * g * Math.PI) / 180)
  )
}

// Lune tropicale (approximation)
const moonLon = (t: number) => {
  return normalize360(218.316 + 481267.8813 * t)
}

// ------------------------------------------------------------
// TABLEAU COMPLET DES PLANÈTES RAPIDES
// ------------------------------------------------------------

export const PLANETS = [
  { 
    name: "Soleil", 
    lon: (unixSec: number) => sunLon(TFromUnixSeconds(unixSec)) 
  },
  { 
    name: "Lune", 
    lon: (unixSec: number) => moonLon(TFromUnixSeconds(unixSec)) 
  },
  { 
    name: "Mercure", 
    lon: (unixSec: number) => 
      normalize360(252.25 + 149472.67 * TFromUnixSeconds(unixSec)) 
  },
  { 
    name: "Vénus", 
    lon: (unixSec: number) => 
      normalize360(181.98 + 58517.81 * TFromUnixSeconds(unixSec)) 
  },
  { 
    name: "Mars", 
    lon: (unixSec: number) => 
      normalize360(355.45 + 19080.21 * TFromUnixSeconds(unixSec)) 
  },
]
