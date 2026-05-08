'use client'

import { useLanguage } from '@/contexts/language-context'
import type { Language } from '@/lib/translations'

const privacyContent: Record<Language, { title: string; lastUpdated: string; sections: { heading: string; content: string }[] }> = {
  fr: {
    title: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : Mai 2026',
    sections: [
      {
        heading: 'Collecte des données',
        content: 'Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services : données de naissance pour le calcul de votre carte natale (prénom, date, heure et lieu de naissance), adresse email pour la création de compte et les communications, et données de navigation pour améliorer l\'expérience utilisateur.',
      },
      {
        heading: 'Utilisation des données',
        content: 'Vos données sont utilisées exclusivement pour : le calcul de votre carte natale et de vos transits personnalisés, l\'envoi de notifications et horoscopes personnalisés (si vous l\'avez accepté), l\'amélioration de nos services et de votre expérience utilisateur, et le traitement de vos demandes de contact et de support.',
      },
      {
        heading: 'Protection des données',
        content: 'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Vos données sont stockées sur des serveurs sécurisés et ne sont jamais partagées avec des tiers sans votre consentement explicite.',
      },
      {
        heading: 'Vos droits',
        content: 'Conformément au RGPD, vous disposez des droits suivants : droit d\'accès à vos données personnelles, droit de rectification des données inexactes, droit à l\'effacement de vos données, droit à la portabilité de vos données, et droit d\'opposition au traitement de vos données.',
      },
      {
        heading: 'Cookies',
        content: 'Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies essentiels sont nécessaires au fonctionnement du site. Les cookies analytiques nous aident à comprendre comment les visiteurs utilisent le site. Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur.',
      },
      {
        heading: 'Conservation des données',
        content: 'Vos données sont conservées aussi longtemps que votre compte est actif ou tant que nécessaire pour vous fournir nos services. Si vous supprimez votre compte, vos données personnelles seront effacées dans un délai de 30 jours, à l\'exception des données que nous sommes légalement tenus de conserver.',
      },
      {
        heading: 'Contact',
        content: 'Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez-nous à : privacy@meteo-astrale.com',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: May 2026',
    sections: [
      {
        heading: 'Data Collection',
        content: 'We only collect data necessary for the proper functioning of our services: birth data for calculating your natal chart (first name, date, time, and place of birth), email address for account creation and communications, and browsing data to improve user experience.',
      },
      {
        heading: 'Data Use',
        content: 'Your data is used exclusively for: calculating your natal chart and personalized transits, sending notifications and personalized horoscopes (if you have agreed), improving our services and your user experience, and processing your contact and support requests.',
      },
      {
        heading: 'Data Protection',
        content: 'We implement appropriate technical and organizational security measures to protect your data against unauthorized access, modification, disclosure, or destruction. Your data is stored on secure servers and is never shared with third parties without your explicit consent.',
      },
      {
        heading: 'Your Rights',
        content: 'In accordance with GDPR, you have the following rights: right of access to your personal data, right to rectification of inaccurate data, right to erasure of your data, right to data portability, and right to object to the processing of your data.',
      },
      {
        heading: 'Cookies',
        content: 'Our site uses cookies to improve your browsing experience. Essential cookies are necessary for the site to function. Analytical cookies help us understand how visitors use the site. You can manage your cookie preferences at any time through your browser settings.',
      },
      {
        heading: 'Data Retention',
        content: 'Your data is retained as long as your account is active or as necessary to provide you with our services. If you delete your account, your personal data will be erased within 30 days, except for data we are legally required to retain.',
      },
      {
        heading: 'Contact',
        content: 'For any questions regarding this privacy policy or to exercise your rights, contact us at: privacy@meteo-astrale.com',
      },
    ],
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Mayo 2026',
    sections: [
      {
        heading: 'Recopilación de datos',
        content: 'Solo recopilamos los datos necesarios para el buen funcionamiento de nuestros servicios: datos de nacimiento para el cálculo de tu carta natal (nombre, fecha, hora y lugar de nacimiento), dirección de correo electrónico para la creación de cuenta y comunicaciones, y datos de navegación para mejorar la experiencia del usuario.',
      },
      {
        heading: 'Uso de datos',
        content: 'Tus datos se utilizan exclusivamente para: el cálculo de tu carta natal y tránsitos personalizados, el envío de notificaciones y horóscopos personalizados (si lo has aceptado), la mejora de nuestros servicios y tu experiencia de usuario, y el procesamiento de tus solicitudes de contacto y soporte.',
      },
      {
        heading: 'Protección de datos',
        content: 'Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos contra cualquier acceso no autorizado, modificación, divulgación o destrucción. Tus datos se almacenan en servidores seguros y nunca se comparten con terceros sin tu consentimiento explícito.',
      },
      {
        heading: 'Tus derechos',
        content: 'De acuerdo con el RGPD, tienes los siguientes derechos: derecho de acceso a tus datos personales, derecho de rectificación de datos inexactos, derecho a la supresión de tus datos, derecho a la portabilidad de tus datos, y derecho de oposición al tratamiento de tus datos.',
      },
      {
        heading: 'Cookies',
        content: 'Nuestro sitio utiliza cookies para mejorar tu experiencia de navegación. Las cookies esenciales son necesarias para el funcionamiento del sitio. Las cookies analíticas nos ayudan a entender cómo los visitantes utilizan el sitio. Puedes gestionar tus preferencias de cookies en cualquier momento a través de la configuración de tu navegador.',
      },
      {
        heading: 'Conservación de datos',
        content: 'Tus datos se conservan mientras tu cuenta esté activa o sea necesario para proporcionarte nuestros servicios. Si eliminas tu cuenta, tus datos personales serán borrados en un plazo de 30 días, excepto los datos que estamos legalmente obligados a conservar.',
      },
      {
        heading: 'Contacto',
        content: 'Para cualquier pregunta sobre esta política de privacidad o para ejercer tus derechos, contáctanos en: privacy@meteo-astrale.com',
      },
    ],
  },
  jp: {
    title: 'プライバシーポリシー',
    lastUpdated: '最終更新日：2026年5月',
    sections: [
      {
        heading: 'データ収集',
        content: '当社は、サービスの適切な機能に必要なデータのみを収集します：ネイタルチャートの計算のための出生データ（名前、日付、時刻、出生地）、アカウント作成と通信のためのメールアドレス、およびユーザーエクスペリエンスを向上させるためのブラウジングデータ。',
      },
      {
        heading: 'データの使用',
        content: 'お客様のデータは以下の目的でのみ使用されます：ネイタルチャートとパーソナライズされたトランジットの計算、通知とパーソナライズされたホロスコープの送信（同意した場合）、サービスとユーザーエクスペリエンスの向上、およびお問い合わせとサポートリクエストの処理。',
      },
      {
        heading: 'データ保護',
        content: '当社は、不正アクセス、変更、開示、または破壊からお客様のデータを保護するために、適切な技術的および組織的なセキュリティ対策を実施しています。お客様のデータは安全なサーバーに保存され、お客様の明示的な同意なしに第三者と共有されることはありません。',
      },
      {
        heading: 'お客様の権利',
        content: 'GDPRに従い、お客様は以下の権利を有します：個人データへのアクセス権、不正確なデータの訂正権、データの消去権、データポータビリティの権利、およびデータ処理に対する異議申し立て権。',
      },
      {
        heading: 'クッキー',
        content: '当サイトは、ブラウジング体験を向上させるためにクッキーを使用しています。必須クッキーはサイトの機能に必要です。分析クッキーは、訪問者がサイトをどのように使用しているかを理解するのに役立ちます。ブラウザの設定からいつでもクッキーの設定を管理できます。',
      },
      {
        heading: 'データ保持',
        content: 'お客様のデータは、アカウントがアクティブである限り、またはサービスを提供するために必要な限り保持されます。アカウントを削除すると、法的に保持が義務付けられているデータを除き、30日以内に個人データが削除されます。',
      },
      {
        heading: 'お問い合わせ',
        content: 'このプライバシーポリシーに関するご質問や権利の行使については、privacy@meteo-astrale.comまでお問い合わせください。',
      },
    ],
  },
  ro: {
    title: 'Politica de Confidențialitate',
    lastUpdated: 'Ultima actualizare: Mai 2026',
    sections: [
      {
        heading: 'Colectarea datelor',
        content: 'Colectăm doar datele necesare pentru buna funcționare a serviciilor noastre: date de naștere pentru calculul temei tale natale (prenume, dată, oră și loc de naștere), adresă de email pentru crearea contului și comunicări, și date de navigare pentru îmbunătățirea experienței utilizatorului.',
      },
      {
        heading: 'Utilizarea datelor',
        content: 'Datele tale sunt utilizate exclusiv pentru: calculul temei tale natale și al tranziturilor personalizate, trimiterea de notificări și horoscoape personalizate (dacă ai acceptat), îmbunătățirea serviciilor noastre și a experienței tale de utilizator, și procesarea cererilor tale de contact și suport.',
      },
      {
        heading: 'Protecția datelor',
        content: 'Implementăm măsuri de securitate tehnice și organizaționale adecvate pentru a proteja datele tale împotriva oricărui acces neautorizat, modificare, divulgare sau distrugere. Datele tale sunt stocate pe servere securizate și nu sunt niciodată partajate cu terți fără consimțământul tău explicit.',
      },
      {
        heading: 'Drepturile tale',
        content: 'Conform GDPR, ai următoarele drepturi: dreptul de acces la datele tale personale, dreptul la rectificarea datelor inexacte, dreptul la ștergerea datelor tale, dreptul la portabilitatea datelor tale, și dreptul de opoziție la prelucrarea datelor tale.',
      },
      {
        heading: 'Cookie-uri',
        content: 'Site-ul nostru folosește cookie-uri pentru a îmbunătăți experiența ta de navigare. Cookie-urile esențiale sunt necesare pentru funcționarea site-ului. Cookie-urile analitice ne ajută să înțelegem cum folosesc vizitatorii site-ul. Poți gestiona preferințele tale de cookie-uri oricând prin setările browserului tău.',
      },
      {
        heading: 'Păstrarea datelor',
        content: 'Datele tale sunt păstrate atât timp cât contul tău este activ sau cât este necesar pentru a-ți furniza serviciile noastre. Dacă îți ștergi contul, datele tale personale vor fi șterse în termen de 30 de zile, cu excepția datelor pe care suntem obligați legal să le păstrăm.',
      },
      {
        heading: 'Contact',
        content: 'Pentru orice întrebare privind această politică de confidențialitate sau pentru a-ți exercita drepturile, contactează-ne la: privacy@meteo-astrale.com',
      },
    ],
  },
}

export default function PrivacyPage() {
  const { language } = useLanguage()
  const content = privacyContent[language as Language]

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4 text-center">
          {content.title}
        </h1>
        <p className="text-muted-foreground text-center mb-12">
          {content.lastUpdated}
        </p>

        <div className="space-y-8">
          {content.sections.map((section, index) => (
            <div key={index} className="glass rounded-xl p-6">
              <h2 className="font-serif text-xl text-cream mb-4">
                {section.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
