import { NextRequest, NextResponse } from 'next/server'

const normalize360 = (v: number) => ((v % 360) + 360) % 360;

// --- MOTEUR MATHÉMATIQUE ---
const jd = (y: number, m: number, d: number, h: number) => {
  if (m <= 2) { y--; m += 12; }
  const a = Math.floor(y / 100); const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b + h / 24 - 1524.5;
};

const sunLon = (t: number) => {
  const l = normalize360(280.46646 + 36000.76983 * t);
  const g = normalize360(357.52911 + 35999.05029 * t);
  return normalize360(l + 1.914602 * Math.sin(g * Math.PI / 180) + 0.019993 * Math.sin(2 * g * Math.PI / 180));
};

const moonLon = (t: number) => normalize360(218.316447 + 481267.881234 * t);

const PLANETS = [
  { name: 'Soleil', lon: sunLon },
  { name: 'Lune', lon: moonLon },
  { name: 'Mercure', lon: (t: number) => normalize360(252.25084 + 149472.67411 * t) },
  { name: 'Vénus', lon: (t: number) => normalize360(181.97973 + 58517.81538 * t) },
  { name: 'Mars', lon: (t: number) => normalize360(355.45332 + 19082.20642 * t) },
  { name: 'Jupiter', lon: (t: number) => normalize360(34.40438 + 3034.74612 * t) },
  { name: 'Saturne', lon: (t: number) => normalize360(49.10752 + 1222.11373 * t) }
];

const SIGNS = ['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons'];
const getSign = (lon: number) => SIGNS[Math.floor(normalize360(lon) / 30)];

const calcAscMC = (jdValue: number, lat: number, lon: number) => {
  const t = (jdValue - 2451545.0) / 36525;
  const sidereal = normalize360(280.46061837 + 360.98564736629 * (jdValue - 2451545.0) + lon);
  const eps = 23.439291 - 0.01300416 * t;
  const rRad = sidereal * Math.PI / 180;
  const eRad = eps * Math.PI / 180;
  const lRad = lat * Math.PI / 180;
  const MC = normalize360(Math.atan2(Math.sin(rRad), Math.cos(rRad) * Math.cos(eRad)) * 180 / Math.PI);
  const Asc = normalize360(Math.atan2(-Math.cos(rRad), Math.sin(rRad) * Math.cos(eRad) + Math.tan(lRad) * Math.sin(eRad)) * 180 / Math.PI);
  const cusps = Array.from({ length: 12 }, (_, i) => normalize360(Asc + i * 30));
  return { Asc, MC, cusps };
};

const getHouse = (lon: number, cusps: number[]) => {
  const L = normalize360(lon);
  for (let i = 0; i < 12; i++) {
    const start = normalize360(cusps[i]);
    const end = normalize360(cusps[(i + 1) % 12]);
    const inHouse = start <= end ? (L >= start && L < end) : (L >= start || L < end);
    if (inHouse) return i + 1;
  }
  return 12;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { birthDate, birthTime, lat, lon, name, email, birthCity } = body ?? {};

    // Validation robuste (0 ne doit pas être rejeté)
    if (!birthDate || lat == null || lon == null) {
      return NextResponse.json({ error: 'Data missing' }, { status: 400 });
    }

    const latNum = Number(lat);
    const lonNum = Number(lon);
    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      return NextResponse.json({ error: 'Invalid lat/lon' }, { status: 400 });
    }

    // 1) Envoi Brevo (non bloquant)
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (BREVO_API_KEY && email) {
      fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          attributes: {
            PRENOM: name || "",
            VILLE_NAISSANCE: birthCity || ""
          },
          updateEnabled: true
        })
      }).catch(err => console.error('Brevo Sync Error:', err));
    }

    // 2) Calculs
    const [y, m, d] = String(birthDate).split('-').map(Number);
    const [h, min] = String(birthTime || '12:00').split(':').map(Number);
    const hour = (h || 0) + (min || 0) / 60 - lonNum / 15;
    const JD = jd(y, m, d, hour);
    const T = (JD - 2451545.0) / 36525;

    const { Asc, MC, cusps } = calcAscMC(JD, latNum, lonNum);

    const planets = PLANETS.map(p => {
      const longitude = normalize360(p.lon(T));
      return {
        name: p.name,
        longitude: Math.round(longitude * 100) / 100,
        sign: getSign(longitude),
        house: getHouse(longitude, cusps),
        degree: Math.round((longitude % 30) * 10) / 10
      };
    });

    return NextResponse.json({
      name,
      ascendant: {
        longitude: Math.round(Asc * 100) / 100,
        sign: getSign(Asc),
        degree: Math.round((Asc % 30) * 10) / 10
      },
      mc: {
        longitude: Math.round(MC * 100) / 100,
        sign: getSign(MC),
        degree: Math.round((MC % 30) * 10) / 10
      },
      planets,
      cusps
    });

  } catch (e) {
    console.error('Natal chart route error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}