import { NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3'
const LIST_ID = 5

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    const headers = {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    }

    // 1. AJOUTER LE CONTACT DANS LA LISTE BREVO
    try {
      const contactResponse = await fetch(`${BREVO_API_URL}/contacts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email,
          attributes: {
            PRENOM: name,
          },
          listIds: [LIST_ID],
          updateEnabled: true,
        }),
      })

      if (contactResponse.ok) {
        console.log(`✅ Contact ${email} synchronisé avec la liste #${LIST_ID}`)
      } else {
        const err = await contactResponse.json()
        console.warn('Note: Le contact n\'a pas pu être ajouté:', err)
      }
    } catch (error) {
      console.error('Erreur réseau lors de l\'ajout du contact:', error)
    }

    // 2. ENVOYER L'EMAIL DE NOTIFICATION
    const emailRes = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sender: {
          name: 'Météo Astrale - Contact',
          email: 'irtofan@gmail.com',
        },
        to: [
          {
            email: 'irtofan@gmail.com',
            name: 'Admin Météo Astrale',
          },
        ],
        replyTo: { email, name },
        subject: `[Contact] ${subject} - de ${name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
              <h2 style="color: #ca8a04; border-bottom: 2px solid #ca8a04; padding-bottom: 10px;">📩 Nouveau message reçu</h2>
              <p><strong>Nom :</strong> ${name}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Sujet :</strong> ${subject}</p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #ca8a04;">
                <p style="margin-top: 0;"><strong>Message :</strong></p>
                <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                Ce contact a également été enregistré dans votre liste Brevo CONTACTS METEO ASTRALE (#5).
              </footer>
            </body>
          </html>
        `,
      }),
    })

    if (!emailRes.ok) {
      const errorData = await emailRes.json()
      console.error('Erreur Brevo SMTP:', errorData)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message envoyé et contact enregistré',
    })

  } catch (error) {
    console.error('Erreur fatale API contact:', error)
    return NextResponse.json(
      { error: 'Une erreur interne est survenue' },
      { status: 500 }
    )
  }
}