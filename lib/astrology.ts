// lib/astrology.ts

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

const normalize360 = (v: number) => ((v % 360) + 360) % 360;

export function getJulianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

export function getSign(lon: number): string {
  const signs = ["Bélier","Taureau","Gémeaux","Cancer","Lion","Vierge","Balance","Scorpion","Sagittaire","Capricorne","Verseau","Poissons"];
  return signs[Math.floor(normalize360(lon) / 30)];
}

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

export function createEphemeris(date: Date, lat: number, lonDeg: number) {
  const jd = getJulianDate(date);
  const T = (jd - 2451545.0) / 36525;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
  const lst = normalize360(gmst + lonDeg);
  const epsRad = (23.439291 - 0.0130042 * T) * Math.PI / 180;
  const latRad = (lat * Math.PI) / 180;
  const ramc = (lst * Math.PI) / 180;

  const MC = normalize360((Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(epsRad)) * 180) / Math.PI);
  const Asc = normalize360((Math.atan2(-Math.cos(ramc), Math.sin(ramc) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad)) * 180) / Math.PI);
  const cusps = Array.from({ length: 12 }, (_, i) => normalize360(Asc + i * 30));

  return { Asc, MC, cusps };
}

export const PLANETS = [
  { name: "Soleil", lon: (ts: number) => {
    const t = (ts / 86400 + 2440587.5 - 2451545.0) / 36525;
    const L = normalize360(280.46646 + 36000.76983 * t);
    const g = normalize360(357.52911 + 35999.05029 * t);
    return normalize360(L + 1.914602 * Math.sin((g * Math.PI) / 180));
  }},
  { name: "Lune", lon: (ts: number) => normalize360(218.316 + 481267.8813 * ((ts / 86400 + 2440587.5 - 2451545.0) / 36525)) }
];
