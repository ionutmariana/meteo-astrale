'use client'

import { zodiacSigns, planets } from '@/lib/astrology-data'

interface PlanetPosition {
  planet: string
  sign: string
  degree: number
}

interface ZodiacWheelProps {
  planetPositions?: PlanetPosition[]
  size?: number
}

export function ZodiacWheel({ planetPositions = [], size = 400 }: ZodiacWheelProps) {
  const center = size / 2
  const outerRadius = size / 2 - 20
  const innerRadius = outerRadius - 50
  const planetRadius = innerRadius - 30

  // Calculate position on circle
  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index * 360 / total - 90) * (Math.PI / 180)
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  // Get planet position on wheel
  const getPlanetWheelPosition = (sign: string, degree: number) => {
    const signIndex = zodiacSigns.findIndex(z => z.id === sign)
    if (signIndex === -1) return null
    
    const totalDegrees = signIndex * 30 + degree
    const angle = (totalDegrees - 90) * (Math.PI / 180)
    return {
      x: center + planetRadius * Math.cos(angle),
      y: center + planetRadius * Math.sin(angle),
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto"
    >
      {/* Background gradient */}
      <defs>
        <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2D1B69" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0F0C29" stopOpacity="1" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer circle */}
      <circle
        cx={center}
        cy={center}
        r={outerRadius}
        fill="url(#wheelGradient)"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeOpacity="0.5"
      />

      {/* Inner circle */}
      <circle
        cx={center}
        cy={center}
        r={innerRadius}
        fill="none"
        stroke="#C9A84C"
        strokeWidth="1"
        strokeOpacity="0.3"
      />

      {/* Zodiac divisions */}
      {zodiacSigns.map((_, index) => {
        const angle = (index * 30 - 90) * (Math.PI / 180)
        const x1 = center + innerRadius * Math.cos(angle)
        const y1 = center + innerRadius * Math.sin(angle)
        const x2 = center + outerRadius * Math.cos(angle)
        const y2 = center + outerRadius * Math.sin(angle)
        
        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#C9A84C"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        )
      })}

      {/* Zodiac symbols */}
      {zodiacSigns.map((sign, index) => {
        const pos = getPosition(index, 12, (outerRadius + innerRadius) / 2)
        const midAngle = ((index * 30 + 15) - 90) * (Math.PI / 180)
        const textX = center + ((outerRadius + innerRadius) / 2) * Math.cos(midAngle)
        const textY = center + ((outerRadius + innerRadius) / 2) * Math.sin(midAngle)
        
        return (
          <text
            key={sign.id}
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#C9A84C"
            fontSize="18"
            filter="url(#glow)"
          >
            {sign.symbol}
          </text>
        )
      })}

      {/* Planet positions */}
      {planetPositions.map((position) => {
        const planet = planets.find(p => p.id === position.planet)
        const pos = getPlanetWheelPosition(position.sign, position.degree)
        
        if (!planet || !pos) return null
        
        return (
          <g key={position.planet}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r="12"
              fill="#2D1B69"
              stroke="#C9A84C"
              strokeWidth="1"
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#C9A84C"
              fontSize="14"
              filter="url(#glow)"
            >
              {planet.symbol}
            </text>
          </g>
        )
      })}

      {/* Center point */}
      <circle
        cx={center}
        cy={center}
        r="4"
        fill="#C9A84C"
        filter="url(#glow)"
      />
    </svg>
  )
}
