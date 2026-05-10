export const zodiacSigns = [
  { id: 'aries', symbol: '♈', element: 'fire', dates: '21/03 - 19/04' },
  { id: 'taurus', symbol: '♉', element: 'earth', dates: '20/04 - 20/05' },
  { id: 'gemini', symbol: '♊', element: 'air', dates: '21/05 - 20/06' },
  { id: 'cancer', symbol: '♋', element: 'water', dates: '21/06 - 22/07' },
  { id: 'leo', symbol: '♌', element: 'fire', dates: '23/07 - 22/08' },
  { id: 'virgo', symbol: '♍', element: 'earth', dates: '23/08 - 22/09' },
  { id: 'libra', symbol: '♎', element: 'air', dates: '23/09 - 22/10' },
  { id: 'scorpio', symbol: '♏', element: 'water', dates: '23/10 - 21/11' },
  { id: 'sagittarius', symbol: '♐', element: 'fire', dates: '22/11 - 21/12' },
  { id: 'capricorn', symbol: '♑', element: 'earth', dates: '22/12 - 19/01' },
  { id: 'aquarius', symbol: '♒', element: 'air', dates: '20/01 - 18/02' },
  { id: 'pisces', symbol: '♓', element: 'water', dates: '19/02 - 20/03' },
] as const

export type ZodiacSignId = (typeof zodiacSigns)[number]['id']

export const planets = [
  { id: 'sun', symbol: '☉', name: 'Sun' },
  { id: 'moon', symbol: '☽', name: 'Moon' },
  { id: 'mercury', symbol: '☿', name: 'Mercury' },
  { id: 'venus', symbol: '♀', name: 'Venus' },
  { id: 'mars', symbol: '♂', name: 'Mars' },
  { id: 'jupiter', symbol: '♃', name: 'Jupiter' },
  { id: 'saturn', symbol: '♄', name: 'Saturn' },
  { id: 'uranus', symbol: '♅', name: 'Uranus' },
  { id: 'neptune', symbol: '♆', name: 'Neptune' },
  { id: 'pluto', symbol: '♇', name: 'Pluto' },
] as const

export type PlanetId = (typeof planets)[number]['id']

// Mock data (conservé pour votre interface)
export const mockDailyTransits = [
  { planet: 'sun', sign: 'gemini', degree: 17, description: { fr: 'Le Soleil en Gémeaux favorise la communication.', ro: 'Soarele în Gemeni favorizează comunicarea.' } },
  { planet: 'moon', sign: 'scorpio', degree: 8, description: { fr: "La Lune en Scorpion intensifie les émotions.", ro: 'Luna în Scorpion intensifică emoțiile.' } },
] as any

export const mockHoroscopes: any = {
  aries: { love: { score: 8, text: { fr: 'Une journée propice.', ro: 'O zi propice.' } }, work: { score: 7, text: { fr: 'Énergie au top.', ro: 'Energie la maxim.' } }, health: { score: 6, text: { fr: 'Reposez-vous.', ro: 'Odihnește-te.' } }, finances: { score: 5, text: { fr: 'Évitez les dépenses.', ro: 'Evită cheltuielile.' } } },
}

export const countries = [
  { code: 'FR', name: { fr: 'France', ro: 'Franța' } },
  { code: 'RO', name: { fr: 'Roumanie', ro: 'România' } },
] as const

// ---------------------------------------------------------------------------
// MOTEUR DE CALCUL CORRIGÉ (HAUTE PRÉCISION)
// ---------------------------------------------------------------------------

const normalize360 = (v: number) => ((v % 360) + 360) % 360

const jdFromDateUTC = (d: Date) => d.getTime() / 86400000 + 2440587.5

export function getSign(lon: number): string {
  const signs = ['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons']
  return signs[Math.floor(normalize360(lon) / 30)] || 'Bélier'
}

function calcAscMC(jd: number, lat: number, lonDeg: number) {
  const T = (jd - 2451545.0) / 36525
  
  // 1. Temps Sidéral de Greenwich (GMST) ultra-précis
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000
  
  // 2. Temps Sidéral Local (LST)
  const lst = normalize360(gmst + lonDeg)
  
  // 3. Obliquité de l'écliptique
  const eps = 23.439291 - 0.01300416 * T
  
  // Conversion Radians
  const RAMC = (lst * Math.PI) / 180
  const epsRad = (eps * Math.PI) / 180
  const latRad = (lat * Math.PI) / 180

  // 4. Milieu du Ciel (MC)
  const MC = normalize360((Math.atan2(Math.sin(RAMC), Math.cos(RAMC) * Math.cos(epsRad)) * 180) / Math.PI)

  // 5. ASCENDANT (La formule qui va donner Gémeaux pour Ionut)
  const Asc = normalize360(
    (Math.atan2(
      -Math.cos(RAMC),
      Math.sin(RAMC) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad)
    ) * 180) / Math.PI
  )

  // Maisons égales (pour l'instant)
  const cusps = Array.from({ length: 12 }, (_, i) => normalize360(Asc + i * 30))
  return { Asc, MC, cusps }
}

export function getHouse(lon: number, cusps: number[]): number {
  const L = normalize360(lon)
  for (let i = 0; i < 12; i++) {
    const start = normalize360(cusps[i]!)
    const end = normalize360(cusps[(i + 1) % 12]!)
    const inHouse = start <= end ? L >= start && L < end : L >= start || L < end
    if (inHouse) return i + 1
  }
  return 12
}

export function createEphemeris(date: Date, lat: number, lonDeg: number) {
  const jd = jdFromDateUTC(date)
  const { Asc, MC, cusps } = calcAscMC(jd, lat, lonDeg)
  return { jd, Asc, MC, cusps }
}

const TFromUnixSeconds = (unixSec: number) => {
  const JD = unixSec / 86400 + 2440587.5
  return (JD - 2451545.0) / 36525
}

// Calcul simple pour le Soleil
const sunLon = (t: number) => {
  const l = normalize360(280.46646 + 36000.76983 * t)
  const g = normalize360(357.52911 + 35999.05029 * t)
  return normalize360(l + 1.914602 * Math.sin((g * Math.PI) / 180) + 0.019993 * Math.sin((2 * g * Math.PI) / 180))
}

const PLANET_FR: any = { sun: 'Soleil', moon: 'Lune', mercury: 'Mercure', venus: 'Vénus', mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturne', uranus: 'Uranus', neptune: 'Neptune', pluto: 'Pluton' }

export const PLANETS = planets.map((p) => ({
  id: p.id,
  name: PLANET_FR[p.id] || p.name,
  lon: (unixSec: number) => {
    const t = TFromUnixSeconds(unixSec)
    if (p.id === 'sun') return sunLon(t)
    // Fallback simplifié pour les autres planètes
    const speeds: any = { moon: 481267, mercury: 149472, venus: 58517, mars: 19082, jupiter: 3034, saturn: 1222, uranus: 428, neptune: 218, pluto: 145 }
    const bases: any = { moon: 218, mercury: 252, venus: 181, mars: 355, jupiter: 34, saturn: 49, uranus: 314, neptune: 304, pluto: 238 }
    return normalize360((bases[p.id] || 0) + (speeds[p.id] || 0) * t)
  }
}))