'use client'

import { useLanguage } from '@/contexts/language-context'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Check, Sparkles, Star, Crown, BookOpen, Users, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: 'Marie L.',
    text: {
      fr: 'Grâce à Meteo Astrale, j\'ai enfin compris mon thème natal. Les interprétations sont précises et éclairantes !',
      en: 'Thanks to Meteo Astrale, I finally understood my natal chart. The interpretations are precise and enlightening!',
      es: 'Gracias a Meteo Astrale, finalmente entendí mi carta natal. ¡Las interpretaciones son precisas e iluminadoras!',
      jp: 'Meteo Astraleのおかげで、やっとネイタルチャートを理解できました。解釈は正確で啓発的です！',
      ro: 'Datorită Meteo Astrale, în sfârșit am înțeles tema mea natală. Interpretările sunt precise și iluminatoare!',
    },
    rating: 5,
  },
  {
    name: 'Thomas B.',
    text: {
      fr: 'Les transits quotidiens m\'aident à mieux planifier mes journées. Un outil indispensable !',
      en: 'The daily transits help me better plan my days. An essential tool!',
      es: '¡Los tránsitos diarios me ayudan a planificar mejor mis días. Una herramienta indispensable!',
      jp: '毎日のトランジットは、日々の計画を立てるのに役立ちます。必須ツールです！',
      ro: 'Tranziturile zilnice mă ajută să-mi planific mai bine zilele. Un instrument indispensabil!',
    },
    rating: 5,
  },
  {
    name: 'Sophie D.',
    text: {
      fr: 'Les formations Premium sont d\'une qualité exceptionnelle. Je recommande vivement !',
      en: 'The Premium training courses are of exceptional quality. I highly recommend!',
      es: '¡Las formaciones Premium son de una calidad excepcional. Lo recomiendo mucho!',
      jp: 'プレミアムトレーニングは非常に質が高いです。強くお勧めします！',
      ro: 'Formările Premium sunt de o calitate excepțională. Recomand cu căldură!',
    },
    rating: 5,
  },
]

const trainingCards = [
  {
    icon: BookOpen,
    title: {
      fr: 'Initiation à l\'Astrologie',
      en: 'Introduction to Astrology',
      es: 'Iniciación a la Astrología',
      jp: '占星術入門',
      ro: 'Inițiere în Astrologie',
    },
    description: {
      fr: 'Apprenez les bases de l\'astrologie et décodez votre thème natal.',
      en: 'Learn the basics of astrology and decode your natal chart.',
      es: 'Aprende las bases de la astrología y decodifica tu carta natal.',
      jp: '占星術の基礎を学び、ネイタルチャートを解読しましょう。',
      ro: 'Învață bazele astrologiei și decodifică tema ta natală.',
    },
  },
  {
    icon: Zap,
    title: {
      fr: 'Les Transits Avancés',
      en: 'Advanced Transits',
      es: 'Tránsitos Avanzados',
      jp: '上級トランジット',
      ro: 'Tranzituri Avansate',
    },
    description: {
      fr: 'Maîtrisez l\'art de lire les transits planétaires pour anticiper l\'avenir.',
      en: 'Master the art of reading planetary transits to anticipate the future.',
      es: 'Domina el arte de leer los tránsitos planetarios para anticipar el futuro.',
      jp: '惑星トランジットを読む技術を習得し、未来を予測しましょう。',
      ro: 'Stăpânește arta de a citi tranziturile planetare pentru a anticipa viitorul.',
    },
  },
  {
    icon: Users,
    title: {
      fr: 'Synastrie & Relations',
      en: 'Synastry & Relationships',
      es: 'Sinastría y Relaciones',
      jp: 'シナストリーと人間関係',
      ro: 'Sinastrie și Relații',
    },
    description: {
      fr: 'Explorez la compatibilité astrologique et comprenez vos relations.',
      en: 'Explore astrological compatibility and understand your relationships.',
      es: 'Explora la compatibilidad astrológica y comprende tus relaciones.',
      jp: '占星術的相性を探り、人間関係を理解しましょう。',
      ro: 'Explorează compatibilitatea astrologică și înțelege-ți relațiile.',
    },
  },
]

export default function PremiumPage() {
  const { t, language } = useLanguage()
  const { isPremium, upgradeToPremium } = useAuth()

  const plans = [
    {
      key: 'free' as const,
      icon: Star,
      popular: false,
      current: !isPremium,
    },
    {
      key: 'essential' as const,
      icon: Sparkles,
      popular: true,
      current: false,
    },
    {
      key: 'premium' as const,
      icon: Crown,
      popular: false,
      current: isPremium,
    },
  ]

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">
          {t.premium.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t.premium.subtitle}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-20">
        {plans.map((plan) => {
          const planData = t.premium[plan.key]
          const Icon = plan.icon
          
          return (
            <div
              key={plan.key}
              className={cn(
                'glass rounded-2xl p-6 relative flex flex-col',
                plan.popular && 'border-primary ring-2 ring-primary/20'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
              )}

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                
                <h3 className="font-serif text-2xl text-cream mb-2">
                  {planData.name}
                </h3>
                
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-serif text-4xl text-primary">
                    {planData.price}
                  </span>
                  {'period' in planData && (
                    <span className="text-muted-foreground">
                      {planData.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {planData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-cream/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.current ? (
                <Button disabled className="w-full h-12">
                  {t.premium.current}
                </Button>
              ) : plan.key === 'free' ? (
                <Button variant="outline" className="w-full h-12 border-border" disabled>
                  {t.premium.current}
                </Button>
              ) : (
                <Button 
                  className="btn-gold w-full h-12"
                  onClick={upgradeToPremium}
                >
                  {t.premium.cta}
                </Button>
              )}
            </div>
          )
        })}
      </div>

      {/* Training Cards Placeholder */}
      <section className="mb-20">
        <h2 className="font-serif text-3xl text-cream text-center mb-8">
          {language === 'fr' ? 'Formations Exclusives' : 
           language === 'es' ? 'Formaciones Exclusivas' :
           language === 'jp' ? '限定トレーニング' :
           language === 'ro' ? 'Formări Exclusive' :
           'Exclusive Training'}
        </h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {trainingCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className="glass rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-violet/50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-cream mb-2">
                  {card.title[language as keyof typeof card.title]}
                </h3>
                <p className="text-muted-foreground">
                  {card.description[language as keyof typeof card.description]}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20">
        <h2 className="font-serif text-3xl text-cream text-center mb-8">
          {t.premium.testimonials.title}
        </h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-cream/80 mb-4 italic">
                {'"'}{testimonial.text[language as keyof typeof testimonial.text]}{'"'}
              </p>
              <p className="text-primary font-medium">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-cream text-center mb-8">
          {t.premium.faq.title}
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="q1" className="glass rounded-xl px-6 border-none">
            <AccordionTrigger className="text-cream hover:text-primary hover:no-underline">
              {t.premium.faq.q1}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {t.premium.faq.a1}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="q2" className="glass rounded-xl px-6 border-none">
            <AccordionTrigger className="text-cream hover:text-primary hover:no-underline">
              {t.premium.faq.q2}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {t.premium.faq.a2}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="q3" className="glass rounded-xl px-6 border-none">
            <AccordionTrigger className="text-cream hover:text-primary hover:no-underline">
              {t.premium.faq.q3}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {t.premium.faq.a3}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  )
}
