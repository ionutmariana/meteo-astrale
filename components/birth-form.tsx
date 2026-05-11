'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'

interface BirthData {
  name: string
  birthDate: string
  birthTime: string
  city: string
  country: string
}

interface BirthFormProps {
  onSubmit: (data: BirthData) => void
  isLoading?: boolean
}

// Ajout de "default" ici pour corriger l'erreur de build
export default function BirthForm({ onSubmit, isLoading = false }: BirthFormProps) {
  const { language } = useLanguage()
  const [formData, setFormData] = useState<BirthData>({
    name: '',
    birthDate: '',
    birthTime: '',
    city: '',
    country: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof BirthData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const t = (fr: string, en: string) => language === 'fr' ? fr : en

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          {t('Nom complet', 'Full name')}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            {t('Date de naissance', 'Birth date')}
          </label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={handleChange('birthDate')}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            {t('Heure de naissance', 'Birth time')}
          </label>
          <input
            type="time"
            value={formData.birthTime}
            onChange={handleChange('birthTime')}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            {t('Ville de naissance', 'Birth city')}
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={handleChange('city')}
            placeholder={t('Ex: Paris', 'Ex: London')}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            {t('Pays (optionnel)', 'Country (optional)')}
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={handleChange('country')}
            placeholder={t('Ex: France', 'Ex: UK')}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-lg hover:bg-amber-500/30 disabled:opacity-50 transition-colors"
      >
        {isLoading ? t('Calcul...', 'Calculating...') : t('Calculer mon thème', 'Calculate my chart')}
      </button>
    </form>
  )
}