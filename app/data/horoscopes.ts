import type { ZodiacSignId } from '@/lib/astrology-data'

export interface HoroscopeSection {
  score: number
  text: {
    fr: string
    en: string
    es: string
    jp: string
    ro: string
  }
}

export interface SignHoroscope {
  love: HoroscopeSection
  work: HoroscopeSection
  health: HoroscopeSection
  finances: HoroscopeSection
}

export const horoscopes: Record<ZodiacSignId, SignHoroscope> = {
  aries: {
    love: {
      score: 8,
      text: {
        fr: "Votre fougue naturelle attire les regards et suscite l'admiration. Les célibataires pourraient faire une rencontre déterminante lors d'une activité sportive ou d'un événement dynamique. En couple, votre partenaire apprécie votre spontanéité, mais veillez à tempérer votre impulsivité pour éviter les malentendus.",
        en: "Your natural passion attracts attention and admiration. Singles could make a decisive encounter during a sports activity or dynamic event. In a relationship, your partner appreciates your spontaneity, but be mindful of tempering your impulsiveness to avoid misunderstandings.",
        es: "Tu pasión natural atrae miradas y admiración. Los solteros podrían tener un encuentro decisivo durante una actividad deportiva o evento dinámico. En pareja, tu compañero aprecia tu espontaneidad, pero modera tu impulsividad para evitar malentendidos.",
        jp: "あなたの情熱は注目と賞賛を集めます。独身の方はスポーツやダイナミックなイベントで決定的な出会いがあるかもしれません。カップルの場合、パートナーはあなたの自発性を評価しますが、誤解を避けるために衝動性を抑えることも大切です。",
        ro: "Pasiunea ta naturală atrage privirile și admirația. Cei singuri ar putea avea o întâlnire decisivă în timpul unei activități sportive sau unui eveniment dinamic. În cuplu, partenerul apreciază spontaneitatea ta, dar temperează-ți impulsivitatea pentru a evita neînțelegerile."
      }
    },
    work: {
      score: 7,
      text: {
        fr: "Votre énergie débordante vous pousse à prendre des initiatives audacieuses. C'est le moment idéal pour proposer de nouveaux projets ou défendre vos idées lors de réunions importantes. Attention toutefois à ne pas froisser vos collègues par une attitude trop directe - la diplomatie sera votre meilleure alliée.",
        en: "Your boundless energy drives you to take bold initiatives. It's the ideal time to propose new projects or defend your ideas in important meetings. However, be careful not to offend colleagues with an overly direct attitude - diplomacy will be your best ally.",
        es: "Tu energía desbordante te impulsa a tomar iniciativas audaces. Es el momento ideal para proponer nuevos proyectos o defender tus ideas en reuniones importantes. Sin embargo, cuidado con no ofender a tus colegas con una actitud demasiado directa.",
        jp: "あふれるエネルギーが大胆な行動を後押しします。新しいプロジェクトを提案したり、重要な会議でアイデアを主張するのに最適な時期です。ただし、直接的すぎる態度で同僚を不快にさせないよう、外交的な姿勢が大切です。",
        ro: "Energia ta debordantă te împinge să iei inițiative îndrăznețe. Este momentul ideal să propui proiecte noi sau să-ți aperi ideile în întâlniri importante. Totuși, ai grijă să nu jignești colegii cu o atitudine prea directă."
      }
    },
    health: {
      score: 6,
      text: {
        fr: "Votre vitalité est excellente, mais votre tendance à vous dépenser sans compter pourrait vous rattraper. Accordez-vous des pauses régulières et privilégiez une alimentation équilibrée pour maintenir votre niveau d'énergie. Les activités de cardio vous conviennent particulièrement, mais n'oubliez pas les étirements.",
        en: "Your vitality is excellent, but your tendency to overexert yourself could catch up with you. Take regular breaks and prioritize a balanced diet to maintain your energy levels. Cardio activities suit you particularly well, but don't forget stretching.",
        es: "Tu vitalidad es excelente, pero tu tendencia a esforzarte demasiado podría pasarte factura. Tómate descansos regulares y prioriza una alimentación equilibrada para mantener tus niveles de energía. Las actividades de cardio te convienen especialmente.",
        jp: "活力は素晴らしいですが、無理をしすぎる傾向があるかもしれません。定期的に休憩を取り、バランスの取れた食事でエネルギーレベルを維持しましょう。有酸素運動が特に向いていますが、ストレッチも忘れずに。",
        ro: "Vitalitatea ta este excelentă, dar tendința de a te suprasolicita ar putea să te ajungă din urmă. Acordă-ți pauze regulate și prioritizează o alimentație echilibrată pentru a-ți menține nivelul de energie."
      }
    },
    finances: {
      score: 5,
      text: {
        fr: "Votre goût pour l'action rapide peut vous pousser vers des décisions financières impulsives. Avant tout achat important, prenez le temps de comparer les offres et de consulter un proche de confiance. Une opportunité d'investissement pourrait se présenter, mais elle nécessitera une analyse approfondie avant de vous engager.",
        en: "Your taste for quick action can push you towards impulsive financial decisions. Before any major purchase, take time to compare offers and consult a trusted friend. An investment opportunity may arise, but it will require thorough analysis before committing.",
        es: "Tu gusto por la acción rápida puede llevarte a decisiones financieras impulsivas. Antes de cualquier compra importante, tómate tiempo para comparar ofertas y consultar a alguien de confianza. Una oportunidad de inversión podría presentarse.",
        jp: "素早い行動を好む性格から、衝動的な金銭決定をしがちです。大きな買い物をする前に、比較検討し、信頼できる人に相談しましょう。投資機会が訪れるかもしれませんが、慎重な分析が必要です。",
        ro: "Gustul tău pentru acțiune rapidă te poate împinge spre decizii financiare impulsive. Înainte de orice achiziție importantă, ia-ți timp să compari ofertele și să consulți o persoană de încredere."
      }
    }
  },
  taurus: {
    love: {
      score: 7,
      text: {
        fr: "La stabilité que vous recherchez dans vos relations est à portée de main. Votre sensualité naturelle et votre fidélité renforcent les liens avec votre partenaire. Pour les célibataires, une personne partageant vos valeurs de sécurité et de confort pourrait entrer dans votre vie par l'intermédiaire d'amis communs.",
        en: "The stability you seek in relationships is within reach. Your natural sensuality and loyalty strengthen bonds with your partner. For singles, someone sharing your values of security and comfort could enter your life through mutual friends.",
        es: "La estabilidad que buscas en las relaciones está al alcance. Tu sensualidad natural y lealtad fortalecen los lazos con tu pareja. Para los solteros, alguien que comparta tus valores de seguridad y confort podría entrar en tu vida.",
        jp: "求めている関係の安定が手の届くところにあります。あなたの官能性と誠実さがパートナーとの絆を強めます。独身の方は、共通の友人を通じて、安心と快適さの価値観を共有する人と出会えるかもしれません。",
        ro: "Stabilitatea pe care o cauți în relații este la îndemână. Sensualitatea și loialitatea ta naturală întăresc legăturile cu partenerul. Pentru cei singuri, cineva care împărtășește valorile tale ar putea intra în viața ta."
      }
    },
    work: {
      score: 8,
      text: {
        fr: "Votre persévérance et votre sens pratique vous distinguent au travail. Les projets de longue haleine que vous avez initiés commencent à porter leurs fruits. Vos supérieurs remarquent votre fiabilité et pourraient vous confier de nouvelles responsabilités. Restez ouvert aux changements, même s'ils bousculent vos habitudes.",
        en: "Your perseverance and practical sense distinguish you at work. Long-term projects you've initiated are starting to bear fruit. Your superiors notice your reliability and may entrust you with new responsibilities. Stay open to changes, even if they disrupt your habits.",
        es: "Tu perseverancia y sentido práctico te distinguen en el trabajo. Los proyectos a largo plazo que has iniciado comienzan a dar frutos. Tus superiores notan tu fiabilidad y podrían confiarte nuevas responsabilidades.",
        jp: "忍耐力と実用性が仕事で際立っています。長期プロジェクトが実を結び始めています。上司はあなたの信頼性に気づき、新しい責任を任せるかもしれません。習慣を乱す変化にも心を開いてください。",
        ro: "Perseverența și simțul practic te disting la locul de muncă. Proiectele pe termen lung pe care le-ai inițiat încep să dea roade. Superiorii tăi observă fiabilitatea ta și ar putea să-ți încredințeze noi responsabilități."
      }
    },
    health: {
      score: 7,
      text: {
        fr: "Votre constitution robuste vous protège des petits maux quotidiens. Cependant, votre amour des plaisirs de la table pourrait vous jouer des tours. Privilégiez les produits frais et de saison, et intégrez des promenades régulières dans la nature à votre routine. Le jardinage ou la cuisine saine peuvent devenir d'excellents exutoires.",
        en: "Your robust constitution protects you from daily ailments. However, your love of culinary pleasures could play tricks on you. Prioritize fresh, seasonal products and integrate regular nature walks into your routine. Gardening or healthy cooking can become excellent outlets.",
        es: "Tu constitución robusta te protege de los males cotidianos. Sin embargo, tu amor por los placeres de la mesa podría jugarte malas pasadas. Prioriza productos frescos y de temporada, e integra paseos regulares en la naturaleza.",
        jp: "頑丈な体質が日常の不調から守ってくれます。しかし、食の楽しみへの愛がトラブルの元になることも。新鮮な季節の食材を優先し、定期的な自然散策を日課に取り入れましょう。",
        ro: "Constituția ta robustă te protejează de micile neplăceri zilnice. Totuși, dragostea ta pentru plăcerile mesei ar putea să-ți joace feste. Prioritizează produsele proaspete și de sezon și integrează plimbări regulate în natură."
      }
    },
    finances: {
      score: 8,
      text: {
        fr: "Votre sens de l'épargne et votre prudence naturelle jouent en votre faveur. Une opportunité immobilière ou un investissement à long terme mérite votre attention. Votre patience vous permettra de négocier les meilleures conditions. Évitez cependant de vous montrer trop rigide face aux opportunités qui sortent de votre zone de confort.",
        en: "Your sense of savings and natural caution work in your favor. A real estate opportunity or long-term investment deserves your attention. Your patience will allow you to negotiate the best terms. However, avoid being too rigid with opportunities outside your comfort zone.",
        es: "Tu sentido del ahorro y prudencia natural juegan a tu favor. Una oportunidad inmobiliaria o inversión a largo plazo merece tu atención. Tu paciencia te permitirá negociar las mejores condiciones.",
        jp: "貯蓄センスと慎重さが味方します。不動産や長期投資の機会に注目しましょう。忍耐力で最良の条件を交渉できます。ただし、慣れ親しんだ範囲外の機会に対して硬直しすぎないようにしましょう。",
        ro: "Simțul economisirii și prudența naturală lucrează în favoarea ta. O oportunitate imobiliară sau o investiție pe termen lung merită atenția ta. Răbdarea ta îți va permite să negociezi cele mai bune condiții."
      }
    }
  },
  gemini: {
    love: {
      score: 9,
      text: {
        fr: "Votre charme communicatif fait des merveilles. Les échanges intellectuels nourrissent vos relations amoureuses et créent une complicité unique. En couple, surprenez votre partenaire avec des sorties culturelles ou des conversations profondes. Les célibataires pourraient craquer pour quelqu'un rencontré lors d'un événement social ou sur les réseaux.",
        en: "Your communicative charm works wonders. Intellectual exchanges nourish your romantic relationships and create unique complicity. In a relationship, surprise your partner with cultural outings or deep conversations. Singles might fall for someone met at a social event or online.",
        es: "Tu encanto comunicativo hace maravillas. Los intercambios intelectuales nutren tus relaciones amorosas y crean una complicidad única. En pareja, sorprende a tu compañero con salidas culturales o conversaciones profundas.",
        jp: "コミュニケーション力のある魅力が効果を発揮します。知的な交流が恋愛関係を育み、独特の親密さを生み出します。カップルは文化的な外出や深い会話でパートナーを驚かせましょう。独身の方はソーシャルイベントやSNSで出会いがあるかも。",
        ro: "Farmecul tău comunicativ face minuni. Schimburile intelectuale hrănesc relațiile tale amoroase și creează o complicitate unică. În cuplu, surprinde-ți partenerul cu ieșiri culturale sau conversații profunde."
      }
    },
    work: {
      score: 7,
      text: {
        fr: "Votre polyvalence est un atout majeur en ce moment. Vous jonglez habilement entre plusieurs projets, mais attention à ne pas vous disperser. Concentrez-vous sur deux ou trois priorités pour maximiser votre impact. Vos talents de communicant pourraient vous valoir une proposition intéressante liée aux médias ou au marketing.",
        en: "Your versatility is a major asset right now. You skillfully juggle multiple projects, but be careful not to spread yourself too thin. Focus on two or three priorities to maximize your impact. Your communication skills could earn you an interesting proposal in media or marketing.",
        es: "Tu versatilidad es un activo importante ahora. Malabareas hábilmente entre varios proyectos, pero cuidado con dispersarte. Concéntrate en dos o tres prioridades para maximizar tu impacto.",
        jp: "今、あなたの多才さが大きな強みです。複数のプロジェクトを巧みにこなしていますが、散漫にならないよう注意。2〜3つの優先事項に集中して影響力を最大化しましょう。コミュニケーション能力がメディアやマーケティング関連の興味深い提案につながるかもしれません。",
        ro: "Versatilitatea ta este un atu major în acest moment. Jonglezi abil între mai multe proiecte, dar ai grijă să nu te dispersezi. Concentrează-te pe două sau trei priorități pentru a maximiza impactul."
      }
    },
    health: {
      score: 6,
      text: {
        fr: "Votre mental hyperactif a besoin de moments de calme pour se ressourcer. La méditation, le yoga ou simplement la lecture peuvent apaiser votre esprit bouillonnant. Attention aux troubles du sommeil liés à une activité intellectuelle trop intense le soir. Privilégiez des activités relaxantes avant le coucher.",
        en: "Your hyperactive mind needs moments of calm to recharge. Meditation, yoga, or simply reading can soothe your bubbling spirit. Watch out for sleep disorders linked to intense intellectual activity in the evening. Prioritize relaxing activities before bedtime.",
        es: "Tu mente hiperactiva necesita momentos de calma para recargarse. La meditación, el yoga o simplemente la lectura pueden calmar tu espíritu burbujeante. Cuidado con los trastornos del sueño relacionados con la actividad intelectual intensa por la noche.",
        jp: "活発な精神には休息の時間が必要です。瞑想、ヨガ、読書などで沸き立つ心を落ち着かせましょう。夜の知的活動が激しすぎると睡眠障害につながることがあります。就寝前はリラックスする活動を優先しましょう。",
        ro: "Mintea ta hiperactivă are nevoie de momente de liniște pentru a se reîncărca. Meditația, yoga sau pur și simplu lectura pot calma spiritul tău efervescent. Atenție la tulburările de somn legate de activitatea intelectuală intensă seara."
      }
    },
    finances: {
      score: 6,
      text: {
        fr: "Votre curiosité naturelle vous pousse vers diverses opportunités financières. Avant de vous lancer dans un nouveau placement, faites des recherches approfondies. Évitez de suivre aveuglément les conseils de votre entourage sans vérification personnelle. Un side-project créatif pourrait devenir une source de revenus complémentaires intéressante.",
        en: "Your natural curiosity leads you towards various financial opportunities. Before jumping into a new investment, do thorough research. Avoid blindly following advice from your circle without personal verification. A creative side-project could become an interesting supplementary income source.",
        es: "Tu curiosidad natural te lleva hacia diversas oportunidades financieras. Antes de lanzarte a una nueva inversión, investiga a fondo. Evita seguir ciegamente los consejos de tu entorno sin verificación personal.",
        jp: "好奇心旺盛な性格が様々な金融機会へ導きます。新しい投資を始める前に、徹底的に調査しましょう。周囲のアドバイスを鵜呑みにせず、自分で確認することが大切です。クリエイティブな副業が興味深い副収入源になる可能性があります。",
        ro: "Curiozitatea ta naturală te conduce spre diverse oportunități financiare. Înainte de a te lansa într-o nouă investiție, fă cercetări aprofundate. Evită să urmezi orbește sfaturile celor din jur fără verificare personală."
      }
    }
  },
  cancer: {
    love: {
      score: 8,
      text: {
        fr: "Votre sensibilité profonde enrichit vos relations affectives. C'est le moment idéal pour renforcer les liens familiaux et créer des souvenirs précieux avec vos proches. En couple, votre besoin de sécurité émotionnelle est comblé par des gestes tendres et attentionnés. Les célibataires pourraient être touchés par quelqu'un de protecteur et bienveillant.",
        en: "Your deep sensitivity enriches your emotional relationships. It's the ideal time to strengthen family bonds and create precious memories with loved ones. In a relationship, your need for emotional security is fulfilled by tender, attentive gestures. Singles might be touched by someone protective and caring.",
        es: "Tu profunda sensibilidad enriquece tus relaciones afectivas. Es el momento ideal para fortalecer los lazos familiares y crear recuerdos preciosos con tus seres queridos. En pareja, tu necesidad de seguridad emocional se satisface con gestos tiernos.",
        jp: "深い感受性が感情的な関係を豊かにします。家族の絆を強め、大切な人との貴重な思い出を作る理想的な時期です。カップルの場合、優しく思いやりのあるジェスチャーで感情的な安心感が満たされます。独身の方は保護的で思いやりのある人に心を動かされるかもしれません。",
        ro: "Sensibilitatea ta profundă îmbogățește relațiile afective. Este momentul ideal să întărești legăturile familiale și să creezi amintiri prețioase cu cei dragi. În cuplu, nevoia ta de securitate emoțională este împlinită prin gesturi tandre."
      }
    },
    work: {
      score: 6,
      text: {
        fr: "Votre intuition vous guide dans vos décisions professionnelles. Les collaborations basées sur la confiance mutuelle sont particulièrement favorisées. Attention à ne pas laisser vos émotions prendre le dessus lors de situations stressantes. Prenez du recul avant de réagir aux critiques et cherchez le feedback constructif.",
        en: "Your intuition guides your professional decisions. Collaborations based on mutual trust are particularly favored. Be careful not to let emotions take over in stressful situations. Step back before reacting to criticism and seek constructive feedback.",
        es: "Tu intuición guía tus decisiones profesionales. Las colaboraciones basadas en la confianza mutua están particularmente favorecidas. Cuidado con dejar que las emociones tomen el control en situaciones estresantes.",
        jp: "直感が仕事の決定を導きます。相互信頼に基づくコラボレーションが特に有利です。ストレスの多い状況で感情に支配されないよう注意しましょう。批判に反応する前に一歩引いて、建設的なフィードバックを求めましょう。",
        ro: "Intuiția ta te ghidează în deciziile profesionale. Colaborările bazate pe încredere reciprocă sunt deosebit de favorizate. Ai grijă să nu lași emoțiile să preia controlul în situații stresante."
      }
    },
    health: {
      score: 7,
      text: {
        fr: "Votre bien-être est étroitement lié à votre équilibre émotionnel. Entourez-vous de personnes positives et créez un environnement domestique apaisant. L'eau vous fait du bien : bains relaxants, natation ou simplement promenades au bord de la mer peuvent restaurer votre énergie. Attention à l'alimentation émotionnelle.",
        en: "Your well-being is closely linked to emotional balance. Surround yourself with positive people and create a soothing home environment. Water does you good: relaxing baths, swimming, or simply walks by the sea can restore your energy. Watch out for emotional eating.",
        es: "Tu bienestar está estrechamente ligado a tu equilibrio emocional. Rodéate de personas positivas y crea un ambiente hogareño relajante. El agua te sienta bien: baños relajantes, natación o paseos junto al mar pueden restaurar tu energía.",
        jp: "あなたの健康は感情のバランスと密接に関連しています。ポジティブな人々に囲まれ、穏やかな家庭環境を作りましょう。水はあなたに良い影響を与えます：リラックスしたお風呂、水泳、海辺の散歩でエネルギーを回復できます。感情的な過食に注意しましょう。",
        ro: "Bunăstarea ta este strâns legată de echilibrul emoțional. Înconjoară-te de persoane pozitive și creează un mediu domestic liniștitor. Apa îți face bine: băi relaxante, înot sau pur și simplu plimbări pe malul mării."
      }
    },
    finances: {
      score: 7,
      text: {
        fr: "Votre prudence naturelle vous protège des mauvaises décisions financières. Les investissements liés à l'immobilier ou à la sécurité familiale sont favorisés. Évitez de prêter de l'argent sous le coup de l'émotion sans garanties claires. Constituez une épargne de précaution pour vous sentir plus serein face à l'avenir.",
        en: "Your natural caution protects you from poor financial decisions. Investments related to real estate or family security are favored. Avoid lending money emotionally without clear guarantees. Build a precautionary savings to feel more serene about the future.",
        es: "Tu prudencia natural te protege de malas decisiones financieras. Las inversiones relacionadas con bienes raíces o seguridad familiar están favorecidas. Evita prestar dinero por impulso emocional sin garantías claras.",
        jp: "慎重な性格が悪い金銭決定から守ってくれます。不動産や家族の安全に関する投資が有利です。明確な保証なしに感情的にお金を貸すことは避けましょう。将来に対してより安心するために、予備貯蓄を作りましょう。",
        ro: "Prudența ta naturală te protejează de decizii financiare proaste. Investițiile legate de imobiliare sau securitatea familiei sunt favorizate. Evită să împrumuți bani din impuls emoțional fără garanții clare."
      }
    }
  },
  leo: {
    love: {
      score: 9,
      text: {
        fr: "Votre magnétisme naturel est à son apogée. Vous rayonnez et attirez naturellement l'attention et l'admiration. En couple, votre générosité et votre chaleur renforcent la passion. Les célibataires ont toutes les chances de faire une rencontre marquante lors d'événements festifs ou culturels. Laissez briller votre authenticité.",
        en: "Your natural magnetism is at its peak. You radiate and naturally attract attention and admiration. In a relationship, your generosity and warmth strengthen passion. Singles have every chance of making a memorable encounter at festive or cultural events. Let your authenticity shine.",
        es: "Tu magnetismo natural está en su apogeo. Irradias y atraes naturalmente la atención y admiración. En pareja, tu generosidad y calidez fortalecen la pasión. Los solteros tienen todas las posibilidades de hacer un encuentro memorable.",
        jp: "あなたの自然な魅力が最高潮に達しています。輝きを放ち、自然と注目と賞賛を集めます。カップルでは、寛大さと温かさが情熱を強めます。独身の方はフェスティバルや文化イベントで印象的な出会いをするチャンスがあります。本当の自分を輝かせましょう。",
        ro: "Magnetismul tău natural este la apogeu. Radiezi și atragi în mod natural atenția și admirația. În cuplu, generozitatea și căldura ta întăresc pasiunea. Cei singuri au toate șansele să facă o întâlnire memorabilă."
      }
    },
    work: {
      score: 8,
      text: {
        fr: "Votre leadership naturel vous place au centre de l'attention professionnelle. C'est le moment de prendre des initiatives et de montrer vos talents de meneur. Une promotion ou une reconnaissance officielle pourrait récompenser vos efforts. Restez humble dans le succès et n'oubliez pas de valoriser le travail de votre équipe.",
        en: "Your natural leadership places you at the center of professional attention. It's time to take initiatives and show your leadership talents. A promotion or official recognition could reward your efforts. Stay humble in success and don't forget to value your team's work.",
        es: "Tu liderazgo natural te coloca en el centro de la atención profesional. Es el momento de tomar iniciativas y mostrar tus talentos de líder. Una promoción o reconocimiento oficial podría recompensar tus esfuerzos.",
        jp: "生まれながらのリーダーシップが仕事で注目を集めます。主導権を取り、リーダーとしての才能を発揮する時です。昇進や公式な認識がこれまでの努力に報いるかもしれません。成功しても謙虚さを忘れず、チームの仕事を評価することも大切です。",
        ro: "Leadership-ul tău natural te plasează în centrul atenției profesionale. Este momentul să iei inițiative și să-ți arăți talentele de lider. O promovare sau recunoaștere oficială ar putea recompensa eforturile tale."
      }
    },
    health: {
      score: 7,
      text: {
        fr: "Votre énergie solaire vous donne une vitalité remarquable. Le sport, particulièrement les activités créatives comme la danse ou le théâtre, vous convient parfaitement. Attention cependant à votre cœur au sens propre comme figuré : surveillez votre tension et accordez-vous des moments de repos pour éviter le surmenage.",
        en: "Your solar energy gives you remarkable vitality. Sports, particularly creative activities like dance or theater, suit you perfectly. However, watch your heart literally and figuratively: monitor your blood pressure and allow yourself rest moments to avoid burnout.",
        es: "Tu energía solar te da una vitalidad notable. El deporte, particularmente actividades creativas como la danza o el teatro, te convienen perfectamente. Sin embargo, cuida tu corazón literal y figuradamente.",
        jp: "太陽のようなエネルギーが素晴らしい活力を与えます。スポーツ、特にダンスや演劇などの創造的な活動が最適です。ただし、文字通りにも比喩的にも心臓に注意：血圧を監視し、燃え尽きを避けるために休息の時間を取りましょう。",
        ro: "Energia ta solară îți oferă o vitalitate remarcabilă. Sportul, în special activitățile creative precum dansul sau teatrul, ți se potrivesc perfect. Totuși, ai grijă de inima ta literal și figurat."
      }
    },
    finances: {
      score: 7,
      text: {
        fr: "Votre générosité naturelle peut parfois mettre à mal votre budget. Si vous aimez gâter vos proches, veillez à équilibrer ces dépenses avec vos besoins personnels. Les investissements dans le domaine créatif ou du divertissement pourraient s'avérer fructueux. Faites confiance à votre instinct pour les opportunités qui se présentent.",
        en: "Your natural generosity can sometimes strain your budget. If you like spoiling loved ones, balance these expenses with your personal needs. Investments in creative or entertainment fields could prove fruitful. Trust your instinct for opportunities that arise.",
        es: "Tu generosidad natural puede a veces poner a prueba tu presupuesto. Si te gusta mimar a tus seres queridos, equilibra estos gastos con tus necesidades personales. Las inversiones en el campo creativo o del entretenimiento podrían resultar fructíferas.",
        jp: "寛大な性格が予算を圧迫することがあります。大切な人を甘やかすのが好きなら、これらの支出と個人的なニーズのバランスを取りましょう。クリエイティブやエンターテインメント分野への投資が実り多いものになるかもしれません。訪れる機会には直感を信じましょう。",
        ro: "Generozitatea ta naturală poate uneori pune la încercare bugetul. Dacă îți place să-i răsfeți pe cei dragi, echilibrează aceste cheltuieli cu nevoile tale personale. Investițiile în domeniul creativ sau de divertisment ar putea fi fructuoase."
      }
    }
  },
  virgo: {
    love: {
      score: 6,
      text: {
        fr: "Votre perfectionnisme peut parfois créer des attentes irréalistes en amour. Apprenez à apprécier les imperfections de votre partenaire comme faisant partie de son charme unique. Les célibataires gagneraient à être moins analytiques et plus spontanés dans leurs approches amoureuses. L'amour n'est pas une équation à résoudre.",
        en: "Your perfectionism can sometimes create unrealistic expectations in love. Learn to appreciate your partner's imperfections as part of their unique charm. Singles would benefit from being less analytical and more spontaneous in romantic approaches. Love isn't an equation to solve.",
        es: "Tu perfeccionismo puede a veces crear expectativas poco realistas en el amor. Aprende a apreciar las imperfecciones de tu pareja como parte de su encanto único. Los solteros ganarían siendo menos analíticos y más espontáneos.",
        jp: "完璧主義が恋愛で非現実的な期待を生むことがあります。パートナーの欠点をその人独自の魅力の一部として受け入れることを学びましょう。独身の方は恋愛に対してあまり分析的にならず、もっと自発的になると良いでしょう。愛は解くべき方程式ではありません。",
        ro: "Perfecționismul tău poate crea uneori așteptări nerealiste în dragoste. Învață să apreciezi imperfecțiunile partenerului ca parte din farmecul său unic. Cei singuri ar avea de câștigat fiind mai puțin analitici și mai spontani."
      }
    },
    work: {
      score: 9,
      text: {
        fr: "Votre minutie et votre sens du détail font merveille dans vos projets professionnels. C'est le moment idéal pour finaliser des dossiers complexes ou améliorer des processus existants. Vos collègues apprécient votre fiabilité. Une opportunité dans l'analyse de données, la qualité ou la santé pourrait se présenter.",
        en: "Your meticulousness and attention to detail work wonders in professional projects. It's the ideal time to finalize complex files or improve existing processes. Your colleagues appreciate your reliability. An opportunity in data analysis, quality, or health could arise.",
        es: "Tu minuciosidad y atención al detalle hacen maravillas en tus proyectos profesionales. Es el momento ideal para finalizar expedientes complejos o mejorar procesos existentes. Tus colegas aprecian tu fiabilidad.",
        jp: "細部への注意と几帳面さがプロジェクトで効果を発揮します。複雑なファイルを完成させたり、既存のプロセスを改善するのに最適な時期です。同僚はあなたの信頼性を評価しています。データ分析、品質管理、または健康分野でのチャンスがあるかもしれません。",
        ro: "Meticulozitatea și atenția ta la detalii fac minuni în proiectele profesionale. Este momentul ideal să finalizezi dosare complexe sau să îmbunătățești procesele existente. Colegii apreciază fiabilitatea ta."
      }
    },
    health: {
      score: 8,
      text: {
        fr: "Votre hygiène de vie exemplaire porte ses fruits. Continuez à maintenir vos bonnes habitudes alimentaires et votre routine d'exercice. Attention toutefois à l'hypocondrie : ne laissez pas votre tendance à l'analyse vous inquiéter inutilement. Le yoga ou le pilates peuvent vous aider à relier corps et esprit harmonieusement.",
        en: "Your exemplary lifestyle is paying off. Continue maintaining your good eating habits and exercise routine. However, watch out for hypochondria: don't let your analytical tendency worry you unnecessarily. Yoga or pilates can help you connect body and mind harmoniously.",
        es: "Tu estilo de vida ejemplar está dando frutos. Continúa manteniendo tus buenos hábitos alimenticios y tu rutina de ejercicio. Sin embargo, cuidado con la hipocondría: no dejes que tu tendencia analítica te preocupe innecesariamente.",
        jp: "模範的な生活習慣が実を結んでいます。良い食習慣と運動ルーティンを続けましょう。ただし、心気症に注意：分析的な傾向が無駄な心配を引き起こさないようにしましょう。ヨガやピラティスが心身を調和的につなげる助けになります。",
        ro: "Stilul tău de viață exemplar dă roade. Continuă să menții obiceiurile alimentare bune și rutina de exerciții. Totuși, ai grijă de ipohondrie: nu lăsa tendința ta analitică să te îngrijoreze inutil."
      }
    },
    finances: {
      score: 8,
      text: {
        fr: "Votre gestion financière rigoureuse vous met à l'abri des mauvaises surprises. Vos analyses minutieuses des placements vous permettent de faire des choix éclairés. C'est le moment de revoir votre budget et d'optimiser vos dépenses. Un conseil financier professionnel pourrait vous aider à maximiser vos économies.",
        en: "Your rigorous financial management protects you from bad surprises. Your meticulous investment analyses allow you to make informed choices. It's time to review your budget and optimize expenses. Professional financial advice could help maximize your savings.",
        es: "Tu gestión financiera rigurosa te protege de malas sorpresas. Tus análisis meticulosos de inversiones te permiten tomar decisiones informadas. Es el momento de revisar tu presupuesto y optimizar gastos.",
        jp: "厳格な財務管理が予期せぬ出来事から守ってくれます。投資の緻密な分析により、情報に基づいた選択ができます。予算を見直し、支出を最適化する時期です。プロのファイナンシャルアドバイスが貯蓄の最大化に役立つかもしれません。",
        ro: "Gestionarea ta financiară riguroasă te protejează de surprize neplăcute. Analizele tale meticuloase ale investițiilor îți permit să faci alegeri informate. Este momentul să-ți revizuiești bugetul și să optimizezi cheltuielile."
      }
    }
  },
  libra: {
    love: {
      score: 8,
      text: {
        fr: "L'harmonie règne dans vos relations amoureuses. Votre capacité à voir les deux côtés d'une situation favorise le dialogue et la compréhension mutuelle. En couple, c'est le moment parfait pour prendre des décisions importantes ensemble. Les célibataires attirent par leur élégance naturelle et leur sens de l'équité.",
        en: "Harmony reigns in your romantic relationships. Your ability to see both sides of a situation promotes dialogue and mutual understanding. In a relationship, it's the perfect time to make important decisions together. Singles attract through their natural elegance and sense of fairness.",
        es: "La armonía reina en tus relaciones amorosas. Tu capacidad de ver ambos lados de una situación favorece el diálogo y la comprensión mutua. En pareja, es el momento perfecto para tomar decisiones importantes juntos.",
        jp: "恋愛関係に調和が訪れています。状況の両面を見る能力が対話と相互理解を促進します。カップルは一緒に重要な決定を下すのに最適な時期です。独身の方は自然な優雅さと公正さで人を惹きつけます。",
        ro: "Armonia domnește în relațiile tale amoroase. Capacitatea ta de a vedea ambele părți ale unei situații favorizează dialogul și înțelegerea reciprocă. În cuplu, este momentul perfect pentru a lua decizii importante împreună."
      }
    },
    work: {
      score: 7,
      text: {
        fr: "Vos talents de médiateur sont particulièrement sollicités. Vous excellez dans les négociations et savez créer des consensus. Attention toutefois à votre indécision naturelle qui pourrait ralentir certains projets. Fixez-vous des délais clairs pour vos décisions. Les domaines artistiques, juridiques ou diplomatiques vous sont favorables.",
        en: "Your mediator talents are particularly in demand. You excel in negotiations and know how to create consensus. However, watch your natural indecision which could slow down certain projects. Set clear deadlines for your decisions. Artistic, legal, or diplomatic fields are favorable for you.",
        es: "Tus talentos de mediador están particularmente solicitados. Sobresales en las negociaciones y sabes crear consensos. Sin embargo, cuidado con tu indecisión natural que podría ralentizar algunos proyectos.",
        jp: "調停者としての才能が特に求められています。交渉で優れており、合意形成の方法を知っています。ただし、プロジェクトを遅らせる可能性のある優柔不断さに注意しましょう。決定には明確な期限を設けましょう。芸術、法律、外交分野が有利です。",
        ro: "Talentele tale de mediator sunt deosebit de solicitate. Excelezi în negocieri și știi să creezi consens. Totuși, ai grijă de indecizía ta naturală care ar putea încetini anumite proiecte."
      }
    },
    health: {
      score: 7,
      text: {
        fr: "Votre équilibre intérieur influence directement votre santé physique. Les conflits non résolus peuvent se manifester par des tensions lombaires ou des problèmes de peau. Privilégiez les activités qui allient esthétique et bien-être : danse, stretching ou soins du corps. Entourez-vous de beauté pour nourrir votre âme.",
        en: "Your inner balance directly influences your physical health. Unresolved conflicts can manifest as back tension or skin problems. Prioritize activities that combine aesthetics and well-being: dance, stretching, or body care. Surround yourself with beauty to nourish your soul.",
        es: "Tu equilibrio interior influye directamente en tu salud física. Los conflictos no resueltos pueden manifestarse como tensiones lumbares o problemas de piel. Prioriza actividades que combinen estética y bienestar.",
        jp: "内面のバランスが身体の健康に直接影響します。未解決の葛藤は腰の緊張や肌のトラブルとして現れることがあります。美しさとウェルビーイングを組み合わせた活動を優先しましょう：ダンス、ストレッチ、ボディケアなど。魂を養うために美しいものに囲まれましょう。",
        ro: "Echilibrul tău interior influențează direct sănătatea fizică. Conflictele nerezolvate se pot manifesta prin tensiuni lombare sau probleme de piele. Prioritizează activitățile care combină estetica și bunăstarea."
      }
    },
    finances: {
      score: 6,
      text: {
        fr: "Votre difficulté à prendre des décisions financières fermes peut vous faire manquer certaines opportunités. Établissez des critères clairs à l'avance pour guider vos choix. Les achats liés à l'art, à la décoration ou à la mode sont favorisés, mais fixez-vous un budget précis pour éviter les excès.",
        en: "Your difficulty making firm financial decisions can cause you to miss certain opportunities. Establish clear criteria in advance to guide your choices. Purchases related to art, decoration, or fashion are favored, but set a precise budget to avoid excess.",
        es: "Tu dificultad para tomar decisiones financieras firmes puede hacerte perder ciertas oportunidades. Establece criterios claros de antemano para guiar tus elecciones. Las compras relacionadas con el arte, la decoración o la moda están favorecidas.",
        jp: "確固たる金銭決定を下すのが難しく、機会を逃すことがあります。選択を導くために事前に明確な基準を設けましょう。アート、インテリア、ファッションに関連する購入は有利ですが、過度を避けるために正確な予算を設定しましょう。",
        ro: "Dificultatea ta de a lua decizii financiare ferme te poate face să ratezi anumite oportunități. Stabilește criterii clare în avans pentru a-ți ghida alegerile. Achizițiile legate de artă, decorațiuni sau modă sunt favorizate."
      }
    }
  },
  scorpio: {
    love: {
      score: 9,
      text: {
        fr: "L'intensité de vos émotions crée des liens profonds et transformateurs. Votre passion et votre loyauté sont des atouts majeurs dans vos relations. En couple, la période est propice aux discussions profondes et à l'approfondissement de l'intimité. Les célibataires pourraient vivre un coup de foudre intense et magnétique.",
        en: "The intensity of your emotions creates deep, transformative bonds. Your passion and loyalty are major assets in relationships. In a relationship, the period is conducive to deep discussions and deepening intimacy. Singles could experience an intense, magnetic love at first sight.",
        es: "La intensidad de tus emociones crea lazos profundos y transformadores. Tu pasión y lealtad son activos importantes en las relaciones. En pareja, el período es propicio para conversaciones profundas y profundizar la intimidad.",
        jp: "感情の強さが深く変容的な絆を生み出します。情熱と忠誠心は関係における大きな強みです。カップルにとって、深い対話と親密さを深めるのに適した時期です。独身の方は強烈で磁力的な一目惚れを経験するかもしれません。",
        ro: "Intensitatea emoțiilor tale creează legături profunde și transformatoare. Pasiunea și loialitatea ta sunt atuuri majore în relații. În cuplu, perioada este propice discuțiilor profunde și aprofundării intimității."
      }
    },
    work: {
      score: 8,
      text: {
        fr: "Votre perspicacité vous permet de voir au-delà des apparences dans le milieu professionnel. Utilisez cette capacité pour identifier les opportunités cachées et les dynamiques de pouvoir. Votre détermination impressionne vos supérieurs. Les domaines de la recherche, de la finance ou de la psychologie vous sont particulièrement favorables.",
        en: "Your insight allows you to see beyond appearances in the professional environment. Use this ability to identify hidden opportunities and power dynamics. Your determination impresses your superiors. Research, finance, or psychology fields are particularly favorable for you.",
        es: "Tu perspicacia te permite ver más allá de las apariencias en el entorno profesional. Usa esta capacidad para identificar oportunidades ocultas y dinámicas de poder. Tu determinación impresiona a tus superiores.",
        jp: "洞察力により、職場環境で見かけの向こう側を見通すことができます。この能力を使って隠れた機会やパワーダイナミクスを特定しましょう。決意が上司を感心させます。研究、金融、心理学の分野が特に有利です。",
        ro: "Perspicacitatea ta îți permite să vezi dincolo de aparențe în mediul profesional. Folosește această capacitate pentru a identifica oportunitățile ascunse și dinamicile de putere. Determinarea ta impresionează superiorii."
      }
    },
    health: {
      score: 6,
      text: {
        fr: "Apprenez à libérer les émotions refoulées qui peuvent affecter votre bien-être physique. Les organes reproducteurs et le système éliminatoire méritent une attention particulière. Les pratiques de détoxification, qu'elles soient physiques ou émotionnelles, vous sont bénéfiques. La transformation passe aussi par le lâcher-prise.",
        en: "Learn to release repressed emotions that can affect your physical well-being. Reproductive organs and the eliminatory system deserve special attention. Detoxification practices, whether physical or emotional, are beneficial for you. Transformation also involves letting go.",
        es: "Aprende a liberar las emociones reprimidas que pueden afectar tu bienestar físico. Los órganos reproductores y el sistema eliminatorio merecen atención especial. Las prácticas de desintoxicación te son beneficiosas.",
        jp: "身体的な健康に影響を与える抑圧された感情を解放することを学びましょう。生殖器官と排泄システムには特別な注意が必要です。身体的または感情的なデトックスの実践が有益です。変容には手放すことも含まれます。",
        ro: "Învață să eliberezi emoțiile reprimate care pot afecta bunăstarea ta fizică. Organele reproductive și sistemul eliminator merită atenție specială. Practicile de detoxifiere îți sunt benefice."
      }
    },
    finances: {
      score: 7,
      text: {
        fr: "Votre flair pour les investissements stratégiques peut vous conduire vers des gains significatifs. Vous excellez dans la gestion des ressources partagées ou des héritages. Attention à votre tendance au tout ou rien : diversifiez vos placements. Les périodes de transformation sont propices aux restructurations financières importantes.",
        en: "Your flair for strategic investments can lead to significant gains. You excel in managing shared resources or inheritances. Watch your all-or-nothing tendency: diversify your investments. Transformation periods are conducive to important financial restructuring.",
        es: "Tu olfato para las inversiones estratégicas puede conducirte a ganancias significativas. Sobresales en la gestión de recursos compartidos o herencias. Cuidado con tu tendencia al todo o nada: diversifica tus inversiones.",
        jp: "戦略的な投資への嗅覚が大きな利益につながる可能性があります。共有資産や相続の管理に優れています。オール・オア・ナッシングの傾向に注意：投資を分散させましょう。変容の時期は重要な財務再構築に適しています。",
        ro: "Flerul tău pentru investiții strategice poate duce la câștiguri semnificative. Excelezi în gestionarea resurselor comune sau a moștenirilor. Ai grijă de tendința ta de tot sau nimic: diversifică-ți investițiile."
      }
    }
  },
  sagittarius: {
    love: {
      score: 7,
      text: {
        fr: "Votre soif d'aventure se reflète dans votre vie amoureuse. Les voyages et les nouvelles expériences renforcent vos liens ou créent des opportunités de rencontres. En couple, proposez une escapade spontanée pour raviver la flamme. Les célibataires pourraient trouver l'amour lors d'un voyage ou dans un contexte multiculturel.",
        en: "Your thirst for adventure reflects in your love life. Travels and new experiences strengthen your bonds or create meeting opportunities. In a relationship, suggest a spontaneous getaway to rekindle the flame. Singles might find love during a trip or in a multicultural context.",
        es: "Tu sed de aventura se refleja en tu vida amorosa. Los viajes y las nuevas experiencias fortalecen tus lazos o crean oportunidades de encuentros. En pareja, propón una escapada espontánea para reavivar la llama.",
        jp: "冒険への渇望が恋愛生活に反映されます。旅行や新しい経験が絆を強め、出会いの機会を生み出します。カップルは炎を再燃させるために自発的な小旅行を提案しましょう。独身の方は旅行中や多文化的な環境で愛を見つけるかもしれません。",
        ro: "Setea ta de aventură se reflectă în viața amoroasă. Călătoriile și experiențele noi întăresc legăturile sau creează oportunități de întâlniri. În cuplu, propune o escapadă spontană pentru a reaprinde flacăra."
      }
    },
    work: {
      score: 7,
      text: {
        fr: "Votre optimisme contagieux inspire vos collègues et ouvre des portes inattendues. Les opportunités liées à l'international, à l'enseignement ou à l'édition sont particulièrement favorables. Attention à ne pas vous engager dans trop de projets simultanément. Votre franchise est appréciée, mais dosez-la selon votre interlocuteur.",
        en: "Your contagious optimism inspires colleagues and opens unexpected doors. Opportunities related to international work, teaching, or publishing are particularly favorable. Be careful not to commit to too many projects simultaneously. Your frankness is appreciated, but dose it according to your audience.",
        es: "Tu optimismo contagioso inspira a tus colegas y abre puertas inesperadas. Las oportunidades relacionadas con lo internacional, la enseñanza o la edición son particularmente favorables. Cuidado con no comprometerte en demasiados proyectos simultáneamente.",
        jp: "伝染するような楽観主義が同僚を刺激し、予期せぬ扉を開きます。国際関係、教育、出版に関連する機会が特に有利です。同時に多くのプロジェクトに取り組みすぎないよう注意しましょう。率直さは評価されますが、相手に応じて調整しましょう。",
        ro: "Optimismul tău contagios inspiră colegii și deschide uși neașteptate. Oportunitățile legate de internațional, predare sau editare sunt deosebit de favorabile. Ai grijă să nu te angajezi în prea multe proiecte simultan."
      }
    },
    health: {
      score: 8,
      text: {
        fr: "Votre énergie naturelle et votre goût pour le mouvement maintiennent votre vitalité. Les sports d'extérieur et les activités qui vous font voyager physiquement ou mentalement vous conviennent parfaitement. Attention aux excès alimentaires lors de vos escapades. Les hanches et les cuisses nécessitent des exercices de renforcement.",
        en: "Your natural energy and taste for movement maintain your vitality. Outdoor sports and activities that take you traveling physically or mentally suit you perfectly. Watch dietary excess during getaways. Hips and thighs need strengthening exercises.",
        es: "Tu energía natural y gusto por el movimiento mantienen tu vitalidad. Los deportes al aire libre y las actividades que te hacen viajar física o mentalmente te convienen perfectamente. Cuidado con los excesos alimentarios durante las escapadas.",
        jp: "自然なエネルギーと動きへの愛好が活力を維持します。アウトドアスポーツや身体的・精神的に旅をさせてくれる活動が最適です。小旅行中の食べ過ぎに注意しましょう。腰と太ももには強化エクササイズが必要です。",
        ro: "Energia ta naturală și gustul pentru mișcare îți mențin vitalitatea. Sporturile în aer liber și activitățile care te duc în călătorii fizice sau mentale ți se potrivesc perfect. Atenție la excesele alimentare în timpul escapadelor."
      }
    },
    finances: {
      score: 5,
      text: {
        fr: "Votre générosité légendaire peut parfois dépasser vos moyens. Établissez un budget pour vos voyages et vos loisirs avant de vous laisser emporter par l'enthousiasme. Les investissements liés à l'éducation ou aux cultures étrangères sont favorisés. Évitez les paris risqués malgré votre optimisme naturel.",
        en: "Your legendary generosity can sometimes exceed your means. Establish a budget for travel and leisure before getting carried away by enthusiasm. Investments related to education or foreign cultures are favored. Avoid risky bets despite your natural optimism.",
        es: "Tu generosidad legendaria puede a veces superar tus medios. Establece un presupuesto para viajes y ocio antes de dejarte llevar por el entusiasmo. Las inversiones relacionadas con la educación o culturas extranjeras están favorecidas.",
        jp: "伝説的な寛大さが時に収入を超えることがあります。熱意に流される前に、旅行や余暇のための予算を立てましょう。教育や外国文化に関連する投資が有利です。自然な楽観主義にもかかわらず、リスキーな賭けは避けましょう。",
        ro: "Generozitatea ta legendară poate uneori depăși mijloacele tale. Stabilește un buget pentru călătorii și agrement înainte de a te lăsa dus de entuziasm. Investițiile legate de educație sau culturi străine sunt favorizate."
      }
    }
  },
  capricorn: {
    love: {
      score: 6,
      text: {
        fr: "Votre approche sérieuse et engagée de l'amour peut intimider au premier abord, mais elle attire ceux qui recherchent une relation durable. En couple, montrez plus d'affection et de spontanéité pour équilibrer votre nature réservée. Les célibataires pourraient rencontrer quelqu'un partageant leurs ambitions lors d'événements professionnels.",
        en: "Your serious, committed approach to love can intimidate at first, but it attracts those seeking a lasting relationship. In a relationship, show more affection and spontaneity to balance your reserved nature. Singles might meet someone sharing their ambitions at professional events.",
        es: "Tu enfoque serio y comprometido del amor puede intimidar al principio, pero atrae a quienes buscan una relación duradera. En pareja, muestra más afecto y espontaneidad para equilibrar tu naturaleza reservada.",
        jp: "愛に対する真剣で献身的なアプローチは最初は相手を威圧するかもしれませんが、永続的な関係を求める人を惹きつけます。カップルでは、控えめな性格のバランスを取るためにより多くの愛情と自発性を示しましょう。独身の方はビジネスイベントで野心を共有する人と出会えるかもしれません。",
        ro: "Abordarea ta serioasă și angajată a iubirii poate intimida la început, dar atrage pe cei care caută o relație durabilă. În cuplu, arată mai multă afecțiune și spontaneitate pentru a echilibra natura ta rezervată."
      }
    },
    work: {
      score: 9,
      text: {
        fr: "Votre détermination et votre sens des responsabilités vous propulsent vers le succès professionnel. C'est le moment idéal pour concrétiser vos ambitions à long terme. Une promotion ou une reconnaissance officielle récompense vos années d'efforts. Les domaines de la gestion, de la finance ou de l'administration vous sont particulièrement favorables.",
        en: "Your determination and sense of responsibility propel you toward professional success. It's the ideal time to realize your long-term ambitions. A promotion or official recognition rewards your years of effort. Management, finance, or administration fields are particularly favorable for you.",
        es: "Tu determinación y sentido de la responsabilidad te impulsan hacia el éxito profesional. Es el momento ideal para concretar tus ambiciones a largo plazo. Una promoción o reconocimiento oficial recompensa tus años de esfuerzo.",
        jp: "決意と責任感が職業的成功へと押し上げます。長期的な野心を実現するのに理想的な時期です。昇進や公式な認識が長年の努力に報います。経営、金融、管理の分野が特に有利です。",
        ro: "Determinarea și simțul responsabilității te propulsează spre succesul profesional. Este momentul ideal să-ți concretizezi ambițiile pe termen lung. O promovare sau recunoaștere oficială recompensează anii tăi de efort."
      }
    },
    health: {
      score: 7,
      text: {
        fr: "Votre endurance et votre discipline vous maintiennent en bonne forme, mais attention à ne pas négliger les signaux de votre corps. Le stress professionnel peut affecter vos os, articulations et dents. Intégrez des pauses et des activités relaxantes dans votre emploi du temps chargé. Le ski ou la randonnée en montagne vous ressourcent.",
        en: "Your endurance and discipline keep you in good shape, but be careful not to ignore your body's signals. Professional stress can affect your bones, joints, and teeth. Integrate breaks and relaxing activities into your busy schedule. Skiing or mountain hiking recharge you.",
        es: "Tu resistencia y disciplina te mantienen en buena forma, pero cuidado con no ignorar las señales de tu cuerpo. El estrés profesional puede afectar tus huesos, articulaciones y dientes. Integra pausas y actividades relajantes en tu agenda ocupada.",
        jp: "持久力と規律が健康を維持しますが、体のシグナルを無視しないよう注意しましょう。仕事のストレスは骨、関節、歯に影響を与えることがあります。忙しいスケジュールに休憩とリラックスする活動を組み込みましょう。スキーや山でのハイキングがリフレッシュになります。",
        ro: "Rezistența și disciplina ta te mențin în formă bună, dar ai grijă să nu ignori semnalele corpului. Stresul profesional poate afecta oasele, articulațiile și dinții. Integrează pauze și activități relaxante în programul tău încărcat."
      }
    },
    finances: {
      score: 9,
      text: {
        fr: "Votre sens de la planification financière à long terme porte ses fruits. Les investissements conservateurs et les placements immobiliers sont particulièrement favorisés. C'est le moment idéal pour consolider votre patrimoine ou préparer votre retraite. Votre patience vous permet de résister aux tendances spéculatives passagères.",
        en: "Your sense of long-term financial planning is paying off. Conservative investments and real estate placements are particularly favored. It's the ideal time to consolidate your assets or prepare for retirement. Your patience allows you to resist passing speculative trends.",
        es: "Tu sentido de la planificación financiera a largo plazo está dando frutos. Las inversiones conservadoras y los inmuebles están particularmente favorecidos. Es el momento ideal para consolidar tu patrimonio o preparar tu jubilación.",
        jp: "長期的な財務計画のセンスが実を結んでいます。保守的な投資と不動産投資が特に有利です。資産を固めたり、退職の準備をするのに理想的な時期です。忍耐力により、一時的な投機的トレンドに惑わされません。",
        ro: "Simțul tău pentru planificarea financiară pe termen lung dă roade. Investițiile conservatoare și plasamentele imobiliare sunt deosebit de favorizate. Este momentul ideal să-ți consolidezi patrimoniul sau să-ți pregătești pensionarea."
      }
    }
  },
  aquarius: {
    love: {
      score: 7,
      text: {
        fr: "Votre besoin de liberté et votre originalité colorent vos relations amoureuses d'une touche unique. En couple, cultivez des espaces d'indépendance tout en maintenant une connexion intellectuelle stimulante. Les célibataires attirent par leur non-conformisme et pourraient rencontrer l'âme sœur lors d'événements associatifs ou humanitaires.",
        en: "Your need for freedom and originality color your romantic relationships with a unique touch. In a relationship, cultivate spaces of independence while maintaining stimulating intellectual connection. Singles attract through non-conformism and might meet their soulmate at associative or humanitarian events.",
        es: "Tu necesidad de libertad y originalidad colorean tus relaciones amorosas con un toque único. En pareja, cultiva espacios de independencia mientras mantienes una conexión intelectual estimulante. Los solteros atraen por su inconformismo.",
        jp: "自由への欲求と独創性が恋愛関係にユニークな色を添えます。カップルでは、刺激的な知的つながりを維持しながら、独立した空間を大切にしましょう。独身の方は非順応主義で人を惹きつけ、団体や人道主義的なイベントでソウルメイトに出会えるかもしれません。",
        ro: "Nevoia ta de libertate și originalitate colorează relațiile tale amoroase cu o notă unică. În cuplu, cultivă spații de independență menținând o conexiune intelectuală stimulantă. Cei singuri atrag prin nonconformism."
      }
    },
    work: {
      score: 8,
      text: {
        fr: "Vos idées innovantes et votre vision avant-gardiste sont enfin reconnues à leur juste valeur. C'est le moment de proposer des projets révolutionnaires ou d'intégrer de nouvelles technologies. Les domaines de la tech, des énergies renouvelables ou du social vous sont favorables. Collaborez avec des esprits aussi originaux que le vôtre.",
        en: "Your innovative ideas and avant-garde vision are finally recognized at their true value. It's time to propose revolutionary projects or integrate new technologies. Tech, renewable energy, or social fields are favorable for you. Collaborate with minds as original as yours.",
        es: "Tus ideas innovadoras y visión vanguardista son finalmente reconocidas en su justo valor. Es el momento de proponer proyectos revolucionarios o integrar nuevas tecnologías. Los campos de tecnología, energías renovables o social te son favorables.",
        jp: "革新的なアイデアと前衛的なビジョンがついに正当に評価されます。革命的なプロジェクトを提案したり、新技術を統合する時です。テック、再生可能エネルギー、ソーシャル分野が有利です。あなたと同じくらいオリジナルな人々と協力しましょう。",
        ro: "Ideile tale inovatoare și viziunea avangardistă sunt în sfârșit recunoscute la adevărata lor valoare. Este momentul să propui proiecte revoluționare sau să integrezi noi tehnologii. Domeniile tech, energii regenerabile sau social îți sunt favorabile."
      }
    },
    health: {
      score: 7,
      text: {
        fr: "Votre esprit vif a besoin d'une stimulation constante pour rester équilibré. Les nouvelles formes d'exercice ou les sports de groupe vous conviennent particulièrement. Attention à la circulation sanguine, notamment au niveau des chevilles et des mollets. Les techniques de respiration et les activités en plein air favorisent votre bien-être.",
        en: "Your sharp mind needs constant stimulation to stay balanced. New forms of exercise or group sports suit you particularly well. Watch blood circulation, especially in ankles and calves. Breathing techniques and outdoor activities promote your well-being.",
        es: "Tu mente aguda necesita estimulación constante para mantenerse equilibrada. Las nuevas formas de ejercicio o los deportes de grupo te convienen particularmente. Cuidado con la circulación sanguínea, especialmente en tobillos y pantorrillas.",
        jp: "鋭い精神はバランスを保つために常に刺激を必要とします。新しい形のエクササイズやグループスポーツが特に向いています。特に足首とふくらはぎの血液循環に注意しましょう。呼吸法と屋外活動がウェルビーイングを促進します。",
        ro: "Mintea ta ascuțită are nevoie de stimulare constantă pentru a rămâne echilibrată. Noile forme de exercițiu sau sporturile de grup ți se potrivesc deosebit de bine. Atenție la circulația sanguină, mai ales la glezne și gambe."
      }
    },
    finances: {
      score: 6,
      text: {
        fr: "Votre approche non conventionnelle des finances peut vous conduire vers des investissements atypiques mais prometteurs. Les cryptomonnaies, les startups technologiques ou les projets à impact social attirent votre attention. Veillez cependant à garder une base financière stable avant de vous lancer dans l'expérimentation. Diversifiez intelligemment.",
        en: "Your unconventional approach to finances can lead you to atypical but promising investments. Cryptocurrencies, tech startups, or social impact projects attract your attention. However, ensure you keep a stable financial base before experimenting. Diversify intelligently.",
        es: "Tu enfoque no convencional de las finanzas puede llevarte a inversiones atípicas pero prometedoras. Las criptomonedas, startups tecnológicas o proyectos de impacto social atraen tu atención. Sin embargo, asegúrate de mantener una base financiera estable.",
        jp: "非伝統的な財務アプローチが、非典型的だが有望な投資へと導くかもしれません。暗号通貨、テックスタートアップ、社会的インパクトプロジェクトが注目を集めます。ただし、実験を始める前に安定した財務基盤を確保しましょう。賢く分散投資しましょう。",
        ro: "Abordarea ta neconvențională a finanțelor te poate conduce spre investiții atipice dar promițătoare. Criptomonedele, startup-urile tech sau proiectele cu impact social îți atrag atenția. Totuși, asigură-te că păstrezi o bază financiară stabilă înainte de a experimenta."
      }
    }
  },
  pisces: {
    love: {
      score: 9,
      text: {
        fr: "Votre sensibilité exacerbée et votre romantisme créent une atmosphère magique dans vos relations. Votre capacité à comprendre intuitivement votre partenaire renforce la connexion émotionnelle. Les célibataires pourraient vivre une rencontre qui semble prédestinée, peut-être dans un contexte artistique ou spirituel. Faites confiance à vos rêves.",
        en: "Your heightened sensitivity and romanticism create a magical atmosphere in your relationships. Your ability to intuitively understand your partner strengthens emotional connection. Singles might experience an encounter that seems predestined, perhaps in an artistic or spiritual context. Trust your dreams.",
        es: "Tu sensibilidad exacerbada y romanticismo crean una atmósfera mágica en tus relaciones. Tu capacidad de entender intuitivamente a tu pareja fortalece la conexión emocional. Los solteros podrían vivir un encuentro que parece predestinado.",
        jp: "高まった感受性とロマンチシズムが関係に魔法のような雰囲気を作ります。パートナーを直感的に理解する能力が感情的なつながりを強めます。独身の方は運命的な出会いを経験するかもしれません、おそらく芸術的または精神的な場面で。夢を信じましょう。",
        ro: "Sensibilitatea ta accentuată și romantismul creează o atmosferă magică în relațiile tale. Capacitatea ta de a înțelege intuitiv partenerul întărește conexiunea emoțională. Cei singuri ar putea trăi o întâlnire care pare predestinată."
      }
    },
    work: {
      score: 6,
      text: {
        fr: "Votre créativité et votre empathie sont des atouts précieux dans le milieu professionnel. Les domaines artistiques, thérapeutiques ou caritatifs vous permettent d'exprimer pleinement votre potentiel. Attention à ne pas vous laisser envahir par les énergies négatives de vos collègues. Fixez des limites saines et protégez votre sensibilité.",
        en: "Your creativity and empathy are precious assets in the professional environment. Artistic, therapeutic, or charitable fields allow you to fully express your potential. Be careful not to be overwhelmed by negative energies from colleagues. Set healthy boundaries and protect your sensitivity.",
        es: "Tu creatividad y empatía son activos preciosos en el entorno profesional. Los campos artísticos, terapéuticos o caritativos te permiten expresar plenamente tu potencial. Cuidado con no dejarte invadir por las energías negativas de tus colegas.",
        jp: "創造性と共感力は職場環境で貴重な強みです。芸術、治療、慈善の分野で潜在能力を十分に発揮できます。同僚のネガティブなエネルギーに圧倒されないよう注意しましょう。健全な境界を設け、感受性を守りましょう。",
        ro: "Creativitatea și empatia ta sunt atuuri prețioase în mediul profesional. Domeniile artistice, terapeutice sau caritabile îți permit să-ți exprimi pe deplin potențialul. Ai grijă să nu te lași copleșit de energiile negative ale colegilor."
      }
    },
    health: {
      score: 7,
      text: {
        fr: "Votre santé est intimement liée à votre état émotionnel et spirituel. Les pratiques méditatives, le yoga ou la natation vous apportent un équilibre essentiel. Attention à l'excès d'alcool ou de substances qui pourraient affecter votre système nerveux sensible. Les pieds méritent une attention particulière : massages et chaussures confortables sont recommandés.",
        en: "Your health is intimately linked to your emotional and spiritual state. Meditative practices, yoga, or swimming bring essential balance. Watch excess alcohol or substances that could affect your sensitive nervous system. Feet deserve special attention: massages and comfortable shoes are recommended.",
        es: "Tu salud está íntimamente ligada a tu estado emocional y espiritual. Las prácticas meditativas, el yoga o la natación te aportan un equilibrio esencial. Cuidado con el exceso de alcohol o sustancias que podrían afectar tu sistema nervioso sensible.",
        jp: "健康は感情的・精神的な状態と密接に関連しています。瞑想、ヨガ、水泳が不可欠なバランスをもたらします。敏感な神経系に影響を与える可能性のあるアルコールや物質の過剰摂取に注意しましょう。足には特別な注意が必要です：マッサージと快適な靴をお勧めします。",
        ro: "Sănătatea ta este intim legată de starea ta emoțională și spirituală. Practicile meditative, yoga sau înotul îți aduc un echilibru esențial. Atenție la excesul de alcool sau substanțe care ar putea afecta sistemul tău nervos sensibil."
      }
    },
    finances: {
      score: 5,
      text: {
        fr: "Votre rapport à l'argent est souvent idéaliste, ce qui peut vous rendre vulnérable aux arnaques ou aux mauvais placements. Entourez-vous de personnes pragmatiques pour vos décisions financières importantes. Évitez de prêter de l'argent par compassion sans garantie. Les investissements dans les arts ou les causes humanitaires peuvent aligner vos valeurs avec vos finances.",
        en: "Your relationship with money is often idealistic, which can make you vulnerable to scams or bad investments. Surround yourself with pragmatic people for important financial decisions. Avoid lending money out of compassion without guarantees. Investments in arts or humanitarian causes can align your values with finances.",
        es: "Tu relación con el dinero es a menudo idealista, lo que puede hacerte vulnerable a estafas o malas inversiones. Rodéate de personas pragmáticas para tus decisiones financieras importantes. Evita prestar dinero por compasión sin garantías.",
        jp: "お金との関係はしばしば理想主義的で、詐欺や悪い投資に対して脆弱になることがあります。重要な金銭決定には実用的な人々に囲まれましょう。保証なしに同情からお金を貸すことは避けましょう。芸術や人道的な目的への投資で価値観と財務を一致させることができます。",
        ro: "Relația ta cu banii este adesea idealistă, ceea ce te poate face vulnerabil la escrocherii sau investiții proaste. Înconjoară-te de persoane pragmatice pentru deciziile financiare importante. Evită să împrumuți bani din compasiune fără garanții."
      }
    }
  }
}
