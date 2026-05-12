import { NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3'
const LIST_ID = 5 // Votre liste CONTACTS METEO ASTRALE

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      name, 
      email, 
      subject, 
      message, 
      birthDate, 
      birthTime, 
      city, 
      country 
    } = body

    // Validation de base
    if (!name || !email || !birthDate || !city) {
      return NextResponse.json(
        { error: 'Les informations essentielles sont manquantes.' },
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

    // 1. AJOUTER OU METTRE À JOUR LE CONTACT DANS BREVO AVEC INFOS ASTRO
    try {
      const contactResponse = await fetch(`${BREVO_API_URL}/contacts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email,
          attributes: {
            PRENOM: name,
            DATE_NAISSANCE: birthDate,   // Attribut type Date
            HEURE_NAISSANCE: birthTime,   // Attribut type Texte
            LIEU_NAISSANCE: `${city}${country ? ', ' + country : ''}`, // Attribut type Texte
          },
          listIds: [LIST_ID],
          updateEnabled: true, // Met à jour si le contact existe déjà
        }),
      })

      if (contactResponse.ok) {
        console.log(`✅ Contact ${email} synchronisé avec ses données astro.`)
      } else {
        const err = await contactResponse.json()
        console.warn('Note: Problème lors de la mise à jour du contact:', err)
      }
    } catch (error) {
      console.error('Erreur réseau lors de la synchro contact:', error)
    }

    // 2. ENVOYER L'EMAIL DE NOTIFICATION À L'ADMIN
    const emailRes = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sender: {
          name: 'Météo Astrale - Système',
          email: 'irtofan@gmail.com',
        },
        to: [
          {
            email: 'irtofan@gmail.com',
            name: 'Admin Météo Astrale',
          },
        ],
        replyTo: { email, name },
        subject: `[Nouvelle Carte] ${name} - ${city}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
              <h2 style="color: #ca8a04; border-bottom: 2px solid #ca8a04; padding-bottom: 10px;">✨ Nouveau calcul de carte natale</h2>
              <p><strong>Utilisateur :</strong> ${name} (${email})</p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #ca8a04;">
                <p><strong>Date de naissance :</strong> ${birthDate}</p>
                <p><strong>Heure de naissance :</strong> ${birthTime}</p>
                <p><strong>Lieu :</strong> ${city}, ${country}</p>
              </div>
              <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                Ce contact est enregistré dans la liste Brevo #${LIST_ID}.
              </footer>
            </body>
          </html>
        `,
      }),
    })

    if (!emailRes.ok) {
      const errorData = await emailRes.json()
      console.error('Erreur Brevo SMTP:', errorData)
    }

    return NextResponse.json({
      success: true,
      message: 'Contact enregistré et notification envoyée',
    })

  } catch (error) {
    console.error('Erreur fatale API contact:', error)
    return NextResponse.json(
      { error: 'Une erreur interne est survenue' },
      { status: 500 }
    )
  }
}