import { NextRequest, NextResponse } from 'next/server'
import {
  createEphemeris,
  PLANETS,
  getSign,
  getHouse,
} from '@/lib/astrology'

const normalize360 = (v: number) => ((v % 360) + 360) % 360

/**
 * Heure saisie = heure LOCALE du lieu (wall clock).
 * Fuseau auto : local ≈ UTC + autoOffsetHours, avec autoOffsetHours = round(lon/15), lon en ° (Est +, Ouest -).
 * Instant UTC = timestamp construit à partir des chiffres locaux (interprétés comme si c’était une horloge UTC)
 *              MOINS autoOffsetHours.
 */
function birthLocalWallTimeToUtcDate(params: {
  birthDate: string
  birthTime?: string
  lonDeg: number
}) {
  const { birthDate, birthTime, lonDeg } = params

  const autoOffsetHours = Math.round(Number(lonDeg) / 15)

  const [y, m, d] = String(birthDate).split('-').map(Number)
  const [hh, mm] = String(birthTime || '12:00').split(':').map(Number)

  if (![y, m, d].every(Number.isFinite)) return { ok: false as const, autoOffsetHours }

  const h = Number.isFinite(hh) ? hh : 0
  const min = Number.isFinite(mm) ? mm : 0

  const msIfLocalDigitsWereUtc = Date.UTC(y, m - 1, d, h, min, 0, 0)
  const utcMs = msIfLocalDigitsWereUtc - autoOffsetHours * 60 * 60 * 1000

  const date = new Date(utcMs)
  if (Number.isNaN(date.getTime())) return { ok: false as const, autoOffsetHours }

  return { ok: true as const, date, autoOffsetHours }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, birthDate, birthTime, birthCity, lat, lon } = body ?? {}

    if (!birthDate || lat == null || lon == null) {
      return NextResponse.json({ error: 'Data missing' }, { status: 400 })
    }

    const latNum = Number(lat)
    const lonNum = Number(lon)
    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      return NextResponse.json({ error: 'Invalid lat/lon' }, { status: 400 })
    }

    const parsed = birthLocalWallTimeToUtcDate({
      birthDate,
      birthTime,
      lonDeg: lonNum,
    })

    if (!parsed.ok) {
      return NextResponse.json({ error: 'Invalid birth date/time' }, { status: 400 })
    }

    const { date, autoOffsetHours } = parsed

    const { cusps, Asc, MC } = createEphemeris(date, latNum, lonNum)

    const ascLon = normalize360(Asc)
    const mcLon = normalize360(MC)

    const planets = PLANETS.map((p: any) => {
      const longitude = normalize360(p.lon(date.getTime() / 1000))
      return {
        name: p.name,
        longitude: Math.round(longitude * 100) / 100,
        sign: getSign(longitude),
        house: getHouse(longitude, cusps),
        degree: Math.round((longitude % 30) * 10) / 10,
      }
    })

    const sun = planets.find((p: any) => p.name === 'Soleil')

    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const safeEmail = String(email ?? '').trim().toLowerCase()
    const safeName = String(name ?? '').trim()
    const safeBirthCity = String(birthCity ?? '').trim()

    if (BREVO_API_KEY && safeEmail) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 8000)

      void fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: safeEmail,
          attributes: {
            PRENOM: safeName,
            VILLE_NAISSANCE: safeBirthCity,
          },
          updateEnabled: true,
        }),
        signal: controller.signal,
        cache: 'no-store',
      })
        .then(async (r) => {
          if (!r.ok) {
            const txt = await r.text().catch(() => '')
            console.warn('Brevo HTTP:', r.status, txt)
          }
        })
        .catch((err) => console.warn('Brevo fetch:', err?.message || err))
        .finally(() => clearTimeout(timeout))
    }

    return NextResponse.json({
      name: safeName,
      meta: {
        autoOffsetHours,
        lonUsed: lonNum,
      },
      soleil: {
        sign: sun?.sign ?? null,
        degree: sun?.degree ?? null,
      },
      ascendant: {
        longitude: Math.round(ascLon * 100) / 100,
        sign: getSign(ascLon),
        degree: Math.round((ascLon % 30) * 10) / 10,
      },
      mc: {
        longitude: Math.round(mcLon * 100) / 100,
        sign: getSign(mcLon),
        degree: Math.round((mcLon % 30) * 10) / 10,
      },
      planets,
      cusps,
    })
  } catch (error) {
    console.error('Erreur API Natal Chart:', error)
    return NextResponse.json(
      { error: 'Erreur lors du calcul de la carte.' },
      { status: 500 }
    )
  }
}