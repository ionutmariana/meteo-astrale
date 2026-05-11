import { NextResponse } from 'next/server'
import { createEphemeris, getSign, PLANETS, getHouse } from '@/lib/astrology'

// ------------------------------------------------------------
// GÉOCODAGE - Conversion ville → coordonnées
// ------------------------------------------------------------

async function geocodeCity(city: string): Promise<{
  lat: number
  lon: number
  name: string
  country: string
  timezone: string
}> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Erreur API géocodage: ${response.status}`)
  }

  const data = await response.json()

  if (!data.results || data.results.length === 0) {
    throw new Error(`Ville introuvable: "${city}"`)
  }

  const result = data.results[0]
  
  return {
    lat: result.latitude,
    lon: result.longitude,
    name: result.name,
    country: result.country || '',
    timezone: result.timezone || 'Europe/Paris'
  }
}

// ------------------------------------------------------------
// ROUTE API
// ------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, birthDate, birthTime, city, country } = body

    // Validation
    if (!birthDate || !birthTime || !city) {
      return NextResponse.json(
        { error: 'Données manquantes. Requis: birthDate, birthTime, city' }, 
        { status: 400 }
      )
    }

    // Géocodage
    const searchQuery = country ? `${city}, ${country}` : city
    const location = await geocodeCity(searchQuery)

    // Date
    const dateTime = new Date(`${birthDate}T${birthTime}:00`)
    
    if (isNaN(dateTime.getTime())) {
      return NextResponse.json(
        { error: 'Date ou heure invalide' }, 
        { status: 400 }
      )
    }

    // Calcul
    const chart = createEphemeris(dateTime, location.lat, location.lon)
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

    // Réponse
    return NextResponse.json({
      name: name || 'Anonyme',
      birthDate,
      birthTime,
      location: {
        city: location.name,
        country: location.country,
        lat: location.lat,
        lon: location.lon
      },
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
    return NextResponse.json(
      { error: 'Erreur lors du calcul.', details: err.message }, 
      { status: 500 }
    )
  }
}
