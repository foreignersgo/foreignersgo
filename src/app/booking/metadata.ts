import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book China Travel Services | Online Booking | ForeignersGO',
  description: 'Book China travel services online: Canton Fair 2026 packages, airport pickup, hotel booking, visa services, and more. Secure online booking for all your China travel needs.',
  keywords: [
    'book China services', 'China travel booking', 'Canton Fair booking',
    'Guangzhou airport booking', 'China hotel booking', 'China visa booking',
    'online China booking', 'foreigner China booking', 'expat China booking',
    'Canton Fair 2026 booking', 'Guangzhou transport booking', 'China tour booking',
    'China business services booking', 'Guangzhou concierge booking', 'China travel packages',
    'secure China booking', 'instant China booking', 'China travel reservation',
    'Guangzhou services booking', 'China expat services booking'
  ].join(', '),
  openGraph: {
    title: 'Book China Travel Services - Online Booking | ForeignersGO',
    description: 'Book China travel services online: Canton Fair 2026 packages, airport pickup, hotel booking, visa services, and more. Secure online booking.',
    url: 'https://foreignersgo.com/booking',
    images: [
      {
        url: 'https://foreignersgo.com/booking-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Book China Travel Services by ForeignersGO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book China Travel Services - Online Booking',
    description: 'Book China travel services online: Canton Fair 2026 packages, airport pickup, hotel booking, visa services, and more.',
    images: ['https://foreignersgo.com/booking-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://foreignersgo.com/booking',
    languages: {
      'en': 'https://foreignersgo.com/booking/en',
      'zh': 'https://foreignersgo.com/booking/zh',
      'es': 'https://foreignersgo.com/booking/es',
      'fr': 'https://foreignersgo.com/booking/fr',
      'ru': 'https://foreignersgo.com/booking/ru',
      'de': 'https://foreignersgo.com/booking/de',
      'ar': 'https://foreignersgo.com/booking/ar',
      'am': 'https://foreignersgo.com/booking/am',
    },
  },
}
