'use client'

import useSWR from 'swr'
import { PLANETS, zodiacSigns, getSign } from '@/lib/astrology'

interface PlanetData {
  planet: string
  sign: string
  degree: number
  retrograde: boolean
}

function getCacheKey(): string {
  const today = new Date().toISOString().split('T')[0]
  return `astrology_data_${today}`
}

function getFromCache(): PlanetData[] | null {
  if (typeof window === 'undefined') return null
  try {
    const cached = localStorage.getItem(getCacheKey())
    return cached ? JSON.parse(cached) : null
  } catch {
    return null
  }
}

function saveToCache(data: PlanetData[]): void {
  if (typeof window === 'undefined') return
  try {
    const cacheKey = getCacheKey()
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('astrology_data_') && key !== cacheKey) {
        localStorage.removeItem(key)
      }
    }
    localStorage.setItem(cacheKey, JSON.stringify(data))
  } catch {
    // Ignore
  }
}

function getDefaultPlanets(): PlanetData[] {
  const unixSec = Date.now() / 1000
  return PLANETS.map(p => {
    const lon = p.lon(unixSec)
    return {
      planet: p.name,
      sign: getSign(lon),
      degree: lon % 30,
      retrograde: false,
    }
  })
}

async function fetcher(): Promise<PlanetData[]> {
  const cached = getFromCache()
  if (cached) return cached

  const apiKey = process.env.NEXT_PUBLIC_ASTRO_API_KEY

  if (!apiKey) {
    console.warn('NEXT_PUBLIC_ASTRO_API_KEY not set, using computed data')
    const planets = getDefaultPlanets()
    saveToCache(planets)
    return planets
  }

  try {
    const response = await fetch('https://json.freeastrologyapi.com/planets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        hours: 12,
        minutes: 0,
        seconds: 0,
        latitude: 48.8566,
        longitude: 2.3522,
        timezone: 1,
        config: {
          observation_point: 'geocentric',
          ayanamsha: 'tropical',
        },
      }),
    })

    if (!response.ok) throw new Error('API request failed')

    const data = await response.json()
    saveToCache(data.output)
    return data.output
  } catch (error) {
    console.error('API Error, fallback to computed data:', error)
    const planets = getDefaultPlanets()
    saveToCache(planets)
    return planets
  }
}

export function useAstrologyData() {
  const { data, error, isLoading, mutate } = useSWR('astrology-data', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 3600000,
  })

  return {
    data: data ?? getDefaultPlanets(),
    error,
    isLoading,
    refresh: mutate,
  }
}