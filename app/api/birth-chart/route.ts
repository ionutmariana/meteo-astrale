import { NextResponse } from 'next/server'
import { createEphemeris, getSign, PLANETS, getHouse } from '@/lib/astrology'

async function geocodeCity(query: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&format=json`
  const res = await fetch(url)
  const data = await res.json()
  if (!data.results?.length) throw new Error('Ville introuvable')
  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
    name: data.results[0].name,
    country: data.results[0].country || '',
  }
}

async function getUTCOffset(lat: number, lon: number, dateStr: string): Promise<number> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/timezone?latitude=${lat}&longitude=${lon}&date=${dateStr}`
    )
    const data = await res.json()
    return (data.utc_offset_seconds || 0) / 3600
  } catch {
    const month = parseInt(dateStr.split('-')[1])
    const baseOffset = Math.round(lon / 15)
    const isDST = month >= 4 && month <= 10
    return baseOffset + (isDST ? 1 : 0)
  }
}

function localToUTC(hour: number, minute: number, offset: number) {
  const totalLocalMinutes = hour * 60 + minute
  const offsetMinutes = Math.round(offset * 60)
  let totalUTCMinutes = totalLocalMinutes - offsetMinutes
  totalUTCMinutes = ((totalUTCMinutes % 1440) + 1440) % 1440
  return {
    hour: Math.floor(totalUTCMinutes / 60),
    minute: totalUTCMinutes % 60,
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, birthDate, birthTime, city, country, lat, lon } = body

    if (!birthDate || !birthTime || (!city && lat === undefined)) {
      return NextResponse.json(
        { error: 'Données manquantes. Requis : birthDate, birthTime, city' },
        { status: 400 }
      )
    }

    // Coordonnées
    let latitude: number, longitude: number, cityName = city || '', countryName = country || ''

    if (lat !== undefined && lon !== undefined) {
      latitude = parseFloat(lat)
      longitude = parseFloat(lon)
    } else {
      const loc = await geocodeCity(country ? `${city}, ${country}` : city)
      latitude = loc.lat
      longitude = loc.lon
      cityName = loc.name
      countryName = loc.country
    }

    // Parser date/heure locale
    const [year, month, day] = birthDate.split('-').map(Number)
    const [localHour, localMinute] = birthTime.split(':').map(Number)

    // Offset UTC
    const utcOffset = await getUTCOffset(latitude, longitude, birthDate)
    const utcTime = localToUTC(localHour, localMinute, utcOffset)

    // Date UTC corrigée
    const utcDate = new Date(Date.UTC(year, month - 1, day, utcTime.hour, utcTime.minute))

    console.log('📍', latitude, longitude)
    console.log('🕐 Local:', `${localHour}h${localMinute}`)
    console.log('🕐 UTC:', `${utcTime.hour}h${utcTime.minute}`)

    // Calcul local
    const chart = createEphemeris(utcDate, latitude, longitude)
    const unixSec = utcDate.getTime() / 1000

    const planetsPositions = PLANETS.map(p => {
      const lon = p.lon(unixSec)
      return {
        name: p.name,
        sign: getSign(lon),
        degree: lon % 30,
        house: getHouse(lon, chart.cusps),
      }
    })

    return NextResponse.json({
      name: name || 'Anonyme',
      birthDate,
      birthTime,
      utcOffset,
      utcTime: `${String(utcTime.hour).padStart(2, '0')}:${String(utcTime.minute).padStart(2, '0')}`,
      location: { city: cityName, country: countryName, lat: latitude, lon: longitude },
      ascendant: { sign: getSign(chart.Asc), degree: chart.Asc % 30 },
      mc: { sign: getSign(chart.MC), degree: chart.MC % 30 },
      planets: planetsPositions,
      houses: chart.cusps.map((c, i) => ({
        number: i + 1,
        sign: getSign(c),
        degree: c % 30,
      })),
    })

  } catch (err: any) {
    console.error('[API ERROR]:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}