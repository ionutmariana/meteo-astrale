import { NextRequest, NextResponse } from 'next/server'

const D2R = Math.PI / 180
const R2D = 180 / Math.PI

function jd(year: number, month: number, day: number, hour: number) {
  if (month <= 2) { year--; month += 12 }
  const A = Math.floor(year / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + hour / 24 + B - 1524.5
}

function norm360(x: number) { return ((x % 360) + 360) % 360 }

function sunLon(T: number) {
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T)
  const L0 = norm360(280.46646 + 36000.76983 * T)
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * D2R)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * M * D2R)
    + 0.000289 * Math.sin(3 * M * D2R)
  return norm360(L0 + C)
}

function moonLon(T: number) {
  const L = norm360(218.3165 + 481267.8813 * T)
  const M = norm360(357.5291 + 35999.0503 * T)
  const Mm = norm360(134.9634 + 477198.8676 * T)
  const D = norm360(297.8502 + 445267.1115 * T)
  const F = norm360(93.2721 + 483202.0175 * T)
  const lon = L
    + 6.2886 * Math.sin(Mm * D2R)
    + 1.2740 * Math.sin((2 * D - Mm) * D2R)
    + 0.6583 * Math.sin(2 * D * D2R)
    + 0.2136 * Math.sin(2 * Mm * D2R)
    - 0.1851 * Math.sin(M * D2R)
    - 0.1143 * Math.sin(2 * F * D2R)
    + 0.0588 * Math.sin((2 * D - 2 * Mm) * D2R)
  return norm360(lon)
}

function planetLon(T: number, L0: number, L1: number, M0: number, M1: number, C1: number, C2: number) {
  const M = norm360(M0 + M1 * T)
  const L = norm360(L0 + L1 * T)
  const C = C1 * Math.sin(M * D2R) + C2 * Math.sin(2 * M * D2R)
  return norm360(L + C)
}

const PLANETS = [
  { name: 'Sun', lon: (T: number) => sunLon(T) },
  { name: 'Moon', lon: (T: number) => moonLon(T) },
  { name: 'Mercury', lon: (T: number) => planetLon(T, 252.251, 149472.6749, 174.795, 149472.5153, 23.4400, 2.9818) },
  { name: 'Venus', lon: (T: number) => planetLon(T, 181.979, 58517.8156, 212.706, 58517.8039, 0.7758, 0.0033) },
  { name: 'Mars', lon: (T: number) => planetLon(T, 355.433, 19140.2993, 19.373, 19140.3023, 10.6912, 0.6228) },
  { name: 'Jupiter', lon: (T: number) => planetLon(T, 34.351, 3034.9057, 20.020, 3034.6963, 5.5549, 0.1683) },
  { name: 'Saturn', lon: (T: number) => planetLon(T, 50.077, 1222.1138, 317.021, 1221.5515, 6.3585, 0.2204) },
  { name: 'Uranus', lon: (T: number) => planetLon(T, 314.055, 428.4678, 142.955, 428.4280, 5.3042, 0) },
  { name: 'Neptune', lon: (T: number) => planetLon(T, 304.348, 218.4862, 267.767, 218.4862, 1.0260, 0) },
]

const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']

function getSign(lon: number) {
  return SIGNS[Math.floor(lon / 30) % 12]
}

function getHouse(lon: number, cusps: number[]) {
  for (let i = 0; i < 12; i++) {
    const next = cusps[(i + 1) % 12]
    const cur = cusps[i]
    if (cur <= next) {
      if (lon >= cur && lon < next) return i + 1
    } else {
      if (lon >= cur || lon < next) return i + 1
    }
  }
  return 1
}

function calcAscMC(jdUT: number, lat: number, lon: number) {
  const T = (jdUT - 2451545.0) / 36525
  const RAMC = norm360(280.46061837 + 360.98564736629 * (jdUT - 2451545) + 0.000387933 * T * T)
  const eps = 23.439292 - 0.013004 * T
  const epsR = eps * D2R
  const ramcR = RAMC * D2R
  const latR = lat * D2R
  const MC = norm360(Math.atan2(Math.tan(ramcR), Math.cos(epsR)) * R2D)
  const y = -Math.cos(ramcR + Math.atan(Math.cos(latR) * Math.tan(epsR)))
  const x = Math.sin(latR) * Math.sin(epsR) * Math.sin(ramcR + Math.atan(Math.cos(latR) * Math.tan(epsR))) - Math.cos(latR) * Math.cos(epsR)
  const Asc = norm360(Math.atan2(y, x) * R2D)
  const cusps: number[] = [Asc]
  for (let h = 1; h < 12; h++) {
    cusps.push(norm360(Asc + h * 30))
  }
  return { Asc, MC, cusps }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Récupération des données du formulaire incluant l'email et la ville
    const { birthDate, birthTime, lat, lon, name, email, birthCity } = await req.json()
    
    // 2. Récupération de l'adresse IP (Géolocalisation)
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(/, /)[0] : '127.0.0.1'

    // 3. Enregistrement discret dans vos Logs Vercel
    console.log("--- NOUVELLE CAPTURE EMAIL ---")
    console.log(`Prénom: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Ville: ${birthCity}`)
    console.log(`IP: ${ip}`)
    console.log("------------------------------")

    if (!birthDate || !lat || !lon) return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    
    // Suite du calcul mathématique original
    const [y, m, d] = birthDate.split('-').map(Number)
    const [h, min] = (birthTime || '12:00').split(':').map(Number)
    const hour = h + min / 60 - lon / 15
    const JD = jd(y, m, d, hour)
    const T = (JD - 2451545.0) / 36525
    const { Asc, MC, cusps } = calcAscMC(JD, Number(lat), Number(lon))
    
    const planets = PLANETS.map(p => {
      const longitude = p.lon(T)
      return {
        name: p.name,
        longitude: Math.round(longitude * 100) / 100,
        sign: getSign(longitude),
        house: getHouse(longitude, cusps),
        degree: Math.round(longitude % 30 * 10) / 10
      }
    })

    return NextResponse.json({
      name,
      ascendant: { longitude: Math.round(Asc * 100) / 100, sign: getSign(Asc), degree: Math.round(Asc % 30 * 10) / 10 },
      mc: { longitude: Math.round(MC * 100) / 100, sign: getSign(MC), degree: Math.round(MC % 30 * 10) / 10 },
      planets,
      cusps
    })
  } catch (e) {
    return NextResponse.json({ error: 'Calculation error' }, { status: 500 })
  }
}