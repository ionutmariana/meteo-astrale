'use client'

import { useState } from 'react'
import BirthForm from '@/components/birth-form'
import NatalChartResult from '@/components/natal-chart-result'

export default function CarteNatalePage() {
  const [result, setResult] = useState<any>(null)

  return (
    <div className="container mx-auto px-4 py-10">
      {!result ? (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif text-white text-center mb-8">
            Calcul de votre Carte Natale
          </h1>
          <BirthForm onResult={(data) => setResult(data)} />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setResult(null)}
            className="mb-6 text-amber-500 hover:text-amber-400 transition-colors"
          >
            ← Calculer une autre carte
          </button>
          <NatalChartResult chartData={result} userName={result.name || 'Utilisateur'} />
        </div>
      )}
    </div>
  )
}