// lib/astrology.ts

// 1. Données de base des signes
export const zodiacSigns = [
  { id: 'aries', symbol: '♈', element: 'fire' },
  { id: 'taurus', symbol: '♉', element: 'earth' },
  { id: 'gemini', symbol: '♊', element: 'air' },
  { id: 'cancer', symbol: '♋', element: 'water' },
  { id: 'leo', symbol: '♌', element: 'fire' },
  { id: 'virgo', symbol: '♍', element: 'earth' },
  { id: 'libra', symbol: '♎', element: 'air' },
  { id: 'scorpio', symbol: '♏', element: 'water' },
  { id: 'sagittarius', symbol: '♐', element: 'fire' },
  { id: 'capricorn', symbol: '♑', element: 'earth' },
  { id: 'aquarius', symbol: '♒', element: 'air' },
  { id: 'pisces', symbol: '♓', element: 'water' },
] as const;

export type ZodiacSignId = (typeof zodiacSigns)[number]['id'];

// 2. Utilitaires de calcul
const normalize360 = (v: number) => ((v % 360) + 360) % 360;
const toRad = (deg: number) => (deg * Math.PI) / 180;

export function getJulianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

export function getSign(lon: number): string {
  const signs = ["Bélier","Taureau","Gémeaux","Cancer","Lion","Vierge","Balance","Scorpion","Sagittaire","Capricorne","Verseau","Poissons"];
  return signs[Math.floor(normalize360(lon) / 30)];
}

// 3. Moteur planétaire (Approximation de Kepler pour planètes personnelles)
export const PLANETS = [
  { 
    name: "Soleil", 
    symbol: "☉",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(280.46646 + 36000.76983 * t);
      const g = normalize360(357.52911 + 35999.05029 * t);
      return normalize360(L + 1.914602 * Math.sin(toRad(g)));
    }
  },
  { 
    name: "Lune", 
    symbol: "☽",
    lon: (ts: number) => normalize360(218.316 + 481267.8813 * ((ts / 86400 + 2440587.5 - 2451545.0) / 36525)) 
  },
  {
    name: "Mercure",
    symbol: "☿",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      return normalize360(252.25 + 149472.67 * t); // Approximation rapide
    }
  },
  {
    name: "Vénus",
    symbol: "♀",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      return normalize360(181.98 + 58517.81 * t);
    }
  },
  {
    name: "Mars",
    symbol: "♂",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      return normalize360(355.45 + 19140.30 * t);
    }
  }
];

// 4. Domification et Éphémérides
export function createEphemeris(date: Date, lat: number, lonDeg: number) {
  const jd = getJulianDate(date);
  const T = (jd - 2451545.0) / 36525;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
  const lst = normalize360(gmst + lonDeg);
  const epsRad = toRad(23.439291 - 0.0130042 * T);
  const latRad = toRad(lat);
  const ramc = toRad(lst);

  const MC = normalize360((Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(epsRad)) * 180) / Math.PI);
  const Asc = normalize360((Math.atan2(-Math.cos(ramc), Math.sin(ramc) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad)) * 180) / Math.PI);
  
  const cusps = Array.from({ length: 12 }, (_, i) => normalize360(Asc + i * 30));

  return { Asc, MC, cusps };
}

// --- PONTS DE COMPATIBILITÉ ---
export const planets = PLANETS;
export const mockDailyTransits = [] as any[];
export const mockHoroscopes = {} as any;

export const getZodiacName = (id: string, lang: string = 'fr') => {
  const signNames: Record<string, Record<string, string>> = {
    aries: { fr: 'Bélier', en: 'Aries' },
    taurus: { fr: 'Taureau', en: 'Taurus' },
    gemini: { fr: 'Gémeaux', en: 'Gemini' },
    cancer: { fr: 'Cancer', en: 'Cancer' },
    leo: { fr: 'Lion', en: 'Leo' },
    virgo: { fr: 'Vierge', en: 'Virgo' },
    libra: { fr: 'Balance', en: 'Libra' },
    scorpio: { fr: 'Scorpion', en: 'Scorpio' },
    sagittarius: { fr: 'Sagittaire', en: 'Sagittarius' },
    capricorn: { fr: 'Capricorne', en: 'Capricorn' },
    aquarius: { fr: 'Verseau', en: 'Aquarius' },
    pisces: { fr: 'Poissons', en: 'Pisces' },
  };

  return signNames[id.toLowerCase()]?.[lang] || id;
};