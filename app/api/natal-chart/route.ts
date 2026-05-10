import { NextRequest, NextResponse } from 'next/server'
import {
  createEphemeris,
  PLANETS,
  getSign,
  getHouse,
} from '@/lib/astrology'

const normalize360 = (v: number) => ((v % 360) + 360) % 360

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, birthDate, birthTime, birthCity, lat, lon } = body ?? {}

    // Validation robuste
    if (!birthDate || !birthTime || lat == null || lon == null) {
      return NextResponse.json({ error: 'Data missing' }, { status: 400 })
    }

    const latNum = Number(lat)
    const lonNum = Number(lon)

    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      return NextResponse.json({ error: 'Invalid lat/lon' }, { status: 400 })
    }

    // Date UTC (évite les surprises de timezone)
    const date = new Date(`${birthDate}T${birthTime}:00Z`)
    if (Number.isNaN(date.getTime())) {
      return NextResponse.json({ error: 'Invalid birth date/time' }, { status: 400 })
    }

    // 1) Calcul astro
    const { cusps, Asc, MC } = createEphemeris(date, latNum, lonNum)

    // 2) Formatage planètes (liste complète)
    const planets = PLANETS.map((p) => {
      const longitude = normalize360(p.lon(date.getTime() / 1000)) // secondes Unix
      return {
        name: p.name,
        longitude: Math.round(longitude * 100) / 100,
        sign: getSign(longitude),
        house: getHouse(longitude, cusps),
        degree: Math.round((longitude % 30) * 10) / 10,
      }
    })

    // 3) Soleil isolé (mais gardé aussi dans planets)
    const sun = planets.find((p) => p.name === 'Soleil')

    // 4) Sync Brevo non bloquante
    const BREVO_API_KEY = process.env.BREVO_API_KEY
    if (BREVO_API_KEY && email) {
      fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          attributes: {
            PRENOM: name || '',
            VILLE_NAISSANCE: birthCity || '',
          },
          updateEnabled: true,
        }),
      }).catch((err) => console.error('Brevo Sync Error:', err))
    }

    // 5) Réponse JSON pour le front
    return NextResponse.json({
      name,
      soleil: {
        sign: sun?.sign ?? null,
        degree: sun?.degree ?? null,
      },
      ascendant: {
        longitude: Math.round(normalize360(Asc) * 100) / 100,
        sign: getSign(normalize360(Asc)),
        degree: Math.round((normalize360(Asc) % 30) * 10) / 10,
      },
      mc: {
        longitude: Math.round(normalize360(MC) * 100) / 100,
        sign: getSign(normalize360(MC)),
        degree: Math.round((normalize360(MC) % 30) * 10) / 10,
      },
      planets, // Soleil reste présent ici
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