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

    // Détection de la rétrogradation : vitesse angulaire négative (lon J+1j < lon J)
function isRetrograde(planet: typeof PLANETS[0], unixSec: number): boolean {
      const delta = 86400 // 1 jour en secondes (pour planètes lentes comme Saturne)
  const lon1 = planet.lon(unixSec)
  const lon2 = planet.lon(unixSec + delta)
  // Correction pour le passage 359° -> 0°
  let diff = lon2 - lon1
  if (diff > 180) diff -= 360
  if (diff < -180) diff += 360
  return diff < 0
}

function getDefaultPlanets(): PlanetData[] {
  const unixSec = Date.now() / 1000
  return PLANETS.map(p => {
    const lon = p.lon(unixSec)
    return {
      planet: p.name,
      sign: getSign(lon),
      degree: lon % 30,
      retrograde: isRetrograde(p, unixSec),
    }
  })
}

async function fetcher(): Promise<PlanetData[]> {
  const cached = getFromCache()
  if (cached) return cached

  const apiKey = process.env.NEXT_PUBLIC_ASTRO_API_KEY
  if (!apiKey) {
    const defaults = getDefaultPlanets()
    saveToCache(defaults)
    return defaults
  }

  try {
    const res = await fetch(`/api/daily-transits?key=${apiKey}`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    saveToCache(data)
    return data
  } catch {
    const defaults = getDefaultPlanets()
    saveToCache(defaults)
    return defaults
  }
}

export function useAstrologyData() {
  const { data, error, isLoading } = useSWR<PlanetData[]>(
    'astrology_data',
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  )
  return { data, isLoading, error }
}
