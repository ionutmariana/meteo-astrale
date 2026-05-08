export const zodiacSigns = [
  { id: 'aries', symbol: '♈', element: 'fire', dates: '21/03 - 19/04' },
  { id: 'taurus', symbol: '♉', element: 'earth', dates: '20/04 - 20/05' },
  { id: 'gemini', symbol: '♊', element: 'air', dates: '21/05 - 20/06' },
  { id: 'cancer', symbol: '♋', element: 'water', dates: '21/06 - 22/07' },
  { id: 'leo', symbol: '♌', element: 'fire', dates: '23/07 - 22/08' },
  { id: 'virgo', symbol: '♍', element: 'earth', dates: '23/08 - 22/09' },
  { id: 'libra', symbol: '♎', element: 'air', dates: '23/09 - 22/10' },
  { id: 'scorpio', symbol: '♏', element: 'water', dates: '23/10 - 21/11' },
  { id: 'sagittarius', symbol: '♐', element: 'fire', dates: '22/11 - 21/12' },
  { id: 'capricorn', symbol: '♑', element: 'earth', dates: '22/12 - 19/01' },
  { id: 'aquarius', symbol: '♒', element: 'air', dates: '20/01 - 18/02' },
  { id: 'pisces', symbol: '♓', element: 'water', dates: '19/02 - 20/03' },
] as const

export type ZodiacSignId = typeof zodiacSigns[number]['id']

export const planets = [
  { id: 'sun', symbol: '☉', name: 'Sun' },
  { id: 'moon', symbol: '☽', name: 'Moon' },
  { id: 'mercury', symbol: '☿', name: 'Mercury' },
  { id: 'venus', symbol: '♀', name: 'Venus' },
  { id: 'mars', symbol: '♂', name: 'Mars' },
  { id: 'jupiter', symbol: '♃', name: 'Jupiter' },
  { id: 'saturn', symbol: '♄', name: 'Saturn' },
  { id: 'uranus', symbol: '♅', name: 'Uranus' },
  { id: 'neptune', symbol: '♆', name: 'Neptune' },
  { id: 'pluto', symbol: '♇', name: 'Pluto' },
] as const

export type PlanetId = typeof planets[number]['id']

// Mock data for fallback when API fails
export const mockDailyTransits = [
  {
    planet: 'sun',
    sign: 'gemini',
    degree: 17,
    description: {
      fr: 'Le Soleil en Gémeaux favorise la communication et les échanges intellectuels.',
      en: 'Sun in Gemini favors communication and intellectual exchanges.',
      es: 'El Sol en Géminis favorece la comunicación y los intercambios intelectuales.',
      jp: '双子座の太陽はコミュニケーションと知的交流を促進します。',
      ro: 'Soarele în Gemeni favorizează comunicarea și schimburile intelectuale.',
    },
  },
  {
    planet: 'moon',
    sign: 'scorpio',
    degree: 8,
    description: {
      fr: 'La Lune en Scorpion intensifie les émotions et favorise l\'introspection.',
      en: 'Moon in Scorpio intensifies emotions and favors introspection.',
      es: 'La Luna en Escorpio intensifica las emociones y favorece la introspección.',
      jp: '蠍座の月は感情を強め、内省を促します。',
      ro: 'Luna în Scorpion intensifică emoțiile și favorizează introspecția.',
    },
  },
  {
    planet: 'mercury',
    sign: 'taurus',
    degree: 25,
    description: {
      fr: 'Mercure en Taureau encourage une pensée pratique et méthodique.',
      en: 'Mercury in Taurus encourages practical and methodical thinking.',
      es: 'Mercurio en Tauro fomenta el pensamiento práctico y metódico.',
      jp: '牡牛座の水星は実践的で系統的な思考を促します。',
      ro: 'Mercur în Taur încurajează gândirea practică și metodică.',
    },
  },
  {
    planet: 'venus',
    sign: 'cancer',
    degree: 12,
    description: {
      fr: 'Vénus en Cancer renforce les liens familiaux et le besoin de sécurité affective.',
      en: 'Venus in Cancer strengthens family bonds and the need for emotional security.',
      es: 'Venus en Cáncer fortalece los lazos familiares y la necesidad de seguridad emocional.',
      jp: '蟹座の金星は家族の絆と情緒的な安心感の必要性を強化します。',
      ro: 'Venus în Rac întărește legăturile familiale și nevoia de securitate emoțională.',
    },
  },
  {
    planet: 'mars',
    sign: 'aries',
    degree: 3,
    description: {
      fr: 'Mars en Bélier apporte une énergie dynamique et un esprit pionnier.',
      en: 'Mars in Aries brings dynamic energy and a pioneering spirit.',
      es: 'Marte en Aries trae energía dinámica y espíritu pionero.',
      jp: '牡羊座の火星はダイナミックなエネルギーと開拓者精神をもたらします。',
      ro: 'Marte în Berbec aduce energie dinamică și spirit pionier.',
    },
  },
]

export const mockHoroscopes: Record<ZodiacSignId, {
  love: { score: number; text: Record<string, string> }
  work: { score: number; text: Record<string, string> }
  health: { score: number; text: Record<string, string> }
  finances: { score: number; text: Record<string, string> }
}> = {
  aries: {
    love: { score: 8, text: { fr: 'Une journée propice aux rencontres romantiques.', en: 'A day favorable for romantic encounters.', es: 'Un día propicio para encuentros románticos.', jp: 'ロマンチックな出会いに適した日。', ro: 'O zi propice pentru întâlniri romantice.' } },
    work: { score: 7, text: { fr: 'Votre énergie est au top pour avancer vos projets.', en: 'Your energy is at its peak to advance your projects.', es: 'Tu energía está al máximo para avanzar en tus proyectos.', jp: 'プロジェクトを進めるエネルギーは最高潮。', ro: 'Energia ta este la maxim pentru a avansa proiectele.' } },
    health: { score: 6, text: { fr: 'Pensez à vous ménager des moments de repos.', en: 'Remember to take some rest moments.', es: 'Recuerda tomarte momentos de descanso.', jp: '休息の時間を取ることを忘れずに。', ro: 'Nu uita să-ți iei momente de odihnă.' } },
    finances: { score: 5, text: { fr: 'Évitez les dépenses impulsives aujourd\'hui.', en: 'Avoid impulsive spending today.', es: 'Evita los gastos impulsivos hoy.', jp: '今日は衝動買いを避けて。', ro: 'Evită cheltuielile impulsive azi.' } },
  },
  taurus: {
    love: { score: 7, text: { fr: 'Stabilité et douceur dans vos relations.', en: 'Stability and sweetness in your relationships.', es: 'Estabilidad y dulzura en tus relaciones.', jp: '関係に安定と甘さ。', ro: 'Stabilitate și dulceață în relații.' } },
    work: { score: 8, text: { fr: 'Votre persévérance porte ses fruits.', en: 'Your perseverance is paying off.', es: 'Tu perseverancia da sus frutos.', jp: '忍耐が実を結ぶ。', ro: 'Perseverența ta dă roade.' } },
    health: { score: 7, text: { fr: 'Bonne vitalité générale.', en: 'Good overall vitality.', es: 'Buena vitalidad general.', jp: '全体的に良い活力。', ro: 'Vitalitate generală bună.' } },
    finances: { score: 8, text: { fr: 'Opportunités financières à saisir.', en: 'Financial opportunities to seize.', es: 'Oportunidades financieras a aprovechar.', jp: 'つかむべき財務機会。', ro: 'Oportunități financiare de valorificat.' } },
  },
  gemini: {
    love: { score: 9, text: { fr: 'Communication fluide avec votre partenaire.', en: 'Smooth communication with your partner.', es: 'Comunicación fluida con tu pareja.', jp: 'パートナーとのスムーズなコミュニケーション。', ro: 'Comunicare fluidă cu partenerul.' } },
    work: { score: 7, text: { fr: 'Multiples projets en cours, restez organisé.', en: 'Multiple projects in progress, stay organized.', es: 'Múltiples proyectos en curso, mantente organizado.', jp: '複数のプロジェクト進行中、整理整頓を。', ro: 'Multiple proiecte în derulare, rămâi organizat.' } },
    health: { score: 6, text: { fr: 'Attention à la dispersion mentale.', en: 'Watch out for mental dispersion.', es: 'Cuidado con la dispersión mental.', jp: '精神的な散漫さに注意。', ro: 'Atenție la dispersia mentală.' } },
    finances: { score: 6, text: { fr: 'Équilibrez vos dépenses.', en: 'Balance your expenses.', es: 'Equilibra tus gastos.', jp: '支出のバランスを。', ro: 'Echilibrează-ți cheltuielile.' } },
  },
  cancer: {
    love: { score: 8, text: { fr: 'Moment idéal pour renforcer les liens familiaux.', en: 'Ideal time to strengthen family bonds.', es: 'Momento ideal para fortalecer los lazos familiares.', jp: '家族の絆を強める理想的な時期。', ro: 'Moment ideal pentru întărirea legăturilor familiale.' } },
    work: { score: 6, text: { fr: 'Collaborations bénéfiques en vue.', en: 'Beneficial collaborations ahead.', es: 'Colaboraciones beneficiosas a la vista.', jp: '有益なコラボレーションが控えている。', ro: 'Colaborări benefice în vedere.' } },
    health: { score: 7, text: { fr: 'Prenez soin de votre bien-être émotionnel.', en: 'Take care of your emotional well-being.', es: 'Cuida tu bienestar emocional.', jp: '感情的な健康を大切に。', ro: 'Ai grijă de bunăstarea emoțională.' } },
    finances: { score: 7, text: { fr: 'Sécurité financière en progression.', en: 'Financial security progressing.', es: 'Seguridad financiera en progreso.', jp: '財務的安全性が向上中。', ro: 'Securitate financiară în progres.' } },
  },
  leo: {
    love: { score: 9, text: { fr: 'Charisme au maximum, profitez-en!', en: 'Charisma at its peak, enjoy it!', es: '¡Carisma al máximo, disfrútalo!', jp: 'カリスマが最高潮、楽しんで！', ro: 'Carismă la maxim, bucură-te!' } },
    work: { score: 8, text: { fr: 'Reconnaissance professionnelle en vue.', en: 'Professional recognition ahead.', es: 'Reconocimiento profesional a la vista.', jp: 'プロフェッショナルな認識が控えている。', ro: 'Recunoaștere profesională în vedere.' } },
    health: { score: 7, text: { fr: 'Énergie rayonnante.', en: 'Radiant energy.', es: 'Energía radiante.', jp: '輝くエネルギー。', ro: 'Energie strălucitoare.' } },
    finances: { score: 7, text: { fr: 'Investissements créatifs favorisés.', en: 'Creative investments favored.', es: 'Inversiones creativas favorecidas.', jp: '創造的な投資が有利。', ro: 'Investiții creative favorizate.' } },
  },
  virgo: {
    love: { score: 6, text: { fr: 'Analysez moins, ressentez plus.', en: 'Analyze less, feel more.', es: 'Analiza menos, siente más.', jp: '分析を減らし、もっと感じて。', ro: 'Analizează mai puțin, simte mai mult.' } },
    work: { score: 9, text: { fr: 'Précision et efficacité au rendez-vous.', en: 'Precision and efficiency on point.', es: 'Precisión y eficiencia a tope.', jp: '精度と効率が最高。', ro: 'Precizie și eficiență la punct.' } },
    health: { score: 8, text: { fr: 'Bonnes habitudes qui portent leurs fruits.', en: 'Good habits paying off.', es: 'Buenos hábitos que dan sus frutos.', jp: '良い習慣が実を結ぶ。', ro: 'Obiceiuri bune care dau roade.' } },
    finances: { score: 8, text: { fr: 'Gestion rigoureuse récompensée.', en: 'Rigorous management rewarded.', es: 'Gestión rigurosa recompensada.', jp: '厳格な管理が報われる。', ro: 'Gestionare riguroasă răsplătită.' } },
  },
  libra: {
    love: { score: 8, text: { fr: 'Harmonie et équilibre dans le couple.', en: 'Harmony and balance in the couple.', es: 'Armonía y equilibrio en la pareja.', jp: 'カップルの調和とバランス。', ro: 'Armonie și echilibru în cuplu.' } },
    work: { score: 7, text: { fr: 'Négociations favorables.', en: 'Favorable negotiations.', es: 'Negociaciones favorables.', jp: '有利な交渉。', ro: 'Negocieri favorabile.' } },
    health: { score: 7, text: { fr: 'Recherchez l\'équilibre intérieur.', en: 'Seek inner balance.', es: 'Busca el equilibrio interior.', jp: '内なるバランスを求めて。', ro: 'Caută echilibrul interior.' } },
    finances: { score: 6, text: { fr: 'Décisions financières à peser soigneusement.', en: 'Financial decisions to weigh carefully.', es: 'Decisiones financieras a sopesar cuidadosamente.', jp: '慎重に検討すべき財務決定。', ro: 'Decizii financiare de cântărit atent.' } },
  },
  scorpio: {
    love: { score: 9, text: { fr: 'Passion et intensité émotionnelle.', en: 'Passion and emotional intensity.', es: 'Pasión e intensidad emocional.', jp: '情熱と感情的な強さ。', ro: 'Pasiune și intensitate emoțională.' } },
    work: { score: 8, text: { fr: 'Votre détermination impressionne.', en: 'Your determination impresses.', es: 'Tu determinación impresiona.', jp: 'あなたの決意が印象的。', ro: 'Determinarea ta impresionează.' } },
    health: { score: 6, text: { fr: 'Libérez les tensions accumulées.', en: 'Release accumulated tensions.', es: 'Libera las tensiones acumuladas.', jp: '蓄積された緊張を解放して。', ro: 'Eliberează tensiunile acumulate.' } },
    finances: { score: 7, text: { fr: 'Transformation financière possible.', en: 'Financial transformation possible.', es: 'Transformación financiera posible.', jp: '財務的な変革が可能。', ro: 'Transformare financiară posibilă.' } },
  },
  sagittarius: {
    love: { score: 7, text: { fr: 'Aventures et nouvelles rencontres.', en: 'Adventures and new encounters.', es: 'Aventuras y nuevos encuentros.', jp: '冒険と新しい出会い。', ro: 'Aventuri și noi întâlniri.' } },
    work: { score: 7, text: { fr: 'Expansion de vos horizons professionnels.', en: 'Expansion of your professional horizons.', es: 'Expansión de tus horizontes profesionales.', jp: 'プロフェッショナルな視野の拡大。', ro: 'Expansiunea orizonturilor profesionale.' } },
    health: { score: 8, text: { fr: 'Vitalité débordante.', en: 'Overflowing vitality.', es: 'Vitalidad desbordante.', jp: 'あふれる活力。', ro: 'Vitalitate debordantă.' } },
    finances: { score: 5, text: { fr: 'Attention aux excès de générosité.', en: 'Watch out for excessive generosity.', es: 'Cuidado con el exceso de generosidad.', jp: '過度な寛大さに注意。', ro: 'Atenție la excesul de generozitate.' } },
  },
  capricorn: {
    love: { score: 6, text: { fr: 'Patience dans les relations.', en: 'Patience in relationships.', es: 'Paciencia en las relaciones.', jp: '関係における忍耐。', ro: 'Răbdare în relații.' } },
    work: { score: 9, text: { fr: 'Ambitions réalisables, persévérez.', en: 'Achievable ambitions, persevere.', es: 'Ambiciones alcanzables, persevera.', jp: '達成可能な野心、粘り強く。', ro: 'Ambiții realizabile, perseverează.' } },
    health: { score: 7, text: { fr: 'Résistance et endurance.', en: 'Resistance and endurance.', es: 'Resistencia y resistencia.', jp: '抵抗力と持久力。', ro: 'Rezistență și anduranță.' } },
    finances: { score: 9, text: { fr: 'Excellente période pour les investissements.', en: 'Excellent period for investments.', es: 'Excelente período para inversiones.', jp: '投資に最適な時期。', ro: 'Perioadă excelentă pentru investiții.' } },
  },
  aquarius: {
    love: { score: 7, text: { fr: 'Liberté et originalité dans vos relations.', en: 'Freedom and originality in your relationships.', es: 'Libertad y originalidad en tus relaciones.', jp: '関係における自由と独創性。', ro: 'Libertate și originalitate în relații.' } },
    work: { score: 8, text: { fr: 'Innovations et idées brillantes.', en: 'Innovations and brilliant ideas.', es: 'Innovaciones e ideas brillantes.', jp: '革新と素晴らしいアイデア。', ro: 'Inovații și idei strălucite.' } },
    health: { score: 7, text: { fr: 'Besoin de stimulation mentale.', en: 'Need for mental stimulation.', es: 'Necesidad de estimulación mental.', jp: '精神的な刺激が必要。', ro: 'Nevoie de stimulare mentală.' } },
    finances: { score: 6, text: { fr: 'Approche non conventionnelle des finances.', en: 'Unconventional approach to finances.', es: 'Enfoque no convencional de las finanzas.', jp: '型破りな財務アプローチ。', ro: 'Abordare neconvențională a finanțelor.' } },
  },
  pisces: {
    love: { score: 9, text: { fr: 'Romantisme et connexion spirituelle.', en: 'Romanticism and spiritual connection.', es: 'Romanticismo y conexión espiritual.', jp: 'ロマンチシズムとスピリチュアルなつながり。', ro: 'Romantism și conexiune spirituală.' } },
    work: { score: 6, text: { fr: 'Créativité au service de vos projets.', en: 'Creativity at the service of your projects.', es: 'Creatividad al servicio de tus proyectos.', jp: 'プロジェクトのための創造性。', ro: 'Creativitate în serviciul proiectelor.' } },
    health: { score: 7, text: { fr: 'Écoutez votre intuition pour votre bien-être.', en: 'Listen to your intuition for your well-being.', es: 'Escucha tu intuición para tu bienestar.', jp: '健康のために直感に耳を傾けて。', ro: 'Ascultă-ți intuiția pentru bunăstare.' } },
    finances: { score: 5, text: { fr: 'Évitez les décisions financières impulsives.', en: 'Avoid impulsive financial decisions.', es: 'Evita las decisiones financieras impulsivas.', jp: '衝動的な財務決定を避けて。', ro: 'Evită deciziile financiare impulsive.' } },
  },
}

export const countries = [
  { code: 'FR', name: { fr: 'France', en: 'France', es: 'Francia', jp: 'フランス', ro: 'Franța' } },
  { code: 'US', name: { fr: 'États-Unis', en: 'United States', es: 'Estados Unidos', jp: 'アメリカ', ro: 'Statele Unite' } },
  { code: 'GB', name: { fr: 'Royaume-Uni', en: 'United Kingdom', es: 'Reino Unido', jp: 'イギリス', ro: 'Regatul Unit' } },
  { code: 'ES', name: { fr: 'Espagne', en: 'Spain', es: 'España', jp: 'スペイン', ro: 'Spania' } },
  { code: 'IT', name: { fr: 'Italie', en: 'Italy', es: 'Italia', jp: 'イタリア', ro: 'Italia' } },
  { code: 'DE', name: { fr: 'Allemagne', en: 'Germany', es: 'Alemania', jp: 'ドイツ', ro: 'Germania' } },
  { code: 'JP', name: { fr: 'Japon', en: 'Japan', es: 'Japón', jp: '日本', ro: 'Japonia' } },
  { code: 'RO', name: { fr: 'Roumanie', en: 'Romania', es: 'Rumanía', jp: 'ルーマニア', ro: 'România' } },
  { code: 'CA', name: { fr: 'Canada', en: 'Canada', es: 'Canadá', jp: 'カナダ', ro: 'Canada' } },
  { code: 'AU', name: { fr: 'Australie', en: 'Australia', es: 'Australia', jp: 'オーストラリア', ro: 'Australia' } },
]
