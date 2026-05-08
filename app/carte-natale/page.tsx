'use client'

import { useState, useCallback } from 'react'
import { useLanguage } from '@/contexts/language-context'
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
import { Sparkles, Loader2, Mail, Check, ArrowLeft, Moon, Sun } from 'lucide-react'
import { calculateNatalChart, getCityCoordinates, type NatalChartData } from '@/lib/swisseph'
import { countries } from '@/lib/astrology-data'
import type { Language } from '@/lib/translations'

interface BirthFormData {
  firstName: string
  lastName: string
  date: string
  hour: string
  minute: string
  ampm: 'AM' | 'PM'
  is24Hour: boolean
  city: string
  country: string
}

type ViewState = 'form' | 'loading' | 'results' | 'emailSent'

export default function NatalChartPage() {
  const { t, language } = useLanguage()
  const [viewState, setViewState] = useState<ViewState>('form')
  const [chartData, setChartData] = useState<NatalChartData | null>(null)
  const [birthData, setBirthData] = useState<BirthFormData | null>(null)
  const [email, setEmail] = useState('')
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  
  const [formData, setFormData] = useState<BirthFormData>({
    firstName: '',
    lastName: '',
    date: '',
    hour: '12',
    minute: '00',
    ampm: 'PM',
    is24Hour: false,
    city: '',
    country: 'FR',
  })

  const handleChange = useCallback((field: keyof BirthFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setViewState('loading')
    setBirthData(formData)
    
    // Get coordinates for the city
    const coords = getCityCoordinates(formData.city)
    if (!coords) {
      // Default to Paris if city not found
      coords && (coords.lat = 48.8566)
    }
    
    const cityCoords = coords || { lat: 48.8566, lng: 2.3522, tz: 1 }
    
    // Parse date and time
    const [year, month, day] = formData.date.split('-').map(Number)
    let hour = parseInt(formData.hour)
    const minute = parseInt(formData.minute)
    
    if (!formData.is24Hour) {
      if (formData.ampm === 'PM' && hour !== 12) hour += 12
      if (formData.ampm === 'AM' && hour === 12) hour = 0
    }
    
    // Simulate loading with star animation
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    try {
      const chart = await calculateNatalChart(
        year,
        month,
        day,
        hour,
        minute,
        cityCoords.lat,
        cityCoords.lng,
        cityCoords.tz
      )
      setChartData(chart)
      setViewState('results')
    } catch {
      // Fallback calculation on error
      const chart = await calculateNatalChart(
        year,
        month,
        day,
        hour,
        minute,
        48.8566,
        2.3522,
        1
      )
      setChartData(chart)
      setViewState('results')
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmittingEmail(true)
    // Simulate email submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmittingEmail(false)
    setViewState('emailSent')
  }

  const handleReset = () => {
    setViewState('form')
    setChartData(null)
    setBirthData(null)
    setEmail('')
  }

  // Generate hour options
  const hourOptions = formData.is24Hour
    ? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    : Array.from({ length: 12 }, (_, i) => (i + 1).toString())

  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">
          {t.natalChart.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t.natalChart.subtitle}
        </p>
      </div>

      {/* Form View */}
      {viewState === 'form' && (
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleCalculate} className="glass rounded-2xl p-6 md:p-8 space-y-6">
            {/* Name Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-cream font-medium">
                  {language === 'fr' ? 'Prénom' : language === 'en' ? 'First Name' : language === 'es' ? 'Nombre' : language === 'jp' ? '名' : 'Prenume'}
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  required
                  className="h-12 bg-input border-border text-cream placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                  placeholder="Marie"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-cream font-medium">
                  {language === 'fr' ? 'Nom' : language === 'en' ? 'Last Name' : language === 'es' ? 'Apellido' : language === 'jp' ? '姓' : 'Nume'}
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  required
                  className="h-12 bg-input border-border text-cream placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                  placeholder="Dupont"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-cream font-medium">
                {t.natalChart.form.date}
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
                className="h-12 bg-input border-border text-cream focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Time of Birth with 12h/24h Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-cream font-medium">
                  {t.natalChart.form.time}
                </Label>
                <button
                  type="button"
                  onClick={() => handleChange('is24Hour', !formData.is24Hour)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cream transition-colors px-3 py-1.5 rounded-lg glass-light"
                >
                  {formData.is24Hour ? (
                    <>
                      <span className="text-primary">24h</span>
                      <span>/</span>
                      <span>12h</span>
                    </>
                  ) : (
                    <>
                      <span>24h</span>
                      <span>/</span>
                      <span className="text-primary">12h</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex gap-3 items-center">
                {/* Hour Select */}
                <Select value={formData.hour} onValueChange={(value) => handleChange('hour', value)}>
                  <SelectTrigger className="h-12 w-24 bg-input border-border text-cream">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass max-h-60">
                    {hourOptions.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <span className="text-2xl text-cream font-light">:</span>
                
                {/* Minute Select */}
                <Select value={formData.minute} onValueChange={(value) => handleChange('minute', value)}>
                  <SelectTrigger className="h-12 w-24 bg-input border-border text-cream">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass max-h-60">
                    {minuteOptions.map((min) => (
                      <SelectItem key={min} value={min}>
                        {min}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* AM/PM Toggle (only for 12h format) */}
                {!formData.is24Hour && (
                  <div className="flex gap-1 ml-2">
                    <button
                      type="button"
                      onClick={() => handleChange('ampm', 'AM')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        formData.ampm === 'AM'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-input text-muted-foreground hover:text-cream'
                      }`}
                    >
                      <Sun className="w-3 h-3" />
                      AM
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('ampm', 'PM')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        formData.ampm === 'PM'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-input text-muted-foreground hover:text-cream'
                      }`}
                    >
                      <Moon className="w-3 h-3" />
                      PM
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* City and Country */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-cream font-medium">
                  {t.natalChart.form.city}
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  required
                  className="h-12 bg-input border-border text-cream placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                  placeholder="Paris"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-cream font-medium">
                  {t.natalChart.form.country}
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleChange('country', value)}>
                  <SelectTrigger className="h-12 bg-input border-border text-cream">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass max-h-60">
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name[language as Language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="btn-gold w-full h-14 text-lg mt-4"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {t.natalChart.form.submit}
            </Button>
          </form>
        </div>
      )}

      {/* Loading View with Star Animation */}
      {viewState === 'loading' && (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative w-64 h-64">
            {/* Animated stars container */}
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-primary animate-pulse"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    boxShadow: '0 0 10px rgba(201, 168, 76, 0.8)',
                  }}
                />
              ))}
            </div>
            
            {/* Central spinning wheel */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '3s' }}>
                  {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, i) => (
                    <span
                      key={i}
                      className="absolute text-primary text-xs"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 30}deg) translateY(-60px) rotate(-${i * 30}deg) translate(-50%, -50%)`,
                      }}
                    >
                      {symbol}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-4 rounded-full border border-primary/50 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
                <div className="absolute inset-8 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary animate-bounce" />
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-cream font-serif text-xl animate-pulse">
            {language === 'fr' ? 'Calcul de votre thème astral...' : 
             language === 'en' ? 'Calculating your birth chart...' :
             language === 'es' ? 'Calculando tu carta natal...' :
             language === 'jp' ? 'ネイタルチャートを計算中...' :
             'Calculăm harta ta natală...'}
          </p>
        </div>
      )}

      {/* Results View */}
      {viewState === 'results' && chartData && birthData && (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-muted-foreground hover:text-cream transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'fr' ? 'Nouveau calcul' : 
             language === 'en' ? 'New calculation' :
             language === 'es' ? 'Nuevo cálculo' :
             language === 'jp' ? '新しい計算' :
             'Calcul nou'}
          </button>

          {/* User Info Card */}
          <div className="glass rounded-2xl p-6 text-center">
            <h2 className="font-serif text-3xl text-cream mb-2">
              {birthData.firstName} {birthData.lastName}
            </h2>
            <p className="text-muted-foreground text-lg">
              {new Date(birthData.date).toLocaleDateString(
                language === 'jp' ? 'ja-JP' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : language === 'ro' ? 'ro-RO' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )} {' '}
              {language === 'fr' ? 'à' : language === 'en' ? 'at' : language === 'es' ? 'a las' : language === 'jp' ? '' : 'la'} {' '}
              {birthData.is24Hour 
                ? `${birthData.hour}:${birthData.minute}`
                : `${birthData.hour}:${birthData.minute} ${birthData.ampm}`
              }
            </p>
            <p className="text-muted-foreground">
              {birthData.city}, {countries.find(c => c.code === birthData.country)?.name[language as Language]}
            </p>
          </div>

          {/* Ascendant & Midheaven */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {language === 'fr' ? 'Ascendant' : language === 'en' ? 'Ascendant' : language === 'es' ? 'Ascendente' : language === 'jp' ? 'アセンダント' : 'Ascendent'}
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl text-primary">{chartData.ascendant.signSymbol}</span>
                <div>
                  <p className="text-2xl font-serif text-cream">{chartData.ascendant.sign}</p>
                  <p className="text-sm text-muted-foreground">
                    {chartData.ascendant.degree}° {chartData.ascendant.minute}&apos;
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {language === 'fr' ? 'Milieu du Ciel (MC)' : language === 'en' ? 'Midheaven (MC)' : language === 'es' ? 'Medio Cielo (MC)' : language === 'jp' ? 'MCミッドヘブン' : 'Mijlocul Cerului (MC)'}
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl text-primary">{chartData.midheaven.signSymbol}</span>
                <div>
                  <p className="text-2xl font-serif text-cream">{chartData.midheaven.sign}</p>
                  <p className="text-sm text-muted-foreground">
                    {chartData.midheaven.degree}° {chartData.midheaven.minute}&apos;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Planetary Positions Table */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-serif text-2xl text-cream mb-6 text-center">
              {t.natalChart.planets}
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {language === 'fr' ? 'Planète' : language === 'en' ? 'Planet' : language === 'es' ? 'Planeta' : language === 'jp' ? '惑星' : 'Planetă'}
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {language === 'fr' ? 'Signe' : language === 'en' ? 'Sign' : language === 'es' ? 'Signo' : language === 'jp' ? '星座' : 'Semn'}
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {language === 'fr' ? 'Position' : language === 'en' ? 'Position' : language === 'es' ? 'Posición' : language === 'jp' ? '位置' : 'Poziție'}
                    </th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium">
                      {language === 'fr' ? 'R' : 'R'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.planets.map((planet) => (
                    <tr key={planet.name} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl text-primary">{planet.symbol}</span>
                          <span className="text-cream font-medium">{planet.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{planet.signSymbol}</span>
                          <span className="text-cream">{planet.sign}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {planet.degree}° {planet.minute}&apos;
                      </td>
                      <td className="py-4 px-4 text-center">
                        {planet.retrograde && (
                          <span className="text-red-400 font-medium" title="Retrograde">
                            ℞
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* House Cusps */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-serif text-2xl text-cream mb-6 text-center">
              {language === 'fr' ? 'Cuspides des Maisons (Placidus)' : 
               language === 'en' ? 'House Cusps (Placidus)' : 
               language === 'es' ? 'Cúspides de las Casas (Placidus)' : 
               language === 'jp' ? 'ハウスカスプ (プラシーダス)' : 
               'Cuspidele Caselor (Placidus)'}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {chartData.houses.map((house) => (
                <div key={house.house} className="glass-light rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === 'fr' ? 'Maison' : language === 'en' ? 'House' : language === 'es' ? 'Casa' : language === 'jp' ? 'ハウス' : 'Casa'} {house.house}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">{house.signSymbol}</span>
                    <span className="text-cream text-sm">
                      {house.degree}° {house.minute}&apos;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Report Section */}
          <div className="glass rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h3 className="font-serif text-2xl text-cream mb-3">
              {language === 'fr' ? 'Recevez votre rapport complet' : 
               language === 'en' ? 'Receive your full report' : 
               language === 'es' ? 'Reciba su informe completo' : 
               language === 'jp' ? '完全なレポートを受け取る' : 
               'Primiți raportul complet'}
            </h3>
            
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {language === 'fr' ? 'Entrez votre email pour recevoir votre rapport détaillé de carte natale par email' : 
               language === 'en' ? 'Enter your email to receive your full natal chart report by email' : 
               language === 'es' ? 'Ingrese su email para recibir su informe completo de carta natal por correo' : 
               language === 'jp' ? 'メールでネイタルチャートの詳細レポートを受け取るにはメールアドレスを入力してください' : 
               'Introduceți emailul pentru a primi raportul complet al hărții natale prin email'}
            </p>
            
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.com"
                className="h-12 bg-input border-border text-cream placeholder:text-muted-foreground flex-1"
              />
              <Button 
                type="submit" 
                className="btn-gold h-12 px-6"
                disabled={isSubmittingEmail}
              >
                {isSubmittingEmail ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {language === 'fr' ? 'Confirmer' : 
                     language === 'en' ? 'Confirm' : 
                     language === 'es' ? 'Confirmar' : 
                     language === 'jp' ? '確認' : 
                     'Confirmare'}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Email Sent Confirmation */}
      {viewState === 'emailSent' && (
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-10 h-10 text-green-400" />
              </div>
            </div>
            
            <h2 className="font-serif text-3xl text-cream mb-4">
              {language === 'fr' ? 'Merci !' : 
               language === 'en' ? 'Thank you!' : 
               language === 'es' ? '¡Gracias!' : 
               language === 'jp' ? 'ありがとうございます！' : 
               'Mulțumim!'}
            </h2>
            
            <p className="text-xl text-muted-foreground mb-2">
              {language === 'fr' ? 'Votre rapport de carte natale sera envoyé à' : 
               language === 'en' ? 'Your natal chart report will be sent to' : 
               language === 'es' ? 'Su informe de carta natal será enviado a' : 
               language === 'jp' ? 'ネイタルチャートレポートは次のアドレスに送信されます' : 
               'Raportul hărții natale va fi trimis la'}
            </p>
            
            <p className="text-primary text-xl font-medium mb-8">{email}</p>
            
            <p className="text-muted-foreground mb-8">
              {language === 'fr' ? 'sous peu.' : 
               language === 'en' ? 'shortly.' : 
               language === 'es' ? 'en breve.' : 
               language === 'jp' ? 'まもなく。' : 
               'în curând.'}
            </p>
            
            <Button onClick={handleReset} className="btn-gold h-12 px-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'fr' ? 'Nouveau calcul' : 
               language === 'en' ? 'New calculation' : 
               language === 'es' ? 'Nuevo cálculo' : 
               language === 'jp' ? '新しい計算' : 
               'Calcul nou'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
