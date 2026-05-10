import { NextRequest, NextResponse } from 'next/server'

// --- MOTEUR MATHÉMATIQUE (Garder vos fonctions) ---
const jd = (y: number, m: number, d: number, h: number) => {
  if (m <= 2) { y--; m += 12; }
  const a = Math.floor(y / 100); const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b + h / 24 - 1524.5;
};

const sunLon = (t: number) => {
  const l = (280.46646 + 36000.76983 * t) % 360;
  const g = (357.52911 + 35999.05029 * t) % 360;
  return (l + 1.914602 * Math.sin(g * Math.PI / 180) + 0.019993 * Math.sin(2 * g * Math.PI / 180)) % 360;
};

const moonLon = (t: number) => (218.316447 + 481267.881234 * t) % 360;

const PLANETS = [
  { name: 'Soleil', lon: sunLon },
  { name: 'Lune', lon: moonLon },
  { name: 'Mercure', lon: (t: number) => (252.25084 + 149472.67411 * t) % 360 },
  { name: 'Vénus', lon: (t: number) => (181.97973 + 58517.81538 * t) % 360 },
  { name: 'Mars', lon: (t: number) => (355.45332 + 19082.20642 * t) % 360 },
  { name: 'Jupiter', lon: (t: number) => (34.40438 + 3034.74612 * t) % 360 },
  { name: 'Saturne', lon: (t: number) => (49.10752 + 1222.11373 * t) % 360 }
];

const getSign = (lon: number) => ['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons'][Math.floor(lon / 30)];

const calcAscMC = (jd: number, lat: number, lon: number) => {
  const t = (jd - 2451545.0) / 36525;
  const sidereal = (280.46061837 + 360.98564736629 * (jd - 2451545.0) + lon) % 360;
  const eps = 23.439291 - 0.01300416 * t;
  const rRad = sidereal * Math.PI / 180;
  const eRad = eps * Math.PI / 180;
  const lRad = lat * Math.PI / 180;
  const MC = (Math.atan2(Math.sin(rRad), Math.cos(rRad) * Math.cos(eRad)) * 180 / Math.PI + 360) % 360;
  const Asc = (Math.atan2(-Math.cos(rRad), Math.sin(rRad) * Math.cos(eRad) + Math.tan(lRad) * Math.sin(eRad)) * 180 / Math.PI + 360) % 360;
  const cusps = Array.from({length: 12}, (_, i) => (Asc + i * 30) % 360);
  return { Asc, MC, cusps };
};

const getHouse = (lon: number, cusps: number[]) => {
  for (let i = 0; i < 11; i++) if (lon >= cusps[i] && lon < cusps[i+1]) return i + 1;
  return 12;
};

// --- FONCTION PRINCIPALE (API) ---
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { birthDate, birthTime, lat, lon, name, email, birthCity } = body;
    
    // 1. ENVOI À BREVO (Remplit la colonne PRENOM)
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (BREVO_API_KEY && email) {
      // On n'utilise pas 'await' ici pour ne pas ralentir l'affichage de la carte
      fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          attributes: {
            PRENOM: name || "", // C'est ici que le prénom est envoyé
            VILLE_NAISSANCE: birthCity || ""
          },
          updateEnabled: true
        })
      }).catch(err => console.error("Brevo Sync Error:", err));
    }

    // 2. CALCULS ASTROLOGIQUES
    if (!birthDate || !lat || !lon) return NextResponse.json({ error: 'Data missing' }, { status: 400 });
    
    const [y, m, d] = birthDate.split('-').map(Number);
    const [h, min] = (birthTime || '12:00').split(':').map(Number);
    const hour = h + min / 60 - lon / 15;
    const JD = jd(y, m, d, hour);
    const T = (JD - 2451545.0) / 36525;
    
    const { Asc, MC, cusps } = calcAscMC(JD, Number(lat), Number(lon));
    
    const planets = PLANETS.map(p => {
      const longitude = p.lon(T);
      return {
        name: p.name,
        longitude: Math.round(longitude * 100) / 100,
        sign: getSign(longitude),
        house: getHouse(longitude, cusps),
        degree: Math.round(longitude % 30 * 10) / 10
      };
    });

    return NextResponse.json({
      name,
      ascendant: { longitude: Math.round(Asc * 100) / 100, sign: getSign(Asc), degree: Math.round(Asc % 30 * 10) / 10 },
      mc: { longitude: Math.round(MC * 100) / 100, sign: getSign(MC), degree: Math.round(MC % 30 * 10) / 10 },
      planets,
      cusps
    });

  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}