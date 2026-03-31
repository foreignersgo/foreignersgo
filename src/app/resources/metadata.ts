import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'China Travel Resources | Tools & Apps for Foreigners | ForeignersGO',
  description: 'Essential resources, tools, and apps for foreigners in China. Complete guides, useful apps, and trip planning tools for expats and travelers in Guangzhou and beyond.',
  keywords: [
    'China travel resources', 'foreigner China tools', 'expat China apps',
    'China travel guide', 'Guangzhou expat resources', 'China trip planning',
    'useful China apps', 'foreigner China toolkit', 'China travel apps',
    'expat China guide', 'China digital services', 'Guangzhou travel resources',
    'China SIM card guide', 'China bank account guide', 'China accommodation guide',
    'China transportation apps', 'China translation apps', 'China food apps',
    'China business apps', 'China expat community', 'China travel checklist'
  ].join(', '),
  openGraph: {
    title: 'China Travel Resources - Tools & Apps for Foreigners | ForeignersGO',
    description: 'Essential resources, tools, and apps for foreigners in China. Complete guides, useful apps, and trip planning tools for expats and travelers.',
    url: 'https://foreignersgo.com/resources',
    images: [
      {
        url: 'https://foreignersgo.com/resources-og.jpg',
        width: 1200,
        height: 630,
        alt: 'China Travel Resources by ForeignersGO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China Travel Resources - Tools & Apps for Foreigners',
    description: 'Essential resources, tools, and apps for foreigners in China. Complete guides, useful apps, and trip planning tools for expats.',
    images: ['https://foreignersgo.com/resources-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://foreignersgo.com/resources',
    languages: {
      'en': 'https://foreignersgo.com/resources/en',
      'zh': 'https://foreignersgo.com/resources/zh',
      'es': 'https://foreignersgo.com/resources/es',
      'fr': 'https://foreignersgo.com/resources/fr',
      'ru': 'https://foreignersgo.com/resources/ru',
      'de': 'https://foreignersgo.com/resources/de',
      'ar': 'https://foreignersgo.com/resources/ar',
      'am': 'https://foreignersgo.com/resources/am',
    },
  },
}
