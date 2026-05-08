'use client'

import { useLanguage } from '@/contexts/language-context'
import type { Language } from '@/lib/translations'

const legalContent: Record<Language, { title: string; sections: { heading: string; content: string }[] }> = {
  fr: {
    title: 'Mentions Légales',
    sections: [
      {
        heading: 'Éditeur du site',
        content: 'Meteo Astrale est un service proposé par Meteo Astrale SAS, société par actions simplifiée au capital de 10 000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro RCS Paris XXX XXX XXX. Siège social : Paris, France. Directeur de la publication : [Nom du directeur].',
      },
      {
        heading: 'Hébergement',
        content: 'Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.',
      },
      {
        heading: 'Propriété intellectuelle',
        content: 'L\'ensemble des contenus présents sur le site Meteo Astrale (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.',
      },
      {
        heading: 'Limitation de responsabilité',
        content: 'Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. L\'astrologie est un art divinatoire et les informations fournies ne doivent en aucun cas remplacer l\'avis d\'un professionnel de santé ou tout autre conseil professionnel.',
      },
      {
        heading: 'Contact',
        content: 'Pour toute question relative aux mentions légales, vous pouvez nous contacter à l\'adresse suivante : legal@meteo-astrale.com',
      },
    ],
  },
  en: {
    title: 'Legal Notice',
    sections: [
      {
        heading: 'Site Publisher',
        content: 'Meteo Astrale is a service provided by Meteo Astrale SAS, a simplified joint-stock company with capital of 10,000 euros, registered in the Paris Trade and Companies Register under number RCS Paris XXX XXX XXX. Registered office: Paris, France. Publication Director: [Director Name].',
      },
      {
        heading: 'Hosting',
        content: 'This site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States.',
      },
      {
        heading: 'Intellectual Property',
        content: 'All content on the Meteo Astrale site (texts, images, graphics, logo, icons, sounds, software, etc.) is protected by French and international intellectual property laws. Any reproduction, representation, modification, publication, adaptation of all or part of the elements of the site, whatever the means or process used, is prohibited, except with prior written authorization.',
      },
      {
        heading: 'Limitation of Liability',
        content: 'The information contained on this site is as accurate as possible and the site is periodically updated, but may contain inaccuracies, omissions or gaps. Astrology is a divinatory art and the information provided should in no way replace the advice of a health professional or any other professional advice.',
      },
      {
        heading: 'Contact',
        content: 'For any questions regarding the legal notice, you can contact us at: legal@meteo-astrale.com',
      },
    ],
  },
  es: {
    title: 'Aviso Legal',
    sections: [
      {
        heading: 'Editor del sitio',
        content: 'Meteo Astrale es un servicio proporcionado por Meteo Astrale SAS, sociedad por acciones simplificada con un capital de 10.000 euros, inscrita en el Registro Mercantil de París con el número RCS París XXX XXX XXX. Domicilio social: París, Francia. Director de publicación: [Nombre del director].',
      },
      {
        heading: 'Alojamiento',
        content: 'Este sitio está alojado por Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Estados Unidos.',
      },
      {
        heading: 'Propiedad intelectual',
        content: 'Todo el contenido del sitio Meteo Astrale (textos, imágenes, gráficos, logotipo, iconos, sonidos, software, etc.) está protegido por las leyes francesas e internacionales de propiedad intelectual. Cualquier reproducción, representación, modificación, publicación, adaptación de todo o parte de los elementos del sitio, cualquiera que sea el medio o proceso utilizado, está prohibida, salvo autorización previa por escrito.',
      },
      {
        heading: 'Limitación de responsabilidad',
        content: 'La información contenida en este sitio es lo más precisa posible y el sitio se actualiza periódicamente, pero puede contener inexactitudes, omisiones o lagunas. La astrología es un arte adivinatorio y la información proporcionada no debe en ningún caso reemplazar el consejo de un profesional de la salud o cualquier otro consejo profesional.',
      },
      {
        heading: 'Contacto',
        content: 'Para cualquier pregunta sobre el aviso legal, puede contactarnos en: legal@meteo-astrale.com',
      },
    ],
  },
  jp: {
    title: '利用規約',
    sections: [
      {
        heading: 'サイト運営者',
        content: 'Meteo Astraleは、資本金10,000ユーロの簡易株式会社Meteo Astrale SASが提供するサービスです。パリ商業裁判所登録番号RCS Paris XXX XXX XXX。本社所在地：フランス、パリ。発行責任者：[責任者名]。',
      },
      {
        heading: 'ホスティング',
        content: 'このサイトはVercel Inc.（340 S Lemon Ave #4133, Walnut, CA 91789, アメリカ合衆国）によってホストされています。',
      },
      {
        heading: '知的財産権',
        content: 'Meteo Astraleサイト上のすべてのコンテンツ（テキスト、画像、グラフィック、ロゴ、アイコン、音声、ソフトウェアなど）は、フランスおよび国際的な知的財産法によって保護されています。事前の書面による許可なく、いかなる手段や方法によっても、サイトの要素の全部または一部を複製、表現、変更、公開、翻案することは禁止されています。',
      },
      {
        heading: '責任の制限',
        content: 'このサイトに含まれる情報はできる限り正確であり、サイトは定期的に更新されていますが、不正確さ、省略、または欠落が含まれている場合があります。占星術は占いの芸術であり、提供される情報は、医療専門家やその他の専門的なアドバイスに取って代わるものではありません。',
      },
      {
        heading: 'お問い合わせ',
        content: '利用規約に関するご質問は、legal@meteo-astrale.comまでお問い合わせください。',
      },
    ],
  },
  ro: {
    title: 'Termeni Legali',
    sections: [
      {
        heading: 'Editorul site-ului',
        content: 'Meteo Astrale este un serviciu oferit de Meteo Astrale SAS, societate pe acțiuni simplificată cu un capital de 10.000 de euro, înregistrată la Registrul Comerțului din Paris sub numărul RCS Paris XXX XXX XXX. Sediul social: Paris, Franța. Director de publicație: [Numele directorului].',
      },
      {
        heading: 'Găzduire',
        content: 'Acest site este găzduit de Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Statele Unite.',
      },
      {
        heading: 'Proprietate intelectuală',
        content: 'Tot conținutul de pe site-ul Meteo Astrale (texte, imagini, grafice, logo, pictograme, sunete, software etc.) este protejat de legile franceze și internaționale privind proprietatea intelectuală. Orice reproducere, reprezentare, modificare, publicare, adaptare a tuturor sau a unei părți din elementele site-ului, indiferent de mijloacele sau procesul utilizat, este interzisă, cu excepția autorizării scrise prealabile.',
      },
      {
        heading: 'Limitarea răspunderii',
        content: 'Informațiile conținute pe acest site sunt cât mai exacte posibil, iar site-ul este actualizat periodic, dar poate conține inexactități, omisiuni sau lacune. Astrologia este o artă divinatorie, iar informațiile furnizate nu trebuie în niciun caz să înlocuiască sfatul unui profesionist în domeniul sănătății sau orice alt sfat profesional.',
      },
      {
        heading: 'Contact',
        content: 'Pentru orice întrebare privind termenii legali, ne puteți contacta la: legal@meteo-astrale.com',
      },
    ],
  },
}

export default function LegalPage() {
  const { language } = useLanguage()
  const content = legalContent[language as Language]

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-cream mb-12 text-center">
          {content.title}
        </h1>

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
