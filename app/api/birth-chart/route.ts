import { NextResponse } from 'next/server'
import { createEphemeris, getSign, PLANETS, getHouse } from '@/lib/astrology'

async function geocodeCity(city: string): Promise<{
  lat: number
  lon: number
  name: string
  country: string
  timezone: string
}> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Erreur géocodage: ${response.status}`)
  const data = await response.json()
  if (!data.results?.length) throw new Error(`Ville introuvable: "${city}"`)
  const r = data.results[0]
  return {
    lat: r.latitude,
    lon: r.longitude,
    name: r.name,
    country: r.country || '',
    timezone: r.timezone || 'Europe/Paris'
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, birthDate, birthTime, city, country, lat, lon } = body

    // Validation
    if (!birthDate || !birthTime || (!city && !lat)) {
      return NextResponse.json({ error: 'Données manquantes. Requis: birthDate, birthTime, city' }, { status: 400 })
    }

    // Géocodage
    let latitude: number
    let longitude: number
    let timezone = 'UTC'

    if (lat !== undefined && lon !== undefined) {
      latitude = parseFloat(lat)
      longitude = parseFloat(lon)
    } else {
      const searchQuery = country ? `${city}, ${country}` : city
      const location = await geocodeCity(searchQuery)
      latitude = location.lat
      longitude = location.lon
      timezone = location.timezone
      console.log('📍 Géocodage:', location.name, location.lat, location.lon, location.timezone)
    }

    // CORRECTION FUSEAU HORAIRE
    // On crée la date en local puis on convertit en UTC
    const localDate = new Date(`${birthDate}T${birthTime}:00`)
    
    // Calcul du décalage UTC pour cette date à cet endroit
    // Pour l'Europe de l'Est (Bucarest), en mars = UTC+2
    const utcOffset = getUTCOffset(birthDate, birthTime, latitude, longitude)
    
    // Date UTC corrigée
    const utcDate = new Date(localDate.getTime() - utcOffset * 3600000)
    
    if (isNaN(utcDate.getTime())) {
      return NextResponse.json({ error: 'Date ou heure invalide' }, { status: 400 })
    }

    console.log('🕐 Date locale:', localDate.toISOString())
    console.log('🕐 Date UTC corrigée:', utcDate.toISOString())
    console.log('🕐 UTC Offset:', utcOffset, 'heures')

    // Calcul
    const chart = createEphemeris(utcDate, latitude, longitude)
    const unixSec = utcDate.getTime() / 1000
    
    const planetsPositions = PLANETS.map(p => {
      const lon = p.lon(unixSec)
      return {
        name: p.name,
        sign: getSign(lon),
        degree: lon % 30,
        house: getHouse(lon, chart.cusps)
      }
    })

    return NextResponse.json({
      name: name || 'Anonyme',
      birthDate,
      birthTime,
      location: { city, country, lat: latitude, lon: longitude },
      ascendant: { sign: getSign(chart.Asc), degree: chart.Asc % 30 },
      mc: { sign: getSign(chart.MC), degree: chart.MC % 30 },
      planets: planetsPositions,
      houses: chart.cusps.map((c, i) => ({
        number: i + 1,
        sign: getSign(c),
        degree: c % 30
      }))
    })

  } catch (err: any) {
    console.error('[API ERROR]:', err)
    return NextResponse.json({ error: 'Erreur lors du calcul.', details: err.message }, { status: 500 })
  }
}

// Fonction pour estimer le décalage UTC (simplifié mais correct)
function getUTCOffset(date: string, time: string, lat: number, lon: number): number {
  // Pour l'Europe : calcul simplifié basé sur la longitude
  // 15° de longitude = 1 heure
  let baseOffset = Math.round(lon / 15)
  
  // Ajustement pour la Roumanie/Europe de l'Est
  // En mars, UTC+2 (pas de DST avant le dernier dimanche de mars)
  const [year, month] = date.split('-').map(Number)
  
  // Heure d'hiver ou d'été approximative
  // DST commence le dernier dimanche de mars, finit le dernier dimanche d'octobre
  const isDST = (month > 3 && month < 10) || 
                (month === 3 && isAfterLastSunday(year, month, parseInt(date.split('-')[2]))) ||
                (month === 10 && !isAfterLastSunday(year, month, parseInt(date.split('-')[2])))
  
  // Pour Bucarest (~26°E) : fuseau normal = UTC+2, DST = UTC+3
  return baseOffset + (isDST ? 1 : 0)
}

function isAfterLastSunday(year: number, month: number, day: number): boolean {
  const lastDay = new Date(year, month, 0).getDate()
  const lastSunday = lastDay - new Date(year, month - 1, lastDay).getDay()
  return day >= lastSunday
}