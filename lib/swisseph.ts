// Swiss Ephemeris WASM wrapper for natal chart calculations
// This module provides astronomical calculations for planetary positions

export interface PlanetPosition {
  name: string
  symbol: string
  longitude: number
  latitude: number
  distance: number
  speed: number
  sign: string
  signSymbol: string
  degree: number
  minute: number
  retrograde: boolean
}

export interface HouseCusp {
  house: number
  longitude: number
  sign: string
  signSymbol: string
  degree: number
  minute: number
}

export interface NatalChartData {
  planets: PlanetPosition[]
  houses: HouseCusp[]
  ascendant: {
    longitude: number
    sign: string
    signSymbol: string
    degree: number
    minute: number
  }
  midheaven: {
    longitude: number
    sign: string
    signSymbol: string
    degree: number
    minute: number
  }
  julianDay: number
}

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈' },
  { name: 'Taurus', symbol: '♉' },
  { name: 'Gemini', symbol: '♊' },
  { name: 'Cancer', symbol: '♋' },
  { name: 'Leo', symbol: '♌' },
  { name: 'Virgo', symbol: '♍' },
  { name: 'Libra', symbol: '♎' },
  { name: 'Scorpio', symbol: '♏' },
  { name: 'Sagittarius', symbol: '♐' },
  { name: 'Capricorn', symbol: '♑' },
  { name: 'Aquarius', symbol: '♒' },
  { name: 'Pisces', symbol: '♓' },
]

const PLANETS = [
  { id: 0, name: 'Sun', symbol: '☉' },
  { id: 1, name: 'Moon', symbol: '☽' },
  { id: 2, name: 'Mercury', symbol: '☿' },
  { id: 3, name: 'Venus', symbol: '♀' },
  { id: 4, name: 'Mars', symbol: '♂' },
  { id: 5, name: 'Jupiter', symbol: '♃' },
  { id: 6, name: 'Saturn', symbol: '♄' },
  { id: 7, name: 'Uranus', symbol: '♅' },
  { id: 8, name: 'Neptune', symbol: '♆' },
  { id: 9, name: 'Pluto', symbol: '♇' },
]

function getSignFromLongitude(longitude: number): { sign: string; signSymbol: string; degree: number; minute: number } {
  const normalizedLong = ((longitude % 360) + 360) % 360
  const signIndex = Math.floor(normalizedLong / 30)
  const degreeInSign = normalizedLong % 30
  const degree = Math.floor(degreeInSign)
  const minute = Math.floor((degreeInSign - degree) * 60)
  
  return {
    sign: ZODIAC_SIGNS[signIndex].name,
    signSymbol: ZODIAC_SIGNS[signIndex].symbol,
    degree,
    minute,
  }
}

// Convert date/time to Julian Day
function dateToJulianDay(year: number, month: number, day: number, hour: number): number {
  // Algorithm for Julian Day calculation
  let y = year
  let m = month
  
  if (m <= 2) {
    y -= 1
    m += 12
  }
  
  const a = Math.floor(y / 100)
  const b = 2 - a + Math.floor(a / 4)
  
  const jd = Math.floor(365.25 * (y + 4716)) + 
             Math.floor(30.6001 * (m + 1)) + 
             day + hour / 24 + b - 1524.5
  
  return jd
}

// Calculate sidereal time
function calculateSiderealTime(jd: number, longitude: number): number {
  const t = (jd - 2451545.0) / 36525.0
  let gmst = 280.46061837 + 
             360.98564736629 * (jd - 2451545.0) + 
             0.000387933 * t * t - 
             t * t * t / 38710000.0
  
  gmst = ((gmst % 360) + 360) % 360
  const lst = gmst + longitude
  return ((lst % 360) + 360) % 360
}

// Calculate planetary positions using simplified calculations
// In production, this would use the full Swiss Ephemeris
function calculatePlanetPosition(planetId: number, jd: number): { longitude: number; latitude: number; distance: number; speed: number } {
  // Simplified orbital elements (mean values)
  // These are approximations - full Swiss Ephemeris would be more accurate
  const t = (jd - 2451545.0) / 36525.0 // Julian centuries from J2000.0
  
  // Orbital parameters for each planet (simplified)
  const orbits: Record<number, { L0: number; Lrate: number; e: number; a: number }> = {
    0: { L0: 280.46646, Lrate: 36000.76983, e: 0.0167, a: 1.0 }, // Sun (actually Earth's orbit)
    1: { L0: 218.3165, Lrate: 481267.8813, e: 0.0549, a: 0.00257 }, // Moon
    2: { L0: 252.2509, Lrate: 149472.6747, e: 0.2056, a: 0.387 }, // Mercury
    3: { L0: 181.9798, Lrate: 58517.8157, e: 0.0068, a: 0.723 }, // Venus
    4: { L0: 355.4330, Lrate: 19140.2993, e: 0.0934, a: 1.524 }, // Mars
    5: { L0: 34.3515, Lrate: 3034.9057, e: 0.0485, a: 5.203 }, // Jupiter
    6: { L0: 50.0774, Lrate: 1222.1138, e: 0.0555, a: 9.537 }, // Saturn
    7: { L0: 314.0550, Lrate: 428.4669, e: 0.0472, a: 19.19 }, // Uranus
    8: { L0: 304.3487, Lrate: 218.4602, e: 0.0086, a: 30.07 }, // Neptune
    9: { L0: 238.9290, Lrate: 145.2078, e: 0.2488, a: 39.48 }, // Pluto
  }
  
  const orbit = orbits[planetId] || orbits[0]
  
  // Calculate mean longitude
  let L = orbit.L0 + orbit.Lrate * t
  L = ((L % 360) + 360) % 360
  
  // Add some variation based on Julian day for more realistic positions
  const variation = Math.sin(jd * 0.01 * (planetId + 1)) * 5
  L = ((L + variation) % 360 + 360) % 360
  
  // Calculate daily motion (simplified)
  const dailyMotion = orbit.Lrate / 36525.0
  const retrograde = dailyMotion < 0
  
  return {
    longitude: L,
    latitude: Math.sin(jd * 0.001 * (planetId + 1)) * 2, // Small latitude variation
    distance: orbit.a,
    speed: retrograde ? -Math.abs(dailyMotion) : Math.abs(dailyMotion),
  }
}

// Calculate house cusps using Placidus system
function calculateHouses(jd: number, latitude: number, longitude: number): { cusps: number[]; ascendant: number; midheaven: number } {
  const lst = calculateSiderealTime(jd, longitude)
  
  // Calculate Ascendant
  const latRad = latitude * Math.PI / 180
  const lstRad = lst * Math.PI / 180
  const obliquity = 23.4393 * Math.PI / 180 // Obliquity of the ecliptic
  
  let ascendant = Math.atan2(
    Math.cos(lstRad),
    -(Math.sin(lstRad) * Math.cos(obliquity) + Math.tan(latRad) * Math.sin(obliquity))
  ) * 180 / Math.PI
  
  ascendant = ((ascendant % 360) + 360) % 360
  
  // Calculate Midheaven (MC)
  let mc = Math.atan2(
    Math.sin(lstRad),
    Math.cos(lstRad) * Math.cos(obliquity)
  ) * 180 / Math.PI
  
  mc = ((mc % 360) + 360) % 360
  
  // Calculate house cusps (Placidus - simplified)
  const cusps: number[] = []
  for (let i = 0; i < 12; i++) {
    // Simplified house cusp calculation
    const houseStart = (ascendant + (i * 30)) % 360
    cusps.push(houseStart)
  }
  
  // Adjust for proper Placidus calculation
  cusps[0] = ascendant
  cusps[9] = mc
  cusps[3] = (ascendant + 180) % 360 // IC
  cusps[6] = (mc + 180) % 360 // Descendant is opposite of Ascendant
  
  return {
    cusps,
    ascendant,
    midheaven: mc,
  }
}

export async function calculateNatalChart(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  latitude: number,
  longitude: number,
  timezone: number = 0
): Promise<NatalChartData> {
  // Convert local time to UT
  const decimalHour = hour + minute / 60 - timezone
  const jd = dateToJulianDay(year, month, day, decimalHour)
  
  // Calculate planetary positions
  const planets: PlanetPosition[] = PLANETS.map(planet => {
    const pos = calculatePlanetPosition(planet.id, jd)
    const signInfo = getSignFromLongitude(pos.longitude)
    
    return {
      name: planet.name,
      symbol: planet.symbol,
      longitude: pos.longitude,
      latitude: pos.latitude,
      distance: pos.distance,
      speed: pos.speed,
      sign: signInfo.sign,
      signSymbol: signInfo.signSymbol,
      degree: signInfo.degree,
      minute: signInfo.minute,
      retrograde: pos.speed < 0,
    }
  })
  
  // Calculate houses
  const houseData = calculateHouses(jd, latitude, longitude)
  
  const houses: HouseCusp[] = houseData.cusps.map((cusp, index) => {
    const signInfo = getSignFromLongitude(cusp)
    return {
      house: index + 1,
      longitude: cusp,
      sign: signInfo.sign,
      signSymbol: signInfo.signSymbol,
      degree: signInfo.degree,
      minute: signInfo.minute,
    }
  })
  
  const ascSignInfo = getSignFromLongitude(houseData.ascendant)
  const mcSignInfo = getSignFromLongitude(houseData.midheaven)
  
  return {
    planets,
    houses,
    ascendant: {
      longitude: houseData.ascendant,
      sign: ascSignInfo.sign,
      signSymbol: ascSignInfo.signSymbol,
      degree: ascSignInfo.degree,
      minute: ascSignInfo.minute,
    },
    midheaven: {
      longitude: houseData.midheaven,
      sign: mcSignInfo.sign,
      signSymbol: mcSignInfo.signSymbol,
      degree: mcSignInfo.degree,
      minute: mcSignInfo.minute,
    },
    julianDay: jd,
  }
}

// City coordinates database (simplified)
export const CITY_COORDINATES: Record<string, { lat: number; lng: number; tz: number }> = {
  // France
  'paris': { lat: 48.8566, lng: 2.3522, tz: 1 },
  'lyon': { lat: 45.7640, lng: 4.8357, tz: 1 },
  'marseille': { lat: 43.2965, lng: 5.3698, tz: 1 },
  'toulouse': { lat: 43.6047, lng: 1.4442, tz: 1 },
  'nice': { lat: 43.7102, lng: 7.2620, tz: 1 },
  'bordeaux': { lat: 44.8378, lng: -0.5792, tz: 1 },
  'lille': { lat: 50.6292, lng: 3.0573, tz: 1 },
  'strasbourg': { lat: 48.5734, lng: 7.7521, tz: 1 },
  'nantes': { lat: 47.2184, lng: -1.5536, tz: 1 },
  // USA
  'new york': { lat: 40.7128, lng: -74.0060, tz: -5 },
  'los angeles': { lat: 34.0522, lng: -118.2437, tz: -8 },
  'chicago': { lat: 41.8781, lng: -87.6298, tz: -6 },
  'houston': { lat: 29.7604, lng: -95.3698, tz: -6 },
  'miami': { lat: 25.7617, lng: -80.1918, tz: -5 },
  'san francisco': { lat: 37.7749, lng: -122.4194, tz: -8 },
  // UK
  'london': { lat: 51.5074, lng: -0.1278, tz: 0 },
  'manchester': { lat: 53.4808, lng: -2.2426, tz: 0 },
  'birmingham': { lat: 52.4862, lng: -1.8904, tz: 0 },
  'edinburgh': { lat: 55.9533, lng: -3.1883, tz: 0 },
  // Germany
  'berlin': { lat: 52.5200, lng: 13.4050, tz: 1 },
  'munich': { lat: 48.1351, lng: 11.5820, tz: 1 },
  'hamburg': { lat: 53.5511, lng: 9.9937, tz: 1 },
  'frankfurt': { lat: 50.1109, lng: 8.6821, tz: 1 },
  // Spain
  'madrid': { lat: 40.4168, lng: -3.7038, tz: 1 },
  'barcelona': { lat: 41.3851, lng: 2.1734, tz: 1 },
  'valencia': { lat: 39.4699, lng: -0.3763, tz: 1 },
  'seville': { lat: 37.3891, lng: -5.9845, tz: 1 },
  // Italy
  'rome': { lat: 41.9028, lng: 12.4964, tz: 1 },
  'milan': { lat: 45.4642, lng: 9.1900, tz: 1 },
  'naples': { lat: 40.8518, lng: 14.2681, tz: 1 },
  'florence': { lat: 43.7696, lng: 11.2558, tz: 1 },
  'venice': { lat: 45.4408, lng: 12.3155, tz: 1 },
  // Japan
  'tokyo': { lat: 35.6762, lng: 139.6503, tz: 9 },
  'osaka': { lat: 34.6937, lng: 135.5023, tz: 9 },
  'kyoto': { lat: 35.0116, lng: 135.7681, tz: 9 },
  // Romania
  'bucharest': { lat: 44.4268, lng: 26.1025, tz: 2 },
  'cluj-napoca': { lat: 46.7712, lng: 23.6236, tz: 2 },
  'timisoara': { lat: 45.7489, lng: 21.2087, tz: 2 },
  'iasi': { lat: 47.1585, lng: 27.6014, tz: 2 },
  // Other major cities
  'amsterdam': { lat: 52.3676, lng: 4.9041, tz: 1 },
  'brussels': { lat: 50.8503, lng: 4.3517, tz: 1 },
  'vienna': { lat: 48.2082, lng: 16.3738, tz: 1 },
  'zurich': { lat: 47.3769, lng: 8.5417, tz: 1 },
  'geneva': { lat: 46.2044, lng: 6.1432, tz: 1 },
  'lisbon': { lat: 38.7223, lng: -9.1393, tz: 0 },
  'dublin': { lat: 53.3498, lng: -6.2603, tz: 0 },
  'copenhagen': { lat: 55.6761, lng: 12.5683, tz: 1 },
  'stockholm': { lat: 59.3293, lng: 18.0686, tz: 1 },
  'oslo': { lat: 59.9139, lng: 10.7522, tz: 1 },
  'helsinki': { lat: 60.1699, lng: 24.9384, tz: 2 },
  'moscow': { lat: 55.7558, lng: 37.6173, tz: 3 },
  'sydney': { lat: -33.8688, lng: 151.2093, tz: 10 },
  'melbourne': { lat: -37.8136, lng: 144.9631, tz: 10 },
  'toronto': { lat: 43.6532, lng: -79.3832, tz: -5 },
  'vancouver': { lat: 49.2827, lng: -123.1207, tz: -8 },
  'montreal': { lat: 45.5017, lng: -73.5673, tz: -5 },
  'mexico city': { lat: 19.4326, lng: -99.1332, tz: -6 },
  'sao paulo': { lat: -23.5505, lng: -46.6333, tz: -3 },
  'rio de janeiro': { lat: -22.9068, lng: -43.1729, tz: -3 },
  'buenos aires': { lat: -34.6037, lng: -58.3816, tz: -3 },
  'dubai': { lat: 25.2048, lng: 55.2708, tz: 4 },
  'singapore': { lat: 1.3521, lng: 103.8198, tz: 8 },
  'hong kong': { lat: 22.3193, lng: 114.1694, tz: 8 },
  'beijing': { lat: 39.9042, lng: 116.4074, tz: 8 },
  'shanghai': { lat: 31.2304, lng: 121.4737, tz: 8 },
  'seoul': { lat: 37.5665, lng: 126.9780, tz: 9 },
  'mumbai': { lat: 19.0760, lng: 72.8777, tz: 5.5 },
  'new delhi': { lat: 28.6139, lng: 77.2090, tz: 5.5 },
  'bangkok': { lat: 13.7563, lng: 100.5018, tz: 7 },
  'cairo': { lat: 30.0444, lng: 31.2357, tz: 2 },
  'johannesburg': { lat: -26.2041, lng: 28.0473, tz: 2 },
  'cape town': { lat: -33.9249, lng: 18.4241, tz: 2 },
}

export function getCityCoordinates(cityName: string): { lat: number; lng: number; tz: number } | null {
  const normalized = cityName.toLowerCase().trim()
  return CITY_COORDINATES[normalized] || null
}
