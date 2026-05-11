import { NextResponse } from 'next/server'
import { createEphemeris, getSign, PLANETS, getHouse } from '@/lib/astrology'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { birthDate, birthTime, lat, lon } = body

    if (!birthDate || !birthTime || !lat || !lon) {
      return NextResponse.json({ error: 'Données manquantes.' }, { status: 400 })
    }

    // 1. On crée la date en UTC
    const dateTime = new Date(`${birthDate}T${birthTime}:00Z`)

    // 2. Calcul du thème tropical (Asc, MC, maisons)
    const chart = createEphemeris(dateTime, parseFloat(lat), parseFloat(lon))

    // 3. Calcul des planètes tropicales
    const unixSec = dateTime.getTime() / 1000
    const planetsPositions = PLANETS.map(p => {
      const longitude = p.lon(unixSec)
      return {
        name: p.name,
        sign: getSign(longitude),
        degree: longitude % 30,
        house: getHouse(longitude, chart.cusps)
      }
    })

    // 4. Réponse API
    return NextResponse.json({
      name: body.name,
      ascendant: {
        sign: getSign(chart.Asc),
        degree: chart.Asc % 30
      },
      mc: {
        sign: getSign(chart.MC),
        degree: chart.MC % 30
      },
      planets: planetsPositions,
      houses: chart.cusps.map((c, i) => ({
        number: i + 1,
        sign: getSign(c),
        degree: c % 30
      }))
    })

  } catch (err: any) {
    console.error('[API ERROR]:', err)
    return NextResponse.json({ error: 'Erreur lors du calcul.' }, { status: 500 })
  }
}
