'use client'

import { useState } from 'react'
import { BirthForm } from '@/components/birth-form'
import NatalChartResult from '@/components/natal-chart-result'

export default function CarteNatalePage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (birthData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/birth-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(birthData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du calcul cosmique')
      }

      setResult(data)
    } catch (error: any) {
      console.error("Erreur API:", error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen bg-slate-950">
      {!result ? (
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-12 pt-10">
            <h1 className="text-4xl font-serif text-white mb-4">
              Calcul de votre Carte Natale
            </h1>
            <p className="text-gray-400">
              Saisissez vos informations de naissance pour générer votre portrait astral précis.
            </p>
          </header>
          
          <BirthForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={() => setResult(null)}
            className="mb-8 text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Calculer une autre carte
          </button>
          
          <NatalChartResult 
            chartData={result} 
            userName={result.name || 'Voyageur'} 
          />
        </div>
      )}
    </div>
  )
}