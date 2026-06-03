// lib/astrology.ts
// Moteur astronomique - Algorithmes de Jean Meeus (Astronomical Algorithms)

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

/**
 * Calcule dans quelle maison se trouve une planète selon les cuspides données.
 */
export function getHouse(lon: number, cusps: number[]): number {
  const L = normalize360(lon);
  for (let i = 0; i < 12; i++) {
    const start = cusps[i];
    const end = cusps[(i + 1) % 12];
    const inside = start <= end ? L >= start && L < end : L >= start || L < end;
    if (inside) return i + 1;
  }
  return 12;
}

// 3. Moteur planétaire (Tropical - Meeus)
export const PLANETS = [
  {
    name: "Soleil",
    symbol: "☉",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(280.46646 + 36000.76983 * t);
      const g = normalize360(357.52911 + 35999.05029 * t);
      return normalize360(L + 1.914602 * Math.sin(toRad(g)) + 0.019993 * Math.sin(toRad(2 * g)));
    }
  },
  {
    name: "Lune",
    symbol: "☽",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const D = normalize360(297.85036 + 445267.111480 * t);
      const M = normalize360(357.52772 + 35999.050340 * t);
      const Mp = normalize360(134.96298 + 477198.867398 * t);
      const F = normalize360(93.27191 + 483202.017538 * t);
      const L = normalize360(218.3165 + 481267.8813 * t);
      return normalize360(
        L
        + 6.289 * Math.sin(toRad(Mp))
        - 1.274 * Math.sin(toRad(2*D - Mp))
        + 0.658 * Math.sin(toRad(2*D))
        - 0.214 * Math.sin(toRad(2*Mp))
        - 0.186 * Math.sin(toRad(M))
        - 0.114 * Math.sin(toRad(2*F))
      );
    }
  },
  {
    name: "Mercure",
    symbol: "☿",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(252.25084 + 149472.67411 * t);
      const g = normalize360(357.52911 + 35999.05029 * t);
      const gp = normalize360(252.25084 + 149472.67411 * t);
      return normalize360(L + 1.914602 * Math.sin(toRad(g)) - 1.397 * Math.sin(toRad(gp)));
    }
  },
  {
    name: "Vénus",
    symbol: "♀",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(181.97973 + 58517.81539 * t);
      const g = normalize360(357.52911 + 35999.05029 * t);
      return normalize360(L + 0.776 * Math.sin(toRad(normalize360(212.64 + 58517.80 * t))) + 0.004 * Math.sin(toRad(g)));
    }
  },
  {
    name: "Mars",
    symbol: "♂",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(355.45332 + 19140.29934 * t);
      const g = normalize360(357.52911 + 35999.05029 * t);
      const gm = normalize360(19.37330 + 19140.30268 * t);
      return normalize360(L + 1.914602 * Math.sin(toRad(g)) - 0.649 * Math.sin(toRad(gm)));
    }
  },
  {
    name: "Jupiter",
    symbol: "♃",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(34.35151 + 3034.90567 * t);
      const g = normalize360(357.52911 + 35999.05029 * t);
      const gj = normalize360(20.02 + 3034.69 * t);
      return normalize360(L + 5.555 * Math.sin(toRad(gj)) + 0.168 * Math.sin(toRad(2 * gj)) - 0.420 * Math.sin(toRad(g)));
    }
  },
  {
    name: "Saturne",
    symbol: "♄",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(50.07744 + 1222.11370 * t);
      const gs = normalize360(316.97 + 1222.11 * t);
      const gj = normalize360(20.02 + 3034.69 * t);
      return normalize360(L + 6.393 * Math.sin(toRad(gs)) + 1.478 * Math.sin(toRad(2 * gs)) - 0.978 * Math.sin(toRad(gj - gs)));
    }
  },
  {
    name: "Uranus",
    symbol: "♅",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(314.05500 + 429.87205 * t);
      const gu = normalize360(142.54 + 429.87 * t);
      return normalize360(L + 5.523 * Math.sin(toRad(gu)) + 0.204 * Math.sin(toRad(2 * gu)));
    }
  },
  {
    name: "Neptune",
    symbol: "♆",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(304.34866 + 219.88559 * t);
      const gn = normalize360(256.23 + 219.89 * t);
      return normalize360(L + 1.048 * Math.sin(toRad(gn)) + 0.029 * Math.sin(toRad(2 * gn)));
    }
  },
  {
    name: "Pluton",
    symbol: "♇",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      const L = normalize360(238.95980 + 145.18033 * t);
      const gp = normalize360(14.09 + 145.18 * t);
      return normalize360(L + 28.273 * Math.sin(toRad(gp)) + 4.555 * Math.sin(toRad(2 * gp)));
    }
  },
  {
    name: "Nœud Nord",
    symbol: "☊",
    lon: (ts: number) => {
      const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
      // Nœud lunaire moyen (rétrograde)
      return normalize360(125.04452 - 1934.136261 * t);
    }
  },
];

// 4. Domification Whole Sign + Éphémérides
export function createEphemeris(date: Date, lat: number, lonDeg: number) {
  const jd = getJulianDate(date);
  const T = (jd - 2451545.0) / 36525;

  // Temps Sidéral de Greenwich (GMST)
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
  const lst = normalize360(gmst + lonDeg);
  const epsRad = toRad(23.439291 - 0.0130042 * T);
  const latRad = toRad(lat);
  const ramc = toRad(lst);

  // MC et Ascendant
  const MC = normalize360((Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(epsRad)) * 180) / Math.PI);
  const Asc = normalize360(
    (Math.atan2(
      -Math.cos(ramc),
      Math.sin(ramc) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad)
    ) * 180) / Math.PI
  );

  // Maisons Whole Sign : chaque maison = un signe entier à partir du signe de l'Ascendant
  const ascSignIndex = Math.floor(normalize360(Asc) / 30);
  const cusps = Array.from({ length: 12 }, (_, i) => ((ascSignIndex + i) % 12) * 30);

  return { Asc, MC, cusps };
}

// --- PONTS DE COMPATIBILITÉ ---
export const planets = PLANETS;
export const mockDailyTransits = [] as any[];
export const mockHoroscopes = {} as any;
export const getZodiacName = (id: string, lang: string = 'fr') => {
  const names: Record<string, string> = {
    aries: 'Bélier', taurus: 'Taureau', gemini: 'Gémeaux', cancer: 'Cancer',
    leo: 'Lion', virgo: 'Vierge', libra: 'Balance', scorpio: 'Scorpion',
    sagittarius: 'Sagittaire', capricorn: 'Capricorne', aquarius: 'Verseau', pisces: 'Poissons'
  };
  return names[id.toLowerCase()] || id;
};
