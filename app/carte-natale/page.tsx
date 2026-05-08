const translateContent: Record<Language, Record<string, string>> = {
  fr: {
    'Sun': 'Soleil', 'Moon': 'Lune', 'Mercury': 'Mercure', 'Venus': 'Venus',
    'Mars': 'Mars', 'Jupiter': 'Jupiter', 'Saturn': 'Saturne', 'Uranus': 'Uranus',
    'Neptune': 'Neptune', 'Pluto': 'Pluton',
    'Aries': 'Bélier', 'Taurus': 'Taureau', 'Gemini': 'Gémeaux', 'Cancer': 'Cancer',
    'Leo': 'Lion', 'Virgo': 'Vierge', 'Libra': 'Balance', 'Scorpio': 'Scorpion',
    'Sagittarius': 'Sagittaire', 'Capricorn': 'Capricorne', 'Aquarius': 'Verseau',
    'Pisces': 'Poissons', 'House': 'Maison'
  },
  en: {
    'Sun': 'Sun', 'Moon': 'Moon', 'Mercury': 'Mercury', 'Venus': 'Venus',
    'Mars': 'Mars', 'Jupiter': 'Jupiter', 'Saturn': 'Saturn', 'Uranus': 'Uranus',
    'Neptune': 'Neptune', 'Pluto': 'Pluto',
    'Aries': 'Aries', 'Taurus': 'Taurus', 'Gemini': 'Gemini', 'Cancer': 'Cancer',
    'Leo': 'Leo', 'Virgo': 'Virgo', 'Libra': 'Libra', 'Scorpio': 'Scorpio',
    'Sagittarius': 'Sagittarius', 'Capricorn': 'Capricorn', 'Aquarius': 'Aquarius',
    'Pisces': 'Pisces', 'House': 'House'
  },
  es: {
    'Sun': 'Sol', 'Moon': 'Luna', 'Mercury': 'Mercurio', 'Venus': 'Venus',
    'Mars': 'Marte', 'Jupiter': 'Jupiter', 'Saturn': 'Saturno', 'Uranus': 'Urano',
    'Neptune': 'Neptuno', 'Pluto': 'Plutón',
    'Aries': 'Aries', 'Taurus': 'Tauro', 'Gemini': 'Geminis', 'Cancer': 'Cáncer',
    'Leo': 'Leo', 'Virgo': 'Virgo', 'Libra': 'Libra', 'Scorpio': 'Escorpio',
    'Sagittarius': 'Sagitario', 'Capricorn': 'Capricornio', 'Aquarius': 'Acuario',
    'Pisces': 'Piscis', 'House': 'Casa'
  },
  jp: {
    'Sun': '太陽', 'Moon': '月', 'Mercury': '水星', 'Venus': '金星',
    'Mars': '火星', 'Jupiter': '木星', 'Saturn': '土星', 'Uranus': '天王星',
    'Neptune': '海王星', 'Pluto': '冥王星',
    'Aries': '牡羊座', 'Taurus': '牡牛座', 'Gemini': '双子座', 'Cancer': '蟹座',
    'Leo': '獅子座', 'Virgo': '乙女座', 'Libra': '天秤座', 'Scorpio': '蠍座',
    'Sagittarius': '射手座', 'Capricorn': '山羊座', 'Aquarius': '水瓶座',
    'Pisces': '魚座', 'House': 'ハウス'
  },
  ro: {
    'Sun': 'Soare', 'Moon': 'Lună', 'Mercury': 'Mercur', 'Venus': 'Venus',
    'Mars': 'Marte', 'Jupiter': 'Jupiter', 'Saturn': 'Saturn', 'Uranus': 'Uranus',
    'Neptune': 'Neptun', 'Pluto': 'Pluton',
    'Aries': 'Berbec', 'Taurus': 'Taur', 'Gemini': 'Gemeni', 'Cancer': 'Rac',
    'Leo': 'Leu', 'Virgo': 'Fecioara', 'Libra': 'Balanta', 'Scorpio': 'Scorpion',
    'Sagittarius': 'Sagetator', 'Capricorn': 'Capricorn', 'Aquarius': 'Varsator',
    'Pisces': 'Pesti', 'House': 'Casa'
  }
};

const t = (lang: Language, key: string) => translateContent[lang][key] || key;
'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { BirthForm, type BirthData } from '@/components/birth-form'
import { ZodiacWheel } from '@/components/zodiac-wheel'
import { PremiumGate } from '@/components/premium-gate'
import { mockDailyTransits, planets, zodiacSigns } from '@/lib/astrology-data'
import type { Language } from '@/lib/translations'

// Mock interpretations for the natal chart
const mockInterpretations = {
  sun: {
    fr: 'Votre Soleil en Gémeaux vous confère une nature curieuse et communicative. Vous êtes attiré par les échanges intellectuels et l\'apprentissage constant.',
    en: 'Your Sun in Gemini gives you a curious and communicative nature. You are drawn to intellectual exchanges and constant learning.',
    es: 'Tu Sol en Géminis te confiere una naturaleza curiosa y comunicativa. Te atraen los intercambios intelectuales y el aprendizaje constante.',
    jp: '双子座の太陽はあなたに好奇心旺盛でコミュニケーション能力の高い性質を与えます。知的な交流と絶え間ない学習に惹かれます。',
    ro: 'Soarele tău în Gemeni îți conferă o natură curioasă și comunicativă. Ești atras de schimburile intelectuale și învățarea constantă.',
  },
  moon: {
    fr: 'Votre Lune en Scorpion révèle une vie émotionnelle intense et profonde. Vous ressentez les choses avec une grande intensité.',
    en: 'Your Moon in Scorpio reveals an intense and deep emotional life. You feel things with great intensity.',
    es: 'Tu Luna en Escorpio revela una vida emocional intensa y profunda. Sientes las cosas con gran intensidad.',
    jp: '蠍座の月は、強烈で深い感情生活を明らかにします。物事を強く感じます。',
    ro: 'Luna ta în Scorpion dezvăluie o viață emoțională intensă și profundă. Simți lucrurile cu mare intensitate.',
  },
  venus: {
    fr: 'Vénus en Cancer dans votre thème indique un besoin profond de sécurité émotionnelle dans les relations amoureuses.',
    en: 'Venus in Cancer in your chart indicates a deep need for emotional security in romantic relationships.',
    es: 'Venus en Cáncer en tu carta indica una profunda necesidad de seguridad emocional en las relaciones amorosas.',
    jp: 'チャートの蟹座の金星は、恋愛関係における感情的な安心感への深い欲求を示しています。',
    ro: 'Venus în Rac în tema ta indică o nevoie profundă de securitate emoțională în relațiile amoroase.',
  },
  mars: {
    fr: 'Mars en Bélier vous donne une énergie directe et passionnée. Vous n\'avez pas peur de prendre des initiatives.',
    en: 'Mars in Aries gives you direct and passionate energy. You are not afraid to take initiative.',
    es: 'Marte en Aries te da una energía directa y apasionada. No tienes miedo de tomar la iniciativa.',
    jp: '牡羊座の火星は、直接的で情熱的なエネルギーを与えます。主導権を取ることを恐れません。',
    ro: 'Marte în Berbec îți oferă o energie directă și pasională. Nu ți-e frică să iei inițiativa.',
  },
}

export default function NatalChartPage() {
  const { t, language } = useLanguage()
  const [chartData, setChartData] = useState<BirthData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (data: BirthData) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setChartData(data)
    setIsLoading(false)
  }

  // Mock planet positions based on form data
  const planetPositions = mockDailyTransits.map(t => ({
    planet: t.planet,
    sign: t.sign,
    degree: t.degree,
  }))

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">
          {t.natalChart.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t.natalChart.subtitle}
        </p>
      </div>

      {!chartData ? (
        /* Birth Form */
        <div className="max-w-2xl mx-auto">
          <BirthForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      ) : (
        /* Chart Results */
        <div className="space-y-12">
          {/* User Info */}
          <div className="glass rounded-xl p-6 text-center">
            <h2 className="font-serif text-2xl text-cream mb-2">
              {chartData.name}
            </h2>
            <p className="text-muted-foreground">
              {new Date(chartData.date).toLocaleDateString(language === 'jp' ? 'ja-JP' : language)} - {chartData.time}
            </p>
            <p className="text-muted-foreground">
              {chartData.city}, {chartData.country}
            </p>
          </div>

          {/* Zodiac Wheel */}
          <div className="flex justify-center">
            <div className="glass rounded-2xl p-8">
              <ZodiacWheel planetPositions={planetPositions} size={350} />
            </div>
          </div>

          {/* Planet Positions */}
          <section>
            <h3 className="font-serif text-2xl text-cream mb-6 text-center">
              {t.natalChart.planets}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {planetPositions.map((pos) => {
                const planet = planets.find(p => p.id === pos.planet)
                const sign = zodiacSigns.find(s => s.id === pos.sign)
                
                if (!planet || !sign) return null
                
                return (
                  <div key={pos.planet} className="glass rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <span className="planet-symbol text-2xl">{t(language, planet?.symbol)}</span>
                      <div>
                        <p className="font-medium text-cream">{{t(language, planet.name)}}</p>
                        <p className="text-sm text-muted-foreground">
                          {{t(language, sign.symbol)}} {pos.degree}°
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Interpretations - Premium Gated */}
          <section>
            <h3 className="font-serif text-2xl text-cream mb-6 text-center">
              {t.natalChart.interpretations}
            </h3>
            <PremiumGate
              fallback={
                <div className="space-y-4">
                  {Object.entries(mockInterpretations).map(([key, texts]) => {
                    const planet = planets.find(p => p.id === key)
                    return (
                      <div key={key} className="glass rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="planet-symbol text-xl">{{t(language, planet?.symbol)}</span>
                          <h4 className="font-serif text-lg text-cream">{{t(language, planet?.name)}}</h4>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {texts[language as Language]}
                        </p>
                      </div>
                    )
                  })}
                </div>
              }
            >
              <div className="space-y-4">
                {Object.entries(mockInterpretations).map(([key, texts]) => {
                  const planet = planets.find(p => p.id === key)
                  return (
                    <div key={key} className="glass rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="planet-symbol text-xl">{{t(language, planet?.symbol)}</span>
                        <h4 className="font-serif text-lg text-cream">{{t(language, planet?.name)}}</h4>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {texts[language as Language]}
                      </p>
                    </div>
                  )
                })}
              </div>
            </PremiumGate>
          </section>

          {/* Back button */}
          <div className="text-center">
            <button
              onClick={() => setChartData(null)}
              className="text-primary hover:underline"
            >
              {t.common.retry}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
