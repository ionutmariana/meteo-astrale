'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

type Language = 'fr' | 'en' | 'es' | 'jp' | 'ro'

const COUNTRIES = [
  {code:'AF',name:'Afghanistan'},{code:'ZA',name:'Afrique du Sud'},{code:'AL',name:'Albanie'},{code:'DZ',name:'Algérie'},{code:'DE',name:'Allemagne'},{code:'AD',name:'Andorre'},{code:'AO',name:'Angola'},{code:'SA',name:'Arabie Saoudite'},{code:'AR',name:'Argentine'},{code:'AM',name:'Arménie'},{code:'AU',name:'Australie'},{code:'AT',name:'Autriche'},{code:'AZ',name:'Azerbaïdjan'},{code:'BE',name:'Belgique'},{code:'BD',name:'Bangladesh'},{code:'BY',name:'Biélorussie'},{code:'BO',name:'Bolivie'},{code:'BA',name:'Bosnie'},{code:'BR',name:'Brésil'},{code:'BG',name:'Bulgarie'},{code:'CM',name:'Cameroun'},{code:'CA',name:'Canada'},{code:'CL',name:'Chili'},{code:'CN',name:'Chine'},{code:'CO',name:'Colombie'},{code:'CR',name:'Costa Rica'},{code:'HR',name:'Croatie'},{code:'CU',name:'Cuba'},{code:'DK',name:'Danemark'},{code:'EC',name:'Equateur'},{code:'EG',name:'Egypte'},{code:'AE',name:'Emirats Arabes Unis'},{code:'ES',name:'Espagne'},{code:'EE',name:'Estonie'},{code:'ET',name:'Ethiopie'},{code:'FI',name:'Finlande'},{code:'FR',name:'France'},{code:'GE',name:'Géorgie'},{code:'GH',name:'Ghana'},{code:'GR',name:'Grèce'},{code:'GT',name:'Guatemala'},{code:'HN',name:'Honduras'},{code:'HU',name:'Hongrie'},{code:'IN',name:'Inde'},{code:'ID',name:'Indonésie'},{code:'IQ',name:'Irak'},{code:'IR',name:'Iran'},{code:'IE',name:'Irlande'},{code:'IS',name:'Islande'},{code:'IL',name:'Israël'},{code:'IT',name:'Italie'},{code:'CI',name:'Côte d Ivoire'},{code:'JM',name:'Jamaïque'},{code:'JP',name:'Japon'},{code:'JO',name:'Jordanie'},{code:'KZ',name:'Kazakhstan'},{code:'KE',name:'Kenya'},{code:'KG',name:'Kirghizistan'},{code:'KW',name:'Koweït'},{code:'LV',name:'Lettonie'},{code:'LB',name:'Liban'},{code:'LT',name:'Lituanie'},{code:'LU',name:'Luxembourg'},{code:'MK',name:'Macédoine'},{code:'MY',name:'Malaisie'},{code:'MA',name:'Maroc'},{code:'MU',name:'Maurice'},{code:'MX',name:'Mexique'},{code:'MD',name:'Moldavie'},{code:'MN',name:'Mongolie'},{code:'ME',name:'Monténégro'},{code:'MZ',name:'Mozambique'},{code:'NA',name:'Namibie'},{code:'NP',name:'Népal'},{code:'NG',name:'Nigéria'},{code:'NO',name:'Norvège'},{code:'NZ',name:'Nouvelle-Zélande'},{code:'PK',name:'Pakistan'},{code:'PA',name:'Panama'},{code:'PY',name:'Paraguay'},{code:'NL',name:'Pays-Bas'},{code:'PE',name:'Pérou'},{code:'PH',name:'Philippines'},{code:'PL',name:'Pologne'},{code:'PT',name:'Portugal'},{code:'QA',name:'Qatar'},{code:'RO',name:'Roumanie'},{code:'GB',name:'Royaume-Uni'},{code:'RU',name:'Russie'},{code:'SN',name:'Sénégal'},{code:'RS',name:'Serbie'},{code:'SG',name:'Singapour'},{code:'SK',name:'Slovaquie'},{code:'SI',name:'Slovénie'},{code:'SO',name:'Somalie'},{code:'SD',name:'Soudan'},{code:'SE',name:'Suède'},{code:'CH',name:'Suisse'},{code:'SY',name:'Syrie'},{code:'TW',name:'Taïwan'},{code:'TZ',name:'Tanzanie'},{code:'TH',name:'Thaïlande'},{code:'CZ',name:'Tchéquie'},{code:'TN',name:'Tunisie'},{code:'TR',name:'Turquie'},{code:'TM',name:'Turkménistan'},{code:'UA',name:'Ukraine'},{code:'UY',name:'Uruguay'},{code:'UZ',name:'Ouzbékistan'},{code:'VE',name:'Venezuela'},{code:'VN',name:'Viêt Nam'},{code:'YE',name:'Yémen'},{code:'ZW',name:'Zimbabwe'},{code:'US',name:'États-Unis'},
]

const L: Record<Language, Record<string,string>> = {
  fr:{Sun:'Soleil',Moon:'Lune',Mercury:'Mercure',Venus:'Vénus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturne',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluton',Aries:'Bélier',Taurus:'Taureau',Gemini:'Gémeaux',Cancer:'Cancer',Leo:'Lion',Virgo:'Vierge',Libra:'Balance',Scorpio:'Scorpion',Sagittarius:'Sagittaire',Capricorn:'Capricorne',Aquarius:'Verseau',Pisces:'Poissons',House:'Maison',Ascendant:'Ascendant'},
  en:{Sun:'Sun',Moon:'Moon',Mercury:'Mercury',Venus:'Venus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluto',Aries:'Aries',Taurus:'Taurus',Gemini:'Gemini',Cancer:'Cancer',Leo:'Leo',Virgo:'Virgo',Libra:'Libra',Scorpio:'Scorpio',Sagittarius:'Sagittarius',Capricorn:'Capricorn',Aquarius:'Aquarius',Pisces:'Pisces',House:'House',Ascendant:'Ascendant'},
  es:{Sun:'Sol',Moon:'Luna',Mercury:'Mercurio',Venus:'Venus',Mars:'Marte',Jupiter:'Jupiter',Saturn:'Saturno',Uranus:'Urano',Neptune:'Neptuno',Pluto:'Plutón',Aries:'Aries',Taurus:'Tauro',Gemini:'Géminis',Cancer:'Cáncer',Leo:'Leo',Virgo:'Virgo',Libra:'Libra',Scorpio:'Escorpio',Sagittarius:'Sagitario',Capricorn:'Capricornio',Aquarius:'Acuario',Pisces:'Piscis',House:'Casa',Ascendant:'Ascendente'},
  jp:{Sun:'太陽',Moon:'月',Mercury:'水星',Venus:'金星',Mars:'火星',Jupiter:'木星',Saturn:'土星',Uranus:'天王星',Neptune:'海王星',Pluto:'冥王星',Aries:'牡羊座',Taurus:'牡牛座',Gemini:'双子座',Cancer:'蟹座',Leo:'獅子座',Virgo:'乙女座',Libra:'天秤座',Scorpio:'蠍座',Sagittarius:'射手座',Capricorn:'山羊座',Aquarius:'水瓶座',Pisces:'魚座',House:'室',Ascendant:'アセンダント'},
  ro:{Sun:'Soare',Moon:'Lună',Mercury:'Mercur',Venus:'Venus',Mars:'Marte',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptun',Pluto:'Pluto',Aries:'Berbec',Taurus:'Taur',Gemini:'Gemeni',Cancer:'Rac',Leo:'Leu',Virgo:'Fecioară',Libra:'Balanță',Scorpio:'Scorpion',Sagittarius:'Săgetător',Capricorn:'Capricorn',Aquarius:'Vărsător',Pisces:'Pești',House:'Casă',Ascendant:'Ascendent'},
}
function tr(lang: Language, k?: string) { return k ? (L[lang]?.[k] || k) : '' }

const UI: Record<Language,Record<string,string>> = {
  fr:{title:'Votre Carte Natale',sub:'Découvrez votre thème astral — résultats instantanés',name:'Prénom',date:'Date de naissance',time:'Heure de naissance',country:'Pays',city:'Ville de naissance',email:'Votre email',emailNote:'Recevez votre analyse par email — 100% gratuit',btn:'Calculer ma carte natale gratuitement',loading:'Calcul en cours...',planets:'Planètes',houses:'Maisons',sign:'Signe',pos:'Degré',house:'Maison',back:'Nouvelle recherche',searching:'Recherche...',ascTitle:'Votre Ascendant'},
  en:{title:'Your Birth Chart',sub:'Discover your astral theme — instant results',name:'First name',date:'Birth date',time:'Birth time',country:'Country',city:'Birth city',email:'Your email',emailNote:'Receive your analysis by email — 100% free',btn:'Calculate my birth chart for free',loading:'Calculating...',planets:'Planets',houses:'Houses',sign:'Sign',pos:'Degree',house:'House',back:'New search',searching:'Searching...',ascTitle:'Your Ascendant'},
  es:{title:'Tu Carta Natal',sub:'Descubre tu tema astral — resultados instantáneos',name:'Nombre',date:'Fecha de nacimiento',time:'Hora de nacimiento',country:'País',city:'Ciudad de nacimiento',email:'Tu email',emailNote:'Recibe tu análisis por email — 100% gratis',btn:'Calcular mi carta natal gratis',loading:'Calculando...',planets:'Planetas',houses:'Casas',sign:'Signo',pos:'Grado',house:'Casa',back:'Nueva búsqueda',searching:'Buscando...',ascTitle:'Tu Ascendente'},
  jp:{title:'出生ホロスコープ',sub:'星座テーマを発見 — 即時結果',name:'お名前',date:'生年月日',time:'出生時刻',country:'国',city:'出生都市',email:'メールアドレス',emailNote:'無料で分析をメールで受け取る',btn:'無料でチャートを計算',loading:'計算中...',planets:'惑星',houses:'ハウス',sign:'サイン',pos:'度',house:'室',back:'新しい検索',searching:'検索中...',ascTitle:'アセンダント'},
  ro:{title:'Harta Natală',sub:'Descoperă-ți tema astrală — rezultate instantanee',name:'Prenume',date:'Data nașterii',time:'Ora nașterii',country:'Țară',city:'Orașul nașterii',email:'Email-ul tău',emailNote:'Primește analiza pe email — 100% gratuit',btn:'Calculează harta natală gratuit',loading:'Se calculează...',planets:'Planete',houses:'Case',sign:'Semn',pos:'Grad',house:'Casă',back:'Căutare nouă',searching:'Se caută...',ascTitle:'Ascendentul Tău'},
}

export default function CarteNatale() {
  const [lang, setLang] = useState<Language>('fr')
  const [form, setForm] = useState({name:'',birthDate:'',birthTime:'',birthCountry:'FR',birthCity:'',email:'',lat:'',lon:''})
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [searching, setSearching] = useState(false)
  const [showSug, setShowSug] = useState(false)
  const timer = useRef<any>(null)
  const u = UI[lang]

  async function searchCity(q: string) {
    if (q.length < 2) { setSuggestions([]); return }
    setSearching(true)
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&limit=8&format=json&addressdetails=1&featuretype=city`,{headers:{'Accept-Language':'fr'}})
      const d = await r.json()
      setSuggestions(d.slice(0,8))
      setShowSug(true)
    } catch { setSuggestions([]) }
    finally { setSearching(false) }
  }

  function onCity(v: string) {
    setForm({...form,birthCity:v,lat:'',lon:''})
    clearTimeout(timer.current)
    timer.current = setTimeout(()=>searchCity(v),400)
  }

  function pickCity(c: any) {
    const name = c.address?.city||c.address?.town||c.address?.village||c.display_name.split(',')[0]
    setForm({...form,birthCity:name,lat:c.lat,lon:c.lon})
    setShowSug(false)
    setSuggestions([])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.lat) { setError('Veuillez sélectionner une ville dans la liste de suggestions'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/natal-chart',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      })
      if (!res.ok) throw new Error('err')
      const data = await res.json()
      setResult(data)
    } catch { setError('Erreur lors du calcul. Veuillez réessayer.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0015] via-[#1a0030] to-[#0a0015] text-white">
      <nav className="border-b border-purple-800/30 p-4 flex justify-between items-center backdrop-blur">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">✨ Météo Astrale</Link>
        <select value={lang} onChange={e=>setLang(e.target.value as Language)} className="bg-purple-900/50 text-white border border-purple-700 rounded px-2 py-1 text-sm">
          <option value="fr">🇫🇷 FR</option><option value="en">🇬🇧 EN</option><option value="es">🇪🇸 ES</option><option value="jp">🇯🇵 JP</option><option value="ro">🇷🇴 RO</option>
        </select>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">♈♉♊♋♌♍♎♏♐♑♒♓</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent mb-2">{u.title}</h1>
          <p className="text-purple-300">{u.sub}</p>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="bg-purple-900/20 rounded-2xl p-6 space-y-4 border border-purple-700/30">
            <div>
              <label className="block text-purple-300 text-sm mb-1">{u.name}</label>
              <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-purple-300 text-sm mb-1">{u.date}</label>
                <input type="date" value={form.birthDate} onChange={e=>setForm({...form,birthDate:e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
              </div>
              <div>
                <label className="block text-purple-300 text-sm mb-1">{u.time}</label>
                <input type="time" value={form.birthTime} onChange={e=>setForm({...form,birthTime:e.target.value})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" required />
              </div>
            </div>
            <div>
              <label className="block text-purple-300 text-sm mb-1">{u.country}</label>
              <select value={form.birthCountry} onChange={e=>setForm({...form,birthCountry:e.target.value,birthCity:'',lat:'',lon:''})} className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white">
                {COUNTRIES.map(c=>{const cn=c.name;const cc=c.code;return(<option key={cc} value={cc}>{cn}</option>)})}
              </select>
            </div>
            <div className="relative">
              <label className="block text-purple-300 text-sm mb-1">{u.city}</label>
              <div className="relative">
                <input type="text" value={form.birthCity} onChange={e=>onCity(e.target.value)} onFocus={()=>form.birthCity.length>1&&setShowSug(true)} autoComplete="off" placeholder="Ex: Paris, Bucarest, Tokyo..." className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white pr-8" required />
                {searching && <span className="absolute right-3 top-2.5 text-purple-400 text-xs">{u.searching}</span>}
                {form.lat && <span className="absolute right-3 top-2.5 text-green-400">✔</span>}
              </div>
              {showSug && suggestions.length>0 && (
                <ul className="absolute z-50 w-full bg-[#1a0030] border border-purple-700 rounded-lg mt-1 shadow-xl max-h-48 overflow-y-auto">
                  {suggestions.map((c,i)=>{const cd=c.display_name;return(<li key={i} onClick={()=>pickCity(c)} className="px-3 py-2 hover:bg-purple-800/50 cursor-pointer text-sm text-purple-100 border-b border-purple-900/30">{cd}</li>)})}
                </ul>
              )}
            </div>
            <div>
              <label className="block text-purple-300 text-sm mb-1">{u.email}</label>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="exemple@email.com" className="w-full bg-purple-900/40 border border-purple-700 rounded-lg px-3 py-2 text-white" />
              <p className="text-green-400 text-xs mt-1">✨ {u.emailNote}</p>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-bold py-4 rounded-xl hover:opacity-90 transition text-lg disabled:opacity-60">
              {loading ? u.loading : u.btn}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            
            {/* BLOC ASCENDANT PREMIUM (FORCÉ) */}
            {result && (
              <div className="bg-purple-900/40 backdrop-blur-md rounded-2xl p-6 border border-amber-500/40 bg-gradient-to-r from-purple-900/60 to-transparent flex items-center justify-between shadow-xl mb-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-2">
                    {u.ascTitle || "Votre Ascendant"}
                  </p>
                  <h2 className="text-4xl font-serif text-white tracking-tight">
                    {tr(lang, result.houses?.[0]?.sign) || tr(lang, result.ascendant?.sign) || tr(lang, result.ascendant) || "Calcul..."}
                  </h2>
                </div>
                <div className="text-5xl opacity-50 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">✨</div>
              </div>
            )}

            <div className="bg-purple-900/20 rounded-2xl p-6 border border-purple-700/30">
              <h2 className="text-xl font-bold text-yellow-400 mb-1">☉ {u.planets}</h2>
              <p className="text-purple-400 text-sm mb-4">{form.name} — {form.birthDate} — {form.birthCity}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-purple-300 border-b border-purple-700/30 text-left">
                      <th className="py-2 pr-4">{u.planets}</th>
                      <th className="py-2 pr-4">{u.sign}</th>
                      <th className="py-2 pr-4">{u.pos}</th>
                      <th className="py-2">{u.house}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result?.planets?.map((p: any, i: number) => {
                      const pLabel = tr(lang, p.name) || tr(lang, p.symbol)
                      const pSign = tr(lang, p.sign)
                      const hLabel = tr(lang, 'House')
                      const pDeg = p.degree
                      const pHouseNum = p.house
                      return (
                        <tr key={i} className="border-b border-purple-900/30 hover:bg-purple-900/20">
                          <td className="py-2 pr-4 font-semibold text-white">{pLabel}</td>
                          <td className="py-2 pr-4 text-purple-200">{pSign}</td>
                          <td className="py-2 pr-4 text-yellow-300 text-xs">{pDeg}</td>
                          <td className="py-2 text-purple-400">{hLabel} {pHouseNum}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {result?.houses && (
              <div className="bg-purple-900/20 rounded-2xl p-6 border border-purple-700/30">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">🏠 {u.houses}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {result.houses.map((h: any, i: number) => {
                    const hLabel = tr(lang, 'House')
                    const hSign = tr(lang, h.sign)
                    const hNum = h.number
                    return (
                      <div key={i} className="bg-purple-900/30 rounded-lg p-3 text-sm border border-purple-800/30">
                        <span className="text-yellow-400 font-bold">{hLabel} {hNum} </span>
                        <span className="text-purple-200">{hSign}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <button onClick={()=>setResult(null)} className="w-full border border-purple-700 text-purple-300 py-3 rounded-xl hover:bg-purple-900/30 transition">
              {u.back}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}