'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const { t, language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: { fr: 'Email', en: 'Email', es: 'Email', jp: 'メール', ro: 'Email' },
      value: 'contact@meteo-astrale.com',
    },
    {
      icon: MapPin,
      label: { fr: 'Adresse', en: 'Address', es: 'Dirección', jp: '住所', ro: 'Adresă' },
      value: 'Paris, France',
    },
    {
      icon: Clock,
      label: { fr: 'Heures', en: 'Hours', es: 'Horario', jp: '営業時間', ro: 'Program' },
      value: { fr: 'Lun-Ven: 9h-18h', en: 'Mon-Fri: 9am-6pm', es: 'Lun-Vie: 9h-18h', jp: '月-金: 9時-18時', ro: 'Lun-Vin: 9-18' },
    },
  ]

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">
          {t.contact.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="glass rounded-2xl p-6 md:p-8">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-serif text-2xl text-cream mb-2">
                {t.contact.success}
              </h3>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsSubmitted(false)}
              >
                {t.common.retry}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-cream">
                    {t.contact.form.name}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="h-12 bg-input border-border text-cream"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-cream">
                    {t.contact.form.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="h-12 bg-input border-border text-cream"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-cream">
                  {t.contact.form.subject}
                </Label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  required
                  className="h-12 bg-input border-border text-cream"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-cream">
                  {t.contact.form.message}
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  rows={5}
                  className="bg-input border-border text-cream resize-none"
                />
              </div>

              <Button
                type="submit"
                className="btn-gold w-full h-12 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Send className="mr-2 h-5 w-5" />
                )}
                {t.contact.form.submit}
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            const labelText = typeof info.label === 'object' 
              ? info.label[language as keyof typeof info.label] 
              : info.label
            const valueText = typeof info.value === 'object'
              ? info.value[language as keyof typeof info.value]
              : info.value
            
            return (
              <div key={index} className="glass rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{labelText}</p>
                  <p className="text-cream font-medium">{valueText}</p>
                </div>
              </div>
            )
          })}

          {/* Map placeholder */}
          <div className="glass rounded-xl p-6 h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Paris, France</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
