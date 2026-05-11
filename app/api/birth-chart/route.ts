import { NextResponse } from 'next/server'

/**
 * Calcule le décalage UTC pour une date et des coordonnées
 */
async function getUTCOffset(lat: number, lon: number, dateStr: string): Promise<number> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/timezone?latitude=${lat}&longitude=${lon}&date=${dateStr}`
    )
    if (!res.ok) throw new Error('API timezone indisponible')
    const data = await res.json()
    return (data.utc_offset_seconds || 0) / 3600
  } catch {
    // Fallback : 15° = 1 heure + règle DST simplifiée
    const baseOffset = Math.round(lon / 15)
    const month = parseInt(dateStr.split('-')[1])
    const isDST = month >= 4 && month <= 10 // Avril à Octobre = heure d'été (approx.)
    return baseOffset + (isDST ? 1 : 0)
  }
}

/**
 * Convertit une heure locale en UTC avec gestion des fractions d'offset
 */
function localToUTC(hour: number, minute: number, offset: number) {
  // Convertir en minutes totales pour éviter les erreurs de flottant
  const totalLocalMinutes = hour * 60 + minute
  const offsetMinutes = Math.round(offset * 60)
  let totalUTCMinutes = totalLocalMinutes - offsetMinutes

  // Gérer les débordements (reste entre 0 et 1439 minutes = 0h-23h59)
  totalUTCMinutes = ((totalUTCMinutes % 1440) + 1440) % 1440

  const utcHour = Math.floor(totalUTCMinutes / 60)
  const utcMinute = totalUTCMinutes % 60

  return { hour: utcHour, minute: utcMinute }
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

    // 1. Coordonnées
    let latitude: number
    let longitude: number
    let cityName = city || ''
    let countryName = country || ''

    if (lat !== undefined && lon !== undefined) {
      latitude = parseFloat(lat)
      longitude = parseFloat(lon)
    } else {
      const query = country ? `${city}, ${country}` : city
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&format=json`
      )
      const geoData = await geoRes.json()
      if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json({ error: 'Ville introuvable' }, { status: 404 })
      }
      latitude = geoData.results[0].latitude
      longitude = geoData.results[0].longitude
      cityName = geoData.results[0].name
      countryName = geoData.results[0].country || ''
    }

    // 2. Parser la date et l'heure locales
    const [year, month, day] = birthDate.split('-').map(Number)
    const [localHour, localMinute] = birthTime.split(':').map(Number)

    // 3. Calculer l'offset UTC
    const utcOffset = await getUTCOffset(latitude, longitude, birthDate)

    // 4. Convertir heure locale → UTC (avec gestion des fractions)
    const utcTime = localToUTC(localHour, localMinute, utcOffset)

    // Validation finale : l'heure doit être entre 0-23
    if (utcTime.hour < 0 || utcTime.hour > 23 || utcTime.minute < 0 || utcTime.minute > 59) {
      return NextResponse.json(
        { error: 'Erreur de conversion horaire' },
        { status: 400 }
      )
    }

    console.log('📍 Coordonnées:', latitude, longitude)
    console.log('🕐 Heure locale:', `${localHour}h${localMinute}`)
    console.log('🕐 UTC Offset:', utcOffset, 'heures')
    console.log('🕐 Heure UTC:', `${utcTime.hour}h${utcTime.minute}`)

    // 5. Appel à l'API astrologique
    const apiKey = process.env.ASTRO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Clé API non configurée' }, { status: 500 })
    }

    const astroRes = await fetch('https://json.freeastrologyapi.com/planets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        year,
        month,
        date: day,
        hours: utcTime.hour,
        minutes: utcTime.minute,
        seconds: 0,
        latitude,
        longitude,
        timezone: 0,
        config: {
          observation_point: 'geocentric',
          ayanamsha: 'tropical',
        },
      }),
    })

    if (!astroRes.ok) {
      const errData = await astroRes.json().catch(() => ({}))
      console.error('Erreur API astro:', errData)
      return NextResponse.json(
        { error: 'Erreur lors du calcul astrologique' },
        { status: 502 }
      )
    }

    const data = await astroRes.json()

    return NextResponse.json({
      name: name || 'Anonyme',
      birthDate,
      birthTime,
      utcOffset,
      utcTime: `${String(utcTime.hour).padStart(2, '0')}:${String(utcTime.minute).padStart(2, '0')}`,
      location: {
        city: cityName,
        country: countryName,
        lat: latitude,
        lon: longitude,
      },
      ascendant: data.ascendant
        ? { sign: data.ascendant.sign, degree: data.ascendant.degree }
        : null,
      mc: data.midheaven
        ? { sign: data.midheaven.sign, degree: data.midheaven.degree }
        : null,
      planets: Array.isArray(data.output)
        ? data.output.map((p: any) => ({
            name: p.name,
            sign: p.sign,
            degree: p.degree,
            house: p.house,
            retrograde: p.retrograde || false,
          }))
        : [],
      houses: Array.isArray(data.houses)
        ? data.houses.map((h: any) => ({
            number: h.house_number,
            sign: h.sign,
            degree: h.degree,
          }))
        : [],
    })

  } catch (err: any) {
    console.error('[API ERROR]:', err)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}