'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type Language = 'fr' | 'en' | 'es' | 'jp' | 'ro'

const COUNTRIES = [
  {code:'AF',name:'Afghanistan'},{code:'ZA',name:'Afrique du Sud'},{code:'AL',name:'Albanie'},
  {code:'DZ',name:'Algérie'},{code:'DE',name:'Allemagne'},{code:'AD',name:'Andorre'},
  {code:'AO',name:'Angola'},{code:'SA',name:'Arabie Saoudite'},{code:'AR',name:'Argentine'},
  {code:'AM',name:'Arménie'},{code:'AU',name:'Australie'},{code:'AT',name:'Autriche'},
  {code:'AZ',name:'Azerbaïdjan'},{code:'BE',name:'Belgique'},{code:'BD',name:'Bangladesh'},
  {code:'BY',name:'Biélorussie'},{code:'BO',name:'Bolivie'},{code:'BA',name:'Bosnie'},
  {code:'BR',name:'Brésil'},{code:'BG',name:'Bulgarie'},{code:'CM',name:'Cameroun'},
  {code:'CA',name:'Canada'},{code:'CL',name:'Chili'},{code:'CN',name:'Chine'},
  {code:'CO',name:'Colombie'},{code:'CR',name:'Costa Rica'},{code:'HR',name:'Croatie'},
  {code:'CU',name:'Cuba'},{code:'DK',name:'Danemark'},{code:'EC',name:'Equateur'},
  {code:'EG',name:'Egypte'},{code:'AE',name:'Emirats Arabes Unis'},{code:'ES',name:'Espagne'},
  {code:'EE',name:'Estonie'},{code:'ET',name:'Ethiopie'},{code:'FI',name:'Finlande'},
  {code:'FR',name:'France'},{code:'GE',name:'Géorgie'},{code:'GH',name:'Ghana'},
  {code:'GR',name:'Grèce'},{code:'GT',name:'Guatemala'},{code:'HN',name:'Honduras'},
  {code:'HU',name:'Hongrie'},{code:'IN',name:'Inde'},{code:'ID',name:'Indonésie'},
  {code:'IQ',name:'Irak'},{code:'IR',name:'Iran'},{code:'IE',name:'Irlande'},
  {code:'IS',name:'Islande'},{code:'IL',name:'Israël'},{code:'IT',name:'Italie'},
  {code:'CI',name:'Côte d Ivoire'},{code:'JM',name:'Jamaïque'},{code:'JP',name:'Japon'},
  {code:'JO',name:'Jordanie'},{code:'KZ',name:'Kazakhstan'},{code:'KE',name:'Kenya'},
  {code:'KG',name:'Kirghizistan'},{code:'KW',name:'Koweït'},{code:'LV',name:'Lettonie'},
  {code:'LB',name:'Liban'},{code:'LT',name:'Lituanie'},{code:'LU',name:'Luxembourg'},
  {code:'MK',name:'Macédoine'},{code:'MY',name:'Malaisie'},{code:'MA',name:'Maroc'},
  {code:'MU',name:'Maurice'},{code:'MX',name:'Mexique'},{code:'MD',name:'Moldavie'},
  {code:'MN',name:'Mongolie'},{code:'ME',name:'Monténégro'},{code:'MZ',name:'Mozambique'},
  {code:'NA',name:'Namibie'},{code:'NP',name:'Népal'},{code:'NG',name:'Nigéria'},
  {code:'NO',name:'Norvège'},{code:'NZ',name:'Nouvelle-Zélande'},{code:'PK',name:'Pakistan'},
  {code:'PA',name:'Panama'},{code:'PY',name:'Paraguay'},{code:'NL',name:'Pays-Bas'},
  {code:'PE',name:'Pérou'},{code:'PH',name:'Philippines'},{code:'PL',name:'Pologne'},
  {code:'PT',name:'Portugal'},{code:'QA',name:'Qatar'},{code:'RO',name:'Roumanie'},
  {code:'GB',name:'Royaume-Uni'},{code:'RU',name:'Russie'},{code:'SN',name:'Sénégal'},
  {code:'RS',name:'Serbie'},{code:'SG',name:'Singapour'},{code:'SK',name:'Slovaquie'},
  {code:'SI',name:'Slovénie'},{code:'SO',name:'Somalie'},{code:'SD',name:'Soudan'},
  {code:'SE',name:'Suède'},{code:'CH',name:'Suisse'},{code:'SY',name:'Syrie'},
  {code:'TW',name:'Taïwan'},{code:'TZ',name:'Tanzanie'},{code:'TH',name:'Thaïlande'},
  {code:'CZ',name:'Tchéquie'},{code:'TN',name:'Tunisie'},{code:'TR',name:'Turquie'},
  {code:'TM',name:'Turkménistan'},{code:'UA',name:'Ukraine'},{code:'UY',name:'Uruguay'},
  {code:'UZ',name:'Ouzbékistan'},{code:'VE',name:'Venezuela'},{code:'VN',name:'Viêt Nam'},
  {code:'YE',name:'Yémen'},{code:'ZW',name:'Zimbabwe'},{code:'US',name:'États-Unis'},
]

const labels: Record<Language, Record<string, string>> = {
  fr: { Sun:'Soleil',Moon:'Lune',Mercury:'Mercure',Venus:'Vénus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturne',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluton',Aries:'Bélier',Taurus:'Taureau',Gemini:'Gémeaux',Cancer:'Cancer',Leo:'Lion',Virgo:'Vierge',Libra:'Balance',Scorpio:'Scorpion',Sagittarius:'Sagittaire',Capricorn:'Capricorne',Aquarius:'Verseau',Pisces:'Poissons',House:'Maison' },
  en: { Sun:'Sun',Moon:'Moon',Mercury:'Mercury',Venus:'Venus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluto',Aries:'Aries',Taurus:'Taurus',Gemini:'Gemini',Cancer:'Cancer',Leo:'Leo',Virgo:'Virgo',Libra:'Libra',Scorpio:'Scorpio',Sagittarius:'Sagittarius',Capricorn:'Capricorn',Aquarius:'Aquarius',Pisces:'Pisces',House:'House' },
  es: { Sun:'Sol',Moon:'Luna',Mercury:'Mercurio',Venus:'Venus',Mars:'Marte',Jupiter:'Jupiter',Saturn:'Saturno',Uranus:'Urano',Neptune:'Neptuno',Pluto:'Plutón',Aries:'Aries',Taurus:'Tauro',Gemini:'Géminis',Cancer:'Cáncer',Leo:'Leo',Virgo:'Virgo',Libra:'Libra',Scorpio:'Escorpio',Sagittarius:'Sagitario',Capricorn:'Capricornio',Aquarius:'Acuario',Pisces:'Piscis',House:'Casa' },
  jp: { Sun:'太陽',Moon:'月',Mercury:'水星',Venus:'金星',Mars:'火星',Jupiter:'木星',Saturn:'土星',Uranus:'天王星',Neptune:'海王星',Pluto:'冥王星',Aries:'牡羊座',Taurus:'牡牛座',Gemini:'双子座',Cancer:'蟹座',Leo:'獅子座',Virgo:'乙女座',Libra:'天秤座',Scorpio:'蠍座',Sagittarius:'射手座',Capricorn:'山羊座',Aquarius:'水瓶座',Pisces:'魚座',House:'室' },
  ro: { Sun:'Soare',Moon:'Lună',Mercury:'Mercur',Venus:'Venus',Mars:'Marte',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptun',Pluto:'Pluto',Aries:'Berbec',Taurus:'Taur',Gemini:'Gemeni',Cancer:'Rac',Leo:'Leu',Virgo:'Fecioară',Libra:'Balanță',Scorpio:'Scorpion',Sagittarius:'Săgetător',Capricorn:'Capricorn',Aquarius:'Vărsător',Pisces:'Pești',House:'Casă' },
}

function tr(lang: Language, key: string | undefined): string {
  if (!key) return ''
  return (labels[lang]?.[key]) || key
}

const UI: Record<Language, Record<string,string>> = {
  fr: {title:'Votre Carte Natale',sub:'Découvrez votre thème astral complet',name:'Prénom',date:'Date de naissance',time:'Heure de naissance',city:'Ville de naissance',country:'Pays',btn:'Calculer ma carte',emailTitle:'Recevez votre analyse gratuitement',emailSub:'✨ 100% Gratuit — résultats instantanés',emailBtn:'Voir mes résultats gratuitement',emailPh:'Votre email',planets:'Planètes',houses:'Maisons',sign:'Signe',pos:'Position',house:'Maison',back:'Retour',searching:'Recherche...',selectCity:'Sélectionnez votre ville'},
  en: {title:'Your Birth Chart',sub:'Discover your complete astral theme',name:'First name',date:'Birth date',time:'Birth time',city:'Birth city',country:'Country',btn:'Calculate my chart',emailTitle:'Receive your free analysis',emailSub:'✨ 100% Free — instant results',emailBtn:'See my results for free',emailPh:'Your email',planets:'Planets',houses:'Houses',sign:'Sign',pos:'Position',house:'House',back:'Back',searching:'Searching...',selectCity:'Select your city'},
  es: {title:'Tu Carta Natal',sub:'Descubre tu tema astral completo',name:'Nombre',date:'Fecha de nacimiento',time:'Hora de nacimiento',city:'Ciudad de nacimiento',country:'País',btn:'Calcular mi carta',emailTitle:'Recibe tu análisis gratuito',emailSub:'✨ 100% Gratis — resultados instantáneos',emailBtn:'Ver mis resultados gratis',emailPh:'Tu email',planets:'Planetas',houses:'Casas',sign:'Signo',pos:'Posición',house:'Casa',back:'Volver',searching:'Buscando...',selectCity:'Selecciona tu ciudad'},
  jp: {title:'出生ホロスコープ',sub:'完全な星座テーマを発見',name:'お名前',date:'生年月日',time:'出生時刻',city:'出生都市',country:'国',btn:'チャートを計算',emailTitle:'無料分析を受け取る',emailSub:'✨ 完全無料 — 即時結果',emailBtn:'無料で結果を見る',emailPh:'メールアドレス',planets:'惑星',houses:'ハウス',sign:'サイン',pos:'位置',house:'室',back:'戻る',searching:'検索中...',selectCity:'都市を選択'},
  ro: {title:'Harta Natală',sub:'Descoperă-ți tema astrală completă',name:'Prenume',date:'Data nașterii',time:'Ora nașterii',city:'Orașul nașterii',country:'Țară',btn:'Calculează harta mea',emailTitle:'Primește analiza gratuită',emailSub:'✨ 100% Gratuit — rezultate instantanee',emailBtn:'Vezi rezultatele mele gratuit',emailPh:'Email-ul tău',planets:'Planete',houses:'Case',sign:'Semn',pos:'Poziție',house:'Casă',back:'Înapoi',searching:'Se caută...',selectCity:'Selectează orașul'},
}
export default function CarteNatale() {
  const [language, setLanguage] = useState<Language>('fr')
  const [form, setForm] = useState({name:'',birthDate:'',birthTime:'',birthCity:'',birthCountry:'FR',email:'',lat:'',lon:''})
  const [step, setStep] = useState<'form'|'email'|'result'>('form')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [citySuggestions, setCitySuggestions] = useState<any[]>([])
  const [citySearching, setCitySearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const cityTimer = useRef<any>(null)
  const u = UI[language]

  async function searchCity(query: string) {
    if (query.length < 2) { setCitySuggestions([]); return }
    setCitySearching(true)
    try {
      const country = form.birthCountry
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&limit=8&format=json&addressdetails=1&featuretype=city`
      const res = await fetch(url, {headers:{'Accept-Language':'fr'}})
      const data = await res.json()
      const cities = data
      setCitySuggestions(cities.slice(0,6))
      setShowSuggestions(true)
    } catch { setCitySuggestions([]) }
    finally { setCitySearching(false) }
  }

  function onCityInput(val: string) {
    setForm({...form, birthCity:val, lat:'', lon:''})
    clearTimeout(cityTimer.current)
    cityTimer.current = setTimeout(() => searchCity(val), 400)
  }

  function selectCity(city: any) {
    const name = city.address?.city || city.address?.town || city.address?.village || city.display_name.split(',')[0]
    setForm({...form, birthCity:name, lat:city.lat, lon:city.lon})
    setShowSuggestions(false)
    setCitySuggestions([])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.lat) { setError('Veuillez sélectionner une ville dans la liste'); return }
    setError('')
    setStep('email')
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/natal-chart', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      })
      if (!res.ok) throw new Error('err')
      const data = await res.json()
      setResult(data)
      setStep('result')
    } catch { setError('Une erreur est survenue. Veuillez réessayer.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0015] via-[#1a0030] to-[#0a0015] text-white">
      <nav className="border-b border-purple-800/30 p-4 flex justify-between items-center backdrop-blur">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">✨ Météo Astrale</Link>
        <select value={language} onChange={e => setLanguage(e.target.value as Language)} className="bg-purple-900/50 text-white border border-purple-700 rounded px-2 py-1 text-sm">
          <option value="fr">🇫🇷 FR</option>
          <option value="en">🇬🇧 EN</option>
          <option value="es">🇪🇸 ES</option>
          <option value="jp">🇯🇵 JP</option>
          <option value="ro">🇷🇴 RO</option>
        </select>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">♈♉♊♋♌♍♎♏♐♑♒♓</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent mb-2">{u.title}</h1>
          <p className="text-purple-300">{u.sub}</p>
        </div>

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="bg-purple-900/20 rounded-2xl p-6 space-y-4 border border-purple-700/30">
            <div>
              <label className="block text-purple-300 text-sm mb-1">{u.name}</label>
              <input type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-purple-300 text-sm mb-1">{u.date}</label>
                <input type="date" value={form.birthDate} onChange={e => setForm({...form,birthDate:e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
              </div>
              <div>
                <label className="block text-purple-300 text-sm mb-1">{u.time}</label>
                <input type="time" value={form.birthTime} onChange={e => setForm({...form,birthTime:e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
              </div>
            </div>
            <div>
              <label className="block text-purple-300 text-sm mb-1">{u.country}</label>
              <select value={form.birthCountry} onChange={e => setForm({...form,birthCountry:e.target.value,birthCity:'',lat:'',lon:''})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white">
                {COUNTRIES.map(c => { const cName = c.name; const cCode = c.code; return (<option key={cCode} value={cCode}>{cName}</option>) })}
              </select>
            </div>
            <div className="relative">
              <label className="block text-purple-300 text-sm mb-1">{u.city}</label>
              <div className="relative">
                <input type="text" value={form.birthCity} onChange={e => onCityInput(e.target.value)} onFocus={() => form.birthCity.length > 1 && setShowSuggestions(true)} autoComplete="off" placeholder="Ex: Paris, Lyon, Marseille..." className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white pr-8" required />
                {citySearching && <span className="absolute right-3 top-2.5 text-purple-400 text-xs">{u.searching}</span>}
                {form.lat && <span className="absolute right-3 top-2.5 text-green-400 text-sm">✔</span>}
              </div>
              {showSuggestions && citySuggestions.length > 0 && (
                <ul className="absolute z-50 w-full bg-[#1a0030] border border-purple-700 rounded-lg mt-1 shadow-xl max-h-48 overflow-y-auto">
                  {citySuggestions.map((city, i) => {
                    const cityDisplay = city.display_name
                    return (
                      <li key={i} onClick={() => selectCity(city)} className="px-3 py-2 hover:bg-purple-800/50 cursor-pointer text-sm text-purple-100 border-b border-purple-900/30">
                        {cityDisplay}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition mt-2 text-lg">
              {u.btn}
            </button>
          </form>
        )}
        {step === 'email' && (
          <div className="bg-purple-900/20 rounded-2xl p-8 border border-purple-700/30 text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">{u.emailTitle}</h2>
            <p className="text-green-400 font-semibold text-lg mb-6">{u.emailSub}</p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder={u.emailPh} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-4 py-3 text-white text-center text-lg" required />
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-bold py-4 rounded-xl hover:opacity-90 transition text-lg">
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
              <h2 className="text-xl font-bold text-yellow-400 mb-4">☉ {u.planets}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-purple-300 border-b border-purple-700/30">
                      <th className="text-left py-2 pr-4">{u.planets}</th>
                      <th className="text-left py-2 pr-4">{u.sign}</th>
                      <th className="text-left py-2 pr-4">{u.pos}</th>
                      <th className="text-left py-2">{u.house}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.planets && result.planets.map((p: any, i: number) => {
                      const pLabel = tr(language, p.name) || tr(language, p.symbol)
                      const pSign = tr(language, p.sign)
                      const hLabel = tr(language, 'House')
                      const pDeg = p.degree
                      const pHouse = p.house
                      return (
                        <tr key={i} className="border-b border-purple-900/30 hover:bg-purple-900/20">
                          <td className="py-2 pr-4 font-medium">{pLabel}</td>
                          <td className="py-2 pr-4 text-purple-200">{pSign}</td>
                          <td className="py-2 pr-4 text-yellow-300">{pDeg}</td>
                          <td className="py-2 text-purple-300">{hLabel} {pHouse}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {result.houses && (
              <div className="bg-purple-900/20 rounded-2xl p-6 border border-purple-700/30">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">🏠 {u.houses}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {result.houses.map((h: any, i: number) => {
                    const hLabel = tr(language, 'House')
                    const hSign = tr(language, h.sign)
                    const hNum = h.number
                    return (
                      <div key={i} className="bg-purple-900/30 rounded-lg p-3 text-sm">
                        <span className="text-yellow-400 font-bold">{hLabel} {hNum} </span>
                        <span className="text-purple-200">{hSign}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <button onClick={() => { setStep('form'); setResult(null) }} className="w-full border border-purple-700 text-purple-300 py-3 rounded-xl hover:bg-purple-900/30 transition">
              {u.back}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
