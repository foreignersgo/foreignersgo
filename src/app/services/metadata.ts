import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'China Travel Services | Guangzhou Concierge | ForeignersGO',
  description: 'Complete travel services in China: visa extension, apartment rental, hotel booking, car rental, and long-term stay support. Professional concierge services for foreigners and expats in Guangzhou.',
  keywords: [
    'China travel services', 'Guangzhou concierge', 'foreigner services China',
    'visa extension China', 'apartment rental Guangzhou', 'hotel booking China',
    'car rental China', 'expat services Guangzhou', 'China visa assistance',
    'Guangzhou apartment rental', 'China hotel booking', 'China car rental',
    'foreigner China support', 'expat China services', 'China travel assistance',
    'Guangzhou expat services', 'China long-term stay', 'China business services',
    'halal food China', 'China tour guide', 'Guangzhou tour services'
  ].join(', '),
  openGraph: {
    title: 'China Travel Services - Guangzhou Concierge | ForeignersGO',
    description: 'Complete travel services in China: visa, accommodation, transport, and expat support. Professional concierge services for foreigners in Guangzhou.',
    url: 'https://foreignersgo.com/services',
    images: [
      {
        url: 'https://foreignersgo.com/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'China Travel Services by ForeignersGO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China Travel Services - ForeignersGO',
    description: 'Complete travel services in China: visa, accommodation, transport, and expat support for foreigners in Guangzhou.',
    images: ['https://foreignersgo.com/services-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://foreignersgo.com/services',
    languages: {
      'en': 'https://foreignersgo.com/services/en',
      'zh': 'https://foreignersgo.com/services/zh',
      'es': 'https://foreignersgo.com/services/es',
      'fr': 'https://foreignersgo.com/services/fr',
      'ru': 'https://foreignersgo.com/services/ru',
      'de': 'https://foreignersgo.com/services/de',
      'ar': 'https://foreignersgo.com/services/ar',
      'am': 'https://foreignersgo.com/services/am',
    },
  },
}
