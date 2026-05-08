'use client'

import { useState } from 'react'
import Link from 'next/link'

type Language = 'fr' | 'en' | 'es' | 'jp' | 'ro'

const labels: Record<Language, Record<string, string>> = {
  fr: {
    Sun: 'Soleil', Moon: 'Lune', Mercury: 'Mercure', Venus: 'Vénus',
    Mars: 'Mars', Jupiter: 'Jupiter', Saturn: 'Saturne', Uranus: 'Uranus',
    Neptune: 'Neptune', Pluto: 'Pluton',
    Aries: 'Bélier', Taurus: 'Taureau', Gemini: 'Gémeaux', Cancer: 'Cancer',
    Leo: 'Lion', Virgo: 'Vierge', Libra: 'Balance', Scorpio: 'Scorpion',
    Sagittarius: 'Sagittaire', Capricorn: 'Capricorne', Aquarius: 'Verseau',
    Pisces: 'Poissons', House: 'Maison',
  },
  en: {
    Sun: 'Sun', Moon: 'Moon', Mercury: 'Mercury', Venus: 'Venus',
    Mars: 'Mars', Jupiter: 'Jupiter', Saturn: 'Saturn', Uranus: 'Uranus',
    Neptune: 'Neptune', Pluto: 'Pluto',
    Aries: 'Aries', Taurus: 'Taurus', Gemini: 'Gemini', Cancer: 'Cancer',
    Leo: 'Leo', Virgo: 'Virgo', Libra: 'Libra', Scorpio: 'Scorpio',
    Sagittarius: 'Sagittarius', Capricorn: 'Capricorn', Aquarius: 'Aquarius',
    Pisces: 'Pisces', House: 'House',
  },
  es: {
    Sun: 'Sol', Moon: 'Luna', Mercury: 'Mercurio', Venus: 'Venus',
    Mars: 'Marte', Jupiter: 'Jupiter', Saturn: 'Saturno', Uranus: 'Urano',
    Neptune: 'Neptuno', Pluto: 'Pluton',
    Aries: 'Aries', Taurus: 'Tauro', Gemini: 'Geminis', Cancer: 'Cancer',
    Leo: 'Leo', Virgo: 'Virgo', Libra: 'Libra', Scorpio: 'Escorpio',
    Sagittarius: 'Sagitario', Capricorn: 'Capricornio', Aquarius: 'Acuario',
    Pisces: 'Piscis', House: 'Casa',
  },
  jp: {
    Sun: '太陽', Moon: '月', Mercury: '水星', Venus: '金星',
    Mars: '火星', Jupiter: '木星', Saturn: '土星', Uranus: '天王星',
    Neptune: '海王星', Pluto: '冥王星',
    Aries: '牡羊座', Taurus: '牡牛座', Gemini: '双子座', Cancer: '蟹座',
    Leo: '獅子座', Virgo: '乙女座', Libra: '天秤座', Scorpio: '蠍座',
    Sagittarius: '射手座', Capricorn: '山羊座', Aquarius: '水瓶座',
    Pisces: '魚座', House: '室',
  },
  ro: {
    Sun: 'Soare', Moon: 'Luna', Mercury: 'Mercur', Venus: 'Venus',
    Mars: 'Marte', Jupiter: 'Jupiter', Saturn: 'Saturn', Uranus: 'Uranus',
    Neptune: 'Neptun', Pluto: 'Pluto',
    Aries: 'Berbec', Taurus: 'Taur', Gemini: 'Gemeni', Cancer: 'Rac',
    Leo: 'Leu', Virgo: 'Fecioara', Libra: 'Balanta', Scorpio: 'Scorpion',
    Sagittarius: 'Sagetator', Capricorn: 'Capricorn', Aquarius: 'Varsator',
    Pisces: 'Pesti', House: 'Casa',
  },
}

function tr(lang: Language, key: string | undefined): string {
  if (!key) return ''
  return (labels[lang] && labels[lang][key]) ? labels[lang][key] : key
}
export default function CarteNatale() {
  const [language, setLanguage] = useState<Language>('fr')
  const [form, setForm] = useState({ name: '', birthDate: '', birthTime: '', birthCity: '', birthCountry: 'FR', email: '' })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'form' | 'email' | 'result'>('form')

  const ui: Record<Language, Record<string, string>> = {
    fr: { title: 'Votre Carte Natale', subtitle: 'Découvrez votre thème astral complet', btn: 'Calculer ma carte', emailTitle: 'Recevez votre analyse gratuite', emailBtn: 'Voir mes résultats gratuitement', name: 'Prénom', date: 'Date de naissance', time: 'Heure de naissance', city: 'Ville de naissance', country: 'Pays', email: 'Votre email', planets: 'Planètes', houses: 'Maisons', sign: 'Signe', position: 'Position', house: 'Maison', free: 'Gratuit', back: 'Retour' },
    en: { title: 'Your Birth Chart', subtitle: 'Discover your complete astral theme', btn: 'Calculate my chart', emailTitle: 'Receive your free analysis', emailBtn: 'See my results for free', name: 'First name', date: 'Birth date', time: 'Birth time', city: 'Birth city', country: 'Country', email: 'Your email', planets: 'Planets', houses: 'Houses', sign: 'Sign', position: 'Position', house: 'House', free: 'Free', back: 'Back' },
    es: { title: 'Tu Carta Natal', subtitle: 'Descubre tu tema astral completo', btn: 'Calcular mi carta', emailTitle: 'Recibe tu análisis gratuito', emailBtn: 'Ver mis resultados gratis', name: 'Nombre', date: 'Fecha de nacimiento', time: 'Hora de nacimiento', city: 'Ciudad de nacimiento', country: 'País', email: 'Tu email', planets: 'Planetas', houses: 'Casas', sign: 'Signo', position: 'Posición', house: 'Casa', free: 'Gratis', back: 'Volver' },
    jp: { title: '出生ホロスコープ', subtitle: '完全な星座テーマを発見', btn: 'パーソナルチャートを計算', emailTitle: '無料分析を受け取る', emailBtn: '無料で結果を見る', name: 'お名前', date: '生年月日', time: '生まれた時刻', city: '生まれた都市', country: '国', email: 'メールアドレス', planets: '惑星', houses: 'ハウス', sign: 'サイン', position: '位置', house: '室', free: '無料', back: '戻る' },
    ro: { title: 'Harta Natală', subtitle: 'Descoperi-ți tema astrală completă', btn: 'Calculează harta mea', emailTitle: 'Primește analiza gratuită', emailBtn: 'Vezi rezultatele mele gratuit', name: 'Prenume', date: 'Data nașterii', time: 'Ora nașterii', city: 'Orașul nașterii', country: 'Ȟară', email: 'Email-ul tău', planets: 'Planete', houses: 'Case', sign: 'Semn', position: 'Poziție', house: 'Casă', free: 'Gratuit', back: 'Înapoi' },
  }

  const u = ui[language]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep('email')
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/natal-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      const data = await res.json()
      setResult(data)
      setStep('result')
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0015] via-[#1a0030] to-[#0a0015] text-white">
      <nav className="border-b border-purple-800/30 p-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
          ✨ Météo Astrale
        </Link>
        <select value={language} onChange={e => setLanguage(e.target.value as Language)} className="bg-purple-900/50 text-white border border-purple-700 rounded px-2 py-1 text-sm">
          <option value="fr">🇫🇷 FR</option>
          <option value="en">🇬🇧 EN</option>
          <option value="es">🇪🇸 ES</option>
          <option value="jp">🇯🇵 JP</option>
          <option value="ro">🇷🇴 RO</option>
        </select>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">♈♉♊♋♌♍♎♏♐♑♒♓</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent mb-2">{u.title}</h1>
          <p className="text-purple-300">{u.subtitle}</p>
        </div>

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="bg-purple-900/20 rounded-2xl p-6 space-y-4 border border-purple-700/30">
            <div>
              <label className="block text-purple-300 text-sm mb-1">{u.name}</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
            </div>
            <div>
              <label className="block text-purple-300 text-sm mb-1">{u.date}</label>
              <input type="date" value={form.birthDate} onChange={e => setForm({...form, birthDate: e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
            </div>
            <div>
              <label className="block text-purple-300 text-sm mb-1">{u.time}</label>
              <input type="time" value={form.birthTime} onChange={e => setForm({...form, birthTime: e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
            </div>
            <div>
              <label className="block text-purple-300 text-sm mb-1">{u.city}</label>
              <input type="text" value={form.birthCity} onChange={e => setForm({...form, birthCity: e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition mt-2">
              {u.btn}
            </button>
          </form>
        )}

        {step === 'email' && (
          <div className="bg-purple-900/20 rounded-2xl p-8 border border-purple-700/30 text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">{u.emailTitle}</h2>
            <p className="text-green-400 font-semibold text-lg mb-6">✨ {u.free} !</p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder={u.email} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-4 py-3 text-white text-center" required />
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition">
                {loading ? '...' : u.emailBtn}
              </button>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </form>
            <button onClick={() => setStep('form')} className="mt-4 text-purple-400 text-sm underline">{u.back}</button>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-6">
            <div className="bg-purple-900/20 rounded-2xl p-6 border border-purple-700/30">
              <h2 className="text-xl font-bold text-yellow-400 mb-4">{u.planets}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-purple-300 border-b border-purple-700/30">
                      <th className="text-left py-2">{u.planets}</th>
                      <th className="text-left py-2">{u.sign}</th>
                      <th className="text-left py-2">{u.position}</th>
                      <th className="text-left py-2">{u.house}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.planets && result.planets.map((p: any, i: number) => {
                      const pName = tr(language, p.name)
                      const pSymbol = tr(language, p.symbol)
                      const pSign = tr(language, p.sign)
                      const pHouse = tr(language, 'House')
                      return (
                        <tr key={i} className="border-b border-purple-900/30">
                          <td className="py-2">{pSymbol || pName}</td>
                          <td className="py-2">{pSign}</td>
                          <td className="py-2">{p.degree}</td>
                          <td className="py-2">{pHouse} {p.house}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {result.houses && (
              <div className="bg-purple-900/20 rounded-2xl p-6 border border-purple-700/30">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">{u.houses}</h2>
                <div className="grid grid-cols-2 gap-2">
                  {result.houses.map((h: any, i: number) => {
                    const hLabel = tr(language, 'House')
                    const hSign = tr(language, h.sign)
                    return (
                      <div key={i} className="bg-purple-900/30 rounded-lg p-3 text-sm">
                        <span className="text-yellow-400 font-bold">{hLabel} {h.number} </span>
                        <span className="text-purple-200">{hSign}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <button onClick={() => setStep('form')} className="w-full border border-purple-700 text-purple-300 py-2 rounded-xl hover:bg-purple-900/30 transition">
              {u.back}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
