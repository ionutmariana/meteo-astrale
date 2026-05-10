import { NextRequest, NextResponse } from 'next/server'
import {
  createEphemeris,
  PLANETS,
  getSign,
  getHouse,
} from '@/lib/astrology'

const normalize360 = (v: number) => ((v % 360) + 360) % 360

function resolveUtcOffsetMinutes(body: any, lonNum: number) {
  const raw = body?.utcOffsetMinutes
  const fromClient = Number(raw)

  if (raw != null && raw !== '' && Number.isFinite(fromClient)) {
    return fromClient
  }

  const offsetHours = Math.round(lonNum / 15)
  return offsetHours * 60
}

function birthLocalToUtcDate(params: {
  birthDate: string
  birthTime?: string
  utcOffsetMinutes: number
}) {
  const { birthDate, birthTime, utcOffsetMinutes } = params

  const [y, m, d] = String(birthDate).split('-').map(Number)
  const [hh, mm] = String(birthTime || '12:00').split(':').map(Number)

  if (![y, m, d].every(Number.isFinite)) return { ok: false as const }

  const h = Number.isFinite(hh) ? hh : 0
  const min = Number.isFinite(mm) ? mm : 0

  const msLocalDigitsAsUtc = Date.UTC(y, m - 1, d, h, min, 0, 0)
  const utcMs = msLocalDigitsAsUtc - utcOffsetMinutes * 60 * 1000

  const date = new Date(utcMs)
  if (Number.isNaN(date.getTime())) return { ok: false as const }

  return { ok: true as const, date }
}

export async function POST(req: NextRequest) {
  let body: any = null

  try {
    body = await req.json()

    console.log('[natal-chart] Email reçu (brut):', body?.email)
    console.log('[natal-chart] utcOffsetMinutes reçu (brut):', body?.utcOffsetMinutes)

    const { name, email, birthDate, birthTime, birthCity, lat, lon } = body ?? {}

    if (!birthDate || lat == null || lon == null) {
      return NextResponse.json({ error: 'Data missing' }, { status: 400 })
    }

    const latNum = Number(lat)
    const lonNum = Number(lon)
    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      return NextResponse.json({ error: 'Invalid lat/lon' }, { status: 400 })
    }

    const utcOffsetMinutes = resolveUtcOffsetMinutes(body, lonNum)

    const safeEmail = String(email ?? '').trim().toLowerCase()
    const safeName = String(name ?? '').trim()
    const safeBirthCity = String(birthCity ?? '').trim()

    console.log('[natal-chart] Email normalisé:', safeEmail || '(vide)')
    console.log('[natal-chart] Offset minutes utilisé:', utcOffsetMinutes, `(${utcOffsetMinutes / 60}h)`)

    const parsed = birthLocalToUtcDate({
      birthDate,
      birthTime,
      utcOffsetMinutes,
    })

    if (!parsed.ok) {
      return NextResponse.json({ error: 'Invalid birth date/time' }, { status: 400 })
    }

    const date = parsed.date

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
    console.log('[natal-chart] BREVO_API_KEY présent:', Boolean(BREVO_API_KEY))

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
            console.warn('[natal-chart] Brevo HTTP:', r.status, txt)
          } else {
            console.log('[natal-chart] Brevo: contact OK')
          }
        })
        .catch((err) => {
          console.warn('[natal-chart] Brevo fetch:', err?.message || err)
        })
        .finally(() => clearTimeout(timeout))
    } else {
      console.warn('[natal-chart] Brevo ignoré (clé ou email manquant)')
    }

    return NextResponse.json({
      name: safeName,
      meta: {
        utcOffsetMinutesUsed: utcOffsetMinutes,
        utcOffsetHoursUsed: utcOffsetMinutes / 60,
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
    console.error('[natal-chart] Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur lors du calcul de la carte.' },
      { status: 500 }
    )
  }
}