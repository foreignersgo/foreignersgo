import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About ForeignersGO | Guangzhou Travel Concierge Team | Our Story',
  description: 'Learn about ForeignersGO - the premier travel concierge service in Guangzhou, China. Our multicultural team speaks 12+ languages and provides complete support for foreigners, expats, and business travelers.',
  keywords: [
    'about ForeignersGO', 'ForeignersGO team', 'Guangzhou travel concierge',
    'China expat services', 'foreigner China support', 'ForeignersGO story',
    'Guangzhou travel agency', 'China business services', 'ForeignersGO mission',
    'expat Guangzhou services', 'foreigner China assistance', 'China travel experts',
    'Guangzhou local expertise', 'China multilingual services', 'ForeignersGO experience',
    'Canton Fair specialists', 'Guangzhou concierge team', 'China travel professionals'
  ].join(', '),
  openGraph: {
    title: 'About ForeignersGO - Guangzhou Travel Concierge Team | Our Story',
    description: 'Learn about ForeignersGO - the premier travel concierge service in Guangzhou, China. Our multicultural team provides complete support for foreigners.',
    url: 'https://foreignersgo.com/about',
    images: [
      {
        url: 'https://foreignersgo.com/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'About ForeignersGO - China Travel Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ForeignersGO - Guangzhou Travel Concierge Team',
    description: 'Learn about ForeignersGO - the premier travel concierge service in Guangzhou, China. Our multicultural team supports foreigners and expats.',
    images: ['https://foreignersgo.com/about-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://foreignersgo.com/about',
    languages: {
      'en': 'https://foreignersgo.com/about/en',
      'zh': 'https://foreignersgo.com/about/zh',
      'es': 'https://foreignersgo.com/about/es',
      'fr': 'https://foreignersgo.com/about/fr',
      'ru': 'https://foreignersgo.com/about/ru',
      'de': 'https://foreignersgo.com/about/de',
      'ar': 'https://foreignersgo.com/about/ar',
      'am': 'https://foreignersgo.com/about/am',
    },
  },
}
