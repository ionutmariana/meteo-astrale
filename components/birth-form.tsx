'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { countries } from '@/lib/astrology-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sparkles, Loader2 } from 'lucide-react'
import type { Language } from '@/lib/translations'

interface BirthFormProps {
  onSubmit: (data: BirthData) => void
  isLoading?: boolean
}

export interface BirthData {
  name: string
  date: string
  time: string
  city: string
  country: string
}

export function BirthForm({ onSubmit, isLoading }: BirthFormProps) {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState<BirthData>({
    name: '',
    date: '',
    time: '',
    city: '',
    country: 'FR',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof BirthData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-cream">
            {t.natalChart.form.name}
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            className="h-12 bg-input border-border text-cream placeholder:text-muted-foreground"
            placeholder="Marie"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date" className="text-cream">
            {t.natalChart.form.date}
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
            className="h-12 bg-input border-border text-cream"
          />
        </div>

        {/* Time */}
        <div className="space-y-2">
          <Label htmlFor="time" className="text-cream">
            {t.natalChart.form.time}
          </Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            required
            className="h-12 bg-input border-border text-cream"
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-cream">
            {t.natalChart.form.city}
          </Label>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            required
            className="h-12 bg-input border-border text-cream placeholder:text-muted-foreground"
            placeholder="Paris"
          />
        </div>

        {/* Country */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="country" className="text-cream">
            {t.natalChart.form.country}
          </Label>
          <Select value={formData.country} onValueChange={(value) => handleChange('country', value)}>
            <SelectTrigger className="h-12 bg-input border-border text-cream">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass">
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name[language as Language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        className="btn-gold w-full h-14 text-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-5 w-5" />
        )}
        {t.natalChart.form.submit}
      </Button>
    </form>
  )
}
