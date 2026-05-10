'use client'

import useSWR from 'swr'
import { mockDailyTransits } from '@/lib/astrology'

const API_URL = 'https://json.freeastrologyapi.com/planets'

interface PlanetData {
  planet: string
  sign: string
  degree: number
  retrograde: boolean
}

// Cache key based on date
function getCacheKey(): string {
  const today = new Date().toISOString().split('T')[0]
  return `astrology_data_${today}`
}

// Check localStorage cache
function getFromCache(): PlanetData[] | null {
  if (typeof window === 'undefined') return null
  
  try {
    const cacheKey = getCacheKey()
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      return JSON.parse(cached)
    }
  } catch {
    // Ignore cache errors
  }
  return null
}

// Save to localStorage cache
function saveToCache(data: PlanetData[]): void {
  if (typeof window === 'undefined') return
  
  try {
    const cacheKey = getCacheKey()
    // Clear old cache entries
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('astrology_data_') && key !== cacheKey) {
        localStorage.removeItem(key)
      }
    }
    localStorage.setItem(cacheKey, JSON.stringify(data))
  } catch {
    // Ignore cache errors
  }
}

// Fetcher function for SWR
async function fetcher(): Promise<PlanetData[]> {
  // Check cache first
  const cached = getFromCache()
  if (cached) {
    return cached
  }

  const apiKey = process.env.NEXT_PUBLIC_ASTRO_API_KEY
  
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_ASTRO_API_KEY not set, using mock data')
    return mockDailyTransits.map(t => ({
      planet: t.planet,
      sign: t.sign,
      degree: t.degree,
      retrograde: false,
    }))
  }

  try {
    const response = await fetch(API_URL, {
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

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    saveToCache(data.output)
    return data.output
  } catch (error) {
    console.error('API Error:', error)
    // Return mock data as fallback
    return mockDailyTransits.map(t => ({
      planet: t.planet,
      sign: t.sign,
      degree: t.degree,
      retrograde: false,
    }))
  }
}

export function useAstrologyData() {
  const { data, error, isLoading, mutate } = useSWR('astrology-data', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 3600000, // 1 hour
  })

  return {
    data: data ?? mockDailyTransits.map(t => ({
      planet: t.planet,
      sign: t.sign,
      degree: t.degree,
      retrograde: false,
    })),
    error,
    isLoading,
    refresh: mutate,
  }
}
